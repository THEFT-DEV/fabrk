/**
 * ✅ FABRK UTILITIES
 * Toast notification wrapper around sonner
 * Provides consistent toast calls throughout the app
 *
 * @example
 * ```ts
 * showSuccess("Operation completed");
 * showError("Something went wrong");
 * showInfo("This is informational");
 * ```
 */

import { toast as sonnerToast } from 'sonner';

// Re-export toast for direct usage
export { toast } from 'sonner';

/**
 * Show success toast notification
 */
export function showSuccess(message: string, description?: string) {
  sonnerToast.success(message, {
    description,
    duration: 4000,
  });
}

/**
 * Show error toast notification
 */
export function showError(message: string, description?: string) {
  sonnerToast.error(message, {
    description,
    duration: 5000,
  });
}

/**
 * Show info toast notification
 */
export function showInfo(message: string, description?: string) {
  sonnerToast.info(message, {
    description,
    duration: 4000,
  });
}
