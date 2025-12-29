'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { PlanSelector } from '@/components/ui/billing-summary-card';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    interval: 'month' as const,
    description: 'For individuals and small projects',
    features: ['5 projects', '1GB storage', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month' as const,
    description: 'For growing teams',
    features: ['Unlimited projects', '10GB storage', 'Priority support', 'API access'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'month' as const,
    description: 'For large organizations',
    features: [
      'Unlimited everything',
      '100GB storage',
      '24/7 support',
      'Custom integrations',
      'SLA',
    ],
  },
];

export default function PlanSelectorPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.109]"
      category="Specialized"
      title="Plan Selector"
      description="A pricing plan selection component for upgrade flows. Shows plan cards with features, popular badge, and selection state."
      importCode={`import { PlanSelector } from "@/components/ui/billing-summary-card"`}
      mainPreview={{
        preview: (
          <div className="p-4">
            <PlanSelector plans={plans} selectedPlanId="pro" onSelectPlan={() => {}} />
          </div>
        ),
        code: `const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 9,
    interval: "month",
    description: "For individuals",
    features: ["5 projects", "1GB storage", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    interval: "month",
    description: "For growing teams",
    features: ["Unlimited projects", "10GB storage", "Priority support"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    interval: "month",
    description: "For large organizations",
    features: ["Unlimited everything", "100GB storage", "24/7 support"],
  },
];

<PlanSelector
  plans={plans}
  selectedPlanId="pro"
  onSelectPlan={(id) => handleSelectPlan(id)}
/>`,
      }}
      variants={[
        {
          title: 'With Current Plan',
          description: 'Showing which plan is currently active.',
          preview: (
            <div className="p-4">
              <PlanSelector
                plans={[{ ...plans[0], current: true }, plans[1], plans[2]]}
                onSelectPlan={() => {}}
              />
            </div>
          ),
          code: `<PlanSelector
  plans={[
    { ...starterPlan, current: true },
    proPlan,
    enterprisePlan,
  ]}
  onSelectPlan={handleSelectPlan}
/>`,
        },
      ]}
      props={[
        {
          name: 'plans',
          type: 'PlanOption[]',
          required: true,
          description: 'Array of available plans.',
        },
        {
          name: 'selectedPlanId',
          type: 'string',
          description: 'Currently selected plan ID.',
        },
        {
          name: 'onSelectPlan',
          type: '(planId: string) => void',
          description: 'Plan selection handler.',
        },
      ]}
      usageExamples={[
        {
          title: 'Upgrade Flow Integration',
          description: 'Complete example showing plan selection with Stripe checkout:',
          code: `'use client';

import { useState } from 'react';
import { PlanSelector } from '@/components/ui/billing-summary-card';
import { useRouter } from 'next/navigation';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    interval: 'month' as const,
    description: 'For individuals',
    features: ['1,000 credits/month', '5 projects', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month' as const,
    description: 'For growing teams',
    features: ['10,000 credits/month', 'Unlimited projects', 'Priority support'],
    popular: true,
  },
];

export default function UpgradePage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [loading, setLoading] = useState(false);

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    setLoading(true);

    // Create Stripe checkout session
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: planId }),
    });

    const { url } = await res.json();
    router.push(url); // Redirect to Stripe
  };

  return (
    <PlanSelector
      plans={plans}
      selectedPlanId={selectedPlan}
      onSelectPlan={handleSelectPlan}
    />
  );
}`,
          language: 'tsx',
        },
        {
          title: 'With Current Plan Indicator',
          description: "Show which plan the user is currently on (disables that plan's button):",
          code: `const plans = [
  { id: 'free', name: 'Free', price: 0, interval: 'month',
    features: ['100 credits/month'], current: true },
  { id: 'starter', name: 'Starter', price: 9, interval: 'month',
    features: ['1,000 credits/month'] },
  { id: 'pro', name: 'Pro', price: 29, interval: 'month',
    features: ['10,000 credits/month'], popular: true },
];

<PlanSelector plans={plans} onSelectPlan={handleUpgrade} />`,
          language: 'tsx',
        },
        {
          title: 'PlanOption Interface',
          description: 'Complete TypeScript interface for plan data:',
          code: `interface PlanOption {
  id: string;              // Unique plan ID
  name: string;            // Display name
  price: number;           // Monthly price in dollars
  interval: "month" | "year";
  description?: string;    // Short description
  features: string[];      // Feature list
  popular?: boolean;       // Shows "POPULAR" badge
  current?: boolean;       // Shows "CURRENT" badge, disables button
}`,
          language: 'typescript',
        },
        {
          title: 'Fetch Plans from API',
          description: 'Load plans dynamically from your backend:',
          code: `'use client';

import { useEffect, useState } from 'react';
import { PlanSelector } from '@/components/ui/billing-summary-card';

export function PricingPage() {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    // Fetch available plans
    fetch('/api/billing/plans')
      .then(r => r.json())
      .then(data => {
        setPlans(data.plans);
        setCurrentPlan(data.currentPlanId);
      });
  }, []);

  return (
    <PlanSelector
      plans={plans}
      selectedPlanId={currentPlan}
      onSelectPlan={(id) => handleUpgrade(id)}
    />
  );
}`,
          language: 'tsx',
        },
      ]}
      accessibility={[
        'Keyboard navigable plan cards',
        'Selected state indicated visually and with ARIA',
        'Popular badge readable by screen readers',
        'Focus visible states on all interactive elements',
      ]}
      previous={{
        title: 'Markdown Viewer',
        href: '/docs/components/markdown-viewer',
      }}
      next={{
        title: 'Prompt Builder',
        href: '/docs/components/prompt-builder',
      }}
    />
  );
}
