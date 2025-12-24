/**
 * Credit Refill Logic
 * Monthly credit refills based on subscription tier
 */

import { prisma } from '@/lib/prisma';
import { CreditTransactionType } from '@/generated/prisma/client';
import { getTierAllowance, type SubscriptionTier } from './pricing';

/**
 * Check if user is eligible for monthly refill
 */
export function isEligibleForRefill(lastRefill: Date): boolean {
  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  return lastRefill <= oneMonthAgo;
}

/**
 * Refill a user's credits if eligible
 */
export async function refillCreditsIfEligible(userId: string): Promise<boolean> {
  const balance = await prisma.creditBalance.findUnique({
    where: { userId },
    include: { user: { select: { tier: true } } },
  });

  if (!balance) return false;

  if (!isEligibleForRefill(balance.lastRefill)) {
    return false;
  }

  const tier = (balance.user.tier || 'free') as SubscriptionTier;
  const allowance = getTierAllowance(tier);

  await prisma.creditBalance.update({
    where: { id: balance.id },
    data: {
      balance: allowance,
      monthlyAllowance: allowance,
      lastRefill: new Date(),
      transactions: {
        create: {
          amount: allowance,
          type: CreditTransactionType.SUBSCRIPTION_REFILL,
          description: `Monthly refill for ${tier} tier`,
        },
      },
    },
  });

  return true;
}

/**
 * Update user's tier and adjust allowance
 */
export async function updateTierAllowance(
  userId: string,
  newTier: SubscriptionTier
): Promise<void> {
  const balance = await prisma.creditBalance.findUnique({
    where: { userId },
  });

  if (!balance) return;

  const allowance = getTierAllowance(newTier);

  await prisma.creditBalance.update({
    where: { id: balance.id },
    data: {
      monthlyAllowance: allowance,
    },
  });
}
