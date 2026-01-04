/**
 * Rate Limiting Unit Tests
 * Tests in-memory rate limiting, client identification, and utility functions
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import {
  checkRateLimit,
  getClientIdentifier,
  isWhitelisted,
  isBlacklisted,
  calculateBackoff,
  RateLimiters,
  limitStore,
} from './rate-limit';

describe('Rate Limiting', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    limitStore.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    limitStore.clear();
  });

  describe('checkRateLimit', () => {
    it('should allow requests within limit', async () => {
      const config = {
        interval: 60000, // 1 minute
        maxRequests: 5,
      };

      // Make 5 requests
      for (let i = 0; i < 5; i++) {
        const result = await checkRateLimit('test-user', config);
        expect(result.success).toBe(true);
        expect(result.remaining).toBe(5 - (i + 1));
      }
    });

    it('should block requests exceeding limit', async () => {
      const config = {
        interval: 60000,
        maxRequests: 3,
      };

      // Make 3 allowed requests
      for (let i = 0; i < 3; i++) {
        const result = await checkRateLimit('test-user', config);
        expect(result.success).toBe(true);
      }

      // 4th request should be blocked
      const blockedResult = await checkRateLimit('test-user', config);
      expect(blockedResult.success).toBe(false);
      expect(blockedResult.remaining).toBe(0);
    });

    it('should reset limit after time window expires', async () => {
      const config = {
        interval: 60000, // 1 minute
        maxRequests: 2,
      };

      // Use up the limit
      await checkRateLimit('test-user', config);
      await checkRateLimit('test-user', config);

      // Next request should be blocked
      let result = await checkRateLimit('test-user', config);
      expect(result.success).toBe(false);

      // Advance time past the window
      vi.advanceTimersByTime(61000);

      // Should be allowed again
      result = await checkRateLimit('test-user', config);
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(1);
    });

    it('should track different identifiers separately', async () => {
      const config = {
        interval: 60000,
        maxRequests: 2,
      };

      // User 1 uses up their limit
      await checkRateLimit('user1', config);
      await checkRateLimit('user1', config);
      const user1Result = await checkRateLimit('user1', config);
      expect(user1Result.success).toBe(false);

      // User 2 should still have their full limit
      const user2Result = await checkRateLimit('user2', config);
      expect(user2Result.success).toBe(true);
      expect(user2Result.remaining).toBe(1);
    });

    it('should return correct limit and remaining count', async () => {
      const config = {
        interval: 60000,
        maxRequests: 10,
      };

      // First request: count goes 0->1, remaining = 10-1 = 9
      const result1 = await checkRateLimit('test-user', config);
      expect(result1.limit).toBe(10);
      expect(result1.remaining).toBe(9);

      // Second request: count goes 1->2, remaining = 10-2 = 8
      const result2 = await checkRateLimit('test-user', config);
      expect(result2.remaining).toBe(8);

      // Third request: count goes 2->3, remaining = 10-3 = 7
      const result3 = await checkRateLimit('test-user', config);
      expect(result3.remaining).toBe(7);
    });

    it('should return reset timestamp', async () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const config = {
        interval: 60000,
        maxRequests: 5,
      };

      const result = await checkRateLimit('test-user', config);
      expect(result.reset).toBe(now + 60000);
    });

    it('should handle concurrent requests correctly', async () => {
      const config = {
        interval: 60000,
        maxRequests: 5,
      };

      // Simulate concurrent requests
      const results = await Promise.all([
        checkRateLimit('test-user', config),
        checkRateLimit('test-user', config),
        checkRateLimit('test-user', config),
      ]);

      // All should be tracked and allowed
      results.forEach((result) => {
        expect(result.success).toBe(true);
      });

      // Check that count is correct after 3 requests
      const finalResult = await checkRateLimit('test-user', config);
      expect(finalResult.remaining).toBe(1); // After 4 total: 5 - 4 = 1
    });

    it('should create new window when previous expires', async () => {
      const config = {
        interval: 60000,
        maxRequests: 3,
      };

      // Use up limit in first window
      await checkRateLimit('test-user', config);
      await checkRateLimit('test-user', config);
      await checkRateLimit('test-user', config);

      // Advance time past the window
      vi.advanceTimersByTime(61000);

      // Should get fresh limit in new window
      const result = await checkRateLimit('test-user', config);
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(2); // Fresh window, first call: 3-1=2
    });
  });

  describe('getClientIdentifier', () => {
    it('should extract IP from x-forwarded-for header', () => {
      const req = new NextRequest('http://localhost:3000', {
        headers: {
          'x-forwarded-for': '192.168.1.1, 10.0.0.1',
        },
      });

      const identifier = getClientIdentifier(req);
      expect(identifier).toBe('ip:192.168.1.1');
    });

    it('should extract IP from x-real-ip header as fallback', () => {
      const req = new NextRequest('http://localhost:3000', {
        headers: {
          'x-real-ip': '192.168.1.1',
        },
      });

      const identifier = getClientIdentifier(req);
      expect(identifier).toBe('ip:192.168.1.1');
    });

    it("should use 'unknown' when no IP headers present", () => {
      const req = new NextRequest('http://localhost:3000');
      const identifier = getClientIdentifier(req);
      expect(identifier).toBe('ip:unknown');
    });

    it('should handle multiple IPs in x-forwarded-for (use first)', () => {
      const req = new NextRequest('http://localhost:3000', {
        headers: {
          'x-forwarded-for': '203.0.113.1, 198.51.100.1, 192.0.2.1',
        },
      });

      const identifier = getClientIdentifier(req);
      expect(identifier).toBe('ip:203.0.113.1');
    });

    it('should prefer x-forwarded-for over x-real-ip', () => {
      const req = new NextRequest('http://localhost:3000', {
        headers: {
          'x-forwarded-for': '192.168.1.1',
          'x-real-ip': '10.0.0.1',
        },
      });

      const identifier = getClientIdentifier(req);
      expect(identifier).toBe('ip:192.168.1.1');
    });

    it('should handle IPv6 addresses', () => {
      const req = new NextRequest('http://localhost:3000', {
        headers: {
          'x-forwarded-for': '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        },
      });

      const identifier = getClientIdentifier(req);
      expect(identifier).toContain('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
    });
  });

  describe('isWhitelisted', () => {
    it('should return true for whitelisted IP', () => {
      const whitelist = ['192.168.1.1', '10.0.0.1'];
      expect(isWhitelisted('192.168.1.1', whitelist)).toBe(true);
    });

    it('should return false for non-whitelisted IP', () => {
      const whitelist = ['192.168.1.1', '10.0.0.1'];
      expect(isWhitelisted('203.0.113.1', whitelist)).toBe(false);
    });

    it('should return false for empty whitelist', () => {
      expect(isWhitelisted('192.168.1.1', [])).toBe(false);
    });

    it('should handle default empty whitelist', () => {
      expect(isWhitelisted('192.168.1.1')).toBe(false);
    });

    it('should be case-sensitive for IPs', () => {
      const whitelist = ['192.168.1.1'];
      expect(isWhitelisted('192.168.1.1', whitelist)).toBe(true);
      expect(isWhitelisted('192.168.1.2', whitelist)).toBe(false);
    });
  });

  describe('isBlacklisted', () => {
    it('should return true for blacklisted IP', () => {
      const blacklist = ['192.168.1.1', '10.0.0.1'];
      expect(isBlacklisted('192.168.1.1', blacklist)).toBe(true);
    });

    it('should return false for non-blacklisted IP', () => {
      const blacklist = ['192.168.1.1', '10.0.0.1'];
      expect(isBlacklisted('203.0.113.1', blacklist)).toBe(false);
    });

    it('should return false for empty blacklist', () => {
      expect(isBlacklisted('192.168.1.1', [])).toBe(false);
    });

    it('should handle default empty blacklist', () => {
      expect(isBlacklisted('192.168.1.1')).toBe(false);
    });
  });

  describe('calculateBackoff', () => {
    it('should calculate exponential backoff', () => {
      const baseDelay = 1000;

      expect(calculateBackoff(0, baseDelay)).toBe(1000); // 1000 * 2^0
      expect(calculateBackoff(1, baseDelay)).toBe(2000); // 1000 * 2^1
      expect(calculateBackoff(2, baseDelay)).toBe(4000); // 1000 * 2^2
      expect(calculateBackoff(3, baseDelay)).toBe(8000); // 1000 * 2^3
      expect(calculateBackoff(4, baseDelay)).toBe(16000); // 1000 * 2^4
      expect(calculateBackoff(5, baseDelay)).toBe(32000); // 1000 * 2^5
    });

    it('should cap backoff at 60 seconds', () => {
      const baseDelay = 1000;

      expect(calculateBackoff(10, baseDelay)).toBe(60000); // Capped
      expect(calculateBackoff(20, baseDelay)).toBe(60000); // Capped
      expect(calculateBackoff(100, baseDelay)).toBe(60000); // Capped
    });

    it('should use default base delay of 1000ms', () => {
      expect(calculateBackoff(0)).toBe(1000);
      expect(calculateBackoff(1)).toBe(2000);
    });

    it('should handle custom base delays', () => {
      expect(calculateBackoff(0, 500)).toBe(500);
      expect(calculateBackoff(1, 500)).toBe(1000);
      expect(calculateBackoff(2, 500)).toBe(2000);

      expect(calculateBackoff(0, 2000)).toBe(2000);
      expect(calculateBackoff(1, 2000)).toBe(4000);
    });

    it('should handle zero attempts', () => {
      expect(calculateBackoff(0, 1000)).toBe(1000);
    });

    it('should reach max cap within reasonable attempts', () => {
      const baseDelay = 1000;

      // Find when we hit the cap
      let attempts = 0;
      while (calculateBackoff(attempts, baseDelay) < 60000) {
        attempts++;
      }

      // Should hit cap at attempt 6 (1000 * 2^6 = 64000, capped to 60000)
      expect(attempts).toBe(6);
    });
  });

  describe('RateLimiters presets', () => {
    it('should have auth rate limiter with strict settings', () => {
      expect(RateLimiters.auth.interval).toBe(15 * 60 * 1000); // 15 minutes
      expect(RateLimiters.auth.maxRequests).toBe(5);
    });

    it('should have strict rate limiter', () => {
      expect(RateLimiters.strict.interval).toBe(60 * 1000); // 1 minute
      expect(RateLimiters.strict.maxRequests).toBe(10);
    });

    it('should have api rate limiter', () => {
      expect(RateLimiters.api.interval).toBe(60 * 1000); // 1 minute
      expect(RateLimiters.api.maxRequests).toBe(60);
    });

    it('should have public rate limiter', () => {
      expect(RateLimiters.public.interval).toBe(60 * 1000); // 1 minute
      expect(RateLimiters.public.maxRequests).toBe(100);
    });

    it('should have webhook rate limiter', () => {
      expect(RateLimiters.webhook.interval).toBe(60 * 1000); // 1 minute
      expect(RateLimiters.webhook.maxRequests).toBe(100);
    });

    it('should have increasing strictness order', () => {
      const limiters = [
        { name: 'auth', ...RateLimiters.auth },
        { name: 'strict', ...RateLimiters.strict },
        { name: 'api', ...RateLimiters.api },
        { name: 'public', ...RateLimiters.public },
      ];

      // Normalize to requests per minute
      const normalized = limiters.map((limiter) => ({
        name: limiter.name,
        requestsPerMinute: (limiter.maxRequests / limiter.interval) * 60000,
      }));

      // Auth should be most strict (lowest rate)
      expect(normalized[0].requestsPerMinute).toBeLessThan(normalized[1].requestsPerMinute);
      expect(normalized[1].requestsPerMinute).toBeLessThan(normalized[2].requestsPerMinute);
      expect(normalized[2].requestsPerMinute).toBeLessThan(normalized[3].requestsPerMinute);
    });
  });

  describe('Rate limiting scenarios', () => {
    it('should handle burst requests', async () => {
      const config = {
        interval: 60000,
        maxRequests: 5,
      };

      // Burst of 10 requests
      const promises = Array.from({ length: 10 }, () => checkRateLimit('test-user', config));
      const results = await Promise.all(promises);

      // First 5 should succeed
      const successful = results.filter((r) => r.success).length;
      const failed = results.filter((r) => !r.success).length;

      expect(successful).toBe(5);
      expect(failed).toBe(5);
    });

    it('should handle sliding window correctly', async () => {
      const config = {
        interval: 60000,
        maxRequests: 3,
      };

      const now = Date.now();
      vi.setSystemTime(now);

      // Use 2 requests
      await checkRateLimit('test-user', config);
      await checkRateLimit('test-user', config);

      // Move forward 30 seconds (half window)
      vi.setSystemTime(now + 30000);

      // Use 1 more request (3 total in window)
      const result1 = await checkRateLimit('test-user', config);
      expect(result1.success).toBe(true);

      // Next request should fail (exceeded limit)
      const result2 = await checkRateLimit('test-user', config);
      expect(result2.success).toBe(false);

      // Move PAST the end of original window (61s from start)
      vi.setSystemTime(now + 61000);

      // Should reset and allow new requests
      const result3 = await checkRateLimit('test-user', config);
      expect(result3.success).toBe(true);
    });

    it('should handle different rate limiters for different endpoints', async () => {
      // Auth endpoint with strict limits (5 requests per 15 min)
      await checkRateLimit('auth:user1', RateLimiters.auth);
      await checkRateLimit('auth:user1', RateLimiters.auth);
      const authResult = await checkRateLimit('auth:user1', RateLimiters.auth);
      expect(authResult.success).toBe(true); // Only 3 of 5 used

      // API endpoint with higher limits - different identifier namespace
      // (60 requests per minute)
      for (let i = 0; i < 60; i++) {
        const result = await checkRateLimit('api:user1', RateLimiters.api);
        expect(result.success).toBe(true); // All 60 should succeed
      }
    });
  });
});
