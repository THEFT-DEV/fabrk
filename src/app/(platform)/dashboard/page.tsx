/**
 * Main Dashboard Page
 * Overview with stats, activity, and quick actions
 */

'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { DashboardHeader } from './components/dashboard-header';
import { StatsCards } from './components/stats-cards';
import { RecentActivity } from './components/recent-activity';
import { QuickActions } from './components/quick-actions';
import { AccountStatus } from './components/account-status';
import type { DashboardStats, ActivityItem } from './components/types';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, fetch from your API
        // For now, using mock data
        setStats({
          totalRevenue: 24500,
          revenueChange: 12.5,
          activeUsers: 1234,
          usersChange: -2.3,
          totalUploads: 456,
          uploadsChange: 8.1,
          storageUsed: 2.4,
          storageLimit: 10,
        });

        setActivities([
          {
            id: '1',
            type: 'login',
            description: 'Logged in from new device',
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
          },
          {
            id: '2',
            type: 'security',
            description: 'Two-factor authentication enabled',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          },
          {
            id: '3',
            type: 'upload',
            description: 'Uploaded 3 files',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
          },
          {
            id: '4',
            type: 'payment',
            description: 'Payment received: $99.00',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          },
          {
            id: '5',
            type: 'setting',
            description: 'Updated profile information',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
          },
        ]);
      } catch (error: unknown) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const userInitials =
    session?.user?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'U';

  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN';

  return (
    <div className="space-y-8">
      <DashboardHeader
        userName={session?.user?.name}
        userImage={session?.user?.image}
        userInitials={userInitials}
      />

      <StatsCards stats={stats} loading={loading} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivity activities={activities} />
        <QuickActions isAdmin={isAdmin} />
      </div>

      <AccountStatus mfaEnabled={session?.user?.mfaEnabled} userTier={session?.user?.tier} />
    </div>
  );
}
