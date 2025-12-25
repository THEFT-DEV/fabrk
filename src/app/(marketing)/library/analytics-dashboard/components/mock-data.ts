/**
 * ✅ FABRK COMPONENT
 * Mock Data - Sample data for analytics dashboard
 */

import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import type { MetricData } from './metric-cards';
import type { RevenueDataPoint } from './revenue-chart';
import type { ActivityItem } from './activity-feed';
import type { PageData, TrafficSource, DeviceData } from './analytics-tabs';

export const metrics: MetricData[] = [
  {
    id: 'revenue',
    title: 'TOTAL REVENUE',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
    status: 'INCREASING',
  },
  {
    id: 'users',
    title: 'ACTIVE USERS',
    value: '2,350',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    status: 'GROWING',
  },
  {
    id: 'conversions',
    title: 'CONVERSIONS',
    value: '12.5%',
    change: '-2.4%',
    trend: 'down',
    icon: Activity,
    status: 'DECLINING',
  },
  {
    id: 'growth',
    title: 'GROWTH RATE',
    value: '+28%',
    change: '+8.2%',
    trend: 'up',
    icon: TrendingUp,
    status: 'ACCELERATING',
  },
];

export const revenueData: RevenueDataPoint[] = [
  { month: 'JAN', revenue: 32000, height: 55 },
  { month: 'FEB', revenue: 42000, height: 70 },
  { month: 'MAR', revenue: 38000, height: 65 },
  { month: 'APR', revenue: 54000, height: 85 },
  { month: 'MAY', revenue: 57000, height: 90 },
  { month: 'JUN', revenue: 63000, height: 100 },
];

export const activityData: ActivityItem[] = [
  {
    user: 'John Doe',
    action: 'Purchased Pro Plan',
    time: '2m ago',
    type: 'PURCHASE',
  },
  { user: 'Jane Smith', action: 'Signed up', time: '15m ago', type: 'SIGNUP' },
  {
    user: 'Bob Wilson',
    action: 'Upgraded account',
    time: '1h ago',
    type: 'UPGRADE',
  },
  {
    user: 'Alice Brown',
    action: 'Left feedback',
    time: '2h ago',
    type: 'FEEDBACK',
  },
  {
    user: 'Charlie Davis',
    action: 'Referred friend',
    time: '3h ago',
    type: 'REFERRAL',
  },
];

export const pageData: PageData[] = [
  { page: '/landing', views: '12,453', bounce: '32%', conversion: '8.2%' },
  { page: '/pricing', views: '8,932', bounce: '28%', conversion: '12.5%' },
  { page: '/features', views: '6,721', bounce: '45%', conversion: '3.1%' },
  { page: '/about', views: '4,562', bounce: '52%', conversion: '1.8%' },
  { page: '/blog', views: '3,891', bounce: '38%', conversion: '4.2%' },
];

export const trafficSources: TrafficSource[] = [
  { source: 'Organic Search', percentage: 45 },
  { source: 'Direct', percentage: 30 },
  { source: 'Social Media', percentage: 15 },
  { source: 'Referral', percentage: 10 },
];

export const deviceBreakdown: DeviceData[] = [
  { device: 'Desktop', percentage: 55 },
  { device: 'Mobile', percentage: 35 },
  { device: 'Tablet', percentage: 10 },
];
