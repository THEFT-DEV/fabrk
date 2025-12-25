/**
 * Lemon Squeezy Checkout
 * Create checkout sessions for one-time and subscription payments
 */

import { createCheckout, type NewCheckout } from '@lemonsqueezy/lemonsqueezy.js';
import { initLemonSqueezy, getStoreId } from './client';
import { logger } from '@/lib/logger';

export interface CheckoutOptions {
  variantId: string;
  email?: string;
  name?: string;
  userId?: string;
  customData?: Record<string, string>;
  redirectUrl?: string;
  receiptButtonText?: string;
  receiptLinkUrl?: string;
  receiptThankYouNote?: string;
  enabledVariants?: number[];
}

export interface CheckoutResult {
  checkoutUrl: string;
  checkoutId: string;
}

/**
 * Create a Lemon Squeezy checkout session
 * @param options - Checkout options
 * @returns Checkout URL and ID
 */
export async function createLemonSqueezyCheckout(
  options: CheckoutOptions
): Promise<CheckoutResult> {
  try {
    initLemonSqueezy();
    const storeId = getStoreId();

    const checkoutData: NewCheckout = {
      productOptions: {
        enabledVariants: options.enabledVariants,
        redirectUrl: options.redirectUrl || `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        receiptButtonText: options.receiptButtonText || 'Go to Dashboard',
        receiptLinkUrl: options.receiptLinkUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        receiptThankYouNote: options.receiptThankYouNote || 'Thank you for your purchase!',
      },
      checkoutOptions: {
        embed: false,
        media: true,
        logo: true,
      },
      checkoutData: {
        email: options.email,
        name: options.name,
        custom: {
          user_id: options.userId || 'guest',
          ...options.customData,
        },
      },
    };

    const { data, error } = await createCheckout(storeId, options.variantId, checkoutData);

    if (error) {
      logger.error('Lemon Squeezy checkout error:', error);
      throw new Error(`Failed to create checkout: ${error.message}`);
    }

    if (!data?.data?.attributes?.url) {
      throw new Error('No checkout URL returned from Lemon Squeezy');
    }

    return {
      checkoutUrl: data.data.attributes.url,
      checkoutId: data.data.id,
    };
  } catch (error) {
    logger.error('Error creating Lemon Squeezy checkout:', error);
    throw error;
  }
}

/**
 * Get the Lemon Squeezy variant ID for a product tier
 * @param tier - Product tier name
 * @returns Variant ID
 */
export function getVariantIdForTier(tier: string): string {
  const variantIds: Record<string, string | undefined> = {
    starter: process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_STARTER,
    professional: process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PROFESSIONAL,
    enterprise: process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ENTERPRISE,
    fabrk: process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_FABRK,
  };

  const variantId = variantIds[tier.toLowerCase()];
  if (!variantId) {
    throw new Error(`No Lemon Squeezy variant ID configured for tier: ${tier}`);
  }

  return variantId;
}
