#!/usr/bin/env npx tsx
/**
 * AI Security Scanning CLI
 *
 * Scans code for security vulnerabilities commonly introduced by AI.
 *
 * Usage:
 *   npm run ai:security                  # Scan all src files
 *   npm run ai:security src/app/api/     # Scan specific directory
 *   npm run ai:security --strict         # Fail on warnings
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface SecurityIssue {
  rule: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  file: string;
  line?: number;
  code?: string;
  fix?: string;
}

// Security rules with patterns
const SECURITY_RULES = [
  // Critical - Immediate action required
  {
    name: 'no-eval',
    severity: 'critical' as const,
    pattern: /\beval\s*\(/g,
    message: 'eval() can execute arbitrary code - severe security risk',
    fix: 'Use JSON.parse() for JSON, or a proper parser for other formats',
  },
  {
    name: 'no-function-constructor',
    severity: 'critical' as const,
    pattern: /new\s+Function\s*\(/g,
    message: 'Function constructor is equivalent to eval()',
    fix: 'Define functions statically or use a safer alternative',
  },
  {
    name: 'no-hardcoded-secrets',
    severity: 'critical' as const,
    pattern: /(password|secret|api[_-]?key|token|auth)\s*[:=]\s*["'][^"']{8,}["']/gi,
    message: 'Potential hardcoded secret detected',
    fix: 'Move secrets to environment variables',
  },
  {
    name: 'no-hardcoded-jwt',
    severity: 'critical' as const,
    pattern: /eyJ[A-Za-z0-9_-]*\.eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*/g,
    message: 'Hardcoded JWT token detected',
    fix: 'Remove JWT from code, use environment variables',
  },

  // High - Should be fixed before deploy
  {
    name: 'no-sql-injection',
    severity: 'high' as const,
    pattern: /(?:query|execute|raw)\s*\(\s*`[^`]*\$\{/g,
    message: 'Potential SQL injection - using template literals in query',
    fix: 'Use parameterized queries or an ORM',
  },
  {
    name: 'no-dangerous-html',
    severity: 'high' as const,
    pattern: /dangerouslySetInnerHTML/g,
    message: 'dangerouslySetInnerHTML can lead to XSS attacks',
    fix: 'Use a sanitization library like DOMPurify',
  },
  {
    name: 'no-innerHTML',
    severity: 'high' as const,
    pattern: /\.innerHTML\s*=/g,
    message: 'Direct innerHTML assignment can lead to XSS',
    fix: 'Use textContent or a sanitization library',
  },
  {
    name: 'no-document-write',
    severity: 'high' as const,
    pattern: /document\.write\s*\(/g,
    message: 'document.write can overwrite the entire document',
    fix: 'Use DOM manipulation methods instead',
  },
  {
    name: 'no-shell-injection',
    severity: 'high' as const,
    pattern: /(?:exec|spawn|execSync)\s*\(\s*`[^`]*\$\{/g,
    message: 'Potential command injection - user input in shell command',
    fix: 'Validate and sanitize inputs, use spawn with array args',
  },

  // Medium - Should be reviewed
  {
    name: 'no-console-credentials',
    severity: 'medium' as const,
    pattern: /console\.(log|info|debug|warn)\s*\([^)]*(?:password|secret|token|key)/gi,
    message: 'Logging potentially sensitive data',
    fix: 'Remove sensitive data from logs',
  },
  {
    name: 'no-disabled-eslint',
    severity: 'medium' as const,
    pattern: /eslint-disable(?!-next-line)/g,
    message: 'ESLint disabled for entire file - security rules may be bypassed',
    fix: 'Use eslint-disable-next-line for specific cases with justification',
  },
  {
    name: 'no-ts-ignore',
    severity: 'medium' as const,
    pattern: /@ts-ignore/g,
    message: '@ts-ignore may hide type errors that affect security',
    fix: 'Use @ts-expect-error with explanation, or fix the type error',
  },
  {
    name: 'no-any-type',
    severity: 'medium' as const,
    pattern: /:\s*any(?:\s|[,;)\]}])/g,
    message: '"any" type bypasses type checking, may hide vulnerabilities',
    fix: 'Use specific types or "unknown" with type guards',
  },

  // Low - Best practice recommendations
  {
    name: 'prefer-https',
    severity: 'low' as const,
    pattern: /['"]http:\/\/(?!localhost|127\.0\.0\.1)/g,
    message: 'Using HTTP instead of HTTPS',
    fix: 'Use HTTPS for all external URLs',
  },
  {
    name: 'no-cors-wildcard',
    severity: 'low' as const,
    pattern: /['"]Access-Control-Allow-Origin['"]\s*:\s*['"]\*['"]/g,
    message: 'CORS wildcard allows any origin',
    fix: 'Specify allowed origins explicitly',
  },
  {
    name: 'no-unvalidated-redirect',
    severity: 'low' as const,
    pattern: /redirect\s*\(\s*(?:req\.query|req\.body|searchParams)/g,
    message: 'Potential open redirect vulnerability',
    fix: 'Validate redirect URLs against allowlist',
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
  magenta: (s: string) => `\x1b[35m${s}\x1b[0m`,
};

function formatSeverity(severity: SecurityIssue['severity']): string {
  switch (severity) {
    case 'critical':
      return colors.magenta('CRITICAL');
    case 'high':
      return colors.red('HIGH');
    case 'medium':
      return colors.yellow('MEDIUM');
    case 'low':
      return colors.blue('LOW');
  }
}

function getLineNumber(code: string, index: number): number {
  return code.substring(0, index).split('\n').length;
}

function getCodeSnippet(code: string, index: number): string {
  const lines = code.split('\n');
  const lineNum = getLineNumber(code, index);
  const line = lines[lineNum - 1];
  return line?.trim().substring(0, 60) || '';
}

function scanFile(filePath: string, code: string): SecurityIssue[] {
  const issues: SecurityIssue[] = [];

  for (const rule of SECURITY_RULES) {
    const matches = code.matchAll(rule.pattern);
    for (const match of matches) {
      issues.push({
        rule: rule.name,
        severity: rule.severity,
        message: rule.message,
        file: filePath,
        line: getLineNumber(code, match.index || 0),
        code: getCodeSnippet(code, match.index || 0),
        fix: rule.fix,
      });
    }
  }

  return issues;
}

async function main() {
  const args = process.argv.slice(2);
  const strict = args.includes('--strict');
  const help = args.includes('--help') || args.includes('-h');
  const json = args.includes('--json');
  const paths = args.filter((a) => !a.startsWith('--') && !a.startsWith('-'));

  if (help) {
    console.log(`
${colors.bold('AI Security Scanning CLI')}

${colors.gray('Usage:')}
  npm run ai:security                  # Scan all src files
  npm run ai:security src/app/api/     # Scan specific directory
  npm run ai:security --strict         # Fail on medium+ severity
  npm run ai:security --json           # Output as JSON

${colors.gray('Options:')}
  --strict    Fail on medium severity or higher (default: fail on high+)
  --json      Output results as JSON
  --help, -h  Show this help message

${colors.gray('Severity Levels:')}
  ${colors.magenta('CRITICAL')}  Immediate action required (eval, hardcoded secrets)
  ${colors.red('HIGH')}      Fix before deployment (SQL injection, XSS)
  ${colors.yellow('MEDIUM')}    Should be reviewed (any types, ts-ignore)
  ${colors.blue('LOW')}       Best practice recommendations
`);
    process.exit(0);
  }

  if (!json) {
    console.log(colors.bold('\n🔒 AI Security Scan\n'));
  }

  // Get files to scan
  let targetFiles: string[];

  if (paths.length > 0) {
    targetFiles = [];
    for (const p of paths) {
      try {
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
          const files = await glob(`${p}/**/*.{ts,tsx,js,jsx}`, {
            ignore: ['**/*.test.ts', '**/*.test.tsx', '**/*.d.ts', '**/node_modules/**'],
          });
          targetFiles.push(...files);
        } else {
          targetFiles.push(p);
        }
      } catch {
        console.error(colors.red(`Path not found: ${p}`));
      }
    }
  } else {
    targetFiles = await glob('src/**/*.{ts,tsx,js,jsx}', {
      ignore: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.d.ts',
        '**/node_modules/**',
      ],
    });
  }

  const allIssues: SecurityIssue[] = [];

  for (const filePath of targetFiles) {
    try {
      const absolutePath = path.resolve(filePath);
      const code = fs.readFileSync(absolutePath, 'utf-8');
      const issues = scanFile(filePath, code);
      allIssues.push(...issues);
    } catch (error) {
      if (!json) {
        console.error(colors.red(`Error reading ${filePath}:`), error);
      }
    }
  }

  // Sort by severity
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  allIssues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  // Output results
  if (json) {
    console.log(JSON.stringify({ issues: allIssues, summary: getSummary(allIssues) }, null, 2));
  } else {
    // Group by file
    const byFile = new Map<string, SecurityIssue[]>();
    for (const issue of allIssues) {
      const existing = byFile.get(issue.file) || [];
      existing.push(issue);
      byFile.set(issue.file, existing);
    }

    for (const [file, issues] of byFile) {
      console.log(colors.bold(`\n${file}`));
      for (const issue of issues) {
        const line = issue.line ? colors.gray(`:${issue.line}`) : '';
        console.log(`  ${formatSeverity(issue.severity)} ${colors.gray(`[${issue.rule}]`)} ${issue.message}${line}`);
        if (issue.code) {
          console.log(`    ${colors.gray('Code:')} ${issue.code}...`);
        }
        if (issue.fix) {
          console.log(`    ${colors.green('Fix:')} ${issue.fix}`);
        }
      }
    }

    // Summary
    const summary = getSummary(allIssues);
    console.log(colors.bold('\n─────────────────────────────────────'));
    console.log(colors.bold('Summary'));
    console.log(`Files scanned: ${targetFiles.length}`);
    console.log(`Total issues: ${allIssues.length}`);
    console.log(`  ${colors.magenta('Critical')}: ${summary.critical}`);
    console.log(`  ${colors.red('High')}: ${summary.high}`);
    console.log(`  ${colors.yellow('Medium')}: ${summary.medium}`);
    console.log(`  ${colors.blue('Low')}: ${summary.low}`);

    // Exit code
    const failThreshold = strict ? 'medium' : 'high';
    const shouldFail =
      summary.critical > 0 ||
      summary.high > 0 ||
      (strict && summary.medium > 0);

    if (shouldFail) {
      console.log(colors.red(`\n✖ Security scan failed (${failThreshold}+ severity issues found)\n`));
      process.exit(1);
    } else if (allIssues.length > 0) {
      console.log(colors.yellow('\n⚠ Security scan passed with recommendations\n'));
      process.exit(0);
    } else {
      console.log(colors.green('\n✔ No security issues found\n'));
      process.exit(0);
    }
  }
}

function getSummary(issues: SecurityIssue[]) {
  return {
    critical: issues.filter((i) => i.severity === 'critical').length,
    high: issues.filter((i) => i.severity === 'high').length,
    medium: issues.filter((i) => i.severity === 'medium').length,
    low: issues.filter((i) => i.severity === 'low').length,
  };
}

main().catch((error) => {
  console.error(colors.red('Security scan failed:'), error);
  process.exit(1);
});
