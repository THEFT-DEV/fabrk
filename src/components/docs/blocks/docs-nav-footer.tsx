/**
 * DocsNavFooter - Previous/Next navigation links
 */

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { docsTypography } from '../typography';

interface NavLink {
  title: string;
  href: string;
}

interface DocsNavFooterProps {
  /** Previous page link */
  previous?: NavLink;
  /** Next page link */
  next?: NavLink;
}

export function DocsNavFooter({ previous, next }: DocsNavFooterProps) {
  if (!previous && !next) return null;

  return (
    <nav className="border-border mt-16 flex items-center justify-between border-t pt-6">
      {previous ? (
        <Link
          href={previous.href}
          className="group text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <div>
            <p className={`${docsTypography.caption} uppercase`}>Previous</p>
            <p className={`${docsTypography.h4} group-hover:text-primary uppercase`}>
              {previous.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group text-muted-foreground hover:text-foreground flex items-center gap-2 text-right transition-colors"
        >
          <div>
            <p className={`${docsTypography.caption} uppercase`}>Next</p>
            <p className={`${docsTypography.h4} group-hover:text-primary uppercase`}>
              {next.title}
            </p>
          </div>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
