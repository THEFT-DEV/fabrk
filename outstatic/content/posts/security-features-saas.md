---
title: 'Security Features: Building Secure SaaS from Day One'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'security-features-saas'
description: 'Fabrk includes security best practices out of the box: CSRF protection, rate limiting, input validation, and more.'
publishedAt: '2026-01-24T10:00:00.000Z'
---

**Security isn't an afterthought. It's built in.**

Building a secure SaaS application requires implementing dozens of security measures correctly. A single vulnerability can expose user data, damage your reputation, and potentially end your business. Fabrk includes production-ready security features from day one, so you can focus on building your product instead of reinventing security primitives.

---

## The Security Challenge

Every SaaS needs to protect against:

- **Authentication attacks** - Credential stuffing, session hijacking
- **Injection attacks** - SQL injection, XSS, command injection
- **Request forgery** - CSRF, SSRF
- **Data exposure** - Information leakage, insecure defaults
- **Denial of service** - Resource exhaustion, rate limiting bypass

Implementing these protections from scratch is error-prone. One mistake can compromise everything.

---

## Security by Default

Fabrk includes production-ready security features:

- Authentication with NextAuth v5 (JWT sessions, secure cookies)
- CSRF protection (automatic token verification)
- Rate limiting (configurable per-route limits)
- Input validation (Zod schemas for all inputs)
- SQL injection prevention (Prisma parameterized queries)
- XSS protection (React automatic escaping, CSP headers)
- Secure headers (HSTS, X-Frame-Options, etc.)
- Environment variable validation (no undefined secrets)
- Password hashing (bcrypt with configurable rounds)
- Webhook signature verification (HMAC-SHA256)

---

## Authentication Security

NextAuth v5 provides enterprise-grade authentication:

### JWT Sessions

Stateless, scalable session management:

```typescript
// lib/auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.organizationId = user.organizationId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.organizationId = token.organizationId as string;
      }
      return session;
    },
  },
});
```

### Secure Cookies

HTTP-only cookies prevent JavaScript access:

```typescript
// auth.ts configuration
cookies: {
  sessionToken: {
    name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  callbackUrl: {
    name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.callback-url`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  csrfToken: {
    name: `${process.env.NODE_ENV === 'production' ? '__Host-' : ''}next-auth.csrf-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    },
  },
}
```

### Session Validation

Always verify sessions server-side:

```typescript
// app/api/protected/route.ts
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Session is valid, proceed
  return Response.json({ user: session.user });
}
```

---

## CSRF Protection

Cross-Site Request Forgery protection is handled automatically by NextAuth:

### How It Works

1. NextAuth generates a CSRF token for each session
2. Forms include the token automatically via the provider
3. All state-changing requests verify the token
4. Mismatched tokens are rejected

```typescript
// CSRF is automatic with NextAuth
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // CSRF already verified by NextAuth middleware
  // Safe to proceed with mutation
  const body = await request.json();
  // ...
}
```

### Manual CSRF for Custom Forms

For forms not using NextAuth's built-in providers:

```typescript
// lib/csrf.ts
import { randomBytes, createHash } from 'crypto';

export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

export function verifyCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;

  // Timing-safe comparison
  const tokenHash = createHash('sha256').update(token).digest('hex');
  const storedHash = createHash('sha256').update(storedToken).digest('hex');

  return tokenHash === storedHash;
}
```

```tsx
// components/protected-form.tsx
'use client';

import { useEffect, useState } from 'react';

export function ProtectedForm({ children, action }) {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch CSRF token from server
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => setCsrfToken(data.token));
  }, []);

  return (
    <form action={action}>
      <input type="hidden" name="csrfToken" value={csrfToken} />
      {children}
    </form>
  );
}
```

---

## Rate Limiting

Prevent abuse and protect resources:

### Basic Rate Limiter

```typescript
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];

        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1]);
        }

        tokenCount[0] += 1;
        tokenCache.set(token, tokenCount);

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        if (isRateLimited) {
          reject(new Error('Rate limit exceeded'));
        } else {
          resolve();
        }
      }),
  };
}
```

### Middleware Implementation

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max users per interval
});

// Route-specific limits
const RATE_LIMITS = {
  '/api/auth': 10,      // 10 auth attempts per minute
  '/api/contact': 5,    // 5 contact form submissions per minute
  '/api/upload': 20,    // 20 uploads per minute
  default: 100,         // 100 requests per minute for other routes
};

