import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Rocket, User, CreditCard, Mail, Database, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export const metadata = {
  title: 'Getting Started - Fabrk Docs',
  description:
    'Set up your Fabrk SaaS boilerplate in minutes. Install dependencies, configure environment variables, and launch your first app.',
};

export default function GettingStartedPage() {
  return (
    <FeatureGuideTemplate
      code="[0x00]"
      category="Docs"
      title="Getting Started"
      description="Everything you need to launch your SaaS, from first download to first customer."
      overview="Fabrk is a ready-to-use foundation for building software businesses. Includes user accounts, payments, email, database, security, and landing page - all working on day one."
      features={[
        {
          icon: User,
          title: 'User Accounts',
          description: 'Sign up, login, password reset.',
        },
        {
          icon: CreditCard,
          title: 'Payments',
          description: 'Stripe subscriptions ready.',
        },
        {
          icon: Mail,
          title: 'Email',
          description: 'Resend transactional emails.',
        },
        {
          icon: Database,
          title: 'Database',
          description: 'PostgreSQL with Prisma ORM.',
        },
        {
          icon: Shield,
          title: 'Security',
          description: '2FA, CSRF, secure sessions.',
        },
        {
          icon: Rocket,
          title: 'Landing Page',
          description: 'Hero, pricing, FAQ included.',
        },
      ]}
      setup={[
        {
          title: 'Check Your System',
          description: 'Ensure Node.js v18.17+ is installed',
          code: `node --version

# Expected output:
# v20.11.0
# (or v18.17.0 or higher)
#
# What this means: Shows which version of Node.js you have installed
# If you see 'command not found', install Node.js from nodejs.org`,
          language: 'bash',
        },
        {
          title: 'Download Fabrk',
          description: 'Clone your purchased repository to your computer',
          code: `# Replace YOUR-USERNAME with your actual GitHub username
git clone https://github.com/YOUR-USERNAME/fabrk.git my-saas
cd my-saas

# Expected output:
# Cloning into 'my-saas'...
# remote: Enumerating objects: 234, done.
# remote: Counting objects: 100% (234/234), done.
# Receiving objects: 100% (234/234), 4.56 MiB | 2.12 MiB/s, done.
#
# What this means: Git is downloading all project files to a folder called 'my-saas'`,
          language: 'bash',
        },
        {
          title: 'Install Dependencies',
          description: 'Download all required libraries (takes 1-2 minutes)',
          code: `npm install --legacy-peer-deps

# Expected output:
# added 342 packages, and audited 343 packages in 45s
# 89 packages are looking for funding
#   run \`npm fund\` for details
# found 0 vulnerabilities
#
# What this means: npm downloaded all the code libraries your app needs
# This only needs to run once, unless you add new libraries later`,
          language: 'bash',
        },
        {
          title: 'Create Config File',
          description: 'Create your private settings file',
          code: `cp .env.example .env.local`,
          language: 'bash',
        },
        {
          title: 'Setup Database',
          description: 'Add your actual PostgreSQL connection string to .env.local',
          code: `# Choose a database provider (see step 8 for recommendations)
# Then copy YOUR actual connection string from the provider's dashboard

# Supabase example (pooler URL recommended for serverless):
DATABASE_URL="postgresql://postgres.abcdefghij:[YOUR_PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Neon example (pooler URL with SSL):
DATABASE_URL="postgresql://user:password@ep-cool-name-123456-pooler.us-east-2.aws.neon.tech/dbname?sslmode=require"

# Railway example (direct connection):
DATABASE_URL="postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway"

# Replace the example above with YOUR actual connection string from your database provider`,
          language: 'bash',
        },
        {
          title: 'Generate Secret Key',
          description: 'Create a secure random string for authentication (minimum 32 characters)',
          code: `openssl rand -base64 32

# Expected output:
# dGhpc2lzYXJhbmRvbWJhc2U2NGVuY29kZWRzdHJpbmc=
#
# What this means: This creates a cryptographically secure random string
# Copy this ENTIRE output - you'll paste it as NEXTAUTH_SECRET in the next step`,
          language: 'bash',
        },
        {
          title: 'Configure Settings',
          description: 'Add required environment variables to .env.local',
          code: `# Open .env.local and add these three required variables:

DATABASE_URL="postgresql://..."  # Your actual database URL from step 5
NEXTAUTH_URL="http://localhost:3000"  # Your app URL (localhost for development)
NEXTAUTH_SECRET="paste-output-from-previous-step-here"  # The random string you just generated

# NEXTAUTH_SECRET is used to encrypt session cookies
# Never share this value or commit it to git`,
          language: 'bash',
        },
        {
          title: 'Initialize Database',
          description: 'Create all the database tables your app needs',
          code: `npm run db:push

# Expected output:
# Prisma schema loaded from prisma/schema.prisma
# Datasource "db": PostgreSQL database
#
# Your database is now in sync with your Prisma schema. Done in 2.34s
#
# What this means: Prisma just created tables like User, Account, Session in your database
# Your database is now ready to store user accounts and data`,
          language: 'bash',
        },
        {
          title: 'Start Your App',
          description: 'Launch the development server and open your app in a browser',
          code: `npm run dev

# Expected output:
#   ▲ Next.js 15.1.3
#   - Local:        http://localhost:3000
#   - Environments: .env.local
#
#  ✓ Starting...
#  ✓ Ready in 2.3s
#
# What this means: Your app is now running!
# Open http://localhost:3000 in your web browser to see it
# Press Ctrl+C to stop the server when you're done`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Quick Start (5 min)',
          description: "Already familiar with Next.js? Here's the fastest path to get running",
          code: `# Clone, install, configure (replace YOUR-USERNAME with your GitHub username)
git clone https://github.com/YOUR-USERNAME/fabrk.git my-saas
cd my-saas && npm install
cp .env.example .env.local

# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Add these to .env.local:
# - DATABASE_URL (get from Supabase/Neon/Railway)
# - NEXTAUTH_SECRET (paste output from openssl command above)
# - NEXTAUTH_URL="http://localhost:3000"

# Then initialize database and start
npm run db:push && npm run dev

# Open http://localhost:3000 in your browser`,
          language: 'bash',
        },
        {
          title: 'Generate Secret',
          description: 'Create a secure NEXTAUTH_SECRET for encrypting sessions',
          code: `openssl rand -base64 32

# Expected output:
# dGhpc2lzYXJhbmRvbWJhc2U2NGVuY29kZWRzdHJpbmc=
#
# Copy this entire string and add it to .env.local as:
# NEXTAUTH_SECRET="paste-the-output-here"`,
          language: 'bash',
        },
        {
          title: 'Database Providers',
          description: 'Choose a PostgreSQL database provider',
          code: `# Recommended: Supabase (supabase.com)
# - Free tier: 500 MB database, 1 GB file storage
# - Built-in connection pooling (important for serverless)
# - Extra features: Auth, Storage, Realtime
# - Best for: Most projects

# Alternative: Neon (neon.tech)
# - Free tier: 0.5 GB storage
# - Serverless with instant branching
# - Great connection pooling
# - Best for: Developers who want database branches for testing

# Alternative: Railway (railway.app)
# - No free tier, but $5/month gets you started
# - Traditional PostgreSQL instance
# - Best for: Those who prefer simple pricing

# Not recommended: PlanetScale (MySQL, not PostgreSQL)`,
          language: 'bash',
        },
      ]}
      previous={{ title: 'Docs', href: '/docs' }}
      next={{ title: 'Architecture', href: '/docs/architecture' }}
    >
      {/* What is Fabrk */}
      <DocsSection title="What Is Fabrk?">
        <DocsCard code="10" title="OVERVIEW">
          <p className="mb-4">
            Fabrk is a ready-to-use foundation for building software businesses. Think of it like
            buying a house that already has the plumbing, electrical, and HVAC installed - you just
            need to decorate and move in.
          </p>
          <p>
            Instead of spending months building user accounts, payment processing, and email systems
            from scratch, Fabrk gives you all of that working on day one. You can focus on what
            makes your product unique.
          </p>
        </DocsCard>
      </DocsSection>

      {/* Who is this for */}
      <DocsSection title="Who Is This For?">
        <div className="grid gap-6 sm:grid-cols-2">
          <DocsCard code="20" title="GREAT FIT">
            <div className="space-y-1">
              <div>├─ Developers building their first SaaS</div>
              <div>├─ Founders who can code</div>
              <div>├─ Agencies building client projects</div>
              <div>└─ Anyone who values shipping fast</div>
            </div>
          </DocsCard>
          <DocsCard code="21" title="REQUIREMENTS">
            <div className="space-y-1">
              <div>├─ Basic JavaScript/TypeScript</div>
              <div>├─ Familiarity with React</div>
              <div>├─ Node.js installed</div>
              <div>└─ ~30 minutes for setup</div>
            </div>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Troubleshooting */}
      <DocsSection title="Troubleshooting">
        <DocsCard code="30" title="COMMON ERRORS">
          <div className="space-y-4">
            <div>
              <p className={cn('mb-1 font-semibold', mode.color.text.primary)}>
                [ERROR]: PORT 3000 IN USE
              </p>
              <p>
                Run on different port:{' '}
                <code className={cn('px-1', mode.color.bg.muted)}>npm run dev -- -p 3001</code>
              </p>
            </div>
            <div>
              <p className={cn('mb-1 font-semibold', mode.color.text.primary)}>
                [ERROR]: CANNOT CONNECT DATABASE
              </p>
              <p>
                Check DATABASE_URL in .env.local, ensure no extra spaces, database is running, IP
                allowed
              </p>
            </div>
            <div>
              <p className={cn('mb-1 font-semibold', mode.color.text.primary)}>
                [ERROR]: NEXTAUTH SECRET MISSING
              </p>
              <p>
                Generate with:{' '}
                <code className={cn('px-1', mode.color.bg.muted)}>openssl rand -base64 32</code>
              </p>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Optional Features */}
      <DocsSection title="Optional Features">
        <div className="grid gap-6 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/features/payments"
            title="Payments"
            description="Accept credit cards via Stripe"
          />
          <DocsLinkCard
            href="/docs/features/emails"
            title="Email"
            description="Send transactional emails"
          />
          <DocsLinkCard
            href="/docs/tutorials/authentication"
            title="Google Login"
            description="Sign in with Google"
          />
          <DocsLinkCard
            href="/docs/features/cloud-storage"
            title="File Storage"
            description="Upload files to cloud"
          />
          <DocsLinkCard
            href="/docs/features/ai-integration"
            title="AI Integration"
            description="Chat, text tools, image gen, voice, & credits"
          />
        </div>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-6 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/tutorials/quick-start"
            title="Quick Start Tutorial"
            description="Build your first feature in 10 min"
          />
          <DocsLinkCard
            href="/docs/architecture"
            title="Architecture"
            description="Learn how the pieces fit together"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
