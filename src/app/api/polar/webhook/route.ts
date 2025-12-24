import { NextRequest, NextResponse } from 'next/server';
import { validateEvent } from '@polar-sh/sdk/webhooks';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { sendWelcomeEmail } from '@/lib/email';
import { generateLicenseKey } from '@/lib/license';

/**
 * POST /api/polar/webhook
 * Handle Polar.sh webhook events
 *
 * Supported events:
 * - order.created: New purchase completed
 * - order.refunded: Order was refunded
 * - subscription.created: New subscription started
 * - subscription.canceled: Subscription was canceled
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const secret = process.env.POLAR_WEBHOOK_SECRET;

    if (!secret) {
      logger.warn('POLAR_WEBHOOK_SECRET is not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    // Get headers for signature verification
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Validate and parse the webhook event using Polar SDK
    let event;
    try {
      event = validateEvent(rawBody, headers, secret);
    } catch (error) {
      logger.warn('Polar webhook signature verification failed', { error });
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const eventType = event.type;
    logger.info('Polar webhook received', { eventType });

    // Handle different event types
    switch (eventType) {
      case 'order.created':
        await handleOrderCreated(event.data);
        break;

      case 'order.paid':
        await handleOrderPaid(event.data);
        break;

      case 'order.refunded':
        await handleOrderRefunded(event.data);
        break;

      case 'subscription.created':
        await handleSubscriptionCreated(event.data);
        break;

      case 'subscription.canceled':
        await handleSubscriptionCanceled(event.data);
        break;

      default:
        logger.info('Unhandled Polar webhook event', { eventType });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    logger.error('Error processing Polar webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

/**
 * Handle order.created event
 */
async function handleOrderCreated(data: {
  id: string;
  customer: { email: string; name?: string | null };
  product: { name: string } | null;
  metadata?: Record<string, string | number | boolean>;
}) {
  logger.info('Processing Polar order.created', {
    orderId: data.id,
    email: data.customer.email,
  });

  try {
    const customerEmail = data.customer.email;
    const customerName = data.customer.name || null;

    // Generate license key
    const licenseKey = generateLicenseKey();

    // Determine tier from product name
    const tier = data.product?.name?.toLowerCase().includes('team')
      ? 'team'
      : data.product?.name?.toLowerCase().includes('enterprise')
        ? 'enterprise'
        : 'professional';

    // Upsert user
    const user = await prisma.user.upsert({
      where: { email: customerEmail },
      update: {
        licenseKey,
        tier,
        subscriptionTier: tier,
      },
      create: {
        email: customerEmail,
        name: customerName,
        licenseKey,
        tier,
        subscriptionTier: tier,
        emailVerified: new Date(), // Auto-verify since they paid
      },
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: user.id,
        stripeId: `polar_${data.id}`, // Prefix to distinguish from Stripe
        stripePaymentId: `polar_order_${data.id}`,
        amount: 0, // Polar sends amount in separate field if needed
        status: 'succeeded',
        productId: tier,
      },
    });

    // Send welcome email
    await sendWelcomeEmail(customerEmail, customerName || 'Customer', licenseKey);

    logger.info('Polar order processed successfully', {
      userId: user.id,
      email: customerEmail,
      tier,
    });
  } catch (error) {
    logger.error('Error processing Polar order:', error);
    throw error;
  }
}

/**
 * Handle order.paid event (alternative to order.created for some flows)
 */
async function handleOrderPaid(data: {
  id: string;
  customer: { email: string; name?: string | null };
  product: { name: string } | null;
}) {
  // Same logic as order.created - Polar may send either depending on flow
  await handleOrderCreated(data);
}

/**
 * Handle order.refunded event
 */
async function handleOrderRefunded(data: { id: string; customer: { email: string } }) {
  logger.info('Processing Polar order.refunded', {
    orderId: data.id,
    email: data.customer.email,
  });

  try {
    // Update payment status
    await prisma.payment.updateMany({
      where: { stripeId: `polar_${data.id}` },
      data: { status: 'refunded' },
    });

    // Revoke license
    const user = await prisma.user.findUnique({
      where: { email: data.customer.email },
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          tier: 'free',
          subscriptionTier: 'free',
          licenseKey: null,
        },
      });
    }

    logger.info('Polar order refunded', { orderId: data.id });
  } catch (error) {
    logger.error('Error processing Polar refund:', error);
    throw error;
  }
}

/**
 * Handle subscription.created event
 */
async function handleSubscriptionCreated(data: {
  id: string;
  customer: { email: string; name?: string | null };
  product: { name: string } | null;
}) {
  logger.info('Processing Polar subscription.created', {
    subscriptionId: data.id,
    email: data.customer.email,
  });

  try {
    const customerEmail = data.customer.email;
    const customerName = data.customer.name || null;

    // Generate license key
    const licenseKey = generateLicenseKey();
    const tier = data.product?.name?.toLowerCase().includes('team')
      ? 'team'
      : data.product?.name?.toLowerCase().includes('enterprise')
        ? 'enterprise'
        : 'professional';

    // Upsert user with subscription details
    const user = await prisma.user.upsert({
      where: { email: customerEmail },
      update: {
        licenseKey,
        tier,
        subscriptionTier: tier,
        customerId: `polar_sub_${data.id}`,
      },
      create: {
        email: customerEmail,
        name: customerName,
        licenseKey,
        tier,
        subscriptionTier: tier,
        customerId: `polar_sub_${data.id}`,
        emailVerified: new Date(),
      },
    });

    logger.info('Polar subscription created', {
      userId: user.id,
      subscriptionId: data.id,
    });
  } catch (error) {
    logger.error('Error processing Polar subscription:', error);
    throw error;
  }
}

/**
 * Handle subscription.canceled event
 */
async function handleSubscriptionCanceled(data: { id: string }) {
  logger.info('Processing Polar subscription.canceled', {
    subscriptionId: data.id,
  });

  try {
    // Find user by customerId
    const user = await prisma.user.findFirst({
      where: { customerId: `polar_sub_${data.id}` },
    });

    if (user) {
      // Note: Keep access until end of billing period in production
      // For now, just log the cancellation
      logger.info('Polar subscription canceled', {
        userId: user.id,
        subscriptionId: data.id,
      });
    }
  } catch (error) {
    logger.error('Error processing Polar subscription cancellation:', error);
    throw error;
  }
}
