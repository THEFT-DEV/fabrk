'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Trash2, Edit, Save, Settings } from 'lucide-react';

export default function TooltipPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.24]"
      category="Components"
      title="Tooltip"
      description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
      importCode={`import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"`}
      mainPreview={{
        preview: (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">&gt; HOVER ME</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
        code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">&gt; HOVER ME</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      }}
      variants={[
        {
          title: 'Icon Button',
          description: 'Tooltip on an icon button for accessibility.',
          preview: (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Add new item">
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add new item</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon" aria-label="Add new item">
        <Plus className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add new item</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        },
        {
          title: 'Destructive Action',
          description: 'Tooltip explaining a destructive action.',
          preview: (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive" size="icon" aria-label="Delete permanently">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete permanently</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="destructive" size="icon" aria-label="Delete permanently">
        <Trash2 className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Delete permanently</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        },
        {
          title: 'With Keyboard Shortcut',
          description: 'Tooltip showing keyboard shortcut hint.',
          preview: (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Save">
                    <Save className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Save <kbd className="bg-muted border-border ml-1 border px-1 text-xs">⌘S</kbd>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="Save">
        <Save className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>
        Save <kbd className="ml-1 bg-muted border border-border px-1">⌘S</kbd>
      </p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        },
        {
          title: 'Multiple Tooltips',
          description: 'Multiple tooltips using a single provider.',
          preview: (
            <TooltipProvider>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Edit">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Settings">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          ),
          code: `<TooltipProvider>
  <div className="flex gap-2">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Edit">
          <Edit className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Edit</p>
      </TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Delete">
          <Trash2 className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete</p>
      </TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Settings">
          <Settings className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Settings</p>
      </TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>`,
        },
        {
          title: 'Custom Delay',
          description: 'Tooltip with custom delay before showing.',
          preview: (
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">&gt; DELAYED TOOLTIP</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This tooltip has a 300ms delay</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: `<TooltipProvider delayDuration={300}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary">&gt; DELAYED TOOLTIP</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This tooltip has a 300ms delay</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        },
      ]}
      props={[
        {
          name: 'delayDuration',
          type: 'number',
          default: '700',
          description:
            'The duration from when the mouse enters a tooltip trigger until the tooltip opens (in ms). Set on TooltipProvider.',
        },
        {
          name: 'skipDelayDuration',
          type: 'number',
          default: '300',
          description:
            'How long a user has to enter another trigger without delay after closing a tooltip (in ms). Set on TooltipProvider.',
        },
        {
          name: 'open',
          type: 'boolean',
          default: 'undefined',
          description: 'Control the open state of the tooltip.',
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
          name: 'sideOffset',
          type: 'number',
          default: '4',
          description: 'The distance in pixels from the trigger.',
        },
      ]}
      accessibility={[
        "Implements ARIA tooltip pattern with role='tooltip'",
        'TooltipTrigger has aria-describedby pointing to the tooltip content',
        'Tooltip appears on hover and keyboard focus',
        'Escape key dismisses the tooltip',
        'Automatically positions to stay in viewport',
        'Essential for icon-only buttons to provide accessible labels',
        'Respects prefers-reduced-motion for animations',
        'Should not contain interactive content (use Popover instead)',
      ]}
      previous={{ title: 'Popover', href: '/docs/components/popover' }}
      next={{ title: 'Dialog', href: '/docs/components/dialog' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Tooltip when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Icon-only buttons need accessible labels (edit, delete, settings icons)
                </li>
                <li className="text-xs">
                  • Abbreviations or truncated text need full context (hover to see full name)
                </li>
                <li className="text-xs">
                  • Providing additional context on hover (why is this disabled?)
                </li>
                <li className="text-xs">• Showing keyboard shortcuts (Save: ⌘S)</li>
                <li className="text-xs">• Short supplemental information (1-2 sentences max)</li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Information is critical to task completion (show it directly in UI)
                </li>
                <li className="text-xs">
                  • Content needs to be interactive or clickable (use Popover instead)
                </li>
                <li className="text-xs">
                  • Text is longer than 2-3 sentences (use Popover or Dialog)
                </li>
                <li className="text-xs">
                  • Primary mobile experience (touch devices don&apos;t have hover)
                </li>
                <li className="text-xs">
                  • User needs to copy text from tooltip (use Popover for selectable text)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Tooltip vs Popover:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • <strong>Tooltip</strong>: Non-interactive, hover/focus, short text (1-2 lines)
                </li>
                <li className="text-xs">
                  • <strong>Popover</strong>: Interactive, click to open, complex content with
                  links/buttons
                </li>
                <li className="text-xs">
                  • <strong>Tooltip</strong>: Auto-dismisses on mouse leave, ESC key
                </li>
                <li className="text-xs">
                  • <strong>Popover</strong>: Stays open until user closes it
                </li>
                <li className="text-xs">
                  • Always wrap multiple tooltips in single TooltipProvider for performance
                </li>
                <li className="text-xs">• Keep delay short (300-700ms) for responsive feel</li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
