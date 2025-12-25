/**
 * Development-only runtime validation
 *
 * Monitors DOM for accessibility violations in development mode.
 * Automatically disabled in production builds.
 *
 * IMPORTANT: This code only runs in the browser (client-side).
 * It uses browser APIs like MutationObserver, document, and window.
 */

// Only run in browser environment (not during SSR)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Track checked elements to avoid duplicate warnings
  const checkedElements = new WeakSet();
  let checkTimeout: NodeJS.Timeout;

  /**
   * Parse RGB color string to components
   * @param rgb - RGB string like "rgb(255, 255, 255)"
   * @returns [r, g, b] values 0-255
   */
  function parseRGB(rgb: string): [number, number, number] | null {
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return null;
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  }

  /**
   * Calculate relative luminance from RGB values
   * @param r - Red 0-255
   * @param g - Green 0-255
   * @param b - Blue 0-255
   * @returns Relative luminance 0-1
   */
  function getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      const val = c / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  /**
   * Calculate WCAG contrast ratio between two RGB colors
   * @param rgb1 - First RGB string
   * @param rgb2 - Second RGB string
   * @returns Contrast ratio or null if parsing fails
   */
  function calculateContrast(rgb1: string, rgb2: string): number | null {
    const color1 = parseRGB(rgb1);
    const color2 = parseRGB(rgb2);

    if (!color1 || !color2) return null;

    const lum1 = getLuminance(color1[0], color1[1], color1[2]);
    const lum2 = getLuminance(color2[0], color2[1], color2[2]);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Check contrast for all text elements in the DOM
   * Debounced to avoid performance issues
   */
  function checkContrast() {
    // Get all elements with text content
    const textElements = document.querySelectorAll(
      'p, span, div, h1, h2, h3, h4, h5, h6, a, button, label, li'
    );

    textElements.forEach((el) => {
      // Skip if already checked
      if (checkedElements.has(el)) return;

      const element = el as HTMLElement;

      // Skip hidden elements
      if (element.offsetParent === null) return;

      // Skip if no text content
      if (!element.textContent?.trim()) return;

      const styles = getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;

      // Skip transparent backgrounds (will inherit from parent)
      if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
        return;
      }

      const ratio = calculateContrast(color, backgroundColor);

      if (ratio === null) return;

      // Get font size for appropriate threshold
      const fontSize = parseFloat(styles.fontSize);
      const fontWeight = parseInt(styles.fontWeight) || 400;

      // Large text (18px+ or 14px+ bold) needs 3:1, normal text needs 4.5:1
      const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);
      const minRatio = isLargeText ? 3 : 4.5;

      if (ratio < minRatio) {
        console.warn(
          `⚠️ Contrast violation detected:\n` +
            `   Element: ${element.tagName.toLowerCase()}${element.className ? '.' + element.className.split(' ')[0] : ''}\n` +
            `   Ratio: ${ratio.toFixed(2)}:1 (need ${minRatio}:1)\n` +
            `   Color: ${color}\n` +
            `   Background: ${backgroundColor}\n` +
            `   Text: "${element.textContent?.trim().substring(0, 50)}..."`,
          element
        );
      }

      // Mark as checked
      checkedElements.add(el);
    });
  }

  /**
   * Debounced DOM mutation observer
   * Checks contrast after DOM changes settle
   */
  const observer = new MutationObserver(() => {
    clearTimeout(checkTimeout);
    checkTimeout = setTimeout(checkContrast, 1000);
  });

  // Start observing after page load
  window.addEventListener('DOMContentLoaded', () => {
    // Initial check
    checkContrast();

    // Watch for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    console.log('🎨 Dev validation active: Monitoring contrast ratios (WCAG 2.1 AA)');
  });
}

// Export empty object for import compatibility
export {};
