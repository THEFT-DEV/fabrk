/**
 * Content Security Policy Builder
 *
 * Builds the CSP header string with a per-request nonce.
 * Intentionally omits 'strict-dynamic' to prevent third-party script injection.
 */

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://vercel.live https://www.youtube.com https://youtube.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "media-src 'self'",
  "child-src 'self' blob:",
  'upgrade-insecure-requests',
] as const;

/**
 * Build a complete CSP string with the given nonce embedded in script-src and connect-src.
 */
export function buildCspHeader(nonce: string): string {
  const scriptSrc = `script-src 'self' 'nonce-${nonce}' https://js.stripe.com https://va.vercel-scripts.com https://us-assets.i.posthog.com https://www.googletagmanager.com https://www.google-analytics.com`;

  const connectSrc =
    "connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com https://api.posthog.com https://us.i.posthog.com https://us-assets.i.posthog.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com";

  return [...CSP_DIRECTIVES.slice(0, 1), scriptSrc, ...CSP_DIRECTIVES.slice(1), connectSrc].join(
    '; '
  );
}
