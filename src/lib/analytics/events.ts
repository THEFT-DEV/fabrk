/**
 * Event Tracking Helpers
 *
 * Safe wrappers for common analytics events.
 * Automatically falls back if PostHog is not configured.
 *
 * Usage:
 *   import { trackUserSignup } from '@/lib/analytics/events'
 *   await trackUserSignup(userId, email)
 */

import { trackServerEvent, identifyServerUser } from './posthog-server';

/**
 * Track user signup
 */
export async function trackUserSignup(
  userId: string,
  email: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  await trackServerEvent(userId, 'user_signed_up', {
    email,
    signupMethod: metadata?.provider || 'credentials',
    ...metadata,
  });

  // Identify user
  await identifyServerUser(userId, {
    email,
    createdAt: new Date().toISOString(),
    ...metadata,
  });
}

/**
 * Track user login
 */
export async function trackUserLogin(
  userId: string,
  email: string,
  method?: string
): Promise<void> {
  await trackServerEvent(userId, 'user_logged_in', {
    email,
    method: method || 'credentials',
  });
}

/**
 * Track organization creation
 */
export async function trackOrgCreated(
  userId: string,
  orgId: string,
  orgName: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  await trackServerEvent(userId, 'org_created', {
    orgId,
    orgName,
    ...metadata,
  });
}

/**
 * Track subscription started
 */
export async function trackSubscriptionStarted(
  userId: string,
  plan: string,
  amount: number,
  interval: 'month' | 'year'
): Promise<void> {
  await trackServerEvent(userId, 'subscription_started', {
    plan,
    amount,
    interval,
  });
}

/**
 * Track payment succeeded
 */
export async function trackPaymentSucceeded(
  userId: string,
  amount: number,
  metadata?: Record<string, unknown>
): Promise<void> {
  await trackServerEvent(userId, 'payment_succeeded', {
    amount,
    ...metadata,
  });
}

/**
 * Track payment failed
 */
export async function trackPaymentFailed(
  userId: string,
  amount: number,
  errorMessage?: string
): Promise<void> {
  await trackServerEvent(userId, 'payment_failed', {
    amount,
    errorMessage,
  });
}
