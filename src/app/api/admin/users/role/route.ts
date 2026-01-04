/**
 * Admin Update User Role API Route
 * PATCH /api/admin/users/role
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { withCsrfProtection } from '@/lib/security/csrf';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { checkRateLimit, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';

const roleSchema = z.object({
  userId: z.string(),
  role: z.enum(['USER', 'ADMIN']),
});

export const PATCH = withCsrfProtection(async (req: NextRequest) => {
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
    const validatedData = roleSchema.parse(body);

    // Prevent user from changing their own role
    if (validatedData.userId === session.user.id) {
      return NextResponse.json({ error: 'Cannot change your own role' }, { status: 400 });
    }

    // Update user role
    await prisma.user.update({
      where: { id: validatedData.userId },
      data: { role: validatedData.role },
    });

    return NextResponse.json({
      success: true,
      message: 'User role updated successfully',
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 });
    }

    logger.error('[Admin Role Update] Error:', error);
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 });
  }
});
