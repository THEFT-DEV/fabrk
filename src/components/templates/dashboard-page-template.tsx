/**
 * Dashboard Page Template
 *
 * Reusable template for overview/dashboard pages with stats grid and flexible content.
 * Provides consistent layout with header, stats, and main content areas.
 *
 * @example
 * ```tsx
 * <DashboardPageTemplate
 *   title="Overview"
 *   stats={[
 *     { label: "Total Users", value: "12,345", change: { value: 12, direction: "up" } },
 *     { label: "Revenue", value: "$45,231", change: { value: 8.2, direction: "up" } },
 *     { label: "Active Sessions", value: "1,234" },
 *     { label: "Conversion Rate", value: "3.2%", change: { value: -0.5, direction: "down" } },
 *   ]}
 *   actions={[
 *     { label: "Export", onClick: () => {} },
 *     { label: "Settings", onClick: () => {}, variant: "secondary" },
 *   ]}
 * >
 *   <div>Charts and content here</div>
 * </DashboardPageTemplate>
 * ```
 */

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export interface DashboardStat {
  /** Label text for the stat */
  label: string;
  /** Display value (pre-formatted) */
  value: string | number;
  /** Optional trend indicator */
  change?: {
    /** Percentage or absolute change value */
    value: number;
    /** Direction of change */
    direction: 'up' | 'down';
  };
  /** Optional icon to display */
  icon?: React.ReactNode;
}

export interface DashboardAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button variant */
  variant?: 'primary' | 'secondary';
}

export interface DashboardPageTemplateProps {
  // Required
  /** Page title displayed in the header */
  title: string;
  /** Main content (charts, tables, etc.) */
  children: React.ReactNode;

  // Stats row
  /** Stats to display in the grid */
  stats?: DashboardStat[];

  // Actions
  /** Header action buttons */
  actions?: DashboardAction[];

  // Optional features
  /** Show date range selector */
  dateRange?: boolean;
  /** Date range change handler */
  onDateRangeChange?: (range: { start: Date; end: Date }) => void;

  // Description
  /** Optional description below the title */
  description?: string;

  // Customization
  /** Additional className for the outer container */
  className?: string;
}

// =============================================================================
// STAT CARD COMPONENT
// =============================================================================

interface StatCardProps {
  stat: DashboardStat;
}

function StatCard({ stat }: StatCardProps) {
  const { label, value, change, icon } = stat;

  return (
    <div className={cn('border-border bg-card space-y-2 border p-4', mode.radius)}>
      {/* Header with label and icon */}
      <div className="flex items-center justify-between">
        <span className={cn('text-muted-foreground text-xs', mode.font)}>
          [{label.toUpperCase()}]:
        </span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>

      {/* Value */}
      <div className={cn('text-2xl font-semibold tracking-tight', mode.font)}>{value}</div>

      {/* Change indicator */}
      {change && (
        <div className="flex items-center gap-1">
          {change.direction === 'up' ? (
            <TrendingUp className="text-success h-4 w-4" />
          ) : (
            <TrendingDown className="text-destructive h-4 w-4" />
          )}
          <span
            className={cn(
              'text-xs',
              mode.font,
              change.direction === 'up' ? 'text-success' : 'text-destructive'
            )}
          >
            {change.direction === 'up' ? '+' : '-'}
            {Math.abs(change.value)}%
          </span>
          <span className={cn('text-muted-foreground text-xs', mode.font)}>from last period</span>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// DATE RANGE SELECTOR COMPONENT
// =============================================================================

function DateRangeSelector() {
  return (
    <Button variant="outline" size="sm">
      <Calendar className="mr-2 h-4 w-4" />
      Last 30 days
    </Button>
  );
}

// =============================================================================
// COMPONENT
// =============================================================================

export function DashboardPageTemplate({
  title,
  children,
  stats,
  actions,
  dateRange = false,
  description,
  className,
}: DashboardPageTemplateProps) {
  return (
    <div className={cn('mx-auto max-w-6xl space-y-6', className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className={cn('text-4xl font-semibold tracking-tight', mode.font)}>{title}</h1>
          {description && (
            <p className={cn('text-muted-foreground text-sm', mode.font)}>{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {dateRange && <DateRangeSelector />}
          {actions?.map((action, index) => (
            <Button
              key={index}
              variant={action.variant === 'secondary' ? 'outline' : 'default'}
              onClick={action.onClick}
            >
              &gt; {action.label.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6">{children}</div>
    </div>
  );
}

export default DashboardPageTemplate;
