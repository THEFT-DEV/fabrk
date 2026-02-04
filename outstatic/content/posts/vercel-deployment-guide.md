---
title: 'Deploying to Vercel: Production-Ready in Minutes'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'vercel-deployment-guide'
description: 'Deploy Fabrk to Vercel with optimal settings. Includes environment variables, edge functions, and production best practices.'
publishedAt: '2026-01-16T10:00:00.000Z'
---

**From local to production in minutes.**

---

## [ OVERVIEW ] WHY VERCEL?

Vercel is the native platform for Next.js, built by the same team that created the framework. This deep integration means zero-config deployments, automatic optimizations, and first-class support for all Next.js features.

### CORE ADVANTAGES

- **Zero-config deployments** - Push to Git, get a production URL
- **Global Edge Network** - 100+ edge locations worldwide
- **Preview deployments** - Every PR gets its own URL
- **Integrated analytics** - Real User Monitoring built-in
- **Automatic HTTPS** - SSL certificates managed for you
- **Serverless functions** - API routes scale automatically
- **Edge functions** - Middleware runs close to users
- **Instant rollbacks** - One-click production recovery

### FABRK-SPECIFIC BENEFITS

Fabrk is optimized for Vercel deployment:

- Standalone output mode reduces cold start times
- Edge-compatible middleware for authentication
- Environment validation prevents misconfiguration
- Prisma client generation included in build command
- Optimized bundle splitting for faster page loads

---

## [ PRE-DEPLOYMENT ] CHECKLIST

Before deploying to Vercel, ensure you have completed these requirements.

### TECHNICAL REQUIREMENTS

```
[ ] Node.js 22+ installed locally
[ ] npm 10+ package manager
[ ] Git repository initialized
[ ] GitHub/GitLab/Bitbucket account
[ ] Vercel account (free tier available)
[ ] PostgreSQL database (Vercel Postgres, Supabase, Neon, or Railway)
```

### CODE PREPARATION

```
[ ] All TypeScript errors resolved (npm run type-check)
[ ] ESLint passes (npm run lint)
[ ] Build succeeds locally (npm run build)
[ ] Environment variables documented
[ ] Sensitive data removed from codebase
[ ] .env files added to .gitignore
```

### EXTERNAL SERVICES

```
[ ] Database provisioned and accessible
[ ] OAuth apps created (GitHub, Google) with production URLs
[ ] Payment provider account (Stripe/Polar) in live mode
[ ] Email service configured (Resend API key)
[ ] Domain purchased (optional but recommended)
```

### LOCAL BUILD TEST

Run a production build locally to catch issues early:

```bash
# Clean previous builds
rm -rf .next

# Generate Prisma client
npx prisma generate

# Run production build
npm run build

# Test production server
npm start
```

If the build succeeds locally, it will succeed on Vercel.

---

## [ STEP BY STEP ] VERCEL SETUP

### CREATING YOUR VERCEL ACCOUNT

1. Navigate to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose authentication method:
   - **GitHub** (recommended for seamless integration)
   - **GitLab**
   - **Bitbucket**
   - **Email**

4. Authorize Vercel to access your repositories
5. Complete account setup

### IMPORTING YOUR PROJECT

**Method 1: Import from Git**

1. Click "Add New..." → "Project"
2. Select your Git provider
3. Find and select your Fabrk repository
4. Click "Import"

**Method 2: Deploy Button**

If you forked Fabrk, use the one-click deploy:

```
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/fabrk)
```

**Method 3: Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow the prompts
? Set up and deploy? Yes
? Which scope? Your Account
? Link to existing project? No
? What's your project's name? fabrk-app
? In which directory is your code located? ./
```

### CONFIGURING BUILD SETTINGS

Vercel auto-detects Next.js, but verify these settings:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Build Command | `prisma generate && next build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Development Command | `npm run dev` |
| Root Directory | `./` (or your app path) |

### GIT INTEGRATION OPTIONS

**Branch Protection:**

- Production Branch: `main` (deploys to production)
- Preview Branches: All other branches (deploys to preview URLs)

**Ignored Build Step:**

Skip builds for non-code changes:

```bash
# vercel.json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "preview": true
    }
  },
  "ignoreCommand": "git diff HEAD^ HEAD --quiet -- . ':!docs' ':!*.md' ':!.github'"
}
```

This skips deployment when only documentation or GitHub workflows change.

---

## [ ENVIRONMENT VARIABLES ] DEEP DIVE

Environment variables are the backbone of your deployment. Every variable needs careful consideration.

### REQUIRED VARIABLES

#### DATABASE_URL

```bash
DATABASE_URL="postgresql://username:password@hostname:5432/database?sslmode=require"
```

| Component | Description |
|-----------|-------------|
| `username` | Database user |
| `password` | User password (URL-encoded if special chars) |
| `hostname` | Database server host |
| `5432` | PostgreSQL port |
| `database` | Database name |
| `sslmode=require` | Required for cloud databases |

**Security considerations:**
- Never commit to Git
- Use connection pooling for serverless (PgBouncer)
- Rotate credentials periodically
- Use separate databases for preview/production

#### NEXTAUTH_SECRET

```bash
NEXTAUTH_SECRET="your-32-character-minimum-secret-key-here"
```

Generate a secure secret:

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Security considerations:**
- Minimum 32 characters
- Use different secrets per environment
- Never share between projects
- Regenerate if compromised (invalidates all sessions)

#### NEXTAUTH_URL

