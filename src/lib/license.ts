/**
 * License Key Generation
 * Simple utility for generating unique license keys
 */

import crypto from 'crypto';

/**
 * Generate a unique license key
 * Format: XXXX-XXXX-XXXX-XXXX-XXXX
 *
 * Note: Currently generates keys with timestamp for uniqueness.
 * If you add a licenseKey field to your Payment model, you can
 * re-enable database checking for collision detection.
 */
export async function generateUniqueLicenseKey(): Promise<string> {
  // Use timestamp to ensure uniqueness since schema doesn't
  // currently track license keys
  return `${generateLicenseKey()}-${Date.now()}`;
}

/**
 * Generate a random license key
 * Exported for backward compatibility
 */
export function generateLicenseKey(): string {
  const segments = 5;
  const segmentLength = 4;
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed ambiguous characters

  const key: string[] = [];

  for (let i = 0; i < segments; i++) {
    let segment = '';
    for (let j = 0; j < segmentLength; j++) {
      // Use cryptographically secure random number generation
      const randomIndex = crypto.randomInt(0, chars.length);
      segment += chars.charAt(randomIndex);
    }
    key.push(segment);
  }

  return key.join('-');
}

/**
 * Validate license key format
 */
export function validateLicenseKeyFormat(key: string): boolean {
  // Format: XXXX-XXXX-XXXX-XXXX-XXXX
  const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}(-\d+)?$/;
  return pattern.test(key);
}
