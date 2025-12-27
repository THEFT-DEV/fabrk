/**
 * Error Tracker Tests
 * Test error tracking functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  captureError,
  captureWarning,
  captureInfo,
  getErrorStats,
  clearErrorLogs,
} from './error-tracker';

describe('Error Tracker', () => {
  beforeEach(() => {
    // Clear logs before each test
    clearErrorLogs();
  });

  describe('Error Capture', () => {
    it('should capture errors', () => {
      const error = new Error('Test error');
      const errorId = captureError(error, {
        userId: 'test-user',
        component: 'TestComponent',
      });

      expect(errorId).toBeDefined();
      expect(typeof errorId).toBe('string');

      const stats = getErrorStats();
      expect(stats.total).toBe(1);
      expect(stats.byType.error).toBe(1);
    });

    it('should capture error messages as strings', () => {
      const errorId = captureError('String error message');

      expect(errorId).toBeDefined();

      const stats = getErrorStats();
      expect(stats.total).toBe(1);
    });

    it('should deduplicate similar errors', () => {
      const error = new Error('Duplicate error');

      captureError(error);
      captureError(error);
      captureError(error);

      const stats = getErrorStats();
      // Should only create one unique error entry
      const topErrors = stats.topErrors;
      expect(topErrors.length).toBe(1);
      expect(topErrors[0].count).toBe(3);
    });
  });

  describe('Warning Capture', () => {
    it('should capture warnings', () => {
      captureWarning('Test warning', {
        component: 'TestComponent',
      });

      const stats = getErrorStats();
      expect(stats.total).toBe(1);
      expect(stats.byType.warning).toBe(1);
    });
  });

  describe('Info Capture', () => {
    it('should capture info messages', () => {
      captureInfo('Test info', {
        metadata: { key: 'value' },
      });

      const stats = getErrorStats();
      expect(stats.total).toBe(1);
      expect(stats.byType.info).toBe(1);
    });
  });

  describe('Error Statistics', () => {
    it('should provide accurate statistics', () => {
      captureError(new Error('Error 1'));
      captureError(new Error('Error 2'));
      captureWarning('Warning 1');
      captureInfo('Info 1');

      const stats = getErrorStats();
      expect(stats.total).toBe(4);
      expect(stats.byType.error).toBe(2);
      expect(stats.byType.warning).toBe(1);
      expect(stats.byType.info).toBe(1);
    });

    it('should filter by date', () => {
      captureError(new Error('Test error'));

      // Get stats from future date (should be 0)
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const stats = getErrorStats(futureDate);
      expect(stats.total).toBe(0);

      // Get stats from past date (should include error)
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const stats2 = getErrorStats(pastDate);
      expect(stats2.total).toBe(1);
    });

    it('should provide top errors sorted by count', () => {
      const error1 = new Error('Error 1');
      const error2 = new Error('Error 2');

      captureError(error1);
      captureError(error1);
      captureError(error1);
      captureError(error2);

      const stats = getErrorStats();
      expect(stats.topErrors.length).toBe(2);
      expect(stats.topErrors[0].count).toBe(3);
      expect(stats.topErrors[1].count).toBe(1);
    });

    it('should provide recent errors', () => {
      captureError(new Error('Error 1'));
      captureError(new Error('Error 2'));
      captureError(new Error('Error 3'));

      const stats = getErrorStats();
      expect(stats.recentErrors.length).toBe(3);
      // Check that all 3 errors are present (order may vary due to timing)
      const messages = stats.recentErrors.map((e) => e.message);
      expect(messages).toContain('Error 1');
      expect(messages).toContain('Error 2');
      expect(messages).toContain('Error 3');
    });
  });

  describe('Context Tracking', () => {
    it('should track user context', () => {
      captureError(new Error('User error'), {
        userId: 'user-123',
        userEmail: 'user@example.com',
        route: '/dashboard',
      });

      const stats = getErrorStats();
      const error = stats.recentErrors[0];
      expect(error.context?.userId).toBe('user-123');
      expect(error.context?.userEmail).toBe('user@example.com');
      expect(error.context?.route).toBe('/dashboard');
    });

    it('should track component context', () => {
      captureError(new Error('Component error'), {
        component: 'Button',
        action: 'onClick',
      });

      const stats = getErrorStats();
      const error = stats.recentErrors[0];
      expect(error.context?.component).toBe('Button');
      expect(error.context?.action).toBe('onClick');
    });
  });
});
