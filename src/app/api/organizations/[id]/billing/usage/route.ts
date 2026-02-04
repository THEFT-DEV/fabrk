/**
 * Organization Usage API Route
 * GET - Fetch organization's current usage metrics
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isOrganizationMember } from '@/lib/teams/organizations';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is a member
    const isMember = await isOrganizationMember(id, session.user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: 'You are not a member of this organization' },
        { status: 403 }
      );
    }

    // Fetch organization with member count
    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            members: true,
            uploads: true,
          },
        },
      },
    });

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Determine limits based on plan
    const planLimits = {
      FREE: { users: 3, storage: 1, apiCalls: 1000 },
      STARTER: { users: 10, storage: 10, apiCalls: 10000 },
      PROFESSIONAL: { users: 50, storage: 100, apiCalls: 100000 },
      ENTERPRISE: { users: 999, storage: 1000, apiCalls: 1000000 },
    };

    const limits = planLimits[organization.plan as keyof typeof planLimits] || planLimits.FREE;

    // Calculate storage (mock - in production, calculate from uploads)
    const storageUsed = organization._count.uploads * 0.5; // Assuming 500MB per upload on average

    // Calculate API calls (mock - in production, fetch from analytics)
    const apiCallsThisMonth = Math.floor(Math.random() * limits.apiCalls);

    return NextResponse.json({
      usage: {
        users: {
          current: organization._count.members,
          limit: limits.users,
        },
        storage: {
          current: parseFloat(storageUsed.toFixed(2)),
          limit: limits.storage,
        },
        apiCalls: {
          current: apiCallsThisMonth,
          limit: limits.apiCalls,
        },
      },
    });
  } catch (error: unknown) {
    logger.error('Failed to fetch usage:', error);
    return NextResponse.json({ error: 'Failed to fetch usage' }, { status: 500 });
  }
}
