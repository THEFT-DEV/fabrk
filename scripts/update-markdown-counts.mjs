#!/usr/bin/env node
/**
 * update-markdown-counts.mjs
 *
 * Automatically updates ALL dynamic counts in markdown documentation files.
 * Reads counts from source of truth (actual files/directories) and updates
 * markdown files to prevent drift between code and documentation.
 *
 * COUNTS TRACKED:
 * - UI Components (src/components/ui)
 * - Themes (src/data/themes.ts)
 * - Templates (src/app/(marketing)/library)
 * - API Routes (src/app/api)
 * - Test Files (src test files)
 * - i18n Languages (src/config/i18n.ts)
 * - Docs Pages (docs folder)
 *
 * Run manually: npm run update-markdown-counts
 * Runs automatically: prebuild hook (before every build)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// =============================================================================
// SOURCE OF TRUTH - Count from actual files
// =============================================================================

async function getComponentCount() {
  try {
    // Include subdirectories (data-table/, file-upload/, etc.)
    const files = await glob('src/components/ui/**/*.tsx', { cwd: ROOT });
    return files.length;
  } catch (error) {
    console.error('❌ Could not count UI components:', error.message);
    return 77; // Fallback
  }
}

function getThemeCount() {
  const themesPath = path.join(ROOT, 'src/data/themes.ts');
  try {
    const content = fs.readFileSync(themesPath, 'utf8');
    // Count theme objects in the themes array
    const matches = content.match(/id:\s*['"][^'"]+['"]/g);
    return matches ? matches.length : 12; // Fallback to 12
  } catch (error) {
    console.error('❌ Could not read themes.ts:', error.message);
    return 12; // Fallback
  }
}

async function getTemplateCount() {
  try {
    // Count actual template pages in library
    const files = await glob('src/app/(marketing)/library/**/page.tsx', { cwd: ROOT });
    // Subtract 1 for the main library index page
    return Math.max(files.length - 1, 0);
  } catch (error) {
    console.error('❌ Could not count templates:', error.message);
    return 50; // Fallback
  }
}

async function getApiRouteCount() {
  try {
    const files = await glob('src/app/api/**/route.ts', { cwd: ROOT });
    return files.length;
  } catch (error) {
    console.error('❌ Could not count API routes:', error.message);
    return 70; // Fallback
  }
}

async function getTestFileCount() {
  try {
    const tsFiles = await glob('src/**/*.test.ts', { cwd: ROOT });
    const tsxFiles = await glob('src/**/*.test.tsx', { cwd: ROOT });
    return tsFiles.length + tsxFiles.length;
  } catch (error) {
    console.error('❌ Could not count test files:', error.message);
    return 20; // Fallback
  }
}

function getLanguageCount() {
  const i18nPath = path.join(ROOT, 'src/config/i18n.ts');
  try {
    const content = fs.readFileSync(i18nPath, 'utf8');
    // Count locales in the array
    const match = content.match(/locales\s*=\s*\[([^\]]+)\]/);
    if (match) {
      const locales = match[1].split(',').filter(l => l.trim().length > 0);
      return locales.length;
    }
    return 6; // Fallback
  } catch (error) {
    console.error('❌ Could not read i18n.ts:', error.message);
    return 6; // Fallback
  }
}

async function getDocsPageCount() {
  try {
    const files = await glob('docs/**/*.md', { cwd: ROOT });
    return files.length;
  } catch (error) {
    console.error('❌ Could not count docs pages:', error.message);
    return 100; // Fallback
  }
}

async function getLiveDocsPageCount() {
  try {
    const files = await glob('src/app/(marketing)/docs/**/page.tsx', { cwd: ROOT });
    return files.length;
  } catch (error) {
    console.error('❌ Could not count live docs pages:', error.message);
    return 100; // Fallback
  }
}

// =============================================================================
// SAVE COUNTS TO JSON (for use in TypeScript)
// =============================================================================

async function saveCountsToJson(counts) {
  const countsPath = path.join(ROOT, 'src/data/dynamic-counts.json');
  const data = {
    generatedAt: new Date().toISOString(),
    counts: {
      uiComponents: counts.components,
      themes: counts.themes,
      templates: counts.templates,
      apiRoutes: counts.apiRoutes,
      testFiles: counts.testFiles,
      languages: counts.languages,
      docsPages: counts.docsPages,
      liveDocsPages: counts.liveDocsPages,
    },
    // String versions for marketing copy (with + suffix)
    strings: {
      components: `${counts.components}+`,
      themes: `${counts.themes}`,
      templates: `${counts.templates}+`,
      apiRoutes: `${counts.apiRoutes}+`,
      testFiles: `${counts.testFiles}+`,
      languages: `${counts.languages}`,
      docsPages: `${counts.docsPages}+`,
    }
  };

  fs.writeFileSync(countsPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`💾 Saved counts to src/data/dynamic-counts.json`);
}

