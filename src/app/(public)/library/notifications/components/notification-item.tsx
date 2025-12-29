import { type Notification } from './notification-types'; // Correct import path
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Trash2 } from 'lucide-react'; // Import Lucide icons used directly in NotificationItem
import Link from 'next/link';
import { useMemo } from 'react';
import { getTypeIcon, getTypeColor } from './notification-types'; // Import getTypeIcon and getTypeColor
import { mode } from '@/design-system';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  // Use useMemo to ensure Icon and colorClass are stable across renders
  const { Icon, colorClass } = useMemo(
    () => ({
      Icon: getTypeIcon(notification.type),
      colorClass: getTypeColor(notification.type),
    }),
    [notification.type]
  );

  return (
    <div
      className={cn(
        mode.radius,
        'border-border bg-card relative flex w-full items-start gap-4 border p-4 transition-colors',
        !notification.read && 'bg-primary/5 hover:bg-primary/10'
      )}
    >
      {/* Icon */}
      <div
        className={cn('border-border bg-background flex size-8 flex-shrink-0 items-center justify-center border', mode.radius, colorClass)}
      >
        <Icon className={`h-4 w-4 ${colorClass}`} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={cn(mode.radius, mode.font, 'border-border px-2 py-0.5 text-xs uppercase')}
          >
            {notification.type.replace(/_/g, ' ')}
          </Badge>
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
            {notification.timestamp}
          </span>
        </div>
        <h4 className={cn(mode.font, 'text-foreground mt-2 text-sm font-semibold')}>
          {notification.title}
        </h4>
        <p className={cn(mode.font, 'text-muted-foreground mt-1 text-xs')}>
          {notification.message}
        </p>

        {notification.actionUrl && (
          <Button
            variant="link"
            size="sm"
            asChild
            className={cn(mode.radius, mode.font, 'mt-2 px-0 text-xs font-semibold')}
          >
            <Link href={notification.actionUrl}>VIEW DETAILS</Link>
          </Button>
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {!notification.read && (
            <Button
              variant="outline"
              size="sm"
              className={cn(mode.radius, mode.font, 'text-xs')}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <Check className="mr-2 size-3" /> Mark as Read
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            className={cn(mode.radius, mode.font, 'text-xs')}
            onClick={() => onDelete(notification.id)}
          >
            <Trash2 className="mr-2 size-3" /> Delete
          </Button>
        </div>
      </div>

      {/* Read indicator */}
      {!notification.read && (
        <span className={cn(mode.radius, 'bg-primary absolute top-2 right-2 size-2')} />
      )}
    </div>
  );
}
