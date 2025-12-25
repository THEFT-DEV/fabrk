/**
 * Docs Spacing System
 * Consistent spacing across all documentation pages
 */

export const docsSpacing = {
  // Between major page sections (header, overview, setup, etc.)
  pageSections: 'space-y-16',

  // Between items within a section
  sectionItems: 'space-y-6',

  // Between subsections
  subsections: 'space-y-8',

  // Card internal padding
  cardPadding: 'p-6',

  // Between elements inside a card
  cardContent: 'space-y-4',

  // Step list spacing
  stepList: 'space-y-6',

  // Feature grid gap
  featureGrid: 'gap-4',
} as const;

export type DocsSpacingKey = keyof typeof docsSpacing;
