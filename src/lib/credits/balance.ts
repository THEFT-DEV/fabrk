/**
 * Credit Balance Management
 * Get, check, and modify user credit balances
 */

import { prisma } from '@/lib/prisma';
import { CreditTransactionType } from '@/generated/prisma/client';
import { getTierAllowance, type SubscriptionTier } from './pricing';

/**
 * Get or create a user's credit balance
 */
export async function getOrCreateBalance(userId: string) {
  let balance = await prisma.creditBalance.findUnique({
    where: { userId },
    include: { user: { select: { tier: true } } },
  });

  if (!balance) {
    // Get user's tier for initial allowance
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { tier: true },
    });

    const tier = (user?.tier || 'free') as SubscriptionTier;
    const allowance = getTierAllowance(tier);

    balance = await prisma.creditBalance.create({
      data: {
        userId,
        balance: allowance,
        monthlyAllowance: allowance,
      },
      include: { user: { select: { tier: true } } },
    });
  }

  return balance;
}

/**
 * Check if user has enough credits
 */
export async function hasCredits(userId: string, amount: number): Promise<boolean> {
  const balance = await getOrCreateBalance(userId);
  return balance.balance >= amount;
}

/**
 * Get current balance
 */
export async function getBalance(userId: string): Promise<number> {
  const balance = await getOrCreateBalance(userId);
  return balance.balance;
}

/**
 * Deduct credits from user balance
 */
export async function deductCredits(
  userId: string,
  amount: number,
  options: {
    description?: string;
    endpoint?: string;
    metadata?: object;
  } = {}
): Promise<{ success: boolean; newBalance: number; error?: string }> {
  const balance = await getOrCreateBalance(userId);

  if (balance.balance < amount) {
    return {
      success: false,
      newBalance: balance.balance,
      error: 'Insufficient credits',
    };
  }

  const updated = await prisma.creditBalance.update({
    where: { id: balance.id },
    data: {
      balance: { decrement: amount },
      transactions: {
        create: {
          amount: -amount,
          type: CreditTransactionType.USAGE,
          description: options.description,
          endpoint: options.endpoint,
          metadata: options.metadata,
        },
      },
    },
  });

  return {
    success: true,
    newBalance: updated.balance,
  };
}

/**
 * Add credits to user balance
 */
export async function addCredits(
  userId: string,
  amount: number,
  type: CreditTransactionType,
  description?: string
): Promise<{ success: boolean; newBalance: number }> {
  const balance = await getOrCreateBalance(userId);

  const updated = await prisma.creditBalance.update({
    where: { id: balance.id },
    data: {
      balance: { increment: amount },
      transactions: {
        create: {
          amount,
          type,
          description,
        },
      },
    },
  });

  return {
    success: true,
    newBalance: updated.balance,
  };
}
