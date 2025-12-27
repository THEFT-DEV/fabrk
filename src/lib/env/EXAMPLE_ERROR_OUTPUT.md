# Example Validation Error Output

## Scenario: Missing Critical Environment Variables

When you start the app without the required environment variables, you'll see:

```
════════════════════════════════════════════════════════════════
  Environment Variable Validation Failed
════════════════════════════════════════════════════════════════

[Database]
  ✗ DATABASE_URL
    Database URL is required

[Authentication]
  ✗ NEXTAUTH_URL
    NextAuth URL is required (e.g., http://localhost:3000)

  ✗ NEXTAUTH_SECRET
    NextAuth secret is required. Generate with: openssl rand -base64 32

[Payment]
  ✗ STRIPE_SECRET_KEY
    Stripe secret key is required. Get it from: https://dashboard.stripe.com/test/apikeys

  ✗ STRIPE_WEBHOOK_SECRET
    Stripe webhook secret is required. Get it from: stripe listen --forward-to localhost:3000/api/webhooks/stripe

  ✗ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    Stripe publishable key is required. Get it from: https://dashboard.stripe.com/test/apikeys

[Email]
  ✗ RESEND_API_KEY
    Resend API key is required. Get it from: https://resend.com/api-keys

════════════════════════════════════════════════════════════════

Setup Instructions:
  1. Copy .env.example to .env.local
  2. Fill in all required environment variables
  3. See .env.example for detailed setup instructions
  4. Run "npm run dev" again

Documentation: https://fabrk.dev/docs/setup

════════════════════════════════════════════════════════════════
```

## Scenario: Invalid Format

When environment variables have invalid formats:

```
════════════════════════════════════════════════════════════════
  Environment Variable Validation Failed
════════════════════════════════════════════════════════════════

[Database]
  ✗ DATABASE_URL
    Must be a valid PostgreSQL URL (postgres:// or postgresql://)

[Authentication]
  ✗ NEXTAUTH_URL
    Must be a valid URL

  ✗ NEXTAUTH_SECRET
    Must be at least 32 characters long for security

[Payment]
  ✗ STRIPE_SECRET_KEY
    Must start with sk_test_ or sk_live_

  ✗ STRIPE_WEBHOOK_SECRET
    Must start with whsec_

  ✗ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    Must start with pk_test_ or pk_live_

[Email]
  ✗ RESEND_API_KEY
    Must start with re_

  ✗ EMAIL_FROM
    Must be a valid email address

════════════════════════════════════════════════════════════════

Setup Instructions:
  1. Copy .env.example to .env.local
  2. Fill in all required environment variables
  3. See .env.example for detailed setup instructions
  4. Run "npm run dev" again

Documentation: https://fabrk.dev/docs/setup

════════════════════════════════════════════════════════════════
```

## Scenario: Incomplete Optional Features

When optional feature variables are partially configured:

```
⚠️  Environment Variable Warnings:

  [OAuth] GOOGLE_CLIENT_SECRET: Required when GOOGLE_CLIENT_ID is set
  [Real-Time (Pusher)] PUSHER_APP_ID: All Pusher variables must be set together (or none at all)
  [Real-Time (Pusher)] PUSHER_SECRET: All Pusher variables must be set together (or none at all)
  [Real-Time (Pusher)] NEXT_PUBLIC_PUSHER_CLUSTER: All Pusher variables must be set together (or none at all)
  [Search (Algolia)] NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: Both NEXT_PUBLIC_ALGOLIA_APP_ID and NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY must be set together
```

## Scenario: Development Mode with Optional Features

When running in development mode with some features enabled:

```
✅ Optional features enabled:
   - Google OAuth
   - Analytics (PostHog)
   - Cache (Redis)

⚪ Optional features disabled:
   - Real-Time (Pusher)
   - Search (Algolia)
   - CMS (Sanity)
   - File Storage (S3)
   - Error Tracking (Sentry)
   - AI (OpenAI)
   - AI (Anthropic)
```

## Scenario: Using Default Stripe Prices

When Stripe price IDs are still using default values:

```
⚠️  Environment Variable Warnings:

  [Payment (Stripe Prices)] NEXT_PUBLIC_STRIPE_PRICE_STARTER: Using default value. Replace with your actual Stripe Price ID from the dashboard
  [Payment (Stripe Prices)] NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL: Using default value. Replace with your actual Stripe Price ID from the dashboard
  [Payment (Stripe Prices)] NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE: Using default value. Replace with your actual Stripe Price ID from the dashboard
```

## Notes

### Development vs Production

**Development Mode:**

- Shows warnings for non-critical issues (optional features, default values)
- Only throws errors for critical configuration (Database, Auth, Payment, Email)
- Displays feature summary showing what's enabled/disabled

**Production Mode:**

- Throws immediately for ANY validation error
- Fails fast to prevent runtime issues
- No feature summary (assumes production is properly configured)

### Error Categories

Errors are grouped by feature category for easy diagnosis:

- **Database** - PostgreSQL connection
- **Authentication** - NextAuth configuration
- **Payment** - Stripe configuration
- **Email** - Resend configuration
- **Application** - App URLs and settings
- **OAuth** - Google OAuth (optional)
- **Real-Time (Pusher)** - Pusher configuration (optional)
- **Search (Algolia)** - Algolia configuration (optional)
- **CMS (Sanity)** - Sanity configuration (optional)
- **Cache (Redis)** - Upstash Redis configuration (optional)
- **File Storage (S3)** - S3-compatible storage (optional)
- **Analytics (PostHog)** - PostHog configuration (optional)
- **Error Tracking (Sentry)** - Sentry configuration (optional)
- **AI (OpenAI)** - OpenAI API (optional)
- **AI (Anthropic)** - Anthropic/Claude API (optional)
- **Payment (Stripe Prices)** - Stripe price ID warnings (optional)
