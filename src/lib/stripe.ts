/**
 * Stripe Integration - ShipFast Style
 * All Stripe logic in one file
 */

import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import crypto from 'crypto';
import { logger } from '@/lib/logger';
import { env } from '@/lib/env';

// Initialize Stripe - OPTIONAL (only needed if using Stripe for payments)
// If not configured, Stripe functions will gracefully return null
const STRIPE_KEY = env.server.STRIPE_SECRET_KEY || '';

// Check if Stripe is configured
export const isStripeConfigured = !!STRIPE_KEY;

// No warning needed - route guards handle this gracefully

// Initialize Stripe client (use placeholder if not configured - won't be used)
export const stripe = new Stripe(STRIPE_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

// ===========================
// CUSTOMER MANAGEMENT
// ===========================

/**
 * Get existing Stripe customer or create a new one
 * @param userId - User ID from database
 * @param email - Customer email address
 * @param name - Optional customer name
 * @returns Stripe customer ID
 * @example
 * const customerId = await getOrCreateCustomer("user123", "user@example.com", "John Doe")
 */
export async function getOrCreateCustomer(
  userId: string,
  email: string,
  name?: string | null
): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { customerId: true },
  });

  if (user?.customerId) return user.customerId;

  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
    metadata: { userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { customerId: customer.id },
  });

  return customer.id;
}

// ===========================
// CHECKOUT IDEMPOTENCY
// ===========================

/**
 * Generate unique idempotency key for checkout session
 * @param userId - User ID from database
 * @param priceId - Stripe price ID
 * @returns Unique idempotency key with timestamp and random bytes
 * @example
 * const key = generateIdempotencyKey("user123", "price_abc")
 * // Returns: "checkout_user123_price_abc_1699123456789_a1b2c3d4"
 */
export function generateIdempotencyKey(userId: string, priceId: string): string {
  const timestamp = Date.now();
  const random = crypto.randomBytes(8).toString('hex');
  return `checkout_${userId}_${priceId}_${timestamp}_${random}`;
}

/**
 * Retrieves an existing unexpired checkout session for a user
 * Used to prevent duplicate checkout sessions when user refreshes the page
 *
 * @param key - Idempotency key (contains userId)
 * @returns Stripe session ID if found, null otherwise
 *
 * @example
 * ```typescript
 * const existingSessionId = await getExistingCheckout("checkout_user123_price_abc_...");
 * if (existingSessionId) {
 *   const session = await stripe.checkout.sessions.retrieve(existingSessionId);
 *   return session.url;
 * }
 * ```
 */
export async function getExistingCheckout(key: string): Promise<string | null> {
  const record = await prisma.checkoutSession.findFirst({
    where: {
      userId: key.split('_')[1], // Extract userId from key
      expiresAt: { gt: new Date() },
    },
    select: { sessionId: true },
    orderBy: { createdAt: 'desc' },
  });

  return record?.sessionId || null;
}

/**
 * Stores a checkout session record for idempotency tracking
 * Records expire after 24 hours (matching Stripe's session expiration)
 *
 * @param key - Unique idempotency key
 * @param userId - User ID from database
 * @param sessionId - Stripe checkout session ID
 * @param priceId - Stripe price ID
 *
 * @example
 * ```typescript
 * await storeCheckoutSession(
 *   "checkout_user123_price_abc_...",
 *   "user123",
 *   "cs_test_...",
 *   "price_abc"
 * );
 * ```
 */
export async function storeCheckoutSession(
  key: string,
  userId: string,
  sessionId: string,
  priceId: string
): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  await prisma.checkoutSession.create({
    data: { userId, sessionId, priceId, expiresAt },
  });
}

// ===========================
// WEBHOOK IDEMPOTENCY
// ===========================

/**
 * Checks if a Stripe webhook event has already been processed
 * Prevents duplicate processing of the same webhook event
 *
 * @param eventId - Stripe event ID (evt_xxx)
 * @returns True if event was previously processed, false otherwise
 *
 * @example
 * ```typescript
 * if (await isWebhookProcessed(event.id)) {
 *   // Event already processed, skipping
 *   return;
 * }
 * ```
 */
export async function isWebhookProcessed(eventId: string): Promise<boolean> {
  const record = await prisma.webhookEvent.findUnique({
    where: { eventId },
  });
  return record !== null;
}

/**
 * Marks a Stripe webhook event as processed
 * Creates a database record to track processed events and prevent duplicates
 *
 * @param eventId - Stripe event ID (evt_xxx)
 *
 * @example
 * ```typescript
 * await markWebhookProcessed(event.id);
 * // Event marked as processed
 * ```
 */
export async function markWebhookProcessed(eventId: string): Promise<void> {
  await prisma.webhookEvent.create({
    data: { eventId, processed: new Date() },
  });
}

// ===========================
// CHECKOUT SESSION
// ===========================

/**
 * Create a Stripe checkout session for one-time payment
 * @param userId - User ID from database
 * @param priceId - Stripe price ID for the product
 * @param email - Customer email address
 * @param name - Optional customer name
 * @returns Checkout session URL for redirect
 * @throws Error if session creation fails
 * @example
 * const url = await createCheckoutSession(
 *   "user123",
 *   "price_abc",
 *   "user@example.com",
 *   "John Doe"
 * )
 * // Redirect user to url
 */
export async function createCheckoutSession(
  userId: string,
  priceId: string,
  email: string,
  name?: string | null
): Promise<string> {
  // Check for existing checkout (prevent duplicates on refresh)
  const idempotencyKey = generateIdempotencyKey(userId, priceId);
  const existingSession = await getExistingCheckout(idempotencyKey);
  if (existingSession) {
    const session = await stripe.checkout.sessions.retrieve(existingSession);
    return session.url || '';
  }

  // Get or create Stripe customer
  const customerId = await getOrCreateCustomer(userId, email, name);

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'payment', // one-time payment (use "subscription" for recurring)
    success_url: `${env.client.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${env.client.NEXT_PUBLIC_APP_URL}/pricing`,
    allow_promotion_codes: true,
    metadata: { userId, priceId },
  });

  // Store session for idempotency
  await storeCheckoutSession(idempotencyKey, userId, session.id, priceId);

  return session.url || '';
}

// ===========================
// WEBHOOK HANDLING
// ===========================

/**
 * Handle Stripe checkout.session.completed webhook event
 * Updates user tier and records payment in database
 * @param session - Stripe checkout session object from webhook
 * @returns Promise<void>
 * @example
 * // In webhook handler:
 * if (event.type === "checkout.session.completed") {
 *   await handleCheckoutCompleted(event.data.object)
 * }
 */
export async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  if (!userId) {
    logger.error('No userId in session metadata');
    return;
  }

  // Update user tier based on price
  const priceId = session.metadata?.priceId || '';
  const tier = getTierFromPrice(priceId);

  await prisma.user.update({
    where: { id: userId },
    data: { tier, customerId: session.customer as string },
  });

  // Record payment
  await prisma.payment.create({
    data: {
      userId,
      stripeId: session.payment_intent as string,
      amount: session.amount_total || 0,
      status: 'succeeded', // Simple string status
      productId: priceId,
    },
  });

  logger.info('✓ Checkout completed for user:', userId);
}

// Helper: Map price ID to tier
function getTierFromPrice(priceId: string): string {
  // Get from config.js or env vars
  if (priceId === env.client.NEXT_PUBLIC_STRIPE_PRICE_STARTER) return 'starter';
  if (priceId === env.client.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL) return 'pro';
  return 'free';
}
// Test comment
// Test ESLint hook
