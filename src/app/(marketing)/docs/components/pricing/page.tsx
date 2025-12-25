'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

// Simplified Pricing Demo
function PricingDemo() {
  const plans = [
    {
      name: 'STARTER',
      price: '$0',
      period: '/month',
      features: ['5 Projects', 'Basic Support', '1GB Storage'],
      cta: 'GET STARTED',
      popular: false,
    },
    {
      name: 'PRO',
      price: '$29',
      period: '/month',
      features: ['Unlimited Projects', 'Priority Support', '100GB Storage', 'API Access'],
      cta: 'UPGRADE NOW',
      popular: true,
    },
    {
      name: 'ENTERPRISE',
      price: 'Custom',
      period: '',
      features: ['Custom Solutions', '24/7 Support', 'Unlimited Storage', 'SLA'],
      cta: 'CONTACT SALES',
      popular: false,
    },
  ];

  return (
    <section className="border-border bg-background w-full border p-6">
      <div className="mb-6 text-center">
        <span className="border-border bg-card text-muted-foreground inline-block border px-4 py-1 font-mono text-xs">
          [ [0x30] PRICING ] SELECT PLAN
        </span>
        <h2 className="mt-4 font-mono text-xl font-semibold">CHOOSE YOUR PLAN</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-card border p-6 ${plan.popular ? 'border-primary' : 'border-border'}`}
          >
            {plan.popular && (
              <span className="text-primary mb-2 inline-block font-mono text-xs">[POPULAR]</span>
            )}
            <div className="mb-4">
              <span className="text-muted-foreground font-mono text-xs">{plan.name}</span>
              <div className="mt-1 font-mono text-2xl font-semibold">
                {plan.price}
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
            </div>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="text-muted-foreground flex items-center gap-2 font-mono text-xs"
                >
                  <Check className="text-success h-3 w-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full font-mono text-xs"
              variant={plan.popular ? 'default' : 'outline'}
            >
              &gt; {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

// Single Pricing Card
function PricingCardDemo() {
  return (
    <div className="border-primary bg-card w-full max-w-sm border p-6">
      <span className="text-primary mb-2 inline-block font-mono text-xs">[RECOMMENDED]</span>
      <div className="mb-4">
        <span className="text-muted-foreground font-mono text-xs">LIFETIME</span>
        <div className="mt-1 font-mono text-4xl font-semibold">
          $299<span className="text-muted-foreground text-sm"> one-time</span>
        </div>
      </div>
      <ul className="mb-6 space-y-2">
        <li className="flex items-center gap-2 font-mono text-xs">
          <Check className="text-success h-3 w-3" />
          Full source code
        </li>
        <li className="flex items-center gap-2 font-mono text-xs">
          <Check className="text-success h-3 w-3" />
          Lifetime updates
        </li>
        <li className="flex items-center gap-2 font-mono text-xs">
          <Check className="text-success h-3 w-3" />
          Email support
        </li>
        <li className="flex items-center gap-2 font-mono text-xs">
          <Check className="text-success h-3 w-3" />
          Unlimited projects
        </li>
      </ul>
      <Button className="w-full font-mono text-xs">&gt; GET ACCESS</Button>
    </div>
  );
}

export default function PricingPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LC.04]"
      title="Pricing Section"
      description="Pricing tables with plan comparison, feature lists, and Stripe checkout integration."
      mainPreview={{
        preview: <PricingDemo />,
        code: `import { PricingSection } from "@/components/marketing/pricing-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      {/* Other sections */}
    </main>
  );
}`,
      }}
      variants={[
        {
          title: 'Single Pricing Card',
          description: 'Highlighted plan card for one-time purchase',
          preview: <PricingCardDemo />,
          code: `<Card className="border-primary">
  <CardHeader>
    <Badge>RECOMMENDED</Badge>
    <CardTitle>LIFETIME</CardTitle>
    <div className="text-4xl font-semibold">$299</div>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
      <li><Check /> Full source code</li>
      <li><Check /> Lifetime updates</li>
    </ul>
    <Button className="w-full">&gt; GET ACCESS</Button>
  </CardContent>
</Card>`,
        },
        {
          title: 'Price Toggle',
          description: 'Monthly/yearly toggle for subscriptions',
          preview: (
            <div className="flex items-center justify-center gap-2 p-2">
              <Button variant="default" size="sm" className="font-mono text-xs">
                &gt; MONTHLY
              </Button>
              <Button variant="ghost" size="sm" className="font-mono text-xs">
                &gt; YEARLY
              </Button>
              <span className="text-success font-mono text-xs">[-20%]</span>
            </div>
          ),
          code: `const [yearly, setYearly] = useState(false);

<div className="flex items-center gap-2">
  <Button
    variant={!yearly ? "default" : "ghost"}
    onClick={() => setYearly(false)}
  >
    &gt; MONTHLY
  </Button>
  <Button
    variant={yearly ? "default" : "ghost"}
    onClick={() => setYearly(true)}
  >
    &gt; YEARLY
  </Button>
  {yearly && <Badge>Save 20%</Badge>}
</div>`,
        },
      ]}
      props={[
        {
          name: 'plans',
          type: '{ name: string; price: string; features: string[]; popular?: boolean }[]',
          description: 'Array of pricing plans to display',
        },
        {
          name: 'showToggle',
          type: 'boolean',
          description: 'Show monthly/yearly toggle',
          default: 'true',
        },
      ]}
      accessibility={[
        'Feature lists use proper list semantics',
        'Popular plan is visually distinct with border',
        'CTA buttons are clearly labeled',
        'Price information is readable by screen readers',
      ]}
      previous={{ title: 'Features', href: '/docs/components/features' }}
      next={{ title: 'Testimonials', href: '/docs/components/testimonials' }}
    />
  );
}
