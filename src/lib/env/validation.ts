/**
 * Environment Variable Validation
 *
 * Validates all environment variables on application startup.
 * Provides clear error messages and setup instructions.
 *
 * Usage:
 *   import { validateEnv } from '@/lib/env/validation';
 *   validateEnv(); // Throws with detailed error if validation fails
 */

import { logger } from '@/lib/logger';

interface ValidationError {
  variable: string;
  message: string;
  category: string;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validates that a value exists and is not empty
 */
function isPresent(value: string | undefined): boolean {
  return !!value && value.trim().length > 0;
}

/**
 * Validates URL format
 */
function isValidUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates PostgreSQL URL format
 */
function isValidPostgresUrl(value: string | undefined): boolean {
  if (!value) return false;
  return value.startsWith('postgres://') || value.startsWith('postgresql://');
}

/**
 * Validates minimum string length
 */
function hasMinLength(value: string | undefined, minLength: number): boolean {
  return !!value && value.length >= minLength;
}

/**
 * Validates that a string starts with a specific prefix
 */
function hasPrefix(value: string | undefined, prefix: string): boolean {
  return !!value && value.startsWith(prefix);
}

/**
 * Validates email address format
 */
function isValidEmail(value: string | undefined): boolean {
  if (!value) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Validates required environment variables
 */
function validateRequired(): ValidationError[] {
  const errors: ValidationError[] = [];

  // Database
  if (!isPresent(process.env.DATABASE_URL)) {
    errors.push({
      variable: 'DATABASE_URL',
      message: 'Database URL is required',
      category: 'Database',
    });
  } else if (!isValidPostgresUrl(process.env.DATABASE_URL)) {
    errors.push({
      variable: 'DATABASE_URL',
      message: 'Must be a valid PostgreSQL URL (postgres:// or postgresql://)',
      category: 'Database',
    });
  }

  // NextAuth
  if (!isPresent(process.env.NEXTAUTH_URL)) {
    errors.push({
      variable: 'NEXTAUTH_URL',
      message: 'NextAuth URL is required (e.g., http://localhost:3000)',
      category: 'Authentication',
    });
  } else if (!isValidUrl(process.env.NEXTAUTH_URL)) {
    errors.push({
      variable: 'NEXTAUTH_URL',
      message: 'Must be a valid URL',
      category: 'Authentication',
    });
  }

  if (!isPresent(process.env.NEXTAUTH_SECRET)) {
    errors.push({
      variable: 'NEXTAUTH_SECRET',
      message: 'NextAuth secret is required. Generate with: openssl rand -base64 32',
      category: 'Authentication',
    });
  } else if (!hasMinLength(process.env.NEXTAUTH_SECRET, 32)) {
    errors.push({
      variable: 'NEXTAUTH_SECRET',
      message: 'Must be at least 32 characters long for security',
      category: 'Authentication',
    });
  }

  // Payment Provider (at least one required)
  const hasStripe = isPresent(process.env.STRIPE_SECRET_KEY);
  const hasPolar = isPresent(process.env.POLAR_ACCESS_TOKEN);
  const hasLemonsqueezy = isPresent(process.env.LEMONSQUEEZY_API_KEY);

  if (!hasStripe && !hasPolar && !hasLemonsqueezy) {
    errors.push({
      variable: 'PAYMENT_PROVIDER',
      message:
        'At least one payment provider is required: STRIPE_SECRET_KEY, POLAR_ACCESS_TOKEN, or LEMONSQUEEZY_API_KEY',
      category: 'Payment',
    });
  }

  // Stripe validation (optional - only if using Stripe)
  if (hasStripe && !hasPrefix(process.env.STRIPE_SECRET_KEY, 'sk_')) {
    errors.push({
      variable: 'STRIPE_SECRET_KEY',
      message: 'Must start with sk_test_ or sk_live_',
      category: 'Payment',
    });
  }

  if (process.env.STRIPE_WEBHOOK_SECRET && !hasPrefix(process.env.STRIPE_WEBHOOK_SECRET, 'whsec_')) {
    errors.push({
      variable: 'STRIPE_WEBHOOK_SECRET',
      message: 'Must start with whsec_',
      category: 'Payment',
    });
  }

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && !hasPrefix(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, 'pk_')) {
    errors.push({
      variable: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
      message: 'Must start with pk_test_ or pk_live_',
      category: 'Payment',
    });
  }

  // Polar validation (optional - only if using Polar)
  if (hasPolar && !hasPrefix(process.env.POLAR_ACCESS_TOKEN, 'polar_')) {
    errors.push({
      variable: 'POLAR_ACCESS_TOKEN',
      message: 'Must start with polar_',
      category: 'Payment',
    });
  }

  // Email is optional (system works without emails, just logs warnings)
  if (process.env.RESEND_API_KEY && !hasPrefix(process.env.RESEND_API_KEY, 're_')) {
    errors.push({
      variable: 'RESEND_API_KEY',
      message: 'Must start with re_',
      category: 'Email',
    });
  }

  if (process.env.EMAIL_FROM && !isValidEmail(process.env.EMAIL_FROM)) {
    errors.push({
      variable: 'EMAIL_FROM',
      message: 'Must be a valid email address',
      category: 'Email',
    });
  }

  // Application URLs
  if (process.env.NEXT_PUBLIC_APP_URL && !isValidUrl(process.env.NEXT_PUBLIC_APP_URL)) {
    errors.push({
      variable: 'NEXT_PUBLIC_APP_URL',
      message: 'Must be a valid URL',
      category: 'Application',
    });
  }

  if (process.env.NEXT_PUBLIC_API_URL && !isValidUrl(process.env.NEXT_PUBLIC_API_URL)) {
    errors.push({
      variable: 'NEXT_PUBLIC_API_URL',
      message: 'Must be a valid URL',
      category: 'Application',
    });
  }

  return errors;
}

/**
 * Validates optional environment variables (when present)
 */
function validateOptional(): ValidationError[] {
  const errors: ValidationError[] = [];

  // Google OAuth (optional, but must be valid if present)
  if (process.env.GOOGLE_CLIENT_ID && !isPresent(process.env.GOOGLE_CLIENT_SECRET)) {
    errors.push({
      variable: 'GOOGLE_CLIENT_SECRET',
      message: 'Required when GOOGLE_CLIENT_ID is set',
      category: 'OAuth',
    });
  }

  if (process.env.GOOGLE_CLIENT_SECRET && !isPresent(process.env.GOOGLE_CLIENT_ID)) {
    errors.push({
      variable: 'GOOGLE_CLIENT_ID',
      message: 'Required when GOOGLE_CLIENT_SECRET is set',
      category: 'OAuth',
    });
  }

  // Pusher (all or nothing)
  const pusherVars = [
    process.env.PUSHER_APP_ID,
    process.env.PUSHER_SECRET,
    process.env.NEXT_PUBLIC_PUSHER_KEY,
    process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  ];
  const pusherVarNames = [
    'PUSHER_APP_ID',
    'PUSHER_SECRET',
    'NEXT_PUBLIC_PUSHER_KEY',
    'NEXT_PUBLIC_PUSHER_CLUSTER',
  ];
  const pusherPresent = pusherVars.filter((v) => isPresent(v)).length;

  if (pusherPresent > 0 && pusherPresent < 4) {
    pusherVarNames.forEach((varName, index) => {
      if (!isPresent(pusherVars[index])) {
        errors.push({
          variable: varName,
          message: 'All Pusher variables must be set together (or none at all)',
          category: 'Real-Time (Pusher)',
        });
      }
    });
  }

  // Algolia (all or nothing)
  const algoliaPublicVars = [
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  ];
  const algoliaPublicVarNames = [
    'NEXT_PUBLIC_ALGOLIA_APP_ID',
    'NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY',
  ];
  const algoliaPresent = algoliaPublicVars.filter((v) => isPresent(v)).length;

  if (algoliaPresent > 0 && algoliaPresent < 2) {
    algoliaPublicVarNames.forEach((varName, index) => {
      if (!isPresent(algoliaPublicVars[index])) {
        errors.push({
          variable: varName,
          message:
            'Both NEXT_PUBLIC_ALGOLIA_APP_ID and NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY must be set together',
          category: 'Search (Algolia)',
        });
      }
    });
  }

  // Upstash Redis (all or nothing)
  const redisVars = [process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN];
  const redisVarNames = ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'];
  const redisPresent = redisVars.filter((v) => isPresent(v)).length;

  if (redisPresent > 0 && redisPresent < 2) {
    redisVarNames.forEach((varName, index) => {
      if (!isPresent(redisVars[index])) {
        errors.push({
          variable: varName,
          message: 'Both UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set together',
          category: 'Cache (Redis)',
        });
      }
    });
  }

  // Validate Redis URL format if present
  if (
    isPresent(process.env.UPSTASH_REDIS_REST_URL) &&
    !isValidUrl(process.env.UPSTASH_REDIS_REST_URL)
  ) {
    errors.push({
      variable: 'UPSTASH_REDIS_REST_URL',
      message: 'Must be a valid HTTPS URL',
      category: 'Cache (Redis)',
    });
  }

  // S3 Storage (all or nothing for basic setup)
  const s3Vars = [
    process.env.S3_ACCESS_KEY_ID,
    process.env.S3_SECRET_ACCESS_KEY,
    process.env.S3_BUCKET_NAME,
  ];
  const s3VarNames = ['S3_ACCESS_KEY_ID', 'S3_SECRET_ACCESS_KEY', 'S3_BUCKET_NAME'];
  const s3Present = s3Vars.filter((v) => isPresent(v)).length;

  if (s3Present > 0 && s3Present < 3) {
    s3VarNames.forEach((varName, index) => {
      if (!isPresent(s3Vars[index])) {
        errors.push({
          variable: varName,
          message:
            'S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, and S3_BUCKET_NAME must all be set together',
          category: 'File Storage (S3)',
        });
      }
    });
  }

  // Validate S3 endpoint if present
  if (isPresent(process.env.S3_ENDPOINT) && !isValidUrl(process.env.S3_ENDPOINT)) {
    errors.push({
      variable: 'S3_ENDPOINT',
      message: 'Must be a valid HTTPS URL',
      category: 'File Storage (S3)',
    });
  }

  // PostHog validation (optional)
  if (
    isPresent(process.env.NEXT_PUBLIC_POSTHOG_KEY) &&
    !hasPrefix(process.env.NEXT_PUBLIC_POSTHOG_KEY, 'phc_')
  ) {
    errors.push({
      variable: 'NEXT_PUBLIC_POSTHOG_KEY',
      message: 'Must start with phc_',
      category: 'Analytics (PostHog)',
    });
  }

  if (
    isPresent(process.env.NEXT_PUBLIC_POSTHOG_HOST) &&
    !isValidUrl(process.env.NEXT_PUBLIC_POSTHOG_HOST)
  ) {
    errors.push({
      variable: 'NEXT_PUBLIC_POSTHOG_HOST',
      message: 'Must be a valid URL',
      category: 'Analytics (PostHog)',
    });
  }

  // Sentry validation
  if (
    isPresent(process.env.NEXT_PUBLIC_SENTRY_DSN) &&
    !isValidUrl(process.env.NEXT_PUBLIC_SENTRY_DSN)
  ) {
    errors.push({
      variable: 'NEXT_PUBLIC_SENTRY_DSN',
      message: 'Must be a valid URL',
      category: 'Error Tracking (Sentry)',
    });
  }

  // OpenAI validation
  if (isPresent(process.env.OPENAI_API_KEY) && !hasPrefix(process.env.OPENAI_API_KEY, 'sk-')) {
    errors.push({
      variable: 'OPENAI_API_KEY',
      message: 'Must start with sk-',
      category: 'AI (OpenAI)',
    });
  }

  // Anthropic validation
  if (
    isPresent(process.env.ANTHROPIC_API_KEY) &&
    !hasPrefix(process.env.ANTHROPIC_API_KEY, 'sk-ant-')
  ) {
    errors.push({
      variable: 'ANTHROPIC_API_KEY',
      message: 'Must start with sk-ant-',
      category: 'AI (Anthropic)',
    });
  }

  // Stripe pricing tiers validation (warn if using defaults)
  const stripeDefaultPrices = ['price_starter', 'price_professional', 'price_enterprise'];
  if (stripeDefaultPrices.includes(process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || '')) {
    errors.push({
      variable: 'NEXT_PUBLIC_STRIPE_PRICE_STARTER',
      message: 'Using default value. Replace with your actual Stripe Price ID from the dashboard',
      category: 'Payment (Stripe Prices)',
    });
  }
  if (stripeDefaultPrices.includes(process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || '')) {
    errors.push({
      variable: 'NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL',
      message: 'Using default value. Replace with your actual Stripe Price ID from the dashboard',
      category: 'Payment (Stripe Prices)',
    });
  }
  if (stripeDefaultPrices.includes(process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || '')) {
    errors.push({
      variable: 'NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE',
      message: 'Using default value. Replace with your actual Stripe Price ID from the dashboard',
      category: 'Payment (Stripe Prices)',
    });
  }

  return errors;
}

/**
 * Validates all environment variables
 */
export function validateEnv(): ValidationResult {
  const requiredErrors = validateRequired();
  const optionalErrors = validateOptional();
  const allErrors = [...requiredErrors, ...optionalErrors];

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  };
}

