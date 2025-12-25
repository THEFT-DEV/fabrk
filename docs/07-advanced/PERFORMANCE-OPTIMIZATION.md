# Performance Optimization Guide

Complete guide to optimizing your Fabrk SaaS for maximum speed and performance.

---

## Table of Contents

1. [Performance Philosophy](#performance-philosophy)
2. [Core Web Vitals](#core-web-vitals)
3. [Next.js 15 Optimization](#nextjs-15-optimization)
4. [Image Optimization](#image-optimization)
5. [Code Splitting & Lazy Loading](#code-splitting--lazy-loading)
6. [Database Optimization](#database-optimization)
7. [API Route Optimization](#api-route-optimization)
8. [Caching Strategies](#caching-strategies)
9. [Bundle Size Optimization](#bundle-size-optimization)
10. [Performance Monitoring](#performance-monitoring)
11. [Performance Checklist](#performance-checklist)

---

## Performance Philosophy

**Speed = Conversions = Revenue**

Research shows:
- **100ms faster load time** = 1% increase in conversions
- **3+ second load time** = 53% bounce rate (mobile)
- **Page load time <1 second** = 2.5x conversion rate vs 5 seconds

**Target metrics:**
- **Initial load:** <1 second (cached), <3 seconds (cold)
- **Time to Interactive (TTI):** <3.5 seconds
- **Lighthouse Performance Score:** >90
- **Core Web Vitals:** All "Good" (green)

---

## Core Web Vitals

### 1. Largest Contentful Paint (LCP)

**What:** Time until largest element is visible
**Target:** <2.5 seconds
**Good:** <2.5s | **Needs Improvement:** 2.5-4s | **Poor:** >4s

**Optimize LCP:**

```tsx
// ✅ Good: Use Next.js Image with priority for hero images
import Image from "next/image";

<Image
  src="/hero-image.png"
  alt="Hero"
  width={1200}
  height={600}
  priority // Loads immediately, no lazy loading
  placeholder="blur" // Shows blur placeholder while loading
  blurDataURL="data:image/..." // Low-quality image placeholder
/>
```

```tsx
// ❌ Bad: Regular img tag, no optimization
<img src="/hero-image.png" alt="Hero" />
```

**Common causes:**
- Large, unoptimized images
- Slow server response time
- Render-blocking JavaScript
- Client-side rendering (CSR) instead of SSR

### 2. First Input Delay (FID) / Interaction to Next Paint (INP)

**What:** Time from user interaction to browser response
**Target (FID):** <100ms
**Target (INP):** <200ms
**Good:** <100ms (FID), <200ms (INP) | **Needs Improvement:** 100-300ms (FID), 200-500ms (INP) | **Poor:** >300ms (FID), >500ms (INP)

**Optimize FID/INP:**

```tsx
// ✅ Good: Lazy load non-critical components
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/heavy-chart"), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Don't render on server if not needed
});
```

```tsx
// ❌ Bad: Import all components eagerly
import { HeavyChart } from "@/components/heavy-chart";
```

**Reduce JavaScript execution:**
- Use Server Components (default in Next.js 15)
- Lazy load client components
- Remove unused dependencies
- Code split large bundles

### 3. Cumulative Layout Shift (CLS)

**What:** Unexpected layout shifts during page load
**Target:** <0.1
**Good:** <0.1 | **Needs Improvement:** 0.1-0.25 | **Poor:** >0.25

**Optimize CLS:**

```tsx
// ✅ Good: Always specify image dimensions
<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
/>
```

```tsx
// ❌ Bad: No dimensions, causes layout shift when loaded
<img src="/logo.png" alt="Logo" />
```

**Prevent CLS:**
- Always specify width/height for images
- Reserve space for dynamic content
- Avoid inserting content above existing content
- Use `aspect-ratio` CSS for responsive images

---

## Next.js 15 Optimization

### 1. Use Server Components by Default

**Server Components (default in Next.js 15):**
- Render on server
- Zero JavaScript sent to client
- Fast initial page load
- SEO-friendly

```tsx
// ✅ Server Component (default)
// No "use client" directive = Server Component
export default async function ProductList() {
  const products = await prisma.product.findMany();

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Client Components:**
- Only when needed (interactivity, hooks, browser APIs)
- Use `"use client"` directive
- Lazy load when possible

```tsx
// ✅ Client Component (only when needed)
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### 2. Enable Turbopack (Dev Mode)

Already enabled in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack"
  }
}
```

**Benefits:**
- 700x faster than Webpack (cold start)
- Instant HMR (Hot Module Replacement)
- Better dev experience

### 3. Streaming with Suspense

Stream content as it's ready, don't wait for everything:

```tsx
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Fast content renders immediately */}
      <UserInfo />

      {/* Slow content streams in when ready */}
      <Suspense fallback={<div>Loading stats...</div>}>
        <SlowStats />
      </Suspense>

      <Suspense fallback={<div>Loading chart...</div>}>
        <SlowChart />
      </Suspense>
    </div>
  );
}
```

### 4. Optimize Fonts

Use `next/font` for automatic font optimization:

```tsx
// src/app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents invisible text during font load
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

**Benefits:**
- Self-hosted fonts (no external requests)
- Preloaded automatically
- Font swap prevents invisible text

---

## Image Optimization

### 1. Use Next.js Image Component

**Always use `next/image`:**

```tsx
import Image from "next/image";

// ✅ Optimized
<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  priority={isAboveFold} // For above-the-fold images
  quality={85} // Default: 75, range: 1-100
/>

// ❌ Not optimized
<img src="/hero.png" alt="Hero" />
```

**Image optimization features:**
- Automatic WebP/AVIF conversion
- Responsive srcset generation
- Lazy loading (below fold)
- Blur placeholder

### 2. Optimize Image Sizes

**Before uploading images:**

```bash
# Install sharp (image optimization)
npm install sharp-cli

# Optimize images
npx sharp -i public/hero.png -o public/hero-optimized.png --webp --quality 85
```

**Guidelines:**
- **Hero images:** 1920x1080px max (1080p)
- **Product screenshots:** 1200x800px max
- **Thumbnails:** 400x300px max
- **Logos:** SVG preferred (scales infinitely)
- **Icons:** SVG or PNG at 2x resolution (Retina)

### 3. Use Blur Placeholders

Generate blur placeholders to prevent layout shift:

```bash
npm install plaiceholder
```

```tsx
// Generate blur data URL
import { getPlaiceholder } from "plaiceholder";

export async function generateBlurDataURL(src: string) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64 } = await getPlaiceholder(buffer);
  return base64;
}

// Use in Image component
<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  placeholder="blur"
  blurDataURL={blurDataURL}
/>
```

---

## Code Splitting & Lazy Loading

### 1. Dynamic Imports

Lazy load components that aren't needed immediately:

```tsx
import dynamic from "next/dynamic";

// ✅ Lazy load heavy components
const HeavyChart = dynamic(() => import("@/components/charts/heavy-chart"), {
  loading: () => <ChartSkeleton />,
  ssr: false, // Skip server-side rendering if not needed
});

const VideoPlayer = dynamic(() => import("@/components/video-player"), {
  ssr: false, // Videos don't need SSR
});

// Use in component
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart /> {/* Loads only when rendered */}
    </div>
  );
}
```

### 2. Route-Based Code Splitting

Next.js automatically code-splits by route. Each page gets its own bundle.

**Good:**
```
pages/
  index.tsx         → ~50KB bundle
  dashboard.tsx     → ~80KB bundle (only loads when visiting /dashboard)
  admin.tsx         → ~120KB bundle (only loads when visiting /admin)
```

**Bad:**
```tsx
// DON'T import all pages in layout
import Dashboard from "./dashboard/page";
import Admin from "./admin/page";
// This defeats code splitting!
```

### 3. Component-Level Code Splitting

Split large component libraries:

```tsx
// ❌ Bad: Imports entire Recharts library
import { BarChart, LineChart, PieChart } from "recharts";

// ✅ Good: Import only what you need
import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart));
```

---

## Database Optimization

### 1. Prisma Query Optimization

**Avoid N+1 queries:**

```tsx
// ❌ Bad: N+1 query (1 query for users, N queries for posts)
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { userId: user.id } });
  console.log(user.name, posts.length);
}

// ✅ Good: Single query with include
const users = await prisma.user.findMany({
  include: {
    posts: true,
  },
});
users.forEach((user) => {
  console.log(user.name, user.posts.length);
});
```

**Select only needed fields:**

```tsx
// ❌ Bad: Fetches all fields
const users = await prisma.user.findMany();

// ✅ Good: Fetches only needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    // Don't fetch password, createdAt, etc. if not needed
  },
});
```

### 2. Database Indexes

Add indexes for frequently queried fields:

```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique // Automatically indexed
  name      String
  createdAt DateTime @default(now())

  @@index([email]) // Add index for email lookups
  @@index([createdAt]) // Add index for date range queries
}

model Payment {
  id        String   @id @default(cuid())
  userId    String
  stripeId  String   @unique
  amount    Int
  status    String
  createdAt DateTime @default(now())

  @@index([userId]) // Index for user's payments lookup
  @@index([status, createdAt]) // Compound index for status + date queries
}
```

After adding indexes:

```bash
npm run db:push
```

### 3. Connection Pooling

Use Prisma's connection pooling (already configured):

```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

**Connection pool limits:**
- Default: 10 connections
- For high traffic: Increase to 20-50 in DATABASE_URL:

```env
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=20"
```

---

## API Route Optimization

### 1. Response Compression

Enable gzip/brotli compression:

```typescript
// next.config.ts
const nextConfig = {
  compress: true, // Enables gzip compression (default: true)
};

export default nextConfig;
```

### 2. Response Caching

Cache API responses when data doesn't change frequently:

```typescript
// src/app/api/products/route.ts
export async function GET() {
  const products = await prisma.product.findMany();

  return NextResponse.json(products, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      // Cache for 60 seconds, serve stale for 120 seconds while revalidating
    },
  });
}
```

### 3. API Response Pagination

Don't return all records at once:

```typescript
// ❌ Bad: Return all users (could be thousands)
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// ✅ Good: Paginate results
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count(),
  ]);

  return NextResponse.json({
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
```

---

## Caching Strategies

### 1. Static Generation (SSG)

Pre-render pages at build time (fastest):

```tsx
// src/app/blog/page.tsx
export default async function BlogPage() {
  // This runs at BUILD TIME
  const posts = await prisma.post.findMany();

  return (
    <div>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
}
```

**When to use:**
- Landing pages
- Marketing pages
- Blog posts
- Docs

### 2. Incremental Static Regeneration (ISR)

Rebuild pages periodically:

```tsx
// src/app/products/page.tsx
export const revalidate = 60; // Rebuild every 60 seconds

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**When to use:**
- Product catalogs
- Pricing pages
- FAQ pages
- Data that changes occasionally

### 3. Server-Side Rendering (SSR)

Fetch data on every request:

```tsx
// src/app/dashboard/page.tsx
export const dynamic = "force-dynamic"; // Force SSR

export default async function DashboardPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return <div>Welcome, {user.name}!</div>;
}
```

**When to use:**
- Dashboards
- User-specific pages
- Real-time data
- Pages with auth

### 4. Client-Side Caching with SWR

```bash
npm install swr
```

```tsx
"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function UserProfile() {
  const { data, error, isLoading } = useSWR("/api/user", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // Cache for 1 minute
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return <div>Welcome, {data.name}!</div>;
}
```

---

## Bundle Size Optimization

### 1. Analyze Bundle Size

```bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# Create next.config.ts wrapper
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);

# Analyze bundle
ANALYZE=true npm run build
```

Opens interactive bundle visualization in browser.

### 2. Remove Unused Dependencies

```bash
# Check for unused dependencies
npm install -g depcheck
depcheck

# Remove unused packages
npm uninstall <package-name>
```

### 3. Tree Shaking

Import only what you need:

```tsx
// ❌ Bad: Imports entire lodash (70KB)
import _ from "lodash";
_.isEmpty(obj);

// ✅ Good: Import specific function (5KB)
import isEmpty from "lodash/isEmpty";
isEmpty(obj);

// ✅ Better: Use native JavaScript (0KB)
Object.keys(obj).length === 0;
```

### 4. Dynamic Imports for Large Dependencies

```tsx
// ❌ Bad: Imports immediately (adds to main bundle)
import { PDFDocument } from "pdf-lib";

export function generatePDF() {
  const doc = PDFDocument.create();
  // ...
}

// ✅ Good: Lazy load when needed
export async function generatePDF() {
  const { PDFDocument } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  // ...
}
```

---

## Performance Monitoring

### 1. Vercel Speed Insights

Already configured in `src/app/layout.tsx`:

```tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 2. Lighthouse CI

Run Lighthouse on every deployment:

```bash
npm install -g @lhci/cli

# Run Lighthouse
lhci autorun --collect.url=https://fabrk.dev
```

### 3. Web Vitals Tracking

Track Core Web Vitals in analytics:

```tsx
// src/app/layout.tsx
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    if (window.gtag) {
      window.gtag("event", metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
      });
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(metric);
    }
  });

  return null;
}
```

---

## Performance Checklist

### Pre-Launch
- [ ] Lighthouse Performance Score >90
- [ ] All Core Web Vitals in "Good" range
- [ ] Images optimized (WebP/AVIF)
- [ ] Fonts optimized (next/font)
- [ ] Bundle size <500KB (initial load)
- [ ] Database indexes added
- [ ] API routes cached appropriately
- [ ] No unused dependencies
- [ ] Code splitting implemented
- [ ] Lazy loading for heavy components

### Post-Launch
- [ ] Monitor Web Vitals weekly
- [ ] Track page load times by page
- [ ] Identify slowest API routes (optimize top 3)
- [ ] Review bundle size monthly
- [ ] Check for unused code (depcheck)
- [ ] Update dependencies (security & performance)

### Ongoing
- [ ] Run Lighthouse quarterly
- [ ] A/B test performance improvements
- [ ] Monitor database query times
- [ ] Optimize new features before shipping
- [ ] Keep Core Web Vitals in "Good"

---

## Performance Quick Wins

**Immediate improvements (1 hour):**
1. Add `priority` to hero images
2. Lazy load below-fold images
3. Enable Turbopack in dev mode
4. Add database indexes

**Short-term improvements (1 day):**
1. Convert all images to WebP/AVIF
2. Lazy load heavy client components
3. Add ISR to landing pages
4. Optimize API response sizes

**Long-term improvements (1 week):**
1. Implement bundle size monitoring
2. Add performance budgets
3. Set up Core Web Vitals tracking
4. Optimize database queries

---

## Performance Budget

Set hard limits:

```json
// performance-budget.json
{
  "budgets": [
    {
      "path": "/",
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 300
        },
        {
          "resourceType": "total",
          "budget": 500
        }
      ],
      "timings": [
        {
          "metric": "first-contentful-paint",
          "budget": 1500
        },
        {
          "metric": "interactive",
          "budget": 3500
        }
      ]
    }
  ]
}
```

Fail builds if budget exceeded.

---

**Performance = User Experience = Conversions. Optimize relentlessly. ⚡️**

**Questions? Email support@fabrk.dev.**
