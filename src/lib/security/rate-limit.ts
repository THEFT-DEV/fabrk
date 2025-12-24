/**
 * Rate Limiting Middleware
 * Protect against DDoS, brute force, and API abuse
 *
 * Features:
 * - In-memory rate limiting (development)
 * - Distributed rate limiting (production with Upstash)
 * - Sliding window algorithm
 * - Per-route configuration
 * - IP-based and user-based limits
 * - Custom error responses
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  uniqueTokenPerInterval?: number; // Max unique tokens to track
}

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// In-memory store (use Redis/Upstash in production)
// Exported for testing purposes
export const limitStore = new Map<string, RateLimitStore>();

/**
 * Rate limit check
 * Returns true if request should be allowed
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  const now = Date.now();
  const key = identifier;

  // Get or create rate limit entry
  let limitData = limitStore.get(key);

  if (!limitData || now > limitData.resetTime) {
    // Create new window
    limitData = {
      count: 0,
      resetTime: now + config.interval,
    };
    limitStore.set(key, limitData);
  }

  // Increment request count
  limitData.count++;

  // Check if limit exceeded
  const success = limitData.count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - limitData.count);

  // Cleanup old entries periodically
  if (limitStore.size > (config.uniqueTokenPerInterval || 10000)) {
    cleanupOldEntries();
  }

  return {
    success,
    limit: config.maxRequests,
    remaining,
    reset: limitData.resetTime,
  };
}

/**
 * Clean up expired entries
 */
function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, data] of limitStore.entries()) {
    if (now > data.resetTime) {
      limitStore.delete(key);
    }
  }
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(req: NextRequest): string {
  // Try to get user ID from session first
  // const session = await getSession(req);
  // if (session?.user?.id) return `user:${session.user.id}`;

  // Fall back to IP address
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';

  return `ip:${ip}`;
}

/**
 * Rate limit middleware factory
 */
export function rateLimit(config: RateLimitConfig) {
  return async (req: NextRequest): Promise<NextResponse | null> => {
    const identifier = getClientIdentifier(req);
    const result = await checkRateLimit(identifier, config);

    if (!result.success) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: 'You have exceeded the rate limit. Please try again later.',
          retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.reset.toString(),
            'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    return null; // Allow request
  };
}

/**
 * Pre-configured rate limiters
 */
export const RateLimiters = {
  // Very strict - for auth endpoints
  auth: {
    interval: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 requests per 15 min
  },

  // Strict - for sensitive operations
  strict: {
    interval: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 requests per minute
  },

  // Moderate - for API endpoints
  api: {
    interval: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
  },

  // Lenient - for public endpoints
  public: {
    interval: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute
  },

  // For webhooks
  webhook: {
    interval: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 webhooks per minute
  },
};

/**
 * Redis client singleton for rate limiting
 * Caches the client instance to avoid creating new connections on each request
 */
let redisClient: unknown = null;
let ratelimitInstances = new Map<string, unknown>();

/**
 * Get or create Redis client singleton
 */
function getRedisClient(): unknown {
  if (redisClient) return redisClient;

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  try {
    const upstashRedis = require('@upstash/redis');
    const { Redis } = upstashRedis;

    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    return redisClient;
  } catch {
    logger.warn('[Rate Limit] @upstash/redis not installed, using in-memory rate limiting');
    return null;
  }
}

/**
 * Get or create Ratelimit instance for a specific config
 */
function getRatelimitInstance(config: RateLimitConfig): unknown {
  const redis = getRedisClient();
  if (!redis) return null;

  const key = `${config.maxRequests}:${config.interval}`;
  if (ratelimitInstances.has(key)) {
    return ratelimitInstances.get(key);
  }

  try {
    const upstashRatelimit = require('@upstash/ratelimit');
    const { Ratelimit } = upstashRatelimit;

    const instance = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.maxRequests, `${config.interval}ms`),
      analytics: true,
      prefix: 'ratelimit',
    });

    ratelimitInstances.set(key, instance);
    return instance;
  } catch {
    logger.warn('[Rate Limit] @upstash/ratelimit not installed, using in-memory rate limiting');
    return null;
  }
}

/**
 * Check if Redis rate limiting is available
 */
export function isRedisAvailable(): boolean {
  return getRedisClient() !== null;
}

/**
 * Upstash Redis rate limiting (production)
 * Requires: @upstash/redis and @upstash/ratelimit
 *
 * Features:
 * - Singleton Redis client (connection reuse)
 * - Cached Ratelimit instances per config
 * - Automatic fallback to in-memory on error
 * - Sliding window algorithm
 */
export async function checkRateLimitRedis(
  identifier: string,
  config: RateLimitConfig
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  const ratelimit = getRatelimitInstance(config);

  if (!ratelimit) {
    // Fall back to in-memory
    return checkRateLimit(identifier, config);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dynamic import from @upstash/ratelimit
    const { success, limit, remaining, reset } = await (ratelimit as any).limit(identifier);
    return { success, limit, remaining, reset };
  } catch (error: unknown) {
    logger.error('[Rate Limit] Upstash error, falling back to in-memory', error);
    return checkRateLimit(identifier, config);
  }
}

/**
 * Smart rate limit check - automatically uses Redis if available
 */
export async function checkRateLimitAuto(
  identifier: string,
  config: RateLimitConfig
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  if (isRedisAvailable()) {
    return checkRateLimitRedis(identifier, config);
  }
  return checkRateLimit(identifier, config);
}

/**
 * Rate limit middleware factory with automatic Redis detection
 */
export function rateLimitAuto(config: RateLimitConfig) {
  return async (req: NextRequest): Promise<NextResponse | null> => {
    const identifier = getClientIdentifier(req);
    const result = await checkRateLimitAuto(identifier, config);

    if (!result.success) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: 'You have exceeded the rate limit. Please try again later.',
          retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.reset.toString(),
            'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    return null; // Allow request
  };
}

/**
 * Check if IP is in whitelist
 */
export function isWhitelisted(ip: string, whitelist: string[] = []): boolean {
  return whitelist.includes(ip);
}

/**
 * Check if IP is in blacklist
 */
export function isBlacklisted(ip: string, blacklist: string[] = []): boolean {
  return blacklist.includes(ip);
}

/**
 * Exponential backoff calculator
 */
export function calculateBackoff(attempts: number, baseDelay: number = 1000): number {
  return Math.min(baseDelay * Math.pow(2, attempts), 60000); // Max 60 seconds
}
