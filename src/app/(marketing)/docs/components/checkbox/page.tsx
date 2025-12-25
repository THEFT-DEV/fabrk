'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { formatLabel } from '@/design-system';

export default function CheckboxPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.06]"
      category="Components"
      title="Checkbox"
      description="A checkbox component for toggling boolean values."
      importCode={`import { Checkbox } from "@/components/ui/checkbox"`}
      mainPreview={{
        preview: (
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">{formatLabel('Accept terms and conditions')}</Label>
          </div>
        ),
        code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">[ACCEPT TERMS AND CONDITIONS]:</Label>
</div>`,
      }}
      variants={[
        {
          title: 'Default',
          description: 'Standard checkbox.',
          preview: <Checkbox />,
          code: `<Checkbox />`,
        },
        {
          title: 'Checked',
          description: 'Checkbox in checked state.',
          preview: <Checkbox defaultChecked />,
          code: `<Checkbox defaultChecked />`,
        },
        {
          title: 'With Label',
          description: 'Checkbox with an associated label.',
          preview: (
            <div className="flex items-center gap-2">
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter">{formatLabel('Subscribe to newsletter')}</Label>
            </div>
          ),
          code: `<div className="flex items-center gap-2">
  <Checkbox id="newsletter" />
  <Label htmlFor="newsletter">[SUBSCRIBE TO NEWSLETTER]:</Label>
</div>`,
        },
        {
          title: 'Disabled',
          description: 'Disabled checkbox.',
          preview: <Checkbox disabled />,
          code: `<Checkbox disabled />`,
        },
        {
          title: 'Disabled Checked',
          description: 'Disabled checkbox in checked state.',
          preview: <Checkbox disabled defaultChecked />,
          code: `<Checkbox disabled defaultChecked />`,
        },
        {
          title: 'Checkbox Group',
          description: 'Multiple checkboxes as a group.',
          preview: (
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="option1" defaultChecked />
                <Label htmlFor="option1">{formatLabel('Option 1')}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="option2" />
                <Label htmlFor="option2">{formatLabel('Option 2')}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="option3" />
                <Label htmlFor="option3">{formatLabel('Option 3')}</Label>
              </div>
            </div>
          ),
          code: `<div className="grid gap-2">
  <div className="flex items-center gap-2">
    <Checkbox id="option1" defaultChecked />
    <Label htmlFor="option1">[OPTION 1]:</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="option2" />
    <Label htmlFor="option2">[OPTION 2]:</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="option3" />
    <Label htmlFor="option3">[OPTION 3]:</Label>
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: 'checked',
          type: 'boolean',
          description: 'Controlled checked state.',
        },
        {
          name: 'defaultChecked',
          type: 'boolean',
          description: 'The default checked state for uncontrolled usage.',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: 'Event handler called when the checked state changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the checkbox.',
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: 'Mark the checkbox as required.',
        },
      ]}
      accessibility={[
        'Built on Radix UI Checkbox primitive for full accessibility',
        'Supports keyboard navigation with Space to toggle',
        'Uses aria-checked for screen readers',
        'Focus visible ring for keyboard navigation',
      ]}
      previous={{ title: 'Select', href: '/docs/components/select' }}
      next={{ title: 'Switch', href: '/docs/components/switch' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Checkbox when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Multiple options can be selected independently (e.g., filter list, preferences)
                </li>
                <li className="text-xs">• Binary choice with clear on/off states (accept terms)</li>
                <li className="text-xs">
                  • List of non-exclusive options (select multiple features)
                </li>
                <li className="text-xs">
                  • User needs to opt-in to something explicitly (newsletter, notifications)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Only one option can be selected at a time (use Radio Group)
                </li>
                <li className="text-xs">
                  • Toggling a setting on/off with immediate effect (use Switch)
                </li>
                <li className="text-xs">• Selecting from a large list (use Select or Combobox)</li>
                <li className="text-xs">• Action triggers immediately (use Button or Toggle)</li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">• Always pair with a Label for clickable text area</li>
                <li className="text-xs">• Group related checkboxes together visually</li>
                <li className="text-xs">
                  • Use indeterminate state for &quot;select all&quot; when some children selected
                </li>
                <li className="text-xs">
                  • For required checkboxes (terms), use required prop + validation
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
