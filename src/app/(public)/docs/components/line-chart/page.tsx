'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { LineChart, LineChartCard } from '@/components/ui/line-chart';
import { TrendingUp } from 'lucide-react';

const sampleData = [
  { month: 'Jan', revenue: 4000, users: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398 },
  { month: 'Mar', revenue: 2000, users: 9800 },
  { month: 'Apr', revenue: 2780, users: 3908 },
  { month: 'May', revenue: 1890, users: 4800 },
  { month: 'Jun', revenue: 2390, users: 3800 },
];

export default function LineChartPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.106]"
      category="Charts"
      title="Line Chart"
      description="A multi-series line chart built with Recharts. Supports multiple data series, tooltips, legends, and customizable styling."
      importCode={`import { LineChart, LineChartCard } from "@/components/ui/line-chart"`}
      mainPreview={{
        preview: (
          <div className="w-full p-4">
            <LineChart
              data={sampleData}
              xAxisKey="month"
              series={[
                {
                  dataKey: 'revenue',
                  name: 'Revenue',
                  color: 'var(--color-primary)',
                },
                {
                  dataKey: 'users',
                  name: 'Users',
                  color: 'var(--color-accent)',
                },
              ]}
              height={300}
              showLegend={true}
            />
          </div>
        ),
        code: `<LineChart
  data={data}
  xAxisKey="month"
  series={[
    { dataKey: "revenue", name: "Revenue", color: "var(--color-primary)" },
    { dataKey: "users", name: "Users", color: "var(--color-accent)" },
  ]}
  height={300}
  showLegend={true}
/>`,
      }}
      variants={[
        {
          title: 'With Card Wrapper',
          description: 'Line chart in a terminal-styled card.',
          preview: (
            <div className="w-full p-4">
              <LineChartCard
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
          code: `<LineChartCard
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
          title: 'Single Series',
          description: 'Simple single-line chart.',
          preview: (
            <div className="w-full p-4">
              <LineChart
                data={sampleData}
                xAxisKey="month"
                series={[{ dataKey: 'revenue', name: 'Revenue', showDots: true }]}
                height={200}
                showGrid={true}
              />
            </div>
          ),
          code: `<LineChart
  data={data}
  xAxisKey="month"
  series={[{ dataKey: "revenue", name: "Revenue", showDots: true }]}
  height={200}
/>`,
        },
        {
          title: 'Dashed Line',
          description: 'Line chart with dashed styling.',
          preview: (
            <div className="w-full p-4">
              <LineChart
                data={sampleData}
                xAxisKey="month"
                series={[
                  { dataKey: 'revenue', name: 'Revenue' },
                  { dataKey: 'users', name: 'Users (Projected)', dashed: true },
                ]}
                height={200}
              />
            </div>
          ),
          code: `<LineChart
  data={data}
  xAxisKey="month"
  series={[
    { dataKey: "revenue", name: "Revenue" },
    { dataKey: "users", name: "Users (Projected)", dashed: true },
  ]}
/>`,
        },
      ]}
      props={[
        {
          name: 'data',
          type: 'LineChartDataPoint[]',
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
          type: 'LineChartSeries[]',
          required: true,
          description: 'Line series configuration.',
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
      ]}
      previous={{ title: 'Heatmap', href: '/docs/components/heatmap' }}
      next={{ title: 'Pie Chart', href: '/docs/components/pie-chart' }}
    />
  );
}
