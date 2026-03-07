---
title: 'Getting Started with Fabrk: The Complete Setup Guide'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'getting-started-fabrk'
description: 'A comprehensive guide to setting up Fabrk for your SaaS project. Covers environment setup, database configuration, authentication, payments, and your first deployment.'
publishedAt: '2026-01-29T10:00:00.000Z'
---

This guide walks you through setting up Fabrk from scratch. By the end, you'll have a fully functional SaaS application running locally and ready for deployment.

---

## [ PREREQUISITES DEEP DIVE ]

Before starting, ensure your development environment meets these requirements. Taking time to set up your environment correctly will save hours of debugging later.

### REQUIRED SOFTWARE

**Node.js 22+**

Fabrk uses modern JavaScript features that require Node 22, including native ESM modules, improved performance, and the latest V8 engine optimizations. Check your version:

```bash
node --version
# Should output v22.x.x or higher
```

If you need to upgrade, we recommend using a version manager:

```bash
# Using nvm (Node Version Manager)
nvm install 22
nvm use 22
nvm alias default 22

# Using fnm (Fast Node Manager) - recommended for speed
fnm install 22
fnm use 22
fnm default 22

# Using Homebrew on macOS
brew install node@22
```

**Why Node 22?** Fabrk leverages several Node 22 features:
- Native fetch API without polyfills
- Improved ESM/CommonJS interoperability
- Better performance for Prisma operations
- Native support for newer TypeScript features

---

**PostgreSQL 15+**

PostgreSQL is the database of choice for Fabrk. Version 15+ provides improved performance, better JSON handling, and enhanced security features. You have several installation options:

```bash
# Check if PostgreSQL is installed
psql --version
# Should output psql (PostgreSQL) 15.x or higher
```

**macOS Installation:**

```bash
# Using Homebrew
brew install postgresql@15
brew services start postgresql@15

# Add to PATH (add to your .zshrc or .bashrc)
export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"
```

**Ubuntu/Debian Installation:**

```bash
# Add PostgreSQL repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install postgresql-15
```

**Windows Installation:**

