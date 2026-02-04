---
title: 'API Keys and Webhooks: Building Developer-Friendly Integrations'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'api-keys-webhooks-developer-experience'
description: 'Fabrk includes API key management and webhook infrastructure for building developer-friendly SaaS integrations.'
publishedAt: '2026-01-18T10:00:00.000Z'
---

**Give your users the integration tools they expect.**

---

## [ DEVELOPER EXPERIENCE MATTERS ]

In 2026, developer experience is not optional. It is a competitive advantage.

When developers evaluate SaaS platforms, they look for:

- **API Access** - Programmatic control over every feature
- **Webhooks** - Real-time event notifications
- **Documentation** - Clear, comprehensive, and interactive
- **SDKs** - Native libraries for their language of choice
- **Security** - Industry-standard authentication and encryption

Companies like Stripe, Twilio, and GitHub have set the bar high. Their developer portals are not afterthoughts. They are core products. Developers remember which platforms made integration painful and which made it effortless.

The math is simple: better developer experience equals faster adoption, lower churn, and organic growth through developer recommendations.

Fabrk includes production-ready API key management and webhook infrastructure. You ship developer-friendly integrations from day one.

---

## [ API KEY FUNDAMENTALS ]

API keys serve as the primary authentication mechanism for programmatic access. Unlike session-based auth, API keys are designed for server-to-server communication, automation scripts, and third-party integrations.

### Why API Keys Over OAuth for APIs

| Use Case | API Keys | OAuth |
|----------|----------|-------|
| Server automation | Excellent | Overkill |
| Third-party integrations | Good | Better for user data |
| CLI tools | Good | Complex |
| Webhooks | Required | Not applicable |
| Mobile apps | Avoid | Preferred |

API keys excel when the integration runs on trusted servers. OAuth shines when end-users grant access to their data. Most SaaS platforms need both.

### Key Format Standards

A well-designed API key format tells developers what they are looking at:

```
sk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
│  │    │
│  │    └── Random bytes (24+ bytes, hex encoded)
│  │
│  └── Environment (live, test, staging)
│
└── Key type (sk = secret, pk = publishable)
```

This format provides immediate context:

- **sk_** prefix indicates a secret key (never expose client-side)
- **pk_** prefix indicates a publishable key (safe for browsers)
- **live** vs **test** prevents accidental production operations
- Long random suffix ensures uniqueness and security

---

## [ API KEY DATA MODEL ]

```prisma
model ApiKey {
  id             String    @id @default(cuid())
  name           String
  keyPrefix      String    // "sk_live_a1b2..." for display
  hashedKey      String    @unique
  organizationId String
  createdBy      String
  scopes         String[]  // ["read:users", "write:projects"]
  lastUsedAt     DateTime?
  expiresAt      DateTime?
  revokedAt      DateTime?
  ipAllowlist    String[]  // Optional IP restrictions
  rateLimitTier  String    @default("standard")
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  creator      User         @relation(fields: [createdBy], references: [id])
  usageLogs    ApiKeyUsage[]
}

model ApiKeyUsage {
  id        String   @id @default(cuid())
  apiKeyId  String
  endpoint  String
  method    String
  statusCode Int
  ipAddress String
  userAgent String?
  timestamp DateTime @default(now())

  apiKey ApiKey @relation(fields: [apiKeyId], references: [id], onDelete: Cascade)

  @@index([apiKeyId, timestamp])
}
```

Key design decisions:

1. **Never store raw keys** - Only the hash is persisted
2. **Store prefix for display** - Users can identify keys without revealing them
3. **Track usage** - Know which keys are active and what they access
4. **Support scopes** - Fine-grained permission control
5. **Enable IP restrictions** - Extra security for high-value keys

---

## [ SECURE KEY GENERATION ]

Cryptographically secure key generation is non-negotiable. Weak randomness leads to predictable keys and security breaches.

```typescript
// src/lib/api-keys/generate.ts
import { randomBytes, createHash, timingSafeEqual } from 'crypto';

export interface GeneratedApiKey {
  key: string;         // Full key - show once, never store
  keyPrefix: string;   // Display prefix
  hashedKey: string;   // Store this
}

/**
 * Generate a cryptographically secure API key
 *
 * Security properties:
 * - 192 bits of entropy (24 random bytes)
 * - Collision probability: 1 in 2^192
 * - Brute force infeasible: 10^57 possible keys
 */
export function generateApiKey(
  environment: 'live' | 'test' = 'live'
): GeneratedApiKey {
  // Generate 24 random bytes (192 bits of entropy)
  const randomPart = randomBytes(24).toString('hex');

  // Construct full key with prefix
  const key = `sk_${environment}_${randomPart}`;

  // Create display prefix (first 12 chars + ellipsis)
  const keyPrefix = `${key.slice(0, 16)}...${key.slice(-4)}`;

  // Hash for storage using SHA-256
  const hashedKey = hashApiKey(key);

  return {
    key,
    keyPrefix,
    hashedKey,
  };
}

/**
 * Hash an API key for storage
 * Using SHA-256 - fast enough for validation, secure for storage
 */
export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

/**
 * Timing-safe comparison to prevent timing attacks
 */
export function compareApiKeyHash(
  providedKey: string,
  storedHash: string
): boolean {
  const providedHash = Buffer.from(hashApiKey(providedKey), 'hex');
  const expectedHash = Buffer.from(storedHash, 'hex');

  if (providedHash.length !== expectedHash.length) {
    return false;
  }

  return timingSafeEqual(providedHash, expectedHash);
}
```

### Why SHA-256 for API Keys?

Unlike passwords, API keys are:

1. **High entropy** - 192 bits vs typical 20-40 bits for passwords
2. **Not reused** - Each key is unique to your service
3. **Machine-generated** - No human-memorable patterns

This means bcrypt/argon2 is overkill. SHA-256 provides:

- Fast validation (important for every API request)
- Sufficient security for high-entropy inputs
- No rainbow table risk (keys are random, not dictionary words)

---

## [ KEY CREATION SERVICE ]

```typescript
// src/lib/api-keys/service.ts
import { prisma } from '@/lib/prisma';
import { generateApiKey } from './generate';
import { ApiKeyScope, validateScopes } from './scopes';

export interface CreateApiKeyInput {
  name: string;
  organizationId: string;
  createdBy: string;
  scopes?: ApiKeyScope[];
  expiresInDays?: number;
  ipAllowlist?: string[];
  environment?: 'live' | 'test';
}

export interface CreateApiKeyResult {
  id: string;
  name: string;
  key: string;        // Raw key - return ONCE
  keyPrefix: string;
  scopes: string[];
  expiresAt: Date | null;
  createdAt: Date;
}

export async function createApiKey(
  input: CreateApiKeyInput
): Promise<CreateApiKeyResult> {
  const {
    name,
    organizationId,
    createdBy,
    scopes = ['read:all'],
    expiresInDays,
    ipAllowlist = [],
    environment = 'live',
  } = input;

  // Validate scopes
  const validatedScopes = validateScopes(scopes);

  // Generate key
  const { key, keyPrefix, hashedKey } = generateApiKey(environment);

  // Calculate expiration
  const expiresAt = expiresInDays
    ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
    : null;

  // Create database record
  const apiKey = await prisma.apiKey.create({
    data: {
      name,
      keyPrefix,
      hashedKey,
      organizationId,
      createdBy,
      scopes: validatedScopes,
      expiresAt,
      ipAllowlist,
    },
  });

  return {
    id: apiKey.id,
    name: apiKey.name,
    key,  // Raw key - only time it's ever returned
    keyPrefix: apiKey.keyPrefix,
    scopes: apiKey.scopes,
    expiresAt: apiKey.expiresAt,
    createdAt: apiKey.createdAt,
  };
}

export async function revokeApiKey(
  keyId: string,
  organizationId: string
): Promise<void> {
  await prisma.apiKey.update({
    where: {
      id: keyId,
      organizationId, // Ensure ownership
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function listApiKeys(
  organizationId: string
) {
  return prisma.apiKey.findMany({
    where: {
      organizationId,
      revokedAt: null,
    },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      scopes: true,
      lastUsedAt: true,
      expiresAt: true,
      createdAt: true,
      creator: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
```

---

## [ KEY VALIDATION WITH CACHING ]

Every API request must validate the key. Without caching, this becomes a database bottleneck.

