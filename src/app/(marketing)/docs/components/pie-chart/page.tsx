'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { PieChart, PieChartDataItem } from '@/components/ui/pie-chart';
import { toast } from 'sonner';

export default function PieChartPage() {
  const sampleData: PieChartDataItem[] = [
    { label: 'React', value: 45 },
    { label: 'TypeScript', value: 30 },
    { label: 'Node.js', value: 15 },
    { label: 'PostgreSQL', value: 10 },
  ];

  const revenueData: PieChartDataItem[] = [
    { label: 'Subscriptions', value: 65 },
    { label: 'One-time Sales', value: 25 },
    { label: 'Consulting', value: 10 },
  ];

  const trafficData: PieChartDataItem[] = [
    { label: 'Direct', value: 40 },
    { label: 'Search', value: 30 },
    { label: 'Social', value: 20 },
    { label: 'Referral', value: 10 },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.42]"
      category="Components"
      title="Pie Chart"
      description="Interactive pie chart visualization component with legend, hover effects, and donut variant support."
      importCode={`import { PieChart, PieChartDataItem } from "@/components/ui/pie-chart";`}
      mainPreview={{
        preview: <PieChart data={sampleData} />,
        code: `const data: PieChartDataItem[] = [
  { label: "React", value: 45 },
  { label: "TypeScript", value: 30 },
  { label: "Node.js", value: 15 },
  { label: "PostgreSQL", value: 10 },
];

<PieChart data={data} />`,
      }}
      variants={[
        {
          title: 'Donut Chart',
          description: 'Hollow center variant for modern look',
          preview: <PieChart data={revenueData} innerRadius={60} />,
          code: `<PieChart
  data={data}
  innerRadius={60}
/>`,
        },
        {
          title: 'With Labels on Segments',
          description: 'Display labels directly on pie segments',
          preview: <PieChart data={revenueData} showLabels={true} showLegend={false} />,
          code: `<PieChart
  data={data}
  showLabels={true}
  showLegend={false}
/>`,
        },
        {
          title: 'Without Percentages',
          description: 'Hide percentage values in legend',
          preview: <PieChart data={trafficData} showPercentages={false} />,
          code: `<PieChart
  data={data}
  showPercentages={false}
/>`,
        },
        {
          title: 'Custom Size',
          description: 'Adjust chart diameter',
          preview: (
            <div className="grid gap-6 md:grid-cols-2">
              <PieChart data={sampleData} size={200} />
              <PieChart data={sampleData} size={250} innerRadius={70} />
            </div>
          ),
          code: `<PieChart data={data} size={200} />
<PieChart data={data} size={250} innerRadius={70} />`,
        },
        /* eslint-disable design-system/no-hardcoded-colors -- Demo showing custom OKLCH colors */
        {
          title: 'Custom Colors',
          description: 'Override default color scheme with direct OKLCH colors',
          preview: (
            <PieChart
              data={[
                { label: 'Success', value: 40, color: 'oklch(70% 0.2 145)' },
                { label: 'Warning', value: 30, color: 'oklch(80% 0.18 85)' },
                { label: 'Error', value: 20, color: 'oklch(60% 0.22 25)' },
                { label: 'Info', value: 10, color: 'oklch(65% 0.18 240)' },
              ]}
            />
          ),
          code: `<PieChart
  data={[
    { label: "Success", value: 40, color: "oklch(70% 0.2 145)" },  // Green
    { label: "Warning", value: 30, color: "oklch(80% 0.18 85)" },  // Yellow
    { label: "Error", value: 20, color: "oklch(60% 0.22 25)" },    // Red
    { label: "Info", value: 10, color: "oklch(65% 0.18 240)" },    // Blue
  ]}
/>`,
        },
        /* eslint-enable design-system/no-hardcoded-colors */
        {
          title: 'Interactive with Click Handler',
          description: 'Handle segment clicks for drill-down',
          preview: (
            <PieChart
              data={revenueData}
              onSegmentClick={(item, _index) =>
                toast.info(
                  `${item.label}: ${item.value} (${((item.value / revenueData.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(1)}%)`
                )
              }
            />
          ),
          code: `<PieChart
  data={data}
  onSegmentClick={(item, index) => {
    // Handle segment click - show toast, navigate, etc.
  }}
/>`,
        },
      ]}
      props={[
        {
          name: 'data',
          type: 'PieChartDataItem[]',
          required: true,
          description: 'Array of data items with label, value, and optional color',
        },
        {
          name: 'size',
          type: 'number',
          default: '300',
          description: 'Chart diameter in pixels',
        },
        {
          name: 'showLabels',
          type: 'boolean',
          default: 'false',
          description: 'Display labels on pie segments (only if percentage > 5%)',
        },
        {
          name: 'showPercentages',
          type: 'boolean',
          default: 'true',
          description: 'Show percentage values in labels and legend',
        },
        {
          name: 'showLegend',
          type: 'boolean',
          default: 'true',
          description: 'Display interactive legend below chart',
        },
        {
          name: 'innerRadius',
          type: 'number',
          default: '0',
          description: 'Inner radius for donut chart (0 = solid pie)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the container',
        },
        {
          name: 'onSegmentClick',
          type: '(item: PieChartDataItem, index: number) => void',
          description: 'Callback when a segment is clicked',
        },
      ]}
      accessibility={[
        'SVG paths use proper fill colors from data or defaults',
        'Hover effects scale segments slightly for visual feedback',
        "Legend items have role='button' and keyboard support (Enter/Space)",
        'Each legend item has aria-label with full details',
        'Colors automatically cycle through 8-color default palette',
        'Percentages calculated automatically from values',
        'Small segments (<5%) hide labels to prevent overlap',
        'Legend highlighting dims non-hovered segments',
      ]}
      previous={{ title: 'Member Card', href: '/docs/components/member-card' }}
      next={{
        title: 'Status Indicator',
        href: '/docs/components/status-indicator',
      }}
    />
  );
}
