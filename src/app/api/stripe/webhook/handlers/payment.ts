/**
 * ✅ FABRK COMPONENT
 * Payment webhook handlers
 * Under 150 lines ✓
 */

import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

/**
 * Handle successful payment intent
 * Updates payment record status and user payment history
 */
export async function handlePaymentSucceeded(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;

  try {
    logger.info('Processing payment_intent.succeeded', {
      paymentIntentId: paymentIntent.id,
      customerId: paymentIntent.customer,
      amount: paymentIntent.amount,
    });

    const customerId = typeof paymentIntent.customer === 'string' ? paymentIntent.customer : null;

    // Find user by customer ID
    const user = customerId ? await prisma.user.findUnique({ where: { customerId } }) : null;

    // Update existing payment record if it exists
    const existingPayment = await prisma.payment.findFirst({
      where: { stripePaymentId: paymentIntent.id },
    });

    if (existingPayment) {
      await prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          status: 'succeeded',
          amount: paymentIntent.amount,
        },
      });
      logger.info('Updated existing payment record', {
        paymentId: existingPayment.id,
      });
    } else if (user) {
      // Create new payment record if user exists and no payment record found
      await prisma.payment.create({
        data: {
          userId: user.id,
          stripeId: paymentIntent.id,
          stripePaymentId: paymentIntent.id,
          amount: paymentIntent.amount,
          status: 'succeeded',
          productId: paymentIntent.metadata?.productId || 'unknown',
        },
      });
      logger.info('Created new payment record', {
        userId: user.id,
        amount: paymentIntent.amount,
      });
    } else {
      logger.warn('Payment succeeded but no user found', {
        paymentIntentId: paymentIntent.id,
        customerId,
      });
    }

    logger.info('Payment succeeded processed successfully', {
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: unknown) {
    logger.error('Error processing payment_intent.succeeded', error);
    throw error;
  }
}

/**
 * Handle failed payment intent
 * Updates payment record status and logs failure
 */
export async function handlePaymentFailed(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;

  try {
    logger.error('Processing payment_intent.payment_failed', {
      paymentIntentId: paymentIntent.id,
      customerId: paymentIntent.customer,
      amount: paymentIntent.amount,
      failureCode: paymentIntent.last_payment_error?.code,
      failureMessage: paymentIntent.last_payment_error?.message,
    });

    const customerId = typeof paymentIntent.customer === 'string' ? paymentIntent.customer : null;

    // Find user by customer ID
    const user = customerId ? await prisma.user.findUnique({ where: { customerId } }) : null;

    // Update existing payment record if it exists
    const existingPayment = await prisma.payment.findFirst({
      where: { stripePaymentId: paymentIntent.id },
    });

    if (existingPayment) {
      await prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          status: 'failed',
        },
      });
      logger.info('Updated payment record to failed status', {
        paymentId: existingPayment.id,
      });
    } else if (user) {
      // Create payment record with failed status
      await prisma.payment.create({
        data: {
          userId: user.id,
          stripeId: paymentIntent.id,
          stripePaymentId: paymentIntent.id,
          amount: paymentIntent.amount,
          status: 'failed',
          productId: paymentIntent.metadata?.productId || 'unknown',
        },
      });
      logger.info('Created failed payment record', {
        userId: user.id,
      });
    }

    logger.warn('Payment failed processed', {
      paymentIntentId: paymentIntent.id,
      failureCode: paymentIntent.last_payment_error?.code,
    });
  } catch (error: unknown) {
    logger.error('Error processing payment_intent.payment_failed', error);
    throw error;
  }
}
