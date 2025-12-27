'use client';

/**
 * Optional PostHog Analytics Provider
 *
 * Industry-standard implementation (2025):
 * - Only initializes if NEXT_PUBLIC_POSTHOG_KEY is set
 * - Uses automatic pageview tracking
 * - Proxied through /ingest to bypass ad blockers
 * - Gracefully disabled if no API key
 *
 * Setup: Add NEXT_PUBLIC_POSTHOG_KEY to .env.local
 */

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only initialize if API key is present
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      if (!posthog.__loaded) {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
          api_host: '/ingest', // Proxy to bypass ad blockers
          ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
          person_profiles: 'identified_only', // Only track identified users
          capture_pageview: false, // Manual control for better accuracy
          capture_pageleave: true,
          capture_performance: true,
          // Disable in development unless explicitly enabled
          loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') {
              posthog.opt_out_capturing();
            }
          },
        });
      }
    }
  }, []);

  // Track pageviews on route change
  useEffect(() => {
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

  return <>{children}</>;
}

/**
 * Check if PostHog is enabled
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
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (isPostHogEnabled()) {
    posthog.capture(eventName, properties);
  }
}

/**
 * Identify user (with safe fallback)
 */
export function identifyUser(userId: string, properties?: Record<string, unknown>) {
  if (isPostHogEnabled()) {
    posthog.identify(userId, properties);
  }
}
