/**
 * Change Password API Route
 * PATCH /api/user/password
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { withCsrfProtection } from '@/lib/security/csrf';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { logAuditEvent } from '@/lib/security/audit-log';
import { hash, compare } from 'bcryptjs';
import { z } from 'zod';
import { logger } from '@/lib/logger';

const passwordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export const PATCH = withCsrfProtection(async (req: NextRequest) => {
  try {
    // Rate limit: auth (5 requests/15 min) for password changes
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.auth);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many password change attempts. Please try again later.' },
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

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = passwordSchema.parse(body);

    // Get user with current password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user?.password) {
      return NextResponse.json(
        { error: 'Password not set. Use OAuth sign in instead.' },
        { status: 400 }
      );
    }

    // Verify current password
    const isValid = await compare(validatedData.currentPassword, user.password);

    if (!isValid) {
      // Audit log: Failed password change attempt
      await logAuditEvent({
        eventType: 'auth.failed_login',
        userId: session.user.id,
        userEmail: session.user.email,
        ipAddress: identifier,
        userAgent: req.headers.get('user-agent') || undefined,
        resource: 'user',
        action: 'password_change_failed',
        result: 'failure',
        severity: 'medium',
        metadata: {
          reason: 'incorrect_current_password',
        },
      });
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await hash(validatedData.newPassword, 12);

    // Update password and increment sessionVersion to invalidate all other sessions
    // This ensures that changing password logs out all devices except the current one
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        password: hashedPassword,
        sessionVersion: {
          increment: 1,
        },
      },
    });

    // Audit log: Security-critical event
    await logAuditEvent({
      eventType: 'auth.password_reset',
      userId: session.user.id,
      userEmail: session.user.email,
      ipAddress: identifier,
      userAgent: req.headers.get('user-agent') || undefined,
      resource: 'user',
      action: 'password_changed',
      result: 'success',
      severity: 'high',
      metadata: {
        sessionsInvalidated: true,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        'Password updated successfully. All other sessions have been logged out for security.',
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 });
    }

    logger.error('[Password Change] Error:', error);
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
});
