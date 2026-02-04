#!/usr/bin/env npx tsx
/**
 * AI-Specific Linting CLI
 *
 * Checks for AI development best practices:
 * - Cost tracking usage
 * - Error handling patterns
 * - Type utilities usage
 *
 * Usage:
 *   npm run ai:lint                    # Lint all src files
 *   npm run ai:lint src/app/api/       # Lint specific directory
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface LintIssue {
  rule: string;
  message: string;
  suggestion: string;
  severity: 'error' | 'warning' | 'info';
  line?: number;
}

interface LintResult {
  file: string;
  issues: LintIssue[];
}

// AI-specific lint rules
const AI_LINT_RULES = [
  {
    name: 'use-cost-tracking',
    description: 'AI API calls should use cost tracking',
    check: (code: string, filePath: string): LintIssue[] => {
      const issues: LintIssue[] = [];

      // Check for direct Anthropic/OpenAI calls without tracking
      const hasAnthropicCall = /anthropic\.(messages|completions)\.create/g.test(code);
      const hasOpenAICall = /openai\.(chat\.completions|completions|embeddings)\.create/g.test(code);
      const hasCostTracking = /getCostTracker|trackClaudeCall|trackOpenAICall/g.test(code);

      if ((hasAnthropicCall || hasOpenAICall) && !hasCostTracking) {
        issues.push({
          rule: 'use-cost-tracking',
          message: 'AI API calls should be wrapped with cost tracking',
          suggestion: 'Import getCostTracker from @/lib/ai/cost and use trackClaudeCall or trackOpenAICall',
          severity: 'warning',
        });
      }

      return issues;
    },
  },
  {
    name: 'use-api-response-type',
    description: 'API routes should return typed responses',
    check: (code: string, filePath: string): LintIssue[] => {
      const issues: LintIssue[] = [];

      // Only check API route files
      if (!filePath.includes('/api/')) return [];

      const hasNextResponse = /NextResponse\.json\(/g.test(code);
      const usesTypedResponse = /successResponse|errorResponse|APIResponse/g.test(code);

      if (hasNextResponse && !usesTypedResponse) {
        issues.push({
          rule: 'use-api-response-type',
          message: 'API routes should use typed response helpers',
          suggestion: 'Import { successResponse, errorResponse } from @/types/ai',
          severity: 'info',
        });
      }

      return issues;
    },
  },
  {
    name: 'use-app-error',
    description: 'Throw AppError instead of generic Error for business logic',
    check: (code: string, filePath: string): LintIssue[] => {
      const issues: LintIssue[] = [];

      // Check for generic error throws in API routes
      if (!filePath.includes('/api/')) return [];

      const genericThrows = code.match(/throw new Error\(/g);
      const appErrorImported = /import.*AppError.*from.*@\/types\/ai/g.test(code);

      if (genericThrows && genericThrows.length > 0 && !appErrorImported) {
        issues.push({
          rule: 'use-app-error',
          message: `Found ${genericThrows.length} generic Error throw(s) - use AppError for better error handling`,
          suggestion: 'Import { AppError } from @/types/ai and throw AppError with code, message, and statusCode',
          severity: 'info',
        });
      }

      return issues;
    },
  },
  {
    name: 'check-budget-before-ai',
    description: 'Check budget before expensive AI operations',
    check: (code: string, filePath: string): LintIssue[] => {
      const issues: LintIssue[] = [];

      // Only check files with AI calls
      const hasAICall = /trackClaudeCall|trackOpenAICall|anthropic\.|openai\./g.test(code);
      if (!hasAICall) return [];

      const hasBudgetCheck = /checkBudget|withinBudget|BUDGET_EXCEEDED/g.test(code);

      if (!hasBudgetCheck) {
        issues.push({
          rule: 'check-budget-before-ai',
          message: 'Consider checking budget before expensive AI operations',
          suggestion: 'Use tracker.checkBudget() to prevent exceeding daily limits',
          severity: 'info',
        });
      }

      return issues;
    },
  },
  {
    name: 'validate-ai-output',
    description: 'Validate AI-generated code before execution',
    check: (code: string, filePath: string): LintIssue[] => {
      const issues: LintIssue[] = [];

      // Check for patterns that suggest code execution
      const hasCodeExecution = /eval\(|new Function\(|vm\.run/g.test(code);
      const hasAIOutput = /response\.content|completion\.choices|message\.content/g.test(code);
      const hasValidation = /validateCode|isCodeSafe|CodeValidator/g.test(code);

      if (hasAIOutput && hasCodeExecution && !hasValidation) {
        issues.push({
          rule: 'validate-ai-output',
          message: 'AI-generated code should be validated before execution',
          suggestion: 'Import { validateCode, isCodeSafe } from @/lib/ai/validation',
          severity: 'warning',
        });
      }

      return issues;
    },
  },
  {
    name: 'feature-name-required',
    description: 'Cost tracking should include feature name',
    check: (code: string, filePath: string): LintIssue[] => {
      const issues: LintIssue[] = [];

      // Look for tracking calls without feature
      const trackingCalls = code.match(/track(?:Claude|OpenAI)Call\s*\(\s*\{[^}]*\}/g);
      if (!trackingCalls) return [];

      for (const call of trackingCalls) {
        if (!call.includes('feature:')) {
          issues.push({
            rule: 'feature-name-required',
            message: 'Cost tracking calls should include a feature name for analytics',
            suggestion: "Add feature: 'your-feature-name' to the tracking options",
            severity: 'warning',
          });
          break; // Only report once per file
        }
      }

      return issues;
    },
  },
];

// CLI Colors
const colors = {
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  blue: (s: string) => `\x1b[34m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
};

function formatSeverity(severity: 'error' | 'warning' | 'info'): string {
  switch (severity) {
    case 'error':
      return colors.red('ERROR');
    case 'warning':
      return colors.yellow('WARN');
    case 'info':
      return colors.blue('INFO');
  }
}

async function main() {
  const args = process.argv.slice(2);
  const help = args.includes('--help') || args.includes('-h');
  const listRules = args.includes('--list-rules');
  const paths = args.filter((a) => !a.startsWith('--') && !a.startsWith('-'));

  if (help) {
    console.log(`
${colors.bold('AI-Specific Linting CLI')}

${colors.gray('Usage:')}
  npm run ai:lint                    # Lint all src files
  npm run ai:lint src/app/api/       # Lint specific directory
  npm run ai:lint --list-rules       # Show all lint rules

${colors.gray('Options:')}
  --list-rules  Show all available lint rules
  --help, -h    Show this help message

${colors.gray('Rules checked:')}
  - use-cost-tracking: AI calls should use cost tracking
  - use-api-response-type: API routes should return typed responses
  - use-app-error: Use AppError for business logic errors
  - check-budget-before-ai: Check budget before expensive operations
  - validate-ai-output: Validate AI output before code execution
  - feature-name-required: Include feature name in cost tracking
`);
    process.exit(0);
  }

  if (listRules) {
    console.log(colors.bold('\n📋 AI Lint Rules\n'));
    for (const rule of AI_LINT_RULES) {
      console.log(`${colors.cyan(rule.name)}`);
      console.log(`  ${colors.gray(rule.description)}\n`);
    }
    process.exit(0);
  }

  console.log(colors.bold('\n🤖 AI Linting\n'));

  // Get files to lint
  let targetFiles: string[];

  if (paths.length > 0) {
    // Expand directories to files
    targetFiles = [];
    for (const p of paths) {
      const stat = fs.statSync(p);
      if (stat.isDirectory()) {
        const files = await glob(`${p}/**/*.{ts,tsx}`, {
          ignore: ['**/*.test.ts', '**/*.test.tsx', '**/*.d.ts'],
        });
        targetFiles.push(...files);
      } else {
        targetFiles.push(p);
      }
    }
  } else {
    targetFiles = await glob('src/**/*.{ts,tsx}', {
      ignore: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.spec.ts',
        'src/**/*.spec.tsx',
        'src/**/*.d.ts',
      ],
    });
  }

  const results: LintResult[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalInfo = 0;

  for (const filePath of targetFiles) {
    try {
      const absolutePath = path.resolve(filePath);
      const code = fs.readFileSync(absolutePath, 'utf-8');

      const issues: LintIssue[] = [];

      for (const rule of AI_LINT_RULES) {
        const ruleIssues = rule.check(code, filePath);
        issues.push(...ruleIssues);
      }

      if (issues.length > 0) {
        results.push({ file: filePath, issues });

        console.log(colors.bold(`\n${filePath}`));
        for (const issue of issues) {
          console.log(`  ${formatSeverity(issue.severity)} ${colors.gray(`[${issue.rule}]`)} ${issue.message}`);
          console.log(`    ${colors.cyan('→')} ${issue.suggestion}`);
        }

        totalErrors += issues.filter((i) => i.severity === 'error').length;
        totalWarnings += issues.filter((i) => i.severity === 'warning').length;
        totalInfo += issues.filter((i) => i.severity === 'info').length;
      }
    } catch (error) {
      console.error(colors.red(`Error reading ${filePath}:`), error);
    }
  }

  // Summary
  console.log(colors.bold('\n─────────────────────────────────────'));
  console.log(colors.bold('Summary'));
  console.log(`Files scanned: ${targetFiles.length}`);
  console.log(`Files with issues: ${results.length}`);
  console.log(`  ${colors.red('Errors')}: ${totalErrors}`);
  console.log(`  ${colors.yellow('Warnings')}: ${totalWarnings}`);
  console.log(`  ${colors.blue('Info')}: ${totalInfo}`);

  if (totalErrors > 0) {
    console.log(colors.red('\n✖ AI lint failed with errors\n'));
    process.exit(1);
  } else if (results.length === 0) {
    console.log(colors.green('\n✔ No AI lint issues found\n'));
  } else {
    console.log(colors.yellow('\n⚠ AI lint passed with suggestions\n'));
  }

  process.exit(0);
}

main().catch((error) => {
  console.error(colors.red('AI lint failed:'), error);
  process.exit(1);
});
