/**
 * Docs Typography System
 * M3-aligned type tokens for documentation pages
 *
 * Token naming follows M3 conventions:
 * - display-{size}: Hero content
 * - headline-{size}: Page/section titles
 * - title-{size}: Subsection headers
 * - body-{size}: Running text
 * - label-{size}: UI components
 *
 * @see https://m3.material.io/styles/typography/type-scale-tokens
 */

export const docsTypography = {
  // h1 - Page title (headline-l: 32px/40px)
  h1: 'text-headline-l',

  // h2 - Section title (headline-s: 24px/32px)
  h2: 'text-headline-s text-primary',

  // h3 - Subsection title (title-l: 22px/30px)
  h3: 'text-title-l',

  // h4 - Card/item title (title-s: 14px/20px)
  h4: 'text-title-s',

  // Body text (body-s: 12px/16px)
  body: 'text-body-s text-muted-foreground',

  // Caption/small text (label-s: 11px/16px)
  caption: 'text-caption text-muted-foreground',

  // Code inline (code-s: 12px/16px)
  code: 'text-code-s bg-muted px-1.5 py-0.5',

  // Label (label-m: 12px/16px)
  label: 'text-label-m text-muted-foreground',

  // Terminal badge text (label-l: 14px/20px)
  badge: 'text-label-l text-muted-foreground',
} as const;

export type DocsTypographyKey = keyof typeof docsTypography;
