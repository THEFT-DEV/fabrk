# Lighthouse CI Setup Summary

Complete automated performance testing infrastructure for Fabrk Boilerplate.

## Installation Complete

### Package Installed
- **@lhci/cli@0.15.1** - Lighthouse CI command-line interface

### Files Created

1. **lighthouserc.js** (Root directory)
   - Lighthouse CI configuration
   - Performance budgets defined
   - 5 pages configured for testing
   - 3 runs per page (median scoring)

2. **.github/workflows/lighthouse.yml**
   - GitHub Actions workflow
   - Runs on push to `main`/`dev`
   - Runs on pull requests
   - Uploads reports as artifacts
   - Comments scores on PRs

3. **scripts/lighthouse-audit.sh**
   - Local testing script
   - Executable helper for manual audits
   - Builds and tests production build

4. **docs/PERFORMANCE.md**
   - Comprehensive performance guide
   - Optimization techniques
   - Core Web Vitals documentation
   - Troubleshooting common issues

5. **docs/LIGHTHOUSE-CI.md**
   - Lighthouse CI documentation
   - Usage instructions
   - Budget configuration guide
   - CI/CD workflow details

### NPM Scripts Added

```json
{
  "lighthouse": "./scripts/lighthouse-audit.sh",
  "lighthouse:ci": "lhci autorun"
}
```

### .gitignore Updated

Added `.lighthouseci/` to ignore generated reports (kept out of version control).

## Performance Budgets Enforced

### Lighthouse Scores (Error if not met)

| Category | Minimum Score |
|----------|--------------|
| Performance | 78/78 |
| Accessibility | 78/78 |
| Best Practices | 78/78 |
| SEO | 78/78 |

### Core Web Vitals (Error if exceeded)

| Metric | Budget |
|--------|--------|
| First Contentful Paint (FCP) | < 2s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Total Blocking Time (TBT) | < 300ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3.5s |

### Resource Budgets (Warning if exceeded)

| Resource | Maximum Size |
|----------|-------------|
| JavaScript | 500KB |
| CSS | 100KB |
| Images | 1MB |
| Fonts | 200KB |

## Pages Tested

The following pages are audited on every CI run:

1. **Landing Page** - `http://localhost:3000/`
2. **Component Showcase** - `http://localhost:3000/components`
3. **Template Gallery** - `http://localhost:3000/library`
4. **Features Page** - `http://localhost:3000/features`
5. **Modern Variation** - `http://localhost:3000/variations/modern`

## How to Use

### Local Testing

```bash
# Run full Lighthouse audit
npm run lighthouse

# View generated reports
open .lighthouseci/lhr-*.html
```

**What happens:**
1. Builds production app (`npm run build`)
2. Starts production server (`npm start`)
3. Runs Lighthouse 3 times per page
4. Takes median scores
5. Validates against budgets
6. Generates HTML reports in `.lighthouseci/`

### CI/CD Integration

**Automatic runs:**
- Every push to `main` or `dev` branches
- Every pull request

**Workflow steps:**
1. Checkout code
2. Install dependencies
3. Build production app
4. Run Lighthouse CI
5. Upload reports to GitHub Actions artifacts
6. Comment scores on pull request

**Viewing results:**
- On PRs: Check "Lighthouse CI" comment for scores
- On pushes: Download artifacts from Actions tab
- Reports available for 30 days

## Next Steps

### 1. Run Initial Audit

```bash
npm run lighthouse
```

This will:
- Build the production app
- Test all 5 pages
- Generate baseline performance reports
- Show which budgets pass/fail

### 2. Review Initial Scores

Open generated reports:
```bash
open .lighthouseci/lhr-*.html
```

Check for:
- Scores below 90 (Performance, Best Practices, SEO)
- Scores below 95 (Accessibility)
- Core Web Vitals exceeding budgets
- Resource size warnings

### 3. Optimize if Needed

If scores are below budgets:

