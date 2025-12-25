'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SheetPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.22]"
      category="Overlay"
      title="Sheet"
      description="Extends the Dialog component to display content that slides in from the edge of the screen."
      importCode={`import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"`}
      mainPreview={{
        preview: (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">&gt; OPEN SHEET</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ),
        code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">&gt; OPEN SHEET</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
      }}
      variants={[
        {
          title: 'Right Side (Default)',
          description: 'Sheet that slides in from the right side of the screen.',
          preview: (
            <Sheet>
              <SheetTrigger asChild>
                <Button>&gt; FROM RIGHT</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Right Side Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the right side of the screen.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ),
          code: `<Sheet>
  <SheetTrigger asChild>
    <Button>&gt; FROM RIGHT</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Right Side Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
        },
        {
          title: 'Left Side',
          description: 'Sheet that slides in from the left side of the screen.',
          preview: (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary">&gt; FROM LEFT</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Left Side Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the left side of the screen.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ),
          code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">&gt; FROM LEFT</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Left Side Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
        },
        {
          title: 'Top Side',
          description: 'Sheet that slides in from the top of the screen.',
          preview: (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">&gt; FROM TOP</Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>Top Side Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the top of the screen.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ),
          code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">&gt; FROM TOP</Button>
  </SheetTrigger>
  <SheetContent side="top">
    <SheetHeader>
      <SheetTitle>Top Side Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
        },
        {
          title: 'Bottom Side',
          description: 'Sheet that slides in from the bottom of the screen.',
          preview: (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost">&gt; FROM BOTTOM</Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Bottom Side Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the bottom of the screen.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ),
          code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost">&gt; FROM BOTTOM</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Bottom Side Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
        },
        {
          title: 'With Form',
          description: 'Sheet containing a form with inputs and footer actions.',
          preview: (
            <Sheet>
              <SheetTrigger asChild>
                <Button>&gt; EDIT SETTINGS</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit settings</SheetTitle>
                  <SheetDescription>
                    Update your account settings. Changes will be saved automatically.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input id="username" className="col-span-3" />
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit">&gt; SAVE CHANGES</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ),
          code: `<Sheet>
  <SheetTrigger asChild>
    <Button>&gt; EDIT SETTINGS</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit settings</SheetTitle>
      <SheetDescription>
        Update your account settings.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input id="email" className="col-span-3" />
      </div>
    </div>
    <SheetFooter>
      <Button type="submit">&gt; SAVE CHANGES</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
        },
      ]}
      props={[
        {
          name: 'open',
          type: 'boolean',
          default: 'undefined',
          description: 'Control the open state of the sheet.',
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
          name: 'side',
          type: '"top" | "right" | "bottom" | "left"',
          default: '"right"',
          description: 'The side of the screen from which the sheet slides in.',
        },
      ]}
      accessibility={[
        'Implements ARIA dialog pattern with proper role',
        'Focus is trapped within the sheet when open',
        'SheetTitle provides accessible name via aria-labelledby',
        'SheetDescription provides description via aria-describedby',
        'Escape key closes the sheet',
        'Click outside or on overlay closes the sheet',
        'Focus returns to trigger element when closed',
        'Close button has accessible label',
      ]}
      previous={{
        title: 'Alert Dialog',
        href: '/docs/components/alert-dialog',
      }}
      next={{ title: 'Popover', href: '/docs/components/popover' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Sheet when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Secondary navigation or sidebar that should overlay content (mobile menus,
                  filters)
                </li>
                <li className="text-xs">
                  • Forms or settings that are contextual to the page (edit profile, preferences)
                </li>
                <li className="text-xs">
                  • Task panel or detailed information without leaving the page
                </li>
                <li className="text-xs">
                  • Content needs to slide in from edge of screen (more directional than Dialog)
                </li>
                <li className="text-xs">• Shopping cart, notification panel, or activity feed</li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">• Simple confirmation or alert (use Alert Dialog)</li>
                <li className="text-xs">
                  • Critical action requiring focus (use Dialog centered on screen)
                </li>
                <li className="text-xs">
                  • Content is better as a full page (navigation to new route)
                </li>
                <li className="text-xs">
                  • Mobile-only navigation menu (consider responsive Navbar instead)
                </li>
                <li className="text-xs">
                  • Complex multi-step wizard (use Dialog or dedicated page)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • Use side=&quot;right&quot; for most forms and contextual content (default)
                </li>
                <li className="text-xs">
                  • Use side=&quot;left&quot; for navigation menus (follows drawer pattern)
                </li>
                <li className="text-xs">
                  • Use side=&quot;bottom&quot; for mobile-friendly action sheets
                </li>
                <li className="text-xs">
                  • Always include SheetTitle and SheetDescription for accessibility
                </li>
                <li className="text-xs">• Add SheetFooter with actions (Save, Cancel) for forms</li>
                <li className="text-xs">
                  • Control state with open and onOpenChange for programmatic control
                </li>
                <li className="text-xs">
                  • Keep content focused - sheet is not a full page replacement
                </li>
                <li className="text-xs">• Use SheetTrigger with asChild to avoid nested buttons</li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
