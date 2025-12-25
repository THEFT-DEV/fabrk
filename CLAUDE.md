# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

```
╔═══════════════════════════════════════════════════════════════════╗
║  YOUR SAAS BOILERPLATE                                            ║
║  Terminal-first design. Ship fast. Look sharp.                    ║
╚═══════════════════════════════════════════════════════════════════╝
```

> Terminal-first SaaS boilerplate. Ship fast. Look sharp.

## Quick Reference

| Need | Do This |
|------|---------|
| Design system rules | See `docs/08-design/DESIGN_SYSTEM.md` |
| Pre-commit checks | Automatic via Husky (type-check + lint-staged) |
| Config files | `src/config/index.ts` |
| Environment setup | Copy `.env.example` → `.env.local` |

---

## Project Overview

This is a Next.js 16 SaaS boilerplate with terminal-inspired design and full-stack features.

**Tech Stack:** Next.js 16 (App Router, React 19) • TypeScript 5.x strict • NextAuth v5 • Multi-provider payments (Stripe, Polar, Lemonsqueezy) • Prisma 7 + PostgreSQL • Resend • Framer Motion • Radix UI + Tailwind CSS 4 • Terminal-only design system (12 themes)

**Requirements:** Node.js 22+ • PostgreSQL 15+ • npm 10+

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

# Validation
npm run validate:themes    # Validate theme tokens
npm run validate:webhooks  # Validate webhook endpoints
```

---

## Critical Rules

### 1. Terminal Style EVERYWHERE

All components use terminal aesthetic:
- `rounded-none` on all elements
- `font-mono` for ALL text (body tag uses `className="font-mono"`)
- Design tokens only (no hardcoded colors)

**IMPORTANT:** The `<body>` tag MUST have `className="font-mono antialiased"` to apply the monospace font globally.

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
| **UI Labels/Badges** | UPPERCASE | `[SYSTEM]`, `[STATUS]` |
| **Button Text** | UPPERCASE with `>` prefix | `> SUBMIT`, `> CONTINUE` |
| **Headlines (H1/H2)** | UPPERCASE | `WELCOME TO YOUR APP` |
| **Body Text** | Normal sentence case | "Get started by..." |

**Never use underscores in user-facing text.** Use spaces for readability.

### 4. Component Guidelines

**Core UI Components** (`src/components/ui/`):
- 78+ ready-to-use terminal-styled components
- Based on Radix UI primitives
- All follow the design system

**Safe to Create/Modify:**
- `/src/app/` - Your page files
- New components in `src/components/`
- Custom hooks in `src/hooks/`

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
│   ├── (marketing)/       # Public pages (landing, pricing, etc.)
│   ├── (platform)/        # Authenticated app pages
│   ├── (auth)/            # Auth pages (login, register)
│   └── api/               # API routes
├── components/
│   ├── ui/                # UI primitives (78+ components)
│   ├── landing/           # Landing page sections
│   ├── dashboard/         # Dashboard components
│   └── shared/            # Shared components
├── config/                # App configuration
├── lib/                   # Business logic (auth, payments, email)
└── design-system/         # Theme tokens and mode config
```

### Critical Files

- **`src/config/index.ts`** - Central configuration exports
- **`src/lib/env/index.ts`** - Environment validation with Zod
- **`src/lib/auth.ts`** - NextAuth v5 with JWT sessions
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

This boilerplate supports 3 payment processors with identical patterns:

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

**Configuration** (`vercel.json`):

- Framework: Next.js (auto-detected)
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
```

---

## MCP Server (AI-Assisted Development)

This boilerplate includes an MCP server for AI-assisted development:

```bash
# Build the MCP server
cd mcp-servers/fabrk
npm install
npm run build
```

The MCP server gives AI tools (Claude Code, Cursor, etc.) knowledge of:
- All 78+ UI components with props and examples
- 12 terminal themes with color tokens
- Design system rules and patterns
- Page and component generation

See `mcp-servers/fabrk/README.md` for setup instructions.

---

## Resources

- `docs/08-design/DESIGN_SYSTEM.md` - Complete design system specification
- `src/app/globals.css` - CSS variables (OKLCH color tokens)
- `docs/` - Full documentation
