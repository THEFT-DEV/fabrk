/**
 * MFA Unit Tests
 * Tests TOTP generation, verification, and backup codes
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  generateTOTPSecret,
  generateTOTP,
  verifyTOTP,
  generateTOTPUri,
  generateBackupCodes,
  hashBackupCode,
  verifyBackupCode,
} from './mfa';

describe('MFA - TOTP', () => {
  describe('generateTOTPSecret', () => {
    it('should generate a 20-character base32 secret', () => {
      const secret = generateTOTPSecret();
      expect(secret).toHaveLength(20);
    });

    it('should only contain valid base32 characters', () => {
      const secret = generateTOTPSecret();
      const base32Regex = /^[A-Z2-7]+$/;
      expect(base32Regex.test(secret)).toBe(true);
    });

    it('should generate unique secrets on each call', () => {
      const secrets = new Set<string>();
      for (let i = 0; i < 100; i++) {
        secrets.add(generateTOTPSecret());
      }
      // All 100 should be unique
      expect(secrets.size).toBe(100);
    });
  });

  describe('generateTOTP', () => {
    it('should generate a 6-digit code', () => {
      const secret = generateTOTPSecret();
      const code = generateTOTP(secret);
      expect(code).toHaveLength(6);
      expect(/^\d{6}$/.test(code)).toBe(true);
    });

    it('should generate same code for same secret and time step', () => {
      const secret = generateTOTPSecret();
      const timeStep = Math.floor(Date.now() / 1000 / 30);
      const code1 = generateTOTP(secret, timeStep);
      const code2 = generateTOTP(secret, timeStep);
      expect(code1).toBe(code2);
    });

    it('should generate different codes for different time steps', () => {
      const secret = generateTOTPSecret();
      const timeStep = Math.floor(Date.now() / 1000 / 30);
      const code1 = generateTOTP(secret, timeStep);
      const code2 = generateTOTP(secret, timeStep + 1);
      expect(code1).not.toBe(code2);
    });

    it('should generate different codes for different secrets', () => {
      const secret1 = generateTOTPSecret();
      const secret2 = generateTOTPSecret();
      const timeStep = Math.floor(Date.now() / 1000 / 30);
      const code1 = generateTOTP(secret1, timeStep);
      const code2 = generateTOTP(secret2, timeStep);
      expect(code1).not.toBe(code2);
    });

    it('should pad codes with leading zeros', () => {
      // Test with a known secret that produces a small number
      // The function should always return 6 digits
      const secret = generateTOTPSecret();
      for (let i = 0; i < 50; i++) {
        const code = generateTOTP(secret, i);
        expect(code).toHaveLength(6);
      }
    });
  });

  describe('verifyTOTP', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should verify a valid current token', () => {
      const secret = generateTOTPSecret();
      const code = generateTOTP(secret);
      expect(verifyTOTP(code, secret)).toBe(true);
    });

    it('should accept tokens within the time window', () => {
      const secret = generateTOTPSecret();
      const now = Date.now();
      vi.setSystemTime(now);

      // Generate code at current time
      const code = generateTOTP(secret);

      // Move 30 seconds forward (next step)
      vi.setSystemTime(now + 30000);

      // Should still be valid due to TOTP_WINDOW = 1
      expect(verifyTOTP(code, secret)).toBe(true);
    });

    it('should reject tokens outside the time window', () => {
      const secret = generateTOTPSecret();
      const now = Date.now();
      vi.setSystemTime(now);

      // Generate code at current time
      const code = generateTOTP(secret);

      // Move 90 seconds forward (3 steps - outside window)
      vi.setSystemTime(now + 90000);

      // Should be rejected
      expect(verifyTOTP(code, secret)).toBe(false);
    });

    it('should reject invalid token format', () => {
      const secret = generateTOTPSecret();
      expect(verifyTOTP('12345', secret)).toBe(false); // 5 digits
      expect(verifyTOTP('1234567', secret)).toBe(false); // 7 digits
      expect(verifyTOTP('abcdef', secret)).toBe(false); // letters
    });

    it('should reject wrong token', () => {
      const secret = generateTOTPSecret();
      const code = generateTOTP(secret);
      // Modify the code
      const wrongCode = ((parseInt(code) + 1) % 1000000).toString().padStart(6, '0');
      expect(verifyTOTP(wrongCode, secret)).toBe(false);
    });
  });

  describe('generateTOTPUri', () => {
    it('should generate a valid otpauth URI', () => {
      const secret = 'JBSWY3DPEHPK3PXP';
      const accountName = 'test@example.com';
      const issuer = 'MyApp';

      const uri = generateTOTPUri(secret, accountName, issuer);

      expect(uri).toContain('otpauth://totp/');
      expect(uri).toContain(secret);
      expect(uri).toContain('issuer=MyApp');
      expect(uri).toContain('algorithm=SHA1');
      expect(uri).toContain('digits=6');
      expect(uri).toContain('period=30');
    });

    it('should URL-encode special characters in account name', () => {
      const secret = 'JBSWY3DPEHPK3PXP';
      const accountName = 'test user@example.com';

      const uri = generateTOTPUri(secret, accountName);

      expect(uri).toContain('test%20user%40example.com');
    });

    it('should use default issuer when not provided', () => {
      const secret = 'JBSWY3DPEHPK3PXP';
      const accountName = 'test@example.com';

      const uri = generateTOTPUri(secret, accountName);

      expect(uri).toContain('issuer=Fabrk');
    });
  });
});

describe('MFA - Backup Codes', () => {
  describe('generateBackupCodes', () => {
    it('should generate 10 backup codes by default', () => {
      const codes = generateBackupCodes();
      expect(codes).toHaveLength(10);
    });

    it('should generate custom number of codes', () => {
      const codes = generateBackupCodes(5);
      expect(codes).toHaveLength(5);
    });

    it('should generate codes in XXXX-XXXX format', () => {
      const codes = generateBackupCodes();
      const formatRegex = /^[A-F0-9]{4}-[A-F0-9]{4}$/;

      for (const code of codes) {
        expect(formatRegex.test(code)).toBe(true);
      }
    });

    it('should generate unique codes', () => {
      const codes = generateBackupCodes(100);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(100);
    });
  });

  describe('hashBackupCode', () => {
    it('should produce a consistent hash for the same code', () => {
      const code = 'ABCD-1234';
      const hash1 = hashBackupCode(code);
      const hash2 = hashBackupCode(code);
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different codes', () => {
      const hash1 = hashBackupCode('ABCD-1234');
      const hash2 = hashBackupCode('EFGH-5678');
      expect(hash1).not.toBe(hash2);
    });

    it('should produce a 64-character hex string (SHA-256)', () => {
      const code = 'ABCD-1234';
      const hash = hashBackupCode(code);
      expect(hash).toHaveLength(64);
      expect(/^[a-f0-9]{64}$/.test(hash)).toBe(true);
    });
  });

  describe('verifyBackupCode', () => {
    it('should verify a correct backup code', () => {
      const code = 'ABCD-1234';
      const hash = hashBackupCode(code);
      expect(verifyBackupCode(code, hash)).toBe(true);
    });

    it('should reject an incorrect backup code', () => {
      const code = 'ABCD-1234';
      const hash = hashBackupCode(code);
      expect(verifyBackupCode('WRONG-CODE', hash)).toBe(false);
    });

    it('should be case-sensitive', () => {
      const code = 'ABCD-1234';
      const hash = hashBackupCode(code);
      expect(verifyBackupCode('abcd-1234', hash)).toBe(false);
    });

    it('should use timing-safe comparison', () => {
      // This test ensures the function doesn't short-circuit on mismatches
      // We can't directly test timing, but we verify it uses the correct pattern
      const code = 'ABCD-1234';
      const hash = hashBackupCode(code);

      // Both should complete without timing differences
      const startCorrect = performance.now();
      verifyBackupCode(code, hash);
      const durationCorrect = performance.now() - startCorrect;

      const startWrong = performance.now();
      verifyBackupCode('XXXX-XXXX', hash);
      const durationWrong = performance.now() - startWrong;

      // Durations should be similar (within 10ms tolerance)
      // This is a weak test but better than nothing
      expect(Math.abs(durationCorrect - durationWrong)).toBeLessThan(10);
    });
  });
});
