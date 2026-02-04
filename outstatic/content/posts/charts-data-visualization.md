---
title: '8 Chart Components: Data Visualization for Dashboards'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'charts-data-visualization'
description: 'Fabrk includes 8 pre-built chart components for dashboards: bar, line, area, pie, donut, funnel, gauge, and sparkline.'
publishedAt: '2026-01-15T10:00:00.000Z'
---

**Beautiful charts that match your terminal theme.**

Fabrk includes a complete data visualization toolkit with 8 chart components designed to integrate seamlessly with the terminal-inspired design system. Every chart automatically adapts to theme changes, supports responsive layouts, and follows accessibility best practices.

---

## TABLE OF CONTENTS

1. [Quick Start](#quick-start)
2. [Bar Chart](#bar-chart)
3. [Line Chart](#line-chart)
4. [Area Chart](#area-chart)
5. [Pie Chart](#pie-chart)
6. [Donut Chart](#donut-chart)
7. [Funnel Chart](#funnel-chart)
8. [Gauge](#gauge)
9. [Sparkline](#sparkline)
10. [Theming and Customization](#theming-and-customization)
11. [Data Formatting and Transformation](#data-formatting-and-transformation)
12. [Loading States](#loading-states)
13. [Empty States](#empty-states)
14. [Animation Options](#animation-options)
15. [Responsive Behavior](#responsive-behavior)
16. [Accessibility](#accessibility)
17. [Dashboard Integration](#dashboard-integration)
18. [Choosing the Right Chart](#choosing-the-right-chart)
19. [Best Practices](#best-practices)

---

## QUICK START

Import the charts you need:

```tsx
import { BarChart, BarChartCard, StackedBarChart } from '@/components/charts/bar-chart';
import { LineChart, LineChartCard } from '@/components/charts/line-chart';
import { AreaChart, AreaChartCard, StackedAreaChart } from '@/components/charts/area-chart';
import { PieChart } from '@/components/charts/pie-chart';
import { DonutChart, MetricDonutChart, ProgressDonutChart } from '@/components/charts/donut-chart';
import { FunnelChart } from '@/components/charts/funnel-chart';
import { Gauge, ScoreGauge } from '@/components/charts/gauge';
import { Sparkline, SparklineCard, SparklineGroup } from '@/components/charts/sparkline';
```

All charts share these common characteristics:
- Built with Recharts for Bar, Line, and Area charts
- Custom SVG implementations for Pie, Donut, Funnel, Gauge, and Sparkline
- Theme-aware colors using CSS custom properties
- Responsive by default using ResponsiveContainer
- Consistent tooltip and legend styling

---

## BAR CHART

The BarChart component is ideal for comparing discrete categories. It supports vertical and horizontal layouts, stacking, color customization, and interactive tooltips.

### Basic Bar Chart

```tsx
import { BarChart } from '@/components/charts/bar-chart';

const monthlyRevenue = [
  { month: 'Jan', revenue: 12400 },
  { month: 'Feb', revenue: 15300 },
  { month: 'Mar', revenue: 18200 },
  { month: 'Apr', revenue: 14500 },
  { month: 'May', revenue: 21000 },
  { month: 'Jun', revenue: 19800 },
];

export function RevenueChart() {
  return (
    <BarChart
      data={monthlyRevenue}
      xAxisKey="month"
      series={[{ dataKey: 'revenue', name: 'Revenue' }]}
      height={300}
    />
  );
}
```

### Multi-Series Bar Chart

Compare multiple metrics side by side:

```tsx
const quarterlyData = [
  { quarter: 'Q1', sales: 45000, expenses: 32000, profit: 13000 },
  { quarter: 'Q2', sales: 52000, expenses: 35000, profit: 17000 },
  { quarter: 'Q3', sales: 48000, expenses: 33000, profit: 15000 },
  { quarter: 'Q4', sales: 61000, expenses: 38000, profit: 23000 },
];

<BarChart
  data={quarterlyData}
  xAxisKey="quarter"
  series={[
    { dataKey: 'sales', name: 'Sales', color: 'var(--color-chart-1)' },
    { dataKey: 'expenses', name: 'Expenses', color: 'var(--color-chart-2)' },
    { dataKey: 'profit', name: 'Profit', color: 'var(--color-chart-3)' },
  ]}
  showLegend
  height={350}
/>
```

### Stacked Bar Chart

Use the StackedBarChart variant for cumulative comparisons:

```tsx
import { StackedBarChart } from '@/components/charts/bar-chart';

const trafficSources = [
  { month: 'Jan', organic: 4500, paid: 2300, referral: 1200, direct: 800 },
  { month: 'Feb', organic: 5200, paid: 2800, referral: 1400, direct: 900 },
  { month: 'Mar', organic: 6100, paid: 3200, referral: 1600, direct: 1100 },
  { month: 'Apr', organic: 5800, paid: 3500, referral: 1500, direct: 1000 },
];

<StackedBarChart
  data={trafficSources}
  xAxisKey="month"
  stackKeys={['organic', 'paid', 'referral', 'direct']}
  stackLabels={['Organic', 'Paid', 'Referral', 'Direct']}
  height={350}
/>
```

### Horizontal Bar Chart

For long category labels or ranking comparisons:

```tsx
const topProducts = [
  { product: 'Enterprise Plan', revenue: 125000 },
  { product: 'Pro Plan', revenue: 89000 },
  { product: 'Team Plan', revenue: 67000 },
  { product: 'Starter Plan', revenue: 45000 },
  { product: 'Free Trial', revenue: 12000 },
];

<BarChart
  data={topProducts}
  xAxisKey="product"
  series={[{ dataKey: 'revenue', name: 'Revenue' }]}
  horizontal
  height={300}
  yAxisFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
/>
```

### Color By Index

Apply different colors to each bar based on its position:

```tsx
const categoryComparison = [
  { category: 'Electronics', value: 42000 },
  { category: 'Clothing', value: 35000 },
  { category: 'Home & Garden', value: 28000 },
  { category: 'Sports', value: 22000 },
  { category: 'Books', value: 15000 },
];

<BarChart
  data={categoryComparison}
  xAxisKey="category"
  series={[{ dataKey: 'value' }]}
  colorByIndex
  height={300}
/>
```

### Bar Chart Card

Use the BarChartCard wrapper for a terminal-styled container:

```tsx
import { BarChartCard } from '@/components/charts/bar-chart';
import { TrendingUp } from 'lucide-react';

<BarChartCard
  title="Monthly Revenue"
  description="Revenue breakdown by month"
  code="0x01"
  icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
  data={monthlyRevenue}
  xAxisKey="month"
  series={[{ dataKey: 'revenue', name: 'Revenue', radius: [4, 4, 0, 0] }]}
  yAxisFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
  height={280}
/>
```

### All Bar Chart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `BarChartDataPoint[]` | required | Chart data array |
| `xAxisKey` | `string` | required | Key for x-axis values |
| `series` | `BarChartSeries[]` | required | Bar series configuration |
| `height` | `number` | `300` | Chart height in pixels |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `showLegend` | `boolean` | `false` | Show legend |
| `showTooltip` | `boolean` | `true` | Show tooltip on hover |
| `horizontal` | `boolean` | `false` | Horizontal layout |
| `barSize` | `number` | auto | Fixed bar width |
| `barGap` | `number` | `4` | Gap between bars |
| `yAxisFormatter` | `function` | - | Format y-axis labels |
| `xAxisFormatter` | `function` | - | Format x-axis labels |
| `tooltipFormatter` | `function` | - | Format tooltip values |
| `margin` | `object` | `{ top: 10, right: 30, left: 0, bottom: 0 }` | Chart margins |
| `colorByIndex` | `boolean` | `false` | Color each bar differently |
| `colors` | `string[]` | theme colors | Custom color array |
| `className` | `string` | - | Additional CSS classes |

### BarChartSeries Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataKey` | `string` | required | Key in data for bar values |
| `name` | `string` | dataKey | Legend display name |
| `color` | `string` | auto | Bar color |
| `stackId` | `string` | - | Stack ID for stacking |
| `radius` | `number \| [number, number, number, number]` | `0` | Border radius |

---

## LINE CHART

LineChart excels at showing trends over time. It supports multiple series, customizable line styles, dots, and dashed lines for projections.

### Basic Line Chart

```tsx
import { LineChart } from '@/components/charts/line-chart';

const userGrowth = [
  { date: '2026-01', users: 1200 },
  { date: '2026-02', users: 1450 },
  { date: '2026-03', users: 1680 },
  { date: '2026-04', users: 2100 },
  { date: '2026-05', users: 2450 },
  { date: '2026-06', users: 2890 },
];

export function UserGrowthChart() {
  return (
    <LineChart
      data={userGrowth}
      xAxisKey="date"
      series={[{ dataKey: 'users', name: 'Active Users' }]}
      height={300}
    />
  );
}
```

### Multi-Series Line Chart

Compare multiple trends:

```tsx
const performanceData = [
  { date: 'Jan', pageViews: 12000, uniqueVisitors: 8500, sessions: 10200 },
  { date: 'Feb', pageViews: 14500, uniqueVisitors: 9800, sessions: 11800 },
  { date: 'Mar', pageViews: 16200, uniqueVisitors: 11200, sessions: 13500 },
  { date: 'Apr', pageViews: 15800, uniqueVisitors: 10900, sessions: 12800 },
  { date: 'May', pageViews: 18500, uniqueVisitors: 13200, sessions: 15200 },
  { date: 'Jun', pageViews: 21000, uniqueVisitors: 15000, sessions: 17500 },
];

<LineChart
  data={performanceData}
  xAxisKey="date"
  series={[
    { dataKey: 'pageViews', name: 'Page Views', color: 'var(--color-chart-1)' },
    { dataKey: 'uniqueVisitors', name: 'Unique Visitors', color: 'var(--color-chart-2)' },
    { dataKey: 'sessions', name: 'Sessions', color: 'var(--color-chart-3)' },
  ]}
  showLegend
  height={350}
/>
```

### Line Styles and Types

Customize line appearance:

```tsx
<LineChart
  data={data}
  xAxisKey="date"
  series={[
    {
      dataKey: 'actual',
      name: 'Actual',
      type: 'monotone',
      strokeWidth: 2,
      showDots: true,
      dotSize: 4
    },
    {
      dataKey: 'projected',
      name: 'Projected',
      type: 'monotone',
      strokeWidth: 2,
      dashed: true,
      showDots: false
    },
  ]}
  height={300}
/>
```

### Line Type Options

The `type` prop controls line interpolation:

```tsx
// Smooth curves
{ dataKey: 'value', type: 'monotone' }

// Straight lines between points
{ dataKey: 'value', type: 'linear' }

// Step functions
{ dataKey: 'value', type: 'step' }
{ dataKey: 'value', type: 'stepBefore' }
{ dataKey: 'value', type: 'stepAfter' }
```

### Line Chart Card

```tsx
import { LineChartCard } from '@/components/charts/line-chart';
import { Activity } from 'lucide-react';

<LineChartCard
  title="User Activity"
  description="Daily active users over time"
  code="0x02"
  icon={<Activity className="h-4 w-4 text-muted-foreground" />}
  data={userGrowth}
  xAxisKey="date"
  series={[{ dataKey: 'users', name: 'Users', showDots: true }]}
  xAxisFormatter={(value) => value.split('-')[1]}
  height={280}
/>
```

### All Line Chart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `LineChartDataPoint[]` | required | Chart data array |
| `xAxisKey` | `string` | required | Key for x-axis values |
| `series` | `LineChartSeries[]` | required | Line series configuration |
| `height` | `number` | `300` | Chart height in pixels |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `showLegend` | `boolean` | `false` | Show legend |
| `showTooltip` | `boolean` | `true` | Show tooltip on hover |
| `yAxisFormatter` | `function` | - | Format y-axis labels |
| `xAxisFormatter` | `function` | - | Format x-axis labels |
| `tooltipFormatter` | `function` | - | Format tooltip values |
| `margin` | `object` | `{ top: 10, right: 30, left: 0, bottom: 0 }` | Chart margins |
| `className` | `string` | - | Additional CSS classes |

### LineChartSeries Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataKey` | `string` | required | Key in data for line values |
| `name` | `string` | dataKey | Legend display name |
| `color` | `string` | auto | Line color |
| `strokeWidth` | `number` | `2` | Line thickness |
| `type` | `'linear' \| 'monotone' \| 'step' \| 'stepBefore' \| 'stepAfter'` | `'monotone'` | Line interpolation |
| `showDots` | `boolean` | `true` | Show dots on data points |
| `dotSize` | `number` | `4` | Dot radius |
| `dashed` | `boolean` | `false` | Use dashed line |

---

## AREA CHART

AreaChart emphasizes volume and cumulative values. The filled area under the line creates visual weight that highlights magnitude.

### Basic Area Chart

```tsx
import { AreaChart } from '@/components/charts/area-chart';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

export function RevenueAreaChart() {
  return (
    <AreaChart
      data={revenueData}
      xAxisKey="month"
      series={[{ dataKey: 'revenue', name: 'Revenue' }]}
      gradient
      height={300}
    />
  );
}
```

### Gradient Fill

The gradient option creates a visually appealing fade from top to bottom:

```tsx
<AreaChart
  data={data}
  xAxisKey="month"
  series={[{ dataKey: 'value', name: 'Value' }]}
  gradient={true}  // Default: true
  height={300}
/>

// Solid fill instead
<AreaChart
  data={data}
  xAxisKey="month"
  series={[{ dataKey: 'value', fillOpacity: 0.3 }]}
  gradient={false}
  height={300}
/>
```

### Stacked Area Chart

Show composition over time:

```tsx
import { StackedAreaChart } from '@/components/charts/area-chart';

const channelRevenue = [
  { month: 'Jan', web: 12000, mobile: 8000, desktop: 5000 },
  { month: 'Feb', web: 14000, mobile: 9500, desktop: 5500 },
  { month: 'Mar', web: 16000, mobile: 11000, desktop: 6000 },
  { month: 'Apr', web: 15000, mobile: 12500, desktop: 5800 },
  { month: 'May', web: 18000, mobile: 14000, desktop: 6200 },
  { month: 'Jun', web: 20000, mobile: 15500, desktop: 6800 },
];

<StackedAreaChart
  data={channelRevenue}
  xAxisKey="month"
  stackKeys={['web', 'mobile', 'desktop']}
  stackLabels={['Web', 'Mobile', 'Desktop']}
  height={350}
/>
```

### Multi-Series Area Chart

Compare multiple metrics with overlapping areas:

```tsx
<AreaChart
  data={performanceData}
  xAxisKey="date"
  series={[
    { dataKey: 'target', name: 'Target', color: 'var(--color-chart-2)', fillOpacity: 0.1 },
    { dataKey: 'actual', name: 'Actual', color: 'var(--color-chart-1)', fillOpacity: 0.3 },
  ]}
  showLegend
  gradient={false}
  height={300}
/>
```

### Area Chart Card

```tsx
import { AreaChartCard } from '@/components/charts/area-chart';
import { DollarSign } from 'lucide-react';

<AreaChartCard
  title="Revenue Trend"
  description="Monthly revenue with gradient fill"
  code="0x03"
  icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
  data={revenueData}
  xAxisKey="month"
  series={[{ dataKey: 'revenue', name: 'Revenue' }]}
  yAxisFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
  height={280}
/>
```

### All Area Chart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `AreaChartDataPoint[]` | required | Chart data array |
| `xAxisKey` | `string` | required | Key for x-axis values |
| `series` | `AreaChartSeries[]` | required | Area series configuration |
| `height` | `number` | `300` | Chart height in pixels |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `showLegend` | `boolean` | `false` | Show legend |
| `showTooltip` | `boolean` | `true` | Show tooltip on hover |
| `yAxisFormatter` | `function` | - | Format y-axis labels |
| `xAxisFormatter` | `function` | - | Format x-axis labels |
| `tooltipFormatter` | `function` | - | Format tooltip values |
| `margin` | `object` | `{ top: 10, right: 30, left: 0, bottom: 0 }` | Chart margins |
| `gradient` | `boolean` | `true` | Use gradient fill |
| `className` | `string` | - | Additional CSS classes |

### AreaChartSeries Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataKey` | `string` | required | Key in data for area values |
| `name` | `string` | dataKey | Legend display name |
| `color` | `string` | auto | Area/line color |
| `fillOpacity` | `number` | `0.2` | Fill opacity (when gradient is false) |
| `strokeWidth` | `number` | `2` | Line thickness |
| `type` | `'linear' \| 'monotone' \| 'step' \| 'stepBefore' \| 'stepAfter'` | `'monotone'` | Line interpolation |
| `stackId` | `string` | - | Stack ID for stacking |
| `showDots` | `boolean` | `false` | Show dots on data points |
| `dotSize` | `number` | `4` | Dot radius |

---

## PIE CHART

PieChart displays part-to-whole relationships. It is best suited for showing composition with a small number of categories (typically 2-6).

### Basic Pie Chart

```tsx
import { PieChart } from '@/components/charts/pie-chart';

const planDistribution = [
  { label: 'Free', value: 4500 },
  { label: 'Starter', value: 2800 },
  { label: 'Pro', value: 1900 },
  { label: 'Enterprise', value: 800 },
];

export function PlanDistributionChart() {
  return (
    <PieChart
      data={planDistribution}
      size={300}
      showLegend
      showPercentages
    />
  );
}
```

### Custom Colors

Override default theme colors:

```tsx
const statusBreakdown = [
  { label: 'Active', value: 850, color: 'oklch(70% 0.15 160)' },
  { label: 'Pending', value: 120, color: 'oklch(70% 0.15 60)' },
  { label: 'Inactive', value: 230, color: 'oklch(60% 0.1 0)' },
];

<PieChart
  data={statusBreakdown}
  size={280}
  showLegend
/>
```

### Interactive Segments

Handle segment clicks:

```tsx
const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

<PieChart
  data={planDistribution}
  size={300}
  showLegend
  onSegmentClick={(item, index) => {
    setSelectedSegment(item.label);
    console.log(`Clicked: ${item.label} - ${item.value}`);
  }}
/>
```

### Show Labels on Segments

Display labels directly on the chart:

```tsx
<PieChart
  data={planDistribution}
  size={350}
  showLabels
  showPercentages
  showLegend={false}
/>
```

### All Pie Chart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `PieChartDataItem[]` | required | Chart data array |
| `size` | `number` | `300` | Chart size in pixels |
| `showLabels` | `boolean` | `false` | Show labels on segments |
| `showPercentages` | `boolean` | `true` | Show percentage values |
| `showLegend` | `boolean` | `true` | Show legend |
| `innerRadius` | `number` | `0` | Inner radius (0 for pie, >0 for donut) |
| `className` | `string` | - | Additional CSS classes |
| `onSegmentClick` | `function` | - | Callback when segment is clicked |

### PieChartDataItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Segment label |
| `value` | `number` | required | Segment value |
| `color` | `string` | auto | Segment color |

---

## DONUT CHART

DonutChart is a variation of PieChart with a hollow center, perfect for displaying a key metric alongside composition data.

### Basic Donut Chart

```tsx
import { DonutChart } from '@/components/charts/donut-chart';

const revenueByRegion = [
  { label: 'North America', value: 45000 },
  { label: 'Europe', value: 32000 },
  { label: 'Asia Pacific', value: 28000 },
  { label: 'Other', value: 15000 },
];

export function RegionDonutChart() {
  return (
    <DonutChart
      data={revenueByRegion}
      size={300}
      thickness={60}
      showLegend
    />
  );
}
```

### Metric Donut Chart

Display a key metric in the center:

```tsx
import { MetricDonutChart } from '@/components/charts/donut-chart';

const total = revenueByRegion.reduce((sum, item) => sum + item.value, 0);

<MetricDonutChart
  data={revenueByRegion}
  size={320}
  thickness={50}
  metric={{
    value: `$${(total / 1000).toFixed(0)}k`,
    label: 'Total Revenue',
    sublabel: 'All regions'
  }}
  showLegend
/>
```

### Progress Donut Chart

Show progress toward a goal:

```tsx
import { ProgressDonutChart } from '@/components/charts/donut-chart';

<ProgressDonutChart
  value={75}
  max={100}
  size={200}
  thickness={30}
  label="Goal Progress"
  showPercentage
  color="var(--color-primary)"
/>
```

### Custom Center Content

Add any React content to the center:

```tsx
<DonutChart
  data={planDistribution}
  size={320}
  thickness={50}
  centerContent={
    <div className="text-center">
      <p className="text-3xl font-semibold">10,000</p>
      <p className="text-muted-foreground text-sm">Total Users</p>
      <p className="text-success text-xs mt-1">+12% vs last month</p>
    </div>
  }
/>
```

### Adjusting Thickness

Control the ring width:

```tsx
// Thin ring
<DonutChart data={data} size={300} thickness={30} />

// Medium ring (default)
<DonutChart data={data} size={300} thickness={60} />

// Thick ring
<DonutChart data={data} size={300} thickness={90} />
```

### All Donut Chart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `PieChartDataItem[]` | required | Chart data array |
| `size` | `number` | `300` | Chart size in pixels |
| `thickness` | `number` | `60` | Ring thickness |
| `showLabels` | `boolean` | `false` | Show labels on segments |
| `showPercentages` | `boolean` | `true` | Show percentage values |
| `showLegend` | `boolean` | `true` | Show legend |
| `centerContent` | `ReactNode` | - | Custom center content |
| `className` | `string` | - | Additional CSS classes |
| `onSegmentClick` | `function` | - | Callback when segment is clicked |

### MetricDonutChart Props

Extends DonutChart with:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `metric.value` | `string \| number` | required | Main metric value |
| `metric.label` | `string` | required | Metric label |
| `metric.sublabel` | `string` | - | Additional sublabel |

### ProgressDonutChart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | required | Current value |
| `max` | `number` | `100` | Maximum value |
| `size` | `number` | `200` | Chart size |
| `thickness` | `number` | `30` | Ring thickness |
| `label` | `string` | - | Label text |
| `showPercentage` | `boolean` | `true` | Show percentage in center |
| `color` | `string` | `var(--color-primary)` | Progress color |
| `backgroundColor` | `string` | `var(--color-muted)` | Background color |

---

## FUNNEL CHART

FunnelChart visualizes sequential processes with decreasing values, perfect for conversion funnels, sales pipelines, and user journeys.

### Basic Funnel Chart

```tsx
import { FunnelChart } from '@/components/charts/funnel-chart';

const conversionFunnel = [
  { label: 'Website Visitors', value: 10000 },
  { label: 'Product Page Views', value: 6500 },
  { label: 'Add to Cart', value: 3200 },
  { label: 'Checkout Started', value: 1800 },
  { label: 'Purchase Complete', value: 950 },
];

export function ConversionFunnelChart() {
  return (
    <FunnelChart
      data={conversionFunnel}
      width={600}
      height={400}
      showValues
      showPercentages
    />
  );
}
```

### Vertical vs Horizontal Direction

```tsx
// Vertical funnel (default)
<FunnelChart
  data={conversionFunnel}
  direction="vertical"
  height={400}
/>

// Horizontal funnel
<FunnelChart
  data={conversionFunnel}
  direction="horizontal"
  width={800}
  height={200}
/>
```

### Sales Pipeline Funnel

```tsx
const salesPipeline = [
  { label: 'Leads', value: 500, color: 'oklch(70% 0.15 240)' },
  { label: 'Qualified', value: 320, color: 'oklch(70% 0.15 200)' },
  { label: 'Proposal', value: 180, color: 'oklch(70% 0.15 160)' },
  { label: 'Negotiation', value: 95, color: 'oklch(70% 0.15 120)' },
  { label: 'Closed Won', value: 48, color: 'oklch(70% 0.15 80)' },
];

<FunnelChart
  data={salesPipeline}
  width={600}
  height={450}
  showValues
  showPercentages
  onStageClick={(stage, index) => {
    console.log(`Stage ${index}: ${stage.label} - ${stage.value}`);
  }}
/>
```

### Customizing Display

```tsx
// Values only (no percentages)
<FunnelChart
  data={funnelData}
  showValues
  showPercentages={false}
/>

// Percentages only (no values)
<FunnelChart
  data={funnelData}
  showValues={false}
  showPercentages
/>

// Minimal display
<FunnelChart
  data={funnelData}
  showValues={false}
  showPercentages={false}
/>
```

### All Funnel Chart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `FunnelStage[]` | required | Funnel stage data |
| `height` | `number` | `400` | Chart height |
| `width` | `number` | `600` | Chart width |
| `gap` | `number` | `8` | Gap between stages |
| `showValues` | `boolean` | `true` | Show stage values |
| `showPercentages` | `boolean` | `true` | Show conversion percentages |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Funnel direction |
| `className` | `string` | - | Additional CSS classes |
| `onStageClick` | `function` | - | Callback when stage is clicked |

### FunnelStage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Stage label |
| `value` | `number` | required | Stage value |
| `color` | `string` | auto | Stage color |

---

## GAUGE

Gauge displays a single metric against a range, ideal for showing progress, scores, or status indicators.

### Basic Gauge

```tsx
import { Gauge } from '@/components/charts/gauge';

export function PerformanceGauge() {
  return (
    <Gauge
      value={75}
      min={0}
      max={100}
      size={200}
      label="Performance Score"
      showValue
    />
  );
}
```

### Score Gauge

Use the ScoreGauge variant for automatic color coding:

```tsx
import { ScoreGauge } from '@/components/charts/gauge';

// Automatically colors based on score:
// >= 80%: Green
// >= 60%: Yellow
// >= 40%: Orange
// < 40%: Red

<ScoreGauge
  score={85}
  maxScore={100}
  size={180}
  label="Health Score"
/>

<ScoreGauge score={45} label="Performance" />
<ScoreGauge score={72} label="Engagement" />
```

### Custom Angle Range

Adjust the arc span:

```tsx
// Half circle (180 degrees)
<Gauge
  value={65}
  startAngle={-90}
  endAngle={90}
  size={200}
/>

// Three-quarter circle (270 degrees) - default
<Gauge
  value={65}
  startAngle={-135}
  endAngle={135}
  size={200}
/>

// Full circle (360 degrees)
<Gauge
  value={65}
  startAngle={-180}
  endAngle={180}
  size={200}
/>
```

### Segmented Gauge

Show multiple ranges with different colors:

```tsx
<Gauge
  value={72}
  min={0}
  max={100}
  size={220}
  segments={[
    { value: 30, color: 'oklch(60% 0.20 25)', label: 'Poor' },
    { value: 30, color: 'oklch(70% 0.15 60)', label: 'Average' },
    { value: 40, color: 'oklch(70% 0.15 160)', label: 'Good' },
  ]}
  showMinMax
  label="Customer Satisfaction"
/>
```

### With Unit Display

```tsx
<Gauge
  value={42}
  max={100}
  size={200}
  unit="%"
  label="CPU Usage"
/>

<Gauge
  value={850}
  max={1000}
  size={200}
  unit=" MB"
  label="Memory Used"
/>
```

### Customizing Thickness

```tsx
// Thin gauge
<Gauge value={65} thickness={12} size={200} />

// Standard gauge
<Gauge value={65} thickness={20} size={200} />

// Thick gauge
<Gauge value={65} thickness={32} size={200} />
```

### All Gauge Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | required | Current value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `size` | `number` | `200` | Gauge size in pixels |
| `thickness` | `number` | `20` | Arc thickness |
| `startAngle` | `number` | `-135` | Arc start angle (degrees) |
| `endAngle` | `number` | `135` | Arc end angle (degrees) |
| `color` | `string` | `var(--color-primary)` | Value arc color |
| `backgroundColor` | `string` | `var(--color-muted)` | Background arc color |
| `showValue` | `boolean` | `true` | Show value below gauge |
| `showMinMax` | `boolean` | `false` | Show min/max labels |
| `label` | `string` | - | Label text |
| `unit` | `string` | - | Unit suffix |
| `className` | `string` | - | Additional CSS classes |
| `segments` | `array` | - | Segmented color ranges |

---

## SPARKLINE

Sparkline is a compact, inline chart for showing trends at a glance. Perfect for KPI cards, tables, and dashboards where space is limited.

### Basic Sparkline

```tsx
import { Sparkline } from '@/components/charts/sparkline';

const trendData = [12, 15, 11, 18, 22, 19, 25, 28, 24, 30];

export function TrendIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span>Revenue</span>
      <Sparkline data={trendData} width={100} height={30} />
    </div>
  );
}
```

### With Area Fill

```tsx
<Sparkline
  data={trendData}
  width={100}
  height={30}
  showArea
  color="var(--color-primary)"
/>
```

### With Dots

```tsx
<Sparkline
  data={trendData}
  width={120}
  height={35}
  showDots
  strokeWidth={2}
/>
```

### Custom Colors

```tsx
// Success trend
<Sparkline
  data={growthData}
  color="var(--color-success)"
  fillColor="var(--color-success)"
  showArea
/>

// Danger trend
<Sparkline
  data={declineData}
  color="var(--color-destructive)"
  showArea
/>
```

### Sparkline Card

Use the SparklineCard wrapper for KPI displays:

```tsx
import { SparklineCard } from '@/components/charts/sparkline';

<SparklineCard
  title="Monthly Revenue"
  value="$48,250"
  change={{ value: 12.5, label: 'vs last month' }}
  data={revenueHistory}
  showArea
/>

<SparklineCard
  title="Active Users"
  value="2,847"
  change={{ value: -3.2, label: 'vs last week' }}
  data={userHistory}
  sparklineColor="var(--color-chart-2)"
/>
```

### Sparkline Group

Display multiple sparklines in a list:

```tsx
import { SparklineGroup } from '@/components/charts/sparkline';

const metrics = [
  { label: 'Page Views', value: 125000, data: [100, 120, 115, 130, 125] },
  { label: 'Sessions', value: 45000, data: [40, 42, 38, 45, 48] },
  { label: 'Bounce Rate', value: '42%', data: [45, 43, 44, 42, 40], color: 'var(--color-chart-3)' },
];

<SparklineGroup items={metrics} />
```

### Inline Usage in Tables

```tsx
<Table>
  <TableBody>
    {products.map((product) => (
      <TableRow key={product.id}>
        <TableCell>{product.name}</TableCell>
        <TableCell>${product.revenue.toLocaleString()}</TableCell>
        <TableCell>
          <Sparkline
            data={product.salesTrend}
            width={60}
            height={20}
            strokeWidth={1.5}
          />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### All Sparkline Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `number[]` | required | Array of numeric values |
| `width` | `number` | `100` | Chart width |
| `height` | `number` | `30` | Chart height |
| `strokeWidth` | `number` | `2` | Line thickness |
| `color` | `string` | `var(--color-primary)` | Line color |
| `fillColor` | `string` | same as color | Area fill color |
| `showArea` | `boolean` | `false` | Show filled area |
| `showDots` | `boolean` | `false` | Show dots on points |
| `className` | `string` | - | Additional CSS classes |

### SparklineCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Card title |
| `value` | `string \| number` | required | Main metric value |
| `change.value` | `number` | - | Change percentage |
| `change.label` | `string` | - | Change description |
| `data` | `number[]` | required | Sparkline data |
| `sparklineColor` | `string` | - | Custom sparkline color |
| `showArea` | `boolean` | `true` | Show filled area |
| `className` | `string` | - | Additional CSS classes |

---

## THEMING AND CUSTOMIZATION

All charts automatically use the design system's theme colors. When users switch themes, charts update instantly.

### Theme Color Variables

Charts use these CSS custom properties:

```css
/* Chart colors (defined in globals.css) */
--color-chart-1: oklch(70% 0.15 240);  /* Primary chart color */
--color-chart-2: oklch(70% 0.15 180);
--color-chart-3: oklch(70% 0.15 120);
--color-chart-4: oklch(70% 0.15 60);
--color-chart-5: oklch(70% 0.15 300);
--color-chart-6: oklch(70% 0.15 0);
--color-chart-7: oklch(60% 0.1 240);
--color-chart-8: oklch(80% 0.1 180);

/* UI colors */
--color-primary: ...;
--color-muted: ...;
--color-muted-foreground: ...;
--color-border: ...;
--color-foreground: ...;
--color-background: ...;
```

### Using Theme Colors in Charts

```tsx
// Using CSS variables directly
<BarChart
  data={data}
  xAxisKey="category"
  series={[
    { dataKey: 'value', color: 'var(--color-chart-1)' },
  ]}
/>

// Multi-series with theme colors
<LineChart
  data={data}
  xAxisKey="date"
  series={[
    { dataKey: 'series1', color: 'var(--color-chart-1)' },
    { dataKey: 'series2', color: 'var(--color-chart-2)' },
    { dataKey: 'series3', color: 'var(--color-chart-3)' },
  ]}
/>
```

### Custom Color Arrays

Override the default palette:

```tsx
const brandColors = [
  'oklch(65% 0.20 250)',
  'oklch(70% 0.18 200)',
  'oklch(75% 0.15 150)',
  'oklch(70% 0.12 100)',
];

<BarChart
  data={data}
  xAxisKey="category"
  series={[{ dataKey: 'value' }]}
  colors={brandColors}
  colorByIndex
/>
```

### Semantic Colors

Use semantic colors for meaning:

```tsx
const statusData = [
  { status: 'Active', count: 850, color: 'var(--color-success)' },
  { status: 'Pending', count: 120, color: 'var(--color-warning)' },
  { status: 'Inactive', count: 230, color: 'var(--color-destructive)' },
];

<PieChart data={statusData} />
```

### Grid and Axis Styling

Charts automatically style grids and axes to match the theme:

```tsx
// Grid uses --color-border with 50% opacity
// Axis labels use --color-muted-foreground
// Axis lines use --color-border
```

### Tooltip Styling

Tooltips automatically match the theme:

```tsx
// Tooltips use:
// - bg-card for background
// - border-border for border
// - mode.radius for border radius
// - mode.font for monospace font
```

---

## DATA FORMATTING AND TRANSFORMATION

### Formatting Axis Labels

Use formatter functions for custom display:

```tsx
// Currency formatting
<BarChart
  data={revenueData}
  xAxisKey="month"
  series={[{ dataKey: 'revenue' }]}
  yAxisFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
/>

// Percentage formatting
<LineChart
  data={growthData}
  xAxisKey="date"
  series={[{ dataKey: 'rate' }]}
  yAxisFormatter={(value) => `${value.toFixed(1)}%`}
/>

// Date formatting
<LineChart
  data={timeSeriesData}
  xAxisKey="date"
  series={[{ dataKey: 'value' }]}
  xAxisFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
/>
```

### Formatting Tooltips

Customize tooltip display:

```tsx
<BarChart
  data={salesData}
  xAxisKey="product"
  series={[{ dataKey: 'revenue', name: 'Revenue' }]}
  tooltipFormatter={(value, name) => {
    if (name === 'Revenue') {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  }}
/>
```

### Data Transformation Utilities

```tsx
// Transform API data to chart format
function transformTimeSeriesData(apiData: ApiResponse[]): ChartDataPoint[] {
  return apiData.map((item) => ({
    date: new Date(item.timestamp).toISOString().split('T')[0],
    value: item.metric_value,
  }));
}

// Aggregate data by category
function aggregateByCategory(data: RawData[]): ChartDataPoint[] {
  const grouped = data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.value;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped).map(([category, value]) => ({
    category,
    value,
  }));
}

// Calculate percentages
function calculatePercentages(data: PieChartDataItem[]): PieChartDataItem[] {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return data.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));
}
```

### Handling Different Data Shapes

```tsx
// Reshape nested data
const apiResponse = {
  metrics: {
    revenue: [100, 120, 150],
    users: [50, 60, 75],
  },
  dates: ['2026-01', '2026-02', '2026-03'],
};

const chartData = apiResponse.dates.map((date, i) => ({
  date,
  revenue: apiResponse.metrics.revenue[i],
  users: apiResponse.metrics.users[i],
}));

// Flatten hierarchical data
function flattenHierarchy(node: TreeNode, result: ChartDataPoint[] = []): ChartDataPoint[] {
  result.push({ name: node.name, value: node.value });
  if (node.children) {
    node.children.forEach((child) => flattenHierarchy(child, result));
  }
  return result;
}
```

### Number Formatting Utilities

```tsx
// Compact number formatting
function formatCompact(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toString();
}

// Currency formatting
function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Percentage formatting
function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}
```

---

## LOADING STATES

Charts should show appropriate loading states while data is being fetched.

### Using Skeleton Components

```tsx
import { Skeleton } from '@/components/ui/skeleton';

function ChartWithLoading({ isLoading, data }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  return (
    <BarChart
      data={data}
      xAxisKey="month"
      series={[{ dataKey: 'value' }]}
      height={300}
    />
  );
}
```

### Loading State Pattern for Cards

```tsx
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ChartCard({ title, isLoading, data }) {
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-mono">
          [{isLoading ? '...' : '0x01'}] {title.toUpperCase()}
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-[250px] w-full" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ) : (
        <LineChart
          data={data}
          xAxisKey="date"
          series={[{ dataKey: 'value' }]}
          height={250}
        />
      )}
    </Card>
  );
}
```

### Shimmer Effect for Sparklines

```tsx
function SparklineWithLoading({ isLoading, data, ...props }) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="bg-muted rounded h-[30px] w-[100px]" />
      </div>
    );
  }

  return <Sparkline data={data} {...props} />;
}
```

### Loading State for Dashboard Grids

```tsx
function DashboardCharts({ isLoading, charts }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-[200px] w-full" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {charts.map((chart) => (
        <ChartCard key={chart.id} {...chart} />
      ))}
    </div>
  );
}
```

---

## EMPTY STATES

Handle missing or zero data gracefully.

### Empty Data Message

```tsx
function ChartWithEmptyState({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center text-center">
        <div className="text-muted-foreground">
          <p className="text-sm font-mono">[ NO DATA ]</p>
          <p className="text-xs mt-2">No data available for this period</p>
        </div>
      </div>
    );
  }

  return (
    <BarChart
      data={data}
      xAxisKey="category"
      series={[{ dataKey: 'value' }]}
      height={300}
    />
  );
}
```

### Custom Empty State with Actions

```tsx
import { Button } from '@/components/ui/button';
import { FileX } from 'lucide-react';

function ChartEmptyState({ onRefresh, onConfigure }) {
  return (
    <div className="flex h-[300px] flex-col items-center justify-center border border-dashed border-border rounded-dynamic p-6 text-center">
      <FileX className="h-10 w-10 text-muted-foreground mb-4" />
      <p className="text-sm font-mono text-muted-foreground mb-2">
        [ NO DATA AVAILABLE ]
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Try adjusting your filters or date range
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          REFRESH
        </Button>
        <Button variant="outline" size="sm" onClick={onConfigure}>
          CONFIGURE
        </Button>
      </div>
    </div>
  );
}
```

### Zero Values State

```tsx
function ChartWithZeroState({ data }) {
  const hasValues = data.some((item) => item.value > 0);

  if (!hasValues) {
    return (
      <div className="relative">
        {/* Show chart structure with zero values */}
        <BarChart
          data={data}
          xAxisKey="category"
          series={[{ dataKey: 'value' }]}
          height={300}
        />
        {/* Overlay message */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center">
            <p className="text-sm font-mono text-muted-foreground">
              [ ALL VALUES ARE ZERO ]
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Data will appear when activity is recorded
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BarChart
      data={data}
      xAxisKey="category"
      series={[{ dataKey: 'value' }]}
      height={300}
    />
  );
}
```

### Error States

```tsx
function ChartWithErrorState({ data, error, onRetry }) {
  if (error) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center border border-destructive/50 rounded-dynamic p-6 text-center">
        <p className="text-sm font-mono text-destructive mb-2">
          [ ERROR LOADING DATA ]
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          {error.message}
        </p>
        <Button variant="outline" size="sm" onClick={onRetry}>
          TRY AGAIN
        </Button>
      </div>
    );
  }

  return <BarChart data={data} {...chartProps} />;
}
```

---

## ANIMATION OPTIONS

Charts include built-in animations that can be customized or disabled.

### Recharts Animation Props

For Bar, Line, and Area charts (using Recharts):

```tsx
// Default animation (enabled)
<BarChart data={data} xAxisKey="category" series={[{ dataKey: 'value' }]} />

// Custom animation duration
<BarChart
  data={data}
  xAxisKey="category"
  series={[
    {
      dataKey: 'value',
      // Animation is controlled at the series level in Recharts
    },
  ]}
/>
```

### SVG Animation (Pie, Donut, Gauge, Funnel)

These components use CSS transitions:

```tsx
// Transitions are built into the components
// Hover states animate automatically
<PieChart data={data} />  // Segments scale on hover
<Gauge value={75} />      // Needle animates to position
<FunnelChart data={data} />  // Stages scale on hover
```

### Disable Animation for Performance

For dashboards with many charts or frequent updates:

```tsx
// Recharts components accept isAnimationActive
<LineChart
  data={data}
  xAxisKey="date"
  series={[{ dataKey: 'value' }]}
  // Note: Animation props are passed to Recharts internally
/>
```

### Transition Timing

CSS transitions in custom charts:

```css
/* Default transitions (applied automatically) */
.gauge-needle {
  transition: all 0.3s ease-out;
}

.sparkline-line {
  transition: stroke 0.2s ease;
}

.pie-segment {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
```

### Animation on Data Update

Charts automatically animate when data changes:

```tsx
const [data, setData] = useState(initialData);

// When data updates, charts animate to new values
useEffect(() => {
  const interval = setInterval(() => {
    setData(generateNewData());
  }, 5000);
  return () => clearInterval(interval);
}, []);

<LineChart data={data} {...props} />
```

---

## RESPONSIVE BEHAVIOR

All charts are responsive by default using ResponsiveContainer.

### Auto-Resizing

Charts automatically fill their container:

```tsx
// Chart fills available width
<div className="w-full">
  <BarChart data={data} xAxisKey="category" series={[{ dataKey: 'value' }]} />
</div>

// Chart in a grid cell
<div className="grid grid-cols-2 gap-4">
  <div>
    <LineChart data={data} {...props} />  {/* Fills grid cell */}
  </div>
</div>
```

### Responsive Grid Layouts

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card className="p-4">
    <LineChart data={revenueData} xAxisKey="month" series={[{ dataKey: 'revenue' }]} height={250} />
  </Card>
  <Card className="p-4">
    <BarChart data={salesData} xAxisKey="product" series={[{ dataKey: 'sales' }]} height={250} />
  </Card>
  <Card className="p-4">
    <DonutChart data={planData} size={250} />
  </Card>
</div>
```

### Adjusting Height for Screen Sizes

```tsx
function ResponsiveChart({ data }) {
  const [height, setHeight] = useState(300);

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerWidth < 768 ? 200 : 300);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <LineChart
      data={data}
      xAxisKey="date"
      series={[{ dataKey: 'value' }]}
      height={height}
    />
  );
}
```

### Responsive Sparklines

Sparklines work well in constrained spaces:

```tsx
<div className="flex items-center justify-between p-2">
  <span className="text-sm truncate mr-2">Revenue</span>
  <Sparkline
    data={trendData}
    width={60}   // Fixed small width
    height={20}
    strokeWidth={1.5}
  />
</div>
```

### Mobile-First Chart Layout

```tsx
function MobileOptimizedDashboard({ charts }) {
  return (
    <div className="space-y-4">
      {/* Full width on mobile */}
      <Card className="p-4">
        <LineChart
          data={charts.mainChart.data}
          {...charts.mainChart.props}
          height={200}
        />
      </Card>

      {/* Stack on mobile, side by side on tablet+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-4">
          <DonutChart data={charts.composition.data} size={180} />
        </Card>
        <Card className="p-4">
          <Gauge value={charts.progress.value} size={180} />
        </Card>
      </div>

      {/* Compact sparkline cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {charts.kpis.map((kpi) => (
          <SparklineCard key={kpi.id} {...kpi} />
        ))}
      </div>
    </div>
  );
}
```

---

## ACCESSIBILITY

Charts follow accessibility best practices to ensure all users can understand the data.

### Keyboard Navigation

Interactive charts support keyboard navigation:

```tsx
// PieChart and FunnelChart segments are focusable
<PieChart
  data={data}
  onSegmentClick={(item, index) => handleClick(item)}
  // Segments have tabIndex and onKeyDown handlers
/>

// Legend items are keyboard accessible
<DonutChart
  data={data}
  showLegend
  // Legend items respond to Enter and Space keys
/>
```

### ARIA Labels

Charts include appropriate ARIA attributes:

```tsx
// Funnel stages have aria-label
<FunnelChart
  data={funnelData}
  // Each stage: aria-label={`${stage.label}: ${stage.value}`}
/>

// Pie/Donut segments have aria-label
<PieChart
  data={pieData}
  // Each segment: aria-label={`${label}: ${percentage}%`}
/>
```

### Color Contrast

Theme colors maintain sufficient contrast:

```tsx
// Chart colors are designed to meet WCAG contrast requirements
// Text on charts uses high-contrast foreground colors
// Tooltips use bg-card with text-foreground
```

### Screen Reader Considerations

Provide text alternatives for charts:

```tsx
function AccessibleChart({ data, title, description }) {
  return (
    <div>
      {/* Visible title */}
      <h3 className="text-sm font-semibold mb-2">{title}</h3>

      {/* Screen reader description */}
      <p className="sr-only">{description}</p>

      {/* Chart */}
      <BarChart data={data} {...chartProps} />

      {/* Optional: Data table for screen readers */}
      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.category}>
              <td>{item.category}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Focus Indicators

Interactive elements show focus states:

```tsx
// Built-in focus styles
// PieChart legend items: focus-visible:ring-2 focus-visible:ring-primary
// FunnelChart stages: focus-visible:ring-2 focus-visible:ring-primary
```

### Reduced Motion

Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .sparkline-line,
  .gauge-needle,
  .pie-segment {
    transition: none;
  }
}
```

---

## DASHBOARD INTEGRATION

Combine charts effectively in dashboard layouts.

### Complete Dashboard Example

```tsx
import { Card } from '@/components/ui/card';
import { BarChart, BarChartCard } from '@/components/charts/bar-chart';
import { LineChart, LineChartCard } from '@/components/charts/line-chart';
import { DonutChart, MetricDonutChart } from '@/components/charts/donut-chart';
import { FunnelChart } from '@/components/charts/funnel-chart';
import { Gauge, ScoreGauge } from '@/components/charts/gauge';
import { Sparkline, SparklineCard } from '@/components/charts/sparkline';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export function AnalyticsDashboard({ stats }) {
  return (
    <div className="space-y-6">
      {/* KPI Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SparklineCard
          title="Total Revenue"
          value={`$${(stats.revenue.total / 1000).toFixed(0)}k`}
          change={{ value: stats.revenue.change, label: 'vs last month' }}
          data={stats.revenue.trend}
          sparklineColor="var(--color-chart-1)"
        />
        <SparklineCard
          title="Active Users"
          value={stats.users.total.toLocaleString()}
          change={{ value: stats.users.change, label: 'vs last month' }}
          data={stats.users.trend}
          sparklineColor="var(--color-chart-2)"
        />
        <SparklineCard
          title="Conversion Rate"
          value={`${stats.conversion.rate}%`}
          change={{ value: stats.conversion.change, label: 'vs last month' }}
          data={stats.conversion.trend}
          sparklineColor="var(--color-chart-3)"
        />
        <SparklineCard
          title="Avg. Order Value"
          value={`$${stats.aov.value}`}
          change={{ value: stats.aov.change, label: 'vs last month' }}
          data={stats.aov.trend}
          sparklineColor="var(--color-chart-4)"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LineChartCard
          title="Revenue Trend"
          description="Monthly revenue over time"
          code="0x01"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          data={stats.revenueTrend}
          xAxisKey="month"
          series={[
            { dataKey: 'revenue', name: 'Revenue' },
            { dataKey: 'target', name: 'Target', dashed: true },
          ]}
          yAxisFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          showLegend
          height={280}
        />
        <BarChartCard
          title="Sales by Category"
          description="Product category breakdown"
          code="0x02"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          data={stats.salesByCategory}
          xAxisKey="category"
          series={[{ dataKey: 'sales', name: 'Sales', radius: [4, 4, 0, 0] }]}
          colorByIndex
          height={280}
        />
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="mb-4">
            <span className="text-muted-foreground text-xs font-mono">
              [0x03] USERS BY PLAN
            </span>
          </div>
          <MetricDonutChart
            data={stats.usersByPlan}
            size={220}
            metric={{
              value: stats.totalUsers.toLocaleString(),
              label: 'Total Users',
            }}
          />
        </Card>

        <Card className="col-span-1 md:col-span-2 p-4">
          <div className="mb-4">
            <span className="text-muted-foreground text-xs font-mono">
              [0x04] CONVERSION FUNNEL
            </span>
          </div>
          <FunnelChart
            data={stats.conversionFunnel}
            height={250}
            width={500}
            showValues
            showPercentages
          />
        </Card>
      </div>

      {/* Score Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 flex flex-col items-center">
          <span className="text-muted-foreground text-xs font-mono mb-2">
            HEALTH SCORE
          </span>
          <ScoreGauge score={stats.healthScore} size={140} />
        </Card>
        <Card className="p-4 flex flex-col items-center">
          <span className="text-muted-foreground text-xs font-mono mb-2">
            NPS SCORE
          </span>
          <Gauge value={stats.npsScore} min={-100} max={100} size={140} />
        </Card>
        <Card className="p-4 flex flex-col items-center">
          <span className="text-muted-foreground text-xs font-mono mb-2">
            GOAL PROGRESS
          </span>
          <Gauge value={stats.goalProgress} size={140} unit="%" />
        </Card>
        <Card className="p-4 flex flex-col items-center">
          <span className="text-muted-foreground text-xs font-mono mb-2">
            UPTIME
          </span>
          <Gauge value={stats.uptime} size={140} unit="%" color="var(--color-success)" />
        </Card>
      </div>
    </div>
  );
}
```

### Real-Time Dashboard Pattern

```tsx
function RealTimeDashboard() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData((prev) => ({
        ...prev,
        ...newData,
      }));
    };

    return () => ws.close();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Charts update automatically when data changes */}
      <LineChart data={data.timeSeries} {...props} />
      <Gauge value={data.currentMetric} {...props} />
      <SparklineCard value={data.kpi} data={data.kpiTrend} />
    </div>
  );
}
```

### Dashboard with Filters

```tsx
function FilterableDashboard() {
  const [dateRange, setDateRange] = useState('30d');
  const [category, setCategory] = useState('all');

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', dateRange, category],
    queryFn: () => fetchDashboardData({ dateRange, category }),
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <DashboardCharts data={data} />
      )}
    </div>
  );
}
```

---

## CHOOSING THE RIGHT CHART

Select the appropriate chart type based on your data and message.

### Decision Guide

| Question | Best Chart Type |
|----------|----------------|
| How do categories compare? | Bar Chart |
| How does a value change over time? | Line Chart |
| What is the volume over time? | Area Chart |
| What are the parts of a whole? | Pie Chart (2-6 items) |
| What is a key metric + composition? | Donut Chart |
| What is the conversion through stages? | Funnel Chart |
| What is the progress toward a goal? | Gauge |
| What is the trend at a glance? | Sparkline |

### Comparison Charts

**Bar Chart** - Best for comparing discrete categories:

```tsx
// Good: Comparing sales across products
<BarChart data={productSales} xAxisKey="product" series={[{ dataKey: 'sales' }]} />

// Good: Comparing metrics across regions
<BarChart data={regionalData} xAxisKey="region" series={[{ dataKey: 'revenue' }]} horizontal />
```

**Stacked Bar Chart** - Best for comparing composition across categories:

```tsx
// Good: Revenue breakdown by source for each month
<StackedBarChart data={monthlyRevenue} xAxisKey="month" stackKeys={['organic', 'paid', 'referral']} />
```

### Trend Charts

**Line Chart** - Best for showing change over time:

```tsx
// Good: User growth over months
<LineChart data={userGrowth} xAxisKey="month" series={[{ dataKey: 'users' }]} />

// Good: Comparing multiple metrics over time
<LineChart data={metrics} xAxisKey="date" series={[
  { dataKey: 'revenue' },
  { dataKey: 'expenses' },
]} />
```

**Area Chart** - Best for emphasizing volume or cumulative values:

```tsx
// Good: Total revenue over time
<AreaChart data={revenue} xAxisKey="month" series={[{ dataKey: 'total' }]} />

// Good: Stacked composition over time
<StackedAreaChart data={traffic} xAxisKey="date" stackKeys={['mobile', 'desktop', 'tablet']} />
```

### Composition Charts

**Pie Chart** - Best for showing parts of a whole (2-6 items):

```tsx
// Good: Distribution across a few categories
<PieChart data={planDistribution} />

// Avoid: Too many segments
// Use Bar Chart instead if > 6 categories
```

**Donut Chart** - Best when you need a central metric:

```tsx
// Good: Show total in center with breakdown
<MetricDonutChart data={breakdown} metric={{ value: '$45k', label: 'Total' }} />
```

### Process Charts

**Funnel Chart** - Best for sequential conversion:

```tsx
// Good: Marketing/sales funnel
<FunnelChart data={conversionSteps} />

// Good: User journey stages
<FunnelChart data={onboardingSteps} />
```

### Progress Charts

**Gauge** - Best for single metric against a range:

```tsx
// Good: Performance score
<Gauge value={75} max={100} label="Performance" />

// Good: Goal progress
<Gauge value={12500} max={20000} label="Sales Target" />
```

**Progress Donut** - Best for completion percentage:

```tsx
// Good: Project completion
<ProgressDonutChart value={68} label="Complete" />
```

### Compact Indicators

**Sparkline** - Best for trend at a glance:

```tsx
// Good: KPI cards with trend
<SparklineCard title="Revenue" value="$48k" data={trendData} />

// Good: Table cells with trend
<Sparkline data={rowTrend} width={60} height={20} />
```

---

## BEST PRACTICES

### Data Best Practices

1. **Limit data points** - Too many points clutter the visualization
   - Bar charts: 5-15 categories
   - Line/Area charts: 10-50 points
   - Pie/Donut charts: 2-6 segments

2. **Sort meaningfully** - Order data to tell a story
   - Chronological for time series
   - Descending for rankings
   - Logical grouping for categories

3. **Handle outliers** - Extreme values can skew perception
   - Consider logarithmic scales
   - Use annotations for context
   - Filter or separate outliers

### Visual Best Practices

1. **Use consistent colors** - Stick to design system tokens
   ```tsx
   // Good
   series={[
     { dataKey: 'a', color: 'var(--color-chart-1)' },
     { dataKey: 'b', color: 'var(--color-chart-2)' },
   ]}
   ```

2. **Add context** - Help users understand the data
   ```tsx
   <BarChart
     data={data}
     yAxisFormatter={(v) => `$${v.toLocaleString()}`}
     tooltipFormatter={(v) => `$${v.toLocaleString()} USD`}
   />
   ```

3. **Keep it simple** - One message per chart
   - Avoid combining too many series
   - Use separate charts for different stories
   - Remove unnecessary grid lines or decorations

### Performance Best Practices

1. **Virtualize large datasets** - Render only visible points

2. **Debounce real-time updates** - Batch rapid data changes
   ```tsx
   const debouncedData = useDebounce(data, 100);
   <LineChart data={debouncedData} />
   ```

3. **Disable animations for frequent updates**
   ```tsx
   // When data updates every second
   <BarChart data={liveData} /* animations auto-disabled on rapid updates */ />
   ```

4. **Use Sparklines for dense layouts** - Lower overhead than full charts

### Accessibility Best Practices

1. **Provide text alternatives** - Include data tables for screen readers

2. **Use semantic colors** - Green for positive, red for negative
   ```tsx
   const changeColor = change >= 0 ? 'var(--color-success)' : 'var(--color-destructive)';
   ```

3. **Ensure keyboard navigation** - All interactive elements are focusable

4. **Test with screen readers** - Verify ARIA labels are helpful

### Dashboard Best Practices

1. **Lead with KPIs** - Put key metrics at the top
2. **Group related charts** - Use visual hierarchy
3. **Provide filters** - Let users explore the data
4. **Include time context** - Show date ranges and update times
5. **Handle all states** - Loading, empty, error conditions

---

## SUMMARY

Fabrk's 8 chart components provide a complete data visualization toolkit:

| Chart | Use Case | Key Props |
|-------|----------|-----------|
| **BarChart** | Category comparison | `xAxisKey`, `series`, `horizontal`, `colorByIndex` |
| **LineChart** | Trends over time | `xAxisKey`, `series`, `type`, `dashed` |
| **AreaChart** | Volume over time | `xAxisKey`, `series`, `gradient`, `stackId` |
| **PieChart** | Part-to-whole (2-6) | `data`, `showLabels`, `showPercentages` |
| **DonutChart** | Metric + composition | `data`, `thickness`, `centerContent` |
| **FunnelChart** | Sequential conversion | `data`, `direction`, `showPercentages` |
| **Gauge** | Progress/score | `value`, `max`, `segments` |
| **Sparkline** | Compact trend | `data`, `showArea`, `showDots` |

All charts automatically adapt to theme changes, support responsive layouts, and follow accessibility best practices.

Data visualization, terminal-styled.

