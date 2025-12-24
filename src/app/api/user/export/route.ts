/**
 * Export User Data API Route
 * GET /api/user/export
 * GDPR-compliant data export
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { logger } from '@/lib/logger';

export async function GET(req: NextRequest) {
  try {
    // Rate limit: strict (10 requests/minute) for data export
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.strict);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many export requests. Please try again later.' },
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

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Gather all user data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        accounts: true,
        sessions: true,
        payments: true,
        uploads: true,
        mfaDevices: true,
        backupCodes: true,
        organizations: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove sensitive data
    const exportData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        role: user.role,
        tier: user.tier,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accounts: user.accounts.map((account) => ({
        provider: account.provider,
        type: account.type,
      })),
      sessions: user.sessions.map((session) => ({
        expiresAt: session.expires,
      })),
      payments: user.payments.map((payment) => ({
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        productId: payment.productId,
        createdAt: payment.createdAt,
      })),
      uploads: user.uploads.map((upload) => ({
        id: upload.id,
        filename: upload.filename,
        mimeType: upload.mimeType,
        size: upload.size,
        visibility: upload.visibility,
        createdAt: upload.createdAt,
      })),
      organizations: user.organizations.map((member) => ({
        organizationId: member.organizationId,
        organizationName: member.organization.name,
        role: member.role,
        joinedAt: member.joinedAt,
      })),
      security: {
        mfaEnabled: user.mfaDevices.some((d) => d.verified),
        mfaDevicesCount: user.mfaDevices.filter((d) => d.verified).length,
      },
      exportedAt: new Date().toISOString(),
    };

    // Return as JSON download
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="user-data-${user.id}.json"`,
      },
    });
  } catch (error: unknown) {
    logger.error('[Data Export] Error:', error);
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
  }
}
