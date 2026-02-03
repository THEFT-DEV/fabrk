/**
 * Analytics React Hooks
 * Client-side hooks for tracking user interactions
 */

'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent, trackPageView } from './tracking';
import type { AnalyticsEvent } from './tracking';

/**
 * Track page views automatically on route change
 */
export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
      trackPageView(url, document.title);
    }
  }, [pathname, searchParams]);
}

/**
 * Track button clicks
 */
export function useTrackClick(
  buttonName: string,
  location: string,
  additionalProps?: Record<string, unknown>
) {
  return useCallback(() => {
    trackEvent('button_clicked', {
      button: buttonName,
      location,
      ...additionalProps,
    });
  }, [buttonName, location, additionalProps]);
}

/**
 * Track form submissions
 */
export function useTrackForm(formName: string) {
  const trackSubmit = useCallback(
    (success: boolean, errorMessage?: string) => {
      trackEvent('form_submitted', {
        form: formName,
        success,
        ...(errorMessage && { error: errorMessage }),
      });
    },
    [formName]
  );

  return { trackSubmit };
}

/**
 * Track feature usage
 */
export function useTrackFeature(featureName: string) {
  return useCallback(
    (context?: string) => {
      trackEvent('feature_used', {
        feature: featureName,
        context,
      });
    },
    [featureName]
  );
}

/**
 * Track errors
 */
export function useTrackError() {
  return useCallback((error: Error | string, severity: 'low' | 'medium' | 'high' = 'medium') => {
    const errorMessage = error instanceof Error ? error.message : error;
    trackEvent('error_occurred', {
      error: errorMessage,
      page: window.location.pathname,
      severity,
    });
  }, []);
}

/**
 * Track search queries
 */
export function useTrackSearch() {
  return useCallback((query: string, resultsCount: number) => {
    trackEvent('search_performed', {
      query,
      results: resultsCount,
    });
  }, []);
}

/**
 * Track video playback
 */
export function useTrackVideo(videoName: string) {
  const trackPlay = useCallback(() => {
    trackEvent('video_played', {
      video: videoName,
    });
  }, [videoName]);

  const trackComplete = useCallback(
    (duration: number) => {
      trackEvent('video_played', {
        video: videoName,
        duration,
      });
    },
    [videoName]
  );

  return { trackPlay, trackComplete };
}

/**
 * Track file downloads
 */
export function useTrackDownload() {
  return useCallback((fileName: string, fileType: string) => {
    trackEvent('file_downloaded', {
      file: fileName,
      type: fileType,
    });
  }, []);
}

/**
 * Generic event tracker
 */
export function useTrackEvent() {
  return useCallback(<T extends AnalyticsEvent>(event: T['name'], props?: T['props']) => {
    trackEvent(event, props);
  }, []);
}
