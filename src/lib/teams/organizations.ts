/**
 * Team/Organization Management
 * Multi-tenancy support for B2B SaaS
 *
 * Features:
 * - Organization creation and management
 * - Team member invitations
 * - Role-based access control (RBAC)
 * - Organization billing
 * - Member management
 */

import { prisma } from '@/lib/prisma';

// Re-export types
export type { OrgRole } from './types';

// Re-export member management functions
export { hasOrganizationRole, removeMember, updateMemberRole, transferOwnership } from './members';

// Re-export invitation functions
export { isOrganizationMember, inviteToOrganization, acceptInvite } from './invites';

/**
 * Creates a new organization with an initial owner member
 *
 * @param data - Organization creation parameters
 * @param data.name - The organization name
 * @param data.slug - URL-friendly organization identifier (must be unique)
 * @param data.description - Optional organization description
 * @param data.ownerId - User ID of the organization owner
 * @returns Object containing the created organization's id, name, and slug
 * @throws Error if slug is already taken
 *
 * @example
 * ```typescript
 * const org = await createOrganization({
 *   name: "Acme Inc",
 *   slug: "acme-inc",
 *   description: "Enterprise solutions",
 *   ownerId: "user_123"
 * });
 * ```
 */
export async function createOrganization(data: {
  name: string;
  slug: string;
  description?: string;
  ownerId: string;
}): Promise<{
  id: string;
  name: string;
  slug: string;
}> {
  // Check if slug is available
  const existing = await prisma.organization.findUnique({
    where: { slug: data.slug },
  });

  if (existing) {
    throw new Error('Organization slug already taken');
  }

  // Create organization
  const org = await prisma.organization.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      plan: 'FREE',
      members: {
        create: {
          userId: data.ownerId,
          role: 'OWNER',
        },
      },
    },
  });

  return {
    id: org.id,
    name: org.name,
    slug: org.slug,
  };
}

/**
 * Retrieves an organization by its unique slug with all members and user details
 *
 * @param slug - The organization's URL-friendly identifier
 * @returns Organization object with members and user details, or null if not found
 *
 * @example
 * ```typescript
 * const org = await getOrganizationBySlug("acme-inc");
 * if (org) {
 *   console.log(`Found ${org.members.length} members`);
 * }
 * ```
 */
export async function getOrganizationBySlug(slug: string) {
  return await prisma.organization.findUnique({
    where: { slug },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Retrieves all organizations where a user is a member
 *
 * @param userId - The user's ID
 * @returns Array of organizations with user's role and join date, ordered by most recent first
 *
 * @example
 * ```typescript
 * const orgs = await getUserOrganizations("user_123");
 * orgs.forEach(org => {
 *   console.log(`${org.name} - Role: ${org.role}`);
 * });
 * ```
 */
export async function getUserOrganizations(userId: string) {
  const memberships = await prisma.organizationMember.findMany({
    where: { userId },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
          logo: true,
          plan: true,
        },
      },
    },
    orderBy: { joinedAt: 'desc' },
  });

  return memberships.map((m) => ({
    ...m.organization,
    role: m.role,
    joinedAt: m.joinedAt,
  }));
}

/**
 * Permanently deletes an organization and all associated data
 * Only the organization owner can delete the organization.
 * Cascade delete removes all members automatically.
 *
 * @param organizationId - The organization's ID
 * @param userId - ID of the user attempting deletion (must be owner)
 * @throws Error if user is not the organization owner
 *
 * @example
 * ```typescript
 * await deleteOrganization("org_456", "owner_123");
 * ```
 */
export async function deleteOrganization(organizationId: string, userId: string): Promise<void> {
  // Import hasOrganizationRole to avoid circular dependency
  const { hasOrganizationRole } = await import('./members');

  // Verify user is owner
  const isOwner = await hasOrganizationRole(userId, organizationId, 'OWNER');

  if (!isOwner) {
    throw new Error('Only owner can delete organization');
  }

  // Delete organization (cascade will delete members)
  await prisma.organization.delete({
    where: { id: organizationId },
  });
}

/**
 * Retrieves organization settings as a JSON object
 *
 * @param organizationId - The organization's ID
 * @returns Organization settings object (empty object if no settings exist)
 *
 * @example
 * ```typescript
 * const settings = await getOrganizationSettings("org_456");
 * console.log(settings.theme); // Access custom settings
 * ```
 */
export async function getOrganizationSettings(organizationId: string) {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: {
      settings: true,
    },
  });

  return org?.settings || {};
}

/**
 * Updates organization settings (custom JSON configuration)
 * Requires OWNER or ADMIN role.
 *
 * @param organizationId - The organization's ID
 * @param userId - ID of the user updating settings (must be OWNER or ADMIN)
 * @param settings - Settings object to store (replaces existing settings)
 * @throws Error if user lacks permissions
 *
 * @example
 * ```typescript
 * await updateOrganizationSettings("org_456", "admin_123", {
 *   theme: "dark",
 *   notifications: { email: true, slack: false }
 * });
 * ```
 */
export async function updateOrganizationSettings(
  organizationId: string,
  userId: string,
  settings: Record<string, unknown>
): Promise<void> {
  // Import hasOrganizationRole to avoid circular dependency
  const { hasOrganizationRole } = await import('./members');

  // Verify user has permission
  const hasPermission = await hasOrganizationRole(userId, organizationId, ['OWNER', 'ADMIN']);

  if (!hasPermission) {
    throw new Error('Insufficient permissions');
  }

  await prisma.organization.update({
    where: { id: organizationId },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { settings: settings as any },
  });
}
