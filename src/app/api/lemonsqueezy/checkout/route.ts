import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { createLemonSqueezyCheckout, getVariantIdForTier } from '@/lib/lemonsqueezy';
import { logger } from '@/lib/logger';
import { guardLemonsqueezyRoute } from '@/lib/api/route-guards';

/**
 * POST /api/lemonsqueezy/checkout
 * Create a Lemon Squeezy checkout session
 */
export async function POST(req: NextRequest) {
  // Guard: Return 404 if Lemonsqueezy not configured (marketing site uses Polar instead)
  const guard = guardLemonsqueezyRoute();
  if (guard) return guard;

  try {
    // Rate limit
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.strict);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { tier, email, name, variantId: customVariantId } = body;

    // Validate tier or custom variant ID
    if (!tier && !customVariantId) {
      return NextResponse.json({ error: 'Either tier or variantId is required' }, { status: 400 });
    }

    // Get session for logged-in users
    const session = await auth();
    const userId = session?.user?.id || 'guest';
    const customerEmail = email || session?.user?.email;
    const customerName = name || session?.user?.name;

    // Get variant ID
    const variantId = customVariantId || getVariantIdForTier(tier);

    // Create checkout
    const { checkoutUrl, checkoutId } = await createLemonSqueezyCheckout({
      variantId,
      email: customerEmail,
      name: customerName,
      userId,
      customData: {
        tier: tier || 'custom',
      },
    });

    logger.info('Lemon Squeezy checkout created', {
      checkoutId,
      userId,
      tier,
    });

    return NextResponse.json({
      checkoutUrl,
      checkoutId,
    });
  } catch (error) {
    logger.error('Error creating Lemon Squeezy checkout:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