Download the installer from the [PostgreSQL website](https://www.postgresql.org/download/windows/) and follow the installation wizard. Make sure to:
- Remember your superuser password
- Keep the default port (5432)
- Install the command line tools

---

**npm 10+**

npm 10 comes bundled with Node.js 22 and includes important security and performance improvements:

```bash
npm --version
# Should output 10.x.x or higher

# If you need to upgrade npm manually
npm install -g npm@latest
```

---

**Git**

Git is required for version control and deployment workflows:

```bash
git --version
# Should output git version 2.x.x

# macOS
brew install git

# Ubuntu/Debian
sudo apt-get install git

# Windows
# Download from https://git-scm.com/download/win
```

---

### RECOMMENDED DEVELOPMENT TOOLS

**VS Code Extensions**

For the best development experience, install these VS Code extensions:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "prisma.prisma",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

**VS Code Settings for Fabrk:**

Create or update `.vscode/settings.json` in your project:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

---

**Docker Desktop**

Docker provides isolated development environments and is the recommended way to run PostgreSQL locally:

```bash
# Check Docker installation
docker --version
docker-compose --version

# macOS/Windows: Download Docker Desktop
# https://www.docker.com/products/docker-desktop

# Linux: Install Docker Engine
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

---

**Vercel CLI**

For deployment previews and production deployments:

```bash
npm install -g vercel
vercel login
```

---

## [ SYSTEM REQUIREMENTS ]

Fabrk is designed to run efficiently on modern development machines. Here are the minimum and recommended specifications:

### MINIMUM REQUIREMENTS

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU | 2 cores | 4+ cores |
| RAM | 4 GB | 8+ GB |
| Disk Space | 2 GB free | 5+ GB free |
| Node.js | 22.0.0 | Latest LTS |
| PostgreSQL | 15.0 | 16.x |

### OPERATING SYSTEM COMPATIBILITY

**Fully Supported:**
- macOS 12+ (Monterey, Ventura, Sonoma, Sequoia)
- Ubuntu 22.04 LTS, 24.04 LTS
- Debian 11+, 12+
- Windows 11 with WSL2
- Windows 10 with WSL2

**Limited Support:**
- Windows without WSL (some scripts may need modification)
- Older Linux distributions
- ARM-based systems (M1/M2 Macs fully supported)

### DISK SPACE BREAKDOWN

```
Fabrk Project Space Requirements:
├── node_modules/     ~800 MB
├── .next/            ~200 MB (development)
├── .next/            ~100 MB (production build)
├── PostgreSQL data   ~100 MB (initial)
└── Git history       ~50 MB
────────────────────────────────
Total Initial:        ~1.2 GB
With Docker:          ~2.5 GB (includes images)
```

---

## [ CLONE AND INITIAL SETUP ]

### CLONING THE REPOSITORY

Start by cloning the Fabrk repository:

```bash
# Clone with a custom project name
git clone https://github.com/fabrk/fabrk-dev.git my-saas-app
cd my-saas-app

# Or clone with default name
git clone https://github.com/fabrk/fabrk-dev.git
cd fabrk-dev
```

### UNDERSTANDING THE REPOSITORY STRUCTURE

Before installing dependencies, take a moment to understand what you're working with:

```
my-saas-app/
├── .ai/                    # AI development context files
│   ├── CONTEXT.md          # Master context for AI tools
│   ├── tokens.md           # Design tokens reference
│   ├── components.md       # Component inventory
│   ├── rules.md            # Coding rules and constraints
│   └── patterns.md         # Common implementation patterns
│
├── .husky/                 # Git hooks for code quality
│   └── pre-commit          # Runs type-check and lint-staged
│
├── docs/                   # Comprehensive documentation
│   ├── 01-getting-started/
│   ├── 02-architecture/
│   ├── 03-authentication/
│   ├── 04-database/
│   ├── 05-payments/
│   ├── 06-deployment/
│   ├── 07-api/
│   ├── 08-design/
│   ├── 09-testing/
│   ├── 10-troubleshooting/
│   └── 11-ai-development/
│
├── mcp-servers/            # MCP server for AI tools
│   └── fabrk/
│
├── outstatic/              # Blog content management
│   └── content/
│       └── posts/
│
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma       # Prisma schema definition
│   └── seed.ts             # Database seeding script
│
├── public/                 # Static assets
│   ├── images/
│   └── fonts/
│
├── scripts/                # Build and setup scripts
│   └── setup.ts            # Interactive setup wizard
│
├── src/                    # Source code (main application)
│   ├── app/                # Next.js App Router
│   ├── components/         # React components
│   ├── config/             # Configuration files
│   ├── design-system/      # Theme and styling
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Business logic
│   └── types/              # TypeScript definitions
│
├── tests/                  # Test files
│   ├── e2e/                # Playwright E2E tests
│   └── unit/               # Vitest unit tests
│
├── .env.example            # Environment template
├── CLAUDE.md               # AI assistant instructions
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment config
```

### INSTALLING DEPENDENCIES

Install all project dependencies:

```bash
npm install
```

This installs approximately 800+ packages including:

**Core Framework:**
- Next.js 16 with App Router and React 19
- TypeScript 5.x with strict mode
- Prisma 7 ORM for database access

**Authentication & Security:**
- NextAuth v5 (Auth.js) for authentication
- bcryptjs for password hashing
- Zod for runtime validation

**Styling & UI:**
- Tailwind CSS 4 with JIT compiler
- 60+ pre-built UI components
- 8 chart components with Recharts
- Lucide React icons

**Development Tools:**
- ESLint with flat config
- Prettier for code formatting
- Husky for Git hooks
- lint-staged for staged file linting

**Installation Notes:**

If you see peer dependency warnings, they're generally safe to ignore. Fabrk is tested with specific version combinations that work together. However, if you encounter errors:

```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Alternative: Use legacy peer deps
npm install --legacy-peer-deps
```

---

## [ INTERACTIVE SETUP WIZARD ]

Fabrk includes an interactive setup wizard that configures your project with sensible defaults while allowing customization.

### RUNNING THE WIZARD

```bash
npm run setup
```

### WIZARD OPTIONS EXPLAINED

The setup wizard walks you through several configuration steps:

**1. Database Configuration**

```
? Select your database setup:
  > Local PostgreSQL
    Docker PostgreSQL
    Vercel Postgres
    Supabase
    Neon
    Railway
    Custom connection string
```

Each option provides specific instructions and generates the appropriate `DATABASE_URL`.

**2. Payment Provider**

```
? Select your payment provider:
  > Stripe (recommended)
    Polar.sh
    Lemonsqueezy
    None (configure later)
```

Selecting a provider adds the required environment variables and enables the corresponding API routes.

**3. Email Service**

```
? Select your email service:
  > Resend (recommended)
    SendGrid
    Postmark
    AWS SES
    None (configure later)
```

**4. Authentication Providers**

```
? Select OAuth providers to enable (space to select):
  [ ] GitHub
  [ ] Google
  [x] Email/Password (always enabled)
```

**5. Theme Selection**

```
? Select your default theme:
  > phosphor-green
    amber-crt
    matrix-rain
    cyberpunk-neon
    ... (18 themes available)
```

### DRY RUN MODE

Preview changes without modifying files:

```bash
npm run setup -- --dry-run
```

This shows what would be configured without making actual changes:

```
[DRY RUN] Would create .env.local with:
  DATABASE_URL=postgresql://postgres:postgres@localhost:5432/my_saas_dev
  NEXTAUTH_SECRET=<generated-secret>
  ...

[DRY RUN] Would update src/config/index.ts with:
  defaultTheme: 'phosphor-green'
  paymentProvider: 'stripe'
  ...
```

### MANUAL SETUP ALTERNATIVE

If you prefer manual configuration:

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your preferred editor
code .env.local
```

---

## [ DATABASE SETUP OPTIONS ]

Fabrk supports multiple database hosting options. Choose based on your development preferences and production plans.

### OPTION A: LOCAL POSTGRESQL

Best for offline development and full control over your database.

**macOS Setup:**

```bash
# Install PostgreSQL
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb my_saas_dev

# Verify connection
psql -d my_saas_dev -c "SELECT version();"
```

**Connection String:**

```bash
DATABASE_URL="postgresql://$(whoami)@localhost:5432/my_saas_dev"
```

---

### OPTION B: DOCKER POSTGRESQL (RECOMMENDED)

Docker provides isolated, reproducible database environments that match production.

**docker-compose.yml:**

Create this file in your project root:

```yaml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    container_name: fabrk_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: my_saas_dev
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql:ro
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 10s
      timeout: 5s
      retries: 5

  # Optional: pgAdmin for visual database management
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: fabrk_pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@localhost.com
      PGADMIN_DEFAULT_PASSWORD: admin
      PGADMIN_CONFIG_SERVER_MODE: 'False'
    ports:
      - '5050:80'
    depends_on:
      - db
    volumes:
      - pgadmin_data:/var/lib/pgadmin

volumes:
  postgres_data:
  pgadmin_data:
```

**Starting Docker Services:**

```bash
# Start in background
docker-compose up -d

# View logs
docker-compose logs -f db

# Stop services
docker-compose down

# Stop and remove volumes (reset data)
docker-compose down -v
```

**Connection String:**

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my_saas_dev"
```

**Accessing pgAdmin:**

1. Open http://localhost:5050
2. Login with admin@localhost.com / admin
3. Add server: Host = db, Port = 5432, Username = postgres, Password = postgres

---

### OPTION C: VERCEL POSTGRES

Best for Vercel deployments with seamless integration.

**Setup Steps:**

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or create one)
3. Navigate to **Storage** tab
4. Click **Create Database** → **Postgres**
5. Choose a region close to your users
6. Copy the connection string

**Connection String Format:**

```bash
DATABASE_URL="postgres://default:xxxxx@region-postgres.vercel-storage.com:5432/verceldb?sslmode=require"
```

**Important:** Always include `?sslmode=require` for cloud databases.

**Vercel CLI Alternative:**

```bash
# Link to Vercel project
vercel link

# Pull environment variables
vercel env pull .env.local
```

---

### OPTION D: SUPABASE

Best for projects that need additional Supabase features (auth, storage, realtime).

**Setup Steps:**

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the connection string under "Connection string" → "URI"

**Connection String Format:**

```bash
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# For migrations (direct connection)
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

**Prisma Schema Update:**

For Supabase with connection pooling, add to `prisma/schema.prisma`:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

---

### OPTION E: NEON

Best for serverless deployments with autoscaling and branching features.

**Setup Steps:**

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard

**Connection String Format:**

```bash
DATABASE_URL="postgresql://user:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

**Neon Benefits:**
- Database branching for testing
- Autoscaling to zero (cost savings)
- Instant database creation

---

### OPTION F: RAILWAY

Best for quick deployments with automatic provisioning.

**Setup Steps:**

1. Create account at [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Go to **Variables** tab
4. Copy `DATABASE_URL`

**Connection String Format:**

```bash
DATABASE_URL="postgresql://postgres:xxxxx@containers-us-west-123.railway.app:5432/railway"
```

---

## [ ENVIRONMENT VARIABLES DEEP DIVE ]

Understanding every environment variable helps you configure Fabrk correctly for development and production.

### COMPLETE .env.local EXAMPLE

```bash
# =============================================================================
# FABRK ENVIRONMENT CONFIGURATION
# =============================================================================
# Copy this file to .env.local and fill in your values
# NEVER commit .env.local to version control
# =============================================================================

# =============================================================================
# DATABASE
# =============================================================================
# PostgreSQL connection string
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
# Add ?sslmode=require for cloud databases
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my_saas_dev"

# Direct connection URL (for Supabase with connection pooling)
# DIRECT_URL="postgresql://..."

# =============================================================================
# AUTHENTICATION
# =============================================================================
# NextAuth secret - REQUIRED
# Generate with: openssl rand -base64 32
# Must be at least 32 characters
NEXTAUTH_SECRET="K7gJ9mP2xYvNqR5sT8wC3bF6hA1dE4iL0oU7yZn="

# Canonical URL for authentication callbacks
# Development: http://localhost:3000
# Production: https://yourdomain.com
NEXTAUTH_URL="http://localhost:3000"

# Trust host header (set to true for proxied deployments)
AUTH_TRUST_HOST="true"

# =============================================================================
# OAUTH PROVIDERS (Optional)
# =============================================================================
# GitHub OAuth
# Create at: https://github.com/settings/developers
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""

# Google OAuth
# Create at: https://console.cloud.google.com/apis/credentials
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# Discord OAuth
# Create at: https://discord.com/developers/applications
AUTH_DISCORD_ID=""
AUTH_DISCORD_SECRET=""

# =============================================================================
# APPLICATION
# =============================================================================
# Public URL of your application
# Used for generating absolute URLs (emails, webhooks, etc.)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Application name displayed in UI and emails
NEXT_PUBLIC_APP_NAME="My SaaS"

# Application description for SEO
NEXT_PUBLIC_APP_DESCRIPTION="A modern SaaS application built with Fabrk"

# =============================================================================
# EMAIL (Resend - Recommended)
# =============================================================================
# API key from: https://resend.com/api-keys
RESEND_API_KEY=""

# Verified sender email address
# Must be verified in Resend dashboard
EMAIL_FROM="noreply@yourdomain.com"

# =============================================================================
# PAYMENTS - STRIPE
# =============================================================================
# Secret key from: https://dashboard.stripe.com/apikeys
# Use sk_test_... for development, sk_live_... for production
STRIPE_SECRET_KEY=""

# Publishable key (safe to expose in browser)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# Webhook secret from: https://dashboard.stripe.com/webhooks
# Generate with: stripe listen --forward-to localhost:3000/api/stripe/webhook
STRIPE_WEBHOOK_SECRET=""

# Stripe Price IDs for your subscription plans
# Create at: https://dashboard.stripe.com/products
STRIPE_PRICE_ID_STARTER=""
STRIPE_PRICE_ID_PRO=""
STRIPE_PRICE_ID_ENTERPRISE=""

# =============================================================================
# PAYMENTS - POLAR (Alternative)
# =============================================================================
# POLAR_ACCESS_TOKEN=""
# POLAR_ORGANIZATION_ID=""
# POLAR_WEBHOOK_SECRET=""
# NEXT_PUBLIC_POLAR_ORGANIZATION_ID=""

# =============================================================================
# PAYMENTS - LEMONSQUEEZY (Alternative)
# =============================================================================
# LEMONSQUEEZY_API_KEY=""
# LEMONSQUEEZY_STORE_ID=""
# LEMONSQUEEZY_WEBHOOK_SECRET=""

# =============================================================================
# AI FEATURES (Optional)
# =============================================================================
# Anthropic API for AI features
# Get key from: https://console.anthropic.com/
ANTHROPIC_API_KEY=""

# AI daily budget per user (in USD)
AI_DAILY_BUDGET="5.00"

# =============================================================================
# ANALYTICS (Optional)
# =============================================================================
# Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=""

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=""
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# =============================================================================
# FEATURE FLAGS (Optional)
# =============================================================================
# Enable/disable features
NEXT_PUBLIC_ENABLE_BLOG="true"
NEXT_PUBLIC_ENABLE_CHANGELOG="true"
NEXT_PUBLIC_ENABLE_AI_FEATURES="false"

# =============================================================================
# DEVELOPMENT
# =============================================================================
# Set to "development" for local, "production" for deployed
NODE_ENV="development"

# Enable debug logging
DEBUG="false"
```

### ENVIRONMENT VARIABLE CATEGORIES

**Required for Development:**
- `DATABASE_URL` - Database connection
- `NEXTAUTH_SECRET` - Session encryption
- `NEXTAUTH_URL` - Auth callback URL
- `NEXT_PUBLIC_APP_URL` - Application URL

**Required for Production:**
- All development variables, plus:
- `RESEND_API_KEY` - Transactional emails
- Payment provider credentials (Stripe/Polar/Lemonsqueezy)

**Optional but Recommended:**
- OAuth provider credentials
- Analytics keys
- AI API keys

### GENERATING SECRETS

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Alternative using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate webhook secrets
openssl rand -hex 32
```

### ENVIRONMENT VALIDATION

Fabrk validates environment variables at build time using Zod. The validation schema is in `src/lib/env/index.ts`:

```typescript
// src/lib/env/index.ts
import { z } from 'zod';

const envSchema = z.object({
  // Required
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // Optional with defaults
  NEXT_PUBLIC_APP_NAME: z.string().default('Fabrk'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Conditional (required in production)
  RESEND_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

If validation fails, you'll see clear error messages:

```
Error: Environment validation failed

  DATABASE_URL: Invalid url
  NEXTAUTH_SECRET: String must contain at least 32 character(s)
  NEXTAUTH_URL: Required
```

---

## [ DATABASE INITIALIZATION ]

### PUSHING THE SCHEMA

Push the Prisma schema to your database:

```bash
npm run db:push
```

This command:
1. Compares your `prisma/schema.prisma` with the database
2. Creates or modifies tables to match the schema
3. Generates the Prisma Client for TypeScript

**Output Example:**

```
Environment variables loaded from .env.local
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "my_saas_dev", schema "public"

Your database is now in sync with your Prisma schema.

Running generate... Done

Generated Prisma Client to ./node_modules/@prisma/client
```

### UNDERSTANDING THE PRISMA SCHEMA

The default schema in `prisma/schema.prisma` includes:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// AUTHENTICATION MODELS
// ============================================================================

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // Hashed password for credentials auth
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  memberships   OrganizationMember[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ============================================================================
// ORGANIZATION MODELS
// ============================================================================

model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  members       OrganizationMember[]
  subscription  Subscription?
  invitations   Invitation[]
  apiKeys       ApiKey[]
}

model OrganizationMember {
  id             String       @id @default(cuid())
  role           MemberRole   @default(MEMBER)
  userId         String
  organizationId String
  createdAt      DateTime     @default(now())

  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@unique([userId, organizationId])
}

enum MemberRole {
  OWNER
  ADMIN
  MEMBER
}

model Invitation {
  id             String       @id @default(cuid())
  email          String
  role           MemberRole   @default(MEMBER)
  token          String       @unique
  expires        DateTime
  organizationId String
  invitedById    String?
  createdAt      DateTime     @default(now())

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@unique([email, organizationId])
}

// ============================================================================
// BILLING MODELS
// ============================================================================

model Subscription {
  id                   String             @id @default(cuid())
  organizationId       String             @unique
  status               SubscriptionStatus @default(TRIALING)
  plan                 String             @default("free")

  // Payment provider fields
  stripeCustomerId     String?            @unique
  stripeSubscriptionId String?            @unique
  stripePriceId        String?

  // Billing period
  currentPeriodStart   DateTime?
  currentPeriodEnd     DateTime?
  cancelAtPeriodEnd    Boolean            @default(false)

  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
}

enum SubscriptionStatus {
  TRIALING
  ACTIVE
  PAST_DUE
  CANCELED
  UNPAID
}

// ============================================================================
// API & DEVELOPER MODELS
// ============================================================================

model ApiKey {
  id             String    @id @default(cuid())
  name           String
  key            String    @unique
  lastUsedAt     DateTime?
  expiresAt      DateTime?
  organizationId String
  createdAt      DateTime  @default(now())

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
}
```

### VIEWING YOUR DATABASE

Open Prisma Studio to browse and edit data:

```bash
npm run db:studio
```

This opens a web interface at `http://localhost:5555` where you can:
- Browse all tables
- View and edit records
- Filter and search data
- Create new records

---

## [ SEEDING TEST DATA ]

### RUNNING THE SEED SCRIPT

Populate your database with test data:

```bash
npm run db:seed
```

### WHAT GETS CREATED

The seed script (`prisma/seed.ts`) creates:

**Test Users:**

| Email | Password | Role |
|-------|----------|------|
| test@example.com | password123 | Owner |
| admin@example.com | password123 | Admin |
| member@example.com | password123 | Member |

**Test Organizations:**
- Acme Corp (with 3 members)
- Startup Inc (with 1 member)

**Test Subscriptions:**
- Acme Corp: Pro plan (active)
- Startup Inc: Free plan (trialing)

**Test API Keys:**
- Test key for Acme Corp

### CUSTOMIZING SEEDS

Edit `prisma/seed.ts` to customize test data:

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('[ SEEDING DATABASE ]');

  // Create users
  const hashedPassword = await hash('password123', 12);

  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      emailVerified: new Date(),
    },
  });

  console.log('Created user:', testUser.email);

  // Create organization
  const org = await prisma.organization.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: {
      name: 'Acme Corp',
      slug: 'acme-corp',
    },
  });

  console.log('Created organization:', org.name);

  // Create membership
  await prisma.organizationMember.upsert({
    where: {
      userId_organizationId: {
        userId: testUser.id,
        organizationId: org.id,
      },
    },
    update: {},
    create: {
      userId: testUser.id,
      organizationId: org.id,
      role: 'OWNER',
    },
  });

  // Create subscription
  await prisma.subscription.upsert({
    where: { organizationId: org.id },
    update: {},
    create: {
      organizationId: org.id,
      status: 'ACTIVE',
      plan: 'pro',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('[ SEEDING COMPLETE ]');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### RESETTING THE DATABASE

To completely reset your database and reseed:

```bash
npm run db:reset
```

**Warning:** This drops all tables and recreates them. All data will be lost.

---

## [ STARTING DEVELOPMENT ]

### LAUNCHING THE DEV SERVER

Start the development server:

```bash
npm run dev
```

Your application is now running at `http://localhost:3000`.

### DEV SERVER FEATURES

**Hot Module Replacement (HMR):**
- React components update instantly without full page reload
- CSS changes apply immediately
- State is preserved during updates

**TypeScript Checking:**
- Real-time type errors in your terminal
- Errors also appear in VS Code if configured

**Fast Refresh:**
- Component-level updates
- Error recovery without losing state

**Automatic Port Resolution:**
- If port 3000 is in use, the script automatically kills the process
- This prevents "port already in use" errors

### WHAT YOU'LL SEE

Navigate through the application:

| URL | Description |
|-----|-------------|
| `/` | Landing page with terminal design |
| `/pricing` | Pricing comparison table |
| `/blog` | Blog listing page |
| `/login` | Sign in form |
| `/register` | Sign up form |
| `/dashboard` | Main dashboard (requires auth) |
| `/settings` | User settings (requires auth) |
| `/settings/organization` | Team management |
| `/settings/billing` | Subscription management |
| `/settings/api-keys` | API key management |

### DEVELOPMENT TIPS

**Turbopack (Experimental):**

Enable Turbopack for faster builds:

```bash
npm run dev -- --turbo
```

**Debug Mode:**

Enable verbose logging:

```bash
DEBUG=true npm run dev
```

**Watch for Database Changes:**

Run Prisma Studio alongside development:

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run db:studio
```

---

## [ PROJECT STRUCTURE WALKTHROUGH ]

Understanding the project structure is key to efficiently extending Fabrk.

### TOP-LEVEL STRUCTURE

```
my-saas/
├── src/                   # Source code
├── prisma/                # Database schema
├── public/                # Static assets
├── docs/                  # Documentation
├── tests/                 # Test files
├── scripts/               # Build scripts
├── outstatic/             # Blog CMS
├── mcp-servers/           # AI tool server
└── .ai/                   # AI context files
```

### THE src/ DIRECTORY

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages
│   ├── (platform)/        # Authenticated pages
│   ├── (auth)/            # Auth flow pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
│
├── components/            # React components
│   ├── ui/                # 60 UI primitives
│   ├── charts/            # 8 chart components
│   ├── auth/              # Authentication
│   ├── billing/           # Payments
│   ├── dashboard/         # Dashboard
│   ├── admin/             # Admin panel
│   ├── developer/         # API keys, webhooks
│   ├── organization/      # Team management
│   ├── notifications/     # Notifications
│   ├── onboarding/        # Onboarding flows
│   └── marketing/         # Landing pages
│
├── lib/                   # Business logic
│   ├── auth.ts            # NextAuth config
│   ├── prisma.ts          # Database client
│   ├── env/               # Environment validation
│   ├── utils.ts           # Utilities
│   └── ai/                # AI utilities
│
├── design-system/         # Theme system
│   └── index.ts           # mode object
│
├── config/                # Configuration
│   └── index.ts           # Central config
│
├── hooks/                 # Custom hooks
│   ├── use-auth.ts
│   ├── use-organization.ts
│   └── use-theme.ts
│
└── types/                 # TypeScript types
    ├── ai.ts
    └── index.ts
```

### DETAILED DIRECTORY BREAKDOWN

**`src/app/`** - Next.js App Router

The app directory contains all pages, layouts, and API routes using Next.js 16's App Router conventions:

```
app/
├── (public)/              # Route group for public pages
│   ├── page.tsx           # Landing page (/)
│   ├── pricing/
│   │   └── page.tsx       # Pricing page (/pricing)
│   ├── blog/
│   │   ├── page.tsx       # Blog listing (/blog)
│   │   └── [slug]/
│   │       └── page.tsx   # Blog post (/blog/[slug])
│   ├── changelog/
│   │   └── page.tsx       # Changelog (/changelog)
│   └── layout.tsx         # Public layout (header + footer)
│
├── (platform)/            # Route group for authenticated pages
│   ├── dashboard/
│   │   └── page.tsx       # Dashboard (/dashboard)
│   ├── settings/
│   │   ├── page.tsx       # Settings overview (/settings)
│   │   ├── profile/
│   │   │   └── page.tsx   # Profile settings
│   │   ├── organization/
│   │   │   └── page.tsx   # Organization settings
│   │   ├── billing/
│   │   │   └── page.tsx   # Billing settings
│   │   └── api-keys/
│   │       └── page.tsx   # API key management
│   └── layout.tsx         # Platform layout (sidebar + header)
│
├── (auth)/                # Route group for auth pages
│   ├── login/
│   │   └── page.tsx       # Login page (/login)
│   ├── register/
│   │   └── page.tsx       # Registration (/register)
│   ├── forgot-password/
│   │   └── page.tsx       # Password reset request
│   ├── reset-password/
│   │   └── page.tsx       # Password reset form
│   └── layout.tsx         # Centered auth layout
│
├── api/                   # API routes
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts   # NextAuth handler
│   ├── stripe/
│   │   ├── checkout/
│   │   │   └── route.ts   # Checkout session
│   │   └── webhook/
│   │       └── route.ts   # Stripe webhooks
│   ├── users/
│   │   └── route.ts       # User API
│   └── organizations/
│       └── route.ts       # Organization API
│
├── globals.css            # Global styles, themes, CSS variables
└── layout.tsx             # Root layout
```

---

**`src/components/`** - React Components

Components are organized by feature area:

```
components/
├── ui/                    # UI Primitives (60+ components)
│   ├── button.tsx         # Button variants
│   ├── card.tsx           # Card, CardHeader, CardContent
│   ├── input.tsx          # Form inputs
│   ├── select.tsx         # Select dropdown
│   ├── dialog.tsx         # Modal dialogs
│   ├── sheet.tsx          # Slide-out panels
│   ├── tabs.tsx           # Tab navigation
│   ├── table.tsx          # Data tables
│   ├── badge.tsx          # Status badges
│   ├── avatar.tsx         # User avatars
│   ├── dropdown-menu.tsx  # Dropdown menus
│   ├── command.tsx        # Command palette
│   ├── toast.tsx          # Toast notifications
│   └── ... (50+ more)
│
├── charts/                # Chart Components (8 total)
│   ├── bar-chart.tsx
│   ├── line-chart.tsx
│   ├── area-chart.tsx
│   ├── pie-chart.tsx
│   ├── donut-chart.tsx
│   ├── funnel-chart.tsx
│   ├── gauge.tsx
│   └── sparkline.tsx
│
├── auth/                  # Authentication
│   ├── sign-in-form.tsx
│   ├── sign-up-form.tsx
│   └── social-auth.tsx
│
├── billing/               # Payments & Subscriptions
│   ├── pricing-table.tsx
│   ├── subscription-card.tsx
│   └── payment-form.tsx
│
├── dashboard/             # Dashboard
│   ├── stats-card.tsx
│   ├── activity-feed.tsx
│   └── quick-actions.tsx
│
├── admin/                 # Admin Panel
│   ├── user-table.tsx
│   ├── metrics-grid.tsx
│   └── admin-nav.tsx
│
├── developer/             # Developer Tools
│   ├── api-key-list.tsx
│   ├── webhook-list.tsx
│   └── endpoint-docs.tsx
│
├── organization/          # Team Management
│   ├── member-list.tsx
│   ├── invite-form.tsx
│   └── role-selector.tsx
│
├── notifications/         # Notifications
│   ├── notification-center.tsx
│   └── notification-item.tsx
│
├── onboarding/            # Onboarding
│   ├── onboarding-wizard.tsx
│   └── onboarding-step.tsx
│
└── marketing/             # Marketing & Landing
    ├── hero-section.tsx
    ├── feature-grid.tsx
    ├── testimonial-card.tsx
    └── cta-section.tsx
```

---

**`src/lib/`** - Business Logic

The lib directory contains core functionality:

```
lib/
├── auth.ts                # NextAuth configuration
│                          # - Providers (credentials, OAuth)
│                          # - Session handling
│                          # - JWT tokens
│
├── prisma.ts              # Prisma client singleton
│                          # - Database connection
│                          # - Query logging (dev)
│
├── utils.ts               # Utility functions
│                          # - cn() for class merging
│                          # - formatDate()
│                          # - formatCurrency()
│
├── env/                   # Environment validation
│   └── index.ts           # Zod schema for env vars
│
├── ai/                    # AI utilities
│   ├── cost.ts            # Cost tracking
│   ├── validation.ts      # Code validation
│   └── testing.ts         # AI test utilities
│
├── payments/              # Payment utilities
│   ├── stripe.ts          # Stripe client
│   ├── polar.ts           # Polar client
│   └── lemonsqueezy.ts    # Lemonsqueezy client
│
└── email/                 # Email utilities
    ├── resend.ts          # Resend client
    └── templates/         # Email templates
```

---

## [ ROUTE GROUPS DEEP DIVE ]

Route groups are a powerful Next.js feature that Fabrk uses extensively.

### WHAT ARE ROUTE GROUPS?

Folders wrapped in parentheses create route groups:
- `(public)` - Groups routes without affecting URLs
- The folder name is excluded from the route path

```
(public)/pricing/page.tsx  → /pricing
(platform)/dashboard/page.tsx → /dashboard
```

### WHY USE ROUTE GROUPS?

**1. Shared Layouts:**

Each group has its own layout that wraps all pages:

```tsx
// src/app/(public)/layout.tsx
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <main>{children}</main>
      <MarketingFooter />
    </>
  );
}

// src/app/(platform)/layout.tsx
export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <PlatformHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
```

**2. Route Protection:**

Apply authentication at the layout level:

```tsx
// src/app/(platform)/layout.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      {/* Layout content */}
    </div>
  );
}
```

**3. Loading States:**

Each group can have its own loading UI:

```tsx
// src/app/(platform)/loading.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
```

### ADDING A NEW ROUTE GROUP

To add a new route group (e.g., admin):

```
src/app/
├── (admin)/               # New route group
│   ├── layout.tsx         # Admin layout
│   ├── loading.tsx        # Admin loading state
│   ├── admin/
│   │   └── page.tsx       # /admin
│   ├── admin/users/
│   │   └── page.tsx       # /admin/users
│   └── admin/settings/
│       └── page.tsx       # /admin/settings
```

```tsx
// src/app/(admin)/layout.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Check for admin role
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen bg-muted">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
```

---

## [ UNDERSTANDING THE DESIGN SYSTEM ]

Fabrk's design system ensures consistent, theme-aware styling across your application.

### THE MODE OBJECT

Import `mode` from `@/design-system` for all styling:

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Using mode for styling
<div className={cn(
  'border border-border bg-card p-4',
  mode.radius,
  mode.font
)}>
  Content
</div>
```

### MODE OBJECT PROPERTIES

```typescript
// src/design-system/index.ts
export const mode = {
  // Border radius (dynamic via CSS variable)
  radius: 'rounded-dynamic',

  // Font family
  font: 'font-mono',

  // Color tokens
  color: {
    bg: {
      primary: 'bg-background',
      secondary: 'bg-card',
      muted: 'bg-muted',
      accent: 'bg-primary',
    },
    text: {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      accent: 'text-primary',
    },
    border: {
      default: 'border-border',
      accent: 'border-primary',
    },
  },

  // Spacing (8-point grid)
  spacing: {
    xs: 'gap-1',   // 4px
    sm: 'gap-2',   // 8px
    md: 'gap-4',   // 16px
    lg: 'gap-6',   // 24px
    xl: 'gap-8',   // 32px
  },
};
```

### WHEN TO USE MODE.RADIUS

**Use mode.radius for:**
- Cards and panels
- Buttons
- Inputs
- Badges
- Any element with full borders

```tsx
// Correct
<Card className={cn('border border-border', mode.radius)}>

<Button className={cn(mode.radius, 'px-4 py-2')}>
```

**Don't use mode.radius for:**
- Elements with partial borders (border-t, border-b)
- Table cells
- Divider lines
- Switch components (always `rounded-full`)

```tsx
// Correct - partial border, no radius
<div className="border-b border-border py-2">

// Correct - switch is always pill-shaped
<Switch className="rounded-full">
```

### THEME COLORS

all 18 themes use the same semantic color tokens:

```css
/* Primary semantic tokens */
--background       /* Page background */
--foreground       /* Primary text */
--card             /* Card backgrounds */
--card-foreground  /* Card text */
--muted            /* Subtle backgrounds */
--muted-foreground /* Subtle text */
--primary          /* Brand/accent color */
--primary-foreground /* Text on primary */
--secondary        /* Secondary actions */
--border           /* Borders */
--ring             /* Focus rings */
--destructive      /* Error/danger states */
```

### USING COLORS IN CODE

```tsx
// Background colors
<div className="bg-background">    {/* Page background */}
<div className="bg-card">          {/* Card background */}
<div className="bg-muted">         {/* Subtle background */}
<div className="bg-primary">       {/* Accent background */}

// Text colors
<p className="text-foreground">    {/* Primary text */}
<p className="text-muted-foreground"> {/* Secondary text */}
<p className="text-primary">       {/* Accent text */}
<p className="text-destructive">   {/* Error text */}

// Border colors
<div className="border border-border">    {/* Default border */}
<div className="border border-primary">   {/* Accent border */}

// NEVER use hardcoded colors
<div className="bg-green-500">     {/* BAD - breaks themes */}
<div className="text-gray-600">    {/* BAD - breaks themes */}
```

---

## [ COMPONENT LIBRARY TOUR ]

Fabrk includes 60+ UI components and 8 chart components, all designed with the terminal aesthetic.

### UI COMPONENTS OVERVIEW

**Form Components:**

```tsx
import { Input } from '@/components/ui/input';
import { InputSearch } from '@/components/ui/input-search';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

// Example usage
<Input placeholder="Enter email..." />
<InputSearch placeholder="Search..." />
<Textarea rows={4} />
<Select>
  <SelectTrigger>Select option</SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
<Checkbox label="Accept terms" />
<Switch />
```

**Layout Components:**

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Card example
<Card className={cn('border border-border', mode.radius)}>
  <CardHeader>
    <span className="text-xs text-muted-foreground">[ SYSTEM ]</span>
    <CardTitle>DASHBOARD</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>> SAVE</Button>
  </CardFooter>
</Card>
```

**Feedback Components:**

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

// Alert example
<Alert variant="destructive">
  <AlertTitle>ERROR</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>

// Badge examples
<Badge variant="default">ACTIVE</Badge>
<Badge variant="secondary">PENDING</Badge>
<Badge variant="destructive">ERROR</Badge>
<Badge variant="outline">DRAFT</Badge>
```

**Navigation Components:**

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';

// Dropdown example
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">OPTIONS</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### CHART COMPONENTS

```tsx
import { BarChart } from '@/components/charts/bar-chart';
import { LineChart } from '@/components/charts/line-chart';
import { AreaChart } from '@/components/charts/area-chart';
import { DonutChart } from '@/components/charts/donut-chart';
import { Sparkline } from '@/components/charts/sparkline';

// Bar chart example
const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
];

<BarChart
  data={data}
  xKey="name"
  yKey="value"
  className="h-64"
/>

// Sparkline for inline metrics
<Sparkline data={[10, 20, 15, 30, 25]} className="w-24 h-8" />
```

---

## [ ADDING YOUR FIRST FEATURE ]

Let's build a complete "Projects" feature to understand Fabrk's patterns.

### STEP 1: DATABASE MODEL

Add the model to `prisma/schema.prisma`:

```prisma
model Project {
  id             String        @id @default(cuid())
  name           String
  description    String?
  status         ProjectStatus @default(ACTIVE)
  organizationId String
  createdById    String
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  createdBy    User         @relation(fields: [createdById], references: [id])
  tasks        Task[]

  @@index([organizationId])
  @@index([createdById])
}

model Task {
  id          String     @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  dueDate     DateTime?
  projectId   String
  assigneeId  String?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  project  Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  assignee User?   @relation(fields: [assigneeId], references: [id])

  @@index([projectId])
  @@index([assigneeId])
}

enum ProjectStatus {
  ACTIVE
  ARCHIVED
  COMPLETED
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  IN_REVIEW
  DONE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

Push the schema changes:

```bash
npm run db:push
```

### STEP 2: API ROUTES

Create the projects API:

```typescript
// src/app/api/projects/route.ts
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
});

// GET /api/projects - List all projects
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const projects = await prisma.project.findMany({
      where: { organizationId: session.user.organizationId },
      include: {
        createdBy: {
          select: { name: true, image: true },
        },
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('[ API ] Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const result = createProjectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.issues },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        organizationId: session.user.organizationId,
        createdById: session.user.id,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('[ API ] Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
```

Create the single project route:

```typescript
// src/app/api/projects/[id]/route.ts
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  status: z.enum(['ACTIVE', 'ARCHIVED', 'COMPLETED']).optional(),
});

// GET /api/projects/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: params.id,
        organizationId: session.user.organizationId,
      },
      include: {
        tasks: {
          orderBy: { createdAt: 'desc' },
        },
        createdBy: {
          select: { name: true, image: true },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('[ API ] Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const result = updateProjectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.issues },
        { status: 400 }
      );
    }

    const project = await prisma.project.updateMany({
      where: {
        id: params.id,
        organizationId: session.user.organizationId,
      },
      data: result.data,
    });

    if (project.count === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const updated = await prisma.project.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json({ project: updated });
  } catch (error) {
    console.error('[ API ] Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await prisma.project.deleteMany({
      where: {
        id: params.id,
        organizationId: session.user.organizationId,
      },
    });

    if (project.count === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ API ] Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
```

### STEP 3: PAGE COMPONENTS

Create the projects list page:

```tsx
// src/app/(platform)/projects/page.tsx
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Plus, Folder, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const statusColors = {
  ACTIVE: 'default',
  ARCHIVED: 'secondary',
  COMPLETED: 'outline',
} as const;

export default async function ProjectsPage() {
  const session = await auth();
  if (!session) redirect('/login');

  const projects = await prisma.project.findMany({
    where: { organizationId: session.user.organizationId },
    include: {
      _count: { select: { tasks: true } },
      createdBy: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl font-semibold">PROJECTS</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your team projects and tasks
          </p>
        </div>
        <Link href="/projects/new">
          <Button className={cn(mode.radius)}>
            <Plus className="mr-2 h-4 w-4" />
            > NEW PROJECT
          </Button>
        </Link>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card className={cn('border border-dashed border-border', mode.radius)}>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Folder className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-mono text-lg font-medium">NO PROJECTS YET</h3>
            <p className="text-muted-foreground text-sm mt-2 mb-4">
              Create your first project to get started
            </p>
            <Link href="/projects/new">
              <Button variant="outline" className={cn(mode.radius)}>
                > CREATE PROJECT
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={cn('border border-border hover:border-primary/50 transition-colors', mode.radius)}
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-mono">
                    [ PROJECT ]
                  </span>
                  <Link
                    href={`/projects/${project.id}`}
                    className="block hover:text-primary transition-colors"
                  >
                    <h3 className="font-mono font-medium">{project.name}</h3>
                  </Link>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/projects/${project.id}`}>View</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/projects/${project.id}/settings`}>Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                {project.description && (
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs">
                  <Badge variant={statusColors[project.status]}>
                    {project.status}
                  </Badge>
                  <span className="text-muted-foreground">
                    {project._count.tasks} tasks
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

Create the new project form:

```tsx
// src/app/(platform)/projects/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create project');
      }

      const { project } = await res.json();
      router.push(`/projects/${project.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>

      <Card className={cn('border border-border', mode.radius)}>
        <CardHeader>
          <span className="text-xs text-muted-foreground font-mono">
            [ NEW PROJECT ]
          </span>
          <CardTitle className="font-mono">CREATE PROJECT</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className={cn(
                'p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20',
                mode.radius
              )}>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Project Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Enter project name..."
                required
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your project..."
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                Optional. Max 500 characters.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Link href="/projects">
                <Button type="button" variant="outline" className={cn(mode.radius)}>
                  CANCEL
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className={cn(mode.radius)}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                > CREATE PROJECT
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## [ AUTHENTICATION SETUP ]

### CONFIGURING OAUTH PROVIDERS

**GitHub OAuth:**

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret

```bash
# .env.local
AUTH_GITHUB_ID="your_client_id"
AUTH_GITHUB_SECRET="your_client_secret"
```

**Google OAuth:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing
3. Navigate to "Credentials" → "Create Credentials" → "OAuth Client ID"
4. Configure consent screen if prompted
5. Select "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
7. Copy Client ID and Client Secret

```bash
# .env.local
AUTH_GOOGLE_ID="your_client_id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your_client_secret"
```

**Auth Configuration in Code:**

```typescript
// src/lib/auth.ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import { compare } from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    // GitHub OAuth
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),

    // Google OAuth
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    // Email/Password
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;

        // Get organization membership
        const membership = await prisma.organizationMember.findFirst({
          where: { userId: token.id as string },
          include: { organization: true },
        });

        if (membership) {
          session.user.organizationId = membership.organizationId;
          session.user.organizationName = membership.organization.name;
          session.user.role = membership.role;
        }
      }
      return session;
    },
  },
});
```

---

## [ EMAIL SETUP ]

### CONFIGURING RESEND

1. Create account at [resend.com](https://resend.com)
2. Add and verify your domain (or use their test domain)
3. Create an API key

```bash
# .env.local
RESEND_API_KEY="re_xxxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"
```

**Email Client Setup:**

```typescript
// src/lib/email/resend.ts
import { Resend } from 'resend';
import { env } from '@/lib/env';

