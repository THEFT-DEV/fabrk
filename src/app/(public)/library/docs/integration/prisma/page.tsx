/**
 * ✅ FABRK COMPONENT
 * Prisma Integration Guide
 * Complete guide for connecting templates to database
 * Uses LibraryGuideTemplate for consistent structure
 */
import { Database } from 'lucide-react';
import { LibraryGuideTemplate, LibraryCodeBlock } from '@/components/library';

export default function PrismaIntegrationPage() {
  return (
    <LibraryGuideTemplate
      breadcrumbs={[{ label: 'Docs', href: '/library/docs' }, { label: 'Prisma Integration' }]}
      icon={Database}
      badgePrefix="INTEGRATION"
      badge="PRISMA_ORM"
      title="Prisma Integration"
      description="Replace mock data with real database queries using Prisma ORM and PostgreSQL."
      overview={{
        text: 'Fabrk templates use mock data by default. This guide shows how to replace mocks with real database queries using Prisma.',
        highlights: [
          'Prisma Client for type-safe database access',
          'Schema design for template data models',
          'CRUD operations in templates',
          'Database migrations and seeding',
        ],
      }}
      steps={[
        {
          code: '0x01',
          title: 'STEP 1: VERIFY SETUP',
          content: (
            <LibraryCodeBlock
              code={`# Check Prisma is installed
npm list @prisma/client

# Verify schema exists
cat prisma/schema.prisma

# Run initial migration
npx prisma db push`}
              language="bash"
              maxHeight="150px"
            />
          ),
        },
        {
          code: '0x02',
          title: 'STEP 2: DEFINE MODELS',
          content: (
            <>
              <p>
                Add models to <code className="bg-muted px-1">prisma/schema.prisma</code>:
              </p>
              <LibraryCodeBlock
                code={`// Example: Analytics Dashboard data
model Metric {
  id          String   @id @default(cuid())
  userId      String
  name        String
  value       Float
  change      Float
  icon        String
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}

model Activity {
  id          String   @id @default(cuid())
  userId      String
  type        String
  description String
  timestamp   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}`}
                language="prisma"
                maxHeight="300px"
              />
            </>
          ),
        },
        {
          code: '0x03',
          title: 'STEP 3: REPLACE MOCK DATA',
          content: (
            <>
              <p className="font-medium">Before (Mock Data):</p>
              <LibraryCodeBlock
                code={`// Mock data in component
const metrics = [
  { name: "Revenue", value: 45231, change: 12.5 },
  { name: "Users", value: 2350, change: 8.1 },
];`}
                language="typescript"
                maxHeight="120px"
              />

              <p className="font-medium">After (Prisma):</p>
              <LibraryCodeBlock
                code={`import { prisma } from "@/lib/db";

export default async function AnalyticsPage() {
  const session = await auth();

  // Fetch real data from database
  const metrics = await prisma.metric.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  return <MetricCards metrics={metrics} />;
}`}
                language="tsx"
                maxHeight="250px"
              />
            </>
          ),
        },
        {
          code: '0x04',
          title: 'COMMON QUERIES',
          content: (
            <>
              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">Fetch user-specific data:</p>
                <LibraryCodeBlock
                  code={`const data = await prisma.item.findMany({
  where: { userId: session.user.id },
});`}
                  language="typescript"
                  maxHeight="100px"
                />
              </div>

              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">Create new record:</p>
                <LibraryCodeBlock
                  code={`await prisma.item.create({
  data: {
    name: "New Item",
    userId: session.user.id,
  },
});`}
                  language="typescript"
                  maxHeight="120px"
                />
              </div>

              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">Update with validation:</p>
                <LibraryCodeBlock
                  code={`await prisma.item.update({
  where: {
    id: itemId,
    userId: session.user.id, // Ensure ownership
  },
  data: { name: newName },
});`}
                  language="typescript"
                  maxHeight="140px"
                />
              </div>
            </>
          ),
        },
      ]}
      troubleshooting={[
        {
          error: '[ERROR]: PrismaClient is not configured',
          solution: 'Run `npx prisma generate`',
        },
        {
          error: '[ERROR]: Too many database connections',
          solution: 'Use the Prisma singleton pattern in `lib/db.ts`',
        },
      ]}
      relatedLinks={[
        {
          label: 'Add Polar.sh',
          href: '/library/docs/integration/polar',
          description: 'for payments and subscriptions',
        },
        {
          label: 'Integrate Resend',
          href: '/library/docs/integration/resend',
          description: 'for transactional emails',
        },
      ]}
    />
  );
}
