/**
 * Lemon Squeezy Client
 * SDK initialization and configuration
 */

import { lemonSqueezySetup, getAuthenticatedUser } from '@lemonsqueezy/lemonsqueezy.js';

/**
 * Initialize Lemon Squeezy SDK
 * Must be called before using any Lemon Squeezy functions
 */
export function initLemonSqueezy(): void {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;

  if (!apiKey) {
    throw new Error('LEMONSQUEEZY_API_KEY is not set');
  }

  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error('Lemon Squeezy API Error:', error);
    },
  });
}

/**
 * Verify Lemon Squeezy connection
 * @returns True if connection is valid
 */
export async function verifyLemonSqueezyConnection(): Promise<boolean> {
  try {
    initLemonSqueezy();
    const { data, error } = await getAuthenticatedUser();

    if (error) {
      console.error('Lemon Squeezy connection error:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Failed to verify Lemon Squeezy connection:', error);
    return false;
  }
}

/**
 * Get Store ID from environment
 */
export function getStoreId(): string {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  if (!storeId) {
    throw new Error('LEMONSQUEEZY_STORE_ID is not set');
  }
  return storeId;
}
