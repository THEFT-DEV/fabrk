import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Bell, Activity, Users, Zap } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Real-Time with Pusher - Fabrk Documentation',
  description: 'Learn how to implement real-time features using Pusher in your Fabrk application.',
};

export default function RealtimePage() {
  return (
    <FeatureGuideTemplate
      code="[0x50]"
      category="Features"
      title="Realtime With Pusher"
      description="Build real-time features like notifications, presence tracking, and activity feeds using Pusher Channels."
      overview="Fabrk integrates Pusher Channels to provide real-time communication between your server and clients. This enables instant updates for notifications, live activity feeds, and presence tracking to show who's online in your organization."
      features={[
        {
          icon: Bell,
          title: 'Notifications',
          description: 'Real-time bell icon updates with badge counts when events occur.',
        },
        {
          icon: Activity,
          title: 'Activity Feed',
          description: 'Live organization events and updates pushed instantly to all members.',
        },
        {
          icon: Users,
          title: 'Presence Tracking',
          description: 'Show online members in real-time with automatic join/leave detection.',
        },
        {
          icon: Zap,
          title: 'Instant Delivery',
          description: 'Sub-second message delivery with WebSocket connections.',
        },
      ]}
      setup={[
        {
          title: 'Configure Pusher Credentials',
          description: 'Add your Pusher credentials to your environment variables',
          code: `# .env.local
PUSHER_APP_ID=your_app_id
PUSHER_KEY=your_key
PUSHER_SECRET=your_secret
PUSHER_CLUSTER=your_cluster

# Client-side (exposed to browser)
NEXT_PUBLIC_PUSHER_KEY=your_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Server-Side Usage',
          description: 'Use the server client to trigger events from your API routes',
          code: `// src/lib/pusher/server.ts
import Pusher from "pusher";

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

// Trigger a notification
await pusherServer.trigger(
  \`user-\${userId}\`,
  "notification",
  {
    id: "notif-123",
    title: "New message",
    body: "You have a new message",
    createdAt: new Date().toISOString(),
  }
);

// Trigger activity feed event
await pusherServer.trigger(
  \`org-\${orgId}\`,
  "activity",
  {
    type: "member_joined",
    actor: { name: "John Doe", avatar: "/avatar.png" },
    timestamp: new Date().toISOString(),
  }
);`,
          language: 'typescript',
        },
        {
          title: 'Client-Side Usage',
          description: 'Subscribe to channels and listen for events in your React components',
          code: `// src/lib/pusher/client.ts
import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  }
);

// In your component
"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher/client";

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

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

  return (
    <button className="relative">
      <BellIcon />
      {unreadCount > 0 && (
        <span className={cn('absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs px-1', mode.radius)}>
          {unreadCount}
        </span>
      )}
    </button>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Presence Channels',
          description: 'Track which members are online in an organization',
          code: `// Client-side presence subscription
"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher/client";

export function OnlineMembers({ orgId }: { orgId: string }) {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe(\`presence-org-\${orgId}\`);

    channel.bind("pusher:subscription_succeeded", (data: any) => {
      setMembers(Object.values(data.members));
    });

    channel.bind("pusher:member_added", (member: any) => {
      setMembers((prev) => [...prev, member.info]);
    });

    channel.bind("pusher:member_removed", (member: any) => {
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    });

    return () => {
      pusherClient.unsubscribe(\`presence-org-\${orgId}\`);
    };
  }, [orgId]);

  return (
    <div className="flex -space-x-2">
      {members.map((member) => (
        <img
          key={member.id}
          src={member.avatar}
          alt={member.name}
          className={cn('w-8 h-8 border-2 border-background', mode.radius)}
        />
      ))}
    </div>
  );
}`,
          language: 'tsx',
        },
      ]}
      previous={{
        title: 'Notifications',
        href: '/docs/features/notifications',
      }}
      next={{
        title: 'Background Jobs',
        href: '/docs/features/background-jobs',
      }}
    >
      {/* Prerequisites */}
      <DocsSection title="Prerequisites">
        <DocsCard title="BEFORE YOU START">
          <ul className="space-y-2">
            <li className="font-mono text-xs">├─ Completed Getting Started guide</li>
            <li className="font-mono text-xs">├─ Database configured and running</li>
            <li className="font-mono text-xs">├─ Environment variables set up (.env.local)</li>
            <li className="font-mono text-xs">└─ Pusher account or WebSocket server</li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <ul className="space-y-1">
            <li>
              ├─ Use private channels (<code className="bg-muted px-1">private-</code>) for
              user-specific data
            </li>
            <li>
              ├─ Use presence channels (<code className="bg-muted px-1">presence-</code>) for
              tracking online status
            </li>
            <li>├─ Always unsubscribe from channels when components unmount</li>
            <li>├─ Handle connection errors gracefully with retry logic</li>
            <li>└─ Batch events when possible to reduce message count</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
