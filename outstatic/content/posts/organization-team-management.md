---
title: 'Organization Management: Multi-Tenant Teams'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'organization-team-management'
description: 'Fabrk includes complete organization and team management: invites, roles, permissions, and multi-tenancy patterns.'
publishedAt: '2026-01-19T10:00:00.000Z'
---

**Built-in multi-tenancy for B2B SaaS.**

---

## Why Organizations?

Most B2B SaaS applications require team-based workspaces where multiple users collaborate under a shared account. This pattern, known as multi-tenancy, is fundamental to building scalable business software.

Fabrk includes a complete organization management system that provides:

- **Team workspaces** - Isolated environments for each customer
- **User invitations** - Email-based invite flow with expiration
- **Role-based permissions** - Granular access control (Owner, Admin, Member)
- **Data isolation** - Complete separation between organizations
- **Subscription management** - Billing tied to organizations, not individuals
- **Audit logging** - Track all changes for compliance and debugging
- **Organization switching** - Users can belong to multiple organizations

This guide covers everything you need to implement robust multi-tenancy in your SaaS application.

---

## Data Model Overview

The organization system is built on three core models that work together to provide complete multi-tenancy support.

### Entity Relationship Diagram

```
┌─────────────────┐     ┌─────────────────────────┐     ┌─────────────────┐
│      User       │     │   OrganizationMember    │     │  Organization   │
├─────────────────┤     ├─────────────────────────┤     ├─────────────────┤
│ id              │────<│ userId                  │>────│ id              │
│ name            │     │ organizationId          │     │ name            │
│ email           │     │ role                    │     │ slug            │
│ image           │     │ joinedAt                │     │ logo            │
│ createdAt       │     │ invitedBy               │     │ settings        │
└─────────────────┘     └─────────────────────────┘     │ createdAt       │
                                                         │ updatedAt       │
                                                         └─────────────────┘
                                                                │
                                                                │
                        ┌─────────────────────────┐            │
                        │  OrganizationInvite     │            │
                        ├─────────────────────────┤            │
                        │ id                      │            │
                        │ organizationId          │>───────────┘
                        │ email                   │
                        │ role                    │
                        │ token                   │
                        │ expiresAt               │
                        │ invitedById             │
                        │ createdAt               │
                        └─────────────────────────┘
```

---

## Complete Prisma Schema

Here is the complete data model for the organization system:

```prisma
// Organization - The tenant container
model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  logo      String?

  // Organization settings as JSON for flexibility
  settings  Json     @default("{}")

  // Metadata
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  members      OrganizationMember[]
  invites      OrganizationInvite[]
  subscription Subscription?
  auditLogs    AuditLog[]
  apiKeys      ApiKey[]

  // All org-scoped resources
  projects     Project[]

  @@index([slug])
}

// OrganizationMember - Junction table for user-org relationship
model OrganizationMember {
  id             String     @id @default(cuid())
  userId         String
  organizationId String
  role           MemberRole @default(MEMBER)

  // Track who invited this member
  invitedById    String?

  // Timestamps
  joinedAt       DateTime   @default(now())
  updatedAt      DateTime   @updatedAt

  // Relations
  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  invitedBy    User?        @relation("InvitedMembers", fields: [invitedById], references: [id])

  // Ensure one membership per user per org
  @@unique([userId, organizationId])
  @@index([organizationId])
  @@index([userId])
}

// OrganizationInvite - Pending invitations
model OrganizationInvite {
  id             String     @id @default(cuid())
  organizationId String
  email          String
  role           MemberRole @default(MEMBER)

  // Secure token for invite link
  token          String     @unique @default(cuid())

  // Expiration (default 7 days)
  expiresAt      DateTime

  // Track who sent the invite
  invitedById    String

  // Timestamps
  createdAt      DateTime   @default(now())

  // Relations
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  invitedBy    User         @relation(fields: [invitedById], references: [id])

  // Only one active invite per email per org
  @@unique([organizationId, email])
  @@index([token])
  @@index([email])
}

// MemberRole - Available roles in an organization
enum MemberRole {
  OWNER   // Full access, can delete org
  ADMIN   // Manage members, settings, billing
  MEMBER  // Access resources, no management
  VIEWER  // Read-only access
}

// AuditLog - Track all organization changes
model AuditLog {
  id             String   @id @default(cuid())
  organizationId String
  userId         String?

  // What happened
  action         String   // e.g., "member.invited", "settings.updated"
  resource       String   // e.g., "member", "project", "settings"
  resourceId     String?  // ID of affected resource

  // Change details
  metadata       Json     @default("{}")

  // IP and user agent for security
  ipAddress      String?
  userAgent      String?

  // Timestamp
  createdAt      DateTime @default(now())

  // Relations
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user         User?        @relation(fields: [userId], references: [id])

  @@index([organizationId])
  @@index([userId])
  @@index([action])
  @@index([createdAt])
}

// Subscription - Organization billing
model Subscription {
  id             String   @id
  organizationId String   @unique
  status         String   // active, canceled, past_due, etc.
  priceId        String

  // Stripe/Polar/Lemonsqueezy customer ID
  customerId     String

  // Current period
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime

  // Cancellation
  cancelAtPeriodEnd  Boolean @default(false)
  canceledAt         DateTime?

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@index([customerId])
  @@index([status])
}

// ApiKey - Organization API keys
model ApiKey {
  id             String    @id @default(cuid())
  organizationId String

  name           String    // User-friendly name
  key            String    @unique // The actual API key (hashed)
  keyPrefix      String    // First 8 chars for identification

  // Permissions
  scopes         String[]  // e.g., ["read:projects", "write:projects"]

  // Usage tracking
  lastUsedAt     DateTime?
  usageCount     Int       @default(0)

  // Expiration (optional)
  expiresAt      DateTime?

  // Timestamps
  createdAt      DateTime  @default(now())
  revokedAt      DateTime?

  // Relations
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@index([organizationId])
  @@index([key])
}
```

---

## Roles and Permissions

The permission system uses a role-based approach where each role has specific capabilities.

### Role Hierarchy

| Role | Level | Description |
|------|-------|-------------|
| OWNER | 4 | Full access, can delete org and transfer ownership |
| ADMIN | 3 | Manage members, settings, and billing |
| MEMBER | 2 | Full resource access, no management capabilities |
| VIEWER | 1 | Read-only access to resources |

### Permission Matrix

| Action | OWNER | ADMIN | MEMBER | VIEWER |
|--------|:-----:|:-----:|:------:|:------:|
| View resources | Yes | Yes | Yes | Yes |
| Create resources | Yes | Yes | Yes | No |
| Edit resources | Yes | Yes | Yes | No |
| Delete resources | Yes | Yes | Yes | No |
| Invite members | Yes | Yes | No | No |
| Remove members | Yes | Yes | No | No |
| Change member roles | Yes | Yes | No | No |
| Edit org settings | Yes | Yes | No | No |
| Manage billing | Yes | Yes | No | No |
| View audit logs | Yes | Yes | No | No |
| Manage API keys | Yes | Yes | No | No |
| Delete organization | Yes | No | No | No |
| Transfer ownership | Yes | No | No | No |

### Permission Type Definitions

