#!/usr/bin/env node

/**
 * Theme Generator CLI
 * Creates new OKLCH themes for Fabrk design system
 *
 * Usage:
 *   node scripts/generate-theme.mjs
 *   npm run theme:generate
 */

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const rl = readline.createInterface({ input, output });

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function banner() {
  log('', 'reset');
  log('┌─────────────────────────────────────────┐', 'cyan');
  log('│   FABRK THEME GENERATOR                 │', 'cyan');
  log('│   Create custom OKLCH terminal themes   │', 'cyan');
  log('└─────────────────────────────────────────┘', 'cyan');
  log('', 'reset');
}

/**
 * Convert hex color to approximate OKLCH values
 * Note: This is a simplified conversion, real conversion requires color science
 */
function hexToOKLCH(hex) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  // Simple luminance calculation (approximation)
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const lightness = Math.round(luminance * 100);

  // Calculate hue (simplified)
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === r) {
      hue = 60 * (((g - b) / delta) % 6);
    } else if (max === g) {
      hue = 60 * ((b - r) / delta + 2);
    } else {
      hue = 60 * ((r - g) / delta + 4);
    }
  }
  if (hue < 0) hue += 360;

  // Calculate chroma (simplified)
  const chroma = delta > 0 ? Math.min(0.3, delta * 0.5) : 0;

  return {
    lightness: `${lightness}%`,
    chroma: chroma.toFixed(2),
    hue: Math.round(hue),
  };
}

/**
 * Generate complete theme CSS
 */
function generateThemeCSS(themeName, themeId, primaryHex, isDark = true) {
  const primary = hexToOKLCH(primaryHex);

  // Calculate related colors based on primary
  const bgLightness = isDark ? 5 : 98;
  const fgLightness = isDark ? 85 : 15;

  return `/* ${themeName} Theme - ${isDark ? 'Dark' : 'Light'} Mode */
[data-theme='${themeId}'] {
  /* Base colors */
  --background: ${bgLightness}% ${primary.chroma} ${primary.hue};
  --foreground: ${fgLightness}% ${(parseFloat(primary.chroma) * 1.2).toFixed(2)} ${primary.hue};
  --card: ${isDark ? bgLightness + 3 : bgLightness - 3}% ${primary.chroma} ${primary.hue};
  --card-foreground: ${fgLightness}% ${(parseFloat(primary.chroma) * 1.2).toFixed(2)} ${primary.hue};
  --popover: ${isDark ? bgLightness + 5 : bgLightness - 5}% ${primary.chroma} ${primary.hue};
  --popover-foreground: ${fgLightness}% ${(parseFloat(primary.chroma) * 1.2).toFixed(2)} ${primary.hue};

  /* Primary color */
  --primary: ${primary.lightness} ${primary.chroma} ${primary.hue};
  --primary-foreground: ${isDark ? 95 : 5}% ${(parseFloat(primary.chroma) * 0.1).toFixed(2)} ${primary.hue};

  /* Secondary colors */
  --secondary: ${isDark ? 70 : 85}% ${(parseFloat(primary.chroma) * 1.1).toFixed(2)} ${primary.hue};
  --secondary-foreground: ${isDark ? 5 : 15}% ${(parseFloat(primary.chroma) * 0.1).toFixed(2)} ${primary.hue};
  --muted: ${isDark ? 18 : 90}% ${(parseFloat(primary.chroma) * 0.5).toFixed(2)} ${primary.hue};
  --muted-foreground: ${isDark ? 70 : 40}% ${(parseFloat(primary.chroma) * 0.9).toFixed(2)} ${primary.hue};
  --accent: ${isDark ? 60 : 30}% ${(parseFloat(primary.chroma) * 1.2).toFixed(2)} ${primary.hue};
  --accent-foreground: ${isDark ? 5 : 98}% ${(parseFloat(primary.chroma) * 0.1).toFixed(2)} ${primary.hue};

  /* Status colors */
  --destructive: ${isDark ? 85 : 45}% ${(parseFloat(primary.chroma) * 1.2).toFixed(2)} ${primary.hue};
  --destructive-foreground: ${isDark ? 5 : 98}% ${(parseFloat(primary.chroma) * 0.1).toFixed(2)} ${primary.hue};
  --success: ${isDark ? 75 : 35}% ${(parseFloat(primary.chroma) * 1.1).toFixed(2)} ${primary.hue};
  --success-foreground: ${isDark ? 5 : 98}% ${(parseFloat(primary.chroma) * 0.1).toFixed(2)} ${primary.hue};
  --warning: ${isDark ? 80 : 40}% ${(parseFloat(primary.chroma) * 1.1).toFixed(2)} ${primary.hue};
  --warning-foreground: ${isDark ? 5 : 98}% ${(parseFloat(primary.chroma) * 0.1).toFixed(2)} ${primary.hue};
  --info: ${isDark ? 70 : 38}% ${(parseFloat(primary.chroma) * 1.0).toFixed(2)} ${primary.hue};
  --info-foreground: ${isDark ? 5 : 98}% ${(parseFloat(primary.chroma) * 0.1).toFixed(2)} ${primary.hue};

  /* Borders and inputs */
  --border: ${isDark ? 42 : 50}% ${(parseFloat(primary.chroma) * 0.8).toFixed(2)} ${primary.hue};
  --input: ${isDark ? 42 : 50}% ${(parseFloat(primary.chroma) * 0.8).toFixed(2)} ${primary.hue};
  --ring: ${isDark ? 60 : 30}% ${(parseFloat(primary.chroma) * 1.2).toFixed(2)} ${primary.hue};

  /* Chart colors - variations of primary hue */
  --chart-1: ${isDark ? 75 : 40}% ${(parseFloat(primary.chroma) * 1.1).toFixed(2)} ${primary.hue};
  --chart-2: ${isDark ? 65 : 35}% ${(parseFloat(primary.chroma) * 1.0).toFixed(2)} ${primary.hue};
  --chart-3: ${isDark ? 80 : 45}% ${(parseFloat(primary.chroma) * 1.2).toFixed(2)} ${primary.hue};
  --chart-4: ${isDark ? 70 : 38}% ${(parseFloat(primary.chroma) * 0.9).toFixed(2)} ${primary.hue};
  --chart-5: ${isDark ? 60 : 32}% ${(parseFloat(primary.chroma) * 0.8).toFixed(2)} ${primary.hue};
  --chart-6: ${isDark ? 85 : 50}% ${(parseFloat(primary.chroma) * 1.3).toFixed(2)} ${primary.hue};
  --chart-7: ${isDark ? 55 : 30}% ${(parseFloat(primary.chroma) * 0.7).toFixed(2)} ${primary.hue};
  --chart-8: ${isDark ? 72 : 42}% ${(parseFloat(primary.chroma) * 1.0).toFixed(2)} ${primary.hue};
  --chart-9: ${isDark ? 68 : 36}% ${(parseFloat(primary.chroma) * 0.95).toFixed(2)} ${primary.hue};

  /* Semantic mappings */
  --color-bg-canvas: var(--background);
  --color-bg-surface: var(--card);
  --color-bg-elevated: var(--popover);
  --color-bg-sunken: var(--muted);

  --color-text-primary: var(--foreground);
  --color-text-secondary: var(--muted-foreground);
  --color-text-tertiary: var(--secondary-foreground);
  --color-text-inverse: var(--primary-foreground);
  --color-text-disabled: var(--muted-foreground);

  --color-border-default: var(--border);
  --color-border-muted: var(--input);
  --color-border-strong: var(--ring);
  --color-border-focus: var(--ring);

  --color-status-success: var(--success);
  --color-status-success-bg: var(--success);
  --color-status-warning: var(--warning);
  --color-status-warning-bg: var(--warning);
  --color-status-error: var(--destructive);
  --color-status-error-bg: var(--destructive);
  --color-status-info: var(--info);
  --color-status-info-bg: var(--info);

  /* Code syntax highlighting (using theme colors) */
  --code-fg: oklch(${isDark ? fgLightness - 3 : fgLightness + 28}% ${(parseFloat(primary.chroma) * 0.7).toFixed(2)} ${primary.hue});
  --code-bg: oklch(${isDark ? bgLightness + 14 : bgLightness}% ${(parseFloat(primary.chroma) * 0.1).toFixed(2)} ${primary.hue});
  --code-comment: oklch(${isDark ? 62 : 55}% ${(parseFloat(primary.chroma) * 0.5).toFixed(2)} ${primary.hue});
  --code-string: oklch(${isDark ? fgLightness : fgLightness + 22}% ${(parseFloat(primary.chroma) * 0.6).toFixed(2)} ${primary.hue});
  --code-punctuation: oklch(${isDark ? 76 : 50}% ${(parseFloat(primary.chroma) * 0.6).toFixed(2)} ${primary.hue});
  --code-number: oklch(${isDark ? 71 : 53}% ${(parseFloat(primary.chroma) * 0.6).toFixed(2)} ${primary.hue});
  --code-keyword: oklch(${isDark ? fgLightness - 1 : fgLightness + 33}% ${(parseFloat(primary.chroma) * 0.7).toFixed(2)} ${primary.hue});
  --code-function: oklch(${isDark ? fgLightness + 1 : fgLightness + 17}% ${(parseFloat(primary.chroma) * 0.5).toFixed(2)} ${primary.hue});
  --code-selector: oklch(${isDark ? fgLightness - 1 : fgLightness + 28}% ${(parseFloat(primary.chroma) * 0.7).toFixed(2)} ${primary.hue});
}
`;
}

