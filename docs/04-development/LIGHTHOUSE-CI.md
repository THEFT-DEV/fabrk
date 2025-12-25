# Lighthouse CI Setup

Automated performance testing with strict budgets enforced in CI/CD.

## Quick Start

### Local Testing

```bash
# Run full Lighthouse audit
npm run lighthouse

# View reports (opens in browser)
open .lighthouseci/lhr-*.html
```

### CI Integration

Lighthouse CI runs automatically on:
- Every push to `main` or `dev` branches
- Every pull request

## What Gets Tested

### Pages Audited

1. **Landing Page** - `/`
2. **Component Showcase** - `/components`
3. **Template Gallery** - `/library`
4. **Features Page** - `/features`
5. **Modern Variation** - `/variations/modern`

### Performance Budgets

| Metric | Budget | Category |
|--------|--------|----------|
| Performance Score | ≥ 78/78 | Core |
| Accessibility Score | ≥ 78/78 | Core |
| Best Practices Score | ≥ 78/78 | Core |
| SEO Score | ≥ 78/78 | Core |
| First Contentful Paint | < 2s | Web Vitals |
| Largest Contentful Paint | < 2.5s | Web Vitals |
| Total Blocking Time | < 300ms | Web Vitals |
| Cumulative Layout Shift | < 0.1 | Web Vitals |
| Time to Interactive | < 3.5s | Web Vitals |
| JavaScript Bundle | < 500KB | Resources |
| CSS Bundle | < 100KB | Resources |
| Images | < 1MB | Resources |
| Fonts | < 200KB | Resources |

## How It Works

### 1. Collection

Lighthouse CI:
- Builds the production app (`npm run build`)
- Starts production server (`npm start`)
- Runs Lighthouse on each page **3 times**
- Takes the **median score** to reduce variance

### 2. Assertion

Each run is validated against budgets:
- **Error** - Fails CI if budget exceeded
- **Warn** - Shows warning but doesn't fail CI

### 3. Reporting

Reports are:
- Uploaded to temporary public storage (viewable for 7 days)
- Saved as GitHub Actions artifacts (viewable for 30 days)
- Commented on pull requests with scores

## CI Workflow

### GitHub Actions Workflow

Located at: `.github/workflows/lighthouse.yml`

**Triggers:**
- Push to `main` or `dev`
- Pull requests to `main` or `dev`

**Steps:**
1. Checkout code
2. Install dependencies
3. Build production app
4. Run Lighthouse CI
5. Upload reports
6. Comment scores on PR

### Viewing CI Results

**On Pull Requests:**
1. Scroll to checks section
2. Click "Lighthouse CI"
3. View scores in PR comment
4. Download artifacts for detailed reports

**On Pushes:**
1. Go to "Actions" tab in GitHub
2. Click latest "Lighthouse CI" workflow
3. Download artifacts under "Summary"

## Configuration

### Lighthouse Config

Located at: `lighthouserc.js`

**Key settings:**
```javascript
{
  ci: {
    collect: {
      numberOfRuns: 3,           // Run 3 times per page
      preset: 'desktop',         // Desktop testing
      startServerCommand: '...',  // Build & start server
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.90 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        // ... more assertions
      },
    },
  },
}
```

### Customizing Budgets

Edit `lighthouserc.js` to adjust:

```javascript
// Make stricter (FCP < 1.5s instead of 2s)
'first-contentful-paint': ['error', { maxNumericValue: 1500 }],

// Make looser (Performance 85+ instead of 90+)
'categories:performance': ['error', { minScore: 0.85 }],

// Change to warning instead of error
'unused-javascript': 'warn',
```

### Adding Pages

Edit `url` array in `lighthouserc.js`:

```javascript
collect: {
  url: [
    'http://localhost:3000/',
    'http://localhost:3000/new-page',  // Add new pages here
  ],
},
```

## Troubleshooting

### Build Fails in CI

**Error:** Build command fails

**Solutions:**
1. Ensure all environment variables are set in workflow
2. Check that build succeeds locally: `npm run build`
3. Review error logs in GitHub Actions

### Lighthouse Scores Fail

**Error:** Scores below budget thresholds

**Solutions:**
1. Run locally: `npm run lighthouse`
2. Review generated reports in `.lighthouseci/`
3. Follow optimization guide in `docs/PERFORMANCE.md`
4. Check Chrome DevTools Performance tab

### Server Start Timeout

**Error:** `startServerReadyTimeout` exceeded

**Solutions:**
1. Increase timeout in `lighthouserc.js`:
   ```javascript
   startServerReadyTimeout: 120000, // 2 minutes
   ```
2. Ensure server logs "Ready" when started
3. Check server starts locally: `npm run build && npm start`

### Missing Reports

**Error:** No artifacts uploaded

**Solutions:**
1. Check workflow completed successfully
2. Verify `.lighthouseci/` directory created
3. Ensure GitHub Actions has artifact upload permissions

## Best Practices

### Before Committing

1. **Run locally first:**
   ```bash
   npm run lighthouse
   ```

2. **Check scores:**
   - All categories ≥ 90 (except Accessibility ≥ 95)
   - Core Web Vitals within budgets

3. **Fix issues before pushing:**
   - Optimize images
   - Split large bundles
   - Remove unused code

### Interpreting Results

**Performance Score:**
- 90-100: Excellent
- 50-89: Needs improvement
- 0-49: Poor

**Key Metrics to Watch:**
- **LCP** - Largest element render time
- **TBT** - Main thread blocking time
- **CLS** - Visual stability

**Common Issues:**
- High LCP → Optimize images, lazy load
- High TBT → Code split, reduce JavaScript
- High CLS → Set image dimensions, reserve space

### Optimization Strategies

See `docs/PERFORMANCE.md` for detailed optimization guide.

**Quick wins:**
1. Use Next.js Image component
2. Enable code splitting with `dynamic()`
3. Add `loading="lazy"` to below-fold images
4. Minimize third-party scripts
5. Use font-display: swap

## Resources

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Next.js Optimization](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Performance Guide](./PERFORMANCE.md)

## Support

For Lighthouse CI issues:
1. Check workflow logs in GitHub Actions
2. Run locally to reproduce: `npm run lighthouse`
3. Review generated reports in `.lighthouseci/`
4. Consult `docs/PERFORMANCE.md` for optimization help
