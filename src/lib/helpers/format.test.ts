/**
 * Format Utilities Unit Tests
 * Tests for currency, number, date, and other formatting functions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatCurrency,
  formatNumber,
  formatRelativeTime,
  formatDate,
  formatDateTime,
  formatFileSize,
  formatPercentage,
  formatPhoneNumber,
} from './format';

describe('formatCurrency', () => {
  it('should format cents to USD by default', () => {
    expect(formatCurrency(9999)).toBe('$99.99');
  });

  it('should format cents correctly', () => {
    expect(formatCurrency(100)).toBe('$1.00');
    expect(formatCurrency(1)).toBe('$0.01');
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should handle large amounts', () => {
    expect(formatCurrency(1000000)).toBe('$10,000.00');
  });

  it('should support different currencies', () => {
    const result = formatCurrency(9999, 'EUR', 'de-DE');
    expect(result).toContain('99,99');
    expect(result).toContain('€');
  });

  it('should handle GBP currency', () => {
    const result = formatCurrency(9999, 'GBP', 'en-GB');
    expect(result).toContain('99.99');
    expect(result).toContain('£');
  });
});

describe('formatNumber', () => {
  it('should return number as-is for small values', () => {
    expect(formatNumber(999)).toBe('999');
    expect(formatNumber(0)).toBe('0');
  });

  it('should format thousands with K', () => {
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(10000)).toBe('10.0K');
  });

  it('should format millions with M', () => {
    expect(formatNumber(1000000)).toBe('1.0M');
    expect(formatNumber(1234567)).toBe('1.2M');
  });

  it('should format billions with B', () => {
    expect(formatNumber(1000000000)).toBe('1.0B');
    expect(formatNumber(2500000000)).toBe('2.5B');
  });

  it('should respect decimal precision', () => {
    expect(formatNumber(1234567, 2)).toBe('1.23M');
    expect(formatNumber(1234567, 0)).toBe('1M');
  });
});

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should show 'just now' for recent times", () => {
    const now = new Date();
    expect(formatRelativeTime(now)).toBe('just now');
  });

  it('should show minutes ago', () => {
    const past = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatRelativeTime(past)).toBe('5 minutes ago');
  });

  it('should show hours ago', () => {
    const past = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(formatRelativeTime(past)).toBe('3 hours ago');
  });

  it('should show days ago', () => {
    const past = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(past)).toBe('2 days ago');
  });

  it('should show weeks ago', () => {
    const past = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(past)).toBe('2 weeks ago');
  });

  it('should show months ago', () => {
    const past = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(past)).toBe('2 months ago');
  });

  it('should show years ago', () => {
    const past = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(past)).toBe('1 years ago');
  });

  it('should accept string dates', () => {
    const past = new Date(Date.now() - 60 * 1000).toISOString();
    expect(formatRelativeTime(past)).toBe('1 minutes ago');
  });
});

describe('formatDate', () => {
  it('should format date with default options', () => {
    const date = new Date('2025-11-06');
    const result = formatDate(date);
    expect(result).toContain('Nov');
    expect(result).toContain('6');
    expect(result).toContain('2025');
  });

  it('should accept string dates', () => {
    const result = formatDate('2025-12-25');
    expect(result).toContain('Dec');
    expect(result).toContain('25');
    expect(result).toContain('2025');
  });

  it('should accept custom format options', () => {
    const date = new Date('2025-11-06');
    const result = formatDate(date, { weekday: 'long' });
    // Should include day name
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('formatDateTime', () => {
  it('should include date and time', () => {
    const date = new Date('2025-11-06T14:30:00');
    const result = formatDateTime(date);
    expect(result).toContain('Nov');
    expect(result).toContain('6');
    expect(result).toContain('2025');
    expect(result).toMatch(/\d+:\d+/); // Contains time
  });

  it('should show AM/PM format', () => {
    const morning = new Date('2025-11-06T09:30:00');
    const afternoon = new Date('2025-11-06T14:30:00');

    expect(formatDateTime(morning)).toContain('AM');
    expect(formatDateTime(afternoon)).toContain('PM');
  });
});

describe('formatFileSize', () => {
  it('should handle 0 bytes', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });

  it('should format bytes', () => {
    expect(formatFileSize(500)).toBe('500 Bytes');
  });

  it('should format kilobytes', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
  });

  it('should format megabytes', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1 MB');
    expect(formatFileSize(2.5 * 1024 * 1024)).toBe('2.5 MB');
  });

  it('should format gigabytes', () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
  });

  it('should format terabytes', () => {
    expect(formatFileSize(1024 * 1024 * 1024 * 1024)).toBe('1 TB');
  });
});

describe('formatPercentage', () => {
  it('should format decimal to percentage', () => {
    expect(formatPercentage(0.5)).toBe('50.00%');
    expect(formatPercentage(0.1234)).toBe('12.34%');
  });

  it('should handle 0 and 1', () => {
    expect(formatPercentage(0)).toBe('0.00%');
    expect(formatPercentage(1)).toBe('100.00%');
  });

  it('should respect decimal precision', () => {
    expect(formatPercentage(0.1234, 0)).toBe('12%');
    expect(formatPercentage(0.1234, 1)).toBe('12.3%');
  });

  it('should handle values over 100%', () => {
    expect(formatPercentage(1.5)).toBe('150.00%');
  });
});

describe('formatPhoneNumber', () => {
  it('should format 10-digit phone number', () => {
    expect(formatPhoneNumber('5551234567')).toBe('(555) 123-4567');
  });

  it('should handle phone with existing formatting', () => {
    expect(formatPhoneNumber('555-123-4567')).toBe('(555) 123-4567');
    expect(formatPhoneNumber('(555) 123-4567')).toBe('(555) 123-4567');
  });

  it('should return original for invalid format', () => {
    expect(formatPhoneNumber('123')).toBe('123');
    expect(formatPhoneNumber('abc')).toBe('abc');
  });

  it('should strip non-numeric characters', () => {
    expect(formatPhoneNumber('555.123.4567')).toBe('(555) 123-4567');
  });
});
