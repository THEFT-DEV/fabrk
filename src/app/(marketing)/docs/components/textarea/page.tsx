'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { formatLabel } from '@/design-system';

export default function TextareaPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.04]"
      category="Components"
      title="Textarea"
      description="A multi-line text input for longer content."
      importCode={`import { Textarea } from "@/components/ui/textarea"`}
      mainPreview={{
        preview: <Textarea placeholder="Type your message here..." />,
        code: `<Textarea placeholder="Type your message here..." />`,
      }}
      variants={[
        {
          title: 'Default',
          description: 'Standard multi-line text input.',
          preview: <Textarea placeholder="Write something..." />,
          code: `<Textarea placeholder="Write something..." />`,
        },
        {
          title: 'With Label',
          description: 'Textarea with an associated label.',
          preview: (
            <div className="grid gap-2">
              <Label htmlFor="message">{formatLabel('Message')}</Label>
              <Textarea id="message" placeholder="Type your message here" />
            </div>
          ),
          code: `<div className="grid gap-2">
  <Label htmlFor="message">[MESSAGE]:</Label>
  <Textarea id="message" placeholder="Type your message here" />
</div>`,
        },
        {
          title: 'Disabled',
          description: 'Textarea in disabled state.',
          preview: <Textarea disabled placeholder="Disabled textarea" />,
          code: `<Textarea disabled placeholder="Disabled textarea" />`,
        },
        {
          title: 'Error State',
          description: 'Textarea showing an error.',
          preview: <Textarea error placeholder="Invalid content" />,
          code: `<Textarea error placeholder="Invalid content" />`,
        },
        {
          title: 'With Default Value',
          description: 'Textarea with pre-filled content.',
          preview: (
            <Textarea defaultValue="This is some default text that appears in the textarea when it first renders." />
          ),
          code: `<Textarea
  defaultValue="This is some default text that appears in the textarea when it first renders."
/>`,
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
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the textarea.',
        },
        {
          name: 'rows',
          type: 'number',
          description: 'Number of visible text lines.',
        },
      ]}
      accessibility={[
        'Uses native <textarea> element for full keyboard support',
        'Supports aria-invalid for error states',
        'Focus visible styles for keyboard navigation',
      ]}
      previous={{
        title: 'Input Password',
        href: '/docs/components/input-password',
      }}
      next={{ title: 'Select', href: '/docs/components/select' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Textarea when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • User needs to enter multi-line text (comments, descriptions, messages)
                </li>
                <li className="text-xs">
                  • Text input exceeds one sentence (feedback, bio, notes)
                </li>
                <li className="text-xs">
                  • Content should be visible while typing (no scrolling needed)
                </li>
                <li className="text-xs">
                  • You need a specific number of visible rows (e.g., 4-6 lines for comments)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">• Single-line input expected (use Input instead)</li>
                <li className="text-xs">
                  • Structured data entry (use Input with proper type attribute)
                </li>
                <li className="text-xs">
                  • Rich text formatting needed (use rich text editor like Tiptap)
                </li>
                <li className="text-xs">
                  • Code input needed (use code editor component with syntax highlighting)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • Set appropriate rows prop (4-6 for comments, 8-10 for longer content)
                </li>
                <li className="text-xs">• Provide clear placeholder text with example format</li>
                <li className="text-xs">• Consider character counter for limited-length fields</li>
                <li className="text-xs">• Use error state to show validation issues inline</li>
                <li className="text-xs">
                  • Allow resize for longer content unless fixed height required
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
