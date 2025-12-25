/**
 * LibraryGuideTemplate - Template for library documentation guide pages
 * Used by: /library/docs/* (getting started, integrations, customization, troubleshooting)
 * Maintains library navigation pattern with LibraryBreadcrumb
 *
 * Supports two patterns:
 * 1. Tutorial-style: learningObjectives, prerequisites, steps, nextSteps (cards)
 * 2. Integration-style: overview, steps, troubleshooting, relatedLinks (simple)
 */

import { LucideIcon, AlertTriangle } from 'lucide-react';
import { LibraryBreadcrumb, type BreadcrumbItem } from './library-breadcrumb';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface GuideStep {
  code: string;
  title: string;
  content: React.ReactNode;
}

interface NextStepLink {
  title: string;
  description: string;
  href: string;
}

interface SimpleLink {
  label: string;
  href: string;
  description?: string;
}

interface QuickLinkGroup {
  title: string;
  links: SimpleLink[];
}

interface TroubleshootingItem {
  error: string;
  solution: string;
}

interface LibraryGuideTemplateProps {
  /** Breadcrumb items (excluding Library which is auto-added) */
  breadcrumbs: BreadcrumbItem[];
  /** Header icon component */
  icon: LucideIcon;
  /** Badge prefix - "GUIDE" or "INTEGRATION" */
  badgePrefix?: 'GUIDE' | 'INTEGRATION';
  /** Page badge text e.g. "GETTING_STARTED" or "PRISMA_ORM" */
  badge: string;
  /** Page title */
  title: string;
  /** Page description */
  description: string;
  /** Optional meta info (time, level) */
  meta?: {
    time?: string;
    level?: string;
  };
  /** Overview section (for integration-style pages) */
  overview?: {
    text: string;
    highlights?: string[];
  };
  /** What you'll learn items (for tutorial-style pages) */
  learningObjectives?: string[];
  /** Prerequisites (for tutorial-style pages) */
  prerequisites?: { title: string; description: string }[];
  /** Guide steps/sections */
  steps?: GuideStep[];
  /** Troubleshooting items (for integration-style pages) */
  troubleshooting?: TroubleshootingItem[];
  /** Next steps with link cards (for tutorial-style pages) */
  nextSteps?: NextStepLink[];
  /** Related links (simpler format for integration-style pages) */
  relatedLinks?: SimpleLink[];
  /** Quick reference links */
  quickReference?: QuickLinkGroup[];
  /** Additional content via children */
  children?: React.ReactNode;
}

