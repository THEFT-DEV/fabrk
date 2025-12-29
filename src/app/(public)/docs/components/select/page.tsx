'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { formatLabel } from '@/design-system';

export default function SelectPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.05]"
      category="Components"
      title="Select"
      description="A dropdown select component for choosing from a list of options."
      importCode={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`}
      mainPreview={{
        preview: (
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        ),
        code: `<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`,
      }}
      variants={[
        {
          title: 'With Label',
          description: 'Select with an associated label.',
          preview: (
            <div className="grid gap-2">
              <Label htmlFor="framework">{formatLabel('Framework')}</Label>
              <Select>
                <SelectTrigger id="framework" className="w-[200px]">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="remix">Remix</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ),
          code: `<div className="grid gap-2">
  <Label htmlFor="framework">[FRAMEWORK]:</Label>
  <Select>
    <SelectTrigger id="framework" className="w-[200px]">
      <SelectValue placeholder="Select framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="next">Next.js</SelectItem>
      <SelectItem value="remix">Remix</SelectItem>
      <SelectItem value="astro">Astro</SelectItem>
    </SelectContent>
  </Select>
</div>`,
        },
        {
          title: 'With Groups',
          description: 'Select with grouped options.',
          preview: (
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>North America</SelectLabel>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="cst">Central Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Europe</SelectLabel>
                  <SelectItem value="gmt">GMT</SelectItem>
                  <SelectItem value="cet">Central European</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ),
          code: `<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Time</SelectItem>
      <SelectItem value="cst">Central Time</SelectItem>
      <SelectItem value="pst">Pacific Time</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">GMT</SelectItem>
      <SelectItem value="cet">Central European</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
        },
        {
          title: 'Disabled',
          description: 'Disabled select component.',
          preview: (
            <Select disabled>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Disabled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
              </SelectContent>
            </Select>
          ),
          code: `<Select disabled>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Disabled" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>`,
        },
        {
          title: 'With Disabled Item',
          description: 'Select with a disabled option.',
          preview: (
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="owner" disabled>
                  Owner (Unavailable)
                </SelectItem>
              </SelectContent>
            </Select>
          ),
          code: `<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">Admin</SelectItem>
    <SelectItem value="member">Member</SelectItem>
    <SelectItem value="owner" disabled>Owner (Unavailable)</SelectItem>
  </SelectContent>
</Select>`,
        },
      ]}
      props={[
        {
          name: 'defaultValue',
          type: 'string',
          description: 'The value of the select when initially rendered.',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled value of the select.',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Event handler called when the value changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the select.',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown when no value is selected.',
        },
      ]}
      accessibility={[
        'Built on Radix UI Select primitive for full accessibility',
        'Keyboard navigation with Arrow keys, Enter, and Escape',
        'Type-ahead search to jump to options',
        'Screen reader announcements for selection changes',
      ]}
      previous={{ title: 'Textarea', href: '/docs/components/textarea' }}
      next={{ title: 'Checkbox', href: '/docs/components/checkbox' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Select when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Choosing one option from a list of 5+ items (country, timezone, category)
                </li>
                <li className="text-xs">
                  • Options are mutually exclusive (only one can be selected)
                </li>
                <li className="text-xs">• Space is limited and you need a compact dropdown</li>
                <li className="text-xs">
                  • Users are familiar with the options (don&apos;t need to see all at once)
                </li>
                <li className="text-xs">
                  • Grouping related options with labels (time zones by region)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">• Less than 5 options (use Radio Group for visibility)</li>
                <li className="text-xs">
                  • Multiple selections needed (use Checkbox group or multi-select)
                </li>
                <li className="text-xs">• Options need search/filter (use Combobox with search)</li>
                <li className="text-xs">• Binary choice (use Switch or two Radio buttons)</li>
                <li className="text-xs">
                  • Users need to see all options immediately (use visible list)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">• Use SelectGroup + SelectLabel to organize long lists</li>
                <li className="text-xs">
                  • Provide clear placeholder text (e.g., &quot;Select country...&quot;)
                </li>
                <li className="text-xs">• Set appropriate width based on longest option</li>
                <li className="text-xs">• Disable unavailable options rather than hiding them</li>
                <li className="text-xs">
                  • Order options logically (alphabetically, by popularity, or by region)
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
