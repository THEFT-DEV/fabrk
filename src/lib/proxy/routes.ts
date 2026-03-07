/**
 * Route Classification
 *
 * Classifies request paths into rate limit tiers and
 * identifies routes that should skip proxy processing.
 */

export type RateLimitTier = 'auth' | 'sensitive' | 'payment' | 'ai' | 'api' | 'public' | 'webhook';

export const RATE_LIMITS: Record<RateLimitTier, { windowMs: number; maxRequests: number }> = {
  auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
  sensitive: { windowMs: 60 * 60 * 1000, maxRequests: 10 },
  payment: { windowMs: 60 * 1000, maxRequests: 10 },
  ai: { windowMs: 60 * 1000, maxRequests: 10 },
  api: { windowMs: 60 * 1000, maxRequests: 60 },
  public: { windowMs: 60 * 1000, maxRequests: 100 },
  webhook: { windowMs: 60 * 1000, maxRequests: 100 },
} as const;

const SKIP_PREFIXES = [
  '/api/health',
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/opengraph-image',
  '/twitter-image',
];

export const AUTH_PREFIXES = [
  '/api/auth/register',
  '/api/auth/callback',
  '/api/auth/signin',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-email',
];

export const PAYMENT_PREFIXES = [
  '/api/stripe/checkout',
  '/api/polar/checkout',
  '/api/lemonsqueezy/checkout',
];

export const ADMIN_PREFIXES = ['/api/admin'];

export const WEBHOOK_PREFIXES = [
  '/api/stripe/webhook',
  '/api/polar/webhook',
  '/api/lemonsqueezy/webhook',
];

export const AI_PREFIXES = ['/api/ai'];

function matchesAny(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => pathname.startsWith(prefix));
}

export function shouldSkip(pathname: string): boolean {
  return matchesAny(pathname, SKIP_PREFIXES);
}

export function isAuthRoute(pathname: string): boolean {
  return matchesAny(pathname, AUTH_PREFIXES);
}

export function isAdminRoute(pathname: string): boolean {
  return matchesAny(pathname, ADMIN_PREFIXES);
}

export function isAiRoute(pathname: string): boolean {
  return matchesAny(pathname, AI_PREFIXES);
}

export function classifyRoute(pathname: string): RateLimitTier {
  if (matchesAny(pathname, AUTH_PREFIXES)) return 'auth';
  if (matchesAny(pathname, PAYMENT_PREFIXES)) return 'payment';
  if (matchesAny(pathname, ADMIN_PREFIXES)) return 'sensitive';
  if (matchesAny(pathname, WEBHOOK_PREFIXES)) return 'webhook';
  if (matchesAny(pathname, AI_PREFIXES)) return 'ai';
  if (pathname.startsWith('/api/')) return 'api';
  return 'public';
}
