#!/usr/bin/env npx tsx
/**
 * AI Pre-Deploy Checks
 *
 * Runs all AI validation checks before deployment.
 * This ensures code quality, security, and budget compliance.
 *
 * Usage:
 *   npm run ai:pre-deploy              # Run all checks
 *   npm run ai:pre-deploy -- --strict  # Fail on warnings
 *   npm run ai:pre-deploy -- --skip-budget  # Skip budget check
 */

import { spawn } from 'child_process';
import * as path from 'path';

interface CheckResult {
  name: string;
  status: 'pass' | 'fail' | 'skip' | 'warn';
  duration: number;
  message?: string;
}

// CLI Colors
const colors = {
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
};

function runCommand(command: string, args: string[]): Promise<{ code: number; output: string }> {
  return new Promise((resolve) => {
    const proc = spawn(command, args, {
      cwd: process.cwd(),
      shell: true,
      stdio: ['inherit', 'pipe', 'pipe'],
    });

    let output = '';

    proc.stdout?.on('data', (data) => {
      output += data.toString();
    });

    proc.stderr?.on('data', (data) => {
      output += data.toString();
    });

    proc.on('close', (code) => {
      resolve({ code: code || 0, output });
    });

    proc.on('error', () => {
      resolve({ code: 1, output: 'Command failed to execute' });
    });
  });
}

async function runCheck(
  name: string,
  command: string,
  args: string[],
  skip: boolean = false
): Promise<CheckResult> {
  if (skip) {
    return { name, status: 'skip', duration: 0, message: 'Skipped by user' };
  }

  process.stdout.write(`  ${colors.cyan('⏳')} ${name}...`);
  const start = Date.now();

  try {
    const result = await runCommand(command, args);
    const duration = Date.now() - start;

    if (result.code === 0) {
      process.stdout.write(`\r  ${colors.green('✔')} ${name} ${colors.gray(`(${duration}ms)`)}\n`);
      return { name, status: 'pass', duration };
    } else {
      process.stdout.write(`\r  ${colors.red('✖')} ${name} ${colors.gray(`(${duration}ms)`)}\n`);
      return { name, status: 'fail', duration, message: result.output.trim() };
    }
  } catch (error) {
    const duration = Date.now() - start;
    process.stdout.write(`\r  ${colors.red('✖')} ${name} ${colors.gray(`(${duration}ms)`)}\n`);
    return {
      name,
      status: 'fail',
      duration,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const help = args.includes('--help') || args.includes('-h');
  const strict = args.includes('--strict');
  const skipBudget = args.includes('--skip-budget');
  const skipSecurity = args.includes('--skip-security');
  const skipLint = args.includes('--skip-lint');
  const skipTypes = args.includes('--skip-types');
  const skipTests = args.includes('--skip-tests');

  if (help) {
    console.log(`
${colors.bold('AI Pre-Deploy Checks')}

${colors.gray('Usage:')}
  npm run ai:pre-deploy                    # Run all checks
  npm run ai:pre-deploy -- --strict        # Fail on warnings
  npm run ai:pre-deploy -- --skip-budget   # Skip budget check
  npm run ai:pre-deploy -- --skip-security # Skip security scan
  npm run ai:pre-deploy -- --skip-tests    # Skip test run

${colors.gray('Checks performed:')}
  1. TypeScript type checking
  2. ESLint code quality
  3. AI code validation
  4. AI-specific linting
  5. Security scanning
  6. Unit tests
  7. Budget compliance (optional)

${colors.gray('Options:')}
  --strict          Fail on warnings (not just errors)
  --skip-budget     Skip the budget compliance check
  --skip-security   Skip the security scan
  --skip-lint       Skip ESLint and AI lint
  --skip-types      Skip TypeScript check
  --skip-tests      Skip running tests
  --help, -h        Show this help message
`);
    process.exit(0);
  }

  console.log(colors.bold('\n🚀 AI Pre-Deploy Checks\n'));
  console.log(colors.bold('─────────────────────────────────────\n'));

  const results: CheckResult[] = [];
  const scriptsDir = path.dirname(new URL(import.meta.url).pathname);

  // 1. TypeScript type checking
  results.push(
    await runCheck('TypeScript', 'npx', ['tsc', '--noEmit'], skipTypes)
  );

  // 2. ESLint
  results.push(
    await runCheck('ESLint', 'npm', ['run', 'lint'], skipLint)
  );

  // 3. AI Code Validation
  results.push(
    await runCheck(
      'AI Validation',
      'npx',
      ['tsx', path.join(scriptsDir, 'ai-validate.ts'), strict ? '--strict' : ''],
      skipLint
    )
  );

  // 4. AI-Specific Linting
  results.push(
    await runCheck(
      'AI Lint',
      'npx',
      ['tsx', path.join(scriptsDir, 'ai-lint.ts')],
      skipLint
    )
  );

  // 5. Security Scanning
  results.push(
    await runCheck(
      'Security Scan',
      'npx',
      ['tsx', path.join(scriptsDir, 'ai-security-scan.ts'), strict ? '--strict' : ''],
      skipSecurity
    )
  );

  // 6. Unit Tests
  results.push(
    await runCheck('Unit Tests', 'npm', ['test', '--', '--run'], skipTests)
  );

  // 7. Budget Check (if not skipped and database is available)
  if (!skipBudget) {
    results.push(
      await runCheck(
        'Budget Check',
        'npx',
        ['tsx', path.join(scriptsDir, 'ai-cost-report.ts'), '--days=1', '--budget=50'],
        false
      )
    );
  }

  // Summary
  console.log(colors.bold('\n─────────────────────────────────────'));
  console.log(colors.bold('Summary\n'));

  const passed = results.filter((r) => r.status === 'pass').length;
  const failed = results.filter((r) => r.status === 'fail').length;
  const skipped = results.filter((r) => r.status === 'skip').length;
  const warned = results.filter((r) => r.status === 'warn').length;

  console.log(`  ${colors.green('Passed')}:  ${passed}`);
  console.log(`  ${colors.red('Failed')}:  ${failed}`);
  console.log(`  ${colors.yellow('Warned')}:  ${warned}`);
  console.log(`  ${colors.gray('Skipped')}: ${skipped}`);

  // Show failed check details
  const failedChecks = results.filter((r) => r.status === 'fail');
  if (failedChecks.length > 0) {
    console.log(colors.bold('\n─────────────────────────────────────'));
    console.log(colors.red('\nFailed Checks:\n'));
    for (const check of failedChecks) {
      console.log(`  ${colors.red('✖')} ${check.name}`);
      if (check.message) {
        const lines = check.message.split('\n').slice(0, 5);
        for (const line of lines) {
          console.log(`    ${colors.gray(line)}`);
        }
        if (check.message.split('\n').length > 5) {
          console.log(colors.gray('    ... (truncated)'));
        }
      }
    }
  }

  // Final result
  console.log('');
  if (failed > 0) {
    console.log(colors.red(colors.bold('✖ Pre-deploy checks failed')));
    console.log(colors.gray('\n  Fix the issues above before deploying.\n'));
    process.exit(1);
  } else if (warned > 0 && strict) {
    console.log(colors.yellow(colors.bold('⚠ Pre-deploy checks passed with warnings (strict mode)')));
    console.log(colors.gray('\n  Review warnings before deploying.\n'));
    process.exit(1);
  } else {
    console.log(colors.green(colors.bold('✔ All pre-deploy checks passed!')));
    console.log(colors.gray('\n  Ready to deploy.\n'));
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(colors.red('Pre-deploy checks failed:'), error);
  process.exit(1);
});