/**
 * Main CLI flow
 */
async function main() {
  banner();

  try {
    // Get theme details
    log('Let\'s create your custom theme!\n', 'bright');

    const themeName = await rl.question(colors.yellow + 'Theme name (e.g., "Ocean Blue"): ' + colors.reset);
    const themeId = await rl.question(colors.yellow + 'Theme ID (e.g., "ocean"): ' + colors.reset);
    const primaryColor = await rl.question(colors.yellow + 'Primary color (hex, e.g., "#0ea5e9"): ' + colors.reset);
    const isDarkInput = await rl.question(colors.yellow + 'Dark mode? (y/n): ' + colors.reset);
    const isDark = isDarkInput.toLowerCase() === 'y' || isDarkInput.toLowerCase() === 'yes';

    // Generate theme CSS
    log('\nGenerating theme...', 'cyan');
    const themeCSS = generateThemeCSS(themeName, themeId, primaryColor, isDark);

    // Save to file
    const outputPath = join(process.cwd(), `theme-${themeId}.css`);
    await writeFile(outputPath, themeCSS, 'utf8');

    log('✓ Theme generated successfully!', 'green');
    log(`\nSaved to: ${colors.bright}${outputPath}${colors.reset}`);

    log('\n' + colors.bright + 'Next steps:' + colors.reset);
    log('1. Copy the generated CSS to src/app/globals.css');
    log('2. Add theme to ThemeDropdown component');
    log('3. Test theme with all components');
    log('4. Verify WCAG 2.2 AA accessibility compliance\n');

    log(colors.cyan + 'Preview:' + colors.reset);
    log(themeCSS.split('\n').slice(0, 15).join('\n') + '\n  ...\n');

  } catch (error) {
    log(`\n✗ Error: ${error.message}`, 'red');
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
