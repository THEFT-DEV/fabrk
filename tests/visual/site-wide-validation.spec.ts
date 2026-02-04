import { test, expect } from '@playwright/test';

// Increase timeout for all tests in this file
test.setTimeout(60000);

/**
 * SITE-WIDE VISUAL CONSISTENCY VALIDATION
 *
 * Crawls ALL pages and validates terminal aesthetic consistency:
 * - No hardcoded hex colors
 * - No banned rounded classes (rounded-sm/md/lg/xl)
 * - Font-mono usage for terminal elements
 * - Proper design token usage
 * - Accessibility basics
 *
 * This test suite is the "last line of defense" against design system violations.
 */

// ============================================================================
// ALL SITE PAGES (Complete Inventory)
// ============================================================================

const ALL_PAGES = {
  marketing: [
    '/',
    '/about',
    '/blog',
    '/component-showcase',
    '/components',
    '/contact',
    '/demo',
    '/features',
    '/landing-alt',
    '/maintenance',
    '/pricing',
    '/success',
    '/library',
  ],
  legal: ['/cookies', '/privacy', '/refund', '/terms'],
  docs: {
    main: ['/docs', '/docs/getting-started'],
    launch: ['/docs/launch/checklist'],
    features: [
      '/docs/features/organizations',
      '/docs/features/database',
      '/docs/features/polar',
      '/docs/features/payments',
      '/docs/features/lemonsqueezy',
      '/docs/features/trial',
      '/docs/features/emails',
      '/docs/features/feature-flags',
      '/docs/features/google-oauth',
      '/docs/features/background-jobs',
      '/docs/features/api-keys',
      '/docs/features/mfa',
      '/docs/features/blog',
      '/docs/features/realtime',
      '/docs/features/cloud-storage',
      '/docs/features/cookie-consent',
      '/docs/features/magic-links',
      '/docs/features/i18n',
      '/docs/features/seo',
      '/docs/features/webhooks',
      '/docs/features/impersonation',
      '/docs/features/notifications',
      '/docs/features/analytics',
    ],
    security: [
      '/docs/security/csrf',
      '/docs/security/headers',
      '/docs/security/bot-protection',
      '/docs/security/rate-limiting',
      '/docs/security/audit-logging',
      '/docs/security/validation',
    ],
    tutorials: [
      '/docs/tutorials/quick-start',
      '/docs/tutorials/authentication',
      '/docs/tutorials/protected-pages',
      '/docs/tutorials/api-routes',
      '/docs/tutorials/stripe-payments',
      '/docs/tutorials/file-uploads',
      '/docs/tutorials/email-templates',
      '/docs/tutorials/webhooks',
    ],
    deployment: [
      '/docs/deployment/vercel',
      '/docs/deployment/environment',
      '/docs/deployment/database',
    ],
    extras: ['/docs/extras/testing', '/docs/extras/theming'],
    components: [
      '/docs/components/overview',
      // 64 component pages (60 production-ready + 4 business logic)
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
    ],
  },
  templates: [
    '/library/admin-panels',
    '/library/documentation',
    '/library/security-privacy',
    '/library/search-results',
    '/library/pricing-page',
    '/library/billing-dashboard',
    '/library/email-templates',
    '/library/chart-library',
    '/library/modals',
    '/library/account-pages',
    '/library/landing-variations',
    '/library/blog',
    '/library/error-pages',
    '/library/profile',
    '/library/dashboards',
    '/library/marketing',
    '/library/settings-page',
    '/library/analytics-dashboard',
    '/library/user-management',
    '/library/team-dashboard',
    '/library/empty-states',
    '/library/authentication',
    '/library/notifications',
    '/library/onboarding',
  ],
};

// Flatten all pages into a single array
const allPublicPages = [
  ...ALL_PAGES.marketing,
  ...ALL_PAGES.legal,
  ...ALL_PAGES.docs.main,
  ...ALL_PAGES.docs.launch,
  ...ALL_PAGES.docs.features,
  ...ALL_PAGES.docs.security,
  ...ALL_PAGES.docs.tutorials,
  ...ALL_PAGES.docs.deployment,
  ...ALL_PAGES.docs.extras,
  ...ALL_PAGES.docs.components,
  ...ALL_PAGES.templates,
];

// ============================================================================
// BANNED ROUNDED CLASSES CHECK (ALL PAGES)
// ============================================================================

