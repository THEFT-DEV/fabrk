/**
 * Next.js 16 Proxy
 *
 * Handles:
 * - CSP nonce generation and injection
 * - CSRF token management
 * - Response header and body modification
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateNonce, getNonceHeaderName } from '@/lib/security/csp-nonce';

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_TOKEN_LENGTH = 32;

/**
 * Generate CSRF token using Web Crypto API (Edge Runtime compatible)
 */
function generateCsrfTokenEdge(): string {
  const array = new Uint8Array(CSRF_TOKEN_LENGTH);
  crypto.getRandomValues(array);
  // Convert to base64url
  const base64 = btoa(String.fromCharCode(...array));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Simple validation - just check if token exists and has reasonable length
 * Full HMAC validation happens in the API route handlers
 */
function hasValidCsrfCookie(token: string | undefined): boolean {
  return !!token && token.length >= 32;
}

export default async function proxy(req: NextRequest) {
  // Generate nonce for CSP
  const nonce = generateNonce();

  // Clone request with nonce in headers for server components
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(getNonceHeaderName(), nonce);

  // Get the response with modified request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Build CSP with actual nonce (proxy.ts must set headers, not modify them)
  const _isDevelopment = process.env.NODE_ENV === 'development';

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://js.stripe.com https://va.vercel-scripts.com https://us-assets.i.posthog.com https://www.googletagmanager.com https://www.google-analytics.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com https://api.posthog.com https://us.i.posthog.com https://us-assets.i.posthog.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://vercel.live",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "media-src 'self'",
    "child-src 'self' blob:",
    "upgrade-insecure-requests",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // Ensure CSRF token cookie exists
  const existingCsrfToken = req.cookies.get(CSRF_COOKIE_NAME)?.value;
  if (!hasValidCsrfCookie(existingCsrfToken)) {
    const newToken = generateCsrfTokenEdge();
    response.cookies.set(CSRF_COOKIE_NAME, newToken, {
      httpOnly: false, // Must be readable by JavaScript for fetch headers
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _static (inside /public)
  // - all items inside /public (images, favicon, etc.)
  matcher: ['/((?!api|_next|_static|.*\\..*|favicon.ico).*)'],
};
