/**
 * AI Cost Monitoring Dashboard
 *
 * Track spending, performance, and errors for AI API calls.
 * Essential for developers using Claude/OpenAI in production.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
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
import { Progress } from '@/components/ui/progress';
import { AreaChart } from '@/components/charts/area-chart';
import { BarChart } from '@/components/charts/bar-chart';
import { DollarSign, Activity, Zap, Clock, AlertTriangle, RefreshCw } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CostData {
  today: {
    cost: number;
    requests: number;
    successRate: number;
    avgDuration: number;
    tokens: number;
  };
  period: {
    cost: number;
    requests: number;
    successRate: number;
    avgDuration: number;
    tokens: number;
    days: number;
    label: string;
  };
  trend: Array<{
    date: string;
    cost: number;
    requests: number;
    errors: number;
  }>;
  features: Array<{
    feature: string;
    cost: number;
    requests: number;
    errors: number;
    tokens: number;
    successRate: number;
    avgCost: number;
    lastUsed: string;
  }>;
  models: Array<{
    model: string;
    cost: number;
    requests: number;
    tokens: number;
  }>;
  recentErrors: Array<{
    id: string;
    feature: string;
    model: string;
    error: string;
    timestamp: string;
  }>;
  budget: {
    daily: number;
    used: number;
    remaining: number;
    percentUsed: number;
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function formatTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default function AICostsPage() {
  const [data, setData] = useState<CostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<'7' | '14' | '30'>('7');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/ai/costs?days=${period}`);

      if (!response.ok) {
        throw new Error('Failed to fetch cost data');
      }

      const costData = await response.json();
      setData(costData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Failed to load AI cost data');
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading && !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <RefreshCw className="text-muted-foreground h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4">
        <AlertTriangle className="text-destructive h-12 w-12" />
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={fetchData}>&gt; RETRY</Button>
      </div>
    );
  }

  if (!data) return null;

  const budgetStatus =
    data.budget.percentUsed >= 90
      ? 'danger'
      : data.budget.percentUsed >= 70
        ? 'warning'
        : 'success';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">AI COSTS</h1>
          <p className="text-muted-foreground">
            Track spending and performance for Claude &amp; OpenAI API calls
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {(['7', '14', '30'] as const).map((p) => (
              <Button
                key={p}
                variant={period === p ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod(p)}
              >
                {p}D
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={cn('mr-2 h-4 w-4', loading && 'animate-spin')} />
            REFRESH
          </Button>
        </div>
      </div>

      {/* Budget Alert */}
      {data.budget.percentUsed >= 70 && (
        <div
          className={cn(
            'flex items-center gap-3 border p-4',
            mode.radius,
            budgetStatus === 'danger'
              ? 'border-destructive bg-destructive/10'
              : 'border-warning bg-warning/10'
          )}
        >
          <AlertTriangle
            className={cn(
              'h-5 w-5',
              budgetStatus === 'danger' ? 'text-destructive' : 'text-warning'
            )}
          />
          <div>
            <p className="text-sm font-medium">
              {budgetStatus === 'danger' ? 'BUDGET EXCEEDED' : 'APPROACHING BUDGET LIMIT'}
            </p>
            <p className="text-muted-foreground text-sm">
              {formatCurrency(data.budget.used)} of {formatCurrency(data.budget.daily)} daily budget
              used ({Math.round(data.budget.percentUsed)}%)
            </p>
          </div>
        </div>
      )}

      {/* Today's Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card tone="primary">
          <CardHeader code="0x01" title="TODAY'S COST" icon={<DollarSign className="h-4 w-4" />} />
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(data.today.cost)}</div>
            <div className="mt-2">
              <Progress
                value={Math.min(data.budget.percentUsed, 100)}
                className={cn(
                  'h-2',
                  budgetStatus === 'danger' && '[&>div]:bg-destructive',
                  budgetStatus === 'warning' && '[&>div]:bg-warning'
                )}
              />
              <p className="text-muted-foreground mt-1 text-xs">
                {formatCurrency(data.budget.remaining)} remaining
              </p>
            </div>
          </CardContent>
        </Card>

        <Card tone="neutral">
          <CardHeader
            code="0x02"
            title="REQUESTS"
            meta="Today"
            icon={<Activity className="h-4 w-4" />}
          />
          <CardContent>
            <div className="text-3xl font-bold">{formatNumber(data.today.requests)}</div>
            <p className="text-muted-foreground text-sm">
              {formatNumber(data.period.requests)} in {data.period.days}d
            </p>
          </CardContent>
        </Card>

        <Card tone={data.today.successRate >= 0.95 ? 'success' : 'warning'}>
          <CardHeader
            code="0x03"
            title="SUCCESS RATE"
            meta="Today"
            icon={<Zap className="h-4 w-4" />}
          />
          <CardContent>
            <div className="text-3xl font-bold">{(data.today.successRate * 100).toFixed(1)}%</div>
            <p className="text-muted-foreground text-sm">
              {(data.period.successRate * 100).toFixed(1)}% avg
            </p>
          </CardContent>
        </Card>

        <Card tone="neutral">
          <CardHeader
            code="0x04"
            title="AVG RESPONSE"
            meta="Today"
            icon={<Clock className="h-4 w-4" />}
          />
          <CardContent>
            <div className="text-3xl font-bold">{formatDuration(data.today.avgDuration)}</div>
            <p className="text-muted-foreground text-sm">
              {formatDuration(data.period.avgDuration)} avg
            </p>
          </CardContent>
        </Card>

        <Card tone="neutral">
          <CardHeader
            code="0x05"
            title="TOKENS"
            meta="Today"
            icon={<Activity className="h-4 w-4" />}
          />
          <CardContent>
            <div className="text-3xl font-bold">
              {data.today.tokens > 1000
                ? `${(data.today.tokens / 1000).toFixed(1)}k`
                : data.today.tokens}
            </div>
            <p className="text-muted-foreground text-sm">
              {data.period.tokens > 1000000
                ? `${(data.period.tokens / 1000000).toFixed(1)}M`
                : `${(data.period.tokens / 1000).toFixed(0)}k`}{' '}
              in {data.period.days}d
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Cost Trend */}
        <Card tone="neutral">
          <CardHeader code="0x06" title="COST TREND" meta={`Last ${period} days`} />
          <CardContent>
            {data.trend.length > 0 ? (
              <AreaChart
                data={data.trend.map((d) => ({
                  date: formatDate(d.date),
                  cost: d.cost,
                }))}
                xAxisKey="date"
                series={[{ dataKey: 'cost', name: 'Cost', color: 'var(--color-primary)' }]}
                height={200}
                yAxisFormatter={(value) => `$${value.toFixed(2)}`}
                tooltipFormatter={(value) => formatCurrency(value)}
              />
            ) : (
              <div className="text-muted-foreground flex h-[200px] items-center justify-center">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Requests by Day */}
        <Card tone="neutral">
          <CardHeader code="0x07" title="DAILY REQUESTS" meta={`Last ${period} days`} />
          <CardContent>
            {data.trend.length > 0 ? (
              <BarChart
                data={data.trend.map((d) => ({
                  date: formatDate(d.date),
                  requests: d.requests,
                }))}
                xAxisKey="date"
                series={[{ dataKey: 'requests', name: 'Requests', color: 'var(--color-primary)' }]}
                height={200}
                tooltipFormatter={(value) => formatNumber(value)}
              />
            ) : (
              <div className="text-muted-foreground flex h-[200px] items-center justify-center">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cost by Feature */}
      <Card tone="neutral">
        <CardHeader code="0x08" title="COST BY FEATURE" meta={`Last ${period} days`} />
        <CardContent>
          {data.features.length > 0 ? (
            <div className={cn('border', mode.radius)}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Requests</TableHead>
                    <TableHead className="text-right">Avg Cost</TableHead>
                    <TableHead className="text-right">Success</TableHead>
                    <TableHead className="text-right">Tokens</TableHead>
                    <TableHead>Last Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.features.map((feature) => (
                    <TableRow key={feature.feature}>
                      <TableCell className={cn('font-medium', mode.font)}>
                        {feature.feature}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(feature.cost)}
                      </TableCell>
                      <TableCell className="text-right">{formatNumber(feature.requests)}</TableCell>
                      <TableCell className="text-muted-foreground text-right">
                        {formatCurrency(feature.avgCost)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={feature.successRate >= 0.95 ? 'secondary' : 'destructive'}>
                          {(feature.successRate * 100).toFixed(0)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-right">
                        {feature.tokens > 1000
                          ? `${(feature.tokens / 1000).toFixed(1)}k`
                          : feature.tokens}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {getTimeAgo(feature.lastUsed)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-muted-foreground flex h-32 items-center justify-center">
              No feature data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Model Usage & Recent Errors */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Model Usage */}
        <Card tone="neutral">
          <CardHeader code="0x09" title="MODEL USAGE" meta={`Last ${period} days`} />
          <CardContent>
            {data.models.length > 0 ? (
              <div className="space-y-3">
                {data.models.map((model) => {
                  const percentage =
                    data.period.cost > 0 ? (model.cost / data.period.cost) * 100 : 0;
                  return (
                    <div key={model.model} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className={cn('truncate', mode.font)}>{model.model}</span>
                        <span className="font-semibold">{formatCurrency(model.cost)}</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="text-muted-foreground flex justify-between text-xs">
                        <span>{formatNumber(model.requests)} requests</span>
                        <span>
                          {model.tokens > 1000000
                            ? `${(model.tokens / 1000000).toFixed(1)}M`
                            : `${(model.tokens / 1000).toFixed(0)}k`}{' '}
                          tokens
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-muted-foreground flex h-32 items-center justify-center">
                No model data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Errors */}
        <Card tone="danger">
          <CardHeader
            code="0x0A"
            title="RECENT ERRORS"
            meta="Last 10"
            icon={<AlertTriangle className="h-4 w-4" />}
          />
          <CardContent>
            {data.recentErrors.length > 0 ? (
              <div className="space-y-3">
                {data.recentErrors.map((err) => (
                  <div key={err.id} className={cn('border-destructive/30 border p-3', mode.radius)}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className={cn('truncate text-xs', mode.font)}>{err.error}</p>
                        <div className="text-muted-foreground mt-1 flex gap-2 text-xs">
                          <span>{err.feature}</span>
                          <span>•</span>
                          <span>{err.model}</span>
                        </div>
                      </div>
                      <span className="text-muted-foreground text-xs whitespace-nowrap">
                        {formatTimestamp(err.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground flex h-32 items-center justify-center">
                <div className="text-center">
                  <Zap className="text-success mx-auto h-8 w-8" />
                  <p className="mt-2">No recent errors</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {data.period.requests === 0 && (
        <Card tone="neutral">
          <CardContent className="flex h-48 flex-col items-center justify-center">
            <Activity className="text-muted-foreground h-12 w-12" />
            <h3 className="mt-4 text-lg font-semibold">NO AI CALLS TRACKED</h3>
            <p className="text-muted-foreground mt-1 text-center text-sm">
              Start using the AICostTracker to track your Claude and OpenAI API costs.
              <br />
              Import from <code className={mode.font}>@/lib/ai</code> and wrap your API calls.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
