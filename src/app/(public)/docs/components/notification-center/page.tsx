'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { NotificationCenter, Notification } from '@/components/ui/notification-center';
import { useState } from 'react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Sample notifications
const createNotifications = (): Notification[] => [
  {
    id: '1',
    type: 'info',
    title: 'New feature available',
    message: 'Check out the new dashboard analytics. Now you can track your metrics in real-time.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'Payment successful',
    message: 'Your subscription has been renewed for another month.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Storage almost full',
    message: "You've used 90% of your storage quota. Consider upgrading your plan.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    actionLabel: 'Upgrade',
    onAction: () => void 0, // Demo: would trigger upgrade flow
  },
  {
    id: '4',
    type: 'error',
    title: 'Deployment failed',
    message: 'Your latest deployment encountered an error. Check the logs for details.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
  },
  {
    id: '5',
    type: 'mention',
    title: 'Sarah mentioned you',
    message: 'Sarah mentioned you in a comment on the Q3 Report document.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    avatar: 'https://github.com/shadcn.png',
  },
];

function NotificationCenterDemo() {
  const [notifications, setNotifications] = useState<Notification[]>(createNotifications());

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationCenter
      notifications={notifications}
      onMarkAsRead={handleMarkAsRead}
      onMarkAllAsRead={handleMarkAllAsRead}
      onDelete={handleDelete}
      onClearAll={handleClearAll}
    />
  );
}

