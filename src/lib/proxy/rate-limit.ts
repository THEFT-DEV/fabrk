/**
 * Edge-Compatible Rate Limiting
 *
 * Lightweight in-memory rate limiter for the Next.js proxy (edge runtime).
 * Separate from the Node.js rate limiter in src/lib/security/rate-limit.ts
 * because the proxy runs in the edge runtime without access to Node.js APIs.
 */

import { RATE_LIMITS, type RateLimitTier } from './routes';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitRecord>();

const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanupAt = Date.now();

function purgeExpiredEntries(): void {
  const now = Date.now();
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;

  lastCleanupAt = now;
  for (const [key, record] of store.entries()) {
    if (now > record.resetTime) {
      store.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
  maxRequests: number;
}

/**
 * Check and increment the rate limit counter for a client+tier pair.
 * Returns whether the request is allowed and remaining quota.
 */
export function enforceRateLimit(clientIp: string, tier: RateLimitTier): RateLimitResult {
  purgeExpiredEntries();

  const { windowMs, maxRequests } = RATE_LIMITS[tier];
  const now = Date.now();
  const key = `${tier}:${clientIp}`;
  const record = store.get(key);

  if (!record || now > record.resetTime) {
    store.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetInMs: windowMs, maxRequests };
  }

  record.count++;
  const remaining = Math.max(0, maxRequests - record.count);
  const resetInMs = record.resetTime - now;

  return {
    allowed: record.count <= maxRequests,
    remaining,
    resetInMs,
    maxRequests,
  };
}
