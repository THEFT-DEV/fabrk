import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import Link from 'next/link';
import { CreditCard, RefreshCw, Clock, Users, Bell, Shield } from 'lucide-react';

export const metadata = {
  title: 'Stripe Payments - Fabrk Docs',
  description:
    'Accept payments with Stripe. Set up subscriptions, one-time payments, webhooks, and customer portal integration.',
};

export default function PaymentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x30]"
      category="Features"
      title="Stripe Payments"
      description="Accept payments and manage subscriptions with Stripe."
      overview="When someone buys your product, Fabrk uses Stripe to handle everything securely. Customer clicks Buy, enters payment info on Stripe's checkout page (you never see their card number), Stripe charges the card and notifies your app via webhook, then your app grants access. The key benefit: You never handle sensitive credit card data. Stripe is PCI compliant and handles all the security complexity."
      features={[
        {
          icon: CreditCard,
          title: 'One-Time Payments',
          description:
            'Sell lifetime access or single products. Customer pays once, gets access forever.',
        },
        {
          icon: RefreshCw,
          title: 'Subscriptions',
          description: 'Monthly or yearly recurring payments. Automatic billing and renewal.',
        },
        {
          icon: Clock,
          title: 'Free Trials',
          description: 'Let users try before they buy. Converts to paid at trial end.',
        },
        {
          icon: Users,
          title: 'Customer Portal',
          description: 'Users manage their own billing - update card, change plan, cancel.',
        },
        {
          icon: Bell,
          title: 'Webhook Handling',
          description: 'Your app reacts to payment events in real-time.',
        },
        {
          icon: Shield,
          title: 'Duplicate Protection',
          description: 'Prevents accidental double charges from page refreshes.',
        },
      ]}
      setup={[
        {
          title: 'Create Stripe Account',
          description:
            "Go to stripe.com and create an account. It's free to sign up. You won't pay anything until you process real payments.",
        },
        {
          title: 'Get API Keys',
          description:
            'In the Stripe Dashboard, go to Developers → API keys. Copy your test keys. Test keys start with sk_test_ and pk_test_. Live keys start with sk_live_ and pk_live_.',
        },
        {
          title: 'Create Products',
          description:
            'Go to Products in Stripe Dashboard. Create products for each pricing tier (e.g., Starter, Pro, Enterprise). Each product has a price ID like price_1234567890.',
        },
        {
          title: 'Add Keys to App',
          description: 'Add these to your .env.local file',
          code: `# Stripe API Keys (test mode - get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY="sk_test_your_secret_key"  # Server-side only, NEVER expose to browser
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"  # Client-side safe

# Product Lookup Key (NOT a price ID)
# Create in Stripe Dashboard: Products → Your Product → Pricing → Lookup key field
# Lookup keys let you change prices in Stripe without updating code
NEXT_PUBLIC_STRIPE_PRICE_FABRK="fabrk_purchase"  # This is a lookup key, not price_1234567890

# Optional: Promotion code ID for discounts (if using early adopter offer)
STRIPE_COUPON_EARLY_ADOPTER="promo_1SVGK4P7kSSEYWlXBq1LtaNM"

# Why lookup keys instead of price IDs?
# - Price IDs (price_1234...) are hardcoded - changing price requires code update
# - Lookup keys (fabrk_purchase) are flexible - change price in Stripe Dashboard anytime`,
          language: 'bash',
        },
        {
          title: 'Setup Webhooks',
          description:
            'Install the Stripe CLI to test webhooks locally. Webhooks notify your app when payments succeed or fail.',
          code: `# Step 1: Install Stripe CLI (one-time setup)
# macOS:
brew install stripe/stripe-cli/stripe

# Windows:
# Download from https://github.com/stripe/stripe-cli/releases

# Linux:
# See https://stripe.com/docs/stripe-cli#install

# Step 2: Login to Stripe
stripe login
# Opens browser window to authenticate

# Step 3: Forward webhooks to your local app
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Expected output:
# > Ready! Your webhook signing secret is whsec_abc123def456...
#
# Step 4: Copy the webhook secret (starts with whsec_)
# Add it to .env.local:
STRIPE_WEBHOOK_SECRET="whsec_abc123def456..."

# Leave this terminal window OPEN while developing
# You'll see webhook events appear here when you test payments`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Checkout Button Component',
          description: 'Add this to any pricing card or button',
          code: `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CheckoutButton({ priceId, planName }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Call your checkout API
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const { url, error } = await response.json();

      if (error) {
        alert(error);
        return;
      }

      // Redirect to Stripe Checkout
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
          title: 'Customer Portal Link',
          description: 'Let users manage their own subscription',
          code: `"use client";

import { Button } from "@/components/ui/button";

export function ManageBillingButton() {
  const handlePortal = async () => {
    const response = await fetch("/api/stripe/portal", {
      method: "POST",
    });

    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <Button variant="outline" onClick={handlePortal}>
      Manage Billing
    </Button>
  );
}`,
          language: 'tsx',
        },
      ]}
      previous={{ title: 'Database', href: '/docs/features/database' }}
      next={{ title: 'Google OAuth', href: '/docs/features/google-oauth' }}
    >
      {/* Security Warning for API Keys */}
      <DocsSection title="Security">
        <DocsCallout variant="danger" title="NEVER COMMIT SECRETS TO GIT">
          <div className="space-y-4">
            <p>
              <strong>CRITICAL:</strong> The STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET are highly
              sensitive. Leaking them gives attackers full access to your Stripe account.
            </p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong>Never commit</strong> .env files to git. Always use .env.local (in
                .gitignore) for local development.
              </li>
              <li>
                <strong>Never expose</strong> STRIPE_SECRET_KEY to the browser. Only use it in
                server-side code (API routes, server components).
              </li>
              <li>
                <strong>Use secure storage</strong> in production: Vercel Environment Variables, AWS
                Secrets Manager, or similar.
              </li>
              <li>
                <strong>Rotate keys immediately</strong> if you suspect they've been exposed. Go to
                Stripe Dashboard → Developers → API keys → Roll key.
              </li>
            </ul>
            <p>
              <strong>Safe variables:</strong> NEXT_PUBLIC_* variables are safe for client-side use.
              These include pk_test_ (publishable keys) but NOT sk_test_ (secret keys).
            </p>
          </div>
        </DocsCallout>
      </DocsSection>

      {/* Why Stripe Section */}
      <DocsSection title="Why Stripe">
        <DocsCard title="WHY STRIPE">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              For You
              <ul className="space-y-1">
                <li>• No need to handle credit card security</li>
                <li>• Instant access to payment data/analytics</li>
                <li>• Automatic invoices and receipts</li>
                <li>• Built-in fraud protection</li>
              </ul>
            </div>
            <div className="space-y-2">
              For Your Customers
              <ul className="space-y-1">
                <li>• Trusted, familiar checkout experience</li>
                <li>• Apple Pay, Google Pay support</li>
                <li>• Self-serve subscription management</li>
                <li>• Easy refund process</li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Understanding Webhooks */}
      <DocsSection title="Understanding Webhooks">
        <DocsCallout variant="info" title="Think of webhooks like a doorbell">
          When Stripe processes a payment, it &quot;rings your doorbell&quot; (sends a webhook) to
          let you know something happened. Your app answers the door and takes appropriate action.
          Without webhooks, you&apos;d have to constantly ask Stripe &quot;did anyone pay yet?&quot;
          - which is inefficient and slow. With webhooks, Stripe tells you instantly.
        </DocsCallout>
        <DocsCard title="WEBHOOK EVENTS">
          <p className="mb-6">
            Common webhook events: <code className="bg-muted px-1">checkout.session.completed</code>{' '}
            (someone paid),
            <code className="bg-muted ml-1 px-1">customer.subscription.deleted</code> (someone
            cancelled),
            <code className="bg-muted ml-1 px-1">invoice.payment_failed</code> (payment didn&apos;t
            go through).
          </p>
        </DocsCard>
      </DocsSection>

      {/* Testing Payments */}
      <DocsSection title="Testing Payments">
        <DocsCard title="TEST CARDS">
          <p className="mb-6">
            Always test payments before going live. Stripe provides test card numbers that simulate
            different scenarios without charging real money.
          </p>
          Test Card Numbers
          <div className="mt-2 space-y-2">
            <div className="border-border flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Successful payment</span>
              <code className="bg-muted px-1">4242 4242 4242 4242</code>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Card declined</span>
              <code className="bg-muted px-1">4000 0000 0000 0002</code>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Requires authentication</span>
              <code className="bg-muted px-1">4000 0025 0000 3155</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Insufficient funds</span>
              <code className="bg-muted px-1">4000 0000 0000 9995</code>
            </div>
          </div>
          <p className="mt-4">
            Use any future expiration date, any 3-digit CVC, and any billing ZIP code.
          </p>
        </DocsCard>
      </DocsSection>

      {/* Common Questions */}
      <DocsSection title="Common Questions">
        <div className="space-y-4">
          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              How much does Stripe charge?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              Standard pricing is 2.9% + 30 cents per successful transaction. For example, a $100
              payment costs you $3.20. There are no monthly fees.
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              When do I get my money?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              By default, Stripe sends payouts to your bank account on a 2-day rolling basis. You
              can change this to daily or weekly in your Stripe settings.
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              What happens if a payment fails?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              Stripe automatically retries failed subscription payments up to 4 times over a few
              weeks. You&apos;ll receive webhook events to handle access accordingly.
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              How do I handle refunds?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              Issue refunds directly from the Stripe Dashboard. Go to the payment, click
              &quot;Refund&quot;, and enter the amount. Stripe sends a webhook so you can revoke
              access.
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              Can customers pay in different currencies?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              Yes! Stripe supports 135+ currencies. You can create prices in different currencies or
              let Stripe auto-convert based on the customer&apos;s location.
            </div>
          </details>
        </div>
      </DocsSection>

      {/* Going Live Checklist */}
      <DocsSection title="Going Live Checklist">
        <DocsCard title="GOING LIVE">
          <p className="mb-4">Before accepting real payments:</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <input type="checkbox" className="rounded" readOnly />
              <span>Switch to live API keys (sk_live_, pk_live_)</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="rounded" readOnly />
              <span>Create webhook endpoint in Stripe Dashboard (not CLI)</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="rounded" readOnly />
              <span>Add production webhook secret to your hosting provider</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="rounded" readOnly />
              <span>Test a real $1 transaction and refund it</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="rounded" readOnly />
              <span>Enable Stripe Radar for fraud protection</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="rounded" readOnly />
              <span>Set up email receipts in Stripe settings</span>
            </li>
          </ul>
        </DocsCard>
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
          <Link href="/docs/features/emails">
            <DocsCard
              title="TRANSACTIONAL EMAILS"
              className="h-full transition-all"
            >
              <p className="mb-6">Send purchase confirmations and invoices to customers.</p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
