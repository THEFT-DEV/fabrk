/**
 * ✅ FABRK COMPONENT
 * Library Documentation Hub
 * Central navigation for all library guides and documentation
 */
'use client';

import Link from 'next/link';
import {
  BookOpen,
  Rocket,
  Wrench,
  Palette,
  AlertCircle,
  Code,
  Database,
  Lock,
  Mail,
  CreditCard,
  BarChart3,
  Search,
} from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LibraryBreadcrumb } from '@/components/library';

interface DocGuide {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  timeToComplete?: string;
}

const guides: Record<string, DocGuide[]> = {
  'Getting Started': [
    {
      title: 'Getting Started',
      description: 'Quick start guide: copy templates, understand structure, first steps',
      href: '/library/docs/getting-started',
      icon: Rocket,
      badge: 'Start Here',
      timeToComplete: '10 min',
    },
  ],
  'Integration Guides': [
    {
      title: 'NextAuth Integration',
      description: 'Add authentication to templates with NextAuth v5 and session management',
      href: '/library/docs/integration/nextauth',
      icon: Lock,
      timeToComplete: '15 min',
    },
    {
      title: 'Prisma Integration',
      description: 'Connect templates to your database with Prisma ORM and migrations',
      href: '/library/docs/integration/prisma',
      icon: Database,
      timeToComplete: '20 min',
    },
    {
      title: 'Polar.sh Integration',
      description: 'Add payment processing and subscription management with Polar',
      href: '/library/docs/integration/polar',
      icon: CreditCard,
      timeToComplete: '15 min',
    },
    {
      title: 'Resend Integration',
      description: 'Send transactional emails from templates using Resend API',
      href: '/library/docs/integration/resend',
      icon: Mail,
      timeToComplete: '10 min',
    },
    {
      title: 'PostHog Integration',
      description: 'Add analytics and feature flags to track user behavior',
      href: '/library/docs/integration/posthog',
      icon: BarChart3,
      timeToComplete: '10 min',
    },
  ],
  Customization: [
    {
      title: 'Customization Guide',
      description: 'Modify design system, change colors, update components, add features',
      href: '/library/docs/customization',
      icon: Palette,
      timeToComplete: '20 min',
    },
  ],
  'Help & Support': [
    {
      title: 'Troubleshooting',
      description: 'Common issues, error messages, debugging tips, and solutions',
      href: '/library/docs/troubleshooting',
      icon: AlertCircle,
      timeToComplete: '5 min',
    },
  ],
};

const stats = {
  totalGuides: Object.values(guides).flat().length,
  totalReadTime: 105, // minutes
};

export default function LibraryDocsPage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8 px-6 py-8">
      {/* Breadcrumb Navigation */}
      <LibraryBreadcrumb
        items={[{ label: 'Library', href: '/library' }, { label: 'Documentation' }]}
      />

      {/* Hero Section */}
      <section className="space-y-4">
        <div
          className={cn(
            'inline-block border px-4 py-1',
            mode.color.bg.surface,
            mode.color.border.default,
            mode.radius
          )}
        >
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [DOCUMENTATION]: {stats.totalGuides} COMPREHENSIVE GUIDES
          </span>
        </div>

        <div className="space-y-4">
          <h1 className={cn(mode.font, 'text-4xl font-semibold tracking-tight')}>
            Library Documentation
          </h1>
          <p className={cn(mode.font, 'text-muted-foreground max-w-3xl text-sm')}>
            Everything you need to use, customize, and integrate library templates into your Next.js
            project. From quick starts to deep integrations.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary h-4 w-4" />
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
              {stats.totalGuides} Guides
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="text-primary h-4 w-4" />
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
              {stats.totalReadTime} min total reading time
            </span>
          </div>
        </div>
      </section>

      {/* Search Hint */}
      <Card>
        <CardContent padding="md">
          <div className="flex items-start gap-4">
            <Search className="text-primary mt-0.5 h-5 w-5" />
            <div className="space-y-1">
              <p className={cn(mode.font, 'text-sm font-medium')}>
                Looking for something specific?
              </p>
              <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
                Use Cmd+K (Mac) or Ctrl+K (Windows) to search all documentation. Try
                "authentication", "database", or "styling".
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guides by Category */}
      {Object.entries(guides).map(([category, categoryGuides]) => (
        <section key={category} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={cn(mode.font, 'text-sm font-semibold')}>{category}</h2>
              <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
                {categoryGuides.length} {categoryGuides.length === 1 ? 'guide' : 'guides'}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryGuides.map((guide) => (
              <Link key={guide.href} href={guide.href}>
                <Card className={cn('group border-border h-full transition-all', mode.state.hover.card)}>
                  {/* Card Header */}
                  <div className="border-border flex items-center justify-between border-b px-4 py-2">
                    <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                      [DOC]: {guide.title.toUpperCase().replace(/ /g, '_')}
                    </span>
                    <guide.icon className="text-primary h-4 w-4" />
                  </div>

                  {/* Card Content */}
                  <CardContent padding="md">
                    <div className="space-y-4">
                      {/* Badge */}
                      {guide.badge && (
                        <Badge className={cn(mode.radius, mode.font, 'text-xs')}>
                          {guide.badge}
                        </Badge>
                      )}

                      {/* Title */}
                      <h3
                        className={cn(
                          mode.font,
                          'group-hover:text-primary text-sm font-semibold transition-colors'
                        )}
                      >
                        {guide.title}
                      </h3>

                      {/* Description */}
                      <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
                        {guide.description}
                      </p>

                      {/* Meta */}
                      {guide.timeToComplete && (
                        <div className="border-border flex items-center justify-between border-t pt-3">
                          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                            Time to complete:
                          </span>
                          <span className={cn(mode.font, 'text-primary text-xs font-medium')}>
                            {guide.timeToComplete}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <Card>
        <CardContent padding="lg">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Wrench className="text-primary h-8 w-8" />
            <div className="space-y-2">
              <h3 className={cn(mode.font, 'text-sm font-semibold')}>Need More Help?</h3>
              <p className={cn(mode.font, 'text-muted-foreground max-w-md text-sm')}>
                Can't find what you're looking for? Check the troubleshooting guide or visit the
                components documentation for detailed API references.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/library/docs/troubleshooting"
                className={cn(
                  mode.font,
                  mode.radius,
                  'bg-primary text-primary-foreground hover:bg-primary/90 border-primary inline-flex items-center gap-2 border px-4 py-2 text-xs transition-colors'
                )}
              >
                <AlertCircle className="h-4 w-4" />
                &gt; TROUBLESHOOTING
              </Link>
              <Link
                href="/docs"
                className={cn(
                  mode.font,
                  mode.radius,
                  'border-border bg-card inline-flex items-center gap-2 border px-4 py-2 text-xs transition-colors',
                  mode.state.hover.card
                )}
              >
                <Code className="h-4 w-4" />
                &gt; COMPONENTS API
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
