/**
 * Validation Tests
 * Test input validation and attack detection
 */

import { describe, it, expect } from 'vitest';
import {
  detectSQLInjection,
  detectXSS,
  detectPathTraversal,
  sanitizeString,
  sanitizeHTML,
  ValidationSchemas,
} from './validation';

describe('Security Validation', () => {
  describe('SQL Injection Detection', () => {
    it('should detect SQL injection attempts', () => {
      expect(detectSQLInjection('SELECT * FROM users')).toBe(true);
      expect(detectSQLInjection("1' OR '1'='1")).toBe(true);
      expect(detectSQLInjection('DROP TABLE users')).toBe(true);
      expect(detectSQLInjection('UNION SELECT password FROM users')).toBe(true);
    });

    it('should allow safe input', () => {
      expect(detectSQLInjection('John Doe')).toBe(false);
      expect(detectSQLInjection('test@example.com')).toBe(false);
      expect(detectSQLInjection('My name is John')).toBe(false);
    });
  });

  describe('XSS Detection', () => {
    it('should detect XSS attempts', () => {
      expect(detectXSS("<script>alert('xss')</script>")).toBe(true);
      expect(detectXSS("<img src=x onerror=alert('xss')>")).toBe(true);
      expect(detectXSS("javascript:alert('xss')")).toBe(true);
      expect(detectXSS("<iframe src='evil.com'></iframe>")).toBe(true);
    });

    it('should allow safe HTML', () => {
      expect(detectXSS('Hello <b>World</b>')).toBe(false);
      expect(detectXSS('Price: $100')).toBe(false);
      expect(detectXSS('John & Jane')).toBe(false);
    });
  });

  describe('Path Traversal Detection', () => {
    it('should detect path traversal attempts', () => {
      expect(detectPathTraversal('../../../etc/passwd')).toBe(true);
      expect(detectPathTraversal('..\\..\\windows\\system32')).toBe(true);
      expect(detectPathTraversal('./../../secrets')).toBe(true);
    });

    it('should allow safe paths', () => {
      expect(detectPathTraversal('docs/guide.md')).toBe(false);
      expect(detectPathTraversal('images/logo.png')).toBe(false);
    });
  });

  describe('Input Sanitization', () => {
    it('should sanitize dangerous input', () => {
      expect(sanitizeString("<script>alert('xss')</script>")).toBe("scriptalert('xss')/script");
      expect(sanitizeString('Hello & goodbye')).toBe('Hello & goodbye');
      expect(sanitizeString('Test "quotes"')).toBe('Test "quotes"');
    });

    it('should trim whitespace', () => {
      expect(sanitizeString('  hello  ')).toBe('hello');
      expect(sanitizeString('\n\ntest\n\n')).toBe('test');
    });
  });

  describe('HTML Sanitization', () => {
    it('should remove dangerous HTML', () => {
      const html = "<p>Hello</p><script>alert('xss')</script>";
      const sanitized = sanitizeHTML(html);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('<p>Hello</p>');
    });

    it('should allow safe HTML tags', () => {
      const html = '<p>Hello <strong>World</strong></p>';
      const sanitized = sanitizeHTML(html);
      expect(sanitized).toContain('<p>');
      expect(sanitized).toContain('<strong>');
    });
  });

  describe('Validation Schemas', () => {
    it('should validate email', () => {
      expect(ValidationSchemas.email.safeParse('test@example.com').success).toBe(true);
      expect(ValidationSchemas.email.safeParse('invalid-email').success).toBe(false);
      expect(ValidationSchemas.email.safeParse('').success).toBe(false);
    });

    it('should validate password strength', () => {
      expect(ValidationSchemas.password.safeParse('Test123!').success).toBe(true);
      expect(ValidationSchemas.password.safeParse('weak').success).toBe(false);
      expect(ValidationSchemas.password.safeParse('nouppercaseornumber').success).toBe(false);
    });

    it('should validate URLs', () => {
      expect(ValidationSchemas.url.safeParse('https://example.com').success).toBe(true);
      expect(ValidationSchemas.url.safeParse('http://test.com').success).toBe(true);
      expect(ValidationSchemas.url.safeParse('not-a-url').success).toBe(false);
    });
  });
});
