/**
 * FABRK COMPONENT
 * Notifications list with empty state
 */

import { Bell } from 'lucide-react';
import { Notification } from './notification-types';
import { NotificationItem } from './notification-item';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface NotificationsListProps {
  notifications: Notification[];
  activeTab: string;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationsList({
  notifications,
  activeTab,
  onMarkAsRead,
  onDelete,
}: NotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <div className="border-border bg-muted/30 border p-8 text-center">
        <Bell className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
        <div className={cn(mode.font, 'text-muted-foreground text-sm')}>
          {activeTab === 'unread' ? '[NO UNREAD NOTIFICATIONS]' : '[NO NOTIFICATIONS]'}
        </div>
        <div className={cn(mode.font, 'text-muted-foreground mt-1 text-xs')}>
          You&apos;re all caught up!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
