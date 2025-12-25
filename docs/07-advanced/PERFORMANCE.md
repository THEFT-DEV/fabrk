# Performance Guidelines

This document outlines performance best practices and monitoring for Fabrk Boilerplate.

## Performance Budgets

We maintain strict performance budgets enforced by Lighthouse CI:

### Core Web Vitals

| Metric | Budget | Description |
|--------|--------|-------------|
| **First Contentful Paint (FCP)** | < 2s | Time to first text/image render |
| **Largest Contentful Paint (LCP)** | < 2.5s | Time to largest content render |
| **Total Blocking Time (TBT)** | < 300ms | Time when main thread is blocked |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Visual stability score |
| **Time to Interactive (TTI)** | < 3.5s | Time until page is fully interactive |

### Lighthouse Scores

| Category | Minimum Score |
|----------|--------------|
| Performance | 78/78 |
| Accessibility | 78/78 |
| Best Practices | 78/78 |
| SEO | 78/78 |

### Resource Budgets

| Resource Type | Maximum Size |
|---------------|-------------|
| JavaScript | 500KB |
| CSS | 100KB |
| Images | 1MB |
| Fonts | 200KB |

## Running Performance Audits

### Local Testing

```bash
# Run full Lighthouse audit
npm run lighthouse

# View generated reports
open .lighthouseci/lhr-*.html
```

### CI/CD Integration

Lighthouse CI runs automatically on:
- Every push to `main` or `dev` branches
- Every pull request

Reports are uploaded as GitHub Actions artifacts and scores are commented on PRs.

## Optimization Techniques

### 1. Code Splitting

Next.js automatically code-splits by route. Use dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // Disable SSR if not needed
});
```

### 2. Image Optimization

Always use Next.js Image component with explicit dimensions:

```typescript
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur" // Show blur placeholder
  blurDataURL="data:image/..." // Base64 placeholder
/>
```

### 3. Font Optimization

Use `next/font` for automatic font optimization:

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT
  preload: true,
});
```

### 4. Bundle Size Monitoring

Check bundle size before committing:

```bash
npm run build

# Analyze bundle (install first: npm i -D @next/bundle-analyzer)
ANALYZE=true npm run build
```

### 5. Database Query Optimization

Minimize database queries with Prisma:

```typescript
// ❌ BAD - N+1 queries
const users = await prisma.user.findMany();
for (const user of users) {
  const payments = await prisma.payment.findMany({ where: { userId: user.id } });
}

// ✅ GOOD - Single query with include
const users = await prisma.user.findMany({
  include: { payments: true },
});
```

### 6. API Route Caching

Cache expensive computations:

```typescript
import { unstable_cache } from 'next/cache';

export const getExpensiveData = unstable_cache(
  async () => {
    // Expensive operation
    return data;
  },
  ['cache-key'],
  { revalidate: 3600 } // 1 hour
);
```

### 7. Static Generation

Use static generation when possible:

```typescript
// Generate static pages at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

## Monitoring in Production

### Real User Monitoring (RUM)

Consider integrating:
- **Vercel Analytics** (built-in for Vercel deployments)
- **Google Analytics 4** with Web Vitals reporting
- **Sentry Performance Monitoring**

### Setup Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Web Vitals Reporting

```typescript
// app/layout.tsx
import { sendGTMEvent } from '@next/third-parties/google';

export function reportWebVitals(metric) {
  sendGTMEvent({
    event: 'web-vitals',
    event_category: 'Web Vitals',
    event_label: metric.name,
    value: Math.round(metric.value),
    non_interaction: true,
  });
}
```

## Performance Checklist

Before deploying new features:

- [ ] Bundle size increase is < 50KB
- [ ] No new render-blocking resources
- [ ] Images use Next.js Image component
- [ ] Heavy components use dynamic imports
- [ ] Database queries are optimized (no N+1)
- [ ] API routes cache expensive operations
- [ ] Lighthouse scores pass CI thresholds
- [ ] No layout shift issues (CLS < 0.1)
- [ ] No long tasks blocking main thread (TBT < 300ms)

## Common Performance Issues

### Issue: Large JavaScript Bundle

**Symptoms:** High TBT, slow TTI
**Solutions:**
- Use dynamic imports for heavy libraries
- Enable tree shaking (automatic in Next.js)
- Remove unused dependencies
- Use lightweight alternatives (e.g., date-fns instead of moment)

### Issue: Slow Initial Load

**Symptoms:** High FCP, high LCP
**Solutions:**
- Use static generation instead of SSR
- Optimize images (WebP, correct sizing)
- Preload critical resources
- Use CDN for static assets

### Issue: Layout Shift

**Symptoms:** High CLS
**Solutions:**
- Set explicit width/height on images
- Reserve space for dynamic content
- Avoid inserting content above existing content
- Use CSS aspect-ratio for responsive media

### Issue: Slow API Routes

**Symptoms:** High TTI, poor user experience
**Solutions:**
- Add caching with `unstable_cache`
- Use database query optimization
- Implement request deduplication
- Use streaming responses for large data

## Resources

- [Next.js Performance Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

## Support

For performance issues or questions:
- Check Lighthouse reports in `.lighthouseci/`
- Review CI logs in GitHub Actions
- Use Chrome DevTools Performance tab for profiling
- Consult Next.js optimization docs
