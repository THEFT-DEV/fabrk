# Production Deployment Guide

Complete checklist and guide for deploying Fabrk to production.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Database Migration](#database-migration)
4. [Deployment Process](#deployment-process)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Monitoring & Alerts](#monitoring--alerts)
7. [Rollback Procedure](#rollback-procedure)
8. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests passing (`npm test`)
- [ ] Type checking passed (`npm run type-check`)
- [ ] Linting passed (`npm run lint`)
- [ ] No console.log statements in production code
- [ ] No hardcoded secrets or API keys
- [ ] Pre-commit hooks are working

### Security

- [ ] `.env.example` contains only safe placeholders
- [ ] No secrets committed to git (run: `git grep -E "sk_live_|ghp_|AKIA"`)
- [ ] All `NEXT_PUBLIC_` variables are safe for client exposure
- [ ] Rate limiting configured for API routes
- [ ] CORS settings are production-appropriate
- [ ] Content Security Policy headers configured

### Performance

- [ ] Images optimized (WebP format, proper sizing)
- [ ] Bundle size analyzed (`npm run build`)
- [ ] No unnecessary dependencies
- [ ] Code splitting implemented for large routes
- [ ] Database queries optimized (no N+1 queries)

### Features

- [ ] Auth flows tested (signup, login, logout, password reset)
- [ ] Payment webhooks tested (Stripe, Polar, Lemonsqueezy)
- [ ] Email sending works (welcome emails, notifications)
- [ ] Forms validated and error handling works
- [ ] Mobile responsive on all pages
- [ ] Dark mode works correctly

---

## Environment Setup

### Required Environment Variables

Set these in your deployment platform (Vercel, Railway, etc.):

#### Core (REQUIRED)

```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/dbname"  # Production Postgres
DATABASE_URL_DIRECT=""  # Direct connection (for migrations)

# App URLs
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NEXT_PUBLIC_API_URL="https://yourdomain.com/api"
NEXT_PUBLIC_SITE_DOMAIN="yourdomain.com"

# NextAuth (CRITICAL)
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="GENERATE-WITH-openssl-rand-base64-32"  # Min 32 chars
```

#### Authentication

```bash
# Google OAuth (if using Google login)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

#### Payments (if enabled)

```bash
# Stripe
STRIPE_SECRET_KEY="sk_live_..."  # LIVE key for production
STRIPE_WEBHOOK_SECRET="whsec_..."  # From production webhook endpoint
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
NEXT_PUBLIC_STRIPE_PRICE_FABRK="fabrk_purchase"  # Lookup key

# Polar.sh (optional)
POLAR_ACCESS_TOKEN="polar_..."
POLAR_WEBHOOK_SECRET="..."
NEXT_PUBLIC_POLAR_PRODUCT_ID="..."

# Lemonsqueezy (optional)
LEMONSQUEEZY_API_KEY="..."
LEMONSQUEEZY_STORE_ID="..."
LEMONSQUEEZY_WEBHOOK_SECRET="..."
```

#### Email

```bash
# Resend
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"  # Must be verified domain
EMAIL_REPLY_TO="support@yourdomain.com"
CONTACT_FORM_EMAIL="support@yourdomain.com"
```

#### Redis (REQUIRED for rate limiting)

```bash
# Upstash Redis
UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"
```

#### Monitoring (REQUIRED)

```bash
# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."
SENTRY_ORG="your-org"
SENTRY_PROJECT="fabrk"
SENTRY_AUTH_TOKEN="..."

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
```

### Vercel-Specific Setup

1. **Create Project:**
   ```bash
   vercel
   ```

2. **Set Environment Variables:**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all required variables above
   - Set environment scope: Production, Preview, Development

3. **Add Domain:**
   - Project Settings → Domains
   - Add custom domain (yourdomain.com)
   - Configure DNS: Add CNAME record pointing to `cname.vercel-dns.com`

4. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Node.js Version: 18.x or higher

---

## Database Migration

### Pre-Migration Steps

1. **Backup Production Database:**
   ```bash
   # If using Vercel Postgres
   vercel env pull .env.production
   pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql
   ```

2. **Test Migrations Locally:**
   ```bash
   # Against a staging database
   DATABASE_URL="your-staging-db" npx prisma migrate deploy
   ```

### Deploy Migrations

```bash
# Push schema changes to production
npx prisma db push --accept-data-loss

# OR run migrations (recommended)
npx prisma migrate deploy
```

### Verify Migration

```bash
# Open Prisma Studio to verify schema
npx prisma studio
```

---

## Deployment Process

### Automated Deployment (Recommended)

**Vercel auto-deploys when you push to `main` branch:**

```bash
# 1. Final commit
git add .
git commit -m "feat: production-ready deployment"

# 2. Push to main
git push origin main

# 3. Monitor deployment
# Visit: https://vercel.com/your-org/your-project/deployments
```

### Manual Deployment

```bash
# Deploy to production
vercel --prod

# Or deploy with custom domain
vercel --prod --domains yourdomain.com
```

---

## Post-Deployment Verification

### Critical Path Testing (Do within 15 minutes)

1. **Homepage Loads:**
   ```bash
   curl -I https://yourdomain.com
   # Expected: 200 OK
   ```

2. **Auth Flow:**
   - Visit `/auth/signin`
   - Sign up with test email
   - Verify email received (if email verification enabled)
   - Log in
   - Log out

3. **Payment Flow (if enabled):**
   - Visit `/pricing`
   - Click "Purchase" button
   - Complete test purchase (use Stripe test card: 4242 4242 4242 4242)
   - Verify webhook received
   - Verify payment recorded in database

4. **API Health:**
   ```bash
   curl https://yourdomain.com/api/health
   # Expected: {"status":"ok"}
   ```

5. **Error Tracking:**
   - Go to Sentry dashboard
   - Verify no critical errors in last 15 minutes

### Smoke Tests (Do within 1 hour)

- [ ] All navigation links work
- [ ] Forms submit correctly
- [ ] Images load
- [ ] Mobile responsive
- [ ] Dark mode toggle works
- [ ] Search functionality works
- [ ] API rate limiting works (test with many requests)

### Performance Check

```bash
# Run Lighthouse audit
npx lighthouse https://yourdomain.com --view

# Minimum acceptable scores:
# - Performance: ≥ 80
# - Accessibility: ≥ 90
# - Best Practices: ≥ 90
# - SEO: ≥ 90
```

---

## Monitoring & Alerts

### Set Up Monitoring

1. **Sentry Alerts:**
   - Go to Sentry → Alerts
   - Create alert: "High error rate" (> 10 errors/minute)
   - Create alert: "New error" (notify on first occurrence)
   - Set notification channel (email, Slack, etc.)

2. **Uptime Monitoring:**
   - Use: UptimeRobot, Pingdom, or Better Uptime
   - Monitor: Homepage, /api/health, /auth/signin
   - Alert on: 5xx errors, response time > 3s, downtime > 1 min

3. **Performance Monitoring:**
   - Vercel Analytics (built-in)
   - PostHog (user behavior)
   - Sentry Performance (backend tracing)

### Critical Metrics to Track

| Metric | Threshold | Action |
|--------|-----------|--------|
| Error rate | > 1% | Investigate immediately |
| Response time (p95) | > 2s | Optimize queries |
| Uptime | < 99.9% | Check infrastructure |
| API rate limit hits | > 100/hour | Adjust limits |
| Database connections | > 80% max | Scale database |

---

## Rollback Procedure

### Quick Rollback (Vercel)

1. **Via Dashboard:**
   - Go to Vercel Dashboard → Deployments
   - Find previous stable deployment
   - Click "..." → "Promote to Production"
   - Confirm

2. **Via CLI:**
   ```bash
   # List recent deployments
   vercel list

   # Promote specific deployment
   vercel promote <deployment-url>
   ```

### Database Rollback

**⚠️ WARNING: Only if migration causes issues**

```bash
# 1. Stop all traffic (set maintenance mode)
# 2. Restore from backup
psql $DATABASE_URL < backup-YYYYMMDD-HHMMSS.sql

# 3. Revert code to previous version
git revert HEAD
git push origin main

# 4. Resume traffic
```

### Post-Rollback

- [ ] Verify site is functional
- [ ] Check error logs cleared
- [ ] Notify team of rollback
- [ ] Document what went wrong
- [ ] Create issue to fix root cause

---

## Troubleshooting

### Common Issues

#### 1. "Database connection failed"

**Symptoms:** 500 errors, "Prisma Client failed to initialize"

**Fix:**
```bash
# Verify DATABASE_URL is set
vercel env ls

# Regenerate Prisma Client
npm run db:generate

# Redeploy
vercel --prod
```

#### 2. "Environment variable not found"

**Symptoms:** Runtime errors about missing `process.env.*`

**Fix:**
```bash
# Check env vars in Vercel Dashboard
# Ensure they're set for "Production" environment
# Redeploy to pick up new variables
```

#### 3. "Webhook signature verification failed"

**Symptoms:** Payment webhooks returning 400

**Fix:**
```bash
# Update STRIPE_WEBHOOK_SECRET with production value
# Get from: Stripe Dashboard → Webhooks → [Your endpoint] → Signing secret
vercel env add STRIPE_WEBHOOK_SECRET production
```

#### 4. "Rate limit errors"

**Symptoms:** 429 errors, "Too many requests"

**Fix:**
```bash
# Verify UPSTASH_REDIS_REST_URL is set correctly
# Check Redis dashboard for connection issues
# Adjust rate limits in src/lib/rate-limit.ts if needed
```

#### 5. "Build failed"

**Symptoms:** Deployment fails during build

**Fix:**
```bash
# Check build logs in Vercel Dashboard
# Common causes:
# - TypeScript errors (run: npm run type-check)
# - Missing dependencies (check package.json)
# - Out of memory (increase Node memory in vercel.json)
```

---

## Production Checklist Summary

**Before Deploy:**
- [ ] All tests pass
- [ ] No secrets in code
- [ ] Environment variables set
- [ ] Database backed up
- [ ] Staging tested

**During Deploy:**
- [ ] Monitor build logs
- [ ] Watch for errors
- [ ] Have rollback plan ready

**After Deploy:**
- [ ] Smoke test critical paths (15 min)
- [ ] Monitor error rates (1 hour)
- [ ] Set up alerts
- [ ] Update status page
- [ ] Celebrate! 🎉

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Prisma Migrations:** https://www.prisma.io/docs/concepts/components/prisma-migrate
- **Sentry Setup:** https://docs.sentry.io/platforms/javascript/guides/nextjs/

---

**Last Updated:** December 2025
**Maintainer:** Fabrk Team
