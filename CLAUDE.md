# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

```
███████████   █████████   ███████████  ███████████   █████   ████
░░███░░░░░░█  ███░░░░░███ ░░███░░░░░███░░███░░░░░███ ░░███   ███░
 ░███   █ ░  ░███    ░███  ░███    ░███ ░███    ░███  ░███  ███
 ░███████    ░███████████  ░██████████  ░██████████   ░███████
 ░███░░░█    ░███░░░░░███  ░███░░░░░███ ░███░░░░░███  ░███░░███
 ░███  ░     ░███    ░███  ░███    ░███ ░███    ░███  ░███ ░░███
 █████       █████   █████ ███████████  █████   █████ █████ ░░████
░░░░░       ░░░░░   ░░░░░ ░░░░░░░░░░░  ░░░░░   ░░░░░ ░░░░░   ░░░░
```

> Terminal-first SaaS boilerplate. Ship fast. Look sharp.

## Quick Reference

| Need | Do This |
|------|---------|
| Design system rules | See `docs/08-design/DESIGN_SYSTEM.md` |
| Pre-commit checks | Automatic via Husky (type-check + lint-staged) |
| Config files | `src/config/index.ts` (not .js) |
| Release process | See `docs/09-launch/RELEASE-READINESS.md` |
| Environment setup | Copy `.env.example` → `.env.local` |

---

## Business Policy

**No Refunds:** Fabrk does not offer refunds. All sales are final. Do not mention refunds, money-back guarantees, or 14-day guarantees in any marketing copy.

---

## Project Overview

**Fabrk** is a Next.js 16 SaaS boilerplate with terminal-inspired design and full-stack features.

**Tech Stack:** Next.js 16.0.10 (App Router, React 19) • TypeScript 5.x strict • NextAuth v5 • Multi-provider payments (Stripe, Polar, Lemonsqueezy) • Prisma 7 + PostgreSQL • Resend • Framer Motion • Radix UI + Tailwind CSS 4 • Terminal-only design system (18 themes)

**Requirements:** Node.js 22+ • PostgreSQL 15+ • npm 10+

### Dynamic Counts (Auto-Calculated from Source Files)

All counts are dynamically calculated from actual source files:

| Metric | Source Directory | Value |
|--------|-----------------|-------|
| UI Components | `src/components/ui/**/*.tsx` | 78 |
| Templates | `src/app/(marketing)/library/**/page.tsx` | 48+ |
| Themes | `src/data/themes.ts` | 12 |
| API Routes | `src/app/api/**/route.ts` | 72 |
| Test Files | `src/**/*.test.{ts,tsx}` | 23 |
| Languages | `src/config/i18n.ts` | 6 |
| Docs Pages | `docs/**/*.md` | 131 |

**IMPORTANT:** Never hardcode counts in marketing copy. Import from:

```typescript
import { COUNTS, COUNT_STRINGS } from '@/data/counts';

// Numbers
console.log(COUNTS.components);    // 78
console.log(COUNTS.templates);     // 48

// Marketing strings (with + suffix)
console.log(COUNT_STRINGS.components);  // "78+"
console.log(COUNT_STRINGS.templates);   // "48+"
```

**Auto-sync:** Counts in all markdown files update automatically via:
- `npm run update-markdown-counts` (manual)
- `npm run build` (automatic via prebuild hook)

**JSON Source:** `src/data/dynamic-counts.json` (regenerated on each build)

---

## Commands

```bash
# Setup (Interactive Wizard - Start Here!)
npm run setup            # Configure database, payments, email, themes
npm run setup -- --dry-run  # Preview without making changes

# Development
npm run dev              # Start dev server (auto-kills port 3000)
npm run build            # Production build (includes prisma generate)
npm run type-check       # TypeScript validation

# Code Quality (automated on commit)
npm run lint             # ESLint (flat config)
npm run format           # Prettier format

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed test data
npm run db:reset         # Reset and reseed

# Testing
npm test                 # Vitest unit tests
npm run test:e2e         # Playwright E2E tests
npm run test:a11y        # Accessibility tests
npm run test:visual      # Visual regression tests

# Validation
npm run validate:themes    # Validate theme tokens
npm run validate:webhooks  # Validate webhook endpoints
npm run validate:templates # Validate template inventory
```

---

## Critical Rules

### 1. Terminal Style EVERYWHERE

All components use terminal aesthetic:
- `rounded-none` on all elements
- `font-mono` for ALL text (body tag uses `className="font-mono"`)
- Design tokens only (no hardcoded colors)

