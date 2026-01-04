/**
 * @swagger
 * /api/stripe/setup-intent:
 *   post:
 *     summary: Create Stripe Checkout session for adding payment methods
 *     description: |
 *       Creates a Stripe Checkout session in setup mode that allows users to securely add
 *       payment methods without an immediate charge. Used for saving cards
 *       for future use, subscriptions, or recurring payments.
 *
 *       **Flow:**
 *       1. User clicks "Add Payment Method"
 *       2. Frontend calls this endpoint
 *       3. Returns checkout URL to redirect user to Stripe
 *       4. User enters card details on Stripe-hosted checkout page
 *       5. Stripe redirects back to success_url with payment method saved
 *       6. Webhook handles setup_intent.succeeded event
 *
 *       **Features:**
 *       - No immediate charge
 *       - Automatic customer creation if needed
 *       - Secure card tokenization via Stripe Checkout
 *       - PCI compliance built-in
 *       - Consistent with other payment flows in the app
 *     tags:
 *       - Payments
 *       - Stripe
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   format: uri
 *                   example: https://checkout.stripe.com/c/pay/cs_test_abc123
 *                   description: Stripe checkout URL to redirect user to
 *                 customerId:
 *                   type: string
 *                   example: cus_1234567890abcdef
 *                   description: Stripe customer ID
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized - Please sign in
 *       404:
 *         description: User not found in database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Failed to create SetupIntent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create setup intent
 *     x-codeSamples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/stripe/setup-intent', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *           });
 *
 *           const { url } = await response.json();
 *
 *           // Redirect to Stripe Checkout
 *           window.location.href = url;
 *       - lang: curl
 *         source: |
 *           curl -X POST https://fabrk.dev/api/stripe/setup-intent \
 *             -H "Content-Type: application/json" \
 *             -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
 */

/**
 * ✅ FABRK API ROUTE
 * Stripe Checkout Session Creation (Setup Mode)
 * Allows users to add payment methods without immediate charge
 */

import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { withRateLimit } from '@/lib/rate-limit/middleware';
import { getOrCreateCustomer, stripe } from '@/lib/stripe/client';
import { NextRequest, NextResponse } from 'next/server';

async function setupIntentHandler(_req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get or create Stripe customer
    const customerId = await getOrCreateCustomer(user.email, user.id, user.customerId);

    // Update user with customer ID if newly created
    if (!user.customerId) {
      await prisma.user.update({
        where: { id: user.id },
        data: { customerId },
      });
    }

    // Create Checkout Session in setup mode
    // This allows users to add payment methods without an immediate charge
    // Using Checkout is consistent with the rest of the codebase
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'setup',
      payment_method_types: ['card'],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/payment-methods?setup=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/payment-methods?setup=cancelled`,
      metadata: {
        userId: user.id,
      },
    });

    logger.info('Created SetupIntent Checkout Session', {
      userId: user.id,
      customerId,
      sessionId: checkoutSession.id,
    });

    return NextResponse.json({
      url: checkoutSession.url,
      customerId,
    });
  } catch (error: unknown) {
    logger.error('SetupIntent creation error:', error);
    return NextResponse.json({ error: 'Failed to create setup intent' }, { status: 500 });
  }
}

// Apply rate limiting: 10 requests per minute for payment endpoints
export const POST = withRateLimit(setupIntentHandler, 'payment');