```bash
NEXTAUTH_URL="https://yourdomain.com"
```

This must match your deployment URL exactly:
- Production: `https://yourdomain.com`
- Preview: Vercel sets `VERCEL_URL` automatically
- Local: `http://localhost:3000`

**Common mistakes:**
- Including trailing slash (`https://example.com/` - wrong)
- Using http instead of https
- Mismatched domains

#### NEXT_PUBLIC_APP_URL

```bash
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

This is the public-facing URL used in:
- Email links
- Social sharing meta tags
- Client-side absolute URLs
- Webhook callback URLs

### OAUTH VARIABLES

#### GitHub OAuth

```bash
GITHUB_CLIENT_ID="Iv1.abc123..."
GITHUB_CLIENT_SECRET="abc123..."
```

**Setup steps:**
1. Go to GitHub → Settings → Developer Settings → OAuth Apps
2. Click "New OAuth App"
3. Set Homepage URL: `https://yourdomain.com`
4. Set Callback URL: `https://yourdomain.com/api/auth/callback/github`
5. Copy Client ID and generate Client Secret

**Important:** Create separate OAuth apps for development and production.

#### Google OAuth

```bash
GOOGLE_CLIENT_ID="123456789.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-..."
```

**Setup steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Set Application Type: Web Application
6. Add Authorized JavaScript Origins: `https://yourdomain.com`
7. Add Authorized Redirect URIs: `https://yourdomain.com/api/auth/callback/google`

### PAYMENT VARIABLES

#### Stripe

```bash
# API Keys
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Webhook Secret
STRIPE_WEBHOOK_SECRET="whsec_..."

# Price IDs (from Stripe Dashboard → Products)
STRIPE_PRICE_ID_PRO_MONTHLY="price_..."
STRIPE_PRICE_ID_PRO_YEARLY="price_..."
```

**Test vs Live mode:**
| Environment | Secret Key | Publishable Key |
|-------------|------------|-----------------|
| Development | `sk_test_...` | `pk_test_...` |
| Preview | `sk_test_...` | `pk_test_...` |
| Production | `sk_live_...` | `pk_live_...` |

#### Polar

```bash
POLAR_API_KEY="polar_..."
POLAR_WEBHOOK_SECRET="whsec_..."
POLAR_ORGANIZATION_ID="org_..."
```

#### Lemonsqueezy

```bash
LEMONSQUEEZY_API_KEY="..."
LEMONSQUEEZY_WEBHOOK_SECRET="..."
LEMONSQUEEZY_STORE_ID="..."
```

### EMAIL VARIABLES

```bash
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"
```

Verify your domain in Resend for production sending.

### ENVIRONMENT VARIABLE SCOPES

Vercel supports three environment scopes:

| Scope | When Used | Example |
|-------|-----------|---------|
| Production | `main` branch deployments | Live API keys |
| Preview | Branch/PR deployments | Test API keys |
| Development | `vercel dev` local | Local settings |

**Setting different values per environment:**

1. Go to Project Settings → Environment Variables
2. Click "Add New"
3. Enter variable name and value
4. Select applicable environments (Production, Preview, Development)
5. Click "Save"

### ENVIRONMENT VALIDATION

Fabrk includes Zod-based environment validation. This runs at build time:

```typescript
// src/lib/env/index.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // Optional with defaults
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const env = envSchema.parse(process.env);
```

If validation fails, the build fails with a clear error message.

---

## [ DATABASE OPTIONS ] DETAILED COMPARISON

### VERCEL POSTGRES

Native integration with Vercel, powered by Neon.

**Pros:**
- One-click setup from Vercel dashboard
- Environment variables auto-configured
- Integrated with Vercel's billing
- Branch databases for preview deployments
- Automatic SSL

**Cons:**
- Limited to Vercel ecosystem
- Higher cost at scale compared to dedicated
- Connection limits on free tier

**Setup:**

1. Go to Project Dashboard → Storage
2. Click "Create" → "Postgres"
3. Select region (choose closest to your users)
4. Environment variables automatically added

**Connection string format:**

```bash
DATABASE_URL="postgres://default:password@region.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
```

**Pricing (as of 2026):**
| Tier | Storage | Compute | Price |
|------|---------|---------|-------|
| Hobby | 256 MB | 0.25 CU | Free |
| Pro | 10 GB | 2 CU | $20/mo |
| Enterprise | Custom | Custom | Contact |

### SUPABASE

Full Postgres with additional features.

**Pros:**
- Generous free tier (500 MB)
- Built-in Auth (alternative to NextAuth)
- Real-time subscriptions
- Storage and Edge Functions included
- Excellent dashboard

**Cons:**
- Can be paused after inactivity (free tier)
- Additional complexity if only using database
- Separate billing from Vercel

**Setup:**

