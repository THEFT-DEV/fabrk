'use client';

/**
 * PostHog Pageview Tracker
 *
 * Tracks pageviews on route changes in Next.js App Router.
 * PostHog is initialized in instrumentation-client.ts (Next.js 15.3+).
 *
 * Usage in layout.tsx:
 *   <PostHogPageview />
 */

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

function PostHogPageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track pageview on route change
    if (pathname && posthog.__loaded) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * PostHog Pageview Component
 *
 * Wraps the pageview tracker in Suspense for Next.js compatibility.
 * Add this to your root layout to track pageviews on navigation.
 */
export function PostHogPageview() {
  return (
    <Suspense fallback={null}>
      <PostHogPageviewTracker />
    </Suspense>
  );
}

/**
 * Check if PostHog is enabled and loaded
 */
export function isPostHogEnabled(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    process.env.NEXT_PUBLIC_POSTHOG_KEY &&
    posthog.__loaded
  );
}

/**
 * Track custom event (with safe fallback)
 *
 * @example
 * trackEvent('button_clicked', { buttonId: 'signup' });
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (isPostHogEnabled()) {
    posthog.capture(eventName, properties);
  }
}

/**
 * Identify user (with safe fallback)
 *
 * @example
 * identifyUser(user.id, { email: user.email, plan: 'pro' });
 */
export function identifyUser(userId: string, properties?: Record<string, unknown>) {
  if (isPostHogEnabled()) {
    posthog.identify(userId, properties);
  }
}

/**
 * Reset user identity (call on logout)
 */
export function resetUser() {
  if (isPostHogEnabled()) {
    posthog.reset();
  }
}

/**
 * Set user properties without identifying
 *
 * @example
 * setUserProperties({ theme: 'dark', language: 'en' });
 */
export function setUserProperties(properties: Record<string, unknown>) {
  if (isPostHogEnabled()) {
    posthog.setPersonProperties(properties);
  }
}

// Re-export posthog for direct access when needed
export { posthog };

// Keep legacy export for backwards compatibility
export { PostHogPageview as PostHogProvider };