```typescript
// types/permissions.ts

export type MemberRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';

export type Permission =
  // Resource permissions
  | 'resources:read'
  | 'resources:create'
  | 'resources:update'
  | 'resources:delete'
  // Member permissions
  | 'members:read'
  | 'members:invite'
  | 'members:remove'
  | 'members:update-role'
  // Organization permissions
  | 'org:read'
  | 'org:update'
  | 'org:delete'
  | 'org:transfer'
  // Billing permissions
  | 'billing:read'
  | 'billing:manage'
  // Audit permissions
  | 'audit:read'
  // API key permissions
  | 'api-keys:read'
  | 'api-keys:manage';

// Role to permissions mapping
export const ROLE_PERMISSIONS: Record<MemberRole, Permission[]> = {
  OWNER: [
    'resources:read',
    'resources:create',
    'resources:update',
    'resources:delete',
    'members:read',
    'members:invite',
    'members:remove',
    'members:update-role',
    'org:read',
    'org:update',
    'org:delete',
    'org:transfer',
    'billing:read',
    'billing:manage',
    'audit:read',
    'api-keys:read',
    'api-keys:manage',
  ],
  ADMIN: [
    'resources:read',
    'resources:create',
    'resources:update',
    'resources:delete',
    'members:read',
    'members:invite',
    'members:remove',
    'members:update-role',
    'org:read',
    'org:update',
    'billing:read',
    'billing:manage',
    'audit:read',
    'api-keys:read',
    'api-keys:manage',
  ],
  MEMBER: [
    'resources:read',
    'resources:create',
    'resources:update',
    'resources:delete',
    'members:read',
    'org:read',
  ],
  VIEWER: [
    'resources:read',
    'members:read',
    'org:read',
  ],
};

// Check if a role has a specific permission
export function hasPermission(role: MemberRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

// Get role level for comparison
export function getRoleLevel(role: MemberRole): number {
  const levels: Record<MemberRole, number> = {
    OWNER: 4,
    ADMIN: 3,
    MEMBER: 2,
    VIEWER: 1,
  };
  return levels[role];
}

// Check if role1 can manage role2
export function canManageRole(managerRole: MemberRole, targetRole: MemberRole): boolean {
  return getRoleLevel(managerRole) > getRoleLevel(targetRole);
}
```

---

## Creating Organizations

### Organization Service

```typescript
// lib/organizations/service.ts

import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';
import { MemberRole } from '@prisma/client';

export interface CreateOrganizationInput {
  name: string;
  slug?: string;
  userId: string;
}

export interface OrganizationWithMembership {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  role: MemberRole;
  memberCount: number;
}

/**
 * Create a new organization with the creator as owner
 */
export async function createOrganization(input: CreateOrganizationInput) {
  const { name, userId } = input;

  // Generate slug from name if not provided
  let slug = input.slug || generateSlug(name);

  // Ensure slug is unique
  const existing = await prisma.organization.findUnique({
    where: { slug },
  });

  if (existing) {
    // Append random suffix if slug exists
    slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
  }

  // Create organization with owner in a transaction
  const org = await prisma.$transaction(async (tx) => {
    // Create the organization
    const organization = await tx.organization.create({
      data: {
        name,
        slug,
        settings: {
          allowMemberInvites: false,
          defaultRole: 'MEMBER',
          requireEmailVerification: true,
        },
        members: {
          create: {
            userId,
            role: 'OWNER',
          },
        },
      },
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

    // Log the creation
    await tx.auditLog.create({
      data: {
        organizationId: organization.id,
        userId,
        action: 'organization.created',
        resource: 'organization',
        resourceId: organization.id,
        metadata: {
          name: organization.name,
          slug: organization.slug,
        },
      },
    });

    return organization;
  });

  return org;
}

/**
 * Get all organizations for a user
 */
export async function getUserOrganizations(userId: string): Promise<OrganizationWithMembership[]> {
  const memberships = await prisma.organizationMember.findMany({
    where: { userId },
    include: {
      organization: {
        include: {
          _count: {
            select: { members: true },
          },
        },
      },
    },
    orderBy: {
      joinedAt: 'desc',
    },
  });

  return memberships.map((m) => ({
    id: m.organization.id,
    name: m.organization.name,
    slug: m.organization.slug,
    logo: m.organization.logo,
    role: m.role,
    memberCount: m.organization._count.members,
  }));
}

/**
 * Get organization by ID or slug
 */
export async function getOrganization(idOrSlug: string) {
  return prisma.organization.findFirst({
    where: {
      OR: [
        { id: idOrSlug },
        { slug: idOrSlug },
      ],
    },
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
      _count: {
        select: { members: true },
      },
    },
  });
}

/**
 * Update organization details
 */
export async function updateOrganization(
  orgId: string,
  userId: string,
  data: {
    name?: string;
    slug?: string;
    logo?: string;
    settings?: Record<string, unknown>;
  }
) {
  // Get current org for comparison
  const currentOrg = await prisma.organization.findUnique({
    where: { id: orgId },
  });

  if (!currentOrg) {
    throw new Error('Organization not found');
  }

  // If changing slug, ensure it's unique
  if (data.slug && data.slug !== currentOrg.slug) {
    const existing = await prisma.organization.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      throw new Error('Slug already in use');
    }
  }

  // Update organization and create audit log
  const org = await prisma.$transaction(async (tx) => {
    const updated = await tx.organization.update({
      where: { id: orgId },
      data: {
        name: data.name,
        slug: data.slug,
        logo: data.logo,
        settings: data.settings,
      },
    });

    await tx.auditLog.create({
      data: {
        organizationId: orgId,
        userId,
        action: 'organization.updated',
        resource: 'organization',
        resourceId: orgId,
        metadata: {
          changes: data,
          previous: {
            name: currentOrg.name,
            slug: currentOrg.slug,
            logo: currentOrg.logo,
          },
        },
      },
    });

    return updated;
  });

  return org;
}

/**
 * Delete an organization (owner only)
 */
export async function deleteOrganization(orgId: string, userId: string) {
  // Verify user is owner
  const membership = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId: orgId,
      },
    },
  });

  if (!membership || membership.role !== 'OWNER') {
    throw new Error('Only the owner can delete an organization');
  }

  // Delete organization (cascades to members, invites, etc.)
  await prisma.organization.delete({
    where: { id: orgId },
  });

  return { success: true };
}
```

### Create Organization API Route

```typescript
// app/api/organizations/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createOrganization, getUserOrganizations } from '@/lib/organizations/service';
import { z } from 'zod';

const createOrgSchema = z.object({
  name: z.string().min(2).max(50),
  slug: z.string().min(2).max(30).regex(/^[a-z0-9-]+$/).optional(),
});

// GET - List user's organizations
export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const organizations = await getUserOrganizations(session.user.id);
    return NextResponse.json({ organizations });
  } catch (error) {
    console.error('Failed to fetch organizations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
      { status: 500 }
    );
  }
}

// POST - Create new organization
export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, slug } = createOrgSchema.parse(body);

    const organization = await createOrganization({
      name,
      slug,
      userId: session.user.id,
    });

    return NextResponse.json({ organization }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Failed to create organization:', error);
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    );
  }
}
```

---

## Invitation System

The invitation system handles the complete flow of inviting new members to an organization.

### Invitation Service

