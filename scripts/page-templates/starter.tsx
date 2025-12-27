/**
 * STARTER LANDING PAGE TEMPLATE
 *
 * A professional, conversion-optimized landing page with:
 * - Hero section with clear value proposition
 * - Product preview/demo section
 * - Features grid with icons
 * - Social proof stats
 * - How it works steps
 * - Pricing section
 * - FAQ accordion
 * - Final CTA
 *
 * NEXT STEPS:
 * 1. Update product name, headline, and tagline
 * 2. Replace the placeholder product image
 * 3. Update features with your actual features
 * 4. Set your pricing
 * 5. Update FAQ with your questions
 * 6. Remove instruction comments when done
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import {
  Zap,
  Shield,
  Globe,
  BarChart3,
  ChevronDown,
  Check,
  Users,
  Clock,
  Star,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* =============================================================================
   HERO SECTION
   - Big headline with value proposition
   - Subtitle explaining what you do
   - Primary and secondary CTAs
   - Optional: social proof badges
============================================================================= */
function HeroSection() {
  return (
    <section className="relative px-4 py-20 lg:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge - optional social proof */}
          <div className="mb-6 inline-block border border-border bg-muted px-4 py-1.5 text-xs">
            [TRUSTED BY 1,000+ USERS]
          </div>

          {/* TODO: Update headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            YOUR PRODUCT HEADLINE GOES HERE
          </h1>

          {/* TODO: Update description */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            A clear, compelling description of what your product does and why it matters.
            Focus on the benefit to the user, not just features.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">
                &gt; GET STARTED FREE <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">&gt; WATCH DEMO</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="size-4 text-green-500" /> No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Check className="size-4 text-green-500" /> 14-day free trial
            </span>
            <span className="flex items-center gap-2">
              <Check className="size-4 text-green-500" /> Cancel anytime
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =============================================================================
   PRODUCT PREVIEW SECTION
   - Screenshot or demo of your product
   - Shows what users will get
============================================================================= */
function ProductPreviewSection() {
  return (
    <section className="border-t border-border bg-muted/30 px-4 py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          {/* TODO: Replace with actual product screenshot */}
          <div className="overflow-hidden border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="size-3 rounded-full bg-red-500" />
              <div className="size-3 rounded-full bg-yellow-500" />
              <div className="size-3 rounded-full bg-green-500" />
              <span className="ml-4 text-xs text-muted-foreground">your-product.com</span>
            </div>
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-muted/50 to-muted p-8">
              <div className="text-center">
                <p className="text-lg text-muted-foreground">[YOUR PRODUCT SCREENSHOT]</p>
                <p className="text-sm text-muted-foreground/70">
                  Replace this with an actual screenshot or demo video
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =============================================================================
   FEATURES SECTION
   - 4-6 key features with icons
   - Brief descriptions
============================================================================= */
function FeaturesSection() {
  // TODO: Update with your actual features
  const features = [
    {
      icon: Zap,
      title: 'LIGHTNING FAST',
      description: 'Built for speed. Your users will notice the difference immediately.',
    },
    {
      icon: Shield,
      title: 'SECURE BY DEFAULT',
      description: 'Enterprise-grade security out of the box. Sleep well at night.',
    },
    {
      icon: Globe,
      title: 'WORKS EVERYWHERE',
      description: 'Deploy anywhere. Works on all devices and browsers.',
    },
    {
      icon: BarChart3,
      title: 'POWERFUL ANALYTICS',
      description: 'Know exactly how your product is performing at all times.',
    },
  ];

  return (
    <section className="border-t border-border px-4 py-20 lg:py-24">
      <Container>
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-block border border-border bg-muted px-4 py-1.5 text-xs">
            [FEATURES]
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            EVERYTHING YOU NEED TO SUCCEED
          </h2>
          <p className="text-muted-foreground">
            We've built the features you need so you can focus on what matters most.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} size="auto" className="group transition-colors hover:border-primary/50">
              <CardContent className="p-6">
                <feature.icon className="mb-4 size-10 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =============================================================================
   STATS SECTION
   - Social proof with numbers
   - Build trust and credibility
============================================================================= */
function StatsSection() {
  // TODO: Update with your actual stats
  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Users' },
    { icon: Star, value: '4.9/5', label: 'User Rating' },
    { icon: Clock, value: '99.9%', label: 'Uptime' },
    { icon: Globe, value: '50+', label: 'Countries' },
  ];

  return (
    <section className="border-t border-border bg-muted/30 px-4 py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto mb-4 size-8 text-primary" />
              <div className="mb-2 text-4xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =============================================================================
   HOW IT WORKS SECTION
   - Step-by-step process
   - Make it easy to understand
============================================================================= */
function HowItWorksSection() {
  // TODO: Update with your actual steps
  const steps = [
    {
      step: '01',
      title: 'SIGN UP',
      description: 'Create your account in seconds. No credit card required.',
    },
    {
      step: '02',
      title: 'CONFIGURE',
      description: 'Set up your preferences and connect your tools.',
    },
    {
      step: '03',
      title: 'LAUNCH',
      description: 'Go live and start seeing results immediately.',
    },
  ];

  return (
    <section className="border-t border-border px-4 py-20 lg:py-24">
      <Container>
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-block border border-border bg-muted px-4 py-1.5 text-xs">
            [HOW IT WORKS]
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            GET STARTED IN MINUTES
          </h2>
          <p className="text-muted-foreground">
            Three simple steps to transform your workflow.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center border border-primary text-2xl font-bold text-primary">
                {item.step}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =============================================================================
   PRICING SECTION
   - Clear pricing tiers
   - Highlight recommended plan
============================================================================= */
function PricingSection() {
  // TODO: Update with your actual pricing
  const plans = [
    {
      name: 'STARTER',
      price: '$0',
      period: '/month',
      description: 'Perfect for trying things out',
      features: ['Up to 100 users', 'Basic analytics', 'Email support', '1 project'],
      cta: 'GET STARTED',
      popular: false,
    },
    {
      name: 'PRO',
      price: '$29',
      period: '/month',
      description: 'Best for growing teams',
      features: ['Unlimited users', 'Advanced analytics', 'Priority support', 'Unlimited projects', 'Custom integrations'],
      cta: 'START FREE TRIAL',
      popular: true,
    },
    {
      name: 'ENTERPRISE',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: ['Everything in Pro', 'Dedicated support', 'SLA guarantee', 'Custom contracts', 'On-premise option'],
      cta: 'CONTACT SALES',
      popular: false,
    },
  ];

  return (
    <section className="border-t border-border bg-muted/30 px-4 py-20 lg:py-24">
      <Container>
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-block border border-border bg-muted px-4 py-1.5 text-xs">
            [PRICING]
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            SIMPLE, TRANSPARENT PRICING
          </h2>
          <p className="text-muted-foreground">
            No hidden fees. No surprises. Cancel anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              size="auto"
              className={cn(
                'relative',
                plan.popular && 'border-primary border-2'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 text-xs text-primary-foreground">
                  MOST POPULAR
                </div>
              )}
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  &gt; {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =============================================================================
   FAQ SECTION
   - Common questions and answers
   - Accordion style
============================================================================= */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // TODO: Update with your actual FAQs
  const faqs = [
    {
      question: 'How does the free trial work?',
      answer: 'You get full access to all Pro features for 14 days. No credit card required. At the end of the trial, you can choose to upgrade or continue with the free plan.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, contact us for a full refund.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use industry-standard encryption and security practices. Your data is stored securely and never shared with third parties.',
    },
  ];

  return (
    <section className="border-t border-border px-4 py-20 lg:py-24">
      <Container>
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-block border border-border bg-muted px-4 py-1.5 text-xs">
            [FAQ]
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-muted-foreground">
            Got questions? We've got answers.
          </p>
        </div>

        {/* FAQ list */}
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} size="auto">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'size-5 text-muted-foreground transition-transform',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              {openIndex === index && (
                <CardContent className="border-t border-border bg-muted/30 pt-4">
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =============================================================================
   FINAL CTA SECTION
   - Last push for conversion
   - Clear, compelling call to action
============================================================================= */
function FinalCTASection() {
  return (
    <section className="border-t border-border bg-muted/30 px-4 py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            READY TO GET STARTED?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of users who are already transforming their workflow.
            Start your free trial today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">
                &gt; START FREE TRIAL <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">&gt; TALK TO SALES</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =============================================================================
   MAIN PAGE COMPONENT
============================================================================= */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <ProductPreviewSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
