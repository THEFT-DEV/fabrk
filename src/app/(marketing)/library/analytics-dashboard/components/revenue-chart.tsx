/**
 * ✅ FABRK COMPONENT
 * Revenue Chart - Terminal-style bar chart
 */
'use client';

import { useState, type CSSProperties, type MouseEvent } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  height: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const avgRevenue = Math.round(data.reduce((sum, d) => sum + d.revenue, 0) / data.length);
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const growthRate = (
    ((data[data.length - 1].revenue - data[0].revenue) / data[0].revenue) *
    100
  ).toFixed(1);

  const handleMouseMove = (e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <Card className="lg:col-span-4">
      <CardHeader code="0x00" title="REVENUE CHART" />
      <CardContent>
        <div className={cn(mode.font, 'mb-4 text-xs', mode.color.text.muted)}>
          [REVENUE OVERVIEW]: PERIOD=6_MONTHS
        </div>

        {/* Bar Chart */}
        <div className="relative pl-10">
          {/* Y-axis labels */}
          <div
            className={cn(
              mode.font,
              'absolute top-0 bottom-6 left-0 flex flex-col justify-between text-xs',
              mode.color.text.muted
            )}
          >
            <span>$60k</span>
            <span>$40k</span>
            <span>$20k</span>
            <span>$0</span>
          </div>

          {/* Chart area */}
          <div
            className={cn(
              'relative flex h-52 items-end justify-between gap-2 border',
              mode.color.border.default
            )}
          >
            {data.map((dataPoint, i) => (
              <div key={i} className="relative flex h-full flex-1 items-end justify-center">
                <div
                  className={cn(
                    'h-(--height) w-full max-w-12 cursor-pointer transition-colors',
                    mode.color.bg.accent,
                    mode.state.hover.bg
                  )}
                  style={
                    {
                      '--height': `${dataPoint.height}%`,
                    } as CSSProperties
                  }
                  role="button" // Add role for accessibility as it's an interactive element
                  tabIndex={0} // Make it focusable
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                  onMouseMove={handleMouseMove}
                />
              </div>
            ))}
            {hoveredBar !== null && (
              <div
                className={cn(
                  'border-border bg-card pointer-events-none fixed top-(--y) left-(--x) z-50 border px-2 py-1 text-xs whitespace-nowrap',
                  mode.font
                )}
                style={
                  {
                    '--x': `${mousePos.x + 10}px`,
                    '--y': `${mousePos.y + 10}px`,
                  } as CSSProperties
                }
              >
                <div className={mode.color.text.muted}>{data[hoveredBar].month}</div>
                <div className={cn('font-semibold', mode.color.text.accent)}>
                  ${data[hoveredBar].revenue.toLocaleString()}
                </div>
              </div>
            )}
          </div>

          {/* X-axis labels */}
          <div className="mt-2 flex justify-between gap-2">
            {data.map((dataPoint, i) => (
              <div
                key={i}
                className={cn(mode.font, 'flex-1 text-center text-xs', mode.color.text.muted)}
              >
                {dataPoint.month}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div
          className={cn(
            mode.font,
            'mt-4 grid grid-cols-3 gap-4 border-t pt-4 text-xs',
            mode.color.border.default
          )}
        >
          <div>
            <span className={mode.color.text.muted}>[AVG]:</span>{' '}
            <span className={mode.color.text.primary}>${avgRevenue.toLocaleString()}</span>
          </div>
          <div>
            <span className={mode.color.text.muted}>[MAX]:</span>{' '}
            <span className={mode.color.text.primary}>${maxRevenue.toLocaleString()}</span>
          </div>
          <div>
            <span className={mode.color.text.muted}>[GROWTH]:</span>{' '}
            <span className={mode.color.text.success}>+{growthRate}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
