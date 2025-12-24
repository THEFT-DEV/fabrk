# Alternative Deployment Options

Guide to deploying Fabrk on platforms other than Vercel (Railway, Fly.io, DigitalOcean, Render, AWS).

---

## Table of Contents

1. [Platform Comparison](#platform-comparison)
2. [Railway Deployment](#railway-deployment)
3. [Fly.io Deployment](#flyio-deployment)
4. [Render Deployment](#render-deployment)
5. [DigitalOcean App Platform](#digitalocean-app-platform)
6. [AWS (Amplify/Elastic Beanstalk)](#aws-deployment)
7. [Self-Hosted (VPS)](#self-hosted-vps)
8. [Docker Deployment](#docker-deployment)

---

## Platform Comparison

| Platform | Pricing | Ease of Use | Performance | Best For |
|----------|---------|-------------|-------------|----------|
| **Vercel** | $20/mo | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Next.js (recommended) |
| **Railway** | $5/mo + usage | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Simplicity + PostgreSQL included |
| **Fly.io** | Pay-as-you-go | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Global edge deployment |
| **Render** | $7/mo | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Zero-config deploys |
| **DigitalOcean** | $5-12/mo | ⭐⭐⭐ | ⭐⭐⭐⭐ | Cost-effective |
| **AWS Amplify** | Pay-as-you-go | ⭐⭐ | ⭐⭐⭐⭐⭐ | AWS ecosystem |
| **Self-Hosted** | $5-10/mo (VPS) | ⭐⭐ | ⭐⭐⭐ | Full control |

**Recommendation:** Stick with Vercel for best Next.js experience. Use alternatives for cost savings or specific requirements.

---

## Railway Deployment

**Pros:**
- Simple setup
- PostgreSQL included
- Automatic SSL
- Environment variables UI

**Pricing:** $5/month + usage ($0.000231/GB-hr compute)

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login

```bash
railway login
```

### Step 3: Initialize Project

```bash
# From your Fabrk directory
railway init
```

### Step 4: Add PostgreSQL

```bash
railway add postgresql
```

This creates a PostgreSQL database and sets `DATABASE_URL` environment variable.

### Step 5: Set Environment Variables

```bash
# Set variables via CLI
railway variables set NEXTAUTH_SECRET=$(openssl rand -base64 32)
railway variables set NEXTAUTH_URL=https://your-app.up.railway.app
railway variables set STRIPE_SECRET_KEY=sk_live_...
railway variables set STRIPE_WEBHOOK_SECRET=whsec_...
railway variables set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
railway variables set RESEND_API_KEY=re_...

# Or use Railway dashboard: https://railway.app/dashboard
```

### Step 6: Configure Build

Create `railway.toml`:

```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm run build"

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### Step 7: Deploy

```bash
railway up
```

Railway will:
1. Build your Next.js app
2. Run database migrations (prisma generate)
3. Deploy to production
4. Provide a URL: `https://your-app.up.railway.app`

### Step 8: Custom Domain

```bash
# Add custom domain
railway domain add fabrk.dev
```

Follow DNS instructions to point domain to Railway.

### Step 9: Configure Stripe Webhook

Update Stripe webhook URL to: `https://fabrk.dev/api/webhooks/stripe`

---

## Fly.io Deployment

**Pros:**
- Global edge deployment
- Runs Docker containers
- Low latency worldwide
- Free SSL

**Pricing:** Pay-as-you-go (~$10-20/month for small app)

### Step 1: Install Fly CLI

```bash
curl -L https://fly.io/install.sh | sh
```

### Step 2: Login

```bash
fly auth login
```

### Step 3: Launch App

```bash
fly launch
```

This will:
- Detect Next.js app
- Generate `fly.toml` configuration
- Ask for app name and region

### Step 4: Configure fly.toml

```toml
app = "fabrk"
primary_region = "sjc" # San Jose, CA (choose closest to users)

[build]
  [build.args]
    NEXT_TELEMETRY_DISABLED = "1"

[env]
  PORT = "8080"
  NODE_ENV = "production"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1

  [[http_service.http_options.response.headers]]
    name = "X-Frame-Options"
    value = "SAMEORIGIN"

[[services]]
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = 80
    force_https = true

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

[checks]
  [checks.alive]
    grace_period = "10s"
    interval = "30s"
    method = "GET"
    path = "/api/health"
    timeout = "5s"
    type = "http"
```

### Step 5: Add PostgreSQL

```bash
# Create Postgres cluster
fly postgres create

# Attach to app
fly postgres attach <postgres-app-name>
```

This sets `DATABASE_URL` environment variable.

### Step 6: Set Environment Variables

```bash
fly secrets set NEXTAUTH_SECRET=$(openssl rand -base64 32)
fly secrets set NEXTAUTH_URL=https://fabrk.fly.dev
fly secrets set STRIPE_SECRET_KEY=sk_live_...
fly secrets set STRIPE_WEBHOOK_SECRET=whsec_...
fly secrets set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
fly secrets set RESEND_API_KEY=re_...
```

### Step 7: Deploy

```bash
fly deploy
```

### Step 8: Custom Domain

```bash
# Add custom domain
fly certs create fabrk.dev

# Add DNS records (shown in output)
# A record: @ -> <fly-app-ip>
# AAAA record: @ -> <fly-app-ipv6>
```

### Step 9: Scale (Optional)

```bash
# Scale to multiple regions
fly scale count 2 --region sjc,fra

# Scale memory
fly scale memory 512
```

---

## Render Deployment

**Pros:**
- Zero-config deploys
- Free SSL
- Automatic deploys from Git
- PostgreSQL included

**Pricing:** Web service $7/month, PostgreSQL free (development) or $7/month (production)

### Step 1: Create Account

Go to [render.com](https://render.com) and sign up.

### Step 2: Create Web Service

1. Click "New +" → "Web Service"
2. Connect GitHub repository
3. Select your Fabrk repo
4. Configure:
   - **Name:** fabrk
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Starter ($7/month)

### Step 3: Add PostgreSQL

1. Click "New +" → "PostgreSQL"
2. Name: fabrk-db
3. Plan: Free (development) or Starter ($7/month)
4. Click "Create Database"
5. Copy "Internal Database URL"

### Step 4: Set Environment Variables

In Web Service settings → Environment:

```
DATABASE_URL=<internal-database-url-from-step-3>
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=https://fabrk.onrender.com
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@fabrk.dev
```

### Step 5: Deploy

Render automatically deploys on every Git push to main branch.

**Manual deploy:**
- Click "Manual Deploy" → "Deploy latest commit"

### Step 6: Custom Domain

1. Go to Settings → Custom Domain
2. Add domain: fabrk.dev
3. Add DNS records:
   - CNAME: @ → fabrk.onrender.com

### Step 7: Enable Auto-Deploy

Settings → Build & Deploy → Auto-Deploy: **Yes**

Now every push to main deploys automatically.

---

## DigitalOcean App Platform

**Pros:**
- Simple pricing
- Managed databases
- Auto-scaling
- Integrated with DO ecosystem

**Pricing:** $5-12/month (Basic plan)

### Step 1: Create Account

Go to [digitalocean.com](https://digitalocean.com) and sign up.

### Step 2: Create App

1. Click "Create" → "Apps"
2. Connect GitHub repository
3. Select Fabrk repo
4. Branch: main
5. Autodeploy: Yes

### Step 3: Configure Build

- **Build Command:** `npm run build`
- **Run Command:** `npm start`
- **HTTP Port:** 3000
- **Environment:** Node.js

### Step 4: Add Database

1. Click "Add Resource" → "Database"
2. Engine: PostgreSQL
3. Plan: Basic ($7/month)
4. Click "Add"

This adds `DATABASE_URL` to environment variables.

### Step 5: Set Environment Variables

In App Settings → "App-Level Environment Variables":

```
NEXTAUTH_SECRET=<generate-with-openssl>
NEXTAUTH_URL=https://fabrk-<random>.ondigitalocean.app
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
RESEND_API_KEY=re_...
```

### Step 6: Deploy

Click "Save" and app will deploy automatically.

### Step 7: Custom Domain

1. Settings → Domains
2. Add Domain: fabrk.dev
3. Add DNS records (shown in UI)
4. Wait for SSL certificate provisioning (automatic)

---

## AWS Deployment

**Pros:**
- Enterprise-grade
- Global CDN
- Scalable
- Integrates with AWS services

**Cons:**
- More complex setup
- Higher learning curve

**Pricing:** Pay-as-you-go (~$10-50/month)

### Option A: AWS Amplify (Easier)

**Step 1: Install Amplify CLI**

```bash
npm install -g @aws-amplify/cli
amplify configure
```

**Step 2: Initialize Amplify**

```bash
amplify init
```

**Step 3: Add Hosting**

```bash
amplify add hosting
# Choose: Amazon CloudFront and S3
```

**Step 4: Set Environment Variables**

Create `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
  environment:
    variables:
      NEXTAUTH_SECRET: <secret>
      NEXTAUTH_URL: https://fabrk.amplifyapp.com
      # ... other vars
```

**Step 5: Deploy**

```bash
amplify publish
```

### Option B: Elastic Beanstalk (More Control)

**Step 1: Install EB CLI**

```bash
pip install awsebcli
```

**Step 2: Initialize**

```bash
eb init
# Select region, create app, choose Node.js platform
```

**Step 3: Create Environment**

```bash
eb create fabrk-production
```

**Step 4: Set Environment Variables**

```bash
eb setenv NEXTAUTH_SECRET=... NEXTAUTH_URL=... STRIPE_SECRET_KEY=...
```

**Step 5: Deploy**

```bash
eb deploy
```

**Step 6: Open App**

```bash
eb open
```

---

## Self-Hosted (VPS)

**Pros:**
- Full control
- Cheapest option
- No vendor lock-in

**Cons:**
- Manual setup
- You handle security, updates, backups

**Providers:** DigitalOcean Droplet ($6/month), Linode ($5/month), Vultr ($6/month)

### Step 1: Create VPS

Create a Ubuntu 22.04 droplet/instance.

### Step 2: SSH into Server

```bash
ssh root@your-server-ip
```

### Step 3: Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Nginx
apt install -y nginx

# Install Certbot (SSL)
apt install -y certbot python3-certbot-nginx
```

### Step 4: Set Up PostgreSQL

```bash
# Switch to postgres user
su - postgres

# Create database and user
createuser fabrk_user with password 'secure_password';
createdb fabrk owned by fabrk_user;

# Exit postgres user
exit
```

### Step 5: Clone Repository

```bash
cd /var/www
git clone https://github.com/yourusername/fabrk.git
cd fabrk
npm install
```

### Step 6: Set Environment Variables

```bash
# Create .env.local
cat > .env.local <<EOF
DATABASE_URL="postgresql://fabrk_user:secure_password@localhost:5432/fabrk"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="https://fabrk.dev"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
RESEND_API_KEY="re_..."
EOF
```

### Step 7: Build Application

```bash
npm run build
```

### Step 8: Set Up PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start npm --name "fabrk" -- start

# Save PM2 config
pm2 save

# Auto-start on reboot
pm2 startup
```

### Step 9: Configure Nginx

```bash
cat > /etc/nginx/sites-available/fabrk <<EOF
server {
    listen 80;
    server_name fabrk.dev www.fabrk.dev;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/fabrk /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Step 10: Set Up SSL

```bash
certbot --nginx -d fabrk.dev -d www.fabrk.dev
```

### Step 11: Set Up Firewall

```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

### Done!

Your app is now live at https://fabrk.dev

**Maintenance commands:**

```bash
# View logs
pm2 logs fabrk

# Restart app
pm2 restart fabrk

# Update app
cd /var/www/fabrk
git pull
npm install
npm run build
pm2 restart fabrk
```

---

## Docker Deployment

**Use Case:** Self-hosted, Kubernetes, cloud-agnostic

### Step 1: Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Step 2: Update next.config.ts

```typescript
const nextConfig = {
  output: "standalone", // Important for Docker
};

export default nextConfig;
```

### Step 3: Create .dockerignore

```
node_modules
.next
.git
.env.local
npm-debug.log
README.md
.gitignore
```

### Step 4: Build Image

```bash
docker build -t fabrk:latest .
```

### Step 5: Run Container

```bash
docker run -d \
  --name fabrk \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  -e NEXTAUTH_URL="https://fabrk.dev" \
  -e STRIPE_SECRET_KEY="sk_live_..." \
  -e STRIPE_WEBHOOK_SECRET="whsec_..." \
  -e NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..." \
  -e RESEND_API_KEY="re_..." \
  fabrk:latest
```

### Step 6: Use Docker Compose (Recommended)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://fabrk:password@db:5432/fabrk
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=https://fabrk.dev
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
      - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      - RESEND_API_KEY=${RESEND_API_KEY}
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=fabrk
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=fabrk
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

**Run:**

```bash
docker-compose up -d
```

---

## Platform-Specific Tips

### Railway
- **Pro:** Easiest database setup
- **Con:** Can get expensive with high usage
- **Best for:** Quick prototypes

### Fly.io
- **Pro:** Global edge deployment
- **Con:** Slightly more complex
- **Best for:** Low-latency worldwide

### Render
- **Pro:** Zero-config, cheap
- **Con:** Slower cold starts
- **Best for:** Small to medium SaaS

### DigitalOcean
- **Pro:** Predictable pricing
- **Con:** Less advanced features
- **Best for:** Cost-conscious builders

### AWS
- **Pro:** Enterprise features
- **Con:** Complexity
- **Best for:** Large-scale, enterprise

### Self-Hosted
- **Pro:** Cheapest, full control
- **Con:** Manual maintenance
- **Best for:** Learning, custom requirements

---

## Migration from Vercel

**Switching platforms?** Here's how:

### Step 1: Export Environment Variables

```bash
# Install Vercel CLI
npm install -g vercel

# Download env vars
vercel env pull .env.production
```

### Step 2: Backup Database

```bash
# Export database
pg_dump $DATABASE_URL > backup.sql
```

### Step 3: Deploy to New Platform

Follow platform-specific guide above.

### Step 4: Import Database

```bash
# Import to new database
psql $NEW_DATABASE_URL < backup.sql
```

### Step 5: Update DNS

Point your domain to new platform.

### Step 6: Update Stripe Webhook

Update webhook URL in Stripe Dashboard.

### Step 7: Test

Verify all functionality works on new platform.

---

## Cost Comparison (Monthly)

**Small SaaS (1,000 visitors/month):**

| Platform | Cost |
|----------|------|
| Vercel Pro | $20 |
| Railway | ~$10 |
| Fly.io | ~$12 |
| Render | $14 (app + DB) |
| DigitalOcean | $12 (app + DB) |
| Self-Hosted | $6 (VPS) |

**Medium SaaS (10,000 visitors/month):**

| Platform | Cost |
|----------|------|
| Vercel Pro | $20-40 |
| Railway | ~$25 |
| Fly.io | ~$30 |
| Render | $21 (app + production DB) |
| DigitalOcean | $19 (larger app + DB) |
| Self-Hosted | $12 (larger VPS) |

---

## Recommendation

**For most users:** Stick with **Vercel** (best Next.js experience, official platform)

**For cost savings:** Try **Railway** (easiest alternative) or **Render** (cheapest)

**For global edge:** Use **Fly.io**

**For full control:** Go **self-hosted**

---

**Questions? Email support@fabrk.dev.**
