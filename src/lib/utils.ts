import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with proper precedence handling
 *
 * Combines clsx for conditional classes with tailwind-merge to resolve
 * conflicting Tailwind classes (e.g., "p-4 p-2" becomes "p-2")
 *
 * @param inputs - Class names to merge (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated class string
 *
 * @example
 * ```typescript
 * cn("p-4 bg-primary", { "text-white": true })
 * // Returns: "p-4 bg-primary text-white"
 *
 * cn("p-4", "p-2") // Conflicting classes
 * // Returns: "p-2" (last one wins)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