export const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('[ EMAIL ] Failed to send:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('[ EMAIL ] Error:', error);
    throw error;
  }
}

// Email templates
export const templates = {
  welcome: (name: string) => ({
    subject: 'Welcome to My SaaS',
    html: `
      <div style="font-family: monospace; padding: 20px;">
        <h1 style="color: #10b981;">WELCOME</h1>
        <p>Hi ${name},</p>
        <p>Thanks for signing up! Your account is ready.</p>
        <a href="${env.NEXT_PUBLIC_APP_URL}/dashboard" style="
          display: inline-block;
          padding: 12px 24px;
          background: #10b981;
          color: white;
          text-decoration: none;
          font-family: monospace;
        ">> ACCESS DASHBOARD</a>
      </div>
    `,
  }),

  passwordReset: (resetUrl: string) => ({
    subject: 'Reset Your Password',
    html: `
      <div style="font-family: monospace; padding: 20px;">
        <h1>PASSWORD RESET</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="
          display: inline-block;
          padding: 12px 24px;
          background: #10b981;
          color: white;
          text-decoration: none;
        ">> RESET PASSWORD</a>
        <p style="color: #666; margin-top: 20px;">
          This link expires in 1 hour.
        </p>
      </div>
    `,
  }),
};
```

---

## [ PAYMENT INTEGRATION ]

Fabrk supports three payment providers with identical patterns.

### STRIPE SETUP

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard → Developers → API keys
3. Create products and prices in Dashboard → Products

```bash
# .env.local
STRIPE_SECRET_KEY="sk_test_xxxxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"

