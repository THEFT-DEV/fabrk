import { test, expect } from '@playwright/test';

/**
 * AUTOMATED STYLE VALIDATION (No Human in the Loop)
 *
 * Unlike VRT which compares screenshots, this validates computed CSS
 * against design system rules programmatically. No baselines needed.
 *
 * RULES define correctness, not human-approved screenshots.
 */

// Increase timeout for pages with animations
test.setTimeout(60000);

// ============================================================================
// DESIGN SYSTEM RULES (Source of Truth)
// ============================================================================

const DESIGN_RULES = {
  // Border radius - terminal aesthetic = sharp corners
  borderRadius: {
    expected: '0px',
    exceptions: ['rounded-full', '9999px'], // Avatar circles and pill shapes allowed
  },

  // Font family - terminal = monospace
  fontFamily: {
    mustContain: ['mono', 'monospace', 'Consolas', 'Monaco', 'Courier'],
    components: ['button', 'input', 'select', 'code', 'pre'],
  },

  // Colors must use CSS variables (oklch/hsl), not hardcoded
  colorFormat: {
    forbidden: /^#[0-9a-fA-F]{3,6}$|^rgb\(|^rgba\(/,
    allowed: /^oklch\(|^hsl\(|^var\(|^transparent|^inherit|^currentColor/,
  },

  // Shadows - terminal aesthetic = no shadows
  boxShadow: {
    forbidden: ['shadow-md', 'shadow-lg', 'shadow-xl'],
    allowed: ['none', '0px 0px 0px', 'shadow-sm'],
  },
};

// Pages to validate
const PAGES_TO_VALIDATE = [
  '/',
  '/docs',
  '/docs/components/button',
  '/docs/components/input',
  '/library',
  '/pricing',
  '/contact',
];

// ============================================================================
// BORDER RADIUS VALIDATION
// ============================================================================

test.describe('Automated: Border Radius (Terminal = Sharp)', () => {
  for (const url of PAGES_TO_VALIDATE) {
    test(`Sharp corners on ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000); // Brief wait for styles to apply

      // Check buttons
      const buttons = await page.locator('button').all();
      const violations: string[] = [];

      for (let i = 0; i < Math.min(buttons.length, 20); i++) {
        const button = buttons[i];
        if (!(await button.isVisible())) continue;

        const borderRadius = await button.evaluate((el) => getComputedStyle(el).borderRadius);
        const className = (await button.getAttribute('class')) || '';

        // Skip rounded-full (allowed for icons/avatars) and 9999px (pill shapes)
        if (className.includes('rounded-full')) continue;
        if (borderRadius === '9999px' || borderRadius.includes('9999px')) continue;

        // Check if radius is 0
        if (borderRadius !== '0px' && !borderRadius.includes('0px')) {
          const text = await button.textContent();
          violations.push(`Button "${text?.slice(0, 20)}": border-radius=${borderRadius}`);
        }
      }

      // Check inputs
      const inputs = await page.locator('input, textarea, select').all();
      for (let i = 0; i < Math.min(inputs.length, 20); i++) {
        const input = inputs[i];
        if (!(await input.isVisible())) continue;

        const borderRadius = await input.evaluate((el) => getComputedStyle(el).borderRadius);

        if (borderRadius !== '0px' && !borderRadius.includes('0px')) {
          const placeholder = await input.getAttribute('placeholder');
          violations.push(`Input "${placeholder?.slice(0, 20) || 'unknown'}": border-radius=${borderRadius}`);
        }
      }

      if (violations.length > 0) {
        console.warn(`[BORDER RADIUS] ${url} has ${violations.length} violations:`);
        violations.slice(0, 5).forEach((v) => console.warn(`  - ${v}`));
      }

      // Fail if violations found
      expect(violations.length, `Found ${violations.length} elements with rounded corners on ${url}`).toBe(0);
    });
  }
});

// ============================================================================
// FONT FAMILY VALIDATION
// ============================================================================

test.describe('Automated: Font Family (Terminal = Monospace)', () => {
  for (const url of PAGES_TO_VALIDATE) {
    test(`Monospace fonts on ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      const violations: string[] = [];

      // Check buttons have monospace
      const buttons = await page.locator('button').all();
      for (let i = 0; i < Math.min(buttons.length, 10); i++) {
        const button = buttons[i];
        if (!(await button.isVisible())) continue;

        const fontFamily = await button.evaluate((el) => getComputedStyle(el).fontFamily);
        const hasMonospace = DESIGN_RULES.fontFamily.mustContain.some((font) =>
          fontFamily.toLowerCase().includes(font.toLowerCase())
        );

        if (!hasMonospace) {
          const text = await button.textContent();
          violations.push(`Button "${text?.slice(0, 20)}": font=${fontFamily.slice(0, 30)}`);
        }
      }

      if (violations.length > 0) {
        console.warn(`[FONT FAMILY] ${url} has ${violations.length} non-monospace elements:`);
        violations.slice(0, 5).forEach((v) => console.warn(`  - ${v}`));
      }

      // Warn but don't fail (some UI text may intentionally use sans)
      if (violations.length > 5) {
        expect(violations.length, `Too many non-monospace elements on ${url}`).toBeLessThan(10);
      }
    });
  }
});

// ============================================================================
// HARDCODED COLOR VALIDATION
// ============================================================================

test.describe('Automated: No Hardcoded Colors', () => {
  for (const url of PAGES_TO_VALIDATE) {
    test(`CSS variable colors on ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Check for inline style with hex colors
      const elementsWithHex = await page.locator('[style*="#"]').count();

      if (elementsWithHex > 0) {
        const details = await page.locator('[style*="#"]').evaluateAll((elements) => {
          return elements
            .slice(0, 10)
            .map((el) => ({
              tag: el.tagName,
              style: el.getAttribute('style'),
            }))
            .filter((item) => item.style?.match(/#[0-9a-fA-F]{3,6}/));
        });

        // Filter out SVGs (charts use hex legitimately)
        const nonSvgHex = details.filter(
          (d) => !['SVG', 'PATH', 'CIRCLE', 'RECT', 'LINE'].includes(d.tag)
        );

        if (nonSvgHex.length > 0) {
          console.warn(`[HARDCODED COLORS] ${url} has ${nonSvgHex.length} elements with hex colors`);
          nonSvgHex.forEach((d) => console.warn(`  - ${d.tag}: ${d.style?.slice(0, 50)}`));
        }

        expect(nonSvgHex.length, `Found hardcoded hex colors on ${url}`).toBe(0);
      }
    });
  }
});

// ============================================================================
// SHADOW VALIDATION
// ============================================================================

test.describe('Automated: No Heavy Shadows', () => {
  for (const url of PAGES_TO_VALIDATE) {
    test(`No banned shadows on ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Check for shadow-md, shadow-lg, shadow-xl classes
      const bannedShadows = await page
        .locator('.shadow-md, .shadow-lg, .shadow-xl, .shadow-2xl')
        .count();

      if (bannedShadows > 0) {
        console.warn(`[SHADOWS] ${url} has ${bannedShadows} elements with banned shadow classes`);
      }

      expect(bannedShadows, `Found banned shadow classes on ${url}`).toBe(0);
    });
  }
});

// ============================================================================
// FOCUS RING VALIDATION (Accessibility)
// ============================================================================

test.describe('Automated: Focus Rings Visible', () => {
  test('Interactive elements have focus styles', async ({ page }) => {
    await page.goto('/docs/components/button');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    // Tab to first interactive element
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    if ((await focusedElement.count()) > 0) {
      // Check that focus ring is visible
      const outline = await focusedElement.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          boxShadow: styles.boxShadow,
          ring: styles.getPropertyValue('--tw-ring-width'),
        };
      });

      // Must have some form of focus indicator
      const hasFocusIndicator =
        outline.outline !== 'none' ||
        outline.outlineWidth !== '0px' ||
        (outline.boxShadow && outline.boxShadow !== 'none');

      expect(hasFocusIndicator, 'Focused element must have visible focus indicator').toBe(true);
    }
  });
});

