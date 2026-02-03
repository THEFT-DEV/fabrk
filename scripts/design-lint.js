#!/usr/bin/env node

/**
 * Design System Linter
 *
 * Checks for common design system violations:
 * - Hardcoded colors (hex, rgb, hsl, named colors)
 * - Arbitrary Tailwind values
 * - Tailwind color classes instead of semantic tokens
 *
 * Usage: node scripts/design-lint.js [path]
 * Default path: src/
 *
 * Note: This is a supplementary lint to ESLint rules.
 * ESLint has more granular control via eslint.config.mjs.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  extensions: ['.tsx', '.jsx'],
  defaultPath: 'src/',

  // Directories to completely ignore
  ignoreDirs: [
    'node_modules',
    '.next',
    'dist',
    '.ai',
    'generated',
    '__tests__',
    'tests',
    'fui-lab',
    'hero-lab',
    'showcase',
    'examples',
    'demo',
    'variations',
    'docs',  // Documentation pages have example code
  ],

  // File patterns to ignore (these need special handling)
  ignoreFiles: [
    // Email templates need inline styles
    /email/i,
    /\.email\./,

    // Test files
    /\.test\./,
    /\.spec\./,

    // Config files
    /\.config\./,

    // Generated files
    /\.generated\./,
    /generated-sources/,

    // Color/theme components that legitimately handle raw colors
    /color-picker/,
    /color-theme-switcher/,
    /theme-dropdown/,
    /theme-generator/,
    /theme-playground/,
    /theme-/,  // All theme components

    // Chart components (Recharts uses color strings)
    /donut-chart/,
    /pie-chart/,
    /funnel-chart/,
    /gauge\./,
    /heatmap/,
    /sparkline/,
    /bar-chart/,
    /line-chart/,
    /area-chart/,

    // Canvas/QR code components
    /qr-generator/,
    /perspective-grid/,
    /fui-background/,

    // Layout file (has metadata strings)
    /layout\.tsx$/,

    // Mermaid diagrams
    /mermaid/,

    // Sidebar (dynamic padding)
    /sidebar\.tsx$/,

    // OG/Twitter image generators (require inline styles, not React)
    /opengraph-image/,
    /twitter-image/,

    // Browser chrome (traffic light colors are legitimate)
    /browser-chrome/,

    // Auth templates (OAuth brand colors)
    /auth-page-template/,

    // Library showcase (fabrk.dev website, not distributed)
    /library\//,
  ],
};

// Violation patterns
const VIOLATIONS = {
  hexColors: {
    pattern: /#[0-9a-fA-F]{3,8}(?![0-9a-fA-F])/g,
    message: 'Hardcoded hex color - use design token (text-primary, bg-muted, etc.)',
    severity: 'error',
    // Skip if line looks like a comment or string constant
    skipLine: (line) =>
      line.trim().startsWith('//') ||
      line.trim().startsWith('*') ||
      line.trim().startsWith('/*') ||
      line.includes('eslint') ||
      line.includes('prettier') ||
      line.includes('TODO') ||
      line.includes('FIXME') ||
      // Skip CSS variable definitions (they define the tokens)
      line.includes('--') ||
      // Skip SVG fill/stroke in JSX (often brand colors)
      /fill=["']#/.test(line) ||
      /stroke=["']#/.test(line) ||
      // Skip hash anchors (href="#section" or href="/#section")
      /href=["'][^"']*#[a-zA-Z]/.test(line) ||
      /href:\s*["'][^"']*#[a-zA-Z]/.test(line) ||
      // Skip text content with # followed by numbers (e.g., "ticket #1234")
      /#\d{4,}/.test(line),
  },
  tailwindColors: {
    pattern:
      /(?:text|bg|border|ring|fill|stroke)-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d{2,3}/g,
    message: 'Tailwind color class - use semantic token (text-primary, bg-muted, etc.)',
    severity: 'error',
    skipLine: (line) =>
      line.trim().startsWith('//') ||
      line.trim().startsWith('*') ||
      line.includes('eslint') ||
      line.includes('// example') ||
      line.includes('// bad'),
  },
  arbitrarySpacing: {
    pattern: /\[[\d.]+(px|rem|em)\]/g,
    message: 'Arbitrary spacing - use scale values (p-4, gap-6, mt-8, etc.)',
    severity: 'warning',
    skipLine: (line) =>
      line.trim().startsWith('//') ||
      line.trim().startsWith('*') ||
      // Skip dynamic values
      line.includes('style={{') ||
      line.includes('transform') ||
      // Skip width/height that might be intentional
      /w-\[.*%\]/.test(line) ||
      /h-\[.*%\]/.test(line) ||
      /min-h-\[/.test(line) ||
      /max-w-\[/.test(line),
  },
  arbitraryRadius: {
    pattern: /rounded-\[\d+px\]/g,
    message: 'Arbitrary border-radius - use mode.radius or standard classes',
    severity: 'error',
    skipLine: (line) => line.trim().startsWith('//') || line.trim().startsWith('*'),
  },
};

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function shouldIgnoreFile(filePath) {
  // Check if file matches any ignore pattern
  return CONFIG.ignoreFiles.some((pattern) => {
    if (pattern instanceof RegExp) {
      return pattern.test(filePath);
    }
    return filePath.includes(pattern);
  });
}

function shouldIgnoreDir(dirName) {
  return CONFIG.ignoreDirs.includes(dirName);
}

function findViolations(content, filePath) {
  const lines = content.split('\n');
  const violations = [];

  lines.forEach((line, lineIndex) => {
    Object.entries(VIOLATIONS).forEach(([name, config]) => {
      // Skip line if it matches skip conditions
      if (config.skipLine && config.skipLine(line)) {
        return;
      }

      const matches = line.match(config.pattern);
      if (matches) {
        // Deduplicate matches on the same line
        const uniqueMatches = [...new Set(matches)];
        uniqueMatches.forEach((match) => {
          violations.push({
            file: filePath,
            line: lineIndex + 1,
            column: line.indexOf(match) + 1,
            match,
            message: config.message,
            severity: config.severity,
            rule: name,
          });
        });
      }
    });
  });

  return violations;
}

function lintFile(filePath) {
  // Check if file should be ignored
  if (shouldIgnoreFile(filePath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return findViolations(content, filePath);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

function getFiles(dirPath, files = []) {
  let items;
  try {
    items = fs.readdirSync(dirPath);
  } catch {
    return files;
  }

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch {
      return;
    }

    if (stat.isDirectory()) {
      if (!shouldIgnoreDir(item)) {
        getFiles(fullPath, files);
      }
      return;
    }

    const ext = path.extname(item);
    if (CONFIG.extensions.includes(ext)) {
      files.push(fullPath);
    }
  });

  return files;
}

function lintDirectory(dirPath) {
  const files = getFiles(dirPath);
  let allViolations = [];

  files.forEach((file) => {
    const violations = lintFile(file);
    allViolations = allViolations.concat(violations);
  });

  return allViolations;
}

function formatViolation(violation) {
  const severityColor = violation.severity === 'error' ? 'red' : 'yellow';
  const severityIcon = violation.severity === 'error' ? '✖' : '⚠';

  return `  ${COLORS[severityColor]}${severityIcon}${COLORS.reset} ${COLORS.dim}${violation.file}:${violation.line}:${violation.column}${COLORS.reset}
    ${violation.message}
    Found: ${COLORS.bold}${violation.match}${COLORS.reset}
`;
}

function printSummary(violations, fileCount) {
  const errors = violations.filter((v) => v.severity === 'error');
  const warnings = violations.filter((v) => v.severity === 'warning');

  console.log('\n' + '─'.repeat(60) + '\n');

  log(`Scanned ${fileCount} files`, 'dim');
  console.log('');

  if (violations.length === 0) {
    log('✓ No design system violations found!', 'green');
  } else {
    if (errors.length > 0) {
      log(`✖ ${errors.length} error(s)`, 'red');
    }
    if (warnings.length > 0) {
      log(`⚠ ${warnings.length} warning(s)`, 'yellow');
    }
    console.log('');
    log('Run with --help for more information about fixing violations.', 'dim');
  }

  console.log('');
}

function printHelp() {
  console.log(`
${COLORS.bold}Design System Linter${COLORS.reset}

${COLORS.cyan}Usage:${COLORS.reset}
  node scripts/design-lint.js [path] [options]

${COLORS.cyan}Arguments:${COLORS.reset}
  path      Directory or file to lint (default: src/)

${COLORS.cyan}Options:${COLORS.reset}
  --help    Show this help message
  --json    Output results as JSON

${COLORS.cyan}What it checks:${COLORS.reset}
  • Hardcoded hex colors in JSX
  • Tailwind color palette classes (text-green-500, bg-blue-600)
  • Arbitrary spacing values (p-[13px], rounded-[10px])

${COLORS.cyan}What it ignores:${COLORS.reset}
  • Comments and documentation
  • Email templates (need inline styles)
  • Test files
  • Chart components (Recharts uses color strings)
  • Color picker/theme components
  • CSS variable definitions

${COLORS.cyan}How to fix violations:${COLORS.reset}
  1. Replace hardcoded colors with design tokens:
     ${COLORS.red}#10b981${COLORS.reset} → ${COLORS.green}text-primary${COLORS.reset}
     ${COLORS.red}bg-green-500${COLORS.reset} → ${COLORS.green}bg-success${COLORS.reset}

  2. Replace arbitrary values with scale values:
     ${COLORS.red}p-[13px]${COLORS.reset} → ${COLORS.green}p-3${COLORS.reset}
     ${COLORS.red}rounded-[10px]${COLORS.reset} → ${COLORS.green}mode.radius${COLORS.reset}

${COLORS.cyan}Documentation:${COLORS.reset}
  See .ai/CONTEXT.md for full design system rules
  See .ai/tokens.md for available design tokens
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  const jsonOutput = args.includes('--json');
  const targetPath = args.find((arg) => !arg.startsWith('--')) || CONFIG.defaultPath;

  if (!jsonOutput) {
    console.log('');
    log('Design System Linter', 'bold');
    log(`Scanning: ${targetPath}`, 'dim');
    console.log('');
  }

  let violations;
  let fileCount = 0;

  try {
    const stat = fs.statSync(targetPath);

    if (stat.isDirectory()) {
      const files = getFiles(targetPath);
      fileCount = files.length;
      violations = lintDirectory(targetPath);
    } else {
      fileCount = 1;
      violations = lintFile(targetPath);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

  if (jsonOutput) {
    console.log(JSON.stringify({ violations, fileCount }, null, 2));
  } else {
    // Group by file
    const byFile = violations.reduce((acc, v) => {
      if (!acc[v.file]) acc[v.file] = [];
      acc[v.file].push(v);
      return acc;
    }, {});

    // Print violations
    Object.entries(byFile).forEach(([file, fileViolations]) => {
      console.log(`${COLORS.bold}${file}${COLORS.reset}`);
      fileViolations.forEach((v) => {
        console.log(formatViolation(v));
      });
    });

    printSummary(violations, fileCount);
  }

  // Exit with error code if there are errors
  const hasErrors = violations.some((v) => v.severity === 'error');
  process.exit(hasErrors ? 1 : 0);
}

main();
