/**
 * Utils Unit Tests
 * Tests for the cn (className) utility function
 */

import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active');
  });

  it('should handle arrays', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });

  it('should handle undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('should handle empty string', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar');
  });

  it('should resolve conflicting Tailwind classes (last wins)', () => {
    // tailwind-merge resolves conflicts
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('should handle complex combinations', () => {
    const result = cn(
      'base-class',
      { conditional: true },
      ['array-class'],
      undefined,
      'final-class'
    );
    expect(result).toContain('base-class');
    expect(result).toContain('conditional');
    expect(result).toContain('array-class');
    expect(result).toContain('final-class');
  });

  it('should return empty string for no arguments', () => {
    expect(cn()).toBe('');
  });

  it('should handle boolean false values', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });
});
