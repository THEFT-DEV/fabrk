/**
 * ✅ FABRK COMPONENT
 * Component exports for Analytics Dashboard
 */

export { MetricCards } from './metric-cards';
export type { MetricData } from './metric-cards';

export { RevenueChart } from './revenue-chart';
export type { RevenueDataPoint } from './revenue-chart';

export { ActivityFeed } from './activity-feed';
export type { ActivityItem } from './activity-feed';

export { AnalyticsTabs } from './analytics-tabs';
export type { PageData, TrafficSource, DeviceData } from './analytics-tabs';

export {
  metrics,
  revenueData,
  activityData,
  pageData,
  trafficSources,
  deviceBreakdown,
} from './mock-data';
