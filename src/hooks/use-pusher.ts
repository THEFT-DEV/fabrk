'use client';

/**
 * Pusher Client-Side Hooks
 *
 * React hooks for subscribing to real-time channels and handling events.
 *
 * @example
 * // Subscribe to notifications
 * const { notifications, isConnected } = usePusherNotifications(userId);
 *
 * // Subscribe to presence channel
 * const { members, isSubscribed } = usePusherPresence('room-123');
 *
 * // Generic channel subscription
 * usePusherChannel('org-456', 'member-joined', (data) => {
 *   console.log('New member:', data);
 * });
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import Pusher, { Channel, PresenceChannel, Members } from 'pusher-js';

// =============================================================================
// PUSHER CLIENT SINGLETON
// =============================================================================

let pusherClient: Pusher | null = null;

/**
 * Get or create the Pusher client instance
 */
function getPusherClient(): Pusher | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!key || !cluster) {
    return null;
  }

  if (!pusherClient) {
    pusherClient = new Pusher(key, {
      cluster,
      authEndpoint: '/api/pusher/auth',
    });
  }

  return pusherClient;
}

// =============================================================================
// TYPES
// =============================================================================

export interface PusherNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'payment' | 'activity';
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
  actionUrl?: string;
}

export interface PresenceMember {
  id: string;
  info: {
    name?: string;
    email?: string;
    [key: string]: unknown;
  };
}

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Check if Pusher is available
 */
export function usePusherStatus() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const client = getPusherClient();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Syncing with external Pusher client availability
    setIsAvailable(!!client);

    if (client) {
      const handleConnected = () => setIsConnected(true);
      const handleDisconnected = () => setIsConnected(false);

      client.connection.bind('connected', handleConnected);
      client.connection.bind('disconnected', handleDisconnected);

      // Check initial state
      setIsConnected(client.connection.state === 'connected');

      return () => {
        client.connection.unbind('connected', handleConnected);
        client.connection.unbind('disconnected', handleDisconnected);
      };
    }
  }, []);

  return { isAvailable, isConnected };
}

/**
 * Subscribe to a Pusher channel and bind to events
 */
export function usePusherChannel<T = unknown>(
  channelName: string | null,
  eventName: string,
  callback: (data: T) => void
) {
  const [channel, setChannel] = useState<Channel | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!channelName) return;

    const client = getPusherClient();
    if (!client) return;

    // Subscribe to channel
    const subscribedChannel = client.subscribe(channelName);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Setting state after subscription is the correct pattern for external system sync
    setChannel(subscribedChannel);

    // Bind to event
    const handler = (data: T) => {
      callbackRef.current(data);
    };

    subscribedChannel.bind(eventName, handler);

    return () => {
      subscribedChannel.unbind(eventName, handler);
      client.unsubscribe(channelName);
      setChannel(null);
    };
  }, [channelName, eventName]);

  return channel;
}

/**
 * Subscribe to user notifications
 */
export function usePusherNotifications(userId: string | null) {
  const [notifications, setNotifications] = useState<PusherNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleNotification = useCallback((notification: PusherNotification) => {
    setNotifications((prev) => [notification, ...prev].slice(0, 50)); // Keep last 50
    if (!notification.read) {
      setUnreadCount((prev) => prev + 1);
    }
  }, []);

  const handleNotificationRead = useCallback((data: { id: string }) => {
    setNotifications((prev) => prev.map((n) => (n.id === data.id ? { ...n, read: true } : n)));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const channelName = userId ? `private-user-${userId}` : null;

  usePusherChannel(channelName, 'notification', handleNotification);
  usePusherChannel(channelName, 'notification-read', handleNotificationRead);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
}

/**
 * Subscribe to a presence channel for tracking online users
 */
export function usePusherPresence(channelName: string | null) {
  const [members, setMembers] = useState<Map<string, PresenceMember>>(new Map());
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [myId, setMyId] = useState<string | null>(null);
  const channelRef = useRef<PresenceChannel | null>(null);

  useEffect(() => {
    if (!channelName) return;

    const client = getPusherClient();
    if (!client) return;

    const presenceChannelName = channelName.startsWith('presence-')
      ? channelName
      : `presence-${channelName}`;

    const channel = client.subscribe(presenceChannelName) as PresenceChannel;
    channelRef.current = channel;

    channel.bind('pusher:subscription_succeeded', (memberList: Members) => {
      const newMembers = new Map<string, PresenceMember>();
      memberList.each((member: { id: string; info: Record<string, unknown> }) => {
        newMembers.set(member.id, { id: member.id, info: member.info });
      });
      setMembers(newMembers);
      setMyId(memberList.myID);
      setIsSubscribed(true);
    });

    channel.bind('pusher:member_added', (member: { id: string; info: Record<string, unknown> }) => {
      setMembers((prev) => {
        const next = new Map(prev);
        next.set(member.id, { id: member.id, info: member.info });
        return next;
      });
    });

    channel.bind('pusher:member_removed', (member: { id: string }) => {
      setMembers((prev) => {
        const next = new Map(prev);
        next.delete(member.id);
        return next;
      });
    });

    return () => {
      client.unsubscribe(presenceChannelName);
      setIsSubscribed(false);
      setMembers(new Map());
    };
  }, [channelName]);

  return {
    members: Array.from(members.values()),
    memberCount: members.size,
    isSubscribed,
    myId,
  };
}

/**
 * Get the raw Pusher client (for advanced usage)
 */
export function usePusherClient() {
  // Use lazy initialization to avoid calling getPusherClient during SSR
  const [client] = useState<Pusher | null>(() => {
    if (typeof window === 'undefined') return null;
    return getPusherClient();
  });

  return client;
}