// =============================================================================
// MARKDOWN FILES TO UPDATE (auto-discovered)
// =============================================================================

async function getMarkdownFiles() {
  // Get ALL markdown files in the project
  const allMdFiles = await glob('**/*.md', {
    cwd: ROOT,
    ignore: [
      'node_modules/**',
      '.next/**',
      '.git/**',
      'CHANGELOG.md',  // Preserve historical references
    ],
  });
  return allMdFiles;
}

// =============================================================================
// REPLACEMENT PATTERNS
// =============================================================================

function getReplacements(counts) {
  const { components, themes, templates, apiRoutes, testFiles, languages } = counts;

  return [
    // =========================================================================
    // COMPONENT COUNTS
    // =========================================================================
    {
      // "87 Components" or "77 Components" → correct count
      pattern: /\b\d{2,3}\s+Components\b/gi,
      replacement: `${components} Components`,
    },
    {
      // "77+ components" or "87+ components" → correct count
      pattern: /\b\d{2,3}\+?\s+components\b/gi,
      replacement: `${components}+ components`,
    },
    {
      // **87 Components** or **77 Components** → correct count (bold)
      pattern: /\*\*\d{2,3}\s+Components\*\*/gi,
      replacement: `**${components} Components**`,
    },
    {
      // Component Inventory (77 Components) → correct count
      pattern: /Component Inventory \(\d{2,3} Components\)/gi,
      replacement: `Component Inventory (${components} Components)`,
    },
    {
      // "all 77 UI components" → correct count
      pattern: /all\s+\d{2,3}\s+UI\s+components/gi,
      replacement: `all ${components} UI components`,
    },
    {
      // "77 production-ready components" → correct count
      pattern: /\b\d{2,3}\s+production-ready\s+components/gi,
      replacement: `${components} production-ready components`,
    },
    {
      // "77 documented components" → correct count
      pattern: /\b\d{2,3}\s+documented\s+components/gi,
      replacement: `${components} documented components`,
    },
    {
      // "(77 Total" or "(78 Total" in headers → correct count
      pattern: /\(\d{2,3}\s+Total/gi,
      replacement: `(${components} Total`,
    },
    {
      // "77 UI Components" (exact case) → correct count
      pattern: /\b\d{2,3}\s+UI\s+Components\b/g,
      replacement: `${components} UI Components`,
    },
    {
      // "77 UI components" (lowercase) → correct count
      pattern: /\b\d{2,3}\s+UI\s+components\b/g,
      replacement: `${components} UI components`,
    },
    {
      // "77/77" or "77/78" review counts → correct count
      pattern: /\b\d{2,3}\/\d{2,3}\b/g,
      replacement: `${components}/${components}`,
    },
    {
      // "# 77 UI components" in directory comments → correct count
      pattern: /#\s+\d{2,3}\s+UI\s+components/gi,
      replacement: `# ${components} UI components`,
    },
    {
      // "# 77 UI component docs" → correct count (singular)
      pattern: /#\s+\d{2,3}\s+UI\s+component\s+docs/gi,
      replacement: `# ${components} UI component docs`,
    },
    {
      // "77 production-ready UI components" → correct count
      pattern: /\b\d{2,3}\s+production-ready\s+UI\s+components/gi,
      replacement: `${components} production-ready UI components`,
    },

    // =========================================================================
    // THEME COUNTS
    // =========================================================================
    {
      // "6 Themes" or "12 Themes" → correct count
      pattern: /\b(6|12|13|14)\s+Themes\b/g,
      replacement: `${themes} Themes`,
    },
    {
      // "(12 themes)" → correct count
      pattern: /\((\d{1,2})\s+themes\)/gi,
      replacement: `(${themes} themes)`,
    },
    {
      // "all 12 themes" or "all 6 themes" → correct count
      pattern: /all\s+\d{1,2}\s+themes/gi,
      replacement: `all ${themes} themes`,
    },
    {
      // "12 terminal themes" → correct count
      pattern: /\b\d{1,2}\s+terminal\s+themes/gi,
      replacement: `${themes} terminal themes`,
    },

    // =========================================================================
    // TEMPLATE COUNTS
    // =========================================================================
    {
      // "28 Templates" or "34 Templates" or "50 Templates" → correct count
      pattern: /\b\d{2}\s+Templates\b/g,
      replacement: `${templates} Templates`,
    },
    {
      // "34+ Templates" or "50+ Templates" → correct count
      pattern: /\b\d{2}\+\s+Templates\b/g,
      replacement: `${templates}+ Templates`,
    },
    {
      // "34+ page templates" → correct count
      pattern: /\b\d{2}\+?\s+page\s+templates/gi,
      replacement: `${templates}+ page templates`,
    },

    // =========================================================================
    // API ROUTE COUNTS
    // =========================================================================
    {
      // "30+ endpoints" or "70+ endpoints" → correct count
      pattern: /\b\d{2,3}\+?\s+endpoints/gi,
      replacement: `${apiRoutes}+ endpoints`,
    },
    {
      // "72 API routes" → correct count
      pattern: /\b\d{2,3}\s+API\s+routes/gi,
      replacement: `${apiRoutes} API routes`,
    },

    // =========================================================================
    // TEST FILE COUNTS
    // =========================================================================
    {
      // "20+ test files" → correct count
      pattern: /\b\d{2,3}\+?\s+test\s+files/gi,
      replacement: `${testFiles}+ test files`,
    },

    // =========================================================================
    // LANGUAGE COUNTS
    // =========================================================================
    {
      // "5 languages" or "6 languages" → correct count
      pattern: /\b[4-9]\s+languages/gi,
      replacement: `${languages} languages`,
    },
    {
      // "18 languages" (legacy) → correct count
      pattern: /\b18\s+languages/gi,
      replacement: `${languages} languages`,
    },

    // =========================================================================
    // COMBINED STATS LINES
    // =========================================================================
    {
      // | 77 Components | 33 Templates | 12 Themes |
      pattern: /\|\s*\d{2,3}\s+Components\s*\|\s*\d{2}\+?\s+Templates\s*\|\s*\d{1,2}\s+Themes\s*\|/g,
      replacement: `| ${components} Components | ${templates}+ Templates | ${themes} Themes |`,
    },
    {
      // $299 | 77 UI Components | 34+ Templates | 12 Terminal Themes
      pattern: /\$299\s*\|\s*\d{2,3}\s+UI\s+Components\s*\|\s*\d{2}\+?\s+Templates\s*\|\s*\d{1,2}\s+Terminal\s+Themes/gi,
      replacement: `$299 | ${components} UI Components | ${templates}+ Templates | ${themes} Terminal Themes`,
    },
  ];
}

// =============================================================================
// MAIN UPDATE FUNCTION
// =============================================================================

function updateMarkdownFile(filePath, replacements) {
  const fullPath = path.join(ROOT, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⏭️  Skipped (not found): ${filePath}`);
    return { updated: false, changes: 0 };
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let changes = 0;

  for (const { pattern, replacement } of replacements) {
    const originalContent = content;
    content = content.replace(pattern, replacement);
    if (content !== originalContent) {
      changes++;
    }
  }

  if (changes > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated: ${filePath} (${changes} patterns matched)`);
    return { updated: true, changes };
  } else {
    // Silent for no changes to reduce noise
    return { updated: false, changes: 0 };
  }
}

