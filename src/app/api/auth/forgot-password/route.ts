import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { env } from '@/lib/env';
import { checkAuthRateLimit } from '@/lib/rate-limit';

/**
 * Forgot Password
 * POST /api/auth/forgot-password
 *
 * Sends a password reset email with a time-limited token.
 * Rate limited to prevent abuse and email bombing.
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting (stricter than registration)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const { success, remaining, reset } = await checkAuthRateLimit(`forgot-password:${ip}`);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many password reset requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
            'X-RateLimit-Remaining': remaining.toString(),
          },
        }
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true },
    });

    // SECURITY: Always return success even if email doesn't exist
    // This prevents email enumeration attacks
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          'If an account exists with this email, you will receive a password reset link shortly.',
      });
    }

    // Generate secure reset token (32 bytes = 64 hex characters)
    const resetToken = randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetExpires,
      },
    });

    // Queue password reset email
    const resetUrl = `${env.server.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

    await prisma.emailQueue.create({
      data: {
        type: 'RESET',
        to: user.email,
        subject: 'Reset your password',
         
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #33ff66; border: 1px solid #33ff66;">
            <div style="border-bottom: 1px solid #33ff66; padding-bottom: 10px; margin-bottom: 20px;">
              <span style="font-size: 12px; color: #999;">[0x00] PASSWORD_RESET</span>
            </div>

            <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 20px; color: #33ff66;">RESET YOUR PASSWORD</h1>

            <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.6;">
              ${user.name ? `Hi ${user.name},` : 'Hello,'}<br><br>
              We received a request to reset the password for your account.
            </p>

            <p style="font-size: 14px; margin-bottom: 30px; line-height: 1.6;">
              Click the button below to reset your password. This link will expire in 1 hour.
            </p>

            <a href="${resetUrl}" style="display: inline-block; padding: 12px 32px; background-color: #33ff66; color: #0a0a0a; text-decoration: none; font-weight: bold; font-size: 12px;">> RESET PASSWORD</a>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #33ff66; font-size: 11px; color: #999;">
              <p style="margin: 0 0 8px 0;"><strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your password will not be changed.</p>
              <p style="margin: 8px 0 0 0;">Or copy this link:</p>
              <p style="margin: 8px 0 0 0; word-break: break-all;">${resetUrl}</p>
            </div>
          </div>
        `,
        userId: user.id,
        metadata: {
          token: resetToken,
          expiresAt: resetExpires.toISOString(),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message:
        'If an account exists with this email, you will receive a password reset link shortly.',
    });
  } catch (error) {
    console.error('[FORGOT PASSWORD ERROR]:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request. Please try again.' },
      { status: 500 }
    );
  }
}
