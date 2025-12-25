/**
 * Admin Audit Log Viewer
 * Immutable audit trail of sensitive operations
 */

import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Shield, User, Building, Key, Flag } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

async function getAuditLogs() {
  const logs = await prisma.auditLog.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 100, // Show last 100 audit logs
  });

  return logs;
}

function getActionIcon(action: string) {
  if (action.startsWith('user.')) return <User className="h-4 w-4" />;
  if (action.startsWith('org.')) return <Building className="h-4 w-4" />;
  if (action.startsWith('api_key.')) return <Key className="h-4 w-4" />;
  if (action.startsWith('feature_flag.')) return <Flag className="h-4 w-4" />;
  return <Shield className="h-4 w-4" />;
}

function getActionBadgeVariant(action: string): 'default' | 'outline' | 'secondary' {
  if (action.includes('deleted') || action.includes('removed')) return 'outline';
  if (action.includes('created') || action.includes('added')) return 'default';
  return 'secondary';
}

async function AuditLogTable() {
  const logs = await getAuditLogs();

  if (logs.length === 0) {
    return (
      <div className="text-muted-foreground flex h-48 items-center justify-center">
        No audit logs found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Timestamp</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className={cn('text-xs', mode.font)}>
                {format(new Date(log.createdAt), 'yyyy-MM-dd HH:mm:ss')}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{log.user.name || 'Unknown'}</span>
                  <span className="text-muted-foreground text-xs">{log.user.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getActionIcon(log.action)}
                  <Badge
                    variant={getActionBadgeVariant(log.action)}
                    className="w-24 justify-center font-semibold"
                  >
                    {log.action.replace(/\./g, ' ').toUpperCase()}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                {log.resource && (
                  <div className="flex flex-col">
                    <span className="text-sm capitalize">{log.resource}</span>
                    {log.resourceId && (
                      <span className={cn('text-muted-foreground text-xs', mode.font)}>
                        {log.resourceId.substring(0, 16)}...
                      </span>
                    )}
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                {log.metadata && (
                  <details className="cursor-pointer">
                    <summary className="text-primary text-sm hover:underline">
                      View metadata
                    </summary>
                    <pre className="bg-muted mt-2 max-w-md overflow-x-auto rounded p-2 text-left text-xs">
                      {JSON.stringify(log.metadata, null, 2)}
                    </pre>
                  </details>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Audit Log</h1>
        <p className="text-muted-foreground">
          Immutable audit trail of all sensitive operations (showing last 100 entries)
        </p>
      </div>

      <Card tone="neutral">
        <CardHeader
          code="0x01"
          title="SECURITY EVENTS"
          meta="Immutable logs"
          icon={<Shield className="h-4 w-4" />}
        />
        <CardContent>
          <Suspense
            fallback={
              <div className="flex h-48 items-center justify-center">
                <div className="text-muted-foreground">Loading audit logs...</div>
              </div>
            }
          >
            <AuditLogTable />
          </Suspense>
        </CardContent>
      </Card>

      <div className={cn('border-warning/20 bg-warning/10 border p-4', mode.radius)}>
        <h3 className="text-warning dark:text-warning mb-2 flex items-center gap-2 font-semibold">
          <Shield className="h-4 w-4" />
          Security Notice
        </h3>
        <p className="text-muted-foreground text-sm">
          Audit logs are immutable and cannot be deleted. They are retained indefinitely for
          security compliance. Logs include user actions, impersonation events, role changes,
          organization modifications, and feature flag updates.
        </p>
      </div>
    </div>
  );
}
