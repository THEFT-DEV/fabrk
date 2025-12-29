import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsLinkCard } from '@/components/docs';
import { Shield, Key, Lock, Cookie } from 'lucide-react';

export const metadata = {
  title: 'CSRF Protection - Fabrk Docs',
  description: 'Protect your forms and API endpoints from cross-site request forgery attacks.',
};

export default function CSRFProtectionPage() {
  return (
    <FeatureGuideTemplate
      code="[0x80]"
      category="Security"
      title="CSRF Protection"
      description="Protect your forms and API endpoints from cross-site request forgery attacks."
      overview="CSRF protection prevents attackers from tricking users into performing unwanted actions on your site. NextAuth v5 automatically protects all authentication routes with CSRF tokens."
      features={[
        {
          icon: Shield,
          title: 'Auto Protection',
          description: 'Automatic CSRF protection for NextAuth routes.',
        },
        {
          icon: Cookie,
          title: 'Double Submit',
          description: 'Double-submit cookie pattern for verification.',
        },
        {
          icon: Key,
          title: 'Per-Session Tokens',
          description: 'Unique tokens generated per session.',
        },
        {
          icon: Lock,
          title: 'Origin Validation',
          description: 'Origin validation middleware for extra security.',
        },
      ]}
      usage={[
        {
          title: 'Built-in Protection',
          description:
            'NextAuth v5 automatically protects all authentication routes with CSRF tokens',
          code: `// CSRF protection is automatic for NextAuth routes:
// - /api/auth/signin
// - /api/auth/signout
// - /api/auth/callback/*
// - /api/auth/session

// The middleware in src/middleware.ts handles validation`,
          language: 'typescript',
        },
        {
          title: 'Getting CSRF Token',
          description: 'Retrieve the CSRF token for custom forms',
          code: `"use client";

import { getCsrfToken } from "next-auth/react";
import { useEffect, useState } from "react";

export function SecureForm() {
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    getCsrfToken().then((token) => {
      if (token) setCsrfToken(token);
    });
  }, []);

  return (
    <form action="/api/your-endpoint" method="POST">
      <input
        type="hidden"
        name="csrfToken"
        value={csrfToken}
      />
      <input type="text" name="data" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Server-Side Validation',
          description: 'Validate CSRF tokens in your API routes',
          code: `// src/lib/csrf.ts

import { cookies } from "next/headers";
import { createHash } from "crypto";

export async function validateCsrfToken(token: string): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value;

  if (!sessionToken || !token) {
    return false;
  }

  // Validate token matches session
  const expectedToken = createHash("sha256")
    .update(\`\${sessionToken}csrf\`)
    .digest("hex");

  return token === expectedToken;
}

// Usage in API route
// src/app/api/secure-action/route.ts

import { NextRequest, NextResponse } from "next/server";
import { validateCsrfToken } from "@/lib/csrf";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const isValid = await validateCsrfToken(body.csrfToken);

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid CSRF token" },
      { status: 403 }
    );
  }

  // Process secure action
  return NextResponse.json({ success: true });
}`,
          language: 'typescript',
        },
        {
          title: 'Origin Validation',
          description: 'Add origin validation as an additional security layer',
          code: `// src/lib/security.ts

import { NextRequest, NextResponse } from "next/server";

export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    "http://localhost:3000",
  ].filter(Boolean);

  // Check origin header
  if (origin && !allowedOrigins.includes(origin)) {
    return false;
  }

  // Check referer header as fallback
  if (!origin && referer) {
    const refererUrl = new URL(referer);
    if (!allowedOrigins.includes(refererUrl.origin)) {
      return false;
    }
  }

  return true;
}

// Usage in API route
export async function POST(request: NextRequest) {
  if (!validateOrigin(request)) {
    return NextResponse.json(
      { error: "Invalid request origin" },
      { status: 403 }
    );
  }

  // Process request
}`,
          language: 'typescript',
        },
        {
          title: 'SameSite Cookie Configuration',
          description: 'Configure secure cookie settings in NextAuth',
          code: `// src/lib/auth.ts

import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // ... other config

  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});`,
          language: 'typescript',
        },
        {
          title: 'Fetch Requests with CSRF',
          description: 'Include CSRF tokens in fetch requests',
          code: `"use client";

import { getCsrfToken } from "next-auth/react";

async function secureApiCall(data: unknown) {
  const csrfToken = await getCsrfToken();

  const response = await fetch("/api/secure-action", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken || "",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// Custom hook for secure API calls
import { useState, useCallback } from "react";

export function useSecureApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(async (url: string, data: unknown) => {
    setLoading(true);
    setError(null);

    try {
      const csrfToken = await getCsrfToken();

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken || "",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { call, loading, error };
}`,
          language: 'tsx',
        },
      ]}
      previous={{
        title: 'Rate Limiting',
        href: '/docs/security/rate-limiting',
      }}
      next={{ title: 'Security Headers', href: '/docs/security/headers' }}
    >
      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/security/headers"
            title="Security Headers"
            description="Configure HSTS, CSP, and other headers"
          />
          <DocsLinkCard
            href="/docs/security/validation"
            title="Schema Validation"
            description="Validate all inputs with Zod schemas"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