**IMPORTANT:** The `<body>` tag MUST have `className="font-mono antialiased"` to apply JetBrains Mono globally.

### 2. NEVER hardcode colors

Use design tokens from `globals.css`:

```tsx
// GOOD
className="bg-primary text-primary-foreground"

// BAD (breaks theme switching)
className="bg-purple-500 text-white"
```

### 3. Terminal Text Casing Standards

| Element Type | Casing Rule | Examples |
|--------------|-------------|----------|
| **UI Labels/Badges** | UPPERCASE | `[SYSTEM INIT]`, `[STATUS]` |
| **Button Text** | UPPERCASE with `>` prefix | `> GET FABRK`, `> SUBMIT` |
| **Headlines (H1/H2)** | UPPERCASE | `BUILDING YOUR SAAS` |
| **Body Text** | Normal sentence case | "Why spend valuable time..." |

**Never use underscores in user-facing text.** Use spaces for readability.

### 4. NEVER modify base UI components without explicit permission

**Protected Components** (DO NOT MODIFY):
- `src/components/ui/` - all 78 UI components
- `src/components/marketing/navigation.tsx`
- `src/components/navigation/site-navigation.tsx`
- `src/components/shared/` - All shared components (logo, footer, etc.)

**Safe to Modify:**
- `/src/app/` - All page files
- Demo/preview components inside docs pages
- New components you create

---

## Architecture

```
UI Layer (src/app/)
   ↓
API Layer (src/app/api/)
   ↓
Service Layer (src/lib/)
```

### Key Directories

```
src/
├── app/
│   ├── (marketing)/       # Marketing pages & docs
│   ├── (platform)/        # Dashboard/app pages
│   ├── (auth)/            # Auth pages
│   └── api/               # API routes
├── components/
│   ├── ui/                # Radix primitives (LOCKED - 78+ components)
│   ├── docs/              # Docs components & templates
│   ├── landing/           # Landing sections
│   ├── dashboard/         # Dashboard components
│   └── shared/            # Shared components (LOCKED)
├── config/                # App, stripe, i18n configs
├── lib/                   # Business logic (auth, payments, email, etc.)
└── design-system/         # 18 terminal themes (OKLCH colors)
```

### Critical Files

- **`src/config/index.ts`** - Central configuration exports
- **`src/lib/env/index.ts`** - Environment validation with Zod
- **`src/lib/auth.ts`** - NextAuth v5 with JWT sessions (30-day)
- **`src/design-system/index.ts`** - Design tokens and mode config
- **`.husky/pre-commit`** - Git hook (type-check + lint-staged)

---

## Design System

Import `mode` from `@/design-system` for consistent styling:

```tsx
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

<Button className={cn(mode.radius, mode.font, "w-full text-xs")}>
  > SUBMIT
</Button>
```

The `mode` object provides:
- `mode.radius` - Border radius (`rounded-none`)
- `mode.font` - Font family (`font-mono`)
- `mode.color.bg.*` - Background tokens
- `mode.color.text.*` - Text color tokens
- `mode.spacing.*` - Spacing tokens (8-point grid)

### Allowed Colors

```tsx
// Backgrounds
bg-background, bg-card, bg-muted, bg-primary, bg-secondary, bg-destructive

// Text
text-foreground, text-muted-foreground, text-primary, text-destructive, text-success

// Borders
border-border, border-primary

// BANNED
bg-white, bg-gray-*, text-gray-*, #hexvalues
```

### Spacing (8-Point Grid)

| Size | Value | Classes |
|------|-------|---------|
| xs | 4px | `p-1`, `gap-1` |
| sm | 8px | `p-2`, `gap-2` |
| md | 16px | `p-4`, `gap-4` |
| lg | 24px | `p-6`, `gap-6` |
| xl | 32px | `p-8`, `gap-8` |

---

## Key Patterns

### Environment Variables

```typescript
import { env } from '@/lib/env';

// GOOD - validated and typed
const key = env.STRIPE_SECRET_KEY;

// BAD - unvalidated
const key = process.env.STRIPE_SECRET_KEY;
```

### Protected Routes

