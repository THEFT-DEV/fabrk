/**
 * Notifications Library Index
 * Central export for notification system
 */

// Core notification manager
export {
  createNotification,
  showToast,
  notify,
  toast,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  getNotifications,
  getUnreadCount,
  getNotificationsByType,
  getNotificationsByPriority,
  subscribeToNotifications,
  subscribeToToasts,
  initNotifications,
  exportNotifications,
  type Notification,
  type ToastNotification,
  type NotificationType,
  type NotificationPriority,
} from './notification-manager';

// React hooks
export { useNotifications, useToast, useNotify } from './hooks';
