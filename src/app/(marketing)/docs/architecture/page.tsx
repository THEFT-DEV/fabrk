import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Layers, Shield, Database, Workflow } from 'lucide-react';

export const metadata = {
  title: 'Architecture Overview - Fabrk Docs',
  description:
    "Understand Fabrk's enterprise-grade architecture. Next.js 15 App Router, Prisma ORM, NextAuth v5, and production-ready patterns.",
};

export default function ArchitecturePage() {
  return (
    <FeatureGuideTemplate
      code="[0x00]"
      category="Core"
      title="Architecture"
      description="A deep dive into Fabrk's enterprise-grade stack and design patterns."
      overview="Built on the T3 Stack philosophy but extended for enterprise SaaS. Next.js 15 (App Router) ensures type safety from database to frontend. Scales from 0 to 1M+ users."
      features={[
        {
          icon: Layers,
          title: 'App Router',
          description: 'Next.js 15 RSC + Server Actions.',
        },
        {
          icon: Shield,
          title: 'NextAuth v5',
          description: 'JWT sessions, RBAC, 2FA.',
        },
        {
          icon: Database,
          title: 'Prisma ORM',
          description: 'Type-safe PostgreSQL queries.',
        },
        {
          icon: Workflow,
          title: 'Service Layer',
          description: 'Clean separation of concerns.',
        },
      ]}
      usage={[
        {
          title: 'Mutation Flow (Server Actions)',
          description: 'Example of a typical server action flow',
          code: `// 1. Client invokes action
const { execute, status } = useAction(updateUserProfile);

// 2. Server Action (src/app/_actions/user.ts)
export const updateUserProfile = action(schema, async ({ input, ctx }) => {
  // 3. Authorization Check
  if (!ctx.session) throw new UnauthorizedError();

  // 4. Database Operation
  const user = await prisma.user.update({...});

  // 5. Revalidation
  revalidatePath('/dashboard/settings');

  return user;
});`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Getting Started', href: '/docs/getting-started' }}
      next={{ title: 'Features', href: '/docs/features/database' }}
    >
      {/* Architecture Diagram */}
      <DocsSection title="High-Level Overview">
        <DocsCard title="SYSTEM DIAGRAM">
          <div className="text-muted-foreground space-y-4 font-mono text-xs">
            {/* Client Layer */}
            <div className="border-border bg-muted border p-4 text-center">
              <div className="text-foreground font-semibold">CLIENT</div>
              <div>Browser / Mobile</div>
            </div>

            <div className="text-muted-foreground/50 flex justify-center">
              <span>│</span>
            </div>
            <div className="text-muted-foreground/50 flex justify-center">
              <span>▼</span>
            </div>

            {/* Edge Layer */}
            <div className="border-border bg-muted border p-4">
              <div className="text-foreground mb-4 text-center font-semibold">EDGE</div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="border-border bg-card border p-4 text-center">
                  <div>Vercel Edge</div>
                  <div>Network</div>
                </div>
                <span className="text-primary">→</span>
                <div className="border-border bg-card border p-4 text-center">
                  <div>Middleware.ts</div>
                  <div>(Auth/Routing)</div>
                </div>
              </div>
            </div>

            <div className="text-muted-foreground/50 flex justify-center">
              <span>│</span>
            </div>
            <div className="text-muted-foreground/50 flex justify-center">
              <span>▼</span>
            </div>

            {/* Server Layer */}
            <div className="border-border bg-muted border p-4">
              <div className="text-foreground mb-4 text-center font-semibold">SERVER</div>
              <div className="border-border bg-card border p-4">
                <div className="mb-4 text-center">Next.js App Router</div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="border-border bg-muted border p-4 text-center">RSC Pages</div>
                  <div className="border-border bg-muted border p-4 text-center">
                    Server Actions
                  </div>
                </div>
              </div>
            </div>

            <div className="text-muted-foreground/50 flex justify-center">
              <span>│</span>
            </div>
            <div className="text-muted-foreground/50 flex justify-center gap-12">
              <span>▼</span>
              <span>▼</span>
              <span>▼</span>
            </div>

            {/* Data Layer */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="border-border bg-muted border p-4 text-center">
                <div className="text-foreground">PostgreSQL</div>
                <div>(Prisma)</div>
              </div>
              <div className="border-border bg-muted border p-4 text-center">
                <div className="text-foreground">Stripe</div>
                <div>Payments</div>
              </div>
              <div className="border-border bg-muted border p-4 text-center">
                <div className="text-foreground">Resend</div>
                <div>Email</div>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Core Components */}
      <DocsSection title="Core Components">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="AUTH SECURITY">
            <p className="mb-4">
              Built on NextAuth.js v5. Sessions are stateless (JWT) by default for edge
              compatibility, but can be database-persisted for strict session management.
            </p>
            <div className="space-y-1">
              <div>├─ Role-Based Access Control (RBAC)</div>
              <div>├─ Middleware protection for routes</div>
              <div>└─ CSRF & Rate Limiting pre-configured</div>
            </div>
          </DocsCard>

          <DocsCard title="DATABASE LAYER">
            <p className="mb-4">
              Prisma ORM provides a type-safe interface to PostgreSQL. We use a &quot;Service
              Layer&quot; pattern to abstract database logic from UI components.
            </p>
            <div className="space-y-1">
              <div>├─ Automated migrations</div>
              <div>├─ Connection pooling (serverless ready)</div>
              <div>└─ Zod schema validation</div>
            </div>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Data Flow */}
      <DocsSection title="Data Flow & Patterns">
        <DocsCard title="DATA FLOW">
          <p className="mb-4">
            We strictly follow unidirectional data flow. Server Actions are used for mutations,
            while React Server Components (RSC) handle data fetching.
          </p>
          <div className="space-y-1">
            <div>├─ RSC for data fetching (no useEffect)</div>
            <div>├─ Server Actions for mutations</div>
            <div>├─ revalidatePath for cache invalidation</div>
            <div>└─ Zod schemas for input validation</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Scalability */}
      <DocsSection title="Scalability Considerations">
        <DocsCard title="SCALABILITY">
          <p className="mb-4">
            Fabrk is designed to scale from 0 to 1M+ users without major refactoring.
          </p>
          <div className="space-y-1">
            <div>├─ Edge Caching: Static assets and ISR pages cached at the edge</div>
            <div>├─ Serverless Database: Compatible with Neon/Supabase for auto-scaling</div>
            <div>└─ Job Queues: Background jobs decoupled using Inngest (optional)</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/features/database"
            title="Database"
            description="Prisma ORM and PostgreSQL setup"
          />
          <DocsLinkCard
            href="/docs/tutorials/authentication"
            title="Authentication"
            description="NextAuth.js v5 configuration"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
