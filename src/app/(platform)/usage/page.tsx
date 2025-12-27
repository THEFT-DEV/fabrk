/**
 * AI Credit Usage Dashboard
 * View credit balance, usage history, and analytics
 */

import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Coins, Activity, TrendingDown, Calendar } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { UsageChart } from '@/components/credits/usage-chart';
import { TransactionTable } from '@/components/credits/transaction-table';
import { TIER_ALLOWANCES, type SubscriptionTier } from '@/lib/credits/pricing';

async function getUsageData(userId: string) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Get or create balance
  let balance = await prisma.creditBalance.findUnique({
    where: { userId },
    include: { user: { select: { tier: true } } },
  });

  if (!balance) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { tier: true },
    });

    const tier = (user?.tier || 'free') as SubscriptionTier;
    const allowance = TIER_ALLOWANCES[tier] === Infinity ? 999999 : TIER_ALLOWANCES[tier];

    balance = await prisma.creditBalance.create({
      data: {
        userId,
        balance: allowance,
        monthlyAllowance: allowance,
      },
      include: { user: { select: { tier: true } } },
    });
  }

  // Get transactions
  const transactions = await prisma.creditTransaction.findMany({
    where: { balanceId: balance.id },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  // Get usage stats for chart
  const usageTransactions = await prisma.creditTransaction.findMany({
    where: {
      balanceId: balance.id,
      type: 'USAGE',
      createdAt: { gte: thirtyDaysAgo },
    },
    orderBy: { createdAt: 'asc' },
  });

  // Group by day
  const dailyUsage: Record<string, number> = {};
  usageTransactions.forEach((tx: { createdAt: Date; amount: number }) => {
    const day = tx.createdAt.toISOString().split('T')[0];
    dailyUsage[day] = (dailyUsage[day] || 0) + Math.abs(tx.amount);
  });

  // Fill in all days
  const usageStats: { date: string; credits: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    usageStats.push({
      date: dateStr,
      credits: dailyUsage[dateStr] || 0,
    });
  }

  const totalUsage = usageStats.reduce((sum, day) => sum + day.credits, 0);

  // Calculate days until refill (compute here to avoid impure Date.now() in render)
  const daysUntilRefill = Math.ceil(
    (balance.lastRefill.getTime() + 30 * 24 * 60 * 60 * 1000 - Date.now()) / (24 * 60 * 60 * 1000)
  );

  return {
    balance: balance.balance,
    monthlyAllowance: balance.monthlyAllowance,
    tier: balance.user.tier || 'free',
    lastRefill: balance.lastRefill,
    daysUntilRefill: Math.max(0, daysUntilRefill),
    transactions: transactions.map(
      (tx: {
        id: string;
        amount: number;
        type: string;
        description: string | null;
        endpoint: string | null;
        createdAt: Date;
      }) => ({
        id: tx.id,
        amount: tx.amount,
        type: tx.type,
        description: tx.description,
        endpoint: tx.endpoint,
        createdAt: tx.createdAt.toISOString(),
      })
    ),
    usageStats,
    totalUsage,
  };
}

async function UsageDashboard({ userId }: { userId: string }) {
  const data = await getUsageData(userId);
  const percentage = Math.round((data.balance / data.monthlyAllowance) * 100);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card tone="primary">
          <CardHeader code="0x01" title="CURRENT BALANCE" icon={<Coins className="h-4 w-4" />} />
          <CardContent>
            <div className="text-2xl font-semibold">{data.balance}</div>
            <p className="text-muted-foreground text-xs">
              of {data.monthlyAllowance} credits ({percentage}%)
            </p>
          </CardContent>
        </Card>

        <Card tone="neutral">
          <CardHeader code="0x02" title="USAGE_30D" icon={<TrendingDown className="h-4 w-4" />} />
          <CardContent>
            <div className="text-2xl font-semibold">{data.totalUsage}</div>
            <p className="text-muted-foreground text-xs">credits used this month</p>
          </CardContent>
        </Card>

        <Card tone="success">
          <CardHeader code="0x03" title="TIER" icon={<Activity className="h-4 w-4" />} />
          <CardContent>
            <div className="text-2xl font-semibold uppercase">{data.tier}</div>
            <p className="text-muted-foreground text-xs">{data.monthlyAllowance} credits/month</p>
          </CardContent>
        </Card>

        <Card tone="primary">
          <CardHeader code="0x04" title="NEXT REFILL" icon={<Calendar className="h-4 w-4" />} />
          <CardContent>
            <div className="text-2xl font-semibold">{data.daysUntilRefill}</div>
            <p className="text-muted-foreground text-xs">days until credit refresh</p>
          </CardContent>
        </Card>
      </div>

      {/* Balance Progress Bar */}
      <Card tone="primary">
        <CardHeader code="0x05" title="BALANCE STATUS" />
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Credits remaining</span>
              <span className="font-semibold">
                {data.balance} / {data.monthlyAllowance}
              </span>
            </div>
            <div className={cn('bg-muted h-3 w-full', mode.radius)}>
              <div
                className={cn(
                  'h-full transition-all',
                  mode.radius,
                  percentage > 50 ? 'bg-primary' : percentage > 20 ? 'bg-warning' : 'bg-destructive'
                )}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Chart */}
      <Card tone="primary">
        <CardHeader code="0x06" title="USAGE HISTORY" meta="Last 14 days" />
        <CardContent>
          <UsageChart data={data.usageStats} />
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card tone="neutral">
        <CardHeader code="0x07" title="RECENT TRANSACTIONS" meta="Last 20" />
        <CardContent>
          <TransactionTable transactions={data.transactions} />
        </CardContent>
      </Card>
    </div>
  );
}

export default async function UsagePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className={cn('text-4xl font-semibold tracking-tight', mode.font)}>AI Credit Usage</h1>
        <p className={cn('text-muted-foreground', mode.font)}>
          Monitor your AI credit balance and usage history
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex h-96 items-center justify-center">
            <div className={cn('text-muted-foreground', mode.font)}>Loading usage data...</div>
          </div>
        }
      >
        <UsageDashboard userId={session.user.id} />
      </Suspense>
    </div>
  );
}
