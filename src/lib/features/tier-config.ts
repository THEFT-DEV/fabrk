/**
 * Tier Configuration
 * Defines tier names, badges, and styling
 */

type TierName = 'free' | 'trial' | 'starter' | 'professional' | 'enterprise';

/**
 * Display names for each tier
 */
export const TIER_NAMES: Record<TierName, string> = {
  free: 'Free',
  trial: 'Trial',
  starter: 'Starter',
  professional: 'Professional',
  enterprise: 'Enterprise',
};

/**
 * Badge variant for each tier
 */
export const TIER_BADGES: Record<TierName, string> = {
  free: 'neutral',
  trial: 'accent',
  starter: 'default',
  professional: 'default',
  enterprise: 'default',
};
