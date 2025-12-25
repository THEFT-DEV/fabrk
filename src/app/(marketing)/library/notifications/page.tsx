/**
 * Notifications Center Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { Bell, Check, AlertTriangle, Trash2 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Bell, Check, AlertTriangle, Trash2 } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "info" | "warning" | "error" | "success";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Deployment Complete",
      message: "Your application was successfully deployed to production.",
      timestamp: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Storage Warning",
      message: "You're using 85% of your storage quota. Consider upgrading.",
      timestamp: "15 minutes ago",
      read: false,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <Card>
        <div className="border-border flex items-center justify-between border-b px-4 py-2">
          <CardHeader code="0x00" title="NOTIFICATIONS" className="border-0 p-0" />
          <div className="flex items-center gap-2">
            <Bell className="text-muted-foreground h-3 w-3" />
            {unreadCount > 0 && (
              <Badge
                className={cn(
                  mode.radius,
                  mode.font,
                  "bg-primary text-primary-foreground h-5 px-1.5 text-xs"
                )}
              >
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.type === "warning" ? AlertTriangle : Check;
            const colorClass =
              notification.type === "warning" ? "text-warning" : "text-success";

            return (
              <div
                key={notification.id}
                className={cn(
                  mode.radius,
                  "border-border bg-card relative flex items-start gap-4 border p-4",
                  !notification.read && "bg-primary/5"
                )}
              >
                {/* Icon */}
                <div
                  className={\`border-border bg-background flex size-8 items-center justify-center border \${colorClass}\`}
                >
                  <Icon className={\`h-4 w-4 \${colorClass}\`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={cn(
                        mode.radius,
                        mode.font,
                        "border-border px-2 py-0.5 text-xs uppercase"
                      )}
                    >
                      {notification.type}
                    </Badge>
                    <span className={cn(mode.font, "text-muted-foreground text-xs")}>
                      {notification.timestamp}
                    </span>
                  </div>
                  <h4 className={cn(mode.font, "text-foreground mt-2 text-sm font-semibold")}>
                    {notification.title}
                  </h4>
                  <p className={cn(mode.font, "text-muted-foreground mt-1 text-xs")}>
                    {notification.message}
                  </p>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    {!notification.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(mode.radius, mode.font, "text-xs")}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="mr-2 size-3" /> Mark as Read
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      className={cn(mode.radius, mode.font, "text-xs")}
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="mr-2 size-3" /> Delete
                    </Button>
                  </div>
                </div>

                {/* Read indicator */}
                {!notification.read && (
                  <span className={cn(mode.radius, "bg-primary absolute top-2 right-2 size-2")} />
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}`;

function NotificationsPreview() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'success' as const,
      title: 'Deployment Complete',
      message: 'Your application was successfully deployed to production.',
      timestamp: '2 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Storage Warning',
      message: "You're using 85% of your storage quota. Consider upgrading.",
      timestamp: '15 minutes ago',
      read: false,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="mx-auto max-w-3xl">
        <Card>
          <div className="border-border flex items-center justify-between border-b px-4 py-2">
            <CardHeader code="0x00" title="NOTIFICATIONS" className="border-0 p-0" />
            <div className="flex items-center gap-2">
              <Bell className="text-muted-foreground h-3 w-3" />
              {unreadCount > 0 && (
                <Badge
                  className={cn(
                    mode.radius,
                    mode.font,
                    'bg-primary text-primary-foreground h-5 px-1.5 text-xs'
                  )}
                >
                  {unreadCount}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-4 p-4">
            {notifications.map((notification) => {
              const Icon = notification.type === 'warning' ? AlertTriangle : Check;
              const colorClass = notification.type === 'warning' ? 'text-warning' : 'text-success';

              return (
                <div
                  key={notification.id}
                  className={cn(
                    mode.radius,
                    'border-border bg-card relative flex items-start gap-4 border p-4',
                    !notification.read && 'bg-primary/5'
                  )}
                >
                  {/* Icon */}
                  <div
                    className={`border-border bg-background flex size-8 items-center justify-center border ${colorClass}`}
                  >
                    <Icon className={`h-4 w-4 ${colorClass}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={cn(
                          mode.radius,
                          mode.font,
                          'border-border px-2 py-0.5 text-xs uppercase'
                        )}
                      >
                        {notification.type}
                      </Badge>
                      <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                        {notification.timestamp}
                      </span>
                    </div>
                    <h4 className={cn(mode.font, 'text-foreground mt-2 text-sm font-semibold')}>
                      {notification.title}
                    </h4>
                    <p className={cn(mode.font, 'text-muted-foreground mt-1 text-xs')}>
                      {notification.message}
                    </p>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      {!notification.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(mode.radius, mode.font, 'text-xs')}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="mr-2 size-3" /> Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        className={cn(mode.radius, mode.font, 'text-xs')}
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="mr-2 size-3" /> Delete
                      </Button>
                    </div>
                  </div>

                  {/* Read indicator */}
                  {!notification.read && (
                    <span className={cn(mode.radius, 'bg-primary absolute top-2 right-2 size-2')} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function NotificationsTemplate() {
  return (
    <TemplateShowcasePage
      badge="NOTIFICATIONS"
      title="Notifications Center"
      description="Real-time notification system with read/unread states and actions"
      templateId="notifications"
      category={{ name: 'User Experience', href: '/library/user-experience' }}
      preview={<NotificationsPreview />}
      code={templateCode}
      fileStructure="app/(dashboard)/notifications/page.tsx"
      features={[
        'Real-time notification display',
        'Read/unread state management',
        'Type-based color coding (info, success, warning, error)',
        'Mark as read functionality',
        'Delete notifications',
        'Unread count badge',
      ]}
    />
  );
}