/**
 * Formats validation errors into a readable error message
 */
function formatErrors(errors: ValidationError[]): string {
  const errorsByCategory = errors.reduce(
    (acc, error) => {
      if (!acc[error.category]) {
        acc[error.category] = [];
      }
      acc[error.category].push(error);
      return acc;
    },
    {} as Record<string, ValidationError[]>
  );

  const lines: string[] = [
    '',
    '════════════════════════════════════════════════════════════════',
    '  Environment Variable Validation Failed',
    '════════════════════════════════════════════════════════════════',
    '',
  ];

  Object.entries(errorsByCategory).forEach(([category, categoryErrors]) => {
    lines.push(`[${category}]`);
    categoryErrors.forEach((error) => {
      lines.push(`  ✗ ${error.variable}`);
      lines.push(`    ${error.message}`);
      lines.push('');
    });
  });

  lines.push('════════════════════════════════════════════════════════════════');
  lines.push('');
  lines.push('Setup Instructions:');
  lines.push('  1. Copy .env.example to .env.local');
  lines.push('  2. Fill in all required environment variables');
  lines.push('  3. See .env.example for detailed setup instructions');
  lines.push('  4. Run "npm run dev" again');
  lines.push('');
  lines.push('Documentation: https://fabrk.dev/docs/setup');
  lines.push('');
  lines.push('════════════════════════════════════════════════════════════════');
  lines.push('');

  return lines.join('\n');
}

