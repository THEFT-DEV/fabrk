/**
 * Credit Transaction History
 * Query and analyze credit usage
 */

import { prisma } from '@/lib/prisma';
import { getOrCreateBalance } from './balance';

export interface TransactionFilters {
  type?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

/**
 * Get transaction history for a user
 */
export async function getTransactionHistory(userId: string, filters: TransactionFilters = {}) {
  const balance = await getOrCreateBalance(userId);

  const where: Record<string, unknown> = { balanceId: balance.id };

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.startDate || filters.endDate) {
    where.createdAt = {};
    if (filters.startDate) {
      (where.createdAt as Record<string, Date>).gte = filters.startDate;
    }
    if (filters.endDate) {
      (where.createdAt as Record<string, Date>).lte = filters.endDate;
    }
  }

  const transactions = await prisma.creditTransaction.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: filters.limit || 50,
    skip: filters.offset || 0,
  });

  return transactions;
}

/**
 * Get usage stats for the last N days
 */
export async function getUsageStats(userId: string, days: number = 30) {
  const balance = await getOrCreateBalance(userId);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const transactions = await prisma.creditTransaction.findMany({
    where: {
      balanceId: balance.id,
      type: 'USAGE',
      createdAt: { gte: startDate },
    },
    orderBy: { createdAt: 'asc' },
  });

  // Group by day
  const dailyUsage: Record<string, number> = {};
  transactions.forEach((tx: { createdAt: Date; amount: number }) => {
    const day = tx.createdAt.toISOString().split('T')[0];
    dailyUsage[day] = (dailyUsage[day] || 0) + Math.abs(tx.amount);
  });

  // Fill in missing days with 0
  const result: { date: string; credits: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      credits: dailyUsage[dateStr] || 0,
    });
  }

  return result;
}

/**
 * Get total usage for a period
 */
export async function getTotalUsage(userId: string, days: number = 30): Promise<number> {
  const stats = await getUsageStats(userId, days);
  return stats.reduce((sum, day) => sum + day.credits, 0);
}