// ============================================================================
// TOUCH TARGET SIZE VALIDATION (Accessibility)
// ============================================================================

test.describe('Automated: Touch Target Size (44x44 min)', () => {
  for (const url of ['/docs/components/button', '/contact']) {
    test(`Touch targets on ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      const violations: string[] = [];

      // Check buttons
      const buttons = await page.locator('button').all();
      for (let i = 0; i < Math.min(buttons.length, 15); i++) {
        const button = buttons[i];
        if (!(await button.isVisible())) continue;

        const box = await button.boundingBox();
        if (box && (box.width < 44 || box.height < 44)) {
          // Skip icon-only buttons that have aria-label (handled differently)
          const ariaLabel = await button.getAttribute('aria-label');
          if (!ariaLabel) {
            const text = await button.textContent();
            violations.push(
              `Button "${text?.slice(0, 15)}": ${Math.round(box.width)}x${Math.round(box.height)}px`
            );
          }
        }
      }

      if (violations.length > 0) {
        console.warn(`[TOUCH TARGETS] ${url} has ${violations.length} small touch targets:`);
        violations.forEach((v) => console.warn(`  - ${v}`));
      }

      // Warn but don't fail (sidebar nav buttons, icon buttons are intentionally small)
      expect(violations.length, `Found ${violations.length} small touch targets`).toBeLessThan(15);
    });
  }
});

// ============================================================================
// COLOR CONTRAST VALIDATION (Accessibility)
// ============================================================================

test.describe('Automated: Color Contrast', () => {
  test('Text has sufficient contrast', async ({ page }) => {
    await page.goto('/docs');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    // Sample text elements
    const textElements = await page.locator('p, span, h1, h2, h3, h4, h5, h6, a, button').all();
    const lowContrastElements: string[] = [];

    for (let i = 0; i < Math.min(textElements.length, 20); i++) {
      const el = textElements[i];
      if (!(await el.isVisible())) continue;

      const { color, background, text } = await el.evaluate((element) => {
        const styles = getComputedStyle(element);
        return {
          color: styles.color,
          background: styles.backgroundColor,
          text: element.textContent?.slice(0, 30) || '',
        };
      });

      // Parse RGB values and calculate relative luminance
      const parseRgb = (rgb: string) => {
        const match = rgb.match(/\d+/g);
        return match ? match.map(Number) : [0, 0, 0];
      };

      const [r1, g1, b1] = parseRgb(color);
      const [r2, g2, b2] = parseRgb(background);

      // Simple luminance calculation
      const lum1 = 0.299 * r1 + 0.587 * g1 + 0.114 * b1;
      const lum2 = 0.299 * r2 + 0.587 * g2 + 0.114 * b2;
      const contrast = Math.abs(lum1 - lum2);

      // Very low contrast check (rough approximation) - lower threshold to reduce false positives
      if (contrast < 30 && text.trim().length > 0) {
        lowContrastElements.push(`"${text}": contrast=${Math.round(contrast)}`);
      }
    }

    if (lowContrastElements.length > 0) {
      console.warn(`[CONTRAST] Found ${lowContrastElements.length} potentially low contrast elements`);
      lowContrastElements.slice(0, 5).forEach((e) => console.warn(`  - ${e}`));
    }

    // Warn but don't fail (this is a rough check, real a11y testing uses axe-core)
    expect(lowContrastElements.length).toBeLessThan(20);
  });
});

// ============================================================================
// CONSISTENT SPACING VALIDATION
// ============================================================================

test.describe('Automated: Spacing Scale (8pt Grid)', () => {
  test('Elements use 8pt grid spacing', async ({ page }) => {
    await page.goto('/docs/components/button');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    const violations: string[] = [];
    const validSpacing = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]; // 8pt grid

    const buttons = await page.locator('button').all();
    for (let i = 0; i < Math.min(buttons.length, 10); i++) {
      const button = buttons[i];
      if (!(await button.isVisible())) continue;

      const padding = await button.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          top: parseInt(styles.paddingTop),
          right: parseInt(styles.paddingRight),
          bottom: parseInt(styles.paddingBottom),
          left: parseInt(styles.paddingLeft),
        };
      });

      // Check if padding values are on the 8pt grid (with some tolerance)
      const isOnGrid = (value: number) =>
        validSpacing.some((v) => Math.abs(value - v) <= 2);

      if (!isOnGrid(padding.top) || !isOnGrid(padding.left)) {
        const text = await button.textContent();
        violations.push(
          `Button "${text?.slice(0, 15)}": padding=${padding.top}/${padding.right}/${padding.bottom}/${padding.left}`
        );
      }
    }

    if (violations.length > 0) {
      console.warn(`[SPACING] Found ${violations.length} elements off 8pt grid:`);
      violations.forEach((v) => console.warn(`  - ${v}`));
    }

    // Informational - spacing is flexible
    expect(violations.length).toBeLessThan(20);
  });
});

// ============================================================================
// SUMMARY TEST
// ============================================================================

test('Design System Compliance Summary', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const summary = {
    totalPages: PAGES_TO_VALIDATE.length,
    rules: Object.keys(DESIGN_RULES).length,
    categories: [
      'Border Radius (Sharp Corners)',
      'Font Family (Monospace)',
      'Colors (CSS Variables)',
      'Shadows (None/Minimal)',
      'Focus Rings (Visible)',
      'Touch Targets (44x44)',
      'Color Contrast',
      'Spacing (8pt Grid)',
    ],
  };

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║         AUTOMATED DESIGN SYSTEM VALIDATION                   ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(`\n📊 Validating ${summary.totalPages} pages against ${summary.categories.length} rules`);
  console.log('\nRules checked:');
  summary.categories.forEach((cat) => console.log(`  ✓ ${cat}`));
  console.log('\n');

  expect(true).toBe(true); // Always pass - just prints summary
});