# Price IDs from your Stripe dashboard
STRIPE_PRICE_ID_STARTER="price_xxxxx"
STRIPE_PRICE_ID_PRO="price_xxxxx"
STRIPE_PRICE_ID_ENTERPRISE="price_xxxxx"
```

**Testing Webhooks Locally:**

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/stripe/webhook

# This will output a webhook signing secret - add it to .env.local
```

### POLAR SETUP (ALTERNATIVE)

```bash
# .env.local
POLAR_ACCESS_TOKEN="xxxxx"
POLAR_ORGANIZATION_ID="xxxxx"
POLAR_WEBHOOK_SECRET="xxxxx"
```

### LEMONSQUEEZY SETUP (ALTERNATIVE)

```bash
# .env.local
LEMONSQUEEZY_API_KEY="xxxxx"
LEMONSQUEEZY_STORE_ID="xxxxx"
LEMONSQUEEZY_WEBHOOK_SECRET="xxxxx"
```

---

## [ THEME CUSTOMIZATION ]

### AVAILABLE THEMES

Fabrk includes 18 terminal-inspired themes:

| Theme | Description |
|-------|-------------|
| phosphor-green | Classic green terminal |
| amber-crt | Warm amber CRT monitor |
| matrix-rain | Matrix-style green |
| cyberpunk-neon | Pink/cyan neon |
| retrowave | Purple/pink synthwave |
| ocean-depth | Deep blue/teal |
| forest-terminal | Natural greens |
| sunset-glow | Warm orange/yellow |
| arctic-frost | Cool blue/white |
| volcanic | Dark red/orange |
| midnight-purple | Deep purple |
| solar-flare | Bright yellow |
| quantum-blue | Electric blue |
| neon-mint | Bright mint green |
| rose-quartz | Soft pink |
| obsidian | Dark gray |
| copper-oxide | Copper/teal patina |
| aurora | Northern lights colors |

