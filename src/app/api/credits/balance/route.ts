/**
 * Credit Balance API
 * GET /api/credits/balance - Get current credit balance
 */

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getOrCreateBalance, getBalance } from '@/lib/credits';
import { refillCreditsIfEligible } from '@/lib/credits';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check for monthly refill
    await refillCreditsIfEligible(session.user.id);

    const balanceRecord = await getOrCreateBalance(session.user.id);
    const balance = await getBalance(session.user.id);

    return NextResponse.json({
      balance,
      monthlyAllowance: balanceRecord.monthlyAllowance,
      lastRefill: balanceRecord.lastRefill,
      tier: balanceRecord.user.tier || 'free',
    });
  } catch (error) {
    console.error('Error fetching credit balance:', error);
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
  }
}
