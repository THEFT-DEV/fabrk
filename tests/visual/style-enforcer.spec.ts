import { test, expect } from '@playwright/test';

// Increase timeout for pages with animations
test.setTimeout(60000);

// Pages to audit
const pagesToAudit = [
  '/',
  '/pricing',
  '/contact',
  '/library/billing-dashboard',
  '/library/team-dashboard',
  '/library/profile',
  '/library/settings-page',
];

test.describe('Design System Style Enforcement', () => {
  for (const path of pagesToAudit) {
    test(`style compliance on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');

      // Wait for styles to apply and animations to settle
      await page.waitForTimeout(path === '/' ? 3000 : 1500);

      // Inject script to analyze computed styles of all elements
      const violations = await page.evaluate(() => {
        const violations: string[] = [];
        const allElements = document.querySelectorAll('*');

        // Helper to check if element is visible
        const isVisible = (el: Element) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
        };

        allElements.forEach((el) => {
          if (!isVisible(el)) return;

          const style = window.getComputedStyle(el);
          const tagName = el.tagName.toLowerCase();
          const classList = el.className;

          // IGNORE: SVG elements, internal Next.js elements, third-party scripts
          if (['svg', 'path', 'g', 'defs', 'style', 'script', 'head', 'link', 'meta'].includes(tagName)) return;
          if (el.closest('[data-radix-popper-content-wrapper]')) return; // Ignore floating popovers for now

          // RULE 1: NO SHADOWS (Terminal Aesthetic)
          // We allow 'none' or empty string
          if (style.boxShadow !== 'none' && style.boxShadow !== '') {
            // Filter out some browser defaults or focus rings if necessary
             // Allow focus rings which usually appear as shadows
            if (!style.boxShadow.includes('rgba(0, 0, 0, 0)')) {
               violations.push(`[${tagName}] has forbidden shadow: ${style.boxShadow} (Classes: ${classList})`);
            }
          }

          // RULE 2: NO BORDER RADIUS (Terminal Aesthetic)
          // Exceptions: Avatars (rounded-full), Toggle Switches, Checkboxes (maybe)
          const radius = parseInt(style.borderRadius);
          // 9999px or 50% is usually rounded-full (circles), which is often allowed for avatars
          const isCircle = style.borderRadius.includes('50%') || radius > 100;
          
          if (radius > 0 && !isCircle) {
            // Check if it's an allowed exception
            const isAvatar = classList.includes('avatar') || classList.includes('rounded-full');
            const isSwitch = classList.includes('switch');
            const isBadge = classList.includes('badge');
            
            if (!isAvatar && !isSwitch && !isBadge) {
               violations.push(`[${tagName}] has forbidden border-radius: ${style.borderRadius} (Classes: ${classList})`);
            }
          }

          // RULE 3: STRICT FONT FAMILY (Terminal Aesthetic)
          // Should be monospace for text content
          // const fontFamily = style.fontFamily;
          // if (!fontFamily.includes('monospace') && !fontFamily.includes('Geist Mono') && !fontFamily.includes('JetBrains Mono')) {
          //   // This is too strict to enforce globally right now without more context
          // }
        });

        return violations;
      });

      // Report Violations
      if (violations.length > 0) {
        console.log(`
⚠️ Violations found on ${path}:`);
        // Limit log output
        violations.slice(0, 10).forEach(v => console.log(v));
        if (violations.length > 10) console.log(`...and ${violations.length - 10} more.`);
      }

      // Fail the test if strict mode is desired, or just warn. 
      // For now, we'll assert 0 violations to force clean-up.
      expect(violations, `Found ${violations.length} design system violations on ${path}`).toEqual([]);
    });
  }
});
