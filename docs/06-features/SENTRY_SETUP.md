# Sentry Error Tracking Setup

Complete guide to setting up and using Sentry for error tracking and performance monitoring in Fabrk.

---

## Quick Start

Sentry configuration is already included in the boilerplate. Follow these steps to activate it:

### 1. Create Sentry Account

```bash
# Sign up at https://sentry.io (free tier available)
# Create new project → Select "Next.js"
# Copy your DSN (looks like: https://abc123@o123.ingest.sentry.io/456)
```

### 2. Add Environment Variables

```bash
# .env.local (development)
NEXT_PUBLIC_SENTRY_DSN="https://your-dsn@sentry.io/your-project-id"
SENTRY_ORG="your-org-name"
SENTRY_PROJECT="fabrk"
SENTRY_AUTH_TOKEN="your-auth-token"  # Get from: Settings → Auth Tokens

# Production (Vercel Dashboard)
# Add same variables in Vercel → Settings → Environment Variables
```

### 3. Test Error Tracking

```typescript
// Trigger test error
import * as Sentry from '@sentry/nextjs';

Sentry.captureException(new Error('Test error from Fabrk'));
```

Check Sentry dashboard within 30 seconds to see the error.

---

## What's Already Configured

Fabrk includes Sentry configuration out of the box:

✅ **Automatic Error Tracking**
- Uncaught exceptions
- Unhandled promise rejections
- React error boundaries
- API route errors

✅ **Performance Monitoring**
- Page load times
- API request duration
- Database query performance
- Core Web Vitals

✅ **Source Maps**
- Uploaded automatically on production builds
- Shows exact line numbers in error traces
- Works with TypeScript

✅ **User Context**
- Authenticated user ID and email
- Session replay for debugging
- Breadcrumbs of user actions

✅ **Environment Detection**
- Only active in production by default
- Can enable in development with `SENTRY_ENVIRONMENT=development`

---

## Configuration Files

### sentry.client.config.ts

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance monitoring (10% of transactions)
  tracesSampleRate: 0.1,

  // Session replay (10% of sessions)
  replaysSessionSampleRate: 0.1,
  // Capture 100% of sessions with errors
  replaysOnErrorSampleRate: 1.0,

  // Environment detection
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,

  // Filter sensitive data
  beforeSend(event) {
    // Remove passwords from event data
    if (event.request?.data?.password) {
      delete event.request.data.password;
    }
    return event;
  },
});
```

### sentry.server.config.ts

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,

  // Server-specific integrations
  integrations: [
    Sentry.prismaIntegration(), // Track Prisma queries
    Sentry.httpIntegration(),   // Track HTTP requests
  ],
});
```

---

## Usage Guide

### Capture Errors Manually

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'payment',
      operation: 'stripe-checkout',
    },
    extra: {
      userId: user.id,
      amount: paymentAmount,
    },
  });

  // Show user-friendly error
  toast.error('Payment failed. Please try again.');
}
```

### Capture Custom Messages

```typescript
// Info level
Sentry.captureMessage('User upgraded to Pro plan', 'info');

// Warning level
Sentry.captureMessage('API rate limit approaching', 'warning');

// Error level
Sentry.captureMessage('Critical: Payment webhook failed', 'error');
```

### Set User Context

```typescript
// After user logs in
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.name,
  subscription: user.planName,
});

// Clear user context on logout
Sentry.setUser(null);
```

### Add Breadcrumbs

```typescript
// Track user actions for debugging
Sentry.addBreadcrumb({
  category: 'navigation',
  message: 'User navigated to pricing page',
  level: 'info',
});

Sentry.addBreadcrumb({
  category: 'ui',
  message: 'Clicked "Purchase Pro Plan" button',
  level: 'info',
  data: {
    planName: 'Pro',
    planPrice: 29,
  },
});
```

### Track Performance

```typescript
import * as Sentry from '@sentry/nextjs';

// Start a transaction
const transaction = Sentry.startTransaction({
  name: 'AI Form Generation',
  op: 'ai.generate',
});

// Add spans for sub-operations
const span = transaction.startChild({
  op: 'http.client',
  description: 'Call OpenAI API',
});

