/* 💡 PAYMENT TIP: This handles Stripe webhook events (subscriptions, payments, etc).
 * Test locally: stripe listen --forward-to localhost:3000/api/stripe/webhook
 * Then run: stripe trigger payment_intent.succeeded
 * Update STRIPE_WEBHOOK_SECRET in .env after deploying (get from Stripe Dashboard → Webhooks).
 */

/**
 * @swagger
 * /api/stripe/webhook:
 *   post:
 *     summary: Stripe webhook event handler
 *     description: |
 *       Processes Stripe webhook events for payments and subscriptions.
 *       Handles subscription lifecycle and payment status updates.
 *
 *       **Supported Events:**
 *       - `customer.subscription.created` - New subscription created
 *       - `customer.subscription.updated` - Subscription plan or status changed
 *       - `customer.subscription.deleted` - Subscription cancelled or expired
 *       - `payment_intent.succeeded` - Payment completed successfully
 *       - `payment_intent.payment_failed` - Payment failed or declined
 *
 *       **Setup:** Configure in Stripe Dashboard:
 *       1. Go to Developers → Webhooks
 *       2. Add endpoint: `https://fabrk.dev/api/stripe/webhook`
 *       3. Select events: subscriptions and payment_intent
 *       4. Copy webhook signing secret to STRIPE_WEBHOOK_SECRET env var
 *     tags:
 *       - Payments
 *       - Webhooks
 *       - Stripe
 *     security: []
 *     parameters:
 *       - in: header
 *         name: Stripe-Signature
 *         required: true
 *         schema:
 *           type: string
 *         description: Stripe webhook signature for verification
 *         example: t=1492774577,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - type
 *               - data
 *             properties:
 *               id:
 *                 type: string
 *                 example: evt_1234567890abcdef
 *               type:
 *                 type: string
 *                 enum:
 *                   - customer.subscription.created
 *                   - customer.subscription.updated
 *                   - customer.subscription.deleted
 *                   - payment_intent.succeeded
 *                   - payment_intent.payment_failed
 *                 example: payment_intent.succeeded
 *               data:
 *                 type: object
 *                 description: Event-specific data object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 received:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid webhook signature
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid signature
 *       500:
 *         description: Webhook processing failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     x-webhook: true
 *     x-codeSamples:
 *       - lang: Stripe CLI
 *         source: |
 *           # Test webhook locally
 *           stripe listen --forward-to localhost:3000/api/stripe/webhook
 *
 *           # Trigger test events
 *           stripe trigger payment_intent.succeeded
 *           stripe trigger customer.subscription.created
 */

/**
 * ✅ FABRK COMPONENT
 * Stripe webhook handler - Modular
 * Under 150 lines ✓
 */

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { logger } from '@/lib/logger';
import { env } from '@/lib/env';
import { isWebhookEventProcessed, markWebhookEventProcessed } from '@/lib/stripe/idempotency';
import * as paymentHandlers from './handlers/payment';
import * as subscriptionHandlers from './handlers/subscription';
import * as checkoutHandlers from './handlers/checkout';
import { guardStripeRoute } from '@/lib/api/route-guards';

const STRIPE_KEY = env.server.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const stripe = new Stripe(STRIPE_KEY, {
  apiVersion: '2025-12-15.clover',
});

export async function POST(req: Request) {
  // Guard: Return 404 if Stripe not configured (marketing site uses Polar instead)
  const guard = guardStripeRoute();
  if (guard) return guard;

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    const webhookSecret = env.server.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: unknown) {
    logger.error('Webhook signature verification failed', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Check if event was already processed (idempotency)
  const alreadyProcessed = await isWebhookEventProcessed(event.id);
  if (alreadyProcessed) {
    logger.info('Webhook event already processed, returning 200', {
      eventId: event.id,
      eventType: event.type,
    });
    return NextResponse.json({ received: true, duplicate: true });
  }

  // Mark event as processed BEFORE handling to prevent race conditions
  await markWebhookEventProcessed(event.id);

  try {
    // Route to appropriate handler
    switch (event.type) {
      case 'checkout.session.completed':
        await checkoutHandlers.handleCheckoutCompleted(event);
        break;
      case 'customer.subscription.created':
        await subscriptionHandlers.handleSubscriptionCreated(event);
        break;
      case 'customer.subscription.updated':
        await subscriptionHandlers.handleSubscriptionUpdated(event);
        break;
      case 'customer.subscription.deleted':
        await subscriptionHandlers.handleSubscriptionDeleted(event);
        break;
      case 'payment_intent.succeeded':
        await paymentHandlers.handlePaymentSucceeded(event);
        break;
      case 'payment_intent.payment_failed':
        await paymentHandlers.handlePaymentFailed(event);
        break;
      default:
        logger.info('Unhandled webhook event type', { eventType: event.type });
    }

    logger.info('Webhook event processed successfully', {
      eventId: event.id,
      eventType: event.type,
    });

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    logger.error('Webhook handler error', {
      eventId: event.id,
      eventType: event.type,
      error,
    });

    // Return 200 to prevent Stripe from retrying
    // The event is already marked as processed
    return NextResponse.json({
      received: true,
      error: 'Handler failed but event marked as processed',
    });
  }
}