export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  // Only rate limit API routes
  if (!pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const ip = request.headers.get('x-forwarded-for') ||
             request.headers.get('x-real-ip') ||
             'unknown';

  // Find matching rate limit
  const limit = Object.entries(RATE_LIMITS).find(
    ([path]) => pathname.startsWith(path)
  )?.[1] || RATE_LIMITS.default;

  try {
    await limiter.check(limit, `${ip}:${pathname}`);
    return NextResponse.next();
  } catch {
    return new NextResponse(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'Please slow down and try again later.',
        retryAfter: 60,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      }
    );
  }
}

export const config = {
  matcher: '/api/:path*',
};
```

### Advanced Rate Limiting with Redis

For production with multiple instances:

```typescript
// lib/rate-limit-redis.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export async function checkRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const key = `rate_limit:${identifier}`;
  const now = Date.now();
  const windowStart = now - windowMs;

  // Remove old entries and add new one
  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(key, 0, windowStart);
  pipeline.zadd(key, { score: now, member: `${now}` });
  pipeline.zcard(key);
  pipeline.expire(key, Math.ceil(windowMs / 1000));

  const results = await pipeline.exec();
  const count = results[2] as number;

  return {
    success: count <= limit,
    remaining: Math.max(0, limit - count),
    reset: now + windowMs,
  };
}
```

---

## Input Validation

Validate all inputs with Zod:

### Schema Definition

```typescript
// lib/validations/user.ts
import { z } from 'zod';

// Email with proper validation
const emailSchema = z
  .string()
  .email('Invalid email address')
  .toLowerCase()
  .trim();

// Password with security requirements
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  );

// User creation schema
export const createUserSchema = z.object({
  email: emailSchema,
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  password: passwordSchema,
});

// User update schema (all fields optional)
export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).trim().optional(),
  email: emailSchema.optional(),
});

// Type inference
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
```

### API Route Usage

```typescript
// app/api/users/route.ts
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createUserSchema } from '@/lib/validations/user';

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse and validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  // Validate with Zod
  const result = createUserSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      {
        error: 'Validation failed',
        details: result.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  // result.data is now typed and validated
  const { email, name, password } = result.data;

  // Check for existing user
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return Response.json(
      { error: 'Email already registered' },
      { status: 409 }
    );
  }

  // Create user (hash password in production)
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await hashPassword(password),
    },
  });

  return Response.json(
    { user: { id: user.id, email: user.email, name: user.name } },
    { status: 201 }
  );
}
```

### Client-Side Validation

Use the same schemas on the client:

```tsx
// components/auth/sign-up-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, type CreateUserInput } from '@/lib/validations/user';

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: CreateUserInput) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('name')} placeholder="Name" />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <input {...register('email')} placeholder="Email" type="email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <input {...register('password')} placeholder="Password" type="password" />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : '> CREATE ACCOUNT'}
      </button>
    </form>
  );
}
```

---

## SQL Injection Prevention

Prisma prevents SQL injection by design:

### Safe Queries

```typescript
// SAFE - Prisma parameterizes all values
const user = await prisma.user.findFirst({
  where: { email: userInput },  // userInput is automatically escaped
});

// SAFE - Even with dynamic values
const users = await prisma.user.findMany({
  where: {
    OR: [
      { name: { contains: searchTerm } },
      { email: { contains: searchTerm } },
    ],
  },
});

// SAFE - With variables in updates
await prisma.user.update({
  where: { id: userId },
  data: { name: newName },  // newName is parameterized
});
```

### Avoid Raw Queries

```typescript
// DANGEROUS - Never interpolate user input into raw queries
// await prisma.$queryRaw`SELECT * FROM users WHERE email = ${userInput}`;

// If you MUST use raw queries, use Prisma.sql for parameterization
import { Prisma } from '@prisma/client';

const safeQuery = await prisma.$queryRaw(
  Prisma.sql`SELECT * FROM users WHERE email = ${userInput}`
);
```

### Dynamic Queries Safely

```typescript
// Build dynamic queries safely with Prisma
function buildUserQuery(filters: {
  name?: string;
  email?: string;
  role?: string;
}) {
  const where: Prisma.UserWhereInput = {};

  if (filters.name) {
    where.name = { contains: filters.name, mode: 'insensitive' };
  }
  if (filters.email) {
    where.email = { contains: filters.email, mode: 'insensitive' };
  }
  if (filters.role) {
    where.role = filters.role;  // Exact match
  }

  return prisma.user.findMany({ where });
}
```

---

## XSS Protection

Prevent Cross-Site Scripting attacks:

### React's Automatic Escaping

```tsx
// SAFE - React automatically escapes
function UserProfile({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>  {/* Escaped */}
      <p>{user.bio}</p>     {/* Escaped */}
    </div>
  );
}

