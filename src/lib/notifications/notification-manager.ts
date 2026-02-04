/**
 * Notification Manager
 * Central notification system for in-app notifications
 *
 * Features:
 * - Toast notifications (temporary)
 * - Persistent notifications
 * - Notification center
 * - Type-safe notification types
 * - Read/unread tracking
 * - Priority levels
 */

export type NotificationType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'feature'
  | 'payment'
  | 'security'
  | 'system';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  read: boolean;
  persistent: boolean; // If true, show in notification center
  createdAt: Date;
  expiresAt?: Date;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, unknown>;
}

export interface ToastNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number; // In milliseconds
  actionUrl?: string;
  actionLabel?: string;
}

type NotificationListener = (notifications: Notification[]) => void;
type ToastListener = (toast: ToastNotification) => void;

// In-memory notification store
let notifications: Notification[] = [];
let notificationListeners: NotificationListener[] = [];
let toastListeners: ToastListener[] = [];

/**
 * Create notification
 */
export function createNotification(
  notification: Omit<Notification, 'id' | 'read' | 'createdAt'>
): Notification {
  const newNotification: Notification = {
    id: crypto.randomUUID(),
    read: false,
    createdAt: new Date(),
    ...notification,
  };

  // Add to store if persistent
  if (newNotification.persistent) {
    notifications.unshift(newNotification);

    // Keep only last 100 notifications
    if (notifications.length > 100) {
      notifications = notifications.slice(0, 100);
    }

    notifyListeners();
  }

  return newNotification;
}

/**
 * Show toast notification
 */
export function showToast(toast: Omit<ToastNotification, 'id'>): ToastNotification {
  const newToast: ToastNotification = {
    id: crypto.randomUUID(),
    duration: 5000, // Default 5 seconds
    ...toast,
  };

  toastListeners.forEach((listener) => listener(newToast));

  return newToast;
}

/**
 * Quick notification helpers
 */
export const notify = {
  success: (title: string, message: string, options?: Partial<Notification>) => {
    return createNotification({
      type: 'success',
      title,
      message,
      priority: 'low',
      persistent: false,
      ...options,
    });
  },

  error: (title: string, message: string, options?: Partial<Notification>) => {
    return createNotification({
      type: 'error',
      title,
      message,
      priority: 'high',
      persistent: true,
      ...options,
    });
  },

  warning: (title: string, message: string, options?: Partial<Notification>) => {
    return createNotification({
      type: 'warning',
      title,
      message,
      priority: 'medium',
      persistent: false,
      ...options,
    });
  },

  info: (title: string, message: string, options?: Partial<Notification>) => {
    return createNotification({
      type: 'info',
      title,
      message,
      priority: 'low',
      persistent: false,
      ...options,
    });
  },

  feature: (title: string, message: string, actionUrl?: string) => {
    return createNotification({
      type: 'feature',
      title,
      message,
      priority: 'medium',
      persistent: true,
      actionUrl,
      actionLabel: 'Learn More',
    });
  },

  payment: (title: string, message: string, actionUrl?: string) => {
    return createNotification({
      type: 'payment',
      title,
      message,
      priority: 'high',
      persistent: true,
      actionUrl,
      actionLabel: 'View Details',
    });
  },
};

/**
 * Toast helpers
 */
export const toast = {
  success: (title: string, message: string) => {
    return showToast({ type: 'success', title, message });
  },

  error: (title: string, message: string, duration = 7000) => {
    return showToast({ type: 'error', title, message, duration });
  },

  warning: (title: string, message: string) => {
    return showToast({ type: 'warning', title, message });
  },

  info: (title: string, message: string) => {
    return showToast({ type: 'info', title, message });
  },
};

/**
 * Mark notification as read
 */
export function markAsRead(notificationId: string) {
  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.read = true;
    notifyListeners();
  }
}

/**
 * Mark all as read
 */
export function markAllAsRead() {
  notifications.forEach((n) => {
    n.read = true;
  });
  notifyListeners();
}

/**
 * Delete notification
 */
export function deleteNotification(notificationId: string) {
  notifications = notifications.filter((n) => n.id !== notificationId);
  notifyListeners();
}

/**
 * Clear all notifications
 */
export function clearAllNotifications() {
  notifications = [];
  notifyListeners();
}

/**
 * Get all notifications
 */
export function getNotifications(): Notification[] {
  // Remove expired notifications
  const now = new Date();
  notifications = notifications.filter((n) => !n.expiresAt || n.expiresAt > now);

  return [...notifications];
}

/**
 * Get unread count
 */
export function getUnreadCount(): number {
  return notifications.filter((n) => !n.read).length;
}

/**
 * Get notifications by type
 */
export function getNotificationsByType(type: NotificationType): Notification[] {
  return notifications.filter((n) => n.type === type);
}

/**
 * Get notifications by priority
 */
export function getNotificationsByPriority(priority: NotificationPriority): Notification[] {
  return notifications.filter((n) => n.priority === priority);
}

/**
 * Subscribe to notifications
 */
export function subscribeToNotifications(listener: NotificationListener): () => void {
  notificationListeners.push(listener);

  // Return unsubscribe function
  return () => {
    notificationListeners = notificationListeners.filter((l) => l !== listener);
  };
}

/**
 * Subscribe to toasts
 */
export function subscribeToToasts(listener: ToastListener): () => void {
  toastListeners.push(listener);

  // Return unsubscribe function
  return () => {
    toastListeners = toastListeners.filter((l) => l !== listener);
  };
}

/**
 * Notify all listeners
 */
function notifyListeners() {
  const currentNotifications = getNotifications();
  notificationListeners.forEach((listener) => listener(currentNotifications));
}

/**
 * Initialize notifications from storage (optional)
 */
export function initNotifications(storedNotifications?: Notification[]) {
  if (storedNotifications) {
    notifications = storedNotifications.map((n) => ({
      ...n,
      createdAt: new Date(n.createdAt),
      expiresAt: n.expiresAt ? new Date(n.expiresAt) : undefined,
    }));
    notifyListeners();
  }
}

/**
 * Export notifications (for persistence)
 */
export function exportNotifications(): Notification[] {
  return getNotifications();
}
