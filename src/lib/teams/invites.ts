/**
 * Organization Invitation Management
 * Functions for inviting and onboarding new team members
 */

import { prisma } from '@/lib/prisma';
import * as crypto from 'crypto';
import type { OrgRole } from './types';

/**
 * Check if user is member of organization
 */
export async function isOrganizationMember(
  userId: string,
  organizationId: string
): Promise<boolean> {
  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });

  return !!member;
}

/**
 * Invite user to organization
 */
export async function inviteToOrganization(data: {
  organizationId: string;
  email: string;
  role: OrgRole;
  invitedBy: string;
}): Promise<{
  id: string;
  token: string;
}> {
  // Check if already a member
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    const isMember = await isOrganizationMember(existingUser.id, data.organizationId);

    if (isMember) {
      throw new Error('User is already a member of this organization');
    }
  }

  // Check for existing pending invite
  const existingInvite = await prisma.organizationInvite.findFirst({
    where: {
      organizationId: data.organizationId,
      email: data.email,
      acceptedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  if (existingInvite) {
    return {
      id: existingInvite.id,
      token: existingInvite.token,
    };
  }

  // Generate invite token
  const token = crypto.randomBytes(32).toString('hex');

  // Create invite
  const invite = await prisma.organizationInvite.create({
    data: {
      organizationId: data.organizationId,
      email: data.email,
      role: data.role,
      invitedBy: data.invitedBy,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  // Email is sent by the API route via sendOrganizationInvite

  return {
    id: invite.id,
    token: invite.token,
  };
}

/**
 * Accept organization invite
 */
export async function acceptInvite(
  token: string,
  userId: string
): Promise<{
  organizationId: string;
  role: OrgRole;
}> {
  // Find invite
  const invite = await prisma.organizationInvite.findUnique({
    where: { token },
    include: {
      organization: true,
    },
  });

  if (!invite) {
    throw new Error('Invite not found');
  }

  if (invite.acceptedAt) {
    throw new Error('Invite already accepted');
  }

  if (invite.expiresAt < new Date()) {
    throw new Error('Invite expired');
  }

  // Verify email matches user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.email !== invite.email) {
    throw new Error('Invite email does not match user');
  }

  // Add user to organization
  await prisma.organizationMember.create({
    data: {
      organizationId: invite.organizationId,
      userId,
      role: invite.role,
    },
  });

  // Mark invite as accepted
  await prisma.organizationInvite.update({
    where: { id: invite.id },
    data: {
      acceptedAt: new Date(),
    },
  });

  return {
    organizationId: invite.organizationId,
    role: invite.role as OrgRole,
  };
}
