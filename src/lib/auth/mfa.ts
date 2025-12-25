/**
 * Multi-Factor Authentication (MFA)
 * Complete TOTP implementation with backup codes
 *
 * Features:
 * - TOTP (Time-based One-Time Password)
 * - Backup codes (for account recovery)
 * - QR code generation
 * - Device management
 * - Recovery flows
 */

import * as crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { AuditLog } from '@/lib/security/audit-log';

/**
 * TOTP Implementation
 * RFC 6238 compliant Time-based One-Time Password
 */

const TOTP_WINDOW = 1; // Allow 1 step before/after (30s * 2 = 60s window)
const TOTP_STEP = 30; // 30 seconds
const TOTP_DIGITS = 6;

/**
 * Generate a random secret for TOTP
 */
export function generateTOTPSecret(): string {
  // Base32 alphabet
  const base32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const bytes = crypto.randomBytes(20);

  let secret = '';
  for (let i = 0; i < bytes.length; i++) {
    secret += base32[bytes[i] % 32];
  }

  return secret;
}

/**
 * Generate TOTP token for a given secret
 */
export function generateTOTP(secret: string, timeStep?: number): string {
  const time = timeStep ?? Math.floor(Date.now() / 1000 / TOTP_STEP);
  const counter = Buffer.alloc(8);
  counter.writeBigInt64BE(BigInt(time));

  const key = base32Decode(secret);
  const hmac = crypto.createHmac('sha1', key);
  hmac.update(counter);
  const hash = hmac.digest();

  const offset = hash[hash.length - 1] & 0xf;
  const binary =
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);

  const otp = binary % Math.pow(10, TOTP_DIGITS);
  return otp.toString().padStart(TOTP_DIGITS, '0');
}

/**
 * Verify TOTP token
 */
export function verifyTOTP(token: string, secret: string): boolean {
  const time = Math.floor(Date.now() / 1000 / TOTP_STEP);

  // Check current time and adjacent windows
  for (let i = -TOTP_WINDOW; i <= TOTP_WINDOW; i++) {
    const generatedToken = generateTOTP(secret, time + i);
    if (generatedToken === token) {
      return true;
    }
  }

  return false;
}

/**
 * Generate TOTP URI for QR code
 */
export function generateTOTPUri(
  secret: string,
  accountName: string,
  issuer: string = 'Fabrk'
): string {
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedAccount = encodeURIComponent(accountName);

  return `otpauth://totp/${encodedIssuer}:${encodedAccount}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=${TOTP_DIGITS}&period=${TOTP_STEP}`;
}

/**
 * Base32 decode helper
 */
