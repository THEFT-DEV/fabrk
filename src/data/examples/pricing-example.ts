/**
 * Generic Pricing Example
 *
 * Replace with your own pricing, features, and copy.
 * This is a template showing the structure.
 */

export const PRICING_EXAMPLE = {
  launch: 99,
  regular: 199,
  currency: 'USD',
  display: {
    launch: '$99',
    regular: '$199',
  },
  discount: {
    amount: 100,
    totalCoupons: 100,
    label: 'LAUNCH PRICE - Limited Time',
  },
  features: [
    'UNLIMITED USERS & PROJECTS',
    'AUTHENTICATION & AUTHORIZATION',
    'PAYMENT PROCESSING INCLUDED',
    'LIFETIME UPDATES',
    'COMMERCIAL LICENSE',
    'PREMIUM SUPPORT',
    'PRODUCTION-READY CODE',
  ],
  cta: {
    label: 'GET STARTED',
  },
  trustLine: 'Secure checkout │ Money-back guarantee',
} as const;

// Three-tier pricing structure
export const PRICING_TIERS_EXAMPLE = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for solo developers and small projects',
    price: {
      monthly: 29,
      yearly: 290, // ~2 months free
      display: {
        monthly: '$29',
        yearly: '$290',
      },
    },
    features: [
      '5 Projects',
      '10,000 API Calls/month',
      'Email Support',
      'Community Access',
      'Basic Analytics',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing businesses and teams',
    price: {
      monthly: 79,
      yearly: 790,
      display: {
        monthly: '$79',
        yearly: '$790',
      },
    },
    features: [
      'Unlimited Projects',
      '100,000 API Calls/month',
      'Priority Support',
      'Advanced Analytics',
      'Custom Integrations',
      'Team Collaboration',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    badge: 'MOST POPULAR',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    price: {
      monthly: 299,
      yearly: 2990,
      display: {
        monthly: '$299',
        yearly: '$2,990',
      },
    },
    features: [
      'Everything in Professional',
      'Unlimited API Calls',
      'Dedicated Support',
      'Custom SLA',
      'On-premise Deployment',
      'Advanced Security',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
] as const;
