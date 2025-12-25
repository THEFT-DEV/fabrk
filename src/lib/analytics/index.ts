/**
 * Analytics Library Index
 */

// Core tracking
export {
  initAnalytics,
  trackEvent,
  trackPageView,
  identifyUser,
  trackRevenue,
  trackFunnelStep,
  startFunnel,
  completeFunnelStep,
  abandonFunnel,
  signupFunnel,
  checkoutFunnel,
  Funnels,
  type AnalyticsEvent,
  type AnalyticsProvider as AnalyticsProviderType,
  type UserProperties,
} from './tracking';

// React hooks
export {
  usePageTracking,
  useTrackClick,
  useTrackForm,
  useTrackFeature,
  useTrackError,
  useTrackSearch,
  useTrackVideo,
  useTrackDownload,
  useTrackEvent,
} from './hooks';

// Provider component
export { AnalyticsProvider } from './analytics-provider';
