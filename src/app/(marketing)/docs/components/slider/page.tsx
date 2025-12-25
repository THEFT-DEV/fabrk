'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { Label } from '@/components/ui/label';

export default function SliderPage() {
  const [value1, setValue1] = useState([50]);
  const [value2, setValue2] = useState([25, 75]);
  const [value3, setValue3] = useState([30]);
  const [value4, setValue4] = useState([0]);

  return (
    <ComponentShowcaseTemplate
      code="[UI.44]"
      category="Forms"
      title="Slider"
      description="A range slider component for selecting numeric values, built with Radix UI."
      importCode={`import { Slider } from "@/components/ui/slider"`}
      mainPreview={{
        preview: (
          <div className="max-w-md space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-muted-foreground font-mono text-xs">[VALUE]</Label>
              <span className="text-primary font-mono text-xs">{value1[0]}</span>
            </div>
            <Slider value={value1} onValueChange={setValue1} max={100} step={1} />
          </div>
        ),
        code: `const [value, setValue] = useState([50]);

<Slider
  value={value}
  onValueChange={setValue}
  max={100}
  step={1}
/>`,
      }}
      variants={[
        {
          title: 'Range Slider',
          description: 'Slider with two handles for selecting a range',
          preview: (
            <div className="max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground font-mono text-xs">[RANGE]</Label>
                <span className="text-primary font-mono text-xs">
                  {value2[0]} - {value2[1]}
                </span>
              </div>
              <Slider value={value2} onValueChange={setValue2} max={100} step={1} />
            </div>
          ),
          code: `const [value, setValue] = useState([25, 75]);

<Slider
  value={value}
  onValueChange={setValue}
  max={100}
  step={1}
/>`,
        },
        {
          title: 'With Step',
          description: 'Slider with custom step increments',
          preview: (
            <div className="max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground font-mono text-xs">[STEP: 10]</Label>
                <span className="text-primary font-mono text-xs">{value3[0]}</span>
              </div>
              <Slider value={value3} onValueChange={setValue3} max={100} step={10} />
            </div>
          ),
          code: `<Slider
  value={value}
  onValueChange={setValue}
  max={100}
  step={10}
/>`,
        },
        {
          title: 'Custom Range',
          description: 'Slider with custom min and max values',
          preview: (
            <div className="max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground font-mono text-xs">
                  [RANGE: -50 to 50]
                </Label>
                <span className="text-primary font-mono text-xs">{value4[0]}</span>
              </div>
              <Slider value={value4} onValueChange={setValue4} min={-50} max={50} step={1} />
            </div>
          ),
          code: `<Slider
  value={value}
  onValueChange={setValue}
  min={-50}
  max={50}
  step={1}
/>`,
        },
        {
          title: 'Disabled',
          description: 'Disabled slider that cannot be interacted with',
          preview: (
            <div className="max-w-md space-y-2">
              <Label className="text-muted-foreground font-mono text-xs">[DISABLED]</Label>
              <Slider value={[60]} disabled max={100} step={1} />
            </div>
          ),
          code: `<Slider value={[60]} disabled max={100} step={1} />`,
        },
        {
          title: 'Volume Control',
          description: 'Slider styled as a volume control',
          preview: (
            <div className="max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground font-mono text-xs">[VOLUME]</Label>
                <span className="text-primary font-mono text-xs">{value1[0]}%</span>
              </div>
              <Slider
                value={value1}
                onValueChange={setValue1}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          ),
          code: `<Slider
  value={value}
  onValueChange={setValue}
  max={100}
  step={1}
/>`,
        },
        {
          title: 'Terminal Style',
          description: 'Slider with terminal-themed container',
          preview: (
            <div className="space-y-4">
              <div className="text-muted-foreground font-mono text-xs">[CONFIGURATION]:</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-mono text-xs">THRESHOLD:</span>
                  <span className="text-primary font-mono text-xs">&gt; {value1[0]}%</span>
                </div>
                <Slider value={value1} onValueChange={setValue1} max={100} step={1} />
              </div>
            </div>
          ),
          code: `<div className="space-y-4">
  <div className="font-mono text-xs text-muted-foreground">
    [CONFIGURATION]:
  </div>
  <Slider value={value} onValueChange={setValue} max={100} />
</div>`,
        },
      ]}
      props={[
        {
          name: 'value',
          type: 'number[]',
          default: '[0]',
          description: 'Controlled value array (single value or range)',
        },
        {
          name: 'defaultValue',
          type: 'number[]',
          default: 'undefined',
          description: 'Default value for uncontrolled usage',
        },
        {
          name: 'onValueChange',
          type: '(value: number[]) => void',
          default: 'undefined',
          description: 'Callback fired when value changes',
        },
        {
          name: 'min',
          type: 'number',
          default: '0',
          description: 'Minimum value of the slider',
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: 'Maximum value of the slider',
        },
        {
          name: 'step',
          type: 'number',
          default: '1',
          description: 'Step increment for slider movement',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable slider interaction',
        },
        {
          name: 'orientation',
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: 'Orientation of the slider',
        },
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Additional CSS classes for the container',
        },
      ]}
      accessibility={[
        'Uses Radix UI Slider primitive for full accessibility',
        'Keyboard support with Arrow keys for value adjustment',
        'Home/End keys jump to min/max values',
        "Proper ARIA attributes (role='slider', aria-valuemin, etc.)",
        'Focus visible styles for keyboard navigation',
        'Touch-friendly with touch-none and select-none classes',
        'Disabled state properly communicated to assistive tech',
      ]}
      previous={{ title: 'Skeleton', href: '/docs/components/skeleton' }}
      next={{ title: 'Sparkline', href: '/docs/components/sparkline' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Slider when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Numeric value selection across a continuous range (volume, brightness, price
                  filters)
                </li>
                <li className="text-xs">
                  • Visual representation of value more important than precision input
                </li>
                <li className="text-xs">
                  • Range selection with two handles (min/max price, date range)
                </li>
                <li className="text-xs">
                  • Adjusting settings that benefit from immediate visual feedback
                </li>
                <li className="text-xs">
                  • Values have meaningful min/max bounds (0-100%, -50 to 50)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Precise numeric input required (use Input with type=&quot;number&quot;)
                </li>
                <li className="text-xs">
                  • Only a few discrete options (use Radio Group or Select)
                </li>
                <li className="text-xs">
                  • Unlimited or very large ranges (use Input with validation)
                </li>
                <li className="text-xs">
                  • User needs to type exact value quickly (keyboard input faster)
                </li>
                <li className="text-xs">
                  • Mobile users with accessibility needs (small touch targets)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • Always show current value alongside slider (Label with value display)
                </li>
                <li className="text-xs">
                  • Use value prop with onValueChange for controlled state (not defaultValue)
                </li>
                <li className="text-xs">
                  • Set meaningful min/max bounds (0-100 for percentages, custom for ranges)
                </li>
                <li className="text-xs">
                  • Choose appropriate step values (1 for integers, 0.1 for decimals, 10 for coarse)
                </li>
                <li className="text-xs">
                  • For range sliders, pass array with two values: [min, max]
                </li>
                <li className="text-xs">
                  • Label sliders clearly with font-mono text-xs for terminal aesthetic
                </li>
                <li className="text-xs">
                  • Provide visual feedback during interaction (value updates in real-time)
                </li>
                <li className="text-xs">
                  • Consider disabling slider when value cannot be changed (show disabled state)
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
