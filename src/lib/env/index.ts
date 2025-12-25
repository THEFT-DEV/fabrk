/**
 * Environment Variables Module
 *
 * This module validates environment variables on import and provides
 * type-safe access to all environment variables.
 *
 * Usage:
 *   import { env } from '@/lib/env';
 *   logger.debug(env.DATABASE_URL);
 *
 * The validation runs automatically when this module is imported.
 * In development, it logs warnings for optional features.
 * In production, it throws for any critical configuration issues.
 */

import { validateEnvOrThrow, validateEnvWithWarnings, getFeatureSummary } from './validation';
import { logger } from '@/lib/logger';

// Run validation based on environment
if (process.env.NODE_ENV === 'production') {
  // In production, fail fast if critical env vars are missing
  validateEnvOrThrow();
} else {
  // In development, show warnings but don't block startup for optional features
  validateEnvWithWarnings();

  // Log feature summary in development
  if (process.env.NODE_ENV === 'development') {
    const summary = getFeatureSummary();
    if (summary.enabled.length > 0) {
      logger.debug('\n✅ Optional features enabled:');
      summary.enabled.forEach((feature) => logger.debug(`   - ${feature}`));
    }
    if (summary.disabled.length > 0) {
      logger.debug('\n⚪ Optional features disabled:');
      summary.disabled.forEach((feature) => logger.debug(`   - ${feature}`));
    }
    logger.debug('');
  }
}

/**
 * Validated environment variables
 * All required variables are guaranteed to exist after validation
 */
export const env = {
  // Node Environment
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',

  // Database
  DATABASE_URL: process.env.DATABASE_URL!,
  DATABASE_URL_DIRECT: process.env.DATABASE_URL_DIRECT,

  // Application URLs
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',

  // NextAuth
  NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,

  // Google OAuth (Optional)
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  // Stripe (Optional - only if using Stripe for payments)
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,

  // Stripe Pricing Tiers
  NEXT_PUBLIC_STRIPE_PRICE_STARTER: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER,
  NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL,
  NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE,

  // Polar.sh (Optional - alternative to Stripe)
  POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
  POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET,
  NEXT_PUBLIC_POLAR_PRODUCT_ID: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID,
  NEXT_PUBLIC_POLAR_DISCOUNT_ID: process.env.NEXT_PUBLIC_POLAR_DISCOUNT_ID,

  // Lemonsqueezy (Optional - alternative to Stripe)
  LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
  LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID,
  LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,

  // Email (Optional)
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM || 'support@fabrk.dev',
  EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO,

  // Cron Jobs
  CRON_SECRET: process.env.CRON_SECRET,

  // Pusher Real-Time (Optional)
  PUSHER_APP_ID: process.env.PUSHER_APP_ID,
  PUSHER_SECRET: process.env.PUSHER_SECRET,
  NEXT_PUBLIC_PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
  NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,

  // Algolia Search (Optional)
  NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  ALGOLIA_ADMIN_API_KEY: process.env.ALGOLIA_ADMIN_API_KEY,

  // Sanity CMS (Optional)
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,

  // Product Download URLs (Optional)
  PRODUCT_DOWNLOAD_URL_DEV: process.env.PRODUCT_DOWNLOAD_URL_DEV,
  PRODUCT_DOWNLOAD_URL_PRO: process.env.PRODUCT_DOWNLOAD_URL_PRO,
  PRODUCT_DOWNLOAD_URL_ENT: process.env.PRODUCT_DOWNLOAD_URL_ENT,

  // Sentry Error Tracking (Optional)
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,

  // Application Version
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',

  // Redis Cache (Upstash) - Optional
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

  // File Storage (S3-Compatible) - Optional
  S3_ENDPOINT: process.env.S3_ENDPOINT,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION || 'auto',

  // AI APIs (Optional)
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,

  // Background Jobs
  JOB_WORKER_CONCURRENCY: process.env.JOB_WORKER_CONCURRENCY || '5',
  JOB_WORKER_INTERVAL: process.env.JOB_WORKER_INTERVAL || '1000',

  // PostHog Analytics (Optional)
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
} as const;

/**
 * Type-safe environment variable access
 */
export type Env = typeof env;

/**
 * Check if a feature is enabled based on environment variables
 */
export const features = {
  googleOAuth: !!env.GOOGLE_CLIENT_ID && !!env.GOOGLE_CLIENT_SECRET,
  pusher: !!env.NEXT_PUBLIC_PUSHER_KEY,
  algolia: !!env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  sanity: !!env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  redis: !!env.UPSTASH_REDIS_REST_URL,
  s3: !!env.S3_BUCKET_NAME,
  sentry: !!env.NEXT_PUBLIC_SENTRY_DSN,
  openai: !!env.OPENAI_API_KEY,
  anthropic: !!env.ANTHROPIC_API_KEY,
  posthog: !!env.NEXT_PUBLIC_POSTHOG_KEY,
} as const;

// Re-export validation functions for manual use
export {
  validateEnv,
  validateEnvOrThrow,
  validateEnvWithWarnings,
  getFeatureSummary,
} from './validation';