```typescript
// lib/organizations/invitations.ts

import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { MemberRole } from '@prisma/client';
import { randomBytes } from 'crypto';
import { addDays } from 'date-fns';

export interface CreateInviteInput {
  organizationId: string;
  email: string;
  role: MemberRole;
  invitedById: string;
}

/**
 * Generate a secure invitation token
 */
function generateInviteToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Create and send an invitation
 */
export async function createInvitation(input: CreateInviteInput) {
  const { organizationId, email, role, invitedById } = input;

  // Verify inviter has permission
  const inviter = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: invitedById,
        organizationId,
      },
    },
    include: {
      user: true,
      organization: true,
    },
  });

  if (!inviter || !['OWNER', 'ADMIN'].includes(inviter.role)) {
    throw new Error('You do not have permission to invite members');
  }

  // Cannot invite to a higher role
  const roleHierarchy: Record<MemberRole, number> = {
    OWNER: 4,
    ADMIN: 3,
    MEMBER: 2,
    VIEWER: 1,
  };

  if (roleHierarchy[role] >= roleHierarchy[inviter.role]) {
    throw new Error('Cannot invite to a role equal or higher than your own');
  }

  // Check if user is already a member
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const existingMember = await prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: existingUser.id,
          organizationId,
        },
      },
    });

    if (existingMember) {
      throw new Error('User is already a member of this organization');
    }
  }

  // Check for existing pending invite
  const existingInvite = await prisma.organizationInvite.findUnique({
    where: {
      organizationId_email: {
        organizationId,
        email,
      },
    },
  });

  if (existingInvite) {
    // Update existing invite instead of creating new one
    const updatedInvite = await prisma.organizationInvite.update({
      where: { id: existingInvite.id },
      data: {
        role,
        token: generateInviteToken(),
        expiresAt: addDays(new Date(), 7),
        invitedById,
      },
    });

    // Send new invite email
    await sendInviteEmail(updatedInvite, inviter);

    return updatedInvite;
  }

  // Create new invitation
  const invite = await prisma.$transaction(async (tx) => {
    const newInvite = await tx.organizationInvite.create({
      data: {
        organizationId,
        email,
        role,
        token: generateInviteToken(),
        expiresAt: addDays(new Date(), 7),
        invitedById,
      },
      include: {
        organization: true,
        invitedBy: true,
      },
    });

    // Create audit log
    await tx.auditLog.create({
      data: {
        organizationId,
        userId: invitedById,
        action: 'member.invited',
        resource: 'invite',
        resourceId: newInvite.id,
        metadata: {
          email,
          role,
        },
      },
    });

    return newInvite;
  });

  // Send invite email
  await sendInviteEmail(invite, inviter);

  return invite;
}

/**
 * Send invitation email
 */
async function sendInviteEmail(
  invite: {
    email: string;
    token: string;
    role: MemberRole;
    organization: { name: string };
  },
  inviter: {
    user: { name: string | null; email: string };
  }
) {
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invite.token}`;

  await sendEmail.teamInvite({
    to: invite.email,
    orgName: invite.organization.name,
    inviterName: inviter.user.name || inviter.user.email,
    role: invite.role,
    inviteUrl,
  });
}

/**
 * Accept an invitation
 */
export async function acceptInvitation(token: string, userId: string) {
  const invite = await prisma.organizationInvite.findUnique({
    where: { token },
    include: {
      organization: true,
    },
  });

  if (!invite) {
    throw new Error('Invitation not found');
  }

  if (invite.expiresAt < new Date()) {
    throw new Error('This invitation has expired');
  }

  // Get the user's email
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Verify email matches (optional - can be relaxed for flexibility)
  if (user.email !== invite.email) {
    throw new Error('This invitation was sent to a different email address');
  }

  // Check if already a member
  const existingMember = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId: invite.organizationId,
      },
    },
  });

  if (existingMember) {
    // Clean up the invite
    await prisma.organizationInvite.delete({
      where: { id: invite.id },
    });
    throw new Error('You are already a member of this organization');
  }

  // Create membership and delete invite in transaction
  const membership = await prisma.$transaction(async (tx) => {
    // Create membership
    const member = await tx.organizationMember.create({
      data: {
        userId,
        organizationId: invite.organizationId,
        role: invite.role,
        invitedById: invite.invitedById,
      },
      include: {
        organization: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    // Delete the used invite
    await tx.organizationInvite.delete({
      where: { id: invite.id },
    });

    // Create audit log
    await tx.auditLog.create({
      data: {
        organizationId: invite.organizationId,
        userId,
        action: 'member.joined',
        resource: 'member',
        resourceId: member.id,
        metadata: {
          role: invite.role,
          invitedBy: invite.invitedById,
        },
      },
    });

    return member;
  });

  return membership;
}

/**
 * Decline an invitation
 */
export async function declineInvitation(token: string) {
  const invite = await prisma.organizationInvite.findUnique({
    where: { token },
  });

  if (!invite) {
    throw new Error('Invitation not found');
  }

  await prisma.organizationInvite.delete({
    where: { id: invite.id },
  });

  return { success: true };
}

/**
 * Get pending invitations for an organization
 */
export async function getOrganizationInvites(organizationId: string) {
  return prisma.organizationInvite.findMany({
    where: {
      organizationId,
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      invitedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Cancel a pending invitation
 */
export async function cancelInvitation(
  inviteId: string,
  organizationId: string,
  userId: string
) {
  // Verify user has permission
  const member = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  });

  if (!member || !['OWNER', 'ADMIN'].includes(member.role)) {
    throw new Error('You do not have permission to cancel invitations');
  }

  const invite = await prisma.organizationInvite.findFirst({
    where: {
      id: inviteId,
      organizationId,
    },
  });

  if (!invite) {
    throw new Error('Invitation not found');
  }

  await prisma.$transaction(async (tx) => {
    await tx.organizationInvite.delete({
      where: { id: inviteId },
    });

    await tx.auditLog.create({
      data: {
        organizationId,
        userId,
        action: 'invite.cancelled',
        resource: 'invite',
        resourceId: inviteId,
        metadata: {
          email: invite.email,
        },
      },
    });
  });

  return { success: true };
}

/**
 * Resend an invitation
 */
export async function resendInvitation(
  inviteId: string,
  organizationId: string,
  userId: string
) {
  const member = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
    include: {
      user: true,
      organization: true,
    },
  });

  if (!member || !['OWNER', 'ADMIN'].includes(member.role)) {
    throw new Error('You do not have permission to resend invitations');
  }

  const invite = await prisma.organizationInvite.findFirst({
    where: {
      id: inviteId,
      organizationId,
    },
  });

  if (!invite) {
    throw new Error('Invitation not found');
  }

  // Update expiration and token
  const updatedInvite = await prisma.organizationInvite.update({
    where: { id: inviteId },
    data: {
      token: generateInviteToken(),
      expiresAt: addDays(new Date(), 7),
    },
    include: {
      organization: true,
    },
  });

  // Send email
  await sendInviteEmail(updatedInvite, member);

  return updatedInvite;
}
```

### Invitation API Routes

```typescript
// app/api/organizations/[orgId]/invites/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createInvitation, getOrganizationInvites } from '@/lib/organizations/invitations';
import { z } from 'zod';

const createInviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['ADMIN', 'MEMBER', 'VIEWER']),
});

// GET - List pending invitations
export async function GET(
  request: Request,
  { params }: { params: { orgId: string } }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const invites = await getOrganizationInvites(params.orgId);
    return NextResponse.json({ invites });
  } catch (error) {
    console.error('Failed to fetch invites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invitations' },
      { status: 500 }
    );
  }
}

// POST - Create new invitation
export async function POST(
  request: Request,
  { params }: { params: { orgId: string } }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, role } = createInviteSchema.parse(body);

    const invite = await createInvitation({
      organizationId: params.orgId,
      email,
      role,
      invitedById: session.user.id,
    });

    return NextResponse.json({ invite }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    console.error('Failed to create invitation:', error);
    return NextResponse.json(
      { error: 'Failed to create invitation' },
      { status: 500 }
    );
  }
}
```

### Accept Invitation API

```typescript
// app/api/invites/[token]/accept/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { acceptInvitation } from '@/lib/organizations/invitations';

export async function POST(
  request: Request,
  { params }: { params: { token: string } }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const membership = await acceptInvitation(params.token, session.user.id);

    return NextResponse.json({
      success: true,
      organization: membership.organization,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    console.error('Failed to accept invitation:', error);
    return NextResponse.json(
      { error: 'Failed to accept invitation' },
      { status: 500 }
    );
  }
}
```

---

## Authorization System

The authorization system provides utilities for checking permissions throughout the application.

### Authorization Service

```typescript
// lib/organizations/authorization.ts

import { prisma } from '@/lib/prisma';
import { MemberRole } from '@prisma/client';
import { ROLE_PERMISSIONS, Permission, hasPermission, canManageRole } from '@/types/permissions';

export interface MembershipInfo {
  isMember: boolean;
  role: MemberRole | null;
  permissions: Permission[];
}

/**
 * Get user's membership info for an organization
 */
export async function getMembership(
  userId: string,
  organizationId: string
): Promise<MembershipInfo> {
  const member = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  });

  if (!member) {
    return {
      isMember: false,
      role: null,
      permissions: [],
    };
  }

  return {
    isMember: true,
    role: member.role,
    permissions: ROLE_PERMISSIONS[member.role],
  };
}

