/**
 * Chart Library Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, TemplatePageHeader } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Extracted components
import { ChartLibraryPreview } from './components';

const templateCode = `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs";
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
} from "recharts";
import { TrendingUp, Download } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function ChartLibrary() {
  const [activeTab, setActiveTab] = useState("line");

  const tabs = [
    { id: "line", label: "LINE CHART" },
    { id: "area", label: "AREA CHART" },
    { id: "bar", label: "BAR CHART" },
    { id: "pie", label: "PIE CHART" },
  ];

  return (
    <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn(mode.font, "text-2xl font-semibold")}>
            Chart Library
          </h1>
          <p className="text-muted-foreground text-sm">
            Recharts visualization components for data-driven dashboards
          </p>
        </div>
        <Button className={cn(mode.radius, mode.font, "text-xs")}>
          <Download className="mr-2 h-4 w-4" />
          &gt; VIEW DOCS
        </Button>
      </div>

      {/* Stats - Terminal Style */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="border-border bg-card border p-4">
          <div className={cn(mode.font, "text-muted-foreground mb-1 text-xs")}>
            [TOTAL REVENUE]:
          </div>
          <div className="text-4xl font-semibold">$91.9K</div>
          <div className={cn(mode.font, "text-success mt-1 flex items-center gap-1 text-xs")}>
            <TrendingUp className="h-3 w-3" />
            +23.5%
          </div>
        </div>
        {/* Additional stat cards... */}
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
          <div className="border-border bg-card border border-t-0 p-4">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </StyledTabsContent>
        {/* Additional chart tabs... */}
      </StyledTabs>
    </div>
  );
}`;

export default function ChartLibraryTemplate() {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="CHART LIBRARY"
          title="Chart Library"
          description="Recharts visualization components for data-driven dashboards"
        />

        {/* Preview/Code Tabs */}
        <StyledTabs
          code="0x00"
          title="TEMPLATE_PREVIEW"
          tabs={[
            { id: 'preview', label: '[PREVIEW]' },
            { id: 'code', label: '[CODE]' },
          ]}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full min-w-0 overflow-hidden"
        >
          {/* Preview Tab Content */}
          <StyledTabsContent value="preview" className="w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE_PREVIEW" />
              <ChartLibraryPreview />
            </Card>
          </StyledTabsContent>

          {/* Code Tab Content */}
          <StyledTabsContent value="code" className="w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE_CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </StyledTabsContent>
        </StyledTabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">(dashboard)/</span>
                  <span className="text-foreground">charts/page.tsx</span>
                  <span className="text-muted-foreground ml-4">← Copy template here</span>
                </div>
                <div className="text-muted-foreground mt-2">[INSTALL]: npm install recharts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x03" title="FEATURES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-2 text-xs')}>
              <div>
                <span className="text-success">&gt;</span> 4 chart types (Line, Area, Bar,
                Pie/Donut)
              </div>
              <div>
                <span className="text-success">&gt;</span> Recharts library with responsive
                containers
              </div>
              <div>
                <span className="text-success">&gt;</span> Custom tooltips with terminal styling
              </div>
              <div>
                <span className="text-success">&gt;</span> Solid fills with theme colors
              </div>
              <div>
                <span className="text-success">&gt;</span> Custom color schemes matching design
                system
              </div>
              <div>
                <span className="text-success">&gt;</span> Formatted axes (K notation for large
                numbers)
              </div>
              <div>
                <span className="text-success">&gt;</span> Tab navigation between chart types
              </div>
              <div>
                <span className="text-success">&gt;</span> Multi-line, area, bar, and pie chart
                examples
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Note */}
        <Card>
          <CardHeader code="0x04" title="IMPLEMENTATION NOTE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-2 text-xs')}>
              <div className="text-muted-foreground">[USAGE]:</div>
              <div className="space-y-1 pl-4">
                <div>• Replace mock data with your API data</div>
                <div>• Recharts supports Scatter, Radar, Composed, Treemap, and more</div>
                <div>
                  • Customize colors using design system tokens (oklch(var(--primary)), etc.)
                </div>
                <div>• Add animations with animationDuration prop on chart components</div>
                <div>• Use CartesianGrid for grid lines, Legend for chart legends</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
