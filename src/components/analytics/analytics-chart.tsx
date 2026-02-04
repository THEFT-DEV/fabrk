/**
 * ✅ FABRK COMPONENT
 * Recharts wrapper with multiple chart types (line, bar, area, pie).
 *
 * @example
 * ```tsx
 * <AnalyticsChart
 *   type="line"
 *   data={chartData}
 *   xKey="month"
 *   yKeys={["revenue", "profit"]}
 * />
 * ```
 */

'use client';

import * as React from 'react';
import {
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  Line,
  Bar,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BarChart3 } from 'lucide-react';

export type ChartType = 'line' | 'bar' | 'area' | 'pie';

export interface ChartDataPoint {
  [key: string]: string | number;
}

interface AnalyticsChartProps {
  type: ChartType;
  data: ChartDataPoint[];
  xKey?: string;
  yKeys?: string[];
  title?: string;
  description?: string;
  colors?: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
}

const DEFAULT_COLORS = [
  'var(--color-primary)',
  'var(--color-accent)',
  'var(--color-chart-6)',
  'var(--color-chart-7)',
  'var(--color-chart-8)',
  'var(--color-chart-9)',
];

export function AnalyticsChart({
  type,
  data,
  xKey = 'name',
  yKeys = ['value'],
  title,
  description,
  colors = DEFAULT_COLORS,
  height = 300,
  showGrid = true,
  showLegend = true,
  className,
}: AnalyticsChartProps) {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
              <XAxis
                dataKey={xKey}
                className="text-muted-foreground text-xs"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis
                className="text-muted-foreground text-xs"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                }}
              />
              {showLegend && <Legend />}
              {yKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: colors[index % colors.length], r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
              <XAxis
                dataKey={xKey}
                className="text-muted-foreground text-xs"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis
                className="text-muted-foreground text-xs"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                }}
              />
              {showLegend && <Legend />}
              {yKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
              <XAxis
                dataKey={xKey}
                className="text-muted-foreground text-xs"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis
                className="text-muted-foreground text-xs"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                }}
              />
              {showLegend && <Legend />}
              {yKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="var(--color-primary)"
                dataKey={yKeys[0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                }}
              />
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      {(title || description) && (
        <CardHeader
          code="0x03"
          title={title ? title.toUpperCase() : 'ANALYTICS'}
          icon={<BarChart3 className="h-4 w-4" />}
        />
      )}
      <CardContent padding="md">
        {description && <p className="text-muted-foreground mb-4 text-sm">{description}</p>}
        {renderChart()}
      </CardContent>
    </Card>
  );
}
