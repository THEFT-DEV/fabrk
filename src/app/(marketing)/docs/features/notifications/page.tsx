import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Bell, Database, Zap, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Notifications System - Fabrk Documentation',
  description:
    'Learn how to implement real-time notifications with persistence, bell icon, and read/unread states.',
};

export default function NotificationsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x40]"
      category="Features"
      title="Notifications System"
      description="Real-time notifications with database persistence, bell icon badge, and read/unread state management."
      overview="The notifications system combines real-time delivery via Pusher with database persistence for a complete notification experience. Users receive instant notifications with a visual bell icon indicator and can manage their notification history."
      features={[
        {
          icon: Zap,
          title: 'Real-time Delivery',
          description: 'Instant push notifications via Pusher - users see updates immediately.',
        },
        {
          icon: Database,
          title: 'Persistence',
          description: 'All notifications stored in database for history and retrieval.',
        },
        {
          icon: Bell,
          title: 'Bell Icon Badge',
          description: 'Visual unread count indicator that updates in real-time.',
        },
        {
          icon: CheckCircle,
          title: 'Read/Unread States',
          description: 'Mark individual or all notifications as read with one click.',
        },
      ]}
      usage={[
        {
          title: 'Database Schema',
          description: 'Notification model in Prisma schema',
          code: `// prisma/schema.prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  type      String   // "info", "success", "warning", "error"
  title     String
  body      String?
  link      String?  // Optional action link

  read      Boolean  @default(false)
  readAt    DateTime?

  createdAt DateTime @default(now())

  @@index([userId, read])
  @@index([userId, createdAt])
}`,
          language: 'prisma',
        },
        {
          title: 'Creating Notifications',
          description: 'Send notifications from anywhere in your application',
          code: `// src/lib/notifications.ts
import { prisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher/server";

interface CreateNotificationInput {
  userId: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  body?: string;
  link?: string;
}

export async function createNotification(input: CreateNotificationInput) {
  // Save to database
  const notification = await prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      body: input.body,
      link: input.link,
    },
  });

  // Send real-time push
  await pusherServer.trigger(
    \`user-\${input.userId}\`,
    "notification",
    {
      id: notification.id,
      type: notification.type,
      title: notification.title,
      body: notification.body,
      link: notification.link,
      createdAt: notification.createdAt.toISOString(),
    }
  );

  return notification;
}

// Usage examples
await createNotification({
  userId: user.id,
  type: "success",
  title: "Payment successful",
  body: "Your subscription has been activated",
  link: "/dashboard/billing",
});

await createNotification({
  userId: user.id,
  type: "info",
  title: "New team member",
  body: "John Doe joined your organization",
});`,
          language: 'typescript',
        },
        {
          title: 'Bell Icon Component',
          description: 'The notification bell with real-time updates and dropdown',
          code: `"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { pusherClient } from "@/lib/pusher/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  type: string;
  title: string;
  body?: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch existing notifications on mount
  useEffect(() => {
    fetch("/api/v1/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      });
  }, []);

  // Subscribe to real-time notifications
  useEffect(() => {
    const channel = pusherClient.subscribe(\`user-\${userId}\`);

    channel.bind("notification", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(\`user-\${userId}\`);
    };
  }, [userId]);

  const markAsRead = async (id: string) => {
    await fetch(\`/api/v1/notifications/\${id}/read\`, { method: "POST" });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-none hover:bg-muted">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-none h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      {/* Dropdown content... */}
    </DropdownMenu>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'API Routes',
          description: 'Notification management endpoints',
          code: `// GET /api/v1/notifications
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const unreadCount = await prisma.notification.count({
    where: { userId: session.user.id, read: false },
  });

  return Response.json({ notifications, unreadCount });
}

// POST /api/v1/notifications/:id/read
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.notification.update({
    where: { id: params.id, userId: session.user.id },
    data: { read: true, readAt: new Date() },
  });

  return Response.json({ success: true });
}

// POST /api/v1/notifications/read-all
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.notification.updateMany({
    where: { userId: session.user.id, read: false },
    data: { read: true, readAt: new Date() },
  });

  return Response.json({ success: true });
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Trial', href: '/docs/features/trial' }}
      next={{ title: 'Realtime', href: '/docs/features/realtime' }}
    >
      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <ul className="space-y-1">
            <li>
              ├─ <strong>Be selective:</strong> Only notify for important, actionable events
            </li>
            <li>
              ├─ <strong>Clear titles:</strong> Make notifications scannable at a glance
            </li>
            <li>
              ├─ <strong>Include links:</strong> Let users take action directly from the
              notification
            </li>
            <li>
              ├─ <strong>Cleanup old notifications:</strong> Archive or delete notifications older
              than 30 days
            </li>
            <li>
              ├─ <strong>Allow preferences:</strong> Let users control which notifications they
              receive
            </li>
            <li>
              └─ <strong>Test thoroughly:</strong> Ensure real-time and persistence work together
            </li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
