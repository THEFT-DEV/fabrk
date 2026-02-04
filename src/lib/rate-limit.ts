import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Get Redis client - supports both Vercel KV and Upstash env vars
 */
function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error('Redis not configured. Set KV_REST_API_URL/KV_REST_API_TOKEN (Vercel KV) or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN');
  }

  return new Redis({ url, token });
}

// General API rate limit (100 requests/hour)
export const ratelimit = new Ratelimit({
  redis: getRedis(),
  limiter: Ratelimit.slidingWindow(100, '1 h'),
});

// Strict rate limit for auth endpoints (10 attempts/hour)
export const authRatelimit = new Ratelimit({
  redis: getRedis(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: 'ratelimit:auth',
});

export async function checkRateLimit(identifier: string) {
  const { success, remaining } = await ratelimit.limit(identifier);
  return { success, remaining };
}

export async function checkAuthRateLimit(identifier: string) {
  const { success, remaining, reset } = await authRatelimit.limit(identifier);
  return { success, remaining, reset };
}
