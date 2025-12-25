import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Mail, Key, UserPlus, Shield } from 'lucide-react';

export const metadata = {
  title: 'Magic Link Auth - Fabrk Docs',
  description:
    'Passwordless authentication with magic links. Let users sign in with just their email address.',
};

export default function MagicLinksPage() {
  return (
    <FeatureGuideTemplate
      code="[0x20]"
      category="Features"
      title="Magic Link Auth"
      description="Passwordless authentication via email magic links for frictionless sign-in."
      overview="Magic links provide passwordless authentication by sending a unique, time-limited link to the user's email. Features include one-click sign-in from email, no password to remember or manage, automatic email verification, time-limited tokens (24 hours default), and single-use links for security."
      features={[
        {
          icon: Mail,
          title: 'Passwordless Primary Auth',
          description:
            'Use magic links as the primary authentication method. Great for apps where security matters but password fatigue is a concern.',
        },
        {
          icon: Key,
          title: 'Secondary Sign-In Option',
          description:
            "Offer alongside password auth with 'Forgot password? Sign in with email instead' for users who prefer passwordless.",
        },
        {
          icon: Shield,
          title: 'Account Recovery',
          description:
            'Use magic links for account recovery when users forget their password, without requiring a separate password reset flow.',
        },
        {
          icon: UserPlus,
          title: 'Invite-Based Onboarding',
          description:
            'Send magic link invites to new team members. They click the link to join without setting up credentials first.',
        },
      ]}
      setup={[
        {
          title: 'Enable Magic Links',
          description: 'Enable the feature in src/config.js',
          code: `export const config = {
  features: {
    magicLinks: true,
    // ...other features
  },
};`,
          language: 'typescript',
        },
        {
          title: 'Configure Email',
          description: 'Ensure email is configured in .env.local',
          code: `RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="Your App <noreply@yourdomain.com>"
NEXT_PUBLIC_APP_URL="http://localhost:3000"`,
          language: 'bash',
        },
        {
          title: 'Token Settings',
          description: 'Configure token expiration',
          code: `export const config = {
  auth: {
    magicLinkExpiry: 24 * 60 * 60 * 1000, // 24 hours in ms
    // ...
  },
};`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Request Magic Link API',
          description: 'Create the API endpoint at /api/auth/magic-link',
          code: `// src/app/api/auth/magic-link/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendMagicLinkEmail } from "@/lib/email";
import { nanoid } from "nanoid";
import { config } from "@/config";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  // Find or create user
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        emailVerified: null, // Will be verified on click
      },
    });
  }

  // Generate secure token
  const token = nanoid(32);
  const expires = new Date(Date.now() + config.auth.magicLinkExpiry);

  // Store token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  // Send magic link email
  const magicLink = \`\${config.app.url}/api/auth/verify?token=\${token}&email=\${email}\`;

  await sendMagicLinkEmail({
    to: email,
    magicLink,
    expiresIn: "24 hours",
  });

  return NextResponse.json({
    success: true,
    message: "Magic link sent to your email",
  });
}`,
          language: 'typescript',
        },
        {
          title: 'Magic Link Request Form',
          description: 'Client-side form component',
          code: `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MagicLinkForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send magic link");
      }

      setSent(true);
    } catch (_) {
      alert("Failed to send magic link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <h3>Check your email</h3>
        <p>We sent a magic link to <strong>{email}</strong></p>
        <p>Click the link in the email to sign in.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Magic Link"}
      </Button>
    </form>
  );
}`,
          language: 'tsx',
        },
      ]}
      previous={{ title: 'Webhooks', href: '/docs/features/webhooks' }}
      next={{ title: 'MFA', href: '/docs/features/mfa' }}
    >
      {/* Security Considerations Section */}
      <DocsSection title="Security Considerations">
        <DocsCard title="SECURITY">
          <ul className="space-y-1">
            <li>
              ├─ <strong>Single-use tokens:</strong> Delete tokens after verification
            </li>
            <li>
              ├─ <strong>Short expiry:</strong> 24 hours or less recommended
            </li>
            <li>
              ├─ <strong>Secure generation:</strong> Use cryptographically secure random tokens
            </li>
            <li>
              ├─ <strong>Rate limiting:</strong> Prevent abuse by limiting requests per email
            </li>
            <li>
              └─ <strong>HTTPS only:</strong> Magic links should only work over HTTPS in production
            </li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <ul className="space-y-1">
            <li>├─ Show clear confirmation after sending the link</li>
            <li>├─ Include a resend option after 60 seconds</li>
            <li>├─ Tell users to check spam folder</li>
            <li>├─ Use a recognizable sender name and email</li>
            <li>├─ Keep the email template simple and mobile-friendly</li>
            <li>├─ Log magic link requests for security monitoring</li>
            <li>└─ Consider adding device/location info in the email</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
