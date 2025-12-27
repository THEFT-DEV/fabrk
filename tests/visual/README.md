# Visual Regression Test Suite

Comprehensive Playwright visual regression tests covering **ALL 220+ pages** of the Fabrk boilerplate.

## Test Files

| File | Pages Tested | Description |
|------|--------------|-------------|
| `full-site.visual.spec.ts` | ~35 pages | Marketing, Legal, Dashboard (skipped - auth required), Docs main, Launch, Terminal validation, A11y |
| `docs-components.visual.spec.ts` | 99 pages | All component documentation pages + overview |
| `docs-features.visual.spec.ts` | ~50 pages | Features, Security, Tutorials, Deployment, Extras |
| `templates-full.visual.spec.ts` | ~30 pages | All template categories + responsive tests |
| `site-wide-validation.spec.ts` | All 220+ pages (sampled) | Site-wide pattern validation, performance, console errors |

**Total Coverage:** 220+ pages

## What's Tested

### Visual Regression
- Full-page screenshots of all pages
- Responsive layouts (mobile, tablet, desktop)
- Animation states
- Component variations

### Terminal Aesthetic Compliance
- ✅ No `rounded-sm/md/lg/xl` on buttons, inputs, selects
- ✅ No hardcoded hex colors (`#fff`, `#000`, `bg-[#...]`)
- ✅ No banned color classes (`bg-white`, `bg-black`, `bg-gray-*`)
- ✅ `font-mono` usage for terminal elements
- ✅ Design token usage (`bg-primary`, `text-foreground`, etc.)
- ✅ Terminal header patterns (`[0x00]`, `[LABEL]:`)

### Accessibility
- ✅ `<main>` landmark present
- ✅ `<h1>` heading hierarchy
- ✅ Images have `alt` text
- ✅ Buttons have accessible names
- ✅ Links have accessible text
- ✅ Form inputs have labels

### Performance
- DOM interactive time < 5s
- Cumulative Layout Shift (CLS) < 0.25
- No horizontal scroll on mobile/tablet
- Charts render with non-zero dimensions

### Console Errors
- No JavaScript errors (excluding browser extensions)
- No React hydration warnings
- No failed network requests

## Running Tests

```bash
# Run all visual tests
npm run test:visual

# Run specific test file
npx playwright test tests/visual/full-site.visual.spec.ts

# Run in headed mode (see browser)
npx playwright test tests/visual/ --headed

# Run in debug mode (step through)
npx playwright test tests/visual/ --debug

# Update baseline snapshots (IMPORTANT: Review changes!)
npm run test:visual:update

# Show test report
npx playwright show-report
```

## Updating Baselines

When you make intentional visual changes:

```bash
# Update all snapshots
npm run test:visual:update

# Update specific file snapshots
npx playwright test tests/visual/full-site.visual.spec.ts --update-snapshots

# Review changes before committing
git diff tests/__snapshots__/
```

**IMPORTANT:** Always review snapshot diffs before committing. Unexpected changes may indicate bugs.

## Dashboard Pages (Auth Required)

The following pages are **skipped** because they require authentication:

- `/account`
- `/admin/*` (7 pages)
- `/billing/*` (2 pages)
- `/dashboard`
- `/developer/api-keys`
- `/examples/*` (3 pages)
- `/organizations/new`
- `/profile`
- `/settings/*` (2 pages)

To enable these tests:

1. Create `tests/auth.setup.ts` with login flow
2. Save auth state using `storageState`
3. Load state in tests: `use: { storageState: 'path/to/auth.json' }`
4. Remove `.skip` from dashboard tests

See: https://playwright.dev/docs/auth

## Test Configuration

Configured in `/playwright.config.ts`:

```typescript
expect: {
  toHaveScreenshot: {
    maxDiffPixels: 100,    // Allow 100 pixels difference
    threshold: 0.2,        // 20% color difference threshold
  },
}
```

Per-test overrides:

```typescript
await expect(page).toHaveScreenshot('name.png', {
  fullPage: true,
  animations: 'disabled',
  maxDiffPixels: 150,  // Higher tolerance for complex pages
});
```

## CI/CD Integration

Add to GitHub Actions (`.github/workflows/test.yml`):

