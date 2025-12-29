'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Info } from 'lucide-react';
import { formatLabel } from '@/design-system';

export default function PopoverPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.23]"
      category="Components"
      title="Popover"
      description="Displays rich content in a portal, triggered by a button or other element."
      importCode={`import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`}
      mainPreview={{
        preview: (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">&gt; OPEN POPOVER</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="leading-none font-semibold">Dimensions</h4>
                <p className="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
              </div>
            </PopoverContent>
          </Popover>
        ),
        code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">&gt; OPEN POPOVER</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-2">
      <h4 className="font-semibold">Dimensions</h4>
      <p className="text-sm text-muted-foreground">
        Set the dimensions for the layer.
      </p>
    </div>
  </PopoverContent>
</Popover>`,
      }}
      variants={[
        {
          title: 'With Form',
          description: 'Popover containing a form with inputs.',
          preview: (
            <Popover>
              <PopoverTrigger asChild>
                <Button>
                  <Settings className="mr-2 h-4 w-4" />
                  &gt; SETTINGS
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="leading-none font-semibold">Settings</h4>
                    <p className="text-muted-foreground text-sm">Configure your preferences.</p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">{formatLabel('Width')}</Label>
                      <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">{formatLabel('Height')}</Label>
                      <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ),
          code: `<Popover>
  <PopoverTrigger asChild>
    <Button>
      <Settings className="mr-2 h-4 w-4" />
      &gt; SETTINGS
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="grid gap-4">
      <h4 className="font-semibold">Settings</h4>
      <div className="grid gap-2">
        <Label htmlFor="width">{formatLabel("Width")}</Label>
        <Input id="width" defaultValue="100%" />
        <Label htmlFor="height">{formatLabel("Height")}</Label>
        <Input id="height" defaultValue="25px" />
      </div>
    </div>
  </PopoverContent>
</Popover>`,
        },
        {
          title: 'Aligned Start',
          description: 'Popover aligned to the start of the trigger.',
          preview: (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">&gt; ALIGN START</Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <div className="space-y-2">
                  <h4 className="font-semibold">Aligned to Start</h4>
                  <p className="text-muted-foreground text-sm">
                    This popover is aligned to the start of the trigger.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          ),
          code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">&gt; ALIGN START</Button>
  </PopoverTrigger>
  <PopoverContent align="start">
    <div className="space-y-2">
      <h4 className="font-semibold">Aligned to Start</h4>
      <p className="text-sm">Content here</p>
    </div>
  </PopoverContent>
</Popover>`,
        },
        {
          title: 'Aligned End',
          description: 'Popover aligned to the end of the trigger.',
          preview: (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">&gt; ALIGN END</Button>
              </PopoverTrigger>
              <PopoverContent align="end">
                <div className="space-y-2">
                  <h4 className="font-semibold">Aligned to End</h4>
                  <p className="text-muted-foreground text-sm">
                    This popover is aligned to the end of the trigger.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          ),
          code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">&gt; ALIGN END</Button>
  </PopoverTrigger>
  <PopoverContent align="end">
    <div className="space-y-2">
      <h4 className="font-semibold">Aligned to End</h4>
      <p className="text-sm">Content here</p>
    </div>
  </PopoverContent>
</Popover>`,
        },
        {
          title: 'Icon Trigger',
          description: 'Popover triggered by an icon button.',
          preview: (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Show more information">
                  <Info className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-2">
                  <h4 className="font-semibold">Information</h4>
                  <p className="text-muted-foreground text-sm">
                    This is additional information shown in a popover.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          ),
          code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="Show more information">
      <Info className="h-4 w-4" />
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-2">
      <h4 className="font-semibold">Information</h4>
      <p className="text-sm">Additional info here</p>
    </div>
  </PopoverContent>
</Popover>`,
        },
        {
          title: 'Custom Width',
          description: 'Popover with custom width using className.',
          preview: (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">&gt; WIDE POPOVER</Button>
              </PopoverTrigger>
              <PopoverContent className="w-96">
                <div className="space-y-2">
                  <h4 className="font-semibold">Custom Width</h4>
                  <p className="text-muted-foreground text-sm">
                    This popover has a custom width of 384px (w-96). You can adjust the width using
                    Tailwind classes.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          ),
          code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">&gt; WIDE POPOVER</Button>
  </PopoverTrigger>
  <PopoverContent className="w-96">
    <div className="space-y-2">
      <h4 className="font-semibold">Custom Width</h4>
      <p className="text-sm">Content with custom width</p>
    </div>
  </PopoverContent>
</Popover>`,
        },
      ]}
      props={[
        {
          name: 'open',
          type: 'boolean',
          default: 'undefined',
          description: 'Control the open state of the popover.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          default: 'undefined',
          description: 'Event handler called when the open state changes.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'The initial open state in uncontrolled mode.',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'false',
          description: 'Whether the popover is modal (blocks interaction with page).',
        },
        {
          name: 'align',
          type: '"start" | "center" | "end"',
          default: '"center"',
          description: 'The preferred alignment of the popover with the trigger.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '8',
          description: 'The distance in pixels from the trigger.',
        },
      ]}
      accessibility={[
        'Implements ARIA popover pattern with proper roles',
        'Escape key closes the popover',
        'Click outside closes the popover (non-modal mode)',
        'Focus management when popover opens',
        'Keyboard navigation support',
        'Automatically positions to stay in viewport',
        'Handles collision detection with viewport edges',
      ]}
      previous={{ title: 'Sheet', href: '/docs/components/sheet' }}
      next={{ title: 'Tooltip', href: '/docs/components/tooltip' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Popover when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Interactive content needed (forms, inputs, buttons, links)
                </li>
                <li className="text-xs">• Quick settings or filters attached to trigger element</li>
                <li className="text-xs">
                  • Help content with formatting, links, or selectable text
                </li>
                <li className="text-xs">
                  • Rich formatting needed (headings, lists, multiple paragraphs)
                </li>
                <li className="text-xs">
                  • Content should persist until user explicitly closes it
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">• Simple hover text with no interaction (use Tooltip)</li>
                <li className="text-xs">
                  • Requires full modal with backdrop blocking page (use Dialog)
                </li>
                <li className="text-xs">
                  • Primary navigation or menu actions (use Dropdown Menu)
                </li>
                <li className="text-xs">
                  • Critical decisions or destructive actions (use Alert Dialog)
                </li>
                <li className="text-xs">• Large forms or multi-step workflows (use Dialog)</li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Popover vs Tooltip vs Dialog:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • <strong>Popover</strong>: Interactive, click to open, rich content with
                  forms/links
                </li>
                <li className="text-xs">
                  • <strong>Tooltip</strong>: Non-interactive, hover/focus, plain text (1-2 lines)
                </li>
                <li className="text-xs">
                  • <strong>Dialog</strong>: Modal overlay, complex workflows, blocks page
                  interaction
                </li>
                <li className="text-xs">
                  • Use align prop (start/center/end) to control positioning
                </li>
                <li className="text-xs">• Set modal=true to block page interaction when open</li>
                <li className="text-xs">
                  • Keep content concise - if it needs scrolling, consider Dialog instead
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
