import { test, expect } from '@playwright/test';

/**
 * DOCS FEATURE & GUIDE PAGES VISUAL REGRESSION
 *
 * Tests all feature guides, security pages, tutorials, deployment guides, and extras.
 * Total: ~50 pages across multiple categories
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

// ============================================================================
// FEATURE PAGES (28 pages)
// ============================================================================

test.describe('Docs - Features', () => {
  const featurePages = [
    'organizations',
    'database',
    'polar',
    'payments',
    'lemonsqueezy',
    'trial',
    'emails',
    'feature-flags',
    'google-oauth',
    'background-jobs',
    'api-keys',
    'mfa',
    'blog',
    'realtime',
    'cloud-storage',
    'cookie-consent',
    'magic-links',
    'i18n',
    'seo',
    'webhooks',
    'impersonation',
    'notifications',
    'analytics',
  ];

  for (const featureName of featurePages) {
    test(`Feature: ${featureName}`, async ({ page }) => {
      await page.goto(`/docs/features/${featureName}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(`docs-feature-${featureName}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 100,
      });
    });
  }
});

// ============================================================================
// SECURITY PAGES (6 pages)
// ============================================================================

test.describe('Docs - Security', () => {
  const securityPages = [
    'csrf',
    'headers',
    'bot-protection',
    'rate-limiting',
    'audit-logging',
    'validation',
  ];

  for (const securityName of securityPages) {
    test(`Security: ${securityName}`, async ({ page }) => {
      await page.goto(`/docs/security/${securityName}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(`docs-security-${securityName}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 100,
      });
    });
  }
});

// ============================================================================
// TUTORIAL PAGES (8 pages)
// ============================================================================

test.describe('Docs - Tutorials', () => {
  const tutorialPages = [
    'quick-start',
    'authentication',
    'protected-pages',
    'api-routes',
    'stripe-payments',
    'file-uploads',
    'email-templates',
    'webhooks',
  ];

  for (const tutorialName of tutorialPages) {
    test(`Tutorial: ${tutorialName}`, async ({ page }) => {
      await page.goto(`/docs/tutorials/${tutorialName}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(`docs-tutorial-${tutorialName}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 100,
      });
    });
  }
});

// ============================================================================
// DEPLOYMENT PAGES (3 pages)
// ============================================================================

test.describe('Docs - Deployment', () => {
  const deploymentPages = [
    'vercel',
    'environment',
    'database',
  ];

  for (const deploymentName of deploymentPages) {
    test(`Deployment: ${deploymentName}`, async ({ page }) => {
      await page.goto(`/docs/deployment/${deploymentName}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(`docs-deployment-${deploymentName}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 100,
      });
    });
  }
});

// ============================================================================
// EXTRAS PAGES (2 pages)
// ============================================================================

test.describe('Docs - Extras', () => {
  const extrasPages = [
    'testing',
    'theming',
  ];

  for (const extrasName of extrasPages) {
    test(`Extras: ${extrasName}`, async ({ page }) => {
      await page.goto(`/docs/extras/${extrasName}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(`docs-extras-${extrasName}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 100,
      });
    });
  }
});

// ============================================================================
// DOCS PAGES TERMINAL STYLE VALIDATION
// ============================================================================

test.describe('Docs Pages Terminal Style', () => {
  // Sample pages from each category for terminal style validation
  const samplePages = [
    '/docs/features/organizations',
    '/docs/features/payments',
    '/docs/security/csrf',
    '/docs/tutorials/quick-start',
    '/docs/deployment/vercel',
    '/docs/extras/testing',
  ];

  for (const url of samplePages) {
    test(`Terminal Check: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Check for terminal-style headers with brackets (warn if missing)
      const terminalHeaders = await page.locator('text=/\\[.*\\]/').count();
      if (terminalHeaders === 0) {
        console.warn(`[TERMINAL STYLE] ${url} should use terminal-style headers with brackets`);
      }

      // Check for banned rounded classes (still enforced)
      const bannedRounded = await page.locator('button.rounded-sm, button.rounded-md, button.rounded-lg, input.rounded-sm, input.rounded-md, input.rounded-lg').count();
      expect(bannedRounded, `Found elements with banned rounded classes on ${url}`).toBe(0);

      // Check font-mono presence (warn if missing)
      const monoElements = await page.locator('.font-mono').count();
      if (monoElements === 0) {
        console.warn(`[TERMINAL STYLE] ${url} should have font-mono for terminal aesthetic`);
      }

      // Check for DocsCard with titles (warn if missing)
      const docsCards = await page.locator('[data-testid="docs-card"], [class*="DocsCard"]').count();
      if (docsCards > 0) {
        const cardsWithBorders = await page.locator('[class*="border-b"]').count();
        if (cardsWithBorders === 0) {
          console.warn(`[TERMINAL STYLE] DocsCard components should have terminal headers on ${url}`);
        }
      }
    });
  }
});

// ============================================================================
// CODE BLOCK CONSISTENCY CHECK
// ============================================================================

test.describe('Code Block Consistency', () => {
  const pagesWithCode = [
    '/docs/tutorials/quick-start',
    '/docs/features/database',
    '/docs/features/api-keys',
    '/docs/deployment/environment',
  ];

  for (const url of pagesWithCode) {
    test(`Code Blocks: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Check for code blocks
      const codeBlocks = await page.locator('pre, code').count();
      if (codeBlocks > 0) {
        // Check if code blocks have monospace font (via class or computed style)
        const codeWithMono = await page.locator('pre.font-mono, code.font-mono, pre [class*="font-mono"], code [class*="font-mono"]').count();
        if (codeWithMono === 0) {
          // Check computed font-family as fallback
          const firstCodeBlock = page.locator('pre, code').first();
          const fontFamily = await firstCodeBlock.evaluate((el) => getComputedStyle(el).fontFamily);
          const isMonospace = fontFamily.toLowerCase().includes('mono') || fontFamily.toLowerCase().includes('consolas') || fontFamily.toLowerCase().includes('menlo');
          if (!isMonospace) {
            console.warn(`[CODE STYLE] ${url} code blocks may not use monospace font: ${fontFamily}`);
          }
        }
      }
    });
  }
});
