/**
 * Template Inventory Validation System
 * Ensures filesystem pages and library-data.ts registry stay in sync
 * Run on build to catch drift before deployment
 */

import { glob } from 'glob';
import { templates } from '@/app/(marketing)/library/library-data';

interface ValidationResult {
  valid: boolean;
  totalFilesystem: number;
  totalRegistry: number;
  orphans: string[]; // In filesystem but not registered
  missing: string[]; // Registered but no file exists
  categoryPages: string[]; // Category pages (not templates)
  mainIndex: boolean; // Main library index exists
}

/**
 * Extract template ID from file path
 * Example: "src/app/(marketing)/library/analytics-dashboard/page.tsx" → "analytics-dashboard"
 * Example: "src/app/(marketing)/library/authentication/sign-in/page.tsx" → "sign-in"
 * Example: "src/app/(marketing)/library/page.tsx" → "" (main index)
 */
function extractIdFromPath(filePath: string): string {
  // Remove the base path and page.tsx
  const relativePath = filePath
    .replace('src/app/(marketing)/library/', '')
    .replace('/page.tsx', '')
    .replace('page.tsx', ''); // Handle root library/page.tsx

  // Handle nested paths (e.g., authentication/sign-in)
  const parts = relativePath.split('/').filter((p) => p !== '');

  // For nested authentication routes, take the last part
  if (parts.length > 1 && parts[0] === 'authentication') {
    return parts[parts.length - 1];
  }

  // For nested blog routes
  if (parts.length > 1 && parts[0] === 'blog' && parts[1] === 'post') {
    return 'blog-post';
  }

  // If empty, it's the main index
  return relativePath;
}

/**
 * Known category pages (not templates)
 */
const CATEGORY_PAGES = [
  '', // Main library index (empty after path processing)
  'dashboards', // Category page
  'authentication', // Category page
  'admin-panels', // Category page
  'account-pages', // Category page
  'marketing', // Category page
];

/**
 * Validate that template registry matches filesystem
 */
export async function validateTemplateRegistry(): Promise<ValidationResult> {
  // Find all page.tsx files in library directory
  const filesystemPages = await glob('src/app/(marketing)/library/**/page.tsx');

  // Extract template IDs from paths
  const filesystemIds = filesystemPages
    .map(extractIdFromPath)
    .filter((id) => !CATEGORY_PAGES.includes(id)); // Exclude category pages

  // Get registered template IDs
  const registeredIds = templates.map((t) => t.id);

  // Find orphans (in filesystem but not registered)
  const orphans = filesystemIds.filter((id) => !registeredIds.includes(id));

  // Find missing (registered but no file)
  const missing = registeredIds.filter((id) => !filesystemIds.includes(id));

  // Identify category pages
  const categoryPages = filesystemPages
    .map(extractIdFromPath)
    .filter((id) => CATEGORY_PAGES.includes(id));

  // Check main index exists
  const mainIndex = filesystemPages.some((p) => p.endsWith('library/page.tsx'));

  const result: ValidationResult = {
    valid: orphans.length === 0 && missing.length === 0,
    totalFilesystem: filesystemIds.length,
    totalRegistry: registeredIds.length,
    orphans,
    missing,
    categoryPages,
    mainIndex,
  };

  return result;
}

/**
 * CLI validation script
 * Run with: npx tsx src/lib/template-inventory.ts
 */
if (require.main === module) {
  validateTemplateRegistry()
    .then((result) => {
      console.log('\n📋 Template Inventory Validation Report\n');
      console.log(`Total Templates (Filesystem): ${result.totalFilesystem}`);
      console.log(`Total Templates (Registry):   ${result.totalRegistry}`);
      console.log(`Category Pages:               ${result.categoryPages.length}`);
      console.log(`Main Index Exists:            ${result.mainIndex ? '✅' : '❌'}\n`);

      if (result.orphans.length > 0) {
        console.error('❌ ORPHANED TEMPLATES (in filesystem but not registered):');
        result.orphans.forEach((id) => console.error(`   - ${id}`));
        console.error(
          '\n   Fix: Add these templates to src/app/(marketing)/library/library-data.ts\n'
        );
      }

      if (result.missing.length > 0) {
        console.error('❌ MISSING FILES (registered but no page.tsx exists):');
        result.missing.forEach((id) => console.error(`   - ${id}`));
        console.error('\n   Fix: Either create the page or remove from library-data.ts\n');
      }

      if (result.valid) {
        console.log('✅ All templates are properly registered!\n');
        process.exit(0);
      } else {
        console.error('❌ Template registry validation FAILED\n');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('Error during validation:', error);
      process.exit(1);
    });
}
