'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { BillingSummaryCard } from '@/components/ui/billing-summary-card';

export default function BillingSummaryCardPage() {
  const plan = {
    name: 'Pro',
    price: 29,
    interval: 'month' as const,
    features: ['Unlimited projects', 'Priority support', 'Advanced analytics'],
  };

  const usage = [
    { name: 'API Calls', used: 8500, limit: 10000 },
    { name: 'Storage', used: 4.2, limit: 5, unit: 'GB' },
    { name: 'Team Members', used: 8, limit: 10 },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.108]"
      category="Specialized"
      title="Billing Summary Card"
      description="A subscription status card showing current plan, usage meters, and billing actions. Perfect for SaaS billing dashboards."
      importCode={`import { BillingSummaryCard } from "@/components/ui/billing-summary-card"`}
      mainPreview={{
        preview: (
          <div className="mx-auto w-full max-w-2xl p-4">
            <BillingSummaryCard
              plan={plan}
              status="active"
              currentPeriodEnd={new Date('2025-01-15')}
              usage={usage}
              onUpgrade={() => {}}
              onManageBilling={() => {}}
            />
          </div>
        ),
        code: `<BillingSummaryCard
  plan={{
    name: "Pro",
    price: 29,
    interval: "month",
    features: ["Unlimited projects", "Priority support"],
  }}
  status="active"
  currentPeriodEnd={new Date("2025-01-15")}
  usage={[
    { name: "API Calls", used: 8500, limit: 10000 },
    { name: "Storage", used: 4.2, limit: 5, unit: "GB" },
  ]}
  onUpgrade={() => handleUpgrade()}
  onManageBilling={() => handleManageBilling()}
/>`,
      }}
      variants={[
        {
          title: 'Trial Status',
          description: 'Card showing trial period status.',
          preview: (
            <div className="mx-auto w-full max-w-2xl p-4">
              <BillingSummaryCard
                plan={{ name: 'Pro Trial', price: 0, interval: 'month' }}
                status="trial"
                trialEnd={new Date('2025-01-10')}
                onUpgrade={() => {}}
              />
            </div>
          ),
          code: `<BillingSummaryCard
  plan={{ name: "Pro Trial", price: 0, interval: "month" }}
  status="trial"
  trialEnd={new Date("2025-01-10")}
/>`,
        },
        {
          title: 'Past Due',
          description: 'Card showing payment required status.',
          preview: (
            <div className="mx-auto w-full max-w-2xl p-4">
              <BillingSummaryCard
                plan={{ name: 'Pro', price: 29, interval: 'month' }}
                status="past_due"
                onManageBilling={() => {}}
              />
            </div>
          ),
          code: `<BillingSummaryCard
  plan={{ name: "Pro", price: 29, interval: "month" }}
  status="past_due"
/>`,
        },
        {
          title: 'High Usage Warning',
          description: 'Card with usage approaching limit.',
          preview: (
            <div className="mx-auto w-full max-w-2xl p-4">
              <BillingSummaryCard
                plan={{ name: 'Starter', price: 9, interval: 'month' }}
                status="active"
                usage={[
                  { name: 'API Calls', used: 950, limit: 1000 },
                  { name: 'Storage', used: 1.8, limit: 2, unit: 'GB' },
                ]}
                onUpgrade={() => {}}
              />
            </div>
          ),
          code: `<BillingSummaryCard
  plan={{ name: "Starter", price: 9, interval: "month" }}
  status="active"
  usage={[
    { name: "API Calls", used: 950, limit: 1000 },
    { name: "Storage", used: 1.8, limit: 2, unit: "GB" },
  ]}
/>`,
        },
      ]}
      props={[
        {
          name: 'plan',
          type: 'BillingPlan',
          required: true,
          description: 'Current plan details (name, price, interval, features).',
        },
        {
          name: 'status',
          type: '"active" | "trial" | "past_due" | "canceled" | "paused"',
          required: true,
          description: 'Billing status.',
        },
        {
          name: 'currentPeriodEnd',
          type: 'Date',
          description: 'Current billing period end date.',
        },
        {
          name: 'trialEnd',
          type: 'Date',
          description: 'Trial end date (when status is trial).',
        },
        {
          name: 'usage',
          type: 'UsageItem[]',
          description: 'Array of usage items to display.',
        },
        {
          name: 'onUpgrade',
          type: '() => void',
          description: 'Upgrade button click handler.',
        },
        {
          name: 'onManageBilling',
          type: '() => void',
          description: 'Manage billing click handler.',
        },
        {
          name: 'onCancel',
          type: '() => void',
          description: 'Cancel subscription click handler.',
        },
        {
          name: 'showUpgrade',
          type: 'boolean',
          default: 'true',
          description: 'Show upgrade button.',
        },
      ]}
      accessibility={[
        'Status badges with icons for color-blind users',
        'Progress bars with text labels',
        'Semantic button labels',
        'Live region for dynamic updates',
      ]}
      previous={{
        title: 'Code Generator',
        href: '/docs/components/code-generator',
      }}
      next={{ title: 'Invite Form', href: '/docs/components/invite-form' }}
    />
  );
}
