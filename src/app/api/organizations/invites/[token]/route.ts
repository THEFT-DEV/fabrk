/**
 * Get Invite by Token API Route
 * GET - Fetch invitation details by token
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

interface RouteContext {
  params: Promise<{ token: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { token } = await context.params;

    const invite = await prisma.organizationInvite.findUnique({
      where: { token },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            logo: true,
          },
        },
      },
    });

    if (!invite) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
    }

    // Check if already accepted
    if (invite.acceptedAt) {
      return NextResponse.json(
        { error: 'This invitation has already been accepted' },
        { status: 410 }
      );
    }

    // Check if expired
    if (new Date(invite.expiresAt) < new Date()) {
      return NextResponse.json({ error: 'This invitation has expired' }, { status: 410 });
    }

    // Fetch inviter details
    const inviter = await prisma.user.findUnique({
      where: { id: invite.invitedBy },
      select: {
        name: true,
        email: true,
      },
    });

    return NextResponse.json({
      invite: {
        id: invite.id,
        email: invite.email,
        role: invite.role,
        expiresAt: invite.expiresAt.toISOString(),
        organization: invite.organization,
        inviter: inviter || { name: null, email: 'Unknown' },
      },
    });
  } catch (error: unknown) {
    logger.error('Failed to fetch invitation:', error);
    return NextResponse.json({ error: 'Failed to fetch invitation' }, { status: 500 });
  }
}