/**
 * Check if user is a member of an organization
 */
export async function isMember(
  userId: string,
  organizationId: string
): Promise<boolean> {
  const member = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  });
  return !!member;
}

/**
 * Check if user has specific role(s)
 */
export async function hasRole(
  userId: string,
  organizationId: string,
  roles: MemberRole[]
): Promise<boolean> {
  const member = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  });
  return !!member && roles.includes(member.role);
}

/**
 * Check if user is admin or owner
 */
export async function isAdmin(
  userId: string,
  organizationId: string
): Promise<boolean> {
  return hasRole(userId, organizationId, ['OWNER', 'ADMIN']);
}

/**
 * Check if user is owner
 */
export async function isOwner(
  userId: string,
  organizationId: string
): Promise<boolean> {
  return hasRole(userId, organizationId, ['OWNER']);
}

/**
 * Check if user has a specific permission
 */
export async function checkPermission(
  userId: string,
  organizationId: string,
  permission: Permission
): Promise<boolean> {
  const membership = await getMembership(userId, organizationId);

  if (!membership.isMember || !membership.role) {
    return false;
  }

  return hasPermission(membership.role, permission);
}

/**
 * Require specific permission (throws if not authorized)
 */
export async function requirePermission(
  userId: string,
  organizationId: string,
  permission: Permission
): Promise<void> {
  const hasAccess = await checkPermission(userId, organizationId, permission);

  if (!hasAccess) {
    throw new Error(`Permission denied: ${permission}`);
  }
}

/**
 * Check if user can manage another user
 */
export async function canManageMember(
  managerId: string,
  targetUserId: string,
  organizationId: string
): Promise<boolean> {
  // Cannot manage yourself
  if (managerId === targetUserId) {
    return false;
  }

  const [manager, target] = await Promise.all([
    prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: managerId,
          organizationId,
        },
      },
    }),
    prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: targetUserId,
          organizationId,
        },
      },
    }),
  ]);

  if (!manager || !target) {
    return false;
  }

  return canManageRole(manager.role, target.role);
}
```

### Authorization Middleware

```typescript
// lib/organizations/middleware.ts

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getMembership, checkPermission } from './authorization';
import { Permission } from '@/types/permissions';

export interface AuthorizedContext {
  userId: string;
  organizationId: string;
  role: string;
  permissions: Permission[];
}

/**
 * Higher-order function to protect API routes
 */
export function withOrgAuth(
  handler: (
    request: Request,
    context: AuthorizedContext
  ) => Promise<Response>,
  options?: {
    requiredPermission?: Permission;
  }
) {
  return async function (
    request: Request,
    { params }: { params: { orgId?: string } }
  ): Promise<Response> {
    // Check session
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get organization ID from params or header
    const organizationId = params?.orgId ||
      request.headers.get('x-organization-id');

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Organization ID required' },
        { status: 400 }
      );
    }

    // Check membership
    const membership = await getMembership(session.user.id, organizationId);

    if (!membership.isMember) {
      return NextResponse.json(
        { error: 'Not a member of this organization' },
        { status: 403 }
      );
    }

    // Check specific permission if required
    if (options?.requiredPermission) {
      const hasAccess = await checkPermission(
        session.user.id,
        organizationId,
        options.requiredPermission
      );

      if (!hasAccess) {
        return NextResponse.json(
          { error: 'Permission denied' },
          { status: 403 }
        );
      }
    }

    // Call handler with authorized context
    return handler(request, {
      userId: session.user.id,
      organizationId,
      role: membership.role!,
      permissions: membership.permissions,
    });
  };
}

/**
 * Example usage in API route
 */
// app/api/organizations/[orgId]/settings/route.ts
export const PATCH = withOrgAuth(
  async (request, { organizationId, userId }) => {
    const body = await request.json();
    // Update settings...
    return NextResponse.json({ success: true });
  },
  { requiredPermission: 'org:update' }
);
```

---

## Member Management

### Member Service

```typescript
// lib/organizations/members.ts

import { prisma } from '@/lib/prisma';
import { MemberRole } from '@prisma/client';
import { canManageMember, hasRole } from './authorization';

/**
 * Get all members of an organization
 */
export async function getOrganizationMembers(organizationId: string) {
  return prisma.organizationMember.findMany({
    where: { organizationId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      invitedBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: [
      { role: 'asc' }, // Owners first, then admins, etc.
      { joinedAt: 'asc' },
    ],
  });
}

/**
 * Update a member's role
 */
export async function updateMemberRole(
  organizationId: string,
  targetUserId: string,
  newRole: MemberRole,
  actorUserId: string
) {
  // Check if actor can manage target
  const canManage = await canManageMember(actorUserId, targetUserId, organizationId);

  if (!canManage) {
    throw new Error('You cannot manage this member');
  }

  // Cannot promote to OWNER (use transfer ownership instead)
  if (newRole === 'OWNER') {
    throw new Error('Cannot promote to owner. Use transfer ownership instead.');
  }

  // Get current membership
  const currentMember = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: targetUserId,
        organizationId,
      },
    },
  });

  if (!currentMember) {
    throw new Error('Member not found');
  }

  // Update role
  const updatedMember = await prisma.$transaction(async (tx) => {
    const member = await tx.organizationMember.update({
      where: {
        userId_organizationId: {
          userId: targetUserId,
          organizationId,
        },
      },
      data: { role: newRole },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Audit log
    await tx.auditLog.create({
      data: {
        organizationId,
        userId: actorUserId,
        action: 'member.role-updated',
        resource: 'member',
        resourceId: member.id,
        metadata: {
          targetUserId,
          previousRole: currentMember.role,
          newRole,
        },
      },
    });

    return member;
  });

  return updatedMember;
}

/**
 * Remove a member from an organization
 */
export async function removeMember(
  organizationId: string,
  targetUserId: string,
  actorUserId: string
) {
  // Self-removal is always allowed (except for owners)
  const isSelfRemoval = actorUserId === targetUserId;

  if (isSelfRemoval) {
    const isTargetOwner = await hasRole(targetUserId, organizationId, ['OWNER']);

    if (isTargetOwner) {
      throw new Error('Owners cannot leave. Transfer ownership first.');
    }
  } else {
    // Check if actor can manage target
    const canManage = await canManageMember(actorUserId, targetUserId, organizationId);

    if (!canManage) {
      throw new Error('You cannot remove this member');
    }
  }

  // Remove member
  await prisma.$transaction(async (tx) => {
    const member = await tx.organizationMember.delete({
      where: {
        userId_organizationId: {
          userId: targetUserId,
          organizationId,
        },
      },
    });

    // Audit log
    await tx.auditLog.create({
      data: {
        organizationId,
        userId: actorUserId,
        action: isSelfRemoval ? 'member.left' : 'member.removed',
        resource: 'member',
        resourceId: member.id,
        metadata: {
          targetUserId,
          role: member.role,
        },
      },
    });
  });

  return { success: true };
}

/**
 * Transfer organization ownership
 */
export async function transferOwnership(
  organizationId: string,
  newOwnerId: string,
  currentOwnerId: string
) {
  // Verify current user is owner
  const isCurrentOwner = await hasRole(currentOwnerId, organizationId, ['OWNER']);

  if (!isCurrentOwner) {
    throw new Error('Only the owner can transfer ownership');
  }

  // Verify new owner is a member
  const newOwnerMember = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: newOwnerId,
        organizationId,
      },
    },
  });

  if (!newOwnerMember) {
    throw new Error('New owner must be a member of the organization');
  }

  // Transfer ownership in transaction
  await prisma.$transaction(async (tx) => {
    // Demote current owner to admin
    await tx.organizationMember.update({
      where: {
        userId_organizationId: {
          userId: currentOwnerId,
          organizationId,
        },
      },
      data: { role: 'ADMIN' },
    });

    // Promote new owner
    await tx.organizationMember.update({
      where: {
        userId_organizationId: {
          userId: newOwnerId,
          organizationId,
        },
      },
      data: { role: 'OWNER' },
    });

    // Audit log
    await tx.auditLog.create({
      data: {
        organizationId,
        userId: currentOwnerId,
        action: 'ownership.transferred',
        resource: 'organization',
        resourceId: organizationId,
        metadata: {
          previousOwnerId: currentOwnerId,
          newOwnerId,
        },
      },
    });
  });

  return { success: true };
}
```

---

## Scoping Queries (Multi-Tenancy)

One of the most critical aspects of multi-tenancy is ensuring data isolation. Every query must be scoped to the current organization.

### Query Scoping Patterns

```typescript
// lib/organizations/scoped-queries.ts

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

