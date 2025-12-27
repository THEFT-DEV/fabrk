/**
 * Change Email API Route
 * PATCH /api/user/email
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/email';
import { withCsrfProtection } from '@/lib/security/csrf';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { z } from 'zod';
import crypto from 'crypto';
import { logger } from '@/lib/logger';

const emailSchema = z.object({
  newEmail: z.string().email(),
});

export const PATCH = withCsrfProtection(async (req: NextRequest) => {
  try {
    // Rate limit: auth (5 requests/15 min) for email changes
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.auth);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many email change attempts. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'Retry-After': Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = emailSchema.parse(body);

    // Check if email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.newEmail },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email is already in use' }, { status: 400 });
    }

    // Generate verification token (this is sent in the email)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24-hour expiry

    // Hash token before storing (security: tokens are hashed in DB)
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Update email and create verification token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          email: validatedData.newEmail,
          emailVerified: null, // Reset verification
        },
      }),
      prisma.verificationToken.create({
        data: {
          identifier: validatedData.newEmail,
          token: hashedToken,
          expires: expiresAt,
        },
      }),
    ]);

    // Send verification email to new address
    await sendVerificationEmail(validatedData.newEmail, token);

    return NextResponse.json({
      success: true,
      message: 'Email updated successfully. Please verify your new email address.',
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address', details: error.issues },
        { status: 400 }
      );
    }

    logger.error('[Email Change] Error:', error);
    return NextResponse.json({ error: 'Failed to change email' }, { status: 500 });
  }
});