```typescript
// src/lib/api-keys/validate.ts
import { prisma } from '@/lib/prisma';
import { hashApiKey, compareApiKeyHash } from './generate';
import { LRUCache } from 'lru-cache';

// In-memory cache for validated keys
// TTL: 5 minutes, Max: 10,000 entries
const keyCache = new LRUCache<string, CachedApiKey>({
  max: 10000,
  ttl: 1000 * 60 * 5, // 5 minutes
});

interface CachedApiKey {
  id: string;
  organizationId: string;
  scopes: string[];
  expiresAt: Date | null;
  revokedAt: Date | null;
  ipAllowlist: string[];
  rateLimitTier: string;
}

export interface ValidatedApiKey extends CachedApiKey {
  hashedKey: string;
}

export async function validateApiKey(
  key: string,
  clientIp?: string
): Promise<ValidatedApiKey | null> {
  // Check format
  if (!key.startsWith('sk_')) {
    return null;
  }

  const hashedKey = hashApiKey(key);

  // Check cache first
  const cached = keyCache.get(hashedKey);
  if (cached) {
    // Validate cached entry
    if (!isKeyValid(cached, clientIp)) {
      return null;
    }
    return { ...cached, hashedKey };
  }

  // Query database
  const apiKey = await prisma.apiKey.findFirst({
    where: { hashedKey },
    select: {
      id: true,
      organizationId: true,
      scopes: true,
      expiresAt: true,
      revokedAt: true,
      ipAllowlist: true,
      rateLimitTier: true,
    },
  });

  if (!apiKey) {
    return null;
  }

  // Validate key
  if (!isKeyValid(apiKey, clientIp)) {
    return null;
  }

  // Cache valid key
  keyCache.set(hashedKey, apiKey);

  // Update last used (async, non-blocking)
  updateLastUsed(apiKey.id).catch(console.error);

  return { ...apiKey, hashedKey };
}

function isKeyValid(
  key: CachedApiKey,
  clientIp?: string
): boolean {
  // Check if revoked
  if (key.revokedAt) {
    return false;
  }

  // Check expiration
  if (key.expiresAt && key.expiresAt < new Date()) {
    return false;
  }

  // Check IP allowlist
  if (key.ipAllowlist.length > 0 && clientIp) {
    if (!key.ipAllowlist.includes(clientIp)) {
      return false;
    }
  }

  return true;
}

async function updateLastUsed(keyId: string): Promise<void> {
  await prisma.apiKey.update({
    where: { id: keyId },
    data: { lastUsedAt: new Date() },
  });
}

/**
 * Invalidate cache when key is revoked or updated
 */
export function invalidateKeyCache(hashedKey: string): void {
  keyCache.delete(hashedKey);
}
```

---

## [ SCOPED API KEYS ]

Not all integrations need full access. Scoped keys follow the principle of least privilege.

```typescript
// src/lib/api-keys/scopes.ts

/**
 * Available API key scopes
 * Format: action:resource
 */
export const API_SCOPES = {
  // User scopes
  'read:users': 'Read user profiles',
  'write:users': 'Create and update users',
  'delete:users': 'Delete users',

  // Project scopes
  'read:projects': 'Read project data',
  'write:projects': 'Create and update projects',
  'delete:projects': 'Delete projects',

  // Billing scopes
  'read:billing': 'Read invoices and subscriptions',
  'write:billing': 'Update payment methods',

  // Webhook scopes
  'read:webhooks': 'List webhook configurations',
  'write:webhooks': 'Create and update webhooks',

  // Admin scopes
  'admin:all': 'Full administrative access',

  // Convenience scopes
  'read:all': 'Read access to all resources',
  'write:all': 'Write access to all resources',
} as const;

export type ApiKeyScope = keyof typeof API_SCOPES;

/**
 * Validate and expand scopes
 */
export function validateScopes(scopes: string[]): ApiKeyScope[] {
  const validScopes: ApiKeyScope[] = [];

  for (const scope of scopes) {
    if (scope in API_SCOPES) {
      validScopes.push(scope as ApiKeyScope);
    }
  }

  return validScopes.length > 0 ? validScopes : ['read:all'];
}

/**
 * Check if a key has required scope
 */
export function hasScope(
  keyScopes: string[],
  requiredScope: ApiKeyScope
): boolean {
  // Admin has all scopes
  if (keyScopes.includes('admin:all')) {
    return true;
  }

  // Check exact match
  if (keyScopes.includes(requiredScope)) {
    return true;
  }

  // Check wildcard scopes
  const [action, resource] = requiredScope.split(':');

  if (action === 'read' && keyScopes.includes('read:all')) {
    return true;
  }

  if (action === 'write' && keyScopes.includes('write:all')) {
    return true;
  }

  return false;
}

/**
 * Middleware helper to require specific scope
 */
export function requireScope(scope: ApiKeyScope) {
  return (keyScopes: string[]): boolean => {
    return hasScope(keyScopes, scope);
  };
}
```

---

## [ RATE LIMITING PER KEY ]

Different keys get different rate limits based on their tier.

```typescript
// src/lib/api-keys/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

// Rate limit tiers
const RATE_LIMITS = {
  free: { requests: 100, window: '1m' },
  standard: { requests: 1000, window: '1m' },
  professional: { requests: 5000, window: '1m' },
  enterprise: { requests: 50000, window: '1m' },
} as const;

type RateLimitTier = keyof typeof RATE_LIMITS;

// Create rate limiters for each tier
const rateLimiters = Object.entries(RATE_LIMITS).reduce(
  (acc, [tier, config]) => {
    acc[tier as RateLimitTier] = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(
        config.requests,
        config.window as '1m'
      ),
      prefix: `ratelimit:api:${tier}`,
    });
    return acc;
  },
  {} as Record<RateLimitTier, Ratelimit>
);

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

export async function checkRateLimit(
  identifier: string,
  tier: string = 'standard'
): Promise<RateLimitResult> {
  const limiter = rateLimiters[tier as RateLimitTier] || rateLimiters.standard;
  const config = RATE_LIMITS[tier as RateLimitTier] || RATE_LIMITS.standard;

  const result = await limiter.limit(identifier);

  return {
    success: result.success,
    limit: config.requests,
    remaining: result.remaining,
    reset: result.reset,
    retryAfter: result.success ? undefined : Math.ceil((result.reset - Date.now()) / 1000),
  };
}

/**
 * Add rate limit headers to response
 */
export function addRateLimitHeaders(
  headers: Headers,
  result: RateLimitResult
): void {
  headers.set('X-RateLimit-Limit', result.limit.toString());
  headers.set('X-RateLimit-Remaining', result.remaining.toString());
  headers.set('X-RateLimit-Reset', result.reset.toString());

  if (result.retryAfter) {
    headers.set('Retry-After', result.retryAfter.toString());
  }
}
```

---

## [ API AUTHENTICATION MIDDLEWARE ]

Combine validation, scopes, and rate limiting into a single middleware.

```typescript
// src/lib/api-keys/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, ValidatedApiKey } from './validate';
import { hasScope, ApiKeyScope } from './scopes';
import { checkRateLimit, addRateLimitHeaders } from './rate-limit';

export interface ApiContext {
  apiKey: ValidatedApiKey;
  organizationId: string;
}

export type ApiHandler = (
  request: NextRequest,
  context: ApiContext
) => Promise<NextResponse>;

interface WithApiKeyOptions {
  requiredScopes?: ApiKeyScope[];
}

/**
 * Middleware wrapper for API key authentication
 */
export function withApiKey(
  handler: ApiHandler,
  options: WithApiKeyOptions = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    // Extract API key from header
    const authHeader = request.headers.get('authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          error: {
            code: 'MISSING_API_KEY',
            message: 'Authorization header with Bearer token required',
          },
        },
        { status: 401 }
      );
    }

    const key = authHeader.replace('Bearer ', '');

    // Get client IP for allowlist check
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]
      || request.headers.get('x-real-ip')
      || 'unknown';

    // Validate key
    const apiKey = await validateApiKey(key, clientIp);

    if (!apiKey) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_API_KEY',
            message: 'API key is invalid, expired, or revoked',
          },
        },
        { status: 401 }
      );
    }

    // Check required scopes
    if (options.requiredScopes) {
      for (const scope of options.requiredScopes) {
        if (!hasScope(apiKey.scopes, scope)) {
          return NextResponse.json(
            {
              error: {
                code: 'INSUFFICIENT_SCOPE',
                message: `This action requires the '${scope}' scope`,
                required_scope: scope,
              },
            },
            { status: 403 }
          );
        }
      }
    }

    // Check rate limit
    const rateLimitResult = await checkRateLimit(
      apiKey.id,
      apiKey.rateLimitTier
    );

    if (!rateLimitResult.success) {
      const response = NextResponse.json(
        {
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please slow down.',
            retry_after: rateLimitResult.retryAfter,
          },
        },
        { status: 429 }
      );

      addRateLimitHeaders(response.headers, rateLimitResult);
      return response;
    }

    // Execute handler
    const response = await handler(request, {
      apiKey,
      organizationId: apiKey.organizationId,
    });

    // Add rate limit headers to successful response
    addRateLimitHeaders(response.headers, rateLimitResult);

    return response;
  };
}
```

### Using the Middleware

```typescript
// src/app/api/v1/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { withApiKey } from '@/lib/api-keys/middleware';
import { prisma } from '@/lib/prisma';

export const GET = withApiKey(
  async (request, { organizationId }) => {
    const users = await prisma.user.findMany({
      where: { organizationId },
    });

    return NextResponse.json({ data: users });
  },
  { requiredScopes: ['read:users'] }
);

export const POST = withApiKey(
  async (request, { organizationId }) => {
    const body = await request.json();

    const user = await prisma.user.create({
      data: {
        ...body,
        organizationId,
      },
    });

    return NextResponse.json({ data: user }, { status: 201 });
  },
  { requiredScopes: ['write:users'] }
);
```

---

## [ API KEY MANAGEMENT UI ]

A complete component for managing API keys with all features.

