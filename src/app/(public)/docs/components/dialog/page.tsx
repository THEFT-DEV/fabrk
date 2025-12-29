'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatLabel } from '@/design-system';

export default function DialogPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.20]"
      category="Components"
      title="Dialog"
      description="A modal dialog that interrupts the user with important content and expects a response."
      importCode={`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"`}
      mainPreview={{
        preview: (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">&gt; OPEN DIALOG</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ),
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">&gt; OPEN DIALOG</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
      }}
      variants={[
        {
          title: 'With Form',
          description: 'Dialog containing a form with inputs and actions.',
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button>&gt; EDIT PROFILE</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      {formatLabel('Name')}
                    </Label>
                    <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      {formatLabel('Username')}
                    </Label>
                    <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">&gt; SAVE CHANGES</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button>&gt; EDIT PROFILE</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          {formatLabel("Name")}
        </Label>
        <Input id="name" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          {formatLabel("Username")}
        </Label>
        <Input id="username" className="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">&gt; SAVE CHANGES</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
        },
        {
          title: 'Confirmation Dialog',
          description: 'Dialog for confirming destructive actions.',
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">&gt; DELETE ACCOUNT</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">&gt; CANCEL</Button>
                  <Button variant="destructive">&gt; DELETE ACCOUNT</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">&gt; DELETE ACCOUNT</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">&gt; CANCEL</Button>
      <Button variant="destructive">&gt; DELETE ACCOUNT</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
        },
        {
          title: 'Custom Width',
          description: 'Dialog with custom width using className.',
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">&gt; WIDE DIALOG</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Custom Width Dialog</DialogTitle>
                  <DialogDescription>
                    This dialog has a custom width of 600px on larger screens.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ),
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">&gt; WIDE DIALOG</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[600px]">
    <DialogHeader>
      <DialogTitle>Custom Width Dialog</DialogTitle>
      <DialogDescription>
        Custom width of 600px on larger screens.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
        },
        {
          title: 'Controlled Dialog',
          description: 'Dialog with controlled open state using state management.',
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">&gt; CONTROLLED DIALOG</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Controlled State</DialogTitle>
                  <DialogDescription>
                    This dialog's open state can be controlled externally using the open and
                    onOpenChange props.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ),
          code: `const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>&gt; OPEN</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Controlled State</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
        },
        {
          title: 'No Description',
          description: 'Dialog without a description for simpler content.',
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">&gt; SIMPLE DIALOG</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Simple Title Only</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-muted-foreground text-sm">
                    Sometimes you don't need a description, just a title and content.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          ),
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="ghost">&gt; SIMPLE DIALOG</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Simple Title Only</DialogTitle>
    </DialogHeader>
    <div className="py-4">
      <p>Content goes here</p>
    </div>
  </DialogContent>
</Dialog>`,
        },
      ]}
      props={[
        {
          name: 'open',
          type: 'boolean',
          default: 'undefined',
          description: 'Control the open state of the dialog.',
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
          default: 'true',
          description: 'Whether the dialog is modal (blocks interaction with page).',
        },
      ]}
      accessibility={[
        'Implements ARIA dialog pattern with proper role and aria-modal',
        'Focus is trapped within the dialog when open',
        'DialogTitle provides accessible name via aria-labelledby',
        'DialogDescription provides description via aria-describedby',
        'Escape key closes the dialog',
        'Click outside or on overlay closes the dialog',
        'Focus returns to trigger element when closed',
      ]}
      previous={{ title: 'Tooltip', href: '/docs/components/tooltip' }}
      next={{ title: 'Alert Dialog', href: '/docs/components/alert-dialog' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Dialog when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Complex forms requiring multiple inputs (edit profile, create project)
                </li>
                <li className="text-xs">
                  • Multi-step workflows that need focused attention (onboarding, setup wizard)
                </li>
                <li className="text-xs">
                  • Important information requiring user interaction before proceeding
                </li>
                <li className="text-xs">
                  • Content preview or detailed view (image gallery, document viewer)
                </li>
                <li className="text-xs">
                  • User must respond or complete action before returning to page
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Quick feedback needed (use Toast for temporary notifications)
                </li>
                <li className="text-xs">
                  • Simple yes/no confirmation (use Alert Dialog for single decision)
                </li>
                <li className="text-xs">
                  • Persistent warnings that shouldn&apos;t block page (use Alert inline)
                </li>
                <li className="text-xs">• Non-blocking information (use Popover or Tooltip)</li>
                <li className="text-xs">
                  • Navigation to different page (use proper routing instead)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Dialog vs Alert Dialog:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • <strong>Dialog</strong>: Complex forms, multiple inputs, flexible content
                </li>
                <li className="text-xs">
                  • <strong>Alert Dialog</strong>: Single decision, confirm/cancel, destructive
                  actions
                </li>
                <li className="text-xs">
                  • <strong>Dialog</strong>: Edit profile (name, email, bio, avatar)
                </li>
                <li className="text-xs">
                  • <strong>Alert Dialog</strong>: &quot;Delete this file?&quot; (just
                  confirm/cancel)
                </li>
                <li className="text-xs">
                  • Use controlled state (open/onOpenChange) for programmatic control
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
