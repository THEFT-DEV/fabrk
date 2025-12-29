'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { formatLabel } from '@/design-system';
import { useState } from 'react';

export default function RadioGroupPage() {
  const [value1, setValue1] = useState('option1');
  const [value2, setValue2] = useState('sm');
  const [value3, setValue3] = useState('card');

  return (
    <ComponentShowcaseTemplate
      code="[UI.41]"
      category="Components"
      title="Radio Group"
      description="A set of checkable buttons where only one can be checked at a time, built with Radix UI."
      importCode={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`}
      mainPreview={{
        preview: (
          <RadioGroup value={value1} onValueChange={setValue1}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="r1" />
              <Label htmlFor="r1" className="font-mono text-sm">
                {formatLabel('Default Option')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="r2" />
              <Label htmlFor="r2" className="font-mono text-sm">
                {formatLabel('Alternative Option')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="r3" />
              <Label htmlFor="r3" className="font-mono text-sm">
                {formatLabel('Another Option')}
              </Label>
            </div>
          </RadioGroup>
        ),
        code: `<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">[DEFAULT OPTION]:</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2">[ALTERNATIVE OPTION]:</Label>
  </div>
</RadioGroup>`,
      }}
      variants={[
        {
          title: 'Horizontal Layout',
          description: 'Radio group with horizontal arrangement',
          preview: (
            <RadioGroup
              value={value2}
              onValueChange={setValue2}
              className="flex flex-row space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sm" id="h1" />
                <Label htmlFor="h1" className="font-mono text-xs">
                  {formatLabel('Small')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="md" id="h2" />
                <Label htmlFor="h2" className="font-mono text-xs">
                  {formatLabel('Medium')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lg" id="h3" />
                <Label htmlFor="h3" className="font-mono text-xs">
                  {formatLabel('Large')}
                </Label>
              </div>
            </RadioGroup>
          ),
          code: `<RadioGroup
  value={value}
  onValueChange={setValue}
  className="flex flex-row space-x-4"
>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="sm" id="h1" />
    <Label htmlFor="h1">[SMALL]:</Label>
  </div>
  {/* More items... */}
</RadioGroup>`,
        },
        {
          title: 'With Descriptions',
          description: 'Radio group with option descriptions',
          preview: (
            <RadioGroup value={value3} onValueChange={setValue3}>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="card" id="d1" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="d1" className="font-mono text-xs font-semibold">
                    {formatLabel('Card Payment')}
                  </Label>
                  <p className="text-muted-foreground font-mono text-xs">
                    Pay with credit or debit card
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="bank" id="d2" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="d2" className="font-mono text-xs font-semibold">
                    {formatLabel('Bank Transfer')}
                  </Label>
                  <p className="text-muted-foreground font-mono text-xs">
                    Direct bank account transfer
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="crypto" id="d3" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="d3" className="font-mono text-xs font-semibold">
                    {formatLabel('Cryptocurrency')}
                  </Label>
                  <p className="text-muted-foreground font-mono text-xs">
                    Pay with Bitcoin or Ethereum
                  </p>
                </div>
              </div>
            </RadioGroup>
          ),
          code: `<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="card" id="d1" className="mt-1" />
    <div className="space-y-1">
      <Label htmlFor="d1">[CARD PAYMENT]:</Label>
      <p className="text-sm text-muted-foreground">
        Pay with credit or debit card
      </p>
    </div>
  </div>
  {/* More items... */}
</RadioGroup>`,
        },
        {
          title: 'Disabled Options',
          description: 'Radio group with some disabled options',
          preview: (
            <RadioGroup defaultValue="enabled">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enabled" id="e1" />
                <Label htmlFor="e1" className="font-mono text-sm">
                  {formatLabel('Enabled Option')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disabled1" id="e2" disabled />
                <Label htmlFor="e2" className="text-muted-foreground font-mono text-sm">
                  {formatLabel('Disabled Option')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disabled2" id="e3" disabled />
                <Label htmlFor="e3" className="text-muted-foreground font-mono text-sm">
                  {formatLabel('Also Disabled')}
                </Label>
              </div>
            </RadioGroup>
          ),
          code: `<RadioGroup defaultValue="enabled">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="enabled" id="e1" />
    <Label htmlFor="e1">[ENABLED OPTION]:</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="disabled" id="e2" disabled />
    <Label htmlFor="e2">[DISABLED OPTION]:</Label>
  </div>
</RadioGroup>`,
        },
        {
          title: 'Terminal Style',
          description: 'Radio group with terminal-themed styling',
          preview: (
            <div className="space-y-2">
              <div className="text-muted-foreground font-mono text-xs">[SELECT OPTION]:</div>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="t1" />
                  <Label htmlFor="t1" className="font-mono text-xs">
                    &gt; INITIALIZE PROJECT
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="t2" />
                  <Label htmlFor="t2" className="font-mono text-xs">
                    &gt; RUN DIAGNOSTICS
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="t3" />
                  <Label htmlFor="t3" className="font-mono text-xs">
                    &gt; DEPLOY BUILD
                  </Label>
                </div>
              </RadioGroup>
            </div>
          ),
          code: `<div className="space-y-2">
  <div className="font-mono text-xs text-muted-foreground">
    [SELECT OPTION]:
  </div>
  <RadioGroup defaultValue="option1">
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="option1" id="t1" />
      <Label htmlFor="t1" className="font-mono text-xs">
        &gt; INITIALIZE PROJECT
      </Label>
    </div>
    {/* More items... */}
  </RadioGroup>
</div>`,
        },
      ]}
      props={[
        {
          name: 'value',
          type: 'string',
          default: 'undefined',
          description: 'The controlled value of the selected radio item',
        },
        {
          name: 'defaultValue',
          type: 'string',
          default: 'undefined',
          description: 'The default value for uncontrolled usage',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          default: 'undefined',
          description: 'Callback fired when the selected value changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable all radio items in the group',
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: 'Mark the radio group as required',
        },
        {
          name: 'name',
          type: 'string',
          default: 'undefined',
          description: 'Name attribute for form submission',
        },
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Additional CSS classes for the container',
        },
      ]}
      accessibility={[
        'Uses Radix UI Radio Group primitive for full accessibility',
        'Supports keyboard navigation with arrow keys',
        'Space key toggles selection of focused item',
        "Proper ARIA attributes (role='radiogroup', aria-checked)",
        'Label association via htmlFor ensures clickable labels',
        'Focus visible styles for keyboard navigation',
        'Disabled state properly communicated to assistive tech',
      ]}
      previous={{ title: 'Progress', href: '/docs/components/progress' }}
      next={{ title: 'Rating', href: '/docs/components/rating' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Radio Group when:</p>
              <ul className="space-y-2">
                <li className="text-xs">• User must select exactly one option from 2-7 choices</li>
                <li className="text-xs">
                  • All options should be visible at once (no dropdown needed)
                </li>
                <li className="text-xs">
                  • Options are mutually exclusive (selecting one deselects others)
                </li>
                <li className="text-xs">
                  • User needs to compare options before selecting (payment methods, plans)
                </li>
                <li className="text-xs">• Each option needs a description or additional context</li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">• More than 7 options (use Select for longer lists)</li>
                <li className="text-xs">• Multiple selections allowed (use Checkbox group)</li>
                <li className="text-xs">
                  • Binary on/off toggle with immediate effect (use Switch)
                </li>
                <li className="text-xs">
                  • Space constrained and options familiar (use Select instead)
                </li>
                <li className="text-xs">
                  • No default selection needed and all options optional (consider Checkbox)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">• Always set a default value for better UX</li>
                <li className="text-xs">• Keep option labels short and scannable (1-4 words)</li>
                <li className="text-xs">
                  • Use descriptions for complex options (payment methods, pricing tiers)
                </li>
                <li className="text-xs">
                  • Order options logically (most common first, or price low-to-high)
                </li>
                <li className="text-xs">
                  • Show 2-7 options; fewer than 2 = use Switch; more than 7 = use Select
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
