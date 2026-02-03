/* 💡 PAYMENT TIP: Get your Stripe keys from https://dashboard.stripe.com/apikeys
 * Use test keys (sk_test_...) during development.
 * Switch to live keys (sk_live_...) when deploying to production.
 * Test webhook locally: stripe listen --forward-to localhost:3000/api/stripe/webhook
 */

/**
 * Stripe Client and Customer Management
 */

import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

// Initialize Stripe - OPTIONAL (only needed if using Stripe for payments)
// If not configured, Stripe functions will gracefully return null
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || '';

// Check if Stripe is configured
export const isStripeConfigured = !!STRIPE_KEY;

// No warning needed - route guards handle this gracefully

// Initialize Stripe client (use placeholder if not configured - won't be used)
export const stripe = new Stripe(STRIPE_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

/**
 * Get or create a Stripe customer for a user
 */
export async function getOrCreateCustomer(
  email: string,
  userId: string,
  existingCustomerId?: string | null
): Promise<string> {
  // Return existing customer ID if provided
  if (existingCustomerId) {
    return existingCustomerId;
  }

  // Check if user already has a customer ID
  const user = await prisma.user.findUnique({
    where: { email },
    select: { customerId: true },
  });

  if (user?.customerId) {
    return user.customerId;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  // Update user with customer ID
  await prisma.user.update({
    where: { email },
    data: { customerId: customer.id },
  });

  return customer.id;
}
