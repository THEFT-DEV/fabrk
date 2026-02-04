#!/usr/bin/env npx tsx
/**
 * AI Code Validation CLI
 *
 * Validates code files for security issues, design system violations,
 * and type safety problems.
 *
 * Usage:
 *   npm run ai:validate                    # Validate all src files
 *   npm run ai:validate src/app/page.tsx   # Validate specific file
 *   npm run ai:validate --strict           # Fail on warnings too
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// Import validation utilities (inline since this runs standalone)
type ValidationSeverity = 'error' | 'warning' | 'info';
type ValidationCategory = 'security' | 'design' | 'type-safety' | 'quality';

interface ValidationIssue {
  rule: string;
  message: string;
  severity: ValidationSeverity;
  category: ValidationCategory;
  line?: number;
  column?: number;
  suggestion?: string;
}

interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  stats: {
    errors: number;
    warnings: number;
    info: number;
  };
}

// Security patterns to check
const SECURITY_PATTERNS = [
  {
    pattern: /eval\s*\(/g,
    rule: 'no-eval',
    message: 'Avoid using eval() - it can execute arbitrary code',
    severity: 'error' as const,
  },
  {
    pattern: /dangerouslySetInnerHTML/g,
    rule: 'no-dangerous-html',
    message: 'dangerouslySetInnerHTML can lead to XSS vulnerabilities',
    severity: 'warning' as const,
  },
  {
    pattern: /innerHTML\s*=/g,
    rule: 'no-inner-html',
    message: 'Direct innerHTML assignment can lead to XSS',
    severity: 'warning' as const,
  },
  {
    pattern: /document\.write/g,
    rule: 'no-document-write',
    message: 'document.write can overwrite the document',
    severity: 'error' as const,
  },
  {
    pattern: /new Function\s*\(/g,
    rule: 'no-function-constructor',
    message: 'Function constructor is similar to eval',
    severity: 'error' as const,
  },
  {
    pattern: /process\.env\.[A-Z_]+(?!\s*[?!])/g,
    rule: 'env-validation',
    message: 'Use validated env imports from @/lib/env',
    severity: 'info' as const,
  },
];

// Design system patterns
const DESIGN_PATTERNS = [
  {
    pattern: /className="[^"]*(?:bg-(?:white|black|gray-\d+|red-\d+|blue-\d+|green-\d+))[^"]*"/g,
    rule: 'no-hardcoded-colors',
    message: 'Use design tokens instead of hardcoded colors',
    severity: 'warning' as const,
  },
  {
    pattern: /className="[^"]*(?:rounded-(?:sm|md|lg|xl|2xl|3xl|full))[^"]*"/g,
    rule: 'use-mode-radius',
    message: 'Use mode.radius for consistent border radius',
    severity: 'info' as const,
    skipIf: /rounded-full|Switch/,
  },
  {
    pattern: /style=\{\{[^}]*(?:color|backgroundColor|borderColor):/g,
    rule: 'no-inline-colors',
    message: 'Use Tailwind classes with design tokens instead of inline styles',
    severity: 'warning' as const,
  },
  {
    pattern: /#[0-9a-fA-F]{3,8}/g,
    rule: 'no-hex-colors',
    message: 'Use design tokens instead of hex colors',
    severity: 'warning' as const,
  },
];

// Type safety patterns
const TYPE_PATTERNS = [
  {
    pattern: /:\s*any(?:\s|[,;)\]}])/g,
    rule: 'no-explicit-any',
    message: 'Avoid using "any" type - use specific types or "unknown"',
    severity: 'warning' as const,
  },
  {
    pattern: /as\s+any/g,
    rule: 'no-any-cast',
    message: 'Avoid casting to "any" - use proper type narrowing',
    severity: 'warning' as const,
  },
  {
    pattern: /\/\/\s*@ts-ignore/g,
    rule: 'no-ts-ignore',
    message: 'Avoid @ts-ignore - fix the type error or use @ts-expect-error',
    severity: 'warning' as const,
  },
  {
    pattern: /!\./g,
    rule: 'no-non-null-assertion',
    message: 'Non-null assertion (!) may cause runtime errors - use optional chaining',
    severity: 'info' as const,
  },
];

function getLineNumber(code: string, index: number): number {
  return code.substring(0, index).split('\n').length;
}

function validateCode(code: string, filePath: string): ValidationResult {
  const issues: ValidationIssue[] = [];

  // Check security patterns
  for (const check of SECURITY_PATTERNS) {
    const matches = code.matchAll(check.pattern);
    for (const match of matches) {
      issues.push({
        rule: check.rule,
        message: check.message,
        severity: check.severity,
        category: 'security',
        line: getLineNumber(code, match.index || 0),
      });
    }
  }

  // Check design patterns (only for TSX/JSX files)
  if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    for (const check of DESIGN_PATTERNS) {
      if (check.skipIf && check.skipIf.test(code)) continue;

      const matches = code.matchAll(check.pattern);
      for (const match of matches) {
        issues.push({
          rule: check.rule,
          message: check.message,
          severity: check.severity,
          category: 'design',
          line: getLineNumber(code, match.index || 0),
        });
      }
    }
  }

  // Check type patterns (only for TS/TSX files)
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    for (const check of TYPE_PATTERNS) {
      const matches = code.matchAll(check.pattern);
      for (const match of matches) {
        issues.push({
          rule: check.rule,
          message: check.message,
          severity: check.severity,
          category: 'type-safety',
          line: getLineNumber(code, match.index || 0),
        });
      }
    }
  }

  const stats = {
    errors: issues.filter((i) => i.severity === 'error').length,
    warnings: issues.filter((i) => i.severity === 'warning').length,
    info: issues.filter((i) => i.severity === 'info').length,
  };

  return {
    valid: stats.errors === 0,
    issues,
    stats,
  };
}

// CLI Colors
const colors = {
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  blue: (s: string) => `\x1b[34m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

function formatSeverity(severity: ValidationSeverity): string {
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
  const strict = args.includes('--strict');
  const help = args.includes('--help') || args.includes('-h');
  const files = args.filter((a) => !a.startsWith('--') && !a.startsWith('-'));

  if (help) {
    console.log(`
${colors.bold('AI Code Validation CLI')}

${colors.gray('Usage:')}
  npm run ai:validate                    # Validate all src files
  npm run ai:validate src/app/page.tsx   # Validate specific file
  npm run ai:validate --strict           # Fail on warnings too

${colors.gray('Options:')}
  --strict    Fail on warnings (not just errors)
  --help, -h  Show this help message

${colors.gray('Categories checked:')}
  - Security: eval, innerHTML, XSS vectors
  - Design: hardcoded colors, missing mode.radius
  - Type safety: any types, ts-ignore, non-null assertions
`);
    process.exit(0);
  }

  console.log(colors.bold('\n🔍 AI Code Validation\n'));

  // Get files to validate
  let targetFiles: string[];

  if (files.length > 0) {
    targetFiles = files;
  } else {
    // Default: validate all src files
    targetFiles = await glob('src/**/*.{ts,tsx}', {
      ignore: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.spec.ts',
        'src/**/*.spec.tsx',
        'src/**/*.d.ts',
        // Exclude validation tools that define patterns (contain eval/innerHTML patterns by design)
        'src/lib/ai/validation.ts',
        'src/lib/eslint/**',
      ],
    });
  }

  let totalErrors = 0;
  let totalWarnings = 0;
  let totalInfo = 0;
  let filesWithIssues = 0;

  for (const filePath of targetFiles) {
    try {
      const absolutePath = path.resolve(filePath);
      const code = fs.readFileSync(absolutePath, 'utf-8');
      const result = validateCode(code, filePath);

      if (result.issues.length > 0) {
        filesWithIssues++;
        console.log(colors.bold(`\n${filePath}`));

        for (const issue of result.issues) {
          const line = issue.line ? colors.gray(`:${issue.line}`) : '';
          const category = colors.gray(`[${issue.category}]`);
          console.log(
            `  ${formatSeverity(issue.severity)} ${category} ${issue.message} ${colors.gray(`(${issue.rule})`)}${line}`
          );
        }

        totalErrors += result.stats.errors;
        totalWarnings += result.stats.warnings;
        totalInfo += result.stats.info;
      }
    } catch (error) {
      console.error(colors.red(`Error reading ${filePath}:`), error);
    }
  }

  // Summary
  console.log(colors.bold('\n─────────────────────────────────────'));
  console.log(colors.bold('Summary'));
  console.log(`Files scanned: ${targetFiles.length}`);
  console.log(`Files with issues: ${filesWithIssues}`);
  console.log(`  ${colors.red('Errors')}: ${totalErrors}`);
  console.log(`  ${colors.yellow('Warnings')}: ${totalWarnings}`);
  console.log(`  ${colors.blue('Info')}: ${totalInfo}`);

  // Exit code
  if (totalErrors > 0) {
    console.log(colors.red('\n✖ Validation failed with errors\n'));
    process.exit(1);
  } else if (strict && totalWarnings > 0) {
    console.log(colors.yellow('\n✖ Validation failed (strict mode - warnings found)\n'));
    process.exit(1);
  } else if (totalWarnings > 0 || totalInfo > 0) {
    console.log(colors.yellow('\n⚠ Validation passed with warnings\n'));
    process.exit(0);
  } else {
    console.log(colors.green('\n✔ Validation passed\n'));
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(colors.red('Validation failed:'), error);
  process.exit(1);
});
