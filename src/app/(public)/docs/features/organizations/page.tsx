import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { CodeBlock } from '@/components/ui/code-block';
import { Users, CreditCard, LayoutDashboard, Shield } from 'lucide-react';

export const metadata = {
  title: 'Organizations & Teams - Fabrk Docs',
  description:
    'Multi-tenant SaaS with organizations, team members, roles, and invitations. Full RBAC system included.',
};

export default function OrganizationsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x50]"
      category="Features"
      title="Organizations And Teams"
      description="Multi-tenancy support with role-based access control (RBAC), team invitations, and organization management."
      overview="Fabrk includes a complete multi-tenancy system for B2B SaaS applications with organization creation and management, role-based access control (Owner, Admin, Member, Guest), email-based team invitations, organization-scoped data isolation, member management and role changes, and organization settings and branding."
      features={[
        {
          icon: Users,
          title: 'Team Workspaces',
          description:
            "Each organization has its own workspace with projects, files, or data. Members see only their organization's content.",
        },
        {
          icon: CreditCard,
          title: 'Per-Seat Billing',
          description:
            'Charge based on organization member count. Track seats in Stripe metadata and update on member changes.',
        },
        {
          icon: LayoutDashboard,
          title: 'Admin Dashboard',
          description:
            'Give admins a dashboard to manage members, view activity, and configure organization settings.',
        },
        {
          icon: Shield,
          title: 'SSO/SAML Integration',
          description:
            'Enterprise organizations can configure their own identity provider. Members auto-join on first SSO login.',
        },
      ]}
      usage={[
        {
          title: 'Create Organization',
          description: 'API endpoint to create a new organization',
          code: `// src/app/api/v1/organizations/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import slugify from "slugify";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await request.json();

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Organization name must be at least 2 characters" },
      { status: 400 }
    );
  }

  // Generate unique slug
  let slug = slugify(name, { lower: true, strict: true });
  const existing = await prisma.organization.findUnique({
    where: { slug },
  });

  if (existing) {
    slug = \`\${slug}-\${Date.now()}\`;
  }

  // Create org with user as owner
  const organization = await prisma.organization.create({
    data: {
      name,
      slug,
      members: {
        create: {
          userId: session.user.id,
          role: "OWNER",
        },
      },
    },
    include: {
      members: {
        include: { user: { select: { id: true, name: true, email: true } } },
      },
    },
  });

  return NextResponse.json(organization, { status: 201 });
}`,
          language: 'typescript',
        },
        {
          title: 'Invite Members',
          description: 'Send team invitations',
          code: `// src/app/api/v1/organizations/invite/route.ts
import { nanoid } from "nanoid";
import { sendInviteEmail } from "@/lib/email";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { organizationId, email, role = "MEMBER" } = await request.json();

  // Check user has permission to invite
  const membership = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: session.user.id,
        organizationId,
      },
    },
  });

  if (!membership || !["OWNER", "ADMIN"].includes(membership.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Create invite
  const token = nanoid(32);
  const invite = await prisma.organizationInvite.create({
    data: {
      email,
      organizationId,
      role,
      token,
      invitedById: session.user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
    include: {
      organization: { select: { name: true } },
    },
  });

  // Send invite email
  await sendInviteEmail({
    to: email,
    organizationName: invite.organization.name,
    inviterName: session.user.name || session.user.email,
    inviteUrl: \`\${config.app.url}/invite/\${token}\`,
    role,
  });

  return NextResponse.json({ success: true, invite });
}`,
          language: 'typescript',
        },
        {
          title: 'Permission Check Middleware',
          description: 'Reusable permission checking',
          code: `// src/lib/permissions.ts
import { prisma } from "@/lib/db";

type Permission =
  | "view"
  | "create"
  | "invite"
  | "remove_members"
  | "edit_settings"
  | "manage_billing"
  | "delete_org";

const rolePermissions: Record<string, Permission[]> = {
  OWNER: ["view", "create", "invite", "remove_members", "edit_settings", "manage_billing", "delete_org"],
  ADMIN: ["view", "create", "invite", "remove_members", "edit_settings", "manage_billing"],
  MEMBER: ["view", "create"],
  GUEST: ["view"],
};

export async function checkPermission(
  userId: string,
  organizationId: string,
  permission: Permission
): Promise<boolean> {
  const membership = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: { userId, organizationId },
    },
  });

  if (!membership) return false;

  return rolePermissions[membership.role]?.includes(permission) ?? false;
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Emails', href: '/docs/features/emails' }}
      next={{ title: 'Webhooks', href: '/docs/features/webhooks' }}
    >
      {/* Database Schema Section */}
      <DocsSection title="Database Schema">
        <DocsCard title="DATABASE SCHEMA">
          <p className="mb-6">
            Core models in <code className="bg-muted px-1">prisma/schema.prisma</code>:
          </p>
          <CodeBlock
            language="prisma"
            code={`enum OrgRole {
  OWNER
  ADMIN
  MEMBER
  GUEST
}

model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  logo        String?
  website     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  members     OrganizationMember[]
  invites     OrganizationInvite[]
}

model OrganizationMember {
  id             String       @id @default(cuid())
  userId         String
  organizationId String
  role           OrgRole      @default(MEMBER)
  joinedAt       DateTime     @default(now())

  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@unique([userId, organizationId])
  @@index([organizationId])
}

model OrganizationInvite {
  id             String       @id @default(cuid())
  email          String
  organizationId String
  role           OrgRole      @default(MEMBER)
  token          String       @unique
  expiresAt      DateTime
  invitedById    String
  createdAt      DateTime     @default(now())

  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@index([email])
  @@index([token])
}`}
          />
        </DocsCard>
      </DocsSection>

      {/* Role Permissions Section */}
      <DocsSection title="Role Permissions">
        <DocsCard title="ROLE PERMISSIONS">
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="py-2 text-left uppercase">Permission</th>
                  <th className="py-2 text-center uppercase">Owner</th>
                  <th className="py-2 text-center uppercase">Admin</th>
                  <th className="py-2 text-center uppercase">Member</th>
                  <th className="py-2 text-center uppercase">Guest</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="py-2">View organization</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">Yes</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="py-2">Create/edit content</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">No</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="py-2">Invite members</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">No</td>
                  <td className="text-center">No</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="py-2">Remove members</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">No</td>
                  <td className="text-center">No</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="py-2">Edit org settings</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">No</td>
                  <td className="text-center">No</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="py-2">Manage billing</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">No</td>
                  <td className="text-center">No</td>
                </tr>
                <tr>
                  <td className="py-2">Delete organization</td>
                  <td className="text-center">Yes</td>
                  <td className="text-center">No</td>
                  <td className="text-center">No</td>
                  <td className="text-center">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <ul className="space-y-1">
            <li>├─ Always check permissions before any organization action</li>
            <li>├─ Use database transactions for multi-step operations</li>
            <li>
              ├─ Scope all queries by <code className="bg-muted px-1">organizationId</code>
            </li>
            <li>├─ Send email notifications for important events (invite, role change)</li>
            <li>├─ Allow users to belong to multiple organizations</li>
            <li>├─ Implement organization switching in the UI</li>
            <li>├─ Log audit trail for compliance (member changes, permission changes)</li>
            <li>├─ Handle organization deletion carefully (soft delete recommended)</li>
            <li>└─ Prevent owners from removing themselves without transferring ownership</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
