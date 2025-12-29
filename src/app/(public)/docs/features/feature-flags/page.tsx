import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { ToggleLeft, Percent, Users, Settings } from 'lucide-react';

export const metadata = {
  title: 'Feature Flags - Fabrk Documentation',
  description:
    'Learn how to implement feature flags for toggles, gradual rollouts, and A/B testing.',
};

export default function FeatureFlagsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x70]"
      category="Features"
      title="Feature Flags"
      description="Control feature visibility with toggles, percentage rollouts, and user targeting for safe deployments."
      overview="Feature flags allow you to control feature visibility without deploying new code. Use them for gradual rollouts, A/B testing, user targeting, and kill switches."
      features={[
        {
          icon: ToggleLeft,
          title: 'Simple Toggles',
          description: 'Enable/disable features globally with a single switch.',
        },
        {
          icon: Percent,
          title: 'Percentage Rollouts',
          description: 'Roll out to a percentage of users for gradual releases.',
        },
        {
          icon: Users,
          title: 'User Targeting',
          description: 'Enable for specific users, plans, or groups.',
        },
        {
          icon: Settings,
          title: 'Environment-Based',
          description: 'Different flags per environment (dev, staging, prod).',
        },
      ]}
      usage={[
        {
          title: 'Database Schema',
          description: 'Feature flag model in Prisma schema',
          code: `// prisma/schema.prisma
model FeatureFlag {
  id          String   @id @default(cuid())
  key         String   @unique // "new-dashboard", "beta-api"
  name        String   // Human-readable name
  description String?

  enabled     Boolean  @default(false)

  // Percentage rollout (0-100)
  percentage  Int      @default(100)

  // User targeting
  userIds     String[] // Specific user IDs

  // Plan targeting
  plans       String[] // ["pro", "enterprise"]

  // Environment
  environment String   @default("production")

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([key, environment])
}`,
          language: 'prisma',
        },
        {
          title: 'Feature Flag Service',
          description: 'Core service for checking feature flags',
          code: `// src/lib/feature-flags.ts
import { prisma } from "@/lib/db";
import crypto from "crypto";

interface FlagContext {
  userId?: string;
  plan?: string;
  environment?: string;
}

export async function isFeatureEnabled(
  key: string,
  context: FlagContext = {}
): Promise<boolean> {
  const environment = context.environment || process.env.NODE_ENV;

  const flag = await prisma.featureFlag.findFirst({
    where: { key, environment },
  });

  if (!flag) {
    return false; // Default to disabled for unknown flags
  }

  if (!flag.enabled) {
    return false;
  }

  // Check user targeting
  if (flag.userIds.length > 0 && context.userId) {
    if (flag.userIds.includes(context.userId)) {
      return true;
    }
  }

  // Check plan targeting
  if (flag.plans.length > 0 && context.plan) {
    if (!flag.plans.includes(context.plan)) {
      return false;
    }
  }

  // Check percentage rollout
  if (flag.percentage < 100 && context.userId) {
    const hash = crypto
      .createHash("md5")
      .update(\`\${key}:\${context.userId}\`)
      .digest("hex");
    const value = parseInt(hash.slice(0, 8), 16) % 100;

    if (value >= flag.percentage) {
      return false;
    }
  }

  return true;
}

// Get all flags for a user (useful for client-side)
export async function getFeatureFlags(context: FlagContext = {}) {
  const environment = context.environment || process.env.NODE_ENV;

  const flags = await prisma.featureFlag.findMany({
    where: { environment },
  });

  const result: Record<string, boolean> = {};

  for (const flag of flags) {
    result[flag.key] = await isFeatureEnabled(flag.key, context);
  }

  return result;
}`,
          language: 'typescript',
        },
        {
          title: 'Server-Side Usage',
          description: 'Check feature flags in API routes and server components',
          code: `// In API routes
import { auth } from "@/lib/auth";
import { isFeatureEnabled } from "@/lib/feature-flags";

export async function GET(req: Request) {
  const session = await auth();

  const hasNewDashboard = await isFeatureEnabled("new-dashboard", {
    userId: session?.user?.id,
    plan: session?.user?.plan,
  });

  if (!hasNewDashboard) {
    return Response.json(
      { error: "Feature not available" },
      { status: 403 }
    );
  }

  // Return new dashboard data...
}

// In Server Components
import { isFeatureEnabled } from "@/lib/feature-flags";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  const showBetaFeatures = await isFeatureEnabled("beta-features", {
    userId: session?.user?.id,
    plan: session?.user?.plan,
  });

  return (
    <div>
      <h1>Dashboard</h1>
      {showBetaFeatures && (
        <div className="bg-primary/10 p-4 border border-border">
          <h2>Beta Features</h2>
          {/* Beta content */}
        </div>
      )}
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Client-Side Usage',
          description: 'Use feature flags in client components with a React hook',
          code: `// src/hooks/use-feature-flags.ts
"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface FeatureFlagsContextType {
  flags: Record<string, boolean>;
  isEnabled: (key: string) => boolean;
  loading: boolean;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType>({
  flags: {},
  isEnabled: () => false,
  loading: true,
});

export function FeatureFlagsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/feature-flags")
      .then((res) => res.json())
      .then((data) => {
        setFlags(data.flags);
        setLoading(false);
      });
  }, []);

  const isEnabled = (key: string) => flags[key] ?? false;

  return (
    <FeatureFlagsContext.Provider value={{ flags, isEnabled, loading }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags() {
  return useContext(FeatureFlagsContext);
}

export function useFeatureFlag(key: string) {
  const { isEnabled, loading } = useFeatureFlags();
  return { enabled: isEnabled(key), loading };
}

// Usage in components
"use client";

import { useFeatureFlag } from "@/hooks/use-feature-flags";

export function NewFeature() {
  const { enabled, loading } = useFeatureFlag("new-feature");

  if (loading) return null;
  if (!enabled) return null;

  return (
    <div className="bg-success/10 p-4 border border-border">
      <h3>New Feature Available!</h3>
      {/* Feature content */}
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Admin Management',
          description: 'API routes for managing feature flags',
          code: `// POST /api/admin/feature-flags
export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { key, name, description, enabled, percentage, userIds, plans } = await req.json();

  const flag = await prisma.featureFlag.create({
    data: {
      key,
      name,
      description,
      enabled: enabled ?? false,
      percentage: percentage ?? 100,
      userIds: userIds ?? [],
      plans: plans ?? [],
    },
  });

  return Response.json({ flag });
}

// PATCH /api/admin/feature-flags/:id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const updates = await req.json();

  const flag = await prisma.featureFlag.update({
    where: { id: params.id },
    data: updates,
  });

  return Response.json({ flag });
}

// Quick toggle endpoint
// POST /api/admin/feature-flags/:key/toggle
export async function POST(
  req: Request,
  { params }: { params: { key: string } }
) {
  const flag = await prisma.featureFlag.findUnique({
    where: { key: params.key },
  });

  if (!flag) {
    return Response.json({ error: "Flag not found" }, { status: 404 });
  }

  const updated = await prisma.featureFlag.update({
    where: { key: params.key },
    data: { enabled: !flag.enabled },
  });

  return Response.json({ flag: updated });
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Analytics', href: '/docs/features/analytics' }}
      next={{ title: 'Cloud Storage', href: '/docs/features/cloud-storage' }}
    >
      {/* Prerequisites */}
      <DocsSection title="Prerequisites">
        <DocsCard title="BEFORE YOU START">
          <ul className="space-y-2">
            <li className="font-mono text-xs">├─ Completed Getting Started guide</li>
            <li className="font-mono text-xs">├─ Database configured and running</li>
            <li className="font-mono text-xs">├─ Environment variables set up (.env.local)</li>
            <li className="font-mono text-xs">└─ No additional requirements</li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <ul className="space-y-1">
            <li>
              ├─ <strong>Use descriptive keys:</strong>{' '}
              <code className="bg-muted px-1">new-checkout-flow</code> not{' '}
              <code className="bg-muted px-1">flag1</code>
            </li>
            <li>
              ├─ <strong>Start at 0%:</strong> Begin rollouts at 0% and gradually increase
            </li>
            <li>
              ├─ <strong>Add kill switches:</strong> Every major feature should have a flag
            </li>
            <li>
              ├─ <strong>Clean up old flags:</strong> Remove flags once features are fully rolled
              out
            </li>
            <li>
              ├─ <strong>Test both states:</strong> Ensure your app works with flag on and off
            </li>
            <li>
              ├─ <strong>Document flags:</strong> Keep a registry of active flags and their purpose
            </li>
            <li>
              └─ <strong>Use consistent hashing:</strong> Same user always gets same result for %
              rollouts
            </li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
