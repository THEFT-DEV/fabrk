/**
 * Lighthouse CI Configuration
 *
 * Tests key pages with strict performance budgets.
 * Run locally: npm run lighthouse
 * Runs automatically in CI on every push.
 */

module.exports = {
  ci: {
    collect: {
      // Start dev server before collecting
      startServerCommand: 'npm run build && npm start',
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 60000,

      // URLs to test
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/components',
        'http://localhost:3000/templates',
        'http://localhost:3000/features',
        'http://localhost:3000/docs',
      ],

      // Test configuration
      numberOfRuns: 3, // Run 3 times and take median
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
        },
      },
    },

    upload: {
      target: 'temporary-public-storage',
      // For production, use GitHub Actions upload:
      // target: 'filesystem',
      // outputDir: './lighthouse-reports',
    },

    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance budgets
        'categories:performance': ['error', { minScore: 0.90 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 0.90 }],

        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'interactive': ['error', { maxNumericValue: 3500 }],

        // Additional metrics
        'speed-index': ['warn', { maxNumericValue: 3000 }],
        'max-potential-fid': ['warn', { maxNumericValue: 130 }],

        // Resource budgets
        'resource-summary:script:size': ['warn', { maxNumericValue: 500000 }], // 500KB
        'resource-summary:stylesheet:size': ['warn', { maxNumericValue: 100000 }], // 100KB
        'resource-summary:image:size': ['warn', { maxNumericValue: 1000000 }], // 1MB
        'resource-summary:font:size': ['warn', { maxNumericValue: 200000 }], // 200KB

        // Best practices
        'uses-http2': 'off', // Not applicable for localhost
        'uses-text-compression': 'warn',
        'modern-image-formats': 'warn',
        'efficient-animated-content': 'warn',
        'unused-javascript': 'warn',
        'unused-css-rules': 'warn',
      },
    },
  },
};
