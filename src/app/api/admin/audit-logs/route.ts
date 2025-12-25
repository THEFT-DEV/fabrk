/**
 * Admin Audit Logs API
 * GET /api/admin/audit-logs - Query audit logs
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { queryAuditLogs, type AuditLogEntry } from '@/lib/security/audit-log';

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
    const severityParam = searchParams.get('severity');
    const limit = searchParams.get('limit');

    const filters: Parameters<typeof queryAuditLogs>[0] = {};
    if (severityParam && severityParam !== 'all') {
      filters.severity = severityParam as AuditLogEntry['severity'];
    }
    filters.limit = limit ? parseInt(limit, 10) : 50;

    const logs = await queryAuditLogs(filters);

    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Failed to query audit logs:', error);
    return NextResponse.json({ error: 'Failed to query audit logs' }, { status: 500 });
  }
}
