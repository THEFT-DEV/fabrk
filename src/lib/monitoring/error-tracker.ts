/**
 * Error Tracking & Monitoring
 * Production-ready error tracking with optional Sentry integration
 *
 * Features:
 * - Automatic error capturing
 * - User context tracking
 * - Performance monitoring
 * - Breadcrumb tracking
 * - Error grouping and deduplication
 * - Optional Sentry integration
 */

import { logger } from '@/lib/logger';

export interface ErrorContext {
  userId?: string;
  userEmail?: string;
  route?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

export interface ErrorReport {
  id: string;
  timestamp: Date;
  message: string;
  stack?: string;
  type: 'error' | 'warning' | 'info';
  context?: ErrorContext;
  fingerprint?: string; // For grouping similar errors
  count?: number; // How many times this error occurred
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count';
  tags?: Record<string, string>;
  timestamp: Date;
}

// In-memory error store (use database in production)
const errorStore: ErrorReport[] = [];
const performanceStore: PerformanceMetric[] = [];

// Error deduplication
const errorFingerprints = new Map<string, ErrorReport>();

/**
 * Initialize error tracking
 */
export function initErrorTracking(options?: {
  sentryDsn?: string;
  environment?: string;
  release?: string;
  enablePerformance?: boolean;
}) {
  if (options?.sentryDsn && typeof window !== 'undefined') {
    // Initialize Sentry (optional)
    // Customers can install @sentry/nextjs and uncomment:
    /*
    import * as Sentry from "@sentry/nextjs";
    Sentry.init({
      dsn: options.sentryDsn,
      environment: options.environment || process.env.NODE_ENV,
      release: options.release,
      tracesSampleRate: options.enablePerformance ? 0.1 : 0,
    });
    */
  }

  // Set up global error handlers
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      captureError(event.error, {
        route: window.location.pathname,
        metadata: { type: 'uncaught_error' },
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      captureError(new Error(event.reason), {
        route: window.location.pathname,
        metadata: { type: 'unhandled_rejection' },
      });
    });
  }

  logger.info('[Error Tracking] Initialized');
}

/**
 * Capture error
 */
export function captureError(error: Error | string, context?: ErrorContext): string {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorStack = typeof error === 'string' ? undefined : error.stack;

  // Generate fingerprint for deduplication
  const fingerprint = generateFingerprint(errorMessage, errorStack);

  // Check if we've seen this error before
  const existingError = errorFingerprints.get(fingerprint);
  if (existingError) {
    existingError.count = (existingError.count || 1) + 1;
    return existingError.id;
  }

  // Create new error report
  const report: ErrorReport = {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    message: errorMessage,
    stack: errorStack,
    type: 'error',
    context,
    fingerprint,
    count: 1,
  };

  // Store error
  errorStore.push(report);
  errorFingerprints.set(fingerprint, report);

  // Keep only last 1000 errors in memory
  if (errorStore.length > 1000) {
    errorStore.shift();
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    logger.error('[Error Tracker]', { message: errorMessage, context });
  }

  // Send to Sentry if available
  if (typeof window !== 'undefined') {
    const windowWithSentry = window as typeof window & {
      Sentry?: {
        captureException: (error: Error | string, options?: unknown) => void;
      };
    };
    if (windowWithSentry.Sentry) {
      windowWithSentry.Sentry.captureException(error, {
        contexts: { custom: context },
      });
    }
  }

  return report.id;
}

/**
 * Capture warning
 */
export function captureWarning(message: string, context?: ErrorContext): string {
  const report: ErrorReport = {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    message,
    type: 'warning',
    context,
  };

  errorStore.push(report);

  if (process.env.NODE_ENV === 'development') {
    logger.warn('[Error Tracker - Warning]', { message, context });
  }

  return report.id;
}

/**
 * Capture info message
 */
export function captureInfo(message: string, context?: ErrorContext): string {
  const report: ErrorReport = {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    message,
    type: 'info',
    context,
  };

  errorStore.push(report);

  return report.id;
}

/**
 * Set user context
 */
interface SentryWindow {
  Sentry?: {
    setUser: (user: { id: string; email?: string; username?: string } | null) => void;
    addBreadcrumb: (breadcrumb: { category: string; message: string; level: string }) => void;
  };
}

