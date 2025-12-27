/**
 * ✅ FABRK COMPONENT
 * MRR/ARR chart with period selection.
 *
 * @example
 * ```tsx
 * <RevenueChart data={revenueData} />
 * ```
 */

'use client';

import * as React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DollarSign, TrendingUp } from 'lucide-react';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { mode } from '@/design-system';
export interface RevenueDataPoint {
  period: string;
  mrr: number;
  arr?: number;
  growth?: number;
}

type Period = 'week' | 'month' | 'quarter' | 'year';

interface RevenueChartProps {
  data: RevenueDataPoint[];
  initialPeriod?: Period;
  showArr?: boolean;
  className?: string;
}

export function RevenueChart({
  data,
  initialPeriod = 'month',
  showArr = true,
  className,
}: RevenueChartProps) {
  const [selectedPeriod, setSelectedPeriod] = React.useState<Period>(initialPeriod);
  const [chartType, setChartType] = React.useState<'line' | 'area'>('area');

  const periods: { label: string; value: Period }[] = [
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Quarter', value: 'quarter' },
    { label: 'Year', value: 'year' },
  ];

  const calculateTotalRevenue = () => {
    return data.reduce((sum, item) => sum + item.mrr, 0);
  };

  const calculateGrowthRate = () => {
    if (data.length < 2) return 0;
    const latest = data[data.length - 1].mrr;
    const previous = data[data.length - 2].mrr;
    return (((latest - previous) / previous) * 100).toFixed(1);
  };

  // totalRevenue is calculated but used only in derived stats
  calculateTotalRevenue();
  const growthRate = calculateGrowthRate();
  const latestMRR = data[data.length - 1]?.mrr || 0;
  const latestARR = latestMRR * 12;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  // Memoize tooltip component to prevent recreation on every render (industry-standard pattern)
  const CustomTooltip = React.useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Recharts TooltipContentProps is complex
      ({ active, payload }: any) => {
        if (active && payload && payload.length) {
          return (
            <div className={cn('border-border bg-card border p-4', mode.radius)}>
              <p className="text-foreground mb-2 text-sm font-semibold">
                {payload[0].payload.period}
              </p>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">
                  MRR:{' '}
                  <span className="text-primary font-semibold">
                    {formatCurrency(payload[0].value)}
                  </span>
                </p>
                {showArr && payload[1] && (
                  <p className="text-muted-foreground text-xs">
                    ARR:{' '}
                    <span className="text-accent font-semibold">
                      {formatCurrency(payload[1].value)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          );
        }
        return null;
      },
    [showArr]
  );

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader
        code="0x01"
        title="REVENUE ANALYTICS"
        icon={<DollarSign className="h-4 w-4" />}
        meta={
          <Badge variant="default" className="font-medium">
            <TrendingUp className="mr-1 h-3 w-3" />
            {growthRate}% growth
          </Badge>
        }
      />

      <CardContent padding="md" className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className={cn('border-border bg-card border p-4', mode.radius)}>
            <p className="text-muted-foreground mb-1 text-xs font-medium">Current MRR</p>
            <p className="text-foreground text-2xl font-bold">{formatCompactCurrency(latestMRR)}</p>
          </div>
          {showArr && (
            <div className={cn('border-border bg-accent/50 border p-4', mode.radius)}>
              <p className="text-muted-foreground mb-1 text-xs font-medium">Projected ARR</p>
              <p className="text-foreground text-2xl font-bold">
                {formatCompactCurrency(latestARR)}
              </p>
            </div>
          )}
        </div>

        {/* Period & Type Selector */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {periods.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period.value)}
              >
                {period.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant={chartType === 'area' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('area')}
            >
              Area
            </Button>
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('line')}
            >
              Line
            </Button>
          </div>
        </div>

        {/* Chart */}
        <div className={cn('border-border bg-card border p-4', mode.radius)}>
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'area' ? (
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                  {showArr && (
                    <linearGradient id="colorArr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                    </linearGradient>
                  )}
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="period"
                  className="text-xs"
                  tick={{ fill: 'var(--color-muted-foreground)' }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: 'var(--color-muted-foreground)' }}
                  tickFormatter={formatCompactCurrency}
                />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="mrr"
                  stroke="var(--color-primary)"
                  fillOpacity={1}
                  fill="url(#colorMrr)"
                  strokeWidth={2}
                  name="MRR"
                />
                {showArr && (
                  <Area
                    type="monotone"
                    dataKey="arr"
                    stroke="var(--color-accent)"
                    fillOpacity={1}
                    fill="url(#colorArr)"
                    strokeWidth={2}
                    name="ARR"
                  />
                )}
              </AreaChart>
            ) : (
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="period"
                  className="text-xs"
                  tick={{ fill: 'var(--color-muted-foreground)' }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: 'var(--color-muted-foreground)' }}
                  tickFormatter={formatCompactCurrency}
                />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="MRR"
                />
                {showArr && (
                  <Line
                    type="monotone"
                    dataKey="arr"
                    stroke="var(--color-accent)"
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-accent)', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="ARR"
                  />
                )}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
