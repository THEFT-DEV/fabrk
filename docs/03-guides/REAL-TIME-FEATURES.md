# Real-Time Features Documentation

This document covers the real-time notifications and presence system implemented with Pusher.

## Overview

The Fabrk boilerplate includes production-ready real-time features:

1. **Real-time Notifications** - Bell icon dropdown with live updates
2. **Organization Activity Feed** - Live feed of team actions
3. **Presence Channels** - Track who's online in organizations
4. **Pusher Integration** - WebSocket-based real-time communication

## Setup Instructions

### 1. Get Pusher Credentials

1. Sign up for a free account at [pusher.com](https://pusher.com)
2. Create a new Channels app
3. Copy your credentials from the "App Keys" tab

### 2. Configure Environment Variables

Add these to your `.env.local`:

```env
# Pusher Configuration
PUSHER_APP_ID=your_app_id
PUSHER_SECRET=your_secret_key
NEXT_PUBLIC_PUSHER_KEY=your_public_key
NEXT_PUBLIC_PUSHER_CLUSTER=us2  # or your cluster (e.g., eu, ap3)
```

**IMPORTANT:**
- `NEXT_PUBLIC_*` variables are exposed to the client
- `PUSHER_SECRET` must remain server-side only
- Without these variables, real-time features gracefully degrade (no errors)

### 3. Test the Setup

1. Start your development server: `npm run dev`
2. Open two browser windows logged in as different users
3. Perform an action (invite member, change role)
4. Watch for real-time notifications in the bell icon

## Architecture

### Server-Side (`/src/lib/pusher/server.ts`)

```typescript
import { getPusherServer, triggerNotification } from "@/lib/pusher/server";

// Trigger a notification
await triggerNotification(userId, {
  id: "notif-123",
  type: "ORG_INVITE",
  title: "New Invitation",
  message: "You've been invited to join Team",
  createdAt: new Date(),
});
```

**Available Functions:**
- `getPusherServer()` - Get Pusher server instance
- `isPusherConfigured()` - Check if Pusher is configured
- `triggerNotification(userId, notification)` - Send notification to user
- `triggerOrgActivity(orgId, activity)` - Send activity to organization
- `authorizeChannel(socketId, channel, userId, userInfo)` - Authorize private/presence channels

### Client-Side (`/src/lib/pusher/client.ts`)

```typescript
import { useNotifications, useOrgActivity, usePresence } from "@/lib/pusher/client";

// Subscribe to user notifications
useNotifications((notification) => {
  console.log("New notification:", notification);
});

// Subscribe to organization activity
useOrgActivity(organizationId, (activity) => {
  console.log("New activity:", activity);
});

// Track online presence
const { members, count } = usePresence(organizationId);
```

**Available Hooks:**
- `useNotifications(callback)` - Subscribe to user notifications
- `useOrgActivity(orgId, callback)` - Subscribe to org activity
- `usePresence(orgId)` - Track online members
- `usePusherStatus()` - Get connection status

## Database Schema

```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String
  type      NotificationType
  title     String
  message   String   @db.Text
  read      Boolean  @default(false)
  link      String?
  metadata  Json?
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum NotificationType {
  ORG_INVITE
  ORG_MEMBER_ADDED
  ORG_MEMBER_REMOVED
  ORG_ROLE_CHANGED
  PAYMENT_SUCCESS
  PAYMENT_FAILED
  SECURITY_ALERT
  SYSTEM
}
```

## API Routes

### POST `/api/pusher/auth`
Authorizes private and presence channel subscriptions.

**Request:**
```
socket_id=socket-id-here
channel_name=private-user-123
```

**Response:**
```json
{
  "auth": "pusher-signature",
  "channel_data": "{\"user_id\":\"123\"}"
}
```

### GET `/api/notifications`
List user notifications.

**Query Params:**
- `limit` (default: 50) - Number of notifications to return
- `unread` (true/false) - Filter unread only

**Response:**
```json
[
  {
    "id": "notif-123",
    "userId": "user-456",
    "type": "ORG_INVITE",
    "title": "New Invitation",
    "message": "You've been invited to join Team",
    "read": false,
    "link": "/organizations/invites/token",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

### POST `/api/notifications/mark-read`
Mark notifications as read.

**Request:**
```json
{
  "notificationId": "notif-123"  // or "all": true
}
```

**Response:**
```json
{
  "success": true,
  "marked": "notif-123"
}
```

### GET `/api/notifications/unread-count`
Get count of unread notifications.

**Response:**
```json
{
  "count": 5
}
```

## Components

### NotificationCenter

Bell icon dropdown with real-time notifications.

```tsx
import { NotificationCenter } from "@/components/notifications/notification-center";

<NotificationCenter />
```

**Features:**
- Real-time notification updates via Pusher
- Unread count badge
- Mark as read (single or all)
- Link to related resources
- Mobile responsive
- Emoji icons per notification type

### ActivityFeed

Real-time activity feed for organizations.

```tsx
import { ActivityFeed } from "@/components/activity/activity-feed";

<ActivityFeed
  organizationId={orgId}
  limit={10}
  showHeader={true}
/>
```

**Features:**
- Live updates via Pusher
- User avatars and icons
- Relative timestamps
- Scrollable list
- Empty state handling

## Helper Functions

### Creating Notifications

Use the helper functions in `/src/lib/notifications.ts`:

```typescript
import {
  createNotification,
  notifyOrgInvite,
  notifyOrgMemberAdded,
  notifyRoleChanged,
  notifyPaymentSuccess,
  notifyPaymentFailed,
  notifySecurityAlert,
} from "@/lib/notifications";

// Generic notification
await createNotification({
  userId: "user-123",
  type: "SYSTEM",
  title: "System Update",
  message: "New features are now available",
  link: "/features",
});

// Organization invite
await notifyOrgInvite(
  userId,
  "Acme Corp",
  "John Doe",
  "invite-token-123"
);

// Payment success
await notifyPaymentSuccess(userId, 9900, "Pro Plan");

// Security alert
await notifySecurityAlert(
  userId,
  "new_login",
  "New login detected from San Francisco, CA"
);
```

### Creating Activity Events

```typescript
import { createOrgActivity } from "@/lib/notifications";

await createOrgActivity(organizationId, {
  type: "member_invited",
  description: "invited john@example.com to join",
  userId: inviterId,
  userName: "Jane Doe",
});
```

## Channel Naming Conventions

### Private User Channels
Format: `private-user-{userId}`

**Purpose:** Personal notifications
**Authorization:** User can only subscribe to their own channel

### Private Organization Channels
Format: `private-org-{organizationId}`

**Purpose:** Organization activity feed
**Authorization:** User must be a member of the organization

### Presence Organization Channels
Format: `presence-org-{organizationId}`

**Purpose:** Track who's online in an organization
**Authorization:** User must be a member of the organization
**Data:** User ID, name, email

## Security

### Channel Authorization

All private and presence channels require authorization:

1. Client requests subscription to channel
2. Pusher sends auth request to `/api/pusher/auth`
3. Server validates:
   - User is authenticated
   - User has permission to access channel
   - Channel name matches expected pattern
4. Server returns signed authorization token
5. Client completes subscription

### Best Practices

1. **Never expose `PUSHER_SECRET`** - Keep it server-side only
2. **Validate channel access** - Check membership before authorizing
3. **Sanitize user data** - Don't expose sensitive info in presence data
4. **Rate limit** - Consider rate limiting notification triggers
5. **Graceful degradation** - App works without Pusher configured

## Testing

### Local Testing

1. Install Pusher CLI: `brew install pusher/tap/pusher`
2. Configure debug mode:
   ```typescript
   const pusher = new PusherClient(key, {
     cluster,
     enabledTransports: ['ws', 'wss'],
     wsHost: 'localhost',
     wsPort: 6001,
     forceTLS: false,
   });
   ```
3. Run local Pusher server: `pusher serve`

### Production Testing

1. Use Pusher Debug Console: [dashboard.pusher.com](https://dashboard.pusher.com)
2. Monitor real-time events
3. Test channel subscriptions
4. Verify authorization flow

## Troubleshooting

### Notifications Not Appearing

**Symptoms:** Bell icon shows no notifications

**Checks:**
1. Verify Pusher credentials in `.env.local`
2. Check browser console for Pusher connection errors
3. Ensure `/api/pusher/auth` returns 200
4. Check Pusher Debug Console for connection events

### Authorization Failed

**Symptoms:** `Pusher : Subscription failed to channel private-*`

**Checks:**
1. User is authenticated (session exists)
2. User has permission to access channel
3. `PUSHER_SECRET` is set correctly
4. Channel name follows expected format

### No Real-Time Updates

**Symptoms:** Notifications appear on refresh but not real-time

**Checks:**
1. Pusher connection is established (`usePusherStatus()`)
2. Server is triggering events (`await triggerNotification(...)`)
3. Client is subscribed to correct channel
4. Firewall/proxy isn't blocking WebSockets

## Production Considerations

### Pusher Plan Limits

Free plan includes:
- 100 max connections
- 200,000 messages/day
- Unlimited channels

For production:
- **Startup Plan** ($49/mo): 500 connections, 2M messages/day
- **Professional Plan** ($299/mo): 2,000 connections, 10M messages/day
- **Enterprise Plan**: Custom pricing

### Performance Optimization

1. **Batch notifications** - Group multiple notifications into one trigger
2. **Use presence channels wisely** - Can be expensive at scale
3. **Debounce activity events** - Don't trigger on every micro-action
4. **Paginate notification lists** - Don't load all notifications at once
5. **Clean up old notifications** - Delete read notifications after 30 days

### Monitoring

1. **Pusher Dashboard** - Track connections, message volume, errors
2. **Custom metrics** - Log notification creation/delivery rates
3. **Error tracking** - Monitor failed triggers with Sentry
4. **Performance** - Track time from trigger to client receipt

## Advanced Usage

### Custom Notification Types

Add new types to `NotificationType` enum in Prisma schema:

```prisma
enum NotificationType {
  // ... existing types
  TEAM_MENTION
  TASK_ASSIGNED
  DEADLINE_APPROACHING
}
```

Then add helper function:

```typescript
export async function notifyTaskAssigned(
  userId: string,
  taskName: string,
  projectName: string
) {
  return createNotification({
    userId,
    type: "TASK_ASSIGNED",
    title: "New Task Assigned",
    message: `You've been assigned "${taskName}" in ${projectName}`,
    link: `/tasks/${taskId}`,
  });
}
```

### Presence Data

Customize presence data in `/api/pusher/auth`:

```typescript
pusher.authorizeChannel(socketId, channel, {
  user_id: userId,
  user_info: {
    name: user.name,
    email: user.email,
    avatar: user.image,
    role: user.role,  // Add custom fields
    status: "online",
  },
});
```

### Custom Activity Types

Add new activity types for your use case:

```typescript
await createOrgActivity(organizationId, {
  type: "project_created",
  description: "created a new project 'Website Redesign'",
  userId: userId,
  userName: userName,
});
```

## Migration Guide

### Upgrading from No Real-Time

If you have an existing Fabrk installation without real-time features:

1. Install Pusher packages:
   ```bash
   npm install pusher pusher-js
   ```

2. Run database migration:
   ```bash
   npm run db:push
   ```

3. Add environment variables to `.env.local`

4. Update your API routes to trigger notifications (see example in `/api/organizations/invite/route.ts`)

5. No breaking changes - app works without Pusher configured

## Resources

- [Pusher Documentation](https://pusher.com/docs/channels)
- [Pusher Channel Authorization](https://pusher.com/docs/channels/server_api/authorizing-users)
- [Pusher Presence Channels](https://pusher.com/docs/channels/using_channels/presence-channels)
- [Next.js + Pusher Guide](https://pusher.com/tutorials/nextjs-pusher)
