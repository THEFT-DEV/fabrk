---
title: 'Building Dashboards: Patterns and Components'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'building-dashboards-patterns'
description: 'How to build effective SaaS dashboards with Fabrk. KPI cards, data tables, charts, and layout patterns.'
publishedAt: '2026-01-11T10:00:00.000Z'
---

**Dashboard patterns that work.**

Dashboards are the nerve center of any SaaS application. They provide users with immediate insight into what matters most, enable quick decision-making, and set the tone for your entire product experience. A well-designed dashboard turns complex data into actionable intelligence.

This guide covers everything you need to build effective, accessible, and performant dashboards with Fabrk's terminal-inspired design system.

---

## Table of Contents

1. [Dashboard Anatomy](#dashboard-anatomy)
2. [KPI Cards](#kpi-cards)
3. [KPI Card Variations](#kpi-card-variations)
4. [Chart Integration](#chart-integration)
5. [Data Tables](#data-tables)
6. [Dashboard Header](#dashboard-header)
7. [Data Fetching Patterns](#data-fetching-patterns)
8. [Loading States](#loading-states)
9. [Empty States](#empty-states)
10. [Error States](#error-states)
11. [Responsive Design](#responsive-design)
12. [Accessibility](#accessibility)
13. [Performance Optimization](#performance-optimization)
14. [Best Practices](#best-practices)

---

## Dashboard Anatomy

Effective dashboards have clear structure. The hierarchy matters because users scan from top to bottom, left to right. Place the most critical information where eyes land first.

```
┌─────────────────────────────────────────────────────────────┐
│  Header                                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Title, breadcrumbs, date filters, action buttons   │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  KPI Cards (4-6 key metrics)                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Revenue  │ │  Users   │ │ Convert  │ │  Churn   │       │
│  │ $12,450  │ │  1,247   │ │   3.2%   │ │   1.8%   │       │
│  │   +12%   │ │   +8%    │ │   -2%    │ │   -5%    │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
├─────────────────────────────────────────────────────────────┤
│  Charts (2-4 visualizations)                                │
│  ┌─────────────────────┐ ┌─────────────────────┐           │
│  │   Revenue Trend     │ │   User Growth       │           │
│  │   ─────────────     │ │   ▐▐▐▐▐▐▐▐▐▐▐      │           │
│  │        ╱╲           │ │   ▐▐▐▐▐▐▐▐▐        │           │
│  │   ────╱  ╲────      │ │   ▐▐▐▐▐▐▐          │           │
│  └─────────────────────┘ └─────────────────────┘           │
├─────────────────────────────────────────────────────────────┤
│  Data Table (recent activity)                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Event        │  User      │  Time     │  Status   │   │
│  │───────────────┼────────────┼───────────┼───────────│   │
│  │  purchase     │  john@...  │  2m ago   │  success  │   │
│  │  signup       │  jane@...  │  5m ago   │  success  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Information Hierarchy

1. **Header Zone** - Context and controls (title, filters, date range, export)
2. **KPI Zone** - High-level metrics that answer "How are we doing?"
3. **Trend Zone** - Charts showing patterns over time
4. **Detail Zone** - Granular data for investigation

### Layout Principles

```tsx
// Dashboard layout structure
export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Level 1: Context */}
      <DashboardHeader />

      {/* Level 2: Key Metrics */}
      <KPIGrid />

      {/* Level 3: Trends */}
      <ChartSection />

      {/* Level 4: Details */}
      <ActivityTable />
    </div>
  );
}
```

---

## KPI Cards

KPI cards are the heartbeat of your dashboard. They should communicate value instantly, without requiring any cognitive effort from the user.

### Basic KPI Card

```tsx
import { Card } from '@/components/ui/card';
import { Sparkline } from '@/components/charts/sparkline';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string;
  change: number;
  trend: number[];
}

export function KPICard({ label, value, change, trend }: KPICardProps) {
  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground font-mono text-xs uppercase">
          [ {label} ]
        </span>
        <Sparkline data={trend} className="w-16" />
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold">
          {value}
        </span>
        <span className={cn(
          'font-mono text-xs',
          change > 0 ? 'text-success' : 'text-destructive'
        )}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
    </Card>
  );
}
```

### KPI Grid

Arrange KPIs in a responsive grid that adapts to screen size:

```tsx
interface KPIGridProps {
  stats: {
    revenueTrend: number[];
    userTrend: number[];
    conversionTrend: number[];
    churnTrend: number[];
  };
}

export function KPIGrid({ stats }: KPIGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KPICard
        label="Revenue"
        value="$12,450"
        change={12}
        trend={stats.revenueTrend}
      />
      <KPICard
        label="Users"
        value="1,247"
        change={8}
        trend={stats.userTrend}
      />
      <KPICard
        label="Conversion"
        value="3.2%"
        change={-2}
        trend={stats.conversionTrend}
      />
      <KPICard
        label="Churn"
        value="1.8%"
        change={-5}
        trend={stats.churnTrend}
      />
    </div>
  );
}
```

---

## KPI Card Variations

Different metrics call for different presentations. Here are specialized KPI card variants for common use cases.

### Currency KPI Card

For financial metrics with formatting and currency symbols:

```tsx
import { Card } from '@/components/ui/card';
import { Sparkline } from '@/components/charts/sparkline';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface CurrencyKPIProps {
  label: string;
  value: number;
  previousValue: number;
  currency?: string;
  trend: number[];
}

export function CurrencyKPI({
  label,
  value,
  previousValue,
  currency = 'USD',
  trend
}: CurrencyKPIProps) {
  const change = ((value - previousValue) / previousValue) * 100;
  const isPositive = change > 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-muted-foreground font-mono text-xs uppercase">
            [ {label} ]
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-semibold tracking-tight">
              {formatCurrency(value)}
            </span>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className={cn(
          'flex items-center gap-1 font-mono text-xs',
          isPositive ? 'text-success' : 'text-destructive'
        )}>
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{isPositive ? '+' : ''}{change.toFixed(1)}%</span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
        <Sparkline data={trend} className="w-20 h-8" />
      </div>
    </Card>
  );
}
```

### Percentage KPI Card

For conversion rates, percentages, and ratios:

```tsx
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Target, ArrowUp, ArrowDown } from 'lucide-react';

interface PercentageKPIProps {
  label: string;
  value: number;
  target?: number;
  change: number;
  description?: string;
}

export function PercentageKPI({
  label,
  value,
  target,
  change,
  description
}: PercentageKPIProps) {
  const isPositive = change > 0;
  const progressValue = target ? (value / target) * 100 : value;
  const isOnTarget = target ? value >= target : true;

  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="flex items-start justify-between">
        <span className="text-muted-foreground font-mono text-xs uppercase">
          [ {label} ]
        </span>
        {target && (
          <div className={cn(
            'flex items-center gap-1 font-mono text-xs',
            isOnTarget ? 'text-success' : 'text-muted-foreground'
          )}>
            <Target className="h-3 w-3" />
            <span>Target: {target}%</span>
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-4xl font-semibold">
            {value.toFixed(1)}
          </span>
          <span className="font-mono text-xl text-muted-foreground">%</span>
        </div>

        {target && (
          <Progress
            value={Math.min(progressValue, 100)}
            className="mt-3 h-2"
          />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className={cn(
          'flex items-center gap-1 font-mono text-xs',
          isPositive ? 'text-success' : 'text-destructive'
        )}>
          {isPositive ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
          <span>{isPositive ? '+' : ''}{change.toFixed(1)}%</span>
        </div>
        {description && (
          <span className="font-mono text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </div>
    </Card>
  );
}
```

### Count KPI Card

For user counts, transactions, or any whole number metrics:

```tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkline } from '@/components/charts/sparkline';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';

interface CountKPIProps {
  label: string;
  value: number;
  previousValue: number;
  trend: number[];
  icon?: React.ReactNode;
  status?: 'default' | 'success' | 'warning' | 'destructive';
}

export function CountKPI({
  label,
  value,
  previousValue,
  trend,
  icon,
  status = 'default'
}: CountKPIProps) {
  const change = ((value - previousValue) / previousValue) * 100;
  const isPositive = change > 0;

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-mono text-xs uppercase">
            [ {label} ]
          </span>
          {status !== 'default' && (
            <Badge variant={status} className="text-xs">
              {status === 'success' ? 'HEALTHY' :
               status === 'warning' ? 'ATTENTION' : 'CRITICAL'}
            </Badge>
          )}
        </div>
        {icon || <Users className="h-4 w-4 text-muted-foreground" />}
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="font-mono text-4xl font-semibold tabular-nums">
          {formatNumber(value)}
        </span>
        <div className={cn(
          'flex items-center gap-1 font-mono text-sm',
          isPositive ? 'text-success' : 'text-destructive'
        )}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>{isPositive ? '+' : ''}{change.toFixed(0)}%</span>
        </div>
      </div>

      <div className="mt-4">
        <Sparkline data={trend} className="w-full h-12" />
      </div>
    </Card>
  );
}
```

### Comparison KPI Card

For showing current vs previous period with visual comparison:

```tsx
import { Card } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ComparisonKPIProps {
  label: string;
  currentValue: number;
  previousValue: number;
  currentLabel?: string;
  previousLabel?: string;
  format?: 'number' | 'currency' | 'percent';
}

export function ComparisonKPI({
  label,
  currentValue,
  previousValue,
  currentLabel = 'This Period',
  previousLabel = 'Last Period',
  format = 'number'
}: ComparisonKPIProps) {
  const change = ((currentValue - previousValue) / previousValue) * 100;
  const isPositive = change > 0;

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(val);
      case 'percent':
        return `${val.toFixed(1)}%`;
      default:
        return val.toLocaleString();
    }
  };

  return (
    <Card className={cn('p-4', mode.radius)}>
      <span className="text-muted-foreground font-mono text-xs uppercase">
        [ {label} ]
      </span>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-center">
          <p className="font-mono text-xs text-muted-foreground">
            {previousLabel}
          </p>
          <p className="font-mono text-xl text-muted-foreground">
            {formatValue(previousValue)}
          </p>
        </div>

        <div className={cn(
          'flex flex-col items-center px-4',
          isPositive ? 'text-success' : 'text-destructive'
        )}>
          <ArrowRight className="h-5 w-5" />
          <span className="font-mono text-xs">
            {isPositive ? '+' : ''}{change.toFixed(0)}%
          </span>
        </div>

        <div className="text-center">
          <p className="font-mono text-xs text-muted-foreground">
            {currentLabel}
          </p>
          <p className="font-mono text-2xl font-semibold">
            {formatValue(currentValue)}
          </p>
        </div>
      </div>
    </Card>
  );
}
```

### Goal Progress KPI Card

For showing progress toward goals or quotas:

```tsx
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gauge } from '@/components/charts/gauge';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Flag, Clock } from 'lucide-react';

interface GoalKPIProps {
  label: string;
  current: number;
  goal: number;
  unit?: string;
  daysRemaining?: number;
  showGauge?: boolean;
}

export function GoalKPI({
  label,
  current,
  goal,
  unit = '',
  daysRemaining,
  showGauge = false
}: GoalKPIProps) {
  const percentage = Math.min((current / goal) * 100, 100);
  const isComplete = current >= goal;
  const onTrack = daysRemaining ? (current / goal) >= ((30 - daysRemaining) / 30) : true;

  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="flex items-start justify-between">
        <span className="text-muted-foreground font-mono text-xs uppercase">
          [ {label} ]
        </span>
        <div className={cn(
          'flex items-center gap-1 font-mono text-xs',
          isComplete ? 'text-success' : onTrack ? 'text-primary' : 'text-destructive'
        )}>
          <Flag className="h-3 w-3" />
          <span>{isComplete ? 'COMPLETE' : onTrack ? 'ON TRACK' : 'BEHIND'}</span>
        </div>
      </div>

      {showGauge ? (
        <div className="mt-2 flex justify-center">
          <Gauge
            value={percentage}
            size={120}
            showValue
          />
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-3xl font-semibold">
              {current.toLocaleString()}
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              / {goal.toLocaleString()} {unit}
            </span>
          </div>
          <Progress value={percentage} className="mt-3 h-3" />
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">
              {percentage.toFixed(0)}% complete
            </span>
            {daysRemaining !== undefined && (
              <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{daysRemaining} days left</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
```

### Multi-Stat KPI Card

For showing multiple related metrics in one card:

```tsx
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Stat {
  label: string;
  value: string | number;
  change?: number;
}

interface MultiStatKPIProps {
  title: string;
  stats: Stat[];
}

export function MultiStatKPI({ title, stats }: MultiStatKPIProps) {
  return (
    <Card className={cn('p-4', mode.radius)}>
      <span className="text-muted-foreground font-mono text-xs uppercase">
        [ {title} ]
      </span>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="text-center">
            <p className="font-mono text-xs text-muted-foreground uppercase">
              {stat.label}
            </p>
            <p className="mt-1 font-mono text-xl font-semibold">
              {stat.value}
            </p>
            {stat.change !== undefined && (
              <p className={cn(
                'mt-1 font-mono text-xs',
                stat.change > 0 ? 'text-success' : 'text-destructive'
              )}>
                {stat.change > 0 ? '+' : ''}{stat.change}%
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

// Usage example
<MultiStatKPI
  title="User Engagement"
  stats={[
    { label: 'DAU', value: '12.4K', change: 5 },
    { label: 'WAU', value: '45.2K', change: 8 },
    { label: 'MAU', value: '156K', change: 12 },
  ]}
/>
```

---

## Chart Integration

Charts transform raw data into visual insights. Fabrk includes 8 chart components optimized for the terminal aesthetic.

### Chart Section Layout

```tsx
import { Card } from '@/components/ui/card';
import { LineChart } from '@/components/charts/line-chart';
import { BarChart } from '@/components/charts/bar-chart';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface ChartData {
  revenue: Array<{ date: string; amount: number }>;
  users: Array<{ month: string; count: number }>;
}

export function ChartSection({ data }: { data: ChartData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className={cn('p-4', mode.radius)}>
        <div className="border-b border-border pb-2 mb-4">
          <span className="font-mono text-xs text-muted-foreground">
            [ REVENUE TREND ]
          </span>
        </div>
        <LineChart
          data={data.revenue}
          xKey="date"
          yKey="amount"
          height={200}
        />
      </Card>

      <Card className={cn('p-4', mode.radius)}>
        <div className="border-b border-border pb-2 mb-4">
          <span className="font-mono text-xs text-muted-foreground">
            [ USER GROWTH ]
          </span>
        </div>
        <BarChart
          data={data.users}
          xKey="month"
          yKey="count"
          height={200}
        />
      </Card>
    </div>
  );
}
```

### Line Chart for Trends

Line charts are ideal for showing data over time:

```tsx
import { Card } from '@/components/ui/card';
import { LineChart } from '@/components/charts/line-chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface TrendChartProps {
  title: string;
  data: Array<{ date: string; value: number }>;
  onPeriodChange?: (period: string) => void;
}

export function TrendChart({ title, data, onPeriodChange }: TrendChartProps) {
  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          [ {title} ]
        </span>
        <Select defaultValue="7d" onValueChange={onPeriodChange}>
          <SelectTrigger className="w-28 h-7 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">24 hours</SelectItem>
            <SelectItem value="7d">7 days</SelectItem>
            <SelectItem value="30d">30 days</SelectItem>
            <SelectItem value="90d">90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <LineChart
        data={data}
        xKey="date"
        yKey="value"
        height={250}
        showGrid
        showTooltip
      />
    </Card>
  );
}
```

### Bar Chart for Comparisons

Bar charts excel at comparing discrete categories:

```tsx
import { Card } from '@/components/ui/card';
import { BarChart } from '@/components/charts/bar-chart';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface CategoryChartProps {
  title: string;
  data: Array<{ category: string; value: number; previousValue?: number }>;
  showComparison?: boolean;
}

export function CategoryChart({
  title,
  data,
  showComparison = false
}: CategoryChartProps) {
  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="border-b border-border pb-2 mb-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          [ {title} ]
        </span>
        {showComparison && (
          <div className="mt-2 flex items-center gap-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-muted" />
              <span>Previous</span>
            </div>
          </div>
        )}
      </div>
      <BarChart
        data={data}
        xKey="category"
        yKey="value"
        height={250}
        showTooltip
      />
    </Card>
  );
}
```

### Area Chart for Volume

Area charts emphasize volume and accumulation:

```tsx
import { Card } from '@/components/ui/card';
import { AreaChart } from '@/components/charts/area-chart';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface VolumeChartProps {
  title: string;
  data: Array<{ date: string; value: number }>;
  fillOpacity?: number;
}

export function VolumeChart({
  title,
  data,
  fillOpacity = 0.3
}: VolumeChartProps) {
  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="border-b border-border pb-2 mb-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          [ {title} ]
        </span>
      </div>
      <AreaChart
        data={data}
        xKey="date"
        yKey="value"
        height={200}
        showGrid
        showTooltip
      />
    </Card>
  );
}
```

### Donut Chart for Composition

Donut charts show parts of a whole:

```tsx
import { Card } from '@/components/ui/card';
import { DonutChart } from '@/components/charts/donut-chart';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface CompositionChartProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  centerLabel?: string;
  centerValue?: string;
}

export function CompositionChart({
  title,
  data,
  centerLabel,
  centerValue
}: CompositionChartProps) {
  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="border-b border-border pb-2 mb-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          [ {title} ]
        </span>
      </div>
      <div className="flex items-center justify-center">
        <DonutChart
          data={data}
          size={200}
          showLegend
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: `hsl(var(--chart-${index + 1}))` }}
            />
            <span className="font-mono text-xs">{item.name}</span>
            <span className="font-mono text-xs text-muted-foreground ml-auto">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
```

### Funnel Chart for Conversion

Funnel charts visualize conversion flows:

```tsx
import { Card } from '@/components/ui/card';
import { FunnelChart } from '@/components/charts/funnel-chart';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface FunnelData {
  stage: string;
  value: number;
}

interface ConversionFunnelProps {
  title: string;
  data: FunnelData[];
}

export function ConversionFunnel({ title, data }: ConversionFunnelProps) {
  // Calculate conversion rates
  const dataWithRates = data.map((item, index) => ({
    ...item,
    rate: index === 0 ? 100 : (item.value / data[0].value) * 100,
    dropoff: index === 0 ? 0 : ((data[index - 1].value - item.value) / data[index - 1].value) * 100
  }));

  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="border-b border-border pb-2 mb-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          [ {title} ]
        </span>
      </div>
      <FunnelChart
        data={data}
        height={300}
      />
      <div className="mt-4 space-y-2">
        {dataWithRates.map((item, index) => (
          <div
            key={item.stage}
            className="flex items-center justify-between font-mono text-xs"
          >
            <span>{item.stage}</span>
            <div className="flex items-center gap-4">
              <span>{item.value.toLocaleString()}</span>
              <span className="text-muted-foreground w-16 text-right">
                {item.rate.toFixed(1)}%
              </span>
              {item.dropoff > 0 && (
                <span className="text-destructive w-16 text-right">
                  -{item.dropoff.toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
```

### Gauge for Single Metrics

Gauges are perfect for showing progress toward a single goal:

```tsx
import { Card } from '@/components/ui/card';
import { Gauge } from '@/components/charts/gauge';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface GaugeCardProps {
  title: string;
  value: number;
  min?: number;
  max?: number;
  thresholds?: {
    warning: number;
    danger: number;
  };
}

export function GaugeCard({
  title,
  value,
  min = 0,
  max = 100,
  thresholds
}: GaugeCardProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const getStatus = () => {
    if (!thresholds) return 'normal';
    if (percentage >= thresholds.danger) return 'danger';
    if (percentage >= thresholds.warning) return 'warning';
    return 'normal';
  };

  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="border-b border-border pb-2 mb-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          [ {title} ]
        </span>
      </div>
      <div className="flex flex-col items-center">
        <Gauge
          value={percentage}
          size={150}
          showValue
        />
        <div className="mt-4 text-center">
          <p className="font-mono text-2xl font-semibold">{value}</p>
          <p className="font-mono text-xs text-muted-foreground">
            of {max} ({percentage.toFixed(0)}%)
          </p>
        </div>
      </div>
    </Card>
  );
}
```

### Multi-Chart Dashboard Section

Combine multiple chart types in a dashboard section:

```tsx
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart } from '@/components/charts/line-chart';
import { BarChart } from '@/components/charts/bar-chart';
import { AreaChart } from '@/components/charts/area-chart';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface MultiChartData {
  timeSeries: Array<{ date: string; revenue: number; users: number }>;
  categories: Array<{ name: string; value: number }>;
}

export function MultiChartSection({ data }: { data: MultiChartData }) {
  return (
    <Card className={cn('p-4', mode.radius)}>
      <Tabs defaultValue="revenue">
        <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            [ ANALYTICS ]
          </span>
          <TabsList className="h-7">
            <TabsTrigger value="revenue" className="text-xs">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs">
              Users
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-xs">
              Categories
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="revenue">
          <LineChart
            data={data.timeSeries}
            xKey="date"
            yKey="revenue"
            height={300}
            showGrid
            showTooltip
          />
        </TabsContent>

        <TabsContent value="users">
          <AreaChart
            data={data.timeSeries}
            xKey="date"
            yKey="users"
            height={300}
            showGrid
            showTooltip
          />
        </TabsContent>

        <TabsContent value="categories">
          <BarChart
            data={data.categories}
            xKey="name"
            yKey="value"
            height={300}
            showTooltip
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
```

---

## Data Tables

Tables provide detailed data for investigation and action.

### Activity Table

```tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  event: string;
  user: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error';
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function ActivityTable({ activities }: { activities: Activity[] }) {
  return (
    <Card className={cn('overflow-hidden', mode.radius)}>
      <div className="border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          [ RECENT ACTIVITY ]
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="font-mono text-xs">
                {activity.event}
              </TableCell>
              <TableCell className="font-mono text-xs">
                {activity.user}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {formatRelativeTime(activity.timestamp)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    activity.status === 'success' ? 'default' :
                    activity.status === 'warning' ? 'outline' :
                    'destructive'
                  }
                >
                  {activity.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

### Sortable Data Table

For more complex data needs:

```tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InputSearch } from '@/components/ui/input-search';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface DataRow {
  id: string;
  name: string;
  email: string;
  revenue: number;
  status: 'active' | 'inactive' | 'pending';
  lastActive: Date;
}

type SortDirection = 'asc' | 'desc' | null;
type SortColumn = keyof DataRow | null;

export function SortableDataTable({ data }: { data: DataRow[] }) {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (column: keyof DataRow) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredData = data.filter(row =>
    row.name.toLowerCase().includes(search.toLowerCase()) ||
    row.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;

    const aVal = a[sortColumn];
    const bVal = b[sortColumn];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  const SortIcon = ({ column }: { column: keyof DataRow }) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-3 w-3" />;
    }
    return sortDirection === 'asc'
      ? <ArrowUp className="ml-2 h-3 w-3" />
      : <ArrowDown className="ml-2 h-3 w-3" />;
  };

  return (
    <Card className={cn('overflow-hidden', mode.radius)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          [ USERS ]
        </span>
        <InputSearch
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                className="h-8 px-2 font-mono text-xs"
                onClick={() => handleSort('name')}
              >
                Name
                <SortIcon column="name" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="h-8 px-2 font-mono text-xs"
                onClick={() => handleSort('email')}
              >
                Email
                <SortIcon column="email" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="h-8 px-2 font-mono text-xs"
                onClick={() => handleSort('revenue')}
              >
                Revenue
                <SortIcon column="revenue" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-mono text-xs font-medium">
                {row.name}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {row.email}
              </TableCell>
              <TableCell className="font-mono text-xs">
                ${row.revenue.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    row.status === 'active' ? 'default' :
                    row.status === 'pending' ? 'outline' :
                    'secondary'
                  }
                >
                  {row.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          Showing {sortedData.length} of {data.length} results
        </span>
      </div>
    </Card>
  );
}
```

---

## Dashboard Header

The header provides context and controls:

```tsx
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, RefreshCw, Settings } from 'lucide-react';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  onPeriodChange?: (period: string) => void;
  onExport?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function DashboardHeader({
  title = 'DASHBOARD',
  subtitle = 'Overview of your business metrics',
  onPeriodChange,
  onExport,
  onRefresh,
  isRefreshing = false
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="font-mono text-2xl font-semibold">
          {title}
        </h1>
        <p className="text-muted-foreground text-xs font-mono">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Select defaultValue="7d" onValueChange={onPeriodChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={cn(
            "h-4 w-4",
            isRefreshing && "animate-spin"
          )} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">> EXPORT</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onExport?.()}>
              <Download className="mr-2 h-4 w-4" />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport?.()}>
              <Download className="mr-2 h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
```

---

## Data Fetching Patterns

### Server-Side Data Fetching

Use Server Components for initial data load. This provides the best performance and SEO:

```tsx
// app/(platform)/dashboard/page.tsx
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Dashboard } from '@/components/dashboard/dashboard';

interface DashboardStats {
  kpis: {
    revenue: number;
    previousRevenue: number;
    users: number;
    previousUsers: number;
    conversion: number;
    previousConversion: number;
    churn: number;
    previousChurn: number;
    revenueTrend: number[];
    userTrend: number[];
    conversionTrend: number[];
    churnTrend: number[];
  };
  charts: {
    revenue: Array<{ date: string; amount: number }>;
    users: Array<{ month: string; count: number }>;
  };
  activities: Array<{
    id: string;
    event: string;
    user: string;
    timestamp: Date;
    status: 'success' | 'warning' | 'error';
  }>;
}

async function getStats(organizationId: string): Promise<DashboardStats> {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  // Fetch current period data
  const [currentRevenue, currentUsers, activities] = await Promise.all([
    prisma.payment.aggregate({
      where: {
        organizationId,
        createdAt: { gte: thirtyDaysAgo },
      },
      _sum: { amount: true },
    }),
    prisma.user.count({
      where: {
        organizationId,
        createdAt: { gte: thirtyDaysAgo },
      },
    }),
    prisma.activity.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ]);

  // Fetch previous period for comparison
  const [previousRevenue, previousUsers] = await Promise.all([
    prisma.payment.aggregate({
      where: {
        organizationId,
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
      _sum: { amount: true },
    }),
    prisma.user.count({
      where: {
        organizationId,
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    }),
  ]);

  // Build response
  return {
    kpis: {
      revenue: currentRevenue._sum.amount || 0,
      previousRevenue: previousRevenue._sum.amount || 0,
      users: currentUsers,
      previousUsers: previousUsers,
      conversion: 3.2, // Calculate from actual data
      previousConversion: 3.4,
      churn: 1.8,
      previousChurn: 2.1,
      revenueTrend: [100, 120, 115, 130, 145, 160, 175],
      userTrend: [50, 55, 60, 58, 65, 70, 75],
      conversionTrend: [3.5, 3.2, 3.4, 3.1, 3.3, 3.2, 3.2],
      churnTrend: [2.0, 1.9, 2.1, 1.8, 1.7, 1.9, 1.8],
    },
    charts: {
      revenue: [], // Fetch from analytics
      users: [],   // Fetch from analytics
    },
    activities: activities.map(a => ({
      id: a.id,
      event: a.type,
      user: a.userEmail,
      timestamp: a.createdAt,
      status: a.status as 'success' | 'warning' | 'error',
    })),
  };
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect('/login');
  }

  const stats = await getStats(session.user.organizationId);

  return <Dashboard stats={stats} />;
}
```

### Client-Side Data Fetching

Use client-side fetching for real-time updates and user interactions:

```tsx
'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface UseDashboardStatsOptions {
  refreshInterval?: number;
  period?: string;
}

export function useDashboardStats({
  refreshInterval = 30000,
  period = '7d'
}: UseDashboardStatsOptions = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/stats?period=${period}`,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  const refresh = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    stats: data,
    error,
    isLoading,
    refresh,
  };
}

// Usage in component
export function DashboardClient() {
  const [period, setPeriod] = useState('7d');
  const { stats, error, isLoading, refresh } = useDashboardStats({ period });

  if (error) return <ErrorState error={error} onRetry={refresh} />;
  if (isLoading) return <DashboardSkeleton />;
  if (!stats) return <EmptyDashboard />;

  return (
    <div className="space-y-6 p-6">
      <DashboardHeader
        onPeriodChange={setPeriod}
        onRefresh={refresh}
      />
      <KPIGrid stats={stats.kpis} />
      <ChartSection data={stats.charts} />
      <ActivityTable activities={stats.activities} />
    </div>
  );
}
```

### API Route for Dashboard Stats

```tsx
// app/api/stats/route.ts
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.organizationId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';

    const days = {
      '24h': 1,
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365,
    }[period] || 7;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Fetch stats...
    const stats = await fetchStats(
      session.user.organizationId,
      startDate
    );

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
```

### Hybrid Approach: Server + Client

Combine server-side initial data with client-side updates:

```tsx
// app/(platform)/dashboard/page.tsx
import { auth } from '@/lib/auth';
import { getStats } from '@/lib/dashboard';
import { DashboardClient } from './dashboard-client';

export default async function DashboardPage() {
  const session = await auth();

  // Server-side initial fetch
  const initialStats = await getStats(session!.user.organizationId);

  return (
    <DashboardClient
      initialData={initialStats}
      organizationId={session!.user.organizationId}
    />
  );
}

// dashboard-client.tsx
'use client';

import useSWR from 'swr';

interface DashboardClientProps {
  initialData: DashboardStats;
  organizationId: string;
}

export function DashboardClient({
  initialData,
  organizationId
}: DashboardClientProps) {
  const { data: stats } = useSWR(
    `/api/stats?orgId=${organizationId}`,
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval: 30000,
    }
  );

  // stats is immediately available from initialData
  // and updates automatically every 30 seconds
  return <Dashboard stats={stats} />;
}
```

---

## Loading States

Always show loading states while data is being fetched:

### Dashboard Skeleton

```tsx
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      {/* KPI Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className={cn('p-4', mode.radius)}>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="mt-3">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-12 mt-2" />
            </div>
          </Card>
        ))}
      </div>

      {/* Chart Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className={cn('p-4', mode.radius)}>
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-64 w-full" />
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <Card className={cn('overflow-hidden', mode.radius)}>
        <div className="border-b border-border px-4 py-2">
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
```

### Inline Loading States

For individual components that refresh independently:

```tsx
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface KPICardWithLoadingProps {
  label: string;
  value?: string;
  change?: number;
  trend?: number[];
  isLoading?: boolean;
}

export function KPICardWithLoading({
  label,
  value,
  change,
  trend,
  isLoading = false
}: KPICardWithLoadingProps) {
  return (
    <Card className={cn('p-4 relative', mode.radius)}>
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-muted-foreground font-mono text-xs uppercase">
          [ {label} ]
        </span>
        {trend ? (
          <Sparkline data={trend} className="w-16" />
        ) : (
          <Skeleton className="h-4 w-16" />
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        {value ? (
          <>
            <span className="font-mono text-2xl font-semibold">
              {value}
            </span>
            {change !== undefined && (
              <span className={cn(
                'font-mono text-xs',
                change > 0 ? 'text-success' : 'text-destructive'
              )}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            )}
          </>
        ) : (
          <Skeleton className="h-8 w-24" />
        )}
      </div>
    </Card>
  );
}
```

### Progressive Loading

Load components in order of importance:

```tsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <DashboardHeader />

      {/* KPIs load first - most important */}
      <Suspense fallback={<KPIGridSkeleton />}>
        <KPIGrid />
      </Suspense>

      {/* Charts load second */}
      <Suspense fallback={<ChartSectionSkeleton />}>
        <ChartSection />
      </Suspense>

      {/* Table loads last - least urgent */}
      <Suspense fallback={<TableSkeleton />}>
        <ActivityTable />
      </Suspense>
    </div>
  );
}
```

---

## Empty States

Handle the case when there is no data to display:

### Empty Dashboard

```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { BarChart3, Plus, ArrowRight } from 'lucide-react';

interface EmptyDashboardProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyDashboard({
  title = 'No data yet',
  description = 'Start using your app to see metrics here',
  actionLabel = 'GET STARTED',
  onAction
}: EmptyDashboardProps) {
  return (
    <Card className={cn('p-8', mode.radius)}>
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <BarChart3 className="h-8 w-8 text-muted-foreground" />
        </div>

        <div className="mt-6 font-mono">
          <span className="text-4xl text-muted-foreground">[ ]</span>
          <h3 className="mt-4 text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            {description}
          </p>
        </div>

        {onAction && (
          <Button
            className="mt-6"
            onClick={onAction}
          >
            <Plus className="mr-2 h-4 w-4" />
            > {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
}
```

### Empty Chart State

```tsx
import { Card } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { LineChart as LineChartIcon } from 'lucide-react';

interface EmptyChartProps {
  title: string;
  message?: string;
}

export function EmptyChart({
  title,
  message = 'No data available for this period'
}: EmptyChartProps) {
  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="border-b border-border pb-2 mb-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          [ {title} ]
        </span>
      </div>
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <LineChartIcon className="h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 font-mono text-sm text-muted-foreground">
          {message}
        </p>
      </div>
    </Card>
  );
}
```

### Empty Table State

```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';

interface EmptyTableProps {
  title: string;
  columns: string[];
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyTable({
  title,
  columns,
  message = 'No records found',
  actionLabel,
  onAction
}: EmptyTableProps) {
  return (
    <Card className={cn('overflow-hidden', mode.radius)}>
      <div className="border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          [ {title} ]
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(col => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-48"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <Inbox className="h-10 w-10 text-muted-foreground/50" />
                <p className="mt-4 font-mono text-sm text-muted-foreground">
                  {message}
                </p>
                {actionLabel && onAction && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={onAction}
                  >
                    > {actionLabel}
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
```

---

## Error States

Handle errors gracefully with clear messaging and recovery options:

### Error Boundary Component

```tsx
'use client';

import { Component, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class DashboardErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Dashboard error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <DashboardError
          error={this.state.error}
          onRetry={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}
```

### Error State Component

```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface DashboardErrorProps {
  error?: Error;
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function DashboardError({
  error,
  title = 'Something went wrong',
  description = 'We encountered an error loading your dashboard',
  onRetry
}: DashboardErrorProps) {
  return (
    <Card className={cn('p-8', mode.radius)}>
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <div className="mt-6 font-mono">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            {description}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-6 max-w-md text-left">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Details</AlertTitle>
            <AlertDescription className="font-mono text-xs">
              {error.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-6 flex items-center gap-4">
          {onRetry && (
            <Button onClick={onRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              > RETRY
            </Button>
          )}
          <Button variant="outline" asChild>
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              > HOME
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
```

### Inline Error State

For component-level errors:

```tsx
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface InlineErrorProps {
  message: string;
  onRetry?: () => void;
}

export function InlineError({ message, onRetry }: InlineErrorProps) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span className="font-mono text-xs">{message}</span>
        {onRetry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="h-6 px-2"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
```

---

## Responsive Design

Dashboards must work on all screen sizes:

### Responsive Grid Patterns

```tsx
// 4 columns on desktop, 2 on tablet, 1 on mobile
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* KPI Cards */}
</div>

// 2 columns on desktop, 1 on mobile
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Charts */}
</div>

// Sidebar layout on desktop, stacked on mobile
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <div className="lg:col-span-2">
    {/* Main content */}
  </div>
  <div>
    {/* Sidebar */}
  </div>
</div>
```

### Responsive Header

```tsx
export function ResponsiveHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="font-mono text-xl sm:text-2xl font-semibold">
          DASHBOARD
        </h1>
        <p className="text-muted-foreground text-xs font-mono">
          Overview of your business metrics
        </p>
      </div>

      {/* Stack on mobile, row on desktop */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <Select defaultValue="7d">
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="w-full sm:w-auto">
          > EXPORT
        </Button>
      </div>
    </div>
  );
}
```

### Mobile-First KPI Card

```tsx
export function ResponsiveKPICard({ label, value, change, trend }: KPICardProps) {
  return (
    <Card className={cn('p-3 sm:p-4', mode.radius)}>
      {/* Stack vertically on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-muted-foreground font-mono text-xs uppercase">
          [ {label} ]
        </span>
        {/* Hide sparkline on mobile to save space */}
        <Sparkline
          data={trend}
          className="hidden sm:block w-16"
        />
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        {/* Smaller text on mobile */}
        <span className="font-mono text-xl sm:text-2xl font-semibold">
          {value}
        </span>
        <span className={cn(
          'font-mono text-xs',
          change > 0 ? 'text-success' : 'text-destructive'
        )}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
    </Card>
  );
}
```

### Responsive Table

Tables often need special handling on mobile:

```tsx
export function ResponsiveTable({ data }) {
  return (
    <>
      {/* Table view for larger screens */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.event}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <Badge>{row.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden space-y-2">
        {data.map((row) => (
          <Card key={row.id} className={cn('p-3', mode.radius)}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-medium">
                {row.event}
              </span>
              <Badge>{row.status}</Badge>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{row.user}</span>
              <span>{row.time}</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
```

---

## Accessibility

Make dashboards usable by everyone:

### ARIA Labels and Roles

```tsx
export function AccessibleKPICard({
  label,
  value,
  change,
  trend
}: KPICardProps) {
  const trendDescription = change > 0
    ? `increased by ${change}%`
    : `decreased by ${Math.abs(change)}%`;

  return (
    <Card
      className={cn('p-4', mode.radius)}
      role="region"
      aria-label={`${label} metric`}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-muted-foreground font-mono text-xs uppercase"
          id={`kpi-${label.toLowerCase()}-label`}
        >
          [ {label} ]
        </span>
        <Sparkline
          data={trend}
          className="w-16"
          aria-hidden="true" // Decorative
        />
      </div>
      <div
        className="mt-2 flex items-baseline gap-2"
        aria-labelledby={`kpi-${label.toLowerCase()}-label`}
      >
        <span
          className="font-mono text-2xl font-semibold"
          aria-live="polite"
        >
          {value}
        </span>
        <span
          className={cn(
            'font-mono text-xs',
            change > 0 ? 'text-success' : 'text-destructive'
          )}
          aria-label={trendDescription}
        >
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
      {/* Screen reader only description */}
      <span className="sr-only">
        {label} is {value}, {trendDescription} from the previous period
      </span>
    </Card>
  );
}
```

### Keyboard Navigation

```tsx
'use client';

import { useRef, useEffect } from 'react';

export function KeyboardNavigableGrid({ children }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const cards = grid.querySelectorAll('[role="region"]');
      const currentIndex = Array.from(cards).indexOf(
        document.activeElement as Element
      );

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          const nextIndex = Math.min(currentIndex + 1, cards.length - 1);
          (cards[nextIndex] as HTMLElement).focus();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          const prevIndex = Math.max(currentIndex - 1, 0);
          (cards[prevIndex] as HTMLElement).focus();
          break;
      }
    };

    grid.addEventListener('keydown', handleKeyDown);
    return () => grid.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      role="grid"
      aria-label="Key performance indicators"
    >
      {children}
    </div>
  );
}
```

### Color Contrast and Focus States

```tsx
// Ensure sufficient contrast for status indicators
export function AccessibleBadge({
  status
}: {
  status: 'success' | 'warning' | 'error'
}) {
  return (
    <Badge
      variant={
        status === 'success' ? 'default' :
        status === 'warning' ? 'outline' :
        'destructive'
      }
      // Focus ring for keyboard navigation
      className="focus:ring-2 focus:ring-ring focus:ring-offset-2"
      tabIndex={0}
    >
      {/* Include text, not just color */}
      <span className="sr-only">{status}:</span>
      {status.toUpperCase()}
    </Badge>
  );
}
```

### Accessible Charts

```tsx
export function AccessibleChart({ data, title }: {
  data: Array<{ date: string; value: number }>;
  title: string;
}) {
  // Generate text description of chart data
  const description = `${title} chart showing ${data.length} data points. ` +
    `Values range from ${Math.min(...data.map(d => d.value))} to ` +
    `${Math.max(...data.map(d => d.value))}.`;

  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="border-b border-border pb-2 mb-4">
        <span
          className="font-mono text-xs text-muted-foreground uppercase"
          id={`chart-${title.toLowerCase()}-title`}
        >
          [ {title} ]
        </span>
      </div>

      <div
        role="img"
        aria-labelledby={`chart-${title.toLowerCase()}-title`}
        aria-describedby={`chart-${title.toLowerCase()}-desc`}
      >
        <LineChart
          data={data}
          xKey="date"
          yKey="value"
          height={200}
        />
      </div>

      {/* Hidden description for screen readers */}
      <p
        id={`chart-${title.toLowerCase()}-desc`}
        className="sr-only"
      >
        {description}
      </p>

      {/* Optional: data table for screen readers */}
      <details className="mt-4">
        <summary className="font-mono text-xs text-muted-foreground cursor-pointer">
          View data table
        </summary>
        <table className="mt-2 w-full font-mono text-xs">
          <thead>
            <tr>
              <th className="text-left">Date</th>
              <th className="text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.date}>
                <td>{row.date}</td>
                <td className="text-right">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </Card>
  );
}
```

---

## Performance Optimization

### Virtualization for Large Tables

```tsx
'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function VirtualizedTable({ data }: { data: any[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // Row height
    overscan: 5,
  });

  return (
    <Card className={cn('overflow-hidden', mode.radius)}>
      <div className="border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          [ {data.length.toLocaleString()} RECORDS ]
        </span>
      </div>

      <div
        ref={parentRef}
        className="h-96 overflow-auto"
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="flex items-center border-b border-border px-4"
            >
              {/* Row content */}
              <span className="font-mono text-xs">
                {data[virtualRow.index].name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
```

### Memoization

```tsx
'use client';

import { memo, useMemo } from 'react';

// Memoize expensive chart calculations
export const MemoizedChart = memo(function MemoizedChart({
  data,
  xKey,
  yKey,
}: {
  data: any[];
  xKey: string;
  yKey: string;
}) {
  const processedData = useMemo(() => {
    // Expensive data transformation
    return data.map(item => ({
      ...item,
      [yKey]: Number(item[yKey]),
    }));
  }, [data, yKey]);

  return (
    <LineChart
      data={processedData}
      xKey={xKey}
      yKey={yKey}
      height={200}
    />
  );
});

// Memoize KPI calculations
export function useMemoizedKPIs(rawData: any[]) {
  return useMemo(() => {
    const total = rawData.reduce((sum, item) => sum + item.value, 0);
    const average = total / rawData.length;
    const max = Math.max(...rawData.map(item => item.value));
    const min = Math.min(...rawData.map(item => item.value));

    return { total, average, max, min };
  }, [rawData]);
}
```

### Lazy Loading Charts

```tsx
'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy chart components
const LazyLineChart = dynamic(
  () => import('@/components/charts/line-chart').then(mod => mod.LineChart),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false, // Charts often don't need SSR
  }
);

const LazyBarChart = dynamic(
  () => import('@/components/charts/bar-chart').then(mod => mod.BarChart),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false,
  }
);

export function LazyChartSection({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className={cn('p-4', mode.radius)}>
        <LazyLineChart data={data.revenue} xKey="date" yKey="amount" />
      </Card>
      <Card className={cn('p-4', mode.radius)}>
        <LazyBarChart data={data.users} xKey="month" yKey="count" />
      </Card>
    </div>
  );
}
```

---

## Best Practices

### 1. Lead with KPIs

Place the most important metrics at the top. Users should understand the overall health of their business within seconds.

```tsx
// Good: KPIs first, details later
<div className="space-y-6">
  <KPIGrid />      {/* Answers: "How are we doing?" */}
  <ChartSection /> {/* Answers: "What's the trend?" */}
  <DataTable />    {/* Answers: "What happened?" */}
</div>
```

### 2. Use Appropriate Charts

| Data Type | Best Chart | Avoid |
|-----------|------------|-------|
| Trends over time | Line, Area | Pie |
| Part of whole | Donut, Pie | Line |
| Comparison | Bar | Pie |
| Progress to goal | Gauge, Progress | Line |
| Conversion flow | Funnel | Bar |

### 3. Keep It Scannable

Users should understand your dashboard at a glance:

```tsx
// Good: Clear labels, obvious meaning
<KPICard
  label="Monthly Revenue"
  value="$12,450"
  change={12}
/>

// Bad: Cryptic abbreviations
<KPICard
  label="MRR_v2"
  value="12450"
  change={0.12}
/>
```

### 4. Handle All States

Every dashboard component needs four states:

```tsx
function DashboardWidget({ data, isLoading, error }) {
  // 1. Loading state
  if (isLoading) return <WidgetSkeleton />;

  // 2. Error state
  if (error) return <WidgetError error={error} />;

  // 3. Empty state
  if (!data || data.length === 0) return <WidgetEmpty />;

  // 4. Success state
  return <Widget data={data} />;
}
```

### 5. Make It Actionable

Link metrics to actions users can take:

```tsx
<KPICard
  label="Churn Rate"
  value="5.2%"
  change={2}
  // Link to detailed view
  href="/analytics/churn"
  // Or provide inline action
  action={
    <Button size="sm" variant="outline">
      View at-risk users
    </Button>
  }
/>
```

### 6. Respect the Terminal Aesthetic

Follow Fabrk's design language:

```tsx
// Good: Terminal-style labels
<span className="font-mono text-xs uppercase">[ REVENUE ]</span>

// Good: Button with command prefix
<Button>> EXPORT DATA</Button>

// Bad: Generic styling
<span className="text-sm">Revenue</span>
```

### 7. Optimize for Performance

- Use server components for initial data
- Implement virtualization for large datasets
- Lazy load charts below the fold
- Cache API responses appropriately

### 8. Test Accessibility

Run accessibility audits regularly:

```bash
npm run test:a11y
```

Ensure:
- All interactive elements are keyboard accessible
- Color is not the only indicator of status
- Screen readers can navigate the dashboard
- Focus states are visible

---

## Complete Dashboard Example

Here is a full dashboard implementation combining all patterns:

```tsx
// app/(platform)/dashboard/page.tsx
import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { KPIGrid, KPIGridSkeleton } from '@/components/dashboard/kpi-grid';
import { ChartSection, ChartSkeleton } from '@/components/dashboard/charts';
import { ActivityTable, TableSkeleton } from '@/components/dashboard/activity';
import { DashboardErrorBoundary } from '@/components/dashboard/error-boundary';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <DashboardErrorBoundary>
      <div className="space-y-6 p-6">
        <DashboardHeader />

        <Suspense fallback={<KPIGridSkeleton />}>
          <KPIGrid userId={session.user.id} />
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
          <ChartSection userId={session.user.id} />
        </Suspense>

        <Suspense fallback={<TableSkeleton />}>
          <ActivityTable userId={session.user.id} />
        </Suspense>
      </div>
    </DashboardErrorBoundary>
  );
}
```

---

## Summary

Building effective dashboards requires attention to:

1. **Structure** - Clear hierarchy from KPIs to charts to details
2. **Components** - Use Fabrk's pre-built components
3. **Data** - Server-side for initial load, client-side for updates
4. **States** - Handle loading, empty, error gracefully
5. **Responsiveness** - Mobile-first design that scales up
6. **Accessibility** - Keyboard navigation, screen reader support
7. **Performance** - Virtualization, memoization, lazy loading

With these patterns, you can build dashboards that inform and delight users.

Dashboards that inform.

