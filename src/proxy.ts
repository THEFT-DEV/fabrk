/**
 * Next.js 16 Proxy (Combined Security + CSP)
 *
 * Handles:
 * - Rate limiting for all API routes
 * - Bot detection on auth routes
 * - CSP nonce generation and injection
 * - CSRF token management
 * - Admin route protection
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateNonce, getNonceHeaderName } from '@/lib/security/csp-nonce';
import { getToken } from 'next-auth/jwt';

// ============================================
// RATE LIMITING
// ============================================

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Cleanup expired rate limit entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupRateLimitStore() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  let cleaned = 0;
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
      cleaned++;
    }
  }
  if (cleaned > 0) {
    console.log(`[SECURITY] Cleaned ${cleaned} expired rate limit entries`);
  }
}

const RATE_LIMITS = {
  auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
  sensitive: { windowMs: 60 * 60 * 1000, maxRequests: 10 },
  payment: { windowMs: 60 * 1000, maxRequests: 10 },
  ai: { windowMs: 60 * 1000, maxRequests: 10 }, // Strict limit to prevent cost abuse
  api: { windowMs: 60 * 1000, maxRequests: 60 },
  public: { windowMs: 60 * 1000, maxRequests: 100 },
  webhook: { windowMs: 60 * 1000, maxRequests: 100 },
} as const;

const ROUTE_PATTERNS = {
  skip: ['/api/health', '/_next', '/favicon.ico', '/robots.txt', '/sitemap.xml', '/opengraph-image', '/twitter-image'],
  auth: ['/api/auth/register', '/api/auth/callback', '/api/auth/signin', '/api/auth/forgot-password', '/api/auth/reset-password', '/api/auth/verify-email'],
  payment: ['/api/stripe/checkout', '/api/polar/checkout', '/api/lemonsqueezy/checkout'],
  admin: ['/api/admin'],
  webhook: ['/api/stripe/webhook', '/api/polar/webhook', '/api/lemonsqueezy/webhook'],
  // AI routes need stricter rate limiting to prevent cost abuse
  ai: ['/api/ai/chat', '/api/ai/generate'],
};

const BAD_BOT_PATTERNS = [/curl/i, /wget/i, /python-requests/i, /scrapy/i, /httpclient/i, /java\//i, /libwww/i, /lwp-/i, /^$/];
const GOOD_BOT_PATTERNS = [/googlebot/i, /bingbot/i, /slurp/i, /duckduckbot/i, /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i, /whatsapp/i, /telegrambot/i, /discordbot/i, /gptbot/i, /claude-web/i, /anthropic/i];

/**
 * Validate IP address format (IPv4 or IPv6)
 */
function isValidIp(ip: string): boolean {
  const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6 = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$/;
  return ipv4.test(ip) || ipv6.test(ip);
}

/**
 * Extract and validate client IP from request headers
 * SECURITY: Validates IP format to prevent header injection bypass
 */
function getClientId(request: NextRequest): string {
  // Priority: Cloudflare > X-Forwarded-For > X-Real-IP > unknown
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp && isValidIp(cfIp.trim())) return cfIp.trim();

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Take first IP in chain and validate format
    const ips = forwarded.split(',').map(ip => ip.trim()).filter(isValidIp);
    if (ips.length > 0) return ips[0];
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp && isValidIp(realIp.trim())) return realIp.trim();

  return 'unknown';
}

function checkRateLimit(clientId: string, tier: keyof typeof RATE_LIMITS): { allowed: boolean; remaining: number; resetIn: number } {
  const config = RATE_LIMITS[tier];
  const now = Date.now();
  const key = `${tier}:${clientId}`;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs });
    return { allowed: true, remaining: config.maxRequests - 1, resetIn: config.windowMs };
  }

  if (record.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return { allowed: true, remaining: config.maxRequests - record.count, resetIn: record.resetTime - now };
}

