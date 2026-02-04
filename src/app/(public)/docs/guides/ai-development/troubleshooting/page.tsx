import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';

export const metadata = {
  title: 'Troubleshooting - AI Development | Fabrk Docs',
  description: 'Common issues and solutions for AI development tools.',
};

export default function TroubleshootingPage() {
  return (
    <FeatureGuideTemplate
      code="[0xTRB]"
      category="AI Development"
      title="Troubleshooting"
      description="Common issues and solutions for AI development tools."
      overview="Quick fixes for validation errors, ESLint issues, TypeScript problems, cost tracking failures, and build errors you might encounter while using the AI development tools."
      setup={[
        {
          title: 'Debug Mode',
          description: 'Run validation with verbose output.',
          code: `DEBUG=true npm run ai:validate`,
          language: 'bash',
        },
        {
          title: 'Check Versions',
          description: 'Verify your environment is correct.',
          code: `node --version  # Should be 22.x
npm --version   # Should be 10.x
npx tsc --version
npx eslint --version`,
          language: 'bash',
        },
        {
          title: 'Reset Everything',
          description: 'Nuclear option if nothing else works.',
          code: `rm -rf node_modules
rm -rf .next
rm -rf package-lock.json
npm install
npx prisma generate
npm run build`,
          language: 'bash',
        },
      ]}
      previous={{ title: 'Testing', href: '/docs/guides/ai-development/testing' }}
      next={{ title: 'AI Development', href: '/docs/guides/ai-development' }}
    >
      <DocsSection title="Validation Issues">
        <DocsCard title="MODULE NOT FOUND ERRORS">
          <p className="text-muted-foreground mb-4 text-sm">
            Running <code className="bg-muted px-1">npm run ai:validate</code> fails with module
            errors.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`# Reinstall dependencies
npm install

# Generate Prisma client (if using cost tracking)
npx prisma generate

# Clear node_modules and reinstall
rm -rf node_modules && npm install`}
          </pre>
        </DocsCard>

        <DocsCard title="FALSE POSITIVE: HARDCODED COLORS IN THEME">
          <p className="text-muted-foreground mb-4 text-sm">
            Color picker or theme components flagged for hardcoded colors.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`// eslint.config.mjs - Add exemption
{
  files: ["src/components/theme/your-component.tsx"],
  rules: {
    'design-system/no-hardcoded-colors': 'off',
  }
}`}
          </pre>
        </DocsCard>

        <DocsCard title="SLOW VALIDATION">
          <p className="text-muted-foreground mb-4 text-sm">
            <code className="bg-muted px-1">ai:validate</code> takes too long on large codebase.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`# Validate changed files only
npm run ai:validate $(git diff --name-only HEAD~1 | grep -E '\\.(ts|tsx)$' | tr '\\n' ' ')

# Or validate specific directory
npm run ai:validate src/app/api/`}
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="ESLint Issues">
        <DocsCard title="PARSING ERROR: CANNOT FIND MODULE">
          <p className="text-muted-foreground mb-4 text-sm">
            ESLint can&apos;t parse TypeScript files.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`# Ensure TypeScript ESLint is installed
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Verify tsconfig.json exists
ls tsconfig.json`}
          </pre>
        </DocsCard>

        <DocsCard title="RULE NOT FOUND: AI/NO-UNSAFE-EVAL">
          <p className="text-muted-foreground mb-4 text-sm">Custom AI rules not loading.</p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`# Verify AI rules file exists
ls src/lib/eslint/ai-rules.js

# Check eslint.config.mjs imports
# Should have: import aiRules from "./src/lib/eslint/ai-rules.js";`}
          </pre>
        </DocsCard>

        <DocsCard title="CONFLICTING ESLINT CONFIGS">
          <p className="text-muted-foreground mb-4 text-sm">
            Errors about duplicate plugins or configs.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`// eslint.config.mjs - Use sanitization for Next.js config
const sanitizePlugin = (plugin) => {
  if (!plugin || typeof plugin !== "object") return plugin;
  const { configs, ...rest } = plugin;
  return { ...rest };
};`}
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="TypeScript Issues">
        <DocsCard title="CANNOT FIND MODULE '@/...'">
          <p className="text-muted-foreground mb-4 text-sm">Path aliases not resolving.</p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
          </pre>
        </DocsCard>

        <DocsCard title="STALE .NEXT CACHE">
          <p className="text-muted-foreground mb-4 text-sm">
            TypeScript errors reference deleted files.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build`}
          </pre>
        </DocsCard>

        <DocsCard title="TYPE 'ANY' IS NOT ASSIGNABLE">
          <p className="text-muted-foreground mb-4 text-sm">
            Strict TypeScript catching AI-generated <code className="bg-muted px-1">any</code>{' '}
            types.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`// Before
