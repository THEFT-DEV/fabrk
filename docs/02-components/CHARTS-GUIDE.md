# Charts & Visualization Guide

Complete guide to using the chart components in Fabrk boilerplate.

## Overview

The chart library includes 6 pure SVG chart components with no external dependencies:

- **Pie Chart** - Show proportions of a whole
- **Donut Chart** - Pie chart with hollow center
- **Sparkline** - Compact inline trend lines
- **Gauge** - Circular progress indicators
- **Heatmap** - Grid-based intensity visualization
- **Funnel Chart** - Conversion flow tracking

**Why Pure SVG?**
- No dependencies (no Recharts, Chart.js)
- Smaller bundle size (~12KB vs ~200KB)
- Full customization control
- Theme-responsive
- Accessible

## Pie Chart

### Basic Usage

```tsx
import { PieChart } from '@/components/ui/pie-chart';

const data = [
  { label: 'Product A', value: 30, color: 'oklch(70% 0.15 240)' },
  { label: 'Product B', value: 45, color: 'oklch(70% 0.15 160)' },
  { label: 'Product C', value: 25, color: 'oklch(70% 0.15 60)' },
];

<PieChart data={data} size={300} showLabels={true} showValues={true} />
```

### Props

```typescript
interface PieChartDataItem {
  label: string;
  value: number;
  color?: string; // Auto-generated if not provided
}

interface PieChartProps {
  data: PieChartDataItem[];
  size?: number; // Default: 400px
  innerRadius?: number; // For donut effect (0-0.9)
  showLabels?: boolean; // Default: true
  showValues?: boolean; // Default: true
  showLegend?: boolean; // Default: true
  onSliceClick?: (item: PieChartDataItem, index: number) => void;
  className?: string;
}
```

### Dashboard Example

```tsx
export default function SalesDashboard() {
  const salesByCategory = [
    { label: 'Electronics', value: 45000 },
    { label: 'Clothing', value: 32000 },
    { label: 'Home & Garden', value: 21000 },
    { label: 'Sports', value: 18000 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <PieChart
          data={salesByCategory}
          size={350}
          onSliceClick={(item) => {
            console.log('Clicked:', item.label);
          }}
        />
      </CardContent>
    </Card>
  );
}
```

## Donut Chart

Donut charts are pie charts with a hollow center, perfect for displaying a key metric in the middle.

### Basic Usage

```tsx
import { DonutChart } from '@/components/ui/donut-chart';

<DonutChart
  data={data}
  size={300}
  innerRadius={0.6} // 60% hollow
  centerText="Total"
  centerValue="$116K"
/>
```

### With Center Content

```tsx
const completionData = [
  { label: 'Complete', value: 75, color: 'oklch(70% 0.15 160)' },
  { label: 'Incomplete', value: 25, color: 'oklch(90% 0.02 0)' },
];

<DonutChart
  data={completionData}
  size={200}
  innerRadius={0.7}
  centerText="Progress"
  centerValue="75%"
  showLegend={false}
/>
```

## Sparkline

Compact trend lines for inline metrics.

### Basic Usage

```tsx
import { Sparkline } from '@/components/ui/sparkline';

const weeklyData = [120, 150, 180, 160, 200, 190, 220];

<div className="flex items-center gap-2">
  <span className="font-bold">Revenue</span>
  <Sparkline
    data={weeklyData}
    width={100}
    height={30}
    color="oklch(70% 0.15 160)"
    showDots={true}
  />
  <span className="text-sm text-muted-foreground">+22%</span>
</div>
```

### Props

```typescript
interface SparklineProps {
  data: number[];
  width?: number; // Default: 200px
  height?: number; // Default: 60px
  color?: string;
  showDots?: boolean; // Default: false
  showArea?: boolean; // Fill area under line
  smoothing?: number; // 0-1, default: 0.2
  className?: string;
}
```

### Table Integration

```tsx
const metrics = [
  { name: 'Sales', current: 220, data: [120, 150, 180, 160, 200, 190, 220], trend: '+22%' },
  { name: 'Users', current: 1450, data: [1100, 1200, 1300, 1350, 1400, 1420, 1450], trend: '+8%' },
  { name: 'Revenue', current: 45000, data: [35000, 38000, 40000, 42000, 43000, 44000, 45000], trend: '+12%' },
];

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Metric</TableHead>
      <TableHead>Current</TableHead>
      <TableHead>Trend</TableHead>
      <TableHead>Last 7 Days</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {metrics.map((metric) => (
      <TableRow key={metric.name}>
        <TableCell className="font-medium">{metric.name}</TableCell>
        <TableCell className="font-bold">{metric.current.toLocaleString()}</TableCell>
        <TableCell className="text-success">{metric.trend}</TableCell>
        <TableCell>
          <Sparkline data={metric.data} width={120} height={40} showDots={true} />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Gauge

Circular progress indicators, perfect for dashboards.

### Basic Usage

```tsx
import { Gauge } from '@/components/ui/gauge';

