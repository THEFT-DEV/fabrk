'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AlertDialogPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.21]"
      category="Components"
      title="Alert Dialog"
      description="A modal dialog that interrupts the user with important content and expects a response."
      importCode={`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"`}
      mainPreview={{
        preview: (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">&gt; SHOW ALERT</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
                <AlertDialogAction>&gt; CONTINUE</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
        code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">&gt; SHOW ALERT</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
      <AlertDialogAction>&gt; CONTINUE</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      }}
      variants={[
        {
          title: 'Delete Confirmation',
          description: 'Alert dialog for confirming destructive delete actions.',
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">&gt; DELETE ITEM</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this item. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    &gt; DELETE
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">&gt; DELETE ITEM</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this item?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete this item.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive">
        &gt; DELETE
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
        {
          title: 'Confirmation Only',
          description: 'Alert dialog with only a confirmation action.',
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary">&gt; SHOW NOTICE</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Notice</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your changes have been saved successfully. You can continue working on your
                    project.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>&gt; OK</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="secondary">&gt; SHOW NOTICE</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Notice</AlertDialogTitle>
      <AlertDialogDescription>
        Your changes have been saved successfully.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction>&gt; OK</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
        {
          title: 'Warning',
          description: 'Alert dialog warning about potential issues.',
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">&gt; PROCEED WITH CAUTION</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Warning</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action may affect other users. Are you sure you want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>&gt; GO BACK</AlertDialogCancel>
                  <AlertDialogAction>&gt; I UNDERSTAND</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">&gt; PROCEED WITH CAUTION</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Warning</AlertDialogTitle>
      <AlertDialogDescription>
        This action may affect other users.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; GO BACK</AlertDialogCancel>
      <AlertDialogAction>&gt; I UNDERSTAND</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
        {
          title: 'Controlled State',
          description: 'Alert dialog with controlled open state.',
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>&gt; CONTROLLED ALERT</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Controlled State</AlertDialogTitle>
                  <AlertDialogDescription>
                    This alert dialog can be controlled with open and onOpenChange props.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
                  <AlertDialogAction>&gt; CONTINUE</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `const [open, setOpen] = useState(false);

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <Button>&gt; CONTROLLED ALERT</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Controlled State</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
      <AlertDialogAction>&gt; CONTINUE</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
        {
          title: 'Custom Actions',
          description: 'Alert dialog with custom styled action buttons.',
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">&gt; CUSTOM ACTIONS</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Subscribe to newsletter?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Get the latest updates and news delivered to your inbox.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>&gt; NOT NOW</AlertDialogCancel>
                  <AlertDialogAction className="bg-primary">&gt; SUBSCRIBE</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="ghost">&gt; CUSTOM ACTIONS</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Subscribe to newsletter?</AlertDialogTitle>
      <AlertDialogDescription>
        Get the latest updates delivered to your inbox.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; NOT NOW</AlertDialogCancel>
      <AlertDialogAction>&gt; SUBSCRIBE</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
      ]}
      props={[
        {
          name: 'open',
          type: 'boolean',
          default: 'undefined',
          description: 'Control the open state of the alert dialog.',
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
      ]}
      accessibility={[
        "Implements ARIA alertdialog pattern with role='alertdialog'",
        'AlertDialogTitle provides accessible name via aria-labelledby',
        'AlertDialogDescription provides description via aria-describedby',
        'Focus is trapped within the dialog when open',
        'Escape key closes the dialog',
        'Focus returns to trigger element when closed',
        'AlertDialogAction and AlertDialogCancel have clear semantic meaning',
        'Keyboard navigation between action buttons with Tab/Shift+Tab',
      ]}
      previous={{ title: 'Dialog', href: '/docs/components/dialog' }}
      next={{ title: 'Sheet', href: '/docs/components/sheet' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Alert Dialog when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Simple yes/no decision required (delete, confirm, proceed)
                </li>
                <li className="text-xs">
                  • Destructive actions needing explicit confirmation (delete account, remove data)
                </li>
                <li className="text-xs">
                  • Critical warnings that must be acknowledged before proceeding
                </li>
                <li className="text-xs">
                  • Single action with clear consequences (logout, discard changes)
                </li>
                <li className="text-xs">
                  • Blocking user from proceeding without decision (terms acceptance)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Complex forms with multiple inputs (use Dialog instead)
                </li>
                <li className="text-xs">
                  • Temporary action feedback (use Toast for success/error messages)
                </li>
                <li className="text-xs">
                  • Persistent warnings that shouldn&apos;t block page (use Alert inline)
                </li>
                <li className="text-xs">
                  • Multiple actions or options needed (use Dialog for flexibility)
                </li>
                <li className="text-xs">
                  • Non-critical information that can be dismissed (use Toast or Alert)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • Always provide both Cancel and Action buttons (gives user clear choice)
                </li>
                <li className="text-xs">
                  • Use destructive styling for dangerous actions (red action button)
                </li>
                <li className="text-xs">
                  • Keep title short and clear: &quot;Delete file?&quot; not &quot;Are you sure you
                  want to delete this file?&quot;
                </li>
                <li className="text-xs">
                  • Description explains consequences: &quot;This action cannot be undone&quot;
                </li>
                <li className="text-xs">
                  • Action button text matches the action: &quot;Delete&quot;, &quot;Remove&quot;,
                  &quot;Confirm&quot;
                </li>
                <li className="text-xs">
                  • AlertDialog for single decision, Dialog for complex forms/workflows
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
