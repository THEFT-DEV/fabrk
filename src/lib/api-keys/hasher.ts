import crypto from 'crypto';

/**
 * API Key Hasher
 * Secure hashing and verification for API keys
 */

/**
 * Hash an API key using SHA-256
 * @param key - API key to hash
 * @returns SHA-256 hash in hex format
 */
export function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

/**
 * Verify an API key against its hash
 * Uses constant-time comparison to prevent timing attacks
 * @param key - API key to verify
 * @param hash - Stored hash to compare against
 * @returns True if key matches hash
 */
export function verifyApiKey(key: string, hash: string): boolean {
  const keyHash = hashApiKey(key);

  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(Buffer.from(keyHash, 'hex'), Buffer.from(hash, 'hex'));
}
