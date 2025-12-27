import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { env } from '@/lib/env';
import { checkAuthRateLimit } from '@/lib/rate-limit';

/**
 * User Registration
 * POST /api/auth/register
 *
 * Creates a new user account and sends verification email.
 * Rate limited to prevent abuse.
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const { success, remaining, reset } = await checkAuthRateLimit(`register:${ip}`);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
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
    const { email, password, name } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    // SECURITY: Return same response to prevent email enumeration attacks
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Don't reveal that the email exists - return success-like response
      // This prevents attackers from discovering valid email addresses
      console.log('[SECURITY] Registration attempt for existing email:', email);
      return NextResponse.json(
        {
          success: true,
          message: 'If this email is not already registered, you will receive a verification email shortly.',
        },
        { status: 200 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Generate verification token
    const verifyToken = randomBytes(32).toString('hex');

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        verifyToken,
        emailVerified: null, // Not verified yet
      },
    });

    // Queue verification email
    const verificationUrl = `${env.server.NEXTAUTH_URL}/api/auth/verify-email?token=${verifyToken}`;

    await prisma.emailQueue.create({
      data: {
        type: 'VERIFICATION',
        to: email,
        subject: 'Verify your email address',
 
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #33ff66; border: 1px solid #33ff66;">
            <div style="border-bottom: 1px solid #33ff66; padding-bottom: 10px; margin-bottom: 20px;">
              <span style="font-size: 12px; color: #999;">[0x00] EMAIL_VERIFICATION</span>
            </div>

            <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 20px; color: #33ff66;">WELCOME TO FABRK</h1>

            <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.6;">
              Thank you for creating an account! Click the button below to verify your email address.
            </p>

            <p style="font-size: 14px; margin-bottom: 30px; line-height: 1.6;">
              This link will expire in 24 hours.
            </p>

            <a href="${verificationUrl}" style="display: inline-block; padding: 12px 32px; background-color: #33ff66; color: #0a0a0a; text-decoration: none; font-weight: bold; font-size: 12px;">> VERIFY EMAIL</a>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #33ff66; font-size: 11px; color: #999;">
              <p style="margin: 0 0 8px 0;">If you didn't create this account, please ignore this email.</p>
              <p style="margin: 0;">Or copy this link:</p>
              <p style="margin: 8px 0 0 0; word-break: break-all;">${verificationUrl}</p>
            </div>
          </div>
        `,
        userId: user.id,
        metadata: {
          token: verifyToken,
        },
      },
    });

    // SECURITY: Use same message as "existing user" case to prevent enumeration
    return NextResponse.json(
      {
        success: true,
        message: 'If this email is not already registered, you will receive a verification email shortly.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[REGISTRATION ERROR]:', error);
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}
