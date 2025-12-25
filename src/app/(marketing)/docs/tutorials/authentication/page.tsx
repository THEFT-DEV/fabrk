import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Mail, Shield, Lock, User } from 'lucide-react';

export const metadata = {
  title: 'Authentication Guide - Fabrk Docs',
  description:
    'Add user authentication to your SaaS with NextAuth v5. Supports Google OAuth, magic links, credentials, and session management.',
};

export default function AuthenticationTutorialPage() {
  return (
    <FeatureGuideTemplate
      code="[0x20]"
      category="Tutorials"
      title="User Authentication"
      description="Let users create accounts, log in, and securely access your application."
      overview="Complete authentication system with email/password, Google OAuth, email verification, password reset, two-factor auth, and protected routes. Session-based auth with 30-day expiry."
      features={[
        {
          icon: Mail,
          title: 'Email/Password',
          description: 'Traditional signup with bcrypt hashing.',
        },
        {
          icon: User,
          title: 'Google OAuth',
          description: 'One-click signup with Google accounts.',
        },
        {
          icon: Shield,
          title: 'Email Verify',
          description: 'Confirm email ownership before access.',
        },
        {
          icon: Lock,
          title: '2FA Support',
          description: 'Optional authenticator app security.',
        },
      ]}
      setup={[
        {
          title: 'Configure Environment',
          description: 'Set these environment variables in .env.local',
          code: `# .env.local

# Where your app runs
NEXTAUTH_URL="http://localhost:3000"

# A random secret for encrypting sessions (generate one below)
NEXTAUTH_SECRET="your-32-character-secret"`,
          language: 'bash',
        },
        {
          title: 'Generate Secret',
          description: 'Run this command to generate a secure secret',
          code: `openssl rand -base64 32`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'API Route Authentication',
          description: 'Check if user is logged in and get their info',
          code: `// src/app/api/your-route/route.ts

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  // Get the current user's session
  const session = await auth();

  // Check if they're logged in
  if (!session?.user) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 }
    );
  }

  // User is logged in - you can access their info
  const userId = session.user.id;
  const userEmail = session.user.email;

  return NextResponse.json({
    message: "Hello!",
    userId
  });
}`,
          language: 'typescript',
        },
        {
          title: 'Client Component Auth',
          description: 'Show different content based on login status',
          code: `"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function UserStatus() {
  // Get session data and loading state
  const { data: session, status } = useSession();

  // Show loading while checking auth
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // User is logged in
  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.email}!</p>
        <button onClick={() => signOut()}>
          Log out
        </button>
      </div>
    );
  }

  // User is not logged in
  return (
    <button onClick={() => signIn()}>
      Log in
    </button>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Server Component Auth',
          description: 'Check auth status in Next.js Server Components',
          code: `// No "use client" - this runs on the server

import { auth } from "@/lib/auth";

export default async function PrivatePage() {
  const session = await auth();

  if (!session) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}!</h1>
      <p>This is your private dashboard.</p>
    </div>
  );
}`,
          language: 'tsx',
        },
      ]}
      previous={{ title: 'Quick Start', href: '/docs/tutorials/quick-start' }}
      next={{
        title: 'Email Templates',
        href: '/docs/tutorials/email-templates',
      }}
    >
      {/* What is Authentication */}
      <DocsSection title="What is Authentication?">
        <DocsCard title="AUTHENTICATION">
          <p className="mb-4">
            Authentication is how your app knows who someone is. When a user creates an account and
            logs in, your app gives them a &quot;pass&quot; (called a session) that proves their
            identity. This pass gets checked every time they access protected areas of your app.
          </p>
          <p>
            Think of it like a hotel key card - you check in once (log in), get your key card
            (session), and use it to access your room (protected pages) without re-checking in every
            time.
          </p>
        </DocsCard>
      </DocsSection>

      {/* Auth Flow */}
      <DocsSection title="How It Works">
        <DocsCard title="SIGNUP FLOW">
          <div className="space-y-1">
            <div>├─ User enters email and password on the signup form</div>
            <div>├─ Password is encrypted (never stored as plain text)</div>
            <div>├─ Account is created in your database</div>
            <div>├─ Verification email is sent (if enabled)</div>
            <div>└─ User clicks the verification link to confirm their email</div>
          </div>
        </DocsCard>
        <DocsCard title="LOGIN FLOW">
          <div className="space-y-1">
            <div>├─ User enters email and password</div>
            <div>├─ System checks if the password matches</div>
            <div>├─ If correct, a session token is created</div>
            <div>├─ Token is stored in a secure cookie in their browser</div>
            <div>└─ User is redirected to the dashboard</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Google OAuth Setup */}
      <DocsSection title="Add Google Login">
        <DocsCard title="GOOGLE OAUTH">
          <p className="mb-4">
            Let users sign in with their Google account. This is convenient for users and often
            increases signup rates.
          </p>
          <div className="space-y-1">
            <div>
              <strong>Step 1:</strong> Go to{' '}
              <a
                href="https://console.cloud.google.com/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Cloud Console
              </a>{' '}
              and create a new project
            </div>
            <div>
              <strong>Step 2:</strong> Go to &quot;APIs &amp; Services&quot; → &quot;OAuth consent
              screen&quot; and configure
            </div>
            <div>
              <strong>Step 3:</strong> Go to &quot;Credentials&quot; → &quot;Create
              Credentials&quot; → &quot;OAuth client ID&quot;
            </div>
            <div>
              <strong>Step 4:</strong> Add redirect URI:{' '}
              <code className="bg-muted px-1">http://localhost:3000/api/auth/callback/google</code>
            </div>
          </div>
        </DocsCard>
        <DocsCard title="CONFIGURATION">
          <div>
            <code>GOOGLE_CLIENT_ID=&quot;your-client-id.apps.googleusercontent.com&quot;</code>
            <br />
            <code>GOOGLE_CLIENT_SECRET=&quot;your-client-secret&quot;</code>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Protected Routes */}
      <DocsSection title="Protected Routes">
        <DocsCard title="PROTECTED ROUTES">
          <p className="mb-4">Fabrk automatically protects these routes:</p>
          <div className="space-y-1">
            <div>
              ├─ <code className="bg-muted px-1">/dashboard/*</code> - Main user dashboard
            </div>
            <div>
              ├─ <code className="bg-muted px-1">/settings/*</code> - User settings pages
            </div>
            <div>
              ├─ <code className="bg-muted px-1">/billing/*</code> - Payment and subscription pages
            </div>
            <div>
              └─ <code className="bg-muted px-1">/admin/*</code> - Admin-only pages
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* FAQ */}
      <DocsSection title="Common Questions">
        <DocsCard title="FAQ">
          <div className="space-y-1">
            <div>
              ├─ <strong>Session duration?</strong> 30 days by default. Change in src/lib/auth.ts
            </div>
            <div>
              ├─ <strong>Force logout?</strong> Increment user&apos;s sessionVersion in database
            </div>
            <div>
              ├─ <strong>Password security?</strong> bcrypt with 12 rounds - industry standard
            </div>
            <div>
              └─ <strong>More providers?</strong> NextAuth supports 50+ at{' '}
              <a
                href="https://authjs.dev/reference/core/providers"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                authjs.dev
              </a>
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
                [ERROR]: NEXTAUTH_SECRET missing
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Generate a secure secret key
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`# Run in terminal
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET="output-from-command-above"`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Callback URL mismatch
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Verify NEXTAUTH_URL matches your deployed URL
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`# Development
NEXTAUTH_URL="http://localhost:3000"

# Production (in Vercel environment variables)
NEXTAUTH_URL="https://yourdomain.com"`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Session not persisting
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Check DATABASE_URL is correct and database is accessible
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`# Test database connection
npm run db:studio

# Reset database if needed
npm run db:reset`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Google OAuth fails with redirect_uri_mismatch
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Add correct redirect URI in Google Cloud Console
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`# Development
http://localhost:3000/api/auth/callback/google

# Production
https://yourdomain.com/api/auth/callback/google

# Add both in: Google Cloud Console > Credentials > OAuth 2.0 Client`}
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
            href="/docs/features/mfa"
            title="Two-Factor Auth"
            description="Add extra security with authenticator apps"
          />
          <DocsLinkCard
            href="/docs/features/payments"
            title="Set Up Payments"
            description="Accept payments from authenticated users"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