/**
 * Validates environment variables and throws if validation fails
 * Call this early in your application startup
 */
export function validateEnvOrThrow(): void {
  const result = validateEnv();

  if (!result.valid) {
    const errorMessage = formatErrors(result.errors);
    throw new Error(errorMessage);
  }
}

/**
 * Validates environment variables and logs warnings for non-critical issues
 * Use this in development to get helpful warnings without blocking startup
 */
export function validateEnvWithWarnings(): void {
  const result = validateEnv();

  if (!result.valid) {
    // Separate critical errors from warnings
    const criticalCategories = ['Database', 'Authentication', 'Payment'];
    const criticalErrors = result.errors.filter((e) => criticalCategories.includes(e.category));
    const warnings = result.errors.filter((e) => !criticalCategories.includes(e.category));

    // Critical errors should throw
    if (criticalErrors.length > 0) {
      const errorMessage = formatErrors(criticalErrors);
      throw new Error(errorMessage);
    }

    // Non-critical issues are just warnings
    if (warnings.length > 0) {
      logger.warn('\n⚠️  Environment Variable Warnings:\n');
      warnings.forEach((warning) => {
        logger.warn(`  [${warning.category}] ${warning.variable}: ${warning.message}`);
      });
      logger.warn('\n');
    }
  }
}

