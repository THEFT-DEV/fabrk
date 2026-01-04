# Fabrk Onboarding Checklist

**Welcome to Fabrk!** 🚀

This checklist will guide you through setting up your SaaS application from zero to launch. Estimated time: **2-4 hours** for full setup.

---

## Phase 1: Pre-Flight (15 Minutes)

Before you start, gather these prerequisites:

### System Requirements
- [ ] **Node.js 22+** installed (check: `node --version`)
- [ ] **npm 10+** installed (check: `npm --version`)
- [ ] **PostgreSQL 14+** available (local or cloud)
- [ ] **Git** installed (check: `git --version`)
- [ ] **VS Code or IDE** of choice (recommended)

### Accounts to Create (Free)
- [ ] **GitHub** account (for repository)
- [ ] **PostgreSQL database** (Railway, Supabase, or local)
- [ ] **Stripe account** (for payments)
- [ ] **Resend account** (for emails, or use Sendgrid/AWS SES)
- [ ] **Google OAuth credentials** (for social login)

**Estimated time:** 10 minutes
**Total estimated cost:** $0 (all free tiers available)

---

## Phase 2: Local Setup (30 Minutes)

### Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/jpoindexter/fabrk-dev.git
cd fabrk-dev

# Install dependencies
npm install --legacy-peer-deps

# Verify installation
npm run type-check  # Should pass with no errors
```

- [ ] Git repository cloned
- [ ] npm install completed without errors
- [ ] type-check passes

### Step 2: Database Setup

#### Option A: Local PostgreSQL
```bash
# Create database
createdb fabrk_dev

# Connection string: postgresql://localhost:5432/fabrk_dev
```

#### Option B: Cloud Database (Recommended for Beginners)
1. Go to **Railway.app** or **Supabase.com**
2. Create new PostgreSQL database
3. Copy connection string
4. (Railway also provides a ready-to-go `DATABASE_URL`)

- [ ] PostgreSQL database created
- [ ] Connection string copied

### Step 3: Environment Configuration

```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your configuration
nano .env.local  # or use your editor

# Generate NEXTAUTH_SECRET
openssl rand -base64 32  # Copy this value into NEXTAUTH_SECRET
```

**Minimum required in .env.local:**
```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/fabrk_dev

# NextAuth (CRITICAL)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated via openssl>

# Email (use test key for now, or leave empty)
RESEND_API_KEY=test_xxxx  # or skip, emails will log to console

# Stripe (use test keys from https://dashboard.stripe.com/)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_xxxxx
```

- [ ] .env.local created
- [ ] NEXTAUTH_SECRET generated and added
- [ ] DATABASE_URL configured
- [ ] Minimum env variables set

### Step 4: Database Migration

```bash
# Push schema to database
npm run db:push

# Seed with test data (optional)
npm run db:seed

# View database in GUI (optional)
npm run db:studio  # Opens Prisma Studio at localhost:5555
```

- [ ] Database schema pushed
- [ ] Database seeded with test data (optional)

### Step 5: Start Development Server

```bash
# Start the app
npm run dev

# Visit http://localhost:3000 in your browser
# You should see the landing page
```

- [ ] Development server started successfully
- [ ] Landing page loads without errors
- [ ] Console shows no critical errors

---

## Phase 3: Authentication Setup (45 Minutes)

### Step 1: Test Credentials Login

```bash
# The database is seeded with a test user:
Email: test@example.com
Password: password
```

```
1. Go to http://localhost:3000/login
2. Enter credentials above
3. Click "Sign In"
4. You should see dashboard
5. Click your email in top right → "Settings"
```

- [ ] Credentials login working
- [ ] Can access protected /dashboard routes
- [ ] Can view profile settings

### Step 2: Google OAuth (Optional but Recommended)

**To enable social login:**

1. Go to **Google Cloud Console** (console.cloud.google.com)
2. Create new project named "Fabrk"
3. Go to **APIs & Services** → **Credentials**
4. Click **+ Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Copy **Client ID** and **Client Secret**
8. Add to .env.local:
   ```env
   GOOGLE_CLIENT_ID=xxx
   GOOGLE_CLIENT_SECRET=xxx
   ```
9. Restart dev server (`npm run dev`)

- [ ] Google OAuth credentials created
- [ ] Credentials added to .env.local
- [ ] Google "Sign in with" button appears on login page
- [ ] Google login works

**For production:** Update redirect URI to `https://yourdomain.com/api/auth/callback/google`

### Step 3: Email Verification (Optional)

By default, email verification is **disabled** in development.

To test email verification:
1. Edit `.env.local`:
   ```env
   NEXT_PUBLIC_EMAIL_VERIFICATION_ENABLED=true
   ```
2. Restart dev server
3. Resend won't send real emails in dev (logs to console instead)

- [ ] Email verification tested (optional)

---

## Phase 4: Payments Setup (30 Minutes)

### Step 1: Stripe Test Keys

