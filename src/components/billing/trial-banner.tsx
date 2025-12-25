'use client';

/**
 * Trial Banner Component
 * Shows trial status and days remaining in the dashboard
 */

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface TrialBannerProps {
  trialEndsAt: string | null;
  tier: string;
}

export function TrialBanner({ trialEndsAt, tier }: TrialBannerProps) {
  // Calculate trial status from props (no need for useEffect/useState)
  const { daysRemaining, isExpired } = useMemo(() => {
    if (!trialEndsAt || tier !== 'trial') {
      return { daysRemaining: 0, isExpired: false };
    }

    const endDate = new Date(trialEndsAt);
    const now = new Date();
    const msRemaining = endDate.getTime() - now.getTime();
    const days = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

    return {
      daysRemaining: Math.max(0, days),
      isExpired: days <= 0,
    };
  }, [trialEndsAt, tier]);

  // Only show for trial users
  if (tier !== 'trial' || !trialEndsAt) {
    return null;
  }

  if (isExpired) {
    return (
      <Alert className={cn('bg-destructive/10 border', mode.color.border.danger)}>
        <Clock className={cn('h-4 w-4', mode.color.text.danger)} />
        <AlertDescription className="flex items-center justify-between">
          <span className={cn('font-medium', mode.color.text.danger)}>
            Your free trial has ended. Upgrade now to continue using all features.
          </span>
          <Button asChild size="sm" className={cn('ml-4', mode.radius, mode.font)}>
            <Link href="/pricing">
              &gt; UPGRADE NOW
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Warning when 3 days or less remaining
  const isUrgent = daysRemaining <= 3;

  return (
    <Alert
      className={cn(
        'border',
        isUrgent
          ? `${mode.color.border.warning} bg-warning/10`
          : `${mode.color.border.accent} bg-primary/10`
      )}
    >
      <Clock
        className={cn('h-4 w-4', isUrgent ? mode.color.text.warning : mode.color.text.accent)}
      />
      <AlertDescription className="flex items-center justify-between">
        <span
          className={cn(
            isUrgent ? 'font-medium' : '',
            isUrgent ? mode.color.text.warning : mode.color.text.accent
          )}
        >
          {daysRemaining === 1
            ? 'Your free trial ends tomorrow!'
            : `${daysRemaining} days remaining in your free trial.`}
        </span>
        <Button
          asChild
          variant={isUrgent ? 'default' : 'outline'}
          size="sm"
          className={cn('ml-4 text-xs', mode.font, mode.radius)}
        >
          <Link href="/pricing">
            {isUrgent ? '> UPGRADE NOW' : '> VIEW PLANS'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
