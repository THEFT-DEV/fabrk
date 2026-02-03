/**
 * Client-side Instrumentation (Next.js 15.3+)
 *
 * This file runs once when the client loads.
 * PostHog is initialized here for lightweight, fast integration.
 *
 * Features enabled:
 * - Pageview tracking (automatic)
 * - Session replay (for debugging checkout issues)
 * - Exception autocapture (catches JS errors)
 * - Performance metrics
 *
 * Environment variables required:
 * - NEXT_PUBLIC_POSTHOG_KEY: Your PostHog project API key
 * - NEXT_PUBLIC_POSTHOG_HOST: PostHog host (default: https://us.i.posthog.com)
 */

import posthog from 'posthog-js';

// Only initialize if the API key is present
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',

    // Use SDK defaults for 2025 (recommended settings)
    defaults: '2025-11-30',

    // =========================================================================
    // SESSION REPLAY - Watch user sessions to debug checkout issues
    // =========================================================================
    // Enable session recording (must also be enabled in PostHog dashboard)
    disable_session_recording: false,
    // Only record sessions with errors or specific events
    session_recording: {
      // Mask all text inputs by default (privacy)
      maskAllInputs: true,
      // Don't mask these specific inputs (for better debugging)
      maskInputOptions: {
        password: true,
        // Show email inputs for debugging (they're already known)
        email: false,
      },
    },

    // =========================================================================
    // EXCEPTION AUTOCAPTURE - Catch JS errors automatically
    // =========================================================================
    autocapture: {
      // Capture console errors
      capture_copied_text: true,
    },

    // =========================================================================
    // PERFORMANCE & ENGAGEMENT
    // =========================================================================
    // Capture performance metrics (LCP, FID, CLS)
    capture_performance: true,
    // Capture page leave events (for funnel analysis)
    capture_pageleave: true,
    // Capture dead clicks (clicks that do nothing - UX issues)
    capture_dead_clicks: true,

    // =========================================================================
    // USER PROFILES
    // =========================================================================
    // Only create person profiles for identified users (GDPR friendly)
    person_profiles: 'identified_only',

    // =========================================================================
    // DEVELOPMENT SETTINGS
    // =========================================================================
    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') {
        // Opt out of capturing in development by default
        // Set NEXT_PUBLIC_POSTHOG_DEBUG=true to enable
        if (process.env.NEXT_PUBLIC_POSTHOG_DEBUG !== 'true') {
          ph.opt_out_capturing();
        } else {
          // Enable debug mode in development when POSTHOG_DEBUG is true
          ph.debug();
        }
      }
    },
  });

  // =========================================================================
  // GLOBAL ERROR HANDLER - Capture unhandled errors
  // =========================================================================
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      posthog.capture('$exception', {
        $exception_message: event.message,
        $exception_type: 'Error',
        $exception_source: event.filename,
        $exception_lineno: event.lineno,
        $exception_colno: event.colno,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason;
      posthog.capture('$exception', {
        $exception_message: error?.message || String(error),
        $exception_type: 'UnhandledPromiseRejection',
        $exception_stack_trace_raw: error?.stack,
      });
    });
  }
}
