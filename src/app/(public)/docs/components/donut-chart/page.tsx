'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DonutChart, MetricDonutChart, ProgressDonutChart } from '@/components/ui/donut-chart';
import { useState } from 'react';

export default function DonutChartPage() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  /* eslint-disable design-system/no-hardcoded-colors -- Chart data requires specific colors for data visualization */
  const categoryData = [
    { label: 'Design', value: 35, color: 'oklch(70% 0.15 295)' },
    { label: 'Development', value: 45, color: 'oklch(70% 0.15 220)' },
    { label: 'Marketing', value: 20, color: 'oklch(70% 0.15 160)' },
  ];

  const revenueData = [
    { label: 'Product Sales', value: 125000, color: 'oklch(70% 0.15 295)' },
    { label: 'Services', value: 75000, color: 'oklch(70% 0.15 220)' },
    { label: 'Subscriptions', value: 50000, color: 'oklch(70% 0.15 160)' },
  ];

  const trafficData = [
    { label: 'Organic', value: 4200, color: 'oklch(70% 0.15 160)' },
    { label: 'Direct', value: 3100, color: 'oklch(70% 0.15 220)' },
    { label: 'Referral', value: 2300, color: 'oklch(70% 0.15 295)' },
    { label: 'Social', value: 1400, color: 'oklch(70% 0.15 60)' },
  ];

  /* eslint-disable design-system/no-hardcoded-colors -- Chart examples require specific colors for demonstrations */
  return (
    <ComponentShowcaseTemplate
      code="[UI.30]"
      title="Donut Chart"
      description="A circular chart component for displaying proportional data with optional center content and interactive segments."
      importCode={`import { DonutChart, MetricDonutChart, ProgressDonutChart } from "@/components/ui/donut-chart";`}
      mainPreview={{
        preview: <DonutChart data={categoryData} size={300} thickness={60} showLegend={true} />,
        code: `<DonutChart
  data={[
    { label: "Design", value: 35, color: "oklch(70% 0.15 295)" },
    { label: "Development", value: 45, color: "oklch(70% 0.15 220)" },
    { label: "Marketing", value: 20, color: "oklch(70% 0.15 160)" },
  ]}
  size={300}
  thickness={60}
  showLegend={true}
/>`,
      }}
      variants={[
        {
          title: 'With Center Metric',
          description: 'Donut chart displaying a metric in the center',
          preview: (
            <MetricDonutChart
              data={revenueData}
              size={320}
              thickness={60}
              metric={{
                value: '$250K',
                label: 'Total Revenue',
                sublabel: 'Q4 2024',
              }}
              showLegend={true}
            />
          ),
          code: `<MetricDonutChart
  data={revenueData}
  size={320}
  thickness={60}
  metric={{
    value: "$250K",
    label: "Total Revenue",
    sublabel: "Q4 2024",
  }}
  showLegend={true}
/>`,
        },
        {
          title: 'Progress Donut',
          description: 'Simple progress indicator as a donut chart',
          preview: (
            <div className="flex flex-wrap justify-center gap-8">
              <ProgressDonutChart
                value={75}
                size={200}
                thickness={30}
                label="Completion"
                showPercentage={true}
                color="oklch(70% 0.15 160)"
              />
              <ProgressDonutChart
                value={42}
                size={200}
                thickness={30}
                label="Storage Used"
                showPercentage={true}
                color="oklch(70% 0.15 295)"
              />
            </div>
          ),
          code: `<ProgressDonutChart
  value={75}
  size={200}
  thickness={30}
  label="Completion"
  showPercentage={true}
  color="oklch(70% 0.15 160)"
/>
<ProgressDonutChart
  value={42}
  size={200}
  thickness={30}
  label="Storage Used"
  showPercentage={true}
  color="oklch(70% 0.15 295)"
/>`,
        },
        {
          title: 'Interactive Segments',
          description: 'Clickable segments with selection feedback',
          preview: (
            <div className="flex flex-col items-center gap-4">
              <DonutChart
                data={categoryData}
                size={280}
                thickness={50}
                showLegend={true}
                onSegmentClick={(item, _index) => {
                  setSelectedSegment(item.label);
                }}
              />
              {selectedSegment && (
                <div className="text-muted-foreground text-sm">Selected: {selectedSegment}</div>
              )}
            </div>
          ),
          code: `<DonutChart
  data={categoryData}
  size={280}
  thickness={50}
  showLegend={true}
  onSegmentClick={(item, index) => {
    setSelectedSegment(item.label);
  }}
/>`,
        },
        {
          title: 'Traffic Sources',
          description: 'Multi-segment chart with 4+ categories',
          preview: (
            <MetricDonutChart
              data={trafficData}
              size={320}
              thickness={60}
              metric={{
                value: '11K',
                label: 'Total Visits',
                sublabel: 'Last 30 days',
              }}
              showLegend={true}
            />
          ),
          code: `<MetricDonutChart
  data={[
    { label: "Organic", value: 4200, color: "oklch(70% 0.15 160)" },
    { label: "Direct", value: 3100, color: "oklch(70% 0.15 220)" },
    { label: "Referral", value: 2300, color: "oklch(70% 0.15 295)" },
    { label: "Social", value: 1400, color: "oklch(70% 0.15 60)" },
  ]}
  size={320}
  thickness={60}
  metric={{
    value: "11K",
    label: "Total Visits",
    sublabel: "Last 30 days",
  }}
  showLegend={true}
/>`,
        },
        {
          title: 'Without Legend',
          description: 'Compact donut chart with labels and percentages',
          preview: (
            <DonutChart
              data={categoryData}
              size={250}
              thickness={50}
              showLabels={true}
              showPercentages={true}
              showLegend={false}
            />
          ),
          code: `<DonutChart
  data={categoryData}
  size={250}
  thickness={50}
  showLabels={true}
  showPercentages={true}
  showLegend={false}
/>`,
        },
        {
          title: 'Thin Ring Style',
          description: 'Donut chart with thin ring thickness',
          preview: (
            <MetricDonutChart
              data={categoryData}
              size={280}
              thickness={30}
              metric={{
                value: '100%',
                label: 'Project Time',
              }}
              showLegend={true}
            />
          ),
          code: `<MetricDonutChart
  data={categoryData}
  size={280}
  thickness={30}
  metric={{
    value: "100%",
    label: "Project Time",
  }}
  showLegend={true}
/>`,
        },
      ]}
      props={[
        {
          name: 'data',
          type: 'PieChartDataItem[]',
          required: true,
          description: 'Array of data segments with label, value, and color',
        },
        {
          name: 'size',
          type: 'number',
          default: '300',
          description: 'Chart diameter in pixels',
        },
        {
          name: 'thickness',
          type: 'number',
          default: '60',
          description: 'Ring thickness in pixels',
        },
        {
          name: 'showLabels',
          type: 'boolean',
          default: 'false',
          description: 'Show labels on chart segments',
        },
        {
          name: 'showPercentages',
          type: 'boolean',
          default: 'true',
          description: 'Show percentage values',
        },
        {
          name: 'showLegend',
          type: 'boolean',
          default: 'true',
          description: 'Display legend below chart',
        },
        {
          name: 'centerContent',
          type: 'React.ReactNode',
          description: 'Content to display in center of donut',
        },
        {
          name: 'onSegmentClick',
          type: '(item: PieChartDataItem, index: number) => void',
          description: 'Callback when segment is clicked',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ]}
      accessibility={[
        'Built on top of PieChart component with donut-specific features',
        'Segments are interactive and respond to clicks when onSegmentClick is provided',
        'Legend provides accessible alternative to reading chart visually',
        'Center content is positioned absolutely and excludes pointer events to allow segment clicks',
        'MetricDonutChart variant includes semantic text hierarchy for metrics',
        'ProgressDonutChart provides simple 2-segment progress visualization',
        'All text elements meet WCAG AA contrast requirements',
      ]}
      previous={{ title: 'Gauge', href: '/docs/components/gauge' }}
      next={{ title: 'Copy Button', href: '/docs/components/copy-button' }}
    />
  );
  /* eslint-enable design-system/no-hardcoded-colors */
}
