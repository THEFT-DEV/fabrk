# Environment Variable Validation

Complete reference for Fabrk's environment variable validation system.

> Fabrk uses **runtime validation** with Zod to catch configuration errors at startup, not in production.

---

## Table of Contents

1. [Overview](#overview)
2. [How Validation Works](#how-validation-works)
3. [Server Variables](#server-variables)
4. [Client Variables](#client-variables)
5. [Validation Rules](#validation-rules)
6. [Error Messages](#error-messages)
7. [Skipping Validation](#skipping-validation)

---

## Overview

Environment variables are validated when the app starts. If any required variable is missing or invalid, the app **fails loudly** with a clear error message.

**Benefits:**
- Catch configuration errors before production
- Type-safe access to environment variables
- Clear error messages for debugging
- Conditional requirements (e.g., Stripe webhook secret only required if Stripe is enabled)

---

## How Validation Works

```typescript
// src/lib/env.ts - Import the validated env object
import { env } from '@/lib/env';

// GOOD - Type-safe access
const key = env.server.STRIPE_SECRET_KEY;
const url = env.client.NEXT_PUBLIC_APP_URL;

// BAD - No validation, no types
const key = process.env.STRIPE_SECRET_KEY;
```

### Validation Flow

1. **App starts** → `env.ts` module loads
2. **Zod schemas** validate all variables
3. **Success** → Typed `env` object exported
4. **Failure** → Startup error with detailed message

---

## Server Variables

Server-side variables are **never exposed to the browser**.

### Required in Production

| Variable | Description | Validation |
|----------|-------------|------------|
| `DATABASE_URL` | PostgreSQL connection string | Must start with `postgresql://` or `postgres://` |
| `NEXTAUTH_SECRET` | Session encryption key | Minimum 32 characters |
| `NEXTAUTH_URL` | App URL for auth callbacks | Must use HTTPS in production |

### Authentication

| Variable | Description | Validation |
|----------|-------------|------------|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Required if `GOOGLE_CLIENT_ID` is set |

### Payments - Stripe

| Variable | Description | Validation |
|----------|-------------|------------|
| `STRIPE_SECRET_KEY` | Stripe API secret | Must start with `sk_test_` or `sk_live_` |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | Must start with `whsec_`, required if Stripe enabled |
| `STRIPE_COUPON_EARLY_ADOPTER` | Coupon code | Optional |

### Payments - Lemonsqueezy

| Variable | Description | Validation |
|----------|-------------|------------|
| `LEMONSQUEEZY_API_KEY` | API key | Optional |
| `LEMONSQUEEZY_STORE_ID` | Store identifier | Required if API key set |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | Webhook secret | Required if API key set |

### Email - Resend

| Variable | Description | Validation |
|----------|-------------|------------|
| `RESEND_API_KEY` | Resend API key | Must start with `re_` |
| `EMAIL_FROM` | Sender email | Valid email format |
| `EMAIL_REPLY_TO` | Reply-to email | Valid email format |
| `CONTACT_FORM_EMAIL` | Contact form recipient | Valid email format |

### Real-time - Pusher

| Variable | Description | Validation |
|----------|-------------|------------|
| `PUSHER_APP_ID` | Pusher app ID | Optional |
| `PUSHER_SECRET` | Pusher secret | Required if app ID set |

### Search - Algolia

| Variable | Description | Validation |
|----------|-------------|------------|
| `ALGOLIA_ADMIN_API_KEY` | Admin API key | Required if `NEXT_PUBLIC_ALGOLIA_APP_ID` set |

### CMS - Sanity

| Variable | Description | Validation |
|----------|-------------|------------|
| `SANITY_API_TOKEN` | Sanity API token | Optional |

### Cache - Upstash Redis

| Variable | Description | Validation |
|----------|-------------|------------|
| `UPSTASH_REDIS_REST_URL` | Redis REST URL | Valid URL format |
| `UPSTASH_REDIS_REST_TOKEN` | Redis token | Required if URL set |

### Storage - S3

| Variable | Description | Validation |
|----------|-------------|------------|
| `S3_ENDPOINT` | S3 endpoint URL | Valid URL format |
| `S3_ACCESS_KEY_ID` | Access key | Required if bucket name set |
| `S3_SECRET_ACCESS_KEY` | Secret key | Required if bucket name set |
| `S3_BUCKET_NAME` | Bucket name | Optional |
| `AWS_REGION` | AWS region | Optional |

### AI Services

| Variable | Description | Validation |
|----------|-------------|------------|
| `OLLAMA_ENABLED` | Enable Ollama | `"true"` to enable |
| `OLLAMA_BASE_URL` | Ollama API URL | Valid URL, default: `http://localhost:11434/v1` |
| `OLLAMA_MODEL` | Model name | Default: `llama3.1:8b` |
| `OPENAI_API_KEY` | OpenAI key | Must start with `sk-` |
| `GOOGLE_AI_API_KEY` | Google AI key | Optional |
| `ANTHROPIC_API_KEY` | Anthropic key | Must start with `sk-ant-` |

### GitHub Distribution

| Variable | Description | Validation |
|----------|-------------|------------|
| `GITHUB_ACCESS_TOKEN` | Personal access token | Must start with `ghp_` or `github_pat_` |
| `GITHUB_REPO_OWNER` | Repository owner | Alphanumeric and hyphens only |
| `GITHUB_REPO_NAME` | Repository name | Alphanumeric, hyphens, underscores, dots |

### Monitoring - Sentry

| Variable | Description | Validation |
|----------|-------------|------------|
| `SENTRY_AUTH_TOKEN` | Sentry auth token | Optional |
| `SENTRY_ORG` | Organization slug | Optional |
| `SENTRY_PROJECT` | Project slug | Optional |

### Background Jobs

| Variable | Description | Validation |
|----------|-------------|------------|
| `JOB_WORKER_CONCURRENCY` | Worker threads | Integer, default: `5` |
| `JOB_WORKER_INTERVAL` | Poll interval (ms) | Integer, default: `1000` |
| `CRON_SECRET` | Cron job secret | Optional |

---

## Client Variables

Client-side variables **are exposed to the browser**. Must be prefixed with `NEXT_PUBLIC_`.

### App URLs

| Variable | Description | Validation |
|----------|-------------|------------|
| `NEXT_PUBLIC_APP_URL` | Public app URL | Valid URL, default: `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | API endpoint URL | Valid URL format |

### App Metadata

| Variable | Description | Validation |
|----------|-------------|------------|
| `NEXT_PUBLIC_APP_VERSION` | Version string | Default: `1.0.0` |
| `NEXT_PUBLIC_AUTHOR_NAME` | Author name | Optional |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Support email | Valid email format |

### Stripe Public

| Variable | Description | Validation |
|----------|-------------|------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publishable key | Must start with `pk_test_` or `pk_live_` |
| `NEXT_PUBLIC_STRIPE_PRICE_STARTER` | Starter plan price ID | Must start with `price_` |
| `NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL` | Pro plan price ID | Must start with `price_` |
| `NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE` | Enterprise price ID | Must start with `price_` |
| `NEXT_PUBLIC_STRIPE_PRICE_FABRK` | Fabrk product price | Optional |

### Lemonsqueezy Public

| Variable | Description | Validation |
|----------|-------------|------------|
| `NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_STARTER` | Starter variant ID | Optional |
| `NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PROFESSIONAL` | Pro variant ID | Optional |
| `NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ENTERPRISE` | Enterprise variant ID | Optional |

### Pusher Public

| Variable | Description | Validation |
|----------|-------------|------------|
| `NEXT_PUBLIC_PUSHER_KEY` | Pusher key | Required if server app ID set |
| `NEXT_PUBLIC_PUSHER_CLUSTER` | Pusher cluster | Required if server app ID set |

### Algolia Public

| Variable | Description | Validation |
|----------|-------------|------------|
| `NEXT_PUBLIC_ALGOLIA_APP_ID` | Algolia app ID | Optional |
| `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY` | Search-only key | Required if app ID set |

### Sanity Public

| Variable | Description | Validation |
|----------|-------------|------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | Optional |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name | Required if project ID set |

### Analytics

| Variable | Description | Validation |
|----------|-------------|------------|
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN | Valid URL format |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key | Optional |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host | Default: `https://app.posthog.com` |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Google Analytics ID | Optional |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain | Optional |

---

## Validation Rules

### Conditional Requirements

Some variables are only required when a related feature is enabled:

```typescript
// GOOGLE_CLIENT_SECRET required only if GOOGLE_CLIENT_ID is set
GOOGLE_CLIENT_ID="123"      // Set this...
GOOGLE_CLIENT_SECRET="abc"  // ...and this becomes required

// STRIPE_WEBHOOK_SECRET required only if STRIPE_SECRET_KEY is set
STRIPE_SECRET_KEY="sk_test_..." // Set this...
STRIPE_WEBHOOK_SECRET="whsec_..." // ...and this becomes required
```

### Production-Only Requirements

Some variables are optional in development but required in production:

```typescript
// Required in production, optional in development
DATABASE_URL        // PostgreSQL connection
NEXTAUTH_SECRET     // Session encryption (min 32 chars)
NEXTAUTH_URL        // Must use HTTPS in production
```

### Format Validation

| Variable | Required Format |
|----------|-----------------|
| `STRIPE_SECRET_KEY` | `sk_test_*` or `sk_live_*` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_*` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_*` or `pk_live_*` |
| `NEXT_PUBLIC_STRIPE_PRICE_*` | `price_*` |
| `RESEND_API_KEY` | `re_*` |
| `OPENAI_API_KEY` | `sk-*` |
| `ANTHROPIC_API_KEY` | `sk-ant-*` |
| `GITHUB_ACCESS_TOKEN` | `ghp_*` or `github_pat_*` |
| `DATABASE_URL` | `postgresql://` or `postgres://` |

---

## Error Messages

### Example: Missing Required Variable

```bash
❌ Invalid server environment variables:
{
  "NEXTAUTH_SECRET": {
    "_errors": ["NEXTAUTH_SECRET is required in production"]
  }
}
```

### Example: Invalid Format

```bash
❌ Invalid server environment variables:
{
  "STRIPE_SECRET_KEY": {
    "_errors": ["STRIPE_SECRET_KEY must be a valid Stripe secret key"]
  }
}
```

### Example: Missing Conditional Requirement

```bash
❌ Invalid server environment variables:
{
  "GOOGLE_CLIENT_SECRET": {
    "_errors": ["GOOGLE_CLIENT_SECRET is required when the feature is enabled"]
  }
}
```

### Fixing Common Errors

**NEXTAUTH_SECRET too short:**
```bash
# Generate a 32+ character secret
openssl rand -base64 32
```

**Stripe key wrong format:**
```bash
# Must be the secret key, not publishable
STRIPE_SECRET_KEY="sk_test_..."  # ✓ Correct
STRIPE_SECRET_KEY="pk_test_..."  # ✗ Wrong (that's publishable)
```

**Using product ID instead of price ID:**
```bash
# Must be a price ID, not product ID
NEXT_PUBLIC_STRIPE_PRICE_STARTER="price_..."  # ✓ Correct
NEXT_PUBLIC_STRIPE_PRICE_STARTER="prod_..."   # ✗ Wrong
```

---

## Skipping Validation

For CI/CD builds or specific scenarios, you can skip validation:

```bash
SKIP_ENV_VALIDATION=true npm run build
```

**Warning:** This bypasses all validation. Only use for:
- CI pipelines that don't need runtime
- Initial setup before configuring variables
- Build-only environments

**Never skip validation in production.**

---

## Helper Functions

The `env.ts` module exports type-safe helpers:

```typescript
import { env, isProduction, isDevelopment, isTest } from '@/lib/env';

// Environment checks
if (isProduction) {
  // Production-only code
}

if (isDevelopment) {
  // Development-only code
}

// Type-safe variable access
const stripeKey = env.server.STRIPE_SECRET_KEY; // string | undefined
const appUrl = env.client.NEXT_PUBLIC_APP_URL;  // string
```

---

## Production Warnings

When running in production, these warnings appear if optional but recommended variables are missing:

```
⚠️  Production Environment Warnings:
   - UPSTASH_REDIS_REST_URL is not set (rate limiting will use in-memory cache)
   - STRIPE_SECRET_KEY is not set (payments will not work)
   - RESEND_API_KEY is not set (emails will not be sent)
```

These won't prevent startup but indicate features that won't work.

---

## Related Documentation

- [Quick Start Guide](./QUICK-START.md) - Get running in 5 minutes
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues and fixes
- [Deployment Guide](../10-deployment/DEPLOYMENT.md) - Production setup