1. Create project at [supabase.com](https://supabase.com)
2. Go to Project Settings → Database
3. Copy connection string
4. Add to Vercel environment variables

**Connection string format:**

```bash
# Direct connection (for migrations)
DATABASE_URL="postgresql://postgres:password@db.projectref.supabase.co:5432/postgres"

# Pooled connection (for serverless)
DATABASE_URL="postgresql://postgres:password@db.projectref.supabase.co:6543/postgres?pgbouncer=true"
```

**Important:** Use pooled connection (port 6543) for Vercel serverless functions.

**Pricing:**
| Tier | Database | Storage | Price |
|------|----------|---------|-------|
| Free | 500 MB | 1 GB | $0 |
| Pro | 8 GB | 100 GB | $25/mo |
| Team | Custom | Custom | $599/mo |

### NEON

Serverless Postgres with branching.

**Pros:**
- True serverless (scales to zero)
- Database branching (like Git for databases)
- Fast cold starts
- Generous free tier
- Native Vercel integration

**Cons:**
- Newer platform (less battle-tested)
- Cold starts can add latency
- Limited extensions compared to traditional Postgres

**Setup:**

1. Create project at [neon.tech](https://neon.tech)
2. Create a database
3. Copy connection string from dashboard
4. Add to Vercel environment variables

**Connection string format:**

```bash
DATABASE_URL="postgresql://username:password@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

**Branch databases for previews:**

```bash
# Production
DATABASE_URL="...@ep-prod-123.neon.tech/main"

# Preview (create branch per PR)
DATABASE_URL="...@ep-prod-123.neon.tech/preview-pr-42"
```

**Pricing:**
| Tier | Compute | Storage | Price |
|------|---------|---------|-------|
| Free | 0.5 CU | 512 MB | $0 |
| Launch | 1 CU | 10 GB | $19/mo |
| Scale | 4 CU | 50 GB | $69/mo |

### RAILWAY

Simple, developer-friendly platform.

**Pros:**
- Extremely simple setup
- Fixed pricing (no surprises)
- Multiple services (Redis, etc.)
- Built-in database backups
- Good developer experience

**Cons:**
- No native Vercel integration
- Smaller global footprint
- Less specialized for serverless

**Setup:**

1. Create project at [railway.app](https://railway.app)
2. Add PostgreSQL service
3. Copy connection URL
4. Add to Vercel environment variables

**Connection string format:**

```bash
DATABASE_URL="postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway"
```

**Pricing:**
| Tier | Resources | Price |
|------|-----------|-------|
| Hobby | $5 credit/mo | Free |
| Pro | Unlimited | $20/mo + usage |
| Enterprise | Custom | Contact |

### COMPARISON TABLE

| Feature | Vercel Postgres | Supabase | Neon | Railway |
|---------|-----------------|----------|------|---------|
| Free Tier | 256 MB | 500 MB | 512 MB | $5/mo |
| Serverless | Yes | Partial | Yes | No |
| Branching | Yes | No | Yes | No |
| Cold Starts | Fast | N/A | Medium | N/A |
| Vercel Integration | Native | Manual | Native | Manual |
| Global Distribution | Yes | Yes | Yes | Limited |
| Real-time | No | Yes | No | No |
| Best For | Vercel users | Full-stack | Dev previews | Simple setup |

### RECOMMENDATION

| Use Case | Recommendation |
|----------|----------------|
| Starting out | Vercel Postgres or Neon (free tiers) |
| Need real-time | Supabase |
| Branch previews | Neon or Vercel Postgres |
| Fixed pricing | Railway |
| Enterprise | Supabase or self-hosted |

---

## [ BUILD CONFIGURATION ] NEXT.CONFIG.TS

Fabrk includes an optimized Next.js configuration for Vercel deployment.

### COMPLETE CONFIGURATION

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Standalone output for optimal serverless deployment
  output: 'standalone',

  // Enable React strict mode for better development
  reactStrictMode: true,

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Optimize package imports
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Handle Node.js native modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
```

### STANDALONE OUTPUT

The `output: 'standalone'` setting is crucial for Vercel:

```typescript
output: 'standalone',
```

**Benefits:**
- Reduces deployment size by 80%+
- Faster cold starts (fewer files to load)
- Only includes production dependencies
- Automatic output tracing

**How it works:**

1. Next.js analyzes your code during build
2. Identifies all required dependencies
3. Creates a minimal `.next/standalone` directory
4. Includes only necessary files

### BUNDLE ANALYSIS

Analyze your bundle size before deployment:

```bash
# Install analyzer
npm install @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build
```

This generates visual reports showing what's in your bundles.

### OPTIMIZING IMPORTS

Reduce bundle size with optimized imports:

```typescript
experimental: {
  optimizePackageImports: [
    'lucide-react',
    '@radix-ui/react-icons',
    '@headlessui/react',
    'date-fns',
    'lodash',
  ],
},
```

This transforms barrel imports into direct imports:

```typescript
// Before optimization
import { Button, Card, Input } from '@/components/ui';

// After optimization (automatic)
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
```

---

## [ VERCEL.JSON ] COMPLETE CONFIGURATION

The `vercel.json` file provides deployment configuration.

### FULL CONFIGURATION EXAMPLE

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "prisma generate && next build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 30
    },
    "api/ai/**/*.ts": {
      "memory": 3008,
      "maxDuration": 60
    },
    "api/webhooks/**/*.ts": {
      "memory": 512,
      "maxDuration": 30
    }
  },
  "crons": [
    {
      "path": "/api/cron/daily-report",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/cron/cleanup-sessions",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/sync-subscriptions",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/weekly-digest",
      "schedule": "0 10 * * 1"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store, max-age=0"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/blog",
      "destination": "/blog/page/1"
    }
  ],
  "redirects": [
    {
      "source": "/docs",
      "destination": "https://docs.yourdomain.com",
      "permanent": false
    }
  ],
  "git": {
    "deploymentEnabled": {
      "main": true,
      "preview": true
    }
  },
  "ignoreCommand": "git diff HEAD^ HEAD --quiet -- . ':!docs' ':!*.md' ':!.github'"
}
```

### CONFIGURATION BREAKDOWN

#### Regions

```json
"regions": ["iad1"]
```

Available regions:
| Code | Location |
|------|----------|
| `iad1` | Washington, D.C. (default) |
| `sfo1` | San Francisco |
| `pdx1` | Portland |
| `cle1` | Cleveland |
| `gru1` | Sao Paulo |
| `hnd1` | Tokyo |
| `icn1` | Seoul |
| `kix1` | Osaka |
| `sin1` | Singapore |
| `syd1` | Sydney |
| `hkg1` | Hong Kong |
| `bom1` | Mumbai |
| `cdg1` | Paris |
| `arn1` | Stockholm |
| `dub1` | Dublin |
| `fra1` | Frankfurt |
| `lhr1` | London |

Choose regions closest to your users and database.

#### Function Configuration

```json
"functions": {
  "api/**/*.ts": {
    "memory": 1024,
    "maxDuration": 30
  }
}
```

| Setting | Values | Default |
|---------|--------|---------|
| `memory` | 128, 256, 512, 1024, 2048, 3008 MB | 1024 MB |
| `maxDuration` | 1-900 seconds (Pro plan) | 10 seconds (Hobby) |

---

## [ PREVIEW DEPLOYMENTS ] BRANCH PREVIEWS

Every Git branch gets its own deployment URL.

### HOW IT WORKS

1. Push a new branch to GitHub
2. Vercel automatically creates a deployment
3. Preview URL generated: `project-git-branch-name.vercel.app`
4. PR comments include deployment link

### PREVIEW URL PATTERNS

```
# Branch deployment
https://project-git-feature-auth.vercel.app