<Gauge
  value={75}
  min={0}
  max={100}
  label="CPU Usage"
  unit="%"
  size={200}
  color="oklch(70% 0.15 240)"
/>
```

### Props

```typescript
interface GaugeProps {
  value: number;
  min?: number; // Default: 0
  max?: number; // Default: 100
  label?: string;
  unit?: string;
  size?: number; // Default: 200px
  thickness?: number; // Default: 20px
  color?: string;
  backgroundColor?: string;
  showMinMax?: boolean; // Show min/max labels
  startAngle?: number; // Default: -180 (half circle)
  endAngle?: number; // Default: 0
  segments?: Array<{ value: number; color: string; label?: string }>;
  className?: string;
}
```

### Dashboard Grid

```tsx
export default function SystemMetrics() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <Gauge
            value={68}
            label="CPU Usage"
            unit="%"
            size={180}
            color="oklch(70% 0.15 240)"
            showMinMax={true}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Gauge
            value={72}
            label="Memory"
            unit=" GB"
            size={180}
            color="oklch(70% 0.15 160)"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Gauge
            value={34}
            label="Disk I/O"
            unit=" MB/s"
            size={180}
            color="oklch(70% 0.15 60)"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Gauge
            value={15}
            label="Network"
            unit=" Mbps"
            size={180}
            color="oklch(70% 0.20 340)"
          />
        </CardContent>
      </Card>
    </div>
  );
}
```

### Segmented Gauge

```tsx
<Gauge
  value={65}
  max={100}
  size={220}
  label="Overall Score"
  segments={[
    { value: 25, color: 'oklch(60% 0.20 25)', label: 'Poor' },
    { value: 25, color: 'oklch(70% 0.15 30)', label: 'Fair' },
    { value: 25, color: 'oklch(70% 0.15 60)', label: 'Good' },
    { value: 25, color: 'oklch(70% 0.15 160)', label: 'Excellent' },
  ]}
/>
```

### Score Gauge Variant

```tsx
import { ScoreGauge } from '@/components/ui/gauge';

// Automatically color-coded by score
<div className="flex gap-8">
  <ScoreGauge score={45} label="Poor" />
  <ScoreGauge score={65} label="Fair" />
  <ScoreGauge score={82} label="Good" />
  <ScoreGauge score={95} label="Excellent" />
</div>
```

## Heatmap

Grid-based intensity visualization.

### Basic Usage

```tsx
import { Heatmap } from '@/components/ui/heatmap';

const weeklyActivity = [];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => i);

for (const day of days) {
  for (const hour of hours) {
    weeklyActivity.push({
      x: hour,
      y: day,
      value: Math.floor(Math.random() * 100),
    });
  }
}

<Heatmap data={weeklyActivity} cellSize={32} gap={2} />
```

### Props

```typescript
interface HeatmapDataItem {
  x: string | number;
  y: string | number;
  value: number;
}

interface HeatmapProps {
  data: HeatmapDataItem[];
  cellSize?: number; // Default: 40px
  gap?: number; // Default: 2px
  colorScale?: string[]; // Default: 5-color blue scale
  showValues?: boolean; // Default: false
  showLabels?: boolean; // Default: true
  onCellClick?: (item: HeatmapDataItem) => void;
  className?: string;
}
```

### GitHub Contributions Style

```tsx
const generateYearData = () => {
  const weeks = Array.from({ length: 52 }, (_, i) => `W${i + 1}`);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return weeks.flatMap((week) =>
    days.map((day) => ({
      x: week,
      y: day,
      value: Math.floor(Math.random() * 10),
    }))
  );
};

<Card>
  <CardHeader>
    <CardTitle>Contribution Activity</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="overflow-auto">
      <Heatmap
        data={generateYearData()}
        cellSize={12}
        gap={2}
        colorScale={[
          'hsl(var(--muted))',
          'oklch(85% 0.1 160)',
          'oklch(75% 0.15 160)',
          'oklch(65% 0.20 160)',
          'oklch(55% 0.25 160)',
        ]}
        showLabels={false}
      />
    </div>
    <p className="text-xs text-muted-foreground mt-2">
      365 contributions in the last year
    </p>
  </CardContent>
