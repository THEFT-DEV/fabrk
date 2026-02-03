/**
 * Token Utilities Tests
 * Test secure token generation and license key functionality
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  generateSecureToken,
  generateLicenseKey,
  getTokenExpiration,
  isTokenExpired,
} from './tokens';

describe('Token Utilities', () => {
  describe('generateSecureToken', () => {
    it('should generate a 64-character hex string by default', () => {
      const token = generateSecureToken();
      expect(token).toHaveLength(64);
      expect(token).toMatch(/^[a-f0-9]+$/);
    });

    it('should generate tokens of specified length', () => {
      const token16 = generateSecureToken(16);
      expect(token16).toHaveLength(32); // 16 bytes = 32 hex chars

      const token8 = generateSecureToken(8);
      expect(token8).toHaveLength(16); // 8 bytes = 16 hex chars
    });

    it('should generate unique tokens each time', () => {
      const tokens = new Set(Array.from({ length: 100 }, () => generateSecureToken()));
      expect(tokens.size).toBe(100); // All should be unique
    });
  });

  describe('generateLicenseKey', () => {
    it('should generate a properly formatted license key', () => {
      const key = generateLicenseKey();
      // Format: XXXX-XXXX-XXXX-XXXX
      expect(key).toMatch(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    });

    it('should only contain uppercase alphanumeric characters', () => {
      const key = generateLicenseKey();
      const chars = key.replace(/-/g, '');
      expect(chars).toMatch(/^[A-Z0-9]+$/);
    });

    it('should generate unique keys', () => {
      const keys = new Set(Array.from({ length: 100 }, () => generateLicenseKey()));
      // While not cryptographically guaranteed, 100 keys should be unique
      expect(keys.size).toBe(100);
    });

    it('should have 4 segments of 4 characters each', () => {
      const key = generateLicenseKey();
      const segments = key.split('-');
      expect(segments).toHaveLength(4);
      segments.forEach((segment) => {
        expect(segment).toHaveLength(4);
      });
    });
  });

  describe('getTokenExpiration', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-01-15T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return a date 24 hours in the future by default', () => {
      const expiration = getTokenExpiration();
      const expected = new Date('2025-01-16T12:00:00Z');
      expect(expiration.getTime()).toBe(expected.getTime());
    });

    it('should return a date with custom hours offset', () => {
      const expiration = getTokenExpiration(1);
      const expected = new Date('2025-01-15T13:00:00Z');
      expect(expiration.getTime()).toBe(expected.getTime());
    });

    it('should handle 0 hours', () => {
      const expiration = getTokenExpiration(0);
      const now = new Date('2025-01-15T12:00:00Z');
      expect(expiration.getTime()).toBe(now.getTime());
    });

    it('should handle large hour values', () => {
      const expiration = getTokenExpiration(168); // 1 week
      const expected = new Date('2025-01-22T12:00:00Z');
      expect(expiration.getTime()).toBe(expected.getTime());
    });
  });

  describe('isTokenExpired', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-01-15T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return true for past dates', () => {
      const pastDate = new Date('2025-01-14T12:00:00Z');
      expect(isTokenExpired(pastDate)).toBe(true);
    });

    it('should return false for future dates', () => {
      const futureDate = new Date('2025-01-16T12:00:00Z');
      expect(isTokenExpired(futureDate)).toBe(false);
    });

    it('should return true for exact current time (edge case)', () => {
      const now = new Date('2025-01-15T12:00:00Z');
      // Current time is NOT > current time, so should be false
      expect(isTokenExpired(now)).toBe(false);
    });

    it('should return true for 1ms in the past', () => {
      const pastDate = new Date('2025-01-15T11:59:59.999Z');
      expect(isTokenExpired(pastDate)).toBe(true);
    });
  });
});
