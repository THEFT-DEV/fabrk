/**
 * Notification Hooks
 * React hooks for working with notifications
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getNotifications,
  getUnreadCount,
  subscribeToNotifications,
  subscribeToToasts,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  notify,
  toast,
  type Notification,
  type ToastNotification,
} from './notification-manager';

/**
 * Hook to access notifications
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(getNotifications());
  const [unreadCount, setUnreadCount] = useState(getUnreadCount());

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((updated) => {
      setNotifications(updated);
      setUnreadCount(getUnreadCount());
    });

    return unsubscribe;
  }, []);

  const handleMarkAsRead = useCallback((id: string) => {
    markAsRead(id);
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    markAllAsRead();
  }, []);

  const handleDelete = useCallback((id: string) => {
    deleteNotification(id);
  }, []);

  const handleClearAll = useCallback(() => {
    clearAllNotifications();
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    deleteNotification: handleDelete,
    clearAll: handleClearAll,
  };
}

/**
 * Hook to show toasts
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts((newToast) => {
      setToasts((prev) => [...prev, newToast]);

      // Auto-remove toast after duration
      const duration = newToast.duration || 5000;
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, duration);
    });

    return unsubscribe;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    removeToast,
    showToast: toast,
  };
}

/**
 * Hook to send notifications
 */
export function useNotify() {
  return notify;
}
