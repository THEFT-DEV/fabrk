/**
 * Utility Functions Index
 * Barrel export for all utility functions
 *
 * Usage:
 * import { formatCurrency, truncate, unique } from "@/lib/utils";
 */

// Format utilities
export {
  formatCurrency,
  formatNumber,
  formatRelativeTime,
  formatDate,
  formatDateTime,
  formatFileSize,
  formatPercentage,
  formatPhoneNumber,
} from './format';

// Validation utilities
export {
  isValidEmail,
  isValidPassword,
  isValidUrl,
  isValidPhoneNumber,
  isValidCreditCard,
  isValidZipCode,
  isEmpty,
  isNumeric,
} from './validation';

// String utilities
export {
  truncate,
  slugify,
  capitalize,
  capitalizeWords,
  camelToTitle,
  toCamelCase,
  toSnakeCase,
  getInitials,
  randomString,
  maskEmail,
  maskCreditCard,
  countWords,
  pluralize,
} from './string';

// Array utilities
export {
  unique,
  uniqueBy,
  chunk,
  shuffle,
  randomItem,
  randomItems,
  groupBy,
  sortBy,
  sum,
  average,
  min,
  max,
  flatten,
  flattenDeep,
  arraysEqual,
} from './array';

// URL utilities
export {
  parseQueryString,
  buildQueryString,
  addQueryParams,
  removeQueryParams,
  getQueryParam,
  getDomain,
  getSubdomain,
  isExternalUrl,
  sanitizeUrl,
  getPath,
  joinPaths,
} from './url';

// Async utilities
export {
  sleep,
  retry,
  withTimeout,
  batchPromises,
  debounceAsync,
  throttleAsync,
  sequential,
  safe,
} from './async';

// Toast utility (existing)
export * from './toast';

// Main utils (cn function)
export { cn } from '../utils';
