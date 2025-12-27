/**
 * FONT CONFIGURATION
 *
 * Edit this file to customize the fonts available in the theme customizer.
 * All fonts are loaded from Google Fonts - no downloads required.
 *
 * To add a font:
 * 1. Find it on https://fonts.google.com
 * 2. Add it to FONT_OPTIONS below with the correct category
 * 3. That's it! The Google Fonts URL is auto-generated.
 *
 * Categories: 'display' | 'mono' | 'sans' | 'serif'
 */

export type FontCategory = 'display' | 'mono' | 'sans' | 'serif';

export interface FontOption {
  /** Unique identifier */
  value: string;
  /** Display name in dropdown */
  label: string;
  /** Google Fonts family name (must match exactly) */
  googleFamily: string;
  /** CSS font-family value */
  cssValue: string;
  /** Font category for grouping */
  category: FontCategory;
  /** Font weights to load (default: [400, 500, 700]) */
  weights?: number[];
}

/**
 * Available fonts in the theme customizer.
 * Add, remove, or reorder fonts here.
 */
export const FONT_OPTIONS: FontOption[] = [
  // ═══════════════════════════════════════════════════════════════
  // DISPLAY FONTS - Bold, condensed fonts for headlines
  // ═══════════════════════════════════════════════════════════════
  {
    value: 'bebas-neue',
    label: 'Bebas Neue',
    googleFamily: 'Bebas Neue',
    cssValue: "'Bebas Neue', Impact, sans-serif",
    category: 'display',
    weights: [400],
  },
  {
    value: 'oswald',
    label: 'Oswald',
    googleFamily: 'Oswald',
    cssValue: "'Oswald', Impact, sans-serif",
    category: 'display',
  },
  {
    value: 'anton',
    label: 'Anton',
    googleFamily: 'Anton',
    cssValue: "'Anton', Impact, sans-serif",
    category: 'display',
    weights: [400],
  },
  {
    value: 'archivo-black',
    label: 'Archivo Black',
    googleFamily: 'Archivo Black',
    cssValue: "'Archivo Black', Impact, sans-serif",
    category: 'display',
    weights: [400],
  },
  {
    value: 'russo-one',
    label: 'Russo One',
    googleFamily: 'Russo One',
    cssValue: "'Russo One', Impact, sans-serif",
    category: 'display',
    weights: [400],
  },

  // ═══════════════════════════════════════════════════════════════
  // MONOSPACE FONTS - For code and terminal aesthetic
  // ═══════════════════════════════════════════════════════════════
  {
    value: 'jetbrains',
    label: 'JetBrains Mono (Default)',
    googleFamily: 'JetBrains Mono',
    cssValue: "'JetBrains Mono', ui-monospace, monospace",
    category: 'mono',
  },
  {
    value: 'fira-code',
    label: 'Fira Code',
    googleFamily: 'Fira Code',
    cssValue: "'Fira Code', ui-monospace, monospace",
    category: 'mono',
  },
  {
    value: 'source-code',
    label: 'Source Code Pro',
    googleFamily: 'Source Code Pro',
    cssValue: "'Source Code Pro', ui-monospace, monospace",
    category: 'mono',
  },
  {
    value: 'ibm-plex',
    label: 'IBM Plex Mono',
    googleFamily: 'IBM Plex Mono',
    cssValue: "'IBM Plex Mono', ui-monospace, monospace",
    category: 'mono',
  },
  {
    value: 'roboto-mono',
    label: 'Roboto Mono',
    googleFamily: 'Roboto Mono',
    cssValue: "'Roboto Mono', ui-monospace, monospace",
    category: 'mono',
  },
  {
    value: 'space-mono',
    label: 'Space Mono',
    googleFamily: 'Space Mono',
    cssValue: "'Space Mono', ui-monospace, monospace",
    category: 'mono',
    weights: [400, 700],
  },

  // ═══════════════════════════════════════════════════════════════
  // SANS-SERIF FONTS - Clean, modern fonts for body text
  // ═══════════════════════════════════════════════════════════════
  {
    value: 'inter',
    label: 'Inter',
    googleFamily: 'Inter',
    cssValue: "'Inter', system-ui, sans-serif",
    category: 'sans',
  },
  {
    value: 'roboto',
    label: 'Roboto',
    googleFamily: 'Roboto',
    cssValue: "'Roboto', system-ui, sans-serif",
    category: 'sans',
  },
  {
    value: 'open-sans',
    label: 'Open Sans',
    googleFamily: 'Open Sans',
    cssValue: "'Open Sans', system-ui, sans-serif",
    category: 'sans',
  },
  {
    value: 'lato',
    label: 'Lato',
    googleFamily: 'Lato',
    cssValue: "'Lato', system-ui, sans-serif",
    category: 'sans',
    weights: [400, 700],
  },
  {
    value: 'poppins',
    label: 'Poppins',
    googleFamily: 'Poppins',
    cssValue: "'Poppins', system-ui, sans-serif",
    category: 'sans',
  },
  {
    value: 'montserrat',
    label: 'Montserrat',
    googleFamily: 'Montserrat',
    cssValue: "'Montserrat', system-ui, sans-serif",
    category: 'sans',
  },

  // ═══════════════════════════════════════════════════════════════
  // SERIF FONTS - Classic, elegant fonts
  // ═══════════════════════════════════════════════════════════════
  {
    value: 'playfair',
    label: 'Playfair Display',
    googleFamily: 'Playfair Display',
    cssValue: "'Playfair Display', serif",
    category: 'serif',
    weights: [400, 700],
  },
  {
    value: 'merriweather',
    label: 'Merriweather',
    googleFamily: 'Merriweather',
    cssValue: "'Merriweather', serif",
    category: 'serif',
    weights: [400, 700],
  },
  {
    value: 'lora',
    label: 'Lora',
    googleFamily: 'Lora',
    cssValue: "'Lora', serif",
    category: 'serif',
    weights: [400, 700],
  },
  {
    value: 'crimson',
    label: 'Crimson Text',
    googleFamily: 'Crimson Text',
    cssValue: "'Crimson Text', serif",
    category: 'serif',
    weights: [400, 700],
  },
];

