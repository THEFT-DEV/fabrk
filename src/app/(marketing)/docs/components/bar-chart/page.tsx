'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { BarChart, BarChartCard, StackedBarChart } from '@/components/ui/bar-chart';
import { BarChart3 } from 'lucide-react';

const sampleData = [
  { category: 'Jan', value: 400, target: 300 },
  { category: 'Feb', value: 300, target: 350 },
  { category: 'Mar', value: 520, target: 400 },
  { category: 'Apr', value: 278, target: 300 },
  { category: 'May', value: 189, target: 250 },
  { category: 'Jun', value: 390, target: 400 },
];

const stackedData = [
  { month: 'Jan', desktop: 186, mobile: 80, tablet: 45 },
  { month: 'Feb', desktop: 305, mobile: 200, tablet: 100 },
  { month: 'Mar', desktop: 237, mobile: 120, tablet: 150 },
  { month: 'Apr', desktop: 73, mobile: 190, tablet: 50 },
  { month: 'May', desktop: 209, mobile: 130, tablet: 100 },
];

export default function BarChartPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.107]"
      category="Charts"
      title="Bar Chart"
      description="A versatile bar chart built with Recharts. Supports vertical/horizontal layouts, stacked bars, and color customization."
      importCode={`import { BarChart, BarChartCard, StackedBarChart } from "@/components/ui/bar-chart"`}
      mainPreview={{
        preview: (
          <div className="w-full p-4">
            <BarChart
              data={sampleData}
              xAxisKey="category"
              series={[
                { dataKey: 'value', name: 'Actual' },
                { dataKey: 'target', name: 'Target' },
              ]}
              height={300}
              showLegend={true}
            />
          </div>
        ),
        code: `<BarChart
  data={data}
  xAxisKey="category"
  series={[
    { dataKey: "value", name: "Actual" },
    { dataKey: "target", name: "Target" },
  ]}
  height={300}
  showLegend={true}
/>`,
      }}
      variants={[
        {
          title: 'With Card Wrapper',
          description: 'Bar chart in a terminal-styled card.',
          preview: (
            <div className="w-full p-4">
              <BarChartCard
                title="Monthly Performance"
                description="Actual vs Target"
                code="0x01"
                icon={<BarChart3 className="text-primary h-4 w-4" />}
                data={sampleData}
                xAxisKey="category"
                series={[{ dataKey: 'value', name: 'Value' }]}
                height={250}
              />
            </div>
          ),
          code: `<BarChartCard
  title="Monthly Performance"
  code="0x01"
  icon={<BarChart3 className="h-4 w-4 text-primary" />}
  data={data}
  xAxisKey="category"
  series={[{ dataKey: "value", name: "Value" }]}
/>`,
        },
        {
          title: 'Horizontal Bars',
          description: 'Bar chart with horizontal layout.',
          preview: (
            <div className="w-full p-4">
              <BarChart
                data={sampleData.slice(0, 4)}
                xAxisKey="category"
                series={[{ dataKey: 'value', name: 'Value' }]}
                height={200}
                horizontal={true}
              />
            </div>
          ),
          code: `<BarChart
  data={data}
  xAxisKey="category"
  series={[{ dataKey: "value", name: "Value" }]}
  horizontal={true}
/>`,
        },
        {
          title: 'Stacked Bars',
          description: 'Bar chart with stacked segments.',
          preview: (
            <div className="w-full p-4">
              <StackedBarChart
                data={stackedData}
                xAxisKey="month"
                stackKeys={['desktop', 'mobile', 'tablet']}
                stackLabels={['Desktop', 'Mobile', 'Tablet']}
                height={250}
              />
            </div>
          ),
          code: `<StackedBarChart
  data={data}
  xAxisKey="month"
  stackKeys={["desktop", "mobile", "tablet"]}
  stackLabels={["Desktop", "Mobile", "Tablet"]}
/>`,
        },
        {
          title: 'Color by Index',
          description: 'Each bar with different color.',
          preview: (
            <div className="w-full p-4">
              <BarChart
                data={sampleData.slice(0, 4)}
                xAxisKey="category"
                series={[{ dataKey: 'value', name: 'Value' }]}
                height={200}
                colorByIndex={true}
              />
            </div>
          ),
          code: `<BarChart
  data={data}
  xAxisKey="category"
  series={[{ dataKey: "value" }]}
  colorByIndex={true}
/>`,
        },
      ]}
      props={[
        {
          name: 'data',
          type: 'BarChartDataPoint[]',
          required: true,
          description: 'Chart data array.',
        },
        {
          name: 'xAxisKey',
          type: 'string',
          required: true,
          description: 'Data key for X-axis (categories).',
        },
        {
          name: 'series',
          type: 'BarChartSeries[]',
          required: true,
          description: 'Bar series configuration.',
        },
        {
          name: 'height',
          type: 'number',
          default: '300',
          description: 'Chart height in pixels.',
        },
        {
          name: 'horizontal',
          type: 'boolean',
          default: 'false',
          description: 'Use horizontal bar layout.',
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
          name: 'barSize',
          type: 'number',
          description: 'Fixed bar width in pixels.',
        },
        {
          name: 'barGap',
          type: 'number',
          default: '4',
          description: 'Gap between bars.',
        },
        {
          name: 'colorByIndex',
          type: 'boolean',
          default: 'false',
          description: 'Color each bar differently.',
        },
      ]}
      accessibility={[
        'Keyboard accessible tooltips',
        'Color-blind friendly palette',
        'Accessible legend with proper labels',
      ]}
      previous={{ title: 'Area Chart', href: '/docs/components/area-chart' }}
      next={{ title: 'Donut Chart', href: '/docs/components/donut-chart' }}
    />
  );
}
