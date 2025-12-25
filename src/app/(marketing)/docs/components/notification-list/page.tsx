'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { NotificationList, Notification } from '@/components/ui/notification-list';
import { useState } from 'react';

const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'New comment on your post',
    description: "Sarah commented: 'Great work on the latest update!'",
    time: '2 minutes ago',
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Payment received',
    description: 'You received $299.00 from Acme Corp.',
    time: '1 hour ago',
    read: false,
    type: 'success',
  },
  {
    id: '3',
    title: 'Storage limit warning',
    description: "You've used 85% of your storage quota.",
    time: '3 hours ago',
    read: true,
    type: 'warning',
  },
  {
    id: '4',
    title: 'Failed to sync',
    description: 'Could not sync your files. Please try again.',
    time: 'Yesterday',
    read: true,
    type: 'error',
  },
];

export default function NotificationListPage() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <ComponentShowcaseTemplate
      code="[UI.41]"
      category="Components"
      title="Notification List"
      description="A scrollable list of notifications with read/unread states, type indicators, and dismiss functionality."
      importCode={`import { NotificationList, Notification } from "@/components/ui/notification-list"`}
      mainPreview={{
        preview: (
          <div className="w-full max-w-md">
            <NotificationList
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onDismiss={handleDismiss}
            />
          </div>
        ),
        code: `const [notifications, setNotifications] = useState<Notification[]>([
  {
    id: "1",
    title: "New comment on your post",
    description: "Sarah commented: 'Great work!'",
    time: "2 minutes ago",
    read: false,
    type: "info",
  },
]);

<NotificationList
  notifications={notifications}
  onMarkAsRead={(id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }}
  onDismiss={(id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }}
/>`,
      }}
      variants={[
        {
          title: 'Notification Types',
          description: 'Different visual indicators for notification types',
          preview: (
            <div className="w-full max-w-md">
              <NotificationList
                notifications={[
                  {
                    id: '1',
                    title: 'Information',
                    description: 'This is an informational notification',
                    time: 'Just now',
                    type: 'info',
                  },
                  {
                    id: '2',
                    title: 'Success',
                    description: 'Operation completed successfully',
                    time: '1 min ago',
                    type: 'success',
                  },
                  {
                    id: '3',
                    title: 'Warning',
                    description: 'Please review this warning',
                    time: '5 min ago',
                    type: 'warning',
                  },
                  {
                    id: '4',
                    title: 'Error',
                    description: 'An error occurred',
                    time: '10 min ago',
                    type: 'error',
                  },
                ]}
              />
            </div>
          ),
          code: `<NotificationList
  notifications={[
    {
      id: "1",
      title: "Information",
      description: "This is an informational notification",
      time: "Just now",
      type: "info", // Shows info icon
    },
    {
      id: "2",
      title: "Success",
      description: "Operation completed successfully",
      time: "1 min ago",
      type: "success", // Shows checkmark
    },
    {
      id: "3",
      title: "Warning",
      description: "Please review this warning",
      time: "5 min ago",
      type: "warning", // Shows alert triangle
    },
    {
      id: "4",
      title: "Error",
      description: "An error occurred",
      time: "10 min ago",
      type: "error", // Shows X icon
    },
  ]}
/>`,
        },
        {
          title: 'Loading State',
          description: 'Skeleton placeholders while notifications load',
          preview: (
            <div className="w-full max-w-md">
              <NotificationList loading />
            </div>
          ),
          code: `<NotificationList loading />`,
        },
        {
          title: 'Error State',
          description: 'Error message when notifications fail to load',
          preview: (
            <div className="w-full max-w-md">
              <NotificationList error />
            </div>
          ),
          code: `<NotificationList error />`,
        },
        {
          title: 'Empty State',
          description: 'Message when no notifications exist',
          preview: (
            <div className="w-full max-w-md">
              <NotificationList notifications={[]} />
            </div>
          ),
          code: `<NotificationList notifications={[]} />`,
        },
        {
          title: 'Without Dismiss Button',
          description: 'Notifications without dismiss functionality',
          preview: (
            <div className="w-full max-w-md">
              <NotificationList
                notifications={sampleNotifications.slice(0, 2)}
                onMarkAsRead={(id) => console.log('Mark as read:', id)}
              />
            </div>
          ),
          code: `<NotificationList
  notifications={notifications}
  onMarkAsRead={handleMarkAsRead}
  // No onDismiss prop - dismiss buttons hidden
/>`,
        },
        {
          title: 'Read vs Unread',
          description: 'Visual distinction between read and unread notifications',
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div>
                <div className="text-muted-foreground mb-2 font-mono text-xs">[UNREAD]</div>
                <NotificationList
                  notifications={[
                    {
                      id: '1',
                      title: 'Unread notification',
                      description: 'This notification has not been read',
                      time: '5 min ago',
                      read: false,
                    },
                  ]}
                />
              </div>
              <div>
                <div className="text-muted-foreground mb-2 font-mono text-xs">[READ]</div>
                <NotificationList
                  notifications={[
                    {
                      id: '2',
                      title: 'Read notification',
                      description: 'This notification has been read',
                      time: '1 hour ago',
                      read: true,
                    },
                  ]}
                />
              </div>
            </div>
          ),
          code: `// Unread notification has accent background
{
  id: "1",
  title: "Unread notification",
  description: "This notification has not been read",
  time: "5 min ago",
  read: false, // Highlighted background
}

// Read notification has default background
{
  id: "2",
  title: "Read notification",
  description: "This notification has been read",
  time: "1 hour ago",
  read: true, // Default background
}`,
        },
        {
          title: 'Without Description',
          description: 'Notifications can omit the description field',
          preview: (
            <div className="w-full max-w-md">
              <NotificationList
                notifications={[
                  {
                    id: '1',
                    title: 'Simple notification',
                    time: 'Just now',
                  },
                  {
                    id: '2',
                    title: 'Another simple notification',
                    time: '2 min ago',
                    type: 'success',
                  },
                ]}
              />
            </div>
          ),
          code: `<NotificationList
  notifications={[
    {
      id: "1",
      title: "Simple notification",
      time: "Just now",
      // No description field
    },
  ]}
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
          description: 'Callback when a notification is clicked or marked as read',
        },
        {
          name: 'onDismiss',
          type: '(id: string) => void',
          description:
            'Callback when a notification is dismissed. If omitted, dismiss buttons are hidden',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: 'Show loading skeleton placeholders',
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Show error state message',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the container',
        },
      ]}
      accessibility={[
        'Each notification is a keyboard-accessible button with proper role',
        'Enter and Space keys trigger onMarkAsRead callback',
        'Notifications have descriptive aria-labels including read status',
        'Dismiss buttons have aria-labels for screen readers',
        'Unread notifications indicated with accent background for visibility',
        'Icons have appropriate text colors for type differentiation',
        'Hover states provide visual feedback for interactive elements',
        'Focus states use focus-within for keyboard navigation',
      ]}
      previous={{
        title: 'Notification Center',
        href: '/docs/components/notification-center',
      }}
      next={{ title: 'Toaster', href: '/docs/components/toaster' }}
    />
  );
}
