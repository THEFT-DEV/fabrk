/**
 * Pusher Channel Authorization Endpoint
 *
 * This endpoint handles authentication for private and presence channels.
 * It verifies the user session and authorizes access to channels.
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { authorizeChannel, isPusherEnabled } from '@/lib/pusher';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  // Check if Pusher is configured
  if (!isPusherEnabled()) {
    return NextResponse.json({ error: 'Real-time features not configured' }, { status: 503 });
  }

  // Verify user session
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Parse form data from Pusher client
    const formData = await request.formData();
    const socketId = formData.get('socket_id') as string;
    const channelName = formData.get('channel_name') as string;

    if (!socketId || !channelName) {
      return NextResponse.json({ error: 'Missing socket_id or channel_name' }, { status: 400 });
    }

    // Validate channel access
    const userId = session.user.id;

    // For private user channels, verify the user owns the channel
    if (channelName.startsWith('private-user-')) {
      const channelUserId = channelName.replace('private-user-', '');
      if (channelUserId !== userId) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }
    }

    // For organization channels, verify user is a member
    if (channelName.startsWith('private-org-')) {
      const orgId = channelName.replace('private-org-', '');
      const membership = await prisma.organizationMember.findFirst({
        where: {
          organizationId: orgId,
          userId: userId,
        },
      });
      if (!membership) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }
    }

    // Authorize the channel
    const authResponse = authorizeChannel(socketId, channelName, userId, {
      name: session.user.name || undefined,
      email: session.user.email || undefined,
    });

    if (!authResponse) {
      return NextResponse.json({ error: 'Authorization failed' }, { status: 500 });
    }

    return NextResponse.json(authResponse);
  } catch (error) {
    console.error('[Pusher Auth] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