export function setUserContext(user: { id: string; email?: string; name?: string }) {
  if (typeof window !== 'undefined' && (window as SentryWindow).Sentry) {
    (window as SentryWindow).Sentry!.setUser({
      id: user.id,
      email: user.email,
      username: user.name,
    });
  }
}

/**
 * Clear user context
 */
export function clearUserContext() {
  if (typeof window !== 'undefined' && (window as SentryWindow).Sentry) {
    (window as SentryWindow).Sentry!.setUser(null);
  }
}

/**
 * Track performance metric
 */
export function trackPerformance(metric: Omit<PerformanceMetric, 'timestamp'>) {
  const fullMetric: PerformanceMetric = {
    ...metric,
    timestamp: new Date(),
  };

  performanceStore.push(fullMetric);

  // Keep only last 1000 metrics
  if (performanceStore.length > 1000) {
    performanceStore.shift();
  }

  if (process.env.NODE_ENV === 'development') {
    logger.debug(`[Performance] ${metric.name}: ${metric.value}${metric.unit}`);
  }

  // Send to Sentry if available
  if (typeof window !== 'undefined' && (window as SentryWindow).Sentry) {
    (window as SentryWindow).Sentry!.addBreadcrumb({
      category: 'performance',
      message: `${metric.name}: ${metric.value}${metric.unit}`,
      level: 'info',
    });
  }
}

/**
 * Track page load performance
 */
export function trackPageLoad() {
  if (typeof window === 'undefined') return;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  if (navigation) {
    trackPerformance({
      name: 'page_load',
      value: Math.round(navigation.loadEventEnd - navigation.fetchStart),
      unit: 'ms',
      tags: { route: window.location.pathname },
    });

    trackPerformance({
      name: 'dom_content_loaded',
      value: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
      unit: 'ms',
      tags: { route: window.location.pathname },
    });

    trackPerformance({
      name: 'first_paint',
      value: Math.round(navigation.responseStart - navigation.fetchStart),
      unit: 'ms',
      tags: { route: window.location.pathname },
    });
  }
}

/**
 * Track API call performance
 */
export function trackAPICall(endpoint: string, duration: number, status: number) {
  trackPerformance({
    name: 'api_call',
    value: duration,
    unit: 'ms',
    tags: {
      endpoint,
      status: status.toString(),
      success: status >= 200 && status < 300 ? 'true' : 'false',
    },
  });
}

/**
 * Generate fingerprint for error deduplication
 */
function generateFingerprint(message: string, stack?: string): string {
  // Simple fingerprint: hash of message + first line of stack
  const stackLine = stack?.split('\n')[1]?.trim() || '';
  const data = message + stackLine;

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash.toString(36);
}

/**
 * Get error statistics
 */
export function getErrorStats(since?: Date): {
  total: number;
  byType: Record<string, number>;
  topErrors: ErrorReport[];
  recentErrors: ErrorReport[];
} {
  let errors = [...errorStore];

  if (since) {
    errors = errors.filter((e) => e.timestamp >= since);
  }

  const byType: Record<string, number> = {};
  errors.forEach((e) => {
    byType[e.type] = (byType[e.type] || 0) + 1;
  });

  // Top errors by count
  const topErrors = [...errorFingerprints.values()]
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, 10);

  // Recent errors
  const recentErrors = errors
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 20);

  return {
    total: errors.length,
    byType,
    topErrors,
    recentErrors,
  };
}

/**
 * Get performance statistics
 */
export function getPerformanceStats(since?: Date): {
  metrics: PerformanceMetric[];
  averages: Record<string, number>;
} {
  let metrics = [...performanceStore];

  if (since) {
    metrics = metrics.filter((m) => m.timestamp >= since);
  }

  // Calculate averages by metric name
  const averages: Record<string, number> = {};
  const counts: Record<string, number> = {};

  metrics.forEach((m) => {
    averages[m.name] = (averages[m.name] || 0) + m.value;
    counts[m.name] = (counts[m.name] || 0) + 1;
  });

  Object.keys(averages).forEach((key) => {
    averages[key] = Math.round(averages[key] / counts[key]);
  });

  return { metrics, averages };
}

/**
 * Export error logs (for analysis)
 */
export function exportErrorLogs(): string {
  return JSON.stringify(errorStore, null, 2);
}

/**
 * Clear error logs
 */
export function clearErrorLogs() {
  errorStore.length = 0;
  errorFingerprints.clear();
}
