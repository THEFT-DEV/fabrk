/**
 * Environment Variable Validation
 *
 * This file validates all environment variables at startup to prevent
 * silent failures in production. It uses Zod for runtime validation
 * and provides TypeScript type safety.
 *
 * CRITICAL: This validation runs at build/start time. If any required
 * environment variable is missing or invalid, the app will FAIL LOUDLY
 * with a clear error message.
 */

import { z } from 'zod';

/**
 * Utility to create an optional string that becomes required in production
 */
const requiredInProduction = (fieldName: string) => {
  return z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (process.env.NODE_ENV === 'production' && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${fieldName} is required in production`,
        });
      }
    });
};

/**
 * Utility to validate conditional requirements based on another env var
 */
const conditionalRequired = (condition: boolean, fieldName: string) => {
  if (condition) {
    return z
      .string({
        message: `${fieldName} is required when the feature is enabled`,
      })
      .min(1, `${fieldName} cannot be empty`);
  }
  return z.string().optional();
};

/**
 * Server-side Environment Variables Schema
 * These variables are NEVER exposed to the browser
 */
const serverSchema = z.object({
  // ============================================================================
  // NODE ENVIRONMENT
  // ============================================================================
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // ============================================================================
  // DATABASE - Required in production, optional in development
  // ============================================================================
  DATABASE_URL: requiredInProduction('DATABASE_URL').refine((val) => {
    // In production, validate it's a proper PostgreSQL URL
    if (process.env.NODE_ENV === 'production' && val) {
      return val.startsWith('postgresql://') || val.startsWith('postgres://');
    }
    return true;
  }, 'DATABASE_URL must be a valid PostgreSQL connection string'),

  DATABASE_URL_DIRECT: z.string().optional(),

  // ============================================================================
  // AUTHENTICATION - NextAuth v5 (CRITICAL)
  // ============================================================================
  NEXTAUTH_SECRET: requiredInProduction('NEXTAUTH_SECRET').refine((val) => {
    // In production, validate minimum length
    if (process.env.NODE_ENV === 'production' && val) {
      return val.length >= 32;
    }
    return true;
  }, 'NEXTAUTH_SECRET must be at least 32 characters for security in production'),

  NEXTAUTH_URL: requiredInProduction('NEXTAUTH_URL').refine((val) => {
    // In production, must be HTTPS (if set)
    if (process.env.NODE_ENV === 'production' && val) {
      // Allow localhost for local production builds/testing
      if (val.includes('localhost') || val.includes('127.0.0.1')) {
        return true;
      }
      return val.startsWith('https://');
    }
    return true;
  }, 'NEXTAUTH_URL must use HTTPS in production'),

  // Google OAuth - Required if enabled
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: conditionalRequired(!!process.env.GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_SECRET'),

  // ============================================================================
  // STRIPE PAYMENTS - Required if subscriptions/payments enabled
  // ============================================================================
  STRIPE_SECRET_KEY: z
    .string()
    .optional()
    .refine((val) => {
      // If provided, must start with sk_test_ or sk_live_
      if (val) {
        return val.startsWith('sk_test_') || val.startsWith('sk_live_');
      }
      return true;
    }, 'STRIPE_SECRET_KEY must be a valid Stripe secret key'),

  STRIPE_WEBHOOK_SECRET: conditionalRequired(
    !!process.env.STRIPE_SECRET_KEY,
    'STRIPE_WEBHOOK_SECRET'
  ).refine((val) => {
    // If provided, must start with whsec_
    if (val) {
      return val.startsWith('whsec_');
    }
    return true;
  }, 'STRIPE_WEBHOOK_SECRET must be a valid Stripe webhook secret'),

  STRIPE_COUPON_EARLY_ADOPTER: z.string().optional(),

  // ============================================================================
  // LEMON SQUEEZY PAYMENTS (Alternative to Stripe)
  // ============================================================================
  LEMONSQUEEZY_API_KEY: z.string().optional(),
  LEMONSQUEEZY_STORE_ID: conditionalRequired(
    !!process.env.LEMONSQUEEZY_API_KEY,
    'LEMONSQUEEZY_STORE_ID'
  ),
  LEMONSQUEEZY_WEBHOOK_SECRET: conditionalRequired(
    !!process.env.LEMONSQUEEZY_API_KEY,
    'LEMONSQUEEZY_WEBHOOK_SECRET'
  ),

  // ============================================================================
  // EMAIL SERVICE - Resend (Required if email features enabled)
  // ============================================================================
  RESEND_API_KEY: z
    .string()
    .optional()
    .refine((val) => {
      // If provided, must start with re_
      if (val) {
        return val.startsWith('re_');
      }
      return true;
    }, 'RESEND_API_KEY must be a valid Resend API key'),

  EMAIL_FROM: z.string().email().optional(),
  EMAIL_REPLY_TO: z.string().email().optional(),
  CONTACT_FORM_EMAIL: z.string().email().optional(),

  // ============================================================================
  // CRON JOBS & BACKGROUND WORKERS
  // ============================================================================
  CRON_SECRET: z.string().optional(),

  // ============================================================================
  // PUSHER REAL-TIME (Optional)
  // ============================================================================
  PUSHER_APP_ID: z.string().optional(),
  PUSHER_SECRET: conditionalRequired(!!process.env.PUSHER_APP_ID, 'PUSHER_SECRET'),

  // ============================================================================
  // ALGOLIA SEARCH (Optional)
  // ============================================================================
  ALGOLIA_ADMIN_API_KEY: conditionalRequired(
    !!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    'ALGOLIA_ADMIN_API_KEY'
  ),

  // ============================================================================
  // SANITY CMS (Optional)
  // ============================================================================
  SANITY_API_TOKEN: z.string().optional(),

  // ============================================================================
  // REDIS CACHE - Upstash (Recommended for production)
  // ============================================================================
  UPSTASH_REDIS_REST_URL: z
    .string()
    .url()
    .optional()
    .refine((val) => {
      // Warn in production if not set
      if (process.env.NODE_ENV === 'production' && !val) {
        console.warn(
          '⚠️  UPSTASH_REDIS_REST_URL not set. Rate limiting will use in-memory cache (not recommended for production)'
        );
      }
      return true;
    }),

  UPSTASH_REDIS_REST_TOKEN: conditionalRequired(
    !!process.env.UPSTASH_REDIS_REST_URL,
    'UPSTASH_REDIS_REST_TOKEN'
  ),

  // ============================================================================
  // FILE STORAGE - S3 Compatible (Optional)
  // ============================================================================
  S3_ENDPOINT: z.string().url().optional(),
  S3_ACCESS_KEY_ID: conditionalRequired(!!process.env.S3_BUCKET_NAME, 'S3_ACCESS_KEY_ID'),
  S3_SECRET_ACCESS_KEY: conditionalRequired(!!process.env.S3_BUCKET_NAME, 'S3_SECRET_ACCESS_KEY'),
  S3_BUCKET_NAME: z.string().optional(),
  AWS_REGION: z.string().optional(),

  // ============================================================================
  // AI SERVICES (Optional)
  // ============================================================================
  // Ollama (Local AI - recommended for development)
  OLLAMA_ENABLED: z.string().optional(), // Set to "true" to enable Ollama
  OLLAMA_BASE_URL: z.string().url().optional(), // Default: http://localhost:11434/v1
  OLLAMA_MODEL: z.string().optional(), // Default: llama3.1:8b

  // Cloud providers
  OPENAI_API_KEY: z
    .string()
    .optional()
    .refine((val) => {
      if (val) {
        return val.startsWith('sk-');
      }
      return true;
    }, 'OPENAI_API_KEY must be a valid OpenAI API key'),

  GOOGLE_AI_API_KEY: z.string().optional(),

  ANTHROPIC_API_KEY: z
    .string()
    .optional()
    .refine((val) => {
      if (val) {
        return val.startsWith('sk-ant-');
      }
      return true;
    }, 'ANTHROPIC_API_KEY must be a valid Anthropic API key'),

  // ============================================================================
  // GITHUB REPOSITORY ACCESS - For distribution to customers
  // ============================================================================
  GITHUB_ACCESS_TOKEN: z
    .string()
    .optional()
    .refine((val) => {
      // If provided, should be a valid GitHub personal access token (ghp_*)
      if (val) {
        return val.startsWith('ghp_') || val.startsWith('github_pat_');
      }
      return true;
    }, 'GITHUB_ACCESS_TOKEN must be a valid GitHub personal access token'),
  GITHUB_REPO_OWNER: conditionalRequired(
    !!process.env.GITHUB_ACCESS_TOKEN,
    'GITHUB_REPO_OWNER'
  ).refine((val) => {
    // GitHub usernames/org names: alphanumeric and hyphens only
    if (val) {
      return /^[a-zA-Z0-9-]+$/.test(val);
    }
    return true;
  }, 'GITHUB_REPO_OWNER must contain only alphanumeric characters and hyphens'),
  GITHUB_REPO_NAME: conditionalRequired(
    !!process.env.GITHUB_ACCESS_TOKEN,
    'GITHUB_REPO_NAME'
  ).refine((val) => {
    // GitHub repo names: alphanumeric, hyphens, underscores, and dots
    if (val) {
      return /^[a-zA-Z0-9._-]+$/.test(val);
    }
    return true;
  }, 'GITHUB_REPO_NAME must contain only alphanumeric characters, hyphens, underscores, and dots'),

  // ============================================================================
  // MONITORING - Sentry (Optional)
  // ============================================================================
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),

  // ============================================================================
  // BACKGROUND JOBS CONFIG
  // ============================================================================
  JOB_WORKER_CONCURRENCY: z
    .string()
    .optional()
    .transform((val) => {
      return val ? parseInt(val, 10) : 5;
    }),
  JOB_WORKER_INTERVAL: z
    .string()
    .optional()
    .transform((val) => {
      return val ? parseInt(val, 10) : 1000;
    }),

  // ============================================================================
  // PRODUCT DOWNLOAD URLS (Optional)
  // ============================================================================
  PRODUCT_DOWNLOAD_URL_DEV: z.string().url().optional(),
  PRODUCT_DOWNLOAD_URL_PRO: z.string().url().optional(),
  PRODUCT_DOWNLOAD_URL_ENT: z.string().url().optional(),
});

/**
 * Client-side Environment Variables Schema
 * These variables ARE exposed to the browser (must be prefixed with NEXT_PUBLIC_)
 */
const clientSchema = z.object({
  // ============================================================================
  // PUBLIC APP URLS
  // ============================================================================
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url('NEXT_PUBLIC_APP_URL must be a valid URL')
    .default('http://localhost:3000'),

  NEXT_PUBLIC_API_URL: z.string().url('NEXT_PUBLIC_API_URL must be a valid URL').optional(),

  // ============================================================================
  // APP METADATA
  // ============================================================================
  NEXT_PUBLIC_APP_VERSION: z.string().optional().default('1.0.0'),
  NEXT_PUBLIC_AUTHOR_NAME: z.string().optional(),
  NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email().optional(),

  // ============================================================================
  // STRIPE PUBLIC KEY
  // ============================================================================
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
    .string()
    .optional()
    .refine((val) => {
      // If provided, must start with pk_test_ or pk_live_
      if (val) {
        return val.startsWith('pk_test_') || val.startsWith('pk_live_');
      }
      return true;
    }, 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must be a valid Stripe publishable key'),

  // ============================================================================
  // STRIPE PRICE IDs - CRITICAL: Required if Stripe is enabled
  // ============================================================================
  NEXT_PUBLIC_STRIPE_PRICE_STARTER: conditionalRequired(
    !!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === 'production',
    'NEXT_PUBLIC_STRIPE_PRICE_STARTER'
  ).refine((val) => {
    // Must be a price ID, not a product ID
    if (val && val !== 'price_starter') {
      return val.startsWith('price_');
    }
    return true;
  }, 'NEXT_PUBLIC_STRIPE_PRICE_STARTER must be a valid Stripe Price ID (starts with "price_"), not a Product ID'),

  NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL: conditionalRequired(
    !!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === 'production',
    'NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL'
  ).refine((val) => {
    if (val && val !== 'price_professional') {
      return val.startsWith('price_');
    }
    return true;
  }, 'NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL must be a valid Stripe Price ID'),

  NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE: conditionalRequired(
    !!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === 'production',
    'NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE'
  ).refine((val) => {
    if (val && val !== 'price_enterprise') {
      return val.startsWith('price_');
    }
    return true;
  }, 'NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE must be a valid Stripe Price ID'),

  NEXT_PUBLIC_STRIPE_PRICE_FABRK: z.string().optional(),

  // ============================================================================
  // LEMON SQUEEZY PUBLIC CONFIG (Alternative to Stripe)
  // ============================================================================
  NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_STARTER: z.string().optional(),
  NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PROFESSIONAL: z.string().optional(),
  NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ENTERPRISE: z.string().optional(),
  NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_FABRK: z.string().optional(),

  // ============================================================================
  // PUSHER PUBLIC CONFIG
  // ============================================================================
  NEXT_PUBLIC_PUSHER_KEY: conditionalRequired(
    !!process.env.PUSHER_APP_ID,
    'NEXT_PUBLIC_PUSHER_KEY'
  ),
  NEXT_PUBLIC_PUSHER_CLUSTER: conditionalRequired(
    !!process.env.PUSHER_APP_ID,
    'NEXT_PUBLIC_PUSHER_CLUSTER'
  ),

  // ============================================================================
  // ALGOLIA SEARCH PUBLIC CONFIG
  // ============================================================================
  NEXT_PUBLIC_ALGOLIA_APP_ID: z.string().optional(),
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: conditionalRequired(
    !!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    'NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY'
  ),

  // ============================================================================
  // SANITY CMS PUBLIC CONFIG
  // ============================================================================
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_DATASET: conditionalRequired(
    !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    'NEXT_PUBLIC_SANITY_DATASET'
  ),

  // ============================================================================
  // SENTRY PUBLIC CONFIG
  // ============================================================================
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),

  // ============================================================================
  // POSTHOG ANALYTICS
  // ============================================================================
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional().default('https://app.posthog.com'),

  // ============================================================================
  // GOOGLE ANALYTICS
  // ============================================================================
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: z.string().optional(),

  // ============================================================================
  // PLAUSIBLE ANALYTICS
  // ============================================================================
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
});

/**
 * Validate and parse environment variables
 * This will throw an error if validation fails
 * Set SKIP_ENV_VALIDATION=true to skip validation (useful for builds/CI)
 */
const parseEnv = () => {
  // Allow skipping validation (useful for initial builds or CI)
  if (process.env.SKIP_ENV_VALIDATION === 'true') {
    console.log('⚠️  Skipping environment variable validation (SKIP_ENV_VALIDATION=true)');
    return {
      server: process.env as unknown as z.infer<typeof serverSchema>,
      client: process.env as unknown as z.infer<typeof clientSchema>,
    };
  }

  // Parse server-side env vars
  const serverEnv = serverSchema.safeParse(process.env);

  if (!serverEnv.success) {
    // Use console.error for startup errors (before logger is fully initialized)
    console.error('❌ Invalid server environment variables:');
    console.error(JSON.stringify(serverEnv.error.format(), null, 2));
    throw new Error('Invalid server environment variables. See error details above.');
  }

  // Parse client-side env vars
  const clientEnv = clientSchema.safeParse(process.env);

  if (!clientEnv.success) {
    // Use console.error for startup errors (before logger is fully initialized)
    console.error('❌ Invalid client environment variables:');
    console.error(JSON.stringify(clientEnv.error.format(), null, 2));
    throw new Error('Invalid client environment variables. See error details above.');
  }

  return {
    server: serverEnv.data,
    client: clientEnv.data,
  };
};

/**
 * Validated environment variables
 * Use this instead of process.env for type safety
 */
export const env = parseEnv();

/**
 * Type-safe access to environment variables
 */
export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;

/**
 * Helper to check if we're in production
 */
export const isProduction = env.server.NODE_ENV === 'production';

/**
 * Helper to check if we're in development
 */
export const isDevelopment = env.server.NODE_ENV === 'development';

/**
 * Helper to check if we're in test mode
 */
export const isTest = env.server.NODE_ENV === 'test';

/**
 * Startup validation check
 * This runs immediately when the module is imported
 * Note: Using console for startup logs (before logger is fully initialized)
 */
if (isProduction) {
  console.log('✅ Environment variables validated successfully for PRODUCTION');

  // Additional production checks
  const warnings: string[] = [];

  if (!env.server.DATABASE_URL) {
    warnings.push('DATABASE_URL is not set');
  }

  // Only warn about payments if NO provider is configured
  const hasPaymentProvider =
    !!process.env.STRIPE_SECRET_KEY ||
    !!process.env.POLAR_ACCESS_TOKEN ||
    !!process.env.LEMONSQUEEZY_API_KEY;

  if (!hasPaymentProvider) {
    warnings.push(
      'No payment provider configured (STRIPE_SECRET_KEY, POLAR_ACCESS_TOKEN, or LEMONSQUEEZY_API_KEY)'
    );
  }

  if (!env.server.UPSTASH_REDIS_REST_URL) {
    warnings.push('UPSTASH_REDIS_REST_URL is not set (rate limiting will use in-memory cache)');
  }

  if (warnings.length > 0) {
    console.warn('\n⚠️  Production Environment Warnings:');
    warnings.forEach((warning) => console.warn(`   - ${warning}`));
    console.warn('');
  }
} else {
  console.log(
    `✅ Environment variables validated successfully for ${env.server.NODE_ENV.toUpperCase()}`
  );
}
