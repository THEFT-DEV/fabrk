# Quick Start Guide

Get Fabrk running locally in under 5 minutes.

---

## Prerequisites

Before starting, make sure you have:

- **Node.js 22+** ([Download](https://nodejs.org/))
- **Git** installed
- **PostgreSQL database** (the wizard will guide you - get a free one at [neon.tech](https://neon.tech) or [supabase.com](https://supabase.com))

---

## Option 1: Interactive Setup Wizard (Recommended)

The fastest way to get started. The wizard configures everything for you.

```bash
# Clone the repository
git clone https://github.com/yourusername/fabrk.git
cd fabrk

# Install dependencies
npm install --legacy-peer-deps

# Run the interactive setup wizard
npm run setup
```

### What the Wizard Does

1. **Asks what you're building:**
   - **STARTER** (1-2 min) - PostgreSQL + Auth only
   - **SAAS** (4-5 min) - Full stack with Stripe + Resend
   - **AI APP** (5-6 min) - SaaS + OpenAI integration
   - **MARKETPLACE** (6-7 min) - SaaS + Algolia + Storage
   - **CUSTOM** - Pick each feature individually

2. **Walks you through each service:**
   - Database (PostgreSQL, MySQL, MongoDB, SQLite)
   - Payments (Stripe, Polar, Lemonsqueezy, PayPal)
   - Email (Resend, Postmark, SendGrid, AWS SES)
   - Analytics (PostHog, Plausible, Mixpanel)
   - AI (OpenAI, Anthropic, Google AI, and more)
   - Search (Algolia, Typesense, Meilisearch)
   - Storage (Cloudflare R2, AWS S3, Supabase)

3. **Generates `.env.local`** with all your configured variables

4. **Copies a starter landing page** matching your app type:
   - SaaS → Features grid, pricing tiers, FAQ
   - AI App → Demo section, capabilities, credit-based pricing
   - Marketplace → Categories, how it works, seller benefits
   - Starter/Custom → Basic hero, features, CTA

5. **Runs database setup automatically:**
   - `npx prisma generate` - Creates Prisma client
   - `npm run db:push` - Syncs schema to database

6. **Starts the dev server and opens your browser**

### Skipping API Keys

Don't have all your API keys yet? No problem! The wizard lets you skip any key:
- Just press Enter without typing anything
- The wizard writes helpful placeholder values
- TODO comments remind you what to configure later

```env
# TODO: Replace with your actual DATABASE_URL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

---

## Option 2: Manual Setup

If you prefer to configure everything manually:

### Step 1: Clone and Install

```bash
git clone https://github.com/yourusername/fabrk.git
cd fabrk
npm install --legacy-peer-deps
```

### Step 2: Database Setup

Get a free PostgreSQL database:

**Neon (Recommended - Serverless):**
1. Go to [neon.tech](https://neon.tech)
2. Create a new project (free tier)
3. Copy the connection string

**Supabase:**
1. Go to [database.new](https://database.new)
2. Create a new project (free tier)
3. Copy the connection string from Settings → Database → Connection String (URI)

**Local PostgreSQL:**
```bash
# macOS (via Homebrew)
brew install postgresql
brew services start postgresql
createdb fabrk

# Your connection string:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/fabrk"
```

### Step 3: Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with minimum required values:

```env
# Database (Required)
DATABASE_URL="postgresql://user:password@host:5432/fabrk"

# Auth (Required)
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (Required for magic link auth)
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"

# Payments (Optional - add when ready)
# STRIPE_SECRET_KEY="sk_test_..."
# STRIPE_WEBHOOK_SECRET="whsec_..."
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### Step 4: Initialize Database

```bash
npx prisma generate
npm run db:push
```

### Step 5: Start Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Customizing Your Landing Page

After setup, your landing page is at `src/app/(marketing)/page.tsx`.

Each template includes:
- **[SETUP] banner** at the top with instructions
- **TODO comments** marking what to customize
- **Placeholder text** that clearly needs replacement

### Quick Customization

1. Open `src/app/(marketing)/page.tsx`
2. Replace placeholder text with your app name and features
3. Remove the [SETUP] instruction banner
4. Done!

### AI-Assisted Customization

A `FABRK-PROMPTS.md` file is generated with copy-paste prompts for Cursor, Claude Code, or Windsurf:

```markdown
## QUICK START - Update Your Landing Page
Update src/app/(marketing)/page.tsx:
1. Replace placeholder text with my app name and tagline
2. Update the 3-6 features to match what my product does
3. Keep the terminal aesthetic (font-mono, rounded-none, uppercase headings)
4. Remove the [SETUP] instruction banner at the top when done
```

---

## Testing Your Setup

### Authentication
1. Navigate to `/login`
2. Enter any email address
3. Check console for magic link (if Resend not configured)
4. Click link to log in

### Payments (if configured)
1. Navigate to `/pricing`
2. Click a plan
3. Use test card: `4242 4242 4242 4242`
4. Complete checkout

### Theme Switching
1. Click the palette icon in the navigation
2. Try different themes (Green CRT, Amber, C64, etc.)

---

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev  # Automatically kills old processes
```

### Database connection errors
```bash
# Verify your connection string
npx prisma db pull

# If it fails, check:
# - Is the connection string correct?
# - Is the database server running?
# - Are you using the correct password?
```

### Prisma errors
```bash
rm -rf node_modules/.prisma
npx prisma generate
npm run db:push
```

### Build fails
```bash
rm -rf .next
npm run build
```

---

## Next Steps

1. **Customize your landing page** - Update `src/app/(marketing)/page.tsx`
2. **Configure payments** - Set up Stripe/Polar/Lemonsqueezy webhooks
3. **Add your features** - Build on top of 78 UI components
4. **Deploy** - Push to Vercel and set environment variables

---

## Helpful Links

- [README.md](../../README.md) - Project overview
- [CLAUDE.md](../../CLAUDE.md) - AI development guide
- [DESIGN_SYSTEM.md](../08-design/DESIGN_SYSTEM.md) - Design system reference
- [DEPLOYMENT.md](../10-deployment/DEPLOYMENT.md) - Deployment guide