# Commit deployment
https://project-abc123.vercel.app

# PR deployment (alias)
https://project-pr-42.vercel.app
```

### CONFIGURING PR COMMENTS

Enable automatic PR comments in Project Settings:

1. Go to Project Settings → Git
2. Enable "Comment on PR with deployment URL"
3. Configure comment triggers

### DEPLOYMENT PROTECTION

Protect preview deployments from public access:

1. Go to Settings → Deployment Protection
2. Enable "Vercel Authentication"
3. Choose protection level:
   - **Standard Protection** - Vercel accounts only
   - **Trusted IPs** - Specific IP addresses
   - **Password Protection** - Shared password

### ENVIRONMENT VARIABLES FOR PREVIEWS

Set preview-specific variables:

```bash
# Production-only
STRIPE_SECRET_KEY="sk_live_..."  (Production only)

# Preview-only
STRIPE_SECRET_KEY="sk_test_..."  (Preview only)

# Both
RESEND_API_KEY="re_..."  (Production + Preview)
```

### PREVIEW DATABASE BRANCHES

For true isolation, use database branching:

**Neon branching:**

```bash
# Create branch for PR
neon branch create --name preview-pr-42

# Get connection string
neon connection-string preview-pr-42
```

**Vercel Postgres branching:**

1. Enable in Storage settings
2. Each preview gets isolated database branch
3. Changes don't affect production

---

## [ CUSTOM DOMAINS ] DNS CONFIGURATION

### ADDING A DOMAIN

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain: `yourdomain.com`
4. Choose configuration:
   - **Add www.yourdomain.com and redirect to yourdomain.com**
   - **Add yourdomain.com and redirect to www.yourdomain.com**

### DNS RECORD CONFIGURATION

**For apex domain (yourdomain.com):**

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |

**For www subdomain:**

| Type | Name | Value |
|------|------|-------|
| CNAME | www | cname.vercel-dns.com |

**For subdomains (app.yourdomain.com):**

| Type | Name | Value |
|------|------|-------|
| CNAME | app | cname.vercel-dns.com |

### SSL CERTIFICATES

Vercel automatically provisions SSL certificates:

- Certificates issued via Let's Encrypt
- Automatic renewal before expiration
- Support for wildcards (*.yourdomain.com)
- HTTP/2 and HTTP/3 enabled

### WWW VS NON-WWW

**Recommendation:** Choose one and redirect the other.

**Non-www (recommended for apps):**

```json
// vercel.json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.yourdomain.com" }],
      "destination": "https://yourdomain.com/:path*",
      "permanent": true
    }
  ]
}
```

**WWW (traditional):**

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "yourdomain.com" }],
      "destination": "https://www.yourdomain.com/:path*",
      "permanent": true
    }
  ]
}
```

### UPDATING ENVIRONMENT VARIABLES

After adding your domain, update:

```bash
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

Also update OAuth callback URLs in GitHub/Google.

---

## [ EDGE FUNCTIONS ] MIDDLEWARE DEPLOYMENT

### UNDERSTANDING EDGE VS NODE.JS RUNTIME

| Aspect | Edge Runtime | Node.js Runtime |
|--------|--------------|-----------------|
| Cold start | ~0ms | ~250ms |
| Location | 100+ edge locations | Regional |
| APIs | Limited Web APIs | Full Node.js APIs |
| Max duration | 30 seconds | 900 seconds (Pro) |
| Max size | 1 MB | 50 MB |
| Best for | Auth, redirects, A/B tests | Complex logic, DB |

### MIDDLEWARE CONFIGURATION

Fabrk's middleware runs at the edge automatically:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/settings', '/api/user'];

// Routes that should redirect logged-in users
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Check if route is auth route
  const isAuthRoute = authRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from auth routes
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
```

### EDGE RUNTIME FOR API ROUTES

Force an API route to run at the edge:

