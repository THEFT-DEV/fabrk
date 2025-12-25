/**
 * Organization Member Management
 * Functions for managing team members
 */

import { prisma } from '@/lib/prisma';
import type { OrgRole } from './types';

/**
 * Check if user has role in organization
 * Helper function used by member management
 */
export async function hasOrganizationRole(
  userId: string,
  organizationId: string,
  roles: OrgRole | OrgRole[]
): Promise<boolean> {
  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });

  if (!member) return false;

  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return allowedRoles.includes(member.role as OrgRole);
}

/**
 * Remove member from organization
 */
export async function removeMember(
  organizationId: string,
  userId: string,
  removedBy: string
): Promise<void> {
  // Can't remove owner
  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });

  if (member?.role === 'OWNER') {
    throw new Error('Cannot remove organization owner');
  }

  // Check if remover has permission
  const hasPermission = await hasOrganizationRole(removedBy, organizationId, ['OWNER', 'ADMIN']);

  if (!hasPermission) {
    throw new Error('Insufficient permissions');
  }

  // Remove member
  await prisma.organizationMember.delete({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });
}

/**
 * Update member role
 */
export async function updateMemberRole(
  organizationId: string,
  userId: string,
  newRole: OrgRole,
  updatedBy: string
): Promise<void> {
  // Can't change owner role
  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });

  if (member?.role === 'OWNER') {
    throw new Error('Cannot change owner role');
  }

  // Check if updater has permission
  const hasPermission = await hasOrganizationRole(updatedBy, organizationId, ['OWNER', 'ADMIN']);

  if (!hasPermission) {
    throw new Error('Insufficient permissions');
  }

  // Update role
  await prisma.organizationMember.update({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
    data: {
      role: newRole,
    },
  });
}

/**
 * Transfer organization ownership
 */
export async function transferOwnership(
  organizationId: string,
  newOwnerId: string,
  currentOwnerId: string
): Promise<void> {
  // Verify current owner
  const currentOwner = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId: currentOwnerId,
      },
    },
  });

  if (currentOwner?.role !== 'OWNER') {
    throw new Error('Only owner can transfer ownership');
  }

  // Verify new owner is a member
  const newOwner = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId: newOwnerId,
      },
    },
  });

  if (!newOwner) {
    throw new Error('New owner must be a member of the organization');
  }

  // Update both roles in a transaction
  await prisma.$transaction([
    // Demote current owner to admin
    prisma.organizationMember.update({
      where: {
        organizationId_userId: {
          organizationId,
          userId: currentOwnerId,
        },
      },
      data: { role: 'ADMIN' },
    }),
    // Promote new owner
    prisma.organizationMember.update({
      where: {
        organizationId_userId: {
          organizationId,
          userId: newOwnerId,
        },
      },
      data: { role: 'OWNER' },
    }),
  ]);
}
