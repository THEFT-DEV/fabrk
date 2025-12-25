'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { UsageMeter } from '@/components/ui/billing-summary-card';

export default function UsageMeterPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.110]"
      category="Specialized"
      title="Usage Meter"
      description="A progress bar component for displaying resource usage. Shows current vs limit with color-coded warnings when approaching limits."
      importCode={`import { UsageMeter } from "@/components/ui/billing-summary-card"`}
      mainPreview={{
        preview: (
          <div className="mx-auto max-w-md space-y-4 p-4">
            <UsageMeter label="API Calls" used={6500} limit={10000} />
            <UsageMeter label="Storage" used={4.2} limit={5} unit="GB" />
            <UsageMeter label="Team Members" used={8} limit={10} />
          </div>
        ),
        code: `<UsageMeter label="API Calls" used={6500} limit={10000} />
<UsageMeter label="Storage" used={4.2} limit={5} unit="GB" />
<UsageMeter label="Team Members" used={8} limit={10} />`,
      }}
      variants={[
        {
          title: 'Warning State (75%+)',
          description: 'Meter shows warning color when usage is high.',
          preview: (
            <div className="mx-auto max-w-md space-y-4 p-4">
              <UsageMeter label="Storage" used={3.8} limit={5} unit="GB" />
            </div>
          ),
          code: `<UsageMeter label="Storage" used={3.8} limit={5} unit="GB" />`,
        },
        {
          title: 'Critical State (90%+)',
          description: 'Meter shows destructive color when near limit.',
          preview: (
            <div className="mx-auto max-w-md space-y-4 p-4">
              <UsageMeter label="API Calls" used={9500} limit={10000} />
            </div>
          ),
          code: `<UsageMeter label="API Calls" used={9500} limit={10000} />`,
        },
        {
          title: 'Size Variants',
          description: 'Different sizes for various contexts.',
          preview: (
            <div className="mx-auto max-w-md space-y-4 p-4">
              <UsageMeter label="Small" used={50} limit={100} size="sm" />
              <UsageMeter label="Medium" used={50} limit={100} size="md" />
              <UsageMeter label="Large" used={50} limit={100} size="lg" />
            </div>
          ),
          code: `<UsageMeter label="Small" used={50} limit={100} size="sm" />
<UsageMeter label="Medium" used={50} limit={100} size="md" />
<UsageMeter label="Large" used={50} limit={100} size="lg" />`,
        },
        {
          title: 'Without Percentage',
          description: 'Hide percentage display.',
          preview: (
            <div className="mx-auto max-w-md space-y-4 p-4">
              <UsageMeter
                label="Bandwidth"
                used={450}
                limit={1000}
                unit="MB"
                showPercentage={false}
              />
            </div>
          ),
          code: `<UsageMeter
  label="Bandwidth"
  used={450}
  limit={1000}
  unit="MB"
  showPercentage={false}
/>`,
        },
      ]}
      props={[
        {
          name: 'label',
          type: 'string',
          required: true,
          description: 'Meter label text.',
        },
        {
          name: 'used',
          type: 'number',
          required: true,
          description: 'Current usage value.',
        },
        {
          name: 'limit',
          type: 'number',
          required: true,
          description: 'Maximum limit value.',
        },
        {
          name: 'unit',
          type: 'string',
          description: "Unit label (e.g., 'GB', 'MB').",
        },
        {
          name: 'showPercentage',
          type: 'boolean',
          default: 'true',
          description: 'Show percentage in display.',
        },
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'Progress bar size.',
        },
      ]}
      usageExamples={[
        {
          title: 'Billing Summary Card',
          description:
            'Show multiple resource usage meters in a billing summary. Client-side only, pass data as props.',
          code: `import { UsageMeter } from '@/components/ui/billing-summary-card';

export function BillingCard({ usage }: { usage: UsageData }) {
  return (
    <div className="space-y-4">
      <h3>Resource Usage</h3>

      {/* API calls meter */}
      <UsageMeter
        label="API Calls"
        used={usage.apiCalls}
        limit={10000}
        showPercentage={true}
      />

      {/* Storage meter with unit */}
      <UsageMeter
        label="Storage"
        used={usage.storage}
        limit={5}
        unit="GB"
        size="md"
      />

      {/* Team members (no percentage) */}
      <UsageMeter
        label="Team Members"
        used={usage.teamMembers}
        limit={10}
        showPercentage={false}
      />
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Color-Coded Warnings',
          description: 'Automatically changes color at 75% and 90% thresholds:',
          code: `// < 75%: Primary (blue/brand color)
<UsageMeter label="Normal" used={500} limit={1000} />

// 75-89%: Warning (yellow/amber)
<UsageMeter label="High" used={800} limit={1000} />

// ≥ 90%: Destructive (red)
<UsageMeter label="Critical" used={950} limit={1000} />`,
          language: 'tsx',
        },
        {
          title: 'Dashboard Integration',
          description: 'Fetch usage data from your API and display with meters:',
          code: `'use client';

import { useEffect, useState } from 'react';
import { UsageMeter } from '@/components/ui/billing-summary-card';

export function UsageDashboard() {
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    fetch('/api/usage').then(r => r.json()).then(setUsage);
  }, []);

  if (!usage) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <UsageMeter
        label="API Calls"
        used={usage.apiCalls}
        limit={usage.apiLimit}
      />
      <UsageMeter
        label="Storage"
        used={usage.storageGB}
        limit={usage.storageLimit}
        unit="GB"
      />
    </div>
  );
}`,
          language: 'tsx',
        },
      ]}
      accessibility={[
        'Progress value communicated via text',
        'Color-coded states with text fallback',
        'Semantic progress structure',
        'Unit labels for clarity',
      ]}
      previous={{ title: 'Simple Icon', href: '/docs/components/simple-icon' }}
      next={{ title: 'Overview', href: '/docs/components/overview' }}
    />
  );
}
