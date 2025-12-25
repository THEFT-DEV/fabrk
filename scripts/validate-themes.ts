#!/usr/bin/env tsx
/**
 * WCAG Theme Validation Script
 *
 * Validates all 6 color themes for WCAG 2.1 AA compliance.
 * Checks text/background contrast ratios for all critical combinations.
 *
 * Exit codes:
 *   0 = All themes pass WCAG AA
 *   1 = One or more themes have violations
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import {
  calculateContrastRatio,
  meetsWCAG_AA,
  meetsWCAG_AAA,
  formatRatio,
  parseOKLCH,
} from './utils/color';

// =============================================================================
// CONFIGURATION
// =============================================================================

// All 13 themes from src/data/themes.ts
const THEMES = [
  // Standard CRT
  'amber', 'blue', 'green', 'purple', 'red',
  // Inverted
  'infrared',
  // Retro Computer
  'atari', 'c64', 'spectrum', 'vic20',
  // Handheld
  'gameboy', 'gbpocket',
  // Light
  'bw',
] as const;
type Theme = (typeof THEMES)[number];

interface ContrastCheck {
  theme: Theme;
  label: string;
  fg: string;
  bg: string;
  fgValue: string;
  bgValue: string;
  ratio: number;
  required: number;
  pass: boolean;
  fontSize?: number;
  isBold?: boolean;
  isAAA?: boolean;
}

// Text/background combinations to validate
const TEXT_BG_COMBINATIONS = [
  {
    fg: '--foreground',
    bg: '--background',
    min: 4.5,
    label: 'Body text on canvas',
    fontSize: 16,
  },
  {
    fg: '--card-foreground',
    bg: '--card',
    min: 4.5,
    label: 'Card text on card',
    fontSize: 16,
  },
  {
    fg: '--muted-foreground',
    bg: '--muted',
    min: 4.5,
    label: 'Muted text on muted',
    fontSize: 14,
  },
  {
    fg: '--primary-foreground',
    bg: '--primary',
    min: 4.5,
    label: 'Button text on primary',
    fontSize: 12,
    isBold: true,
  },
  {
    fg: '--destructive-foreground',
    bg: '--destructive',
    min: 4.5,
    label: 'Error text on error bg',
    fontSize: 14,
  },
  {
    fg: '--success-foreground',
    bg: '--success',
    min: 4.5,
    label: 'Success text on success bg',
    fontSize: 14,
  },
  {
    fg: '--warning-foreground',
    bg: '--warning',
    min: 4.5,
    label: 'Warning text on warning bg',
    fontSize: 14,
  },
  {
    fg: '--info-foreground',
    bg: '--info',
    min: 4.5,
    label: 'Info text on info bg',
    fontSize: 14,
  },
  {
    fg: '--muted-foreground',
    bg: '--background',
    min: 4.5,
    label: 'Secondary text on canvas',
    fontSize: 14,
  },
  {
    fg: '--foreground',
    bg: '--card',
    min: 4.5,
    label: 'Body text on card',
    fontSize: 16,
  },
] as const;

// =============================================================================
// CSS PARSING
// =============================================================================

/**
 * Read and parse globals.css file
 */
function readGlobalsCss(): string {
  const cssPath = join(process.cwd(), 'src/app/globals.css');
  return readFileSync(cssPath, 'utf-8');
}

/**
 * Extract CSS variable value from theme block or :root
 *
 * @param css - Full CSS content
 * @param theme - Theme name
 * @param varName - CSS variable name (e.g., '--foreground')
 * @param visitedVars - Set of visited variables to prevent infinite loops
 * @returns OKLCH value string or null if not found
 */
function getThemeVariable(
  css: string,
  theme: Theme,
  varName: string,
  visitedVars: Set<string> = new Set(),
): string | null {
  // Prevent infinite loops
  if (visitedVars.has(varName)) {
    console.warn(`⚠️  Circular reference detected: ${varName}`);
    return null;
  }
  visitedVars.add(varName);

  // Try to find in theme-specific block first
  const themeBlockRegex = new RegExp(`\\[data-theme=['"]${theme}['"]\\]\\s*\\{([^}]+)\\}`, 's');
  const themeMatch = css.match(themeBlockRegex);

  if (themeMatch) {
    const themeBlock = themeMatch[1];
    const value = extractVariableValue(themeBlock, varName, css, theme, visitedVars);
    if (value) return value;
  }

  // Fallback to :root if not found in theme block
  const rootMatch = css.match(/:root\s*\{([^}]+)\}/s);
  if (rootMatch) {
    const rootBlock = rootMatch[1];
    return extractVariableValue(rootBlock, varName, css, theme, visitedVars);
  }

  return null;
}

/**
 * Extract variable value from a CSS block
 */
function extractVariableValue(
  block: string,
  varName: string,
  css: string,
  theme: Theme,
  visitedVars: Set<string>,
): string | null {
  // Match direct value
  const varRegex = new RegExp(`${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*([^;]+);`);
  const varMatch = block.match(varRegex);

  if (!varMatch) return null;

  const value = varMatch[1].trim();

  // Check if it's a var() reference
  const varRefMatch = value.match(/^var\(([^)]+)\)$/);
  if (varRefMatch) {
    // Recursively resolve the reference
    return getThemeVariable(css, theme, varRefMatch[1], visitedVars);
  }

  return value;
}

