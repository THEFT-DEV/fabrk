/**
 * User Profile API Route
 * PATCH /api/user/profile
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { withCsrfProtection } from '@/lib/security/csrf';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { z } from 'zod';
import { logger } from '@/lib/logger';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).optional(),
  email: z.string().email('Please enter a valid email address').optional(),
  bio: z.string().max(500).optional(),
  website: z.string().url().max(200).optional().or(z.literal('')),
  twitter: z.string().max(50).optional(),
  github: z.string().max(50).optional(),
});

export const PATCH = withCsrfProtection(async (req: NextRequest) => {
  try {
    // Rate limit: api (60 requests/minute) for profile updates
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.api);

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

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = profileSchema.parse(body);

    // Check if email is being updated and if it's already taken
    if (validatedData.email && validatedData.email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });

      if (existingUser) {
        return NextResponse.json({ error: 'Email is already in use' }, { status: 400 });
      }
    }

    // Update user profile
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: validatedData.name,
        email: validatedData.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 });
    }

    logger.error('[Profile Update] Error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
});
