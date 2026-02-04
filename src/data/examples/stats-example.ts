/**
 * Generic Stats Example
 *
 * Replace with your actual product metrics.
 * These are format examples showing the expected structure.
 */

import { Users, DollarSign, TrendingUp, Zap } from 'lucide-react';

export const STATS_EXAMPLE = [
  {
    id: 'users',
    label: 'Active Users',
    value: '10,000+',
    icon: Users,
    description: 'Growing user base across all platforms',
  },
  {
    id: 'revenue',
    label: 'Monthly Revenue',
    value: '$50K',
    icon: DollarSign,
    description: 'Recurring monthly revenue from subscriptions',
  },
  {
    id: 'satisfaction',
    label: 'Customer Satisfaction',
    value: '98%',
    icon: TrendingUp,
    description: 'Based on customer surveys and feedback',
  },
  {
    id: 'uptime',
    label: 'Uptime',
    value: '99.9%',
    icon: Zap,
    description: 'Reliable service with minimal downtime',
  },
] as const;

// Simpler stats version (just numbers)
export const SIMPLE_STATS_EXAMPLE = [
  {
    id: 'projects',
    label: 'Projects Built',
    value: '5,000+',
  },
  {
    id: 'developers',
    label: 'Developers',
    value: '2,500+',
  },
  {
    id: 'countries',
    label: 'Countries',
    value: '120+',
  },
] as const;
