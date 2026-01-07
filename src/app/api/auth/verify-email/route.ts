import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

/**
 * Email Verification
 * GET /api/auth/verify-email?token=xxx
 *
 * Handles two types of verification:
 * 1. New user email verification (uses verifyToken on User)
 * 2. Email change verification (uses VerificationToken table)
 *
 * Redirects to appropriate page based on verification result.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin?error=missing_token', request.url));
    }

    // Hash the token for lookup (tokens are stored hashed for security)
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // First, check if this is an email change verification
    const emailChangeToken = await prisma.verificationToken.findFirst({
      where: {
        token: hashedToken,
        identifier: { startsWith: 'email-change:' },
        expires: { gt: new Date() },
      },
    });

    if (emailChangeToken) {
      // Parse the identifier: "email-change:userId:newEmail"
      const [, userId, newEmail] = emailChangeToken.identifier.split(':');

      if (!userId || !newEmail) {
        return NextResponse.redirect(new URL('/auth/signin?error=invalid_token', request.url));
      }

      // Check if new email is still available (race condition protection)
      const existingUser = await prisma.user.findUnique({
        where: { email: newEmail },
      });

      if (existingUser) {
        // Email was taken in the meantime - delete token and fail
        await prisma.verificationToken.delete({ where: { token: hashedToken } });
        return NextResponse.redirect(new URL('/settings/account?error=email_taken', request.url));
      }

      // Update the user's email and delete the token atomically
      await prisma.$transaction([
        prisma.user.update({
          where: { id: userId },
          data: {
            email: newEmail,
            emailVerified: new Date(),
          },
        }),
        prisma.verificationToken.delete({ where: { token: hashedToken } }),
      ]);

      // Redirect to settings with success message
      return NextResponse.redirect(new URL('/settings/account?success=email_changed', request.url));
    }

    // Otherwise, this is a new user email verification
    const user = await prisma.user.findUnique({
      where: { verifyToken: token },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        verifyToken: true,
      },
    });

    if (!user) {
      return NextResponse.redirect(new URL('/auth/signin?error=invalid_token', request.url));
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.redirect(new URL('/auth/signin?success=already_verified', request.url));
    }

    // Verify the email
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verifyToken: null, // Clear the token after use
      },
    });

    // Redirect to success page
    return NextResponse.redirect(new URL('/auth/signin?success=email_verified', request.url));
  } catch (error) {
    console.error('[VERIFY EMAIL ERROR]:', error);
    return NextResponse.redirect(new URL('/auth/signin?error=verification_failed', request.url));
  }
}
