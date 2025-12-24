/**
 * Performance Monitoring Utilities
 * Track and analyze application performance
 */

import { trackPerformance } from './error-tracker';

/**
 * Measure function execution time
 */
export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>,
  tags?: Record<string, string>
): Promise<T> {
  const start = performance.now();

  try {
    const result = await fn();
    const duration = performance.now() - start;

    trackPerformance({
      name,
      value: Math.round(duration),
      unit: 'ms',
      tags,
    });

    return result;
  } catch (error: unknown) {
    const duration = performance.now() - start;

    trackPerformance({
      name,
      value: Math.round(duration),
      unit: 'ms',
      tags: { ...tags, status: 'error' },
    });

    throw error;
  }
}

/**
 * Measure synchronous function execution time
 */
export function measure<T>(name: string, fn: () => T, tags?: Record<string, string>): T {
  const start = performance.now();

  try {
    const result = fn();
    const duration = performance.now() - start;

    trackPerformance({
      name,
      value: Math.round(duration),
      unit: 'ms',
      tags,
    });

    return result;
  } catch (error: unknown) {
    const duration = performance.now() - start;

    trackPerformance({
      name,
      value: Math.round(duration),
      unit: 'ms',
      tags: { ...tags, status: 'error' },
    });

    throw error;
  }
}

/**
 * Performance marker for manual tracking
 */
export class PerformanceMarker {
  private name: string;
  private start: number;
  private tags?: Record<string, string>;

  constructor(name: string, tags?: Record<string, string>) {
    this.name = name;
    this.tags = tags;
    this.start = performance.now();
  }

  end(additionalTags?: Record<string, string>) {
    const duration = performance.now() - this.start;

    trackPerformance({
      name: this.name,
      value: Math.round(duration),
      unit: 'ms',
      tags: { ...this.tags, ...additionalTags },
    });

    return duration;
  }
}

/**
 * Track Web Vitals (Core Web Vitals)
 */
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const lcp = entry as PerformanceEntry & {
        renderTime?: number;
        loadTime?: number;
      };
      const value = lcp.renderTime || lcp.loadTime || 0;

      trackPerformance({
        name: 'lcp',
        value: Math.round(value),
        unit: 'ms',
        tags: { metric: 'core_web_vital' },
      });
    }
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });

  // First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const fid = entry as PerformanceEventTiming;

      trackPerformance({
        name: 'fid',
        value: Math.round(fid.processingStart - fid.startTime),
        unit: 'ms',
        tags: { metric: 'core_web_vital' },
      });
    }
  });

  fidObserver.observe({ type: 'first-input', buffered: true });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const layoutShift = entry as PerformanceEntry & {
        value?: number;
        hadRecentInput?: boolean;
      };
      if (!layoutShift.hadRecentInput) {
        clsValue += layoutShift.value || 0;
      }
    }
  });

  clsObserver.observe({ type: 'layout-shift', buffered: true });

  // Report CLS when page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      trackPerformance({
        name: 'cls',
        value: Math.round(clsValue * 1000), // CLS is a score, multiply for readability
        unit: 'count',
        tags: { metric: 'core_web_vital' },
      });
    }
  });
}

/**
 * Track resource loading performance
 */
export function trackResourceLoad(resourceType: string) {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const resource = entry as PerformanceResourceTiming;

      if (resource.initiatorType === resourceType) {
        trackPerformance({
          name: 'resource_load',
          value: Math.round(resource.duration),
          unit: 'ms',
          tags: {
            type: resourceType,
            name: resource.name.split('/').pop() || 'unknown',
          },
        });
      }
    }
  });

  observer.observe({ type: 'resource', buffered: true });
}

/**
 * Monitor memory usage (Chrome only)
 */
interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export function trackMemoryUsage() {
  if (typeof window === 'undefined') return;

  const memory = (performance as PerformanceWithMemory).memory;
  if (!memory) return;

  setInterval(() => {
    trackPerformance({
      name: 'memory_used',
      value: Math.round(memory.usedJSHeapSize / 1024 / 1024),
      unit: 'bytes',
      tags: { metric: 'memory' },
    });

    trackPerformance({
      name: 'memory_total',
      value: Math.round(memory.totalJSHeapSize / 1024 / 1024),
      unit: 'bytes',
      tags: { metric: 'memory' },
    });

    trackPerformance({
      name: 'memory_limit',
      value: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
      unit: 'bytes',
      tags: { metric: 'memory' },
    });
  }, 30000); // Every 30 seconds
}

/**
 * Track React component render time
 */
export function usePerformanceTracker(componentName: string) {
  if (typeof window === 'undefined') return;

  const marker = new PerformanceMarker(`render_${componentName}`, {
    component: componentName,
  });

  // End marker when component unmounts
  return () => marker.end();
}

/**
 * API call performance wrapper
 */
export async function trackAPIPerformance(
  endpoint: string,
  method: string,
  fn: () => Promise<Response>
): Promise<Response> {
  const start = performance.now();

  try {
    const response = await fn();
    const duration = performance.now() - start;

    trackPerformance({
      name: 'api_call',
      value: Math.round(duration),
      unit: 'ms',
      tags: {
        endpoint,
        method,
        status: response.status.toString(),
        success: response.ok ? 'true' : 'false',
      },
    });

    return response;
  } catch (error: unknown) {
    const duration = performance.now() - start;

    trackPerformance({
      name: 'api_call',
      value: Math.round(duration),
      unit: 'ms',
      tags: {
        endpoint,
        method,
        status: 'error',
        success: 'false',
      },
    });

    throw error;
  }
}

/**
 * Database query performance wrapper
 */
export async function trackQueryPerformance<T>(
  queryName: string,
  fn: () => Promise<T>
): Promise<T> {
  return measureAsync(`db_query_${queryName}`, fn, { type: 'database' });
}
