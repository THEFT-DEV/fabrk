import { MetadataRoute } from 'next';

/**
 * Sitemap Generation
 * Generates XML sitemap for SEO and search engine crawlers
 * Automatically includes all static pages, docs, and library templates
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://fabrk.dev';
  const currentDate = new Date();

  // Main marketing pages (highest priority)
  const marketingPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Documentation pages
  const docsPages = [
    // Getting Started
    '/docs/getting-started',
    '/docs/getting-started/project-structure',
    '/docs/getting-started/environment-variables',
    '/docs/getting-started/database-setup',
    '/docs/getting-started/email-setup',
    '/docs/getting-started/deployment',

    // Features
    '/docs/features/authentication',
    '/docs/features/database',
    '/docs/features/payments',
    '/docs/features/google-oauth',
    '/docs/features/emails',
    '/docs/features/i18n',
    '/docs/features/analytics',
    '/docs/features/monitoring',

    // Security
    '/docs/security/overview',
    '/docs/security/authentication',
    '/docs/security/rate-limiting',
    '/docs/security/secrets-management',
    '/docs/security/csrf-protection',
    '/docs/security/cors',

    // Components
    '/docs/components/overview',
    '/docs/components/button',
    '/docs/components/card',
    '/docs/components/input',
    '/docs/components/select',
    '/docs/components/textarea',
    '/docs/components/checkbox',
    '/docs/components/radio',
    '/docs/components/switch',
    '/docs/components/slider',
    '/docs/components/tabs',
    '/docs/components/accordion',
    '/docs/components/alert',
    '/docs/components/badge',
    '/docs/components/dialog',
    '/docs/components/drawer',
    '/docs/components/dropdown',
    '/docs/components/popover',
    '/docs/components/tooltip',
    '/docs/components/navigation',
    '/docs/components/breadcrumb',
    '/docs/components/pagination',
    '/docs/components/table',
    '/docs/components/form',
    '/docs/components/calendar',
    '/docs/components/date-picker',
    '/docs/components/command',
    '/docs/components/context-menu',
    '/docs/components/toast',
    '/docs/components/sheet',
    '/docs/components/skeleton',
    '/docs/components/progress',
    '/docs/components/avatar',
    '/docs/components/separator',
    '/docs/components/scrollarea',
    '/docs/components/label',
    '/docs/components/code-block',

    // Design System
    '/docs/design/overview',
    '/docs/design/colors',
    '/docs/design/typography',
    '/docs/design/spacing',
    '/docs/design/responsive',
    '/docs/design/themes',
    '/docs/design/icons',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Template library pages
  const libraryPages = [
    '/library/landing-pages',
    '/library/pricing-pages',
    '/library/dashboard-layouts',
    '/library/auth-pages',
    '/library/error-pages',
    '/library/marketing-sections',
    '/library/forms',
    '/library/tables',
    '/library/charts',
    '/library/cards',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Auth and legal pages (lower priority)
  const authAndLegalPages = [
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  return [...marketingPages, ...docsPages, ...libraryPages, ...authAndLegalPages];
}
