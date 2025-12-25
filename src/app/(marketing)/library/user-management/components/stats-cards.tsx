/**
 * Stats cards component showing user metrics
 */

import type { User } from './types';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface StatsCardsProps {
  users: User[];
}

export function StatsCards({ users }: StatsCardsProps) {
  const activeCount = users.filter((u) => u.status === 'active').length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;
  const enterpriseCount = users.filter((u) => u.plan === 'Enterprise').length;

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>[TOTAL USERS]:</div>
        <div className="text-4xl font-semibold">{users.length}</div>
        <div className={cn(mode.font, 'text-muted-foreground mt-1 text-xs')}>
          STATUS: <span className="text-success">INDEXED</span>
        </div>
      </div>
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>[ACTIVE USERS]:</div>
        <div className="text-4xl font-semibold">{activeCount}</div>
        <div className={cn(mode.font, 'text-muted-foreground mt-1 text-xs')}>
          RATE:{' '}
          <span className="text-success">{Math.round((activeCount / users.length) * 100)}%</span>
        </div>
      </div>
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>[ADMINS]:</div>
        <div className="text-4xl font-semibold">{adminCount}</div>
        <div className={cn(mode.font, 'text-muted-foreground mt-1 text-xs')}>
          ROLE: <span className="text-primary">ELEVATED</span>
        </div>
      </div>
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>[ENTERPRISE]:</div>
        <div className="text-4xl font-semibold">{enterpriseCount}</div>
        <div className={cn(mode.font, 'text-muted-foreground mt-1 text-xs')}>
          PLAN: <span className="text-primary">PREMIUM</span>
        </div>
      </div>
    </div>
  );
}