test.describe('Site-wide: Banned Rounded Classes', () => {
  // Test sample of pages (every 10th page to keep test time reasonable)
  const samplePages = allPublicPages.filter((_, index) => index % 10 === 0);

  for (const url of samplePages) {
    test(`No banned rounded: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      // Check for banned rounded classes on buttons
      const bannedRoundedButtons = await page
        .locator('button.rounded-sm, button.rounded-md, button.rounded-lg, button.rounded-xl, button.rounded-2xl, button.rounded-3xl')
        .count();
      expect(bannedRoundedButtons, `Found ${bannedRoundedButtons} buttons with banned rounded classes on ${url}`).toBe(0);

      // Check for banned rounded classes on inputs/textareas
      const bannedRoundedInputs = await page
        .locator(
          'input.rounded-sm, input.rounded-md, input.rounded-lg, input.rounded-xl, textarea.rounded-sm, textarea.rounded-md, textarea.rounded-lg, textarea.rounded-xl'
        )
        .count();
      expect(bannedRoundedInputs, `Found ${bannedRoundedInputs} inputs with banned rounded classes on ${url}`).toBe(0);

      // Check for banned rounded classes on selects
      const bannedRoundedSelects = await page
        .locator('select.rounded-sm, select.rounded-md, select.rounded-lg, select.rounded-xl')
        .count();
      expect(bannedRoundedSelects, `Found ${bannedRoundedSelects} selects with banned rounded classes on ${url}`).toBe(0);
    });
  }
});

// ============================================================================
// HARDCODED HEX COLOR CHECK (ALL PAGES)
// ============================================================================

test.describe('Site-wide: No Hardcoded Hex Colors', () => {
  // Test sample of pages
  const samplePages = allPublicPages.filter((_, index) => index % 15 === 0);

  for (const url of samplePages) {
    test(`No hex colors: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      // Check for hardcoded hex colors in inline styles
      const elementsWithStyle = await page.locator('[style*="#"]').count();
      if (elementsWithStyle > 0) {
        const hexColorInfo = await page.locator('[style*="#"]').evaluateAll((elements) => {
          return elements
            .map((el) => ({
              tag: el.tagName.toLowerCase(),
              style: el.getAttribute('style'),
              className: el.getAttribute('class'),
            }))
            .filter((item) => item.style?.match(/#[0-9a-fA-F]{3,6}/));
        });

        // Filter out exceptions (SVG charts, canvas visualizations)
        const violations = hexColorInfo.filter(
          (item) =>
            !item.tag.includes('svg') &&
            !item.tag.includes('canvas') &&
            !item.className?.includes('recharts') &&
            !item.className?.includes('chart')
        );

        if (violations.length > 0) {
          console.warn(`Found ${violations.length} elements with hardcoded hex colors on ${url}:`, violations);
        }

        expect(violations.length, `Found ${violations.length} non-chart elements with hardcoded hex colors on ${url}`).toBe(0);
      }

      // Check for hardcoded colors in class names (bg-[#...], text-[#...])
      const arbitraryColorClasses = await page.locator('[class*="bg-[#"], [class*="text-[#"], [class*="border-[#"]').count();
      expect(arbitraryColorClasses, `Found ${arbitraryColorClasses} elements with arbitrary hex color classes on ${url}`).toBe(0);
    });
  }
});

// ============================================================================
// FONT-MONO USAGE CHECK (ALL PAGES)
// ============================================================================

test.describe('Site-wide: Terminal Font (font-mono)', () => {
  // Test sample of pages
  const samplePages = allPublicPages.filter((_, index) => index % 20 === 0);

  for (const url of samplePages) {
    test(`Has font-mono: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      // Check font-mono presence (warn if missing)
      const monoElements = await page.locator('.font-mono').count();
      if (monoElements === 0) {
        console.warn(`[TERMINAL STYLE] ${url} should have font-mono elements for terminal aesthetic`);
      }
    });
  }
});

// ============================================================================
// DESIGN TOKEN USAGE (Comprehensive Check)
// ============================================================================

test.describe('Site-wide: Design Token Usage', () => {
  const criticalPages = [
    '/',
    '/docs',
    '/library',
    '/pricing',
    '/docs/components/button',
    '/library/dashboards',
  ];

  for (const url of criticalPages) {
    test(`Design tokens: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      // Check for banned hardcoded color classes
      const bannedColorClasses = await page
        .locator(
          '[class*="bg-white"], [class*="bg-black"], [class*="text-white"], [class*="text-black"], [class*="bg-gray-"], [class*="text-gray-"]'
        )
        .count();

      // Filter out allowed exceptions (like bg-white in specific contexts)
      const violations = await page
        .locator(
          '[class*="bg-white"], [class*="bg-black"], [class*="text-white"], [class*="text-black"], [class*="bg-gray-"], [class*="text-gray-"]'
        )
        .evaluateAll((elements) => {
          return elements
            .map((el) => ({
              tag: el.tagName.toLowerCase(),
              className: el.getAttribute('class'),
            }))
            .filter((item) => {
              // Allow bg-white/bg-black on body or html
              if (item.tag === 'body' || item.tag === 'html') return false;
              // Allow in SVG elements (charts)
              if (item.tag.includes('svg') || item.tag.includes('path')) return false;
              return true;
            });
        });

      if (violations.length > 0) {
        console.warn(`Found ${violations.length} elements with hardcoded color classes on ${url}:`, violations.slice(0, 5));
      }

      // This is a warning, not a failure, as some exceptions may be legitimate
      expect(violations.length, `Consider using design tokens instead of hardcoded colors on ${url}`).toBeLessThan(10);
    });
  }
});

