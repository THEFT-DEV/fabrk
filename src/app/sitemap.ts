import { MetadataRoute } from 'next';

/**
 * Sitemap Generation
 * Static sitemap for production reliability
 * Note: Filesystem scanning doesn't work on Vercel serverless
 */

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

// Marketing pages
const MARKETING_ROUTES = [
  '/',
  '/pricing',
  '/features',
  '/about',
  '/contact',
  '/blog',
  '/changelog',
  '/roadmap',
];

// Legal pages
const LEGAL_ROUTES = ['/terms', '/privacy', '/refund', '/cookies'];

// Auth pages (public but low priority)
const AUTH_ROUTES = ['/login', '/register'];

// Documentation sections
const DOCS_ROUTES = [
  '/docs',
  '/docs/getting-started',
  '/docs/architecture',
  '/docs/customization-checklist',
  // Components
  '/docs/components/accordion',
  '/docs/components/alert',
  '/docs/components/alert-dialog',
  '/docs/components/api-key-manager',
  '/docs/components/area-chart',
  '/docs/components/audit-log',
  '/docs/components/avatar',
  '/docs/components/badge',
  '/docs/components/balance-display',
  '/docs/components/bar-chart',
  '/docs/components/billing-summary-card',
  '/docs/components/breadcrumb',
  '/docs/components/button',
  '/docs/components/calendar',
  '/docs/components/card',
  '/docs/components/checkbox',
  '/docs/components/code-block',
  '/docs/components/command',
  '/docs/components/container',
  '/docs/components/cookie-consent',
  '/docs/components/credit-transaction-table',
  '/docs/components/credit-usage-chart',
  '/docs/components/data-table-header',
  '/docs/components/date-picker',
  '/docs/components/dialog',
  '/docs/components/donut-chart',
  '/docs/components/dropdown-menu',
  '/docs/components/empty-state',
  '/docs/components/faq',
  '/docs/components/features',
  '/docs/components/footer',
  '/docs/components/form',
  '/docs/components/form-error',
  '/docs/components/funnel-chart',
  '/docs/components/gauge',
  '/docs/components/input',
  '/docs/components/input-group',
  '/docs/components/input-number',
  '/docs/components/input-otp',
  '/docs/components/input-search',
  '/docs/components/label',
  '/docs/components/line-chart',
  '/docs/components/loading',
  '/docs/components/navigation',
  '/docs/components/notification-badge',
  '/docs/components/pagination',
  '/docs/components/pie-chart',
  '/docs/components/plan-selector',
  '/docs/components/popover',
  '/docs/components/progress',
  '/docs/components/radio-group',
  '/docs/components/select',
  '/docs/components/separator',
  '/docs/components/sidebar',
  '/docs/components/simple-icon',
  '/docs/components/skeleton',
  '/docs/components/slider',
  '/docs/components/sparkline',
  '/docs/components/stat-card',
  '/docs/components/switch',
  '/docs/components/table',
  '/docs/components/tabs',
  '/docs/components/terminal-spinner',
  '/docs/components/testimonials',
  '/docs/components/textarea',
  '/docs/components/toast',
  '/docs/components/toaster',
  '/docs/components/tooltip',
  '/docs/components/usage-meter',
  // Features
  '/docs/features/ai-integration',
  '/docs/features/analytics',
  '/docs/features/authentication',
  '/docs/features/background-jobs',
  '/docs/features/blog',
  '/docs/features/cookie-consent',
  '/docs/features/credits',
  '/docs/features/database',
  '/docs/features/email',
  '/docs/features/file-storage',
  '/docs/features/multi-tenancy',
  '/docs/features/notifications',
  '/docs/features/payments',
  '/docs/features/realtime',
  '/docs/features/webhooks',
  // Security
  '/docs/security/overview',
  '/docs/security/authentication',
  '/docs/security/api-keys',
  '/docs/security/rate-limiting',
  // Tutorials
  '/docs/tutorials/custom-theme',
  '/docs/tutorials/adding-pages',
  '/docs/tutorials/api-routes',
  // Deployment
  '/docs/deployment/vercel',
  '/docs/deployment/docker',
  '/docs/deployment/self-hosted',
  // Design
  '/docs/design/colors',
  '/docs/design/typography',
  '/docs/design/spacing',
  '/docs/design/themes',
];

// Library template pages
const LIBRARY_ROUTES = [
  '/library',
  '/library/dashboards',
  '/library/admin-panels',
  '/library/authentication',
  '/library/authentication/sign-in',
  '/library/authentication/sign-up',
  '/library/authentication/forgot-password',
  '/library/authentication/two-factor',
  '/library/billing-dashboard',
  '/library/analytics-dashboard',
  '/library/user-management',
  '/library/team-dashboard',
  '/library/profile',
  '/library/settings-page',
  '/library/notifications',
  '/library/onboarding',
  '/library/empty-states',
  '/library/error-pages',
  '/library/marketing',
  '/library/landing-variations',
  '/library/pricing-page',
  '/library/blog',
  '/library/blog/post',
  '/library/documentation',
  '/library/style-guide',
  '/library/modals',
  '/library/email-templates',
  '/library/chart-library',
  '/library/ai-forms',
  '/library/account-pages',
  '/library/search-results',
  '/library/security-privacy',
];

/**
 * Determine priority based on route type
 */
function getPriority(route: string): number {
  if (route === '/') return 1.0;
  if (route === '/pricing' || route === '/features') return 0.9;
  if (route === '/docs' || route === '/library' || route === '/blog') return 0.85;
  if (route === '/changelog' || route === '/roadmap') return 0.8;
  if (route === '/about' || route === '/contact') return 0.7;
  if (route.startsWith('/docs/components/')) return 0.7;
  if (route.startsWith('/docs/features/')) return 0.7;
  if (route.startsWith('/docs/')) return 0.6;
  if (route.startsWith('/library/')) return 0.6;
  if (route.startsWith('/blog/')) return 0.7;
  if (LEGAL_ROUTES.includes(route)) return 0.3;
  if (AUTH_ROUTES.includes(route)) return 0.4;
  return 0.5;
}

/**
 * Determine change frequency based on route type
 */
function getChangeFreq(
  route: string
): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  if (route === '/') return 'daily';
  if (route === '/blog' || route.startsWith('/blog/')) return 'daily';
  if (route === '/changelog') return 'weekly';
  if (route === '/pricing' || route === '/features') return 'weekly';
  if (route.startsWith('/docs/') || route.startsWith('/library/')) return 'weekly';
  if (LEGAL_ROUTES.includes(route)) return 'yearly';
  return 'monthly';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Combine all routes
  const allRoutes = [
    ...MARKETING_ROUTES,
    ...LEGAL_ROUTES,
    ...AUTH_ROUTES,
    ...DOCS_ROUTES,
    ...LIBRARY_ROUTES,
  ];

  // Generate sitemap entries
  const sitemapEntries = allRoutes.map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`,
    lastModified: currentDate,
    changeFrequency: getChangeFreq(route),
    priority: getPriority(route),
  }));

  // Sort by priority (highest first)
  return sitemapEntries.sort((a, b) => b.priority - a.priority);
}