```typescript
// app/api/fast-route/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json({ timestamp: Date.now() });
}
```

### LIMITATIONS OF EDGE RUNTIME

The Edge runtime has limited APIs. These are NOT available:

```typescript
// NOT available at edge
import fs from 'fs';           // No filesystem
import { PrismaClient } from '@prisma/client';  // No Prisma (use @prisma/client/edge)
import crypto from 'crypto';   // Limited crypto

// Available at edge
import { headers, cookies } from 'next/headers';
import { NextResponse } from 'next/server';
```

### GEOLOCATION AT THE EDGE

Access user location at the edge:

```typescript
export async function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US';
  const city = request.geo?.city || 'Unknown';
  const region = request.geo?.region || 'Unknown';

  // Redirect EU users to EU-specific page
  const euCountries = ['DE', 'FR', 'IT', 'ES', 'NL'];
  if (euCountries.includes(country)) {
    // Add GDPR banner flag
    const response = NextResponse.next();
    response.cookies.set('show-gdpr', 'true');
    return response;
  }

  return NextResponse.next();
}
```

---

## [ SERVERLESS FUNCTIONS ] API CONFIGURATION

### FUNCTION ANATOMY

Every file in `app/api/` becomes a serverless function:

```
app/
  api/
    users/
      route.ts        → /api/users
      [id]/
        route.ts      → /api/users/[id]
    webhooks/
      stripe/
        route.ts      → /api/webhooks/stripe
```

### CONFIGURING FUNCTION RESOURCES

**Per-function configuration in vercel.json:**

```json
{
  "functions": {
    "app/api/ai/generate/route.ts": {
      "memory": 3008,
      "maxDuration": 60
    },
    "app/api/export/route.ts": {
      "memory": 2048,
      "maxDuration": 120
    }
  }
}
```

**Using route segment config:**

```typescript
// app/api/heavy-computation/route.ts

// Function configuration
export const maxDuration = 60; // seconds
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // Long-running computation
}
```

### MEMORY LIMITS

| Memory | Use Case |
|--------|----------|
| 128 MB | Simple redirects, static responses |
| 256 MB | Basic CRUD operations |
| 512 MB | Standard API routes |
| 1024 MB | Database queries, file processing |
| 2048 MB | Image processing, large data |
| 3008 MB | AI inference, heavy computation |

### TIMEOUT LIMITS

| Plan | Max Duration |
|------|--------------|
| Hobby | 10 seconds |
| Pro | 60 seconds (default), up to 300 |
| Enterprise | Up to 900 seconds |

### STREAMING RESPONSES

For long-running tasks, use streaming:

```typescript
// app/api/stream/route.ts
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        const chunk = encoder.encode(`data: ${i}\n\n`);
        controller.enqueue(chunk);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

---

## [ WEBHOOKS ] CONFIGURATION

### SETTING UP STRIPE WEBHOOKS

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click "Add endpoint"
6. Copy "Signing secret" → Add as `STRIPE_WEBHOOK_SECRET`

### WEBHOOK HANDLER EXAMPLE

```typescript
// app/api/stripe/webhook/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      plan: 'PRO',
    },
  });
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  await prisma.user.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      plan: subscription.status === 'active' ? 'PRO' : 'FREE',
    },
  });
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  await prisma.user.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      plan: 'FREE',
      stripeSubscriptionId: null,
    },
  });
}
```

### SETTING UP POLAR WEBHOOKS

1. Go to Polar Dashboard → Settings → Webhooks
2. Add endpoint: `https://yourdomain.com/api/polar/webhook`
3. Select events
4. Copy secret → Add as `POLAR_WEBHOOK_SECRET`

### WEBHOOK TESTING

