import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

/**
 * Reset Password
 * POST /api/auth/reset-password
 *
 * Resets user password using a valid reset token.
 * Invalidates all existing sessions by incrementing sessionVersion.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    // Validation
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Reset token and new password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Hash new password first (before transaction)
    const hashedPassword = await hash(password, 12);

    // SECURITY: Atomic token consumption to prevent race conditions
    // Find and clear token in a single operation
    const result = await prisma.user.updateMany({
      where: {
        resetToken: token,
        resetExpires: {
          gt: new Date(), // Token must not be expired
        },
      },
      data: {
        password: hashedPassword,
        resetToken: null, // Clear the token atomically
        resetExpires: null,
        sessionVersion: { increment: 1 }, // Invalidate all sessions
      },
    });

    // If no rows updated, token was invalid or already used
    if (result.count === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token. Please request a new password reset.' },
        { status: 400 }
      );
    }

    // Note: Sessions are automatically invalidated via sessionVersion increment
    // The session version check in auth.ts will invalidate all existing JWT tokens

    return NextResponse.json({
      success: true,
      message: 'Password reset successful. Please sign in with your new password.',
    });
  } catch (error) {
    console.error('[RESET PASSWORD ERROR]:', error);
    return NextResponse.json(
      { error: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}
