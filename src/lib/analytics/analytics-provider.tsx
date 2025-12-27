/**
 * Analytics Provider Component
 * Initializes analytics and provides tracking context
 */

'use client';

import { useEffect } from 'react';
import { initAnalytics } from './tracking';
import { usePageTracking } from './hooks';
import { env } from '@/lib/env';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize analytics on mount
    // Note: NODE_ENV is a special Next.js variable, not in env schema
    const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';
    initAnalytics({
      providers: getEnabledProviders(),
      debug: isDev,
      enabled: !isDev,
      ga4MeasurementId: env.client.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
      plausibleDomain: env.client.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    });
  }, []);

  // Automatically track page views
  usePageTracking();

  return <>{children}</>;
}

function getEnabledProviders(): ('ga4' | 'plausible' | 'posthog' | 'custom')[] {
  const providers: ('ga4' | 'plausible' | 'posthog' | 'custom')[] = [];

  if (env.client.NEXT_PUBLIC_GA4_MEASUREMENT_ID) {
    providers.push('ga4');
  }

  if (env.client.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
    providers.push('plausible');
  }

  if (env.client.NEXT_PUBLIC_POSTHOG_KEY) {
    providers.push('posthog');
  }

  // Always enable custom analytics endpoint
  providers.push('custom');

  return providers;
}
