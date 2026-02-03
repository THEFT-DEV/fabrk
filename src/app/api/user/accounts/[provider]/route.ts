/**
 * OAuth Account Management API Route
 * DELETE /api/user/accounts/[provider]
 *
 * Disconnects an OAuth provider account from the user
 * Ensures user has alternative login method before disconnecting
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { withCsrfProtection } from '@/lib/security/csrf';
import { z } from 'zod';
import { logger } from '@/lib/logger';

const providerSchema = z.enum(['google', 'github', 'facebook', 'twitter']);

interface RouteContext {
  params: Promise<{ provider: string }>;
}

export const DELETE = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
  const { provider: providerParam } = await context.params;
  try {
    const session = await auth();

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate provider
    const validationResult = providerSchema.safeParse(providerParam);
    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
    }

    const provider = validationResult.data;

    // Get user with all accounts and password status
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the account to disconnect
    const accountToDisconnect = user.accounts.find((acc) => acc.provider === provider);

    if (!accountToDisconnect) {
      return NextResponse.json({ error: `${provider} account not connected` }, { status: 404 });
    }

    // Check if user has alternative login method
    const hasPassword = !!user.password;
    const otherAccounts = user.accounts.filter((acc) => acc.provider !== provider);
    const hasOtherOAuthAccounts = otherAccounts.length > 0;

    if (!hasPassword && !hasOtherOAuthAccounts) {
      return NextResponse.json(
        {
          error:
            'Cannot disconnect the only login method. Please set a password or connect another account first.',
        },
        { status: 400 }
      );
    }

    // Delete the account
    await prisma.account.delete({
      where: { id: accountToDisconnect.id },
    });

    return NextResponse.json({
      success: true,
      message: `${provider} account disconnected successfully`,
      remainingAccounts: otherAccounts.map((acc) => ({
        provider: acc.provider,
        id: acc.id,
      })),
    });
  } catch (error: unknown) {
    logger.error('[Account Disconnect] Error:', error);
    return NextResponse.json({ error: 'Failed to disconnect account' }, { status: 500 });
  }
});
