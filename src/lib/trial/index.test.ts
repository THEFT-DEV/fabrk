/**
 * Trial System Unit Tests
 * Tests trial status, access checks, and date formatting
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTrialStatus, hasAccess, formatTrialEndDate } from './index';

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

import { prisma } from '@/lib/prisma';

const mockPrismaUser = prisma.user.findUnique as ReturnType<typeof vi.fn>;

describe('Trial System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTrialStatus', () => {
    it('should return no trial for non-existent user', async () => {
      mockPrismaUser.mockResolvedValue(null);

      const status = await getTrialStatus('non-existent-user');

      expect(status).toEqual({
        isInTrial: false,
        isExpired: false,
        daysRemaining: 0,
        trialEndsAt: null,
        hasUsedTrial: false,
      });
    });

    it('should return no trial for user who never started one', async () => {
      mockPrismaUser.mockResolvedValue({
        trialEndsAt: null,
        tier: 'free',
      });

      const status = await getTrialStatus('user-no-trial');

      expect(status).toEqual({
        isInTrial: false,
        isExpired: false,
        daysRemaining: 0,
        trialEndsAt: null,
        hasUsedTrial: false,
      });
    });

    it('should return active trial status for user in trial', async () => {
      const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
      mockPrismaUser.mockResolvedValue({
        trialEndsAt: futureDate,
        tier: 'trial',
      });

      const status = await getTrialStatus('user-in-trial');

      expect(status.isInTrial).toBe(true);
      expect(status.isExpired).toBe(false);
      expect(status.daysRemaining).toBe(7);
      expect(status.trialEndsAt).toEqual(futureDate);
      expect(status.hasUsedTrial).toBe(true);
    });

    it('should return expired trial status', async () => {
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // 1 day ago
      mockPrismaUser.mockResolvedValue({
        trialEndsAt: pastDate,
        tier: 'trial',
      });

      const status = await getTrialStatus('user-expired-trial');

      expect(status.isInTrial).toBe(false);
      expect(status.isExpired).toBe(true);
      expect(status.daysRemaining).toBe(0);
      expect(status.hasUsedTrial).toBe(true);
    });

    it('should calculate days remaining correctly', async () => {
      // Exactly 3.5 days remaining - should ceil to 4
      const futureDate = new Date(Date.now() + 3.5 * 24 * 60 * 60 * 1000);
      mockPrismaUser.mockResolvedValue({
        trialEndsAt: futureDate,
        tier: 'trial',
      });

      const status = await getTrialStatus('user-id');

      expect(status.daysRemaining).toBe(4);
    });

    it('should handle trial ending today', async () => {
      // Less than 1 day remaining
      const futureDate = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours
      mockPrismaUser.mockResolvedValue({
        trialEndsAt: futureDate,
        tier: 'trial',
      });

      const status = await getTrialStatus('user-id');

      expect(status.isInTrial).toBe(true);
      expect(status.daysRemaining).toBe(1);
    });
  });

  describe('hasAccess', () => {
    it('should return false for non-existent user', async () => {
      mockPrismaUser.mockResolvedValue(null);

      const access = await hasAccess('non-existent-user');

      expect(access).toBe(false);
    });

    it('should return true for paid subscriber', async () => {
      mockPrismaUser.mockResolvedValue({
        tier: 'pro',
        trialEndsAt: null,
        subscriptionTier: 'pro',
      });

      const access = await hasAccess('paid-user');

      expect(access).toBe(true);
    });

    it('should return true for active trial user', async () => {
      const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      mockPrismaUser.mockResolvedValue({
        tier: 'trial',
        trialEndsAt: futureDate,
        subscriptionTier: null,
      });

      const access = await hasAccess('trial-user');

      expect(access).toBe(true);
    });

    it('should return false for expired trial user', async () => {
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      mockPrismaUser.mockResolvedValue({
        tier: 'trial',
        trialEndsAt: pastDate,
        subscriptionTier: null,
      });

      const access = await hasAccess('expired-trial-user');

      expect(access).toBe(false);
    });

    it('should return false for free tier user', async () => {
      mockPrismaUser.mockResolvedValue({
        tier: 'free',
        trialEndsAt: null,
        subscriptionTier: null,
      });

      const access = await hasAccess('free-user');

      expect(access).toBe(false);
    });

    it('should return true for trial user with valid trial ending soon', async () => {
      const soonDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
      mockPrismaUser.mockResolvedValue({
        tier: 'trial',
        trialEndsAt: soonDate,
        subscriptionTier: null,
      });

      const access = await hasAccess('trial-ending-soon-user');

      expect(access).toBe(true);
    });
  });

  describe('formatTrialEndDate', () => {
    it('should format date in US long format', () => {
      const date = new Date('2025-01-15T00:00:00.000Z');
      const formatted = formatTrialEndDate(date);

      // Should be "January 15, 2025" (locale may vary slightly)
      expect(formatted).toContain('January');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2025');
    });

    it('should handle different months', () => {
      const dates = [
        { date: new Date('2025-03-01'), month: 'March' },
        { date: new Date('2025-06-15'), month: 'June' },
        { date: new Date('2025-12-25'), month: 'December' },
      ];

      for (const { date, month } of dates) {
        const formatted = formatTrialEndDate(date);
        expect(formatted).toContain(month);
      }
    });

    it('should include the full year', () => {
      const date = new Date('2026-05-20');
      const formatted = formatTrialEndDate(date);

      expect(formatted).toContain('2026');
    });

    it('should handle single-digit days', () => {
      const date = new Date('2025-07-05');
      const formatted = formatTrialEndDate(date);

      // Should be "July 5, 2025" (not "July 05, 2025")
      expect(formatted).toMatch(/July\s+5/);
    });
  });
});