/**
 * Base type for organization-scoped models
 */
interface OrgScopedModel {
  organizationId: string;
}

/**
 * Create a scoped query helper for an organization
 */
export function createScopedQueries(organizationId: string) {
  return {
    /**
     * Find many with automatic org scope
     */
    async findMany<T extends OrgScopedModel>(
      model: keyof typeof prisma,
      args?: Omit<Prisma.Args<typeof model, 'findMany'>, 'where'> & {
        where?: Record<string, unknown>;
      }
    ) {
      const prismaModel = prisma[model] as any;
      return prismaModel.findMany({
        ...args,
        where: {
          ...args?.where,
          organizationId,
        },
      });
    },

    /**
     * Find one with automatic org scope
     */
    async findFirst<T extends OrgScopedModel>(
      model: keyof typeof prisma,
      args?: Omit<Prisma.Args<typeof model, 'findFirst'>, 'where'> & {
        where?: Record<string, unknown>;
      }
    ) {
      const prismaModel = prisma[model] as any;
      return prismaModel.findFirst({
        ...args,
        where: {
          ...args?.where,
          organizationId,
        },
      });
    },

    /**
     * Create with automatic org scope
     */
    async create<T extends OrgScopedModel>(
      model: keyof typeof prisma,
      data: Omit<T, 'organizationId' | 'id'>
    ) {
      const prismaModel = prisma[model] as any;
      return prismaModel.create({
        data: {
          ...data,
          organizationId,
        },
      });
    },

    /**
     * Update with org verification
     */
    async update<T extends OrgScopedModel>(
      model: keyof typeof prisma,
      id: string,
      data: Partial<Omit<T, 'organizationId' | 'id'>>
    ) {
      const prismaModel = prisma[model] as any;

      // Verify record belongs to org first
      const existing = await prismaModel.findFirst({
        where: { id, organizationId },
      });

      if (!existing) {
        throw new Error('Record not found or access denied');
      }

      return prismaModel.update({
        where: { id },
        data,
      });
    },

    /**
     * Delete with org verification
     */
    async delete(model: keyof typeof prisma, id: string) {
      const prismaModel = prisma[model] as any;

      // Verify record belongs to org first
      const existing = await prismaModel.findFirst({
        where: { id, organizationId },
      });

      if (!existing) {
        throw new Error('Record not found or access denied');
      }

      return prismaModel.delete({
        where: { id },
      });
    },
  };
}

/**
 * Example usage in a service
 */
export class ProjectService {
  private queries: ReturnType<typeof createScopedQueries>;

  constructor(organizationId: string) {
    this.queries = createScopedQueries(organizationId);
  }

  async getAll() {
    // Automatically scoped to organization
    return this.queries.findMany('project', {
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    return this.queries.findFirst('project', {
      where: { id },
    });
  }

  async create(data: { name: string; description?: string }) {
    return this.queries.create('project', data);
  }

  async update(id: string, data: { name?: string; description?: string }) {
    return this.queries.update('project', id, data);
  }

  async delete(id: string) {
    return this.queries.delete('project', id);
  }
}
```

### Safe Query Patterns

```typescript
// ALWAYS scope queries to the organization

// GOOD - Scoped to organization
const projects = await prisma.project.findMany({
  where: {
    organizationId: currentOrg.id,
    status: 'active',
  },
});

// GOOD - Using scoped helper
const service = new ProjectService(currentOrg.id);
const projects = await service.getAll();

// BAD - No organization scope (data leak!)
const projects = await prisma.project.findMany({
  where: {
    status: 'active',
  },
});

// BAD - Trusting user-provided ID without verification
const project = await prisma.project.findUnique({
  where: { id: projectIdFromUser },
});

// GOOD - Verify ownership before access
const project = await prisma.project.findFirst({
  where: {
    id: projectIdFromUser,
    organizationId: currentOrg.id,
  },
});
```

---

## Organization Context Hook

### React Hook Implementation

```typescript
// hooks/use-organization.ts

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface Organization {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  role: string;
}

interface OrganizationContextType {
  organizations: Organization[];
  currentOrg: Organization | null;
  isLoading: boolean;
  switchOrg: (orgId: string) => void;
  refreshOrganizations: () => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

const ORG_STORAGE_KEY = 'fabrk:currentOrg';

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Fetch organizations on mount
  useEffect(() => {
    refreshOrganizations();
  }, []);

  // Restore current org from storage
  useEffect(() => {
    if (organizations.length > 0 && !currentOrg) {
      const storedOrgId = localStorage.getItem(ORG_STORAGE_KEY);
      const org = organizations.find((o) => o.id === storedOrgId)
        || organizations[0];
      setCurrentOrg(org);
    }
  }, [organizations]);

  async function refreshOrganizations() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/organizations');
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data.organizations);
      }
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function switchOrg(orgId: string) {
    const org = organizations.find((o) => o.id === orgId);
    if (org) {
      setCurrentOrg(org);
      localStorage.setItem(ORG_STORAGE_KEY, orgId);

      // Redirect to dashboard when switching orgs
      if (pathname !== '/dashboard') {
        router.push('/dashboard');
      }
      router.refresh();
    }
  }

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        currentOrg,
        isLoading,
        switchOrg,
        refreshOrganizations,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);

  if (context === undefined) {
    throw new Error('useOrganization must be used within OrganizationProvider');
  }

  return context;
}

/**
 * Hook to get current org ID for API calls
 */
export function useOrgId(): string | null {
  const { currentOrg } = useOrganization();
  return currentOrg?.id ?? null;
}

/**
 * Hook to check if user has specific role
 */
export function useOrgRole() {
  const { currentOrg } = useOrganization();

  return {
    role: currentOrg?.role ?? null,
    isOwner: currentOrg?.role === 'OWNER',
    isAdmin: currentOrg?.role === 'OWNER' || currentOrg?.role === 'ADMIN',
    isMember: !!currentOrg,
    isViewer: currentOrg?.role === 'VIEWER',
  };
}
```

---

## UI Components

### Organization Switcher

```tsx
// components/organization/org-switcher.tsx

'use client';

import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useOrganization } from '@/hooks/use-organization';

