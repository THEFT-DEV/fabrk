/**
 * ✅ FABRK COMPONENT
 * PostHog Integration Guide
 * Uses LibraryGuideTemplate for consistent structure
 */
import { BarChart3 } from 'lucide-react';
import { LibraryGuideTemplate, LibraryCodeBlock } from '@/components/library';

export default function PostHogIntegrationPage() {
  return (
    <LibraryGuideTemplate
      breadcrumbs={[{ label: 'Docs', href: '/library/docs' }, { label: 'PostHog Integration' }]}
      icon={BarChart3}
      badgePrefix="INTEGRATION"
      badge="POSTHOG_ANALYTICS"
      title="PostHog Integration"
      description="Add analytics and feature flags to track user behavior in templates."
      meta={{ time: '~10 minutes', level: 'Beginner' }}
      overview={{
        text: 'Fabrk includes optional PostHog integration that activates only when configured. No setup required if you don\'t need analytics.',
        highlights: [
          'Optional initialization (graceful degradation)',
          'Client-side event tracking with safe helpers',
          'Server-side tracking for API routes',
          'Automatic pageview tracking on route changes',
        ],
      }}
      steps={[
        {
          code: '0x01',
          title: 'SETUP (OPTIONAL)',
          content: (
            <LibraryCodeBlock
              code={`# .env.local
NEXT_PUBLIC_POSTHOG_KEY="phc_your_key"  # Optional
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"  # Optional

# If not set, PostHog won't initialize (no errors)
# App works perfectly without analytics`}
              language="bash"
              maxHeight="120px"
            />
          ),
        },
        {
          code: '0x02',
          title: 'TRACK EVENTS (CLIENT)',
          content: (
            <LibraryCodeBlock
              code={`"use client";

import { trackEvent } from "@/lib/analytics/posthog-provider";

export default function DashboardButton() {
  const handleClick = () => {
    // Safe tracking - no-op if PostHog not configured
    trackEvent("dashboard_button_clicked", {
      button: "export_data",
      location: "analytics_page",
    });
  };

  return <button onClick={handleClick}>Export</button>;
}`}
              language="tsx"
              maxHeight="300px"
            />
          ),
        },
        {
          code: '0x03',
          title: 'TRACK EVENTS (SERVER)',
          content: (
            <LibraryCodeBlock
              code={`// Use safe helper functions from events.ts
import { trackUserSignup, trackOrgCreated } from "@/lib/analytics/events";

// Track user signup
await trackUserSignup(userId, email, {
  provider: "google",
});

// Track organization creation
await trackOrgCreated(userId, orgId, "My Org", {
  memberCount: 1,
});`}
              language="typescript"
              maxHeight="240px"
            />
          ),
        },
        {
          code: '0x04',
          title: 'AUTOMATIC PAGEVIEWS',
          content: (
            <LibraryCodeBlock
              code={`// PostHogProvider automatically tracks pageviews
// Already integrated in src/app/layout.tsx

import { PostHogProvider } from "@/lib/analytics/posthog-provider";

export default function RootLayout({ children }) {
  return (
    <PostHogProvider>
      {children}  {/* Pageviews tracked on route change */}
    </PostHogProvider>
  );
}`}
              language="tsx"
              maxHeight="240px"
            />
          ),
        },
      ]}
      relatedLinks={[
        {
          label: 'Customize templates',
          href: '/library/docs/customization',
          description: 'to match your brand',
        },
        {
          label: 'View Analytics Dashboard',
          href: '/library/analytics-dashboard',
          description: 'template',
        },
      ]}
    />
  );
}
