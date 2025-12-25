'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Separator } from '@/components/ui/separator';

export default function SeparatorPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.78]"
      category="Layout"
      title="Separator"
      description="Visually or semantically separates content."
      importCode={`import { Separator } from "@/components/ui/separator"`}
      mainPreview={{
        preview: (
          <div className="w-full max-w-md space-y-4">
            <div>
              <span className="text-primary">&gt;</span> Content above
            </div>
            <Separator />
            <div>
              <span className="text-primary">&gt;</span> Content below
            </div>
          </div>
        ),
        code: `<div>
  <div>Content above</div>
  <Separator />
  <div>Content below</div>
</div>`,
      }}
      variants={[
        {
          title: 'Horizontal (Default)',
          description: 'Default horizontal separator line.',
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div>Section 1</div>
              <Separator />
              <div>Section 2</div>
            </div>
          ),
          code: `<Separator />`,
        },
        {
          title: 'Vertical',
          description: 'Vertical separator for inline content.',
          preview: (
            <div className="flex h-12 items-center gap-4">
              <div>Left</div>
              <Separator orientation="vertical" />
              <div>Middle</div>
              <Separator orientation="vertical" />
              <div>Right</div>
            </div>
          ),
          code: `<div className="flex items-center gap-4">
  <div>Left</div>
  <Separator orientation="vertical" />
  <div>Right</div>
</div>`,
        },
        {
          title: 'Decorative',
          description: 'Visual separator without semantic meaning (default).',
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div>Visual separation only</div>
              <Separator decorative />
              <div>Not announced by screen readers</div>
            </div>
          ),
          code: `<Separator decorative />`,
        },
        {
          title: 'Semantic',
          description: 'Separator with semantic role for screen readers.',
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div>Section 1</div>
              <Separator decorative={false} />
              <div>Section 2 (announced by screen readers)</div>
            </div>
          ),
          code: `<Separator decorative={false} />`,
        },
        {
          title: 'In List',
          description: 'Separator between list items.',
          preview: (
            <div className="w-full max-w-md">
              <div className="p-4">
                <span className="text-primary">&gt;</span> Item 1
              </div>
              <Separator />
              <div className="p-4">
                <span className="text-primary">&gt;</span> Item 2
              </div>
              <Separator />
              <div className="p-4">
                <span className="text-primary">&gt;</span> Item 3
              </div>
            </div>
          ),
          code: `<div>
  <div>Item 1</div>
  <Separator />
  <div>Item 2</div>
  <Separator />
  <div>Item 3</div>
</div>`,
        },
        {
          title: 'Custom Color',
          description: 'Separator with custom styling.',
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div>Above</div>
              <Separator className="bg-primary" />
              <div>Below</div>
            </div>
          ),
          code: `<Separator className="bg-primary" />`,
        },
        {
          title: 'Thicker Line',
          description: 'Separator with increased height.',
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div>Above</div>
              <Separator className="h-[2px]" />
              <div>Below</div>
            </div>
          ),
          code: `<Separator className="h-[2px]" />`,
        },
        {
          title: 'With Text',
          description: 'Separator with centered text label.',
          preview: (
            <div className="w-full max-w-md">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center uppercase">
                  <span className="bg-background px-2">Or</span>
                </div>
              </div>
            </div>
          ),
          code: `<div className="relative">
  <div className="absolute inset-0 flex items-center">
    <Separator />
  </div>
  <div className="relative flex justify-center text-xs">
    <span className="bg-background px-2">Or</span>
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: 'orientation',
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: 'Direction of the separator.',
        },
        {
          name: 'decorative',
          type: 'boolean',
          default: 'true',
          description:
            "If true, role is 'none'. If false, role is 'separator' with aria-orientation.",
        },
        {
          name: 'className',
          type: 'string',
          default: '-',
          description: 'Additional CSS classes for custom styling.',
        },
      ]}
      accessibility={[
        'Uses proper ARIA roles based on decorative prop',
        "Decorative separators have role='none' (not announced by screen readers)",
        "Semantic separators have role='separator' with aria-orientation",
        'Horizontal separators: h-[1px] w-full',
        'Vertical separators: h-full w-[1px]',
        'Background uses design token (bg-border) for theme support',
      ]}
      previous={{ title: 'Select', href: '/docs/components/select' }}
      next={{ title: 'Sheet', href: '/docs/components/sheet' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Separator when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Dividing distinct content sections within a page or component
                </li>
                <li className="text-xs">
                  • Separating list items visually (menu items, settings options)
                </li>
                <li className="text-xs">
                  • Creating vertical dividers between inline content (toolbar buttons, breadcrumbs)
                </li>
                <li className="text-xs">
                  • Adding visual rhythm to content without semantic section breaks
                </li>
                <li className="text-xs">
                  • Form sections need visual grouping (use with decorative prop)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Marking semantic document structure (use HTML section, article tags)
                </li>
                <li className="text-xs">
                  • Creating visual spacing alone (use margin/padding instead)
                </li>
                <li className="text-xs">
                  • Separating major page regions (use Card borders or layout containers)
                </li>
                <li className="text-xs">
                  • Navigation dividers (use proper nav semantics with aria-label)
                </li>
                <li className="text-xs">
                  • Every single content break (overuse reduces visual impact)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • Default to decorative=true for purely visual separators
                </li>
                <li className="text-xs">
                  • Use decorative=false only when screen readers need section announcement
                </li>
                <li className="text-xs">
                  • Horizontal separators: use in vertical layouts with space-y classes
                </li>
                <li className="text-xs">
                  • Vertical separators: use in flex layouts with flex items-center gap-4
                </li>
                <li className="text-xs">
                  • Customize color with bg-primary or other design tokens (not hardcoded)
                </li>
                <li className="text-xs">
                  • Increase height (h-[2px]) for stronger visual separation
                </li>
                <li className="text-xs">
                  • Combine with text using absolute positioning for &quot;OR&quot; dividers
                </li>
                <li className="text-xs">
                  • Use sparingly - too many separators create visual clutter
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