### SWITCHING THEMES

Themes are controlled via a CSS class on the `<html>` element:

```tsx
// Theme switcher component
'use client';

import { useTheme } from 'next-themes';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

const themes = [
  { value: 'phosphor-green', label: 'Phosphor Green' },
  { value: 'amber-crt', label: 'Amber CRT' },
  { value: 'matrix-rain', label: 'Matrix Rain' },
  // ... more themes
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-48">
        {themes.find(t => t.value === theme)?.label || 'Select theme'}
      </SelectTrigger>
      <SelectContent>
        {themes.map((t) => (
          <SelectItem key={t.value} value={t.value}>
            {t.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

### CREATING CUSTOM THEMES

Add custom themes to `src/app/globals.css`:

```css
/* Custom theme */
.my-custom-theme {
  /* Light mode colors */
  --background: oklch(98% 0.01 250);
  --foreground: oklch(20% 0.02 250);
  --card: oklch(100% 0 0);
  --card-foreground: oklch(20% 0.02 250);
  --muted: oklch(95% 0.01 250);
  --muted-foreground: oklch(50% 0.02 250);
  --primary: oklch(55% 0.25 280);
  --primary-foreground: oklch(98% 0.01 280);
  --secondary: oklch(90% 0.02 250);
  --secondary-foreground: oklch(30% 0.02 250);
  --border: oklch(85% 0.02 250);
  --ring: oklch(55% 0.25 280);
  --destructive: oklch(55% 0.25 25);
  --destructive-foreground: oklch(98% 0.01 25);

  /* Border radius */
  --radius: 0.25rem;
}

