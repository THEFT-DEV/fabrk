/**
 * ✅ FABRK COMPONENT
 * Stats Cards - Organization metrics
 */

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface StatsCardsProps {
  organization: {
    name: string;
    plan: string;
    memberLimit: number;
  };
  membersCount: number;
  pendingInvitationsCount: number;
  activeNowCount: number;
}

export function StatsCards({
  organization,
  membersCount,
  pendingInvitationsCount,
  activeNowCount,
}: StatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <div className={cn(mode.radius, 'border-border bg-card border p-4')}>
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>[ORGANIZATION]:</div>
        <div className={cn(mode.font, 'text-2xl font-semibold')}>{organization.name}</div>
        <div className={cn(mode.font, 'text-muted-foreground mt-2 text-xs')}>
          PLAN: <span className="text-primary">{organization.plan.toUpperCase()}</span>
        </div>
      </div>
      <div className={cn(mode.radius, 'border-border bg-card border p-4')}>
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>[TEAM SIZE]:</div>
        <div className={cn(mode.font, 'text-2xl font-semibold')}>
          {membersCount} / {organization.memberLimit}
        </div>
        <div className={cn(mode.font, 'text-muted-foreground mt-2 text-xs')}>
          STATUS:{' '}
          <span className="text-success">
            {organization.memberLimit - membersCount} SEATS AVAILABLE
          </span>
        </div>
      </div>
      <div className={cn(mode.radius, 'border-border bg-card border p-4')}>
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>
          [PENDING INVITES]:
        </div>
        <div className={cn(mode.font, 'text-2xl font-semibold')}>{pendingInvitationsCount}</div>
        <div className={cn(mode.font, 'text-muted-foreground mt-2 text-xs')}>
          STATUS: <span className="text-warning">AWAITING RESPONSE</span>
        </div>
      </div>
      <div className={cn(mode.radius, 'border-border bg-card border p-4')}>
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>[ACTIVE NOW]:</div>
        <div className={cn(mode.font, 'text-2xl font-semibold')}>{activeNowCount}</div>
        <div className={cn(mode.font, 'text-muted-foreground mt-2 text-xs')}>
          STATUS: <span className="text-success">ONLINE</span>
        </div>
      </div>
    </div>
  );
}
