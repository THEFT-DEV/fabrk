/**
 * Trial Period Utilities
 * Helper functions for managing user trial periods
 */

import { prisma } from '@/lib/prisma';

export interface TrialStatus {
  isInTrial: boolean;
  isExpired: boolean;
  daysRemaining: number;
  trialEndsAt: Date | null;
  hasUsedTrial: boolean;
}

/**
 * Get trial status for a user
 */
export async function getTrialStatus(userId: string): Promise<TrialStatus> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { trialEndsAt: true, tier: true },
  });

  if (!user) {
    return {
      isInTrial: false,
      isExpired: false,
      daysRemaining: 0,
      trialEndsAt: null,
      hasUsedTrial: false,
    };
  }

  const now = new Date();
  const trialEndsAt = user.trialEndsAt;

  // User has never started a trial
  if (!trialEndsAt) {
    return {
      isInTrial: false,
      isExpired: false,
      daysRemaining: 0,
      trialEndsAt: null,
      hasUsedTrial: false,
    };
  }

  // Check if trial is expired
  const isExpired = trialEndsAt < now;

  // Calculate days remaining
  const msRemaining = trialEndsAt.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));

  return {
    isInTrial: !isExpired && user.tier === 'trial',
    isExpired,
    daysRemaining,
    trialEndsAt,
    hasUsedTrial: true, // They have/had a trial
  };
}

/**
 * Check if user has access (paid tier or active trial)
 */
export async function hasAccess(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { tier: true, trialEndsAt: true, subscriptionTier: true },
  });

  if (!user) return false;

  // Paid users always have access
  if (user.subscriptionTier && user.tier !== 'free' && user.tier !== 'trial') {
    return true;
  }

  // Trial users have access if trial hasn't expired
  if (user.tier === 'trial' && user.trialEndsAt) {
    return user.trialEndsAt > new Date();
  }

  return false;
}

/**
 * Format trial end date for display
 */
export function formatTrialEndDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
