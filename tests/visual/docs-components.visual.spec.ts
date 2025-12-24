import { test, expect } from '@playwright/test';

/**
 * DOCS COMPONENT PAGES VISUAL REGRESSION
 *
 * Tests all 64 component documentation pages in /docs/components/
 * (Optimized from 98 to 60 production-ready components + 4 business logic)
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

test.describe('Docs - Components (64 pages)', () => {
  const componentPages = [
    'accordion',
    'alert',
    'alert-dialog',
    'api-key-manager',
    'area-chart',
    'audit-log',
    'avatar',
    'badge',
    'balance-display',
    'bar-chart',
    'billing-summary-card',
    'breadcrumb',
    'button',
    'calendar',
    'card',
    'checkbox',
    'code-block',
    'command',
    'container',
    'credit-transaction-table',
    'credit-usage-chart',
    'data-table-header',
    'date-picker',
    'dialog',
    'donut-chart',
    'dropdown-menu',
    'empty-state',
    'faq',
    'features',
    'footer',
    'form',
    'form-error',
    'funnel-chart',
    'gauge',
    'heatmap',
    'hero',
    'input',
    'input-group',
    'input-number',
    'input-otp',
    'input-password',
    'input-search',
    'kpi-card',
    'label',
    'line-chart',
    'loading',
    'member-card',
    'navigation',
    'notification-badge',
    'notification-center',
    'notification-list',
    'onboarding-checklist',
    'overview',
    'pagination',
    'pie-chart',
    'plan-selector',
    'popover',
    'pricing',
    'progress',
    'radio-group',
    'scroll-area',
    'select',
    'separator',
    'sheet',
    'sidebar',
    'sign-in-form',
    'sign-up-form',
    'simple-icon',
    'skeleton',
    'slider',
    'sparkline',
    'stat-card',
    'switch',
    'table',
    'tabs',
    'testimonials',
    'textarea',
    'toast',
    'toaster',
    'tooltip',
    'usage-meter',
    'webhook-log',
  ];

  // Test overview page separately
  test('Component Overview', async ({ page }) => {
    await page.goto('/docs/components/overview');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('docs-components-overview.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixels: 100,
    });
  });

  // Test all individual component pages
  for (const componentName of componentPages) {
    test(`Component: ${componentName}`, async ({ page }) => {
      await page.goto(`/docs/components/${componentName}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(`docs-component-${componentName}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 150, // Higher tolerance for interactive components
      });
    });
  }
});

// ============================================================================
// COMPONENT TERMINAL STYLE VALIDATION
// ============================================================================

test.describe('Component Pages Terminal Style', () => {
  // Sample 10 component pages for terminal style validation
  const sampleComponents = [
    'button',
    'input',
    'card',
    'select',
    'textarea',
    'dialog',
    'dropdown-menu',
    'table',
    'form',
    'badge',
  ];

  for (const componentName of sampleComponents) {
    test(`Terminal Check: ${componentName}`, async ({ page }) => {
      await page.goto(`/docs/components/${componentName}`);
      await page.waitForLoadState('networkidle');

      // Check DocsCard terminal headers (warn if missing)
      const docsCards = await page.locator('[class*="DocsCard"]').count();
      if (docsCards > 0) {
        const cardsWithHeaders = await page.locator('[class*="DocsCard"] [class*="border-b"]').count();
        if (cardsWithHeaders === 0) {
          console.warn(`[TERMINAL STYLE] DocsCard components on ${componentName} should have terminal headers`);
        }
      }

      // Check for banned rounded classes in preview sections (still enforced)
      const bannedRoundedInPreview = await page.locator('[class*="preview"] button.rounded-sm, [class*="preview"] button.rounded-md, [class*="preview"] button.rounded-lg').count();
      expect(bannedRoundedInPreview, `Found buttons with banned rounded classes in preview on ${componentName}`).toBe(0);

      // Check font-mono presence (warn if missing)
      const terminalElements = await page.locator('[class*="font-mono"]').count();
      if (terminalElements === 0) {
        console.warn(`[TERMINAL STYLE] ${componentName} should have font-mono elements for terminal aesthetic`);
      }
    });
  }
});
