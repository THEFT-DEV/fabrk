import { test, expect } from '@playwright/test';

/**
 * INTERACTIVE STATES VISUAL REGRESSION
 *
 * Tests hover, focus, active, and disabled states that default VRT misses.
 * These are the "gaps" where visual inconsistencies often hide.
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

// ============================================================================
// BUTTON INTERACTIVE STATES
// ============================================================================

test.describe('Button Interactive States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/button');
    await page.waitForLoadState('networkidle');
  });

  test('default button - hover state', async ({ page }) => {
    const button = page.locator('button:has-text("CLICK")').first();
    await button.scrollIntoViewIfNeeded();

    // Hover over the button
    await button.hover();
    await page.waitForTimeout(100); // Wait for transition

    await expect(button).toHaveScreenshot('button-hover.png');
  });

  test('default button - focus state', async ({ page }) => {
    const button = page.locator('button:has-text("CLICK")').first();
    await button.scrollIntoViewIfNeeded();

    // Focus the button (keyboard navigation)
    await button.focus();
    await page.waitForTimeout(100);

    await expect(button).toHaveScreenshot('button-focus.png');
  });

  test('default button - active state', async ({ page }) => {
    const button = page.locator('button:has-text("CLICK")').first();
    await button.scrollIntoViewIfNeeded();

    // Simulate mouse down (active state)
    await button.dispatchEvent('mousedown');
    await page.waitForTimeout(50);

    await expect(button).toHaveScreenshot('button-active.png');
  });

  test('disabled button state', async ({ page }) => {
    // Navigate to a page with disabled buttons or find one
    const disabledButton = page.locator('button[disabled]').first();
    if (await disabledButton.count() > 0) {
      await disabledButton.scrollIntoViewIfNeeded();
      await expect(disabledButton).toHaveScreenshot('button-disabled.png');
    }
  });

  test('button variants - all hover states', async ({ page }) => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];

    for (const variant of variants) {
      const button = page.locator(`[data-variant="${variant}"], button:has-text("${variant.toUpperCase()}")`).first();
      if (await button.count() > 0) {
        await button.scrollIntoViewIfNeeded();
        await button.hover();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot(`button-${variant}-hover.png`, {
          maxDiffPixels: 50,
        });
      }
    }
  });
});

// ============================================================================
// INPUT INTERACTIVE STATES
// ============================================================================

test.describe('Input Interactive States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/input');
    await page.waitForLoadState('networkidle');
  });

  test('input - focus state with ring', async ({ page }) => {
    const input = page.locator('input[type="text"], input[type="email"]').first();
    await input.scrollIntoViewIfNeeded();

    // Focus the input
    await input.focus();
    await page.waitForTimeout(100);

    // Capture the input with its focus ring
    await expect(input).toHaveScreenshot('input-focus.png', {
      maxDiffPixels: 20,
    });
  });

  test('input - with placeholder vs filled', async ({ page }) => {
    const input = page.locator('input[placeholder]').first();
    await input.scrollIntoViewIfNeeded();

    // Capture with placeholder
    await expect(input).toHaveScreenshot('input-placeholder.png');

    // Fill and capture
    await input.fill('Sample text content');
    await expect(input).toHaveScreenshot('input-filled.png');
  });

  test('input - disabled state', async ({ page }) => {
    const disabledInput = page.locator('input[disabled]').first();
    if (await disabledInput.count() > 0) {
      await disabledInput.scrollIntoViewIfNeeded();
      await expect(disabledInput).toHaveScreenshot('input-disabled.png');
    }
  });
});

// ============================================================================
// LINK/ANCHOR INTERACTIVE STATES
// ============================================================================

test.describe('Link Interactive States', () => {
  test('link - hover underline/color change', async ({ page }) => {
    await page.goto('/docs');
    await page.waitForLoadState('networkidle');

    const link = page.locator('a[href]:not([href^="#"])').first();
    await link.scrollIntoViewIfNeeded();

    // Default state
    await expect(link).toHaveScreenshot('link-default.png');

    // Hover state
    await link.hover();
    await page.waitForTimeout(100);
    await expect(link).toHaveScreenshot('link-hover.png');
  });
});

// ============================================================================
// CHECKBOX/SWITCH INTERACTIVE STATES
// ============================================================================

test.describe('Checkbox & Switch States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/checkbox');
    await page.waitForLoadState('networkidle');
  });

  test('checkbox - unchecked vs checked', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    if (await checkbox.count() > 0) {
      await checkbox.scrollIntoViewIfNeeded();

      // Unchecked state
      await expect(checkbox).toHaveScreenshot('checkbox-unchecked.png');

      // Click to check
      await checkbox.click();
      await page.waitForTimeout(100);
      await expect(checkbox).toHaveScreenshot('checkbox-checked.png');
    }
  });

  test('switch - off vs on', async ({ page }) => {
    await page.goto('/docs/components/switch');
    await page.waitForLoadState('networkidle');

    const switchEl = page.locator('[role="switch"]').first();
    if (await switchEl.count() > 0) {
      await switchEl.scrollIntoViewIfNeeded();

      // Off state
      await expect(switchEl).toHaveScreenshot('switch-off.png');

      // Toggle on
      await switchEl.click();
      await page.waitForTimeout(100);
      await expect(switchEl).toHaveScreenshot('switch-on.png');
    }
  });
});

// ============================================================================
// DROPDOWN/SELECT INTERACTIVE STATES
// ============================================================================

test.describe('Dropdown Interactive States', () => {
  test('select - closed vs open', async ({ page }) => {
    await page.goto('/docs/components/select');
    await page.waitForLoadState('networkidle');

    const selectTrigger = page.locator('[data-state="closed"]').first();
    if (await selectTrigger.count() > 0) {
      await selectTrigger.scrollIntoViewIfNeeded();

      // Closed state
      await expect(selectTrigger).toHaveScreenshot('select-closed.png');

      // Open the dropdown
      await selectTrigger.click();
      await page.waitForTimeout(200);

      // Capture the open dropdown (full page to include popover)
      await expect(page).toHaveScreenshot('select-open.png', {
        maxDiffPixels: 100,
      });
    }
  });

  test('dropdown menu - open with hover highlight', async ({ page }) => {
    await page.goto('/docs/components/dropdown-menu');
    await page.waitForLoadState('networkidle');

    const trigger = page.locator('button:has-text("OPEN")').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(200);

      // Hover over first menu item
      const menuItem = page.locator('[role="menuitem"]').first();
      if (await menuItem.count() > 0) {
        await menuItem.hover();
        await page.waitForTimeout(100);

        await expect(page).toHaveScreenshot('dropdown-item-hover.png', {
          maxDiffPixels: 100,
        });
      }
    }
  });
});

// ============================================================================
// ACCORDION INTERACTIVE STATES
// ============================================================================

test.describe('Accordion Interactive States', () => {
  test('accordion - collapsed vs expanded', async ({ page }) => {
    await page.goto('/docs/components/accordion');
    await page.waitForLoadState('networkidle');

    const accordionTrigger = page.locator('[data-state="closed"]').first();
    if (await accordionTrigger.count() > 0) {
      await accordionTrigger.scrollIntoViewIfNeeded();

      // Collapsed state
      await expect(accordionTrigger).toHaveScreenshot('accordion-collapsed.png');

      // Expand
      await accordionTrigger.click();
      await page.waitForTimeout(300); // Wait for animation

      const expandedSection = page.locator('[data-state="open"]').first();
      await expect(expandedSection).toHaveScreenshot('accordion-expanded.png', {
        maxDiffPixels: 50,
      });
    }
  });
});

// ============================================================================
// TOOLTIP INTERACTIVE STATES
// ============================================================================

test.describe('Tooltip Interactive States', () => {
  test('tooltip - appears on hover', async ({ page }) => {
    await page.goto('/docs/components/tooltip');
    await page.waitForLoadState('networkidle');

    const tooltipTrigger = page.locator('[data-state="closed"]').first();
    if (await tooltipTrigger.count() > 0) {
      await tooltipTrigger.scrollIntoViewIfNeeded();

      // Hover to show tooltip
      await tooltipTrigger.hover();
      await page.waitForTimeout(500); // Tooltips often have delay

      await expect(page).toHaveScreenshot('tooltip-visible.png', {
        maxDiffPixels: 100,
      });
    }
  });
});

// ============================================================================
// DIALOG/MODAL STATES
// ============================================================================

test.describe('Dialog States', () => {
  test('dialog - open state', async ({ page }) => {
    await page.goto('/docs/components/dialog');
    await page.waitForLoadState('networkidle');

    const dialogTrigger = page.locator('button:has-text("OPEN")').first();
    if (await dialogTrigger.count() > 0) {
      await dialogTrigger.click();
      await page.waitForTimeout(300);

      // Capture the open dialog with backdrop
      await expect(page).toHaveScreenshot('dialog-open.png', {
        maxDiffPixels: 100,
      });
    }
  });
});

// ============================================================================
// TAB INTERACTIVE STATES
// ============================================================================

test.describe('Tab Interactive States', () => {
  test('tabs - switching active tab', async ({ page }) => {
    await page.goto('/docs/components/tabs');
    await page.waitForLoadState('networkidle');

    const tabs = page.locator('[role="tab"]');
    const tabCount = await tabs.count();

    if (tabCount >= 2) {
      // First tab (default active)
      await expect(tabs.first()).toHaveScreenshot('tab-active.png');

      // Click second tab
      await tabs.nth(1).click();
      await page.waitForTimeout(100);

      // Now second tab should be active
      await expect(tabs.nth(1)).toHaveScreenshot('tab-second-active.png');
    }
  });
});

// ============================================================================
// KEYBOARD NAVIGATION FOCUS VISIBILITY
// ============================================================================

test.describe('Keyboard Focus Visibility', () => {
  test('focus visible on keyboard navigation', async ({ page }) => {
    await page.goto('/docs/components/button');
    await page.waitForLoadState('networkidle');

    // Tab through elements to test focus rings
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // The focused element should have visible focus ring
    const focusedElement = page.locator(':focus');
    if (await focusedElement.count() > 0) {
      await expect(focusedElement).toHaveScreenshot('keyboard-focus-ring.png', {
        maxDiffPixels: 50,
      });
    }
  });
});
