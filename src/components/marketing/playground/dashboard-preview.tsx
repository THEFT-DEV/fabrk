/**
 * Dashboard Preview - Analytics dashboard demo for hero playground
 */
'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { BrowserFrame } from './browser-frame';
import { LeftNavigation } from './left-navigation';

// Analytics Dashboard components
import { MetricCards } from '@/app/(marketing)/library/analytics-dashboard/components/metric-cards';
import { RevenueChart } from '@/app/(marketing)/library/analytics-dashboard/components/revenue-chart';
import { ActivityFeed } from '@/app/(marketing)/library/analytics-dashboard/components/activity-feed';
import { AnalyticsTabs } from '@/app/(marketing)/library/analytics-dashboard/components/analytics-tabs';
import {
  metrics,
  revenueData,
  activityData,
  pageData,
  trafficSources,
  deviceBreakdown,
} from '@/app/(marketing)/library/analytics-dashboard/components/mock-data';

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <BrowserFrame>
      <LeftNavigation activeSection="dashboard" />
      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className={cn(mode.font, 'text-2xl font-semibold')}>Analytics Dashboard</h1>
              <p className="text-muted-foreground text-sm">
                Track revenue, users, conversions, and growth metrics
              </p>
            </div>
            <Button className={cn(mode.radius, mode.font, 'text-xs')}>
              <Download className="mr-2 h-4 w-4" />
              &gt; EXPORT DATA
            </Button>
          </div>

          {/* Metric Cards - Reduced font sizes for playground */}
          <div className="[&_.text-4xl]:text-xl! [&_.text-xs]:text-xs!">
            <MetricCards metrics={metrics} />
          </div>

          {/* Charts Section - Hide CardHeaders */}
          <div className="grid gap-4 lg:grid-cols-7 [&_>*>*:first-child]:hidden">
            <RevenueChart data={revenueData} />
            <ActivityFeed activities={activityData} />
          </div>

          {/* Tabs Section - Hide CardHeader */}
          <div className="[&_>*>*:first-child]:hidden">
            <AnalyticsTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              pageData={pageData}
              trafficSources={trafficSources}
              deviceBreakdown={deviceBreakdown}
            />
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
