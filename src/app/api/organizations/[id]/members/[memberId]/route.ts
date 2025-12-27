/**
 * Organization Member Management API Route
 * PATCH - Update member role
 * DELETE - Remove member from organization
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { withCsrfProtection } from '@/lib/security/csrf';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { hasOrganizationRole, removeMember, updateMemberRole } from '@/lib/teams/organizations';
import { OrgRole } from '@/generated/prisma/client';
import { logger } from '@/lib/logger';

interface RouteContext {
  params: Promise<{ id: string; memberId: string }>;
}

export const PATCH = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
  try {
    // Rate limit: strict (10 requests/minute) for member role updates
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

    const { id, memberId } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user has permission (must be OWNER or ADMIN)
    const canUpdate = await hasOrganizationRole(id, session.user.id, OrgRole.ADMIN);

    if (!canUpdate) {
      return NextResponse.json(
        { error: "You don't have permission to update member roles" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { role } = body;

    if (!role || !['OWNER', 'ADMIN', 'MEMBER', 'GUEST'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    await updateMemberRole(id, memberId, role as OrgRole, session.user.id);

    return NextResponse.json({
      success: true,
      message: 'Member role updated successfully',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update member role';
    logger.error('Failed to update member role:', errorMessage);

    if (errorMessage.includes('permission')) {
      return NextResponse.json({ error: errorMessage }, { status: 403 });
    }

    return NextResponse.json({ error: 'Failed to update member role' }, { status: 500 });
  }
});

export const DELETE = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
  try {
    // Rate limit: strict (10 requests/minute) for member removal
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

    const { id, memberId } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user has permission (must be OWNER or ADMIN)
    const canRemove = await hasOrganizationRole(id, session.user.id, OrgRole.ADMIN);

    if (!canRemove) {
      return NextResponse.json(
        { error: "You don't have permission to remove members" },
        { status: 403 }
      );
    }

    await removeMember(id, memberId, session.user.id);

    return NextResponse.json({
      success: true,
      message: 'Member removed successfully',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to remove member';
    logger.error('Failed to remove member:', errorMessage);

    if (errorMessage.includes('permission') || errorMessage.includes('owner')) {
      return NextResponse.json({ error: errorMessage }, { status: 403 });
    }

    return NextResponse.json({ error: 'Failed to remove member' }, { status: 500 });
  }
});
