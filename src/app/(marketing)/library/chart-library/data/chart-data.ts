/**
 * Chart Library - Mock Data
 * Sample datasets for chart visualizations
 */

export const revenueData = [
  { month: 'Jan', revenue: 4500, expenses: 2800, profit: 1700 },
  { month: 'Feb', revenue: 5200, expenses: 3100, profit: 2100 },
  { month: 'Mar', revenue: 4800, expenses: 2900, profit: 1900 },
  { month: 'Apr', revenue: 6100, expenses: 3400, profit: 2700 },
  { month: 'May', revenue: 7200, expenses: 3800, profit: 3400 },
  { month: 'Jun', revenue: 6800, expenses: 3600, profit: 3200 },
  { month: 'Jul', revenue: 7500, expenses: 4000, profit: 3500 },
  { month: 'Aug', revenue: 8200, expenses: 4300, profit: 3900 },
  { month: 'Sep', revenue: 7800, expenses: 4100, profit: 3700 },
  { month: 'Oct', revenue: 8500, expenses: 4500, profit: 4000 },
  { month: 'Nov', revenue: 9100, expenses: 4800, profit: 4300 },
  { month: 'Dec', revenue: 10200, expenses: 5200, profit: 5000 },
];

export const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1850 },
  { month: 'Mar', users: 2300 },
  { month: 'Apr', users: 3100 },
  { month: 'May', users: 4200 },
  { month: 'Jun', users: 5100 },
  { month: 'Jul', users: 6300 },
  { month: 'Aug', users: 7500 },
  { month: 'Sep', users: 8400 },
  { month: 'Oct', users: 9800 },
  { month: 'Nov', users: 11200 },
  { month: 'Dec', users: 12500 },
];

export const trafficSourceData = [
  { name: 'Organic Search', value: 4200, color: 'oklch(var(--success))' },
  { name: 'Direct', value: 2800, color: 'oklch(var(--muted-foreground))' },
  { name: 'Social Media', value: 1900, color: 'oklch(var(--primary))' },
  { name: 'Referral', value: 1200, color: 'oklch(var(--warning))' },
  { name: 'Email', value: 800, color: 'oklch(var(--destructive))' },
];

export const conversionFunnelData = [
  { stage: 'Visitors', count: 10000 },
  { stage: 'Sign Ups', count: 2500 },
  { stage: 'Trial', count: 1200 },
  { stage: 'Paid', count: 450 },
  { stage: 'Retained', count: 380 },
];

export const chartTabs = [
  { id: 'line', label: 'LINE CHART' },
  { id: 'area', label: 'AREA CHART' },
  { id: 'bar', label: 'BAR CHART' },
  { id: 'pie', label: 'PIE CHART' },
];
