import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import Link from 'next/link';
import {
  CheckCircle,
  DollarSign,
  Shield,
  Code,
  TestTube,
  Palette,
  AlertTriangle,
  Terminal,
} from 'lucide-react';

export const metadata = {
  title: 'AI Development Tools - Fabrk Docs',
  description:
    'Build with AI confidently. Type-safe, cost-aware, design-consistent code generation tools.',
};

export default function AIDevelopmentPage() {
  return (
    <FeatureGuideTemplate
      code="[0xDEV]"
      category="Guides"
      title="AI Development Tools"
      description="Build with AI confidently. Validate, track costs, enforce design."
      overview="Tools specifically designed for developers using AI assistants (Claude Code, Cursor, ChatGPT) to write code. Catch design inconsistencies, track API costs, enforce type safety, and scan for security vulnerabilities - all automatically."
      features={[
        {
          icon: CheckCircle,
          title: 'Code Validation',
          description:
            'Catch hardcoded colors, arbitrary values, missing types, and unsafe patterns before they reach production.',
        },
        {
          icon: DollarSign,
          title: 'Cost Tracking',
          description:
            'Monitor AI API spending in real-time. Set budgets, get alerts, and see per-feature cost breakdowns.',
        },
        {
          icon: Palette,
          title: 'Design Enforcement',
          description:
            'Ensure AI follows your design system. No more fixing hex colors or arbitrary Tailwind values.',
        },
        {
          icon: Shield,
          title: 'Security Scanning',
          description:
            'Detect SQL injection, XSS, hardcoded credentials, and other vulnerabilities automatically.',
        },
        {
          icon: Code,
          title: 'Type Safety',
          description:
            'Catch any types, missing null checks, and untyped returns. Keep AI code type-safe.',
        },
        {
          icon: TestTube,
          title: 'Testing Utilities',
          description:
            'Specialized testing patterns for AI-generated functions. Verify edge cases automatically.',
        },
      ]}
      setup={[
        {
          title: 'Run All Validations',
          description: 'The quickest way to validate AI-generated code.',
          code: `# Run all checks before deployment
npm run ai:pre-deploy

# This runs:
# 1. npm run type-check    - TypeScript
# 2. npm run lint          - ESLint
# 3. npm run ai:validate   - AI validation
# 4. npm run ai:security   - Security scan`,
          language: 'bash',
        },
        {
          title: 'Individual Checks',
          description: 'Run specific validation tools as needed.',
          code: `# Security, design, and type checks
npm run ai:validate

# AI best practices linting
npm run ai:lint

# Security vulnerability scan
npm run ai:security

# API cost analysis
npm run ai:cost-report`,
          language: 'bash',
        },
        {
          title: 'CI/CD Integration',
          description: 'Add validation to your deployment pipeline.',
          code: `# GitHub Actions
- name: AI Code Validation
  run: npm run ai:pre-deploy

# Vercel (vercel.json)
{
  "buildCommand": "npm run ai:pre-deploy && next build"
}`,
          language: 'yaml',
        },
      ]}
      usage={[
        {
          title: 'Validate Specific Files',
          description: 'Target validation on new or changed code.',
          code: `# Validate specific directory
npm run ai:validate src/app/api/

# Validate changed files only
npm run ai:validate $(git diff --name-only HEAD~1 | grep -E '\\.(ts|tsx)$')`,
          language: 'bash',
        },
        {
          title: 'Use Cost Tracking Hook',
          description: 'Display API costs in your UI.',
          code: `import { useCostTracking } from '@/hooks/use-cost-tracking';

function CostDisplay() {
  const { todaysCost, budget, percentUsed } = useCostTracking();

  return (
    <div>
      <p>Today: \${todaysCost.toFixed(2)}</p>
      <p>Budget: \${budget.toFixed(2)}</p>
      <Progress value={percentUsed} />
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Track API Costs',
          description: 'Wrap AI API calls with cost tracking.',
          code: `import { trackAICost } from '@/lib/ai/cost';

const result = await trackAICost({
  feature: 'generate-summary',
  model: 'claude-3-5-sonnet-20241022',
  fn: async (client) => {
    return client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      messages: [{ role: 'user', content: prompt }],
    });
  }
});`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'MCP Server', href: '/docs/features/mcp-server' }}
      next={{ title: 'Validation Commands', href: '/docs/guides/ai-development/validation' }}
    >
      {/* Quick Links */}
      <DocsSection title="Documentation">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/docs/guides/ai-development/validation">
            <DocsCard title="VALIDATION" className="h-full transition-all hover:border-primary">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle className="text-primary size-4" />
                <span className="text-xs font-medium">COMMANDS</span>
              </div>
              <p className="text-muted-foreground text-sm">
                All validation commands explained with examples and output formats.
              </p>
            </DocsCard>
          </Link>

          <Link href="/docs/guides/ai-development/cost-tracking">
            <DocsCard title="COST TRACKING" className="h-full transition-all hover:border-primary">
              <div className="mb-2 flex items-center gap-2">
                <DollarSign className="text-primary size-4" />
                <span className="text-xs font-medium">MONITORING</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Monitor API spending, set budgets, and view per-feature costs.
              </p>
            </DocsCard>
          </Link>

          <Link href="/docs/guides/ai-development/design-system">
            <DocsCard title="DESIGN SYSTEM" className="h-full transition-all hover:border-primary">
              <div className="mb-2 flex items-center gap-2">
                <Palette className="text-primary size-4" />
                <span className="text-xs font-medium">RULES</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Design rules AI must follow: colors, spacing, components.
              </p>
            </DocsCard>
          </Link>

          <Link href="/docs/guides/ai-development/type-safety">
            <DocsCard title="TYPE SAFETY" className="h-full transition-all hover:border-primary">
              <div className="mb-2 flex items-center gap-2">
                <Code className="text-primary size-4" />
                <span className="text-xs font-medium">PATTERNS</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Type patterns for AI-generated code. Guards, templates, validation.
              </p>
            </DocsCard>
          </Link>

          <Link href="/docs/guides/ai-development/security">
            <DocsCard title="SECURITY" className="h-full transition-all hover:border-primary">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="text-primary size-4" />
                <span className="text-xs font-medium">SCANNING</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Security scanning for SQL injection, XSS, and credentials.
              </p>
            </DocsCard>
          </Link>

          <Link href="/docs/guides/ai-development/testing">
            <DocsCard title="TESTING" className="h-full transition-all hover:border-primary">
              <div className="mb-2 flex items-center gap-2">
                <TestTube className="text-primary size-4" />
                <span className="text-xs font-medium">UTILITIES</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Testing patterns and utilities for AI-generated functions.
              </p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>

      {/* Commands Reference */}
      <DocsSection title="Commands Reference">
        <DocsCard title="ALL COMMANDS">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Command</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Exit Code</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">npm run ai:validate</td>
                  <td className="p-2">Security, design, type checks</td>
                  <td className="p-2">1 on errors</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">npm run ai:lint</td>
                  <td className="p-2">AI best practices</td>
                  <td className="p-2">1 on errors</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">npm run ai:security</td>
                  <td className="p-2">Vulnerability scanning</td>
                  <td className="p-2">1 on errors</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">npm run ai:cost-report</td>
                  <td className="p-2">Cost analysis</td>
                  <td className="p-2">Always 0</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">npm run ai:pre-deploy</td>
                  <td className="p-2">All checks combined</td>
                  <td className="p-2">1 on errors</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">npm run design:lint</td>
                  <td className="p-2">Design system check</td>
                  <td className="p-2">1 on errors</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">npm run type-check</td>
                  <td className="p-2">TypeScript compilation</td>
                  <td className="p-2">1 on errors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      {/* What Gets Checked */}
      <DocsSection title="What Gets Checked">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="SECURITY">
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <AlertTriangle className="text-destructive size-3" />
                eval() usage
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="text-destructive size-3" />
                innerHTML assignments
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="text-destructive size-3" />
                Hardcoded API keys
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="text-destructive size-3" />
                SQL injection patterns
              </li>
            </ul>
          </DocsCard>

          <DocsCard title="DESIGN SYSTEM">
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Palette className="text-primary size-3" />
                Hardcoded hex colors
              </li>
              <li className="flex items-center gap-2">
                <Palette className="text-primary size-3" />
                Tailwind palette colors
              </li>
              <li className="flex items-center gap-2">
                <Palette className="text-primary size-3" />
                Arbitrary values (p-[13px])
              </li>
              <li className="flex items-center gap-2">
                <Palette className="text-primary size-3" />
                Inline styles
              </li>
            </ul>
          </DocsCard>

          <DocsCard title="TYPE SAFETY">
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Code className="text-primary size-3" />
                any type usage
              </li>
              <li className="flex items-center gap-2">
                <Code className="text-primary size-3" />
                @ts-ignore comments
              </li>
              <li className="flex items-center gap-2">
                <Code className="text-primary size-3" />
                Non-null assertions (!)
              </li>
              <li className="flex items-center gap-2">
                <Code className="text-primary size-3" />
                Missing return types
              </li>
            </ul>
          </DocsCard>

          <DocsCard title="BEST PRACTICES">
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Terminal className="text-primary size-3" />
                Cost tracking usage
              </li>
              <li className="flex items-center gap-2">
                <Terminal className="text-primary size-3" />
                AppError for errors
              </li>
              <li className="flex items-center gap-2">
                <Terminal className="text-primary size-3" />
                API response types
              </li>
              <li className="flex items-center gap-2">
                <Terminal className="text-primary size-3" />
                Budget checks
              </li>
            </ul>
          </DocsCard>
        </div>
      </DocsSection>

      <DocsCallout variant="info" title="Exit Codes">
        All validation commands exit with code 1 if errors are found, enabling CI/CD integration.
        Warnings do not cause a non-zero exit code.
      </DocsCallout>
    </FeatureGuideTemplate>
  );
}
