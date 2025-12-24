/**
 * Admin Security Logs
 * View and analyze security events
 */

'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertTriangle, CheckCircle, Info, XCircle, Shield } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Type definition for audit log entries (matches server type)
interface AuditLogEntry {
  id: string;
  timestamp: Date;
  eventType: string;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  resource?: string;
  action: string;
  result: 'success' | 'failure' | 'error';
  metadata?: Record<string, unknown>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  hash?: string;
}

interface SecuritySummary {
  totalEvents: number;
  byType: Record<string, number>;
  bySeverity: Record<string, number>;
  criticalEvents: AuditLogEntry[];
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date(date));
}

function getSeverityColor(severity: string): 'destructive' | 'default' | 'secondary' | 'outline' {
  switch (severity) {
    case 'critical':
      return 'destructive';
    case 'high':
      return 'destructive';
    case 'medium':
      return 'default';
    case 'low':
      return 'secondary';
    default:
      return 'outline';
  }
}

function getResultIcon(result: string): React.JSX.Element {
  switch (result) {
    case 'success':
      return <CheckCircle className="text-success h-4 w-4" />;
    case 'failure':
      return <XCircle className="text-destructive h-4 w-4" />;
    case 'error':
      return <AlertTriangle className="text-warning h-4 w-4" />;
    default:
      return <Info className="text-info h-4 w-4" />;
  }
}

export default function AdminSecurityPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string | undefined>();
  const [summary, setSummary] = useState<SecuritySummary>();

  useEffect(() => {
    // Load logs - use startTransition for non-urgent updates
    startTransition(() => {
      const loadData = async () => {
        try {
          // Fetch logs from API
          const logsParams = new URLSearchParams();
          if (severityFilter && severityFilter !== 'all') {
            logsParams.set('severity', severityFilter);
          }
          logsParams.set('limit', '50');

          const logsResponse = await fetch(`/api/admin/audit-logs?${logsParams}`);
          if (logsResponse.ok) {
            const logsData = await logsResponse.json();
            setLogs(logsData.logs || []);
          }

          // Fetch summary from API (last 7 days)
          const summaryResponse = await fetch('/api/admin/audit-logs/summary?days=7');
          if (summaryResponse.ok) {
            const summaryData = await summaryResponse.json();
            setSummary(summaryData.summary);
          }
        } catch (error) {
          console.error('Failed to load audit data:', error);
        }
      };

      loadData();
    });
  }, [severityFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Security Logs</h1>
        <p className="text-muted-foreground">Monitor security events and audit logs</p>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card tone="neutral">
            <CardHeader
              code="0x01"
              title="TOTAL EVENTS"
              meta="7d"
              icon={<Info className="h-4 w-4" />}
            />
            <CardContent>
              <div className="text-2xl font-semibold">{summary.totalEvents}</div>
            </CardContent>
          </Card>

          <Card tone="danger">
            <CardHeader code="0x02" title="CRITICAL" icon={<AlertTriangle className="h-4 w-4" />} />
            <CardContent>
              <div className="text-2xl font-semibold">{summary.bySeverity.critical || 0}</div>
            </CardContent>
          </Card>

          <Card tone="warning">
            <CardHeader code="0x03" title="HIGH" icon={<AlertTriangle className="h-4 w-4" />} />
            <CardContent>
              <div className="text-2xl font-semibold">{summary.bySeverity.high || 0}</div>
            </CardContent>
          </Card>

          <Card tone="neutral">
            <CardHeader code="0x04" title="MEDIUM" icon={<Info className="h-4 w-4" />} />
            <CardContent>
              <div className="text-2xl font-semibold">{summary.bySeverity.medium || 0}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Logs Table */}
      <Card tone="neutral">
        <div className="border-border flex items-center justify-between border-b px-4 py-2">
          <CardHeader
            code="0x05"
            title="RECENT SECURITY EVENTS"
            meta="Last 50 events"
            icon={<Shield className="h-4 w-4" />}
            className="border-0 p-0"
          />
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardContent>
          <div className={cn('border', mode.radius)}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-muted-foreground text-center">
                      No security events found
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-muted-foreground text-xs">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell className={cn('text-xs', mode.font)}>{log.eventType}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="text-sm">
                        {log.userEmail || log.userId || '—'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getResultIcon(log.result)}
                          <span className="text-sm capitalize">{log.result}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getSeverityColor(log.severity)}
                          className="w-24 justify-center font-semibold"
                        >
                          {log.severity}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
