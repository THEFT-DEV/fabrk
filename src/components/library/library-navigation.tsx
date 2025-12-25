/**
 * Library Navigation Component
 * Provides breadcrumbs and back button for library template pages
 */

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface LibraryNavigationProps {
  templateName: string;
  category?: string;
  categoryHref?: string;
}

/**
 * Navigation component for library template pages
 * Shows breadcrumbs and back button
 *
 * @example
 * <LibraryNavigation
 *   templateName="Analytics Dashboard"
 *   category="Dashboards"
 *   categoryHref="/library/dashboards"
 * />
 */
export function LibraryNavigation({
  templateName,
  category,
  categoryHref,
}: LibraryNavigationProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-xs', mode.font)}>
        {/* Home */}
        <Link
          href="/"
          className={cn(
            'text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors'
          )}
        >
          <Home className="h-3 w-3" />
        </Link>

        <span className="text-muted-foreground">/</span>

        {/* Library */}
        <Link
          href="/library"
          className={cn('text-muted-foreground hover:text-foreground transition-colors')}
        >
          [LIBRARY]
        </Link>

        {/* Category (if provided) */}
        {category && categoryHref && (
          <>
            <span className="text-muted-foreground">/</span>
            <Link
              href={categoryHref}
              className={cn('text-muted-foreground hover:text-foreground transition-colors')}
            >
              [{category.toUpperCase()}]
            </Link>
          </>
        )}

        <span className="text-muted-foreground">/</span>

        {/* Current Page */}
        <span className="text-primary font-medium" aria-current="page">
          [{templateName.toUpperCase()}]
        </span>
      </nav>

      {/* Back Button */}
      <Button asChild variant="outline" size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>
        <Link href="/library">
          <ArrowLeft className="mr-2 h-3 w-3" />
          &gt; BACK TO LIBRARY
        </Link>
      </Button>
    </div>
  );
}

/**
 * Simple back button for pages that don't need full breadcrumbs
 */
export function BackToLibraryButton() {
  return (
    <Button asChild variant="outline" size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>
      <Link href="/library">
        <ArrowLeft className="mr-2 h-3 w-3" />
        &gt; BACK TO LIBRARY
      </Link>
    </Button>
  );
}