export default function NotificationCenterPage() {
  const [_basicNotifications, _setBasicNotifications] = useState<Notification[]>(
    createNotifications().slice(0, 3)
  );

  return (
    <ComponentShowcaseTemplate
      code="[UI.40]"
      category="Components"
      title="Notification Center"
      description="A comprehensive notification center dropdown with grouped notifications, read/unread states, and action buttons."
      importCode={`import { NotificationCenter, Notification } from "@/components/ui/notification-center"`}
      mainPreview={{
        preview: (
          <div className="flex justify-center">
            <NotificationCenterDemo />
          </div>
        ),
        code: `const [notifications, setNotifications] = useState<Notification[]>([
  {
    id: "1",
    type: "info",
    title: "New feature available",
    message: "Check out the new dashboard analytics.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
]);

<NotificationCenter
  notifications={notifications}
  onMarkAsRead={(id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }}
  onMarkAllAsRead={() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }}
  onDelete={(id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }}
  onClearAll={() => setNotifications([])}
/>`,
      }}
      variants={[
        {
          title: 'Notification Types',
          description: 'Different notification types with appropriate icons',
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="text-muted-foreground font-mono text-xs">[NOTIFICATION TYPES]</div>
              <div className="space-y-2">
                {[
                  {
                    type: 'info' as const,
                    label: 'INFO',
                    color: 'text-primary',
                  },
                  {
                    type: 'success' as const,
                    label: 'SUCCESS',
                    color: 'text-success',
                  },
                  {
                    type: 'warning' as const,
                    label: 'WARNING',
                    color: 'text-accent',
                  },
                  {
                    type: 'error' as const,
                    label: 'ERROR',
                    color: 'text-destructive',
                  },
                  {
                    type: 'mention' as const,
                    label: 'MENTION',
                    color: 'text-primary',
                  },
                ].map(({ type, label, color }) => (
                  <div key={type} className="flex items-center gap-2 font-mono text-sm">
                    <span className={color}>&gt;</span>
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          ),
          code: `type NotificationType = "info" | "success" | "warning" | "error" | "mention";

const notification: Notification = {
  id: "1",
  type: "success", // Sets icon and color
  title: "Payment successful",
  message: "Your subscription has been renewed.",
  timestamp: new Date(),
  read: false,
};`,
        },
        {
          title: 'With Action Buttons',
          description: 'Notifications can include actionable buttons',
          preview: (
            <div className="w-full max-w-md space-y-2">
              <div className="text-muted-foreground font-mono text-xs">[ACTION EXAMPLE]</div>
              <div className="space-y-2">
                <div className="text-xs font-semibold">Storage almost full</div>
                <p className="text-muted-foreground text-sm">
                  You've used 90% of your storage quota.
                </p>
                <button className={cn('border-border bg-background hover:bg-secondary mt-2 h-8 border px-4 text-xs font-medium transition-colors', mode.radius)}>
                  &gt; UPGRADE
                </button>
              </div>
            </div>
          ),
          code: `const notification: Notification = {
  id: "1",
  type: "warning",
  title: "Storage almost full",
  message: "You've used 90% of your storage quota.",
  timestamp: new Date(),
  read: false,
  actionLabel: "Upgrade",
  onAction: () => {
    // Handle upgrade click
    // Navigate to upgrade page or show modal
  },
};`,
        },
        {
          title: 'Grouped by Date',
          description: 'Automatically groups notifications by Today, Yesterday, This Week, Older',
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="text-muted-foreground font-mono text-xs">[DATE GROUPS]</div>
              {['Today', 'Yesterday', 'This Week', 'Older'].map((group) => (
                <div key={group} className="space-y-2">
                  <div className={cn('bg-muted px-4 py-2', mode.radius)}>
                    <span className="text-muted-foreground font-mono text-xs font-semibold tracking-wide uppercase">
                      {group}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ),
          code: `<NotificationCenter
  notifications={notifications}
  groupByDate={true} // Groups by date (default)
  onMarkAsRead={handleMarkAsRead}
/>`,
        },
        {
          title: 'Empty State',
          description: 'Friendly empty state when no notifications exist',
          preview: (
            <div className="flex flex-col items-center justify-center px-4 py-12">
              <div className={cn('bg-muted mb-4 flex h-16 w-16 items-center justify-center', mode.radius)}>
                <span className="text-muted-foreground font-mono text-2xl">0</span>
              </div>
              <p className="text-foreground mb-1 font-semibold">You're all caught up!</p>
              <p className="text-muted-foreground text-center text-sm">
                No new notifications at the moment
              </p>
            </div>
          ),
          code: `<NotificationCenter
  notifications={[]} // Empty array shows empty state
  onMarkAsRead={handleMarkAsRead}
/>`,
        },
        {
          title: 'Auto Mark as Read',
          description: 'Automatically mark notifications as read when clicked',
          preview: (
            <div className="w-full max-w-md space-y-2">
              <div className="text-muted-foreground font-mono text-xs">[AUTO READ ENABLED]</div>
              <p className="text-muted-foreground text-sm">
                Click any notification to automatically mark it as read
              </p>
            </div>
          ),
          code: `<NotificationCenter
  notifications={notifications}
  autoMarkAsRead={true} // Auto-marks as read on click
  onMarkAsRead={handleMarkAsRead}
/>`,
        },
        {
          title: 'Custom Max Height',
          description: 'Control the maximum height of the notification list',
          preview: (
            <div className="w-full max-w-md space-y-2">
              <div className="text-muted-foreground font-mono text-xs">[MAX HEIGHT]: 400px</div>
              <p className="text-muted-foreground text-sm">
                List scrolls when content exceeds max height
              </p>
            </div>
          ),
          code: `<NotificationCenter
  notifications={notifications}
  maxHeight={400} // Default: 600
  onMarkAsRead={handleMarkAsRead}
/>`,
        },
      ]}
      props={[
        {
          name: 'notifications',
          type: 'Notification[]',
          description: 'Array of notification objects to display',
        },
        {
          name: 'onMarkAsRead',
          type: '(id: string) => void',
          description: 'Callback when a notification is marked as read',
        },
        {
          name: 'onMarkAllAsRead',
          type: '() => void',
          description: 'Callback when all notifications are marked as read',
        },
        {
          name: 'onDelete',
          type: '(id: string) => void',
          description: 'Callback when a notification is deleted',
        },
        {
          name: 'onClearAll',
          type: '() => void',
          description: 'Callback when all notifications are cleared',
        },
        {
          name: 'maxHeight',
          type: 'number',
          default: '600',
          description: 'Maximum height of the notification list in pixels',
        },
        {
          name: 'groupByDate',
          type: 'boolean',
          default: 'true',
          description: 'Group notifications by date (Today, Yesterday, etc.)',
        },
        {
          name: 'autoMarkAsRead',
          type: 'boolean',
          default: 'false',
          description: 'Automatically mark notifications as read when clicked',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the trigger button',
        },
      ]}
      accessibility={[
        'Bell icon button has aria-label with unread count',
        'Dropdown uses proper DropdownMenu primitives with keyboard navigation',
        'Individual notifications are keyboard accessible with Enter/Space',
        'Mark as read and delete buttons visible on hover and focus',
        'Action buttons have proper aria-labels',
        'Unread notifications indicated visually with background color and dot',
        'Timestamps use relative formatting for better comprehension',
        'Empty state provides clear feedback when no notifications exist',
      ]}
      previous={{
        title: 'Notification Badge',
        href: '/docs/components/notification-badge',
      }}
      next={{
        title: 'Notification List',
        href: '/docs/components/notification-list',
      }}
    />
  );
}
