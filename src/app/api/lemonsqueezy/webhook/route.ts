import { NextRequest, NextResponse } from 'next/server';
import {
  verifyWebhookSignature,
  handleOrderCreated,
  handleSubscriptionCreated,
  handleSubscriptionCancelled,
  handleOrderRefunded,
  type LemonSqueezyWebhookPayload,
} from '@/lib/lemonsqueezy';
import { logger } from '@/lib/logger';
import { guardLemonsqueezyRoute } from '@/lib/api/route-guards';

/**
 * POST /api/lemonsqueezy/webhook
 * Handle Lemon Squeezy webhook events
 */
export async function POST(req: NextRequest) {
  // Guard: Return 404 if Lemonsqueezy not configured (marketing site uses Polar instead)
  const guard = guardLemonsqueezyRoute();
  if (guard) return guard;

  try {
    // Get raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature');

    if (!signature) {
      logger.warn('Lemon Squeezy webhook missing signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      logger.warn('Lemon Squeezy webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse payload
    const payload: LemonSqueezyWebhookPayload = JSON.parse(rawBody);
    const eventType = payload.meta.event_name;

    logger.info('Lemon Squeezy webhook received', {
      eventType,
      orderId: payload.data.id,
    });

    // Handle different event types
    switch (eventType) {
      case 'order_created':
        await handleOrderCreated(payload);
        break;

      case 'order_refunded':
        await handleOrderRefunded(payload);
        break;

      case 'subscription_created':
        await handleSubscriptionCreated(payload);
        break;

      case 'subscription_cancelled':
      case 'subscription_expired':
        await handleSubscriptionCancelled(payload);
        break;

      case 'subscription_updated':
      case 'subscription_resumed':
      case 'subscription_paused':
      case 'subscription_unpaused':
      case 'subscription_payment_success':
      case 'subscription_payment_failed':
      case 'subscription_payment_recovered':
        // Log but don't fail on unhandled subscription events
        logger.info(`Unhandled Lemon Squeezy event: ${eventType}`, {
          subscriptionId: payload.data.id,
        });
        break;

      case 'license_key_created':
      case 'license_key_updated':
        // Log license key events
        logger.info(`Lemon Squeezy license event: ${eventType}`, {
          id: payload.data.id,
        });
        break;

      default:
        logger.warn(`Unknown Lemon Squeezy event type: ${eventType}`);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Error processing Lemon Squeezy webhook:', error);
    // Return 200 anyway to prevent retries for parsing errors
    return NextResponse.json({ received: true, error: 'Processing error' });
  }
}