</Card>
```

## Funnel Chart

Conversion flow visualization.

### Basic Usage

```tsx
import { FunnelChart } from '@/components/ui/funnel-chart';

const salesFunnel = [
  { label: 'Visitors', value: 10000 },
  { label: 'Product Views', value: 5000 },
  { label: 'Add to Cart', value: 2000 },
  { label: 'Checkout', value: 800 },
  { label: 'Purchase', value: 500 },
];

<FunnelChart
  data={salesFunnel}
  width={600}
  height={400}
  showPercentages={true}
/>
```

### Props

```typescript
interface FunnelStage {
  label: string;
  value: number;
  color?: string;
}

interface FunnelChartProps {
  data: FunnelStage[];
  height?: number; // Default: 400px
  width?: number; // Default: 600px
  gap?: number; // Space between stages
  showValues?: boolean; // Default: true
  showPercentages?: boolean; // Default: true
  direction?: 'vertical' | 'horizontal';
  onStageClick?: (stage: FunnelStage, index: number) => void;
  className?: string;
}
```

### E-commerce Funnel

```tsx
export default function EcommerceFunnel() {
  const funnelData = [
    { label: 'Visitors', value: 10000 },
    { label: 'Product Views', value: 5000 },
    { label: 'Add to Cart', value: 2000 },
    { label: 'Checkout', value: 800 },
    { label: 'Purchase', value: 500 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>E-commerce Sales Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <FunnelChart data={funnelData} width={600} height={400} />

        <div className="mt-6 pt-4 border-t-2 border-brutal grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Overall Conversion</p>
            <p className="text-2xl font-black">5%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-black">$45,000</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Combining Charts

### Analytics Dashboard

```tsx
export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards with Sparklines */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-black">$45,231</p>
                <p className="text-xs text-success">+12%</p>
              </div>
              <Sparkline
                data={[35, 38, 40, 42, 43, 44, 45]}
                width={80}
                height={40}
                color="oklch(70% 0.15 160)"
              />
            </div>
          </CardContent>
        </Card>
        {/* More KPI cards... */}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={categoryData} size={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <FunnelChart data={funnelData} width={400} height={300} />
          </CardContent>
        </Card>
      </div>

      {/* Gauges Row */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <Gauge value={68} label="Server Load" unit="%" size={150} />
          </CardContent>
        </Card>
        {/* More gauges... */}
      </div>
    </div>
  );
}
```

## Performance Tips

1. **Memoize Data**: Use `useMemo` for chart data calculations
2. **Debounce Updates**: Debounce real-time data updates
3. **Lazy Load**: Use dynamic imports for charts not immediately visible
4. **Optimize Renders**: Use `React.memo` for chart components

```tsx
const chartData = useMemo(() => {
  return processRawData(rawData);
}, [rawData]);

const DebouncedChart = React.memo(({ data }) => (
  <PieChart data={data} />
));
```

## Accessibility

All charts include:
- ARIA labels for screen readers
- Keyboard navigation (where applicable)
- Color-blind friendly default colors
- High contrast mode support
- Hover tooltips with values

```tsx
// Charts automatically include ARIA
<PieChart
  data={data}
  // aria-label automatically added
  // Hover tooltips show values
/>
```

## Theming

Charts respond to theme changes automatically:

```tsx
// Charts use design tokens
const data = [
  { label: 'A', value: 30, color: 'oklch(70% 0.15 var(--primary-hue))' },
  { label: 'B', value: 45, color: 'oklch(70% 0.15 var(--secondary-hue))' },
];

// Or use theme-aware defaults (no color specified)
const data = [
  { label: 'A', value: 30 },
  { label: 'B', value: 45 },
];
```

## Troubleshooting

### Chart Not Rendering
- Ensure data array has at least 1 item
- Check that values are numbers, not strings
- Verify parent container has defined dimensions

### Colors Not Showing
- Use OKLCH format: `oklch(70% 0.15 240)`
- Or omit color prop to use defaults

### Performance Issues
- Reduce number of data points
- Use `React.memo` and `useMemo`
- Consider virtualization for large datasets

---

**Next Steps:**
- View [component documentation examples](http://localhost:6006)
- Check [Component Library README](../COMPONENT-LIBRARY-README.md)
- Explore [E-commerce Guide](./ECOMMERCE-GUIDE.md)
