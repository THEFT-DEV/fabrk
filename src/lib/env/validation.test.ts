/**
 * Environment Variable Validation Tests
 *
 * Tests the validation logic for environment variables
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { validateEnv } from './validation';

describe('Environment Variable Validation', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original environment
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('Required Variables', () => {
    it('should fail when DATABASE_URL is missing', () => {
      (process.env as { DATABASE_URL?: string }).DATABASE_URL = undefined;
      const result = validateEnv();
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.variable === 'DATABASE_URL')).toBe(true);
    });

    it('should fail when DATABASE_URL is not a PostgreSQL URL', () => {
      process.env.DATABASE_URL = 'http://example.com';
      const result = validateEnv();
      expect(result.valid).toBe(false);
      expect(
        result.errors.some((e) => e.variable === 'DATABASE_URL' && e.message.includes('PostgreSQL'))
      ).toBe(true);
    });

    it('should pass when DATABASE_URL is a valid PostgreSQL URL', () => {
      process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';
      process.env.NEXTAUTH_URL = 'http://localhost:3000';
      process.env.NEXTAUTH_SECRET = 'a'.repeat(32);
      process.env.STRIPE_SECRET_KEY = 'sk_test_123';
      process.env.STRIPE_WEBHOOK_SECRET = 'whsec_123';
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_123';
      process.env.RESEND_API_KEY = 're_123';

      const result = validateEnv();
      expect(result.errors.filter((e) => e.variable === 'DATABASE_URL')).toHaveLength(0);
    });

    it('should fail when NEXTAUTH_SECRET is too short', () => {
      process.env.NEXTAUTH_SECRET = 'short';
      const result = validateEnv();
      expect(result.valid).toBe(false);
      expect(
        result.errors.some(
          (e) => e.variable === 'NEXTAUTH_SECRET' && e.message.includes('32 characters')
        )
      ).toBe(true);
    });

    it('should fail when Stripe keys have wrong prefix', () => {
      process.env.STRIPE_SECRET_KEY = 'wrong_prefix';
      const result = validateEnv();
      expect(result.valid).toBe(false);
      expect(
        result.errors.some((e) => e.variable === 'STRIPE_SECRET_KEY' && e.message.includes('sk_'))
      ).toBe(true);
    });

    it('should fail when RESEND_API_KEY has wrong prefix', () => {
      process.env.RESEND_API_KEY = 'wrong_prefix';
      const result = validateEnv();
      expect(result.valid).toBe(false);
      expect(
        result.errors.some((e) => e.variable === 'RESEND_API_KEY' && e.message.includes('re_'))
      ).toBe(true);
    });
  });

  describe('Optional Variables', () => {
    it('should fail when only GOOGLE_CLIENT_ID is set', () => {
      process.env.GOOGLE_CLIENT_ID = 'test-id';
      delete process.env.GOOGLE_CLIENT_SECRET;

      const result = validateEnv();
      expect(
        result.errors.some((e) => e.variable === 'GOOGLE_CLIENT_SECRET' && e.category === 'OAuth')
      ).toBe(true);
    });

    it('should pass when both Google OAuth vars are set', () => {
      // Set all required vars
      process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';
      process.env.NEXTAUTH_URL = 'http://localhost:3000';
      process.env.NEXTAUTH_SECRET = 'a'.repeat(32);
      process.env.STRIPE_SECRET_KEY = 'sk_test_123';
      process.env.STRIPE_WEBHOOK_SECRET = 'whsec_123';
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_123';
      process.env.RESEND_API_KEY = 're_123';

      // Set Google OAuth
      process.env.GOOGLE_CLIENT_ID = 'test-id';
      process.env.GOOGLE_CLIENT_SECRET = 'test-secret';

      const result = validateEnv();
      expect(result.errors.filter((e) => e.category === 'OAuth')).toHaveLength(0);
    });

    it('should fail when Pusher vars are incomplete', () => {
      process.env.NEXT_PUBLIC_PUSHER_KEY = 'test-key';
      delete process.env.PUSHER_APP_ID;
      delete process.env.PUSHER_SECRET;
      delete process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

      const result = validateEnv();
      expect(
        result.errors.filter((e) => e.category === 'Real-Time (Pusher)').length
      ).toBeGreaterThan(0);
    });

    it('should fail when OpenAI key has wrong prefix', () => {
      process.env.OPENAI_API_KEY = 'wrong_prefix';
      const result = validateEnv();
      expect(
        result.errors.some((e) => e.variable === 'OPENAI_API_KEY' && e.message.includes('sk-'))
      ).toBe(true);
    });

    it('should fail when Anthropic key has wrong prefix', () => {
      process.env.ANTHROPIC_API_KEY = 'wrong_prefix';
      const result = validateEnv();
      expect(
        result.errors.some(
          (e) => e.variable === 'ANTHROPIC_API_KEY' && e.message.includes('sk-ant-')
        )
      ).toBe(true);
    });

    it('should warn when using default Stripe price IDs', () => {
      process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER = 'price_starter';
      const result = validateEnv();
      expect(
        result.errors.some(
          (e) =>
            e.variable === 'NEXT_PUBLIC_STRIPE_PRICE_STARTER' && e.message.includes('default value')
        )
      ).toBe(true);
    });
  });

  describe('URL Validation', () => {
    it('should fail when NEXTAUTH_URL is not a valid URL', () => {
      process.env.NEXTAUTH_URL = 'not-a-url';
      const result = validateEnv();
      expect(
        result.errors.some((e) => e.variable === 'NEXTAUTH_URL' && e.message.includes('valid URL'))
      ).toBe(true);
    });

    it('should fail when PostHog host is not a valid URL', () => {
      process.env.NEXT_PUBLIC_POSTHOG_HOST = 'not-a-url';
      const result = validateEnv();
      expect(
        result.errors.some(
          (e) => e.variable === 'NEXT_PUBLIC_POSTHOG_HOST' && e.message.includes('valid URL')
        )
      ).toBe(true);
    });

    it('should fail when Redis URL is not HTTPS', () => {
      process.env.UPSTASH_REDIS_REST_URL = 'not-a-url';
      process.env.UPSTASH_REDIS_REST_TOKEN = 'token';
      const result = validateEnv();
      expect(result.errors.some((e) => e.variable === 'UPSTASH_REDIS_REST_URL')).toBe(true);
    });
  });

  describe('Email Validation', () => {
    it('should fail when EMAIL_FROM is not a valid email', () => {
      process.env.EMAIL_FROM = 'not-an-email';
      const result = validateEnv();
      expect(
        result.errors.some((e) => e.variable === 'EMAIL_FROM' && e.message.includes('valid email'))
      ).toBe(true);
    });

    it('should pass when EMAIL_FROM is a valid email', () => {
      process.env.EMAIL_FROM = 'test@example.com';
      process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';
      process.env.NEXTAUTH_URL = 'http://localhost:3000';
      process.env.NEXTAUTH_SECRET = 'a'.repeat(32);
      process.env.STRIPE_SECRET_KEY = 'sk_test_123';
      process.env.STRIPE_WEBHOOK_SECRET = 'whsec_123';
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_123';
      process.env.RESEND_API_KEY = 're_123';

      const result = validateEnv();
      expect(result.errors.filter((e) => e.variable === 'EMAIL_FROM')).toHaveLength(0);
    });
  });

  describe('Complete Valid Configuration', () => {
    it('should pass with all required variables set correctly', () => {
      process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';
      process.env.NEXTAUTH_URL = 'http://localhost:3000';
      process.env.NEXTAUTH_SECRET = 'a'.repeat(32);
      process.env.STRIPE_SECRET_KEY = 'sk_test_123';
      process.env.STRIPE_WEBHOOK_SECRET = 'whsec_123';
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_123';
      process.env.RESEND_API_KEY = 're_123';

      const result = validateEnv();

      // Should have no errors in critical categories
      const criticalErrors = result.errors.filter((e) =>
        ['Database', 'Authentication', 'Payment', 'Email'].includes(e.category)
      );
      expect(criticalErrors).toHaveLength(0);
    });
  });
});
