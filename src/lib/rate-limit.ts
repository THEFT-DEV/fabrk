import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// General API rate limit (100 requests/hour)
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 h'),
});

// Strict rate limit for auth endpoints (10 attempts/hour)
export const authRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
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
