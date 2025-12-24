/**
 * Usage Stats Card Component
 * Displays resource consumption metrics with progress bars
 */

import { Activity } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Usage } from './types';

interface UsageStatsCardProps {
  usage: Usage;
}

export function UsageStatsCard({ usage }: UsageStatsCardProps) {
  return (
    <Card>
      <CardHeader code="0x01" title="USAGE THIS MONTH" icon={<Activity className="h-4 w-4" />} />
      <CardContent padding="lg">
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Team Members</span>
              <span className="text-muted-foreground text-sm">
                {usage.users.current} / {usage.users.limit}
              </span>
            </div>
            <Progress value={(usage.users.current / usage.users.limit) * 100} size="sm" barWidth={20} />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Storage</span>
              <span className="text-muted-foreground text-sm">
                {usage.storage.current} GB / {usage.storage.limit} GB
              </span>
            </div>
            <Progress value={(usage.storage.current / usage.storage.limit) * 100} size="sm" barWidth={20} />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">API Calls</span>
              <span className="text-muted-foreground text-sm">
                {usage.apiCalls.current.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}
              </span>
            </div>
            <Progress
              value={(usage.apiCalls.current / usage.apiCalls.limit) * 100}
              size="sm"
              barWidth={20}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
