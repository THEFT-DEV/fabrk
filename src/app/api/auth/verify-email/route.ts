import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Email Verification
 * GET /api/auth/verify-email?token=xxx
 *
 * Verifies a user's email address using the provided token.
 * Redirects to appropriate page based on verification result.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin?error=missing_token', request.url));
    }

    // Find user with this verification token
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
