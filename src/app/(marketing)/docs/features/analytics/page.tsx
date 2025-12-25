import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { BarChart3, User, Video, ToggleLeft } from 'lucide-react';

export const metadata = {
  title: 'Analytics with PostHog - Fabrk Documentation',
  description:
    'Learn how to integrate PostHog analytics for event tracking, user identification, and feature flags.',
};

export default function AnalyticsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x70]"
      category="Features"
      title="Analytics With PostHog"
      description="Product analytics, session recordings, and feature flags with PostHog integration."
      overview="Fabrk integrates PostHog for comprehensive product analytics. Track user behavior, analyze conversion funnels, record sessions, and manage feature flags all in one platform."
      features={[
        {
          icon: BarChart3,
          title: 'Event Tracking',
          description: 'Custom events with properties for detailed analytics.',
        },
        {
          icon: User,
          title: 'User Identification',
          description: 'Link anonymous and authenticated users across sessions.',
        },
        {
          icon: Video,
          title: 'Session Recording',
          description: 'Watch user sessions to understand behavior (optional).',
        },
        {
          icon: ToggleLeft,
          title: 'Feature Flags',
          description: 'A/B testing and gradual rollouts built-in.',
        },
      ]}
      setup={[
        {
          title: 'Configure PostHog (Optional)',
          description: 'PostHog only activates when API key is present. Leave empty to disable.',
          code: `# .env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key  # Optional
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com  # Optional

# If not set, PostHog will not initialize (graceful degradation)`,
          language: 'bash',
        },
        {
          title: 'Automatic Initialization',
          description: 'PostHog initializes automatically if configured (no setup needed)',
          code: `// src/lib/analytics/posthog-provider.tsx
// Provider checks for NEXT_PUBLIC_POSTHOG_KEY
// If present: initializes PostHog
// If absent: no-op (app works without analytics)

// Already integrated in src/app/layout.tsx
import { PostHogProvider } from '@/lib/analytics/posthog-provider';

export default function RootLayout({ children }) {
  return (
    <PostHogProvider>
      {children}
    </PostHogProvider>
  );
}`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Client-Side Event Tracking',
          description: 'Track custom events in client components',
          code: `"use client";

import { trackEvent } from "@/lib/analytics/posthog-provider";

export function CheckoutButton({ plan, price }: Props) {
  const handleCheckout = async () => {
    // Safe tracking - no-op if PostHog not configured
    trackEvent("checkout_started", {
      plan_name: plan,
      plan_price: price,
      currency: "USD",
    });

    // Proceed with checkout...
  };

  return (
    <button onClick={handleCheckout}>
      Subscribe to {plan}
    </button>
  );
}

// Common events to track:
// - user_signed_up
// - checkout_started
// - payment_completed
// - feature_used
// - org_created
// - member_invited`,
          language: 'tsx',
        },
        {
          title: 'Server-Side Event Tracking',
          description: 'Track events from API routes and Server Actions using safe helpers',
          code: `// src/lib/analytics/events.ts provides safe helper functions
import { trackUserSignup, trackOrgCreated, trackSubscriptionStarted } from "@/lib/analytics/events";

// Example: Track user signup in API route
export async function POST(request: Request) {
  const { email, userId } = await request.json();

  // Create user in database...

  // Track signup (no-op if PostHog not configured)
  await trackUserSignup(userId, email, {
    provider: "credentials",
    timestamp: new Date().toISOString(),
  });

  return Response.json({ success: true });
}

// Example: Track organization creation
await trackOrgCreated(userId, orgId, orgName, {
  memberCount: 1,
  plan: "free",
});

// Example: Track subscription
await trackSubscriptionStarted(userId, "pro", 99, "month");`,
          language: 'typescript',
        },
        {
          title: 'Page View Tracking (Automatic)',
          description: 'Page views are automatically tracked by PostHogProvider',
          code: `// Page views are handled automatically by PostHogProvider
// No additional code needed!

// The provider tracks:
// - Route changes (usePathname)
// - Query parameters (useSearchParams)
// - Full URL with origin

// Events appear in PostHog as "$pageview" with:
// - $current_url: Full page URL
// - Automatic user properties
// - Session data`,
          language: 'typescript',
        },
      ]}
      previous={{
        title: 'Background Jobs',
        href: '/docs/features/background-jobs',
      }}
      next={{ title: 'Feature Flags', href: '/docs/features/feature-flags' }}
    >
      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <ul className="space-y-1">
            <li>
              ├─ <strong>Use consistent naming:</strong> Follow a convention like{' '}
              <code className="bg-muted px-1">object_action</code>
            </li>
            <li>
              ├─ <strong>Don&apos;t over-track:</strong> Focus on meaningful events that inform
              decisions
            </li>
            <li>
              ├─ <strong>Include context:</strong> Add properties that help segment and analyze
            </li>
            <li>
              ├─ <strong>Respect privacy:</strong> Don&apos;t track PII unless necessary
            </li>
            <li>
              ├─ <strong>Test events:</strong> Verify events appear in PostHog dashboard
            </li>
            <li>
              └─ <strong>Document events:</strong> Maintain a tracking plan for your team
            </li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
