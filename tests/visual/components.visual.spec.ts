import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Component Documentation Pages
 *
 * Tests 64 component pages (optimized from 98 to 60 production-ready + 4 business logic)
 * Run `npm run test:visual:update` to create/update baseline snapshots.
 */

const componentPages = [
  '/docs/components/accordion',
  '/docs/components/alert',
  '/docs/components/alert-dialog',
  '/docs/components/api-key-manager',
  '/docs/components/area-chart',
  '/docs/components/audit-log',
  '/docs/components/avatar',
  '/docs/components/badge',
  '/docs/components/balance-display',
  '/docs/components/bar-chart',
  '/docs/components/billing-summary-card',
  '/docs/components/breadcrumb',
  '/docs/components/button',
  '/docs/components/calendar',
  '/docs/components/card',
  '/docs/components/checkbox',
  '/docs/components/code-block',
  '/docs/components/command',
  '/docs/components/container',
  '/docs/components/credit-transaction-table',
  '/docs/components/credit-usage-chart',
  '/docs/components/data-table-header',
  '/docs/components/date-picker',
  '/docs/components/dialog',
  '/docs/components/donut-chart',
  '/docs/components/dropdown-menu',
  '/docs/components/empty-state',
  '/docs/components/faq',
  '/docs/components/features',
  '/docs/components/footer',
  '/docs/components/form',
  '/docs/components/form-error',
  '/docs/components/funnel-chart',
  '/docs/components/gauge',
  '/docs/components/heatmap',
  '/docs/components/hero',
  '/docs/components/input',
  '/docs/components/input-group',
  '/docs/components/input-number',
  '/docs/components/input-otp',
  '/docs/components/input-password',
  '/docs/components/input-search',
  '/docs/components/kpi-card',
  '/docs/components/label',
  '/docs/components/line-chart',
  '/docs/components/loading',
  '/docs/components/member-card',
  '/docs/components/navigation',
  '/docs/components/notification-badge',
  '/docs/components/notification-center',
  '/docs/components/notification-list',
  '/docs/components/onboarding-checklist',
  '/docs/components/overview',
  '/docs/components/pagination',
  '/docs/components/pie-chart',
  '/docs/components/plan-selector',
  '/docs/components/popover',
  '/docs/components/pricing',
  '/docs/components/progress',
  '/docs/components/radio-group',
  '/docs/components/scroll-area',
  '/docs/components/select',
  '/docs/components/separator',
  '/docs/components/sheet',
  '/docs/components/sidebar',
  '/docs/components/sign-in-form',
  '/docs/components/sign-up-form',
  '/docs/components/simple-icon',
  '/docs/components/skeleton',
  '/docs/components/slider',
  '/docs/components/sparkline',
  '/docs/components/stat-card',
  '/docs/components/switch',
  '/docs/components/table',
  '/docs/components/tabs',
  '/docs/components/testimonials',
  '/docs/components/textarea',
  '/docs/components/toast',
  '/docs/components/toaster',
  '/docs/components/tooltip',
  '/docs/components/usage-meter',
  '/docs/components/webhook-log',
];

test.describe('Component Docs Visual Regression', () => {
  for (const url of componentPages) {
    test(`visual: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Wait for any animations to complete
      await page.waitForTimeout(500);

      const screenshotName = `component${url.replace(/\//g, '-')}.png`;
      await expect(page).toHaveScreenshot(screenshotName, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});
