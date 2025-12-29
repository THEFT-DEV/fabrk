import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { CreditCard, Webhook, Gift, TestTube } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Subscription Guide - Fabrk Docs',
  description:
    'Build a complete subscription system with Stripe. Checkout, billing portal, plan upgrades, and webhook handling.',
};

export default function StripePaymentsTutorialPage() {
  return (
    <FeatureGuideTemplate
      code="[0x30]"
      category="Tutorials"
      title="Stripe Payments"
      description="Set up one-time payments and subscriptions with Stripe."
      overview="This guide walks you through setting up Stripe payments including checkout, webhooks, and promotion codes."
      features={[
        {
          icon: CreditCard,
          title: 'Checkout',
          description: 'Create payment sessions with Stripe Checkout.',
        },
        {
          icon: Webhook,
          title: 'Webhooks',
          description: 'Handle payment confirmations and events.',
        },
        {
          icon: Gift,
          title: 'Coupons',
          description: 'Configure promotion codes and discounts.',
        },
        {
          icon: TestTube,
          title: 'Testing',
          description: 'Test cards for development.',
        },
      ]}
      setup={[
        {
          title: 'Configure Stripe',
          description: 'Add your Stripe API keys to .env.local',
          code: `# Get from https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."  # Get from stripe listen command (see step 2)`,
          language: 'bash',
        },
        {
          title: 'Create a Product with Lookup Key',
          description: 'Set up your product in Stripe Dashboard with a lookup identifier',
          code: `# Step 1: Go to https://dashboard.stripe.com/products
# Step 2: Click "+ Add product"
# Step 3: Fill in product details:
#   - Name: Fabrk Purchase
#   - Description: One-time access to Fabrk boilerplate
#   - Price: $299 (or your chosen amount)
#   - Billing: One-time
#
# Step 4: IMPORTANT - Add lookup key:
#   - Scroll to "Pricing" section
#   - Click "Advanced pricing options"
#   - Find "Lookup key" field
#   - Enter: fabrk_purchase
#   - Click "Save product"
#
# Step 5: Add to .env.local (use lookup key, NOT price ID):
NEXT_PUBLIC_STRIPE_PRICE_FABRK="fabrk_purchase"  # This is a lookup key

# Why lookup keys?
# - Lookup keys let you change prices in Stripe without changing code
# - You can update $299 to $399 in Stripe Dashboard
# - Your code keeps working without any changes`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Create Checkout Button',
          description: 'Use the checkout API to create a payment session',
          code: `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          /* eslint-disable-next-line no-process-env -- Accessing client-side NEXT_PUBLIC env var */
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_FABRK,
        }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? "Loading..." : "Buy Now"}
    </Button>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Set Up Webhooks (Local)',
          description: 'Forward Stripe webhooks to your local development server',
          code: `# Step 1: Install Stripe CLI (one-time setup)
brew install stripe/stripe-cli/stripe

# Step 2: Login to Stripe
stripe login
# Opens browser to authenticate

# Step 3: Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Expected output:
# > Ready! Your webhook signing secret is whsec_abc123def456...
# > (this is your local STRIPE_WEBHOOK_SECRET)
#
# Copy the webhook secret (starts with whsec_) and add to .env.local:
# STRIPE_WEBHOOK_SECRET="whsec_abc123def456..."
#
# Leave this terminal window open while developing
# You'll see webhook events appear here in real-time`,
          language: 'bash',
        },
        {
          title: 'Production Webhook URL',
          description: 'Add your webhook endpoint in the Stripe Dashboard',
          code: `https://yourdomain.com/api/webhooks/stripe`,
          language: 'text',
        },
        {
          title: 'Promotion Codes',
          description: 'Configure promotion codes in src/config.js',
          code: `// src/config.js
stripe: {
  coupons: {
    earlyAdopter: {
      enabled: true,
      code: "EARLY500",
      /* eslint-disable-next-line no-process-env -- Showing coupon config example */
      promotionCodeId: process.env.STRIPE_COUPON_EARLY_ADOPTER,
      discountAmount: 100,
      // ...
    },
  },
}`,
          language: 'javascript',
        },
      ]}
      previous={{
        title: 'Email Templates',
        href: '/docs/tutorials/email-templates',
      }}
      next={{ title: 'Webhooks', href: '/docs/tutorials/webhooks' }}
    >
      {/* Webhook Events */}
      <DocsSection title="Webhook Events">
        <DocsCard title="WEBHOOK EVENTS">
          <p className="mb-4">
            The webhook handler is at{' '}
            <code className="bg-muted px-1">src/app/api/webhooks/stripe/route.ts</code>. Key events
            handled:
          </p>
          <div className="space-y-1">
            <div>
              ├─ <code className="bg-muted px-1">checkout.session.completed</code> - Payment
              successful
            </div>
            <div>
              ├─ <code className="bg-muted px-1">customer.subscription.created</code> - New
              subscription
            </div>
            <div>
              ├─ <code className="bg-muted px-1">customer.subscription.updated</code> - Subscription
              changed
            </div>
            <div>
              ├─ <code className="bg-muted px-1">customer.subscription.deleted</code> - Subscription
              cancelled
            </div>
            <div>
              └─ <code className="bg-muted px-1">invoice.payment_failed</code> - Payment failed
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Test Cards */}
      <DocsSection title="Test Cards">
        <DocsCard title="TEST CARDS">
          <p className="mb-4">Use these test cards in development:</p>
          <div className="space-y-1">
            <div>
              ├─ <code className="bg-muted px-1">4242 4242 4242 4242</code> - Successful payment
            </div>
            <div>
              ├─ <code className="bg-muted px-1">4000 0000 0000 0002</code> - Declined
            </div>
            <div>
              └─ <code className="bg-muted px-1">4000 0000 0000 3220</code> - Requires 3D Secure
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Troubleshooting */}
      <DocsSection title="Troubleshooting">
        <DocsCard title="COMMON ERRORS">
          <div className="space-y-4">
            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: No such price or lookup key
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Verify lookup key exists in Stripe Dashboard
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`# Steps to fix:
1. Go to https://dashboard.stripe.com/products
2. Click on your product
3. Scroll to "Pricing" section
4. Click "Advanced pricing options"
5. Add lookup key: fabrk_purchase
6. Save product

# Verify in .env.local
NEXT_PUBLIC_STRIPE_PRICE_FABRK="fabrk_purchase"`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Webhook signature verification failed
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Ensure STRIPE_WEBHOOK_SECRET matches stripe listen output
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`# Run stripe listen and copy the webhook secret
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Output shows: whsec_abc123...
# Add to .env.local (must match exactly)
STRIPE_WEBHOOK_SECRET="whsec_abc123..."`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Payment succeeded but webhook not triggered
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Verify stripe listen is running
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`# Make sure stripe listen is running in a separate terminal
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Should show: "Ready! Your webhook signing secret is..."
# Leave this terminal open while testing`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Checkout redirects to 404
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Check success_url and cancel_url configuration
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`// In checkout API route
success_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}\`,
cancel_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/pricing\`,

// Verify NEXT_PUBLIC_APP_URL in .env.local
NEXT_PUBLIC_APP_URL="http://localhost:3000"`}
                </code>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/features/payments"
            title="Payments Feature Guide"
            description="Advanced payment features and configuration"
          />
          <DocsLinkCard
            href="/docs/tutorials/webhooks"
            title="Webhooks Setup"
            description="Handle all webhook events"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
