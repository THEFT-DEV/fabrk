import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { env } from '@/lib/env';

/**
 * Send Email Verification
 * POST /api/auth/send-verification-email
 *
 * Sends a verification email to the authenticated user's email address.
 * Rate limited to prevent abuse (handled by middleware).
 */
export async function POST(_request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if email is already verified
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { emailVerified: true },
    });

    if (user?.emailVerified) {
      return NextResponse.json({ error: 'Email already verified' }, { status: 400 });
    }

    // Generate verification token (32 bytes = 64 hex characters)
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update user with new verification token
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        verifyToken: token,
      },
    });

    // Create verification email in queue
    const verificationUrl = `${env.server.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

    await prisma.emailQueue.create({
      data: {
        type: 'VERIFICATION',
        to: session.user.email,
        subject: 'Verify your email address',
 
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #33ff66; border: 1px solid #33ff66;">
            <div style="border-bottom: 1px solid #33ff66; padding-bottom: 10px; margin-bottom: 20px;">
              <span style="font-size: 12px; color: #999;">[0x00] EMAIL_VERIFICATION</span>
            </div>

            <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 20px; color: #33ff66;">VERIFY YOUR EMAIL</h1>

            <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.6;">
              Click the button below to verify your email address and activate your account.
            </p>

            <p style="font-size: 14px; margin-bottom: 30px; line-height: 1.6;">
              This link will expire in 24 hours.
            </p>

            <a href="${verificationUrl}" style="display: inline-block; padding: 12px 32px; background-color: #33ff66; color: #0a0a0a; text-decoration: none; font-weight: bold; font-size: 12px;">> VERIFY EMAIL</a>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #33ff66; font-size: 11px; color: #999;">
              <p style="margin: 0 0 8px 0;">If you didn't request this, please ignore this email.</p>
              <p style="margin: 0;">Or copy this link:</p>
              <p style="margin: 8px 0 0 0; word-break: break-all;">${verificationUrl}</p>
            </div>
          </div>
        `,
        userId: session.user.id,
        metadata: {
          token,
          expiresAt: expiresAt.toISOString(),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Verification email sent. Check your inbox.',
    });
  } catch (error) {
    console.error('[SEND VERIFICATION ERROR]:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email. Please try again.' },
      { status: 500 }
    );
  }
}