1. Go to **Stripe Dashboard** (dashboard.stripe.com)
2. Make sure you're in **Test Mode** (toggle in top right)
3. Go to **Developers** → **API keys**
4. Copy:
   - **Secret key** (starts with `sk_test_`)
   - **Publishable key** (starts with `pk_test_`)
5. Add to .env.local:
   ```env
   STRIPE_SECRET_KEY=sk_test_xxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   ```

- [ ] Stripe API keys in .env.local

### Step 2: Create Test Products & Prices

1. In Stripe Dashboard, go to **Products**
2. Create 3 products:
   - "Starter" - $29/month
   - "Professional" - $99/month
   - "Enterprise" - $299/month
3. For each product, create a **Price** (Monthly, subscription)
4. Copy price IDs and add to .env.local:
   ```env
   NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_xxxxx
   NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL=price_xxxxx
   NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_xxxxx
   ```
5. Restart dev server

- [ ] 3 Stripe products created
- [ ] Price IDs in .env.local
- [ ] Pricing page shows pricing

### Step 3: Test Checkout

1. Go to http://localhost:3000/#pricing
2. Click "Get Started" on a plan
3. You should be redirected to Stripe Checkout
4. Use test card: `4242 4242 4242 4242` (any future date, any CVC)
5. Click **Pay**
6. You should see success page

- [ ] Stripe checkout works
- [ ] Payment successful with test card
- [ ] Webhook receives payment_intent.succeeded (check terminal)

### Step 4: Webhook Setup (Local Testing)

```bash
# In a separate terminal, install Stripe CLI:
brew install stripe/stripe-cli/stripe  # macOS
# or download from https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy webhook signing secret and add to .env.local
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

- [ ] Stripe CLI installed
- [ ] Webhook forwarding active (`stripe listen` running)
- [ ] Payment webhook received and processed

---

## Phase 5: Email Setup (15 Minutes)

### Option A: Resend (Recommended)

1. Go to **Resend.com**
2. Create free account
3. Go to **API Tokens**
4. Create new token (copy it)
5. Add to .env.local:
   ```env
   RESEND_API_KEY=re_xxxxx
   ```
6. Restart dev server

**Test sending email:**
```bash
# Open /api/health endpoint in browser
# Should show green checkmark for email service
```

- [ ] Resend API key in .env.local
- [ ] Welcome email sends on signup (check inbox)

### Option B: SendGrid or AWS SES

See **docs/EMAIL-SETUP.md** for detailed configuration.

---

## Phase 6: Additional Services (Optional, 30 Minutes)

### Real-Time Features (Pusher)

For notifications, activity feeds, presence tracking:

1. Go to **Pusher.com**
2. Create free account
3. Create new app
4. Copy credentials to .env.local:
   ```env
   NEXT_PUBLIC_PUSHER_KEY=xxxxx
   NEXT_PUBLIC_PUSHER_CLUSTER=xxxxx
   PUSHER_APP_ID=xxxxx
   PUSHER_SECRET=xxxxx
   ```

- [ ] Pusher setup (optional)
- [ ] Real-time notifications working

### Analytics (PostHog)

For product analytics:

1. Go to **PostHog.com**
2. Create free account
3. Create new project (Node.js)
4. Copy API key to .env.local:
   ```env
   NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
   ```

- [ ] PostHog setup (optional)

### Search (Algolia)

For full-text search:

1. Go to **Algolia.com**
2. Create free account
3. Create index
4. Copy credentials:
   ```env
   NEXT_PUBLIC_ALGOLIA_APP_ID=xxxxx
   NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=xxxxx
   ALGOLIA_ADMIN_API_KEY=xxxxx
   ```

- [ ] Algolia setup (optional)

---

## Phase 7: Code Customization (30 Minutes)

### Step 1: Update Configuration

Edit **src/config.js** with your app details:

```javascript
export const appConfig = {
  name: "Your App Name",              // Change from "Fabrk"
  description: "Your app description",
  domain: "yourdomain.com",           // Your domain
  logo: "...",                        // Your logo
  supportEmail: "support@yourdomain.com",
  // Update pricing, features, etc.
}
```

- [ ] src/config.js updated with your app name
- [ ] Logo updated (replace public/logo.png)
- [ ] Pricing/features customized

### Step 2: Update Branding

- [ ] **Logo:** Replace `public/logo.png`
- [ ] **Favicon:** Replace `public/favicon.ico`
- [ ] **Title/Meta:** Check `src/app/layout.tsx`
- [ ] **Colors:** Customize via design tokens in `src/app/globals.css`

### Step 3: Update Content

- [ ] **Landing page:** Edit `src/app/[locale]/page.tsx`
- [ ] **Pricing:** Update `src/components/landing/pricing-section.tsx`
- [ ] **FAQ:** Update `src/components/landing/faq-section.tsx`
- [ ] **Features:** Update `src/components/landing/features-section.tsx`

---

## Phase 8: Testing (15 Minutes)

### Run Tests

```bash
# Run all tests
npm run test:all

