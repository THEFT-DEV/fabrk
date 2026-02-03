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

# Fabrk

> Terminal-first SaaS boilerplate. Ship fast. Look sharp.

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](#-license)

**Fabrk** is a production-ready Next.js SaaS boilerplate with a terminal-inspired design system. Built for indie hackers who want to ship fast without compromising on quality.

---

## 📑 Table of Contents

- [Quick Start](#-quick-start)
- [What's Inside](#-whats-inside)
- [Configuration](#-configuration)
- [Design System](#-design-system)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Troubleshooting](#-troubleshooting)
- [Support](#-support)
- [License](#-license)

---

## ⚡ Quick Start

### Option 1: Interactive Setup Wizard (Recommended)

```bash
# Clone and install
git clone https://github.com/THEFT-DEV/fabrk.git
cd fabrk
npm install --legacy-peer-deps

# Run the interactive setup wizard
npm run setup
```

The setup wizard will:
1. **Ask what you're building** - STARTER, SAAS, AI APP, MARKETPLACE, or CUSTOM
2. **Configure your stack** - Database, payments, email, analytics, AI, and more
3. **Generate `.env.local`** - With all required environment variables
4. **Copy a starter landing page** - Pre-built template matching your app type
5. **Run database setup** - Prisma generate + db:push automatically
6. **Start dev server** - Opens http://localhost:3000 in your browser

**Templates included:**
- **STARTER** - Basic landing page with hero, features, CTA
- **SAAS** - Features grid, pricing tiers, FAQ section
- **AI APP** - Demo section, AI capabilities, credit-based pricing
- **MARKETPLACE** - Categories, how it works, seller benefits
- **CUSTOM** - Uses starter template as a generic starting point

### Option 2: Manual Setup

```bash
# Clone and install
git clone https://github.com/THEFT-DEV/fabrk.git
cd fabrk
npm install --legacy-peer-deps

# Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials (see Configuration below)

# Set up database
npm run db:push
npm run db:seed  # Optional: Add test data

# Start development
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 🔔 Stay Updated

Watch this repo to get notified when we ship updates:

1. Click the **Watch** button (top right of this page)
2. Select **Custom** → Check **Releases**
3. Click **Apply**

You'll receive an email whenever we release new versions with features, fixes, and improvements.

---

## 🚀 What's Inside

### UI Components (62 Total)

- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch, Slider, Calendar, Date Picker, File Upload
- **Navigation**: Navbar, Sidebar, Tabs, Breadcrumbs, Pagination, Command Palette
- **Feedback**: Alert, Toast, Dialog, Drawer, Modal, Progress, Skeleton, Spinner
- **Data**: Table, Data Table, Card, Badge, Avatar, Chart (7 variants)
- **Layout**: Container, Grid, Stack, Divider, Separator, Scroll Area
- **Advanced**: Carousel, Combobox, Context Menu, Dropdown, Popover, Tooltip, Accordion, Collapsible

**Explore all components:** After running `npm run dev`, visit **http://localhost:3000/docs/components**

### Design System

**Terminal aesthetic** with 12 complete themes:
- 🟢 5 CRT phosphor themes (Green, Red, Blue, Amber, Purple)
- 🎮 4 retro computer themes (C64, GameBoy, VIC-20, Atari)
- 📱 2 handheld themes (GameBoy Pocket, ZX Spectrum)
- ⚫ 1 high-contrast B&W theme

**Design principles:**
- `mode.radius` - Dynamic border radius (theme-controlled via `--radius` CSS variable)
- `font-mono` - Monospace everywhere (JetBrains Mono)
- 100% OKLCH color tokens - Zero hardcoded colors
- 8-point spacing grid
- WCAG 2.2 AA accessible

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript strict |
| **Styling** | Tailwind CSS 4, Radix UI, Framer Motion |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL (production), SQLite (development) |
| **Auth** | NextAuth v5 (Email magic link, OAuth providers) |
| **Payments** | Stripe, Polar.sh, Lemonsqueezy (multi-provider) |
| **Email** | Resend with React Email templates |
| **Validation** | Zod schemas (runtime type safety) |

### Security Features (62/62 Audit Score)

✅ **Secrets Management** - Environment validation with Zod, .env.local exclusion
✅ **CSRF Protection** - Token-based with middleware injection
✅ **CSP Headers** - Nonce-based scripts with `strict-dynamic`
✅ **Session Security** - JWT with version invalidation, 30-day expiry
✅ **API Protection** - Role-based access control, input validation
✅ **Security Headers** - HSTS, X-Frame-Options, Permissions-Policy
✅ **Dependency Scanning** - 0 vulnerabilities (npm audit)
✅ **CI/CD Security** - CodeQL, accessibility, performance checks
✅ **Admin Route Protection** - Role checks on all sensitive endpoints
✅ **No Hardcoded Secrets** - Git history clean, sync script with scanning

### Pre-Commit Quality Checks

Git commits automatically run:
- TypeScript compilation (`tsc --noEmit`)
- ESLint + auto-fix
- Prettier formatting
- Hardcoded color detection
- `console.log` removal
- Design system compliance

**Bypass (emergency only):** `git commit --no-verify`

---

## 🎨 Customizing Components

all 62 UI components support customization through className props and CSS variables.

### Quick Customization Examples

**Change button variant:**
```tsx
import { Button } from "@/components/ui/button";

<Button variant="outline">> CLICK_ME</Button>
<Button variant="destructive">> DELETE</Button>
```

**Customize with Tailwind:**
```tsx
<Button className="w-full bg-primary/80 hover:bg-primary">> SUBMIT</Button>
```

**Override CSS variables** (in `globals.css` or component):
```css
:root {
  --primary: oklch(65% 0.25 270);  /* Change primary color */
  --radius: 0px;  /* Terminal sharp corners */
}
```

**Create custom component variants:**
```tsx
// Extend existing components
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TerminalButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      className={cn("font-mono text-xs uppercase", props.className)}
      {...props}
    >
      &gt; {children}
    </Button>
  );
}
```

**See full component documentation:** Visit http://localhost:3000/docs/components after running `npm run dev`

---

## 🛠️ Configuration

### Minimum Required Variables

To run Fabrk locally, you need these variables in `.env.local`:

```bash
# Database (SQLite for local development)
DATABASE_URL="file:./dev.db"

# Auth (Required for login)
NEXTAUTH_SECRET="your-secret-key"  # Generate: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Email (Required for magic link auth)
RESEND_API_KEY="re_..."  # Get free key: https://resend.com/api-keys
EMAIL_FROM="onboarding@resend.dev"  # Or your verified domain
```

**That's it!** The app will run locally with these 5 variables.

---

### Production Variables

For production deployment, update these in `.env.local`:

```bash
# Database (PostgreSQL for production)
DATABASE_URL="postgresql://user:password@host:5432/fabrk"

# Auth (Production URL)
NEXTAUTH_URL="https://yourdomain.com"

# Payment Provider (Choose ONE to start)
# STRIPE
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."  # From Stripe Dashboard → Webhooks
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# POLAR.SH (Alternative)
# POLAR_ACCESS_TOKEN="polar_..."
# POLAR_WEBHOOK_SECRET="..."

# LEMONSQUEEZY (Alternative)
# LEMONSQUEEZY_API_KEY="ls_..."
```

**Full environment variables reference:** See `.env.example` (200+ variables for advanced features)

---

### Webhook Configuration

Webhooks are **required** for payments to work. After a customer completes checkout, the payment provider sends a webhook to your app to create the order.

#### Stripe Webhooks

1. **Go to Stripe Dashboard** → Developers → Webhooks
2. **Click "Add endpoint"**
3. **Endpoint URL:**
   - **Local testing:** Use Stripe CLI
     ```bash
     stripe listen --forward-to localhost:3000/api/webhooks/stripe
     ```
   - **Production:** `https://yourdomain.com/api/webhooks/stripe`

4. **Select events to send:**
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `customer.subscription.created` (if using subscriptions)
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

5. **Copy webhook signing secret** and add to `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

#### Polar.sh Webhooks

1. **Go to Polar Dashboard** → Settings → Webhooks
2. **Add webhook endpoint:** `https://yourdomain.com/api/webhooks/polar`
3. **Select events:** `order.created`, `subscription.*`
4. **Copy webhook secret** to `.env.local`:
   ```bash
   POLAR_WEBHOOK_SECRET="..."
   ```

#### Lemonsqueezy Webhooks

1. **Go to Lemonsqueezy Dashboard** → Settings → Webhooks
2. **Create webhook:** `https://yourdomain.com/api/webhooks/lemonsqueezy`
3. **Select events:** `order_created`, `subscription_created`
4. **Copy signing secret** to `.env.local`:
   ```bash
   LEMONSQUEEZY_WEBHOOK_SECRET="..."
   ```

#### Validate Webhook Configuration

Run the validation script to verify your webhook setup:

```bash
npm run validate:webhooks
```

**This checks:**
- ✓ All webhook endpoints exist (`/api/webhooks/stripe`, `/polar`, `/lemonsqueezy`)
- ✓ Webhook secrets are documented in `.env.example`
- ✓ Signature verification is implemented
- ✓ POST route handlers with error handling
- ✓ Payment creation logic in each webhook

**Testing webhooks locally:**
- Use Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Or use ngrok: `ngrok http 3000` → Use ngrok URL in webhook settings

---

### Optional OAuth Providers

To enable Google/GitHub login buttons, add these to `.env.local`:

```bash
# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# GitHub OAuth
GITHUB_ID="..."
GITHUB_SECRET="..."
```

**How to get OAuth credentials:**
- **Google:** https://console.cloud.google.com/apis/credentials
- **GitHub:** https://github.com/settings/developers

---

## 🎨 Design System

### Importing Design Tokens

```tsx
import { mode } from "@/design-system";

// Use mode tokens in className
<Button className={cn(mode.radius, mode.font, "w-full text-xs")}>
  > SUBMIT
</Button>

<Input className={cn(mode.radius, mode.font, "text-xs")} />
```

### Allowed Colors

```tsx
// ✅ GOOD - Design tokens
bg-background, bg-card, bg-muted, bg-primary
text-foreground, text-muted-foreground, text-primary
border-border, border-primary

// ❌ BAD - Hardcoded colors (will fail pre-commit)
bg-white, bg-gray-500, text-black, #hexvalues
```

### Typography Standards

```tsx
// UI Labels/Badges - UPPERCASE
<Badge label="SYSTEM INIT" />

// Buttons - UPPERCASE with > prefix
<Button>> GET FABRK</Button>

// Headlines (H1/H2) - UPPERCASE
<h2>BUILDING YOUR SAAS</h2>

// Body Text - Normal sentence case
<p>Why spend valuable time tackling auth...</p>
```

### Theme Switching

A theme switcher dropdown is included in the navigation bar (top right). Click the palette icon to choose from 18 terminal themes.

**To use the theme switcher in your own components:**

```tsx
import { ThemeDropdown } from '@/components/theme/theme-dropdown';

export function MyNavbar() {
  return (
    <nav>
      {/* Your nav items */}
      <ThemeDropdown />
    </nav>
  );
}
```

**Available theme IDs:**
- CRT: `green`, `red`, `blue`, `amber`, `purple`
- Retro: `c64`, `gameboy`, `vic20`, `atari`
- Handheld: `gbpocket`, `spectrum`
- Light: `bw`

**To programmatically change theme:**

```tsx
'use client';

import { useEffect } from 'react';

export function CustomThemeSwitcher() {
  const changeTheme = (themeId: string) => {
    localStorage.setItem('theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  };

  return (
    <select onChange={(e) => changeTheme(e.target.value)}>
      <option value="green">Green CRT</option>
      <option value="amber">Amber CRT</option>
      <option value="c64">C64 Blue</option>
      {/* ... other themes */}
    </select>
  );
}
```

### Quick: Change Your Brand Color

1. **Open `src/app/globals.css`**
2. **Find your theme's CSS variables** (search for `[data-theme="green"]` or your theme)
3. **Update the `--primary` color:**
   ```css
   [data-theme="green"] {
     --primary: oklch(65% 0.25 145);  /* Green accent */
     /* Change to your brand color in OKLCH format */
   }
   ```
4. **Save and refresh** - Your brand color is now applied to all buttons, links, and accents

**OKLCH color picker:** https://oklch.com/

Full design system documentation: `docs/08-design/DESIGN_SYSTEM.md`

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│  Next.js 16 App Router • React 19 • Tailwind CSS 4 • OKLCH      │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ HTTP/HTTPS
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NEXT.JS SERVER (Edge/Node)                   │
│  ┌───────────────┐  ┌───────────────┐  ┌────────────────┐      │
│  │  Page Routes  │  │  API Routes   │  │  Middleware    │      │
│  │  (RSC/SSR)    │  │  (70+ endpoints)│  │  Auth/CSRF    │      │
│  └───────┬───────┘  └───────┬───────┘  └────────┬───────┘      │
│          │                  │                     │              │
│          ▼                  ▼                     ▼              │
│  ┌────────────────────────────────────────────────────────┐     │
│  │            BUSINESS LOGIC LAYER (src/lib/)             │     │
│  │  • NextAuth v5 (auth.ts)                               │     │
│  │  • Prisma ORM (db/)                                    │     │
│  │  • Payment clients (stripe.ts, polar.ts, lemonsqueezy/)│     │
│  │  • Email service (resend.ts)                           │     │
│  │  • Env validation (env.ts with Zod)                    │     │
│  └────────────────────────────────────────────────────────┘     │
└──────────────┬──────────────┬──────────────┬──────────────┬────┘
               │              │              │              │
               ▼              ▼              ▼              ▼
┌──────────────────┐ ┌────────────────┐ ┌───────────┐ ┌──────────┐
│   DATABASE       │ │   PAYMENTS     │ │   EMAIL   │ │   AUTH   │
│                  │ │                │ │           │ │          │
│  PostgreSQL      │ │  Stripe        │ │  Resend   │ │  OAuth   │
│  (Prisma)        │ │  Polar.sh      │ │           │ │ Providers│
│                  │ │  Lemonsqueezy  │ │           │ │ (Google, │
│  • Users         │ │                │ │           │ │  GitHub) │
│  • Payments      │ │  Webhooks ────►│ │           │ │          │
│  • Sessions      │ │  /api/webhooks/│ │           │ │          │
└──────────────────┘ └────────────────┘ └───────────┘ └──────────┘

DATA FLOW EXAMPLES:

1. USER SIGNUP:
   Browser → /api/auth/signup → NextAuth → Resend (magic link) → Email → User clicks → Session created → Database

2. PAYMENT:
   Browser → /api/checkout → Stripe/Polar/LS → Hosted checkout → User pays → Webhook → /api/webhooks/* → Database (Payment record)

3. PROTECTED PAGE:
   Browser → /dashboard → Middleware (auth check) → NextAuth → Session valid? → Render RSC → Database (fetch user data)

KEY ARCHITECTURAL PATTERNS:
• Edge-first: Middleware runs on Vercel Edge for speed
• RSC by default: Server Components reduce client JS
• Type-safe: Zod validates env vars, Prisma generates types
• Multi-provider: Swappable payment processors (config-driven)
• Security layers: CSRF tokens, CSP headers, session versioning
```

---

## 📁 Project Structure

```
fabrk/
├── src/
│   ├── app/
│   │   ├── (platform)/      # Dashboard and app pages
│   │   ├── (auth)/          # Auth pages (login, register, etc.)
│   │   ├── api/             # API routes (70+ endpoints)
│   │   ├── docs/            # Documentation site
│   │   └── library/         # Template showcase
│   ├── components/
│   │   ├── ui/              # 62 UI components (Radix primitives)
│   │   ├── docs/            # Documentation templates
│   │   ├── dashboard/       # Dashboard components
│   │   ├── theme/           # Theme switcher components
│   │   └── shared/          # Shared components (Logo, Footer, etc.)
│   ├── lib/
│   │   ├── auth.ts          # NextAuth v5 configuration
│   │   ├── db/              # Prisma client
│   │   ├── env.ts           # Environment validation (Zod)
│   │   ├── stripe.ts        # Stripe client
│   │   ├── polar.ts         # Polar client
│   │   └── lemonsqueezy/    # Lemonsqueezy client
│   ├── config/
│   │   ├── index.ts         # Config exports
│   │   ├── app.ts           # App configuration
│   │   ├── stripe.ts        # Payment provider config
│   │   └── i18n.ts          # Internationalization
│   └── design-system/
│       └── themes/          # 18 terminal themes (OKLCH colors)
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seeding
├── public/                  # Static assets
├── CLAUDE.md                # AI assistant guidance
└── docs/                    # Design system documentation
```

---

## 🧪 Testing

```bash
# Unit/integration tests (Vitest)
npm test

# E2E tests (Playwright)
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Pre-Deployment Checklist

**Minimum Required (App won't work without these):**
```bash
□ DATABASE_URL="postgresql://..."  # Production PostgreSQL
□ NEXTAUTH_SECRET="..."  # Generate: openssl rand -base64 32
□ NEXTAUTH_URL="https://yourdomain.com"  # Your production domain
□ RESEND_API_KEY="re_..."  # For email/magic link auth
```

**Payment Provider (Choose ONE to accept payments):**
```bash
# Stripe
□ STRIPE_SECRET_KEY="sk_live_..."
□ STRIPE_WEBHOOK_SECRET="whsec_..."
□ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# OR Polar.sh
□ POLAR_ACCESS_TOKEN="polar_..."
□ POLAR_WEBHOOK_SECRET="..."

# OR Lemonsqueezy
□ LEMONSQUEEZY_API_KEY="ls_..."
```

**OAuth Providers (Optional, if using social login):**
```bash
□ GOOGLE_CLIENT_ID="..."  # For Google OAuth
□ GOOGLE_CLIENT_SECRET="..."
□ GITHUB_ID="..."  # For GitHub OAuth
□ GITHUB_SECRET="..."
```

**Full variable reference:** See `.env.example` for 200+ advanced options

### Other Platforms

Fabrk works on any platform that supports Next.js 16:
- **Netlify:** Use Next.js runtime, set build command `npm run build`
- **Railway:** Auto-detects Next.js, add PostgreSQL service
- **Render:** Use Docker or native Node.js environment
- **DigitalOcean App Platform:** Use Node.js buildpack

**Build command:** `npm run build`
**Output directory:** `.next`
**Install command:** `npm install --legacy-peer-deps`

---

## 📚 Documentation

Fabrk documentation follows the [Diátaxis framework](https://diataxis.fr/) for systematic learning:

| Type | Purpose | Location |
|------|---------|----------|
| **📖 Tutorials** | Step-by-step learning | `/docs/getting-started/*` |
| **🔧 How-To Guides** | Task-oriented recipes | `/docs/features/*`, `/library` |
| **📋 Reference** | Technical specifications | `/docs/components/*` |
| **💡 Concepts** | Understanding & theory | `/docs/design/*`, `/docs/security/*` |

---

### 📖 Tutorials (Learning-Oriented)

**Getting started guides** at `/docs/getting-started`:
- First-time setup (0 to running app in 10 minutes)
- Building your first feature
- Deploying to production
- Adding authentication
- Accepting your first payment

### 🔧 How-To Guides (Task-Oriented)

**Feature implementation guides** at `/docs/features`:
- How to add OAuth providers
- How to configure Stripe webhooks
- How to customize email templates
- How to add new database tables
- How to implement RBAC

**Copy-paste templates** at `/library`:
- 46+ production-ready page templates
- Landing pages, dashboards, auth flows
- Just copy, paste, customize

### 📋 Reference (Information-Oriented)

### Component Documentation

**Component API documentation** at `/docs/components`:
- all 62 UI components with props, variants, examples
- Accessibility compliance notes
- Terminal styling patterns
- Copy-paste ready code

**API endpoints** at `/docs/api`:
- Route handlers reference
- Request/response schemas
- Authentication requirements
- Error codes and handling

### 💡 Concepts (Understanding-Oriented)

**Design system principles** at `/docs/design`:
- Terminal aesthetic philosophy
- OKLCH color system explained
- 12 theme architecture
- Typography and spacing theory

**Security architecture** at `/docs/security`:
- CSRF protection explained
- CSP headers and nonces
- Session management strategy
- OAuth flow diagrams

**Best practices** throughout documentation:
- When to use which payment provider
- Database schema design patterns
- Email template architecture
- Performance optimization strategies

---

### 📂 Documentation File Structure

Fabrk documentation is organized across multiple locations for different purposes:

```
fabrk/
├── README.md                          # You are here! Quick start + overview
├── CLAUDE.md                          # AI assistant development guide
│
├── docs/                              # Deep-dive documentation (Markdown)
│   ├── 01-getting-started/           # Setup and installation
│   ├── 02-configuration/             # Environment variables, config
│   ├── 03-features/                  # Feature implementation guides
│   ├── 04-deployment/                # Deployment guides
│   ├── 06-security/                  # Security architecture
│   ├── 08-design/                    # Design system specification
│   │   └── DESIGN_SYSTEM.md          # Complete design system docs
│   └── ENV-VALIDATION.md             # Environment variable guide
│
├── src/app/(public)/
│   ├── docs/                         # Live documentation site (Next.js pages)
│   │   ├── components/               # 62 UI component docs with live previews
│   │   ├── features/                 # Feature guides (payments, auth, etc.)
│   │   ├── security/                 # Security guides (CSRF, headers, etc.)
│   │   ├── design/                   # Design system guides
│   │   ├── deployment/               # Deployment guides (Vercel, Docker, etc.)
│   │   ├── architecture/             # Architecture diagrams & patterns
│   │   ├── launch/                   # Pre-launch checklists
│   │   └── extras/                   # Tools (theme generator, etc.)
│   │
│   └── library/                      # Template showcase (copy-paste pages)
│       ├── admin-panels/             # Admin panel templates
│       ├── authentication/           # Auth flow templates
│       ├── dashboards/               # Dashboard templates
│       ├── marketing/                # Landing page templates
│       ├── blog/                     # Blog templates
│       └── ... (28 template categories)
│
└── .claude/                          # Claude Code assistant files
    └── audit/                        # Code quality audit framework (58 files)
```

#### Where to Find What

| What You Need | Where to Look |
|---------------|---------------|
| **Quick setup** | `README.md` (Quick Start section) |
| **Environment variables** | `docs/ENV-VALIDATION.md` or `.env.example` |
| **Component API reference** | Visit `/docs/components/*` after `npm run dev` |
| **How to add payments** | Visit `/docs/features/payments` after `npm run dev` |
| **Design system rules** | `docs/08-design/DESIGN_SYSTEM.md` |
| **Security architecture** | Visit `/docs/security/*` after `npm run dev` |
| **Copy-paste templates** | Visit `/library/*` after `npm run dev` |
| **AI development guide** | `CLAUDE.md` (for Claude Code, Cursor, etc.) |
| **Deployment guides** | Visit `/docs/deployment/*` after `npm run dev` |
| **Code quality audits** | `.claude/audit/` (58 modular audit files) |

#### Documentation Types Explained

**1. Markdown Files (`docs/` directory)**
- Static reference documentation
- Deep technical specifications
- Read with any text editor or GitHub
- Perfect for version control diffs

**2. Next.js Pages (`src/app/(public)/docs/`)**
- Interactive documentation with live previews
- Component demos you can interact with
- Searchable via site search
- Visit http://localhost:3000/docs after `npm run dev`

**3. Library Templates (`src/app/(public)/library/`)**
- Production-ready page templates
- Copy entire pages to jumpstart development
- Preview + Code tabs for easy copying
- Visit http://localhost:3000/library after `npm run dev`

**4. AI Assistant Guides**
- `CLAUDE.md` - Comprehensive development guide for AI tools
- `.claude/audit/` - Code quality framework (58 specialized audits)
- Optimized for Claude Code, Cursor, GitHub Copilot

#### Navigation Flow

```
1. Start here (README.md) → Quick setup
    ↓
2. Run `npm run dev` → Start local server
    ↓
3. Visit http://localhost:3000/docs → Interactive docs
    ↓
4. Browse:
   • /docs/components → See all 62 UI components
   • /docs/features → Learn to add payments, auth, etc.
   • /library → Copy-paste ready templates
    ↓
5. Read `CLAUDE.md` → AI assistant development patterns
    ↓
6. Check `docs/08-design/DESIGN_SYSTEM.md` → Design rules
```

#### Documentation Best Practices

When **building features**, follow this sequence:
1. Read the **concept** docs (`/docs/security/*`, `/docs/design/*`)
2. Follow the **how-to guide** (`/docs/features/*`)
3. Reference the **component docs** (`/docs/components/*`)
4. Copy from **library templates** (`/library/*`) if available
5. Consult `CLAUDE.md` for AI-assisted development

When **stuck or troubleshooting**:
1. Check this README's Troubleshooting section (line 788+)
2. Search `/docs/` for your topic
3. Check GitHub Issues
4. Email support@fabrk.dev

---

## ❓ Frequently Asked Questions

### General

**Q: What makes Fabrk different from other SaaS boilerplates?**

A: Terminal-first design aesthetic (18 themes), multi-provider payments (Stripe/Polar/Lemonsqueezy), 62 production-ready components, and 100% OKLCH color system for perfect theme consistency.

**Q: Can I use this for client projects?**

A: Yes! The license allows unlimited client projects. Each developer needs their own seat ($299).

**Q: Is this a template or a starter kit?**

A: Both. Use it as a foundation to build on, or copy individual components/templates into existing projects.

**Q: Do I need to credit Fabrk in my app?**

A: No attribution required. Build your brand, not ours.

### Technical

**Q: Why Next.js 16? Can I use Next.js 15?**

A: Fabrk uses Next.js 16 features (App Router, async params, React 19). Downgrading to v15 will break things. Stick with v16.

**Q: Can I switch from Stripe to Polar or Lemonsqueezy later?**

A: Yes, all three providers are fully implemented. Change the config in `src/config/stripe.ts` (or create separate config files). Webhooks work for all three.

**Q: Does this work with PostgreSQL AND SQLite?**

A: Yes. SQLite for local dev (fast, no Docker), PostgreSQL for production (Vercel Postgres, Railway, etc.). Prisma handles both.

**Q: Why OKLCH colors instead of RGB/HSL?**

A: OKLCH is perceptually uniform (consistent lightness across hues), perfect for theming. all 18 themes maintain WCAG 2.2 AA contrast ratios automatically.

**Q: Can I change the border radius style?**

A: Yes! The design system uses dynamic radius via `--radius` CSS variable. Update `--radius` in `globals.css` for your theme (e.g., `--radius: 0px` for sharp corners, `--radius: 8px` for rounded). All components automatically inherit the new value through `mode.radius`.

### Licensing

**Q: What happens after v1.x? Do I pay again for v2.0?**

A: Free updates for all v1.x releases (1.0 → 1.1 → 1.9). Major versions (v2.0+) may require upgrade fee. You own v1.x forever.

**Q: Can I use this for SaaS products I sell?**

A: Yes, that's the primary use case. Sell subscriptions, charge customers, keep 100% of revenue.

**Q: Team of 5 developers = $1,495 total?**

A: Correct. $299 × 5 seats. Contact support@fabrk.dev for volume pricing (10+ seats).

### Features

**Q: Does this include a database schema for [X]?**

A: Includes User, Payment, Session tables. You add your domain models (products, posts, etc.). Prisma makes schema changes easy.

**Q: Are there admin features?**

A: Yes. Role-based access control (RBAC), admin dashboard example, protected API routes.

**Q: Does it handle subscriptions or just one-time payments?**

A: Both. All three payment providers support subscriptions. Webhook handlers included.

**Q: What email features are included?**

A: Magic link auth, welcome emails, payment receipts. Built with React Email + Resend. Add your own transactional emails easily.

**Q: Is there a public roadmap?**

A: Feature requests via GitHub Issues. Major features announced in CHANGELOG.md.

### Support

**Q: Do you offer implementation support?**

A: Community support via GitHub Discussions. Paid consulting available (email support@fabrk.dev).

**Q: What if I find a bug?**

A: Report it on GitHub Issues. Critical bugs fixed within 48 hours.

**Q: Can I request features?**

A: Absolutely. Open a GitHub Issue with `[Feature Request]` tag. Popular requests get prioritized.

---

## 🔧 Troubleshooting

### Port 3000 already in use

```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9
npm run dev
```

Or use the built-in dev command (auto-kills port 3000):
```bash
npm run dev  # Automatically kills old processes
```

---

### Database errors

**Error: "Migration failed" or "Schema out of sync"**

```bash
# Reset database
npm run db:reset
```

**Error: "Can't reach database server"**

```bash
# If using PostgreSQL, verify DATABASE_URL is correct
# If using SQLite, delete dev.db and recreate:
rm prisma/dev.db
npm run db:push
```

**Prisma errors persist:**

```bash
# Clear Prisma cache and regenerate client
rm -rf node_modules/.prisma
npx prisma generate
npm run db:push
```

---

### Build fails with TypeScript errors

```bash
# Regenerate Prisma client
npx prisma generate

# Clear Next.js cache
rm -rf .next
npm run build
```

**Error: "Cannot find module '@prisma/client'"**

```bash
npm install @prisma/client
npx prisma generate
```

---

### Email not sending (magic link)

**Symptoms:** Can't log in, "Email sent" message but no email received

**Solutions:**

1. **Verify RESEND_API_KEY is set:**
   ```bash
   grep RESEND_API_KEY .env.local
   ```

2. **Check Resend dashboard for errors:** https://resend.com/emails

3. **Verify sender email:**
   - Development: Use `onboarding@resend.dev` (no verification needed)
   - Production: Use your verified domain email

4. **Check spam folder** - Magic link emails sometimes land in spam

5. **Resend API key format:**
   ```bash
   RESEND_API_KEY="re_..."  # Must start with "re_"
   ```

---

### Payments not working

**Symptom:** Customer completes checkout but order not created

**Solutions:**

1. **Verify webhook is configured** (see Webhook Configuration section above)

2. **Check webhook secret is set:**
   ```bash
   grep WEBHOOK_SECRET .env.local
   ```

3. **Test webhook locally with Stripe CLI:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   # Make a test purchase, check CLI output
   ```

4. **Check webhook logs:**
   - Stripe: Dashboard → Developers → Webhooks → Your endpoint
   - Polar: Dashboard → Settings → Webhooks
   - Lemonsqueezy: Dashboard → Settings → Webhooks

5. **Verify endpoint is receiving requests:**
   - Check server logs: `npm run dev` output
   - Look for `POST /api/webhooks/stripe` or similar

**Common webhook errors:**
- **401 Unauthorized:** Webhook secret doesn't match
- **404 Not Found:** Webhook URL incorrect
- **500 Internal Error:** Check server logs for stack trace

---

### Theme not changing

**Symptom:** Click theme switcher but nothing happens

**Solutions:**

1. **Clear browser cache:**
   - Chrome: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Safari: Cmd+Option+E, then refresh

2. **Check localStorage:**
   - Open DevTools → Application → Local Storage
   - Look for `theme` key
   - Try manually setting: `localStorage.setItem('theme', 'amber')`

3. **Verify theme name matches available themes:**
   - Valid: `green`, `amber`, `c64`, `gameboy`, etc.
   - Invalid: `crt-green`, `dark`, `light`

4. **Hard refresh:**
   ```bash
   # Stop dev server
   rm -rf .next
   npm run dev
   ```

---

### Build succeeds locally but fails on Vercel

**Common causes:**

1. **Missing environment variables:**
   - Check Vercel dashboard → Settings → Environment Variables
   - Ensure all required vars are set for Production

2. **TypeScript strict mode:**
   - Vercel runs `tsc --noEmit`
   - Fix type errors locally: `npm run type-check`

3. **Node version mismatch:**
   - Fabrk uses Node 18+
   - Set in `package.json`: `"engines": { "node": ">=18" }`

4. **Prisma schema not synced:**
   - Run `npx prisma generate` before build
   - Vercel should auto-run this, but check build logs

---

### Components not rendering correctly

**Symptom:** Components look broken, missing styles, or layout issues

**Solutions:**

1. **Verify Tailwind is compiling:**
   ```bash
   # Check for errors in console
   npm run dev
   # Look for Tailwind compilation messages
   ```

2. **Clear Tailwind cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Verify globals.css is imported:**
   - Check `src/app/layout.tsx` imports `./globals.css`

4. **Check for conflicting CSS:**
   - Remove any custom CSS files
   - Use only Tailwind utilities + design tokens

---

### "Module not found" errors

**Error: "Cannot find module '@/components/ui/button'"**

```bash
# Verify tsconfig paths are correct
cat tsconfig.json | grep "@/*"
# Should show: "@/*": ["./src/*"]

# Restart TypeScript server (VS Code)
# Cmd+Shift+P → TypeScript: Restart TS Server
```

**Error: "Cannot find module 'lucide-react'"**

```bash
npm install lucide-react
```

---

### Still stuck?

- **Email:** support@fabrk.dev
- **GitHub Issues:** https://github.com/THEFT-DEV/fabrk/issues

When reporting issues, include:
1. Error message (full stack trace)
2. Steps to reproduce
3. Environment (OS, Node version, package manager)
4. Relevant code/config files

---

## 🛟 Support

### Issues & Questions

- **GitHub Issues**: https://github.com/THEFT-DEV/fabrk/issues
- **Email**: support@fabrk.dev

### Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make changes (ensure pre-commit hooks pass)
4. Submit a pull request

---

## 🎯 Next Steps

1. **Configure authentication** - Set up NextAuth providers in `.env.local`
2. **Set up payments** - Configure Stripe, Polar, or Lemonsqueezy webhooks
3. **Customize design** - Choose your terminal theme, adjust colors
4. **Add features** - Build on top of 62 UI components
5. **Deploy** - Push to Vercel, set environment variables, go live

**Read CLAUDE.md for AI assistant guidance** - Optimized for Claude Code and other AI tools.

---

## 📝 License

**Proprietary Commercial License** — Full legal terms in `LICENSE.md`

**Pricing:** $299 per developer seat (one-time payment, perpetual license for v1.x)

**What's Included:**
- ✅ Unlimited projects for you or your clients
- ✅ Modify and customize source code freely
- ✅ Deploy to unlimited domains
- ✅ Lifetime updates for v1.x (all minor/patch releases)
- ✅ Commercial use (SaaS, client work, products)

**License Restrictions:**
- ❌ Cannot resell or redistribute the source code as a standalone product
- ❌ One seat per developer (each team member needs their own license)
- ❌ Cannot create competing boilerplate/template products
- ❌ Cannot sublicense to others

**Team Licensing:**
- Need multiple seats? Contact support@fabrk.dev for volume pricing
- Enterprise licenses available for organizations with 10+ developers

**Updates & Upgrades:**
- Free updates for all v1.x releases (1.0 → 1.1, 1.2, etc.)
- Major version upgrades (v2.0+) may require additional fee
- No subscription — pay once, use forever

---

**Built with ❤️ by indie hackers, for indie hackers.**

**Ship fast. Stay lean. Build what matters.**

---

**© 2025 THEFT BV. All rights reserved.**

**Last Updated:** 2026-01-22
