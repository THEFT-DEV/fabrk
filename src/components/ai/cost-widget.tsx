/**
 * AI Cost Widget Components
 *
 * Ready-to-use components for displaying AI costs in your app.
 *
 * @example
 * // Compact badge for headers
 * <CostBadge />
 *
 * // Full widget for dashboards
 * <CostWidget />
 *
 * // Inline cost display
 * <InlineCost />
 */

'use client';

import { useCostTracking, useCostBudget } from '@/hooks/use-cost-tracking';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// ============================================================================
// COST BADGE - Compact for headers/navbars
// ============================================================================

interface CostBadgeProps {
  /** Show warning colors when approaching budget */
  showWarning?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Compact cost badge for headers/navigation
 *
 * @example
 * <nav>
 *   <CostBadge />
 * </nav>
 */
export function CostBadge({ showWarning = true, className }: CostBadgeProps) {
  const { percentUsed, status, isLoading } = useCostBudget();

  if (isLoading) {
    return (
      <Badge variant="secondary" className={cn('animate-pulse', className)}>
        <DollarSign className="mr-1 h-3 w-3" />
        ...
      </Badge>
    );
  }

  const variant = showWarning
    ? status === 'danger'
      ? 'destructive'
      : status === 'warning'
        ? 'accent'
        : 'secondary'
    : 'secondary';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={variant} className={className}>
            <DollarSign className="mr-1 h-3 w-3" />
            {percentUsed.toFixed(0)}%
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>AI Budget: {percentUsed.toFixed(1)}% used today</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ============================================================================
// COST WIDGET - Full dashboard widget
// ============================================================================

interface CostWidgetProps {
  /** Show feature breakdown */
  showFeatures?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Full cost widget for dashboards
 *
 * @example
 * <div className="grid gap-4">
 *   <CostWidget showFeatures />
 * </div>
 */
export function CostWidget({ showFeatures = false, className }: CostWidgetProps) {
  const {
    todaysCost,
    budget,
    percentUsed,
    withinBudget,
    remaining,
    featureCosts,
    requestCount,
    successRate,
    isLoading,
    error,
  } = useCostTracking();

  if (error) {
    return (
      <Card tone="danger" className={className}>
        <CardContent className="flex items-center gap-2 py-4">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">Failed to load cost data</span>
        </CardContent>
      </Card>
    );
  }

  const budgetStatus =
    percentUsed >= 90 ? 'danger' : percentUsed >= 70 ? 'warning' : 'success';

  return (
    <Card
      tone={budgetStatus === 'danger' ? 'danger' : budgetStatus === 'warning' ? 'warning' : 'neutral'}
      className={className}
    >
      <CardHeader
        code="AI"
        title="AI COSTS"
        meta="Today"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <CardContent className="space-y-4">
        {/* Cost Display */}
        <div className="flex items-end justify-between">
          <div>
            <div className={cn('text-3xl font-bold', isLoading && 'animate-pulse')}>
              ${todaysCost.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              of ${budget.toFixed(2)} budget
            </div>
          </div>
          {!withinBudget && (
            <Badge variant="destructive">
              <AlertTriangle className="mr-1 h-3 w-3" />
              OVER BUDGET
            </Badge>
          )}
        </div>

        {/* Progress Bar */}
        <div>
          <Progress
            value={Math.min(percentUsed, 100)}
            className={cn(
              'h-2',
              budgetStatus === 'danger' && '[&>div]:bg-destructive',
              budgetStatus === 'warning' && '[&>div]:bg-warning'
            )}
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{percentUsed.toFixed(0)}% used</span>
            <span>${remaining.toFixed(2)} remaining</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <div className="text-sm text-muted-foreground">Requests</div>
            <div className="text-lg font-semibold">{requestCount}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="text-lg font-semibold">{(successRate * 100).toFixed(1)}%</div>
          </div>
        </div>

        {/* Feature Breakdown */}
        {showFeatures && Object.keys(featureCosts).length > 0 && (
          <div className="border-t pt-4">
            <div className="mb-2 text-sm font-medium">By Feature</div>
            <div className="space-y-2">
              {Object.entries(featureCosts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([feature, cost]) => (
                  <div key={feature} className="flex items-center justify-between text-sm">
                    <span className={cn('truncate', mode.font)}>{feature}</span>
                    <span className="font-medium">${cost.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================================================
// INLINE COST - Simple inline display
// ============================================================================

interface InlineCostProps {
  /** Show icon */
  showIcon?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Simple inline cost display
 *
 * @example
 * <p>Today's AI cost: <InlineCost /></p>
 */
export function InlineCost({ showIcon = true, className }: InlineCostProps) {
  const { todaysCost, isLoading } = useCostTracking({ autoRefresh: false });

  if (isLoading) {
    return <span className={cn('animate-pulse', className)}>$...</span>;
  }

  return (
    <span className={cn('inline-flex items-center gap-1 font-medium', className)}>
      {showIcon && <DollarSign className="h-4 w-4" />}${todaysCost.toFixed(2)}
    </span>
  );
}

// ============================================================================
// COST TREND INDICATOR
// ============================================================================

interface CostTrendProps {
  /** Compare to yesterday (default) or week */
  compareTo?: 'yesterday' | 'week';
  /** Additional className */
  className?: string;
}

/**
 * Shows cost trend vs previous period
 *
 * @example
 * <div className="flex items-center gap-2">
 *   <InlineCost />
 *   <CostTrend />
 * </div>
 */
export function CostTrend({ compareTo = 'yesterday', className }: CostTrendProps) {
  // For now, show a placeholder - would need period comparison endpoint
  // Using stable value to avoid impure render
  const isUp = true; // Placeholder - replace with actual comparison data

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-sm',
        isUp ? 'text-destructive' : 'text-success',
        className
      )}
    >
      <TrendingUp className={cn('h-3 w-3', !isUp && 'rotate-180')} />
      {isUp ? '+' : '-'}12%
      <span className="text-muted-foreground">vs {compareTo}</span>
    </span>
  );
}

// ============================================================================
// BUDGET ALERT
// ============================================================================

interface BudgetAlertProps {
  /** Threshold to show alert (default: 70) */
  threshold?: number;
  /** Additional className */
  className?: string;
}

/**
 * Shows alert when approaching/exceeding budget
 * Returns null if below threshold
 *
 * @example
 * <BudgetAlert threshold={80} />
 */
export function BudgetAlert({ threshold = 70, className }: BudgetAlertProps) {
  const { percentUsed, remaining, status } = useCostBudget();

  if (percentUsed < threshold) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 border p-4',
        mode.radius,
        status === 'danger'
          ? 'border-destructive bg-destructive/10'
          : 'border-warning bg-warning/10',
        className
      )}
    >
      <AlertTriangle
        className={cn('h-5 w-5', status === 'danger' ? 'text-destructive' : 'text-warning')}
      />
      <div>
        <p className="text-sm font-medium">
          {status === 'danger' ? 'AI BUDGET EXCEEDED' : 'APPROACHING AI BUDGET LIMIT'}
        </p>
        <p className="text-sm text-muted-foreground">
          {percentUsed.toFixed(0)}% of daily budget used. ${remaining.toFixed(2)} remaining.
        </p>
      </div>
    </div>
  );
}
