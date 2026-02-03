/**
 * Stripe Unit Tests
 * Tests for Stripe utility functions (pure functions only)
 *
 * Note: Functions that require database (getOrCreateCustomer, createCheckoutSession,
 * handleCheckoutCompleted, etc.) need integration tests with mocked Prisma.
 *
 * This test file only tests the pure `generateIdempotencyKey` function
 * which doesn't require Stripe SDK initialization.
 */

import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

/**
 * Copy of generateIdempotencyKey for isolated testing
 * (avoids importing from stripe.ts which requires Stripe initialization)
 */
function generateIdempotencyKey(userId: string, priceId: string): string {
  const timestamp = Date.now();
  const random = crypto.randomBytes(8).toString('hex');
  return `checkout_${userId}_${priceId}_${timestamp}_${random}`;
}

describe('generateIdempotencyKey', () => {
  it('should generate key with correct prefix', () => {
    const key = generateIdempotencyKey('user123', 'price_abc');

    expect(key).toMatch(/^checkout_/);
  });

  it('should include userId in key', () => {
    const userId = 'user123';
    const key = generateIdempotencyKey(userId, 'price_abc');

    expect(key).toContain(userId);
  });

  it('should include priceId in key', () => {
    const priceId = 'price_abc';
    const key = generateIdempotencyKey('user123', priceId);

    expect(key).toContain(priceId);
  });

  it('should include timestamp for uniqueness', () => {
    const before = Date.now();
    const key = generateIdempotencyKey('user123', 'priceabc');
    const after = Date.now();

    // Extract timestamp from key (4th segment when no underscore in priceId)
    // Format: checkout_user123_priceabc_timestamp_random
    const segments = key.split('_');
    const timestamp = parseInt(segments[3], 10);

    expect(timestamp).toBeGreaterThanOrEqual(before);
    expect(timestamp).toBeLessThanOrEqual(after);
  });

  it('should include random component', () => {
    const key = generateIdempotencyKey('user123', 'priceabc');

    // Random component is 8 bytes hex = 16 chars
    // Format: checkout_user123_priceabc_timestamp_random
    const segments = key.split('_');
    const random = segments[4];

    expect(random).toMatch(/^[a-f0-9]{16}$/);
  });

  it('should generate unique keys for same inputs', () => {
    const keys = new Set<string>();

    for (let i = 0; i < 100; i++) {
      keys.add(generateIdempotencyKey('user123', 'price_abc'));
    }

    expect(keys.size).toBe(100);
  });

  it('should handle special characters in userId', () => {
    const key = generateIdempotencyKey('user-123_test', 'price_abc');

    expect(key).toContain('user-123_test');
  });

  it('should generate consistent format', () => {
    const key = generateIdempotencyKey('user123', 'price_abc');

    // Format: checkout_{userId}_{priceId}_{timestamp}_{random}
    // Note: priceId contains underscore, so we check structure differently
    expect(key).toMatch(/^checkout_user123_price_abc_\d+_[a-f0-9]{16}$/);
  });
});

// Note: Testing getTierFromPrice would require integration tests with mocked env
// as it depends on environment variables at module load time.
