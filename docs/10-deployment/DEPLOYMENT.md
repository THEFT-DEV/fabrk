# Deployment Guide

Deploy Fabrk to production in under 15 minutes.

---

## Overview

This guide covers deploying to **Vercel** (recommended), but Fabrk works on any Node.js hosting platform (Railway, Render, Fly.io, etc.).

**Before Deployment:** If you haven't already, run `npm run setup` locally to configure your stack. The setup wizard generates `.env.local` with all required variables.

**What you'll deploy:**
- Next.js 16 app on Vercel
- PostgreSQL database (Neon/Supabase/Railway/Vercel Postgres)
- Payment webhooks (Stripe, Polar.sh, or Lemonsqueezy)
- Transactional emails (Resend, Postmark, or SendGrid)
- 18 terminal themes (OKLCH color system)

---

## Prerequisites

- [x] Fabrk working locally (see [QUICK-START.md](./QUICK-START.md))
- [x] GitHub account
- [x] Vercel account ([Sign up free](https://vercel.com/signup))
- [x] Production database ready (Supabase/Railway recommended)
- [x] Domain name (optional, but recommended)

---

## Step 1: Prepare Your Code

### 1.1 Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create a new GitHub repository
# Then push your code:
git remote add origin https://github.com/yourusername/your-saas.git
git branch -M main
git push -u origin main
```

### 1.2 Update Configuration

Edit `src/config.js` with your production values:

```javascript
app: {
  name: "Your SaaS Name",
  description: "Your SaaS description",
  url: "https://yoursaas.com", // Your production domain
  author: "Your Name",
  supportEmail: "support@yoursaas.com",
},
```

---

## Step 2: Setup Production Database

Choose one of these options:

### Option A: Supabase (Recommended - Free 500MB)

1. Go to [database.new](https://database.new)
2. Create a new project (use a strong password!)
3. Wait 2-3 minutes for provisioning
4. Go to **Settings** → **Database**
5. Copy the **Connection String** (URI format, Session mode)
6. Format: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres`

**Important:** Use Session mode pooling, not Transaction mode.

### Option B: Railway (Free $5/month credit)

1. Go to [railway.app](https://railway.app/)
2. Click "New Project" → "Provision PostgreSQL"
3. Click the PostgreSQL service → "Variables"
4. Copy the `DATABASE_URL`

### Option C: Vercel Postgres (Paid - $0.01/GB after free tier)

1. In your Vercel project, go to "Storage" tab
2. Click "Create Database" → "Postgres"
3. Follow setup wizard
4. Connection string will be automatically added to your environment variables

---

## Step 3: Deploy to Vercel

### 3.1 Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Import"

### 3.2 Configure Environment Variables

In the Vercel deployment page, add these environment variables:

**Click "Environment Variables" and add:**

```env
# Database
DATABASE_URL=postgresql://your-production-db-url-here

# NextAuth
NEXTAUTH_URL=https://yoursaas.com
NEXTAUTH_SECRET=generate-new-secret-with-openssl-rand-base64-32

# Stripe
STRIPE_SECRET_KEY=sk_live_... # USE LIVE KEY, NOT TEST
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... # (will set after deployment)

# Resend
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yoursaas.com

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Critical:** Use **LIVE** Stripe keys for production, not test keys!

### 3.3 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Vercel will build and deploy your app

**Expected output:**
```
✓ Building application
✓ Generating static pages
✓ Deployment complete
```

---

## Step 4: Initialize Production Database

After deployment completes:

1. In Vercel, go to your project → "Deployments"
2. Click the latest deployment → "..." → "Redeploy"
3. Check "Skip build cache"

**OR** run locally connected to production DB:

```bash
# Use production DATABASE_URL
DATABASE_URL="your-production-db-url" npx prisma db push
```

**Verify:**
```bash
# Open Prisma Studio connected to production
DATABASE_URL="your-production-db-url" npx prisma studio
```

---

## Step 5: Configure Stripe Webhooks

### 5.1 Create Webhook Endpoint

1. Go to [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yoursaas.com/api/webhooks/stripe`
4. **Important:** Toggle off "Test mode" (you want live webhooks)

### 5.2 Select Events

Select these events:
- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `customer.subscription.created` (if using subscriptions)
- `customer.subscription.updated` (if using subscriptions)
- `customer.subscription.deleted` (if using subscriptions)

### 5.3 Get Webhook Secret

1. After creating the endpoint, click "Reveal" under "Signing secret"
2. Copy the secret (starts with `whsec_`)
3. In Vercel, add environment variable:
   - Name: `STRIPE_WEBHOOK_SECRET`
   - Value: `whsec_...`
4. Click "Save"
5. Redeploy your app (Vercel → Deployments → Redeploy)

---

## Step 6: Configure Google OAuth (Optional)

If you're using Google OAuth:

1. Go to [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
2. Click your OAuth 2.0 Client ID
3. Under "Authorized redirect URIs", add:
   - `https://yoursaas.com/api/auth/callback/google`
4. Click "Save"

---

## Step 7: Configure Email Domain

### Option A: Use Resend with your domain (Recommended)

1. In Resend dashboard, click "Domains"
2. Click "Add Domain"
3. Enter your domain: `yoursaas.com`
4. Add the DNS records Resend provides to your domain registrar:
   - TXT record for verification
   - MX records for receiving
   - DKIM records for authentication

**DNS records example (add these in your domain registrar):**
```
Type: TXT
Name: @ (or leave blank)
Value: resend-verification=abc123...

Type: MX
Name: @ (or leave blank)
Value: mx1.resend.com
Priority: 10

Type: TXT
Name: resend._domainkey
Value: v=DKIM1; k=rsa; p=MIGfMA0G...
```

5. Wait 5-60 minutes for DNS propagation
6. Click "Verify" in Resend dashboard

### Option B: Use Resend's default domain (Quick start)

No setup needed! Emails will be sent from `noreply@resend.dev` until you configure your own domain.

---

## Step 8: Post-Deployment Checklist

### Test Everything:

- [ ] Visit your production URL (`https://yoursaas.com`)
- [ ] Register a new account
- [ ] Verify email works (check spam folder)
- [ ] Log in
- [ ] Test password reset
- [ ] Make a test purchase with Stripe (use real card in test mode first)
- [ ] Verify webhook fires (check Stripe dashboard → Webhooks → Events)
- [ ] Check database for new payment record
- [ ] Verify welcome email sent

### Security Checklist:

- [ ] All environment variables set in Vercel (not exposed in code)
- [ ] Using live Stripe keys (not test keys)
- [ ] NEXTAUTH_SECRET is unique and secure (not from .env.example)
- [ ] Database connection uses SSL (Supabase/Railway do this by default)
- [ ] No API keys committed to Git
- [ ] Webhook signature verification working (check logs)

---

## Step 9: Setup Custom Domain (Optional)

### 9.1 Add Domain in Vercel

1. In Vercel project, go to **Settings** → **Domains**
2. Enter your domain: `yoursaas.com`
3. Click "Add"

### 9.2 Configure DNS

Vercel will show you DNS records to add. Two options:

**Option A: Use Vercel nameservers (easiest)**
- Point your domain's nameservers to Vercel
- Vercel manages all DNS automatically

**Option B: Use A/CNAME records**
Add these records in your domain registrar:

```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 9.3 Wait for DNS Propagation

- Usually 5-60 minutes
- Check status: [dnschecker.org](https://dnschecker.org/)
- Vercel will auto-provision SSL certificate

### 9.4 Update Environment Variables

After domain is active:

1. In Vercel → Settings → Environment Variables
2. Update `NEXTAUTH_URL` to `https://yoursaas.com`
3. Update `NEXT_PUBLIC_APP_URL` to `https://yoursaas.com`
4. Redeploy

---

## Monitoring & Maintenance

### Check Logs

**Vercel Logs:**
- Go to project → "Logs" tab
- See real-time requests and errors

**Database Logs:**
- Supabase: Project → Logs
- Railway: Service → Logs

### Monitor Stripe

- Dashboard → Payments (see all transactions)
- Dashboard → Webhooks → Events (see webhook deliveries)

### Monitor Emails

- Resend → Logs (see all sent emails)
- Resend → Analytics (email open rates, etc.)

---

## Scaling Considerations

### When you outgrow free tiers:

**Database:**
- Supabase: Upgrade to Pro ($25/mo) for more storage/connections
- Railway: Add credits for resource usage
- Or migrate to managed Postgres (AWS RDS, DigitalOcean, etc.)

**Vercel:**
- Free tier: Unlimited deployments, 100GB bandwidth
- Pro ($20/mo): More bandwidth, analytics, better support

**Resend:**
- Free tier: 100 emails/day, 3,000/month
- Paid ($20/mo): 50,000 emails/month

---

## Rollback in Case of Issues

### Revert to Previous Deployment

1. Go to Vercel → Deployments
2. Find working deployment
3. Click "..." → "Promote to Production"

### Database Rollback

**Important:** Prisma uses `db push` (no migrations by default).

To rollback:
1. Keep backups of your `schema.prisma` file
2. Use `prisma db push` with the old schema
3. Or restore from database backup (set up automated backups!)

**Enable backups:**
- Supabase: Automatic daily backups (7-day retention on free tier)
- Railway: Automatic snapshots
- Or use `pg_dump` for manual backups

---

## Troubleshooting

### Deployment fails
```
Error: Build failed
```
**Solution:** Check Vercel build logs for specific error. Common issues:
- TypeScript errors (run `npm run type-check` locally first)
- Missing environment variables
- Prisma client not generated (check build command includes `prisma generate`)

### Database connection errors in production
```
Error: Can't reach database server
```
**Solution:**
- Check `DATABASE_URL` is correct in Vercel env vars
- Verify database is running (check Supabase/Railway dashboard)
- Check if database allows connections from Vercel IPs (usually automatic)

### Stripe webhooks not working
```
No webhook events received
```
**Solution:**
- Check webhook URL is correct: `https://yoursaas.com/api/webhooks/stripe`
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Check Stripe dashboard → Webhooks → Events for failed deliveries
- Ensure you're using **live** webhook secret, not test

### Emails not sending
```
Resend error: Domain not verified
```
**Solution:**
- Verify domain in Resend dashboard
- Check DNS records are correct
- Wait for DNS propagation (up to 24 hours, usually faster)
- For testing, use Resend's default domain first

---

## Need Help?

- **Email:** [support@fabrk.dev](mailto:support@fabrk.dev)
- **Docs:** Check [CLAUDE.md](../CLAUDE.md) for architecture details

---

**Congratulations!** 🎉 Your SaaS is now live in production. Time to ship your features and get customers!
