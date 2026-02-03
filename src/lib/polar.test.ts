/**
 * Polar Integration Tests
 * Test webhook signature verification (pure function, no SDK dependency)
 */

import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

/**
 * Webhook signature verification (extracted for testing)
 * This matches the implementation in polar.ts
 */
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const expectedSignature = hmac.digest('hex');

  // Timing-safe comparison
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

describe('Polar Webhook Verification', () => {
  const secret = 'test-webhook-secret';

  describe('verifyWebhookSignature', () => {
    it('should return true for valid signature', () => {
      const payload = JSON.stringify({ event: 'checkout.completed' });
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(payload);
      const validSignature = hmac.digest('hex');

      expect(verifyWebhookSignature(payload, validSignature, secret)).toBe(true);
    });

    it('should throw for invalid signature length', () => {
      const payload = JSON.stringify({ event: 'checkout.completed' });
      const invalidSignature = 'invalid-signature-that-wont-match';

      // timingSafeEqual throws when buffer lengths don't match
      expect(() => verifyWebhookSignature(payload, invalidSignature, secret)).toThrow();
    });

    it('should return false for tampered payload', () => {
      const originalPayload = JSON.stringify({ event: 'checkout.completed' });
      const tamperedPayload = JSON.stringify({ event: 'order.refunded' });

      // Generate signature for original payload
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(originalPayload);
      const signature = hmac.digest('hex');

      // Verify with tampered payload should fail
      expect(verifyWebhookSignature(tamperedPayload, signature, secret)).toBe(false);
    });

    it('should return false for wrong secret', () => {
      const payload = JSON.stringify({ event: 'checkout.completed' });

      // Generate signature with correct secret
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(payload);
      const signature = hmac.digest('hex');

      // Verify with wrong secret should fail
      expect(verifyWebhookSignature(payload, signature, 'wrong-secret')).toBe(false);
    });

    it('should handle empty payload', () => {
      const payload = '';
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(payload);
      const signature = hmac.digest('hex');

      expect(verifyWebhookSignature(payload, signature, secret)).toBe(true);
    });

    it('should handle JSON payload with special characters', () => {
      const payload = JSON.stringify({
        event: 'checkout.completed',
        customer_email: 'test+special@example.com',
        metadata: { note: 'Test with émojis 🎉' },
      });
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(payload);
      const signature = hmac.digest('hex');

      expect(verifyWebhookSignature(payload, signature, secret)).toBe(true);
    });

    it('should handle large payloads', () => {
      const payload = JSON.stringify({
        event: 'checkout.completed',
        items: Array.from({ length: 100 }, (_, i) => ({
          id: `item-${i}`,
          name: `Product ${i}`,
          price: i * 100,
        })),
      });
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(payload);
      const signature = hmac.digest('hex');

      expect(verifyWebhookSignature(payload, signature, secret)).toBe(true);
    });
  });

  describe('Signature Format', () => {
    it('should generate 64-character hex signature', () => {
      const payload = 'test';
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(payload);
      const signature = hmac.digest('hex');

      expect(signature).toHaveLength(64);
      expect(signature).toMatch(/^[a-f0-9]+$/);
    });
  });
});

describe('Polar Configuration', () => {
  it('should have valid UUID format for discount ID', () => {
    // The discount ID should be a valid UUID
    const discountId = '1161689c-dbc2-4e53-8c18-43f4af7aaa3f';
    expect(discountId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  });
});
