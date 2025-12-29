'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Sparkline, SparklineCard, SparklineGroup } from '@/components/ui/sparkline';

export default function SparklinePage() {
  /* eslint-disable design-system/no-hardcoded-colors -- Chart examples require specific colors for demonstrations */
  const sampleData = [4, 8, 5, 10, 7, 12, 8, 15, 11, 14];
  const revenueData = [120, 140, 130, 170, 150, 190, 160, 200, 180, 220];
  const usersData = [45, 52, 48, 60, 55, 70, 65, 75, 72, 80];
  const _ordersData = [10, 15, 12, 20, 18, 25, 22, 30, 28, 35];

  return (
    <ComponentShowcaseTemplate
      code="[UI.28]"
      title="Sparkline"
      description="Compact line charts for showing trends and data patterns inline with text or in small spaces."
      importCode={`import { Sparkline, SparklineCard, SparklineGroup } from "@/components/ui/sparkline";`}
      mainPreview={{
        preview: <Sparkline data={sampleData} width={100} height={30} strokeWidth={2} />,
        code: `<Sparkline
  data={[4, 8, 5, 10, 7, 12, 8, 15, 11, 14]}
  width={100}
  height={30}
  strokeWidth={2}
/>`,
      }}
      variants={[
        {
          title: 'With Area Fill',
          description: 'Sparkline with filled area below the line',
          preview: (
            <div className="flex gap-4">
              <Sparkline data={sampleData} width={100} height={40} showArea={true} />
              <Sparkline
                data={revenueData}
                width={100}
                height={40}
                showArea={true}
                color="oklch(70% 0.15 160)"
              />
              <Sparkline
                data={usersData}
                width={100}
                height={40}
                showArea={true}
                color="oklch(70% 0.15 295)"
              />
            </div>
          ),
          code: `<Sparkline
  data={sampleData}
  width={100}
  height={40}
  showArea={true}
/>
<Sparkline
  data={revenueData}
  width={100}
  height={40}
  showArea={true}
  color="oklch(70% 0.15 160)"
/>`,
        },
        {
          title: 'With Dots',
          description: 'Sparkline showing data points',
          preview: (
            <div className="flex gap-4">
              <Sparkline data={sampleData} width={120} height={40} showDots={true} />
              <Sparkline
                data={revenueData}
                width={120}
                height={40}
                showDots={true}
                showArea={true}
              />
            </div>
          ),
          code: `<Sparkline
  data={sampleData}
  width={120}
  height={40}
  showDots={true}
/>
<Sparkline
  data={revenueData}
  width={120}
  height={40}
  showDots={true}
  showArea={true}
/>`,
        },
        {
          title: 'Sparkline Card',
          description: 'Metric card with embedded sparkline',
          preview: (
            <div className="grid gap-4 md:grid-cols-2">
              <SparklineCard
                title="Revenue"
                value="$12,345"
                change={{ value: 12.5, label: 'vs last month' }}
                data={revenueData}
                sparklineColor="oklch(70% 0.15 160)"
              />
              <SparklineCard
                title="Active Users"
                value="2,847"
                change={{ value: -5.2, label: 'vs last week' }}
                data={usersData}
                sparklineColor="oklch(70% 0.15 295)"
              />
            </div>
          ),
          code: `<SparklineCard
  title="Revenue"
  value="$12,345"
  change={{ value: 12.5, label: "vs last month" }}
  data={revenueData}
  sparklineColor="oklch(70% 0.15 160)"
/>
<SparklineCard
  title="Active Users"
  value="2,847"
  change={{ value: -5.2, label: "vs last week" }}
  data={usersData}
  sparklineColor="oklch(70% 0.15 295)"
/>`,
        },
        {
          title: 'Sparkline Group',
          description: 'List of metrics with inline sparklines',
          preview: (
            <SparklineGroup
              items={[
                {
                  label: 'Page Views',
                  value: 12345,
                  data: [100, 120, 115, 140, 130, 150, 145, 160],
                  color: 'oklch(70% 0.15 220)',
                },
                {
                  label: 'Sessions',
                  value: 8234,
                  data: [80, 85, 90, 95, 88, 100, 105, 110],
                  color: 'oklch(70% 0.15 160)',
                },
                {
                  label: 'Bounce Rate',
                  value: 42.3,
                  data: [50, 48, 45, 43, 44, 42, 41, 40],
                  color: 'oklch(70% 0.15 30)',
                },
              ]}
            />
          ),
          code: `<SparklineGroup
  items={[
    {
      label: "Page Views",
      value: 12345,
      data: [100, 120, 115, 140, 130, 150, 145, 160],
      color: "oklch(70% 0.15 220)",
    },
    {
      label: "Sessions",
      value: 8234,
      data: [80, 85, 90, 95, 88, 100, 105, 110],
      color: "oklch(70% 0.15 160)",
    },
  ]}
/>`,
        },
        {
          title: 'Custom Colors',
          description: 'Sparklines with different color schemes',
          preview: (
            <div className="flex gap-4">
              <Sparkline
                data={sampleData}
                width={100}
                height={40}
                showArea={true}
                color="oklch(60% 0.20 25)"
                fillColor="oklch(60% 0.20 25)"
              />
              <Sparkline
                data={revenueData}
                width={100}
                height={40}
                showArea={true}
                color="oklch(70% 0.15 60)"
                fillColor="oklch(70% 0.15 60)"
              />
              <Sparkline
                data={usersData}
                width={100}
                height={40}
                showArea={true}
                color="oklch(70% 0.15 295)"
                fillColor="oklch(70% 0.15 295)"
              />
            </div>
          ),
          code: `<Sparkline
  data={sampleData}
  width={100}
  height={40}
  showArea={true}
  color="oklch(60% 0.20 25)"
  fillColor="oklch(60% 0.20 25)"
/>`,
        },
      ]}
      props={[
        {
          name: 'data',
          type: 'number[]',
          required: true,
          description: 'Array of numeric values to plot',
        },
        {
          name: 'width',
          type: 'number',
          default: '100',
          description: 'Width of the sparkline in pixels',
        },
        {
          name: 'height',
          type: 'number',
          default: '30',
          description: 'Height of the sparkline in pixels',
        },
        {
          name: 'strokeWidth',
          type: 'number',
          default: '2',
          description: 'Width of the line stroke',
        },
        {
          name: 'color',
          type: 'string',
          default: '"var(--color-primary)"',
          description: 'Color of the line',
        },
        {
          name: 'fillColor',
          type: 'string',
          description: 'Color of the area fill (defaults to color)',
        },
        {
          name: 'showArea',
          type: 'boolean',
          default: 'false',
          description: 'Show filled area below line',
        },
        {
          name: 'showDots',
          type: 'boolean',
          default: 'false',
          description: 'Show dots at data points',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ]}
      accessibility={[
        'Sparklines are decorative visualizations - always provide text alternatives',
        'Use SparklineCard to combine sparklines with accessible text metrics',
        'SVG elements have semantic class names for styling',
        'Automatically scales data to fit the available space',
        'Minimum 2 data points required to render',
        'Works with any numeric data range (auto-scales)',
        'Color customization supports any valid CSS color',
      ]}
      previous={{ title: 'Stat Card', href: '/docs/components/stat-card' }}
      next={{ title: 'Gauge', href: '/docs/components/gauge' }}
    />
  );
  /* eslint-enable design-system/no-hardcoded-colors */
}
