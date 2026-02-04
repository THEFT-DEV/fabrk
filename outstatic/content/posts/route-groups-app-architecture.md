---
title: 'Route Groups: Organizing Your Next.js App'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'route-groups-app-architecture'
description: 'How Fabrk uses Next.js route groups to organize public pages, authenticated app, auth flows, and API routes.'
publishedAt: '2026-01-14T10:00:00.000Z'
---

**Clean architecture through route organization.**

Next.js 16's App Router introduces route groups—a powerful way to organize your application without affecting URLs. Fabrk uses this pattern extensively to separate public marketing pages, authenticated app pages, authentication flows, and API routes, each with their own layouts, loading states, and error boundaries.

---

## The Organization Challenge

Without route groups, Next.js apps often become disorganized:

```
app/
├── page.tsx           # Landing page
├── dashboard/
│   └── page.tsx       # Dashboard (needs auth)
├── login/
│   └── page.tsx       # Login page
├── pricing/
│   └── page.tsx       # Public pricing
├── settings/
│   └── page.tsx       # User settings (needs auth)
└── layout.tsx         # One layout for everything?
```

Problems with this structure:
- One layout file serves completely different purposes
- No clear separation between public and authenticated pages
- Authentication logic scattered across pages
- Different navigation requirements mixed together

---

## Route Groups

Next.js route groups organize pages without affecting URLs:

```
src/app/
├── (public)/        # Public pages (no auth required)
├── (platform)/      # Authenticated app
├── (auth)/          # Auth pages
└── api/             # API routes
```

The parentheses create groups without adding URL segments. A page at `(public)/pricing/page.tsx` serves the URL `/pricing`, not `/(public)/pricing`.

---

## Fabrk's Route Structure

```
src/app/
├── (public)/                    # Marketing & public content
│   ├── page.tsx                 # Landing page (/)
│   ├── pricing/
│   │   └── page.tsx            # Pricing (/pricing)
│   ├── blog/
│   │   ├── page.tsx            # Blog list (/blog)
│   │   └── [slug]/
│   │       └── page.tsx        # Blog post (/blog/slug)
│   ├── features/
│   │   └── page.tsx            # Features (/features)
│   ├── docs/
│   │   └── [...slug]/
│   │       └── page.tsx        # Documentation (/docs/*)
│   └── layout.tsx              # Public layout
│
├── (platform)/                  # Authenticated application
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard (/dashboard)
│   ├── settings/
│   │   ├── page.tsx            # Settings index (/settings)
│   │   ├── profile/
│   │   │   └── page.tsx        # Profile (/settings/profile)
│   │   ├── billing/
│   │   │   └── page.tsx        # Billing (/settings/billing)
│   │   └── team/
│   │       └── page.tsx        # Team (/settings/team)
│   ├── projects/
│   │   ├── page.tsx            # Projects list (/projects)
│   │   └── [id]/
│   │       └── page.tsx        # Project detail (/projects/123)
│   ├── admin/
│   │   ├── page.tsx            # Admin overview (/admin)
│   │   ├── users/
│   │   │   └── page.tsx        # User management (/admin/users)
│   │   └── layout.tsx          # Admin-specific layout
│   └── layout.tsx              # Platform layout
│
├── (auth)/                      # Authentication flows
│   ├── login/
│   │   └── page.tsx            # Login (/login)
│   ├── register/
│   │   └── page.tsx            # Register (/register)
│   ├── forgot-password/
│   │   └── page.tsx            # Forgot password
│   ├── reset-password/
│   │   └── page.tsx            # Reset password
│   ├── verify-email/
│   │   └── page.tsx            # Email verification
│   └── layout.tsx              # Auth layout
│
├── api/                         # API routes
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts        # NextAuth handler
│   ├── stripe/
│   │   ├── checkout/
│   │   │   └── route.ts        # Stripe checkout
│   │   └── webhook/
│   │       └── route.ts        # Stripe webhooks
│   ├── users/
│   │   └── route.ts            # User CRUD
│   ├── projects/
│   │   ├── route.ts            # Projects CRUD
│   │   └── [id]/
│   │       └── route.ts        # Single project
│   └── webhooks/
│       └── route.ts            # Generic webhooks
│
├── globals.css                  # Global styles
└── layout.tsx                   # Root layout
```

