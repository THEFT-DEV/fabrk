/**
 * Color Utility Functions
 *
 * OKLCH color parsing and WCAG contrast ratio calculations
 */

/**
 * Parse OKLCH color string to [lightness, chroma, hue]
 *
 * @param oklch - OKLCH color string (e.g., "85% 0.30 145" or "85 0.30 145")
 * @returns [lightness (0-100), chroma (0-0.4), hue (0-360)]
 */
export function parseOKLCH(oklch: string): [number, number, number] {
  // Handle both "85% 0.30 145" and "85 0.30 145" formats
  const normalized = oklch.replace(/%/g, '').trim();
  const parts = normalized.split(/\s+/);

  if (parts.length !== 3) {
    throw new Error(`Invalid OKLCH format: ${oklch}. Expected "L C H" or "L% C H"`);
  }

  const lightness = parseFloat(parts[0]);
  const chroma = parseFloat(parts[1]);
  const hue = parseFloat(parts[2]);

  if (isNaN(lightness) || isNaN(chroma) || isNaN(hue)) {
    throw new Error(`Invalid OKLCH values: ${oklch}`);
  }

  if (lightness < 0 || lightness > 100) {
    throw new Error(`Lightness out of range (0-100): ${lightness}`);
  }

  if (chroma < 0 || chroma > 0.4) {
    console.warn(`Chroma out of typical range (0-0.4): ${chroma}`);
  }

  if (hue < 0 || hue > 360) {
    throw new Error(`Hue out of range (0-360): ${hue}`);
  }

  return [lightness, chroma, hue];
}

/**
 * Convert OKLCH lightness to relative luminance (approximate)
 *
 * This is a simplified conversion. For exact conversion, would need
 * OKLCH -> sRGB -> relative luminance, but this approximation works
 * well enough for contrast ratio estimation.
 *
 * @param lightness - OKLCH lightness (0-100)
 * @returns Relative luminance (0-1)
 */
function lightnessToLuminance(lightness: number): number {
  // OKLCH lightness is perceptually uniform, so we can use a power curve
  // to approximate relative luminance
  const normalized = lightness / 100;
  return Math.pow(normalized, 2.2);
}

/**
 * Calculate WCAG 2.1 contrast ratio between two OKLCH colors
 *
 * WCAG 2.1 Level AA requires:
 * - Normal text (< 18pt): 4.5:1
 * - Large text (≥ 18pt or ≥ 14pt bold): 3:1
 * - UI components: 3:1
 *
 * WCAG 2.1 Level AAA requires:
 * - Normal text: 7:1
 * - Large text: 4.5:1
 *
 * @param oklch1 - First OKLCH color string
 * @param oklch2 - Second OKLCH color string
 * @returns Contrast ratio (1:1 to 21:1)
 */
export function calculateContrastRatio(oklch1: string, oklch2: string): number {
  const [L1] = parseOKLCH(oklch1);
  const [L2] = parseOKLCH(oklch2);

  const lum1 = lightnessToLuminance(L1);
  const lum2 = lightnessToLuminance(L2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  // WCAG contrast ratio formula: (L1 + 0.05) / (L2 + 0.05)
  const ratio = (lighter + 0.05) / (darker + 0.05);

  return Math.round(ratio * 100) / 100; // Round to 2 decimal places
}

/**
 * Check if contrast ratio meets WCAG AA standard
 *
 * @param ratio - Contrast ratio
 * @param fontSize - Font size in pixels (default: 16)
 * @param isBold - Whether text is bold (default: false)
 * @returns true if meets AA standard
 */
export function meetsWCAG_AA(ratio: number, fontSize = 16, isBold = false): boolean {
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);
  const minRatio = isLargeText ? 3.0 : 4.5;
  return ratio >= minRatio;
}

/**
 * Check if contrast ratio meets WCAG AAA standard
 *
 * @param ratio - Contrast ratio
 * @param fontSize - Font size in pixels (default: 16)
 * @param isBold - Whether text is bold (default: false)
 * @returns true if meets AAA standard
 */
export function meetsWCAG_AAA(ratio: number, fontSize = 16, isBold = false): boolean {
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);
  const minRatio = isLargeText ? 4.5 : 7.0;
  return ratio >= minRatio;
}

/**
 * Format contrast ratio as string
 *
 * @param ratio - Contrast ratio
 * @returns Formatted string (e.g., "4.5:1")
 */
export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

/**
 * Get color description based on lightness
 *
 * @param lightness - OKLCH lightness (0-100)
 * @returns Color description
 */
export function getLightnessDescription(lightness: number): string {
  if (lightness >= 90) return 'Very light';
  if (lightness >= 70) return 'Light';
  if (lightness >= 50) return 'Medium';
  if (lightness >= 30) return 'Dark';
  return 'Very dark';
}
