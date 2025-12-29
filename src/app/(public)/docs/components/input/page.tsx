'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatLabel } from '@/design-system';

export default function InputPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.02]"
      category="Components"
      title="Input"
      description="A basic text input field for forms and data entry."
      importCode={`import { Input } from "@/components/ui/input"`}
      mainPreview={{
        preview: <Input placeholder="Enter your email..." />,
        code: `<Input placeholder="Enter your email..." />`,
      }}
      variants={[
        {
          title: 'Default',
          description: 'Standard text input.',
          preview: <Input placeholder="Type here..." />,
          code: `<Input placeholder="Type here..." />`,
        },
        {
          title: 'With Label',
          description: 'Input with an associated label.',
          preview: (
            <div className="grid gap-2">
              <Label htmlFor="email">{formatLabel('Email')}</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
          ),
          code: `<div className="grid gap-2">
  <Label htmlFor="email">[EMAIL]:</Label>
  <Input id="email" type="email" placeholder="m@example.com" />
</div>`,
        },
        {
          title: 'Disabled',
          description: 'Input in disabled state.',
          preview: <Input disabled placeholder="Disabled input" />,
          code: `<Input disabled placeholder="Disabled input" />`,
        },
        {
          title: 'Error State',
          description: 'Input showing an error.',
          preview: <Input error placeholder="Invalid input" />,
          code: `<Input error placeholder="Invalid input" />`,
        },
        {
          title: 'Success State',
          description: 'Input showing success.',
          preview: <Input success placeholder="Valid input" defaultValue="john@example.com" />,
          code: `<Input success placeholder="Valid input" defaultValue="john@example.com" />`,
        },
        {
          title: 'Loading',
          description: 'Input with loading spinner.',
          preview: <Input loading placeholder="Loading..." />,
          code: `<Input loading placeholder="Loading..." />`,
        },
        {
          title: 'File Input',
          description: 'Input for file selection.',
          preview: <Input type="file" />,
          code: `<Input type="file" />`,
        },
      ]}
      props={[
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Show error styling with red border.',
        },
        {
          name: 'success',
          type: 'boolean',
          default: 'false',
          description: 'Show success styling with green ring on focus.',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: 'Show loading spinner and disable input.',
        },
        {
          name: 'loadingText',
          type: 'string',
          description: 'Screen reader text for loading state.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the input.',
        },
        {
          name: 'type',
          type: 'string',
          default: '"text"',
          description: 'HTML input type (text, email, password, etc.).',
        },
      ]}
      accessibility={[
        'Uses native <input> element for full keyboard support',
        'Supports aria-invalid for error states',
        'Loading state uses aria-busy for screen readers',
        'Screen reader text provided via aria-describedby when loading',
      ]}
      previous={{ title: 'Button', href: '/docs/components/button' }}
      next={{
        title: 'Input Password',
        href: '/docs/components/input-password',
      }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Input when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Collecting single-line text data (name, email, search)
                </li>
                <li className="text-xs">• User needs to enter short, freeform text</li>
                <li className="text-xs">
                  • You need real-time validation feedback (error/success states)
                </li>
                <li className="text-xs">• Loading indicator needed during async validation</li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">• Multi-line text needed (use Textarea instead)</li>
                <li className="text-xs">
                  • Password entry (use Input Password for show/hide functionality)
                </li>
                <li className="text-xs">
                  • Selecting from predefined options (use Select or Radio Group)
                </li>
                <li className="text-xs">
                  • Numeric input with increment/decrement (use Input Number)
                </li>
                <li className="text-xs">• Date selection (use Date Picker for calendar UI)</li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">State Usage:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • <strong>error</strong>: Show validation errors immediately after blur or submit
                </li>
                <li className="text-xs">
                  • <strong>success</strong>: Confirm valid input (email verified, username
                  available)
                </li>
                <li className="text-xs">
                  • <strong>loading</strong>: Async validation in progress (checking availability)
                </li>
                <li className="text-xs">
                  • <strong>disabled</strong>: Field not editable in current context
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
