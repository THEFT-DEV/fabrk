import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Template Pages
 *
 * These tests capture full-page screenshots and compare them against baselines.
 * Run `npm run test:visual:update` to create/update baseline snapshots.
 */

const templatePages = [
  '/library',
  '/library/authentication',
  '/library/authentication/sign-in',
  '/library/authentication/sign-up',
  '/library/authentication/forgot-password',
  '/library/authentication/two-factor',
  '/library/dashboards',
  '/library/analytics-dashboard',
  '/library/billing-dashboard',
  '/library/team-dashboard',
  '/library/pricing-page',
  '/library/profile',
  '/library/settings-page',
  '/library/user-management',
  '/library/security-privacy',
  '/library/notifications',
  '/library/onboarding',
  '/library/modals',
  '/library/empty-states',
  '/library/error-pages',
  '/library/blog',
  '/library/blog/post',
  '/library/email-templates',
  '/library/marketing',
  '/library/landing-variations',
  '/library/chart-library',
  '/library/search-results',
  '/library/admin-panels',
  '/library/account-pages',
  '/library/documentation',
];

test.describe('Template Pages Visual Regression', () => {
  for (const url of templatePages) {
    test(`visual: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Wait for any animations to complete
      await page.waitForTimeout(500);

      const screenshotName = `template${url.replace(/\//g, '-')}.png`;
      await expect(page).toHaveScreenshot(screenshotName, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});
