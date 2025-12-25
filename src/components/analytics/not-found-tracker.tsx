'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics/tracking';

/**
 * Tracks 404 page visits and logs the attempted URL
 * This helps identify broken links or missing pages
 */
export function NotFoundTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Log to console for debugging
    console.log('[404 Tracker] Attempted URL:', pathname);

    // Track via the analytics system (GA4, PostHog, etc.)
    trackEvent('404_error', {
      page_path: pathname,
      page_location: typeof window !== 'undefined' ? window.location.href : '',
      page_referrer: typeof window !== 'undefined' ? document.referrer : '',
    });
  }, [pathname]);

  return null;
}
