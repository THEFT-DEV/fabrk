/**
 * Stripe Configuration
 */

// Stripe Configuration
export const STRIPE_CONFIG = {
  successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}`,
} as const;

// Stripe Products Configuration
export const STRIPE_PRODUCTS = {
  fabrk: {
    name: 'Fabrk - SaaS Boilerplate',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_FABRK || '',
    price: 299, // Base price in Stripe - $100 coupon applied brings it to $199
    discountedPrice: 199, // Price after EARLY500 coupon applied
  },
} as const;

// Deprecated tier configurations (kept for backwards compatibility)
export const STRIPE_PRODUCTS_LEGACY = {
  starter: {
    name: 'Starter',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || '',
    price: 99,
  },
  professional: {
    name: 'Professional',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || '',
    price: 199,
  },
  enterprise: {
    name: 'Enterprise',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || '',
    price: 499,
  },
} as const;