/**
 * Gets a summary of optional features based on environment variables
 */
export function getFeatureSummary(): {
  enabled: string[];
  disabled: string[];
} {
  const features = {
    'Google OAuth':
      isPresent(process.env.GOOGLE_CLIENT_ID) && isPresent(process.env.GOOGLE_CLIENT_SECRET),
    'Real-Time (Pusher)': isPresent(process.env.NEXT_PUBLIC_PUSHER_KEY),
    'Analytics (PostHog)': isPresent(process.env.NEXT_PUBLIC_POSTHOG_KEY),
    'Search (Algolia)': isPresent(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID),
    'Cache (Redis)': isPresent(process.env.UPSTASH_REDIS_REST_URL),
    'File Storage (S3)': isPresent(process.env.S3_BUCKET_NAME),
    'Error Tracking (Sentry)': isPresent(process.env.NEXT_PUBLIC_SENTRY_DSN),
    'AI (OpenAI)': isPresent(process.env.OPENAI_API_KEY),
    'AI (Anthropic)': isPresent(process.env.ANTHROPIC_API_KEY),
  };

  return {
    enabled: Object.entries(features)
      .filter(([, enabled]) => enabled)
      .map(([name]) => name),
    disabled: Object.entries(features)
      .filter(([, enabled]) => !enabled)
      .map(([name]) => name),
  };
}
