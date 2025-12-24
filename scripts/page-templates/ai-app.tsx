/**
 * AI APP LANDING PAGE TEMPLATE
 *
 * A clean landing page for AI-powered products with credit-based pricing.
 * Uses terminal aesthetic but keeps styling simple for customization.
 *
 * NEXT STEPS:
 * 1. Update the headline - replace [TASK] with what your AI does
 * 2. Add a demo video or interactive demo
 * 3. Update the 4 capabilities
 * 4. Set your credit-based pricing
 * 5. Remove the instruction banner when done
 *
 * CUSTOMIZATION:
 * - Add a live demo section
 * - Show example outputs
 * - Add testimonials from beta users
 */

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* INSTRUCTION BANNER - Remove when done */}
      <Alert className="border-x-0 border-t-0 bg-amber-500/10">
        <AlertDescription className="text-center">
          <strong>[SETUP]</strong> Edit this page at{' '}
          <code className="bg-muted px-1">src/app/page.tsx</code>
          {' '}- Update content, then remove this banner.
        </AlertDescription>
      </Alert>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <span className="mb-4 border bg-muted px-3 py-1 text-sm">
          POWERED BY AI
        </span>

        {/* TODO: Replace [TASK] with what your AI does */}
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          YOUR AI ASSISTANT FOR [TASK]
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
          Automate [task] with the power of AI. Save hours every week and focus on what matters.
          Built on the latest language models.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/signup">&gt; TRY FOR FREE</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/demo">&gt; SEE IT IN ACTION</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          100 free credits. No credit card required.
        </p>
      </section>

      {/* Demo Section */}
      <section className="border-t bg-muted/50 px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold">SEE THE MAGIC</h2>
          <p className="mb-12 text-center text-muted-foreground">
            Watch how our AI transforms your workflow
          </p>

          {/* TODO: Add demo video or interactive demo */}
          <div className="flex aspect-video items-center justify-center border border-border bg-muted/50">
            <div className="text-center text-muted-foreground">
              <p className="text-lg">[ADD DEMO VIDEO OR INTERACTIVE DEMO]</p>
              <p className="text-sm">Replace with your product demo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">WHAT IT CAN DO</h2>
          <p className="mb-12 text-center text-muted-foreground">
            Powerful AI capabilities at your fingertips
          </p>

          {/* TODO: Update with your AI's capabilities */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'GENERATE', desc: 'Create content, code, or ideas instantly' },
              { title: 'ANALYZE', desc: 'Extract insights from any data' },
              { title: 'AUTOMATE', desc: 'Set up workflows that run themselves' },
              { title: 'LEARN', desc: 'Adapts to your preferences over time' },
            ].map((cap) => (
              <div key={cap.title} className="space-y-3">
                <h3 className="text-lg font-semibold">{cap.title}</h3>
                <p className="text-muted-foreground">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing with Credits */}
      <section className="border-t bg-muted/50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">SIMPLE CREDIT-BASED PRICING</h2>
          <p className="mb-12 text-center text-muted-foreground">
            Pay for what you use. No surprises.
          </p>

          {/* TODO: Update pricing */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'FREE', price: '$0', credits: '100', desc: 'Try it out' },
              { name: 'STARTER', price: '$19', credits: '1,000', desc: 'For individuals', popular: true },
              { name: 'PRO', price: '$49', credits: '5,000', desc: 'For power users' },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`border p-6 ${plan.popular ? 'border-primary' : 'border-border'}`}
              >
                {plan.popular && (
                  <span className="mb-2 inline-block bg-primary px-2 py-1 text-xs text-primary-foreground">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mb-2 text-sm text-muted-foreground">{plan.desc}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <p className="text-2xl font-semibold">{plan.credits} credits</p>
                <p className="mb-6 text-sm text-muted-foreground">per month</p>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                  GET STARTED
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-3xl font-bold">TRUSTED BY DEVELOPERS</h2>

          {/* TODO: Update with your stats */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { stat: '10K+', label: 'Active users' },
              { stat: '1M+', label: 'AI requests processed' },
              { stat: '99.9%', label: 'Uptime' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-bold">{s.stat}</p>
                <p className="text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t bg-muted/50 px-4 py-24 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-bold">START USING AI TODAY</h2>
          <p className="text-muted-foreground">
            Get 100 free credits. No credit card required.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">&gt; GET FREE CREDITS</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
