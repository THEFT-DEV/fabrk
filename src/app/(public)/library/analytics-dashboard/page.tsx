/**
 * Analytics Dashboard Template - Terminal console style
 */
'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Components
import { MetricCards } from './components/metric-cards';
import { RevenueChart } from './components/revenue-chart';
import { ActivityFeed } from './components/activity-feed';
import { AnalyticsTabs } from './components/analytics-tabs';

// Mock data
import {
  metrics,
  revenueData,
  activityData,
  pageData,
  trafficSources,
  deviceBreakdown,
} from './components/mock-data';

const templateCode = `"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

// Import your components
import { MetricCards } from "./components/metric-cards";
import { RevenueChart } from "./components/revenue-chart";
import { ActivityFeed } from "./components/activity-feed";
import { AnalyticsTabs } from "./components/analytics-tabs";

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn(mode.font, "text-2xl font-semibold")}>
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Track revenue, users, conversions, and growth metrics
          </p>
        </div>
        <Button className={cn(mode.radius, mode.font, "text-xs")}>
          <Download className="mr-2 h-4 w-4" />
          &gt; EXPORT DATA
        </Button>
      </div>

      {/* Metric Cards */}
      <MetricCards metrics={metrics} />

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-7">
        <RevenueChart data={revenueData} />
        <ActivityFeed activities={activityData} />
      </div>

      {/* Tabs Section */}
      <AnalyticsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pageData={pageData}
        trafficSources={trafficSources}
        deviceBreakdown={deviceBreakdown}
      />
    </div>
  );
}`;

function AnalyticsDashboardPreview() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <TemplatePreviewWrapper>
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

        {/* Metric Cards */}
        <MetricCards metrics={metrics} />

        {/* Charts Section */}
        <div className="grid gap-4 lg:grid-cols-7">
          <RevenueChart data={revenueData} />
          <ActivityFeed activities={activityData} />
        </div>

        {/* Tabs Section */}
        <AnalyticsTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pageData={pageData}
          trafficSources={trafficSources}
          deviceBreakdown={deviceBreakdown}
        />
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function AnalyticsDashboardTemplate() {
  return (
    <TemplateShowcasePage
      badge="ANALYTICS DASHBOARD"
      title="Analytics Dashboard"
      description="Track revenue, users, conversions, and growth metrics"
      templateId="analytics-dashboard"
      category={{ name: 'Dashboards', href: '/library/dashboards' }}
      preview={<AnalyticsDashboardPreview />}
      code={templateCode}
      fileStructure={[
        { path: ['app/', '(dashboard)/', 'analytics/page.tsx'], label: '← Copy template here' },
        { path: ['components/', 'metric-cards.tsx'] },
        { path: ['components/', 'revenue-chart.tsx'] },
        { path: ['components/', 'activity-feed.tsx'] },
        { path: ['components/', 'analytics-tabs.tsx'] },
      ]}
      features={[
        '4 key metric cards (revenue, users, conversions, growth)',
        'Revenue overview chart with 6-month data',
        'Recent activity feed with user avatars',
        'Tabbed analytics section (Overview, Analytics, Reports)',
        'Top performing pages table with bounce rates',
        'Traffic sources breakdown with progress bars',
        'Device breakdown statistics',
        'Report generation templates',
      ]}
    />
  );
}
