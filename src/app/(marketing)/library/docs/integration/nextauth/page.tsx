/**
 * ✅ FABRK COMPONENT
 * NextAuth Integration Guide
 * Complete guide for adding authentication to library templates
 * Uses LibraryGuideTemplate for consistent structure
 */
import { Lock } from 'lucide-react';
import { LibraryGuideTemplate, LibraryCodeBlock } from '@/components/library';

export default function NextAuthIntegrationPage() {
  return (
    <LibraryGuideTemplate
      breadcrumbs={[{ label: 'Docs', href: '/library/docs' }, { label: 'NextAuth Integration' }]}
      icon={Lock}
      badgePrefix="INTEGRATION"
      badge="NEXTAUTH_V5"
      title="NextAuth v5 Integration"
      description="Add authentication to library templates with NextAuth v5, session management, and protected routes."
      meta={{ time: '~15 minutes', level: 'Intermediate' }}
      overview={{
        text: 'Fabrk uses NextAuth v5 (Auth.js) for authentication. All templates assume authenticated users and need session data for features like user profiles, protected routes, and personalized content.',
        highlights: [
          'Session management and JWT tokens (30-day expiry)',
          'Protected route middleware',
          'User object access in templates',
          'Server-side and client-side authentication',
        ],
      }}
      steps={[
        {
          code: '0x01',
          title: 'PREREQUISITES',
          content: (
            <>
              <p>Fabrk already includes NextAuth v5. Verify your setup:</p>
              <LibraryCodeBlock
                code={`# Check NextAuth is installed
npm list next-auth

# Should show: next-auth@5.0.0-beta.x

# Verify config files exist
ls -la src/lib/auth.ts
ls -la src/app/api/auth/[...nextauth]/route.ts`}
                language="bash"
                maxHeight="150px"
              />
              <div className="border-border border-l-primary space-y-2 border-l-2 pl-4">
                <p className="font-medium">[NOTE] Already Setup?</p>
                <p className="text-muted-foreground">
                  If you're using Fabrk boilerplate, NextAuth is already configured in{' '}
                  <code className="bg-muted px-1">src/lib/auth.ts</code>. Skip to Step 2.
                </p>
              </div>
            </>
          ),
        },
        {
          code: '0x02',
          title: 'STEP 1: ENVIRONMENT VARIABLES',
          content: (
            <>
              <p>
                Add required environment variables to{' '}
                <code className="bg-muted px-1">.env.local</code>:
              </p>
              <LibraryCodeBlock
                code={`# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-32-character-secret-here"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"`}
                language="bash"
                maxHeight="200px"
              />
              <div className="bg-muted/30 border-border border p-4">
                <p className="text-primary mb-2 font-medium">[GENERATE SECRET]:</p>
                <LibraryCodeBlock
                  code={`# Generate secure random secret
openssl rand -base64 32`}
                  language="bash"
                  maxHeight="80px"
                />
              </div>
            </>
          ),
        },
        {
          code: '0x03',
          title: 'STEP 2: ACCESS SESSION IN TEMPLATES',
          content: (
            <>
              <p className="font-medium">Server Components (Recommended):</p>
              <LibraryCodeBlock
                code={`import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}`}
                language="tsx"
                maxHeight="300px"
              />
              <p className="font-medium">Client Components:</p>
              <LibraryCodeBlock
                code={`"use client";

import { useSession } from "next-auth/react";

export default function ProfileCard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <h2>{session.user.name}</h2>
      <p>{session.user.email}</p>
    </div>
  );
}`}
                language="tsx"
                maxHeight="350px"
              />
            </>
          ),
        },
        {
          code: '0x04',
          title: 'STEP 3: PROTECT ROUTES',
          content: (
            <>
              <p>Use middleware to protect entire route groups:</p>
              <LibraryCodeBlock
                code={`// middleware.ts (root level)
export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",  // Protect all dashboard routes
    "/settings/:path*",   // Protect settings
    "/api/user/:path*",   // Protect user API routes
  ],
};`}
                language="typescript"
                maxHeight="200px"
              />
              <p>Or protect individual pages:</p>
              <LibraryCodeBlock
                code={`// app/(dashboard)/analytics/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  // Render protected content
  return <AnalyticsDashboard user={session.user} />;
}`}
                language="tsx"
                maxHeight="250px"
              />
            </>
          ),
        },
        {
          code: '0x05',
          title: 'COMMON PATTERNS',
          content: (
            <>
              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">User Avatar Display:</p>
                <LibraryCodeBlock
                  code={`<Avatar>
  <AvatarImage src={session.user.image ?? undefined} />
  <AvatarFallback>
    {session.user.name?.charAt(0).toUpperCase()}
  </AvatarFallback>
</Avatar>`}
                  language="tsx"
                  maxHeight="150px"
                />
              </div>
              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">Sign Out Button:</p>
                <LibraryCodeBlock
                  code={`import { signOut } from "@/lib/auth";

<form action={async () => {
  "use server";
  await signOut();
}}>
  <button type="submit">> SIGN OUT</button>
</form>`}
                  language="tsx"
                  maxHeight="180px"
                />
              </div>
              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">Role-Based Access:</p>
                <LibraryCodeBlock
                  code={`const session = await auth();
if (session?.user?.role !== "ADMIN") {
  redirect("/dashboard");
}

// Render admin-only template
return <AdminPanel />;`}
                  language="tsx"
                  maxHeight="150px"
                />
              </div>
            </>
          ),
        },
      ]}
      troubleshooting={[
        {
          error: '[ERROR]: Session is null',
          solution:
            'User not authenticated or session expired. Redirect to sign-in page and verify NEXTAUTH_SECRET is set.',
        },
        {
          error: '[ERROR]: useSession is not a function',
          solution:
            'Missing SessionProvider wrapper. Wrap app in <SessionProvider> in root layout.',
        },
        {
          error: '[ERROR]: Middleware redirect loop',
          solution:
            'Sign-in page is protected by middleware. Exclude auth routes from middleware matcher.',
        },
      ]}
      relatedLinks={[
        {
          label: 'Connect Prisma',
          href: '/library/docs/integration/prisma',
          description: 'to store user data in database',
        },
        {
          label: 'Add Polar.sh',
          href: '/library/docs/integration/polar',
          description: 'for user subscriptions and payments',
        },
        {
          label: 'Customize templates',
          href: '/library/docs/customization',
          description: 'to match your brand',
        },
      ]}
    />
  );
}
