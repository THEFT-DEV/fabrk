'use client';

import { ArrowRight } from 'lucide-react';
import { ComponentShowcaseTemplate } from '@/components/docs';
import { PricingCard } from '@/components/ui/pricing-card';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export default function PricingCardPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.115]"
      category="SaaS"
      title="Pricing Card"
      description="A terminal-style pricing display component for checkout flows and landing pages. Features urgency messaging, discount display, and flexible CTA slot."
      importCode={`import { PricingCard } from "@/components/ui/pricing-card"`}
      mainPreview={{
        preview: (
          <div className="flex justify-center p-6">
            <PricingCard
              price="$199"
              regularPrice="$299"
              discountMessage="SAVE $100 Instantly!"
              urgencyMessage="OFFER ENDS SOON!"
              highlights={['NO SUBSCRIPTION', 'UNLIMITED PROJECTS', 'PRODUCTION-READY']}
              trustLine="30-day money-back guarantee. No questions asked."
            >
              <Button
                className={cn(
                  'bg-primary text-primary-foreground hover:bg-primary/90 group flex h-14 w-full items-center justify-center gap-2 border text-base font-bold uppercase tracking-wider transition-all',
                  mode.radius,
                  mode.font
                )}
              >
                <span>GET ACCESS — $199</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </PricingCard>
          </div>
        ),
        code: `<PricingCard
  price="$199"
  regularPrice="$299"
  discountMessage="SAVE $100 Instantly!"
  urgencyMessage="OFFER ENDS SOON!"
  highlights={['NO SUBSCRIPTION', 'UNLIMITED PROJECTS', 'PRODUCTION-READY']}
  trustLine="30-day money-back guarantee. No questions asked."
>
  <Button className="...">
    GET ACCESS — $199
    <ArrowRight className="h-5 w-5" />
  </Button>
</PricingCard>`,
      }}
      variants={[
        {
          title: 'Minimal (No Discount)',
          description: 'Clean version without discount or urgency messaging.',
          preview: (
            <div className="flex justify-center p-6">
              <PricingCard
                price="$49"
                title="MONTHLY ACCESS"
                priceSubtext="PER MONTH"
                highlights={['CANCEL ANYTIME', 'ALL FEATURES']}
              >
                <Button
                  variant="default"
                  className={cn('h-12 w-full font-bold uppercase', mode.radius, mode.font)}
                >
                  SUBSCRIBE NOW
                </Button>
              </PricingCard>
            </div>
          ),
          code: `<PricingCard
  price="$49"
  title="MONTHLY ACCESS"
  priceSubtext="PER MONTH"
  highlights={['CANCEL ANYTIME', 'ALL FEATURES']}
>
  <Button className="...">
    SUBSCRIBE NOW
  </Button>
</PricingCard>`,
        },
        {
          title: 'Enterprise (Contact Sales)',
          description: 'For enterprise tiers with custom pricing.',
          preview: (
            <div className="flex justify-center p-6">
              <PricingCard
                price="CUSTOM"
                title="ENTERPRISE LICENSE"
                priceSubtext="TAILORED FOR YOUR TEAM"
                headerCode="0xEE"
                highlights={['VOLUME LICENSING', 'PRIORITY SUPPORT', 'CUSTOM INTEGRATIONS']}
                trustLine="Schedule a call with our enterprise team."
              >
                <Button
                  variant="outline"
                  className={cn('h-12 w-full font-bold uppercase', mode.radius, mode.font)}
                >
                  CONTACT SALES
                </Button>
              </PricingCard>
            </div>
          ),
          code: `<PricingCard
  price="CUSTOM"
  title="ENTERPRISE LICENSE"
  priceSubtext="TAILORED FOR YOUR TEAM"
  headerCode="0xEE"
  highlights={['VOLUME LICENSING', 'PRIORITY SUPPORT', 'CUSTOM INTEGRATIONS']}
  trustLine="Schedule a call with our enterprise team."
>
  <Button variant="outline" className="...">
    CONTACT SALES
  </Button>
</PricingCard>`,
        },
        {
          title: 'Annual Pricing',
          description: 'Showing annual subscription with savings.',
          preview: (
            <div className="flex justify-center p-6">
              <PricingCard
                price="$399"
                regularPrice="$588"
                discountMessage="2 MONTHS FREE!"
                title="ANNUAL PLAN"
                priceSubtext="BILLED YEARLY"
                highlights={['BEST VALUE', 'ALL FEATURES', 'PRIORITY SUPPORT']}
              >
                <Button
                  className={cn('h-12 w-full font-bold uppercase', mode.radius, mode.font)}
                >
                  START ANNUAL PLAN
                </Button>
              </PricingCard>
            </div>
          ),
          code: `<PricingCard
  price="$399"
  regularPrice="$588"
  discountMessage="2 MONTHS FREE!"
  title="ANNUAL PLAN"
  priceSubtext="BILLED YEARLY"
  highlights={['BEST VALUE', 'ALL FEATURES', 'PRIORITY SUPPORT']}
>
  <Button>START ANNUAL PLAN</Button>
</PricingCard>`,
        },
      ]}
      props={[
        {
          name: 'price',
          type: 'string',
          required: true,
          description: 'Main price to display (e.g., "$199" or "CUSTOM").',
        },
        {
          name: 'regularPrice',
          type: 'string',
          description: 'Original price shown crossed out.',
        },
        {
          name: 'discountMessage',
          type: 'string',
          description: 'Discount callout text (e.g., "SAVE $100!").',
        },
        {
          name: 'title',
          type: 'string',
          default: '"ONE-TIME LIFETIME ACCESS"',
          description: 'Header title text.',
        },
        {
          name: 'urgencyMessage',
          type: 'string',
          description: 'Pulsing urgency text (e.g., "OFFER ENDS SOON!").',
        },
        {
          name: 'priceSubtext',
          type: 'string',
          default: '"ONE TIME PAYMENT"',
          description: 'Subtext below the price.',
        },
        {
          name: 'highlights',
          type: 'string[]',
          default: '[]',
          description: 'Array of highlight badges.',
        },
        {
          name: 'trustLine',
          type: 'string',
          description: 'Trust/guarantee text at bottom.',
        },
        {
          name: 'headerCode',
          type: 'string',
          default: '"0x41"',
          description: 'Terminal header code identifier.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'CTA button or checkout component.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ]}
      usageExamples={[
        {
          title: 'With Stripe Checkout',
          description: 'Integrate with Stripe for payment processing:',
          code: `'use client';

import { PricingCard } from '@/components/ui/pricing-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CheckoutCard() {
  const handleCheckout = async () => {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: 'price_xxx' }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <PricingCard
      price="$199"
      regularPrice="$299"
      discountMessage="SAVE $100!"
      urgencyMessage="LAUNCH SPECIAL!"
      highlights={['LIFETIME ACCESS', 'ALL UPDATES']}
      trustLine="30-day money-back guarantee."
    >
      <Button onClick={handleCheckout} className="w-full">
        BUY NOW — $199 <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </PricingCard>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'With Polar Checkout',
          description: 'Using Polar.sh for payment:',
          code: `import { PricingCard } from '@/components/ui/pricing-card';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';

export function PolarPricingCard() {
  return (
    <PricingCard
      price="$199"
      highlights={['NO SUBSCRIPTION', 'UNLIMITED PROJECTS']}
    >
      <PolarCheckoutButton className="w-full">
        GET ACCESS — $199
      </PolarCheckoutButton>
    </PricingCard>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Enterprise Contact Form',
          description: 'Link to Calendly or contact form:',
          code: `import { PricingCard } from '@/components/ui/pricing-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function EnterpriseCard() {
  return (
    <PricingCard
      price="CUSTOM"
      title="ENTERPRISE"
      priceSubtext="VOLUME LICENSING"
      headerCode="0xEE"
      highlights={['DEDICATED SUPPORT', 'CUSTOM SLA', 'ONBOARDING']}
      trustLine="Talk to our team about your requirements."
    >
      <Link href="https://calendly.com/your-link" target="_blank">
        <Button variant="outline" className="w-full">
          SCHEDULE A CALL
        </Button>
      </Link>
    </PricingCard>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Side-by-Side Pricing',
          description: 'Display multiple tiers together:',
          code: `<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {/* Starter */}
  <PricingCard
    price="$49"
    title="STARTER"
    priceSubtext="PER MONTH"
    highlights={['5 PROJECTS', 'BASIC SUPPORT']}
  >
    <Button variant="outline">SELECT STARTER</Button>
  </PricingCard>

  {/* Pro - Featured */}
  <PricingCard
    price="$199"
    regularPrice="$299"
    title="PRO"
    urgencyMessage="MOST POPULAR"
    highlights={['UNLIMITED', 'PRIORITY SUPPORT']}
  >
    <Button>SELECT PRO</Button>
  </PricingCard>

  {/* Enterprise */}
  <PricingCard
    price="CUSTOM"
    title="ENTERPRISE"
    priceSubtext="CONTACT SALES"
    highlights={['VOLUME PRICING', 'DEDICATED REP']}
  >
    <Button variant="outline">CONTACT SALES</Button>
  </PricingCard>
</div>`,
          language: 'tsx',
        },
      ]}
      accessibility={[
        'Semantic heading structure for pricing tiers',
        'High contrast text meets WCAG 2.1 AA standards',
        'Animated elements use prefers-reduced-motion media query',
        'CTA buttons are keyboard accessible',
        'Screen readers can parse pricing structure',
      ]}
      previous={{
        title: 'Plan Selector',
        href: '/docs/components/plan-selector',
      }}
      next={{
        title: 'Sign In Form',
        href: '/docs/components/sign-in-form',
      }}
    />
  );
}
