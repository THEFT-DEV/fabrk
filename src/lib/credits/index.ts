/**
 * Credits Module
 * AI usage tracking and billing infrastructure
 */

export { CreditTransactionType } from '@/generated/prisma/client';

export { getOrCreateBalance, hasCredits, getBalance, deductCredits, addCredits } from './balance';

export {
  getTransactionHistory,
  getUsageStats,
  getTotalUsage,
  type TransactionFilters,
} from './transactions';

export {
  CREDIT_COSTS,
  TIER_ALLOWANCES,
  getCreditCost,
  getTierAllowance,
  type CreditCostKey,
  type SubscriptionTier,
} from './pricing';

export { refillCreditsIfEligible, updateTierAllowance, isEligibleForRefill } from './refill';
