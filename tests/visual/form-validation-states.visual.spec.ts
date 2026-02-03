import { test, expect } from '@playwright/test';

// Increase timeout for all tests in this file
test.setTimeout(60000);

/**
 * FORM VALIDATION STATES VISUAL REGRESSION
 *
 * Tests error, success, warning, and validation states that default VRT misses.
 * Form validation visuals are a common source of inconsistency.
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

// ============================================================================
// INPUT VALIDATION STATES
// ============================================================================

test.describe('Input Validation States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/form');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
  });

  test('input - error state styling', async ({ page }) => {
    // Look for inputs with error styling or aria-invalid
    const errorInput = page.locator('input[aria-invalid="true"], .border-destructive input, input.border-destructive');

    if (await errorInput.count() > 0) {
      await errorInput.first().scrollIntoViewIfNeeded();
      await expect(errorInput.first()).toHaveScreenshot('input-error-state.png');
    }
  });

  test('input - with error message', async ({ page }) => {
    // Look for form field with error message displayed
    const errorMessage = page.locator('[role="alert"], .text-destructive, [data-error]');

    if (await errorMessage.count() > 0) {
      // Get the parent form field container
      const formField = errorMessage.first().locator('..').locator('..');
      await formField.scrollIntoViewIfNeeded();
      await expect(formField).toHaveScreenshot('input-with-error-message.png', {
        maxDiffPixels: 50,
      });
    }
  });
});

// ============================================================================
// FORM SUBMISSION VALIDATION
// ============================================================================

test.describe('Form Submission Validation', () => {
  test('contact form - empty submission shows errors', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    // Find the form
    const form = page.locator('form').first();
    if (await form.count() === 0) return;

    // Take before screenshot
    await expect(form).toHaveScreenshot('contact-form-before-submit.png', {
      maxDiffPixels: 100,
    });

    // Try to submit without filling
    const submitButton = form.locator('button[type="submit"], button:has-text("SUBMIT"), button:has-text("SEND")');
    if (await submitButton.count() > 0) {
      await submitButton.click();
      await page.waitForTimeout(500); // Wait for validation to appear

      // Capture form with validation errors
      await expect(form).toHaveScreenshot('contact-form-validation-errors.png', {
        maxDiffPixels: 100,
      });
    }
  });

  test('auth form - validation states', async ({ page }) => {
    await page.goto('/library/authentication');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    // Find sign-in or sign-up form
    const form = page.locator('form').first();
    if (await form.count() === 0) return;

    await form.scrollIntoViewIfNeeded();

    // Submit empty form to trigger validation
    const submitButton = form.locator('button[type="submit"]');
    if (await submitButton.count() > 0) {
      await submitButton.click();
      await page.waitForTimeout(500);

      await expect(form).toHaveScreenshot('auth-form-validation.png', {
        maxDiffPixels: 100,
      });
    }
  });
});

// ============================================================================
// TOAST/NOTIFICATION STATES
// ============================================================================

test.describe('Toast & Notification States', () => {
  test('success toast appearance', async ({ page }) => {
    await page.goto('/docs/components/toaster');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    // Look for a button that triggers success toast
    const successTrigger = page.locator('button:has-text("SUCCESS"), button:has-text("Show Success")');
    if (await successTrigger.count() > 0) {
      await successTrigger.first().click();
      await page.waitForTimeout(500);

      // Capture toast
      const toast = page.locator('[role="status"], [data-state="open"], .toast');
      if (await toast.count() > 0) {
        await expect(toast.first()).toHaveScreenshot('toast-success.png', {
          maxDiffPixels: 50,
        });
      }
    }
  });

  test('error toast appearance', async ({ page }) => {
    await page.goto('/docs/components/toaster');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    const errorTrigger = page.locator('button:has-text("ERROR"), button:has-text("Show Error"), button:has-text("DESTRUCTIVE")');
    if (await errorTrigger.count() > 0) {
      await errorTrigger.first().click();
      await page.waitForTimeout(500);

      const toast = page.locator('[role="alert"], [data-state="open"], .toast');
      if (await toast.count() > 0) {
        await expect(toast.first()).toHaveScreenshot('toast-error.png', {
          maxDiffPixels: 50,
        });
      }
    }
  });
});

// ============================================================================
// ALERT/BANNER STATES
// ============================================================================

test.describe('Alert & Banner States', () => {
  test('alert variants - all types', async ({ page }) => {
    await page.goto('/docs/components/alert');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    const alertTypes = ['default', 'destructive', 'success', 'warning', 'info'];

    for (const type of alertTypes) {
      const alert = page.locator(`[data-variant="${type}"], [role="alert"]:has-text("${type}")`).first();
      if (await alert.count() > 0) {
        await alert.scrollIntoViewIfNeeded();
        await expect(alert).toHaveScreenshot(`alert-${type}.png`, {
          maxDiffPixels: 50,
        });
      }
    }
  });

  // Banner component archived - test removed
});

// ============================================================================
// LOADING STATES
// ============================================================================

test.describe('Loading States', () => {
  test('button loading state', async ({ page }) => {
    await page.goto('/docs/components/button');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    // Look for loading button example
    const loadingButton = page.locator('button:has([class*="animate-spin"]), button[data-loading="true"]');
    if (await loadingButton.count() > 0) {
      await loadingButton.first().scrollIntoViewIfNeeded();
      await expect(loadingButton.first()).toHaveScreenshot('button-loading.png', {
        maxDiffPixels: 100, // Loading spinner may animate
        animations: 'disabled',
      });
    }
  });

  test('skeleton loading state', async ({ page }) => {
    await page.goto('/docs/components/skeleton');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    const skeleton = page.locator('[class*="animate-pulse"], .skeleton').first();
    if (await skeleton.count() > 0) {
      await skeleton.scrollIntoViewIfNeeded();
      await expect(skeleton).toHaveScreenshot('skeleton-loading.png', {
        animations: 'disabled',
      });
    }
  });

  test('loading spinner', async ({ page }) => {
    await page.goto('/docs/components/loading');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    // Inject CSS to pause animations
    await page.addStyleTag({ content: '*, *::before, *::after { animation-play-state: paused !important; }' });

    const spinner = page.locator('[class*="animate-spin"], .loading').first();
    if (await spinner.count() > 0) {
      await spinner.scrollIntoViewIfNeeded();
      await expect(spinner).toHaveScreenshot('loading-spinner.png', {
        animations: 'disabled',
      });
    }
  });
});

// ============================================================================
// PROGRESS STATES
// ============================================================================

test.describe('Progress States', () => {
  test('progress bar - various percentages', async ({ page }) => {
    await page.goto('/docs/components/progress');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    // Inject CSS to pause animations
    await page.addStyleTag({ content: '*, *::before, *::after { animation-play-state: paused !important; transition: none !important; }' });

    const progressBars = page.locator('[role="progressbar"]');
    const count = await progressBars.count();

    if (count > 0) {
      // Capture first progress bar
      await progressBars.first().scrollIntoViewIfNeeded();
      await expect(progressBars.first()).toHaveScreenshot('progress-bar.png');
    }
  });
});

// ============================================================================
// BADGE/STATUS INDICATOR STATES
// ============================================================================

test.describe('Badge & Status States', () => {
  test('badge variants', async ({ page }) => {
    await page.goto('/docs/components/badge');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    const badgeVariants = ['default', 'secondary', 'destructive', 'outline', 'success'];

    for (const variant of badgeVariants) {
      const badge = page.locator(`[data-variant="${variant}"], .badge:has-text("${variant}")`).first();
      if (await badge.count() > 0) {
        await badge.scrollIntoViewIfNeeded();
        await expect(badge).toHaveScreenshot(`badge-${variant}.png`, {
          maxDiffPixels: 20,
        });
      }
    }
  });

  // Status indicator component archived - test removed
});

// ============================================================================
// PASSWORD STRENGTH INDICATOR
// ============================================================================

// Password Strength component archived - test suite removed

// ============================================================================
// EMPTY STATES
// ============================================================================

test.describe('Empty States', () => {
  test('empty state component', async ({ page }) => {
    await page.goto('/library/empty-states');
    await page.waitForLoadState('networkidle');

    const emptyState = page.locator('[class*="empty"], [data-empty="true"]').first();
    if (await emptyState.count() > 0) {
      await emptyState.scrollIntoViewIfNeeded();
      await expect(emptyState).toHaveScreenshot('empty-state.png', {
        maxDiffPixels: 100,
      });
    }
  });

  test('no results state', async ({ page }) => {
    await page.goto('/library/search-results');
    await page.waitForLoadState('networkidle');

    // Look for "no results" messaging
    const noResults = page.locator('text=/no results|nothing found|empty/i').first();
    if (await noResults.count() > 0) {
      await noResults.scrollIntoViewIfNeeded();
      const container = noResults.locator('..').locator('..');
      await expect(container).toHaveScreenshot('no-results-state.png', {
        maxDiffPixels: 100,
      });
    }
  });
});

// ============================================================================
// ERROR PAGE STATES
// ============================================================================

test.describe('Error Page States', () => {
  test('404 page styling', async ({ page }) => {
    await page.goto('/this-page-does-not-exist-404');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('error-404-page.png', {
      fullPage: true,
      maxDiffPixels: 200,
    });
  });

  test('error template page', async ({ page }) => {
    await page.goto('/library/error-pages');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('error-templates.png', {
      fullPage: true,
      maxDiffPixels: 200,
    });
  });
});
