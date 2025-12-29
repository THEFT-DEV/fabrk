import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import { MousePointer, Link2, Image, Settings } from 'lucide-react';

export const metadata = {
  title: 'Google OAuth Setup - Fabrk Docs',
  description:
    'Enable Google Sign-In for your SaaS. Step-by-step guide to configure Google OAuth with NextAuth v5.',
};

export default function GoogleOAuthPage() {
  return (
    <FeatureGuideTemplate
      code="[0x20]"
      category="Features"
      title="Google OAuth Setup"
      description="Enable one-click Google sign-in for your users with OAuth 2.0 integration."
      overview="Fabrk supports Google OAuth through NextAuth v5 with one-click sign-in with Google accounts, automatic account linking for existing email users, profile photo and name sync from Google, conditional enabling based on environment variables, and secure token handling with JWT sessions."
      features={[
        {
          icon: MousePointer,
          title: 'Frictionless Onboarding',
          description:
            'Reduce signup friction with one-click Google sign-in. Users can start using your app in seconds without creating a password.',
        },
        {
          icon: Link2,
          title: 'Account Linking',
          description:
            'Allow existing email/password users to link their Google account for faster future logins while keeping their existing data.',
        },
        {
          icon: Settings,
          title: 'G Suite Organizations',
          description:
            'Perfect for B2B SaaS targeting companies using Google Workspace. Users sign in with their work Google accounts.',
        },
        {
          icon: Image,
          title: 'Profile Sync',
          description:
            'Automatically sync user profile photo and name from Google, reducing setup steps and improving UX.',
        },
      ]}
      setup={[
        {
          title: 'Create Google Cloud Project',
          description:
            'Go to Google Cloud Console, create a new project, navigate to APIs & Services → OAuth consent screen, configure with User type: External, your app name, support email, and authorized domains. Add scopes: email, profile, openid.',
        },
        {
          title: 'Create OAuth Credentials',
          description:
            'Go to APIs & Services → Credentials, click Create Credentials → OAuth client ID, select Web application. Add Authorized JavaScript origins (http://localhost:3000 for dev, https://yourdomain.com for prod). Add Authorized redirect URIs: http://localhost:3000/api/auth/callback/google and https://yourdomain.com/api/auth/callback/google. Copy the Client ID and Client Secret.',
        },
        {
          title: 'Set Environment Variables',
          description:
            'Add to .env.local. Google OAuth is automatically enabled when these variables are set.',
          code: `GOOGLE_CLIENT_ID="xxxxxxxxxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxx"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Auth Configuration',
          description: 'Google provider is configured in src/lib/auth.ts',
          code: `// src/lib/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { env } from "@/lib/env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // Only include Google if credentials are set
    ...(env.server.GOOGLE_CLIENT_ID && env.server.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: env.server.GOOGLE_CLIENT_ID,
            clientSecret: env.server.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    // ... other providers
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Check if user exists with this email
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          // Link Google account to existing user
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: account.providerAccountId,
              },
            },
            update: {},
            create: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
            },
          });
        }
      }
      return true;
    },
  },
});`,
          language: 'typescript',
        },
        /* eslint-disable design-system/no-hardcoded-colors -- Google brand colors are required for official Google icon */
        {
          title: 'Sign In Button',
          description: 'Add Google sign-in to your login page',
          code: `"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function GoogleSignInButton() {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      Continue with Google
    </Button>
  );
}`,
          language: 'tsx',
        },
        /* eslint-enable design-system/no-hardcoded-colors */
        {
          title: 'Conditional Rendering',
          description: 'Show Google button only when configured',
          code: `import { config } from "@/config";

export function LoginForm() {
  return (
    <div>
      {/* Email/password form */}
      <form>...</form>

      {config.features.googleAuth && (
        <>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleSignInButton />
        </>
      )}
    </div>
  );
}`,
          language: 'tsx',
        },
      ]}
      troubleshooting={[
        {
          problem: 'Error: redirect_uri_mismatch',
          solution:
            "The callback URL doesn't match what's configured in Google Cloud Console. Ensure your redirect URI exactly matches, including protocol (http vs https).",
        },
        {
          problem: 'Error: access_denied',
          solution:
            'User denied access or app is in testing mode with unverified users. Add test users in OAuth consent screen or publish the app.',
        },
        {
          problem: 'Button not appearing',
          solution:
            'Check that GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set. Restart the dev server after adding env vars.',
        },
      ]}
      previous={{ title: 'Payments', href: '/docs/features/payments' }}
      next={{ title: 'Emails', href: '/docs/features/emails' }}
    >
      {/* Security Warning for OAuth Secrets */}
      <DocsSection title="Security">
        <DocsCallout variant="danger" title="PROTECT YOUR OAUTH CLIENT SECRET">
          <div className="space-y-4">
            <p>
              <strong>CRITICAL:</strong> The GOOGLE_CLIENT_SECRET grants access to your OAuth
              application. Leaking it allows attackers to impersonate your app and access user data.
            </p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong>Never commit</strong> GOOGLE_CLIENT_SECRET to git. Always use .env.local (in
                .gitignore) for local development.
              </li>
              <li>
                <strong>Server-side only:</strong> CLIENT_SECRET must NEVER be exposed to the
                browser. Only use in server components or API routes.
              </li>
              <li>
                <strong>Secure storage:</strong> Use Vercel Environment Variables, Google Secret
                Manager, or AWS Secrets Manager in production.
              </li>
              <li>
                <strong>Rotate if exposed:</strong> Regenerate client secret in Google Cloud Console
                → APIs & Services → Credentials if compromised.
              </li>
            </ul>
            <p>
              <strong>Safe to expose:</strong> GOOGLE_CLIENT_ID is public and safe for client-side
              use. Only the CLIENT_SECRET must be protected.
            </p>
          </div>
        </DocsCallout>
      </DocsSection>

      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <ul className="space-y-1">
            <li>├─ Always offer email/password as an alternative to OAuth</li>
            <li>├─ Handle account linking for users who sign up with email first</li>
            <li>├─ Request minimal scopes (email, profile, openid)</li>
            <li>├─ Store refresh tokens securely if you need offline access</li>
            <li>├─ Publish your app for production (removes 100 user limit)</li>
            <li>├─ Add your privacy policy and terms links to consent screen</li>
            <li>└─ Test with multiple Google accounts during development</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
