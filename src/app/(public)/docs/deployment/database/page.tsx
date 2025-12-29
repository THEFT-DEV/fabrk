import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Database, Cloud, Server, Zap } from 'lucide-react';

export const metadata = {
  title: 'Database Setup - Fabrk Docs',
  description:
    'Set up PostgreSQL for your Fabrk app. Connect to Supabase, PlanetScale, or any Postgres provider with Prisma ORM.',
};

export default function DatabaseSetupPage() {
  return (
    <FeatureGuideTemplate
      code="[0x10]"
      category="Deployment"
      title="Database Setup"
      description="Set up a production PostgreSQL database with Prisma ORM."
      overview="5 database providers supported: Supabase (recommended), Neon, Railway, PlanetScale, and AWS RDS. All use Prisma ORM with connection pooling."
      features={[
        {
          icon: Database,
          title: 'PostgreSQL',
          description: 'Full SQL database support.',
        },
        {
          icon: Cloud,
          title: 'Supabase',
          description: 'Free tier with great DX.',
        },
        { icon: Zap, title: 'Neon', description: 'Serverless with branching.' },
        {
          icon: Server,
          title: 'Railway',
          description: 'Simple and affordable.',
        },
      ]}
      setup={[
        {
          title: 'Choose Provider',
          description: 'Supabase recommended for free tier and DX',
        },
        {
          title: 'Create Project',
          description: 'Sign up and create a new database project',
        },
        {
          title: 'Get Connection String',
          description: 'Copy YOUR actual PostgreSQL connection URL from the provider',
          code: `# Go to your database provider's dashboard and copy the connection string
# Replace the example below with YOUR actual connection string

# Supabase (pooler URL recommended for serverless apps like Vercel):
DATABASE_URL="postgresql://postgres.abcdefghij:[YOUR_PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Neon (pooler URL with SSL):
DATABASE_URL="postgresql://user:password@ep-cool-name-123456-pooler.us-east-2.aws.neon.tech/dbname?sslmode=require"

# Railway (direct connection - Railway uses traditional servers):
DATABASE_URL="postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway"`,
          language: 'bash',
        },
        {
          title: 'Initialize Database',
          description: 'Create all database tables in your PostgreSQL database',
          code: `# Push schema to database (creates tables)
npm run db:push

# Expected output:
# Prisma schema loaded from prisma/schema.prisma
# Datasource "db": PostgreSQL database
#
# Your database is now in sync with your Prisma schema. Done in 2.34s
#
# What this means: Prisma created tables like User, Account, Session, Payment

# Alternative: Create a migration (for production)
npm run db:migrate -- --name init

# Seed with test data (optional - adds sample users)
npm run db:seed

# Open Prisma Studio to view your data in a GUI
npm run db:studio
# Opens http://localhost:5555 in your browser`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Supabase Setup (Recommended)',
          description: 'Step-by-step Supabase configuration',
          code: `# 1. Go to supabase.com and create an account
# 2. Click "New Project"
# 3. Set a strong database password
# 4. Choose a region close to your users
# 5. Wait for project to be ready (~2 minutes)

# Get connection string from:
# Project Settings → Database → Connection string

# Direct connection (for migrations)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# Pooler connection (for app - recommended)
DATABASE_URL="postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"`,
          language: 'bash',
        },
        {
          title: 'Neon Setup',
          description: 'Serverless PostgreSQL with branching',
          code: `# 1. Sign up at neon.tech
# 2. Create a new project
# 3. Copy the connection string

# Neon connection string
DATABASE_URL="postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require"

# Enable connection pooling
DATABASE_URL="postgresql://[user]:[password]@[endpoint]-pooler.neon.tech/[dbname]?sslmode=require"`,
          language: 'bash',
        },
        {
          title: 'Railway Setup',
          description: 'Simple deployment platform',
          code: `# 1. Sign up at railway.app
# 2. Create new project → Add PostgreSQL
# 3. Copy DATABASE_URL from Variables tab

# Railway connection string
DATABASE_URL="postgresql://postgres:[password]@[host].railway.app:5432/railway"`,
          language: 'bash',
        },
        {
          title: 'Connection Pooling Decision Tree',
          description: 'When to use pooler URL vs direct URL',
          code: `# DECISION TREE: Which database URL should I use?

# Question 1: Where is your app running?
# ├─ Serverless (Vercel, AWS Lambda, Cloudflare Workers)
# │  └─ Use POOLER URL (required to avoid connection limits)
# └─ Traditional server (DigitalOcean, Heroku, Railway container)
#    └─ Use DIRECT URL (pooler optional but still helpful)

# Question 2: What are you doing?
# ├─ Running the app (production traffic)
# │  └─ Use POOLER URL in DATABASE_URL
# └─ Running database migrations (prisma migrate deploy)
#    └─ Use DIRECT URL (pooler doesn't support migrations)

# WHY POOLING MATTERS:
# - Serverless creates a NEW database connection for EVERY request
# - PostgreSQL has a connection limit (usually 100-200 connections)
# - Without pooling, 100 simultaneous requests = 100 connections = LIMIT REACHED
# - With pooling, 1000 simultaneous requests share ~10 connections = NO PROBLEM

# SUPABASE SETUP:
# Pooler URL (for your app - use this in .env.local and Vercel):
DATABASE_URL="postgresql://postgres.abcdefghij:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct URL (for migrations only - add to .env.local):
DATABASE_URL_DIRECT="postgresql://postgres:[PASSWORD]@db.abcdefghij.supabase.co:5432/postgres"

# NEON SETUP:
# Pooler URL (for your app):
DATABASE_URL="postgresql://user:password@ep-name-123456-pooler.us-east-2.aws.neon.tech/dbname?sslmode=require"

# Direct URL (for migrations):
DATABASE_URL_DIRECT="postgresql://user:password@ep-name-123456.us-east-2.aws.neon.tech/dbname?sslmode=require"

# RAILWAY SETUP:
# Railway provides traditional server, so direct connection is fine:
DATABASE_URL="postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway"

# PRISMA SCHEMA CONFIGURATION:
# If using Supabase or Neon, add directUrl to prisma/schema.prisma:

// prisma/schema.prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")        // Pooler URL (for app)
  directUrl = env("DATABASE_URL_DIRECT") // Direct URL (for migrations)
}

# Then in .env.local, set BOTH variables`,
          language: 'bash',
        },
        {
          title: 'Prisma Schema Overview',
          description: 'Key models in prisma/schema.prisma',
          code: `// Core authentication
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  emailVerified DateTime?
  password      String?   // For credentials auth
  role          Role      @default(USER)
  sessionVersion Int      @default(1)

  // Stripe integration
  customerId       String?   @unique
  subscriptionTier String?
  trialEndsAt      DateTime?

  accounts        Account[]
  sessions        Session[]
  payments        Payment[]
  organizations   OrganizationMember[]
}

// Payments
model Payment {
  id        String   @id @default(cuid())
  userId    String
  stripeId  String   @unique
  amount    Int      // cents
  status    String   // succeeded, failed, pending
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}`,
          language: 'prisma',
        },
        {
          title: 'Database Migrations',
          description: 'Managing schema changes in production',
          code: `# Development - Quick iterations
npm run db:push  # Pushes schema changes directly

# Production - Use migrations
npm run db:migrate -- --name add_audit_logs

# This creates:
# prisma/migrations/[timestamp]_add_audit_logs/migration.sql

# Deploy migration to production
npx prisma migrate deploy

# View migration history
npx prisma migrate status

# Reset database (DANGER - deletes all data)
npm run db:reset`,
          language: 'bash',
        },
        {
          title: 'Database Backups',
          description: 'Backup strategies per provider',
          code: `# Supabase
# - Automatic daily backups (Pro plan)
# - Point-in-time recovery (Pro plan)
# - Download backups from Dashboard

# Neon
# - Automatic backups with branching
# - Create branches for testing migrations

# Manual backup with pg_dump
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql`,
          language: 'bash',
        },
      ]}
      previous={{ title: 'Environment', href: '/docs/deployment/environment' }}
      next={{ title: 'Vercel', href: '/docs/deployment/vercel' }}
    >
      {/* Database Providers */}
      <DocsSection title="Database Providers">
        <DocsCard title="PROVIDERS">
          <div className="space-y-1">
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">Supabase</code> - Free tier,
              great DX (recommended)
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">Neon</code> - Serverless
              PostgreSQL with branching
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">Railway</code> - Simple and
              affordable
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">PlanetScale</code> - MySQL
              alternative
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">AWS RDS</code> - Enterprise-grade
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Performance Tips */}
      <DocsSection title="Performance Tips">
        <DocsCard title="PERFORMANCE">
          <div className="space-y-1">
            <div>
              ├─ Add indexes - Index frequently queried columns:{' '}
              <code className="bg-muted px-1 font-mono text-xs">@@index([userId, createdAt])</code>
            </div>
            <div>├─ Use select - Only fetch needed fields</div>
            <div>├─ Batch operations - Use createMany/updateMany for multiple records</div>
            <div>└─ Enable logging - Debug slow queries</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/deployment/vercel"
            title="Deploy to Vercel"
            description="Deploy with your database configured"
          />
          <DocsLinkCard
            href="/docs/security/audit-logging"
            title="Audit Logging"
            description="Track database operations"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
