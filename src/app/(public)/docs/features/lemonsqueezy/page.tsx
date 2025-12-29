import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import Link from 'next/link';
import { CircleDollarSign, CreditCard, Globe, Shield, Bell, Users } from 'lucide-react';

export const metadata = {
  title: 'Lemon Squeezy Payments - Fabrk Docs',
  description:
    'Accept payments with Lemon Squeezy. Handle global taxes, subscriptions, and digital product sales with ease.',
};

export default function LemonSqueezyPage() {
  return (
    <FeatureGuideTemplate
      code="[0x31]"
      category="Features"
      title="Lemon Squeezy"
      description="Accept global payments with automatic tax handling and merchant of record."
      overview="Lemon Squeezy is a merchant of record (MoR) that handles sales tax, VAT, and payment processing globally. Unlike Stripe where you're the merchant, Lemon Squeezy is the seller on your behalf - they handle all tax compliance, refunds, and chargebacks. Perfect for selling to customers worldwide without tax headaches."
      features={[
        {
          icon: CircleDollarSign,
          title: 'Merchant of Record',
          description: 'Lemon Squeezy handles taxes, refunds, and compliance globally.',
        },
        {
          icon: Globe,
          title: 'Global Tax Handling',
          description: 'Automatic VAT, GST, and sales tax calculation and remittance.',
        },
        {
          icon: CreditCard,
          title: 'Multiple Payment Methods',
          description: 'Cards, PayPal, and local payment methods supported.',
        },
        {
          icon: Shield,
          title: 'Fraud Protection',
          description: 'Built-in fraud detection and chargeback protection.',
        },
        {
          icon: Bell,
          title: 'Webhook Events',
          description: 'Real-time notifications for orders, subscriptions, and more.',
        },
        {
          icon: Users,
          title: 'Customer Portal',
          description: 'Self-serve subscription management for your customers.',
        },
      ]}
      setup={[
        {
          title: 'Create Lemon Squeezy Account',
          description:
            'Go to lemonsqueezy.com and create a store. Complete your onboarding to enable payments.',
        },
        {
          title: 'Get API Keys',
          description:
            'In Settings → API, create a new API key with full access. Copy your Store ID from the store settings.',
        },
        {
          title: 'Create Products',
          description:
            "Go to Products and create items for each tier. Each product variant has a unique ID you'll use for checkout.",
        },
        {
          title: 'Add Keys to App',
          description: 'Add these to your .env.local file',
          code: `# Lemon Squeezy API Keys
LEMONSQUEEZY_API_KEY="your_api_key_here"
LEMONSQUEEZY_STORE_ID="your_store_id"
LEMONSQUEEZY_WEBHOOK_SECRET="your_webhook_secret"

# Product Variant IDs (from Lemon Squeezy dashboard)
NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_STARTER="123456"
NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PRO="123457"
NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ENTERPRISE="123458"`,
          language: 'bash',
        },
        {
          title: 'Setup Webhooks',
          description: "In Settings → Webhooks, create a webhook pointing to your application's endpoint.",
          code: `# Production webhook URL
https://your-domain.com/api/lemonsqueezy/webhook

# Events to subscribe to:
# - order_created
# - subscription_created
# - subscription_updated
# - subscription_cancelled
# - subscription_payment_success
# - subscription_payment_failed`,
          language: 'bash',
          tip: 'Copy the webhook signing secret and add it as LEMONSQUEEZY_WEBHOOK_SECRET',
        },
      ]}
      usage={[
        {
          title: 'Checkout Button Component',
          description: 'Create a checkout session and redirect to Lemon Squeezy',
          code: `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function LemonSqueezyCheckout({ variantId, planName }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/lemonsqueezy/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId }),
      });

      const { url, error } = await response.json();

      if (error) {
        alert(error);
        return;
      }

      // Redirect to Lemon Squeezy Checkout
      window.location.href = url;
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? "Loading..." : \`Get \${planName}\`}
    </Button>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'API Route: Create Checkout',
          description: 'Server-side checkout creation',
          code: `// src/app/api/lemonsqueezy/checkout/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createLemonSqueezyCheckout } from "@/lib/lemonsqueezy";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { variantId } = await req.json();

  try {
    const checkoutUrl = await createLemonSqueezyCheckout({
      variantId,
      email: session.user.email!,
      userId: session.user.id,
      successUrl: \`\${env.client.NEXT_PUBLIC_APP_URL}/dashboard?success=true\`,
      cancelUrl: \`\${env.client.NEXT_PUBLIC_APP_URL}/pricing\`,
    });

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Lemon Squeezy checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}`,
          language: 'typescript',
        },
        {
          title: 'Webhook Handler',
          description: 'Handle Lemon Squeezy webhook events',
          code: `// src/app/api/lemonsqueezy/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { handleLemonSqueezyWebhook } from "@/lib/lemonsqueezy";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("X-Signature");

  // Verify webhook signature
  const hmac = crypto.createHmac("sha256", env.server.LEMONSQUEEZY_WEBHOOK_SECRET);
  const digest = hmac.update(body).digest("hex");

  if (signature !== digest) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  try {
    await handleLemonSqueezyWebhook(event);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Stripe Payments', href: '/docs/features/payments' }}
      next={{ title: 'Free Trials', href: '/docs/features/trial' }}
    >
      {/* Prerequisites */}
      <DocsSection title="Prerequisites">
        <DocsCard title="BEFORE YOU START">
          <ul className="space-y-2">
            <li className="font-mono text-xs">├─ Completed Getting Started guide</li>
            <li className="font-mono text-xs">├─ Database configured and running</li>
            <li className="font-mono text-xs">├─ Environment variables set up (.env.local)</li>
            <li className="font-mono text-xs">└─ Lemon Squeezy account with API key</li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Why Lemon Squeezy Section */}
      <DocsSection title="Stripe vs Lemon Squeezy">
        <DocsCard title="COMPARISON">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              Stripe
              <ul className="space-y-1">
                <li>• You are the merchant (handle taxes yourself)</li>
                <li>• Lower fees: 2.9% + $0.30</li>
                <li>• Full control over customer relationship</li>
                <li>• More payment methods and features</li>
                <li>• Better for B2B / US-focused</li>
              </ul>
            </div>
            <div className="space-y-2">
              Lemon Squeezy
              <ul className="space-y-1">
                <li>• They are the merchant (handle ALL taxes)</li>
                <li>• Higher fees: 5% + $0.50</li>
                <li>• Zero tax compliance burden</li>
                <li>• Great for digital products/SaaS</li>
                <li>• Better for global / B2C</li>
              </ul>
            </div>
          </div>
        </DocsCard>
        <DocsCallout variant="info" title="When to use Lemon Squeezy">
          Choose Lemon Squeezy if you sell to consumers globally and don&apos;t want to deal with
          VAT, GST, or sales tax registration in 100+ countries. The higher fees are worth it for
          the compliance peace of mind.
        </DocsCallout>
      </DocsSection>

      {/* Webhook Events */}
      <DocsSection title="Webhook Events">
        <DocsCard title="WEBHOOK EVENTS">
          <div className="space-y-2">
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">order_created</code>
              <span className="text-muted-foreground">New purchase completed</span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">subscription_created</code>
              <span className="text-muted-foreground">New subscription started</span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">subscription_updated</code>
              <span className="text-muted-foreground">Plan changed or modified</span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">subscription_cancelled</code>
              <span className="text-muted-foreground">Subscription ended</span>
            </div>
            <div className="flex justify-between">
              <code className="bg-muted px-1">subscription_payment_failed</code>
              <span className="text-muted-foreground">Payment attempt failed</span>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Common Questions */}
      <DocsSection title="Common Questions">
        <div className="space-y-4">
          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              What fees does Lemon Squeezy charge?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              5% + $0.50 per transaction. This includes all payment processing, tax handling, and
              fraud protection. No monthly fees.
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              How do payouts work?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              Lemon Squeezy pays out weekly or monthly (your choice) via PayPal or bank transfer.
              There&apos;s a small delay while they handle tax remittance.
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              Can I use both Stripe and Lemon Squeezy?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              Yes! Many SaaS apps use Stripe for B2B (where customers handle their own taxes) and
              Lemon Squeezy for B2C international sales.
            </div>
          </details>
        </div>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/trial">
            <DocsCard title="FREE TRIALS" className="h-full transition-all">
              Free Trials
              <p className="mb-6">Let users try your product before paying with trial periods.</p>
            </DocsCard>
          </Link>
          <Link href="/docs/features/payments">
            <DocsCard
              title="STRIPE PAYMENTS"
              className="h-full transition-all"
            >
              Stripe Setup
              <p className="mb-6">Set up Stripe for direct payment processing with lower fees.</p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
