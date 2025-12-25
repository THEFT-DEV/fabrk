/**
 * Color Utility Functions for WCAG Validation
 *
 * Handles OKLCH color parsing and contrast ratio calculations.
 */

/**
 * Parse OKLCH color string to components
 * @param {string} oklch - OKLCH color string (e.g., "85% 0.30 145" or "oklch(85% 0.30 145)")
 * @returns {{l: number, c: number, h: number}} Parsed components
 */
export function parseOKLCH(oklch) {
  // Remove oklch() wrapper if present
  const cleaned = oklch.replace(/oklch\((.*)\)/, '$1').trim();

  // Match: "85% 0.30 145" or "85 0.30 145"
  const match = cleaned.match(/([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/);

  if (!match) {
    throw new Error(`Invalid OKLCH format: ${oklch}`);
  }

  return {
    l: parseFloat(match[1]), // Lightness 0-100
    c: parseFloat(match[2]), // Chroma 0-0.4
    h: parseFloat(match[3]), // Hue 0-360
  };
}

/**
 * Convert OKLCH lightness to relative luminance (approximate)
 * This is a simplified conversion for WCAG contrast checking
 * @param {number} lightness - OKLCH lightness (0-100)
 * @returns {number} Relative luminance (0-1)
 */
export function lightnessToLuminance(lightness) {
  // OKLCH lightness is perceptually uniform, roughly maps to CIE L*
  // Convert to relative luminance using gamma approximation
  return Math.pow(lightness / 100, 2.2);
}

/**
 * Calculate WCAG 2.1 contrast ratio between two OKLCH colors
 * @param {string} color1 - First OKLCH color
 * @param {string} color2 - Second OKLCH color
 * @returns {number} Contrast ratio (1-21)
 */
export function calculateContrastRatio(color1, color2) {
  const { l: l1 } = parseOKLCH(color1);
  const { l: l2 } = parseOKLCH(color2);

  const lum1 = lightnessToLuminance(l1);
  const lum2 = lightnessToLuminance(l2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG level
 * @param {number} ratio - Contrast ratio
 * @param {'AA' | 'AAA'} level - WCAG level
 * @param {'normal' | 'large'} textSize - Text size category
 * @returns {boolean} Whether ratio meets the level
 */
export function meetsWCAG(ratio, level = 'AA', textSize = 'normal') {
  const requirements = {
    'AA': { normal: 4.5, large: 3.0 },
    'AAA': { normal: 7.0, large: 4.5 },
  };

  const required = requirements[level][textSize];
  return ratio >= required;
}

/**
 * Get WCAG rating for a contrast ratio
 * @param {number} ratio - Contrast ratio
 * @param {'normal' | 'large'} textSize - Text size category
 * @returns {{level: string, passes: boolean}} Rating info
 */
export function getWCAGRating(ratio, textSize = 'normal') {
  if (meetsWCAG(ratio, 'AAA', textSize)) {
    return { level: 'AAA', passes: true };
  }
  if (meetsWCAG(ratio, 'AA', textSize)) {
    return { level: 'AA', passes: true };
  }
  return { level: 'FAIL', passes: false };
}
