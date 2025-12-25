'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { ToastTitle, ToastDescription, ToastClose, ToastViewport } from '@/components/ui/toaster';
import { Toast, ToastProvider } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function ToasterDemo() {
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; description?: string }>>(
    []
  );

  const showToast = (title: string, description?: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          className="rounded-none"
          onClick={() => showToast('Success', 'Your changes have been saved.')}
        >
          Show Toast
        </Button>
        <Button
          variant="outline"
          className="rounded-none"
          onClick={() => showToast('Error', 'Something went wrong.')}
        >
          Show Error
        </Button>
        <Button
          variant="outline"
          className="rounded-none"
          onClick={() => showToast('Simple notification')}
        >
          Simple Toast
        </Button>
      </div>

      <ToastProvider>
        {toasts.map(({ id, title, description }) => (
          <Toast key={id} id={id}>
            <div className="grid gap-1">
              <ToastTitle>{title}</ToastTitle>
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </div>
  );
}

export default function ToasterPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.42]"
      category="Components"
      title="Toaster"
      description="Toast notification component for displaying temporary messages and alerts to users."
      importCode={`import { Toaster, ToastProvider, Toast, ToastTitle, ToastDescription, ToastAction, ToastClose, ToastViewport } from "@/components/ui/toaster"`}
      mainPreview={{
        preview: <ToasterDemo />,
        code: `import { Toast, ToastProvider, ToastTitle, ToastDescription, ToastClose, ToastViewport } from "@/components/ui/toaster";

function App() {
  return (
    <ToastProvider>
      <Toast id="toast-1">
        <div className="grid gap-1">
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Your changes have been saved.</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}`,
      }}
      variants={[
        {
          title: 'Toast Components',
          description: 'Building blocks for creating toast notifications',
          preview: (
            <div className="space-y-4">
              <div className="mb-4">[COMPONENTS]</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary">&gt;</span>
                  <span>ToastProvider</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">&gt;</span>
                  <span>Toast</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">&gt;</span>
                  <span>ToastTitle</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">&gt;</span>
                  <span>ToastDescription</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">&gt;</span>
                  <span>ToastAction</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">&gt;</span>
                  <span>ToastClose</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">&gt;</span>
                  <span>ToastViewport</span>
                </div>
              </div>
            </div>
          ),
          code: `import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastViewport,
} from "@/components/ui/toaster";

<ToastProvider>
  <Toast id="1">
    <ToastTitle>Title</ToastTitle>
    <ToastDescription>Description</ToastDescription>
    <ToastAction altText="Action">Action</ToastAction>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>`,
        },
        {
          title: 'With Title Only',
          description: 'Simple toast with just a title',
          preview: (
            <div className="border-border bg-background w-full max-w-md rounded-none border p-6">
              <div className="font-medium">Notification sent</div>
            </div>
          ),
          code: `<Toast id="simple">
  <ToastTitle>Notification sent</ToastTitle>
  <ToastClose />
</Toast>`,
        },
        {
          title: 'With Title and Description',
          description: 'Toast with title and supporting text',
          preview: (
            <div className="border-border bg-background w-full max-w-md rounded-none border p-6">
              <div className="grid gap-1">
                <div className="font-medium">Changes saved</div>
                <div className="opacity-90">Your profile has been updated successfully.</div>
              </div>
            </div>
          ),
          code: `<Toast id="with-desc">
  <div className="grid gap-1">
    <ToastTitle>Changes saved</ToastTitle>
    <ToastDescription>
      Your profile has been updated successfully.
    </ToastDescription>
  </div>
  <ToastClose />
</Toast>`,
        },
        {
          title: 'With Action Button',
          description: 'Toast with an actionable button',
          preview: (
            <div className="border-border bg-background flex w-full max-w-md items-center justify-between gap-6 rounded-none border p-6">
              <div className="grid gap-1">
                <div className="font-medium">File deleted</div>
                <div className="opacity-90">Your file has been moved to trash.</div>
              </div>
              <button className="border-border bg-background inline-flex h-8 shrink-0 items-center justify-center rounded-none border px-4 text-sm font-medium">
                Undo
              </button>
            </div>
          ),
          code: `<Toast id="with-action">
  <div className="grid gap-1">
    <ToastTitle>File deleted</ToastTitle>
    <ToastDescription>
      Your file has been moved to trash.
    </ToastDescription>
  </div>
  <ToastAction altText="Undo deletion">
    Undo
  </ToastAction>
  <ToastClose />
</Toast>`,
        },
        {
          title: 'Destructive Variant',
          description: 'Error toast with destructive styling',
          preview: (
            <div className="border-destructive bg-destructive text-destructive-foreground w-full max-w-md rounded-none border p-6">
              <div className="grid gap-1">
                <div className="font-medium">Error</div>
                <div className="opacity-90">Failed to save changes. Please try again.</div>
              </div>
            </div>
          ),
          code: `<Toast id="error" variant="destructive">
  <div className="grid gap-1">
    <ToastTitle>Error</ToastTitle>
    <ToastDescription>
      Failed to save changes. Please try again.
    </ToastDescription>
  </div>
  <ToastClose />
</Toast>`,
        },
        {
          title: 'Toast Provider Setup',
          description: 'Provider wraps your app to manage toasts',
          preview: (
            <div className="space-y-4">
              <div className="mb-4">[SETUP]</div>
              <div className="space-y-2">
                <div>1. Wrap app in ToastProvider</div>
                <div>2. Add ToastViewport component</div>
                <div>3. Render Toast components</div>
                <div>4. Manage state externally</div>
              </div>
            </div>
          ),
          code: `// Root layout or app component
import { ToastProvider, ToastViewport } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
          <ToastViewport />
        </ToastProvider>
      </body>
    </html>
  );
}`,
        },
        {
          title: 'Viewport Positioning',
          description: 'ToastViewport controls where toasts appear',
          preview: (
            <div className="space-y-4">
              <div className="mb-4">[POSITION]</div>
              <div className="space-y-2">
                <div>&gt; Top-right on mobile</div>
                <div>&gt; Bottom-right on desktop</div>
                <div>&gt; Stacks vertically</div>
                <div>&gt; Max width: 384px</div>
              </div>
            </div>
          ),
          code: `// ToastViewport positioning (built-in)
<ToastViewport />

// Renders at:
// - top-0 on mobile (small screens)
// - bottom-0 right-0 on desktop
// - Max width: 384px (max-w-96)`,
        },
      ]}
      props={[
        {
          name: 'Toast',
          type: 'Component',
          description: "Root toast component. Accepts variant prop ('default' | 'destructive')",
        },
        {
          name: 'ToastProvider',
          type: 'Component',
          description: 'Required wrapper component that manages toast state',
        },
        {
          name: 'ToastTitle',
          type: 'Component',
          description: 'Toast title text with medium font weight',
        },
        {
          name: 'ToastDescription',
          type: 'Component',
          description: 'Toast description text with muted styling',
        },
        {
          name: 'ToastAction',
          type: 'Component',
          description: 'Action button component. Requires altText prop for accessibility',
        },
        {
          name: 'ToastClose',
          type: 'Component',
          description: 'Close button with X icon, positioned absolutely',
        },
        {
          name: 'ToastViewport',
          type: 'Component',
          description: 'Viewport container that positions toasts on screen',
        },
        {
          name: 'Toaster',
          type: 'Component',
          description: 'Complete toaster component with built-in provider',
        },
      ]}
      accessibility={[
        'Uses Radix UI Toast primitives for full accessibility',
        'ToastAction requires altText prop for screen readers',
        "Close button has aria-label='Close' by default",
        'Toasts announce to screen readers with appropriate aria-live regions',
        'Keyboard accessible with Escape key to dismiss',
        'Focus management handled automatically',
        'Swipe gestures supported on touch devices',
        'Auto-dismissal can be paused on hover or focus',
      ]}
      previous={{
        title: 'Notification List',
        href: '/docs/components/notification-list',
      }}
      next={{ title: 'Tooltip', href: '/docs/components/tooltip' }}
    />
  );
}
