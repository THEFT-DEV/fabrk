/**
 * Credit Pricing Configuration
 * Defines costs per AI feature and tier allowances
 */

/**
 * Credit costs per AI feature
 */
export const CREDIT_COSTS = {
  FORM_GENERATION: 10,
  CHAT_MESSAGE: 1,
  CODE_GENERATION: 20,
  IMAGE_GENERATION: 50,
  TEXT_OPERATION: 2, // summarize, rewrite, translate, etc.
  SPEECH_TO_TEXT: 5, // audio transcription
  TEXT_TO_SPEECH: 5, // speech synthesis
} as const;

/**
 * Monthly allowances by subscription tier
 */
export const TIER_ALLOWANCES = {
  free: 100,
  starter: 1000,
  pro: 10000,
  enterprise: Infinity,
} as const;

export type CreditCostKey = keyof typeof CREDIT_COSTS;
export type SubscriptionTier = keyof typeof TIER_ALLOWANCES;

/**
 * Get credit cost for a feature
 */
export function getCreditCost(feature: CreditCostKey): number {
  return CREDIT_COSTS[feature];
}

/**
 * Get monthly allowance for a tier
 */
export function getTierAllowance(tier: SubscriptionTier): number {
  const allowance = TIER_ALLOWANCES[tier];
  return allowance === Infinity ? 999999 : allowance;
}
