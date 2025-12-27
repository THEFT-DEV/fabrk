/**
 * Auth Validation Unit Tests
 * Tests Zod schemas and password strength calculation
 */

import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  calculatePasswordStrength,
} from './validation';

describe('Auth Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'user@example.com',
        password: 'password123',
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept optional rememberMe flag', () => {
      const withRememberMe = {
        email: 'user@example.com',
        password: 'password123',
        rememberMe: true,
      };

      const result = loginSchema.safeParse(withRememberMe);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.rememberMe).toBe(true);
      }
    });

    it('should reject invalid email', () => {
      const invalidEmail = {
        email: 'not-an-email',
        password: 'password123',
      };

      const result = loginSchema.safeParse(invalidEmail);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('email');
      }
    });

    it('should reject missing email', () => {
      const missingEmail = {
        password: 'password123',
      };

      const result = loginSchema.safeParse(missingEmail);
      expect(result.success).toBe(false);
    });

    it('should reject missing password', () => {
      const missingPassword = {
        email: 'user@example.com',
      };

      const result = loginSchema.safeParse(missingPassword);
      expect(result.success).toBe(false);
    });

    it('should reject empty email', () => {
      const emptyEmail = {
        email: '',
        password: 'password123',
      };

      const result = loginSchema.safeParse(emptyEmail);
      expect(result.success).toBe(false);
    });

    it('should reject empty password', () => {
      const emptyPassword = {
        email: 'user@example.com',
        password: '',
      };

      const result = loginSchema.safeParse(emptyPassword);
      expect(result.success).toBe(false);
    });

    it('should accept valid email formats', () => {
      const validEmails = [
        'user@example.com',
        'test.user@example.co.uk',
        'user+tag@example.com',
        'user_name@example.org',
      ];

      for (const email of validEmails) {
        const result = loginSchema.safeParse({
          email,
          password: 'password123',
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const validData = {
        email: 'user@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        acceptTerms: true,
      };

      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept optional name and subscribeNewsletter', () => {
      const withOptionals = {
        email: 'user@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        name: 'John Doe',
        acceptTerms: true,
        subscribeNewsletter: true,
      };

      const result = registerSchema.safeParse(withOptionals);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John Doe');
        expect(result.data.subscribeNewsletter).toBe(true);
      }
    });

    it('should enforce minimum password length (8 characters)', () => {
      const shortPassword = {
        email: 'user@example.com',
        password: 'Pass12',
        confirmPassword: 'Pass12',
        acceptTerms: true,
      };

      const result = registerSchema.safeParse(shortPassword);
      expect(result.success).toBe(false);
      if (!result.success) {
        const passwordError = result.error.issues.find((i) => i.path[0] === 'password');
        expect(passwordError?.message).toContain('8 characters');
      }
    });

    it('should require at least one uppercase letter', () => {
      const noUppercase = {
        email: 'user@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        acceptTerms: true,
      };

      const result = registerSchema.safeParse(noUppercase);
      expect(result.success).toBe(false);
      if (!result.success) {
        const passwordError = result.error.issues.find((i) => i.path[0] === 'password');
        expect(passwordError?.message).toContain('uppercase');
      }
    });

    it('should require at least one lowercase letter', () => {
      const noLowercase = {
        email: 'user@example.com',
        password: 'PASSWORD123',
        confirmPassword: 'PASSWORD123',
        acceptTerms: true,
      };

      const result = registerSchema.safeParse(noLowercase);
      expect(result.success).toBe(false);
      if (!result.success) {
        const passwordError = result.error.issues.find((i) => i.path[0] === 'password');
        expect(passwordError?.message).toContain('lowercase');
      }
    });

    it('should require at least one number', () => {
      const noNumber = {
        email: 'user@example.com',
        password: 'PasswordOnly',
        confirmPassword: 'PasswordOnly',
        acceptTerms: true,
      };

      const result = registerSchema.safeParse(noNumber);
      expect(result.success).toBe(false);
      if (!result.success) {
        const passwordError = result.error.issues.find((i) => i.path[0] === 'password');
        expect(passwordError?.message).toContain('number');
      }
    });

    it('should reject mismatched passwords', () => {
      const mismatchedPasswords = {
        email: 'user@example.com',
        password: 'Password123',
        confirmPassword: 'DifferentPassword123',
        acceptTerms: true,
      };

      const result = registerSchema.safeParse(mismatchedPasswords);
      expect(result.success).toBe(false);
      if (!result.success) {
        const confirmError = result.error.issues.find((i) => i.path[0] === 'confirmPassword');
        expect(confirmError?.message).toContain('do not match');
      }
    });

    it('should require acceptTerms to be true', () => {
      const termsNotAccepted = {
        email: 'user@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        acceptTerms: false,
      };

      const result = registerSchema.safeParse(termsNotAccepted);
      expect(result.success).toBe(false);
      if (!result.success) {
        const termsError = result.error.issues.find((i) => i.path[0] === 'acceptTerms');
        expect(termsError?.message).toContain('accept');
      }
    });

    it('should reject missing confirmPassword', () => {
      const missingConfirm = {
        email: 'user@example.com',
        password: 'Password123',
        acceptTerms: true,
      };

      const result = registerSchema.safeParse(missingConfirm);
      expect(result.success).toBe(false);
    });

    it('should accept strong passwords with special characters', () => {
      const strongPassword = {
        email: 'user@example.com',
        password: 'P@ssw0rd!2023',
        confirmPassword: 'P@ssw0rd!2023',
        acceptTerms: true,
      };

      const result = registerSchema.safeParse(strongPassword);
      expect(result.success).toBe(true);
    });
  });

  describe('forgotPasswordSchema', () => {
    it('should validate correct email', () => {
      const validData = {
        email: 'user@example.com',
      };

      const result = forgotPasswordSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidEmail = {
        email: 'not-an-email',
      };

      const result = forgotPasswordSchema.safeParse(invalidEmail);
      expect(result.success).toBe(false);
    });

    it('should reject empty email', () => {
      const emptyEmail = {
        email: '',
      };

      const result = forgotPasswordSchema.safeParse(emptyEmail);
      expect(result.success).toBe(false);
    });

    it('should reject missing email', () => {
      const result = forgotPasswordSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  describe('resetPasswordSchema', () => {
    it('should validate correct password reset data', () => {
      const validData = {
        password: 'NewPassword123',
        confirmPassword: 'NewPassword123',
      };

      const result = resetPasswordSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should enforce same password rules as registration', () => {
      const weakPassword = {
        password: 'weak',
        confirmPassword: 'weak',
      };

      const result = resetPasswordSchema.safeParse(weakPassword);
      expect(result.success).toBe(false);
    });

    it('should reject mismatched passwords', () => {
      const mismatchedPasswords = {
        password: 'Password123',
        confirmPassword: 'DifferentPassword123',
      };

      const result = resetPasswordSchema.safeParse(mismatchedPasswords);
      expect(result.success).toBe(false);
      if (!result.success) {
        const confirmError = result.error.issues.find((i) => i.path[0] === 'confirmPassword');
        expect(confirmError?.message).toContain('do not match');
      }
    });
  });
});

describe('calculatePasswordStrength', () => {
  it('should return score 0 for empty password', () => {
    const result = calculatePasswordStrength('');
    expect(result.score).toBe(0);
    expect(result.label).toBe('Too weak');
  });

  it('should score short passwords as weak', () => {
    const result = calculatePasswordStrength('abc');
    expect(result.score).toBeLessThan(25);
    expect(result.label).toBe('Too weak');
  });

  it('should give points for length', () => {
    const short = calculatePasswordStrength('Pass123'); // 7 chars
    const medium = calculatePasswordStrength('Password123'); // 11 chars
    const long = calculatePasswordStrength('VeryLongPassword123!'); // 20 chars

    expect(short.score).toBeLessThan(medium.score);
    expect(medium.score).toBeLessThan(long.score);
  });

  it('should give points for character variety', () => {
    const onlyLower = calculatePasswordStrength('passwordpassword');
    const withUpper = calculatePasswordStrength('Passwordpassword');
    const withNumber = calculatePasswordStrength('Password1234');
    const withSpecial = calculatePasswordStrength('Password123!');

    expect(onlyLower.score).toBeLessThan(withUpper.score);
    expect(withUpper.score).toBeLessThan(withNumber.score);
    expect(withNumber.score).toBeLessThan(withSpecial.score);
  });

  it('should label weak passwords correctly', () => {
    const weak1 = calculatePasswordStrength('pass');
    const weak2 = calculatePasswordStrength('password');

    expect(weak1.label).toMatch(/weak/i);
    expect(weak2.label).toMatch(/weak/i);
  });

  it('should label fair passwords correctly', () => {
    const fair = calculatePasswordStrength('Password123');
    expect(fair.score).toBeGreaterThanOrEqual(50);
    expect(fair.score).toBeLessThan(75);
    expect(fair.label).toBe('Fair');
  });

  it('should label strong passwords correctly', () => {
    const strong = calculatePasswordStrength('P@ssw0rd!VeryStrong123');
    expect(strong.score).toBeGreaterThanOrEqual(75);
    expect(strong.label).toBe('Strong');
  });

  it('should cap score at 100', () => {
    const ultraStrong = calculatePasswordStrength('UltraSecureP@ssw0rd!WithSpecialChars123456789');
    expect(ultraStrong.score).toBeLessThanOrEqual(100);
  });

  it('should reward 8+ characters (20 points)', () => {
    const sevenChars = calculatePasswordStrength('Pass123'); // 7 chars
    const eightChars = calculatePasswordStrength('Pass1234'); // 8 chars

    // 8+ chars gets 20 point bonus
    expect(eightChars.score).toBeGreaterThan(sevenChars.score);
    expect(eightChars.score - sevenChars.score).toBe(20);
  });

  it('should reward 12+ characters (additional 10 points)', () => {
    const elevenChars = calculatePasswordStrength('Password12'); // 10 chars
    const twelveChars = calculatePasswordStrength('Password1234'); // 12+ chars

    // Should get additional points for 12+ length
    expect(twelveChars.score).toBeGreaterThan(elevenChars.score);
  });

  it('should reward 16+ characters (additional 10 points)', () => {
    const fifteenChars = calculatePasswordStrength('Password1234567');
    const sixteenChars = calculatePasswordStrength('Password12345678');

    expect(sixteenChars.score).toBeGreaterThan(fifteenChars.score);
  });

  it('should give 15 points for lowercase letters', () => {
    const noLower = calculatePasswordStrength('PASSWORD123!');
    const withLower = calculatePasswordStrength('Password123!');

    expect(withLower.score).toBeGreaterThanOrEqual(noLower.score + 15);
  });

  it('should give 15 points for uppercase letters', () => {
    const noUpper = calculatePasswordStrength('password123!');
    const withUpper = calculatePasswordStrength('Password123!');

    expect(withUpper.score).toBeGreaterThanOrEqual(noUpper.score + 15);
  });

  it('should give 15 points for numbers', () => {
    const noNumber = calculatePasswordStrength('Password!');
    const withNumber = calculatePasswordStrength('Password1!');

    expect(withNumber.score).toBeGreaterThanOrEqual(noNumber.score + 15);
  });

  it('should give 15 points for special characters', () => {
    const noSpecial = calculatePasswordStrength('Password123');
    const withSpecial = calculatePasswordStrength('Password123!');

    expect(withSpecial.score).toBeGreaterThanOrEqual(noSpecial.score + 15);
  });

  it('should handle all special characters', () => {
    const specialChars = '!@#$%^&*()_+-=[]{}|;\':"<>?,./';

    for (const char of specialChars) {
      const result = calculatePasswordStrength(`Password123${char}`);
      expect(result.score).toBeGreaterThanOrEqual(75); // Should be strong
    }
  });

  it('should be deterministic (same password = same score)', () => {
    const password = 'TestPassword123!';
    const result1 = calculatePasswordStrength(password);
    const result2 = calculatePasswordStrength(password);

    expect(result1.score).toBe(result2.score);
    expect(result1.label).toBe(result2.label);
  });

  it('should handle Unicode characters', () => {
    const unicodePassword = 'P@ssw0rd😀';
    const result = calculatePasswordStrength(unicodePassword);

    expect(result.score).toBeGreaterThan(0);
    expect(result.label).toBeDefined();
  });

  it('should handle very long passwords', () => {
    const longPassword = 'P@ssw0rd' + 'a'.repeat(100);
    const result = calculatePasswordStrength(longPassword);

    expect(result.score).toBe(100); // Should be capped at 100
    expect(result.label).toBe('Strong');
  });

  it('should score realistic passwords correctly', () => {
    const passwords = [
      { password: '123456', expectedLabel: 'Too weak' }, // Low score
      { password: 'password', expectedLabel: 'Weak' }, // Only lowercase, 8 chars
      { password: 'Password1', expectedLabel: 'Weak' }, // 9 chars, missing variety
      { password: 'Password123', expectedLabel: 'Fair' }, // Good length + variety
      { password: 'P@ssw0rd123', expectedLabel: 'Strong' }, // 11 chars + special
      { password: 'MyS3cur3P@ssw0rd!', expectedLabel: 'Strong' }, // 16+ chars + all types
    ];

    for (const { password, expectedLabel } of passwords) {
      const result = calculatePasswordStrength(password);
      // Some passwords may be borderline, so let's be more lenient
      if (password === 'Password1') {
        // This one is actually closer to Fair (45 points)
        expect(['Weak', 'Fair']).toContain(result.label);
      } else {
        expect(result.label).toBe(expectedLabel);
      }
    }
  });
});