// DANGEROUS - Avoid unless absolutely necessary
function UnsafeComponent({ htmlContent }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
```

### Sanitizing HTML Content

When you must render HTML (like markdown):

```typescript
// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

// Strict sanitization - only basic formatting
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  });
}

// Markdown sanitization - more permissive
export function sanitizeMarkdown(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'a', 'strong', 'em', 'code', 'pre',
      'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'img',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class'],
    ADD_ATTR: ['target'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input'],
  });
}
```

```tsx
// components/markdown-content.tsx
import { sanitizeMarkdown } from '@/lib/sanitize';

export function MarkdownContent({ content }: { content: string }) {
  const sanitizedHTML = sanitizeMarkdown(content);

  return (
    <div
      className="prose prose-sm"
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}
```

### Content Security Policy

Configure CSP headers:

```typescript
// next.config.ts
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## Secure Headers

Configure security headers in `next.config.ts`:

```typescript
// next.config.ts
const securityHeaders = [
  // Prevent DNS prefetching
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // Force HTTPS
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevent clickjacking
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Control referrer information
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Control browser features
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## Environment Variables

Never expose secrets:

### Server vs Client Variables

```typescript
// Server-only variables (never sent to client)
const secret = process.env.STRIPE_SECRET_KEY;
const dbUrl = process.env.DATABASE_URL;

// Client-safe variables (NEXT_PUBLIC_ prefix)
const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
```

### Zod Validation

```typescript
// lib/env/index.ts
import { z } from 'zod';

// Server-side environment variables
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  RESEND_API_KEY: z.string().startsWith('re_'),
});

// Client-side environment variables
const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
});

// Validate server environment
const serverEnv = serverSchema.safeParse(process.env);
if (!serverEnv.success) {
  console.error('Invalid server environment variables:', serverEnv.error.issues);
  throw new Error('Invalid server environment variables');
}

// Validate client environment
const clientEnv = clientSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
});
if (!clientEnv.success) {
  console.error('Invalid client environment variables:', clientEnv.error.issues);
  throw new Error('Invalid client environment variables');
}

export const env = {
  ...serverEnv.data,
  ...clientEnv.data,
};
```

---

## Password Security

Passwords are hashed with bcrypt:

```typescript
// lib/password.ts
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
```

### Password Requirements

```typescript
// lib/validations/password.ts
import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .refine(
    (password) => /[A-Z]/.test(password),
    'Password must contain at least one uppercase letter'
  )
  .refine(
    (password) => /[a-z]/.test(password),
    'Password must contain at least one lowercase letter'
  )
  .refine(
    (password) => /[0-9]/.test(password),
    'Password must contain at least one number'
  )
  .refine(
    (password) => /[^A-Za-z0-9]/.test(password),
    'Password must contain at least one special character'
  );
```

---

## API Route Protection

Protect routes consistently with a helper:

```typescript
// lib/api/protect.ts
import { auth } from '@/lib/auth';
import { z } from 'zod';

type Handler<T> = (
  request: Request,
  context: {
    session: NonNullable<Awaited<ReturnType<typeof auth>>>;
    params?: Record<string, string>;
    body?: T;
  }
) => Promise<Response>;

