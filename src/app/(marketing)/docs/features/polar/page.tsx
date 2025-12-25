import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import Link from 'next/link';
import { CircleDollarSign, CreditCard, Zap, Shield, Tag, Users } from 'lucide-react';

export const metadata = {
  title: 'Polar.sh Payments - Fabrk Docs',
  description:
    'Accept payments with Polar.sh. Optimized for digital products and SaaS with built-in discount codes.',
};

export default function PolarPage() {
  return (
    <FeatureGuideTemplate
      code="[0x30]"
      category="Features"
      title="Polar.sh"
      description="Payment processing optimized for digital products and indie hackers."
      overview="Polar.sh is a modern payment platform designed specifically for digital products, open-source creators, and indie hackers. It offers simple integration, built-in discount codes, and lower fees than traditional processors. Perfect for selling boilerplates, courses, and digital downloads."
      features={[
        {
          icon: CircleDollarSign,
          title: 'Simple Pricing',
          description: 'Competitive fees with transparent pricing, no hidden charges.',
        },
        {
          icon: Zap,
          title: 'Quick Integration',
          description: 'Get up and running in minutes with the SDK.',
        },
        {
          icon: Tag,
          title: 'Built-in Discounts',
          description: 'Create discount codes with usage limits directly in dashboard.',
        },
        {
          icon: Shield,
          title: 'Secure Checkout',
          description: 'PCI-compliant hosted checkout pages.',
        },
        {
          icon: CreditCard,
          title: 'Multiple Methods',
          description: 'Cards, Apple Pay, Google Pay supported.',
        },
        {
          icon: Users,
          title: 'Customer Portal',
          description: 'Self-serve license management for customers.',
        },
      ]}
      setup={[
        {
          title: 'Create Polar Account',
          description:
            'Go to polar.sh and create an account. Set up your organization and complete onboarding.',
        },
        {
          title: 'Get API Keys',
          description:
            'Go to Settings → Developer Settings and create an access token with full permissions.',
        },
        {
          title: 'Create Product',
          description:
            'Go to Products and create your digital product. Copy the Product ID from the product details page.',
        },
        {
          title: 'Add Keys to App',
          description: 'Add these to your .env.local file',
          code: `# Polar.sh API Keys
POLAR_ACCESS_TOKEN="your_access_token_here"
NEXT_PUBLIC_POLAR_PRODUCT_ID="your_product_id"

# Optional: Webhook secret for order notifications
POLAR_WEBHOOK_SECRET="your_webhook_secret"`,
          language: 'bash',
        },
        {
          title: 'Create Discount Code (Optional)',
          description: 'In Marketing → Discounts, create a discount code with usage limits.',
          code: `# The discount ID is found in the discount details
# You can set auto-expiring discounts (e.g., first 100 customers)
FABRK_DISCOUNT_ID="1161689c-dbc2-4e53-8c18-43f4af7aaa3f"`,
          language: 'bash',
          tip: 'Use usage-limited discounts for launch promotions!',
        },
      ]}
      usage={[
        {
          title: 'Checkout Button Component',
          description: 'Pre-built component that handles checkout flow',
          code: `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function PolarCheckoutButton({
  customerEmail,
  discountId,
  children = "Get Started - $199",
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/polar/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail,
          discountId,
          metadata: { timestamp: new Date().toISOString() },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || "Failed to create checkout");
      }

      // Redirect to Polar.sh checkout
      window.location.href = data.checkoutUrl;
    } catch (error) {
      toast.error(error.message || "Failed to start checkout");
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'API Route: Create Checkout',
          description: 'Server-side checkout session creation with rate limiting',
          code: `// src/app/api/polar/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, isPolarConfigured } from "@/lib/polar";
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from "@/lib/security/rate-limit";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  // Rate limit: 10 requests/minute
  const identifier = getClientIdentifier(request);
  const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.strict);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  // Mock checkout for development
  if (!isPolarConfigured()) {
    const baseUrl = env.client.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.json({
      checkoutUrl: \`\${baseUrl}/purchase/success?mock=true\`,
      _mock: true,
    });
  }

  try {
    const { customerEmail, discountId, metadata } = await request.json();
    const baseUrl = env.client.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const checkout = await createCheckoutSession({
      customerEmail,
      successUrl: \`\${baseUrl}/purchase/success\`,
      discountId,
      metadata: { source: "website", ...metadata },
    });

    return NextResponse.json({
      checkoutUrl: checkout.url,
      checkoutId: checkout.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}`,
          language: 'typescript',
        },
        {
          title: 'Polar SDK Functions',
          description: 'Core functions for interacting with Polar API',
          code: `// src/lib/polar.ts
import { Polar } from "@polar-sh/sdk";
import { env } from "@/lib/env";

export const isPolarConfigured = () => !!env.server.POLAR_ACCESS_TOKEN;

export const polar = new Polar({
  accessToken: env.server.POLAR_ACCESS_TOKEN || "not-configured",
});

export const PRODUCT_ID = env.client.NEXT_PUBLIC_POLAR_PRODUCT_ID;

export async function createCheckoutSession(params: {
  customerEmail?: string;
  successUrl: string;
  discountId?: string;
  metadata?: Record<string, string>;
}) {
  if (!PRODUCT_ID) {
    throw new Error("Polar product ID not configured");
  }

  const checkout = await polar.checkouts.create({
    products: [PRODUCT_ID],
    discountId: params.discountId,
    customerEmail: params.customerEmail,
    successUrl: params.successUrl,
    metadata: params.metadata,
  });

  return checkout;
}

export async function getProduct() {
  if (!PRODUCT_ID) throw new Error("Product ID not configured");
  return polar.products.get({ id: PRODUCT_ID });
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Stripe Payments', href: '/docs/features/payments' }}
      next={{ title: 'Lemon Squeezy', href: '/docs/features/lemonsqueezy' }}
    >
      {/* Prerequisites */}
      <DocsSection title="Prerequisites">
        <DocsCard title="BEFORE YOU START">
          <ul className="space-y-2">
            <li className="font-mono text-xs">├─ Completed Getting Started guide</li>
            <li className="font-mono text-xs">├─ Database configured and running</li>
            <li className="font-mono text-xs">├─ Environment variables set up (.env.local)</li>
            <li className="font-mono text-xs">└─ Polar.sh account with access token</li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Polar vs Stripe vs Lemon Squeezy */}
      <DocsSection title="Payment Provider Comparison">
        <DocsCard title="COMPARISON">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              Polar.sh
              <ul className="space-y-1">
                <li>• Built for digital products</li>
                <li>• Simple SDK, quick setup</li>
                <li>• Built-in discount codes</li>
                <li>• Great for indie hackers</li>
                <li>• ~5% + processing fees</li>
              </ul>
            </div>
            <div className="space-y-2">
              Stripe
              <ul className="space-y-1">
                <li>• Industry standard</li>
                <li>• Most payment methods</li>
                <li>• Complex subscriptions</li>
                <li>• You handle taxes</li>
                <li>• 2.9% + $0.30</li>
              </ul>
            </div>
            <div className="space-y-2">
              Lemon Squeezy
              <ul className="space-y-1">
                <li>• Merchant of record</li>
                <li>• Handles ALL taxes</li>
                <li>• Zero tax compliance</li>
                <li>• Global focus</li>
                <li>• 5% + $0.50</li>
              </ul>
            </div>
          </div>
        </DocsCard>
        <DocsCallout variant="info" title="When to use Polar">
          Choose Polar for selling digital products like boilerplates, templates, courses, or
          one-time purchases. It&apos;s optimized for indie hackers and has the simplest
          integration.
        </DocsCallout>
      </DocsSection>

      {/* Dev Mode */}
      <DocsSection title="Development Mode">
        <DocsCard title="MOCK CHECKOUT">
          <p className="mb-6">
            When <code className="bg-muted px-1">POLAR_ACCESS_TOKEN</code> is not set, the checkout
            API returns a mock response that redirects to your success page. This lets you test the
            full purchase flow without real payments.
          </p>
          <div className="bg-muted mt-4 p-4">
            <pre>{`// Mock response when Polar isn't configured
{
  "checkoutUrl": "http://localhost:3000/purchase/success?mock=true",
  "_mock": true
}`}</pre>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Discount Strategies */}
      <DocsSection title="Discount Strategies">
        <DocsCard title="LAUNCH DISCOUNTS">
          <div className="space-y-4">
            <div className="border-border border-b pb-4">
              Usage-Limited Discounts
              <p className="mb-6">
                Create discounts that auto-expire after N uses. Perfect for &quot;First 100
                customers get 25% off&quot; promotions.
              </p>
            </div>
            <div className="border-border border-b pb-4">
              Time-Limited Discounts
              <p className="mb-6">Set expiration dates for launch week or holiday promotions.</p>
            </div>
            <div className="pb-4">
              Exit Intent Discounts
              <p className="mb-6">
                Pass a special discount ID when user tries to leave. See{' '}
                <code className="bg-muted px-1">exit-intent-popup.tsx</code>.
              </p>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Files Reference */}
      <DocsSection title="File Reference">
        <DocsCard title="PROJECT FILES">
          <div className="space-y-2">
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">src/lib/polar.ts</code>
              <span className="text-muted-foreground">SDK client and helpers</span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">src/app/api/polar/checkout/route.ts</code>
              <span className="text-muted-foreground">Checkout API endpoint</span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">src/components/polar/checkout-button.tsx</code>
              <span className="text-muted-foreground">Checkout button component</span>
            </div>
            <div className="flex justify-between">
              <code className="bg-muted px-1">src/components/polar/discount-counter.tsx</code>
              <span className="text-muted-foreground">Usage counter display</span>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/lemonsqueezy">
            <DocsCard
              title="LEMON SQUEEZY"
              className="h-full transition-all"
            >
              Lemon Squeezy
              <p className="mb-6">Alternative with merchant of record for global tax handling.</p>
            </DocsCard>
          </Link>
          <Link href="/docs/features/payments">
            <DocsCard
              title="STRIPE PAYMENTS"
              className="h-full transition-all"
            >
              Stripe Setup
              <p className="mb-6">Industry-standard payment processing with subscriptions.</p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
