/**
 * URL Utilities Unit Tests
 * Tests for URL parsing, building, and manipulation functions
 */

import { describe, it, expect } from 'vitest';
import {
  parseQueryString,
  buildQueryString,
  addQueryParams,
  removeQueryParams,
  getQueryParam,
  getDomain,
  getSubdomain,
  isExternalUrl,
  sanitizeUrl,
  getPath,
  joinPaths,
} from './url';

describe('parseQueryString', () => {
  it('should parse query string to object', () => {
    const result = parseQueryString('?foo=bar&baz=qux');
    expect(result).toEqual({ foo: 'bar', baz: 'qux' });
  });

  it('should handle without leading ?', () => {
    const result = parseQueryString('foo=bar&baz=qux');
    expect(result).toEqual({ foo: 'bar', baz: 'qux' });
  });

  it('should handle empty string', () => {
    expect(parseQueryString('')).toEqual({});
  });

  it('should handle encoded values', () => {
    const result = parseQueryString('?name=John%20Doe');
    expect(result.name).toBe('John Doe');
  });

  it('should handle multiple values (last wins)', () => {
    const result = parseQueryString('?foo=1&foo=2');
    expect(result.foo).toBe('2');
  });
});

describe('buildQueryString', () => {
  it('should build query string from object', () => {
    const result = buildQueryString({ foo: 'bar', baz: 'qux' });
    expect(result).toBe('foo=bar&baz=qux');
  });

  it('should handle null and undefined values', () => {
    const result = buildQueryString({
      foo: 'bar',
      empty: null,
      missing: undefined,
    });
    expect(result).toBe('foo=bar');
  });

  it('should convert numbers to strings', () => {
    const result = buildQueryString({ count: 42 });
    expect(result).toBe('count=42');
  });

  it('should handle booleans', () => {
    const result = buildQueryString({ active: true, disabled: false });
    expect(result).toBe('active=true&disabled=false');
  });

  it('should handle empty object', () => {
    expect(buildQueryString({})).toBe('');
  });
});

describe('addQueryParams', () => {
  it('should add params to URL without existing params', () => {
    const result = addQueryParams('https://example.com', { foo: 'bar' });
    expect(result).toBe('https://example.com/?foo=bar');
  });

  it('should add params to URL with existing params', () => {
    const result = addQueryParams('https://example.com?existing=value', {
      foo: 'bar',
    });
    expect(result).toContain('existing=value');
    expect(result).toContain('foo=bar');
  });

  it('should override existing params', () => {
    const result = addQueryParams('https://example.com?foo=old', {
      foo: 'new',
    });
    expect(result).toBe('https://example.com/?foo=new');
  });

  it('should handle null/undefined values', () => {
    const result = addQueryParams('https://example.com', {
      foo: 'bar',
      empty: null,
      missing: undefined,
    });
    expect(result).toBe('https://example.com/?foo=bar');
  });
});

describe('removeQueryParams', () => {
  it('should remove specified params', () => {
    const result = removeQueryParams('https://example.com?foo=bar&baz=qux', ['foo']);
    expect(result).toBe('https://example.com/?baz=qux');
  });

  it('should remove multiple params', () => {
    const result = removeQueryParams('https://example.com?a=1&b=2&c=3', ['a', 'c']);
    expect(result).toBe('https://example.com/?b=2');
  });

  it('should handle non-existent params', () => {
    const result = removeQueryParams('https://example.com?foo=bar', ['nonexistent']);
    expect(result).toBe('https://example.com/?foo=bar');
  });

  it('should handle removing all params', () => {
    const result = removeQueryParams('https://example.com?foo=bar', ['foo']);
    expect(result).toBe('https://example.com/');
  });
});

