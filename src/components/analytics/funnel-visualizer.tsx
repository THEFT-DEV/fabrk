/**
 * ✅ FABRK COMPONENT
 * Conversion funnel visualization component.
 *
 * @example
 * ```tsx
 * <FunnelVisualizer
 *   stages={[
 *     { name: "Visitors", value: 10000 },
 *     { name: "Sign Ups", value: 2500 },
 *     { name: "Conversions", value: 500 }
 *   ]}
 * />
 * ```
 */

'use client';

import * as React from 'react';
import { TrendingDown } from 'lucide-react';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { mode } from '@/design-system';
export interface FunnelStage {
  name: string;
  value: number;
  color?: string;
}

interface FunnelVisualizerProps {
  stages: FunnelStage[];
  title?: string;
  description?: string;
  className?: string;
}

const DEFAULT_COLORS = [
  'var(--color-primary)',
  'var(--color-chart-6)',
  'var(--color-chart-7)',
  'var(--color-chart-8)',
  'var(--color-chart-9)',
];

export function FunnelVisualizer({
  stages,
  title = 'Conversion Funnel',
  description,
  className,
}: FunnelVisualizerProps) {
  const maxValue = Math.max(...stages.map((s) => s.value));

  const calculateConversionRate = (currentValue: number, previousValue: number | null) => {
    if (!previousValue) return 100;
    return ((currentValue / previousValue) * 100).toFixed(1);
  };

  const calculateDropOff = (currentValue: number, previousValue: number | null) => {
    if (!previousValue) return 0;
    return (((previousValue - currentValue) / previousValue) * 100).toFixed(1);
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader
        code="0x02"
        title={title.toUpperCase()}
        icon={<TrendingDown className="h-4 w-4" />}
        meta={`${stages.length} Stages`}
      />

      <CardContent padding="md" className="space-y-6">
        {description && <p className={cn('text-sm', mode.color.text.muted)}>{description}</p>}
        {stages.map((stage, index) => {
          const previousValue = index > 0 ? stages[index - 1].value : null;
          const conversionRate = calculateConversionRate(stage.value, previousValue);
          const dropOff = calculateDropOff(stage.value, previousValue);
          const widthPercentage = (stage.value / maxValue) * 100;
          const color = stage.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];

          return (
            <div key={index} className="space-y-2">
              {/* Stage Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn('h-3 w-3 border', mode.color.border.default, mode.radius)}
                      style={{ backgroundColor: color }}
                    />
                    <span className={cn('text-sm font-semibold', mode.color.text.primary)}>
                      {stage.name}
                    </span>
                  </div>
                  {index > 0 && (
                    <Badge variant="secondary" className="text-xs font-medium">
                      {conversionRate}% conversion
                    </Badge>
                  )}
                </div>
                <span className={cn('text-sm font-bold', mode.color.text.primary)}>
                  {stage.value.toLocaleString()}
                </span>
              </div>

              {/* Funnel Bar */}
              <div className="relative">
                <div
                  className={cn(
                    'h-12 border transition-all duration-500 ease-out',
                    mode.color.border.default,
                    mode.radius
                  )}
                  style={{
                    width: `${widthPercentage}%`,
                    backgroundColor: color,
                    opacity: 1 - index * 0.1,
                  }}
                />
              </div>

              {/* Drop-off indicator */}
              {index > 0 && previousValue && (
                <div className={cn('flex items-center gap-2 pl-2 text-xs', mode.color.text.muted)}>
                  <TrendingDown className={cn('h-3 w-3', mode.color.text.danger)} />
                  <span>
                    {(previousValue - stage.value).toLocaleString()} drop-off ({dropOff}%)
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Overall Conversion */}
        <div className={cn('border-t pt-4', mode.color.border.default)}>
          <div className={cn('bg-accent/50 flex items-center justify-between p-4', mode.radius)}>
            <span className={cn('text-sm font-medium', mode.color.text.primary)}>
              Overall Conversion Rate
            </span>
            <span className={cn('text-2xl font-bold', mode.color.text.accent)}>
              {((stages[stages.length - 1].value / stages[0].value) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
