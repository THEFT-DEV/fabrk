import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';

export const metadata = {
  title: 'Validation Commands - AI Development | Fabrk Docs',
  description: 'Complete reference for all AI code validation commands.',
};

export default function ValidationPage() {
  return (
    <FeatureGuideTemplate
      code="[0xVAL]"
      category="AI Development"
      title="Validation Commands"
      description="Complete reference for all AI code validation commands."
      overview="Run validation checks to catch AI-generated code issues before they reach production. All commands exit with code 1 on errors for CI/CD integration."
      setup={[
        {
          title: 'ai:validate',
          description: 'The primary validation command. Checks security, design, and types.',
          code: `# Validate entire src directory
npm run ai:validate

# Validate specific path
npm run ai:validate src/components/

# Validate single file
npm run ai:validate src/app/api/users/route.ts`,
          language: 'bash',
        },
        {
          title: 'ai:lint',
          description: 'AI-specific best practices linting.',
          code: `npm run ai:lint

# Checks:
# - Cost tracking usage
# - API response types
# - AppError usage
# - Budget checks`,
          language: 'bash',
        },
        {
          title: 'ai:security',
          description: 'Dedicated security vulnerability scanning.',
          code: `npm run ai:security

# Checks:
# - SQL injection patterns
# - XSS vulnerabilities
# - Hardcoded credentials
# - Command injection`,
          language: 'bash',
        },
        {
          title: 'ai:pre-deploy',
          description: 'Run all checks before deployment.',
          code: `npm run ai:pre-deploy

# Runs in sequence:
# 1. npm run type-check
# 2. npm run lint
# 3. npm run ai:validate
# 4. npm run ai:security`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Output Format',
          description: 'Understanding validation output.',
          code: `src/components/example.tsx
  ERROR [security] Found eval() - security risk (no-unsafe-eval):42
  WARN  [type-safety] Avoid using "any" type (no-explicit-any):15
  INFO  [design] Consider using design token (design-token):28

─────────────────────────────────────
Summary
Files scanned: 1250
Files with issues: 12
  Errors: 3
  Warnings: 45
  Info: 120`,
          language: 'bash',
        },
        {
          title: 'Validate Changed Files',
          description: 'For faster validation in large codebases.',
          code: `# Validate only changed files
npm run ai:validate $(git diff --name-only HEAD~1 | grep -E '\\.(ts|tsx)$' | tr '\\n' ' ')`,
          language: 'bash',
        },
        {
          title: 'CI/CD Integration',
          description: 'Add to your deployment pipeline.',
          code: `# GitHub Actions
- name: AI Code Validation
  run: npm run ai:pre-deploy

# Exit codes:
# 0 = Success (or warnings only)
# 1 = Errors found`,
          language: 'yaml',
        },
      ]}
      previous={{ title: 'AI Development', href: '/docs/guides/ai-development' }}
      next={{ title: 'Cost Tracking', href: '/docs/guides/ai-development/cost-tracking' }}
    >
      <DocsSection title="What ai:validate Checks">
        <div className="grid gap-4 sm:grid-cols-3">
          <DocsCard title="SECURITY (ERRORS)">
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• eval() usage</li>
              <li>• innerHTML assignments</li>
              <li>• document.write</li>
              <li>• Hardcoded secrets</li>
            </ul>
          </DocsCard>

          <DocsCard title="DESIGN (ERRORS)">
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• Hex colors (#fff)</li>
              <li>• RGB/HSL colors</li>
              <li>• Tailwind colors (text-red-500)</li>
              <li>• Arbitrary values (p-[13px])</li>
            </ul>
          </DocsCard>

          <DocsCard title="TYPE SAFETY (WARNINGS)">
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• any type</li>
              <li>• @ts-ignore comments</li>
              <li>• Non-null assertions (!)</li>
              <li>• Missing return types</li>
            </ul>
          </DocsCard>
        </div>
      </DocsSection>

      <DocsSection title="Exclusions">
        <DocsCard title="FILES EXCLUDED FROM VALIDATION">
          <p className="text-muted-foreground mb-4 text-sm">
            These files are automatically excluded to avoid false positives:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Pattern</th>
                  <th className="p-2 text-left">Reason</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">*.test.ts, *.spec.ts</td>
                  <td className="p-2">Test files</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">*.d.ts</td>
                  <td className="p-2">Type definitions</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">*.generated.ts</td>
                  <td className="p-2">Generated files</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">src/lib/ai/validation.ts</td>
                  <td className="p-2">Validation tool itself</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">src/lib/eslint/**</td>
                  <td className="p-2">ESLint rules</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="ESLint Configuration">
        <DocsCard title="ENABLING/DISABLING RULES">
          <p className="text-muted-foreground mb-4 text-sm">
            Configure AI rules in eslint.config.mjs:
          </p>
          <pre className="bg-muted overflow-x-auto rounded p-4 text-xs">
            <code>{`// eslint.config.mjs
{
  files: ["src/app/api/**/*.ts"],
  rules: {
    "ai/no-unsafe-eval": "error",
    "ai/prefer-app-error": "warn",
    "ai/require-cost-tracking": "off", // Enable with "warn"
  },
}`}</code>
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsCallout variant="warning" title="False Positives">
        If validation flags legitimate code (chart components, theme tools), add the file to the
        exclusion list in eslint.config.mjs or use inline disable comments as a last resort.
      </DocsCallout>
    </FeatureGuideTemplate>
  );
}
