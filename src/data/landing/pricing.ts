/**
 * Pricing Data - Single source of truth
 * Used by: PricingCard (Hero, Pricing Section, ExitIntentPopup, StickyCTABar)
 */

import { COMPONENT_COUNT_STRING } from './stats';

export const PRICING = {
  current: 199,
  regular: 299,
  currency: 'USD',
  display: {
    current: '$199',
    regular: '$299',
  },
  promo: {
    code: 'EARLY100',
    amount: 100,
    limit: 100,
    label: '$100 OFF for first 100 customers',
  },
  features: [
    `${COMPONENT_COUNT_STRING} PRODUCTION-READY COMPONENTS`,
    'AUTH, BILLING & MULTI-TENANCY',
    'LIFETIME UPDATES (NO SUBSCRIPTION)',
    'UNLIMITED PROJECTS & CLIENTS',
    'COMMERCIAL LICENSE INCLUDED',
    'PREMIUM SUPPORT & DOCUMENTATION',
    'WCAG 2.1 AA ACCESSIBLE',
  ],
  cta: {
    label: 'BUY NOW',
  },
  trustLine: 'Secure checkout via Polar │ All sales final',
} as const;