function base32Decode(secret: string): Buffer {
  const base32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const cleanSecret = secret.toUpperCase().replace(/=+$/, '');

  let bits = 0;
  let value = 0;
  const output: number[] = [];

  for (let i = 0; i < cleanSecret.length; i++) {
    const val = base32.indexOf(cleanSecret[i]);
    if (val === -1) continue;

    value = (value << 5) | val;
    bits += 5;

    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(output);
}

/**
 * Backup Codes
 */

const BACKUP_CODE_COUNT = 10;
const BACKUP_CODE_LENGTH = 8;

/**
 * Generate backup codes
 */
export function generateBackupCodes(count: number = BACKUP_CODE_COUNT): string[] {
  const codes: string[] = [];

  for (let i = 0; i < count; i++) {
    const code = crypto
      .randomBytes(BACKUP_CODE_LENGTH / 2)
      .toString('hex')
      .toUpperCase();

    // Format: XXXX-XXXX
    const formatted = code.match(/.{1,4}/g)?.join('-') || code;
    codes.push(formatted);
  }

  return codes;
}

/**
 * Hash backup code for storage
 */
export function hashBackupCode(code: string): string {
  return crypto.createHash('sha256').update(code).digest('hex');
}

/**
 * Verify backup code
 */
export function verifyBackupCode(code: string, hash: string): boolean {
  const codeHash = hashBackupCode(code);
  return crypto.timingSafeEqual(Buffer.from(codeHash), Buffer.from(hash));
}

/**
 * MFA Operations
 */

/**
 * Enable MFA for user
 */
export async function enableMFA(
  userId: string,
  userEmail: string,
  deviceName?: string
): Promise<{
  secret: string;
  qrCodeUri: string;
  backupCodes: string[];
}> {
  // Generate secret
  const secret = generateTOTPSecret();

  // Generate QR code URI
  const qrCodeUri = generateTOTPUri(secret, userEmail);

  // Generate backup codes
  const backupCodes = generateBackupCodes();

  // Store device (unverified)
  await prisma.mFADevice.create({
    data: {
      userId,
      type: 'totp',
      secret,
      verified: false,
      name: deviceName || 'Authenticator App',
    },
  });

  // Store backup codes (hashed)
  await prisma.backupCode.createMany({
    data: backupCodes.map((code) => ({
      userId,
      code: hashBackupCode(code),
    })),
  });

  // Audit log
  await AuditLog.mfaEnabled(userId, userEmail);

  return {
    secret,
    qrCodeUri,
    backupCodes,
  };
}

/**
 * Verify and activate MFA device
 */
export async function verifyMFADevice(
  userId: string,
  userEmail: string,
  token: string
): Promise<boolean> {
  // Get unverified device
  const device = await prisma.mFADevice.findFirst({
    where: {
      userId,
      verified: false,
    },
  });

  if (!device || !device.secret) {
    return false;
  }

  // Verify token
  const isValid = verifyTOTP(token, device.secret);

  if (isValid) {
    // Mark device as verified
    await prisma.mFADevice.update({
      where: { id: device.id },
      data: {
        verified: true,
        lastUsed: new Date(),
      },
    });

    // Audit log
    await AuditLog.mfaVerified(userId, userEmail);

    return true;
  }

  return false;
}

/**
 * Verify MFA token during login
 */
export async function verifyMFAToken(
  userId: string,
  userEmail: string,
  token: string,
  ipAddress?: string
): Promise<boolean> {
  // Get verified devices
  const devices = await prisma.mFADevice.findMany({
    where: {
      userId,
      verified: true,
    },
  });

  // Try each device
  for (const device of devices) {
    if (device.secret && verifyTOTP(token, device.secret)) {
      // Update last used
      await prisma.mFADevice.update({
        where: { id: device.id },
        data: { lastUsed: new Date() },
      });

      // Audit log
      await AuditLog.mfaSuccess(userId, userEmail, ipAddress);

      return true;
    }
  }

  // Audit log (failed)
  await AuditLog.mfaFailed(userId, userEmail, ipAddress);

  return false;
}

/**
 * Verify backup code
 */
export async function verifyBackupCodeForUser(
  userId: string,
  userEmail: string,
  code: string,
  ipAddress?: string
): Promise<boolean> {
  // Get unused backup codes
  const backupCodes = await prisma.backupCode.findMany({
    where: {
      userId,
      used: false,
    },
  });

  // Try each backup code
  for (const backupCode of backupCodes) {
    if (verifyBackupCode(code, backupCode.code)) {
      // Mark as used
      await prisma.backupCode.update({
        where: { id: backupCode.id },
        data: {
          used: true,
          usedAt: new Date(),
        },
      });

      // Audit log
      await AuditLog.backupCodeUsed(userId, userEmail, ipAddress);

      return true;
    }
  }

  return false;
}

/**
 * Check if user has MFA enabled
 */
export async function hasMFAEnabled(userId: string): Promise<boolean> {
  const count = await prisma.mFADevice.count({
    where: {
      userId,
      verified: true,
    },
  });

  return count > 0;
}

/**
 * Disable MFA for user
 */
export async function disableMFA(userId: string, userEmail: string): Promise<void> {
  // Delete all devices
  await prisma.mFADevice.deleteMany({
    where: { userId },
  });

  // Delete all backup codes
  await prisma.backupCode.deleteMany({
    where: { userId },
  });

  // Audit log
  await AuditLog.mfaDisabled(userId, userEmail);
}

/**
 * Get MFA devices for user
 */
export async function getMFADevices(userId: string) {
  return await prisma.mFADevice.findMany({
    where: { userId },
    select: {
      id: true,
      type: true,
      name: true,
      verified: true,
      lastUsed: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get backup code stats
 */
export async function getBackupCodeStats(userId: string) {
  const total = await prisma.backupCode.count({
    where: { userId },
  });

  const used = await prisma.backupCode.count({
    where: { userId, used: true },
  });

  return {
    total,
    used,
    remaining: total - used,
  };
}

/**
 * Regenerate backup codes
 */
export async function regenerateBackupCodes(userId: string, userEmail: string): Promise<string[]> {
  // Delete old backup codes
  await prisma.backupCode.deleteMany({
    where: { userId },
  });

  // Generate new codes
  const backupCodes = generateBackupCodes();

  // Store new codes
  await prisma.backupCode.createMany({
    data: backupCodes.map((code) => ({
      userId,
      code: hashBackupCode(code),
    })),
  });

  // Audit log
  await AuditLog.backupCodesRegenerated(userId, userEmail);

  return backupCodes;
}
