'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { StatCard } from '@/components/ui/stat-card';
import { DollarSign, Users, Activity, CreditCard, TrendingUp, ShoppingCart } from 'lucide-react';

export default function StatCardPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.27]"
      title="Stat Card"
      description="A KPI card component for displaying statistics with optional trend indicators, icons, and change percentages."
      importCode={`import { StatCard } from "@/components/ui/stat-card";`}
      mainPreview={{
        preview: (
          <StatCard
            title="Total Revenue"
            value="$45,231"
            change={12}
            trend="up"
            subtitle="from last month"
            icon={<DollarSign className="h-4 w-4" />}
          />
        ),
        code: `<StatCard
  title="Total Revenue"
  value="$45,231"
  change={12}
  trend="up"
  subtitle="from last month"
  icon={<DollarSign className="h-4 w-4" />}
/>`,
      }}
      variants={[
        {
          title: 'Trend Variants',
          description: 'Different trend directions (up, down, neutral)',
          preview: (
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                title="Sales"
                value="12,234"
                change={20}
                trend="up"
                subtitle="from last week"
                icon={<TrendingUp className="h-4 w-4" />}
              />
              <StatCard
                title="Returns"
                value="342"
                change={8}
                trend="down"
                subtitle="from last week"
                icon={<Activity className="h-4 w-4" />}
              />
              <StatCard
                title="Pending"
                value="1,234"
                change={0}
                trend="neutral"
                subtitle="no change"
                icon={<ShoppingCart className="h-4 w-4" />}
              />
            </div>
          ),
          code: `<StatCard
  title="Sales"
  value="12,234"
  change={20}
  trend="up"
  subtitle="from last week"
  icon={<TrendingUp className="h-4 w-4" />}
/>
<StatCard
  title="Returns"
  value="342"
  change={8}
  trend="down"
  subtitle="from last week"
  icon={<Activity className="h-4 w-4" />}
/>
<StatCard
  title="Pending"
  value="1,234"
  change={0}
  trend="neutral"
  subtitle="no change"
  icon={<ShoppingCart className="h-4 w-4" />}
/>`,
        },
        {
          title: 'Without Icons',
          description: 'Minimal stat cards with text only',
          preview: (
            <div className="grid gap-4 md:grid-cols-2">
              <StatCard
                title="Active Users"
                value="2,350"
                change={18}
                trend="up"
                subtitle="from yesterday"
              />
              <StatCard
                title="Bounce Rate"
                value="42.3%"
                change={5}
                trend="down"
                subtitle="from last month"
              />
            </div>
          ),
          code: `<StatCard
  title="Active Users"
  value="2,350"
  change={18}
  trend="up"
  subtitle="from yesterday"
/>
<StatCard
  title="Bounce Rate"
  value="42.3%"
  change={5}
  trend="down"
  subtitle="from last month"
/>`,
        },
        {
          title: 'Without Change',
          description: 'Stat cards without trend information',
          preview: (
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                title="Total Customers"
                value="10,482"
                icon={<Users className="h-4 w-4" />}
              />
              <StatCard title="Revenue" value="$89,234" icon={<DollarSign className="h-4 w-4" />} />
              <StatCard
                title="Transactions"
                value="3,456"
                icon={<CreditCard className="h-4 w-4" />}
              />
            </div>
          ),
          code: `<StatCard
  title="Total Customers"
  value="10,482"
  icon={<Users className="h-4 w-4" />}
/>
<StatCard
  title="Revenue"
  value="$89,234"
  icon={<DollarSign className="h-4 w-4" />}
/>`,
        },
        {
          title: 'Dashboard Grid',
          description: 'Full dashboard layout with multiple metrics',
          preview: (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Revenue"
                value="$45,231.89"
                change={20.1}
                trend="up"
                subtitle="from last month"
                icon={<DollarSign className="h-4 w-4" />}
              />
              <StatCard
                title="Subscriptions"
                value="+2,350"
                change={18}
                trend="up"
                subtitle="from last month"
                icon={<Users className="h-4 w-4" />}
              />
              <StatCard
                title="Sales"
                value="+12,234"
                change={19}
                trend="up"
                subtitle="from last month"
                icon={<CreditCard className="h-4 w-4" />}
              />
              <StatCard
                title="Active Now"
                value="+573"
                change={2}
                trend="up"
                subtitle="from 1 hour ago"
                icon={<Activity className="h-4 w-4" />}
              />
            </div>
          ),
          code: `<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <StatCard
    title="Total Revenue"
    value="$45,231.89"
    change={20.1}
    trend="up"
    subtitle="from last month"
    icon={<DollarSign className="h-4 w-4" />}
  />
  <StatCard
    title="Subscriptions"
    value="+2,350"
    change={18}
    trend="up"
    subtitle="from last month"
    icon={<Users className="h-4 w-4" />}
  />
  {/* More cards... */}
</div>`,
        },
      ]}
      props={[
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'Card title/label',
        },
        {
          name: 'value',
          type: 'string | number',
          required: true,
          description: 'Primary metric value',
        },
        {
          name: 'change',
          type: 'number',
          description: 'Percentage change value',
        },
        {
          name: 'trend',
          type: '"up" | "down" | "neutral"',
          description: 'Trend direction indicator',
        },
        {
          name: 'subtitle',
          type: 'string',
          description: 'Additional context text',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: 'Icon to display (typically Lucide icon)',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ]}
      accessibility={[
        'Uses Card component with semantic structure',
        'Title uses medium weight (font-medium) for clear hierarchy',
        'Value uses large semibold text (text-2xl font-semibold) for prominence',
        'Trend colors follow semantic conventions (green=up, red=down, gray=neutral)',
        'Icons are decorative - meaning is also conveyed through text',
        'Change percentage includes directional arrow icon for visual clarity',
        'All color combinations meet WCAG AA contrast requirements',
      ]}
      previous={{ title: 'Empty State', href: '/docs/components/empty-state' }}
      next={{ title: 'Sparkline', href: '/docs/components/sparkline' }}
    />
  );
}
