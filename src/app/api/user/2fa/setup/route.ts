/**
 * 2FA Setup API Route
 * POST /api/user/2fa/setup
 *
 * Generates a new TOTP secret and QR code for 2FA setup
 * Returns the secret and QR code URI along with backup codes
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  generateTOTPSecret,
  generateTOTPUri,
  generateBackupCodes,
  hashBackupCode,
} from '@/lib/auth/mfa';
import { prisma } from '@/lib/prisma';
import { AuditLog } from '@/lib/security/audit-log';
import { withCsrfProtection } from '@/lib/security/csrf';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { logger } from '@/lib/logger';

export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    // Rate limit: auth (5 requests/15 min) for 2FA setup
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.auth);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many 2FA setup attempts. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'Retry-After': Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const session = await auth();

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user already has an unverified MFA device
    const existingUnverified = await prisma.mFADevice.findFirst({
      where: {
        userId: session.user.id,
        verified: false,
      },
    });

    // If there's an existing unverified device, delete it first
    if (existingUnverified) {
      await prisma.mFADevice.delete({
        where: { id: existingUnverified.id },
      });

      // Also delete any existing backup codes for unverified setup
      await prisma.backupCode.deleteMany({
        where: {
          userId: session.user.id,
          used: false,
        },
      });
    }

    // Generate TOTP secret
    const secret = generateTOTPSecret();

    // Generate QR code URI for authenticator apps
    const qrCodeUri = generateTOTPUri(secret, session.user.email);

    // Generate backup codes
    const backupCodes = generateBackupCodes();

    // Create unverified MFA device
    await prisma.mFADevice.create({
      data: {
        userId: session.user.id,
        type: 'totp',
        secret,
        verified: false,
        name: 'Authenticator App',
      },
    });

    // Store hashed backup codes
    await prisma.backupCode.createMany({
      data: backupCodes.map((code) => ({
        userId: session.user.id,
        code: hashBackupCode(code),
      })),
    });

    // Audit log
    await AuditLog.mfaEnabled(session.user.id, session.user.email);

    return NextResponse.json({
      secret,
      qrCodeUri,
      backupCodes,
      message: '2FA setup initiated. Please verify with your authenticator app.',
    });
  } catch (error: unknown) {
    logger.error('[2FA Setup] Error:', error);
    return NextResponse.json({ error: 'Failed to setup 2FA' }, { status: 500 });
  }
});