/**
 * FONT PAIRINGS
 *
 * When a body font is selected, the headline font auto-updates to its pair.
 * Users can still override by manually selecting a different headline font.
 *
 * Format: { bodyFont: headlineFont }
 */
export const FONT_PAIRINGS: Record<string, string> = {
  // Monospace body → Same mono (terminal consistency) or display headline
  'jetbrains': 'jetbrains',
  'fira-code': 'fira-code',
  'source-code': 'source-code',
  'ibm-plex': 'ibm-plex',
  'roboto-mono': 'roboto-mono',
  'space-mono': 'space-mono',

  // Sans-serif body → Display or contrasting headline
  'inter': 'bebas-neue',
  'roboto': 'oswald',
  'open-sans': 'anton',
  'lato': 'archivo-black',
  'poppins': 'russo-one',
  'montserrat': 'bebas-neue',

  // Serif body → Display headline for contrast
  'playfair': 'bebas-neue',
  'merriweather': 'oswald',
  'lora': 'anton',
  'crimson': 'archivo-black',

  // Display body → Same display or mono headline
  'bebas-neue': 'bebas-neue',
  'oswald': 'oswald',
  'anton': 'anton',
  'archivo-black': 'archivo-black',
  'russo-one': 'russo-one',
};

/**
 * Get the recommended headline font for a body font.
 * Returns the body font itself if no pairing is defined.
 */
export function getPairedHeadlineFont(bodyFont: string): string {
  return FONT_PAIRINGS[bodyFont] || bodyFont;
}

/**
 * Get the recommended body font for a headline font.
 * Truly bidirectional: if A ↔ B, selecting either gives you the other.
 */