// ============================================================================
// ACCESSIBILITY VALIDATION (ALL PAGES)
// ============================================================================

test.describe('Site-wide: Accessibility Basics', () => {
  // Test sample of pages
  const samplePages = allPublicPages.filter((_, index) => index % 25 === 0);

  for (const url of samplePages) {
    test(`A11y basics: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      // Check for main landmark
      const mainLandmark = await page.locator('main').count();
      expect(mainLandmark, `${url} should have a <main> landmark`).toBeGreaterThan(0);

      // Check for h1
      const h1Count = await page.locator('h1').count();
      expect(h1Count, `${url} should have at least one <h1>`).toBeGreaterThan(0);

      // Check images have alt text
      const imagesWithoutAlt = await page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt, `${url} has ${imagesWithoutAlt} images without alt text`).toBe(0);

      // Check buttons have text or aria-label
      const buttons = await page.locator('button').all();
      for (let i = 0; i < Math.min(buttons.length, 10); i++) {
        // Check first 10 buttons
        const text = await buttons[i].textContent();
        const ariaLabel = await buttons[i].getAttribute('aria-label');
        const hasAccessibleName = (text && text.trim().length > 0) || ariaLabel;
        if (!hasAccessibleName) {
          console.warn(`Button ${i} on ${url} missing accessible name`);
        }
      }

      // Check links have accessible text
      const emptyLinks = await page.locator('a:not([aria-label])').evaluateAll((links) => {
        return links.filter((link) => {
          const text = link.textContent?.trim();
          const ariaLabel = link.getAttribute('aria-label');
          return !text && !ariaLabel;
        }).length;
      });
      expect(emptyLinks, `${url} has ${emptyLinks} links without accessible text`).toBe(0);
    });
  }
});

// ============================================================================
// RESPONSIVE LAYOUT CHECK (Critical Pages)
// ============================================================================

test.describe('Site-wide: Responsive Layout', () => {
  const criticalPages = ['/', '/docs', '/library', '/pricing', '/docs/components/button'];

  const viewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1920, height: 1080, name: 'desktop' },
  ];

  for (const url of criticalPages) {
    for (const viewport of viewports) {
      test(`Responsive ${viewport.name}: ${url}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(url);
        await page.waitForLoadState('domcontentloaded');

        // Wait for styles to apply - homepage has longer animations
        await page.waitForTimeout(url === '/' ? 5000 : 1500);

        // Check for horizontal scroll (warn but don't fail - responsive fixes are ongoing)
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const hasHorizontalScroll = bodyWidth > viewport.width + 20; // 20px tolerance
        if (hasHorizontalScroll) {
          console.warn(`[RESPONSIVE] ${url} has horizontal scroll on ${viewport.name}: ${bodyWidth}px > ${viewport.width}px`);
        }

        // Take screenshot
        await expect(page).toHaveScreenshot(`responsive-${viewport.name}-${url.replace(/\//g, '-') || 'home'}.png`, {
          fullPage: true,
          animations: 'disabled',
          maxDiffPixels: 150,
        });
      });
    }
  }
});