```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run visual regression tests
  run: npm run test:visual

- name: Upload test results
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Debugging Failed Tests

1. **Check snapshot diff:**
   ```bash
   npx playwright show-report
   ```

2. **Run in headed mode:**
   ```bash
   npx playwright test tests/visual/full-site.visual.spec.ts --headed
   ```

3. **Inspect specific page:**
   ```bash
   npx playwright test --grep "Marketing: homepage" --headed
   ```

4. **Debug mode (interactive):**
   ```bash
   npx playwright test --grep "Marketing: homepage" --debug
   ```

5. **Check console output:**
   Tests log warnings for violations found during validation.

## Performance Optimization

Tests run in parallel by default. To adjust:

```bash
# Run serially (slower but more stable)
npx playwright test tests/visual/ --workers=1

# Run with 4 workers
npx playwright test tests/visual/ --workers=4
```

## Snapshot Storage

Snapshots are stored in `/tests/__snapshots__/`:

```
tests/
  __snapshots__/
    full-site.visual.spec.ts/
      marketing-homepage.png
      legal-privacy.png
      ...
    docs-components.visual.spec.ts/
      docs-component-button.png
      ...
```

**Important:** Commit snapshots to version control. They serve as the baseline for future tests.

## Terminal Style Violations

Common violations detected:

### Banned Rounded Classes
```tsx
// ❌ BAD
<button className="rounded-md">Submit</button>
<input className="rounded-lg" />

// ✅ GOOD
<button className="rounded-none">Submit</button>
<input className="rounded-none" />
```

### Hardcoded Hex Colors
```tsx
// ❌ BAD
<div style={{ backgroundColor: '#fff' }}>
<div className="bg-[#000000]">

// ✅ GOOD
<div className="bg-background">
<div className="text-foreground">
```

### Hardcoded Color Classes
```tsx
// ❌ BAD
<div className="bg-white text-gray-500">

// ✅ GOOD
<div className="bg-background text-muted-foreground">
```

### Missing Terminal Font
```tsx
// ❌ BAD
<span>LABEL:</span>

// ✅ GOOD
<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>
```

## Adding New Pages

When adding new pages to the site:

1. Add URL to appropriate array in `site-wide-validation.spec.ts`:
   ```typescript
   const ALL_PAGES = {
     marketing: [
       // ... existing pages
       '/your-new-page',
     ],
   };
   ```

2. Add specific test in relevant file:
   ```typescript
   test('New Page: your-page-name', async ({ page }) => {
     await page.goto('/your-new-page');
     await page.waitForLoadState('networkidle');
     await expect(page).toHaveScreenshot('your-page-name.png', {
       fullPage: true,
       animations: 'disabled',
     });
   });
   ```

3. Run tests to generate baseline:
   ```bash
   npx playwright test --update-snapshots
   ```

4. Commit new snapshots:
   ```bash
   git add tests/__snapshots__/
   git commit -m "Add visual tests for new page"
   ```

## Best Practices

1. **Always wait for `networkidle`** before taking screenshots
2. **Disable animations** to avoid flaky tests
3. **Use higher `maxDiffPixels`** for interactive components (charts, forms)
4. **Review diffs carefully** before updating snapshots
5. **Run tests before committing** to catch regressions early
6. **Keep snapshots in git** for team consistency
7. **Use descriptive test names** for easier debugging
8. **Group related tests** with `describe()` blocks

## Troubleshooting

### Tests are flaky
- Increase `waitForTimeout` after `networkidle`
- Disable animations: `animations: 'disabled'`
- Increase `maxDiffPixels` tolerance

### Snapshots differ on different machines
- Ensure same OS (snapshots are OS-specific)
- Use Docker for consistent environment
- Use GitHub Actions for CI snapshots

### Tests take too long
- Reduce `workers` in config
- Split tests across multiple jobs in CI
- Use sampling (test every Nth page)

### Memory issues
- Reduce parallel workers: `--workers=1`
- Increase Node memory: `NODE_OPTIONS=--max-old-space-size=4096`

## Resources

- [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md) - Terminal aesthetic rules
- [Audit Framework](.claude/audit/) - Design system validation
