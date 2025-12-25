/**
 * ✅ FABRK COMPONENT
 * Metric Cards - Display key metrics with trend indicators
 */

import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export interface MetricData {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  status: string;
}

interface MetricCardsProps {
  metrics: MetricData[];
}

export function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.id} className="border-border bg-card border p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className={cn(mode.font, 'text-muted-foreground text-xs')}>[{metric.title}]:</div>
            <metric.icon className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="text-4xl font-semibold">{metric.value}</div>
          <div className={cn(mode.font, 'mt-2 flex items-center gap-2 text-xs')}>
            <span className={metric.trend === 'up' ? 'text-success' : 'text-destructive'}>
              {metric.trend === 'up' ? (
                <TrendingUp className="mr-1 inline h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 inline h-3 w-3" />
              )}
              {metric.change}
            </span>
            <span className="text-muted-foreground">
              STATUS:{' '}
              <span className={metric.trend === 'up' ? 'text-success' : 'text-destructive'}>
                {metric.status}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
