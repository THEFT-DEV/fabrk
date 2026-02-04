/**
 * Organization by ID API Route (Industry Standard)
 * Accepts both UUID (primary) and slug (backwards compatible)
 *
 * GET - Fetch organization by ID or slug
 * PATCH - Update organization (requires OWNER or ADMIN)
 * DELETE - Delete organization (requires OWNER)
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { withCsrfProtection } from '@/lib/security/csrf';
import {
  getOrganizationBySlug,
  hasOrganizationRole,
  deleteOrganization,
  getUserOrganizations,
} from '@/lib/teams/organizations';
import { prisma } from '@/lib/prisma';
import { OrgRole } from '@/generated/prisma/client';
import { logger } from '@/lib/logger';

// UUID v4 format regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Route context interface for Next.js 15+ async params
interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * Helper: Detect if parameter is UUID or slug, then fetch organization
 */
async function getOrganization(idOrSlug: string) {
  const isUUID = UUID_REGEX.test(idOrSlug);

  if (isUUID) {
    // Look up by ID (primary method)
    return await prisma.organization.findUnique({
      where: { id: idOrSlug },
    });
  } else {
    // Look up by slug (backwards compatible)
    return await getOrganizationBySlug(idOrSlug);
  }
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const organization = await getOrganization(id);

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Get user's role in this organization
    const userOrgs = await getUserOrganizations(session.user.id);
    const userMembership = userOrgs.find((uo) => uo.id === organization.id);

    if (!userMembership) {
      return NextResponse.json(
        { error: 'You are not a member of this organization' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      organization: {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        description: organization.description,
        logo: organization.logo,
        plan: organization.plan,
        role: userMembership.role,
      },
    });
  } catch (error: unknown) {
    logger.error('Failed to fetch organization:', error);
    return NextResponse.json({ error: 'Failed to fetch organization' }, { status: 500 });
  }
}

export const PATCH = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const organization = await getOrganization(id);

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Verify user has permission (must be OWNER or ADMIN)
    const canUpdate = await hasOrganizationRole(organization.id, session.user.id, OrgRole.ADMIN);

    if (!canUpdate) {
      return NextResponse.json(
        { error: "You don't have permission to update this organization" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, description, slug, logo } = body;

    // Validate slug if provided
    if (slug && !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        {
          error: 'Slug can only contain lowercase letters, numbers, and hyphens',
        },
        { status: 400 }
      );
    }

    const updated = await prisma.organization.update({
      where: { id: organization.id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(slug && { slug }),
        ...(logo !== undefined && { logo: logo || null }),
      },
    });

    return NextResponse.json({
      success: true,
      organization: {
        id: updated.id,
        name: updated.name,
        slug: updated.slug,
        description: updated.description,
        logo: updated.logo,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update organization';
    logger.error('Failed to update organization:', errorMessage);

    // Check for Prisma unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'An organization with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: 'Failed to update organization' }, { status: 500 });
  }
});

export const DELETE = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const organization = await getOrganization(id);

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Only OWNER can delete
    const isOwner = await hasOrganizationRole(organization.id, session.user.id, OrgRole.OWNER);

    if (!isOwner) {
      return NextResponse.json(
        { error: 'Only the organization owner can delete it' },
        { status: 403 }
      );
    }

    await deleteOrganization(organization.id, session.user.id);

    return NextResponse.json({
      success: true,
      message: 'Organization deleted successfully',
    });
  } catch (error: unknown) {
    logger.error('Failed to delete organization:', error);
    return NextResponse.json({ error: 'Failed to delete organization' }, { status: 500 });
  }
});
