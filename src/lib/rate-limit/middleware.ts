/**
 * Production-Ready Rate Limiting Middleware
 * Uses Upstash Redis for distributed rate limiting (production)
 * Falls back to in-memory for development
 *
 * Features:
 * - Distributed rate limiting with Redis (works across server instances)
 * - Serverless-compatible (Upstash)
 * - Automatic fallback to in-memory for local development
 * - Multiple rate limit tiers (auth, payment, api)
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

// Upstash Redis imports (production rate limiting)
let Ratelimit: typeof import('@upstash/ratelimit').Ratelimit;
let Redis: typeof import('@upstash/redis').Redis;
let redisClient: import('@upstash/redis').Redis | null = null;
let rateLimiters: Record<string, import('@upstash/ratelimit').Ratelimit> | null = null;

// Check for Upstash configuration
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const isRedisConfigured = !!(UPSTASH_URL && UPSTASH_TOKEN);

// Initialize Redis if configured
async function initializeRedis() {
  if (rateLimiters) return rateLimiters;

  if (isRedisConfigured) {
    try {
      const upstashRatelimit = await import('@upstash/ratelimit');
      const upstashRedis = await import('@upstash/redis');

      Ratelimit = upstashRatelimit.Ratelimit;
      Redis = upstashRedis.Redis;

      redisClient = new Redis({
        url: UPSTASH_URL!,
        token: UPSTASH_TOKEN!,
      });

      // Create rate limiters for each tier
      rateLimiters = {
        auth: new Ratelimit({
          redis: redisClient,
          limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 requests per 15 minutes
          analytics: true,
          prefix: 'ratelimit:auth',
        }),
        payment: new Ratelimit({
          redis: redisClient,
          limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
          analytics: true,
          prefix: 'ratelimit:payment',
        }),
        api: new Ratelimit({
          redis: redisClient,
          limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
          analytics: true,
          prefix: 'ratelimit:api',
        }),
      };

      logger.info('✅ Redis rate limiting initialized (production-ready)');
      return rateLimiters;
    } catch (error) {
      logger.error('Failed to initialize Redis rate limiting:', error);
      return null;
    }
  }

  return null;
}

// In-memory fallback for development (NOT for production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Emit warning if using in-memory rate limiting in production
if (process.env.NODE_ENV === 'production' && !isRedisConfigured) {
  logger.warn(
    '⚠️ WARNING: In-memory rate limiting detected in production. ' +
      'This will not work correctly with multiple server instances. ' +
      'Please configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN ' +
      'for production rate limiting.'
  );
}

// Rate limit configurations by route type (for in-memory fallback)
const RATE_LIMITS = {
  auth: { requests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
  payment: { requests: 10, windowMs: 60 * 1000 }, // 10 requests per minute
  api: { requests: 100, windowMs: 60 * 1000 }, // 100 requests per minute
} as const;

type RateLimitType = keyof typeof RATE_LIMITS;

/**
 * Get client identifier from request
 */
function getClientId(req: NextRequest): string {
  // Try to get IP from headers (works with proxies/load balancers)
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  // Fallback to connection IP (may not work in serverless)
  return 'unknown';
}

/**
 * Check rate limit using Redis (production) or in-memory (development)
 */
async function checkRateLimit(
  clientId: string,
  type: RateLimitType
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  // Try Redis first
  const limiters = await initializeRedis();

  if (limiters && limiters[type]) {
    const { success, remaining, reset } = await limiters[type].limit(clientId);
    return {
      allowed: success,
      remaining,
      resetAt: reset,
    };
  }

  // Fallback to in-memory (development only)
  return checkRateLimitInMemory(clientId, type);
}

/**
 * In-memory rate limit check (development fallback)
 */
function checkRateLimitInMemory(
  clientId: string,
  type: RateLimitType
): { allowed: boolean; remaining: number; resetAt: number } {
  const config = RATE_LIMITS[type];
  const now = Date.now();
  const key = `${type}:${clientId}`;

  // Get or create rate limit entry
  let entry = rateLimitStore.get(key);

  // Reset if window has passed
  if (!entry || now > entry.resetAt) {
    entry = {
      count: 0,
      resetAt: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
  }

  // Check if limit exceeded
  const allowed = entry.count < config.requests;

  if (allowed) {
    entry.count++;
  }

  return {
    allowed,
    remaining: Math.max(0, config.requests - entry.count),
    resetAt: entry.resetAt,
  };
}

/**
 * Clean up expired entries periodically (for in-memory fallback)
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes (only for in-memory fallback)
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}

/**
 * Rate limiting middleware wrapper
 */
export function withRateLimit<T extends unknown[]>(
  handler: (req: NextRequest, ...args: T) => Promise<NextResponse>,
  type: RateLimitType = 'api'
) {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    const clientId = getClientId(req);
    const { allowed, remaining, resetAt } = await checkRateLimit(clientId, type);

    if (!allowed) {
      const resetIn = Math.ceil((resetAt - Date.now()) / 1000);

      return NextResponse.json(
        {
          error: 'Too many requests',
          message: `Rate limit exceeded. Try again in ${resetIn} seconds.`,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(RATE_LIMITS[type].requests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
            'Retry-After': String(resetIn),
          },
        }
      );
    }

    // Call the handler with all arguments
    const response = await handler(req, ...args);

    // Add rate limit headers to response
    response.headers.set('X-RateLimit-Limit', String(RATE_LIMITS[type].requests));
    response.headers.set('X-RateLimit-Remaining', String(remaining));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)));

    return response;
  };
}

/**
 * Check if Redis rate limiting is active
 */
export function isRedisRateLimitingActive(): boolean {
  return isRedisConfigured;
}

/**
 * Get rate limiting status for health checks
 */
export async function getRateLimitingStatus(): Promise<{
  mode: 'redis' | 'memory';
  configured: boolean;
  healthy: boolean;
}> {
  if (!isRedisConfigured) {
    return {
      mode: 'memory',
      configured: false,
      healthy: true, // In-memory always "healthy" but not recommended
    };
  }

  try {
    const limiters = await initializeRedis();
    return {
      mode: 'redis',
      configured: true,
      healthy: !!limiters,
    };
  } catch {
    return {
      mode: 'redis',
      configured: true,
      healthy: false,
    };
  }
}
