'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Coins } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Static preview component (doesn't fetch from API)
function BalanceDisplayPreview({
  balance = 750,
  monthlyAllowance = 1000,
  tier = 'starter',
  compact = false,
}: {
  balance?: number;
  monthlyAllowance?: number;
  tier?: string;
  compact?: boolean;
}) {
  const percentage = Math.round((balance / monthlyAllowance) * 100);

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', mode.font)}>
        <Coins className="h-4 w-4" />
        <span className="text-xs font-semibold">{balance}</span>
      </div>
    );
  }

  return (
    <div className={cn('space-y-1', mode.font)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4" />
          <span className="text-xs">[CREDITS]:</span>
        </div>
        <span className="text-xs font-semibold">
          {balance} / {monthlyAllowance}
        </span>
      </div>
      <div className={cn('bg-muted h-1.5 w-full', mode.radius)}>
        <div
          className={cn(
            'h-full transition-all',
            mode.radius,
            percentage > 50 ? 'bg-primary' : percentage > 20 ? 'bg-warning' : 'bg-destructive'
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="text-muted-foreground text-xs uppercase">{tier} tier</div>
    </div>
  );
}

export default function BalanceDisplayPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.120]"
      category="Credits"
      title="Balance Display"
      description="Shows the user's current AI credit balance with a progress bar indicating usage against monthly allowance. Color-coded to show remaining capacity."
      importCode={`import { BalanceDisplay } from "@/components/credits"`}
      mainPreview={{
        preview: (
          <div className="mx-auto max-w-xs space-y-4 p-4">
            <BalanceDisplayPreview balance={750} monthlyAllowance={1000} tier="starter" />
          </div>
        ),
        code: `<BalanceDisplay />`,
      }}
      variants={[
        {
          title: 'Compact Mode',
          description: 'Minimal display showing only the credit count.',
          preview: (
            <div className="mx-auto max-w-xs p-4">
              <BalanceDisplayPreview balance={750} compact />
            </div>
          ),
          code: `<BalanceDisplay compact />`,
        },
        {
          title: 'Low Balance Warning',
          description: 'Yellow warning color when below 50% capacity.',
          preview: (
            <div className="mx-auto max-w-xs p-4">
              <BalanceDisplayPreview balance={350} monthlyAllowance={1000} tier="starter" />
            </div>
          ),
          code: `// Automatically shows warning when balance < 50%`,
        },
        {
          title: 'Critical Balance',
          description: 'Red destructive color when below 20% capacity.',
          preview: (
            <div className="mx-auto max-w-xs p-4">
              <BalanceDisplayPreview balance={150} monthlyAllowance={1000} tier="starter" />
            </div>
          ),
          code: `// Automatically shows critical when balance < 20%`,
        },
        {
          title: 'Different Tiers',
          description: "Display adapts to show the user's subscription tier.",
          preview: (
            <div className="mx-auto max-w-xs space-y-4 p-4">
              <BalanceDisplayPreview balance={80} monthlyAllowance={100} tier="free" />
              <BalanceDisplayPreview balance={800} monthlyAllowance={1000} tier="starter" />
              <BalanceDisplayPreview balance={8000} monthlyAllowance={10000} tier="pro" />
            </div>
          ),
          code: `// Tier displayed automatically from user's subscription`,
        },
      ]}
      props={[
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
        {
          name: 'compact',
          type: 'boolean',
          default: 'false',
          description: 'Show minimal display with just the credit count.',
        },
      ]}
      usageExamples={[
        {
          title: 'Dashboard Integration',
          description:
            'Add to user dashboard to show current credit balance. Automatically fetches from /api/credits/balance.',
          code: `'use client';

import { BalanceDisplay } from '@/components/credits';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1>Dashboard</h1>

      {/* Auto-fetches balance, tier, and allowance */}
      <BalanceDisplay />

      {/* Compact mode for sidebars/headers */}
      <BalanceDisplay compact />
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Required API Endpoint',
          description: 'The component expects GET /api/credits/balance to return this format:',
          code: `// GET /api/credits/balance response
{
  "balance": 750,
  "monthlyAllowance": 1000,
  "tier": "starter",
  "lastRefill": "2024-12-01T00:00:00.000Z"
}

// Already implemented at:
// src/app/api/credits/balance/route.ts`,
          language: 'json',
        },
        {
          title: 'Color States',
          description: 'Progress bar automatically changes color based on remaining credits:',
          code: `// Green (bg-primary): > 50% remaining
// Yellow (bg-warning): 20-50% remaining
// Red (bg-destructive): < 20% remaining

// Example: 750/1000 = 75% = Green
// Example: 350/1000 = 35% = Yellow
// Example: 150/1000 = 15% = Red`,
          language: 'typescript',
        },
      ]}
      accessibility={[
        'Progress bar indicates remaining credits visually',
        'Color-coded states (green/yellow/red) for quick recognition',
        'Numeric display provides exact values',
        'Tier label indicates subscription level',
      ]}
      previous={{ title: 'Usage Meter', href: '/docs/components/usage-meter' }}
      next={{
        title: 'Credit Usage Chart',
        href: '/docs/components/credit-usage-chart',
      }}
    />
  );
}
