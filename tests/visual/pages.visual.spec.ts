import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Critical Site Pages
 *
 * These tests capture full-page screenshots and compare them against baselines.
 * Run `npm run test:visual:update` to create/update baseline snapshots.
 */

const criticalPages = [
  { url: '/', name: 'landing' },
  { url: '/docs', name: 'docs-home' },
  { url: '/blog', name: 'blog' },
];

test.describe('Critical Pages Visual Regression', () => {
  for (const { url, name } of criticalPages) {
    test(`visual: ${name}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Wait for any animations to complete
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(`page-${name}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});

/**
 * Responsive Visual Tests
 * Tests critical pages at mobile and tablet breakpoints
 */
test.describe('Responsive Visual Regression', () => {
  const viewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
  ];

  const responsivePages = ['/', '/library', '/docs'];

  for (const viewport of viewports) {
    for (const url of responsivePages) {
      test(`${viewport.name}: ${url}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);

        const screenshotName = `responsive-${viewport.name}${url.replace(/\//g, '-') || '-home'}.png`;
        await expect(page).toHaveScreenshot(screenshotName, {
          fullPage: true,
          animations: 'disabled',
        });
      });
    }
  }
});