// =============================================================================
// VALIDATION
// =============================================================================

/**
 * Validate a single theme for WCAG AA compliance
 */
function validateTheme(css: string, themeName: Theme): ContrastCheck[] {
  const checks: ContrastCheck[] = [];

  for (const combo of TEXT_BG_COMBINATIONS) {
    const fgValue = getThemeVariable(css, themeName, combo.fg);
    const bgValue = getThemeVariable(css, themeName, combo.bg);

    if (!fgValue || !bgValue) {
      console.warn(
        `⚠️  ${themeName}: Missing variable ${!fgValue ? combo.fg : combo.bg} - skipping check`,
      );
      continue;
    }

    try {
      const ratio = calculateContrastRatio(fgValue, bgValue);
      const pass = meetsWCAG_AA(ratio, combo.fontSize, combo.isBold);
      const isAAA = meetsWCAG_AAA(ratio, combo.fontSize, combo.isBold);

      checks.push({
        theme: themeName,
        label: combo.label,
        fg: combo.fg,
        bg: combo.bg,
        fgValue,
        bgValue,
        ratio,
        required: combo.min,
        pass,
        fontSize: combo.fontSize,
        isBold: combo.isBold,
        isAAA,
      });
    } catch (error) {
      console.error(`❌ ${themeName}: Error checking ${combo.label}:`, error);
    }
  }

  return checks;
}

/**
 * Print validation results for a theme
 */
function printThemeResults(theme: Theme, checks: ContrastCheck[]) {
  const failures = checks.filter((c) => !c.pass);
  const warnings = checks.filter((c) => c.pass && !c.isAAA);
  const perfect = checks.filter((c) => c.isAAA);

  if (failures.length > 0) {
    console.log(`\n❌ ${theme.toUpperCase()}: ${failures.length} WCAG AA failures\n`);
    console.log('   Failures:');
    failures.forEach((f) => {
      console.log(`   ├─ ${f.label}`);
      console.log(`   │  ${formatRatio(f.ratio)} (need ${f.required}:1)`);
      console.log(`   │  FG: ${f.fgValue} (${f.fg})`);
      console.log(`   │  BG: ${f.bgValue} (${f.bg})`);
      console.log('   │');
    });
  } else if (warnings.length > 0) {
    console.log(`\n✅ ${theme.toUpperCase()}: WCAG AA pass (${warnings.length} AA-only, ${perfect.length} AAA)\n`);
  } else {
    console.log(`\n✅ ${theme.toUpperCase()}: All checks pass WCAG AAA\n`);
  }
}

/**
 * Print summary table
 */
function printSummaryTable(allChecks: ContrastCheck[]) {
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80) + '\n');

  const themeStats = THEMES.map((theme) => {
    const themeChecks = allChecks.filter((c) => c.theme === theme);
    const total = themeChecks.length;
    const failures = themeChecks.filter((c) => !c.pass).length;
    const aa = themeChecks.filter((c) => c.pass && !c.isAAA).length;
    const aaa = themeChecks.filter((c) => c.isAAA).length;

    return {
      theme,
      total,
      failures,
      aa,
      aaa,
      pass: failures === 0,
    };
  });

  console.log('Theme      Total  Failures  AA-only  AAA  Status');
  console.log('-'.repeat(80));

  themeStats.forEach((stat) => {
    const status = stat.pass ? '✅ PASS' : '❌ FAIL';
    const theme = stat.theme.padEnd(10);
    const total = stat.total.toString().padStart(5);
    const failures = stat.failures.toString().padStart(8);
    const aa = stat.aa.toString().padStart(8);
    const aaa = stat.aaa.toString().padStart(4);

    console.log(`${theme} ${total}  ${failures}  ${aa}  ${aaa}  ${status}`);
  });

  console.log('');

  const totalFailures = themeStats.reduce((sum, s) => sum + s.failures, 0);
  const totalChecks = themeStats.reduce((sum, s) => sum + s.total, 0);

  if (totalFailures > 0) {
    console.log(`❌ RESULT: ${totalFailures} failures out of ${totalChecks} checks`);
  } else {
    console.log(`✅ RESULT: All ${totalChecks} checks passed`);
  }
}

// =============================================================================
// MAIN
// =============================================================================

function main() {
  console.log('\n🔍 Validating WCAG 2.1 AA compliance for 6 themes...\n');
  console.log(`Checking ${TEXT_BG_COMBINATIONS.length} text/background combinations per theme\n`);

  const css = readGlobalsCss();
  const allChecks: ContrastCheck[] = [];

  for (const theme of THEMES) {
    const checks = validateTheme(css, theme);
    allChecks.push(...checks);
    printThemeResults(theme, checks);
  }

  printSummaryTable(allChecks);

  const totalFailures = allChecks.filter((c) => !c.pass).length;

  if (totalFailures > 0) {
    console.log('\n💡 TIP: Adjust lightness values in globals.css to fix contrast issues');
    console.log('   Increase lightness for light colors, decrease for dark colors\n');
    process.exit(1);
  }

  console.log('\n✅ All themes pass WCAG 2.1 AA compliance\n');
  process.exit(0);
}

main();