```tsx
// src/components/developer/api-key-manager.tsx
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Copy, Key, Trash2, Clock, Shield } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  scopes: string[];
  lastUsedAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
  creator: {
    name: string;
    email: string;
  };
}

const AVAILABLE_SCOPES = [
  { value: 'read:all', label: 'Read All', description: 'Read access to all resources' },
  { value: 'write:all', label: 'Write All', description: 'Write access to all resources' },
  { value: 'read:users', label: 'Read Users', description: 'Read user profiles' },
  { value: 'write:users', label: 'Write Users', description: 'Create and update users' },
  { value: 'read:projects', label: 'Read Projects', description: 'Read project data' },
  { value: 'write:projects', label: 'Write Projects', description: 'Create and update projects' },
  { value: 'read:billing', label: 'Read Billing', description: 'Read invoices and subscriptions' },
  { value: 'read:webhooks', label: 'Read Webhooks', description: 'List webhook configurations' },
  { value: 'write:webhooks', label: 'Write Webhooks', description: 'Create and update webhooks' },
];

export function ApiKeyManager() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newKeyData, setNewKeyData] = useState<{
    key: string;
    name: string;
  } | null>(null);
  const [revokeKeyId, setRevokeKeyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateKey = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          scopes: formData.getAll('scopes'),
          expiresInDays: formData.get('expiration') || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewKeyData({ key: data.key, name: data.name });
        setIsCreateOpen(false);
        // Refresh keys list
        fetchKeys();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeKey = async () => {
    if (!revokeKeyId) return;

    await fetch(`/api/v1/api-keys/${revokeKeyId}`, {
      method: 'DELETE',
    });

    setRevokeKeyId(null);
    fetchKeys();
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const fetchKeys = async () => {
    const response = await fetch('/api/v1/api-keys');
    const data = await response.json();
    setKeys(data.data || []);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-mono text-lg font-bold uppercase">
            API KEYS
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage API keys for programmatic access
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className={cn(mode.radius)}>
              <Key className="mr-2 h-4 w-4" />
              {`> CREATE KEY`}
            </Button>
          </DialogTrigger>
          <DialogContent className={cn('sm:max-w-md', mode.radius)}>
            <DialogHeader>
              <DialogTitle className="font-mono uppercase">
                CREATE API KEY
              </DialogTitle>
            </DialogHeader>
            <CreateKeyForm
              onSubmit={handleCreateKey}
              isLoading={isLoading}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* New Key Display Modal */}
      {newKeyData && (
        <Card className={cn('border-2 border-primary', mode.radius)}>
          <CardHeader className="border-b border-border pb-2">
            <span className="font-mono text-xs text-primary">
              [ NEW API KEY CREATED ]
            </span>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="rounded bg-muted p-4">
                <div className="flex items-center justify-between">
                  <code className="font-mono text-sm break-all">
                    {newKeyData.key}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(newKeyData.key)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded border border-destructive/50 bg-destructive/10 p-3">
                <Shield className="mt-0.5 h-4 w-4 text-destructive" />
                <div className="text-sm">
                  <p className="font-medium text-destructive">
                    Save this key now
                  </p>
                  <p className="text-muted-foreground">
                    This is the only time you will see the full key.
                    Store it securely.
                  </p>
                </div>
              </div>
              <Button
                className={cn('w-full', mode.radius)}
                onClick={() => setNewKeyData(null)}
              >
                {`> I'VE SAVED MY KEY`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Keys Table */}
      <Card className={cn('border border-border', mode.radius)}>
        <CardHeader className="border-b border-border">
          <span className="font-mono text-xs text-muted-foreground">
            [ ACTIVE KEYS ]
          </span>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>KEY</TableHead>
              <TableHead>SCOPES</TableHead>
              <TableHead>LAST USED</TableHead>
              <TableHead>EXPIRES</TableHead>
              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-muted-foreground"
                >
                  No API keys yet. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>
                    <code className="font-mono text-xs text-muted-foreground">
                      {key.keyPrefix}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {key.scopes.slice(0, 2).map((scope) => (
                        <Badge
                          key={scope}
                          variant="secondary"
                          className="text-xs"
                        >
                          {scope}
                        </Badge>
                      ))}
                      {key.scopes.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{key.scopes.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {key.lastUsedAt
                      ? formatDistanceToNow(new Date(key.lastUsedAt), {
                          addSuffix: true,
                        })
                      : 'Never'}
                  </TableCell>
                  <TableCell>
                    {key.expiresAt ? (
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(key.expiresAt), {
                          addSuffix: true,
                        })}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Never
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setRevokeKeyId(key.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Revoke Confirmation */}
      <AlertDialog
        open={!!revokeKeyId}
        onOpenChange={() => setRevokeKeyId(null)}
      >
        <AlertDialogContent className={cn(mode.radius)}>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-mono uppercase">
              REVOKE API KEY
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Any applications using this key
              will immediately lose access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={cn(mode.radius)}>
              {`> CANCEL`}
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(mode.radius, 'bg-destructive text-destructive-foreground')}
              onClick={handleRevokeKey}
            >
              {`> REVOKE KEY`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function CreateKeyForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}) {
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['read:all']);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    selectedScopes.forEach((scope) => formData.append('scopes', scope));
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-mono text-xs uppercase">
          KEY NAME
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Production API Key"
          required
          className={cn(mode.radius)}
        />
      </div>

      <div className="space-y-2">
        <Label className="font-mono text-xs uppercase">SCOPES</Label>
        <div className="space-y-2 rounded border border-border p-3">
          {AVAILABLE_SCOPES.map((scope) => (
            <div key={scope.value} className="flex items-start gap-2">
              <Checkbox
                id={scope.value}
                checked={selectedScopes.includes(scope.value)}
                onCheckedChange={(checked) => {
                  setSelectedScopes((prev) =>
                    checked
                      ? [...prev, scope.value]
                      : prev.filter((s) => s !== scope.value)
                  );
                }}
              />
              <div className="grid gap-0.5">
                <Label
                  htmlFor={scope.value}
                  className="text-sm font-medium cursor-pointer"
                >
                  {scope.label}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {scope.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="expiration" className="font-mono text-xs uppercase">
          EXPIRATION
        </Label>
        <Select name="expiration" defaultValue="">
          <SelectTrigger className={cn(mode.radius)}>
            <SelectValue placeholder="Never expires" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Never expires</SelectItem>
            <SelectItem value="30">30 days</SelectItem>
            <SelectItem value="90">90 days</SelectItem>
            <SelectItem value="180">180 days</SelectItem>
            <SelectItem value="365">1 year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className={cn('w-full', mode.radius)}
        disabled={isLoading || selectedScopes.length === 0}
      >
        {isLoading ? 'CREATING...' : `> CREATE API KEY`}
      </Button>
    </form>
  );
}
```

---

## [ WEBHOOK ARCHITECTURE ]

Webhooks enable event-driven integrations. When something happens in your application, you notify external systems in real-time.

### Event-Driven Design Principles

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Your App       │────▶│  Event Queue │────▶│  Webhook Worker │
│  (Event Source) │     │  (Buffer)    │     │  (Delivery)     │
└─────────────────┘     └──────────────┘     └─────────────────┘
                                                      │
                                                      ▼
                                             ┌─────────────────┐
                                             │  External APIs  │
                                             │  (Subscribers)  │
                                             └─────────────────┘
```

Key principles:

1. **Async delivery** - Never block your main application
2. **At-least-once delivery** - Retry until success or max attempts
3. **Idempotency** - Receivers should handle duplicate events
4. **Event ordering** - Not guaranteed; include timestamps
5. **Payload size** - Keep small; include references for large data

---

## [ WEBHOOK DATA MODEL ]

```prisma
model Webhook {
  id             String   @id @default(cuid())
  url            String
  description    String?
  events         String[]
  secret         String
  organizationId String
  isActive       Boolean  @default(true)

  // Health tracking
  failureCount   Int      @default(0)
  lastSuccessAt  DateTime?
  lastFailureAt  DateTime?
  disabledAt     DateTime?
  disabledReason String?

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  organization Organization    @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  deliveries   WebhookDelivery[]

  @@index([organizationId, isActive])
}

model WebhookDelivery {
  id           String   @id @default(cuid())
  webhookId    String
  eventType    String
  eventId      String   @unique // Idempotency key
  payload      Json

  // Delivery tracking
  attempt      Int      @default(1)
  maxAttempts  Int      @default(5)
  statusCode   Int?
  responseBody String?
  responseTime Int?     // milliseconds
  error        String?

  // Timing
  scheduledFor DateTime
  deliveredAt  DateTime?
  nextRetryAt  DateTime?

  createdAt    DateTime @default(now())

  webhook Webhook @relation(fields: [webhookId], references: [id], onDelete: Cascade)

  @@index([webhookId, createdAt])
  @@index([scheduledFor, deliveredAt])
}
```

---

## [ WEBHOOK REGISTRATION ]

Secure webhook registration with URL validation and secret generation.

```typescript
// src/lib/webhooks/service.ts
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';

const ALLOWED_EVENTS = [
  'user.created',
  'user.updated',
  'user.deleted',
  'project.created',
  'project.updated',
  'project.deleted',
  'payment.completed',
  'payment.failed',
  'subscription.created',
  'subscription.updated',
  'subscription.canceled',
  'invoice.created',
  'invoice.paid',
  'invoice.payment_failed',
] as const;

export type WebhookEvent = typeof ALLOWED_EVENTS[number];

interface CreateWebhookInput {
  url: string;
  description?: string;
  events: WebhookEvent[];
  organizationId: string;
}

export async function createWebhook(
  input: CreateWebhookInput
) {
  const { url, description, events, organizationId } = input;

  // Validate URL
  const validatedUrl = await validateWebhookUrl(url);

  // Validate events
  const validatedEvents = events.filter((e) =>
    ALLOWED_EVENTS.includes(e)
  );

  if (validatedEvents.length === 0) {
    throw new Error('At least one valid event is required');
  }

  // Generate signing secret
  const secret = `whsec_${randomBytes(24).toString('hex')}`;

  const webhook = await prisma.webhook.create({
    data: {
      url: validatedUrl,
      description,
      events: validatedEvents,
      secret,
      organizationId,
    },
  });

  return {
    ...webhook,
    secret, // Return secret once for user to save
  };
}

async function validateWebhookUrl(url: string): Promise<string> {
  // Parse URL
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('Invalid URL format');
  }

  // Require HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    if (parsed.protocol !== 'https:') {
      throw new Error('HTTPS is required for webhook URLs');
    }
  }

  // Block localhost and private IPs in production
  if (process.env.NODE_ENV === 'production') {
    const hostname = parsed.hostname.toLowerCase();

    const blockedPatterns = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '10.',
      '172.16.',
      '192.168.',
      '169.254.',
    ];

    for (const pattern of blockedPatterns) {
      if (hostname.startsWith(pattern) || hostname === pattern) {
        throw new Error('Private or local URLs are not allowed');
      }
    }
  }

  // Verify endpoint is reachable (optional)
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });

    // We just want to verify the endpoint exists
    // Any response (including 405) is acceptable
  } catch (error) {
    // Don't fail on unreachable - user might set up endpoint later
    console.warn(`Webhook URL ${url} is not currently reachable`);
  }

  return parsed.toString();
}

export async function updateWebhook(
  webhookId: string,
  organizationId: string,
  updates: {
    url?: string;
    description?: string;
    events?: WebhookEvent[];
    isActive?: boolean;
  }
) {
  const data: any = {};

  if (updates.url) {
    data.url = await validateWebhookUrl(updates.url);
  }

  if (updates.description !== undefined) {
    data.description = updates.description;
  }

  if (updates.events) {
    data.events = updates.events.filter((e) =>
      ALLOWED_EVENTS.includes(e)
    );
  }

  if (updates.isActive !== undefined) {
    data.isActive = updates.isActive;
    if (updates.isActive) {
      data.disabledAt = null;
      data.disabledReason = null;
      data.failureCount = 0;
    }
  }

  return prisma.webhook.update({
    where: {
      id: webhookId,
      organizationId,
    },
    data,
  });
}

export async function deleteWebhook(
  webhookId: string,
  organizationId: string
) {
  return prisma.webhook.delete({
    where: {
      id: webhookId,
      organizationId,
    },
  });
}

export async function rotateWebhookSecret(
  webhookId: string,
  organizationId: string
) {
  const newSecret = `whsec_${randomBytes(24).toString('hex')}`;

  await prisma.webhook.update({
    where: {
      id: webhookId,
      organizationId,
    },
    data: {
      secret: newSecret,
    },
  });

  return newSecret;
}
```

---

## [ WEBHOOK SIGNING ]

HMAC-SHA256 signatures with timestamp protection against replay attacks.

```typescript
// src/lib/webhooks/signing.ts
import { createHmac, timingSafeEqual } from 'crypto';

const TIMESTAMP_TOLERANCE_SECONDS = 300; // 5 minutes

export interface WebhookPayload {
  id: string;
  event: string;
  created_at: string;
  data: Record<string, unknown>;
}

export interface SignedWebhookPayload {
  payload: WebhookPayload;
  signature: string;
  timestamp: number;
}

/**
 * Create a signed webhook payload
 */
export function signWebhookPayload(
  payload: WebhookPayload,
  secret: string
): SignedWebhookPayload {
  const timestamp = Math.floor(Date.now() / 1000);
  const signedPayloadString = `${timestamp}.${JSON.stringify(payload)}`;

  const signature = createHmac('sha256', secret)
    .update(signedPayloadString)
    .digest('hex');

  return {
    payload,
    signature: `v1=${signature}`,
    timestamp,
  };
}

/**
 * Verify a webhook signature (for documentation/SDK)
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  timestamp: number,
  secret: string
): boolean {
  // Check timestamp to prevent replay attacks
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > TIMESTAMP_TOLERANCE_SECONDS) {
    return false;
  }

  // Extract signature version and value
  const [version, signatureValue] = signature.split('=');
  if (version !== 'v1') {
    return false;
  }

  // Compute expected signature
  const signedPayloadString = `${timestamp}.${rawBody}`;
  const expectedSignature = createHmac('sha256', secret)
    .update(signedPayloadString)
    .digest('hex');

  // Timing-safe comparison
  try {
    return timingSafeEqual(
      Buffer.from(signatureValue, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch {
    return false;
  }
}

/**
 * Headers to include with webhook requests
 */
export function getWebhookHeaders(
  signedPayload: SignedWebhookPayload
): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'X-Webhook-ID': signedPayload.payload.id,
    'X-Webhook-Timestamp': signedPayload.timestamp.toString(),
    'X-Webhook-Signature': signedPayload.signature,
    'User-Agent': 'Fabrk-Webhooks/1.0',
  };
}
```

---

## [ WEBHOOK DELIVERY WITH RETRY LOGIC ]

Reliable delivery with exponential backoff and circuit breaker.

```typescript
// src/lib/webhooks/delivery.ts
import { prisma } from '@/lib/prisma';
import { signWebhookPayload, getWebhookHeaders, WebhookPayload } from './signing';

const MAX_ATTEMPTS = 5;
const RETRY_DELAYS = [0, 60, 300, 1800, 7200]; // 0, 1m, 5m, 30m, 2h (in seconds)
const TIMEOUT_MS = 30000; // 30 seconds
const CONSECUTIVE_FAILURES_THRESHOLD = 10;

interface DeliveryResult {
  success: boolean;
  statusCode?: number;
  responseTime?: number;
  error?: string;
}

/**
 * Queue a webhook event for delivery
 */
export async function queueWebhookEvent(
  organizationId: string,
  eventType: string,
  data: Record<string, unknown>
): Promise<void> {
  // Generate unique event ID
  const eventId = `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  // Find matching webhooks
  const webhooks = await prisma.webhook.findMany({
    where: {
      organizationId,
      isActive: true,
      events: { has: eventType },
    },
  });

  // Create delivery records
  const deliveries = webhooks.map((webhook) => ({
    webhookId: webhook.id,
    eventType,
    eventId: `${eventId}_${webhook.id}`,
    payload: {
      id: eventId,
      event: eventType,
      created_at: new Date().toISOString(),
      data,
    },
    scheduledFor: new Date(),
  }));

  if (deliveries.length > 0) {
    await prisma.webhookDelivery.createMany({ data: deliveries });
  }

  // In production, this would trigger a background job
  // For simplicity, we process immediately in development
  if (process.env.NODE_ENV === 'development') {
    for (const delivery of deliveries) {
      const webhook = webhooks.find((w) => w.id === delivery.webhookId);
      if (webhook) {
        processDelivery(delivery.eventId).catch(console.error);
      }
    }
  }
}

/**
 * Process a single delivery attempt
 */
export async function processDelivery(eventId: string): Promise<void> {
  const delivery = await prisma.webhookDelivery.findUnique({
    where: { eventId },
    include: { webhook: true },
  });

  if (!delivery || delivery.deliveredAt) {
    return; // Already delivered or not found
  }

  const webhook = delivery.webhook;

  if (!webhook.isActive) {
    return; // Webhook disabled
  }

  const result = await attemptDelivery(
    webhook.url,
    webhook.secret,
    delivery.payload as WebhookPayload
  );

  if (result.success) {
    // Success - update delivery and webhook health
    await prisma.$transaction([
      prisma.webhookDelivery.update({
        where: { eventId },
        data: {
          statusCode: result.statusCode,
          responseTime: result.responseTime,
          deliveredAt: new Date(),
        },
      }),
      prisma.webhook.update({
        where: { id: webhook.id },
        data: {
          failureCount: 0,
          lastSuccessAt: new Date(),
        },
      }),
    ]);
  } else {
    // Failure - schedule retry or give up
    const nextAttempt = delivery.attempt + 1;

    if (nextAttempt > MAX_ATTEMPTS) {
      // Max attempts reached - mark as failed
      await handlePermanentFailure(delivery, webhook, result);
    } else {
      // Schedule retry
      const retryDelay = RETRY_DELAYS[nextAttempt - 1] || RETRY_DELAYS[RETRY_DELAYS.length - 1];
      const nextRetryAt = new Date(Date.now() + retryDelay * 1000);

      await prisma.webhookDelivery.update({
        where: { eventId },
        data: {
          attempt: nextAttempt,
          statusCode: result.statusCode,
          error: result.error,
          nextRetryAt,
        },
      });

      // Update webhook failure count
      const newFailureCount = webhook.failureCount + 1;

      if (newFailureCount >= CONSECUTIVE_FAILURES_THRESHOLD) {
        // Disable webhook due to consecutive failures
        await prisma.webhook.update({
          where: { id: webhook.id },
          data: {
            isActive: false,
            failureCount: newFailureCount,
            lastFailureAt: new Date(),
            disabledAt: new Date(),
            disabledReason: `Automatically disabled after ${newFailureCount} consecutive failures`,
          },
        });
      } else {
        await prisma.webhook.update({
          where: { id: webhook.id },
          data: {
            failureCount: newFailureCount,
            lastFailureAt: new Date(),
          },
        });
      }
    }
  }
}

async function attemptDelivery(
  url: string,
  secret: string,
  payload: WebhookPayload
): Promise<DeliveryResult> {
  const signedPayload = signWebhookPayload(payload, secret);
  const headers = getWebhookHeaders(signedPayload);
  const body = JSON.stringify(signedPayload.payload);

  const startTime = Date.now();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    const responseTime = Date.now() - startTime;

    // Consider 2xx as success
    const success = response.status >= 200 && response.status < 300;

    let responseBody: string | undefined;
    try {
      responseBody = await response.text();
    } catch {
      // Ignore response body errors
    }

    return {
      success,
      statusCode: response.status,
      responseTime,
      error: success ? undefined : `HTTP ${response.status}: ${responseBody?.slice(0, 500)}`,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;

    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      if (error.name === 'TimeoutError' || error.name === 'AbortError') {
        errorMessage = `Request timeout after ${TIMEOUT_MS}ms`;
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      responseTime,
      error: errorMessage,
    };
  }
}

async function handlePermanentFailure(
  delivery: any,
  webhook: any,
  result: DeliveryResult
): Promise<void> {
  await prisma.webhookDelivery.update({
    where: { eventId: delivery.eventId },
    data: {
      statusCode: result.statusCode,
      error: `Permanently failed after ${MAX_ATTEMPTS} attempts: ${result.error}`,
    },
  });

  // Optionally: Send notification to organization about failed webhook
  // await notifyWebhookFailure(webhook.organizationId, webhook.id, delivery.eventType);
}
```

---

## [ WEBHOOK EVENT TAXONOMY ]

A complete event taxonomy for SaaS applications.

```typescript
// src/lib/webhooks/events.ts

/**
 * Webhook event definitions with metadata
 */
export const WEBHOOK_EVENTS = {
  // User events
  'user.created': {
    description: 'A new user registered or was created',
    category: 'users',
    payload: {
      id: 'string',
      email: 'string',
      name: 'string | null',
      created_at: 'string (ISO 8601)',
    },
  },
  'user.updated': {
    description: 'User profile was updated',
    category: 'users',
    payload: {
      id: 'string',
      changes: 'object',
      updated_at: 'string (ISO 8601)',
    },
  },
  'user.deleted': {
    description: 'User was deleted',
    category: 'users',
    payload: {
      id: 'string',
      deleted_at: 'string (ISO 8601)',
    },
  },

  // Team/Organization events
  'organization.created': {
    description: 'A new organization was created',
    category: 'organizations',
    payload: {
      id: 'string',
      name: 'string',
      owner_id: 'string',
      created_at: 'string (ISO 8601)',
    },
  },
  'organization.member_added': {
    description: 'A member was added to the organization',
    category: 'organizations',
    payload: {
      organization_id: 'string',
      user_id: 'string',
      role: 'string',
      added_at: 'string (ISO 8601)',
    },
  },
  'organization.member_removed': {
    description: 'A member was removed from the organization',
    category: 'organizations',
    payload: {
      organization_id: 'string',
      user_id: 'string',
      removed_at: 'string (ISO 8601)',
    },
  },

  // Project events
  'project.created': {
    description: 'A new project was created',
    category: 'projects',
    payload: {
      id: 'string',
      name: 'string',
      organization_id: 'string',
      created_by: 'string',
      created_at: 'string (ISO 8601)',
    },
  },
  'project.updated': {
    description: 'Project settings were updated',
    category: 'projects',
    payload: {
      id: 'string',
      changes: 'object',
      updated_at: 'string (ISO 8601)',
    },
  },
  'project.deleted': {
    description: 'Project was deleted',
    category: 'projects',
    payload: {
      id: 'string',
      deleted_at: 'string (ISO 8601)',
    },
  },

  // Payment events
  'payment.completed': {
    description: 'Payment was successfully processed',
    category: 'billing',
    payload: {
      id: 'string',
      amount: 'number (cents)',
      currency: 'string',
      organization_id: 'string',
      invoice_id: 'string | null',
      completed_at: 'string (ISO 8601)',
    },
  },
  'payment.failed': {
    description: 'Payment attempt failed',
    category: 'billing',
    payload: {
      id: 'string',
      amount: 'number (cents)',
      currency: 'string',
      organization_id: 'string',
      error: 'string',
      failed_at: 'string (ISO 8601)',
    },
  },
  'payment.refunded': {
    description: 'Payment was refunded',
    category: 'billing',
    payload: {
      id: 'string',
      original_payment_id: 'string',
      amount: 'number (cents)',
      reason: 'string | null',
      refunded_at: 'string (ISO 8601)',
    },
  },

  // Subscription events
  'subscription.created': {
    description: 'New subscription started',
    category: 'billing',
    payload: {
      id: 'string',
      organization_id: 'string',
      plan_id: 'string',
      status: 'string',
      current_period_start: 'string (ISO 8601)',
      current_period_end: 'string (ISO 8601)',
      created_at: 'string (ISO 8601)',
    },
  },
  'subscription.updated': {
    description: 'Subscription was modified',
    category: 'billing',
    payload: {
      id: 'string',
      organization_id: 'string',
      changes: 'object',
      updated_at: 'string (ISO 8601)',
    },
  },
  'subscription.canceled': {
    description: 'Subscription was canceled',
    category: 'billing',
    payload: {
      id: 'string',
      organization_id: 'string',
      cancel_at_period_end: 'boolean',
      canceled_at: 'string (ISO 8601)',
    },
  },
  'subscription.renewed': {
    description: 'Subscription renewed for a new period',
    category: 'billing',
    payload: {
      id: 'string',
      organization_id: 'string',
      current_period_start: 'string (ISO 8601)',
      current_period_end: 'string (ISO 8601)',
      renewed_at: 'string (ISO 8601)',
    },
  },

  // Invoice events
  'invoice.created': {
    description: 'New invoice was generated',
    category: 'billing',
    payload: {
      id: 'string',
      organization_id: 'string',
      amount: 'number (cents)',
      currency: 'string',
      due_date: 'string (ISO 8601)',
      created_at: 'string (ISO 8601)',
    },
  },
  'invoice.paid': {
    description: 'Invoice was paid',
    category: 'billing',
    payload: {
      id: 'string',
      organization_id: 'string',
      amount: 'number (cents)',
      payment_id: 'string',
      paid_at: 'string (ISO 8601)',
    },
  },
  'invoice.payment_failed': {
    description: 'Invoice payment attempt failed',
    category: 'billing',
    payload: {
      id: 'string',
      organization_id: 'string',
      amount: 'number (cents)',
      error: 'string',
      failed_at: 'string (ISO 8601)',
    },
  },
} as const;

export type WebhookEventType = keyof typeof WEBHOOK_EVENTS;

/**
 * Get events grouped by category
 */
export function getEventsByCategory(): Record<string, WebhookEventType[]> {
  const categories: Record<string, WebhookEventType[]> = {};

  for (const [event, config] of Object.entries(WEBHOOK_EVENTS)) {
    const category = config.category;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(event as WebhookEventType);
  }

  return categories;
}
```

---

## [ WEBHOOK PAYLOAD STRUCTURE ]

Consistent payload structure with versioning support.

```typescript
// src/lib/webhooks/payload.ts

/**
 * Standard webhook payload envelope
 */
export interface WebhookEnvelope<T = unknown> {
  // Unique event ID for idempotency
  id: string;

  // Event type (e.g., "user.created")
  event: string;

  // API version for payload structure
  api_version: string;

  // Timestamp when event occurred
  created_at: string;

  // The actual event data
  data: T;

  // Optional: Related resources for convenience
  related?: {
    organization_id?: string;
    user_id?: string;
    [key: string]: string | undefined;
  };
}

/**
 * Create a webhook payload
 */
export function createWebhookPayload<T>(
  eventType: string,
  data: T,
  related?: WebhookEnvelope['related']
): WebhookEnvelope<T> {
  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
    event: eventType,
    api_version: '2026-01-01',
    created_at: new Date().toISOString(),
    data,
    related,
  };
}