export function OrgSwitcher() {
  const router = useRouter();
  const { organizations, currentOrg, switchOrg, isLoading } = useOrganization();

  if (isLoading) {
    return (
      <Button
        variant="outline"
        className={cn('w-[200px] justify-between', mode.radius)}
        disabled
      >
        <span className="text-muted-foreground">LOADING...</span>
      </Button>
    );
  }

  if (!currentOrg) {
    return (
      <Button
        variant="outline"
        className={cn('w-[200px] justify-between', mode.radius)}
        onClick={() => router.push('/onboarding/organization')}
      >
        <span className="text-muted-foreground">> CREATE ORGANIZATION</span>
        <Plus className="ml-2 h-4 w-4" />
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            'w-[200px] justify-between',
            mode.radius,
            mode.font
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <Avatar className="h-5 w-5">
              <AvatarImage src={currentOrg.logo ?? undefined} />
              <AvatarFallback className="text-[10px]">
                {currentOrg.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="truncate uppercase">{currentOrg.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[200px] p-0', mode.radius)}>
        <Command>
          <CommandInput placeholder="SEARCH ORGANIZATION..." />
          <CommandList>
            <CommandEmpty>NO ORGANIZATION FOUND</CommandEmpty>
            <CommandGroup heading="ORGANIZATIONS">
              {organizations.map((org) => (
                <CommandItem
                  key={org.id}
                  value={org.id}
                  onSelect={() => switchOrg(org.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={org.logo ?? undefined} />
                      <AvatarFallback className="text-[10px]">
                        {org.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate uppercase">{org.name}</span>
                    {currentOrg.id === org.id && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => router.push('/settings/organizations/new')}
                className="cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" />
                CREATE ORGANIZATION
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
```

### Member List Component

```tsx
// components/organization/member-list.tsx

'use client';

import { useState } from 'react';
import { MoreHorizontal, Shield, ShieldAlert, User, Eye, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useOrgRole } from '@/hooks/use-organization';

interface Member {
  id: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
  joinedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

interface MemberListProps {
  members: Member[];
  currentUserId: string;
  onRoleChange: (userId: string, newRole: string) => Promise<void>;
  onRemove: (userId: string) => Promise<void>;
}

const ROLE_CONFIG = {
  OWNER: {
    label: 'OWNER',
    icon: ShieldAlert,
    variant: 'default' as const,
  },
  ADMIN: {
    label: 'ADMIN',
    icon: Shield,
    variant: 'secondary' as const,
  },
  MEMBER: {
    label: 'MEMBER',
    icon: User,
    variant: 'outline' as const,
  },
  VIEWER: {
    label: 'VIEWER',
    icon: Eye,
    variant: 'outline' as const,
  },
};

export function MemberList({
  members,
  currentUserId,
  onRoleChange,
  onRemove,
}: MemberListProps) {
  const { isAdmin, isOwner } = useOrgRole();
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setIsUpdating(userId);
    try {
      await onRoleChange(userId, newRole);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleRemove = async () => {
    if (!memberToRemove) return;

    setIsUpdating(memberToRemove.user.id);
    try {
      await onRemove(memberToRemove.user.id);
    } finally {
      setIsUpdating(null);
      setMemberToRemove(null);
    }
  };

  const canManageMember = (member: Member) => {
    // Cannot manage yourself (except leave)
    if (member.user.id === currentUserId) return false;

    // Owners can manage everyone
    if (isOwner) return member.role !== 'OWNER';

    // Admins can manage members and viewers
    if (isAdmin) return ['MEMBER', 'VIEWER'].includes(member.role);

    return false;
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">MEMBER</TableHead>
            <TableHead>ROLE</TableHead>
            <TableHead>JOINED</TableHead>
            <TableHead className="w-[70px]">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => {
            const roleConfig = ROLE_CONFIG[member.role];
            const RoleIcon = roleConfig.icon;
            const isSelf = member.user.id === currentUserId;

            return (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.user.image ?? undefined} />
                      <AvatarFallback>
                        {(member.user.name || member.user.email)
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {member.user.name || 'Unnamed User'}
                        {isSelf && (
                          <span className="text-muted-foreground ml-2">(YOU)</span>
                        )}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {member.user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={roleConfig.variant}
                    className={cn('gap-1', mode.radius)}
                  >
                    <RoleIcon className="h-3 w-3" />
                    {roleConfig.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(member.joinedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {(canManageMember(member) || isSelf) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={isUpdating === member.user.id}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className={mode.radius}>
                        {canManageMember(member) && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(member.user.id, 'ADMIN')}
                              disabled={member.role === 'ADMIN'}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              MAKE ADMIN
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(member.user.id, 'MEMBER')}
                              disabled={member.role === 'MEMBER'}
                            >
                              <User className="mr-2 h-4 w-4" />
                              MAKE MEMBER
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(member.user.id, 'VIEWER')}
                              disabled={member.role === 'VIEWER'}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              MAKE VIEWER
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() => setMemberToRemove(member)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {isSelf ? 'LEAVE ORGANIZATION' : 'REMOVE MEMBER'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <AlertDialog
        open={!!memberToRemove}
        onOpenChange={() => setMemberToRemove(null)}
      >
        <AlertDialogContent className={mode.radius}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {memberToRemove?.user.id === currentUserId
                ? 'LEAVE ORGANIZATION'
                : 'REMOVE MEMBER'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {memberToRemove?.user.id === currentUserId
                ? 'Are you sure you want to leave this organization? You will lose access to all resources.'
                : `Are you sure you want to remove ${memberToRemove?.user.name || memberToRemove?.user.email}? They will lose access to all organization resources.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={mode.radius}>
              > CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              className={cn('bg-destructive text-destructive-foreground', mode.radius)}
            >
              > {memberToRemove?.user.id === currentUserId ? 'LEAVE' : 'REMOVE'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
```

### Invite Form Component

```tsx
// components/organization/invite-form.tsx

'use client';

import { useState } from 'react';
import { Mail, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useOrgId, useOrgRole } from '@/hooks/use-organization';

const inviteSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['ADMIN', 'MEMBER', 'VIEWER']),
});

type InviteFormData = z.infer<typeof inviteSchema>;

interface InviteFormProps {
  onSuccess?: () => void;
}

export function InviteForm({ onSuccess }: InviteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const orgId = useOrgId();
  const { isOwner } = useOrgRole();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      role: 'MEMBER',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: InviteFormData) => {
    if (!orgId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/organizations/${orgId}/invites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send invitation');
      }

      toast({
        title: 'INVITATION SENT',
        description: `An invitation has been sent to ${data.email}`,
      });

      reset();
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'ERROR',
        description: error instanceof Error ? error.message : 'Failed to send invitation',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={mode.radius}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          INVITE TEAM MEMBER
        </CardTitle>
        <CardDescription>
          Send an invitation to add a new member to your organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">EMAIL ADDRESS</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                className={cn('pl-10', mode.radius)}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">ROLE</Label>
            <Select
              value={selectedRole}
              onValueChange={(value) => setValue('role', value as InviteFormData['role'])}
            >
              <SelectTrigger className={mode.radius}>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className={mode.radius}>
                {isOwner && (
                  <SelectItem value="ADMIN">
                    <div className="flex flex-col">
                      <span>ADMIN</span>
                      <span className="text-xs text-muted-foreground">
                        Can manage members, settings, and billing
                      </span>
                    </div>
                  </SelectItem>
                )}
                <SelectItem value="MEMBER">
                  <div className="flex flex-col">
                    <span>MEMBER</span>
                    <span className="text-xs text-muted-foreground">
                      Full access to resources
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="VIEWER">
                  <div className="flex flex-col">
                    <span>VIEWER</span>
                    <span className="text-xs text-muted-foreground">
                      Read-only access
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className={cn('w-full', mode.radius)}
            disabled={isLoading}
          >
            {isLoading ? '> SENDING...' : '> SEND INVITATION'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Pending Invites List

```tsx
// components/organization/pending-invites.tsx

'use client';

import { useState, useEffect } from 'react';
import { Clock, Mail, RotateCw, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useOrgId } from '@/hooks/use-organization';

interface Invite {
  id: string;
  email: string;
  role: string;
  expiresAt: string;
  createdAt: string;
  invitedBy: {
    name: string | null;
    email: string;
  };
}

export function PendingInvites() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const orgId = useOrgId();

  const fetchInvites = async () => {
    if (!orgId) return;

    try {
      const response = await fetch(`/api/organizations/${orgId}/invites`);
      if (response.ok) {
        const data = await response.json();
        setInvites(data.invites);
      }
    } catch (error) {
      console.error('Failed to fetch invites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, [orgId]);

  const handleCancel = async (inviteId: string) => {
    setActionLoading(inviteId);
    try {
      const response = await fetch(
        `/api/organizations/${orgId}/invites/${inviteId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Failed to cancel invitation');
      }

      setInvites(invites.filter((i) => i.id !== inviteId));
      toast({
        title: 'INVITATION CANCELLED',
        description: 'The invitation has been cancelled.',
      });
    } catch (error) {
      toast({
        title: 'ERROR',
        description: 'Failed to cancel invitation',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleResend = async (inviteId: string) => {
    setActionLoading(inviteId);
    try {
      const response = await fetch(
        `/api/organizations/${orgId}/invites/${inviteId}/resend`,
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error('Failed to resend invitation');
      }

      await fetchInvites();
      toast({
        title: 'INVITATION RESENT',
        description: 'A new invitation email has been sent.',
      });
    } catch (error) {
      toast({
        title: 'ERROR',
        description: 'Failed to resend invitation',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(null);
    }
  };

  if (isLoading) {
    return (
      <Card className={mode.radius}>
        <CardHeader>
          <CardTitle>PENDING INVITATIONS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (invites.length === 0) {
    return null;
  }

  return (
    <Card className={mode.radius}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          PENDING INVITATIONS
        </CardTitle>
        <CardDescription>
          {invites.length} pending invitation{invites.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {invites.map((invite) => {
          const isExpired = new Date(invite.expiresAt) < new Date();

          return (
            <div
              key={invite.id}
              className={cn(
                'flex items-center justify-between p-3 border',
                mode.radius,
                isExpired && 'opacity-60'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border bg-muted">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{invite.email}</span>
                    <Badge variant="outline" className={mode.radius}>
                      {invite.role}
                    </Badge>
                    {isExpired && (
                      <Badge variant="destructive" className={mode.radius}>
                        EXPIRED
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Invited {formatDistanceToNow(new Date(invite.createdAt))} ago
                    {' by '}{invite.invitedBy.name || invite.invitedBy.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleResend(invite.id)}
                  disabled={actionLoading === invite.id}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCancel(invite.id)}
                  disabled={actionLoading === invite.id}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
```

---

## Audit Logging

### Audit Service

```typescript
// lib/organizations/audit.ts

import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export interface AuditLogEntry {
  organizationId: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Create an audit log entry
 */
export async function createAuditLog(entry: AuditLogEntry) {
  const headersList = headers();

  return prisma.auditLog.create({
    data: {
      organizationId: entry.organizationId,
      userId: entry.userId,
      action: entry.action,
      resource: entry.resource,
      resourceId: entry.resourceId,
      metadata: entry.metadata ?? {},
      ipAddress: headersList.get('x-forwarded-for')?.split(',')[0] ||
        headersList.get('x-real-ip') ||
        'unknown',
      userAgent: headersList.get('user-agent') || 'unknown',
    },
  });
}

/**
 * Get audit logs for an organization
 */
export async function getAuditLogs(
  organizationId: string,
  options?: {
    limit?: number;
    offset?: number;
    action?: string;
    userId?: string;
    resource?: string;
    startDate?: Date;
    endDate?: Date;
  }
) {
  const where: Record<string, unknown> = { organizationId };

  if (options?.action) {
    where.action = options.action;
  }
  if (options?.userId) {
    where.userId = options.userId;
  }
  if (options?.resource) {
    where.resource = options.resource;
  }
  if (options?.startDate || options?.endDate) {
    where.createdAt = {
      ...(options.startDate && { gte: options.startDate }),
      ...(options.endDate && { lte: options.endDate }),
    };
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
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
      orderBy: { createdAt: 'desc' },
      take: options?.limit || 50,
      skip: options?.offset || 0,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return { logs, total };
}

/**
 * Audit action types
 */
export const AUDIT_ACTIONS = {
  // Organization
  'organization.created': 'Organization created',
  'organization.updated': 'Organization settings updated',
  'organization.deleted': 'Organization deleted',

  // Members
  'member.invited': 'Member invited',
  'member.joined': 'Member joined',
  'member.role-updated': 'Member role changed',
  'member.removed': 'Member removed',
  'member.left': 'Member left organization',

  // Invitations
  'invite.cancelled': 'Invitation cancelled',
  'invite.resent': 'Invitation resent',

  // Ownership
  'ownership.transferred': 'Ownership transferred',

  // Billing
  'billing.subscription-created': 'Subscription created',
  'billing.subscription-updated': 'Subscription updated',
  'billing.subscription-cancelled': 'Subscription cancelled',

  // API Keys
  'api-key.created': 'API key created',
  'api-key.revoked': 'API key revoked',
} as const;
```

### Audit Log UI Component

```tsx
// components/organization/audit-log.tsx

'use client';

import { useState, useEffect } from 'react';
import { Activity, Filter, Download } from 'lucide-react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOrgId } from '@/hooks/use-organization';
import { AUDIT_ACTIONS } from '@/lib/organizations/audit';

interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string | null;
  metadata: Record<string, unknown>;
  ipAddress: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  } | null;
}

export function AuditLogViewer() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const orgId = useOrgId();

  useEffect(() => {
    const fetchLogs = async () => {
      if (!orgId) return;

      setIsLoading(true);
      try {
        const params = new URLSearchParams({ limit: '50' });
        if (filter !== 'all') {
          params.set('resource', filter);
        }

        const response = await fetch(
          `/api/organizations/${orgId}/audit?${params}`
        );
        if (response.ok) {
          const data = await response.json();
          setLogs(data.logs);
        }
      } catch (error) {
        console.error('Failed to fetch audit logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [orgId, filter]);

  const getActionLabel = (action: string) => {
    return AUDIT_ACTIONS[action as keyof typeof AUDIT_ACTIONS] || action;
  };

  const getActionColor = (action: string) => {
    if (action.includes('deleted') || action.includes('removed') || action.includes('revoked')) {
      return 'destructive';
    }
    if (action.includes('created') || action.includes('joined')) {
      return 'default';
    }
    return 'secondary';
  };

  if (isLoading) {
    return (
      <Card className={mode.radius}>
        <CardHeader>
          <CardTitle>AUDIT LOG</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={mode.radius}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              AUDIT LOG
            </CardTitle>
            <CardDescription>
              Track all changes made to your organization
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className={cn('w-[150px]', mode.radius)}>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className={mode.radius}>
                <SelectItem value="all">ALL EVENTS</SelectItem>
                <SelectItem value="organization">ORGANIZATION</SelectItem>
                <SelectItem value="member">MEMBERS</SelectItem>
                <SelectItem value="invite">INVITATIONS</SelectItem>
                <SelectItem value="billing">BILLING</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className={mode.radius}>
              <Download className="mr-2 h-4 w-4" />
              EXPORT
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No audit logs found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>USER</TableHead>
                <TableHead>ACTION</TableHead>
                <TableHead>DETAILS</TableHead>
                <TableHead>IP ADDRESS</TableHead>
                <TableHead>TIMESTAMP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {log.user ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={log.user.image ?? undefined} />
                          <AvatarFallback className="text-xs">
                            {(log.user.name || log.user.email)
                              .substring(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {log.user.name || log.user.email}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">System</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getActionColor(log.action) as any}
                      className={mode.radius}
                    >
                      {getActionLabel(log.action)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-1 py-0.5">
                      {log.resource}
                      {log.resourceId && `:${log.resourceId.substring(0, 8)}`}
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {log.ipAddress || '-'}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(log.createdAt), 'MMM d, yyyy HH:mm')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## Security Considerations

### Input Validation

Always validate and sanitize all inputs:

```typescript
// lib/validation/organization.ts

import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Name contains invalid characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(30, 'Slug must be less than 30 characters')
    .regex(/^[a-z0-9\-]+$/, 'Slug must be lowercase with hyphens only')
    .optional(),
});

export const inviteSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['ADMIN', 'MEMBER', 'VIEWER'], {
    errorMap: () => ({ message: 'Invalid role' }),
  }),
});

export const updateMemberSchema = z.object({
  role: z.enum(['ADMIN', 'MEMBER', 'VIEWER']),
});
```

### Rate Limiting

Implement rate limiting for sensitive operations:

```typescript
// lib/rate-limit.ts

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limit invitations to prevent abuse
export const inviteRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'), // 10 invites per hour
  analytics: true,
  prefix: 'ratelimit:invite',
});

// Rate limit organization creation
export const createOrgRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '24 h'), // 3 orgs per day
  analytics: true,
  prefix: 'ratelimit:create-org',
});

// Usage in API route
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check rate limit
  const { success, remaining, reset } = await inviteRateLimit.limit(
    `user:${session.user.id}`
  );

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    );
  }

  // Proceed with invitation...
}
```

### Secure Token Generation

Use cryptographically secure tokens:

```typescript
// lib/tokens.ts

import { randomBytes, createHash } from 'crypto';

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Hash a token for storage (never store plain tokens)
 */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Generate an API key with prefix
 */
export function generateApiKey(prefix: string = 'sk'): {
  key: string;
  hash: string;
  prefix: string;
} {
  const token = generateSecureToken(32);
  const key = `${prefix}_${token}`;

  return {
    key, // Return to user once, never store plain
    hash: hashToken(key), // Store this
    prefix: key.substring(0, 10), // For identification
  };
}
```

### Session Management

Validate sessions on every request:

```typescript
// lib/session.ts

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function getValidatedSession() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  // Verify user still exists and is active
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      emailVerified: true,
    },
  });

  if (!user) {
    return null;
  }

  return {
    ...session,
    user: {
      ...session.user,
      ...user,
    },
  };
}
```

---

## Best Practices Summary

### 1. Data Isolation

Always scope queries to the organization:

```typescript
// ALWAYS include organizationId in queries
const data = await prisma.resource.findMany({
  where: {
    organizationId: currentOrg.id,
    // ... other filters
  },
});
```

### 2. Permission Checks

Verify permissions before every action:

```typescript
// Check permission before action
const canPerform = await checkPermission(userId, orgId, 'members:invite');
if (!canPerform) {
  throw new Error('Permission denied');
}
```

### 3. Audit Everything

Log all significant actions:

```typescript
// Create audit log for important actions
await createAuditLog({
  organizationId,
  userId,
  action: 'member.role-updated',
  resource: 'member',
  resourceId: memberId,
  metadata: { previousRole, newRole },
});
```

### 4. Handle Edge Cases

Account for edge cases:

```typescript
// Handle last owner scenario
const ownerCount = await prisma.organizationMember.count({
  where: {
    organizationId,
    role: 'OWNER',
  },
});

if (ownerCount <= 1 && action === 'remove' && targetRole === 'OWNER') {
  throw new Error('Cannot remove the last owner');
}
```

### 5. Use Transactions

Wrap related operations in transactions:

```typescript
// Use transactions for multi-step operations
await prisma.$transaction(async (tx) => {
  // Step 1: Update membership
  await tx.organizationMember.update({ ... });

  // Step 2: Create audit log
  await tx.auditLog.create({ ... });

  // Step 3: Send notification
  await tx.notification.create({ ... });
});
```

### 6. Validate Inputs

Always validate user inputs:

```typescript
// Validate with Zod schemas
const validated = createOrganizationSchema.safeParse(input);
if (!validated.success) {
  throw new Error(validated.error.errors[0].message);
}
```

### 7. Rate Limit Sensitive Operations

Protect against abuse:

```typescript
// Rate limit sensitive endpoints
const { success } = await rateLimit.limit(`${operation}:${userId}`);
if (!success) {
  throw new Error('Too many requests');
}
```

### 8. Expire Invitations

Always set expiration on invites:

```typescript
// Set reasonable expiration
const expiresAt = addDays(new Date(), 7);

// Clean up expired invites periodically
await prisma.organizationInvite.deleteMany({
  where: {
    expiresAt: { lt: new Date() },
  },
});
```

---

## Components Included

Fabrk provides these organization components out of the box:

| Component | File | Purpose |
|-----------|------|---------|
| `OrgSwitcher` | `components/organization/org-switcher.tsx` | Switch between organizations |
| `MemberList` | `components/organization/member-list.tsx` | Display and manage team members |
| `InviteForm` | `components/organization/invite-form.tsx` | Invite new members |
| `PendingInvites` | `components/organization/pending-invites.tsx` | View pending invitations |
| `AuditLogViewer` | `components/organization/audit-log.tsx` | View organization activity |
| `OrgSettings` | `components/organization/org-settings.tsx` | Manage organization settings |
| `RoleSelect` | `components/organization/role-select.tsx` | Change member roles |
| `TransferOwnership` | `components/organization/transfer-ownership.tsx` | Transfer organization ownership |

---

## API Routes Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/organizations` | List user's organizations |
| POST | `/api/organizations` | Create new organization |
| GET | `/api/organizations/[orgId]` | Get organization details |
| PATCH | `/api/organizations/[orgId]` | Update organization |
| DELETE | `/api/organizations/[orgId]` | Delete organization |
| GET | `/api/organizations/[orgId]/members` | List members |
| PATCH | `/api/organizations/[orgId]/members/[userId]` | Update member role |
| DELETE | `/api/organizations/[orgId]/members/[userId]` | Remove member |
| GET | `/api/organizations/[orgId]/invites` | List pending invites |
| POST | `/api/organizations/[orgId]/invites` | Create invitation |
| DELETE | `/api/organizations/[orgId]/invites/[inviteId]` | Cancel invitation |
| POST | `/api/organizations/[orgId]/invites/[inviteId]/resend` | Resend invitation |
| POST | `/api/invites/[token]/accept` | Accept invitation |
| POST | `/api/invites/[token]/decline` | Decline invitation |
| GET | `/api/organizations/[orgId]/audit` | Get audit logs |
| POST | `/api/organizations/[orgId]/transfer` | Transfer ownership |

---

## Getting Started

1. **Set up the database**
   ```bash
   npm run db:push
   ```

2. **Import the provider in your app layout**
   ```tsx
   import { OrganizationProvider } from '@/hooks/use-organization';

   export default function Layout({ children }) {
     return (
       <OrganizationProvider>
         {children}
       </OrganizationProvider>
     );
   }
   ```

3. **Add the organization switcher to your header**
   ```tsx
   import { OrgSwitcher } from '@/components/organization/org-switcher';

   <header>
     <OrgSwitcher />
   </header>
   ```

4. **Scope all data queries to the current organization**
   ```tsx
   const { currentOrg } = useOrganization();

   // Always include orgId in API calls
   const data = await fetch(`/api/data?orgId=${currentOrg.id}`);
   ```

5. **Protect routes based on membership**
   ```tsx
   const { isMember, isAdmin } = useOrgRole();

   if (!isMember) {
     return <AccessDenied />;
   }
   ```

---

Multi-tenancy, built in. With complete role-based access control, invitation management, audit logging, and security best practices out of the box.
