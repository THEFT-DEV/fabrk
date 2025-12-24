/**
 * Admin Delete User API Route
 * DELETE /api/admin/users/delete
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { withCsrfProtection } from '@/lib/security/csrf';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { checkRateLimit, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { logAuditEvent } from '@/lib/security/audit-log';

const deleteSchema = z.object({
  userId: z.string(),
});

export const DELETE = withCsrfProtection(async (req: NextRequest) => {
  try {
    // Apply strict rate limiting to admin operations
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimit(identifier, RateLimiters.strict);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'You have exceeded the rate limit for admin operations.',
          retryAfter: Math.ceil((rateLimit.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.reset.toString(),
            'Retry-After': Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const session = await auth();

    // Check if user is admin
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = deleteSchema.parse(body);

    // Prevent user from deleting themselves
    if (validatedData.userId === session.user.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    // Get user info before deletion for audit log
    const targetUser = await prisma.user.findUnique({
      where: { id: validatedData.userId },
      select: { email: true },
    });

    // Delete user and all related data (cascade)
    await prisma.user.delete({
      where: { id: validatedData.userId },
    });

    // Audit log: Critical admin action
    await logAuditEvent({
      eventType: 'admin.user_deleted',
      userId: session.user.id,
      userEmail: session.user.email || undefined,
      ipAddress: identifier,
      userAgent: req.headers.get('user-agent') || undefined,
      resource: 'user',
      action: 'delete',
      result: 'success',
      severity: 'critical',
      metadata: {
        resourceId: validatedData.userId,
        deletedUserEmail: targetUser?.email,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 });
    }

    logger.error('[Admin Delete User] Error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
});
