/**
 * Polar.sh Checkout API
 * Creates a checkout session for Fabrk purchase
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { createCheckoutSession, isPolarConfigured } from '@/lib/polar';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  // Rate limit: strict (10 requests/minute) for checkout
  const identifier = getClientIdentifier(request);
  const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.strict);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many checkout attempts. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'Retry-After': Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // Check if Polar is configured
  if (!isPolarConfigured()) {
    logger.warn('Polar checkout attempted but POLAR_ACCESS_TOKEN not configured');
    return NextResponse.json(
      { error: 'Payment system not configured. Please contact support.' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { email, discountId, metadata } = body;

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/purchase/success`;

    const checkout = await createCheckoutSession({
      customerEmail: email,
      successUrl,
      discountId,
      metadata,
    });

    logger.info('Polar checkout session created', { checkoutId: checkout.id });

    return NextResponse.json({
      checkoutUrl: checkout.url,
      checkoutId: checkout.id,
    });
  } catch (error) {
    logger.error('Polar checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    );
  }
}
