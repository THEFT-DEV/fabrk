/**
 * Server-Side Event Tracking
 *
 * Safe wrappers for PostHog server events.
 * Uses posthog-node (server-side only).
 *
 * For client-side tracking, use:
 *   import { trackCheckoutStarted } from '@/lib/analytics/events'
 *
 * Usage:
 *   import { trackUserSignup, trackPaymentSucceeded } from '@/lib/analytics/events.server'
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
 * Track payment failed (server-side)
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

/**
 * Track purchase completed (server-side - from webhook)
 */
export async function trackPurchaseCompletedServer(
  userId: string,
  data: {
    amount: number;
    currency?: string;
    plan: string;
    transactionId?: string;
    email?: string;
  }
): Promise<void> {
  await trackServerEvent(userId, 'purchase_completed', {
    amount: data.amount,
    currency: data.currency || 'USD',
    plan: data.plan,
    transaction_id: data.transactionId,
  });

  // Update user properties
  await identifyServerUser(userId, {
    email: data.email,
    lifetime_value: data.amount,
    purchase_date: new Date().toISOString(),
    plan: data.plan,
  });
}
