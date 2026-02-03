/**
 * Type definitions for environment variables
 * Provides autocomplete and type checking for process.env
 *
 * These types complement the runtime validation in src/lib/env.ts
 * Use the validated `env` object from src/lib/env.ts instead of process.env directly
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // =============================================================================
      // CORE APPLICATION
      // =============================================================================

      /** Node environment: development, production, or test */
      NODE_ENV: 'development' | 'production' | 'test';

      /** Public URL where the application is hosted */
      NEXT_PUBLIC_APP_URL: string;

      /** Public API base URL */
      NEXT_PUBLIC_API_URL: string;

      /** Site domain without protocol (e.g., "example.com") */
      NEXT_PUBLIC_SITE_DOMAIN?: string;

      /** Application version for Sentry releases */
      NEXT_PUBLIC_APP_VERSION?: string;

      // =============================================================================
      // DATABASE
      // =============================================================================

      /** PostgreSQL connection string - REQUIRED IN PRODUCTION */
      DATABASE_URL: string;

      /** Direct database connection for Prisma migrations (optional) */
      DATABASE_URL_DIRECT?: string;

      // =============================================================================
      // AUTHENTICATION (NextAuth v5)
      // =============================================================================

      /** NextAuth base URL */
      NEXTAUTH_URL: string;

      /** NextAuth secret (min 32 characters) - generate with: openssl rand -base64 32 */
      NEXTAUTH_SECRET: string;

      /** Google OAuth client ID (optional) */
      GOOGLE_CLIENT_ID?: string;

      /** Google OAuth client secret (optional) */
      GOOGLE_CLIENT_SECRET?: string;

      // =============================================================================
      // STRIPE PAYMENT PROCESSING
      // =============================================================================

      /** Stripe secret key (server-side only) - starts with sk_test_ or sk_live_ */
      STRIPE_SECRET_KEY: string;

      /** Stripe publishable key (client-safe) - starts with pk_test_ or pk_live_ */
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;

      /** Stripe webhook signing secret - starts with whsec_ */
      STRIPE_WEBHOOK_SECRET: string;

      /** Stripe price ID for Starter tier (price_xxx, NOT prod_xxx) */
      NEXT_PUBLIC_STRIPE_PRICE_STARTER?: string;

      /** Stripe price ID for Professional tier (price_xxx, NOT prod_xxx) */
      NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL?: string;

      /** Stripe price ID for Enterprise tier (price_xxx, NOT prod_xxx) */
      NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE?: string;

      // =============================================================================
      // EMAIL SERVICE (Resend)
      // =============================================================================

      /** Resend API key - must start with re_ */
      RESEND_API_KEY: string;

      /** From email address */
      EMAIL_FROM: string;

      /** Reply-to email address (optional) */
      EMAIL_REPLY_TO?: string;

      /** Email queue polling interval in milliseconds (default: 5000) */
      EMAIL_WORKER_INTERVAL?: string;

      // =============================================================================
      // CRON JOBS & WORKERS
      // =============================================================================

      /** Secret key for authenticating cron job requests */
      CRON_SECRET?: string;

      /** Number of concurrent jobs to process (default: 5) */
      JOB_WORKER_CONCURRENCY?: string;

      /** Job polling interval in milliseconds (default: 1000) */
      JOB_WORKER_INTERVAL?: string;

      // =============================================================================
      // REAL-TIME FEATURES (Pusher)
      // =============================================================================

      /** Pusher app ID */
      PUSHER_APP_ID?: string;

      /** Pusher secret key (server-side only) */
      PUSHER_SECRET?: string;

      /** Pusher public key */
      NEXT_PUBLIC_PUSHER_KEY?: string;

      /** Pusher cluster (e.g., "us2", "eu", "ap3") */
      NEXT_PUBLIC_PUSHER_CLUSTER?: string;

      // =============================================================================
      // SEARCH & CMS
      // =============================================================================

      /** Algolia application ID */
      NEXT_PUBLIC_ALGOLIA_APP_ID?: string;

      /** Algolia search-only API key (client-safe) */
      NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY?: string;

      /** Algolia admin API key (server-side only, for indexing) */
      ALGOLIA_ADMIN_API_KEY?: string;

      /** Sanity CMS project ID */
      NEXT_PUBLIC_SANITY_PROJECT_ID?: string;

      /** Sanity dataset name (e.g., "production") */
      NEXT_PUBLIC_SANITY_DATASET?: string;

      /** Sanity API token (server-side only, for write operations) */
      SANITY_API_TOKEN?: string;

      // =============================================================================
      // PRODUCT DOWNLOADS
      // =============================================================================

      /** Download URL for dev/starter tier product */
      PRODUCT_DOWNLOAD_URL_DEV?: string;

      /** Download URL for pro tier product */
      PRODUCT_DOWNLOAD_URL_PRO?: string;

      /** Download URL for enterprise tier product */
      PRODUCT_DOWNLOAD_URL_ENT?: string;

      // =============================================================================
      // ERROR TRACKING & MONITORING (Sentry)
      // =============================================================================

      /** Sentry DSN (Data Source Name) */
      NEXT_PUBLIC_SENTRY_DSN?: string;

      /** Sentry organization name */
      SENTRY_ORG?: string;

      /** Sentry project name */
      SENTRY_PROJECT?: string;

      /** Sentry auth token for releases */
      SENTRY_AUTH_TOKEN?: string;

      // =============================================================================
      // CACHING & RATE LIMITING (Redis/Upstash)
      // =============================================================================

      /** Upstash Redis REST URL */
      UPSTASH_REDIS_REST_URL?: string;

      /** Upstash Redis REST token */
      UPSTASH_REDIS_REST_TOKEN?: string;

      // =============================================================================
      // FILE STORAGE (S3-Compatible)
      // =============================================================================

      /** S3 endpoint URL (optional for AWS S3, required for R2/MinIO) */
      S3_ENDPOINT?: string;

      /** S3 access key ID */
      S3_ACCESS_KEY_ID?: string;

      /** S3 secret access key */
      S3_SECRET_ACCESS_KEY?: string;

      /** S3 bucket name */
      S3_BUCKET_NAME?: string;

      /** AWS region (or "auto" for Cloudflare R2) */
      AWS_REGION?: string;

      // =============================================================================
      // AI SERVICES
      // =============================================================================

      /** OpenAI API key - starts with sk- */
      OPENAI_API_KEY?: string;

      /** Anthropic (Claude) API key - starts with sk-ant- */
      ANTHROPIC_API_KEY?: string;

      // =============================================================================
      // ANALYTICS
      // =============================================================================

      /** PostHog project API key */
      NEXT_PUBLIC_POSTHOG_KEY?: string;

      /** PostHog host URL (default: https://app.posthog.com) */
      NEXT_PUBLIC_POSTHOG_HOST?: string;

      /** Google Analytics 4 measurement ID (G-XXXXXXXXXX) */
      NEXT_PUBLIC_GA4_MEASUREMENT_ID?: string;

      /** Plausible Analytics domain */
      NEXT_PUBLIC_PLAUSIBLE_DOMAIN?: string;

      // =============================================================================
      // CAPTCHA SERVICES (Optional - choose one)
      // =============================================================================

      /** hCaptcha secret key */
      HCAPTCHA_SECRET_KEY?: string;

      /** Google reCAPTCHA secret key */
      RECAPTCHA_SECRET_KEY?: string;

      /** Cloudflare Turnstile secret key */
      TURNSTILE_SECRET_KEY?: string;

      // =============================================================================
      // FEATURE FLAGS
      // =============================================================================

      /** Enable email verification on signup */
      ENABLE_EMAIL_VERIFICATION?: string;

      /** Enable analytics tracking */
      ENABLE_ANALYTICS?: string;
    }
  }
}

// This export is required to make this file a module
export {};
