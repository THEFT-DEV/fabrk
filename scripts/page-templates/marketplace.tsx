/**
 * MARKETPLACE LANDING PAGE TEMPLATE
 *
 * A clean marketplace landing page with categories and seller info.
 * Uses terminal aesthetic but keeps styling simple for customization.
 *
 * NEXT STEPS:
 * 1. Update the marketplace name and what's being sold
 * 2. Replace the category examples with your actual categories
 * 3. Set your fee structure (transaction fee, listing fee, etc.)
 * 4. Update "How It Works" for your specific marketplace
 * 5. Remove the instruction banner when done
 *
 * CUSTOMIZATION:
 * - Add seller testimonials
 * - Add featured listings section
 * - Add trust badges (payment security, etc.)
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
          TRUSTED MARKETPLACE
        </span>

        {/* TODO: Update marketplace name and what's being sold */}
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          BUY AND SELL [YOUR PRODUCT TYPE]
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
          The trusted marketplace for [product type]. Connect with verified sellers
          and buyers. Secure transactions, quality guaranteed.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/browse">&gt; BROWSE LISTINGS</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/sell">&gt; START SELLING</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Free to list. Only pay when you sell.
        </p>
      </section>

      {/* Categories */}
      <section className="border-t bg-muted/50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">BROWSE BY CATEGORY</h2>
          <p className="mb-12 text-center text-muted-foreground">
            Find exactly what you're looking for
          </p>

          {/* TODO: Replace with your actual categories */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'CATEGORY 1', count: '1,234 listings' },
              { name: 'CATEGORY 2', count: '567 listings' },
              { name: 'CATEGORY 3', count: '890 listings' },
              { name: 'CATEGORY 4', count: '456 listings' },
            ].map((cat) => (
              <div
                key={cat.name}
                className="cursor-pointer border border-border p-4 transition-colors hover:border-primary"
              >
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">HOW IT WORKS</h2>
          <p className="mb-12 text-center text-muted-foreground">
            Simple, secure, straightforward
          </p>

          {/* TODO: Update steps for your marketplace */}
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'LIST OR BROWSE', desc: 'Create a listing in minutes or browse thousands of verified listings' },
              { step: '02', title: 'CONNECT', desc: 'Message sellers directly. Ask questions. Negotiate terms.' },
              { step: '03', title: 'TRANSACT', desc: 'Secure payment processing. Buyer protection included.' },
            ].map((s) => (
              <div key={s.step} className="space-y-3">
                <div className="text-4xl font-bold text-muted-foreground">{s.step}</div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Sellers */}
      <section className="border-t bg-muted/50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">FOR SELLERS</h2>
          <p className="mb-12 text-center text-muted-foreground">
            Everything you need to succeed
          </p>

          {/* TODO: Update seller benefits */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'FREE LISTINGS', desc: 'List as many items as you want, free forever' },
              { title: 'LOW FEES', desc: 'Only 5% transaction fee when you sell' },
              { title: 'FAST PAYOUTS', desc: 'Get paid within 2 business days' },
              { title: 'SELLER TOOLS', desc: 'Analytics, inventory management, and more' },
            ].map((benefit) => (
              <div key={benefit.title} className="space-y-3">
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-3xl font-bold">TRUSTED BY THOUSANDS</h2>

          {/* TODO: Update with your actual stats */}
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { stat: '50K+', label: 'Active users' },
              { stat: '10K+', label: 'Successful transactions' },
              { stat: '$2M+', label: 'Total sales volume' },
              { stat: '4.9/5', label: 'Average rating' },
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
          <h2 className="text-3xl font-bold">JOIN THE MARKETPLACE</h2>
          <p className="text-muted-foreground">
            Start buying or selling today. Free to join.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">&gt; CREATE ACCOUNT</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/browse">&gt; BROWSE FIRST</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
