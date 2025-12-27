/**
 * Admin Analytics Dashboard
 * View application analytics and user behavior
 */

import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, Activity, BarChart3 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

async function getAnalytics() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    usersLast30Days,
    usersLast7Days,
    totalRevenue,
    revenueLast30Days,
    revenueLast7Days,
    totalPayments,
    paymentsLast30Days,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'succeeded' },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'succeeded', createdAt: { gte: thirtyDaysAgo } },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'succeeded', createdAt: { gte: sevenDaysAgo } },
    }),
    prisma.payment.count({ where: { status: 'succeeded' } }),
    prisma.payment.count({
      where: { status: 'succeeded', createdAt: { gte: thirtyDaysAgo } },
    }),
  ]);

  // Get user growth by day (last 30 days)
  const userGrowth = await prisma.user.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' },
  });

  // Group by day
  const growthByDay: Record<string, number> = {};
  userGrowth.forEach((user) => {
    const day = user.createdAt.toISOString().split('T')[0];
    growthByDay[day] = (growthByDay[day] || 0) + 1;
  });

  return {
    totalUsers,
    usersLast30Days,
    usersLast7Days,
    totalRevenue: totalRevenue._sum.amount || 0,
    revenueLast30Days: revenueLast30Days._sum.amount || 0,
    revenueLast7Days: revenueLast7Days._sum.amount || 0,
    totalPayments,
    paymentsLast30Days,
    growthByDay,
  };
}

async function AnalyticsDashboard() {
  const analytics = await getAnalytics();

  const avgRevenuePerUser =
    analytics.totalUsers > 0 ? analytics.totalRevenue / analytics.totalUsers / 100 : 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card tone="primary">
          <CardHeader code="0x01" title="TOTAL USERS" icon={<Users className="h-4 w-4" />} />
          <CardContent>
            <div className="text-2xl font-semibold">{analytics.totalUsers}</div>
            <p className="text-muted-foreground text-xs">+{analytics.usersLast7Days} this week</p>
          </CardContent>
        </Card>

        <Card tone="success">
          <CardHeader code="0x02" title="TOTAL REVENUE" icon={<DollarSign className="h-4 w-4" />} />
          <CardContent>
            <div className="text-2xl font-semibold">
              ${(analytics.totalRevenue / 100).toFixed(2)}
            </div>
            <p className="text-muted-foreground text-xs">
              ${(analytics.revenueLast7Days / 100).toFixed(2)} this week
            </p>
          </CardContent>
        </Card>

        <Card tone="primary">
          <CardHeader
            code="0x03"
            title="AVG REVENUE USER"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <CardContent>
            <div className="text-2xl font-semibold">${avgRevenuePerUser.toFixed(2)}</div>
            <p className="text-muted-foreground text-xs">Lifetime value per user</p>
          </CardContent>
        </Card>

        <Card tone="neutral">
          <CardHeader code="0x04" title="TOTAL PAYMENTS" icon={<Activity className="h-4 w-4" />} />
          <CardContent>
            <div className="text-2xl font-semibold">{analytics.totalPayments}</div>
            <p className="text-muted-foreground text-xs">
              {analytics.paymentsLast30Days} in last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Growth Chart (Simple Text Representation) */}
      <Card tone="primary">
        <CardHeader
          code="0x05"
          title="USER GROWTH"
          meta="Last 30 days"
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <CardContent>
          <div className="space-y-2">
            {Object.entries(analytics.growthByDay)
              .sort(([a], [b]) => b.localeCompare(a))
              .slice(0, 10)
              .map(([day, count]) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">{day}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: count }, (_, i) => (
                        <div key={i} className={cn('bg-primary h-4 w-2', mode.radius)} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Period Comparisons */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card tone="success">
          <CardHeader
            code="0x06"
            title="LAST 7 DAYS"
            meta="Recent activity"
            icon={<Activity className="h-4 w-4" />}
          />
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">New Users</span>
              <span className="text-2xl font-semibold">{analytics.usersLast7Days}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Revenue</span>
              <span className="text-2xl font-semibold">
                ${(analytics.revenueLast7Days / 100).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card tone="primary">
          <CardHeader
            code="0x07"
            title="LAST 30 DAYS"
            meta="Monthly summary"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">New Users</span>
              <span className="text-2xl font-semibold">{analytics.usersLast30Days}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Revenue</span>
              <span className="text-2xl font-semibold">
                ${(analytics.revenueLast30Days / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Payments</span>
              <span className="text-2xl font-semibold">{analytics.paymentsLast30Days}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track user growth, revenue, and engagement</p>
      </div>

      <Suspense
        fallback={
          <div className="flex h-96 items-center justify-center">
            <div className="text-muted-foreground">Loading analytics...</div>
          </div>
        }
      >
        <AnalyticsDashboard />
      </Suspense>
    </div>
  );
}
