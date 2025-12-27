'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { mode, formatLabel } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface BillingInfo {
  plan: string;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: string;
  amount: string;
}

export function BillingSection() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Placeholder billing data - replace with actual data from your backend
  const billingInfo: BillingInfo = {
    plan: 'Pro Plan',
    status: 'active',
    currentPeriodEnd: '2024-11-30',
    amount: '$29.99',
  };

  async function handleManageBilling() {
    setIsLoading(true);

    try {
      // Implementation: Create Stripe billing portal session
      // 1. Create API route: POST /api/stripe/create-portal-session
      // 2. Server-side: Call stripe.billingPortal.sessions.create()
      //    with customer ID and return URL from env config
      // 3. Redirect user to the portal URL
      // Reference: https://stripe.com/docs/api/customer_portal

      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to open billing portal. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'canceled':
        return 'secondary';
      case 'past_due':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Card tone="neutral">
      <CardHeader code="0x05" title="BILLING AND SUBSCRIPTION" />
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={cn('text-sm font-medium', mode.font)}>{formatLabel('CURRENT PLAN')}</p>
              <p className={cn('text-2xl font-semibold', mode.font)}>{billingInfo.plan}</p>
            </div>
            <Badge variant={getStatusBadgeVariant(billingInfo.status)}>
              {billingInfo.status.charAt(0).toUpperCase() + billingInfo.status.slice(1)}
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">{billingInfo.amount}/month</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current period ends</span>
              <span className="font-medium">{billingInfo.currentPeriodEnd}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Button onClick={handleManageBilling} disabled={isLoading} className="w-full">
              {isLoading ? '> LOADING...' : '> MANAGE BILLING'}
            </Button>
            <p className="text-muted-foreground text-center text-xs">
              You'll be redirected to Stripe's secure portal to manage your subscription, payment
              methods, and view invoices.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
