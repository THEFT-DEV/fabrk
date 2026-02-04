'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

/**
 * Platform (Dashboard) Error Boundary
 * Handles errors in authenticated dashboard routes
 * Provides context-specific recovery actions for platform features
 */
export default function PlatformError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error with platform context
    logger.error('[PLATFORM ERROR]', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });

    // Send to error tracking service (Sentry)
    // Uncomment when Sentry is configured:
    // import * as Sentry from '@sentry/nextjs';
    // Sentry.captureException(error, {
    //   tags: { section: 'platform', route: 'dashboard' },
    // });
  }, [error]);

  return (
    <div
      className={cn(
        'bg-background flex min-h-screen flex-col items-center justify-center px-6',
        mode.font
      )}
    >
      <div className="mx-auto max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className={cn('bg-destructive/10 p-6', mode.radius)}>
            <AlertTriangle className="text-destructive size-16" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className={cn('text-foreground mb-4 text-4xl font-semibold', mode.font)}>
          DASHBOARD ERROR
        </h1>
        <p className={cn('text-muted-foreground mb-8 text-sm', mode.font)}>
          [ERROR]: An unexpected error occurred in the dashboard. Your data is safe, but this
          feature may not be working correctly.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div
            className={cn(
              'border-destructive/40 bg-destructive/10 mb-8 border p-4 text-left',
              mode.radius
            )}
          >
            <p className={cn('text-destructive mb-2 text-xs font-semibold', mode.font)}>
              [ERROR DETAILS]:
            </p>
            <p className={cn('text-destructive text-xs break-words', mode.font)}>{error.message}</p>
            {error.digest && (
              <p className={cn('text-destructive mt-2 text-xs', mode.font)}>
                [ERROR ID]: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset} size="lg" className="text-xs">
            <RefreshCw className="mr-2 size-4" />
            &gt; TRY AGAIN
          </Button>
          <Button asChild variant="outline" size="lg" className="text-xs">
            <Link href="/developer">
              <LayoutDashboard className="mr-2 size-4" />
              &gt; DASHBOARD HOME
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="border-border/60 mt-12 border-t pt-8">
          <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
            If this problem persists, please contact support:
          </p>
          <a
            href="mailto:support@fabrk.dev"
            className={cn('text-primary text-xs font-semibold hover:underline', mode.font)}
          >
            support@fabrk.dev
          </a>
          {error.digest && (
            <p className={cn('text-muted-foreground mt-2 text-xs', mode.font)}>
              [ERROR ID]: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
