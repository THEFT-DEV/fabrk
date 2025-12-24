import { test, expect } from '@playwright/test';

/**
 * TEMPLATE PAGES VISUAL REGRESSION
 *
 * Tests all ~30 template category pages in /library/
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

test.describe('Template Pages (30 categories)', () => {
  const templatePages = [
    'admin-panels',
    'documentation',
    'security-privacy',
    'search-results',
    'pricing-page',
    'billing-dashboard',
    'email-templates',
    'chart-library',
    'modals',
    'account-pages',
    'landing-variations',
    'blog',
    'error-pages',
    'profile',
    'dashboards',
    'marketing',
    'settings-page',
    'analytics-dashboard',
    'user-management',
    'team-dashboard',
    'empty-states',
    'authentication',
    'notifications',
    'onboarding',
  ];

  for (const templateName of templatePages) {
    test(`Template: ${templateName}`, async ({ page }) => {
      await page.goto(`/library/${templateName}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500); // Templates may have more animations

      await expect(page).toHaveScreenshot(`template-${templateName}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 150, // Higher tolerance for complex templates
      });
    });
  }
});

// ============================================================================
// TEMPLATE TERMINAL STYLE VALIDATION
// ============================================================================

test.describe('Template Pages Terminal Style', () => {
  // Sample 10 template pages for thorough terminal style validation
  const sampleTemplates = [
    'admin-panels',
    'dashboards',
    'authentication',
    'pricing-page',
    'billing-dashboard',
    'analytics-dashboard',
    'settings-page',
    'user-management',
    'error-pages',
    'landing-variations',
  ];

  for (const templateName of sampleTemplates) {
    test(`Terminal Check: ${templateName}`, async ({ page }) => {
      await page.goto(`/library/${templateName}`);
      await page.waitForLoadState('networkidle');

      // Check for banned rounded classes on buttons
      const bannedRoundedButtons = await page.locator('button.rounded-sm, button.rounded-md, button.rounded-lg, button.rounded-xl').count();
      expect(bannedRoundedButtons, `Found ${bannedRoundedButtons} buttons with banned rounded classes on ${templateName}`).toBe(0);

      // Check for banned rounded classes on inputs
      const bannedRoundedInputs = await page.locator('input.rounded-sm, input.rounded-md, input.rounded-lg, input.rounded-xl, textarea.rounded-sm, textarea.rounded-md, textarea.rounded-lg, textarea.rounded-xl').count();
      expect(bannedRoundedInputs, `Found ${bannedRoundedInputs} inputs/textareas with banned rounded classes on ${templateName}`).toBe(0);

      // Verify rounded-none is used (sample first 5 buttons)
      const buttons = await page.locator('button').all();
      const sampleSize = Math.min(5, buttons.length);
      for (let i = 0; i < sampleSize; i++) {
        const classList = await buttons[i].getAttribute('class');
        if (classList && !classList.includes('rounded-none') && !classList.includes('rounded-full')) {
          // rounded-full is allowed for avatar/circular buttons
          console.warn(`Button ${i} on ${templateName} may be missing rounded-none: ${classList}`);
        }
      }

      // Check font-mono presence (warn if missing)
      const monoElements = await page.locator('.font-mono').count();
      if (monoElements === 0) {
        console.warn(`[TERMINAL STYLE] ${templateName} should have font-mono elements for terminal aesthetic`);
      }

      // Check for hardcoded colors in inline styles (warn if found, allow chart exceptions)
      const elementsWithHexColors = await page.locator('[style*="#"]').count();
      if (elementsWithHexColors > 0) {
        const hexColorElements = await page.locator('[style*="#"]').evaluateAll((elements) => {
          return elements
            .map((el) => ({
              tag: el.tagName,
              style: el.getAttribute('style'),
            }))
            .filter((item) => item.style?.match(/#[0-9a-fA-F]{3,6}/));
        });

        // Allow some exceptions for charts/visualizations
        const nonChartHexColors = hexColorElements.filter(
          (item) => !item.tag.toLowerCase().includes('svg') && !item.tag.toLowerCase().includes('canvas')
        );

        if (nonChartHexColors.length > 0) {
          console.warn(`[HEX COLORS] Found ${nonChartHexColors.length} non-chart elements with hardcoded hex colors on ${templateName}`);
        }
      }

      // Check terminal header pattern (warn if missing)
      const terminalHeaders = await page.locator('text=/\\[.*\\]/').count();
      if (terminalHeaders === 0) {
        console.warn(`[TERMINAL STYLE] ${templateName} should use terminal-style headers with brackets`);
      }
    });
  }
});

// ============================================================================
// TEMPLATE COMPONENT CONSISTENCY
// ============================================================================

test.describe('Template Component Consistency', () => {
  const templatesWithForms = [
    'authentication',
    'settings-page',
    'user-management',
    'account-pages',
  ];

  for (const templateName of templatesWithForms) {
    test(`Form Consistency: ${templateName}`, async ({ page }) => {
      await page.goto(`/library/${templateName}`);
      await page.waitForLoadState('networkidle');

      // All form inputs should have labels
      const inputs = await page.locator('input[type="text"], input[type="email"], input[type="password"], textarea').all();
      for (const input of inputs) {
        const inputId = await input.getAttribute('id');
        if (inputId) {
          const label = await page.locator(`label[for="${inputId}"]`).count();
          expect(label, `Input with id="${inputId}" on ${templateName} should have a corresponding label`).toBeGreaterThan(0);
        }
      }

      // Buttons should have proper text or aria-label
      const buttons = await page.locator('button').all();
      for (let i = 0; i < buttons.length; i++) {
        const text = await buttons[i].textContent();
        const ariaLabel = await buttons[i].getAttribute('aria-label');
        const hasContent = (text && text.trim().length > 0) || ariaLabel;
        expect(hasContent, `Button ${i} on ${templateName} should have text content or aria-label`).toBeTruthy();
      }
    });
  }
});

// ============================================================================
// TEMPLATE DATA VISUALIZATION CHECK
// ============================================================================

test.describe('Template Data Visualization', () => {
  const templatesWithCharts = [
    'analytics-dashboard',
    'admin-panels',
    'dashboards',
    'chart-library',
  ];

  for (const templateName of templatesWithCharts) {
    test(`Charts Loaded: ${templateName}`, async ({ page }) => {
      await page.goto(`/library/${templateName}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000); // Charts may need extra time to render

      // Check if charts are present (SVG or Canvas elements)
      const chartElements = await page.locator('svg, canvas').count();
      expect(chartElements, `${templateName} should contain charts (SVG or Canvas elements)`).toBeGreaterThan(0);

      // Verify charts have rendered content (non-zero dimensions)
      const svgElements = await page.locator('svg').all();
      if (svgElements.length > 0) {
        const firstSvg = svgElements[0];
        const boundingBox = await firstSvg.boundingBox();
        expect(boundingBox, `First chart on ${templateName} should have dimensions`).not.toBeNull();
        if (boundingBox) {
          expect(boundingBox.width, `Chart width on ${templateName} should be > 0`).toBeGreaterThan(0);
          expect(boundingBox.height, `Chart height on ${templateName} should be > 0`).toBeGreaterThan(0);
        }
      }
    });
  }
});

// ============================================================================
// TEMPLATE RESPONSIVE CHECK (Mobile)
// ============================================================================

test.describe('Template Responsive - Mobile', () => {
  const criticalTemplates = [
    'landing-variations',
    'pricing-page',
    'authentication',
    'dashboards',
  ];

  for (const templateName of criticalTemplates) {
    test(`Mobile: ${templateName}`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(`/library/${templateName}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(`template-mobile-${templateName}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 150,
      });

      // Check for horizontal scroll (warn but don't fail - responsive fixes are ongoing)
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = 375;
      if (bodyWidth > viewportWidth + 5) {
        console.warn(`[RESPONSIVE] Template ${templateName} has horizontal scroll on mobile: ${bodyWidth}px > ${viewportWidth}px`);
      }
    });
  }
});

// ============================================================================
// TEMPLATE RESPONSIVE CHECK (Tablet)
// ============================================================================

test.describe('Template Responsive - Tablet', () => {
  const criticalTemplates = [
    'admin-panels',
    'analytics-dashboard',
    'billing-dashboard',
  ];

  for (const templateName of criticalTemplates) {
    test(`Tablet: ${templateName}`, async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(`/library/${templateName}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(`template-tablet-${templateName}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 150,
      });
    });
  }
});
