/**
 * DocsHeader - Page header for all documentation pages
 * Terminal-style badge + title + description + breadcrumbs
 */

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { docsTypography } from '../typography';
import { cn } from '@/lib/utils';

interface DocsHeaderProps {
  /** Terminal code badge e.g. "[0x40]" */
  code: string;
  /** Category name e.g. "Features", "Components" */
  category: string;
  /** Category href for breadcrumb link e.g. "/docs/features" */
  categoryHref?: string;
  /** Page title e.g. "Database", "Button" */
  title: string;
  /** Page description */
  description: string;
}

/** Map category names to their base hrefs */
const categoryHrefs: Record<string, string> = {
  Components: '/docs/components',
  Features: '/docs/features',
  Tutorials: '/docs/tutorials',
  Security: '/docs/security',
  Deployment: '/docs/deployment',
  Extras: '/docs/extras',
  Launch: '/docs/launch',
  Architecture: '/docs/architecture',
};

export function DocsHeader({ code, category, categoryHref, title, description }: DocsHeaderProps) {
  // Use provided href or look up from map
  const resolvedCategoryHref =
    categoryHref || categoryHrefs[category] || `/docs/${category.toLowerCase()}`;

  // Skip category in breadcrumb if it's "Docs" (same as first item - would be redundant)
  const showCategoryBreadcrumb = category.toLowerCase() !== 'docs';

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-xs">
        <Link
          href="/docs"
          className={cn('text-muted-foreground hover:text-foreground font-mono transition-colors')}
        >
          Docs
        </Link>
        <ChevronRight className="text-muted-foreground h-3 w-3" />
        {showCategoryBreadcrumb && (
          <>
            <Link
              href={resolvedCategoryHref}
              className={cn(
                'text-muted-foreground hover:text-foreground font-mono transition-colors'
              )}
            >
              {category}
            </Link>
            <ChevronRight className="text-muted-foreground h-3 w-3" />
          </>
        )}
        <span className="text-foreground font-mono">{title}</span>
      </nav>

      {/* Terminal-style badge */}
      <div className="border-border bg-card inline-block border px-4 py-1">
        <span className={docsTypography.badge}>
          [ {code} <span className="uppercase">{category}</span> ]{' '}
          <span className="uppercase">{title}</span>
        </span>
      </div>

      {/* Page title */}
      <h1 className={`mt-4 uppercase ${docsTypography.h1}`}>{title}</h1>

      {/* Description */}
      <p className={`mt-2 ${docsTypography.body}`}>&gt; {description}</p>
    </div>
  );
}