// =============================================================================
// EXECUTE
// =============================================================================

async function main() {
  console.log('\n🔢 Updating markdown documentation counts...\n');
  console.log('📊 Counting from source files...\n');

  // Count everything from source files
  const counts = {
    components: await getComponentCount(),
    themes: getThemeCount(),
    templates: await getTemplateCount(),
    apiRoutes: await getApiRouteCount(),
    testFiles: await getTestFileCount(),
    languages: getLanguageCount(),
    docsPages: await getDocsPageCount(),
    liveDocsPages: await getLiveDocsPageCount(),
  };

  console.log(`📊 Dynamic counts (from source files):`);
  console.log(`   ├── UI Components:    ${counts.components}`);
  console.log(`   ├── Themes:           ${counts.themes}`);
  console.log(`   ├── Templates:        ${counts.templates}`);
  console.log(`   ├── API Routes:       ${counts.apiRoutes}`);
  console.log(`   ├── Test Files:       ${counts.testFiles}`);
  console.log(`   ├── Languages (i18n): ${counts.languages}`);
  console.log(`   ├── Docs Pages (MD):  ${counts.docsPages}`);
  console.log(`   └── Docs Pages (TSX): ${counts.liveDocsPages}`);
  console.log('');

  // Save counts to JSON for TypeScript usage
  await saveCountsToJson(counts);

  // Get replacement patterns
  const replacements = getReplacements(counts);

  let totalUpdated = 0;
  let totalChanges = 0;

  // Get all markdown files dynamically
  const markdownFiles = await getMarkdownFiles();
  console.log(`📁 Found ${markdownFiles.length} markdown files to scan\n`);

  for (const file of markdownFiles) {
    const result = updateMarkdownFile(file, replacements);
    if (result.updated) {
      totalUpdated++;
      totalChanges += result.changes;
    }
  }

  console.log('');
  console.log(`📝 Summary: ${totalUpdated} files updated, ${totalChanges} total changes`);
  console.log('');
}

main().catch(console.error);
