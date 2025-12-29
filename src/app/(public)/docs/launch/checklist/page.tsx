import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Code, CreditCard, Megaphone, Rocket } from 'lucide-react';

export const metadata = {
  title: 'Launch Checklist - Fabrk Docs',
  description:
    'Ensure your Fabrk app is production-ready. Complete pre-launch checklist for code, payments, and marketing.',
};

export default function LaunchChecklistPage() {
  return (
    <FeatureGuideTemplate
      code="[0xA0]"
      category="Launch"
      title="Launch Checklist"
      description="A comprehensive guide to ensuring your Fabrk application is production-ready."
      overview="5-phase launch process: pre-launch verification, Stripe setup, marketing assets, launch day execution, and post-launch monitoring."
      features={[
        {
          icon: Code,
          title: 'Code Quality',
          description: 'TypeScript, linting, security.',
        },
        {
          icon: CreditCard,
          title: 'Stripe Setup',
          description: 'Products, webhooks, coupons.',
        },
        {
          icon: Megaphone,
          title: 'Marketing',
          description: 'Videos, demos, social proof.',
        },
        {
          icon: Rocket,
          title: 'Launch Day',
          description: 'Distribution, announcements.',
        },
      ]}
      setup={[
        {
          title: 'Resolve TODOs',
          description: 'Search for TODO or FIXME in src/ and resolve them',
          code: `grep -r "TODO" src/`,
          language: 'bash',
        },
        {
          title: 'Verify Types',
          description: 'Ensure no TypeScript errors',
          code: `npm run type-check`,
          language: 'bash',
        },
        {
          title: 'Run Linting',
          description: 'Catch potential issues',
          code: `npm run lint`,
          language: 'bash',
        },
        {
          title: 'Check Dependencies',
          description: 'Audit for security vulnerabilities',
          code: `npm audit`,
          language: 'bash',
        },
        {
          title: 'Build Locally',
          description: 'Verify production build succeeds',
          code: `npm run build`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Useful Commands',
          description: 'Pre-launch verification commands',
          code: `# Run full test suite
npm run test:all

# Check for TODOs
grep -r "TODO" src/

# Verify build
npm run build

# Check types
npm run type-check`,
          language: 'bash',
        },
      ]}
      previous={{ title: 'Theming', href: '/docs/extras/theming' }}
      next={{ title: 'Getting Started', href: '/docs/getting-started' }}
    >
      {/* Phase 1: Pre-Launch */}
      <DocsSection title="Phase 1: Pre-Launch Verification">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="CODE QUALITY">
            <div className="space-y-1">
              <div>├─ Resolve all TODO/FIXME comments</div>
              <div>├─ Replace placeholders in src/config.js</div>
              <div>├─ Run npm run type-check</div>
              <div>├─ Run npm run lint</div>
              <div>├─ Run npm audit</div>
              <div>└─ Verify npm run build succeeds</div>
            </div>
          </DocsCard>
          <DocsCard title="LEGAL BUSINESS">
            <div className="space-y-1">
              <div>├─ Prices match Stripe dashboard</div>
              <div>├─ Support email is active</div>
              <div>└─ Terms of Service & Privacy Policy accessible</div>
            </div>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Phase 2: Stripe */}
      <DocsSection title="Phase 2: Stripe & Payments Setup">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="PRODUCT CONFIG">
            <div className="space-y-1">
              <div>├─ Create products in Stripe (Test & Prod)</div>
              <div>├─ Copy Price IDs to .env</div>
              <div>└─ Create coupons if needed (e.g., EARLYBIRD)</div>
            </div>
          </DocsCard>
          <DocsCard title="WEBHOOK CONFIG">
            <div className="space-y-1">
              <div>├─ Add endpoint: /api/stripe/webhook</div>
              <div>├─ Select events: checkout.session.completed, etc.</div>
              <div>└─ Copy Signing Secret to STRIPE_WEBHOOK_SECRET</div>
            </div>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Phase 3: Marketing */}
      <DocsSection title="Phase 3: Marketing Assets">
        <DocsCard title="MARKETING">
          <div className="space-y-1">
            <div>
              ├─ <strong>The Pitch:</strong> 30-60s video for social media
            </div>
            <div>
              ├─ <strong>The Walkthrough:</strong> 3-5 min demo for docs/landing page
            </div>
            <div>
              └─ <strong>Social Proof:</strong> Initial testimonials or beta feedback
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Phase 4: Launch Day */}
      <DocsSection title="Phase 4: Launch Day Execution">
        <DocsCard title="LAUNCH DAY">
          <div className="space-y-1">
            <div>
              ├─ <strong>Distribution:</strong> Verify GitHub invite system or app deployment
            </div>
            <div>
              ├─ <strong>Announcement:</strong> Schedule Product Hunt, Twitter/X, LinkedIn
            </div>
            <div>
              └─ <strong>Community:</strong> Post in Discord servers and subreddits
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Phase 5: Post-Launch */}
      <DocsSection title="Phase 5: Post-Launch Monitoring">
        <DocsCard title="POST LAUNCH">
          <div className="space-y-1">
            <div>
              ├─ <strong>Support:</strong> Monitor support email for 48 hours
            </div>
            <div>
              ├─ <strong>Stripe:</strong> Watch for failed payments or disputes
            </div>
            <div>
              └─ <strong>Errors:</strong> Check Vercel logs or Sentry for exceptions
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/deployment/vercel"
            title="Deploy to Vercel"
            description="Production deployment guide"
          />
          <DocsLinkCard
            href="/docs/tutorials/stripe-payments"
            title="Stripe Payments"
            description="Full Stripe integration guide"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
