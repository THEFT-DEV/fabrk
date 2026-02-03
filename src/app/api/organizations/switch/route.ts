/**
 * Switch Organization API Route
 * POST - Switch user's active organization
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { withCsrfProtection } from '@/lib/security/csrf';
import { isOrganizationMember } from '@/lib/teams/organizations';
import { logger } from '@/lib/logger';
import { z } from 'zod';

const switchOrgSchema = z.object({
  organizationId: z.string().min(1, 'Organization ID is required'),
});

export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { organizationId } = switchOrgSchema.parse(body);

    // Verify user is a member of this organization
    const isMember = await isOrganizationMember(organizationId, session.user.id);

    if (!isMember) {
      return NextResponse.json(
        { error: 'You are not a member of this organization' },
        { status: 403 }
      );
    }

    // Note: The active organization is currently stored client-side in localStorage
    // and managed by the OrganizationProvider. To persist across sessions, you can:
    // 1. Add an 'activeOrganizationId' field to the User model in schema.prisma
    // 2. Update the user record here with prisma.user.update()
    // 3. Load the persisted value in the OrganizationProvider on mount

    return NextResponse.json({
      success: true,
      organizationId,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 });
    }

    logger.error('Failed to switch organization:', error);
    return NextResponse.json({ error: 'Failed to switch organization' }, { status: 500 });
  }
});