```typescript
import { auth } from '@/lib/auth';

const session = await auth();
if (!session?.user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

### API Routes

```typescript
try {
  return NextResponse.json({ data }, { status: 200 });
} catch (error) {
  console.error("Description:", error);
  return NextResponse.json({ error: "Message" }, { status: 500 });
}
```

---

## Payment Flow (Multi-Provider)

Fabrk supports 3 payment processors with identical patterns:

| Provider | Checkout API | Webhook |
|----------|-------------|---------|
| Stripe | `/api/stripe/checkout` | `/api/stripe/webhook` |
| Polar.sh | `/api/polar/checkout` | `/api/polar/webhook` |
| Lemonsqueezy | `/api/lemonsqueezy/checkout` | `/api/lemonsqueezy/webhook` |

---

## Pre-Commit Hooks

Git commits automatically run via **Husky + lint-staged**:

1. `npm run type-check` - TypeScript compilation
2. `lint-staged` on staged files:
   - ESLint + auto-fix
   - Prettier formatting

**Bypass (emergency only):** `git commit --no-verify`

---

## Documentation Templates

All docs pages in `src/app/docs/` MUST use a template:

| Template | Use For |
|----------|---------|
| `ComponentShowcaseTemplate` | `/docs/components/*` |
| `FeatureGuideTemplate` | `/docs/features/*`, `/docs/security/*` |
| `TutorialTemplate` | `/docs/tutorials/*` |
| `GettingStartedTemplate` | `/docs/getting-started/*` |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev` (auto-kills) |
| Prisma out of sync | `npm run db:push` |
| TypeScript errors | `npx prisma generate` then `npm run type-check` |
| Build fails | `rm -rf .next && npm run build` |
| Env validation fails | Check `.env.local` against `.env.example` |

---

## Deployment (Vercel)

**Auto-deploy:** Push to `main` → Vercel builds and deploys automatically

**Configuration** (`vercel.json`):

- Framework: Next.js (auto-detected)
- Region: `iad1` (US East - Washington DC)
- Build: `prisma generate && next build`
- Output: Standalone mode for optimal cold starts

**Required Vercel Environment Variables:**

```bash
DATABASE_URL              # Vercel Postgres connection string
NEXTAUTH_SECRET           # Generate: openssl rand -base64 32
NEXTAUTH_URL              # https://your-domain.com
NEXT_PUBLIC_APP_URL       # https://your-domain.com
STRIPE_SECRET_KEY         # sk_live_... (production)
STRIPE_WEBHOOK_SECRET     # whsec_... (from Stripe dashboard)
RESEND_API_KEY            # re_... (for transactional email)
UPSTASH_REDIS_REST_URL    # For distributed rate limiting
UPSTASH_REDIS_REST_TOKEN  # Upstash token
```

**Security Headers** (configured in `next.config.ts`):

- Strict CSP with nonce-based script execution
- HSTS with 2-year max-age
- X-Frame-Options, X-Content-Type-Options
- Referrer-Policy, Permissions-Policy

---

## Environment Setup

Environment validation via Zod (`src/lib/env/index.ts`). Missing required vars fail loudly in production.

**Critical (required in production):**

- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET` - Session encryption (min 32 chars)
- `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` - Payments

**Optional but recommended:**

- `UPSTASH_REDIS_*` - Distributed rate limiting (falls back to in-memory)
- `RESEND_API_KEY` - Transactional email
- `NEXT_PUBLIC_POSTHOG_KEY` - Product analytics

**Skip validation (CI/builds):** `SKIP_ENV_VALIDATION=true`

See `.env.example` for full list with documentation.

---

## Testing

```bash
npm test              # Unit tests (Vitest)
npm run test:e2e      # E2E tests (Playwright)
npm run test:a11y     # Accessibility (axe-core)
npm run test:visual   # Visual regression
npm run test:all      # Unit + E2E together
```

**When to run what:**

- Before commit: Automatic (type-check + lint via Husky)
- Before PR: `npm run test:all`
- After UI changes: `npm run test:visual:update` (review snapshots)

---

## Analytics & Monitoring

- **PostHog** - Product analytics, feature flags (`NEXT_PUBLIC_POSTHOG_KEY`)
- **Vercel Analytics** - Web vitals, performance
- **Vercel Speed Insights** - Real user monitoring
- **Sentry** - Error tracking (optional, `NEXT_PUBLIC_SENTRY_DSN`)

PostHog is proxied through `/ingest/*` rewrites to bypass ad blockers.

---

## Brand Icon Colors Exception

Third-party brand icons require official colors. Use eslint-disable:

```tsx
{/* eslint-disable design-system/no-hardcoded-colors -- Google brand colors */}
<svg><path fill="#4285F4" /></svg>
{/* eslint-enable design-system/no-hardcoded-colors */}
```

---

## Resources

- `docs/08-design/DESIGN_SYSTEM.md` - Complete design system specification
- `docs/09-launch/RELEASE-READINESS.md` - Release workflow and versioning
- `src/app/globals.css` - CSS variables (100% OKLCH tokens)
- `/docs/components/overview` - Component documentation
