/**
 * 2FA Verify API Route
 * POST /api/user/2fa/verify
 *
 * Verifies the TOTP code and activates 2FA for the user
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { verifyMFADevice } from '@/lib/auth/mfa';
import { withCsrfProtection } from '@/lib/security/csrf';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { logger } from '@/lib/logger';

export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    // Rate limit: auth (5 requests/15 min) for 2FA verification
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.auth);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many verification attempts. Please try again later.' },
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

    const { token } = await req.json();

    if (!token || typeof token !== 'string' || token.length !== 6) {
      return NextResponse.json(
        { error: 'Invalid token format. Please enter a 6-digit code.' },
        { status: 400 }
      );
    }

    // Verify the token against the unverified MFA device
    const isValid = await verifyMFADevice(session.user.id, session.user.email, token);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid verification code. Please try again.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Two-factor authentication has been enabled successfully.',
    });
  } catch (error: unknown) {
    logger.error('[2FA Verify] Error:', error);
    return NextResponse.json({ error: 'Failed to verify 2FA code' }, { status: 500 });
  }
});