/**
 * Example: Creating a user.created event
 */
export function createUserCreatedEvent(user: {
  id: string;
  email: string;
  name: string | null;
  organizationId: string;
}) {
  return createWebhookPayload(
    'user.created',
    {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: new Date().toISOString(),
    },
    {
      organization_id: user.organizationId,
      user_id: user.id,
    }
  );
}
```

---

## [ WEBHOOK MANAGEMENT UI ]

Complete webhook management component with event selection and testing.

```tsx
// src/components/developer/webhook-manager.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Webhook,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  ChevronDown,
  Copy,
  Send,
} from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface WebhookData {
  id: string;
  url: string;
  description: string | null;
  events: string[];
  isActive: boolean;
  failureCount: number;
  lastSuccessAt: Date | null;
  lastFailureAt: Date | null;
  disabledReason: string | null;
  createdAt: Date;
}

const EVENT_CATEGORIES = {
  users: {
    label: 'User Events',
    events: [
      { value: 'user.created', label: 'User Created' },
      { value: 'user.updated', label: 'User Updated' },
      { value: 'user.deleted', label: 'User Deleted' },
    ],
  },
  organizations: {
    label: 'Organization Events',
    events: [
      { value: 'organization.created', label: 'Organization Created' },
      { value: 'organization.member_added', label: 'Member Added' },
      { value: 'organization.member_removed', label: 'Member Removed' },
    ],
  },
  projects: {
    label: 'Project Events',
    events: [
      { value: 'project.created', label: 'Project Created' },
      { value: 'project.updated', label: 'Project Updated' },
      { value: 'project.deleted', label: 'Project Deleted' },
    ],
  },
  billing: {
    label: 'Billing Events',
    events: [
      { value: 'payment.completed', label: 'Payment Completed' },
      { value: 'payment.failed', label: 'Payment Failed' },
      { value: 'subscription.created', label: 'Subscription Created' },
      { value: 'subscription.canceled', label: 'Subscription Canceled' },
      { value: 'invoice.paid', label: 'Invoice Paid' },
    ],
  },
};

