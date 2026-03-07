/**
 * Client-side Instrumentation (Next.js 15.3+)
 *
 * Lazy-loads PostHog to avoid blocking initial page render (~100KB savings).
 * Masks sensitive inputs in session replay for PII compliance.
 */

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: host,
        defaults: '2025-11-30',
        disable_session_recording: false,
        session_recording: {
          maskAllInputs: true,
          maskInputOptions: { password: true, email: false },
        },
        autocapture: { capture_copied_text: true },
        capture_performance: true,
        capture_pageleave: true,
        capture_dead_clicks: true,
        // GDPR: only create person profiles for identified users
        person_profiles: 'identified_only',
        loaded: (ph) => {
          if (process.env.NODE_ENV === 'development') {
            if (process.env.NEXT_PUBLIC_POSTHOG_DEBUG !== 'true') {
              ph.opt_out_capturing();
            } else {
              ph.debug();
            }
          }
        },
      });

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
        const reason = event.reason as Error | undefined;
        posthog.capture('$exception', {
          $exception_message: reason?.message || String(event.reason),
          $exception_type: 'UnhandledPromiseRejection',
          $exception_stack_trace_raw: reason?.stack,
        });
      });
    })
    .catch(() => {
      // PostHog failed to load - analytics are non-critical
    });
}
