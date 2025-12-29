'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Heatmap, HeatmapDataItem } from '@/components/ui/heatmap';
import { toast } from 'sonner';

export default function HeatmapPage() {
  /* eslint-disable design-system/no-hardcoded-colors -- Chart examples require specific colors for demonstrations */
  // Sample data for weekly activity
  const weeklyData: HeatmapDataItem[] = [
    { x: 'Mon', y: 'Week 1', value: 12 },
    { x: 'Tue', y: 'Week 1', value: 18 },
    { x: 'Wed', y: 'Week 1', value: 24 },
    { x: 'Thu', y: 'Week 1', value: 15 },
    { x: 'Fri', y: 'Week 1', value: 8 },
    { x: 'Mon', y: 'Week 2', value: 22 },
    { x: 'Tue', y: 'Week 2', value: 28 },
    { x: 'Wed', y: 'Week 2', value: 32 },
    { x: 'Thu', y: 'Week 2', value: 25 },
    { x: 'Fri', y: 'Week 2', value: 18 },
    { x: 'Mon', y: 'Week 3', value: 15 },
    { x: 'Tue', y: 'Week 3', value: 20 },
    { x: 'Wed', y: 'Week 3', value: 28 },
    { x: 'Thu', y: 'Week 3', value: 22 },
    { x: 'Fri', y: 'Week 3', value: 12 },
  ];

  // Sample data for months
  const monthlyData: HeatmapDataItem[] = [
    { x: 'Q1', y: 'Sales', value: 45 },
    { x: 'Q2', y: 'Sales', value: 62 },
    { x: 'Q3', y: 'Sales', value: 58 },
    { x: 'Q4', y: 'Sales', value: 78 },
    { x: 'Q1', y: 'Marketing', value: 32 },
    { x: 'Q2', y: 'Marketing', value: 48 },
    { x: 'Q3', y: 'Marketing', value: 55 },
    { x: 'Q4', y: 'Marketing', value: 42 },
    { x: 'Q1', y: 'Support', value: 28 },
    { x: 'Q2', y: 'Support', value: 35 },
    { x: 'Q3', y: 'Support', value: 42 },
    { x: 'Q4', y: 'Support', value: 38 },
  ];

  // Compact data for small heatmap
  const compactData: HeatmapDataItem[] = [
    { x: 'A', y: '1', value: 10 },
    { x: 'B', y: '1', value: 25 },
    { x: 'C', y: '1', value: 15 },
    { x: 'A', y: '2', value: 30 },
    { x: 'B', y: '2', value: 20 },
    { x: 'C', y: '2', value: 35 },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.39]"
      category="Components"
      title="Heatmap"
      description="A data visualization component that displays values in a grid with color-coded cells based on intensity."
      importCode={`import { Heatmap, HeatmapDataItem } from "@/components/ui/heatmap";`}
      mainPreview={{
        preview: <Heatmap data={weeklyData} />,
        code: `const data: HeatmapDataItem[] = [
  { x: "Mon", y: "Week 1", value: 12 },
  { x: "Tue", y: "Week 1", value: 18 },
  { x: "Wed", y: "Week 1", value: 24 },
  // ... more data
];

<Heatmap data={data} />`,
      }}
      variants={[
        {
          title: 'With Values Displayed',
          description: 'Show numeric values inside each cell',
          preview: <Heatmap data={compactData} showValues={true} cellSize={60} />,
          code: `<Heatmap
  data={data}
  showValues={true}
  cellSize={60}
/>`,
        },
        {
          title: 'Without Labels',
          description: 'Hide axis labels for a cleaner look',
          preview: <Heatmap data={compactData} showLabels={false} />,
          code: `<Heatmap
  data={data}
  showLabels={false}
/>`,
        },
        {
          title: 'Custom Cell Size',
          description: 'Adjust the size of heatmap cells',
          preview: <Heatmap data={compactData} cellSize={50} gap={4} />,
          code: `<Heatmap
  data={data}
  cellSize={50}
  gap={4}
/>`,
        },
        {
          title: 'Custom Color Scale',
          description: 'Use custom colors for intensity gradient',
          preview: (
            <Heatmap
              data={compactData}
              colorScale={[
                'var(--color-muted)',
                'oklch(80% 0.15 160)',
                'oklch(70% 0.20 160)',
                'oklch(60% 0.25 160)',
                'oklch(50% 0.30 160)',
              ]}
            />
          ),
          code: `<Heatmap
  data={data}
  colorScale={[
    "var(--color-muted)",
    "oklch(80% 0.15 160)",
    "oklch(70% 0.20 160)",
    "oklch(60% 0.25 160)",
    "oklch(50% 0.30 160)",
  ]}
/>`,
        },
        {
          title: 'Interactive with Click Handler',
          description: 'Handle cell clicks for drill-down functionality',
          preview: (
            <Heatmap
              data={monthlyData}
              cellSize={45}
              onCellClick={(item) => toast.info(`${item.y} × ${item.x}: ${item.value}`)}
            />
          ),
          code: `<Heatmap
  data={data}
  onCellClick={(item) => {
    alert(\`\${item.y} × \${item.x}: \${item.value}\`);
  }}
/>`,
        },
      ]}
      props={[
        {
          name: 'data',
          type: 'HeatmapDataItem[]',
          required: true,
          description: 'Array of data points with x, y, and value properties',
        },
        {
          name: 'cellSize',
          type: 'number',
          default: '40',
          description: 'Size of each cell in pixels',
        },
        {
          name: 'gap',
          type: 'number',
          default: '2',
          description: 'Gap between cells in pixels',
        },
        {
          name: 'colorScale',
          type: 'string[]',
          default: '5-color blue gradient',
          description: 'Array of colors for intensity gradient from low to high',
        },
        {
          name: 'showValues',
          type: 'boolean',
          default: 'false',
          description: 'Display numeric values inside cells',
        },
        {
          name: 'showLabels',
          type: 'boolean',
          default: 'true',
          description: 'Show axis labels for x and y coordinates',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the container',
        },
        {
          name: 'onCellClick',
          type: '(item: HeatmapDataItem) => void',
          description: 'Callback function when a cell is clicked',
        },
      ]}
      accessibility={[
        "Cells have role='button' and tabIndex for keyboard navigation",
        'Each cell has descriptive aria-label with coordinates and value',
        'Hover state provides visual tooltip with cell information',
        'Color intensity automatically calculated from data range',
        'Keyboard support: Enter or Space to activate cell click',
        'Empty cells are visually distinct with muted background',
      ]}
      previous={{ title: 'Gauge', href: '/docs/components/gauge' }}
      next={{ title: 'KPI Card', href: '/docs/components/kpi-card' }}
    />
  );
  /* eslint-enable design-system/no-hardcoded-colors */
}
