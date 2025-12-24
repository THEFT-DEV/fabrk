'use client';

/**
 * Usage Chart Component
 * Displays credit usage over time as a bar chart
 */

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface UsageData {
  date: string;
  credits: number;
}

interface UsageChartProps {
  data: UsageData[];
  className?: string;
}

export function UsageChart({ data, className }: UsageChartProps) {
  const maxCredits = Math.max(...data.map((d) => d.credits), 1);

  // Show last 14 days for better visibility
  const recentData = data.slice(-14);

  return (
    <div className={cn('space-y-4', mode.font, className)}>
      <div className="flex h-32 items-end gap-1">
        {recentData.map((day) => {
          const height = (day.credits / maxCredits) * 100;
          const date = new Date(day.date);
          const dayLabel = date.getDate();

          return (
            <div key={day.date} className="group relative flex flex-1 flex-col items-center">
              <div
                className={cn(
                  'min-h-[2px] w-full transition-all',
                  mode.radius,
                  day.credits > 0 ? mode.color.bg.accent : mode.color.bg.muted
                )}
                style={{ height: `${Math.max(height, 2)}%` }}
              />
              <span className={cn('mt-1 text-xs', mode.color.text.muted)}>{dayLabel}</span>

              {/* Tooltip on hover */}
              <div
                className={cn(
                  'absolute -top-8 left-1/2 hidden -translate-x-1/2 border px-2 py-1 text-xs group-hover:block',
                  mode.color.bg.elevated,
                  mode.color.border.default
                )}
              >
                {day.credits}
              </div>
            </div>
          );
        })}
      </div>

      <div className={cn('flex justify-between text-xs', mode.color.text.muted)}>
        <span>14 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
