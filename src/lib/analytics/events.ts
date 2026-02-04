/**
 * Client-Side Event Tracking
 *
 * Safe wrappers for PostHog analytics events.
 * Only uses posthog-js (client-side safe).
 *
 * For server-side tracking, use:
 *   import { trackUserSignup } from '@/lib/analytics/events.server'
 *
 * Usage:
 *   import { trackCheckoutStarted, trackCTAClicked } from '@/lib/analytics/events'
 *   trackCheckoutStarted({ plan: 'pro', priceId: 'price_xxx' })
 *
 * Error tracking:
 *   import { captureException } from '@/lib/analytics/events'
 *   captureException(error)
 *
 * Feature flags:
 *   import { getFeatureFlag } from '@/lib/analytics/events'
 *   const showNewPricing = getFeatureFlag('new-pricing-page')
 */

import posthog from 'posthog-js';

// ============================================================================
// HELPERS
// ============================================================================

/** Check if PostHog is available (client-side only) */
function isPostHogReady(): boolean {
  return typeof window !== 'undefined' && posthog.__loaded;
}

// ============================================================================
// CHECKOUT & PAYMENT EVENTS
// ============================================================================

/**
 * Track checkout started (client-side)
 */
export function trackCheckoutStarted(data: {
  plan: string;
  priceId: string;
  price?: number;
  currency?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('checkout_started', {
    plan: data.plan,
    price_id: data.priceId,
    price: data.price,
    currency: data.currency || 'USD',
  });
}

/**
 * Track purchase completed (client-side - for success page)
 */
export function trackPurchaseCompleted(data: {
  amount: number;
  currency?: string;
  plan: string;
  paymentMethod?: string;
  transactionId?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('purchase_completed', {
    amount: data.amount,
    currency: data.currency || 'USD',
    plan: data.plan,
    payment_method: data.paymentMethod || 'stripe',
    transaction_id: data.transactionId,
  });

  // Set user properties for revenue tracking
  posthog.setPersonProperties({
    lifetime_value: data.amount,
    purchase_date: new Date().toISOString(),
    plan: data.plan,
  });
}

/**
 * Track checkout failure (client-side)
 */
export function trackCheckoutFailed(data: {
  plan: string;
  errorCode?: string;
  errorMessage?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('checkout_failed', {
    plan: data.plan,
    error_code: data.errorCode,
    error_message: data.errorMessage,
  });
}

// ============================================================================
// CTA & NAVIGATION EVENTS
// ============================================================================

/**
 * Track CTA button clicks
 */
export function trackCTAClicked(data: {
  ctaText: string;
  ctaLocation: 'hero' | 'pricing' | 'footer' | 'header' | 'sidebar' | 'inline';
  page: string;
  variant?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('cta_clicked', {
    cta_text: data.ctaText,
    cta_location: data.ctaLocation,
    page: data.page,
    variant: data.variant,
  });
}

/**
 * Track pricing page viewed
 */
export function trackPricingViewed(data: {
  plans: string[];
  source?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('pricing_viewed', {
    plans: data.plans,
    source: data.source,
  });
}

/**
 * Track plan selected
 */
export function trackPlanSelected(data: {
  plan: string;
  price: number;
  billingCycle?: 'monthly' | 'yearly' | 'lifetime';
}) {
  if (!isPostHogReady()) return;

  posthog.capture('plan_selected', {
    plan: data.plan,
    price: data.price,
    billing_cycle: data.billingCycle || 'lifetime',
  });
}

/**
 * Track boilerplate downloaded
 */
export function trackBoilerplateDownloaded(data: {
  version: string;
  packageType?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('boilerplate_downloaded', {
    version: data.version,
    package_type: data.packageType || 'nextjs',
  });
}

// ============================================================================
// USER IDENTIFICATION
// ============================================================================

/**
 * Identify user (client-side)
 */
export function identifyUserClient(data: {
  id: string;
  email?: string;
  name?: string;
  plan?: string;
  purchaseDate?: string;
  lifetimeValue?: number;
}) {
  if (!isPostHogReady()) return;

  posthog.identify(data.id, {
    email: data.email,
    name: data.name,
    plan: data.plan,
    purchase_date: data.purchaseDate,
    lifetime_value: data.lifetimeValue,
  });
}

/**
 * Reset user identity (client-side - call on logout)
 */
export function resetUserIdentity() {
  if (!isPostHogReady()) return;

  posthog.reset();
}

// ============================================================================
// AUTH EVENTS
// ============================================================================

/**
 * Track sign in (client-side)
 */
export function trackSignIn(data: {
  method: 'email' | 'github' | 'google' | 'magic-link';
}) {
  if (!isPostHogReady()) return;

  posthog.capture('signed_in', {
    method: data.method,
  });
}

/**
 * Track sign up started (client-side)
 */
export function trackSignUpStarted(data: {
  method: 'email' | 'github' | 'google';
  source?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('signup_started', {
    method: data.method,
    source: data.source,
  });
}

// ============================================================================
// FEATURE USAGE EVENTS
// ============================================================================

/**
 * Track theme changed
 */
export function trackThemeChanged(data: {
  theme: string;
  previousTheme?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('theme_changed', {
    theme: data.theme,
    previous_theme: data.previousTheme,
  });
}

/**
 * Track component copied from library
 */
export function trackComponentCopied(data: {
  componentName: string;
  category?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('component_copied', {
    component_name: data.componentName,
    category: data.category,
  });
}

// ============================================================================
// ERROR TRACKING
// ============================================================================

/**
 * Capture an exception/error in PostHog
 * Use this in catch blocks for critical flows (checkout, auth, etc.)
 *
 * @example
 * try {
 *   await processPayment();
 * } catch (error) {
 *   captureException(error, { context: 'checkout', plan: 'pro' });
 * }
 */
export function captureException(
  error: Error | unknown,
  properties?: Record<string, unknown>
) {
  if (!isPostHogReady()) return;

  const errorObj = error instanceof Error ? error : new Error(String(error));

  posthog.capture('$exception', {
    $exception_message: errorObj.message,
    $exception_type: errorObj.name,
    $exception_stack_trace_raw: errorObj.stack,
    ...properties,
  });
}

// ============================================================================
// FEATURE FLAGS
// ============================================================================

/**
 * Get a feature flag value
 * Use for A/B testing pricing, copy, features
 *
 * @example
 * const showNewPricing = getFeatureFlag('new-pricing-page');
 * const priceVariant = getFeatureFlag('price-test'); // 'control' | 'variant-a' | 'variant-b'
 */
export function getFeatureFlag(flagKey: string): boolean | string | undefined {
  if (!isPostHogReady()) return undefined;

  return posthog.getFeatureFlag(flagKey);
}

/**
 * Check if a boolean feature flag is enabled
 */
export function isFeatureEnabled(flagKey: string): boolean {
  if (!isPostHogReady()) return false;

  return posthog.isFeatureEnabled(flagKey) ?? false;
}

/**
 * Get feature flag payload (for complex configs)
 */
export function getFeatureFlagPayload(flagKey: string): unknown {
  if (!isPostHogReady()) return undefined;

  return posthog.getFeatureFlagPayload(flagKey);
}

/**
 * Reload feature flags (useful after user identification)
 */
export function reloadFeatureFlags(): void {
  if (!isPostHogReady()) return;

  posthog.reloadFeatureFlags();
}

// ============================================================================
// EMAIL TRACKING
// ============================================================================

/**
 * Track email opened (call from email tracking pixel or webhook)
 */
export function trackEmailOpened(data: {
  emailId: string;
  emailType: 'welcome' | 'download' | 'onboarding' | 'marketing' | 'transactional';
  subject?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('email_opened', {
    email_id: data.emailId,
    email_type: data.emailType,
    subject: data.subject,
  });
}

/**
 * Track email link clicked
 */
export function trackEmailLinkClicked(data: {
  emailId: string;
  emailType: 'welcome' | 'download' | 'onboarding' | 'marketing' | 'transactional';
  linkUrl: string;
  linkText?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('email_link_clicked', {
    email_id: data.emailId,
    email_type: data.emailType,
    link_url: data.linkUrl,
    link_text: data.linkText,
  });
}

// ============================================================================
// SURVEY RESPONSES
// ============================================================================

/**
 * Track post-purchase survey response
 */
export function trackSurveyResponse(data: {
  surveyId: string;
  questionId: string;
  response: string | string[];
  questionText?: string;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('survey_response', {
    survey_id: data.surveyId,
    question_id: data.questionId,
    response: data.response,
    question_text: data.questionText,
  });
}

/**
 * Track survey completed
 */
export function trackSurveyCompleted(data: {
  surveyId: string;
  surveyName: string;
  responseCount: number;
}) {
  if (!isPostHogReady()) return;

  posthog.capture('survey_completed', {
    survey_id: data.surveyId,
    survey_name: data.surveyName,
    response_count: data.responseCount,
  });
}
