/**
 * Monitoring Library Index
 * Central export for error tracking and performance monitoring
 */

// Error tracking
export {
  initErrorTracking,
  captureError,
  captureWarning,
  captureInfo,
  setUserContext,
  clearUserContext,
  trackPerformance,
  trackPageLoad,
  trackAPICall,
  getErrorStats,
  getPerformanceStats,
  exportErrorLogs,
  clearErrorLogs,
  type ErrorContext,
  type ErrorReport,
  type PerformanceMetric,
} from './error-tracker';

// Performance monitoring
export {
  measureAsync,
  measure,
  PerformanceMarker,
  trackWebVitals,
  trackResourceLoad,
  trackMemoryUsage,
  usePerformanceTracker,
  trackAPIPerformance,
  trackQueryPerformance,
} from './performance';
