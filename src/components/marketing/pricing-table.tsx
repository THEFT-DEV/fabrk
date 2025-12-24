'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: Record<string, boolean | string>;
  highlighted?: boolean;
  cta?: { text: string; href: string };
}

interface PricingTableProps {
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: 'DIY',
    price: '$0',
    description: 'Build from scratch',
    features: {
      typescript: true,
      database: 'Your choice',
      components: '0',
      dataTable: false,
      emailTemplates: '0',
      oauthProviders: false,
      paymentProviders: false,
      documentation: 'None',
      support: 'Stack Overflow',
      updates: 'None',
      nextjs: '15',
      authLibrary: 'DIY',
    },
    highlighted: false,
    cta: { text: 'Start Building', href: '#' },
  },
  {
    name: 'ShipFast',
    price: '$199',
    description: 'Popular choice',
    features: {
      typescript: false,
      database: 'MongoDB',
      components: '30-50',
      dataTable: true,
      emailTemplates: '5',
      oauthProviders: true,
      paymentProviders: 'Stripe/Lemon',
      documentation: 'Good',
      support: 'Email',
      updates: 'Lifetime',
      nextjs: '13/14',
      authLibrary: 'NextAuth v4',
    },
    highlighted: false,
    cta: { text: 'View ShipFast', href: 'https://shipfa.st' },
  },
  {
    name: 'Supastarter',
    price: '$349',
    description: 'Most complete',
    features: {
      typescript: true,
      database: 'PostgreSQL/MySQL',
      components: '100+',
      dataTable: true,
      emailTemplates: '10+',
      oauthProviders: true,
      paymentProviders: 'Stripe/Lemon',
      documentation: 'Extensive',
      support: 'Email',
      updates: 'Lifetime',
      nextjs: '14',
      authLibrary: 'Clerk/Supabase',
    },
    highlighted: false,
    cta: { text: 'View Supastarter', href: 'https://supastarter.dev' },
  },
  {
    name: 'Fabrk',
    price: '$199',
    description: 'Enterprise-Grade',
    features: {
      typescript: 'Strict Mode',
      database: 'PostgreSQL',
      components: '100+',
      dataTable: true,
      emailTemplates: '5',
      oauthProviders: true,
      paymentProviders: 'Stripe',
      documentation: 'Comprehensive',
      support: 'Email',
      updates: 'Lifetime v1.x',
      nextjs: '15',
      authLibrary: 'NextAuth v5',
    },
    highlighted: true,
    cta: { text: '> GET FABRK', href: '#pricing' },
  },
];

const featureLabels: Record<string, string> = {
  typescript: 'TypeScript Support',
  database: 'Database',
  components: 'Component Count',
  dataTable: 'Data Table',
  emailTemplates: 'Email Templates',
  oauthProviders: 'OAuth (Google, etc.)',
  paymentProviders: 'Payment Providers',
  documentation: 'Documentation',
  support: 'Support',
  updates: 'Updates',
  nextjs: 'Next.js Version',
  authLibrary: 'Auth Library',
};

export function PricingTable({ plans = defaultPlans }: PricingTableProps) {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="text-success h-5 w-5" />
      ) : (
        <X className="text-destructive h-5 w-5" />
      );
    }
    return <span className="text-foreground text-sm font-medium">{value}</span>;
  };

  return (
    <section
      className={cn(mode.font, 'border-border bg-background border-t px-6 py-24')}
      id="pricing"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-muted-foreground text-xs">[0x00]</span>
          <h2
            className={cn('text-foreground mb-4 text-4xl font-semibold tracking-tight', mode.font)}
          >
            COMPARE AND CHOOSE
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
            &gt; See how Fabrk stacks up against the competition. Same features, 60-77% cheaper.
          </p>
        </div>

        {/* Pricing Table */}
        <div
          className={cn(
            '[&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-border overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:h-2'
          )}
        >
          <div className="inline-block min-w-full align-middle">
            <table className="border-foreground min-w-full rounded-none border-2">
              {/* Header Row */}
              <thead>
                <tr>
                  <th className="border-foreground bg-muted sticky left-0 z-10 rounded-none border-r-2 border-b-2 px-6 py-4 text-left">
                    <span className="text-muted-foreground text-sm font-semibold">Features</span>
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className={`border-foreground rounded-none border-b-2 border-l-2 px-6 py-4 ${
                        plan.highlighted ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                    >
                      <div className="flex flex-col items-start gap-2">
                        <div>
                          <h3
                            className={cn(
                              'text-xl font-semibold',
                              mode.font,
                              plan.highlighted ? 'text-primary-foreground' : 'text-foreground'
                            )}
                          >
                            {plan.name}
                          </h3>
                          <p
                            className={`mt-1 text-sm ${
                              plan.highlighted
                                ? 'text-primary-foreground/80'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {plan.description}
                          </p>
                        </div>
                        <div
                          className={`text-4xl font-semibold ${
                            plan.highlighted ? 'text-primary-foreground' : 'text-foreground'
                          }`}
                        >
                          {plan.price}
                        </div>
                        {plan.highlighted && (
                          <span
                            className={cn(
                              mode.radius,
                              'border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground inline-block border px-2 py-0.5 text-xs'
                            )}
                          >
                            [BEST_VALUE]
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Feature Rows */}
              <tbody>
                {Object.entries(featureLabels).map(([key, label], _index) => (
                  <tr key={key} className="bg-card">
                    <td className="border-foreground sticky left-0 z-10 border-r-2 bg-inherit px-6 py-4">
                      <span className="text-foreground text-sm font-semibold">{label}</span>
                    </td>
                    {plans.map((plan) => (
                      <td
                        key={`${plan.name}-${key}`}
                        className={`border-foreground border-l-2 px-6 py-4 text-center ${
                          plan.highlighted ? '' : ''
                        }`}
                      >
                        {renderFeatureValue(plan.features[key] as boolean | string)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

              {/* CTA Row */}
              <tfoot>
                <tr className="border-foreground border-t-2">
                  <td className="border-foreground bg-card sticky left-0 z-10 border-r-2 px-6 py-6"></td>
                  {plans.map((plan) => (
                    <td
                      key={`cta-${plan.name}`}
                      className={`border-foreground border-l-2 px-6 py-6 ${
                        plan.highlighted ? '' : 'bg-card'
                      }`}
                    >
                      <Button
                        className={cn(
                          mode.radius,
                          `w-full ${
                            plan.highlighted
                              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                              : 'border-foreground bg-card text-foreground hover:bg-foreground hover:text-background border-2'
                          }`
                        )}
                        asChild
                      >
                        <Link href={plan.cta?.href || '#'}>{plan.cta?.text || 'Learn More'}</Link>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Savings Highlight */}
        <div className="mt-8 text-center">
          <p className={cn(mode.font, 'text-primary text-sm font-semibold')}>
            [SAVINGS] SAVE 60-77% WITH FABRK • SAME FEATURES BETTER STACK
          </p>
        </div>

        {/* Final Sale Notice */}
        <div className="mt-8 text-center">
          <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
            ALL SALES FINAL • DIGITAL PRODUCT • LIFETIME V1.X UPDATES INCLUDED
          </p>
        </div>
      </div>
    </section>
  );
}
