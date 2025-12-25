import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import Link from 'next/link';
import { UserCog, Shield, Eye, FileText, AlertTriangle, Lock } from 'lucide-react';

export const metadata = {
  title: 'User Impersonation - Fabrk Docs',
  description: 'Admin feature to view the application as any user for debugging and support.',
};

export default function ImpersonationPage() {
  return (
    <FeatureGuideTemplate
      code="[0x81]"
      category="Features"
      title="User Impersonation"
      description="View the application as any user for debugging and customer support."
      overview="User impersonation allows admins to temporarily view the application as any user without knowing their password. Essential for debugging user-reported issues, verifying permissions, and providing customer support. All impersonation sessions are logged to the audit trail for compliance."
      features={[
        {
          icon: UserCog,
          title: 'Admin Only',
          description: 'Only users with ADMIN role can impersonate others.',
        },
        {
          icon: Eye,
          title: 'See User View',
          description: 'Experience the app exactly as the user sees it.',
        },
        {
          icon: Shield,
          title: 'Secure Sessions',
          description: 'Cookie-based tracking with httpOnly protection.',
        },
        {
          icon: FileText,
          title: 'Audit Logging',
          description: 'Every impersonation is logged with reason and timestamps.',
        },
        {
          icon: AlertTriangle,
          title: 'Visual Banner',
          description: 'Clear warning banner when impersonating a user.',
        },
        {
          icon: Lock,
          title: 'One-Click Exit',
          description: 'Instantly return to your admin session.',
        },
      ]}
      usage={[
        {
          title: 'Start Impersonation',
          description: 'API to begin impersonating a user',
          code: `// src/app/api/admin/users/impersonate/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createAuditLog } from "@/lib/audit-log";
import { cookies } from "next/headers";

const IMPERSONATION_COOKIE = "fabrk_impersonation";

export async function POST(req: Request) {
  const session = await auth();

  // Only admins can impersonate
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { targetUserId, reason } = await req.json();

  // Get target user
  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
  });

  if (!targetUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Prevent impersonating other admins
  if (targetUser.role === "ADMIN") {
    return NextResponse.json(
      { error: "Cannot impersonate admin users" },
      { status: 403 }
    );
  }

  // Log the impersonation
  await createAuditLog({
    action: "admin.user_impersonated",
    category: "admin",
    severity: "warning",
    userId: session.user.id,
    targetType: "user",
    targetId: targetUserId,
    metadata: {
      reason,
      targetEmail: targetUser.email,
      adminEmail: session.user.email,
    },
  });

  // Set impersonation cookie
  const cookieStore = await cookies();
  cookieStore.set(IMPERSONATION_COOKIE, JSON.stringify({
    originalUserId: session.user.id,
    targetUserId,
    startedAt: new Date().toISOString(),
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour max
  });

  return NextResponse.json({
    success: true,
    targetUser: {
      id: targetUser.id,
      name: targetUser.name,
      email: targetUser.email,
    },
  });
}`,
          language: 'typescript',
        },
        {
          title: 'End Impersonation',
          description: 'API to stop impersonating and return to admin session',
          code: `// DELETE handler in the same route
export async function DELETE() {
  const cookieStore = await cookies();
  const impersonationData = cookieStore.get(IMPERSONATION_COOKIE);

  if (!impersonationData) {
    return NextResponse.json(
      { error: "No active impersonation" },
      { status: 400 }
    );
  }

  // Clear the cookie
  cookieStore.delete(IMPERSONATION_COOKIE);

  // Log the exit
  const data = JSON.parse(impersonationData.value);
  await createAuditLog({
    action: "admin.impersonation_ended",
    category: "admin",
    severity: "info",
    userId: data.originalUserId,
    targetType: "user",
    targetId: data.targetUserId,
    metadata: {
      duration: Date.now() - new Date(data.startedAt).getTime(),
    },
  });

  return NextResponse.json({ success: true });
}`,
          language: 'typescript',
        },
        {
          title: 'Impersonation Banner Component',
          description: 'Visual indicator shown when impersonating',
          code: `// src/components/admin/impersonation-banner.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function ImpersonationBanner() {
  const [impersonating, setImpersonating] = useState<{
    targetName: string;
    targetEmail: string;
  } | null>(null);

  useEffect(() => {
    // Check impersonation status on mount
    fetch("/api/admin/users/impersonate")
      .then((res) => res.json())
      .then((data) => {
        if (data.isImpersonating) {
          setImpersonating({
            targetName: data.targetUser.name,
            targetEmail: data.targetUser.email,
          });
        }
      });
  }, []);

  if (!impersonating) return null;

  const handleExit = async () => {
    await fetch("/api/admin/users/impersonate", { method: "DELETE" });
    window.location.href = "/admin/users";
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground">
      <div className="container flex items-center justify-between py-2">
        <div className="flex items-center gap-2 font-mono text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>
            IMPERSONATING: {impersonating.targetName} ({impersonating.targetEmail})
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExit}
          className="rounded-none font-mono text-xs"
        >
          &gt; EXIT IMPERSONATION
        </Button>
      </div>
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Impersonate Button',
          description: 'Button to start impersonation from user management',
          code: `// src/components/admin/impersonate-button.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { UserCog } from "lucide-react";

interface ImpersonateButtonProps {
  userId: string;
  userName: string;
}

export function ImpersonateButton({ userId, userName }: ImpersonateButtonProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImpersonate = async () => {
    setLoading(true);

    const response = await fetch("/api/admin/users/impersonate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetUserId: userId, reason }),
    });

    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      const error = await response.json();
      alert(error.error);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <UserCog className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-mono">IMPERSONATE USER</DialogTitle>
          <DialogDescription>
            You are about to view the application as {userName}. This action will be logged.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Reason for impersonation (required)..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            &gt; CANCEL
          </Button>
          <Button
            onClick={handleImpersonate}
            disabled={!reason.trim() || loading}
          >
            {loading ? "Starting..." : "> START IMPERSONATION"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`,
          language: 'tsx',
        },
      ]}
      previous={{
        title: 'Organizations',
        href: '/docs/features/organizations',
      }}
      next={{ title: 'Audit Logging', href: '/docs/security/audit-logging' }}
    >
      {/* Prerequisites */}
      <DocsSection title="Prerequisites">
        <DocsCard title="BEFORE YOU START">
          <ul className="space-y-2">
            <li className="font-mono text-xs">├─ Completed Getting Started guide</li>
            <li className="font-mono text-xs">├─ Database configured and running</li>
            <li className="font-mono text-xs">├─ Environment variables set up (.env.local)</li>
            <li className="font-mono text-xs">└─ Admin role configured in database</li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Security Considerations */}
      <DocsSection title="Security Considerations">
        <DocsCallout variant="warning" title="Handle with Care">
          Impersonation is a powerful feature that should only be available to trusted admins.
          Always require a reason, log all activity, and consider implementing additional controls
          like IP restrictions or approval workflows for sensitive environments.
        </DocsCallout>
        <DocsCard title="SECURITY BEST PRACTICES">
          <ul className="space-y-1">
            <li>
              ├─ <strong>Admin only:</strong> Restrict to ADMIN role exclusively
            </li>
            <li>
              ├─ <strong>Require reason:</strong> Force admins to document why
            </li>
            <li>
              ├─ <strong>Audit logging:</strong> Log start, actions, and end of sessions
            </li>
            <li>
              ├─ <strong>Session timeout:</strong> Auto-expire after 1 hour max
            </li>
            <li>
              ├─ <strong>No admin impersonation:</strong> Prevent impersonating other admins
            </li>
            <li>
              ├─ <strong>Visual indicator:</strong> Clear banner so admin knows they&apos;re
              impersonating
            </li>
            <li>
              ├─ <strong>httpOnly cookies:</strong> Prevent JavaScript access to session data
            </li>
            <li>
              └─ <strong>One-click exit:</strong> Easy way to return to admin session
            </li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Use Cases */}
      <DocsSection title="Use Cases">
        <DocsCard title="WHEN TO USE">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              Good Use Cases
              <ul className="space-y-1">
                <li>• Debugging user-reported bugs</li>
                <li>• Verifying permission settings</li>
                <li>• Customer support troubleshooting</li>
                <li>• Testing user-specific features</li>
              </ul>
            </div>
            <div className="space-y-2">
              Never Do
              <ul className="space-y-1">
                <li>• Read private messages without consent</li>
                <li>• Modify user data without permission</li>
                <li>• Access sensitive financial info</li>
                <li>• Impersonate for personal curiosity</li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Audit Trail */}
      <DocsSection title="Audit Trail">
        <DocsCard title="LOGGED EVENTS">
          <p className="mb-4">All impersonation activity is logged to the audit trail:</p>
          <div className="space-y-2">
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">admin.user_impersonated</code>
              <span className="text-muted-foreground">Impersonation started</span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">admin.impersonation_ended</code>
              <span className="text-muted-foreground">Admin returned to their session</span>
            </div>
            <div className="flex justify-between">
              <code className="bg-muted px-1">user.action_during_impersonation</code>
              <span className="text-muted-foreground">Actions taken while impersonating</span>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Integration */}
      <DocsSection title="Integration">
        <DocsCard title="ADD TO DASHBOARD">
          <p className="mb-4">Add the impersonation banner to your dashboard layout:</p>
          <pre className="bg-muted overflow-x-auto p-4">
            <code>{`// src/app/(dashboard)/layout.tsx
import { ImpersonationBanner } from "@/components/admin/impersonation-banner";

export default function DashboardLayout({ children }) {
  return (
    <>
      <ImpersonationBanner />
      {children}
    </>
  );
}`}</code>
          </pre>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/security/audit-logging">
            <DocsCard
              title="AUDIT LOGGING"
              className="h-full transition-all"
            >
              Audit Logging
              <p className="mb-6">
                Learn how to review impersonation logs and track admin activity.
              </p>
            </DocsCard>
          </Link>
          <Link href="/docs/features/organizations">
            <DocsCard
              title="ORGANIZATIONS"
              className="h-full transition-all"
            >
              Organizations
              <p className="mb-6">Manage teams and organization-level permissions.</p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