const data: any = response;

// After
interface ResponseData {
  id: string;
  name: string;
}
const data: ResponseData = response;`}
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Cost Tracking Issues">
        <DocsCard title="TABLE AI_COST_EVENTS DOES NOT EXIST">
          <p className="text-muted-foreground mb-4 text-sm">
            Cost tracking database not set up.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate`}
          </pre>
        </DocsCard>

        <DocsCard title="COSTS NOT RECORDING">
          <p className="text-muted-foreground mb-4 text-sm">API calls not being tracked.</p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`// 1. Verify trackAICost is being called correctly
const result = await trackAICost({
  feature: 'my-feature',
  model: 'claude-3-5-sonnet-20241022',
  fn: async (client) => { ... }
});

// 2. Check database connection
npm run db:studio
// Verify ai_cost_events table has records`}
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Build Issues">
        <DocsCard title="BUILD FAILED AFTER FILE DELETION">
          <p className="text-muted-foreground mb-4 text-sm">Build references deleted files.</p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`# Clear all caches
rm -rf .next
rm -rf node_modules/.cache

# Rebuild
npm run build`}
          </pre>
        </DocsCard>

        <DocsCard title="PRE-COMMIT HOOK FAILING">
          <p className="text-muted-foreground mb-4 text-sm">Commits blocked by validation.</p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`# Run checks manually to see errors
npm run type-check
npm run lint

# Fix errors, then commit

# Emergency bypass (use sparingly)
git commit --no-verify`}
          </pre>
        </DocsCard>
      </DocsSection>

      {/* eslint-disable ai/no-hardcoded-colors, design-system/no-hardcoded-colors, ai/no-arbitrary-tailwind -- Documentation examples showing incorrect patterns */}
      <DocsSection title="Common Error Messages">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="HARDCODED HEX COLOR">
            <pre className="bg-muted overflow-x-auto p-2 font-mono text-xs">
              {`// Before
<div className="text-[#10b981]">

// After
<div className="text-primary">`}
            </pre>
          </DocsCard>

          <DocsCard title="ARBITRARY TAILWIND VALUE">
            <pre className="bg-muted overflow-x-auto p-2 font-mono text-xs">
              {`// Before
<div className="p-[13px]">

// After
<div className="p-3">  // 12px
<div className="p-4">  // 16px`}
            </pre>
          </DocsCard>

          <DocsCard title="EVAL() USAGE DETECTED">
            <pre className="bg-muted overflow-x-auto p-2 font-mono text-xs">
              {`// Before
const result = eval(expression);

// After
const result = JSON.parse(jsonString);`}
            </pre>
          </DocsCard>

          <DocsCard title="SQL INJECTION RISK">
            <pre className="bg-muted overflow-x-auto p-2 font-mono text-xs">
              {`// Before
const query = \`SELECT * FROM users WHERE id = '\${id}'\`;

// After
const user = await prisma.user.findUnique({ where: { id } });`}
            </pre>
          </DocsCard>
        </div>
      </DocsSection>
      {/* eslint-enable ai/no-hardcoded-colors, design-system/no-hardcoded-colors, ai/no-arbitrary-tailwind */}

      <DocsCallout variant="warning" title="Reporting Issues">
        When reporting issues, include: command that failed, full error message, Node/npm versions,
        relevant file contents, and steps to reproduce.
      </DocsCallout>
    </FeatureGuideTemplate>
  );
}
