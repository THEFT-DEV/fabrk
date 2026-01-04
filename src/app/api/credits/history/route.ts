/**
 * Credit History API
 * GET /api/credits/history - Get credit transaction history
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getTransactionHistory, getUsageStats, getTotalUsage } from '@/lib/credits';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const includeStats = searchParams.get('stats') === 'true';
    const days = parseInt(searchParams.get('days') || '30');

    const transactions = await getTransactionHistory(session.user.id, {
      type,
      limit,
      offset,
    });

    const response: {
      transactions: typeof transactions;
      stats?: Awaited<ReturnType<typeof getUsageStats>>;
      totalUsage?: number;
    } = { transactions };

    if (includeStats) {
      response.stats = await getUsageStats(session.user.id, days);
      response.totalUsage = await getTotalUsage(session.user.id, days);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}
