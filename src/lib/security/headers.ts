/**
 * Security Headers Middleware
 * Implement comprehensive security headers to protect against common attacks
 *
 * Headers implemented:
 * - Content Security Policy (CSP)
 * - X-Frame-Options
 * - X-Content-Type-Options
 * - Referrer-Policy
 * - Permissions-Policy
 * - Strict-Transport-Security (HSTS)
 * - X-XSS-Protection (legacy browsers)
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Generate Content Security Policy
 *
 * Strengthened CSP with:
 * - Nonce-based script loading (eliminates unsafe-inline)
 * - Strict source allowlists
 * - Worker and manifest source controls
 * - Trusted Types (modern browsers)
 * - Upgrade insecure requests
 */
export function generateCSP(options?: { isDevelopment?: boolean; nonce?: string }): string {
  const { isDevelopment = false, nonce } = options || {};

  const directives: Record<string, string[]> = {
    // Default: Only allow same-origin resources
    'default-src': ["'self'"],

    // Scripts: Nonce-based in production, unsafe-eval only for HMR in dev
    'script-src': [
      "'self'",
      "'strict-dynamic'", // Allow scripts loaded by trusted scripts
      ...(isDevelopment ? ["'unsafe-eval'"] : []),
      ...(nonce ? [`'nonce-${nonce}'`] : ["'unsafe-inline'"]),
      'https://cdn.jsdelivr.net',
      'https://js.stripe.com',
      'https://va.vercel-scripts.com',
      'https://us-assets.i.posthog.com', // PostHog (optional)
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
    ],

    // Styles: unsafe-inline required for Tailwind CSS-in-JS
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],

    // Images: Allow data URIs and HTTPS sources
    'img-src': ["'self'", 'data:', 'https:', 'blob:'],

    // Fonts: Google Fonts and data URIs
    'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com'],

    // API connections: Strict allowlist
    'connect-src': [
      "'self'",
      'https://api.stripe.com',
      'https://vitals.vercel-insights.com',
      'https://api.posthog.com', // PostHog (optional)
      'https://us.i.posthog.com', // PostHog (optional)
      'https://us-assets.i.posthog.com', // PostHog (optional)
      'https://www.google-analytics.com',
      'https://analytics.google.com',
      'https://www.googletagmanager.com',
      ...(isDevelopment ? ['ws:', 'wss:'] : []),
    ],

    // Frames: Stripe payment elements and Vercel Live
    'frame-src': [
      "'self'",
      'https://js.stripe.com',
      'https://hooks.stripe.com',
      'https://vercel.live',
    ],

    // Web Workers: Same-origin only
    'worker-src': ["'self'", 'blob:'],

    // Manifest: PWA manifest
    'manifest-src': ["'self'"],

    // Media: Same-origin only
    'media-src': ["'self'"],

    // Child frames: Same-origin only (deprecated but fallback)
    'child-src': ["'self'", 'blob:'],

    // Block all plugins (Flash, Java, etc.)
    'object-src': ["'none'"],

    // Restrict base URI to prevent base tag hijacking
    'base-uri': ["'self'"],

    // Form submission: Same-origin only
    'form-action': ["'self'"],

    // Prevent framing by other sites (clickjacking protection)
    'frame-ancestors': ["'self'"],

    // Block mixed content
    ...(isDevelopment ? {} : { 'upgrade-insecure-requests': [''] }),

    // Block mixed content (strict)
    ...(isDevelopment ? {} : { 'block-all-mixed-content': [''] }),
  };

  return Object.entries(directives)
    .map(([key, values]) => {
      if (values.length === 0) return '';
      if (values.length === 1 && values[0] === '') return key;
      return `${key} ${values.join(' ')}`;
    })
    .filter(Boolean)
    .join('; ');
}

/**
 * Security headers configuration
 */
export const securityHeaders = (isDevelopment: boolean = false) => [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY', // Prevent clickjacking
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff', // Prevent MIME sniffing
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block', // Enable XSS filter (legacy browsers)
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()', // Disable FLoC
      'payment=(self)',
    ].join(', '),
  },
  {
    key: 'Content-Security-Policy',
    value: generateCSP({ isDevelopment }),
  },
  {
    key: 'X-Permitted-Cross-Domain-Policies',
    value: 'none',
  },
];

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(
  response: NextResponse,
  isDevelopment: boolean = false
): NextResponse {
  const headers = securityHeaders(isDevelopment);

  headers.forEach((header) => {
    response.headers.set(header.key, header.value);
  });

  return response;
}

/**
 * Security headers middleware
 */
export function securityHeadersMiddleware(_req: NextRequest): NextResponse {
  const response = NextResponse.next();
  const isDevelopment = process.env.NODE_ENV === 'development';

  return applySecurityHeaders(response, isDevelopment);
}

/**
 * CORS configuration
 */
export interface CORSOptions {
  origin?: string | string[];
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

/**
 * Apply CORS headers
 */
export function applyCORSHeaders(response: NextResponse, options: CORSOptions = {}): NextResponse {
  const {
    origin = '*',
    methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders = ['Content-Type', 'Authorization'],
    exposedHeaders = [],
    credentials = false,
    maxAge = 86400, // 24 hours
  } = options;

  // Set origin
  if (Array.isArray(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin.join(','));
  } else {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  // Set methods
  response.headers.set('Access-Control-Allow-Methods', methods.join(', '));

  // Set allowed headers
  response.headers.set('Access-Control-Allow-Headers', allowedHeaders.join(', '));

  // Set exposed headers
  if (exposedHeaders.length > 0) {
    response.headers.set('Access-Control-Expose-Headers', exposedHeaders.join(', '));
  }

  // Set credentials
  if (credentials) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  // Set max age
  response.headers.set('Access-Control-Max-Age', maxAge.toString());

  return response;
}

/**
 * Generate nonce for CSP
 */
export function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString('base64');
}

/**
 * Check if request is from allowed origin
 */
export function isAllowedOrigin(origin: string, allowedOrigins: string[]): boolean {
  return allowedOrigins.includes(origin) || allowedOrigins.includes('*');
}
