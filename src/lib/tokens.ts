import { randomBytes } from 'crypto';

/**
 * Generate a cryptographically secure random token
 * Used for magic link authentication and email verification
 * @param length Number of bytes (default: 32, results in 64-char hex string)
 * @returns Hex-encoded token string
 */
export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Generate a unique license key for purchases
 * Format: XXXX-XXXX-XXXX-XXXX (uppercase alphanumeric)
 * @returns Formatted license key
 */
export function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = 4;
  const segmentLength = 4;

  const key = Array.from({ length: segments }, () => {
    return Array.from({ length: segmentLength }, () => {
      const randomIndex = Math.floor(Math.random() * chars.length);
      return chars[randomIndex];
    }).join('');
  }).join('-');

  return key;
}

/**
 * Calculate token expiration time
 * @param hours Number of hours until expiration (default: 24)
 * @returns Date object representing expiration time
 */
export function getTokenExpiration(hours: number = 24): Date {
  const now = new Date();
  now.setHours(now.getHours() + hours);
  return now;
}

/**
 * Check if a token has expired
 * @param expiresAt Expiration date
 * @returns True if token is expired
 */
export function isTokenExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}