export function LibraryGuideTemplate({
  breadcrumbs,
  icon: Icon,
  badgePrefix = 'GUIDE',
  badge,
  title,
  description,
  meta,
  overview,
  learningObjectives,
  prerequisites,
  steps,
  troubleshooting,
  nextSteps,
  relatedLinks,
  quickReference,
  children,
}: LibraryGuideTemplateProps) {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      {/* Breadcrumb Navigation */}
      <LibraryBreadcrumb items={[{ label: 'Library', href: '/library' }, ...breadcrumbs]} />

      {/* Header */}
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
            [{badgePrefix}]: {badge}
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className={cn('bg-primary/10 p-4', mode.radius)}>
            <Icon className="text-primary h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className={cn(mode.font, 'text-3xl font-semibold tracking-tight')}>{title}</h1>
            <p className={cn(mode.font, 'text-muted-foreground text-sm')}>{description}</p>
          </div>
        </div>

        {/* Meta Info */}
        {meta && (meta.time || meta.level) && (
          <div className="border-border border-l-primary flex items-center gap-6 border-l-2 pl-4">
            {meta.time && (
              <div>
                <span className={cn(mode.font, 'text-muted-foreground text-xs')}>Time: </span>
                <span className={cn(mode.font, 'text-primary text-xs font-medium')}>
                  {meta.time}
                </span>
              </div>
            )}
            {meta.level && (
              <div>
                <span className={cn(mode.font, 'text-muted-foreground text-xs')}>Level: </span>
                <span className={cn(mode.font, 'text-primary text-xs font-medium')}>
                  {meta.level}
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Learning Objectives */}
      {learningObjectives && learningObjectives.length > 0 && (
        <Card>
          <CardHeader code="0x00" title="WHAT YOU'LL LEARN" />
          <CardContent padding="md">
            <ul className={cn(mode.font, 'space-y-2 text-xs')}>
              {learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-success mt-0.5 flex-shrink-0">✓</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Prerequisites */}
      {prerequisites && prerequisites.length > 0 && (
        <Card>
          <CardHeader code="0x01" title="PREREQUISITES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-4 text-xs')}>
              <p className="text-muted-foreground">
                Before starting, ensure you have the following set up:
              </p>
              <div className="space-y-4">
                {prerequisites.map((prereq, index) => (
                  <div key={index} className="border-border border-l-primary border-l-2 pl-4">
                    <p className="font-medium">✓ {prereq.title}</p>
                    <p className="text-muted-foreground">{prereq.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview (for integration-style pages) */}
      {overview && (
        <Card>
          <CardHeader code="0x00" title="OVERVIEW" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-4 text-xs')}>
              <p>{overview.text}</p>
              {overview.highlights && overview.highlights.length > 0 && (
                <div className="bg-muted/30 border-border border p-4">
                  <p className="text-primary mb-2 font-medium">[WHAT YOU'LL INTEGRATE]:</p>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                    {overview.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Steps */}
      {steps &&
        steps.map((step, index) => (
          <Card key={index}>
            <CardHeader code={step.code} title={step.title} />
            <CardContent padding="md">
              <div className={cn(mode.font, 'space-y-4 text-xs')}>{step.content}</div>
            </CardContent>
          </Card>
        ))}

      {/* Troubleshooting (for integration-style pages) */}
      {troubleshooting && troubleshooting.length > 0 && (
        <Card>
          <CardHeader
            code={`0x${String((steps?.length || 0) + 1).padStart(2, '0')}`}
            title="TROUBLESHOOTING"
          />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-4 text-xs')}>
              {troubleshooting.map((item, index) => (
                <div key={index} className="border-border border p-4">
                  <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                    <AlertTriangle className="h-4 w-4" />
                    {item.error}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Fix:</span> {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Links (simpler format for integration-style pages) */}
      {relatedLinks && relatedLinks.length > 0 && (
        <Card>
          <CardHeader
            code={`0x${String((steps?.length || 0) + (troubleshooting ? 2 : 1)).padStart(2, '0')}`}
            title="NEXT STEPS"
          />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-4 text-xs')}>
              <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
                {relatedLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-primary hover:underline">
                      {link.label}
                    </Link>
                    {link.description && ` ${link.description}`}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Children (additional custom content) */}
      {children}

      {/* Next Steps */}
      {nextSteps && nextSteps.length > 0 && (
        <Card>
          <CardHeader code={`0x${(steps?.length || 0) + 2}`.padStart(4, '0')} title="NEXT STEPS" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-4 text-xs')}>
              <p className="font-medium">You've successfully completed this guide! Now:</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {nextSteps.map((step, index) => (
                  <Link
                    key={index}
                    href={step.href}
                    className={cn('border-border group border p-4 transition-colors', mode.state.hover.card)}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-primary font-medium">{step.title}</span>
                      <ArrowRight className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Reference */}
      {quickReference && quickReference.length > 0 && (
        <Card>
          <CardHeader
            code={`0x${(steps?.length || 0) + (nextSteps ? 3 : 2)}`.padStart(4, '0')}
            title="QUICK REFERENCE"
          />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-4 text-xs')}>
              <div
                className={cn(
                  'border-border border-l-primary grid gap-4 border-l-2 pl-4',
                  quickReference.length > 1 ? 'sm:grid-cols-2' : ''
                )}
              >
                {quickReference.map((group, index) => (
                  <div key={index}>
                    <p className="font-medium">{group.title}</p>
                    <ul className="text-muted-foreground mt-2 space-y-1">
                      {group.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link href={link.href} className="hover:text-primary">
                            → {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Re-export helper components for custom step content
export { CodeBlock };