/* Dark mode variant */
.dark .my-custom-theme,
.my-custom-theme.dark {
  --background: oklch(15% 0.02 250);
  --foreground: oklch(95% 0.01 250);
  /* ... dark mode colors */
}
```

---

## [ COMMON COMMANDS REFERENCE ]

### DEVELOPMENT COMMANDS

```bash
# Start development server
npm run dev
# Starts Next.js dev server on port 3000
# Auto-kills existing process on port 3000
# Enables hot module replacement

# Production build
npm run build
# Runs prisma generate first
# Creates optimized production build in .next/
# Validates TypeScript and linting

# Start production server
npm run start
# Serves the production build
# Must run npm run build first

# TypeScript checking
npm run type-check
# Runs tsc --noEmit
# Validates all TypeScript files
# Does not produce output files
```

### DATABASE COMMANDS

```bash
# Push schema to database
npm run db:push
# Syncs prisma/schema.prisma with database
# Creates/modifies tables as needed
# Generates Prisma client

# Open Prisma Studio
npm run db:studio
# Opens web interface at localhost:5555
# Browse and edit database records

# Seed database
npm run db:seed
# Runs prisma/seed.ts
# Creates test data

# Reset database
npm run db:reset
# DESTRUCTIVE: Drops all tables
# Recreates schema from scratch
# Runs seed script