export function getPairedBodyFont(headlineFont: string): string {
  // Mirror of FONT_PAIRINGS - each pair works both directions
  const reversePairings: Record<string, string> = {
    // Display ↔ Sans-serif (primary pairings)
    'bebas-neue': 'inter',
    'oswald': 'roboto',
    'anton': 'open-sans',
    'archivo-black': 'lato',
    'russo-one': 'poppins',

    // Sans-serif ↔ Display (same pairs, other direction)
    'inter': 'bebas-neue',
    'roboto': 'oswald',
    'open-sans': 'anton',
    'lato': 'archivo-black',
    'poppins': 'russo-one',
    'montserrat': 'bebas-neue',

    // Monospace ↔ Monospace (self-paired)
    'jetbrains': 'jetbrains',
    'fira-code': 'fira-code',
    'source-code': 'source-code',
    'ibm-plex': 'ibm-plex',
    'roboto-mono': 'roboto-mono',
    'space-mono': 'space-mono',

    // Serif ↔ Display (contrast pairings)
    'playfair': 'bebas-neue',
    'merriweather': 'oswald',
    'lora': 'anton',
    'crimson': 'archivo-black',
  };

  return reversePairings[headlineFont] || headlineFont;
}

/**
 * Default fonts (used when no saved config exists)
 * IMPORTANT: These must match a 'value' in FONT_OPTIONS above
 */
export const DEFAULT_BODY_FONT = 'jetbrains';
export const DEFAULT_HEADLINE_FONT = 'jetbrains';

// ═══════════════════════════════════════════════════════════════
// VALIDATION - Catches config errors at build time
// ═══════════════════════════════════════════════════════════════

// Check for duplicate values
const fontValues = FONT_OPTIONS.map((f) => f.value);
const duplicates = fontValues.filter((v, i) => fontValues.indexOf(v) !== i);
if (duplicates.length > 0) {
  throw new Error(`[fonts.ts] Duplicate font values found: ${duplicates.join(', ')}`);
}

// Check that defaults exist in options
if (!FONT_OPTIONS.find((f) => f.value === DEFAULT_BODY_FONT)) {
  throw new Error(`[fonts.ts] DEFAULT_BODY_FONT "${DEFAULT_BODY_FONT}" not found in FONT_OPTIONS`);
}
if (!FONT_OPTIONS.find((f) => f.value === DEFAULT_HEADLINE_FONT)) {
  throw new Error(`[fonts.ts] DEFAULT_HEADLINE_FONT "${DEFAULT_HEADLINE_FONT}" not found in FONT_OPTIONS`);
}

/**
 * Generates the Google Fonts URL from FONT_OPTIONS.
 * This is called at build time, so adding fonts above automatically updates the URL.
 */
export function generateGoogleFontsUrl(): string {
  if (FONT_OPTIONS.length === 0) {
    console.warn('[fonts.ts] No fonts configured - using empty Google Fonts URL');
    return '';
  }

  const families = FONT_OPTIONS.map((font) => {
    const weights = font.weights || [400, 500, 700];
    const weightStr = weights.join(';');
    // Google Fonts URL format: family=Font+Name:wght@400;500;700
    const familyName = font.googleFamily.replace(/ /g, '+');
    return `family=${familyName}:wght@${weightStr}`;
  }).join('&');

  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

/**
 * Pre-generated URL for use in layout.tsx
 * This avoids calling generateGoogleFontsUrl() at runtime
 */
export const GOOGLE_FONTS_URL = generateGoogleFontsUrl();

/**
 * Get a font's CSS value by its value key.
 * Returns a safe fallback if font not found.
 */
export function getFontCssValue(fontValue: string): string {
  const font = FONT_OPTIONS.find((f) => f.value === fontValue);
  if (font) {
    return font.cssValue;
  }
  // Fallback to system monospace (safe default for terminal theme)
  console.warn(`[fonts.ts] Font "${fontValue}" not found, using system fallback`);
  return 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
}

/**
 * Get fonts by category for building dropdown menus
 */
export function getFontsByCategory(category: FontCategory): FontOption[] {
  return FONT_OPTIONS.filter((f) => f.category === category);
}