---

## Route Group Layouts

Each group has its own layout, serving different purposes:

### Root Layout

The root layout wraps everything:

```tsx
// app/layout.tsx
import { JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import '@/app/globals.css';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <body className="font-mono antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Public Layout

Marketing pages with header and footer:

```tsx
// app/(public)/layout.tsx
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
```

### Platform Layout

Authenticated app with sidebar and session check:

```tsx
// app/(platform)/layout.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/sidebar';
import { TopNav } from '@/components/dashboard/top-nav';

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen">
      <Sidebar user={session.user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav user={session.user} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### Auth Layout

Centered card layout for authentication:

```tsx
// app/(auth)/layout.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Logo } from '@/components/ui/logo';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect authenticated users to dashboard
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Logo className="mx-auto h-12 w-12" />
          <p className="mt-2 text-muted-foreground font-mono text-xs">
            [ AUTHENTICATION ]
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
```

---

## Benefits of Route Groups

### 1. Separation of Concerns

Each route group has a clear purpose:
- `(public)` - Anyone can access, marketing focus
- `(platform)` - Must be logged in, app functionality
- `(auth)` - Login/register flows, redirect when authenticated

### 2. Different Layouts Per Group

| Group | Layout Features |
|-------|-----------------|
| (public) | Marketing header, footer, full-width |
| (platform) | Sidebar, top nav, authenticated user context |
| (auth) | Centered card, minimal chrome, logo |

### 3. Clean URLs

Groups don't appear in URLs:
- `/dashboard` not `/(platform)/dashboard`
- `/blog` not `/(public)/blog`
- `/login` not `/(auth)/login`

### 4. Colocated Features

Related files stay together:
```
(platform)/
├── settings/
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Settings-specific layout
│   ├── loading.tsx        # Settings loading state
│   ├── error.tsx          # Settings error boundary
│   └── profile/
│       └── page.tsx
```

### 5. Middleware Targeting

Apply middleware to specific groups:

```typescript
// middleware.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  // Only check auth for platform routes
  if (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/settings') ||
      pathname.startsWith('/projects') ||
      pathname.startsWith('/admin')) {

    const session = await auth();

    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Admin routes need admin role
    if (pathname.startsWith('/admin') && session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/projects/:path*',
    '/admin/:path*',
  ],
};
```

---

## Nested Layouts

Layouts can be nested for more specific customization:

```
(platform)/
├── layout.tsx              # Main platform layout (sidebar)
├── dashboard/
│   └── page.tsx
├── settings/
│   ├── layout.tsx          # Settings layout (adds tabs)
│   ├── page.tsx            # General settings
│   ├── profile/
│   │   └── page.tsx        # Profile settings
│   ├── billing/
│   │   └── page.tsx        # Billing settings
│   └── team/
│       └── page.tsx        # Team settings
└── admin/
    ├── layout.tsx          # Admin layout (different sidebar)
    ├── page.tsx            # Admin overview
    └── users/
        └── page.tsx        # User management
```

Settings pages get both the platform layout AND the settings layout:

```tsx
// app/(platform)/settings/layout.tsx
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-2xl font-semibold uppercase">
          SETTINGS
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage your account and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general" asChild>
            <Link href="/settings">General</Link>
          </TabsTrigger>
          <TabsTrigger value="profile" asChild>
            <Link href="/settings/profile">Profile</Link>
          </TabsTrigger>
          <TabsTrigger value="billing" asChild>
            <Link href="/settings/billing">Billing</Link>
          </TabsTrigger>
          <TabsTrigger value="team" asChild>
            <Link href="/settings/team">Team</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border-t border-border pt-6">
        {children}
      </div>
    </div>
  );
}
```

---

## Loading States

Each group (and nested route) can have its own loading UI:

```tsx
// app/(platform)/loading.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function PlatformLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <Skeleton className="h-64" />
    </div>
  );
}

// app/(platform)/dashboard/loading.tsx
// More specific loading state for dashboard
export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
    </div>
  );
}
```

---

## Error Handling

Each group can have error boundaries:

```tsx
// app/(platform)/error.tsx
'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export default function PlatformError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Platform error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className={cn('max-w-md text-center', mode.radius)}>
        <CardHeader>
          <span className="text-4xl font-mono">[ ERROR ]</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Something went wrong loading this page.
          </p>
          <p className="text-sm font-mono text-destructive">
            {error.message}
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={reset} variant="outline">
              &gt; TRY AGAIN
            </Button>
            <Button asChild>
              <a href="/dashboard">&gt; GO TO DASHBOARD</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Not Found Pages

Custom 404 pages per group:

```tsx
// app/(platform)/not-found.tsx
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PlatformNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md text-center p-8">
        <CardContent className="space-y-4">
          <span className="text-6xl font-mono font-bold">404</span>
          <p className="text-xl font-mono uppercase">
            [ PAGE NOT FOUND ]
          </p>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist in your dashboard.
          </p>
          <Button asChild>
            <Link href="/dashboard">&gt; BACK TO DASHBOARD</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// app/(public)/not-found.tsx
// Different not found for public pages
export default function PublicNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <span className="text-6xl font-mono font-bold">404</span>
        <p className="text-xl font-mono uppercase">
          [ PAGE NOT FOUND ]
        </p>
        <p className="text-muted-foreground">
          This page doesn't exist. Let's get you back on track.
        </p>
        <div className="flex gap-2 justify-center">
          <Button asChild variant="outline">
            <Link href="/">&gt; HOME</Link>
          </Button>
          <Button asChild>
            <Link href="/pricing">&gt; VIEW PRICING</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## Shared Components

Components shared across groups live in `src/components/`:

```
src/components/
├── ui/              # UI primitives (all groups use)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── charts/          # Chart components (platform, admin)
│   ├── bar-chart.tsx
│   └── ...
├── marketing/       # (public) group specific
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   └── pricing-table.tsx
├── dashboard/       # (platform) group specific
│   ├── sidebar.tsx
│   ├── top-nav.tsx
│   ├── stats-card.tsx
│   └── activity-feed.tsx
├── auth/            # (auth) group specific
│   ├── sign-in-form.tsx
│   ├── sign-up-form.tsx
│   └── social-auth.tsx
└── admin/           # Admin-specific components
    ├── user-table.tsx
    └── system-health.tsx
```

---

## Parallel Routes

For complex layouts with multiple simultaneous views:

```
(platform)/
└── dashboard/
    ├── page.tsx              # Main dashboard content
    ├── @stats/
    │   ├── page.tsx          # Stats panel
    │   └── loading.tsx       # Stats loading
    ├── @activity/
    │   ├── page.tsx          # Activity feed
    │   └── loading.tsx       # Activity loading
    └── layout.tsx            # Combines parallel routes
```

```tsx
// app/(platform)/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  stats,
  activity,
}: {
  children: React.ReactNode;
  stats: React.ReactNode;
  activity: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Stats panel - loads independently */}
      <div className="grid grid-cols-4 gap-4">
        {stats}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {children}
        </div>
        {/* Activity feed - loads independently */}
        <div>
          {activity}
        </div>
      </div>
    </div>
  );
}
```

Each parallel route loads independently with its own loading state.

---

## Intercepting Routes

For modal patterns that preserve context:

```
(platform)/
├── projects/
│   ├── page.tsx                    # Projects list
│   └── [id]/
│       └── page.tsx                # Full project page (direct URL)
└── @modal/
    └── (.)projects/[id]/
        └── page.tsx                # Project modal (intercepted)
```

When clicking a project link from the list, the modal version loads. When navigating directly to `/projects/123`, the full page loads.

```tsx
// app/(platform)/@modal/(.)projects/[id]/page.tsx
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProjectDetails } from '@/components/dashboard/project-details';

export default async function ProjectModal({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  return (
    <Dialog defaultOpen>
      <DialogContent className="max-w-2xl">
        <ProjectDetails project={project} />
      </DialogContent>
    </Dialog>
  );
}
```

---

## API Routes Organization

API routes follow similar organization:

```
api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts           # NextAuth.js handlers
├── users/
│   ├── route.ts               # GET all, POST create
│   └── [id]/
│       └── route.ts           # GET one, PUT update, DELETE
├── projects/
│   ├── route.ts               # GET all, POST create
│   └── [id]/
│       ├── route.ts           # GET one, PUT update, DELETE
│       └── members/
│           └── route.ts       # Project members
├── stripe/
│   ├── checkout/
│   │   └── route.ts           # Create checkout session
│   └── webhook/
│       └── route.ts           # Handle Stripe webhooks
├── polar/
│   ├── checkout/
│   │   └── route.ts           # Polar checkout
│   └── webhook/
│       └── route.ts           # Polar webhooks
└── admin/
    ├── users/
    │   └── route.ts           # Admin user management
    └── stats/
        └── route.ts           # Admin statistics
```

### API Route Pattern

```typescript
// app/api/projects/route.ts
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

// GET /api/projects
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { organizationId: session.user.organizationId },
    orderBy: { createdAt: 'desc' },
  });

  return Response.json({ projects });
}

// POST /api/projects
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const result = createSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: result.error.issues }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      ...result.data,
      organizationId: session.user.organizationId,
    },
  });

  return Response.json({ project }, { status: 201 });
}
```

---

## Best Practices

### 1. Use Route Groups for Access Levels

```
(public)/   → No authentication required
(platform)/ → Requires authentication
(auth)/     → Auth flow pages
```

### 2. Keep Layouts Minimal

Layouts should only contain shared UI. Keep business logic in pages.

```tsx
// Good - layout handles structure only
export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

// Bad - layout has too much logic
export default async function Layout({ children }) {
  const user = await getUser();
  const notifications = await getNotifications();
  const preferences = await getPreferences();
  // Too much happening in layout
}
```

### 3. Colocate Related Files

Keep related files near where they're used:

```
(platform)/settings/
├── page.tsx          # Main page
├── layout.tsx        # Nested layout
├── loading.tsx       # Loading state
├── error.tsx         # Error boundary
└── profile/
    └── page.tsx      # Child page
```

### 4. Use Meaningful Group Names

- `(marketing)` instead of `(group1)`
- `(dashboard)` instead of `(app)`
- Clear names help team members understand structure

### 5. Document Your Structure

Add a README or comment explaining the organization:

```markdown
# Route Structure

- `(public)/` - Marketing pages, no auth required
- `(platform)/` - Main application, requires authentication
- `(auth)/` - Authentication flows
- `api/` - Backend API endpoints
```

---

## Migration Tips

Moving from Pages Router or flat structure:

### 1. Start with Route Groups

```bash
# Create structure
mkdir -p src/app/(public) src/app/(platform) src/app/(auth)
```

### 2. Move Pages Incrementally

```bash
# Move marketing pages
mv src/app/page.tsx src/app/(public)/page.tsx
mv src/app/pricing src/app/(public)/pricing

# Move app pages
mv src/app/dashboard src/app/(platform)/dashboard
mv src/app/settings src/app/(platform)/settings

# Move auth pages
mv src/app/login src/app/(auth)/login
mv src/app/register src/app/(auth)/register
```

### 3. Create Group Layouts

Add layout.tsx to each group with appropriate UI.

### 4. Test All Routes

Ensure URLs still work:
- `/` → Landing page
- `/dashboard` → Dashboard
- `/login` → Login page

---

## Summary

Route groups provide clean architecture through organization:

1. **Separate concerns** by access level and purpose
2. **Different layouts** for different sections
3. **Clean URLs** without group segments
4. **Colocated files** for better maintainability
5. **Independent loading/error states** per section

Structure your app logically, and Next.js handles the rest.