# Generate Prisma client
npx prisma generate
# Regenerates @prisma/client
# Run after schema changes
```

### CODE QUALITY COMMANDS

```bash
# Run ESLint
npm run lint
# Checks all files for linting errors
# Uses flat config (eslint.config.mjs)

# Fix lint errors
npm run lint -- --fix
# Auto-fixes fixable issues

# Format with Prettier
npm run format
# Formats all files
# Uses prettier.config.mjs

# Check formatting
npm run format -- --check
# Reports unformatted files
# Does not modify files

# Design system lint
npm run design:lint
# Checks for design system violations
# Reports hardcoded colors, wrong components

# Full validation
npm run validate
# Runs type-check, lint, and format check
```

### TESTING COMMANDS

```bash
# Run unit tests
npm test
# Runs Vitest
# Watch mode by default

# Run unit tests once
npm test -- --run
# Single run, no watch

# Run with coverage
npm test -- --coverage
# Generates coverage report

# Run E2E tests
npm run test:e2e
# Runs Playwright tests
# Requires build first

# Run accessibility tests
npm run test:a11y
# Checks for WCAG violations
```

### AI DEVELOPMENT COMMANDS

```bash
# Validate AI-generated code
npm run ai:validate
# Checks for security issues
# Validates design system compliance
# Reports TypeScript errors

