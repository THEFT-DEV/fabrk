/**
 * Recent Activity Component
 * Displays recent account activities
 */

'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Activity, DollarSign, Upload, Settings, Shield, Clock } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export interface ActivityItem {
  id: string;
  type: 'login' | 'upload' | 'payment' | 'setting' | 'security';
  description: string;
  timestamp: Date;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

function getActivityIcon(type: ActivityItem['type']) {
  switch (type) {
    case 'login':
      return Activity;
    case 'upload':
      return Upload;
    case 'payment':
      return DollarSign;
    case 'setting':
      return Settings;
    case 'security':
      return Shield;
  }
}

function formatTimestamp(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="col-span-4">
      <CardHeader code="0x00" title="RECENT ACTIVITY" />
      <CardContent>
        <p className={cn(mode.font, 'text-muted-foreground', 'mb-4', 'text-xs')}>
          Your recent account activity and actions
        </p>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div
                key={activity.id}
                className={cn('flex items-center gap-6 border p-4', mode.radius)}
              >
                <div className={cn('bg-secondary p-2', mode.radius)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className={cn(mode.font, 'text-sm', 'font-medium')}>{activity.description}</p>
                  <p
                    className={cn(
                      mode.font,
                      'text-muted-foreground',
                      'flex',
                      'items-center',
                      'gap-1',
                      'text-xs'
                    )}
                  >
                    <Clock className="h-3 w-3" />
                    {formatTimestamp(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
