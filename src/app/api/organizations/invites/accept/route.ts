/**
 * Accept Invite API Route
 * POST - Accept an organization invitation
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { withCsrfProtection } from '@/lib/security/csrf';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { acceptInvite } from '@/lib/teams/organizations';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    // Rate limit: strict (10 requests/minute) for invite acceptance
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

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to accept invitations' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: 'Invitation token is required' }, { status: 400 });
    }

    // Verify token and get invite
    const invite = await prisma.organizationInvite.findUnique({
      where: { token },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!invite) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
    }

    // Verify email matches
    if (invite.email !== session.user.email) {
      return NextResponse.json(
        { error: 'This invitation was sent to a different email address' },
        { status: 403 }
      );
    }

    // Accept the invite
    const membership = await acceptInvite(token, session.user.id);

    return NextResponse.json({
      success: true,
      message: 'Successfully joined organization',
      organization: invite.organization,
      membership: {
        organizationId: membership.organizationId,
        role: membership.role,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to accept invitation';
    logger.error('Failed to accept invitation:', errorMessage);

    // Handle specific error cases
    if (errorMessage.includes('expired')) {
      return NextResponse.json({ error: 'This invitation has expired' }, { status: 410 });
    }

    if (errorMessage.includes('already accepted')) {
      return NextResponse.json(
        { error: 'This invitation has already been accepted' },
        { status: 410 }
      );
    }

    if (errorMessage.includes('already a member')) {
      return NextResponse.json(
        { error: 'You are already a member of this organization' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: 'Failed to accept invitation' }, { status: 500 });
  }
});
