'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ToastPage() {
  const { toast, success, error, info, warning } = useToast();

  return (
    <ComponentShowcaseTemplate
      code="[UI.37]"
      category="Feedback"
      title="Toast"
      description="A succinct message that is displayed temporarily at the top of the screen."
      importCode={`import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"`}
      mainPreview={{
        preview: (
          <Button
            onClick={() => {
              toast({
                title: 'Notification',
                description: 'This is a toast notification.',
              });
            }}
          >
            Show Toast
          </Button>
        ),
        code: `const { toast } = useToast();

<Button
  onClick={() => {
    toast({
      title: "Notification",
      description: "This is a toast notification.",
    });
  }}
>
  Show Toast
</Button>`,
      }}
      variants={[
        {
          title: 'Simple Toast',
          description: 'Basic toast with just a description.',
          preview: (
            <Button
              onClick={() => {
                toast({
                  description: 'Your message has been sent.',
                });
              }}
            >
              Simple Message
            </Button>
          ),
          code: `toast({
  description: "Your message has been sent.",
});`,
        },
        {
          title: 'With Title',
          description: 'Toast with both title and description.',
          preview: (
            <Button
              onClick={() => {
                toast({
                  title: 'Success',
                  description: 'Your changes have been saved.',
                });
              }}
            >
              Success Message
            </Button>
          ),
          code: `toast({
  title: "Success",
  description: "Your changes have been saved.",
});`,
        },
        {
          title: 'Success Toast',
          description: 'Success notification toast.',
          preview: (
            <Button
              onClick={() => {
                success('Success', 'Your changes have been saved.');
              }}
            >
              Success
            </Button>
          ),
          code: `const { success } = useToast();
success("Success", "Your changes have been saved.");`,
        },
        {
          title: 'Error Toast',
          description: 'Toast for error messages.',
          preview: (
            <Button
              variant="destructive"
              onClick={() => {
                error('Error', 'Something went wrong. Please try again.');
              }}
            >
              Show Error
            </Button>
          ),
          code: `const { error } = useToast();
error("Error", "Something went wrong. Please try again.");`,
        },
        {
          title: 'With Action',
          description: 'Toast with an action button.',
          preview: (
            <Button
              onClick={() => {
                toast({
                  title: 'Undo Available',
                  description: 'File moved to trash.',
                  action: {
                    label: 'Undo',
                    onClick: () => {},
                  },
                });
              }}
            >
              With Action
            </Button>
          ),
          code: `toast({
  title: "Undo Available",
  description: "File moved to trash.",
  action: {
    label: "Undo",
    onClick: () => {},
  },
});`,
        },
        {
          title: 'Info & Warning',
          description: 'Info and warning toast variants.',
          preview: (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  info('Info', 'This is informational.');
                }}
              >
                Info
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  warning('Warning', 'Please be careful.');
                }}
              >
                Warning
              </Button>
            </div>
          ),
          code: `const { info, warning } = useToast();

// Info toast
info("Info", "This is informational.");

// Warning toast
warning("Warning", "Please be careful.");`,
        },
      ]}
      props={[
        {
          name: 'title',
          type: 'string',
          description: 'The title of the toast (optional).',
        },
        {
          name: 'description',
          type: 'string',
          description: 'The description text for the toast.',
        },
        {
          name: 'action',
          type: '{ label: string; onClick: () => void }',
          description: 'Optional action button configuration.',
        },
        {
          name: 'success',
          type: '(title: string, description?: string) => void',
          description: 'Show a success toast notification.',
        },
        {
          name: 'error',
          type: '(title: string, description?: string) => void',
          description: 'Show an error toast notification.',
        },
        {
          name: 'info',
          type: '(title: string, description?: string) => void',
          description: 'Show an info toast notification.',
        },
        {
          name: 'warning',
          type: '(title: string, description?: string) => void',
          description: 'Show a warning toast notification.',
        },
        {
          name: 'dismiss',
          type: '(toastId?: string | number) => void',
          description: 'Dismiss a specific toast or all toasts if no ID provided.',
        },
      ]}
      usageExamples={[
        {
          title: 'Setup',
          description: 'The toast system uses Sonner and is pre-configured in your layout.',
          code: `import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}`,
        },
        {
          title: 'Basic Usage',
          description: 'Use the toast hook in your components.',
          code: `import { useToast } from "@/hooks/use-toast";

export function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Notification",
          description: "Your action was successful.",
        });
      }}
    >
      Show Notification
    </Button>
  );
}`,
        },
        {
          title: 'Error Handling',
          description: 'Show error toasts in try-catch blocks.',
          code: `const { toast } = useToast();

async function handleSubmit() {
  try {
    await saveData();
    toast({
      title: "Success",
      description: "Data saved successfully.",
    });
  } catch (_) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to save data.",
    });
  }
}`,
        },
      ]}
      accessibility={[
        'Toasts are announced to screen readers',
        'Automatically dismissed after duration expires',
        'Can be manually dismissed with close button',
        'Keyboard accessible close button',
        'Proper ARIA roles and attributes',
        'Focus management for action buttons',
      ]}
      previous={{ title: 'Command', href: '/docs/components/command' }}
      next={{ title: 'Cropper', href: '/docs/components/cropper' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Toast when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Providing temporary feedback for user actions (saved, deleted, copied)
                </li>
                <li className="text-xs">
                  • Non-critical notifications that don&apos;t require user decision
                </li>
                <li className="text-xs">• Auto-dismiss is appropriate (3-5 seconds typical)</li>
                <li className="text-xs">
                  • Quick status updates (upload progress, background tasks)
                </li>
                <li className="text-xs">• Undo actions with action button (delete with undo)</li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Information must persist until user acknowledges (use Alert)
                </li>
                <li className="text-xs">
                  • User must make a decision (use Dialog or Alert Dialog)
                </li>
                <li className="text-xs">
                  • Critical errors requiring attention (use Alert with destructive variant)
                </li>
                <li className="text-xs">
                  • Complex information with multiple paragraphs (use Dialog)
                </li>
                <li className="text-xs">
                  • Form validation errors (show inline with error states)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Toast vs Alert:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • <strong>Toast</strong>: Temporary (auto-dismiss), action feedback, non-blocking
                </li>
                <li className="text-xs">
                  • <strong>Alert</strong>: Persistent (user dismisses), important info, inline in
                  page
                </li>
                <li className="text-xs">
                  • <strong>Toast</strong>: &quot;Item saved&quot;, &quot;Copied to clipboard&quot;,
                  &quot;File uploaded&quot;
                </li>
                <li className="text-xs">
                  • <strong>Alert</strong>: &quot;Your session will expire in 10 minutes&quot;,
                  &quot;Email verification required&quot;
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
