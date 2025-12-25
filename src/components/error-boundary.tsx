/**
 * Error Boundary Component
 * Catches React errors and provides fallback UI
 */

'use client';

import React, { Component, ReactNode } from 'react';
import { captureError } from '@/lib/monitoring/error-tracker';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: unknown[]; // Reset error boundary when these change
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to tracking system
    captureError(error, {
      component: errorInfo.componentStack?.split('\n')[1]?.trim(),
      metadata: {
        componentStack: errorInfo.componentStack,
      },
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error boundary when resetKeys change
    if (this.state.hasError && this.props.resetKeys) {
      const hasChanged = this.props.resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );

      if (hasChanged) {
        this.setState({ hasError: false, error: undefined });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="text-destructive mb-4 h-12 w-12" />
          <h2 className={cn('mb-2 text-2xl font-semibold tracking-tight', mode.font)}>Something went wrong</h2>
          <p className="text-muted-foreground mb-6">
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className={cn('mb-4 max-w-2xl border p-4 text-left', mode.radius)}>
              <summary className="cursor-pointer font-semibold">Error Details</summary>
              <pre className={cn('mt-2 overflow-auto text-xs', mode.font)}>
                {this.state.error.message}
                {'\n\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <Button
            onClick={() => {
              this.setState({ hasError: false, error: undefined });
              window.location.reload();
            }}
          >
            &gt; REFRESH PAGE
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-based error boundary alternative
 */
export function useErrorHandler(error?: Error) {
  if (error) {
    throw error;
  }
}
