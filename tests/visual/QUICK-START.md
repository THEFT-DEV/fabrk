# Visual Testing Quick Start

## Installation

```bash
# Install Playwright browsers (one-time)
npx playwright install --with-deps
```

## Running Tests

### Quick Commands

```bash
# Run all visual tests
npm run test:visual

# Update snapshots (after intentional changes)
npm run test:visual:update

# View test report
npm run test:visual:report
```

### Category-Specific Testing

```bash
# Using helper script
./scripts/run-visual-tests.sh marketing           # Marketing pages
./scripts/run-visual-tests.sh docs-components     # Component docs (99 pages)
./scripts/run-visual-tests.sh templates           # Template pages
./scripts/run-visual-tests.sh validation          # Site-wide checks

# Or use Playwright directly
npx playwright test tests/visual/full-site.visual.spec.ts
npx playwright test tests/visual/docs-components.visual.spec.ts
npx playwright test tests/visual/docs-features.visual.spec.ts
npx playwright test tests/visual/library-full.visual.spec.ts
npx playwright test tests/visual/site-wide-validation.spec.ts
```

### Interactive Testing

```bash
# Headed mode (see browser)
./scripts/run-visual-tests.sh marketing --headed

# UI mode (Playwright inspector)
./scripts/run-visual-tests.sh templates --ui

# Debug mode (step through)
./scripts/run-visual-tests.sh validation --debug
```

## Common Tasks

### After Making Visual Changes

```bash
# 1. Run tests to see failures
npm run test:visual

# 2. Review failures in report
npm run test:visual:report

# 3. If changes are intentional, update snapshots
npm run test:visual:update

# 4. Review snapshot diffs
git diff tests/__snapshots__/

# 5. Commit if correct
git add tests/__snapshots__/
git commit -m "Update visual snapshots for [change description]"
```

### Testing a Specific Page

```bash
# Use grep to filter
npx playwright test tests/visual/ --grep "homepage"
npx playwright test tests/visual/ --grep "button"
npx playwright test tests/visual/ --grep "Terminal Check"
```

### Debugging Failures

```bash
# 1. Open test report
npm run test:visual:report

# 2. Run failing test in headed mode
npx playwright test tests/visual/full-site.visual.spec.ts --grep "homepage" --headed

# 3. Run in debug mode
npx playwright test tests/visual/full-site.visual.spec.ts --grep "homepage" --debug
```

## What Gets Tested

### Visual Snapshots (200+ screenshots)
- All marketing pages
- All legal pages
- All documentation pages
- All component pages (78 Total)
- All template pages (78 Total)
- Responsive layouts (mobile, tablet, desktop)

### Terminal Aesthetic
- ❌ No `rounded-sm/md/lg/xl` (use `rounded-none`)
- ❌ No hardcoded hex colors (`#fff`, `#000`)
- ❌ No hardcoded color classes (`bg-white`, `bg-gray-500`)
- ✅ Font-mono usage
- ✅ Design token compliance
- ✅ Terminal header patterns

### Accessibility
- ✅ Main landmarks
- ✅ Heading hierarchy
- ✅ Image alt text
- ✅ Button labels
- ✅ Link text
- ✅ Form labels

### Performance
- ✅ DOM interactive < 5s
- ✅ CLS < 0.25
- ✅ No horizontal scroll
- ✅ No console errors

## File Structure

```
tests/visual/
├── README.md                       # Complete documentation
├── QUICK-START.md                  # This file
├── COVERAGE.md                     # Page inventory
├── full-site.visual.spec.ts        # Marketing, legal, docs main
├── docs-components.visual.spec.ts  # Component docs (99 pages)
├── docs-features.visual.spec.ts    # Feature guides
├── templates-full.visual.spec.ts   # Template pages
└── site-wide-validation.spec.ts    # Pattern validation
```

## Snapshot Files

```
tests/__snapshots__/
├── full-site.visual.spec.ts/
│   ├── marketing-homepage.png
│   ├── legal-privacy.png
│   └── ...
├── docs-components.visual.spec.ts/
│   ├── docs-component-button.png
│   └── ...
└── ...
```

## CI/CD Integration

Add to `.github/workflows/test.yml`:

```yaml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run visual tests
  run: npm run test:visual

- name: Upload report
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Tips

1. **Always run tests before committing** to catch regressions
2. **Review snapshot diffs carefully** before updating
3. **Use headed mode** to debug visual issues
4. **Keep snapshots in git** for team consistency
5. **Update snapshots intentionally**, not to fix failing tests
6. **Check report** for detailed failure information

## Troubleshooting

### Tests are flaky
```bash
# Increase timeout in test
await page.waitForTimeout(1000);

# Increase maxDiffPixels tolerance
maxDiffPixels: 200
```

### Snapshots differ on Mac vs Linux
```bash
# Use Docker for consistent snapshots
docker run -it --rm -v $(pwd):/work -w /work mcr.microsoft.com/playwright:latest npm run test:visual
```

### Tests take too long
```bash
# Run specific category
./scripts/run-visual-tests.sh marketing

# Or use fewer workers
npx playwright test tests/visual/ --workers=2
```

### Memory issues
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run test:visual
```

## Next Steps

1. Run initial tests: `npm run test:visual`
2. Generate baseline snapshots: `npm run test:visual:update`
3. Commit snapshots: `git add tests/__snapshots__/ && git commit -m "Add visual regression baselines"`
4. Set up CI/CD integration
5. Run tests on every PR

## Resources

- [Full Documentation](./README.md)
- [Coverage Details](./COVERAGE.md)
- [Playwright Docs](https://playwright.dev/docs/test-snapshots)
- [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md)
