/**
 * LibraryBreadcrumb - Reusable breadcrumb navigation for library pages
 * Amazon-style navigation at top of content area
 */

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface LibraryBreadcrumbProps {
  /** Breadcrumb trail items */
  items: BreadcrumbItem[];
}

/**
 * LibraryBreadcrumb - Consistent navigation for all library pages
 *
 * @example
 * // For a template page
 * <LibraryBreadcrumb items={[
 *   { label: 'Library', href: '/library' },
 *   { label: 'Patterns', href: '/library/patterns' },
 *   { label: 'Error Pages' },
 * ]} />
 *
 * @example
 * // For a docs page
 * <LibraryBreadcrumb items={[
 *   { label: 'Library', href: '/library' },
 *   { label: 'Docs', href: '/library/docs' },
 *   { label: 'Getting Started' },
 * ]} />
 */
export function LibraryBreadcrumb({ items }: LibraryBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-1">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn(
                  'transition-colors',
                  'text-muted-foreground hover:text-foreground',
                  mode.font
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(isLast ? 'text-foreground' : 'text-muted-foreground', mode.font)}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="text-muted-foreground h-3 w-3" />}
          </span>
        );
      })}
    </nav>
  );
}
