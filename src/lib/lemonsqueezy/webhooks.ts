/**
 * Lemon Squeezy Webhook Handlers
 * Process webhook events from Lemon Squeezy
 */

import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { sendWelcomeEmail } from '@/lib/email';
import { generateLicenseKey } from '@/lib/license';

/**
 * Lemon Squeezy Webhook Event Types
 */
export type LemonSqueezyEventType =
  | 'order_created'
  | 'order_refunded'
  | 'subscription_created'
  | 'subscription_updated'
  | 'subscription_cancelled'
  | 'subscription_resumed'
  | 'subscription_expired'
  | 'subscription_paused'
  | 'subscription_unpaused'
  | 'subscription_payment_success'
  | 'subscription_payment_failed'
  | 'subscription_payment_recovered'
  | 'license_key_created'
  | 'license_key_updated';

/**
 * Webhook payload structure
 */
export interface LemonSqueezyWebhookPayload {
  meta: {
    event_name: LemonSqueezyEventType;
    custom_data?: {
      user_id?: string;
      [key: string]: string | undefined;
    };
  };
  data: {
    id: string;
    type: string;
    attributes: {
      store_id: number;
      customer_id: number;
      order_id?: number;
      order_number?: number;
      user_email: string;
      user_name: string;
      status: string;
      total: number;
      total_formatted: string;
      currency: string;
      refunded: boolean;
      refunded_at: string | null;
      created_at: string;
      updated_at: string;
      first_order_item?: {
        id: number;
        price: number;
        product_id: number;
        variant_id: number;
        product_name: string;
        variant_name: string;
      };
      urls?: {
        customer_portal: string;
      };
    };
  };
}

/**
 * Verify Lemon Squeezy webhook signature
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    logger.error('LEMONSQUEEZY_WEBHOOK_SECRET is not configured');
    return false;
  }

  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(rawBody).digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

/**
 * Handle order_created event
 */
export async function handleOrderCreated(payload: LemonSqueezyWebhookPayload): Promise<void> {
  const { data, meta } = payload;
  const attributes = data.attributes;

  logger.info('Processing Lemon Squeezy order_created', {
    orderId: data.id,
    email: attributes.user_email,
  });

  try {
    const customerEmail = attributes.user_email;
    const userId = meta.custom_data?.user_id;
    const _isGuestPurchase = !userId || userId === 'guest';

    // Generate license key
    const licenseKey = generateLicenseKey();

    // Determine tier from product
    const tier = attributes.first_order_item?.variant_name?.toLowerCase() || 'professional';

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
        name: attributes.user_name || null,
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
        stripeId: `ls_${data.id}`, // Prefix to distinguish from Stripe
        stripePaymentId: `ls_order_${data.id}`,
        amount: attributes.total,
        status: 'succeeded',
        productId: tier,
      },
    });

    // Send welcome email
    await sendWelcomeEmail(customerEmail, attributes.user_name || 'Customer', licenseKey);

    logger.info('Lemon Squeezy order processed successfully', {
      userId: user.id,
      email: customerEmail,
      tier,
    });
  } catch (error) {
    logger.error('Error processing Lemon Squeezy order:', error);
    throw error;
  }
}

/**
 * Handle subscription_created event
 */
export async function handleSubscriptionCreated(
  payload: LemonSqueezyWebhookPayload
): Promise<void> {
  const { data, meta: _meta } = payload;
  const attributes = data.attributes;

  logger.info('Processing Lemon Squeezy subscription_created', {
    subscriptionId: data.id,
    email: attributes.user_email,
  });

  try {
    const customerEmail = attributes.user_email;

    // Generate license key for subscription
    const licenseKey = generateLicenseKey();
    const tier = attributes.first_order_item?.variant_name?.toLowerCase() || 'professional';

    // Upsert user with subscription details
    // Store Lemon Squeezy subscription in customerId with ls_sub_ prefix
    const user = await prisma.user.upsert({
      where: { email: customerEmail },
      update: {
        licenseKey,
        tier,
        subscriptionTier: tier,
        customerId: `ls_sub_${data.id}`,
      },
      create: {
        email: customerEmail,
        name: attributes.user_name || null,
        licenseKey,
        tier,
        subscriptionTier: tier,
        customerId: `ls_sub_${data.id}`,
        emailVerified: new Date(),
      },
    });

    logger.info('Lemon Squeezy subscription created', {
      userId: user.id,
      subscriptionId: data.id,
    });
  } catch (error) {
    logger.error('Error processing Lemon Squeezy subscription:', error);
    throw error;
  }
}

/**
 * Handle subscription_cancelled event
 */
export async function handleSubscriptionCancelled(
  payload: LemonSqueezyWebhookPayload
): Promise<void> {
  const { data } = payload;
  const attributes = data.attributes;

  logger.info('Processing Lemon Squeezy subscription_cancelled', {
    subscriptionId: data.id,
    email: attributes.user_email,
  });

  try {
    // Find user by customerId (Lemon Squeezy subscription ID stored with prefix)
    const user = await prisma.user.findFirst({
      where: { customerId: `ls_sub_${data.id}` },
    });

    if (user) {
      // Update subscription status (keep access until end of period)
      await prisma.user.update({
        where: { id: user.id },
        data: {
          // Note: In a full implementation, you'd track cancellation date
          // and downgrade at end of billing period
        },
      });

      logger.info('Lemon Squeezy subscription cancelled', {
        userId: user.id,
        subscriptionId: data.id,
      });
    }
  } catch (error) {
    logger.error('Error processing Lemon Squeezy subscription cancellation:', error);
    throw error;
  }
}

/**
 * Handle order_refunded event
 */
export async function handleOrderRefunded(payload: LemonSqueezyWebhookPayload): Promise<void> {
  const { data } = payload;

  logger.info('Processing Lemon Squeezy order_refunded', {
    orderId: data.id,
    email: data.attributes.user_email,
  });

  try {
    // Update payment status
    await prisma.payment.updateMany({
      where: { stripeId: `ls_${data.id}` },
      data: { status: 'refunded' },
    });

    // Optionally revoke license
    const user = await prisma.user.findUnique({
      where: { email: data.attributes.user_email },
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

    logger.info('Lemon Squeezy order refunded', { orderId: data.id });
  } catch (error) {
    logger.error('Error processing Lemon Squeezy refund:', error);
    throw error;
  }
}
