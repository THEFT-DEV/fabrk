import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsLinkCard } from '@/components/docs';
import { Gauge, User, Server, Zap } from 'lucide-react';

export const metadata = {
  title: 'Rate Limiting - Fabrk Docs',
  description:
    'Protect your API from abuse with rate limiting. Redis-backed limits per user, IP, or endpoint.',
};

export default function RateLimitingPage() {
  return (
    <FeatureGuideTemplate
      code="[0x80]"
      category="Security"
      title="Rate Limiting"
      description="Protect your API endpoints from abuse with configurable rate limiting middleware."
      overview="Rate limiting prevents abuse by limiting how many requests a user or IP can make in a given time period. This protects against DDoS attacks, brute force attempts, and API abuse."
      features={[
        {
          icon: Gauge,
          title: 'Token Bucket',
          description: 'Smooth rate limiting with token bucket algorithm.',
        },
        {
          icon: Server,
          title: 'Per Endpoint',
          description: 'Configure different limits for different endpoints.',
        },
        {
          icon: User,
          title: 'User-Based',
          description: 'Rate limit by user ID for authenticated endpoints.',
        },
        {
          icon: Zap,
          title: 'Redis Support',
          description: 'Redis support for distributed systems.',
        },
      ]}
      setup={[
        {
          title: 'Environment Variables',
          description: 'Configure Upstash Redis for production rate limiting',
          code: `# .env.local

# Upstash Redis (get from https://upstash.com)
UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Basic Setup',
          description: 'Add rate limiting to any API route using the rate limiter middleware',
          code: `// src/lib/rate-limit.ts

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a rate limiter with 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

// Alternative: In-memory rate limiting for development
import { LRUCache } from "lru-cache";

const tokenCache = new LRUCache<string, number>({
  max: 500,
  ttl: 60_000, // 1 minute
});

export function rateLimit(ip: string, limit: number = 10) {
  const tokenCount = tokenCache.get(ip) || 0;

  if (tokenCount >= limit) {
    return { success: false, remaining: 0 };
  }

  tokenCache.set(ip, tokenCount + 1);
  return { success: true, remaining: limit - tokenCount - 1 };
}`,
          language: 'typescript',
        },
        {
          title: 'API Route Integration',
          description: 'Apply rate limiting to your API routes',
          code: `// src/app/api/your-route/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Get client IP
  const ip = request.ip ??
    request.headers.get("x-forwarded-for") ??
    "127.0.0.1";

  // Check rate limit
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
          "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // Process request normally
  return NextResponse.json({ success: true });
}`,
          language: 'typescript',
        },
        {
          title: 'Custom Limits per Endpoint',
          description: 'Configure different rate limits for different endpoints',
          code: `// src/lib/rate-limit.ts

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Strict limit for auth endpoints
export const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 per minute
  prefix: "ratelimit:auth",
});

// Standard API limit
export const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "60 s"), // 60 per minute
  prefix: "ratelimit:api",
});

// Generous limit for read operations
export const readLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"), // 100 per minute
  prefix: "ratelimit:read",
});

// Strict limit for write operations
export const writeLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "60 s"), // 20 per minute
  prefix: "ratelimit:write",
});`,
          language: 'typescript',
        },
        {
          title: 'User-Based Rate Limiting',
          description: 'Rate limit by user ID instead of IP for authenticated endpoints',
          code: `// src/app/api/protected-route/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ratelimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Rate limit by user ID (more fair than IP)
  const { success, remaining } = await ratelimit.limit(
    \`user:\${session.user.id}\`
  );

  if (!success) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  // Process request
  return NextResponse.json({
    success: true,
    remaining
  });
}`,
          language: 'typescript',
        },
      ]}
      previous={{
        title: 'Bot Protection',
        href: '/docs/security/bot-protection',
      }}
      next={{ title: 'Audit Logging', href: '/docs/security/audit-logging' }}
    >
      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/security/csrf"
            title="CSRF Protection"
            description="Protect forms from cross-site request forgery"
          />
          <DocsLinkCard
            href="/docs/security/bot-protection"
            title="Bot Protection"
            description="Add bot detection to your endpoints"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
