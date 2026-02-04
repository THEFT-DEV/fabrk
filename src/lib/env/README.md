# Environment Variable Validation

Comprehensive environment variable validation system that runs on application startup.

## Features

- Validates all required environment variables
- Validates format (URLs, API keys, email addresses, etc.)
- Provides clear error messages with setup instructions
- Groups errors by feature category
- Supports development vs production modes
- Type-safe environment variable access
- Feature flag detection

## Usage

### Automatic Validation

Validation runs automatically when the app starts (imported in `/src/app/layout.tsx`):

```typescript
import '@/lib/env';
```

### Manual Validation

```typescript
import { validateEnv, validateEnvOrThrow } from '@/lib/env';

// Get validation result
const result = validateEnv();
if (!result.valid) {
  console.error(result.errors);
}

// Throw on validation failure
validateEnvOrThrow();
```

### Type-Safe Environment Access

```typescript
import { env, features } from '@/lib/env';

// All required env vars are guaranteed to exist
console.log(env.DATABASE_URL);
console.log(env.NEXTAUTH_SECRET);

// Check if optional features are enabled
if (features.googleOAuth) {
  console.log('Google OAuth is configured');
}

if (features.pusher) {
  console.log('Pusher real-time is enabled');
}
```

## Validation Rules

### Required Variables (Always Validated)

**Database:**

- `DATABASE_URL` - Must be a valid PostgreSQL URL (postgres:// or postgresql://)

**Authentication:**

- `NEXTAUTH_URL` - Must be a valid URL
- `NEXTAUTH_SECRET` - Must be at least 32 characters

**Payment (Stripe):**

- `STRIPE_SECRET_KEY` - Must start with `sk_`
- `STRIPE_WEBHOOK_SECRET` - Must start with `whsec_`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Must start with `pk_`

**Email:**

- `RESEND_API_KEY` - Must start with `re_`
- `EMAIL_FROM` - Must be a valid email address (if provided)

### Optional Variables (Validated When Present)

**Google OAuth:**

- Both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` must be set together

**Pusher Real-Time:**

- All four variables must be set together:
  - `PUSHER_APP_ID`
  - `PUSHER_SECRET`
  - `NEXT_PUBLIC_PUSHER_KEY`
  - `NEXT_PUBLIC_PUSHER_CLUSTER`

**Algolia Search:**

- Both variables must be set together:
  - `NEXT_PUBLIC_ALGOLIA_APP_ID`
  - `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY`

**Sanity CMS:**

- Both variables must be set together:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`

**Redis Cache:**

- Both variables must be set together:
  - `UPSTASH_REDIS_REST_URL` (must be valid HTTPS URL)
  - `UPSTASH_REDIS_REST_TOKEN`

**S3 File Storage:**

- All three variables must be set together:
  - `S3_ACCESS_KEY_ID`
  - `S3_SECRET_ACCESS_KEY`
  - `S3_BUCKET_NAME`
  - `S3_ENDPOINT` (optional, must be valid URL if provided)

**AI APIs:**

- `OPENAI_API_KEY` - Must start with `sk-`
- `ANTHROPIC_API_KEY` - Must start with `sk-ant-`

**Analytics:**

- `NEXT_PUBLIC_POSTHOG_KEY` - Must start with `phc_`
- `NEXT_PUBLIC_POSTHOG_HOST` - Must be valid URL

**Error Tracking:**

- `NEXT_PUBLIC_SENTRY_DSN` - Must be valid URL

## Development vs Production

### Development Mode

- Shows warnings for non-critical issues
- Only throws for critical configuration errors (Database, Auth, Payment, Email)
- Logs feature summary showing enabled/disabled optional features

### Production Mode

- Throws immediately for any validation error
- Fails fast to prevent runtime issues

## Feature Detection

The validation system automatically detects which optional features are enabled:

```typescript
import { features, getFeatureSummary } from '@/lib/env';

// Boolean flags for each feature
console.log(features.googleOAuth); // true/false
console.log(features.pusher); // true/false
console.log(features.algolia); // true/false

// Get detailed summary
const summary = getFeatureSummary();
console.log('Enabled:', summary.enabled); // ['Google OAuth', 'Pusher', ...]
console.log('Disabled:', summary.disabled); // ['Algolia', 'Sanity', ...]
```

## Error Messages

Errors are grouped by category for easy diagnosis:

```
════════════════════════════════════════════════════════════════
  Environment Variable Validation Failed
════════════════════════════════════════════════════════════════

[Database]
  ✗ DATABASE_URL
    Database URL is required

[Authentication]
  ✗ NEXTAUTH_SECRET
    NextAuth secret is required. Generate with: openssl rand -base64 32

[Payment]
  ✗ STRIPE_SECRET_KEY
    Stripe secret key is required. Get it from: https://dashboard.stripe.com/test/apikeys

════════════════════════════════════════════════════════════════

Setup Instructions:
  1. Copy .env.example to .env.local
  2. Fill in all required environment variables
  3. See .env.example for detailed setup instructions
  4. Run "npm run dev" again

════════════════════════════════════════════════════════════════
```

## Files

- `/src/lib/env/validation.ts` - Core validation logic
- `/src/lib/env/index.ts` - Type-safe env exports and auto-validation
- `/src/lib/env/README.md` - This file

## Integration Points

The validation is imported in:

- `/src/app/layout.tsx` - Root layout (runs on all routes)
- `/src/app/[locale]/layout.tsx` - Locale layout (runs on i18n routes)

This ensures validation happens early in the application lifecycle, both during:

- Build time (Next.js build process)
- Runtime (server startup)

## Adding New Variables

To add a new environment variable:

1. Add it to `.env.example` with documentation
2. Add validation in `/src/lib/env/validation.ts`:
   - For required vars: Add to `validateRequired()`
   - For optional vars: Add to `validateOptional()`
3. Export it in `/src/lib/env/index.ts`:
   - Add to `env` object
   - Add to `features` object if it's a feature flag
4. Update this README with the new variable

## Testing

To test validation:

```bash
# Remove a required env var temporarily
# The app should fail to start with a clear error message
unset NEXTAUTH_SECRET
npm run dev

# You should see:
# [Authentication]
#   ✗ NEXTAUTH_SECRET
#     NextAuth secret is required. Generate with: openssl rand -base64 32
```