**Performance < 90:**
- Enable code splitting
- Optimize images (WebP, correct sizing)
- Reduce JavaScript bundle size
- Remove unused CSS

**Accessibility < 95:**
- Add missing alt text
- Fix color contrast issues
- Ensure keyboard navigation
- Add ARIA labels

**Best Practices < 90:**
- Fix security headers
- Enable HTTPS
- Update deprecated APIs
- Remove console logs

**SEO < 90:**
- Add meta descriptions
- Set proper heading hierarchy
- Add structured data
- Fix mobile-friendliness

**Core Web Vitals:**
- See `docs/PERFORMANCE.md` for detailed optimization guide

### 4. Configure GitHub Actions

**Optional: Add LHCI GitHub App Token**

For persistent Lighthouse reports stored in Lighthouse CI server:

1. Install [Lighthouse CI GitHub App](https://github.com/apps/lighthouse-ci)
2. Get app token from Lighthouse CI server
3. Add to GitHub secrets as `LHCI_GITHUB_APP_TOKEN`
4. Reports will be stored permanently instead of 7-day temporary storage

**Current setup:** Uses temporary public storage (7 days retention)

### 5. Monitor Performance Over Time

**On every PR:**
- Lighthouse CI comments with scores
- Compare against previous runs
- Catch performance regressions early

**Best practices:**
- Don't merge PRs that fail budgets
- Review reports for optimization opportunities
- Update budgets as app matures (make stricter)

## Customization

### Add More Pages

Edit `lighthouserc.js`:

```javascript
url: [
  'http://localhost:3000/',
  'http://localhost:3000/new-page', // Add here
],
```

### Adjust Budgets

Make stricter:
```javascript
// FCP < 1.5s instead of 2s
'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
```

Make looser:
```javascript
// Performance 85+ instead of 90+
'categories:performance': ['error', { minScore: 0.85 }],
```

### Change Assertion Level

```javascript
// Change from error to warning (won't fail CI)
'unused-javascript': 'warn',

// Change from warning to error (will fail CI)
'speed-index': ['error', { maxNumericValue: 3000 }],
```

## Troubleshooting

### Build Fails

**Error:** Build command fails in CI

**Solution:**
1. Ensure environment variables set in workflow
2. Test locally: `npm run build`
3. Check logs in GitHub Actions

### Scores Below Budget

**Error:** Performance score is 85 (needs 90)

**Solution:**
1. Run locally: `npm run lighthouse`
2. Open report: `open .lighthouseci/*.html`
3. Review "Opportunities" and "Diagnostics"
4. Follow optimization guide: `docs/PERFORMANCE.md`

### Server Timeout

**Error:** `startServerReadyTimeout` exceeded

**Solution:**
1. Increase timeout in `lighthouserc.js`:
   ```javascript
   startServerReadyTimeout: 120000, // 2 min
   ```
2. Check server logs "Ready" message

### No Reports Generated

**Error:** `.lighthouseci/` directory empty

**Solution:**
1. Check command output for errors
2. Ensure build succeeded
3. Verify server started on port 3000

## Resources

- **Lighthouse CI Docs:** https://github.com/GoogleChrome/lighthouse-ci
- **Web Vitals Guide:** https://web.dev/vitals/
- **Performance Guide:** `docs/PERFORMANCE.md`
- **Lighthouse CI Guide:** `docs/LIGHTHOUSE-CI.md`

## Summary

Lighthouse CI is now fully configured and ready to enforce performance budgets in CI/CD.

**What you get:**
- Automated performance testing on every push/PR
- Strict budgets for Lighthouse scores and Core Web Vitals
- Resource size budgets for JavaScript, CSS, images, fonts
- Detailed reports with optimization recommendations
- PR comments with scores for easy review
- 30-day report retention in GitHub Actions artifacts

**What to do next:**
1. Run initial audit: `npm run lighthouse`
2. Review scores and optimize if needed
3. Push to GitHub to test CI integration
4. Monitor scores on future PRs

**Performance monitoring is now on autopilot!**
