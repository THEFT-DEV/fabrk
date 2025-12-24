/**
 * Pusher Server-Side Client
 *
 * Server-side Pusher integration for real-time notifications,
 * presence channels, and event broadcasting.
 *
 * @example
 * // Trigger a notification event
 * await pusher.trigger('user-123', 'notification', {
 *   type: 'payment',
 *   message: 'Payment received',
 * });
 *
 * // Broadcast to a channel
 * await pusher.trigger('org-456', 'member-joined', {
 *   userId: 'user-789',
 *   name: 'John Doe',
 * });
 */

import * as PusherModule from 'pusher';
import { env } from './env';

// Handle both ESM and CJS module formats
const Pusher = (
  'default' in PusherModule ? PusherModule.default : PusherModule
) as typeof PusherModule.default;

type PusherInstance = InstanceType<typeof Pusher>;

// =============================================================================
// PUSHER CLIENT SINGLETON
// =============================================================================

let pusherInstance: PusherInstance | null = null;

/**
 * Get the Pusher server client instance
 * Returns null if Pusher is not configured
 */
export function getPusherServer(): PusherInstance | null {
  // Return null if Pusher is not configured
  if (!env.server.PUSHER_APP_ID || !env.server.PUSHER_SECRET) {
    return null;
  }

  // Create singleton instance
  if (!pusherInstance) {
    pusherInstance = new Pusher({
      appId: env.server.PUSHER_APP_ID,
      key: env.client.NEXT_PUBLIC_PUSHER_KEY!,
      secret: env.server.PUSHER_SECRET,
      cluster: env.client.NEXT_PUBLIC_PUSHER_CLUSTER!,
      useTLS: true,
    });
  }

  return pusherInstance;
}

// =============================================================================
// CHANNEL NAMING CONVENTIONS
// =============================================================================

/**
 * Generate channel names following consistent conventions
 */
export const channels = {
  /** Private user channel for personal notifications */
  user: (userId: string) => `private-user-${userId}`,

  /** Organization channel for team broadcasts */
  organization: (orgId: string) => `private-org-${orgId}`,

  /** Presence channel for tracking online users */
  presence: (roomId: string) => `presence-${roomId}`,

  /** Public channel (no authentication required) */
  public: (name: string) => name,
};

// =============================================================================
// EVENT TYPES
// =============================================================================

/**
 * Standardized event types for real-time updates
 */
export const PusherEvents = {
  // User notifications
  NOTIFICATION: 'notification',
  NOTIFICATION_READ: 'notification-read',

  // Activity feed
  ACTIVITY: 'activity',

  // Organization events
  MEMBER_JOINED: 'member-joined',
  MEMBER_LEFT: 'member-left',
  MEMBER_ROLE_CHANGED: 'member-role-changed',

  // Payment events
  PAYMENT_RECEIVED: 'payment-received',
  SUBSCRIPTION_UPDATED: 'subscription-updated',

  // Presence events (handled automatically by Pusher)
  SUBSCRIPTION_SUCCEEDED: 'pusher:subscription_succeeded',
  MEMBER_ADDED: 'pusher:member_added',
  MEMBER_REMOVED: 'pusher:member_removed',
} as const;

export type PusherEventType = (typeof PusherEvents)[keyof typeof PusherEvents];

// =============================================================================
// NOTIFICATION PAYLOAD TYPES
// =============================================================================

export interface NotificationPayload {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'payment' | 'activity';
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface ActivityPayload {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface MemberPayload {
  userId: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Send a notification to a specific user
 */
export async function sendUserNotification(
  userId: string,
  notification: Omit<NotificationPayload, 'id' | 'timestamp'>
): Promise<boolean> {
  const pusher = getPusherServer();
  if (!pusher) {
    console.warn('[Pusher] Not configured - notification not sent');
    return false;
  }

  const payload: NotificationPayload = {
    ...notification,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };

  try {
    await pusher.trigger(channels.user(userId), PusherEvents.NOTIFICATION, payload);
    return true;
  } catch (error) {
    console.error('[Pusher] Failed to send notification:', error);
    return false;
  }
}

/**
 * Broadcast an event to an organization channel
 */
export async function broadcastToOrganization(
  orgId: string,
  event: PusherEventType,
  data: Record<string, unknown>
): Promise<boolean> {
  const pusher = getPusherServer();
  if (!pusher) {
    console.warn('[Pusher] Not configured - broadcast not sent');
    return false;
  }

  try {
    await pusher.trigger(channels.organization(orgId), event, data);
    return true;
  } catch (error) {
    console.error('[Pusher] Failed to broadcast:', error);
    return false;
  }
}

/**
 * Check if Pusher is configured and available
 */
export function isPusherEnabled(): boolean {
  return !!(env.server.PUSHER_APP_ID && env.server.PUSHER_SECRET);
}

// =============================================================================
// CHANNEL AUTHORIZATION
// =============================================================================

/**
 * Authorize a user for a private channel
 * Use this in your /api/pusher/auth endpoint
 */
export function authorizeChannel(
  socketId: string,
  channelName: string,
  userId: string,
  userInfo?: { name?: string; email?: string }
): { auth: string; channel_data?: string } | null {
  const pusher = getPusherServer();
  if (!pusher) {
    return null;
  }

  // For presence channels, include user data
  if (channelName.startsWith('presence-')) {
    return pusher.authorizeChannel(socketId, channelName, {
      user_id: userId,
      user_info: userInfo || {},
    });
  }

  // For private channels, just authorize
  return pusher.authorizeChannel(socketId, channelName);
}

export { Pusher, PusherModule };
export default getPusherServer;