# AI-specific linting
npm run ai:lint
# Checks AI patterns
# Validates cost tracking usage

# Security scan
npm run ai:security
# Scans for vulnerabilities
# Checks for exposed secrets

# Cost report
npm run ai:cost-report
# Generates AI API usage report
# Shows cost breakdown by feature

# Pre-deploy checks
npm run ai:pre-deploy
# Runs all validation
# Must pass before deployment
```

---

## [ TROUBLESHOOTING GUIDE ]

### PORT 3000 ALREADY IN USE

Fabrk's dev script auto-kills processes on port 3000. If it still fails:

```bash
# Find process on port 3000
lsof -i :3000

# Kill specific process
kill -9 <PID>

# Or kill all Node processes (careful!)
killall node
```

### PRISMA CLIENT OUT OF SYNC

If you see type errors after schema changes:

```bash
# Regenerate client
npx prisma generate

# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Full rebuild
rm -rf node_modules/.prisma
npm run db:push
```

### DATABASE CONNECTION FAILED

**Local PostgreSQL:**

```bash
# Check if PostgreSQL is running
pg_isready

# Start PostgreSQL (macOS)
brew services start postgresql@15

# Check connection
psql -d my_saas_dev -c "SELECT 1"
```

**Docker PostgreSQL:**

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs db

# Restart container
docker-compose restart db
```

**Cloud Database:**

- Verify connection string includes `?sslmode=require`
- Check if IP is allowlisted (if applicable)
- Verify credentials are correct

### BUILD FAILS WITH MODULE ERRORS

```bash
# Clear all caches
rm -rf .next node_modules/.cache

# Rebuild
npm run build

# If still failing, full reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TYPESCRIPT ERRORS AFTER PULLING CHANGES

```bash
# Full type regeneration
npx prisma generate
npm run type-check

# If using VS Code, restart TS server
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### AUTHENTICATION NOT WORKING

1. Verify `NEXTAUTH_SECRET` is at least 32 characters
2. Check `NEXTAUTH_URL` matches your dev URL exactly
3. For OAuth, verify callback URLs in provider dashboard
4. Check browser console for specific errors

```bash
# Generate new secret
openssl rand -base64 32
```

### PAYMENTS NOT PROCESSING

**Stripe:**

1. Verify you're using test keys in development
2. Check webhook is forwarding: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
3. Verify webhook secret matches

**Test Cards:**

| Card Number | Result |
|-------------|--------|
| 4242424242424242 | Success |
| 4000000000000002 | Declined |
| 4000000000009995 | Insufficient funds |

### EMAILS NOT SENDING

1. Verify `RESEND_API_KEY` is correct
2. Check sender email is verified in Resend
3. Test with Resend's test address: `test@resend.dev`

```bash
# Test email sending
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"from":"onboarding@resend.dev","to":"your@email.com","subject":"Test","html":"<p>Test</p>"}'
```

### SLOW DEVELOPMENT SERVER

```bash
# Try Turbopack (experimental)
npm run dev -- --turbo

# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run dev

# Check for circular dependencies
npx madge --circular src/
```

---

## [ DEVELOPMENT WORKFLOW ]

### GIT HOOKS (HUSKY)

Fabrk uses Husky for Git hooks. On commit:

1. **Type checking** - `npm run type-check`
2. **Lint-staged** - ESLint + Prettier on staged files

```bash
# If hooks aren't running
npx husky install

# Skip hooks (emergency only)
git commit --no-verify -m "message"
```

### RECOMMENDED WORKFLOW

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes

# 3. Stage specific files
git add src/app/api/projects/route.ts
git add src/app/(platform)/projects/page.tsx

# 4. Commit (hooks run automatically)
git commit -m "Add projects feature"

# 5. Push and create PR
git push -u origin feature/my-feature
gh pr create
```

### CODE REVIEW CHECKLIST

Before submitting PRs:

- [ ] TypeScript passes: `npm run type-check`
- [ ] Linting passes: `npm run lint`
- [ ] Design system compliant: `npm run design:lint`
- [ ] Tests pass: `npm test`
- [ ] No hardcoded colors or values
- [ ] Uses existing components
- [ ] API routes have auth checks
- [ ] Forms have validation

---

## [ NEXT STEPS ]

Now that you have Fabrk running, here's your roadmap:

### WEEK 1: FOUNDATION

- [ ] Configure OAuth providers (GitHub, Google)
- [ ] Set up Resend for transactional emails
- [ ] Choose and configure payment provider
- [ ] Customize landing page content
- [ ] Update branding (logo, favicon, colors)

### WEEK 2: CORE FEATURES

- [ ] Add your first database models
- [ ] Create API routes for your features
- [ ] Build dashboard components
- [ ] Implement user onboarding flow
- [ ] Add notification system

### WEEK 3: POLISH

- [ ] Add loading states and skeletons
- [ ] Implement error boundaries
- [ ] Add analytics (Vercel Analytics, PostHog)
- [ ] Write unit tests for critical paths
- [ ] Run E2E tests

### WEEK 4: LAUNCH

- [ ] Configure production environment variables
- [ ] Set up production database (Vercel Postgres, Supabase)
- [ ] Configure Stripe production keys
- [ ] Deploy to Vercel
- [ ] Set up monitoring and alerts

### RESOURCES

- **Documentation**: Check the `docs/` directory for detailed guides
- **AI Context**: Copy `.ai/CONTEXT.md` into AI conversations
- **Component Reference**: Browse `src/components/ui/` for available components
- **Design System**: See `docs/08-design/DESIGN_SYSTEM.md` for styling rules

---

## [ GETTING HELP ]

If you run into issues:

1. Check the [troubleshooting section](#troubleshooting-guide) above
2. Search existing [GitHub Issues](https://github.com/fabrk/fabrk-dev/issues)
3. Review the [documentation](https://fabrk.dev/docs)
4. Join the community Discord

---

Welcome to Fabrk. Build something great.
