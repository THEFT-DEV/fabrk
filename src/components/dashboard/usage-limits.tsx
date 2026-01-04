'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { formatUsageDisplay, getUsagePercentage } from '@/lib/features/access-control';
import { AlertCircle, Database, FolderOpen, Globe, Users } from 'lucide-react';
import Link from 'next/link';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
interface UsageLimitsProps {
  user: { subscriptionTier?: string; email?: string; name?: string };
}

const resourceIcons = {
  users: Users,
  projects: FolderOpen,
  apiCalls: Globe,
  storage: Database,
};

const resourceLabels = {
  users: 'Users',
  projects: 'Projects',
  apiCalls: 'API Calls',
  storage: 'Storage (MB)',
};

export function UsageLimits({ user }: UsageLimitsProps) {
  const resources = ['users', 'projects', 'apiCalls', 'storage'] as const;

  // Create a full user object with defaults for missing fields
  const fullUser = {
    subscriptionTier: user.subscriptionTier || 'trial',
    email: user.email || '',
    name: user.name || '',
    createdAt: new Date(),
    userCount: 0,
    apiCalls: 0,
    storageUsed: 0,
    projectCount: 0,
  };

  return (
    <div className={cn('border-border bg-muted/30 border p-6', mode.radius)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="text-primary focus-visible:ring-ring h-5 w-5 focus-visible:ring-2 focus-visible:outline-none" />
          <h3 className={cn('text-muted-foreground font-semibold', mode.font)}>
            Free Tier Usage Limits
          </h3>
        </div>
        <Link href="/pricing">
          <Button size="sm" variant="default">
            Upgrade for More
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {resources.map((resource) => {
          const Icon = resourceIcons[resource];
          const percentage = getUsagePercentage(fullUser, resource);
          const display = formatUsageDisplay(fullUser, resource);
          const isNearLimit = percentage >= 80;

          return (
            <div key={resource} className={cn('bg-muted p-4', mode.radius)}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground text-sm font-medium">
                    {resourceLabels[resource]}
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    isNearLimit
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }`}
                >
                  {display}
                </span>
              </div>
              <Progress
                value={percentage}
                size="sm"
                barWidth={15}
              />
              {isNearLimit && (
                <p className="text-destructive mt-2 text-xs">
                  Approaching limit - upgrade recommended
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className={cn('bg-primary/10 mt-4 p-4', mode.radius)}>
        <p className="text-primary text-sm">
          <strong>[TIP]:</strong> Upgrade to Starter to get 10x more resources and unlock premium
          features like OAuth, payments, and email integration.
        </p>
      </div>
    </div>
  );
}