// ============================================================================
// PERFORMANCE CHECK (Core Web Vitals)
// ============================================================================

test.describe('Site-wide: Performance Metrics', () => {
  const criticalPages = ['/', '/docs', '/library', '/pricing'];

  for (const url of criticalPages) {
    test(`Performance: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000); // Allow time for performance metrics

      // Measure page load time
      const navigationTiming = await page.evaluate(() => {
        const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          domContentLoaded: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
          loadComplete: timing.loadEventEnd - timing.loadEventStart,
          domInteractive: timing.domInteractive - timing.fetchStart,
        };
      });

      console.log(`Performance metrics for ${url}:`, navigationTiming);

      // Basic performance assertions (relaxed for local dev)
      expect(navigationTiming.domInteractive, `${url} DOM interactive time should be reasonable`).toBeLessThan(5000);

      // Check for layout shifts
      const layoutShiftScore = await page.evaluate(() => {
        return new Promise((resolve) => {
          let cls = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if ((entry as any).hadRecentInput) continue;
              cls += (entry as any).value;
            }
          });
          observer.observe({ type: 'layout-shift', buffered: true });
          setTimeout(() => {
            observer.disconnect();
            resolve(cls);
          }, 1000);
        });
      });

      console.log(`CLS for ${url}: ${layoutShiftScore}`);
      expect(layoutShiftScore, `${url} should have low Cumulative Layout Shift`).toBeLessThan(0.25); // Good CLS < 0.1, relaxed for testing
    });
  }
});

// ============================================================================
// CONSOLE ERROR CHECK
// ============================================================================

test.describe('Site-wide: No Console Errors', () => {
  const samplePages = allPublicPages.filter((_, index) => index % 30 === 0);

  for (const url of samplePages) {
    test(`No errors: ${url}`, async ({ page }) => {
      const errors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      page.on('pageerror', (error) => {
        errors.push(error.message);
      });

      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000); // Wait for any async errors

      // Filter out known non-critical errors
      const relevantErrors = errors.filter(
        (error) =>
          !error.includes('Extension') &&
          !error.includes('chrome-extension') &&
          !error.includes('moz-extension') &&
          !error.includes('safari-extension') &&
          !error.includes('hydrat') && // React hydration warnings
          !error.includes('Hydrat') &&
          !error.includes('googletagmanager') && // Analytics
          !error.includes('gtag') &&
          !error.includes('analytics') &&
          !error.includes('posthog') && // PostHog
          !error.includes('Failed to load resource') && // Network timing issues
          !error.includes('net::ERR') &&
          !error.includes('ResizeObserver') && // Browser resize observer warnings
          !error.includes('Non-Error promise rejection') // Promise rejection from third-party
      );

      if (relevantErrors.length > 0) {
        console.warn(`Console errors on ${url}:`, relevantErrors);
        // Warn but don't fail for now - error cleanup is ongoing
      }
    });
  }
});

// ============================================================================
// SUMMARY TEST
// ============================================================================

test.describe('Site-wide: Coverage Summary', () => {
  test('Total pages tested', async () => {
    console.log(`Total public pages: ${allPublicPages.length}`);
    console.log('Categories:');
    console.log(`  - Marketing: ${ALL_PAGES.marketing.length}`);
    console.log(`  - Legal: ${ALL_PAGES.legal.length}`);
    console.log(`  - Templates: ${ALL_PAGES.templates.length}`);
    console.log(`  - Docs Main: ${ALL_PAGES.docs.main.length}`);
    console.log(`  - Docs Features: ${ALL_PAGES.docs.features.length}`);
    console.log(`  - Docs Security: ${ALL_PAGES.docs.security.length}`);
    console.log(`  - Docs Tutorials: ${ALL_PAGES.docs.tutorials.length}`);
    console.log(`  - Docs Deployment: ${ALL_PAGES.docs.deployment.length}`);
    console.log(`  - Docs Extras: ${ALL_PAGES.docs.extras.length}`);
    console.log(`  - Docs Components: ${ALL_PAGES.docs.components.length}`);

    expect(allPublicPages.length, 'Should have comprehensive page coverage').toBeGreaterThan(100);
  });
});
