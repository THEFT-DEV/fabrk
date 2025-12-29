/**
 * ✅ FABRK COMPONENT
 * Quick Stats Row - At-a-glance billing summary
 */

import { CreditCard, Calendar, DollarSign } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Subscription {
  plan: string;
  status: string;
  price: number;
  billingCycle: string;
  nextBillingDate: string;
  startDate: string;
  features: string[];
}

interface QuickStatsRowProps {
  subscription: Subscription;
  formatDate: (date: string) => string;
}

export function QuickStatsRow({ subscription, formatDate }: QuickStatsRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Current Plan */}
      <div className={cn('border-primary/50 bg-primary/5 border p-4', mode.radius)}>
        <div className="flex items-center gap-2">
          <CreditCard className="text-primary size-4" />
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>[CURRENT PLAN]:</span>
        </div>
        <div className={cn(mode.font, 'text-primary mt-1 text-2xl font-semibold')}>
          {subscription.plan}
        </div>
      </div>

      {/* Next Billing */}
      <div className={cn('border-border border p-4', mode.radius)}>
        <div className="flex items-center gap-2">
          <Calendar className="text-muted-foreground size-4" />
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>[NEXT BILLING]:</span>
        </div>
        <div className={cn(mode.font, 'mt-1 text-2xl font-semibold')}>
          {formatDate(subscription.nextBillingDate)}
        </div>
      </div>

      {/* Monthly Cost */}
      <div className={cn('border-border border p-4', mode.radius)}>
        <div className="flex items-center gap-2">
          <DollarSign className="text-muted-foreground size-4" />
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>[MONTHLY COST]:</span>
        </div>
        <div className={cn(mode.font, 'mt-1 text-2xl font-semibold')}>
          ${subscription.price}
          <span className={cn(mode.font, 'text-muted-foreground text-sm font-normal')}>/mo</span>
        </div>
      </div>
    </div>
  );
}
