import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { withCsrfProtection } from '@/lib/security/csrf';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { generateApiKey } from '@/lib/api-keys/generator';
import { logger } from '@/lib/logger';

/**
 * GET /api/api-keys
 * List all API keys for the user's organization
 * Returns keys without full key value (only prefix)
 */
export async function GET(_req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get organization ID from query params
    const { searchParams } = new URL(_req.url);
    const organizationId = searchParams.get('organizationId');

    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    // Verify user is a member of the organization
    const membership = await prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId: session.user.id,
        },
      },
    });

    if (!membership) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch API keys for the organization
    const apiKeys = await prisma.apiKey.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        keyPrefix: true,
        permissions: true,
        lastUsedAt: true,
        expiresAt: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(apiKeys);
  } catch (error: unknown) {
    logger.error('Error fetching API keys:', error);
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 });
  }
}

/**
 * POST /api/api-keys
 * Create a new API key
 * Requires ADMIN or OWNER role
 */
export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    // Rate limit: strict (10 requests/minute) for API key creation
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.strict);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
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

    const body = await req.json();
    const { organizationId, name, permissions, expiresAt } = body;

    // Validate required fields
    if (!organizationId || !name || !permissions) {
      return NextResponse.json(
        { error: 'Missing required fields: organizationId, name, permissions' },
        { status: 400 }
      );
    }

    // Validate permissions array
    const validPermissions = ['read', 'write', 'admin'];
    if (!Array.isArray(permissions) || !permissions.every((p) => validPermissions.includes(p))) {
      return NextResponse.json(
        { error: 'Invalid permissions. Must be array of: read, write, admin' },
        { status: 400 }
      );
    }

    // Verify user is ADMIN or OWNER in the organization
    const membership = await prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId: session.user.id,
        },
      },
    });

    if (!membership || (membership.role !== 'ADMIN' && membership.role !== 'OWNER')) {
      return NextResponse.json(
        { error: 'Forbidden. Requires ADMIN or OWNER role.' },
        { status: 403 }
      );
    }

    // Check API key limit (max 10 per organization)
    const existingKeysCount = await prisma.apiKey.count({
      where: { organizationId },
    });

    if (existingKeysCount >= 10) {
      return NextResponse.json(
        { error: 'Maximum of 10 API keys per organization' },
        { status: 400 }
      );
    }

    // Generate API key
    const generated = generateApiKey('live');

    // Parse expiration date if provided
    const expirationDate = expiresAt ? new Date(expiresAt) : null;

    // Create API key in database
    const apiKey = await prisma.apiKey.create({
      data: {
        organizationId,
        userId: session.user.id,
        name,
        keyPrefix: generated.prefix,
        keyHash: generated.hash,
        permissions,
        expiresAt: expirationDate,
      },
      select: {
        id: true,
        name: true,
        keyPrefix: true,
        permissions: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    logger.info('API key created', {
      keyId: apiKey.id,
      organizationId,
      userId: session.user.id,
    });

    // Return the full key ONLY on creation (never shown again)
    return NextResponse.json({
      ...apiKey,
      key: generated.key, // Full key returned only once
    });
  } catch (error: unknown) {
    logger.error('Error creating API key:', error);
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
  }
});
