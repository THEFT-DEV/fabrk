# Environment Variable Validation - Quick Reference

## TL;DR

Environment variables are automatically validated on app startup. If something is wrong, you'll see clear error messages grouped by category.

## Quick Start

### 1. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Fill in required variables
nano .env.local
```

### 2. Run the App

```bash
npm run dev
```

If environment variables are missing or invalid, you'll see clear error messages.

## Using Environment Variables in Code

### Type-Safe Access (Recommended)

```typescript
import { env, features } from '@/lib/env';

// All required vars are guaranteed to exist
const dbUrl = env.DATABASE_URL; // ✅ Type-safe
const stripeKey = env.STRIPE_SECRET_KEY; // ✅ Type-safe

// Check if optional features are enabled
if (features.pusher) {
  // Pusher is configured, safe to use
  const pusherKey = env.NEXT_PUBLIC_PUSHER_KEY;
}

if (features.googleOAuth) {
  // Google OAuth is configured
  const clientId = env.GOOGLE_CLIENT_ID;
}
```

### Legacy Access (Not Recommended)

```typescript
// ❌ Old way - no type safety, might be undefined
const dbUrl = process.env.DATABASE_URL;

// ✅ Better - type-safe and validated
import { env } from '@/lib/env';
const dbUrl = env.DATABASE_URL;
```

## Required Variables (Must Set These)

```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/db"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<32+ characters>" # Generate: openssl rand -base64 32

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email
RESEND_API_KEY="re_..."
```

## Optional Features

### Google OAuth

```bash
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### Pusher (Real-Time)

```bash
PUSHER_APP_ID="your-app-id"
PUSHER_SECRET="your-secret"
NEXT_PUBLIC_PUSHER_KEY="your-key"
NEXT_PUBLIC_PUSHER_CLUSTER="us2"
```

### PostHog (Analytics)

```bash
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
```

### Redis (Cache)

```bash
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

## Common Issues

### Issue: "DATABASE_URL is required"

**Solution:** Add DATABASE_URL to .env.local

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/fabrk"
```

### Issue: "NEXTAUTH_SECRET must be at least 32 characters"

**Solution:** Generate a secure secret

```bash
openssl rand -base64 32
```

### Issue: "STRIPE*SECRET_KEY must start with sk*"

**Solution:** Copy the correct key from Stripe dashboard

```bash
# ✅ Correct
STRIPE_SECRET_KEY="sk_test_51ABC..."

# ❌ Wrong
STRIPE_SECRET_KEY="your-stripe-key"
```

### Issue: "All Pusher variables must be set together"

**Solution:** Either set all 4 Pusher vars or remove them all

```bash
# ✅ All set
PUSHER_APP_ID="123456"
PUSHER_SECRET="abc123"
NEXT_PUBLIC_PUSHER_KEY="xyz789"
NEXT_PUBLIC_PUSHER_CLUSTER="us2"

# ✅ None set (feature disabled)
# (Just comment them out or leave blank)
```

## Feature Flags

Check which features are enabled:

```typescript
import { features } from '@/lib/env';

console.log(features.pusher); // true/false
console.log(features.googleOAuth); // true/false
console.log(features.redis); // true/false
```

## Development vs Production

**Development:**

- Shows warnings for optional features
- Only throws for critical errors
- Displays feature summary

**Production:**

- Throws for ANY validation error
- Fails fast
- No warnings

## Getting Help

1. Check `.env.example` for variable descriptions
2. See full error output for setup instructions
3. Read `/src/lib/env/README.md` for detailed docs
4. Check `/src/lib/env/EXAMPLE_ERROR_OUTPUT.md` for example errors

## API Reference

```typescript
// Validate and get env vars
import { env, features } from '@/lib/env';

// Manual validation
import { validateEnv, validateEnvOrThrow } from '@/lib/env';

// Get feature summary
import { getFeatureSummary } from '@/lib/env';

const summary = getFeatureSummary();
console.log(summary.enabled); // ['Google OAuth', 'Pusher', ...]
console.log(summary.disabled); // ['Algolia', 'Sanity', ...]
```

## Cheat Sheet

| Task              | Command/Code                           |
| ----------------- | -------------------------------------- |
| Copy env file     | `cp .env.example .env.local`           |
| Generate secret   | `openssl rand -base64 32`              |
| Check validation  | `npm run dev` (will fail if invalid)   |
| Type-safe env     | `import { env } from '@/lib/env'`      |
| Check features    | `import { features } from '@/lib/env'` |
| Manual validation | `validateEnvOrThrow()`                 |
| Get summary       | `getFeatureSummary()`                  |

## Files

- `/src/lib/env/validation.ts` - Core validation logic
- `/src/lib/env/index.ts` - Type-safe exports
- `/src/lib/env/README.md` - Full documentation
- `/src/lib/env/EXAMPLE_ERROR_OUTPUT.md` - Example errors
- `/src/lib/env/QUICK_REFERENCE.md` - This file
