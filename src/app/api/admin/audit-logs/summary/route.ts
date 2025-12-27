/**
 * Admin Security Summary API
 * GET /api/admin/audit-logs/summary - Get security summary
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getSecuritySummary } from '@/lib/security/audit-log';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check admin role
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const days = searchParams.get('days');
    const since = new Date(Date.now() - (days ? parseInt(days, 10) : 7) * 24 * 60 * 60 * 1000);

    const summary = await getSecuritySummary(since);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Failed to get security summary:', error);
    return NextResponse.json({ error: 'Failed to get security summary' }, { status: 500 });
  }
}
