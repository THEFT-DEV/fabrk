/**
 * DocsNav - Terminal console style navigation with breadcrumbs
 * Similar to TemplatesNav but for documentation
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeDropdown } from '@/components/theme/theme-dropdown';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Convert to TERMINAL CASE (with spaces)
function toDisplayCase(str: string): string {
  return str.toUpperCase();
}

// Navigation structure for breadcrumb lookup
const docsNavigation = [
  {
    id: 'start',
    title: 'Start',
    href: '/docs',
    items: [
      { title: 'Quick Start', href: '/docs/tutorials/quick-start' },
      { title: 'Getting Started', href: '/docs/getting-started' },
      { title: 'Architecture', href: '/docs/architecture' },
    ],
  },
  {
    id: 'setup',
    title: 'Setup',
    href: '/docs/deployment/environment',
    items: [
      { title: 'Environment Variables', href: '/docs/deployment/environment' },
      { title: 'Database Setup', href: '/docs/deployment/database' },
      { title: 'Database Prisma', href: '/docs/features/database' },
    ],
  },
  {
    id: 'authentication',
    title: 'Authentication',
    href: '/docs/tutorials/authentication',
    items: [
      { title: 'Auth Overview', href: '/docs/tutorials/authentication' },
      { title: 'Google OAuth', href: '/docs/features/google-oauth' },
      { title: 'Magic Links', href: '/docs/features/magic-links' },
      { title: 'MFA', href: '/docs/features/mfa' },
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    href: '/docs/features/payments',
    items: [
      { title: 'Stripe Setup', href: '/docs/features/payments' },
      { title: 'Lemon Squeezy', href: '/docs/features/lemonsqueezy' },
      { title: 'Free Trials', href: '/docs/features/trial' },
      { title: 'Subscription Guide', href: '/docs/tutorials/stripe-payments' },
    ],
  },
  {
    id: 'emails',
    title: 'Emails',
    href: '/docs/features/emails',
    items: [
      { title: 'Resend Setup', href: '/docs/features/emails' },
      { title: 'Email Templates', href: '/docs/tutorials/email-templates' },
      { title: 'Notifications', href: '/docs/features/notifications' },
    ],
  },
  {
    id: 'core-features',
    title: 'Core Features',
    href: '/docs/tutorials/api-routes',
    items: [
      { title: 'API Routes', href: '/docs/tutorials/api-routes' },
      { title: 'Protected Pages', href: '/docs/tutorials/protected-pages' },
      { title: 'AI Credits', href: '/docs/features/ai-credits' },
      { title: 'Cloud Storage', href: '/docs/features/cloud-storage' },
      { title: 'File Uploads', href: '/docs/tutorials/file-uploads' },
      { title: 'Webhooks Setup', href: '/docs/tutorials/webhooks' },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    href: '/docs/components/overview',
    items: [
      { title: 'Overview', href: '/docs/components/overview' },
      { title: 'Navigation', href: '/docs/components/navigation' },
      { title: 'Hero', href: '/docs/components/hero' },
      { title: 'Features', href: '/docs/components/features' },
      { title: 'Pricing', href: '/docs/components/pricing' },
      { title: 'Testimonials', href: '/docs/components/testimonials' },
      { title: 'FAQ', href: '/docs/components/faq' },
      { title: 'Footer', href: '/docs/components/footer' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    href: '/docs/features/cookie-consent',
    items: [
      { title: 'Cookie Consent', href: '/docs/features/cookie-consent' },
      { title: 'Rate Limiting', href: '/docs/security/rate-limiting' },
      { title: 'CSRF Protection', href: '/docs/security/csrf' },
      { title: 'Security Headers', href: '/docs/security/headers' },
      { title: 'Validation', href: '/docs/security/validation' },
      { title: 'Bot Protection', href: '/docs/security/bot-protection' },
      { title: 'Audit Logging', href: '/docs/security/audit-logging' },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    href: '/docs/features/organizations',
    items: [
      { title: 'Organizations', href: '/docs/features/organizations' },
      { title: 'User Impersonation', href: '/docs/features/impersonation' },
      { title: 'Blog System', href: '/docs/features/blog' },
      { title: 'i18n', href: '/docs/features/i18n' },
      { title: 'Realtime', href: '/docs/features/realtime' },
      { title: 'Background Jobs', href: '/docs/features/background-jobs' },
      { title: 'Analytics', href: '/docs/features/analytics' },
      { title: 'SEO', href: '/docs/features/seo' },
      { title: 'API Keys', href: '/docs/features/api-keys' },
      { title: 'Feature Flags', href: '/docs/features/feature-flags' },
      { title: 'Webhooks', href: '/docs/features/webhooks' },
      { title: 'Theming', href: '/docs/extras/theming' },
    ],
  },
  {
    id: 'deploy',
    title: 'Deploy',
    href: '/docs/extras/testing',
    items: [
      { title: 'Testing', href: '/docs/extras/testing' },
      { title: 'Vercel', href: '/docs/deployment/vercel' },
      { title: 'Launch Checklist', href: '/docs/launch/checklist' },
    ],
  },
];

// Find current page info from pathname
function findPageByHref(pathname: string): {
  section: (typeof docsNavigation)[0] | null;
  page: { title: string; href: string } | null;
} {
  for (const section of docsNavigation) {
    for (const item of section.items) {
      if (pathname === item.href) {
        return { section, page: item };
      }
    }
  }

  // Check for component subpages (e.g., /docs/components/button)
  if (pathname.startsWith('/docs/components/')) {
    const componentsSection = docsNavigation.find((s) => s.id === 'components');
    const pageName = pathname.split('/').pop() || '';
    return {
      section: componentsSection || null,
      page: {
        title: pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' '),
        href: pathname,
      },
    };
  }

  return { section: null, page: null };
}

export function DocsNav() {
  const pathname = usePathname();
  const { section, page } = findPageByHref(pathname);
  const isRoot = pathname === '/docs';

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full border-b backdrop-blur',
        mode.color.border.default,
        'bg-background/95 supports-[backdrop-filter]:bg-background/60'
      )}
    >
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo/Home Link - Terminal Style */}
        <Link
          href="/"
          className={cn('flex items-center gap-2 font-mono transition-opacity', mode.state.hover.linkOpacity)}
        >
          <span className={cn('text-xs', mode.color.text.accent)}>&gt;</span>
          <span className="text-sm font-semibold tracking-tight">FABRK</span>
          <span className={cn('hidden text-xs sm:inline', mode.color.text.muted)}>DOCS</span>
        </Link>

        {/* Breadcrumbs - Center */}
        <div className="flex flex-1 justify-center">
          <Breadcrumb>
            <BreadcrumbList className="font-mono text-xs">
              {/* Root docs level */}
              {isRoot && (
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground">DOCS</BreadcrumbPage>
                </BreadcrumbItem>
              )}

              {/* Section + Page level */}
              {!isRoot && section && page && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href="/docs"
                        className={cn('text-muted-foreground hover:text-foreground')}
                      >
                        DOCS
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href={section.href}
                        className={cn('text-muted-foreground hover:text-foreground')}
                      >
                        {toDisplayCase(section.title)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-foreground">
                      {toDisplayCase(page.title)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}

              {/* Fallback if no section found but not root */}
              {!isRoot && !section && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href="/docs"
                        className={cn('text-muted-foreground hover:text-foreground')}
                      >
                        DOCS
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-foreground">
                      {toDisplayCase(pathname.split('/').pop() || '')}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right Side: Theme + Home Button */}
        <div className="flex items-center gap-2">
          <ThemeDropdown />
          <Button asChild className={cn(mode.radius, 'font-mono text-xs')}>
            <Link href="/">&gt; HOME</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
