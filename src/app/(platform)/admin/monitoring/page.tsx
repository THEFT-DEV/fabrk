/**
 * Admin Monitoring Dashboard
 * View errors and performance metrics
 */

'use client';

import { useState, useEffect, startTransition } from 'react';
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
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { getErrorStats, getPerformanceStats, clearErrorLogs } from '@/lib/monitoring';
import { AlertTriangle, Activity, Trash2, TrendingUp } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date(date));
}

export default function AdminMonitoringPage() {
  const [errorStats, setErrorStats] = useState<ReturnType<typeof getErrorStats>>();
  const [perfStats, setPerformanceStats] = useState<ReturnType<typeof getPerformanceStats>>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [clearLogsDialogOpen, setClearLogsDialogOpen] = useState(false);

  useEffect(() => {
    // Load stats (last 24 hours) - use startTransition for non-urgent updates
    startTransition(() => {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const errors = getErrorStats(since);
      const perf = getPerformanceStats(since);

      setErrorStats(errors);
      setPerformanceStats(perf);
    });
  }, [refreshKey]);

  const confirmClearLogs = () => {
    setClearLogsDialogOpen(false);
    clearErrorLogs();
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Monitoring</h1>
          <p className="text-muted-foreground">Error tracking and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setRefreshKey((k) => k + 1)}>
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setClearLogsDialogOpen(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Logs
          </Button>
        </div>
      </div>

      {/* Error Stats */}
      {errorStats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card tone="neutral">
            <CardHeader
              code="0x01"
              title="TOTAL ERRORS"
              meta="24h"
              icon={<AlertTriangle className="h-4 w-4" />}
            />
            <CardContent>
              <div className="text-2xl font-semibold">{errorStats.total}</div>
            </CardContent>
          </Card>

          <Card tone="danger">
            <CardHeader code="0x02" title="ERRORS" icon={<AlertTriangle className="h-4 w-4" />} />
            <CardContent>
              <div className="text-2xl font-semibold">{errorStats.byType.error || 0}</div>
            </CardContent>
          </Card>

          <Card tone="warning">
            <CardHeader code="0x03" title="WARNINGS" icon={<AlertTriangle className="h-4 w-4" />} />
            <CardContent>
              <div className="text-2xl font-semibold">{errorStats.byType.warning || 0}</div>
            </CardContent>
          </Card>

          <Card tone="neutral">
            <CardHeader code="0x04" title="INFO" icon={<Activity className="h-4 w-4" />} />
            <CardContent>
              <div className="text-2xl font-semibold">{errorStats.byType.info || 0}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Performance Metrics */}
      {perfStats && Object.keys(perfStats.averages).length > 0 && (
        <Card tone="primary">
          <CardHeader
            code="0x05"
            title="PERFORMANCE METRICS"
            meta="24h averages"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(perfStats.averages).map(([name, value]) => (
                <div
                  key={name}
                  className={cn('flex items-center justify-between border p-4', mode.radius)}
                >
                  <div>
                    <div className="text-sm font-medium capitalize">{name.replace(/_/g, ' ')}</div>
                    <div className="text-2xl font-semibold">{value}ms</div>
                  </div>
                  <Activity className="text-muted-foreground h-8 w-8" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Errors */}
      {errorStats && errorStats.topErrors.length > 0 && (
        <Card tone="danger">
          <CardHeader
            code="0x06"
            title="MOST FREQUENT ERRORS"
            meta="By occurrence"
            icon={<AlertTriangle className="h-4 w-4" />}
          />
          <CardContent>
            <div className={cn('border', mode.radius)}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Error Message</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Last Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorStats.topErrors.map((error) => (
                    <TableRow key={error.id}>
                      <TableCell className={cn('max-w-md truncate text-xs', mode.font)}>
                        {error.message}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            error.type === 'error'
                              ? 'default'
                              : error.type === 'warning'
                                ? 'accent'
                                : 'secondary'
                          }
                        >
                          {error.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{error.count || 1}x</TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {formatDate(error.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Errors */}
      {errorStats && errorStats.recentErrors.length > 0 && (
        <Card tone="warning">
          <CardHeader
            code="0x07"
            title="RECENT ERRORS"
            meta="Last 20 events"
            icon={<Activity className="h-4 w-4" />}
          />
          <CardContent>
            <div className={cn('border', mode.radius)}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Component</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorStats.recentErrors.map((error) => (
                    <TableRow key={error.id}>
                      <TableCell className="text-muted-foreground text-xs">
                        {formatDate(error.timestamp)}
                      </TableCell>
                      <TableCell className={cn('max-w-md truncate text-xs', mode.font)}>
                        {error.message}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            error.type === 'error'
                              ? 'default'
                              : error.type === 'warning'
                                ? 'accent'
                                : 'secondary'
                          }
                        >
                          {error.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{error.context?.component || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {errorStats && errorStats.total === 0 && (
        <Card tone="success">
          <CardContent className="flex h-48 items-center justify-center">
            <div className="text-center">
              <Activity className="text-muted-foreground mx-auto h-12 w-12" />
              <h3 className="mt-4 text-sm font-semibold">No errors recorded</h3>
              <p className="text-muted-foreground text-sm">Your application is running smoothly</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clear Logs Dialog */}
      <AlertDialog open={clearLogsDialogOpen} onOpenChange={setClearLogsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Error Logs?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all error logs and
              performance metrics from the monitoring system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmClearLogs}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Clear All Logs
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
