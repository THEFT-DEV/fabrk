import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Clock, CreditCard, Bell, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Free Trial System - Fabrk Docs',
  description:
    'Offer free trials to convert more users. Configure trial length, show countdown banners, and integrate with Stripe billing.',
};

export default function TrialPage() {
  return (
    <FeatureGuideTemplate
      code="[0x30]"
      category="Features"
      title="Free Trial System"
      description="Let users try your product before they buy with time-limited trials."
      overview="A free trial lets potential customers use your product for a limited time before paying. It's like test-driving a car before buying it. When the trial period ends, users either pay to continue or lose access to premium features. Fabrk's trial system integrates with Stripe so the conversion to paid happens automatically."
      features={[
        {
          icon: Clock,
          title: 'Configurable Duration',
          description:
            'Set trial length from 7 to 30 days. 14 days recommended for most SaaS products.',
        },
        {
          icon: Bell,
          title: 'Countdown Banner',
          description: 'Automatic banner showing days remaining with color-coded urgency levels.',
        },
        {
          icon: CreditCard,
          title: 'Stripe Integration',
          description: 'Seamless trial-to-paid conversion with optional credit card upfront.',
        },
        {
          icon: TrendingUp,
          title: 'Abuse Prevention',
          description: "Track users who've already used trials to prevent multiple free trials.",
        },
      ]}
      setup={[
        {
          title: 'Configure Trial Settings',
          description: 'Configure trial settings in src/config.js',
          code: `// src/config.js

export const config = {
  features: {
    // Enable/disable trial system
    trialPeriod: true,

    // Number of days for free trial
    trialDays: 14,

    // Require credit card to start trial?
    // true: Card collected at signup, charged when trial ends
    // false: No card needed, user prompted to pay at trial end
    trialRequiresCard: false,
  },
};`,
          language: 'javascript',
        },
      ]}
      usage={[
        {
          title: 'Check Trial Status',
          description: 'Use these helpers to check trial status',
          code: `import {
  isOnTrial,
  getTrialDaysRemaining,
  hasTrialExpired,
  hasUsedTrial
} from "@/lib/trial";

// Check if user is currently on trial
const onTrial = isOnTrial(user.trialEndsAt);

// Get days remaining (0 if expired)
const daysLeft = getTrialDaysRemaining(user.trialEndsAt);

// Check if trial has expired
const expired = hasTrialExpired(user.trialEndsAt);

// Check if user already used their trial (prevents abuse)
const usedTrial = hasUsedTrial(user);`,
          language: 'typescript',
        },
        {
          title: 'Protect Premium Features',
          description: 'Block access when trial expires',
          code: `// In your API route
import { auth } from "@/lib/auth";
import { hasTrialExpired } from "@/lib/trial";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user has active subscription OR valid trial
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { tier: true, trialEndsAt: true },
  });

  const hasAccess =
    user.tier !== "free" || // Paid user
    (user.trialEndsAt && !hasTrialExpired(user.trialEndsAt)); // Valid trial

  if (!hasAccess) {
    return NextResponse.json(
      { error: "Please subscribe to access this feature" },
      { status: 403 }
    );
  }

  // User has access - continue with premium feature
  return NextResponse.json({ data: "..." });
}`,
          language: 'typescript',
        },
        {
          title: 'Using the Trial Banner',
          description: 'Add the banner to your dashboard layout',
          code: `import { TrialBanner } from "@/components/billing/trial-banner";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <TrialBanner />
      <main>{children}</main>
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Stripe Trial Integration',
          description: 'If you require credit card upfront, Stripe handles the trial automatically',
          code: `// Create subscription with trial period
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: priceId }],
  trial_period_days: config.features.trialDays, // e.g., 14

  // Optional: Don't charge if trial ends and card fails
  payment_settings: {
    save_default_payment_method: "on_subscription",
  },
});`,
          language: 'typescript',
        },
      ]}
      previous={{
        title: 'Cookie Consent',
        href: '/docs/features/cookie-consent',
      }}
      next={{ title: 'Notifications', href: '/docs/features/notifications' }}
    >
      {/* Prerequisites */}
      <DocsSection title="Prerequisites">
        <DocsCard title="BEFORE YOU START">
          <ul className="space-y-2">
            <li className="font-mono text-xs">├─ Completed Getting Started guide</li>
            <li className="font-mono text-xs">├─ Database configured and running</li>
            <li className="font-mono text-xs">├─ Environment variables set up (.env.local)</li>
            <li className="font-mono text-xs">└─ Payment provider configured (Stripe or Polar)</li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* How Trials Work Section */}
      <DocsSection title="How Fabrk Trials Work">
        <div className="space-y-4">
          <DocsCard title="STEP 01">
            <p className="mb-4">
              User clicks &quot;Start Free Trial&quot; on your pricing page. They create an account
              (no credit card required by default) and immediately get access to premium features.
            </p>
          </DocsCard>
          <DocsCard title="STEP 02">
            <p className="mb-4">
              While on trial, users see a banner showing how many days are left. This creates gentle
              urgency without being annoying.
            </p>
          </DocsCard>
          <DocsCard title="STEP 03">
            <p className="mb-4">
              When trial is almost over (last 3 days), the banner becomes more prominent. Users are
              prompted to subscribe before losing access.
            </p>
          </DocsCard>
          <DocsCard title="STEP 04">
            <p className="mb-4">
              When trial ends, users can no longer access premium features. They see a message
              encouraging them to subscribe. If you require credit card upfront, Stripe
              automatically starts charging.
            </p>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Banner States Section */}
      <DocsSection title="Trial Banner States">
        <DocsCard title="BANNER STATES">
          <div className="space-y-4">
            <div className="border-border bg-card flex items-center gap-4 border p-4">
              <div className="bg-success h-3 w-3 rounded-none"></div>
              <div>
                <p className="font-medium">Plenty of time (8+ days)</p>
                <p>&quot;You have 12 days left in your trial&quot;</p>
              </div>
            </div>
            <div className="border-border bg-card flex items-center gap-4 border p-4">
              <div className="bg-warning h-3 w-3 rounded-none"></div>
              <div>
                <p className="font-medium">Running low (4-7 days)</p>
                <p>&quot;5 days left - Subscribe to keep access&quot;</p>
              </div>
            </div>
            <div className="border-border bg-card flex items-center gap-4 border p-4">
              <div className="bg-destructive h-3 w-3 rounded-none"></div>
              <div>
                <p className="font-medium">Urgent (1-3 days)</p>
                <p>&quot;Trial ends tomorrow! Subscribe now&quot;</p>
              </div>
            </div>
            <div className="border-border bg-card flex items-center gap-4 border p-4">
              <div className="bg-muted-foreground h-3 w-3 rounded-none"></div>
              <div>
                <p className="font-medium">Expired</p>
                <p>&quot;Your trial has ended. Subscribe to continue&quot;</p>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">1.</span>
              <span>
                <strong>Email reminders:</strong> Send emails at trial midpoint, 3 days before, and
                1 day before expiration.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">2.</span>
              <span>
                <strong>Show value early:</strong> Get users to their &quot;aha moment&quot; in the
                first 2 days, not day 14.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">3.</span>
              <span>
                <strong>Don&apos;t restrict too much:</strong> Let trial users see the full product.
                Restricted trials feel frustrating.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">4.</span>
              <span>
                <strong>Track engagement:</strong> Users who don&apos;t engage by day 3 rarely
                convert. Reach out proactively.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">5.</span>
              <span>
                <strong>Prevent abuse:</strong> Fabrk tracks who has used a trial before, preventing
                multiple free trials per user.
              </span>
            </li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Common Questions Section */}
      <DocsSection title="Common Questions">
        <div className="space-y-4">
          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-medium">
              Can users get multiple free trials?
            </summary>
            <div className="text-muted-foreground border-t p-4 text-sm">
              <p>
                No. Fabrk tracks whether a user has already used a trial. Once they&apos;ve had one,
                they can only subscribe (no second trial). This prevents abuse.
              </p>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-medium">
              What happens to user data when trial expires?
            </summary>
            <div className="text-muted-foreground border-t p-4 text-sm">
              <p>
                User data is preserved. They just can&apos;t access premium features. If they
                subscribe later, all their data is still there. This encourages conversion.
              </p>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-medium">
              Should I require a credit card for trials?
            </summary>
            <div className="text-muted-foreground border-t p-4 text-sm">
              <p>
                It depends on your business. Card-required trials have fewer signups but higher
                conversion (40-60%). No-card trials get more signups but lower conversion (10-20%).
                Test both if you&apos;re unsure.
              </p>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-medium">
              How do I extend someone&apos;s trial?
            </summary>
            <div className="text-muted-foreground border-t p-4 text-sm">
              <p>
                Update the user&apos;s <code className="bg-muted px-1 font-mono">trialEndsAt</code>{' '}
                field in the database to a future date. You can also do this via Stripe if using
                their trial system.
              </p>
            </div>
          </details>
        </div>
      </DocsSection>

      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/features/payments"
            title="Payments"
            description="Set up Stripe to handle trial-to-paid conversion."
          />
          <DocsLinkCard
            href="/docs/features/emails"
            title="Email Reminders"
            description="Send trial reminder emails to increase conversion."
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
