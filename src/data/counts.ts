/**
 * Dynamic Counts - Auto-generated from source files
 *
 * These values are automatically updated by:
 * - `npm run update-markdown-counts` (manual)
 * - `npm run build` (automatic via prebuild hook)
 *
 * DO NOT HARDCODE COUNTS IN MARKETING COPY!
 * Import from this file instead.
 *
 * @example
 * ```tsx
 * import { COUNTS, COUNT_STRINGS } from '@/data/counts';
 *
 * <p>{COUNT_STRINGS.components} production-ready components</p>
 * // Output: "72+ production-ready components"
 * ```
 */

import dynamicCounts from './dynamic-counts.json';

// =============================================================================
// RAW COUNTS (numbers)
// =============================================================================

export const COUNTS = {
  /** Number of UI components in src/components/ui/ */
  components: dynamicCounts.counts.uiComponents,

  /** Number of terminal themes */
  themes: dynamicCounts.counts.themes,

  /** Number of page templates in /library */
  templates: dynamicCounts.counts.templates,

  /** Number of API routes in src/app/api/ */
  apiRoutes: dynamicCounts.counts.apiRoutes,

  /** Number of test files */
  testFiles: dynamicCounts.counts.testFiles,

  /** Number of supported languages (i18n) */
  languages: dynamicCounts.counts.languages,

  /** Number of markdown documentation pages */
  docsPages: dynamicCounts.counts.docsPages,

  /** Number of live documentation pages (TSX) */
  liveDocsPages: dynamicCounts.counts.liveDocsPages,
} as const;

// =============================================================================
// STRING COUNTS (for marketing copy)
// =============================================================================

export const COUNT_STRINGS = {
  /** "72+" */
  components: dynamicCounts.strings.components,

  /** "12" */
  themes: dynamicCounts.strings.themes,

  /** "48+" */
  templates: dynamicCounts.strings.templates,

  /** "72+" */
  apiRoutes: dynamicCounts.strings.apiRoutes,

  /** "23+" */
  testFiles: dynamicCounts.strings.testFiles,

  /** "6" */
  languages: dynamicCounts.strings.languages,

  /** "131+" */
  docsPages: dynamicCounts.strings.docsPages,
} as const;

// =============================================================================
// LEGACY EXPORTS (backwards compatibility)
// =============================================================================

/** @deprecated Use COUNT_STRINGS.components instead */
export const COMPONENT_COUNT_STRING = COUNT_STRINGS.components;

/** @deprecated Use COUNT_STRINGS.templates instead */
export const TEMPLATE_COUNT_STRING = COUNT_STRINGS.templates;

/** @deprecated Use COUNT_STRINGS.themes instead */
export const THEME_COUNT_STRING = COUNT_STRINGS.themes;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Counts = typeof COUNTS;
export type CountStrings = typeof COUNT_STRINGS;

// =============================================================================
// METADATA
// =============================================================================

/** When the counts were last generated */
export const COUNTS_GENERATED_AT = dynamicCounts.generatedAt;
