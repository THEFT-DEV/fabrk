'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { KpiCard } from '@/components/ui/kpi-card';
import { DollarSign, Users, TrendingUp, Activity } from 'lucide-react';

export default function KpiCardPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.40]"
      category="Components"
      title="KPI Card"
      description="Key Performance Indicator card component with value, trend, and optional icon for displaying metrics."
      importCode={`import { KpiCard } from "@/components/ui/kpi-card";`}
      mainPreview={{
        preview: (
          <div className="border-border bg-background border p-6 font-mono">
            <div className="text-muted-foreground mb-4 font-mono text-xs">
              [METRICS]: REVENUE_INDICATOR
            </div>
            <KpiCard
              title="Total Revenue"
              value="$45,231"
              change={12}
              trend="up"
              subtitle="from last month"
            />
          </div>
        ),
        code: `<KpiCard
  title="Total Revenue"
  value="$45,231"
  change={12}
  trend="up"
  subtitle="from last month"
/>`,
      }}
      variants={[
        {
          title: 'With Icon',
          description: 'KPI card with custom icon',
          preview: (
            <div className="border-border bg-background grid gap-4 border p-6 font-mono md:grid-cols-2">
              <div>
                <div className="text-muted-foreground mb-2 font-mono text-xs">[KPI_01]:</div>
                <KpiCard
                  title="Revenue"
                  value="$45,231"
                  change={12}
                  trend="up"
                  icon={<DollarSign className="h-4 w-4" />}
                />
              </div>
              <div>
                <div className="text-muted-foreground mb-2 font-mono text-xs">[KPI_02]:</div>
                <KpiCard
                  title="Active Users"
                  value="2,350"
                  change={8}
                  trend="up"
                  icon={<Users className="h-4 w-4" />}
                />
              </div>
            </div>
          ),
          code: `<KpiCard
  title="Revenue"
  value="$45,231"
  change={12}
  trend="up"
  icon={<DollarSign className="h-4 w-4" />}
/>

<KpiCard
  title="Active Users"
  value="2,350"
  change={8}
  trend="up"
  icon={<Users className="h-4 w-4" />}
/>`,
        },
        {
          title: 'Downward Trend',
          description: 'Display negative changes with down trend',
          preview: (
            <div className="border-border bg-background border p-6 font-mono">
              <div className="text-muted-foreground mb-4 font-mono text-xs">
                [ALERT]: DECLINING_METRIC
              </div>
              <KpiCard
                title="Bounce Rate"
                value="42.5%"
                change={5.2}
                trend="down"
                subtitle="vs. last week"
                icon={<Activity className="h-4 w-4" />}
              />
            </div>
          ),
          code: `<KpiCard
  title="Bounce Rate"
  value="42.5%"
  change={5.2}
  trend="down"
  subtitle="vs. last week"
  icon={<Activity className="h-4 w-4" />}
/>`,
        },
        {
          title: 'Neutral Trend',
          description: 'Show no significant change with neutral indicator',
          preview: (
            <div className="border-border bg-background border p-6 font-mono">
              <div className="text-muted-foreground mb-4 font-mono text-xs">
                [STATUS]: STABLE_METRIC
              </div>
              <KpiCard
                title="Conversion Rate"
                value="3.2%"
                change={0.1}
                trend="neutral"
                subtitle="no significant change"
              />
            </div>
          ),
          code: `<KpiCard
  title="Conversion Rate"
  value="3.2%"
  change={0.1}
  trend="neutral"
  subtitle="no significant change"
/>`,
        },
        {
          title: 'Without Change Indicator',
          description: 'Simple KPI card without trend',
          preview: (
            <div className="border-border bg-background border p-6 font-mono">
              <div className="text-muted-foreground mb-4 font-mono text-xs">
                [METRIC]: TOTAL_ORDERS
              </div>
              <KpiCard title="Total Orders" value="1,234" subtitle="all time" />
            </div>
          ),
          code: `<KpiCard
  title="Total Orders"
  value="1,234"
  subtitle="all time"
/>`,
        },
        {
          title: 'Dashboard Grid',
          description: 'Multiple KPI cards in a grid layout',
          preview: (
            <div className="border-border bg-background border p-6 font-mono">
              <div className="text-muted-foreground mb-4 font-mono text-xs">
                [DASHBOARD]: OVERVIEW_METRICS
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                  title="Revenue"
                  value="$45,231"
                  change={12}
                  trend="up"
                  icon={<DollarSign className="h-4 w-4" />}
                />
                <KpiCard
                  title="Users"
                  value="2,350"
                  change={8}
                  trend="up"
                  icon={<Users className="h-4 w-4" />}
                />
                <KpiCard
                  title="Growth"
                  value="+18%"
                  change={3}
                  trend="up"
                  icon={<TrendingUp className="h-4 w-4" />}
                />
                <KpiCard
                  title="Active"
                  value="573"
                  change={2}
                  trend="neutral"
                  icon={<Activity className="h-4 w-4" />}
                />
              </div>
            </div>
          ),
          code: `<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <KpiCard title="Revenue" value="$45,231" change={12} trend="up" />
  <KpiCard title="Users" value="2,350" change={8} trend="up" />
  <KpiCard title="Growth" value="+18%" change={3} trend="up" />
  <KpiCard title="Active" value="573" change={2} trend="neutral" />
</div>`,
        },
      ]}
      props={[
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'The KPI label/title',
        },
        {
          name: 'value',
          type: 'string | number',
          required: true,
          description: 'The primary value to display',
        },
        {
          name: 'change',
          type: 'number',
          description: 'Percentage change value (absolute value displayed)',
        },
        {
          name: 'trend',
          type: '"up" | "down" | "neutral"',
          description: 'Trend direction with corresponding color',
        },
        {
          name: 'subtitle',
          type: 'string',
          description: 'Additional context text below the change indicator',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: 'Icon element to display in the header',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the card',
        },
      ]}
      accessibility={[
        'Uses Card component with semantic structure',
        'Trend icons use lucide-react with proper sizing',
        'Color-coded trends: success (up), destructive (down), muted (neutral)',
        'Change values automatically use Math.abs for display',
        'Title uses CardTitle for proper heading hierarchy',
        'All text uses design tokens for theme compatibility',
      ]}
      previous={{ title: 'Heatmap', href: '/docs/components/heatmap' }}
      next={{ title: 'Member Card', href: '/docs/components/member-card' }}
    />
  );
}