# View results (should see green checkmarks)
# Some tests may fail due to incomplete features - this is OK
```

### Manual Testing Checklist

- [ ] **Landing page** - Loads without errors
- [ ] **Sign up** - Create new account works
- [ ] **Login** - Can login with credentials
- [ ] **Google OAuth** - Social login works
- [ ] **Password reset** - Email reset link works
- [ ] **Dashboard** - Protected route works
- [ ] **Settings** - Can update profile
- [ ] **Billing** - Checkout flow works
- [ ] **Admin** - Admin dashboard visible (requires ADMIN role)

---

## Phase 9: Prepare for Production (1 Hour)

### Step 1: Environment Variables for Production

Create `.env.production.local` with:
```env
# Use HTTPS for production
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<new 32+ char secret>

# Production database (must have backups)
DATABASE_URL=postgresql://user:pass@prod-db.com/fabrk_prod

# Production Stripe keys (sk_live_, pk_live_)
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_live_xxxxx

# Production email
RESEND_API_KEY=re_xxxxx  # Production key

# All other production secrets...
```

- [ ] .env.production.local created
- [ ] All production secrets gathered
- [ ] Database backups configured
- [ ] Domain configured with HTTPS certificate

### Step 2: Production Deployment

Choose a platform:
- **Vercel** (recommended, zero-config) → docs/DEPLOYMENT.md
- **Railway** → docs/RAILWAY-DEPLOYMENT.md
- **Render** → docs/RENDER-DEPLOYMENT.md
- **DigitalOcean** → docs/DIGITALOCEAN-DEPLOYMENT.md
- **Self-hosted** → docs/DOCKER-DEPLOYMENT.md

- [ ] Deployment platform chosen
- [ ] Production deployment guide reviewed
- [ ] Database backups configured
- [ ] Monitoring/alerts setup

### Step 3: Post-Deployment

```bash
# Test production build locally
npm run build
npm start

# Or deploy to chosen platform and test:
# - Landing page loads
# - Signup/login works
# - Payments work (with live Stripe key)
# - Emails send
# - Admin dashboard accessible
```

- [ ] Production build successful
- [ ] Environment variables validated
- [ ] Payment webhook configured
- [ ] Email sending works
- [ ] Database backups working
- [ ] Monitoring enabled

---

## Phase 10: Launch Readiness (30 Minutes)

### Security Checklist

- [ ] HTTPS enabled everywhere
- [ ] NEXTAUTH_SECRET is 32+ random characters (not dev secret)
- [ ] No placeholder values in production env
- [ ] API keys rotated and updated
- [ ] Database backups automated
- [ ] Error tracking enabled (Sentry)
- [ ] Security headers in place
- [ ] CORS properly configured

### Marketing Checklist

- [ ] Landing page finalized
- [ ] Privacy policy written (templates provided)
- [ ] Terms of service written
- [ ] Pricing finalized
- [ ] Email sequences created
- [ ] Domain configured
- [ ] Analytics configured
- [ ] Favicon/branding finished

### Final Checks

- [ ] All tests passing (or known failures documented)
- [ ] No console errors in production
- [ ] Performance acceptable (>90 Lighthouse score)
- [ ] Mobile responsive on all pages
- [ ] Dark mode working (if using)
- [ ] i18n working for languages you support
- [ ] Accessibility compliant (WCAG 2.1 AA)

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Port 3000 in use** | `npm run dev:restart` (auto-kills) |
| **Database connection fails** | Check DATABASE_URL, verify PostgreSQL running |
| **Stripe payment fails** | Verify test keys, check webhook signature |
| **Email not sending** | Check RESEND_API_KEY, verify domain |
| **TypeScript errors** | Run `npm run type-check`, review errors |
| **Tests failing** | Run `npm run test:watch`, check individual files |

For more help: See **docs/TROUBLESHOOTING.md** or ask in email support

---

## What's Next?

Congratulations! 🎉 Your SaaS is ready to launch!

### Immediate (This Week)
- [ ] Customize branding and content
- [ ] Deploy to production
- [ ] Test all features end-to-end
- [ ] Configure monitoring/alerts

### Before Launch (Next Week)
- [ ] Create marketing copy
- [ ] Set up email sequences
- [ ] Create help documentation
- [ ] Configure customer support system

### Post-Launch (First Month)
- [ ] Monitor for issues
- [ ] Gather customer feedback
- [ ] Ship v1.0.1 bug fixes
- [ ] Plan v1.1 features

---

## Resources

- **Quick Start:** docs/QUICK-START.md
- **Deployment:** docs/DEPLOYMENT.md
- **Troubleshooting:** docs/TROUBLESHOOTING.md
- **API Reference:** docs/API-REFERENCE.md
- **Security Best Practices:** SECURITY.md
- **Email Support:** support@fabrk.dev

---

**Estimated Total Time:** 3-5 hours for complete setup

**You've got this!** 🚀

**Questions?** → support@fabrk.dev or email support community
