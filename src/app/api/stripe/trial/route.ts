/**
 * Trial Period Checkout API Route
 * POST /api/stripe/trial
 *
 * Creates a Stripe checkout session for starting a free trial.
 * Uses subscription mode with trial_period_days to allow trial-to-paid conversion.
 */

import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { withRateLimit } from '@/lib/rate-limit/middleware';
import { getOrCreateCustomer, stripe } from '@/lib/stripe/client';
import { STRIPE_CONFIG } from '@/config/stripe';
import config from '@/config/app';
import { NextRequest, NextResponse } from 'next/server';

async function trialHandler(req: NextRequest) {
  try {
    // Trial period must be enabled
    if (!config.features.trialPeriod) {
      return NextResponse.json(
        { error: 'Trial period is not currently available' },
        { status: 400 }
      );
    }

    const session = await auth();
    const body = await req.json();
    const { priceId } = body as { priceId: string };

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required for trial' }, { status: 400 });
    }

    // User must be authenticated to start a trial
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Please sign in to start your free trial' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user already had a trial
    if (user.trialEndsAt) {
      return NextResponse.json({ error: 'You have already used your free trial' }, { status: 400 });
    }

    // Check if user already has a subscription
    if (user.subscriptionTier && user.tier !== 'free') {
      return NextResponse.json(
        { error: 'You already have an active subscription' },
        { status: 400 }
      );
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

    // Create subscription checkout with trial period
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: config.features.trialDays || 14,
        metadata: {
          userId: user.id,
          trialStart: new Date().toISOString(),
        },
      },
      success_url: `${STRIPE_CONFIG.successUrl}&trial=true`,
      cancel_url: STRIPE_CONFIG.cancelUrl,
      metadata: {
        userId: user.id,
        isTrial: 'true',
      },
    });

    logger.info('Created trial checkout session', {
      sessionId: checkoutSession.id,
      userId: user.id,
      trialDays: config.features.trialDays,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: unknown) {
    logger.error('Trial checkout error:', error);
    return NextResponse.json({ error: 'Failed to create trial checkout session' }, { status: 500 });
  }
}

// Apply rate limiting: 5 requests per minute for trial endpoints
export const POST = withRateLimit(trialHandler, 'payment');