Test webhooks locally with Stripe CLI:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test events
stripe trigger checkout.session.completed
```

---

## [ CRON JOBS ] SCHEDULED TASKS

### VERCEL CRON SYNTAX

Standard cron syntax with timezone support:

```
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-6) (Sunday=0)
│ │ │ │ │
* * * * *
```

### COMMON SCHEDULES

```json
{
  "crons": [
    {
      "path": "/api/cron/every-minute",
      "schedule": "* * * * *"
    },
    {
      "path": "/api/cron/every-hour",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/daily-9am",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/cron/weekly-monday",
      "schedule": "0 10 * * 1"
    },
    {
      "path": "/api/cron/monthly-first",
      "schedule": "0 0 1 * *"
    },
    {
      "path": "/api/cron/every-6-hours",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

### CRON HANDLER EXAMPLE

```typescript
// app/api/cron/daily-report/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

// Verify cron secret to prevent unauthorized access
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');

  // Vercel sends this header for cron requests
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Get daily stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [newUsers, revenue, activeUsers] = await Promise.all([
      prisma.user.count({
        where: { createdAt: { gte: today } },
      }),
      prisma.payment.aggregate({
        where: { createdAt: { gte: today } },
        _sum: { amount: true },
      }),
      prisma.session.count({
        where: { updatedAt: { gte: today } },
      }),
    ]);

    // Send report email
    await sendEmail({
      to: 'admin@yourdomain.com',
      subject: 'Daily Report',
      html: `
        <h1>Daily Report - ${today.toDateString()}</h1>
        <ul>
          <li>New Users: ${newUsers}</li>
          <li>Revenue: $${(revenue._sum.amount || 0) / 100}</li>
          <li>Active Users: ${activeUsers}</li>
        </ul>
      `,
    });

    return NextResponse.json({
      success: true,
      data: { newUsers, revenue: revenue._sum.amount, activeUsers },
    });
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json(
      { error: 'Cron job failed' },
      { status: 500 }
    );
  }
}
```

### CRON LIMITATIONS

| Plan | Cron Jobs | Min Interval |
|------|-----------|--------------|
| Hobby | 2 | 1 day |
| Pro | 40 | 1 minute |
| Enterprise | Unlimited | 1 minute |

---

## [ ANALYTICS ] VERCEL ANALYTICS AND SPEED INSIGHTS

### INSTALLING ANALYTICS

```bash
npm install @vercel/analytics @vercel/speed-insights
```

### INTEGRATION CODE

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-mono antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### CUSTOM EVENTS

Track custom events:

```typescript
import { track } from '@vercel/analytics';

// Track button click
<Button onClick={() => track('upgrade_clicked', { plan: 'pro' })}>
  > UPGRADE
</Button>

// Track form submission
async function handleSubmit(data: FormData) {
  await submitForm(data);
  track('form_submitted', { formId: 'contact' });
}
```

### ANALYTICS DASHBOARD

View analytics at:
1. Project Dashboard → Analytics
2. Metrics available:
   - Page views
   - Unique visitors
   - Top pages
   - Top referrers
   - Countries
   - Devices
   - Browsers

### SPEED INSIGHTS DASHBOARD

Core Web Vitals monitoring:

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | < 2.5s | 2.5s - 4s | > 4s |
| FID | < 100ms | 100ms - 300ms | > 300ms |
| CLS | < 0.1 | 0.1 - 0.25 | > 0.25 |
| TTFB | < 800ms | 800ms - 1.8s | > 1.8s |
| INP | < 200ms | 200ms - 500ms | > 500ms |

---

## [ LOGGING ] MONITORING AND ERROR TRACKING

### VERCEL LOGS

Access logs from:
1. Project Dashboard → Logs
2. Filter by:
   - Time range
   - Log level (info, warn, error)
   - Function name
   - Status code

### LOG DRAINS

Send logs to external services:

1. Go to Project Settings → Log Drains
2. Click "Add Log Drain"
3. Configure:
   - **Datadog**: `https://http-intake.logs.datadoghq.com/v1/input`
   - **Logtail**: `https://in.logtail.com`
   - **Axiom**: `https://cloud.axiom.co/api/v1/datasets/vercel/ingest`

### ERROR TRACKING INTEGRATION

**Sentry Integration:**

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

**Structured Logging:**

```typescript
// lib/logger.ts
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  userId?: string;
  requestId?: string;
  [key: string]: unknown;
}

function log(level: LogLevel, message: string, context?: LogContext) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context,
  };

  if (level === 'error') {
    console.error(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

export const logger = {
  debug: (msg: string, ctx?: LogContext) => log('debug', msg, ctx),
  info: (msg: string, ctx?: LogContext) => log('info', msg, ctx),
  warn: (msg: string, ctx?: LogContext) => log('warn', msg, ctx),
  error: (msg: string, ctx?: LogContext) => log('error', msg, ctx),
};
```

---

## [ ROLLBACK ] DEPLOYMENT MANAGEMENT

### INSTANT ROLLBACK

Roll back to a previous deployment:

1. Go to Project Dashboard → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"
4. Confirm promotion

Rollback is instant (no rebuild required).

### DEPLOYMENT ALIASES

Create stable aliases for specific deployments:

```bash
# Using Vercel CLI
vercel alias set deployment-url.vercel.app yourdomain.com

# Or in dashboard
# Deployments → deployment → ... → Assign Custom Domain
```

### DEPLOYMENT PROTECTION

Protect production from accidental changes:

1. Go to Settings → Git
2. Enable "Require approval for Production deployments"
3. Team members must approve before deploying

### DEPLOYMENT RETENTION

| Plan | Retention |
|------|-----------|
| Hobby | 100 deployments |
| Pro | 1000 deployments |
| Enterprise | Unlimited |

---

## [ COST OPTIMIZATION ] MANAGING VERCEL COSTS

### UNDERSTANDING PRICING

**Vercel Pro Plan ($20/month per team member):**

| Resource | Included | Overage |
|----------|----------|---------|
| Bandwidth | 1 TB | $40/TB |
| Function Invocations | 1M | $0.60/M |
| Function Duration | 1000 GB-hours | $0.18/GB-hour |
| Edge Requests | 10M | $2/M |
| Edge Middleware Invocations | 1M | $0.65/M |

### REDUCING FUNCTION INVOCATIONS

**1. Add caching headers:**

```typescript
export async function GET() {
  const data = await fetchData();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

**2. Use ISR for semi-static content:**

```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}
```

**3. Static generation where possible:**

```typescript
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### REDUCING BANDWIDTH

**1. Optimize images:**

```typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  quality={75}
  priority
  alt="Hero"
/>
```

**2. Enable compression:**

Next.js automatically gzips responses. For better compression:

```typescript
// next.config.ts
export default {
  compress: true,
};
```

**3. Use CDN for large assets:**

Store videos, large files on external CDN (Cloudflare R2, AWS CloudFront).

### REDUCING FUNCTION DURATION

**1. Optimize database queries:**

```typescript
// BAD - N+1 query
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { userId: user.id } });
}

// GOOD - Single query with include
const users = await prisma.user.findMany({
  include: { posts: true },
});
```

**2. Add database indexes:**

```prisma
model User {
  id    String @id @default(cuid())
  email String @unique

  @@index([createdAt])
}
```

**3. Use connection pooling:**

```bash
DATABASE_URL="postgresql://...?connection_limit=10&pool_timeout=20"
```

### COST MONITORING

Set up spending alerts:

1. Go to Team Settings → Billing
2. Click "Spending Alerts"
3. Set threshold (e.g., $50)
4. Receive email when threshold approached

---

## [ MULTI-ENVIRONMENT ] DEVELOPMENT, STAGING, PRODUCTION

### BRANCH-BASED ENVIRONMENTS

| Branch | Environment | URL |
|--------|-------------|-----|
| `main` | Production | `yourdomain.com` |
| `staging` | Staging | `staging.yourdomain.com` |
| `develop` | Development | Auto-generated preview |
| `feature/*` | Preview | Auto-generated preview |

### CONFIGURING ENVIRONMENTS

**1. Create staging branch:**

```bash
git checkout -b staging
git push -u origin staging
```

**2. Add staging domain:**

1. Go to Project Settings → Domains
2. Add `staging.yourdomain.com`
3. Configure DNS

**3. Set branch-specific variables:**

```bash
# Production (main branch)
DATABASE_URL="production-db-url"
STRIPE_SECRET_KEY="sk_live_..."

# Preview (staging branch)
DATABASE_URL="staging-db-url"
STRIPE_SECRET_KEY="sk_test_..."
```

### PROMOTION WORKFLOW

```
feature/auth → develop (merge)
develop → staging (merge)
staging → main (merge after QA)
```

### ENVIRONMENT INDICATORS

Show environment in UI:

```typescript
// components/environment-badge.tsx
export function EnvironmentBadge() {
  const env = process.env.VERCEL_ENV;

  if (env === 'production') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Badge variant={env === 'preview' ? 'secondary' : 'outline'}>
        {env?.toUpperCase()}
      </Badge>
    </div>
  );
}
```

---

## [ MONOREPO ] TURBOREPO INTEGRATION

If using a monorepo structure:

### TURBOREPO CONFIGURATION

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### VERCEL MONOREPO SETTINGS

1. Go to Project Settings → General
2. Set Root Directory to your app folder (e.g., `apps/web`)
3. Vercel detects Turborepo automatically

### FILTERING DEPLOYMENTS

Deploy only when specific packages change:

```bash
# vercel.json
{
  "ignoreCommand": "npx turbo-ignore"
}
```

---

## [ SECURITY HEADERS ] CONFIGURATION

### COMPREHENSIVE HEADERS

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
];

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com;
  frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
`;

export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### MIDDLEWARE-BASED HEADERS

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', 'https://yourdomain.com');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}
```

---

## [ PERFORMANCE ] OPTIMIZATION TECHNIQUES

### INCREMENTAL STATIC REGENERATION (ISR)

Regenerate static pages on-demand:

```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Generate static params at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### ON-DEMAND REVALIDATION

Trigger revalidation from webhooks:

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { secret, path, tag } = await request.json();

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  if (path) {
    revalidatePath(path);
  }

  if (tag) {
    revalidateTag(tag);
  }

  return NextResponse.json({ revalidated: true });
}
```

### EDGE CACHING

Cache API responses at the edge:

```typescript
export async function GET() {
  const data = await fetchExpensiveData();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      'CDN-Cache-Control': 'public, s-maxage=3600',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=86400',
    },
  });
}
```

### IMAGE OPTIMIZATION

Next.js Image component with Vercel:

```typescript
import Image from 'next/image';

export function OptimizedImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      quality={75}
      priority // Load immediately for above-the-fold
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

---

## [ CI/CD ] GITHUB ACTIONS INTEGRATION

### COMPLETE WORKFLOW

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Type check
        run: npm run type-check

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

  deploy-preview:
    runs-on: ubuntu-latest
    needs: [lint, test]
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install -g vercel@latest

      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Preview
        id: deploy
        run: |
          url=$(vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }})
          echo "url=$url" >> $GITHUB_OUTPUT

      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚀 Preview deployed to: ${{ steps.deploy.outputs.url }}'
            })

  deploy-production:
    runs-on: ubuntu-latest
    needs: [lint, test]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install -g vercel@latest

      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Production
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### REQUIRED SECRETS

Add these secrets in GitHub repository settings:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | From Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | From `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | From `.vercel/project.json` |
| `TEST_DATABASE_URL` | Test database connection |

### GETTING VERCEL IDS

```bash
# Install and link project
vercel link

# IDs are now in .vercel/project.json
cat .vercel/project.json
# {"orgId":"team_xxx","projectId":"prj_xxx"}
```

---

## [ TROUBLESHOOTING ] COMMON ERRORS AND SOLUTIONS

### BUILD ERRORS

**Error: Prisma Client not generated**

```
Error: @prisma/client did not initialize yet
```

**Solution:** Ensure build command includes Prisma generate:

```json
{
  "buildCommand": "prisma generate && next build"
}
```

**Error: Cannot find module**

```
Module not found: Can't resolve '@/components/...'
```

**Solution:** Check `tsconfig.json` paths:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Error: Out of memory**

```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed
```

**Solution:** Increase Node.js memory in package.json:

```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

### RUNTIME ERRORS

**Error: 500 Internal Server Error**

Check function logs:
1. Go to Project Dashboard → Logs
2. Filter by "error"
3. Find the failing function

Common causes:
- Missing environment variables
- Database connection issues
- Unhandled exceptions

**Error: NEXTAUTH_URL mismatch**

```
[next-auth][error][CALLBACK_URL_ERROR]
```

**Solution:** Ensure NEXTAUTH_URL matches exactly:

```bash
# Production
NEXTAUTH_URL="https://yourdomain.com"  # No trailing slash

# Preview
NEXTAUTH_URL="https://project-abc.vercel.app"
```

**Error: Database connection refused**

```
Error: connect ECONNREFUSED
```

**Solutions:**
1. Check DATABASE_URL format
2. Ensure SSL mode: `?sslmode=require`
3. Whitelist Vercel IPs (if using IP whitelist)
4. Use connection pooling for serverless

### WEBHOOK ERRORS

**Error: Webhook signature verification failed**

```
Webhook Error: No signatures found matching the expected signature
```

**Solutions:**
1. Verify webhook secret matches exactly
2. Ensure raw body is passed (not parsed JSON)
3. Check endpoint URL matches webhook configuration

**Webhook handler:**

```typescript
// Must use raw body for signature verification
export async function POST(request: Request) {
  const body = await request.text(); // Raw body, not .json()
  const signature = request.headers.get('stripe-signature');

  const event = stripe.webhooks.constructEvent(body, signature!, secret);
}
```

### PERFORMANCE ISSUES

**Error: Function timeout**

```
Task timed out after 10.00 seconds
```

**Solutions:**
1. Upgrade to Pro plan (60s timeout)
2. Optimize database queries
3. Add indexes
4. Use caching
5. Split into background jobs

**Error: Cold start latency**

**Solutions:**
1. Use standalone output mode
2. Reduce bundle size
3. Use edge runtime where possible
4. Implement connection pooling

### QUICK REFERENCE TABLE

| Issue | Solution |
|-------|----------|
| Build fails | Check build logs, run `npm run build` locally |
| 500 errors | Check function logs for stack trace |
| Auth not working | Verify NEXTAUTH_URL and NEXTAUTH_SECRET |
| DB connection fails | Check DATABASE_URL format and SSL |
| Webhooks not received | Verify endpoint URL and secret |
| Function timeout | Increase maxDuration or optimize code |
| Preview not deploying | Check branch configuration |
| Custom domain not working | Verify DNS records propagated |
| Environment variable empty | Check scope (Production/Preview/Development) |
| CORS errors | Add headers in middleware or API route |

---

## [ CHECKLIST ] PRE-LAUNCH VERIFICATION

### BEFORE GOING LIVE

```
[ ] ENVIRONMENT
    [ ] All required environment variables set
    [ ] Separate variables for Production and Preview
    [ ] Secrets rotated from development values
    [ ] NEXTAUTH_URL matches production domain

[ ] DOMAIN
    [ ] Custom domain added and verified
    [ ] SSL certificate active
    [ ] www vs non-www redirect configured
    [ ] DNS records propagated

[ ] AUTHENTICATION
    [ ] OAuth callback URLs updated for production
    [ ] NextAuth secret is unique and secure
    [ ] Session handling tested

[ ] PAYMENTS
    [ ] Stripe/Polar in live mode
    [ ] Webhook endpoints configured
    [ ] Webhook secrets updated
    [ ] Test purchase completed

[ ] DATABASE
    [ ] Production database provisioned
    [ ] Migrations applied
    [ ] Connection pooling configured
    [ ] Backups enabled

[ ] MONITORING
    [ ] Analytics enabled
    [ ] Speed Insights enabled
    [ ] Error tracking configured
    [ ] Log drains set up (optional)

[ ] SECURITY
    [ ] Security headers configured
    [ ] Rate limiting implemented
    [ ] Input validation in place
    [ ] CORS configured correctly

[ ] PERFORMANCE
    [ ] Bundle size optimized
    [ ] Images optimized
    [ ] Caching configured
    [ ] Core Web Vitals passing
```

---

## [ BEST PRACTICES ] SUMMARY

### DO

1. **Use preview deployments** - Test every change before production
2. **Set up monitoring** - Know when things break
3. **Keep secrets secure** - Use environment variables, never commit
4. **Enable analytics** - Understand your users
5. **Have a rollback plan** - Mistakes happen, rollbacks are instant
6. **Use ISR** - Static performance with dynamic content
7. **Optimize images** - Use Next.js Image component
8. **Add security headers** - Protect your users
9. **Use connection pooling** - Essential for serverless
10. **Test locally first** - If it builds locally, it builds on Vercel

### DO NOT

1. **Commit secrets** - Ever
2. **Skip preview testing** - Always verify before merge
3. **Ignore build warnings** - They often predict runtime errors
4. **Hardcode URLs** - Use environment variables
5. **Skip database indexes** - They prevent timeouts
6. **Use synchronous operations** - Everything should be async
7. **Forget webhook verification** - Always verify signatures
8. **Ignore Core Web Vitals** - They affect SEO and UX
9. **Deploy on Friday** - Well, maybe sometimes
10. **Skip the checklist** - Follow it every time

---

Production deployment, simplified.

Deploy your Fabrk application to Vercel and get from local development to global production in minutes. With the configuration patterns in this guide, you will have a secure, performant, and maintainable deployment.

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   DEPLOYMENT STATUS: READY                                          │
│                                                                     │
│   > vercel --prod                                                   │
│                                                                     │
│   Production: https://yourdomain.com                                │
│   Preview:    https://project-git-branch.vercel.app                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

