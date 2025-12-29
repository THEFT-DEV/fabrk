/**
 * ✅ FABRK COMPONENT
 * Analytics Tabs - Overview, Analytics, and Reports sections
 */

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { Download, BarChart3 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export interface PageData {
  page: string;
  views: string;
  bounce: string;
  conversion: string;
}

export interface TrafficSource {
  source: string;
  percentage: number;
}

export interface DeviceData {
  device: string;
  percentage: number;
}

interface AnalyticsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  pageData: PageData[];
  trafficSources: TrafficSource[];
  deviceBreakdown: DeviceData[];
}

export function AnalyticsTabs({
  activeTab,
  onTabChange,
  pageData,
  trafficSources,
  deviceBreakdown,
}: AnalyticsTabsProps) {
  const tabs = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'analytics', label: 'ANALYTICS' },
    { id: 'reports', label: 'REPORTS' },
  ];

  return (
    <StyledTabs
      code="0x00"
      title="ANALYTICS TABS"
      tabs={tabs}
      value={activeTab}
      onValueChange={onTabChange}
    >
      {/* Overview Tab */}
      <StyledTabsContent value="overview">
        {/* Terminal Table */}
        <div className={cn('border-border border', mode.radius)}>
          <div
            className={cn(
              mode.font,
              'border-border bg-muted/30 grid grid-cols-4 border-b px-4 py-2 text-xs'
            )}
          >
            <span className="text-muted-foreground">[PAGE]</span>
            <span className="text-muted-foreground">[VIEWS]</span>
            <span className="text-muted-foreground">[BOUNCE]</span>
            <span className="text-muted-foreground">[CONVERSION]</span>
          </div>
          <div className="divide-border divide-y">
            {pageData.map((row, i) => (
              <div
                key={i}
                className={cn(mode.font, 'hover:bg-muted/30 grid grid-cols-4 px-4 py-4 text-xs')}
              >
                <span className="text-foreground">{row.page}</span>
                <span className="text-muted-foreground">{row.views}</span>
                <span className="text-muted-foreground">{row.bounce}</span>
                <span className={cn('border-border block w-20 border px-2 py-0.5 text-center', mode.radius)}>
                  {row.conversion}
                </span>
              </div>
            ))}
          </div>
        </div>
      </StyledTabsContent>

      {/* Analytics Tab */}
      <StyledTabsContent value="analytics">
        <div className={cn('border-border bg-card border p-4', mode.radius)}>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Traffic Sources */}
            <div className={cn('border-border border p-4', mode.radius)}>
              <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
                [TRAFFIC SOURCES]:
              </div>
              <div className="space-y-4">
                {trafficSources.map((source, i) => (
                  <div key={i} className="space-y-1">
                    <div className={cn(mode.font, 'flex items-center justify-between text-xs')}>
                      <span className="text-foreground">{source.source}</span>
                      <span className="text-muted-foreground">{source.percentage}%</span>
                    </div>
                    <Progress value={source.percentage} size="sm" barWidth={15} />
                  </div>
                ))}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className={cn('border-border border p-4', mode.radius)}>
              <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
                [DEVICE BREAKDOWN]:
              </div>
              <div className="space-y-4">
                {deviceBreakdown.map((device, i) => (
                  <div key={i} className="space-y-1">
                    <div className={cn(mode.font, 'flex items-center justify-between text-xs')}>
                      <span className="text-foreground">{device.device}</span>
                      <span className="text-muted-foreground">{device.percentage}%</span>
                    </div>
                    <Progress value={device.percentage} size="sm" barWidth={15} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </StyledTabsContent>

      {/* Reports Tab */}
      <StyledTabsContent value="reports">
        <div className={cn('border-border bg-card border p-4', mode.radius)}>
          <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
            [AVAILABLE REPORTS]:
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: 'MONTHLY SUMMARY', desc: 'Overview of all metrics' },
              { name: 'USER BEHAVIOR', desc: 'Detailed user journey analysis' },
              {
                name: 'REVENUE REPORT',
                desc: 'Financial performance breakdown',
              },
              { name: 'CUSTOM REPORT', desc: 'Build your own report' },
            ].map((report, i) => (
              <div key={i} className={cn('border-border border p-4', mode.radius)}>
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className={cn(mode.font, 'text-foreground text-xs')}>[{report.name}]</div>
                    <div className={cn(mode.font, 'text-muted-foreground mt-1 text-xs')}>
                      {report.desc}
                    </div>
                  </div>
                  <BarChart3 className="text-muted-foreground h-4 w-4" />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(mode.radius, mode.font, 'w-full text-xs')}
                >
                  <Download className="mr-2 h-3 w-3" />
                  &gt; GENERATE
                </Button>
              </div>
            ))}
          </div>
        </div>
      </StyledTabsContent>
    </StyledTabs>
  );
}
