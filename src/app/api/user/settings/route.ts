/**
 * User Settings API Route
 * PATCH /api/user/settings
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { withCsrfProtection } from '@/lib/security/csrf';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { z } from 'zod';
import { logger } from '@/lib/logger';

const settingsSchema = z.object({
  // Privacy settings
  privacy: z
    .object({
      profileVisibility: z.boolean().optional(),
      activityTracking: z.boolean().optional(),
      analyticsSharing: z.boolean().optional(),
      searchIndexing: z.boolean().optional(),
      dataRetention: z.boolean().optional(),
    })
    .optional(),

  // Notification preferences
  notifications: z
    .object({
      marketingEmails: z.boolean().optional(),
      productUpdates: z.boolean().optional(),
      securityAlerts: z.boolean().optional(),
      weeklySummary: z.boolean().optional(),
    })
    .optional(),

  // Language preference
  language: z.enum(['en', 'es', 'fr', 'de', 'ja', 'zh', 'pt', 'ko']).optional(),

  // Appearance settings
  appearance: z
    .object({
      theme: z.enum(['light', 'dark', 'system']).optional(),
      language: z.enum(['en', 'es', 'fr', 'de', 'ja']).optional(),
    })
    .optional(),
});

export async function GET(_req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        settings: true,
      },
    });

    return NextResponse.json({ settings: user?.settings || {} });
  } catch (error: unknown) {
    logger.error('[Settings Get] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export const PATCH = withCsrfProtection(async (req: NextRequest) => {
  try {
    // Rate limit: api (60 requests/minute) for settings updates
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.api);

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
    const validatedData = settingsSchema.parse(body);

    // Get current settings
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { settings: true },
    });

    const currentSettings = (currentUser?.settings as Record<string, unknown>) || {};

    // Merge new settings with existing settings
    const updatedSettings = {
      ...currentSettings,
      ...(validatedData.privacy && {
        privacy: {
          ...((currentSettings.privacy as Record<string, unknown>) || {}),
          ...validatedData.privacy,
        },
      }),
      ...(validatedData.notifications && {
        notifications: {
          ...((currentSettings.notifications as Record<string, unknown>) || {}),
          ...validatedData.notifications,
        },
      }),
      ...(validatedData.language && { language: validatedData.language }),
      ...(validatedData.appearance && {
        appearance: {
          ...((currentSettings.appearance as Record<string, unknown>) || {}),
          ...validatedData.appearance,
        },
      }),
    };

    // Update user settings
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        settings: updatedSettings,
      },
      select: {
        id: true,
        settings: true,
      },
    });

    return NextResponse.json({ settings: user.settings });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 });
    }

    logger.error('[Settings Update] Error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
});