describe('getQueryParam', () => {
  it('should get query parameter value', () => {
    expect(getQueryParam('https://example.com?foo=bar', 'foo')).toBe('bar');
  });

  it('should return null for non-existent param', () => {
    expect(getQueryParam('https://example.com?foo=bar', 'baz')).toBeNull();
  });

  it('should handle encoded values', () => {
    expect(getQueryParam('https://example.com?name=John%20Doe', 'name')).toBe('John Doe');
  });
});

describe('getDomain', () => {
  it('should extract domain from URL', () => {
    expect(getDomain('https://subdomain.example.com/path')).toBe('example.com');
  });

  it('should handle URLs without subdomain', () => {
    expect(getDomain('https://example.com')).toBe('example.com');
  });

  it('should handle multi-level TLDs', () => {
    expect(getDomain('https://www.example.co.uk')).toBe('co.uk');
  });
});

describe('getSubdomain', () => {
  it('should extract subdomain', () => {
    expect(getSubdomain('https://api.example.com')).toBe('api');
  });

  it('should return null for no subdomain', () => {
    expect(getSubdomain('https://example.com')).toBeNull();
  });

  it('should handle www as subdomain', () => {
    expect(getSubdomain('https://www.example.com')).toBe('www');
  });
});

describe('isExternalUrl', () => {
  it('should return false for internal URLs', () => {
    expect(isExternalUrl('https://example.com/page', 'example.com')).toBe(false);
  });

  it('should return true for external URLs', () => {
    expect(isExternalUrl('https://other.com', 'example.com')).toBe(true);
  });

  it('should handle subdomains as internal', () => {
    expect(isExternalUrl('https://api.example.com', 'example.com')).toBe(false);
  });

  it('should return false for invalid URLs', () => {
    expect(isExternalUrl('not-a-url', 'example.com')).toBe(false);
  });

  it('should handle relative URLs as internal', () => {
    // Relative URLs will throw and return false
    expect(isExternalUrl('/page', 'example.com')).toBe(false);
  });
});

describe('sanitizeUrl', () => {
  it('should remove sensitive params', () => {
    const result = sanitizeUrl('https://example.com?token=secret&page=1');
    expect(result).not.toContain('secret');
    expect(result).toContain('page=1');
  });

  it('should remove default sensitive params', () => {
    const url = 'https://example.com?token=a&api_key=b&secret=c&password=d&page=1';
    const result = sanitizeUrl(url);
    expect(result).not.toContain('token=');
    expect(result).not.toContain('api_key=');
    expect(result).not.toContain('secret=');
    expect(result).not.toContain('password=');
    expect(result).toContain('page=1');
  });

  it('should support custom sensitive params', () => {
    const result = sanitizeUrl('https://example.com?auth=xyz&page=1', ['auth']);
    expect(result).not.toContain('auth=');
    expect(result).toContain('page=1');
  });
});

describe('getPath', () => {
  it('should extract path from URL', () => {
    expect(getPath('https://example.com/foo/bar?baz=qux')).toBe('/foo/bar');
  });

  it('should return / for root URL', () => {
    expect(getPath('https://example.com')).toBe('/');
  });

  it('should handle trailing slashes', () => {
    expect(getPath('https://example.com/foo/')).toBe('/foo/');
  });
});

describe('joinPaths', () => {
  it('should join URL paths', () => {
    expect(joinPaths('https://example.com/', '/api', 'users')).toBe(
      'https://example.com/api/users'
    );
  });

  it('should handle leading slashes', () => {
    expect(joinPaths('https://example.com', '/api', '/users')).toBe(
      'https://example.com/api/users'
    );
  });

  it('should handle trailing slashes', () => {
    expect(joinPaths('https://example.com/', 'api/', 'users/')).toBe(
      'https://example.com/api/users'
    );
  });

  it('should filter empty parts', () => {
    expect(joinPaths('https://example.com', '', 'api')).toBe('https://example.com/api');
  });

  it('should handle single path', () => {
    expect(joinPaths('https://example.com')).toBe('https://example.com');
  });
});
