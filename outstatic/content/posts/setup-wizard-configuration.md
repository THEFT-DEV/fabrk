---
title: 'The Setup Wizard: Configure Your SaaS in Minutes'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'setup-wizard-configuration'
description: 'Fabrk''s interactive setup wizard configures database, payments, email, and themes through a guided terminal interface.'
publishedAt: '2026-01-21T10:00:00.000Z'
---

**From clone to configured in minutes.**

Fabrk's interactive setup wizard eliminates the tedious process of manually configuring your SaaS boilerplate. Instead of hunting through documentation, copying example files, and hoping you didn't miss anything critical, the wizard walks you through every configuration step with real-time validation and helpful guidance.

---

## Table of Contents

1. [Why a Setup Wizard?](#why-a-setup-wizard)
2. [Running the Wizard](#running-the-wizard)
3. [Template Selection](#template-selection)
4. [Database Configuration](#database-configuration)
5. [Payment Provider Setup](#payment-provider-setup)
6. [Email Configuration](#email-configuration)
7. [Analytics Integration](#analytics-integration)
8. [AI Provider Setup](#ai-provider-setup)
9. [Search Configuration](#search-configuration)
10. [File Storage Setup](#file-storage-setup)
11. [Theme Selection](#theme-selection)
12. [Landing Page Generation](#landing-page-generation)
13. [Environment Variable Validation](#environment-variable-validation)
14. [Command-Line Options](#command-line-options)
15. [Generated Files](#generated-files)
16. [Post-Setup Commands](#post-setup-commands)
17. [Troubleshooting](#troubleshooting)
18. [Best Practices](#best-practices)
19. [Advanced Configuration](#advanced-configuration)
20. [Security Considerations](#security-considerations)

---

## Why a Setup Wizard?

Configuring a new SaaS project typically means:

- Reading through extensive documentation
- Finding and copying example configuration files
- Manually editing multiple config files
- Searching for the correct API key formats
- Hoping you didn't miss any critical settings
- Debugging cryptic startup errors

Fabrk's setup wizard handles all of this interactively with:

- **Guided Configuration**: Step-by-step prompts for each integration
- **Real-Time Validation**: Instant feedback on API key formats
- **Template Selection**: Pre-configured stacks for common use cases
- **Dry Run Mode**: Preview changes before applying them
- **Automatic Secret Generation**: Secure defaults for auth tokens
- **Post-Setup Automation**: Database migration and dev server startup

---

## Running the Wizard

Launch the setup wizard with a single command:

```bash
npm run setup
```

The wizard presents a terminal-based interface with tab navigation:

```
  ███████╗ █████╗ ██████╗ ██████╗ ██╗  ██╗
  ██╔════╝██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝
  █████╗  ███████║██████╔╝██████╔╝█████╔╝   SETUP WIZARD
  ██╔══╝  ██╔══██║██╔══██╗██╔══██╗██╔═██╗   v1.0
  ██║     ██║  ██║██████╔╝██║  ██║██║  ██╗
  ╚═╝     ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝

  Template  DATABASE  PAYMENTS  EMAIL  Review  Complete    (Tab to cycle)
──────────────────────────────────────────────────────────────────────────
```

### Navigation Controls

| Key | Action |
|-----|--------|
| `Arrow Up/Down` | Navigate options |
| `Enter` | Confirm selection |
| `Tab` | Next section |
| `Shift+Tab` | Previous section |
| `Ctrl+C` | Exit wizard |
| `1-9` | Quick select option |

---

## Template Selection

The wizard starts by asking what you're building. Each template comes pre-configured with appropriate integrations:

```
╔══════════════════════════════════════════════════════════════════════╗
║                             TEMPLATE                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║> What are you building?                                               ║
║                                                                       ║
║● 1. STARTER  1-2 min · 1 keys                                        ║
║     PostgreSQL + NextAuth                                             ║
║     → demos, prototypes                                               ║
║                                                                       ║
║  2. SAAS ★  4-5 min · 3 keys                                         ║
║     PostgreSQL + Stripe + Resend                                      ║
║     → subscription apps                                               ║
║                                                                       ║
║  3. AI APP  5-6 min · 4 keys                                         ║
║     SaaS + OpenAI                                                     ║
║     → AI wrappers, chat                                               ║
║                                                                       ║
║  4. MARKETPLACE  6-7 min · 5 keys                                    ║
║     SaaS + Algolia + S3                                               ║
║     → platforms                                                       ║
║                                                                       ║
║  5. CUSTOM  varies · ? keys                                          ║
║     Mix and match                                                     ║
║     → pick each feature                                               ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Template Configurations

#### STARTER Template

Best for demos, prototypes, and learning projects.

**Includes:**
- PostgreSQL database
- NextAuth authentication
- Basic session management

**Required Keys:** 1 (DATABASE_URL)

**Configuration Categories:**
```javascript
{
  categories: ['DATABASE'],
  defaults: {
    DATABASE: 'postgres'
  }
}
```

#### SAAS Template (Recommended)

The most common choice for subscription-based applications.

**Includes:**
- PostgreSQL database
- Stripe payment processing
- Resend transactional email
- Optional analytics and search

**Required Keys:** 3+ (DATABASE_URL, STRIPE_SECRET_KEY, RESEND_API_KEY)

**Configuration Categories:**
```javascript
{
  categories: ['DATABASE', 'PAYMENTS', 'EMAIL', 'NEWSLETTER', 'ANALYTICS', 'SEARCH', 'STORAGE'],
  defaults: {
    DATABASE: 'postgres',
    PAYMENTS: 'stripe',
    EMAIL: 'resend',
    NEWSLETTER: 'none-newsletter',
    ANALYTICS: 'posthog',
    SEARCH: 'none-search',
    STORAGE: 'none-storage'
  }
}
```

#### AI APP Template

Perfect for AI wrappers, chatbots, and AI-enhanced applications.

**Includes:**
- Everything in SAAS template
- OpenAI API integration
- AI cost tracking utilities
- Rate limiting for AI endpoints

**Required Keys:** 4+ (DATABASE_URL, STRIPE_SECRET_KEY, RESEND_API_KEY, OPENAI_API_KEY)

**Configuration Categories:**
```javascript
{
  categories: ['DATABASE', 'PAYMENTS', 'EMAIL', 'NEWSLETTER', 'ANALYTICS', 'AI', 'SEARCH', 'STORAGE'],
  defaults: {
    DATABASE: 'postgres',
    PAYMENTS: 'stripe',
    EMAIL: 'resend',
    NEWSLETTER: 'none-newsletter',
    ANALYTICS: 'posthog',
    AI: 'openai',
    SEARCH: 'none-search',
    STORAGE: 'none-storage'
  }
}
```

#### MARKETPLACE Template

Designed for platforms with search and file uploads.

**Includes:**
- Everything in SAAS template
- Algolia search integration
- Cloudflare R2 file storage
- Advanced filtering capabilities

**Required Keys:** 5+ (DATABASE_URL, STRIPE_SECRET_KEY, RESEND_API_KEY, ALGOLIA_APP_ID, R2_ACCESS_KEY_ID)

**Configuration Categories:**
```javascript
{
  categories: ['DATABASE', 'PAYMENTS', 'EMAIL', 'NEWSLETTER', 'ANALYTICS', 'SEARCH', 'STORAGE'],
  defaults: {
    DATABASE: 'postgres',
    PAYMENTS: 'stripe',
    EMAIL: 'resend',
    NEWSLETTER: 'none-newsletter',
    ANALYTICS: 'posthog',
    SEARCH: 'algolia',
    STORAGE: 'r2'
  }
}
```

#### CUSTOM Template

Full control over every integration choice.

**Includes:**
- All category options available
- No pre-selected defaults
- Maximum flexibility

---

## Database Configuration

The wizard supports multiple database providers:

```
╔══════════════════════════════════════════════════════════════════════╗
║                             DATABASE                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║> Where your data lives                                                ║
║                                                                       ║
║  ● PostgreSQL ★ REC  (1 key)                                         ║
║      Supabase, Neon, Vercel Postgres                                  ║
║                                                                       ║
║  ○ MySQL  (1 key)                                                    ║
║      PlanetScale, traditional hosting                                 ║
║                                                                       ║
║  ○ MongoDB  (1 key)                                                  ║
║      Document database, Atlas                                         ║
║                                                                       ║
║  ○ SQLite  (0 keys)                                                  ║
║      Local file, zero config                                          ║
║                                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

### PostgreSQL Connection Strings

After selecting PostgreSQL, you'll be prompted for your connection string:

```
╔══════════════════════════════════════════════════════════════════════╗
║                          DATABASE KEYS                                ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║PostgreSQL selected                                                    ║
║                                                                       ║
║  ✓  DATABASE_URL                                                      ║
║                                                                       ║
║──────────────────────────────────────────────────────────────────────║
║                                                                       ║
║FORMAT:  postgresql://user:pass@host:5432/db                           ║
║WHERE:   supabase.com / neon.tech / vercel.com/storage                 ║
║                                                                       ║
║Leave blank to skip · Enter to continue                                ║
║                                                                       ║
║> postgresql://user:password@localhost:5432/myapp█                     ║
║                                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Database Provider Options

#### Supabase

```bash
# Format
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"

# Example
DATABASE_URL="postgresql://postgres.abcdefghijk:MySecurePassword123@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Setup Steps:**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy the connection string (use "Transaction" pooler for serverless)

#### Neon

```bash
# Format
DATABASE_URL="postgresql://[user]:[password]@[endpoint]-pooler.neon.tech/[database]?sslmode=require"

# Example
DATABASE_URL="postgresql://myuser:MyPassword123@ep-cool-darkness-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

**Setup Steps:**
1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string from dashboard
4. Use pooled connection for better performance

#### Vercel Postgres

```bash
# Format
DATABASE_URL="postgres://default:[password]@[endpoint].postgres.vercel-storage.com:5432/verceldb"

# Example
DATABASE_URL="postgres://default:AbCdEf123456@ep-quiet-snow-123456.us-east-1.postgres.vercel-storage.com:5432/verceldb"
```

**Setup Steps:**
1. Go to Vercel Dashboard > Storage
2. Create new Postgres database
3. Copy connection string from .env.local tab
4. Environment variables auto-populate in Vercel projects

#### Local PostgreSQL

```bash
# Default local connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fabrk"

# With custom credentials
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase"
```

**Setup with Docker:**
```bash
# Start PostgreSQL container
docker run --name fabrk-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=fabrk \
  -p 5432:5432 \
  -d postgres:15

# Verify connection
psql postgresql://postgres:postgres@localhost:5432/fabrk
```

### Connection String Validation

The wizard validates database URLs in real-time:

```
? Database URL: invalid-url

✗ Invalid PostgreSQL connection string
  Expected format: postgresql://user:pass@host:port/database

? Database URL: postgresql://user:pass@localhost:5432/db

✓ Valid connection string
Testing connection...
✓ Database connection successful
```

**Validation Rules:**
- Must start with `postgres://` or `postgresql://`
- Must include user and password
- Must specify host and port
- Must include database name
- SSL parameters are optional but recommended for production

---

## Payment Provider Setup

Fabrk supports multiple payment processors with identical integration patterns:

```
╔══════════════════════════════════════════════════════════════════════╗
║                            PAYMENTS                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║> Accept money from customers                                          ║
║                                                                       ║
║  ● Stripe ★ REC  (3 keys)                                            ║
║      Cards, subscriptions, invoices                                   ║
║                                                                       ║
║  ○ Lemonsqueezy  (2 keys)                                            ║
║      Digital products, EU/tax handled                                 ║
║                                                                       ║
║  ○ Paddle  (2 keys)                                                  ║
║      Merchant of record, global                                       ║
║                                                                       ║
║  ○ Polar.sh  (1 key)                                                 ║
║      Open source monetization                                         ║
║                                                                       ║
║  ○ PayPal  (2 keys)                                                  ║
║      Global reach, trusted                                            ║
║                                                                       ║
║  ○ None  (0 keys)                                                    ║
║      Skip payments                                                    ║
║                                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Stripe Configuration

Stripe is the recommended payment provider for most SaaS applications.

**Required Keys:**

```bash
# Secret key - server-side only
STRIPE_SECRET_KEY="sk_test_..."

# Webhook secret - for verifying webhook signatures
STRIPE_WEBHOOK_SECRET="whsec_..."

# Publishable key - safe for client-side
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

**Key Format Validation:**
- Secret keys must start with `sk_test_` (test) or `sk_live_` (production)
- Publishable keys must start with `pk_test_` or `pk_live_`
- Webhook secrets must start with `whsec_`

**Setup Steps:**

1. **Create Stripe Account:**
   - Sign up at [dashboard.stripe.com](https://dashboard.stripe.com)
   - Complete account verification for production

2. **Get API Keys:**
   - Navigate to Developers > API keys
   - Copy Secret key and Publishable key
   - Use test keys for development

3. **Configure Webhooks:**
   ```
   Endpoint URL: https://your-domain.com/api/stripe/webhook

   Events to listen for:
   - checkout.session.completed
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.paid
   - invoice.payment_failed
   ```

4. **Set Up Products and Prices:**
   ```bash
   # Use lookup keys for easier management
   NEXT_PUBLIC_STRIPE_PRICE_FABRK="fabrk_purchase"
   NEXT_PUBLIC_STRIPE_PRICE_STARTER="starter_monthly"
   NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="professional_monthly"
   NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE="enterprise_monthly"
   ```

### Lemonsqueezy Configuration

Lemonsqueezy handles tax compliance automatically, making it ideal for digital products.

**Required Keys:**

```bash
LEMONSQUEEZY_API_KEY="eyJ..."
LEMONSQUEEZY_WEBHOOK_SECRET="..."
LEMONSQUEEZY_STORE_ID="..."
```

**Setup Steps:**
1. Create account at [lemonsqueezy.com](https://lemonsqueezy.com)
2. Set up your store
3. Create products and pricing
4. Get API key from Settings > API
5. Configure webhook endpoint: `https://your-domain.com/api/lemonsqueezy/webhook`

### Polar.sh Configuration

Polar is designed for open source monetization and subscription management.

**Required Keys:**

```bash
POLAR_ACCESS_TOKEN="polar_..."
POLAR_WEBHOOK_SECRET=""
NEXT_PUBLIC_POLAR_PRODUCT_ID=""
NEXT_PUBLIC_POLAR_DISCOUNT_ID=""
```

**Setup Steps:**
1. Sign up at [polar.sh](https://polar.sh)
2. Create organization and product
3. Generate access token from Settings > Tokens
4. Configure webhook endpoint

### Payment Provider Comparison

| Feature | Stripe | Lemonsqueezy | Polar.sh |
|---------|--------|--------------|----------|
| Pricing | 2.9% + 30c | 5% + 50c | Varies |
| Tax Handling | Manual | Automatic | Automatic |
| Subscriptions | Yes | Yes | Yes |
| One-time | Yes | Yes | Yes |
| Invoicing | Yes | Limited | No |
| Global | 135+ countries | 180+ countries | Global |
| Webhook Events | Extensive | Basic | Basic |

---

## Email Configuration

Configure transactional email for authentication flows, notifications, and user communications:

```
╔══════════════════════════════════════════════════════════════════════╗
║                              EMAIL                                    ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║> Send transactional emails                                            ║
║                                                                       ║
║  ● Resend ★ REC  (1 key)                                             ║
║      Modern, React email templates                                    ║
║                                                                       ║
║  ○ Postmark  (1 key)                                                 ║
║      Best deliverability                                              ║
║                                                                       ║
║  ○ SendGrid  (1 key)                                                 ║
║      High volume, marketing                                           ║
║                                                                       ║
║  ○ AWS SES  (3 keys)                                                 ║
║      Cheapest at scale                                                ║
║                                                                       ║
║  ○ Mailgun  (2 keys)                                                 ║
║      Developer-friendly                                               ║
║                                                                       ║
║  ○ None  (0 keys)                                                    ║
║      Skip email                                                       ║
║                                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Resend Configuration (Recommended)

Resend provides a modern API with React email template support.

**Required Keys:**

```bash
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@mail.yourdomain.com"
EMAIL_REPLY_TO="support@yourdomain.com"
CONTACT_FORM_EMAIL="support@yourdomain.com"
```

**Key Format Validation:**
- API key must start with `re_`
- FROM email must be a valid email address
- Domain must be verified in Resend dashboard

**Setup Steps:**

1. **Create Account:**
   - Sign up at [resend.com](https://resend.com)
   - Verify your email domain

2. **Domain Verification:**
   ```
   Add DNS records:
   - TXT record for domain verification
   - MX record for receiving bounces
   - DKIM record for email signing
   ```

3. **Get API Key:**
   - Go to API Keys section
   - Create new key with send permissions
   - Copy key starting with `re_`

4. **Configure Sender:**
   ```bash
   # Must match verified domain
   EMAIL_FROM="noreply@mail.yourdomain.com"
   ```

### AWS SES Configuration

AWS SES is the most cost-effective option at scale.

**Required Keys:**

```bash
AWS_SES_ACCESS_KEY="AKIA..."
AWS_SES_SECRET_KEY="..."
AWS_SES_REGION="us-east-1"
```

**Setup Steps:**
1. Enable SES in AWS Console
2. Verify sender domain and email addresses
3. Request production access (sandbox has limitations)
4. Create IAM user with SES permissions
5. Generate access keys

### Email Provider Comparison

| Feature | Resend | Postmark | SendGrid | AWS SES |
|---------|--------|----------|----------|---------|
| Free Tier | 3,000/mo | 100/mo | 100/day | 62,000/mo |
| Price/1000 | $1.50 | $1.25 | $0.34 | $0.10 |
| React Templates | Native | No | No | No |
| Deliverability | Excellent | Best | Good | Good |
| Setup Difficulty | Easy | Easy | Medium | Hard |

---

## Analytics Integration

Track user behavior and product metrics:

```
╔══════════════════════════════════════════════════════════════════════╗
║                            ANALYTICS                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║> Track user behavior                                                  ║
║                                                                       ║
║  ● PostHog ★ REC  (1 key)                                            ║
║      Product analytics + feature flags                                ║
║                                                                       ║
║  ○ Plausible  (1 key)                                                ║
║      Privacy-friendly, simple                                         ║
║                                                                       ║
║  ○ Mixpanel  (1 key)                                                 ║
║      Event analytics, funnels                                         ║
║                                                                       ║
║  ○ Amplitude  (1 key)                                                ║
║      Product analytics, cohorts                                       ║
║                                                                       ║
║  ○ Vercel Analytics  (0 keys)                                        ║
║      Built-in, zero config                                            ║
║                                                                       ║
║  ○ None  (0 keys)                                                    ║
║      Skip analytics                                                   ║
║                                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

### PostHog Configuration

PostHog provides product analytics with built-in feature flags.

**Required Keys:**

```bash
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
NEXT_PUBLIC_POSTHOG_DEBUG=""  # Set to "true" for debug mode
```

**Key Format Validation:**
- Project key must start with `phc_`
- Host must be a valid URL

**Setup Steps:**
1. Create account at [posthog.com](https://posthog.com)
2. Create new project
3. Copy Project API key from Settings
4. Choose host region (US or EU)

**Features Included:**
- Page view tracking
- Custom event tracking
- Session recordings
- Feature flags
- A/B testing
- Funnels and retention

### Plausible Configuration

Plausible is a privacy-focused alternative to Google Analytics.

**Required Keys:**

```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="yourdomain.com"
```

**Setup Steps:**
1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. No API key needed - just the domain

---

## AI Provider Setup

Add AI capabilities to your application:

```
╔══════════════════════════════════════════════════════════════════════╗
║                               AI                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║> Add AI capabilities                                                  ║
║                                                                       ║
║  ● OpenAI ★ REC  (1 key)                                             ║
║      GPT-4o, o1, embeddings                                           ║
║                                                                       ║
║  ○ Anthropic  (1 key)                                                ║
║      Claude 3.5 Sonnet, Opus                                          ║
║                                                                       ║
║  ○ Google AI  (1 key)                                                ║
║      Gemini 2.0, Flash                                                ║
║                                                                       ║
║  ○ xAI (Grok)  (1 key)                                               ║
║      Grok 2, real-time data                                           ║
║                                                                       ║
║  ○ DeepSeek  (1 key)                                                 ║
║      V3, R1 reasoning                                                 ║
║                                                                       ║
║  ○ Mistral  (1 key)                                                  ║
║      Large 2, Codestral                                               ║
║                                                                       ║
║  ○ Groq  (1 key)                                                     ║
║      Fastest inference                                                ║
║                                                                       ║
║  ○ Together AI  (1 key)                                              ║
║      Open models, cheap                                               ║
║                                                                       ║
║  ○ Ollama  (1 key)                                                   ║
║      Local models, free                                               ║
║                                                                       ║
║  ○ None  (0 keys)                                                    ║
║      Skip AI                                                          ║
║                                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

### OpenAI Configuration

**Required Keys:**

```bash
OPENAI_API_KEY="sk-..."
```

**Key Format Validation:**
- Must start with `sk-`

**Setup Steps:**
1. Create account at [platform.openai.com](https://platform.openai.com)
2. Go to API Keys
3. Create new secret key
4. Add billing and set usage limits

### Anthropic Configuration

**Required Keys:**

```bash
ANTHROPIC_API_KEY="sk-ant-..."
```

**Key Format Validation:**
- Must start with `sk-ant-`

### Google AI Configuration

**Required Keys:**

```bash
GOOGLE_AI_API_KEY="AIza..."
```

### Ollama Configuration (Local AI)

**Required Keys:**

```bash
OLLAMA_ENABLED="true"
OLLAMA_BASE_URL="http://localhost:11434/v1"
OLLAMA_MODEL="llama3.1:8b"
```

**Setup Steps:**
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Start Ollama server
ollama serve

# Pull a model
ollama pull llama3.1:8b

# List available models
ollama list
```

### AI Provider Comparison

| Provider | Models | Pricing | Best For |
|----------|--------|---------|----------|
| OpenAI | GPT-4o, o1 | $$$ | General, coding |
| Anthropic | Claude 3.5 | $$$ | Long context, reasoning |
| Google | Gemini 2.0 | $$ | Multimodal |
| Groq | Llama, Mixtral | $ | Speed |
| Together | Open models | $ | Cost |
| Ollama | Local | Free | Privacy |

---

## Search Configuration

Add search capabilities to your application:

```
╔══════════════════════════════════════════════════════════════════════╗
║                             SEARCH                                    ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║> Search and discovery                                                 ║
║                                                                       ║
║  ● Algolia ★ REC  (2 keys)                                           ║
║      Fastest, typo-tolerant                                           ║
║                                                                       ║
║  ○ Typesense  (2 keys)                                               ║
║      Open source Algolia alt                                          ║
║                                                                       ║
║  ○ Meilisearch  (2 keys)                                             ║
║      Open source, easy                                                ║
║                                                                       ║
║  ○ Elasticsearch  (1 key)                                            ║
║      Full-text, enterprise                                            ║
║                                                                       ║
║  ○ Fuse.js  (0 keys)                                                 ║
║      Client-side, no API                                              ║
║                                                                       ║
║  ○ None  (0 keys)                                                    ║
║      Skip search                                                      ║
║                                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Algolia Configuration

**Required Keys:**

```bash
NEXT_PUBLIC_ALGOLIA_APP_ID="XXXXXX"
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY="..."  # Search-only, safe for client
ALGOLIA_ADMIN_API_KEY="..."  # Admin, server-side only
```

**Setup Steps:**
1. Create account at [algolia.com](https://www.algolia.com)
2. Create new application
3. Get keys from API Keys section
4. Create indices for your data

---

## File Storage Setup

Configure file uploads and media storage:

```
╔══════════════════════════════════════════════════════════════════════╗
║                            STORAGE                                    ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║> File uploads and media                                               ║
║                                                                       ║
║  ● Cloudflare R2 ★ REC  (3 keys)                                     ║
║      S3-compatible, no egress                                         ║
║                                                                       ║
║  ○ AWS S3  (3 keys)                                                  ║
║      Industry standard                                                ║
║                                                                       ║
║  ○ Supabase Storage  (2 keys)                                        ║
║      Integrated with DB                                               ║
║                                                                       ║
║  ○ UploadThing  (1 key)                                              ║
║      Simple, type-safe                                                ║
║                                                                       ║
║  ○ Vercel Blob  (1 key)                                              ║
║      Zero config on Vercel                                            ║
║                                                                       ║
║  ○ None  (0 keys)                                                    ║
║      Skip storage                                                     ║
║                                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Cloudflare R2 Configuration

R2 is recommended for its zero egress fees.

**Required Keys:**

```bash
CLOUDFLARE_R2_ACCESS_KEY_ID="..."
CLOUDFLARE_R2_SECRET_ACCESS_KEY="..."
CLOUDFLARE_R2_BUCKET="fabrk-uploads"
CLOUDFLARE_R2_ENDPOINT="https://[account-id].r2.cloudflarestorage.com"
CLOUDFLARE_R2_PUBLIC_URL=""  # Optional custom domain
```

**Setup Steps:**
1. Enable R2 in Cloudflare Dashboard
2. Create bucket
3. Generate API token with R2 permissions
4. Copy endpoint URL with your account ID

### AWS S3 Configuration

**Required Keys:**

```bash
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="fabrk-uploads"
AWS_S3_REGION="us-east-1"
```

---

## Theme Selection

Choose your default terminal theme:

```
╔══════════════════════════════════════════════════════════════════════╗
║                             THEME                                     ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║? Select default theme:                                                ║
║  > Dracula                                                            ║
║    Nord                                                               ║
║    Tokyo Night                                                        ║
║    Gruvbox                                                            ║
║    Catppuccin                                                         ║
║    One Dark                                                           ║
║    Monokai                                                            ║
║    Solarized Dark                                                     ║
║    Solarized Light                                                    ║
║    GitHub Dark                                                        ║
║    GitHub Light                                                       ║
║    Synthwave                                                          ║
║    Cyberpunk                                                          ║
║    Matrix                                                             ║
║    Amber CRT                                                          ║
║    Green CRT                                                          ║
║    Phosphor                                                           ║
║    Minimal                                                            ║
║                                                                       ║
║? Enable theme switcher for users? Yes                                 ║
║                                                                       ║
║✓ Default theme set to 'dracula'                                       ║
║✓ Theme switcher enabled                                               ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Available Themes

Fabrk includes 18 terminal-inspired themes:

| Theme | Style | Colors |
|-------|-------|--------|
| Dracula | Dark | Purple, Pink, Cyan |
| Nord | Dark | Blue, Frost |
| Tokyo Night | Dark | Blue, Purple |
| Gruvbox | Dark | Orange, Yellow |
| Catppuccin | Dark | Pastel, Mauve |
| One Dark | Dark | Atom colors |
| Monokai | Dark | Yellow, Pink |
| Solarized Dark | Dark | Blue, Yellow |
| Solarized Light | Light | Blue, Yellow |
| GitHub Dark | Dark | GitHub colors |
| GitHub Light | Light | GitHub colors |
| Synthwave | Dark | Neon, Pink |
| Cyberpunk | Dark | Yellow, Cyan |
| Matrix | Dark | Green, Black |
| Amber CRT | Dark | Amber |
| Green CRT | Dark | Green |
| Phosphor | Dark | Green glow |
| Minimal | Light | Grayscale |

---

## Landing Page Generation

The wizard can generate a customized landing page for your product:

```
╔══════════════════════════════════════════════════════════════════════╗
║                          STARTER PAGE                                 ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║> Generate a custom landing page?                                      ║
║                                                                       ║
║● 1. YES                                                               ║
║     Generate a customized landing page with YOUR product info         ║
║                                                                       ║
║  2. NO                                                                ║
║     Skip - keep existing page.tsx                                     ║
║                                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Product Information Prompts

If you choose to generate a landing page:

```
╔══════════════════════════════════════════════════════════════════════╗
║                         PRODUCT INFO                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║> Tell us about your product                                           ║
║This info will be used to customize your landing page                  ║
║                                                                       ║
║  ✓  PRODUCT NAME: Acme Analytics                                      ║
║  ◀  HEADLINE                                                          ║
║  ...  DESCRIPTION                                                     ║
║  ...  DOMAIN                                                          ║
║                                                                       ║
║──────────────────────────────────────────────────────────────────────║
║                                                                       ║
║Main headline (compelling!)                                            ║
║Example: Track Everything. Miss Nothing.                               ║
║                                                                       ║
║Press Enter to use default · Type to customize                         ║
║                                                                       ║
║> Track Everything. Miss Nothing.█                                     ║
║                                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Generated Files

When you generate a landing page, the wizard creates:

1. **`src/app/page.tsx`** - Customized landing page with your product info
2. **`FABRK-PROMPTS.md`** - AI prompts for further customization

### Landing Page Templates

Different templates generate different landing pages:

- **Starter**: Basic product landing page
- **SaaS**: Feature-rich SaaS landing with pricing
- **AI App**: AI-focused landing with demo section
- **Marketplace**: Grid-based product showcase

---

## Environment Variable Validation

The wizard validates all environment variables in real-time and at startup.

### Validation Rules

**Database:**
```typescript
// Must be a valid PostgreSQL URL
function isValidPostgresUrl(value: string): boolean {
  return value.startsWith('postgres://') || value.startsWith('postgresql://');
}
```

**Authentication:**
```typescript
// NEXTAUTH_SECRET must be at least 32 characters
function validateAuthSecret(value: string): boolean {
  return value.length >= 32;
}
```

**Stripe Keys:**
```typescript
// Validate key prefixes
function validateStripeKeys() {
  // Secret: sk_test_ or sk_live_
  // Publishable: pk_test_ or pk_live_
  // Webhook: whsec_
}
```

**Email:**
```typescript
// Validate email format
function isValidEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}
```

### Validation Error Messages

The wizard provides clear error messages:

```
════════════════════════════════════════════════════════════════
  Environment Variable Validation Failed
════════════════════════════════════════════════════════════════

[Database]
  ✗ DATABASE_URL
    Must be a valid PostgreSQL URL (postgres:// or postgresql://)

[Authentication]
  ✗ NEXTAUTH_SECRET
    Must be at least 32 characters long for security

[Payment]
  ✗ STRIPE_SECRET_KEY
    Must start with sk_test_ or sk_live_

════════════════════════════════════════════════════════════════

Setup Instructions:
  1. Copy .env.example to .env.local
  2. Fill in all required environment variables
  3. See .env.example for detailed setup instructions
  4. Run "npm run dev" again

Documentation: https://fabrk.dev/docs/setup

════════════════════════════════════════════════════════════════
```

### Feature Detection

The wizard automatically detects enabled features based on environment variables:

```typescript
export const features = {
  googleOAuth: !!env.GOOGLE_CLIENT_ID && !!env.GOOGLE_CLIENT_SECRET,
  pusher: !!env.NEXT_PUBLIC_PUSHER_KEY,
  algolia: !!env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  sanity: !!env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  redis: !!env.UPSTASH_REDIS_REST_URL,
  s3: !!env.S3_BUCKET_NAME,
  sentry: !!env.NEXT_PUBLIC_SENTRY_DSN,
  openai: !!env.OPENAI_API_KEY,
  anthropic: !!env.ANTHROPIC_API_KEY,
  posthog: !!env.NEXT_PUBLIC_POSTHOG_KEY,
} as const;
```

---

## Command-Line Options

The setup wizard supports several command-line flags:

### Preview Mode (Dry Run)

See what will change without modifying files:

```bash
npm run setup -- --dry-run
# or
npm run setup -- -n
```

Output shows:
- Files that will be created
- Environment variables to set
- Configuration changes

```
╔══════════════════════════════════════════════════════════════════════╗
║                        DRY RUN COMPLETE                               ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║⚠ DRY RUN - No files written                                          ║
║                                                                       ║
║Would create:                                                          ║
║  • .env.local                                                         ║
║  • src/app/page.tsx                                                   ║
║  • FABRK-PROMPTS.md                                                   ║
║                                                                       ║
║Run npm run setup to apply.                                            ║
║                                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Test Mode

Run automated tests on all templates:

```bash
npm run setup -- --test
# or
npm run setup -- -t
```

This validates all template configurations without interactive prompts.

### Skip Specific Sections

Skip certain configuration sections:

```bash
# Skip database setup
npm run setup -- --skip-db

# Skip email configuration
npm run setup -- --skip-email

# Skip multiple sections
npm run setup -- --skip-db --skip-email --skip-analytics
```

### Use Defaults

Non-interactive mode with default values:

```bash
npm run setup -- --defaults
```

### Reset Configuration

Reset all configuration and start fresh:

```bash
npm run setup -- --reset
```

---

## Generated Files

After running the wizard, you'll have:

```
Created/Updated:
├── .env.local           # Environment variables
├── src/config/index.ts  # App configuration (if modified)
├── prisma/schema.prisma # Database schema (if needed)
├── src/app/page.tsx     # Landing page (if generated)
├── FABRK-PROMPTS.md     # AI prompts (if page generated)
└── next.config.ts       # Next.js settings (if needed)
```

### Generated .env.local

```bash
# Generated by Fabrk Setup Wizard
# Template: saas
#
# IMPORTANT: Replace any placeholder values before running npm run db:push
# Get a free PostgreSQL database at: neon.tech or supabase.com

# Authentication
NEXTAUTH_SECRET="kJ9mN2pQ4rS6tV8wX0yZ1aB3cD5eF7gH9iJ0kL2mN4oP"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/myapp"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@mail.yourdomain.com"

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
```

### Configuration Object

The wizard generates typed configuration:

```typescript
// src/config/index.ts
export const config = {
  app: {
    name: 'My SaaS',
    url: 'https://mysaas.com',
  },

  auth: {
    providers: ['google', 'credentials'],
  },

  payments: {
    provider: 'stripe',
    plans: ['starter', 'professional', 'enterprise'],
  },

  email: {
    provider: 'resend',
    from: 'noreply@mysaas.com',
  },

  features: {
    subscriptions: true,
    oneTimePurchases: true,
    trialPeriod: true,
    trialDays: 14,
  },
};
```

---

## Post-Setup Commands

After the wizard completes, it automatically runs:

### 1. Prisma Generate

```bash
[1/3] Generating Prisma client...
✓ Prisma client generated
```

### 2. Database Push (if configured)

```bash
[2/3] Pushing database schema...
✓ Database schema pushed
```

### 3. Development Server

```bash
[3/3] Starting development server...

╔══════════════════════════════════════════════════════════════════════╗
║                         SETUP COMPLETE                               ║
╚══════════════════════════════════════════════════════════════════════╝

  ✓ .env.local created
  ✓ Landing page copied
  ✓ FABRK-PROMPTS.md created
  ✓ Prisma client generated
  ✓ Database schema pushed

  Starting dev server and opening browser...

  Press Ctrl+C to stop the server
```

### Manual Post-Setup Steps

If you skipped any automatic steps:

```bash
# 1. Generate Prisma client
npx prisma generate

# 2. Push database schema
npm run db:push

# 3. Seed test data (optional)
npm run db:seed

# 4. Start development server
npm run dev
```

---

## Troubleshooting

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Wizard won't start | Dependencies not installed | Run `npm install` first |
| Database won't connect | Invalid connection string | Check format matches provider |
| OAuth fails | Callback URL mismatch | Verify URLs in provider dashboard |
| Email won't send | Domain not verified | Complete DNS verification in email provider |
| Stripe webhook fails | Wrong secret | Copy webhook secret from Stripe dashboard |
| AI calls fail | Invalid API key | Check key format and account status |

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql "postgresql://user:pass@localhost:5432/db"

# Common errors:
# - "connection refused" → Database not running
# - "authentication failed" → Wrong credentials
# - "database does not exist" → Create database first

# Create database manually
createdb myapp

# Or with Docker
docker exec -it fabrk-postgres psql -U postgres -c "CREATE DATABASE myapp;"
```

### Environment Variable Issues

```bash
# Verify .env.local exists
cat .env.local

# Check specific variable
echo $DATABASE_URL

# Validate all variables
npm run validate:env
```

### Webhook Issues

```bash
# Test Stripe webhook locally
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Test with CLI
stripe trigger checkout.session.completed

# View webhook logs
stripe logs tail --filter status=failed
```

### Reset and Retry

```bash
# Remove generated files
rm .env.local
rm -f src/app/page.tsx.backup
rm -f FABRK-PROMPTS.md

# Clear database
npm run db:reset

# Run setup again
npm run setup
```

---

## Best Practices

### 1. Use Dry Run First

Always preview changes before applying:

```bash
npm run setup -- --dry-run
```

### 2. Keep Secrets Secure

Never commit `.env.local` to version control:

```gitignore
# .gitignore
.env.local
.env.*.local
```

### 3. Use Test Keys in Development

```bash
# Development
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Production
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

### 4. Validate Before Deployment

```bash
# Run all validations
npm run ai:pre-deploy

# Validate environment
npm run validate:env

# Validate webhooks
npm run validate:webhooks
```

### 5. Document Custom Configurations

Keep notes on any customizations:

```markdown
# Custom Configuration Notes

## Database
- Using Supabase with connection pooling
- Direct connection for migrations only

## Payments
- Stripe with lookup keys (not price IDs)
- Early adopter coupon enabled

## Email
- Custom domain: mail.myapp.com
- Reply-to: support@myapp.com
```

### 6. Set Up Proper Webhook URLs

| Environment | URL Pattern |
|-------------|-------------|
| Local | `http://localhost:3000/api/{provider}/webhook` |
| Preview | `https://preview-{id}.vercel.app/api/{provider}/webhook` |
| Production | `https://myapp.com/api/{provider}/webhook` |

---

## Advanced Configuration

### Multi-Environment Setup

Create environment-specific files:

```bash
# Development
.env.local

# Staging (use Vercel environment variables)
# Production (use Vercel environment variables)
```

### Custom Validation Rules

Extend validation in `src/lib/env/validation.ts`:

```typescript
function validateCustom(): ValidationError[] {
  const errors: ValidationError[] = [];

  // Add custom validation
  if (process.env.MY_CUSTOM_VAR && !isValidCustomFormat(process.env.MY_CUSTOM_VAR)) {
    errors.push({
      variable: 'MY_CUSTOM_VAR',
      message: 'Must match custom format',
      category: 'Custom',
    });
  }

  return errors;
}
```

### Feature Flags

Configure features in `src/config/app.ts`:

```typescript
features: {
  // Authentication features
  emailVerification: true,
  passwordReset: true,
  googleAuth: !!env.GOOGLE_CLIENT_ID,

  // Payment features
  subscriptions: true,
  oneTimePurchases: true,
  trialPeriod: true,
  trialDays: 14,

  // Dashboard features
  analytics: false,
  userManagement: true,
  teamFeatures: false,
},
```

### CI/CD Integration

Skip validation in build pipelines:

```bash
# Skip env validation for CI builds
SKIP_ENV_VALIDATION=true npm run build
```

---

## Security Considerations

### Protecting API Keys

1. **Never commit secrets:**
   ```gitignore
   .env.local
   .env.*.local
   *.pem
   *.key
   ```

2. **Use environment-specific keys:**
   - Test keys for development
   - Production keys only in production environment
   - Rotate keys periodically

3. **Limit key permissions:**
   - Use read-only keys where possible
   - Create service-specific keys
   - Enable key restrictions in provider dashboards

### Webhook Security

1. **Verify webhook signatures:**
   ```typescript
   const sig = request.headers.get('stripe-signature');
   const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
   ```

2. **Use HTTPS in production:**
   - All webhook endpoints must be HTTPS
   - Verify SSL certificates

3. **Implement idempotency:**
   - Handle duplicate webhook deliveries
   - Store processed event IDs

### Database Security

1. **Use connection pooling:**
   - Prevents connection exhaustion
   - Recommended for serverless

2. **Enable SSL:**
   ```bash
   DATABASE_URL="postgresql://...?sslmode=require"
   ```

3. **Limit permissions:**
   - Create database users with minimal permissions
   - Avoid using superuser credentials

---

## Getting Started

Ready to configure your SaaS? Run the setup wizard:

```bash
# Clone the repository
git clone https://github.com/fabrk/fabrk-dev my-saas

# Install dependencies
cd my-saas && npm install

# Run the interactive setup wizard
npm run setup

# Preview without changes
npm run setup -- --dry-run

# Start building
npm run dev
```

The setup wizard transforms a complex multi-step configuration process into a guided, validated, and automated experience. In just a few minutes, you'll have a fully configured SaaS boilerplate ready for development.

---

## Next Steps

After running the setup wizard:

1. **Customize your landing page** - Edit `src/app/page.tsx` with your branding
2. **Set up your payment products** - Create products in Stripe dashboard
3. **Configure webhooks** - Add webhook URLs to all providers
4. **Verify email domain** - Complete DNS verification
5. **Test the complete flow** - Sign up, subscribe, receive emails

For more detailed guides, check out:
- [Database Setup Guide](/docs/database-setup)
- [Payment Integration Guide](/docs/payment-integration)
- [Email Configuration Guide](/docs/email-configuration)
- [Deployment Guide](/docs/deployment)

Configuration, simplified.
