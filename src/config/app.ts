/* 💡 CONFIG TIP: This is your app's central configuration file.
 * Update app.name, pricing, and features to match your product.
 * All environment variables should be set in .env.local (see .env.example).
 * Feature flags in the 'features' section let you toggle functionality.
 */

/**
 * Central Configuration File
 * Single source of truth for all app settings
 *
 * INSTRUCTIONS:
 * 1. Copy this to your project root if needed
 * 2. Update all values to match your app
 * 3. Never commit real API keys to git
 *
 * IMPORTANT: Environment variables are now validated via src/lib/env.ts
 * Critical variables will fail loudly if missing in production
 */

// Import validated environment variables for type safety
// Note: Using dynamic import to avoid module system conflicts
let env;
try {
  // Only import env validation in Node.js environment (not during Next.js client bundling)
  if (typeof window === 'undefined') {
    env = require('../lib/env').env;
  }
} catch {
  // Fallback to process.env if env.ts hasn't been loaded yet
  env = { server: process.env, client: process.env };
}

const config = {
  // ============================================================================
  // APP INFORMATION
  // ============================================================================
  app: {
    name: 'Fabrk Boilerplate',
    description: 'Production-ready SaaS boilerplate with authentication, payments, and dashboard',
    url:
      env?.client?.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'http://localhost:3000',
    author:
      env?.client?.NEXT_PUBLIC_AUTHOR_NAME || process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Fabrk Team',
    supportEmail:
      env?.client?.NEXT_PUBLIC_SUPPORT_EMAIL ||
      process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
      'support@fabrk.dev',
  },

  // ============================================================================
  // AUTHENTICATION (NextAuth v5)
  // ============================================================================
  auth: {
    secret: env?.server?.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET,
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 days
    providers: {
      google: {
        enabled: !!(env?.server?.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID),
        clientId: env?.server?.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
        clientSecret: env?.server?.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET,
      },
      credentials: {
        enabled: true, // Email/password auth
      },
    },
  },

  // ============================================================================
  // STRIPE PAYMENT CONFIGURATION
  // CRITICAL: Price IDs must be set in production (no fallbacks)
  // ============================================================================
  stripe: {
    publishableKey:
      env?.client?.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: env?.server?.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY,
    webhookSecret: env?.server?.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET,

    // Stripe Lookup Keys (one-time purchase model)
    // Using lookup keys allows price updates in Stripe dashboard without code changes
    // OR use Price ID directly: price_1ABC123xyz...
    prices: {
      fabrk:
        env?.client?.NEXT_PUBLIC_STRIPE_PRICE_FABRK ||
        process.env.NEXT_PUBLIC_STRIPE_PRICE_FABRK ||
        '', // Set to Price ID from Stripe
    },

    // Promotion codes and coupons
    coupons: {
      // Phase 2: Limited coupon (after time-based launch discount expires)
      earlyAdopter: {
        enabled: true,
        code: 'EARLY500', // Display code for customers
        promotionCodeId:
          env?.server?.STRIPE_COUPON_EARLY_ADOPTER ||
          process.env.STRIPE_COUPON_EARLY_ADOPTER ||
          'promo_1SVGK4P7kSSEYWlXBq1LtaNM', // Stripe Promotion Code ID
        couponId:
          env?.server?.STRIPE_COUPON_EARLY_ADOPTER ||
          process.env.STRIPE_COUPON_EARLY_ADOPTER ||
          'early_adopter_100off',
        discountAmount: 100,
        originalPrice: 299,
        discountedPrice: 199, // After $100 off
        maxRedemptions: 500,
        description: '$100 off for first 500 early adopters',
        expiresAt: null, // No expiration (limited by count)
        active: true,
      },
    },

    // Product reference
    productId: 'prod_TSAZlUUKJKVYPv', // Fabrk product ID from Stripe
  },

  // ============================================================================
  // EMAIL CONFIGURATION (Resend)
  // ============================================================================
  email: {
    provider: 'resend', // or "sendgrid", "ses", etc.
    apiKey: env?.server?.RESEND_API_KEY || process.env.RESEND_API_KEY,
    from: {
      name: 'Fabrk Boilerplate',
      email: env?.server?.EMAIL_FROM || process.env.EMAIL_FROM || 'support@fabrk.dev',
    },
    replyTo: env?.server?.EMAIL_REPLY_TO || process.env.EMAIL_REPLY_TO || 'support@fabrk.dev',
  },

  // ============================================================================
  // DATABASE (Prisma)
  // CRITICAL: DATABASE_URL is required in production
  // ============================================================================
  database: {
    url: env?.server?.DATABASE_URL || process.env.DATABASE_URL,
    // For connection pooling (recommended for serverless)
    directUrl: env?.server?.DATABASE_URL_DIRECT || process.env.DATABASE_URL_DIRECT,
  },

  // ============================================================================
  // FEATURE FLAGS
  // ============================================================================
  features: {
    // Authentication features
    emailVerification: true,
    passwordReset: true,
    googleAuth: !!(env?.server?.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID),

    // Payment features
    subscriptions: true, // Enable subscriptions for trial period support
    oneTimePurchases: true, // $199 one-time payment for Fabrk boilerplate
    // Trial period feature - Enable free trial flow
    // When enabled, users can start a free trial with Stripe subscription mode
    // Trial ends after trialDays, then user must subscribe or lose access
    trialPeriod: true,
    trialDays: 14, // Number of days for free trial

    // Dashboard features
    analytics: false, // Enable when ready
    userManagement: true,
    teamFeatures: false, // Coming soon

    // Content features
    documentation: true,
    changelog: false,

    // Search features
    algoliaSearch: !!(
      (env?.client?.NEXT_PUBLIC_ALGOLIA_APP_ID || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) &&
      (env?.client?.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ||
        process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY)
    ),
    commandPalette: true, // ⌘K keyboard shortcut
  },

  // ============================================================================
  // SEARCH CONFIGURATION (Algolia)
  // ============================================================================
  search: {
    enabled: !!(
      (env?.client?.NEXT_PUBLIC_ALGOLIA_APP_ID || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) &&
      (env?.client?.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ||
        process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY)
    ),
    appId: env?.client?.NEXT_PUBLIC_ALGOLIA_APP_ID || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    searchApiKey:
      env?.client?.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ||
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
    adminApiKey: env?.server?.ALGOLIA_ADMIN_API_KEY || process.env.ALGOLIA_ADMIN_API_KEY, // Server-side only
    indices: {
      pages: 'pages',
      components: 'components',
      templates: 'templates',
      docs: 'docs',
    },
  },

  // ============================================================================
  // PRODUCT INFORMATION
  // ============================================================================
  product: {
    name: 'Fabrk - SaaS Boilerplate',
    description:
      'Launch your SaaS product in days, not months. Fabrk is a complete, production-ready Next.js 15 foundation built with 87 premium components, comprehensive testing (130+ tests), and full feature parity for modern SaaS applications.',
    shortDescription:
      'Premium SaaS boilerplate with 87 production-ready components, authentication, Stripe payments, and everything needed to launch immediately.',
    features: [
      'Authentication (NextAuth v5 with Google OAuth & email/password)',
      'Payment Processing (Stripe one-time & subscription billing)',
      'Dashboard & Multi-Tenancy (Organization management with RBAC)',
      'Database (PostgreSQL with Prisma ORM)',
      'Email System (Resend templates + queue system)',
      '12 Switchable OKLCH Themes',
      'Real-Time Features (Pusher notifications & activity feeds)',
      'Webhook System (22 event types with retry logic)',
      'Comprehensive Documentation (400KB+ guides)',
      'Full Test Suite (Vitest + Playwright E2E)',
      'Component Documentation (77 documented components)',
      'TypeScript-First Development',
      'TypeScript Strict Mode throughout',
      'WCAG 2.1 AA Accessibility compliance',
    ],
  },

  // ============================================================================
  // PRODUCT PRICING
  // ============================================================================
  pricing: {
    // Fabrk boilerplate pricing (one-time purchase)
    fabrk: {
      current: 199, // Launch price (first 100 buyers)
      original: 299, // Regular price after launch
      currency: 'USD',
      display: {
        current: '$199',
        original: '$299',
      },
      billingModel: 'one-time',
      launchDiscount: true,
      discountLabel: 'First 100 buyers',
    },
    // Competitor pricing (for comparison tables)
    competitors: {
      diy: {
        name: 'DIY',
        price: 0,
        display: '$0',
      },
      shipfast: {
        name: 'ShipFast',
        price: 199,
        display: '$199',
      },
      supastarter: {
        name: 'Supastarter',
        price: 349,
        display: '$349',
      },
    },
    // Example SaaS tier pricing (for customer's product demos)
    exampleTiers: {
      starter: {
        name: 'Starter',
        price: 29,
        display: '$29',
        period: '/month',
      },
      professional: {
        name: 'Professional',
        price: 99,
        display: '$99',
        period: '/month',
      },
      enterprise: {
        name: 'Enterprise',
        price: 299,
        display: '$299',
        period: '/month',
      },
    },
  },

  // ============================================================================
  // API CONFIGURATION
  // ============================================================================
  api: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Max requests per window
    },
    timeout: 30000, // 30 seconds
  },

  // ============================================================================
  // ANALYTICS (Optional)
  // ============================================================================
  analytics: {
    enabled: false,
    // Add your analytics provider keys here
    // google: process.env.NEXT_PUBLIC_GA_ID,
    // plausible: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  },

  // ============================================================================
  // MONITORING (Optional)
  // ============================================================================
  monitoring: {
    // sentry: {
    //   dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    //   enabled: process.env.NODE_ENV === 'production',
    // },
  },

  // ============================================================================
  // DEVELOPMENT SETTINGS
  // ============================================================================
  dev: {
    enableDebugLogs: process.env.NODE_ENV === 'development',
    mockStripe: false, // Set to true to test without real Stripe
    mockEmails: process.env.NODE_ENV === 'development', // Log emails instead of sending
  },
};

// Export as ES module default export
export default config;

// Named exports for compatibility
export const siteConfig = {
  name: config.app.name,
  description: config.app.description,
  url: config.app.url,
};
