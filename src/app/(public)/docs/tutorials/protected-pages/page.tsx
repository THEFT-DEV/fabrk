import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Shield, Lock, User, Eye } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Protected Pages - Fabrk Docs',
  description:
    'Secure pages with authentication. Middleware protection, role-based access, and redirect patterns.',
};

export default function ProtectedPagesTutorialPage() {
  return (
    <FeatureGuideTemplate
      code="[0x50]"
      category="Tutorials"
      title="Protected Pages"
      description="Create pages that require authentication to access."
      overview="Middleware-based route protection with automatic redirects, role-based access control, and conditional UI rendering based on authentication state."
      features={[
        {
          icon: Shield,
          title: 'Middleware',
          description: 'Automatic route protection.',
        },
        {
          icon: Lock,
          title: 'Role-Based',
          description: 'USER, ADMIN, SUPER_ADMIN roles.',
        },
        {
          icon: User,
          title: 'Session Hook',
          description: 'Client-side auth state.',
        },
        {
          icon: Eye,
          title: 'Conditional UI',
          description: 'Show/hide based on auth.',
        },
      ]}
      usage={[
        {
          title: 'Creating a Protected Page',
          description: 'Create your page under a protected directory',
          code: `// src/app/(dashboard)/dashboard/my-feature/page.tsx

import { auth } from "@/lib/auth";

export default async function MyFeaturePage() {
  const session = await auth();

  // Session is guaranteed to exist (middleware handles redirect)
  const user = session!.user;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Adding New Protected Routes',
          description: 'Update middleware to protect additional routes',
          code: `// src/middleware.ts

// Find this section and add your routes:
const isOnDashboard = pathnameWithoutLocale.startsWith('/dashboard');
const isOnAdmin = pathnameWithoutLocale.startsWith('/admin');
const isOnBilling = pathnameWithoutLocale.startsWith('/billing');
const isOnSettings = pathnameWithoutLocale.startsWith('/settings');
const isOnMyFeature = pathnameWithoutLocale.startsWith('/my-feature'); // Add this

const isProtectedRoute = isOnDashboard || isOnAdmin || isOnBilling || isOnSettings || isOnMyFeature;`,
          language: 'typescript',
        },
        {
          title: 'Role-Based Access Control',
          description: 'Restrict pages by user role',
          code: `// src/app/(dashboard)/admin/page.tsx

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  // Check for admin role
  if (session?.user?.role !== 'ADMIN' && session?.user?.role !== 'SUPER_ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin-only content */}
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Client Component Protection',
          description: 'Use the session hook for client components',
          code: `"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function ProtectedClientComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Conditional UI Based on Auth',
          description: 'Show different content based on authentication state',
          code: `"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export function NavBar() {
  const { data: session } = useSession();

  return (
    <nav>
      <Link href="/">Home</Link>

      {session ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link href="/auth/signin">Sign In</Link>
          <Link href="/auth/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}`,
          language: 'tsx',
        },
      ]}
      previous={{ title: 'File Uploads', href: '/docs/tutorials/file-uploads' }}
      next={{ title: 'Webhooks', href: '/docs/tutorials/webhooks' }}
    >
      {/* Protected Routes */}
      <DocsSection title="Auto-Protected Routes">
        <DocsCard title="PROTECTED ROUTES">
          <p className="mb-4">
            Fabrk protects these routes via middleware. Unauthenticated users are automatically
            redirected to the home page:
          </p>
          <div className="space-y-1">
            <div>
              ├─ <code className="bg-muted px-1">/dashboard/*</code>
            </div>
            <div>
              ├─ <code className="bg-muted px-1">/admin/*</code>
            </div>
            <div>
              ├─ <code className="bg-muted px-1">/billing/*</code>
            </div>
            <div>
              └─ <code className="bg-muted px-1">/settings/*</code>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* User Roles */}
      <DocsSection title="Available Roles">
        <DocsCard title="USER ROLES">
          <div className="space-y-1">
            <div>
              ├─ <code className="bg-muted px-1">USER</code> - Default role for all users
            </div>
            <div>
              ├─ <code className="bg-muted px-1">ADMIN</code> - Administrative access
            </div>
            <div>
              └─ <code className="bg-muted px-1">SUPER ADMIN</code> - Full system access
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Troubleshooting */}
      <DocsSection title="Troubleshooting">
        <DocsCard title="COMMON ERRORS">
          <div className="space-y-4">
            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Infinite redirect loop
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Check middleware.ts protected route configuration
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`// Ensure login page is NOT in protected routes
const isOnAuth = pathnameWithoutLocale.startsWith('/auth');

// Don't protect auth routes
if (isOnAuth) {
  return NextResponse.next();
}`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Page not redirecting to login
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Verify auth() is imported and middleware is configured
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`// In your protected page
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/"); // Manual redirect if needed
  }
}`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Session is undefined in Server Component
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Ensure page is Server Component (no &quot;use
                client&quot;)
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`// Server Component (correct)
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth(); // Works
}

// Client Component (wrong for auth())
"use client";
import { auth } from "@/lib/auth"; // Error!
// Use useSession() hook instead`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: User can access admin page without admin role
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Add role check in page component
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`const session = await auth();

// Middleware only checks if logged in
// Page must check specific role
if (session?.user?.role !== 'ADMIN') {
  redirect('/dashboard');
}`}
                </code>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/tutorials/authentication"
            title="Authentication"
            description="Learn the full auth system"
          />
          <DocsLinkCard
            href="/docs/tutorials/api-routes"
            title="API Routes"
            description="Protect API endpoints"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
