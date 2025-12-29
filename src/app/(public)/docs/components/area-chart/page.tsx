'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { AreaChart, AreaChartCard, StackedAreaChart } from '@/components/ui/area-chart';
import { TrendingUp } from 'lucide-react';

const sampleData = [
  { month: 'Jan', revenue: 4000, users: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398 },
  { month: 'Mar', revenue: 2000, users: 9800 },
  { month: 'Apr', revenue: 2780, users: 3908 },
  { month: 'May', revenue: 1890, users: 4800 },
  { month: 'Jun', revenue: 2390, users: 3800 },
];

const stackedData = [
  { month: 'Jan', desktop: 186, mobile: 80, tablet: 45 },
  { month: 'Feb', desktop: 305, mobile: 200, tablet: 100 },
  { month: 'Mar', desktop: 237, mobile: 120, tablet: 150 },
  { month: 'Apr', desktop: 73, mobile: 190, tablet: 50 },
  { month: 'May', desktop: 209, mobile: 130, tablet: 100 },
  { month: 'Jun', desktop: 250, mobile: 140, tablet: 90 },
];

export default function AreaChartPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.108]"
      category="Charts"
      title="Area Chart"
      description="A multi-series area chart built with Recharts. Supports gradient fills, stacked areas, and theme-aware colors."
      importCode={`import { AreaChart, AreaChartCard, StackedAreaChart } from "@/components/ui/area-chart"`}
      mainPreview={{
        preview: (
          <div className="w-full p-4">
            <AreaChart
              data={sampleData}
              xAxisKey="month"
              series={[
                { dataKey: 'revenue', name: 'Revenue' },
                { dataKey: 'users', name: 'Users' },
              ]}
              height={300}
              showLegend={true}
            />
          </div>
        ),
        code: `<AreaChart
  data={data}
  xAxisKey="month"
  series={[
    { dataKey: "revenue", name: "Revenue" },
    { dataKey: "users", name: "Users" },
  ]}
  height={300}
  showLegend={true}
/>`,
      }}
      variants={[
        {
          title: 'With Card Wrapper',
          description: 'Area chart in a terminal-styled card.',
          preview: (
            <div className="w-full p-4">
              <AreaChartCard
                title="Revenue Analytics"
                description="Monthly revenue trend"
                code="0x01"
                icon={<TrendingUp className="text-primary h-4 w-4" />}
                data={sampleData}
                xAxisKey="month"
                series={[{ dataKey: 'revenue', name: 'Revenue' }]}
                height={250}
              />
            </div>
          ),
          code: `<AreaChartCard
  title="Revenue Analytics"
  description="Monthly revenue trend"
  code="0x01"
  icon={<TrendingUp className="h-4 w-4 text-primary" />}
  data={data}
  xAxisKey="month"
  series={[{ dataKey: "revenue", name: "Revenue" }]}
/>`,
        },
        {
          title: 'Without Gradient',
          description: 'Flat fill without gradient effect.',
          preview: (
            <div className="w-full p-4">
              <AreaChart
                data={sampleData}
                xAxisKey="month"
                series={[{ dataKey: 'revenue', name: 'Revenue', fillOpacity: 0.3 }]}
                height={200}
                gradient={false}
              />
            </div>
          ),
          code: `<AreaChart
  data={data}
  xAxisKey="month"
  series={[{ dataKey: "revenue", fillOpacity: 0.3 }]}
  gradient={false}
/>`,
        },
        {
          title: 'Stacked Areas',
          description: 'Multiple series stacked on top of each other.',
          preview: (
            <div className="w-full p-4">
              <StackedAreaChart
                data={stackedData}
                xAxisKey="month"
                stackKeys={['desktop', 'mobile', 'tablet']}
                stackLabels={['Desktop', 'Mobile', 'Tablet']}
                height={250}
              />
            </div>
          ),
          code: `<StackedAreaChart
  data={data}
  xAxisKey="month"
  stackKeys={["desktop", "mobile", "tablet"]}
  stackLabels={["Desktop", "Mobile", "Tablet"]}
/>`,
        },
        {
          title: 'With Dots',
          description: 'Area chart with visible data points.',
          preview: (
            <div className="w-full p-4">
              <AreaChart
                data={sampleData}
                xAxisKey="month"
                series={[
                  {
                    dataKey: 'revenue',
                    name: 'Revenue',
                    showDots: true,
                    dotSize: 5,
                  },
                ]}
                height={200}
              />
            </div>
          ),
          code: `<AreaChart
  data={data}
  xAxisKey="month"
  series={[
    { dataKey: "revenue", showDots: true, dotSize: 5 },
  ]}
/>`,
        },
        {
          title: 'Step Type',
          description: 'Area chart with step interpolation.',
          preview: (
            <div className="w-full p-4">
              <AreaChart
                data={sampleData}
                xAxisKey="month"
                series={[{ dataKey: 'users', name: 'Users', type: 'step' }]}
                height={200}
              />
            </div>
          ),
          code: `<AreaChart
  data={data}
  xAxisKey="month"
  series={[{ dataKey: "users", type: "step" }]}
/>`,
        },
      ]}
      props={[
        {
          name: 'data',
          type: 'AreaChartDataPoint[]',
          required: true,
          description: 'Chart data array.',
        },
        {
          name: 'xAxisKey',
          type: 'string',
          required: true,
          description: 'Data key for X-axis.',
        },
        {
          name: 'series',
          type: 'AreaChartSeries[]',
          required: true,
          description: 'Area series configuration.',
        },
        {
          name: 'height',
          type: 'number',
          default: '300',
          description: 'Chart height in pixels.',
        },
        {
          name: 'showGrid',
          type: 'boolean',
          default: 'true',
          description: 'Show grid lines.',
        },
        {
          name: 'showLegend',
          type: 'boolean',
          default: 'false',
          description: 'Show legend.',
        },
        {
          name: 'showTooltip',
          type: 'boolean',
          default: 'true',
          description: 'Show tooltip on hover.',
        },
        {
          name: 'gradient',
          type: 'boolean',
          default: 'true',
          description: 'Use gradient fill effect.',
        },
        {
          name: 'yAxisFormatter',
          type: '(value: number) => string',
          description: 'Y-axis value formatter.',
        },
        {
          name: 'xAxisFormatter',
          type: '(value: string) => string',
          description: 'X-axis value formatter.',
        },
      ]}
      accessibility={[
        'Keyboard accessible tooltips',
        'Color-blind friendly with distinguishable patterns',
        'Accessible legend with proper labels',
        'Theme-aware colors update automatically on theme change',
      ]}
      previous={{ title: 'Typography', href: '/docs/components/typography' }}
      next={{ title: 'Bar Chart', href: '/docs/components/bar-chart' }}
    />
  );
}
