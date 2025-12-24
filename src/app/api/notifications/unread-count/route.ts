/**
 * Unread Notifications Count
 * GET - Get count of unread notifications
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function GET(_req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const count = await prisma.notification.count({
      where: {
        userId: session.user.id,
        read: false,
      },
    });

    return NextResponse.json({ count });
  } catch (error: unknown) {
    logger.error('Failed to fetch unread count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
