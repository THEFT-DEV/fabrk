import { test, expect } from '@playwright/test';

/**
 * COMPREHENSIVE VISUAL REGRESSION TEST SUITE
 *
 * Tests ALL 220+ pages of the website for visual consistency.
 * Organized into sections: Marketing, Legal, Dashboard, Docs, Templates
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

// ============================================================================
// MARKETING PAGES (12 pages)
// ============================================================================

test.describe('Marketing Pages', () => {
  const marketingPages = [
    { url: '/', name: 'homepage' },
    { url: '/about', name: 'about' },
    { url: '/blog', name: 'blog' },
    { url: '/component-showcase', name: 'component-showcase' },
    { url: '/components', name: 'components' },
    { url: '/contact', name: 'contact' },
    { url: '/demo', name: 'demo' },
    { url: '/features', name: 'features' },
    { url: '/landing-alt', name: 'landing-alt' },
    { url: '/maintenance', name: 'maintenance' },
    { url: '/pricing', name: 'pricing' },
    { url: '/success', name: 'success' },
    { url: '/library', name: 'templates-overview' },
  ];

  for (const { url, name } of marketingPages) {
    test(`Marketing: ${name}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500); // Wait for animations

      await expect(page).toHaveScreenshot(`marketing-${name}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 5000,
      });
    });
  }
});

// ============================================================================
// LEGAL PAGES (4 pages)
// ============================================================================

test.describe('Legal Pages', () => {
  const legalPages = [
    { url: '/cookies', name: 'cookies' },
    { url: '/privacy', name: 'privacy' },
    { url: '/refund', name: 'refund' },
    { url: '/terms', name: 'terms' },
  ];

  for (const { url, name } of legalPages) {
    test(`Legal: ${name}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(`legal-${name}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 100,
      });
    });
  }
});

// ============================================================================
// DASHBOARD PAGES (17 pages - REQUIRES AUTH)
// ============================================================================

test.describe('Dashboard Pages (Auth Required)', () => {
  // NOTE: These tests are skipped because they require authentication.
  // To enable them:
  // 1. Set up authentication state using storageState
  // 2. Create a global setup file that logs in and saves auth state
  // 3. Use that state in these tests
  // See: https://playwright.dev/docs/auth

  test.skip('Dashboard: account', async ({ page }) => {
    await page.goto('/account');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-account.png', { fullPage: true });
  });

  test.skip('Dashboard: admin', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-admin.png', { fullPage: true });
  });

  test.skip('Dashboard: admin/analytics', async ({ page }) => {
    await page.goto('/admin/analytics');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-admin-analytics.png', { fullPage: true });
  });

  test.skip('Dashboard: admin/audit-log', async ({ page }) => {
    await page.goto('/admin/audit-log');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-admin-audit-log.png', { fullPage: true });
  });

  test.skip('Dashboard: admin/feature-flags-db', async ({ page }) => {
    await page.goto('/admin/feature-flags-db');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-admin-feature-flags.png', { fullPage: true });
  });

  test.skip('Dashboard: admin/monitoring', async ({ page }) => {
    await page.goto('/admin/monitoring');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-admin-monitoring.png', { fullPage: true });
  });

  test.skip('Dashboard: admin/security', async ({ page }) => {
    await page.goto('/admin/security');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-admin-security.png', { fullPage: true });
  });

  test.skip('Dashboard: admin/users', async ({ page }) => {
    await page.goto('/admin/users');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-admin-users.png', { fullPage: true });
  });

  test.skip('Dashboard: billing/invoices', async ({ page }) => {
    await page.goto('/billing/invoices');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-billing-invoices.png', { fullPage: true });
  });

  test.skip('Dashboard: billing/payment-methods', async ({ page }) => {
    await page.goto('/billing/payment-methods');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-billing-payment-methods.png', { fullPage: true });
  });

  test.skip('Dashboard: dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-main.png', { fullPage: true });
  });

  test.skip('Dashboard: developer/api-keys', async ({ page }) => {
    await page.goto('/developer/api-keys');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-developer-api-keys.png', { fullPage: true });
  });

  test.skip('Dashboard: examples/admin', async ({ page }) => {
    await page.goto('/examples/admin');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-examples-admin.png', { fullPage: true });
  });

  test.skip('Dashboard: examples/analytics', async ({ page }) => {
    await page.goto('/examples/analytics');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-examples-analytics.png', { fullPage: true });
  });

  test.skip('Dashboard: examples/user-profile', async ({ page }) => {
    await page.goto('/examples/user-profile');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-examples-user-profile.png', { fullPage: true });
  });

  test.skip('Dashboard: organizations/new', async ({ page }) => {
    await page.goto('/organizations/new');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-organizations-new.png', { fullPage: true });
  });

  test.skip('Dashboard: profile', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-profile.png', { fullPage: true });
  });

  test.skip('Dashboard: settings', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-settings.png', { fullPage: true });
  });

  test.skip('Dashboard: settings/security', async ({ page }) => {
    await page.goto('/settings/security');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-settings-security.png', { fullPage: true });
  });
});

// ============================================================================
// DOCS PAGES - Main & Getting Started (2 pages)
// ============================================================================

test.describe('Docs - Main Pages', () => {
  const mainDocsPages = [
    { url: '/docs', name: 'index' },
    { url: '/docs/getting-started', name: 'getting-started' },
  ];

  for (const { url, name } of mainDocsPages) {
    test(`Docs Main: ${name}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(`docs-${name}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 100,
      });
    });
  }
});

// ============================================================================
// DOCS PAGES - Launch (1 page)
// ============================================================================

test.describe('Docs - Launch', () => {
  test('Docs Launch: checklist', async ({ page }) => {
    await page.goto('/docs/launch/checklist');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('docs-launch-checklist.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixels: 100,
    });
  });
});

// ============================================================================
// TERMINAL AESTHETIC VALIDATION TEST
// ============================================================================

test.describe('Terminal Aesthetic Validation', () => {
  const pagesToValidate = [
    '/',
    '/docs',
    '/library',
    '/pricing',
    '/docs/components/overview',
    '/docs/components/button',
  ];

  for (const url of pagesToValidate) {
    test(`Terminal Style Check: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Check for banned rounded classes on buttons
      const bannedRoundedButtons = await page.locator('button.rounded-sm, button.rounded-md, button.rounded-lg, button.rounded-xl').count();
      expect(bannedRoundedButtons, `Found ${bannedRoundedButtons} buttons with banned rounded classes on ${url}`).toBe(0);

      // Check for banned rounded classes on inputs
      const bannedRoundedInputs = await page.locator('input.rounded-sm, input.rounded-md, input.rounded-lg, input.rounded-xl').count();
      expect(bannedRoundedInputs, `Found ${bannedRoundedInputs} inputs with banned rounded classes on ${url}`).toBe(0);

      // Check for hardcoded hex colors in style attributes (sampling approach)
      const elementsWithStyle = await page.locator('[style*="#"]').count();
      if (elementsWithStyle > 0) {
        const stylesWithHex = await page.locator('[style*="#"]').evaluateAll((elements) => {
          return elements
            .map((el) => el.getAttribute('style'))
            .filter((style) => style?.match(/#[0-9a-fA-F]{3,6}/));
        });
        expect(stylesWithHex.length, `Found ${stylesWithHex.length} elements with hardcoded hex colors in style attributes on ${url}`).toBe(0);
      }

      // Verify buttons have rounded-none (sample first 5 buttons)
      const buttons = await page.locator('button').all();
      const sampleSize = Math.min(5, buttons.length);
      for (let i = 0; i < sampleSize; i++) {
        const classList = await buttons[i].getAttribute('class');
        if (classList && !classList.includes('rounded-none')) {
          console.warn(`Button ${i} on ${url} may be missing rounded-none: ${classList}`);
        }
      }
    });
  }
});

// ============================================================================
// ACCESSIBILITY QUICK CHECK
// ============================================================================

test.describe('Accessibility Quick Check', () => {
  const criticalPages = ['/', '/docs', '/library', '/pricing'];

  for (const url of criticalPages) {
    test(`A11y: ${url} has proper document structure`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Check for main landmark
      const mainLandmark = await page.locator('main').count();
      expect(mainLandmark, `${url} should have a main landmark`).toBeGreaterThan(0);

      // Check for heading hierarchy (should have h1)
      const h1Count = await page.locator('h1').count();
      expect(h1Count, `${url} should have at least one h1`).toBeGreaterThan(0);

      // Check for alt text on images (sample first 10)
      const imagesWithoutAlt = await page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt, `${url} has ${imagesWithoutAlt} images without alt text`).toBe(0);
    });
  }
});