export function WebhookManager() {
  const [webhooks, setWebhooks] = useState<WebhookData[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [secretModal, setSecretModal] = useState<{
    webhookId: string;
    secret: string;
  } | null>(null);
  const [deleteWebhookId, setDeleteWebhookId] = useState<string | null>(null);
  const [testingWebhookId, setTestingWebhookId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const fetchWebhooks = async () => {
    const response = await fetch('/api/v1/webhooks');
    const data = await response.json();
    setWebhooks(data.data || []);
  };

  const handleCreateWebhook = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: formData.get('url'),
          description: formData.get('description') || null,
          events: formData.getAll('events'),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSecretModal({ webhookId: data.id, secret: data.secret });
        setIsCreateOpen(false);
        fetchWebhooks();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWebhook = async (webhookId: string, isActive: boolean) => {
    await fetch(`/api/v1/webhooks/${webhookId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive }),
    });
    fetchWebhooks();
  };

  const handleDeleteWebhook = async () => {
    if (!deleteWebhookId) return;

    await fetch(`/api/v1/webhooks/${deleteWebhookId}`, {
      method: 'DELETE',
    });

    setDeleteWebhookId(null);
    fetchWebhooks();
  };

  const handleRotateSecret = async (webhookId: string) => {
    const response = await fetch(`/api/v1/webhooks/${webhookId}/rotate-secret`, {
      method: 'POST',
    });
    const data = await response.json();

    if (response.ok) {
      setSecretModal({ webhookId, secret: data.secret });
    }
  };

  const handleTestWebhook = async (webhookId: string) => {
    setTestingWebhookId(webhookId);

    try {
      await fetch(`/api/v1/webhooks/${webhookId}/test`, {
        method: 'POST',
      });
      // Refresh to show new delivery in logs
      fetchWebhooks();
    } finally {
      setTestingWebhookId(null);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-mono text-lg font-bold uppercase">WEBHOOKS</h2>
          <p className="text-sm text-muted-foreground">
            Receive real-time notifications when events occur
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className={cn(mode.radius)}>
              <Plus className="mr-2 h-4 w-4" />
              {`> ADD ENDPOINT`}
            </Button>
          </DialogTrigger>
          <DialogContent className={cn('sm:max-w-lg', mode.radius)}>
            <DialogHeader>
              <DialogTitle className="font-mono uppercase">
                ADD WEBHOOK ENDPOINT
              </DialogTitle>
            </DialogHeader>
            <CreateWebhookForm
              onSubmit={handleCreateWebhook}
              isLoading={isLoading}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Secret Display Modal */}
      {secretModal && (
        <Card className={cn('border-2 border-primary', mode.radius)}>
          <CardHeader className="border-b border-border pb-2">
            <span className="font-mono text-xs text-primary">
              [ WEBHOOK SECRET ]
            </span>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Use this secret to verify webhook signatures. Store it securely.
              </p>
              <div className="rounded bg-muted p-4">
                <div className="flex items-center justify-between">
                  <code className="font-mono text-sm break-all">
                    {secretModal.secret}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(secretModal.secret)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                className={cn('w-full', mode.radius)}
                onClick={() => setSecretModal(null)}
              >
                {`> I'VE SAVED THE SECRET`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Webhooks List */}
      {webhooks.length === 0 ? (
        <Card className={cn('border border-border', mode.radius)}>
          <CardContent className="py-12 text-center">
            <Webhook className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 font-mono text-sm font-medium uppercase">
              NO WEBHOOKS CONFIGURED
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add an endpoint to start receiving events.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <WebhookCard
              key={webhook.id}
              webhook={webhook}
              onToggle={handleToggleWebhook}
              onDelete={() => setDeleteWebhookId(webhook.id)}
              onRotateSecret={() => handleRotateSecret(webhook.id)}
              onTest={() => handleTestWebhook(webhook.id)}
              isTesting={testingWebhookId === webhook.id}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteWebhookId}
        onOpenChange={() => setDeleteWebhookId(null)}
      >
        <AlertDialogContent className={cn(mode.radius)}>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-mono uppercase">
              DELETE WEBHOOK
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the webhook endpoint and all delivery history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={cn(mode.radius)}>
              {`> CANCEL`}
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(mode.radius, 'bg-destructive text-destructive-foreground')}
              onClick={handleDeleteWebhook}
            >
              {`> DELETE`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function WebhookCard({
  webhook,
  onToggle,
  onDelete,
  onRotateSecret,
  onTest,
  isTesting,
}: {
  webhook: WebhookData;
  onToggle: (id: string, isActive: boolean) => void;
  onDelete: () => void;
  onRotateSecret: () => void;
  onTest: () => void;
  isTesting: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={cn('border border-border', mode.radius)}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                webhook.isActive ? 'bg-green-500' : 'bg-muted-foreground'
              )}
            />
            <div>
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm">{webhook.url}</code>
                {webhook.disabledReason && (
                  <Badge variant="destructive" className="text-xs">
                    DISABLED
                  </Badge>
                )}
              </div>
              {webhook.description && (
                <p className="text-sm text-muted-foreground">
                  {webhook.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={webhook.isActive}
              onCheckedChange={(checked) => onToggle(webhook.id, checked)}
            />
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isExpanded && 'rotate-180'
                  )}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent>
          <div className="border-t border-border p-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Events */}
              <div>
                <Label className="font-mono text-xs uppercase text-muted-foreground">
                  SUBSCRIBED EVENTS
                </Label>
                <div className="mt-2 flex flex-wrap gap-1">
                  {webhook.events.map((event) => (
                    <Badge key={event} variant="secondary" className="text-xs">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Health */}
              <div>
                <Label className="font-mono text-xs uppercase text-muted-foreground">
                  HEALTH
                </Label>
                <div className="mt-2 space-y-1 text-sm">
                  {webhook.lastSuccessAt && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      Last success:{' '}
                      {formatDistanceToNow(new Date(webhook.lastSuccessAt), {
                        addSuffix: true,
                      })}
                    </div>
                  )}
                  {webhook.lastFailureAt && (
                    <div className="flex items-center gap-2 text-destructive">
                      <XCircle className="h-3 w-3" />
                      Last failure:{' '}
                      {formatDistanceToNow(new Date(webhook.lastFailureAt), {
                        addSuffix: true,
                      })}
                    </div>
                  )}
                  {webhook.failureCount > 0 && (
                    <div className="text-muted-foreground">
                      Consecutive failures: {webhook.failureCount}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
              <Button
                variant="outline"
                size="sm"
                className={cn(mode.radius)}
                onClick={onTest}
                disabled={isTesting || !webhook.isActive}
              >
                <Send className="mr-2 h-3 w-3" />
                {isTesting ? 'SENDING...' : 'SEND TEST'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(mode.radius)}
                onClick={onRotateSecret}
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                ROTATE SECRET
              </Button>
              <div className="flex-1" />
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="mr-2 h-3 w-3" />
                DELETE
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function CreateWebhookForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}) {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    selectedEvents.forEach((event) => formData.append('events', event));
    onSubmit(formData);
  };

  const toggleEvent = (event: string) => {
    setSelectedEvents((prev) =>
      prev.includes(event)
        ? prev.filter((e) => e !== event)
        : [...prev, event]
    );
  };

  const toggleCategory = (events: string[]) => {
    const allSelected = events.every((e) => selectedEvents.includes(e));
    if (allSelected) {
      setSelectedEvents((prev) => prev.filter((e) => !events.includes(e)));
    } else {
      setSelectedEvents((prev) => [...new Set([...prev, ...events])]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url" className="font-mono text-xs uppercase">
          ENDPOINT URL
        </Label>
        <Input
          id="url"
          name="url"
          type="url"
          placeholder="https://your-app.com/webhooks"
          required
          className={cn(mode.radius)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="font-mono text-xs uppercase">
          DESCRIPTION (OPTIONAL)
        </Label>
        <Input
          id="description"
          name="description"
          placeholder="Production webhook endpoint"
          className={cn(mode.radius)}
        />
      </div>

      <div className="space-y-2">
        <Label className="font-mono text-xs uppercase">EVENTS</Label>
        <div className="max-h-64 space-y-4 overflow-y-auto rounded border border-border p-3">
          {Object.entries(EVENT_CATEGORIES).map(([key, category]) => {
            const categoryEvents = category.events.map((e) => e.value);
            const allSelected = categoryEvents.every((e) =>
              selectedEvents.includes(e)
            );
            const someSelected = categoryEvents.some((e) =>
              selectedEvents.includes(e)
            );

            return (
              <div key={key}>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`category-${key}`}
                    checked={allSelected}
                    // @ts-ignore - indeterminate is valid
                    indeterminate={someSelected && !allSelected}
                    onCheckedChange={() => toggleCategory(categoryEvents)}
                  />
                  <Label
                    htmlFor={`category-${key}`}
                    className="font-mono text-xs font-medium uppercase cursor-pointer"
                  >
                    {category.label}
                  </Label>
                </div>
                <div className="ml-6 mt-2 space-y-1">
                  {category.events.map((event) => (
                    <div key={event.value} className="flex items-center gap-2">
                      <Checkbox
                        id={event.value}
                        checked={selectedEvents.includes(event.value)}
                        onCheckedChange={() => toggleEvent(event.value)}
                      />
                      <Label
                        htmlFor={event.value}
                        className="text-sm cursor-pointer"
                      >
                        {event.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        type="submit"
        className={cn('w-full', mode.radius)}
        disabled={isLoading || selectedEvents.length === 0}
      >
        {isLoading ? 'CREATING...' : `> CREATE WEBHOOK`}
      </Button>
    </form>
  );
}
```

---

## [ DELIVERY LOG VIEWER ]

Searchable, filterable webhook delivery history with payload inspection.

```tsx
// src/components/developer/delivery-log-viewer.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface DeliveryLog {
  id: string;
  webhookId: string;
  eventType: string;
  eventId: string;
  payload: Record<string, unknown>;
  attempt: number;
  maxAttempts: number;
  statusCode: number | null;
  responseBody: string | null;
  responseTime: number | null;
  error: string | null;
  deliveredAt: Date | null;
  nextRetryAt: Date | null;
  createdAt: Date;
  webhook: {
    url: string;
  };
}

interface Filters {
  webhookId: string;
  eventType: string;
  status: 'all' | 'success' | 'failed' | 'pending';
  search: string;
}

export function DeliveryLogViewer({ webhookId }: { webhookId?: string }) {
  const [logs, setLogs] = useState<DeliveryLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<DeliveryLog | null>(null);
  const [filters, setFilters] = useState<Filters>({
    webhookId: webhookId || '',
    eventType: '',
    status: 'all',
    search: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, [filters, page]);

  const fetchLogs = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(filters.webhookId && { webhookId: filters.webhookId }),
        ...(filters.eventType && { eventType: filters.eventType }),
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.search && { search: filters.search }),
      });

      const response = await fetch(`/api/v1/webhook-deliveries?${params}`);
      const data = await response.json();

      setLogs(data.data || []);
      setTotalPages(data.totalPages || 1);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (log: DeliveryLog) => {
    if (log.deliveredAt && log.statusCode && log.statusCode >= 200 && log.statusCode < 300) {
      return (
        <Badge variant="default" className="bg-green-600">
          <CheckCircle className="mr-1 h-3 w-3" />
          {log.statusCode}
        </Badge>
      );
    }

    if (log.nextRetryAt) {
      return (
        <Badge variant="secondary">
          <Clock className="mr-1 h-3 w-3" />
          RETRY {log.attempt}/{log.maxAttempts}
        </Badge>
      );
    }

    if (log.statusCode) {
      return (
        <Badge variant="destructive">
          <XCircle className="mr-1 h-3 w-3" />
          {log.statusCode}
        </Badge>
      );
    }

    return (
      <Badge variant="destructive">
        <XCircle className="mr-1 h-3 w-3" />
        FAILED
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className={cn('border border-border', mode.radius)}>
        <CardHeader className="border-b border-border pb-2">
          <span className="font-mono text-xs text-muted-foreground">
            [ FILTERS ]
          </span>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by event ID..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, search: e.target.value }))
                  }
                  className={cn('pl-9', mode.radius)}
                />
              </div>
            </div>

            <Select
              value={filters.eventType}
              onValueChange={(value) =>
                setFilters((f) => ({ ...f, eventType: value }))
              }
            >
              <SelectTrigger className={cn('w-[180px]', mode.radius)}>
                <SelectValue placeholder="All events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All events</SelectItem>
                <SelectItem value="user.created">user.created</SelectItem>
                <SelectItem value="user.updated">user.updated</SelectItem>
                <SelectItem value="payment.completed">payment.completed</SelectItem>
                <SelectItem value="subscription.created">subscription.created</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.status}
              onValueChange={(value: Filters['status']) =>
                setFilters((f) => ({ ...f, status: value }))
              }
            >
              <SelectTrigger className={cn('w-[140px]', mode.radius)}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchLogs}
              disabled={isLoading}
              className={cn(mode.radius)}
            >
              <RefreshCw
                className={cn('h-4 w-4', isLoading && 'animate-spin')}
              />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className={cn('border border-border', mode.radius)}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STATUS</TableHead>
              <TableHead>EVENT</TableHead>
              <TableHead>ENDPOINT</TableHead>
              <TableHead>RESPONSE TIME</TableHead>
              <TableHead>TIMESTAMP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  No delivery logs found.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow
                  key={log.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedLog(log)}
                >
                  <TableCell>{getStatusBadge(log)}</TableCell>
                  <TableCell>
                    <code className="font-mono text-xs">{log.eventType}</code>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    <code className="font-mono text-xs text-muted-foreground">
                      {log.webhook.url}
                    </code>
                  </TableCell>
                  <TableCell>
                    {log.responseTime ? `${log.responseTime}ms` : '-'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(log.createdAt), 'MMM d, HH:mm:ss')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border p-4">
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={cn(mode.radius)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={cn(mode.radius)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className={cn('max-w-2xl', mode.radius)}>
          <DialogHeader>
            <DialogTitle className="font-mono uppercase">
              DELIVERY DETAILS
            </DialogTitle>
          </DialogHeader>
          {selectedLog && <DeliveryDetail log={selectedLog} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DeliveryDetail({ log }: { log: DeliveryLog }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="payload">Payload</TabsTrigger>
        <TabsTrigger value="response">Response</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-mono text-xs text-muted-foreground">
              EVENT TYPE
            </span>
            <p className="font-mono">{log.eventType}</p>
          </div>
          <div>
            <span className="font-mono text-xs text-muted-foreground">
              EVENT ID
            </span>
            <p className="font-mono text-sm">{log.eventId}</p>
          </div>
          <div>
            <span className="font-mono text-xs text-muted-foreground">
              ENDPOINT
            </span>
            <p className="font-mono text-sm break-all">{log.webhook.url}</p>
          </div>
          <div>
            <span className="font-mono text-xs text-muted-foreground">
              STATUS CODE
            </span>
            <p className="font-mono">{log.statusCode || 'N/A'}</p>
          </div>
          <div>
            <span className="font-mono text-xs text-muted-foreground">
              RESPONSE TIME
            </span>
            <p className="font-mono">
              {log.responseTime ? `${log.responseTime}ms` : 'N/A'}
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-muted-foreground">
              ATTEMPTS
            </span>
            <p className="font-mono">
              {log.attempt} / {log.maxAttempts}
            </p>
          </div>
        </div>

        {log.error && (
          <div>
            <span className="font-mono text-xs text-muted-foreground">
              ERROR
            </span>
            <pre className="mt-1 rounded bg-destructive/10 p-3 text-sm text-destructive overflow-x-auto">
              {log.error}
            </pre>
          </div>
        )}
      </TabsContent>

      <TabsContent value="payload">
        <pre className="rounded bg-muted p-4 text-sm overflow-x-auto max-h-96">
          {JSON.stringify(log.payload, null, 2)}
        </pre>
      </TabsContent>

      <TabsContent value="response">
        {log.responseBody ? (
          <pre className="rounded bg-muted p-4 text-sm overflow-x-auto max-h-96">
            {log.responseBody}
          </pre>
        ) : (
          <p className="py-8 text-center text-muted-foreground">
            No response body available.
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
}
```

---

## [ OPENAPI SPECIFICATION ]

Document your API with OpenAPI for automatic SDK generation and interactive docs.

```yaml
# openapi.yaml
openapi: 3.1.0
info:
  title: Fabrk API
  version: '2026-01-01'
  description: |
    The Fabrk API is organized around REST. Our API has predictable resource-oriented URLs,
    accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard
    HTTP response codes, authentication, and verbs.

servers:
  - url: https://api.yourapp.com/v1
    description: Production
  - url: https://api.staging.yourapp.com/v1
    description: Staging

security:
  - BearerAuth: []

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      description: |
        API keys should be included in the Authorization header:
        `Authorization: Bearer sk_live_your_api_key`

  schemas:
    Error:
      type: object
      required:
        - error
      properties:
        error:
          type: object
          required:
            - code
            - message
          properties:
            code:
              type: string
              example: INVALID_API_KEY
            message:
              type: string
              example: API key is invalid, expired, or revoked
            details:
              type: object

    User:
      type: object
      properties:
        id:
          type: string
          example: usr_abc123
        email:
          type: string
          format: email
        name:
          type: string
          nullable: true
        created_at:
          type: string
          format: date-time
        updated_at:
          type: string
          format: date-time

    PaginatedResponse:
      type: object
      properties:
        data:
          type: array
        has_more:
          type: boolean
        total:
          type: integer
        page:
          type: integer
        per_page:
          type: integer

  responses:
    Unauthorized:
      description: Authentication failed
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: INVALID_API_KEY
              message: API key is invalid, expired, or revoked

    Forbidden:
      description: Insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: INSUFFICIENT_SCOPE
              message: This action requires the 'write:users' scope
              required_scope: write:users

    RateLimited:
      description: Rate limit exceeded
      headers:
        X-RateLimit-Limit:
          schema:
            type: integer
        X-RateLimit-Remaining:
          schema:
            type: integer
        X-RateLimit-Reset:
          schema:
            type: integer
        Retry-After:
          schema:
            type: integer
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: RATE_LIMIT_EXCEEDED
              message: Too many requests. Please slow down.
              retry_after: 30

paths:
  /users:
    get:
      summary: List users
      tags:
        - Users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: per_page
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
      responses:
        '200':
          description: List of users
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/PaginatedResponse'
                  - type: object
                    properties:
                      data:
                        type: array
                        items:
                          $ref: '#/components/schemas/User'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '429':
          $ref: '#/components/responses/RateLimited'

    post:
      summary: Create a user
      tags:
        - Users
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
              properties:
                email:
                  type: string
                  format: email
                name:
                  type: string
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/User'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '429':
          $ref: '#/components/responses/RateLimited'
```

---

## [ ERROR RESPONSE UTILITIES ]

Consistent error handling across your API.

```typescript
// src/lib/api/errors.ts

/**
 * Standard API error codes
 */
export const API_ERROR_CODES = {
  // Authentication errors (401)
  MISSING_API_KEY: 'Authorization header with Bearer token required',
  INVALID_API_KEY: 'API key is invalid, expired, or revoked',

  // Authorization errors (403)
  INSUFFICIENT_SCOPE: 'This action requires additional permissions',
  IP_NOT_ALLOWED: 'Request from this IP address is not allowed',

  // Rate limiting (429)
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please slow down.',

  // Validation errors (400)
  INVALID_REQUEST: 'The request body is invalid',
  MISSING_REQUIRED_FIELD: 'A required field is missing',
  INVALID_FIELD_VALUE: 'A field has an invalid value',

  // Resource errors (404)
  RESOURCE_NOT_FOUND: 'The requested resource was not found',

  // Conflict errors (409)
  RESOURCE_ALREADY_EXISTS: 'A resource with this identifier already exists',

  // Server errors (500)
  INTERNAL_ERROR: 'An unexpected error occurred',
} as const;

export type ApiErrorCode = keyof typeof API_ERROR_CODES;

export interface ApiErrorResponse {
  error: {
    code: ApiErrorCode;
    message: string;
    details?: Record<string, unknown>;
  };
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  code: ApiErrorCode,
  message?: string,
  details?: Record<string, unknown>
): ApiErrorResponse {
  return {
    error: {
      code,
      message: message || API_ERROR_CODES[code],
      ...(details && { details }),
    },
  };
}

/**
 * HTTP status codes for error codes
 */
export function getStatusCodeForError(code: ApiErrorCode): number {
  switch (code) {
    case 'MISSING_API_KEY':
    case 'INVALID_API_KEY':
      return 401;
    case 'INSUFFICIENT_SCOPE':
    case 'IP_NOT_ALLOWED':
      return 403;
    case 'RATE_LIMIT_EXCEEDED':
      return 429;
    case 'INVALID_REQUEST':
    case 'MISSING_REQUIRED_FIELD':
    case 'INVALID_FIELD_VALUE':
      return 400;
    case 'RESOURCE_NOT_FOUND':
      return 404;
    case 'RESOURCE_ALREADY_EXISTS':
      return 409;
    case 'INTERNAL_ERROR':
    default:
      return 500;
  }
}

/**
 * NextResponse helper for API errors
 */
import { NextResponse } from 'next/server';

export function apiError(
  code: ApiErrorCode,
  message?: string,
  details?: Record<string, unknown>
): NextResponse<ApiErrorResponse> {
  const body = createErrorResponse(code, message, details);
  const status = getStatusCodeForError(code);

  return NextResponse.json(body, { status });
}

/**
 * Success response helper
 */
export function apiSuccess<T>(
  data: T,
  status: number = 200
): NextResponse<{ data: T }> {
  return NextResponse.json({ data }, { status });
}

/**
 * Paginated response helper
 */
export function apiPaginated<T>(
  data: T[],
  pagination: {
    page: number;
    perPage: number;
    total: number;
  }
): NextResponse {
  return NextResponse.json({
    data,
    has_more: pagination.page * pagination.perPage < pagination.total,
    total: pagination.total,
    page: pagination.page,
    per_page: pagination.perPage,
  });
}
```

---

## [ SECURITY BEST PRACTICES ]

Essential security measures for production APIs.

### IP Allowlisting

```typescript
// src/lib/api-keys/ip-allowlist.ts

/**
 * Check if an IP is in the allowlist
 * Supports:
 * - Exact match: "192.168.1.1"
 * - CIDR notation: "10.0.0.0/8"
 * - Wildcards: "192.168.*.*"
 */
export function isIpAllowed(
  clientIp: string,
  allowlist: string[]
): boolean {
  if (allowlist.length === 0) {
    return true; // No allowlist = allow all
  }

  for (const pattern of allowlist) {
    if (matchIpPattern(clientIp, pattern)) {
      return true;
    }
  }

  return false;
}

function matchIpPattern(ip: string, pattern: string): boolean {
  // Exact match
  if (ip === pattern) {
    return true;
  }

  // CIDR notation
  if (pattern.includes('/')) {
    return matchCidr(ip, pattern);
  }

  // Wildcard match
  if (pattern.includes('*')) {
    const regex = new RegExp(
      '^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '\\d+') + '$'
    );
    return regex.test(ip);
  }

  return false;
}

function matchCidr(ip: string, cidr: string): boolean {
  const [range, bits] = cidr.split('/');
  const mask = ~(2 ** (32 - parseInt(bits)) - 1);

  const ipNum = ipToNumber(ip);
  const rangeNum = ipToNumber(range);

  return (ipNum & mask) === (rangeNum & mask);
}

function ipToNumber(ip: string): number {
  return ip
    .split('.')
    .reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
}
```

### Request Logging

```typescript
// src/lib/api/logging.ts
import { prisma } from '@/lib/prisma';

interface ApiRequestLog {
  apiKeyId: string;
  method: string;
  path: string;
  statusCode: number;
  responseTime: number;
  clientIp: string;
  userAgent?: string;
  requestId: string;
}

export async function logApiRequest(log: ApiRequestLog): Promise<void> {
  // Non-blocking log to database
  prisma.apiKeyUsage.create({
    data: {
      apiKeyId: log.apiKeyId,
      endpoint: log.path,
      method: log.method,
      statusCode: log.statusCode,
      ipAddress: log.clientIp,
      userAgent: log.userAgent,
    },
  }).catch((error) => {
    console.error('Failed to log API request:', error);
  });
}

/**
 * Generate a unique request ID for tracing
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}
```

### Sensitive Data Masking

```typescript
// src/lib/api/masking.ts

/**
 * Mask sensitive fields in logs and responses
 */
export function maskSensitiveData(
  obj: Record<string, unknown>,
  sensitiveFields: string[] = ['password', 'secret', 'token', 'key', 'authorization']
): Record<string, unknown> {
  const masked = { ...obj };

  for (const key of Object.keys(masked)) {
    const lowerKey = key.toLowerCase();

    if (sensitiveFields.some((field) => lowerKey.includes(field))) {
      const value = masked[key];
      if (typeof value === 'string') {
        masked[key] = maskString(value);
      } else {
        masked[key] = '[REDACTED]';
      }
    } else if (typeof masked[key] === 'object' && masked[key] !== null) {
      masked[key] = maskSensitiveData(
        masked[key] as Record<string, unknown>,
        sensitiveFields
      );
    }
  }

  return masked;
}

function maskString(str: string): string {
  if (str.length <= 8) {
    return '****';
  }
  return `${str.slice(0, 4)}...${str.slice(-4)}`;
}
```

---

## [ COMPONENTS INCLUDED ]

| Component | Purpose | Location |
|-----------|---------|----------|
| `ApiKeyManager` | Full API key CRUD interface | `components/developer/` |
| `CreateApiKeyForm` | Key creation with scope selection | `components/developer/` |
| `WebhookManager` | Webhook configuration interface | `components/developer/` |
| `CreateWebhookForm` | Webhook creation with events | `components/developer/` |
| `DeliveryLogViewer` | Searchable delivery history | `components/developer/` |
| `DeliveryDetail` | Individual delivery inspection | `components/developer/` |

---

## [ DEVELOPER DOCUMENTATION CHECKLIST ]

Before launching your API, ensure you have:

- [ ] API reference with all endpoints
- [ ] Authentication guide with code samples
- [ ] Webhook setup instructions
- [ ] Signature verification examples for all languages
- [ ] Error code reference
- [ ] Rate limit documentation
- [ ] SDK for at least JavaScript/TypeScript
- [ ] Interactive API explorer (Swagger UI or similar)
- [ ] Changelog for API versions
- [ ] Status page for API health

---

## [ BEST PRACTICES SUMMARY ]

### API Keys

1. **Never store raw keys** - Hash with SHA-256
2. **Show key once** - User must save it immediately
3. **Use prefixes** - `sk_live_`, `sk_test_` for clarity
4. **Implement scopes** - Principle of least privilege
5. **Set expiration** - Encourage key rotation
6. **Track usage** - Know which keys are active
7. **Enable IP allowlisting** - Extra security layer
8. **Rate limit per key** - Prevent abuse

### Webhooks

1. **Sign payloads** - HMAC-SHA256 signatures
2. **Include timestamps** - Prevent replay attacks
3. **Retry with backoff** - Exponential delays
4. **Log everything** - For debugging
5. **Auto-disable failures** - Circuit breaker pattern
6. **Provide test endpoints** - Easy verification
7. **Document verification** - Code samples for all languages
8. **Support filtering** - Let users subscribe to specific events

### Security

1. **HTTPS only** - Never accept HTTP in production
2. **Timing-safe comparison** - Prevent timing attacks
3. **Request logging** - Audit trail for compliance
4. **Mask sensitive data** - In logs and error messages
5. **Validate inputs** - Never trust user data
6. **Version your API** - Breaking changes require new version

Developer experience is your competitive advantage. Build it right from day one.

