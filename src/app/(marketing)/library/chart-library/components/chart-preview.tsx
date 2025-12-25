/* eslint-disable design-system/no-inline-styles */
/**
 * Chart Library Preview Component
 * Live preview of all chart types
 */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { TemplatePreviewWrapper } from '@/components/library';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { TrendingUp, Download } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import {
  revenueData,
  userGrowthData,
  trafficSourceData,
  conversionFunnelData,
} from '../data/chart-data';

// Recharts tooltip props type
interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

export function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className={cn(mode.font, 'border-border bg-card border p-4 text-xs')}>
        <p className="mb-1 font-semibold">{label}</p>
        {payload.map((entry: TooltipPayload, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            <span className="font-semibold">{entry.name}:</span> ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function ChartLibraryPreview() {
  const [activeTab, setActiveTab] = useState('line');

  const tabs = [
    { id: 'line', label: 'LINE CHART' },
    { id: 'area', label: 'AREA CHART' },
    { id: 'bar', label: 'BAR CHART' },
    { id: 'pie', label: 'PIE CHART' },
  ];

  return (
    <TemplatePreviewWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn(mode.font, 'text-2xl font-semibold')}>Chart Library</h1>
            <p className="text-muted-foreground text-sm">
              Recharts visualization components for data-driven dashboards
            </p>
          </div>
          <Button className={cn(mode.radius, mode.font, 'text-xs')}>
            <Download className="mr-2 h-4 w-4" />
            &gt; VIEW DOCS
          </Button>
        </div>

        {/* Stats - Terminal Style */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="border-border bg-card border p-4">
            <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>
              [TOTAL REVENUE]:
            </div>
            <div className="text-4xl font-semibold">$91.9K</div>
            <div className={cn(mode.font, 'text-success mt-1 flex items-center gap-1 text-xs')}>
              <TrendingUp className="h-3 w-3" />
              +23.5%
            </div>
          </div>
          <div className="border-border bg-card border p-4">
            <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>
              [ACTIVE USERS]:
            </div>
            <div className="text-4xl font-semibold">12.5K</div>
            <div className={cn(mode.font, 'text-success mt-1 flex items-center gap-1 text-xs')}>
              <TrendingUp className="h-3 w-3" />
              +941%
            </div>
          </div>
          <div className="border-border bg-card border p-4">
            <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>
              [CONVERSION RATE]:
            </div>
            <div className="text-4xl font-semibold">4.5%</div>
            <div className={cn(mode.font, 'text-success mt-1 flex items-center gap-1 text-xs')}>
              <TrendingUp className="h-3 w-3" />
              +0.8%
            </div>
          </div>
          <div className="border-border bg-card border p-4">
            <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>
              [AVG ORDER VALUE]:
            </div>
            <div className="text-4xl font-semibold">$89</div>
            <div className={cn(mode.font, 'text-destructive mt-1 flex items-center gap-1 text-xs')}>
              <TrendingUp className="h-3 w-3 rotate-180" />
              -2.3%
            </div>
          </div>
        </div>

        {/* Chart Tabs - Terminal Style */}
        <StyledTabs
          code="0x00"
          title="CHART NAVIGATION"
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          {/* Line Chart */}
          <StyledTabsContent value="line">
            <Card>
              <CardHeader code="0x01" title="REVENUE_OVERVIEW" />
              <div className="p-4">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: 'oklch(var(--border))' }}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: 'oklch(var(--border))' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="oklch(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="oklch(var(--destructive))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="oklch(var(--success))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </StyledTabsContent>

          {/* Area Chart */}
          <StyledTabsContent value="area">
            <Card>
              <CardHeader code="0x01" title="USER_GROWTH" />
              <div className="p-4">
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: 'oklch(var(--border))' }}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: 'oklch(var(--border))' }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'oklch(var(--card))',
                        border: '1px solid oklch(var(--border))',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="oklch(var(--primary))"
                      strokeWidth={2}
                      fillOpacity={0.3}
                      fill="oklch(var(--primary))"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </StyledTabsContent>

          {/* Bar Chart */}
          <StyledTabsContent value="bar">
            <Card>
              <CardHeader code="0x01" title="CONVERSION_FUNNEL" />
              <div className="p-4">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={conversionFunnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: 'oklch(var(--border))' }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                    />
                    <YAxis
                      type="category"
                      dataKey="stage"
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: 'oklch(var(--border))' }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'oklch(var(--card))',
                        border: '1px solid oklch(var(--border))',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="count" fill="oklch(var(--primary))" radius={[0, 0, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </StyledTabsContent>

          {/* Pie Chart */}
          <StyledTabsContent value="pie">
            <Card>
              <CardHeader code="0x01" title="TRAFFIC_SOURCES" />
              <div className="p-4">
                <div className="flex items-center justify-center gap-12">
                  <ResponsiveContainer width={400} height={400}>
                    <PieChart>
                      <Pie
                        data={trafficSourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={140}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {trafficSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'oklch(var(--card))',
                          border: '1px solid oklch(var(--border))',
                          fontSize: '12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    {trafficSourceData.map((source, idx) => (
                      <div key={idx} className={cn(mode.font, 'flex items-center gap-4 text-sm')}>
                        {}
                        <div
                          className="border-border h-4 w-4 border"
                          style={{ backgroundColor: source.color }}
                        />
                        <span className="w-32">{source.name}</span>
                        <div className="text-right">
                          <div className="font-semibold">{source.value.toLocaleString()}</div>
                          <div className="text-muted-foreground">
                            {(
                              (source.value / trafficSourceData.reduce((a, b) => a + b.value, 0)) *
                              100
                            ).toFixed(1)}
                            %
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </StyledTabsContent>
        </StyledTabs>
      </div>
    </TemplatePreviewWrapper>
  );
}
