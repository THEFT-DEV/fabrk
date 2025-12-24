/**
 * Current Plan Card Component
 * Displays subscription details, billing period, and management actions
 */

import {
  DollarSign,
  Calendar,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Organization, Subscription } from './types';
import { getStatusBadge } from './utils';

interface CurrentPlanCardProps {
  organization: Organization;
  subscription: Subscription | null;
  isOwnerOrAdmin: boolean;
  loadingPortal: boolean;
  onManageBilling: () => void;
  onUpgrade: () => void;
}

export function CurrentPlanCard({
  subscription,
  isOwnerOrAdmin,
  loadingPortal,
  onManageBilling,
  onUpgrade,
}: CurrentPlanCardProps) {
  return (
    <Card>
      <CardHeader
        code="0x00"
        title="CURRENT PLAN"
        icon={<CreditCard className="text-muted-foreground size-4" />}
        meta={subscription && getStatusBadge(subscription.status)}
      />
      <CardContent padding="lg">
        {subscription ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold">{subscription.plan.name}</p>
                <p className="text-muted-foreground">
                  ${(subscription.plan.amount / 100).toFixed(2)} / {subscription.plan.interval}
                </p>
              </div>
              {isOwnerOrAdmin && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onUpgrade}>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    &gt; UPGRADE PLAN
                  </Button>
                  <Button onClick={onManageBilling} disabled={loadingPortal}>
                    {loadingPortal && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <ExternalLink className="mr-2 h-4 w-4" />
                    &gt; MANAGE BILLING
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-3">
              <div className="border-border bg-card rounded-none border p-4">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  Billing Period
                </div>
                <p className="mt-2 font-medium">
                  Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              </div>

              <div className="border-border bg-card rounded-none border p-4">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4" />
                  Next Payment
                </div>
                <p className="mt-2 font-medium">${(subscription.plan.amount / 100).toFixed(2)}</p>
              </div>

              <div className="border-border bg-card rounded-none border p-4">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Status
                </div>
                <p className="mt-2 font-medium capitalize">{subscription.status}</p>
              </div>
            </div>

            {subscription.cancelAtPeriodEnd && (
              <div className="border-border border-destructive bg-destructive/10 rounded-none border p-4">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="text-destructive h-5 w-5" />
                  <div>
                    <h4 className="text-destructive font-semibold">Subscription Ending</h4>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Your subscription will end on{' '}
                      {new Date(subscription.currentPeriodEnd).toLocaleDateString()}. You can
                      reactivate it anytime before then.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 text-center">
            <DollarSign className="text-muted-foreground mx-auto h-12 w-12" />
            <h3 className="mt-4 text-sm font-semibold">No Active Subscription</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Upgrade to a paid plan to unlock premium features
            </p>
            {isOwnerOrAdmin && (
              <Button onClick={onUpgrade} className="mt-4">
                <TrendingUp className="mr-2 h-4 w-4" />
                &gt; VIEW PLANS
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
