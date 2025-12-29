'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, Download } from 'lucide-react';

export default function ButtonPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.01]"
      category="Components"
      title="Button"
      description="Displays a button or a component that looks like a button."
      importCode={`import { Button } from "@/components/ui/button"`}
      mainPreview={{
        preview: <Button>&gt; CLICK ME</Button>,
        code: `<Button>> CLICK ME</Button>`,
      }}
      variants={[
        {
          title: 'Default',
          description: 'The default button style with primary colors.',
          preview: <Button variant="default">&gt; DEFAULT</Button>,
          code: `<Button variant="default">> DEFAULT</Button>`,
        },
        {
          title: 'Secondary',
          description: 'A secondary button for less prominent actions.',
          preview: <Button variant="secondary">&gt; SECONDARY</Button>,
          code: `<Button variant="secondary">> SECONDARY</Button>`,
        },
        {
          title: 'Outline',
          description: 'A button with an outline border.',
          preview: <Button variant="outline">&gt; OUTLINE</Button>,
          code: `<Button variant="outline">> OUTLINE</Button>`,
        },
        {
          title: 'Ghost',
          description: 'A transparent button that appears on hover.',
          preview: <Button variant="ghost">&gt; GHOST</Button>,
          code: `<Button variant="ghost">> GHOST</Button>`,
        },
        {
          title: 'Link',
          description: 'A button that looks like a text link.',
          preview: <Button variant="link">&gt; LINK</Button>,
          code: `<Button variant="link">> LINK</Button>`,
        },
        {
          title: 'Destructive',
          description: 'A button for destructive actions like delete.',
          preview: <Button variant="destructive">&gt; DELETE</Button>,
          code: `<Button variant="destructive">> DELETE</Button>`,
        },
        {
          title: 'With Icon',
          description: 'Button with an icon for enhanced context.',
          preview: (
            <Button>
              <Mail className="mr-2 h-4 w-4" /> &gt; LOGIN WITH EMAIL
            </Button>
          ),
          code: `<Button>
  <Mail className="mr-2 h-4 w-4" /> > LOGIN WITH EMAIL
</Button>`,
        },
        {
          title: 'Icon Only',
          description: 'A compact button containing only an icon.',
          preview: (
            <Button variant="outline" size="icon" aria-label="Download">
              <Download className="h-4 w-4" />
            </Button>
          ),
          code: `<Button variant="outline" size="icon" aria-label="Download">
  <Download className="h-4 w-4" />
</Button>`,
        },
        {
          title: 'Loading',
          description: 'Button in loading state with spinner and text.',
          preview: <Button loading>&gt; LOADING...</Button>,
          code: `<Button loading>> LOADING...</Button>`,
        },
        {
          title: 'Disabled',
          description: 'A disabled button that cannot be clicked.',
          preview: <Button disabled>&gt; DISABLED</Button>,
          code: `<Button disabled>> DISABLED</Button>`,
        },
        {
          title: 'Small',
          description: 'A smaller button for compact UI areas.',
          preview: <Button size="sm">&gt; SMALL</Button>,
          code: `<Button size="sm">> SMALL</Button>`,
        },
        {
          title: 'Large',
          description: 'A larger button for prominent actions.',
          preview: <Button size="lg">&gt; LARGE</Button>,
          code: `<Button size="lg">> LARGE</Button>`,
        },
        {
          title: 'Extra Large',
          description: 'An extra large button for CTAs.',
          preview: <Button size="xl">&gt; EXTRA LARGE</Button>,
          code: `<Button size="xl">> EXTRA LARGE</Button>`,
        },
        {
          title: 'Primary CTA',
          description: 'High-emphasis call-to-action button.',
          preview: (
            <Button variant="primaryCta">
              &gt; GET STARTED <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ),
          code: `<Button variant="primaryCta">
  > GET STARTED <ArrowRight className="ml-2 h-4 w-4" />
</Button>`,
        },
      ]}
      props={[
        {
          name: 'variant',
          type: '"default" | "secondary" | "outline" | "ghost" | "link" | "destructive" | "primaryCta" | "secondaryCta" | "ghostOnDark"',
          default: '"default"',
          description: 'The visual style of the button.',
        },
        {
          name: 'size',
          type: '"default" | "sm" | "lg" | "xl" | "icon"',
          default: '"default"',
          description: 'The size of the button.',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'Render as the child element instead of a button.',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: 'Show loading spinner and disable button.',
        },
        {
          name: 'loadingText',
          type: 'string',
          default: '"Loading..."',
          description: 'Text to display when loading.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the button.',
        },
      ]}
      accessibility={[
        'Uses native <button> element for full keyboard support',
        'Supports disabled state with proper aria-disabled',
        'Loading state uses aria-busy for screen readers',
        'Focus visible styles for keyboard navigation',
        'Slot pattern allows custom elements while maintaining accessibility',
      ]}
      previous={{ title: 'Overview', href: '/docs/components/overview' }}
      next={{ title: 'Input', href: '/docs/components/input' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Button when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Triggering actions (submit form, open modal, delete item)
                </li>
                <li className="text-xs">• Primary navigation requires visual emphasis</li>
                <li className="text-xs">• You need loading states for async operations</li>
                <li className="text-xs">
                  • Action requires user confirmation (destructive variant)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Navigating to another page (use Link with variant=&quot;link&quot; or Next.js
                  Link)
                </li>
                <li className="text-xs">• Toggling state (use Switch or Checkbox instead)</li>
                <li className="text-xs">
                  • Selecting from multiple options (use Radio Group or Select)
                </li>
                <li className="text-xs">
                  • Icon-only actions need more context (add aria-label or use Tooltip)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Variant Selection Guide:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • <strong>default</strong>: Primary actions (save, submit, confirm)
                </li>
                <li className="text-xs">
                  • <strong>secondary</strong>: Less important actions (cancel, back)
                </li>
                <li className="text-xs">
                  • <strong>destructive</strong>: Dangerous actions (delete, remove, reset)
                </li>
                <li className="text-xs">
                  • <strong>outline</strong>: Secondary with more emphasis than ghost
                </li>
                <li className="text-xs">
                  • <strong>ghost</strong>: Minimal emphasis (close, dismiss, tertiary actions)
                </li>
                <li className="text-xs">
                  • <strong>link</strong>: Styled as text, use sparingly for inline actions
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
