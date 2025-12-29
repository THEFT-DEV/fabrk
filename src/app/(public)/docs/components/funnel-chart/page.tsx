'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { FunnelChart } from '@/components/ui/funnel-chart';
import { toast } from 'sonner';

export default function FunnelChartPage() {
  const salesFunnel = [
    { label: 'Visitors', value: 10000 },
    { label: 'Leads', value: 5000 },
    { label: 'Qualified', value: 2500 },
    { label: 'Proposals', value: 1000 },
    { label: 'Customers', value: 400 },
  ];

  const marketingFunnel = [
    { label: 'Impressions', value: 50000 },
    { label: 'Clicks', value: 5000 },
    { label: 'Sign-ups', value: 1000 },
    { label: 'Active Users', value: 500 },
  ];

  const simpleFunnel = [
    { label: 'Stage 1', value: 1000 },
    { label: 'Stage 2', value: 750 },
    { label: 'Stage 3', value: 500 },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.85]"
      category="Components"
      title="Funnel Chart"
      description="Visualize conversion funnels with interactive stages showing values and conversion rates."
      importCode={`import { FunnelChart } from "@/components/ui/funnel-chart"`}
      mainPreview={{
        preview: <FunnelChart data={salesFunnel} />,
        code: `const salesFunnel = [
  { label: "Visitors", value: 10000 },
  { label: "Leads", value: 5000 },
  { label: "Qualified", value: 2500 },
  { label: "Proposals", value: 1000 },
  { label: "Customers", value: 400 },
];

<FunnelChart data={salesFunnel} />`,
      }}
      variants={[
        {
          title: 'With Values Only',
          description: 'Display absolute numbers without percentages',
          preview: <FunnelChart data={marketingFunnel} showPercentages={false} height={300} />,
          code: `<FunnelChart
  data={funnel}
  showPercentages={false}
/>`,
        },
        {
          title: 'Without Values',
          description: 'Show only labels for a cleaner look',
          preview: (
            <FunnelChart
              data={marketingFunnel}
              showValues={false}
              showPercentages={false}
              height={300}
            />
          ),
          code: `<FunnelChart
  data={funnel}
  showValues={false}
  showPercentages={false}
/>`,
        },
        {
          title: 'Custom Size',
          description: 'Adjust height and width for different layouts',
          preview: <FunnelChart data={simpleFunnel} height={250} width={400} />,
          code: `<FunnelChart
  data={funnel}
  height={250}
  width={400}
/>`,
        },
        {
          title: 'With Click Handler',
          description: 'Interactive stages with click callbacks',
          preview: (
            <div className="space-y-4">
              <span className="text-muted-foreground font-mono text-xs">
                [INTERACTIVE]: Click on funnel stages
              </span>
              <FunnelChart
                data={salesFunnel}
                height={300}
                onStageClick={(stage, _index) =>
                  toast.info(`Clicked: ${stage.label} (${stage.value})`)
                }
              />
            </div>
          ),
          code: `<FunnelChart
  data={funnel}
  onStageClick={(stage, index) => {
    // Handle stage click - show toast, navigate, etc.
  }}
/>`,
        },
        {
          title: 'Compact Funnel',
          description: 'Smaller funnel for dashboards',
          preview: <FunnelChart data={simpleFunnel} height={200} width={300} gap={4} />,
          code: `<FunnelChart
  data={funnel}
  height={200}
  width={300}
  gap={4}
/>`,
        },
        {
          title: 'Marketing Funnel',
          description: 'Complete marketing conversion funnel',
          preview: <FunnelChart data={marketingFunnel} height={350} />,
          code: `const marketingFunnel = [
  { label: "Impressions", value: 50000 },
  { label: "Clicks", value: 5000 },
  { label: "Sign-ups", value: 1000 },
  { label: "Active Users", value: 500 },
];

<FunnelChart data={marketingFunnel} />`,
        },
        {
          title: 'Hover Interaction',
          description: 'Stages scale on hover for emphasis',
          preview: (
            <div className="space-y-4">
              <span className="text-muted-foreground font-mono text-xs">
                [HOVER]: Hover over stages to see scale effect
              </span>
              <FunnelChart data={simpleFunnel} height={250} />
            </div>
          ),
          code: `// Hover effects built-in automatically
<FunnelChart data={funnel} />`,
        },
      ]}
      props={[
        {
          name: 'data',
          type: 'FunnelStage[]',
          default: '-',
          description: 'Array of funnel stages with label and value',
        },
        {
          name: 'height',
          type: 'number',
          default: '400',
          description: 'Height of the funnel chart in pixels',
        },
        {
          name: 'width',
          type: 'number',
          default: '600',
          description: 'Width of the funnel chart in pixels',
        },
        {
          name: 'gap',
          type: 'number',
          default: '8',
          description: 'Gap between funnel stages in pixels',
        },
        {
          name: 'showValues',
          type: 'boolean',
          default: 'true',
          description: 'Display numeric values on stages',
        },
        {
          name: 'showPercentages',
          type: 'boolean',
          default: 'true',
          description: 'Show conversion rate percentages between stages',
        },
        {
          name: 'direction',
          type: '"vertical" | "horizontal"',
          default: '"vertical"',
          description: 'Orientation of the funnel (vertical only currently supported)',
        },
        {
          name: 'className',
          type: 'string',
          default: '-',
          description: 'Additional CSS classes for the container',
        },
        {
          name: 'onStageClick',
          type: '(stage: FunnelStage, index: number) => void',
          default: '-',
          description: 'Callback when a funnel stage is clicked',
        },
      ]}
      accessibility={[
        "Each stage has role='button' for interactive elements",
        'Stages are keyboard accessible with tabIndex',
        'aria-label describes stage label and value',
        'Enter and Space keys trigger stage click handlers',
        'Conversion percentages clearly labeled for screen readers',
        "Hover effects don't rely solely on color changes",
        'SVG paths use proper stroke and fill for visibility',
      ]}
      previous={{ title: 'Form', href: '/docs/components/form' }}
      next={{ title: 'Hover Card', href: '/docs/components/hover-card' }}
    />
  );
}