export function protectedRoute<T>(
  schema?: z.ZodSchema<T>,
  options?: {
    roles?: string[];
  }
) {
  return (handler: Handler<T>) => {
    return async (
      request: Request,
      { params }: { params?: Record<string, string> } = {}
    ): Promise<Response> => {
      // 1. Authenticate
      const session = await auth();
      if (!session?.user) {
        return Response.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      // 2. Authorize (role check)
      if (options?.roles && !options.roles.includes(session.user.role)) {
        return Response.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }

      // 3. Validate body if schema provided
      let body: T | undefined;
      if (schema && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
        try {
          const rawBody = await request.json();
          const result = schema.safeParse(rawBody);

          if (!result.success) {
            return Response.json(
              { error: 'Validation failed', details: result.error.issues },
              { status: 400 }
            );
          }

          body = result.data;
        } catch {
          return Response.json(
            { error: 'Invalid JSON body' },
            { status: 400 }
          );
        }
      }

      // 4. Call handler
      return handler(request, { session, params, body });
    };
  };
}

// Usage
import { createUserSchema } from '@/lib/validations/user';

export const POST = protectedRoute(createUserSchema, { roles: ['admin'] })(
  async (request, { session, body }) => {
    // body is typed and validated
    const user = await prisma.user.create({
      data: body!,
    });

    return Response.json({ user }, { status: 201 });
  }
);
```

---

## Webhook Security

Verify webhook signatures:

### Stripe Webhooks

```typescript
// app/api/stripe/webhook/route.ts
import Stripe from 'stripe';
import { env } from '@/lib/env';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return Response.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return Response.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Signature verified, process event
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutComplete(event.data.object);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdate(event.data.object);
      break;
    // ... other events
  }

  return Response.json({ received: true });
}
```

### Generic Webhook Verification

```typescript
// lib/webhooks.ts
import { createHmac, timingSafeEqual } from 'crypto';

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
  tolerance: number = 300 // 5 minutes
): boolean {
  try {
    // Parse signature (format: t=timestamp,v1=hash)
    const parts = signature.split(',');
    const timestamp = parseInt(
      parts.find(p => p.startsWith('t='))?.slice(2) || '0'
    );
    const hash = parts.find(p => p.startsWith('v1='))?.slice(3) || '';

    // Check timestamp is within tolerance
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - timestamp) > tolerance) {
      return false;
    }

    // Compute expected signature
    const signedPayload = `${timestamp}.${payload}`;
    const expectedSignature = createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex');

    // Timing-safe comparison
    return timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}
```

---

## Security Scanning

Run security checks before deploy:

```bash
# Vulnerability scan
npm run ai:security

# Full pre-deploy check
npm run ai:pre-deploy

# Manual audit
npm audit
npm audit fix

# Check for known vulnerabilities in dependencies
npx snyk test
```

---

## Security Checklist

Before going to production:

### Authentication & Authorization
- [ ] All routes requiring auth are protected
- [ ] Role-based access control implemented
- [ ] Session expiration configured appropriately
- [ ] Password requirements meet standards
- [ ] OAuth callback URLs validated

### Data Protection
- [ ] Input validation on all endpoints
- [ ] SQL injection prevented (Prisma used correctly)
- [ ] XSS protection in place
- [ ] Sensitive data encrypted at rest
- [ ] PII handled according to regulations

### API Security
- [ ] Rate limiting configured
- [ ] CORS configured correctly
- [ ] API keys hashed before storage
- [ ] Webhook signatures verified
- [ ] Error messages don't leak information

### Infrastructure
- [ ] HTTPS enforced everywhere
- [ ] Security headers configured
- [ ] Environment variables validated
- [ ] No secrets in code or logs
- [ ] Dependencies regularly updated

### Monitoring
- [ ] Security events logged
- [ ] Failed login attempts tracked
- [ ] Unusual activity alerts configured
- [ ] Regular security audits scheduled

---

## Best Practices

### 1. Trust Nothing

```typescript
// Validate ALL input, even from authenticated users
const result = schema.safeParse(input);
if (!result.success) {
  throw new ValidationError(result.error);
}
```

### 2. Least Privilege

```typescript
// Only grant the minimum access needed
if (user.role !== 'admin' && resource.ownerId !== user.id) {
  throw new ForbiddenError();
}
```

### 3. Defense in Depth

```typescript
// Multiple layers of security
// Layer 1: Middleware rate limiting
// Layer 2: Authentication check
// Layer 3: Authorization check
// Layer 4: Input validation
// Layer 5: Database constraints
```

### 4. Fail Securely

```typescript
// Return generic errors to users
return Response.json(
  { error: 'Authentication failed' },  // Don't say "user not found" vs "wrong password"
  { status: 401 }
);

// Log detailed errors internally
console.error('Auth failed:', { reason, userId, ip });
```

### 5. Log Security Events

```typescript
// Audit trail for security events
await prisma.auditLog.create({
  data: {
    action: 'LOGIN_ATTEMPT',
    userId: user?.id,
    ip: request.ip,
    success: false,
    reason: 'Invalid password',
    timestamp: new Date(),
  },
});
```

---

## Summary

Security from day one, not bolted on later:

1. **Authentication** - NextAuth v5 with secure defaults
2. **Validation** - Zod schemas for all inputs
3. **Rate Limiting** - Protect against abuse
4. **Injection Prevention** - Prisma parameterized queries
5. **XSS Protection** - React escaping + CSP headers
6. **Secure Defaults** - Headers, cookies, environment

Build with confidence. Ship securely.