function detectBot(request: NextRequest): { isBot: boolean; isGoodBot: boolean; reason: string } {
  const userAgent = request.headers.get('user-agent') || '';
  if (GOOD_BOT_PATTERNS.some((p) => p.test(userAgent))) return { isBot: true, isGoodBot: true, reason: 'Known good bot' };
  if (BAD_BOT_PATTERNS.some((p) => p.test(userAgent))) return { isBot: true, isGoodBot: false, reason: 'Known bad bot pattern' };
  if (!userAgent || userAgent.length < 10) return { isBot: true, isGoodBot: false, reason: 'Missing or short user agent' };
  const accept = request.headers.get('accept');
  if (!accept && request.method === 'GET') return { isBot: true, isGoodBot: false, reason: 'Missing accept header' };
  return { isBot: false, isGoodBot: false, reason: '' };
}

function getRouteTier(pathname: string): keyof typeof RATE_LIMITS {
  if (ROUTE_PATTERNS.auth.some((p) => pathname.startsWith(p))) return 'auth';
  if (ROUTE_PATTERNS.payment.some((p) => pathname.startsWith(p))) return 'payment';
  if (ROUTE_PATTERNS.admin.some((p) => pathname.startsWith(p))) return 'sensitive';
  if (ROUTE_PATTERNS.webhook.some((p) => pathname.startsWith(p))) return 'webhook';
  if (ROUTE_PATTERNS.ai.some((p) => pathname.startsWith(p))) return 'ai';
  if (pathname.startsWith('/api/')) return 'api';
  return 'public';
}

// ============================================
// CSRF
// ============================================

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_TOKEN_LENGTH = 32;

function generateCsrfTokenEdge(): string {
  const array = new Uint8Array(CSRF_TOKEN_LENGTH);
  crypto.getRandomValues(array);
  const base64 = btoa(String.fromCharCode(...array));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function hasValidCsrfCookie(token: string | undefined): boolean {
  return !!token && token.length >= 32;
}

// ============================================
// MAIN PROXY
// ============================================

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip for static assets
  if (ROUTE_PATTERNS.skip.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const clientId = getClientId(req);

  // Bot detection for auth routes
  if (ROUTE_PATTERNS.auth.some((p) => pathname.startsWith(p))) {
    const botResult = detectBot(req);
    if (botResult.isBot && !botResult.isGoodBot) {
      console.log(`[SECURITY] Bot blocked on auth route: ${pathname}`, { ip: clientId, reason: botResult.reason });
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
  }

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    // Cleanup expired entries periodically
    cleanupRateLimitStore();

    const tier = getRouteTier(pathname);
    const rateLimit = checkRateLimit(clientId, tier);

    if (!rateLimit.allowed) {
      console.log(`[SECURITY] Rate limit exceeded: ${pathname}`, { ip: clientId, tier });
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMITS[tier].maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': Math.ceil(rateLimit.resetIn / 1000).toString(),
          },
        }
      );
    }
  }

  // Admin route protection
  if (ROUTE_PATTERNS.admin.some((p) => pathname.startsWith(p))) {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Generate nonce for CSP
  const nonce = generateNonce();

  // Clone request with nonce in headers for server components
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(getNonceHeaderName(), nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Add rate limit headers for API routes
  if (pathname.startsWith('/api/')) {
    const tier = getRouteTier(pathname);
    const rateLimit = checkRateLimit(clientId, tier);
    response.headers.set('X-RateLimit-Limit', RATE_LIMITS[tier].maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
  }

  // Build CSP with nonce
  // SECURITY: Removed 'strict-dynamic' to prevent third-party script injection
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://js.stripe.com https://va.vercel-scripts.com https://us-assets.i.posthog.com https://www.googletagmanager.com https://www.google-analytics.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com https://api.posthog.com https://us.i.posthog.com https://us-assets.i.posthog.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://vercel.live https://www.youtube.com https://youtube.com",
    "frame-ancestors 'none'",
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
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