try {
  const result = await callOpenAI(prompt);
  span.setStatus('ok');
} catch (error) {
  span.setStatus('internal_error');
  throw error;
} finally {
  span.finish();
  transaction.finish();
}
```

---

## Error Boundaries

### Global Error Boundary

```typescript
// src/app/global-error.tsx (already included)
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => window.location.reload()}>
          Reload page
        </button>
      </body>
    </html>
  );
}
```

### Route-Specific Error Boundary

```typescript
// src/app/dashboard/error.tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { section: 'dashboard' },
    });
  }, [error]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Dashboard Error</h2>
        <p className="text-muted-foreground mt-2">
          {error.message || 'Something went wrong'}
        </p>
        <button
          onClick={reset}
          className="mt-4 rounded bg-primary px-4 py-2 text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

---

## Monitoring & Alerts

### Set Up Alerts

1. **Go to Sentry Dashboard → Alerts**
2. **Create Alert Rules:**

**High Error Rate Alert:**
```
Trigger: When error count is > 10 per minute
Action: Send email + Slack notification
```

**New Error Alert:**
```
Trigger: When a new error first occurs
Action: Send email to team
```

**Performance Degradation:**
```
Trigger: When p95 response time > 2 seconds
Action: Send Slack notification
```

### Alert Channels

- Email notifications
- Slack integration (recommended)
- PagerDuty for critical errors
- Discord webhooks

---

## Troubleshooting

### Errors Not Appearing in Sentry

**Check:**
1. `NEXT_PUBLIC_SENTRY_DSN` is set correctly
2. DSN format: `https://KEY@o123.ingest.sentry.io/456`
3. Error occurred in production (or `SENTRY_ENVIRONMENT=development`)
4. Check browser console for Sentry initialization errors

**Test manually:**
```typescript
Sentry.captureMessage('Test message');
// Should appear in Sentry dashboard within 30 seconds
```

### Source Maps Not Working

**Fix:**
1. Verify `SENTRY_AUTH_TOKEN` is set in environment
2. Check `sentry.properties` file exists
3. Ensure `@sentry/nextjs` version matches Next.js version
4. Rebuild: `npm run build`

### Too Many Errors

**Reduce noise:**
```typescript
// sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Ignore known errors
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
  ],

  // Filter by URL
  denyUrls: [
    /extensions\//i,  // Browser extensions
    /^chrome:\/\//i,  // Chrome internals
  ],
});
```

---

## Best Practices

### 1. Always Add Context

```typescript
// Bad - no context
Sentry.captureException(error);

// Good - with context
Sentry.captureException(error, {
  tags: {
    section: 'payment',
    provider: 'stripe',
  },
  extra: {
    userId: user.id,
    planId: plan.id,
    amount: amount,
  },
  level: 'error',
});
```

### 2. Set Appropriate Log Levels

- **error:** Actual errors that break functionality
- **warning:** Potential issues or deprecated features
- **info:** Informational messages
- **debug:** Verbose debugging info (development only)

### 3. Filter Sensitive Data

```typescript
// Always remove passwords, tokens, credit cards
beforeSend(event) {
  // Remove password fields
  if (event.request?.data?.password) {
    delete event.request.data.password;
  }

  // Remove auth tokens
  if (event.request?.headers?.Authorization) {
    event.request.headers.Authorization = '[Filtered]';
  }

  return event;
}
```

### 4. Group Related Errors

```typescript
// Use fingerprints to group similar errors
Sentry.captureException(error, {
  fingerprint: ['stripe-webhook', '{{ default }}'],
});
```

### 5. Sample Performance Data

```typescript
// Don't track 100% of transactions (expensive)
tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
```

---

## Cost Optimization

Free tier limits:
- 5,000 errors/month
- 10,000 performance transactions/month
- 50 replays/month

**Tips to stay under limits:**

1. **Sample aggressively in production:**
   ```typescript
   tracesSampleRate: 0.05,  // Only 5% of requests
   replaysSessionSampleRate: 0.01,  // Only 1% of sessions
   ```

2. **Filter out noisy errors:**
   - Browser extension errors
   - Network errors outside your control
   - Known non-critical warnings

3. **Use error grouping:**
   - Set fingerprints to group similar errors
   - Prevents duplicate error counting

4. **Monitor quota usage:**
   - Sentry Dashboard → Stats
   - Set up quota alerts

---

## Resources

- **Sentry Docs:** https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **Error Monitoring Guide:** https://docs.sentry.io/product/issues/
- **Performance Monitoring:** https://docs.sentry.io/product/performance/
- **Session Replay:** https://docs.sentry.io/product/session-replay/

---

**Last Updated:** December 2025
**Maintainer:** Fabrk Team
