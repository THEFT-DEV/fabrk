/**
 * Delete Account API Route
 * DELETE /api/user/delete
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { withCsrfProtection } from '@/lib/security/csrf';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { logger } from '@/lib/logger';

const deleteSchema = z.object({
  password: z.string().min(8),
  confirmation: z.literal('DELETE'),
});

export const DELETE = withCsrfProtection(async (req: NextRequest) => {
  try {
    // Rate limit: strict (10 requests/minute) for account deletion
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.strict);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
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
    const validatedData = deleteSchema.parse(body);

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user?.password) {
      return NextResponse.json(
        { error: 'Password not set. Cannot delete account.' },
        { status: 400 }
      );
    }

    // Verify password
    const isValid = await compare(validatedData.password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Password is incorrect' }, { status: 400 });
    }

    // Delete user and all related data (cascade)
    await prisma.user.delete({
      where: { id: session.user.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 });
    }

    logger.error('[Account Delete] Error:', error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
});
