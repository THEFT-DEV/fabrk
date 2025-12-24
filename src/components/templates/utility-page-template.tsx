/**
 * Utility Page Template
 *
 * Reusable template for utility pages (404, 500, maintenance, coming soon, etc.).
 * Provides consistent centered layout with error code, title, and actions.
 *
 * @example
 * ```tsx
 * // 404 Page
 * <UtilityPageTemplate
 *   code="404"
 *   title="Page Not Found"
 *   description="The page you're looking for doesn't exist or has been moved."
 *   primaryAction={{ label: "Go Home", href: "/" }}
 *   secondaryAction={{ label: "Go Back", href: "javascript:history.back()" }}
 * />
 *
 * // Maintenance Page
 * <UtilityPageTemplate
 *   code="503"
 *   title="Under Maintenance"
 *   description="We're performing scheduled maintenance. Please check back soon."
 *   icon={<Wrench className="h-16 w-16" />}
 *   primaryAction={{ label: "Status Page", href: "/status" }}
 * />
 * ```
 */

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { AlertCircle, Home } from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export interface UtilityAction {
  /** Button label */
  label: string;
  /** Link href */
  href: string;
}

export interface UtilityPageTemplateProps {
  // Required
  /** Error or status code (e.g., "404", "500", "MAINTENANCE") */
  code: string;
  /** Page title */
  title: string;
  /** Description text */
  description: string;

  // Actions
  /** Primary action button */
  primaryAction?: UtilityAction;
  /** Secondary action button */
  secondaryAction?: UtilityAction;

  // Optional
  /** Custom icon (defaults to AlertCircle) */
  icon?: React.ReactNode;
  /** Show a home link at the bottom */
  showHomeLink?: boolean;

  // Customization
  /** Additional className for the outer container */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function UtilityPageTemplate({
  code,
  title,
  description,
  primaryAction,
  secondaryAction,
  icon,
  showHomeLink = false,
  className,
}: UtilityPageTemplateProps) {
  const displayIcon = icon || <AlertCircle className="text-muted-foreground h-16 w-16" />;

  return (
    <div
      className={cn('flex min-h-screen flex-col items-center justify-center px-4 py-16', className)}
    >
      <div className="flex flex-col items-center space-y-6 text-center">
        {/* Icon */}
        <div className="text-muted-foreground">{displayIcon}</div>

        {/* Error Code Badge */}
        <div className={cn('border-border inline-block border px-4 py-1', mode.radius)}>
          <span className={cn('text-muted-foreground text-xs', mode.font)}>
            [ERROR CODE]: {code.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h1 className={cn('text-4xl font-bold tracking-tight', mode.font)}>
          {title.toUpperCase()}
        </h1>

        {/* Description */}
        <p className={cn('text-muted-foreground max-w-md text-sm', mode.font)}>{description}</p>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {primaryAction && (
            <Button asChild>
              <Link href={primaryAction.href}>&gt; {primaryAction.label.toUpperCase()}</Link>
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" asChild>
              <Link href={secondaryAction.href}>&gt; {secondaryAction.label.toUpperCase()}</Link>
            </Button>
          )}
        </div>

        {/* Home Link */}
        {showHomeLink && (
          <Link
            href="/"
            className={cn(
              'text-muted-foreground hover:text-foreground mt-4 flex items-center gap-2 text-sm transition-colors',
              mode.font
            )}
          >
            <Home className="h-4 w-4" />
            Return to Home
          </Link>
        )}
      </div>
    </div>
  );
}

export default UtilityPageTemplate;
