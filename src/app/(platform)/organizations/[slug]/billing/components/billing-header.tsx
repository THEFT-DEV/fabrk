/**
 * Billing Header Component
 * Displays the page header with organization name
 */

import { CreditCard } from 'lucide-react';
import type { Organization } from './types';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface BillingHeaderProps {
  organization: Organization;
}

export function BillingHeader({ organization }: BillingHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={cn('border-border bg-primary border p-2', mode.radius)}>
          <CreditCard className="text-primary-foreground h-6 w-6" />
        </div>
        <div>
          <h1 className="text-4xl font-semibold">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage billing for {organization.name}</p>
        </div>
      </div>
    </div>
  );
}
