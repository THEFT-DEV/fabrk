import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata = {
  title: 'Prisma Database - Fabrk Docs',
  description:
    'Work with Prisma ORM in Fabrk. Schema design, migrations, queries, and best practices for your SaaS database.',
};

export default function DatabasePage() {
  return (
    <FeatureGuideTemplate
      code="[0x10]"
      category="Features"
      title="Database Prisma"
      description="Type-safe database access with Prisma ORM, including models, queries, migrations, and best practices for PostgreSQL."
      overview="Fabrk uses Prisma ORM with PostgreSQL for type-safe database operations. The system includes pre-built models for users, organizations, payments, and more. It provides type-safe queries with full TypeScript support, migration management for schema changes, seeding scripts for development data, and connection pooling for production."
      setup={[
        {
          title: 'Set Database URL',
          description: 'Add your PostgreSQL connection string to .env.local',
          code: `DATABASE_URL="postgresql://user:password@localhost:5432/fabrk?schema=public"

# For production with connection pooling (e.g., Supabase):
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"`,
          language: 'bash',
        },
        {
          title: 'Initialize Database',
          description: 'Push the schema to your database',
          code: `# Push schema changes (development)
npm run db:push

# Generate Prisma Client
npx prisma generate

# Seed with test data
npm run db:seed

# Reset and reseed
npm run db:reset`,
          language: 'bash',
        },
        {
          title: 'Prisma Studio',
          description: 'Browse and edit data with the visual GUI',
          code: `npm run db:studio
# Opens at http://localhost:5555`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Database Client',
          description: 'Use the singleton client from src/lib/db/index.ts',
          code: `import { prisma } from "@/lib/db";

// Find user by email
const user = await prisma.user.findUnique({
  where: { email: "user@example.com" },
  include: { organizations: true },
});

// Create with relations
const newUser = await prisma.user.create({
  data: {
    email: "new@example.com",
    name: "New User",
    organizations: {
      create: {
        organization: {
          create: {
            name: "My Team",
            slug: "my-team",
          },
        },
        role: "OWNER",
      },
    },
  },
});`,
          language: 'typescript',
        },
        {
          title: 'API Route Queries',
          description: 'Use Prisma in API routes',
          code: `// src/app/api/v1/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });

  return NextResponse.json(user);
}`,
          language: 'typescript',
        },
        {
          title: 'Transactions',
          description: 'Use transactions for atomic operations',
          code: `// Transfer ownership atomically
const result = await prisma.$transaction(async (tx) => {
  // Remove current owner
  await tx.organizationMember.update({
    where: { id: currentOwnerId },
    data: { role: "MEMBER" },
  });

  // Set new owner
  const newOwner = await tx.organizationMember.update({
    where: { id: newOwnerId },
    data: { role: "OWNER" },
  });

  // Log the change
  await tx.auditLog.create({
    data: {
      action: "OWNERSHIP TRANSFERRED",
      organizationId: orgId,
      userId: session.user.id,
    },
  });

  return newOwner;
});`,
          language: 'typescript',
        },
        {
          title: 'Pagination',
          description: 'Implement cursor-based pagination',
          code: `const pageSize = 20;

const users = await prisma.user.findMany({
  take: pageSize + 1, // Fetch one extra to check for next page
  cursor: cursor ? { id: cursor } : undefined,
  skip: cursor ? 1 : 0, // Skip the cursor itself
  orderBy: { createdAt: "desc" },
});

const hasNextPage = users.length > pageSize;
const data = hasNextPage ? users.slice(0, -1) : users;
const nextCursor = hasNextPage ? data[data.length - 1].id : null;

return { data, nextCursor, hasNextPage };`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Getting Started', href: '/docs/getting-started' }}
      next={{ title: 'Payments', href: '/docs/features/payments' }}
    >
      {/* Security Warning for Database URL */}
      <DocsSection title="Security">
        <DocsCallout variant="danger" title="PROTECT YOUR DATABASE CREDENTIALS">
          <div className="space-y-4">
            <p>
              <strong>CRITICAL:</strong> The DATABASE_URL contains your database password and grants
              full access to your data. Leaking it allows attackers to read, modify, or delete all
              data.
            </p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong>Never commit</strong> DATABASE_URL to git. Always use .env.local (in
                .gitignore) for local development.
              </li>
              <li>
                <strong>Server-side only:</strong> DATABASE_URL must NEVER be exposed to the
                browser. Only use in server components, API routes, or build-time scripts.
              </li>
              <li>
                <strong>Secure storage:</strong> Use Vercel Environment Variables (encrypted), AWS
                RDS IAM auth, or secret managers in production.
              </li>
              <li>
                <strong>Connection pooling:</strong> Use connection pooling (Prisma Data Proxy,
                PgBouncer) to prevent connection limit issues and improve security.
              </li>
              <li>
                <strong>Rotate if exposed:</strong> Change database password immediately if
                DATABASE_URL is compromised. Update in hosting provider and restart all services.
              </li>
            </ul>
            <p>
              <strong>Tip:</strong> Use separate databases for development, staging, and production.
              Never connect to production from local dev environment.
            </p>
          </div>
        </DocsCallout>
      </DocsSection>

      {/* Core Models Section */}
      <DocsSection title="Core Models">
        <DocsCard title="CORE MODELS">
          <p className="mb-6">
            Fabrk includes these pre-built models in{' '}
            <code className="bg-muted px-1">prisma/schema.prisma</code>:
          </p>
          <CodeBlock
            language="prisma"
            code={`// Authentication
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String?
  image         String?
  role          Role      @default(USER)
  sessionVersion Int      @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  payments      Payment[]
  organizations OrganizationMember[]
}

// Payments
model Payment {
  id              String   @id @default(cuid())
  userId          String
  stripeSessionId String   @unique
  stripePriceId   String
  amount          Int
  currency        String
  status          String
  createdAt       DateTime @default(now())

  user            User     @relation(fields: [userId], references: [id])
}

// Multi-tenancy
model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  members   OrganizationMember[]
  invites   OrganizationInvite[]
}

model OrganizationMember {
  id             String       @id @default(cuid())
  userId         String
  organizationId String
  role           OrgRole      @default(MEMBER)
  joinedAt       DateTime     @default(now())

  user           User         @relation(fields: [userId], references: [id])
  organization   Organization @relation(fields: [organizationId], references: [id])

  @@unique([userId, organizationId])
}`}
          />
        </DocsCard>
      </DocsSection>

      {/* Migrations Section */}
      <DocsSection title="Migrations">
        <DocsCard title="MIGRATIONS">
          <p className="mb-6">
            For production, use migrations instead of <code className="bg-muted px-1">db:push</code>
            :
          </p>
          <CodeBlock
            language="bash"
            code={`# Create a new migration
npm run db:migrate -- --name add_user_preferences

# Apply migrations in production
npx prisma migrate deploy

# Check migration status
npx prisma migrate status`}
          />
        </DocsCard>
      </DocsSection>

      {/* Common Use Cases Section */}
      <DocsSection title="Common Use Cases">
        <div className="space-y-4">
          <DocsCard title="USER UPDATES">
            <p className="mb-6">
              Update user data with validation. Use <code className="bg-muted px-1">select</code> to
              return only needed fields and avoid exposing sensitive data like passwords.
            </p>
          </DocsCard>

          <DocsCard title="SOFT DELETES">
            <p className="mb-6">
              Add <code className="bg-muted px-1">deletedAt DateTime?</code> field to models and
              filter with{' '}
              <code className="bg-muted px-1">
                where: {'{'} deletedAt: null {'}'}
              </code>{' '}
              for recoverable deletes.
            </p>
          </DocsCard>

          <DocsCard title="FULL TEXT SEARCH">
            <p className="mb-6">
              Use Prisma&apos;s full-text search with PostgreSQL:{' '}
              <code className="bg-muted px-1">
                where: {'{'} name: {'{'} search: &quot;query&quot; {'}'} {'}'}
              </code>{' '}
              for searching user names or content.
            </p>
          </DocsCard>

          <DocsCard title="AGGREGATIONS">
            <p className="mb-6">
              Calculate totals with{' '}
              <code className="bg-muted px-1">
                prisma.payment.aggregate({'{'} _sum: {'{'} amount: true {'}'} {'}'})
              </code>{' '}
              for dashboards and reports.
            </p>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <ul className="space-y-1">
            <li>
              ├─ Always use the singleton client from{' '}
              <code className="bg-muted px-1">@/lib/db</code>
            </li>
            <li>
              ├─ Use <code className="bg-muted px-1">select</code> to fetch only needed fields
            </li>
            <li>├─ Add indexes for frequently queried fields</li>
            <li>├─ Use transactions for multi-step operations</li>
            <li>
              ├─ Never expose sensitive fields like <code className="bg-muted px-1">password</code>{' '}
              in API responses
            </li>
            <li>
              ├─ Use migrations in production, <code className="bg-muted px-1">db:push</code> only
              in development
            </li>
            <li>└─ Set up connection pooling for production (PgBouncer)</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
