/**
 * Polar.sh Discount Usage API
 * Returns current usage count for the discount
 */

import { NextResponse } from 'next/server';
import { polar, isPolarConfigured, FABRK_DISCOUNT_ID } from '@/lib/polar';
import { logger } from '@/lib/logger';

export async function GET() {
  // Check if Polar is configured
  if (!isPolarConfigured()) {
    // Return fallback data without logging (expected in dev)
    return NextResponse.json({
      used: 0,
      total: 100,
      remaining: 100,
      _error: true,
    });
  }

  // Check if discount is configured
  if (!FABRK_DISCOUNT_ID) {
    // No discount configured - return fallback
    return NextResponse.json({
      used: 0,
      total: 100,
      remaining: 100,
      _error: true,
    });
  }

  try {
    // Get discount details from Polar
    const discount = await polar.discounts.get({
      id: FABRK_DISCOUNT_ID,
    });

    // Calculate usage from discount data
    const maxRedemptions = discount.maxRedemptions || 100;
    const redemptionsCount = discount.redemptionsCount || 0;
    const remaining = Math.max(0, maxRedemptions - redemptionsCount);

    logger.info('Discount usage fetched', {
      used: redemptionsCount,
      total: maxRedemptions,
      remaining,
    });

    return NextResponse.json({
      used: redemptionsCount,
      total: maxRedemptions,
      remaining,
    });
  } catch (error) {
    // Only log in production - dev environments may have invalid/expired tokens
    if (process.env.NODE_ENV === 'production') {
      logger.error('Failed to fetch discount usage:', error);
    }

    // Return a fallback response so the UI doesn't break
    return NextResponse.json({
      used: 0,
      total: 100,
      remaining: 100,
      _error: true,
    });
  }
}
