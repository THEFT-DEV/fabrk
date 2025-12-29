import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Rocket, Globe, Lock, Layers } from 'lucide-react';

export const metadata = {
  title: 'Deploy to Vercel - Fabrk Docs',
  description:
    'Deploy your Fabrk app to Vercel with automatic SSL, CDN, and edge functions. Step-by-step guide included.',
};

export default function DeployVercelPage() {
  return (
    <FeatureGuideTemplate
      code="[0x90]"
      category="Deployment"
      title="Deploy To Vercel"
      description="Deploy your Fabrk application to Vercel with automatic SSL, CDN, and edge functions."
      overview="Complete Vercel deployment with automatic HTTPS, global CDN, preview deployments for PRs, and environment variable management."
      features={[
        {
          icon: Lock,
          title: 'Auto HTTPS',
          description: 'SSL with custom domains.',
        },
        {
          icon: Globe,
          title: 'Global CDN',
          description: 'Static assets worldwide.',
        },
        {
          icon: Layers,
          title: 'Preview URLs',
          description: 'Every PR gets a unique preview.',
        },
        {
          icon: Rocket,
          title: 'Edge Functions',
          description: 'Run middleware at the network edge.',
        },
      ]}
      setup={[
        {
          title: 'Push to GitHub',
          description: 'Your code must be in a Git repository',
        },
        {
          title: 'Connect to Vercel',
          description: 'Go to vercel.com/new and import your repository',
        },
        {
          title: 'Generate Auth Secret',
          description: 'Create a secure NEXTAUTH_SECRET before configuring Vercel',
          code: `openssl rand -base64 32

# Expected output:
# dGhpc2lzYXJhbmRvbWJhc2U2NGVuY29kZWRzdHJpbmc=
#
# Copy this output - you'll add it to Vercel in the next step`,
          language: 'bash',
        },
        {
          title: 'Configure Environment',
          description: 'Add environment variables in Vercel Dashboard',
          code: `# In Vercel Dashboard:
# 1. Go to your project → Settings → Environment Variables
#
# 2. For EACH variable below, click "Add New"
#
# 3. IMPORTANT: Select the correct environment:
#    - Production: Live site with real payments (sk_live_ keys)
#    - Preview: PR previews with test payments (sk_test_ keys)
#    - Development: Local dev (usually use .env.local instead)
#
# Recommendation: Start by adding to "Production" only

# Core (Required for Production)
DATABASE_URL="postgresql://..."  # Your production database URL
NEXTAUTH_URL="https://your-domain.vercel.app"  # Your Vercel deployment URL
NEXTAUTH_SECRET="paste-output-from-previous-step"  # The secret you just generated`,
          language: 'bash',
        },
        {
          title: 'Deploy',
          description: 'Click deploy and wait ~2 minutes',
        },
      ]}
      usage={[
        {
          title: 'One-Click Deploy',
          description: 'Fastest way to deploy',
          code: `# Add this button to your README
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/fabrk)

# Or use the Vercel CLI
npm i -g vercel
vercel

# Follow the prompts:
# 1. Link to existing project? No
# 2. Project name? your-app-name
# 3. Directory? ./
# 4. Override settings? No`,
          language: 'bash',
        },
        {
          title: 'Required Environment Variables',
          description: 'Add in Vercel Dashboard → Settings → Environment Variables',
          code: `# IMPORTANT: Select "Production" environment when adding these variables
# (You can add "Preview" environment variables later for testing)

# Core (Required)
DATABASE_URL="postgresql://..."  # Get from Supabase/Neon/Railway
NEXTAUTH_URL="https://your-domain.vercel.app"  # Your Vercel URL
NEXTAUTH_SECRET="paste-secret-from-openssl-command"  # From earlier step

# Email (Required if using email features)
RESEND_API_KEY="re_..."  # Get from https://resend.com
EMAIL_FROM="noreply@your-domain.com"  # Must be from verified domain

# Stripe (Required if accepting payments - USE LIVE KEYS FOR PRODUCTION)
STRIPE_SECRET_KEY="sk_live_..."  # LIVE key from https://dashboard.stripe.com/apikeys
STRIPE_WEBHOOK_SECRET="whsec_..."  # From Stripe webhook endpoint setup
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."  # LIVE publishable key
NEXT_PUBLIC_STRIPE_PRICE_FABRK="fabrk_purchase"  # Lookup key (NOT price_1234)

# Optional
GOOGLE_CLIENT_ID="..."  # For Google OAuth login
GOOGLE_CLIENT_SECRET="..."
NEXT_PUBLIC_APP_URL="https://your-domain.com"  # Your custom domain

# WARNING: Production uses LIVE Stripe keys (sk_live_/pk_live_)
# Preview environment should use TEST keys (sk_test_/pk_test_)`,
          language: 'bash',
        },
        {
          title: 'vercel.json Configuration',
          description: 'Optional advanced settings',
          code: `// vercel.json
{
  "buildCommand": "prisma generate && next build",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "crons": [
    { "path": "/api/cron/cleanup", "schedule": "0 0 * * *" }
  ]
}`,
          language: 'json',
        },
        {
          title: 'Custom Domain',
          description: 'Connect your custom domain',
          code: `# 1. Go to Project Settings → Domains
# 2. Add your domain (e.g., myapp.com)
# 3. Add DNS records at your registrar:

# For apex domain (myapp.com)
Type: A
Name: @
Value: 76.76.21.21

# For www subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# 4. Wait for DNS propagation (up to 48 hours)
# 5. SSL certificate is automatically provisioned`,
          language: 'bash',
        },
        {
          title: 'Stripe Webhook Setup (Production)',
          description: 'Step-by-step webhook configuration in Stripe Dashboard',
          code: `# Step 1: Open Stripe Dashboard
# Go to https://dashboard.stripe.com
# Make sure you're in LIVE mode (toggle in top left should say "Live")

# Step 2: Navigate to Webhooks
# Click "Developers" in top navigation
# Click "Webhooks" in the sidebar
# Click "+ Add endpoint" button

# Step 3: Enter your webhook URL
# Endpoint URL: https://your-domain.vercel.app/api/webhooks/stripe
# (Replace your-domain.vercel.app with your actual Vercel URL)

# Step 4: Select events to listen for
# Click "Select events"
# Search for and select these events:
#   ✓ checkout.session.completed
#   ✓ customer.subscription.created
#   ✓ customer.subscription.updated
#   ✓ customer.subscription.deleted
#   ✓ invoice.paid
#   ✓ invoice.payment_failed

# Step 5: Click "Add endpoint"

# Step 6: Copy the webhook signing secret
# After creating, click on your new webhook endpoint
# Find "Signing secret" section
# Click "Reveal" and copy the value (starts with whsec_)

# Step 7: Add to Vercel
# In Vercel: Settings → Environment Variables
# Name: STRIPE_WEBHOOK_SECRET
# Value: whsec_... (paste the signing secret)
# Environment: Production
# Click "Save"

# Step 8: Redeploy
# Go to Deployments tab → Click "..." on latest deployment → "Redeploy"
# This ensures the new STRIPE_WEBHOOK_SECRET is loaded`,
          language: 'bash',
        },
        {
          title: 'Preview Deployments',
          description: 'Every pull request gets a unique preview URL for testing',
          code: `# What are preview deployments?
# When you create a pull request on GitHub, Vercel automatically:
# 1. Builds your code
# 2. Deploys to a temporary URL
# 3. Adds a comment to the PR with the preview link

# Preview URL format:
# https://your-project-git-branch-name-your-team.vercel.app

# Example:
# https://fabrk-git-feature-auth-acme.vercel.app

# Configure preview environment variables:
# 1. Go to Vercel Dashboard → Settings → Environment Variables
# 2. Click "Add New"
# 3. IMPORTANT: Select "Preview" environment (NOT Production)

# Use TEST Stripe keys for previews (never use live keys):
STRIPE_SECRET_KEY="sk_test_..."  # Test mode only
STRIPE_WEBHOOK_SECRET="whsec_test_..."  # From local stripe listen
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Why separate keys?
# - Preview deployments are for testing - you don't want real charges
# - Use test credit cards (4242 4242 4242 4242) in preview
# - Production uses live keys for real payments`,
          language: 'bash',
        },
      ]}
      previous={{ title: 'Database', href: '/docs/deployment/database' }}
      next={{ title: 'Environment', href: '/docs/deployment/environment' }}
    >
      {/* What You Get */}
      <DocsSection title="What You Get">
        <DocsCard title="FEATURES">
          <div className="space-y-1">
            <div>├─ Automatic HTTPS with custom domains</div>
            <div>├─ Global CDN for static assets</div>
            <div>├─ Edge functions for middleware</div>
            <div>├─ Preview deployments for PRs</div>
            <div>├─ Environment variable management</div>
            <div>└─ Web analytics and monitoring</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Troubleshooting */}
      <DocsSection title="Troubleshooting">
        <DocsCard title="TROUBLESHOOTING">
          <div className="space-y-4">
            <div>
              <p className="mb-4">
                <strong>Build Fails with Prisma Error:</strong>
              </p>
              <p>
                Add <code className="bg-muted px-1">prisma generate</code> to build command in
                package.json
              </p>
            </div>
            <div>
              <p className="mb-4">
                <strong>Environment Variables Not Working:</strong>
              </p>
              <p>
                1. Check correct environment (Prod/Preview/Dev)
                <br />
                2. Client-side vars need NEXT_PUBLIC_ prefix
                <br />
                3. Redeploy after adding variables
              </p>
            </div>
            <div>
              <p className="mb-4">
                <strong>Database Connection Timeout:</strong>
              </p>
              <p>Use connection pooling (Supabase Pooler or PgBouncer)</p>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/deployment/environment"
            title="Environment Variables"
            description="Complete environment setup guide"
          />
          <DocsLinkCard
            href="/docs/deployment/database"
            title="Database Setup"
            description="Set up production PostgreSQL"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
