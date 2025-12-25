/**
 * GettingStartedTemplate - Template for onboarding and introduction pages
 * Used by: /docs/getting-started/*, /docs/introduction/*
 */

import { LucideIcon } from 'lucide-react';
import { DocsHeader } from '../blocks/docs-header';
import { DocsSection } from '../blocks/docs-section';
import { DocsCard } from '../blocks/docs-card';
import { DocsStepList } from '../blocks/docs-step-list';
import { DocsFeatureList } from '../blocks/docs-feature-list';
import { DocsCallout } from '../blocks/docs-callout';
import { DocsNavFooter } from '../blocks/docs-nav-footer';
import { docsTypography } from '../typography';
import { docsSpacing } from '../spacing';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface QuickStartStep {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  tip?: string;
}

interface Requirement {
  name: string;
  version?: string;
  description?: string;
  link?: string;
}

interface QuickLink {
  title: string;
  href: string;
  description: string;
  icon?: LucideIcon;
}

interface NavLink {
  title: string;
  href: string;
}

interface GettingStartedTemplateProps {
  /** Terminal code badge e.g. "[0x00]" */
  code: string;
  /** Category e.g. "Getting Started" */
  category?: string;
  /** Page title */
  title: string;
  /** Page description */
  description: string;
  /** Introduction text */
  introduction?: string;
  /** Key features/highlights */
  features?: Feature[];
  /** System requirements */
  requirements?: Requirement[];
  /** Quick start steps */
  quickStart?: QuickStartStep[];
  /** Quick links to other docs */
  quickLinks?: QuickLink[];
  /** Info callout (optional) */
  info?: string;
  /** Warning callout (optional) */
  warning?: string;
  /** Previous page link */
  previous?: NavLink;
  /** Next page link */
  next?: NavLink;
  /** Additional sections */
  children?: React.ReactNode;
}

export function GettingStartedTemplate({
  code,
  category = 'Getting Started',
  title,
  description,
  introduction,
  features,
  requirements,
  quickStart,
  quickLinks,
  info,
  warning,
  previous,
  next,
  children,
}: GettingStartedTemplateProps) {
  return (
    <div className={docsSpacing.pageSections}>
      {/* Header */}
      <DocsHeader code={code} category={category} title={title} description={description} />

      {/* Warning (if any) */}
      {warning && (
        <DocsCallout variant="warning" title="Warning">
          {warning}
        </DocsCallout>
      )}

      {/* Info (if any) */}
      {info && (
        <DocsCallout variant="info" title="Note">
          {info}
        </DocsCallout>
      )}

      {/* Introduction */}
      {introduction && (
        <DocsSection title="Introduction">
          <DocsCard code={code} title="STATUS">
            <p className={docsTypography.body}>{introduction}</p>
          </DocsCard>
        </DocsSection>
      )}

      {/* Features Grid */}
      {features && features.length > 0 && (
        <DocsSection title="Key Features">
          <DocsFeatureList features={features} />
        </DocsSection>
      )}

      {/* Requirements */}
      {requirements && requirements.length > 0 && (
        <DocsSection title="Requirements">
          <DocsCard title="REQUIREMENTS">
            <ul className="space-y-4">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="border-border bg-muted flex h-6 w-6 shrink-0 items-center justify-center border font-mono text-xs">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      {req.link ? (
                        <a
                          href={req.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-mono text-sm hover:underline"
                        >
                          {req.name}
                        </a>
                      ) : (
                        <span className="font-mono text-sm">{req.name}</span>
                      )}
                      {req.version && <code className={docsTypography.code}>{req.version}</code>}
                    </div>
                    {req.description && (
                      <p className={`mt-1 ${docsTypography.caption}`}>{req.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </DocsCard>
        </DocsSection>
      )}

      {/* Quick Start */}
      {quickStart && quickStart.length > 0 && (
        <DocsSection title="Quick Start">
          <DocsStepList steps={quickStart} variant="card" />
        </DocsSection>
      )}

      {/* Quick Links */}
      {quickLinks && quickLinks.length > 0 && (
        <DocsSection title="Explore">
          <div className="grid gap-4 md:grid-cols-2">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={cn('group border-border block border p-4 transition-colors', mode.state.hover.card)}
              >
                <div className="flex items-center gap-4">
                  {link.icon && (
                    <link.icon
                      className="text-muted-foreground group-hover:text-primary h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  <h3 className={`uppercase ${docsTypography.h4} group-hover:text-primary`}>
                    {link.title}
                  </h3>
                </div>
                <p className={`mt-2 ${docsTypography.caption}`}>{link.description}</p>
              </a>
            ))}
          </div>
        </DocsSection>
      )}

      {/* Additional Content */}
      {children}

      {/* Navigation Footer */}
      <DocsNavFooter previous={previous} next={next} />
    </div>
  );
}
