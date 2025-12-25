'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Gauge, ScoreGauge } from '@/components/ui/gauge';

export default function GaugePage() {
  /* eslint-disable design-system/no-hardcoded-colors -- Chart examples require specific colors for demonstrations */
  return (
    <ComponentShowcaseTemplate
      code="[UI.29]"
      title="Gauge"
      description="A circular gauge component for displaying metrics, scores, and progress with a rotating needle indicator."
      importCode={`import { Gauge, ScoreGauge } from "@/components/ui/gauge";`}
      mainPreview={{
        preview: <Gauge value={75} label="Performance" showValue={true} />,
        code: `<Gauge
  value={75}
  label="Performance"
  showValue={true}
/>`,
      }}
      variants={[
        {
          title: 'Custom Range',
          description: 'Gauge with custom min and max values',
          preview: (
            <div className="flex flex-wrap justify-center gap-8">
              <Gauge value={3500} min={0} max={5000} label="Revenue" unit="$" showValue={true} />
              <Gauge
                value={42}
                min={0}
                max={100}
                label="CPU Usage"
                unit="%"
                showValue={true}
                color="oklch(70% 0.15 60)"
              />
            </div>
          ),
          code: `<Gauge
  value={3500}
  min={0}
  max={5000}
  label="Revenue"
  unit="$"
  showValue={true}
/>
<Gauge
  value={42}
  min={0}
  max={100}
  label="CPU Usage"
  unit="%"
  showValue={true}
  color="oklch(70% 0.15 60)"
/>`,
        },
        {
          title: 'With Min/Max Labels',
          description: 'Display min and max values on the gauge',
          preview: (
            <Gauge
              value={65}
              min={0}
              max={100}
              label="Battery Level"
              unit="%"
              showValue={true}
              showMinMax={true}
              color="oklch(70% 0.15 160)"
            />
          ),
          code: `<Gauge
  value={65}
  min={0}
  max={100}
  label="Battery Level"
  unit="%"
  showValue={true}
  showMinMax={true}
  color="oklch(70% 0.15 160)"
/>`,
        },
        {
          title: 'Custom Appearance',
          description: 'Gauges with different sizes, angles, and colors',
          preview: (
            <div className="flex flex-wrap justify-center gap-8">
              <Gauge value={80} size={150} thickness={15} label="Small" showValue={true} />
              <Gauge
                value={45}
                size={250}
                thickness={25}
                label="Large"
                showValue={true}
                color="oklch(70% 0.15 295)"
              />
            </div>
          ),
          code: `<Gauge
  value={80}
  size={150}
  thickness={15}
  label="Small"
  showValue={true}
/>
<Gauge
  value={45}
  size={250}
  thickness={25}
  label="Large"
  showValue={true}
  color="oklch(70% 0.15 295)"
/>`,
        },
        {
          title: 'Score Gauge',
          description: 'Color-coded gauge for scores with automatic thresholds',
          preview: (
            <div className="flex flex-wrap justify-center gap-8">
              <ScoreGauge score={92} maxScore={100} label="Excellent" size={180} />
              <ScoreGauge score={68} maxScore={100} label="Good" size={180} />
              <ScoreGauge score={35} maxScore={100} label="Needs Work" size={180} />
            </div>
          ),
          code: `<ScoreGauge
  score={92}
  maxScore={100}
  label="Excellent"
  size={180}
/>
<ScoreGauge
  score={68}
  maxScore={100}
  label="Good"
  size={180}
/>
<ScoreGauge
  score={35}
  maxScore={100}
  label="Needs Work"
  size={180}
/>`,
        },
        {
          title: 'Segmented Gauge',
          description: 'Gauge with multiple colored segments',
          preview: (
            <Gauge
              value={75}
              min={0}
              max={100}
              label="Quality Score"
              showValue={true}
              showMinMax={true}
              segments={[
                { value: 30, color: 'oklch(60% 0.20 25)', label: 'Poor' },
                { value: 30, color: 'oklch(70% 0.15 60)', label: 'Fair' },
                { value: 40, color: 'oklch(70% 0.15 160)', label: 'Good' },
              ]}
            />
          ),
          code: `<Gauge
  value={75}
  min={0}
  max={100}
  label="Quality Score"
  showValue={true}
  showMinMax={true}
  segments={[
    { value: 30, color: "oklch(60% 0.20 25)", label: "Poor" },
    { value: 30, color: "oklch(70% 0.15 60)", label: "Fair" },
    { value: 40, color: "oklch(70% 0.15 160)", label: "Good" },
  ]}
/>`,
        },
      ]}
      props={[
        {
          name: 'value',
          type: 'number',
          required: true,
          description: 'Current value to display',
        },
        {
          name: 'min',
          type: 'number',
          default: '0',
          description: 'Minimum value',
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: 'Maximum value',
        },
        {
          name: 'size',
          type: 'number',
          default: '200',
          description: 'Gauge diameter in pixels',
        },
        {
          name: 'thickness',
          type: 'number',
          default: '20',
          description: 'Arc thickness in pixels',
        },
        {
          name: 'startAngle',
          type: 'number',
          default: '-135',
          description: 'Starting angle in degrees',
        },
        {
          name: 'endAngle',
          type: 'number',
          default: '135',
          description: 'Ending angle in degrees',
        },
        {
          name: 'color',
          type: 'string',
          default: '"var(--color-primary)"',
          description: 'Arc color',
        },
        {
          name: 'backgroundColor',
          type: 'string',
          default: '"var(--color-muted)"',
          description: 'Background arc color',
        },
        {
          name: 'showValue',
          type: 'boolean',
          default: 'true',
          description: 'Display value below gauge',
        },
        {
          name: 'showMinMax',
          type: 'boolean',
          default: 'false',
          description: 'Display min/max labels on gauge',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Label text below value',
        },
        {
          name: 'unit',
          type: 'string',
          description: 'Unit suffix for value',
        },
        {
          name: 'segments',
          type: 'Array<{ value: number; color: string; label?: string }>',
          description: 'Colored segments for gauge arc',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ]}
      accessibility={[
        'Values are automatically clamped between min and max',
        'Text elements use semantic SVG text tags',
        'Label and value have clear visual hierarchy',
        'Needle animation uses CSS transitions for smooth updates',
        'ScoreGauge automatically selects colors based on performance thresholds',
        'Min/max labels are positioned for clear readability',
        'All text meets WCAG AA contrast requirements',
      ]}
      previous={{ title: 'Sparkline', href: '/docs/components/sparkline' }}
      next={{ title: 'Donut Chart', href: '/docs/components/donut-chart' }}
    />
  );
  /* eslint-enable design-system/no-hardcoded-colors */
}
