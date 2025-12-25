/**
 * FABRK COMPONENT
 * Notifications actions bar
 */

import { Button } from '@/components/ui/button';
import { CheckCheck, Archive, Settings } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface NotificationsActionsBarProps {
  totalNotifications: number;
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export function NotificationsActionsBar({
  totalNotifications,
  unreadCount,
  onMarkAllAsRead,
  onClearAll,
}: NotificationsActionsBarProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
        [NOTIFICATIONS]: TOTAL={totalNotifications} | UNREAD={unreadCount}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onMarkAllAsRead}
          disabled={unreadCount === 0}
          className={cn(mode.radius, mode.font, 'h-7 text-xs')}
        >
          <CheckCheck className="mr-1 h-3 w-3" />
          &gt; MARK ALL READ
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          disabled={totalNotifications === 0}
          className={cn(mode.radius, mode.font, 'h-7 text-xs')}
        >
          <Archive className="mr-1 h-3 w-3" />
          &gt; CLEAR ALL
        </Button>
        <Button variant="outline" size="sm" className={cn(mode.radius, mode.font, 'h-7 text-xs')}>
          <Settings className="mr-1 h-3 w-3" />
          &gt; SETTINGS
        </Button>
      </div>
    </div>
  );
}
