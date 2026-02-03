/**
 * ✅ FABRK UTILITY
 * Demo Date Generation - Hydration-Safe Pattern
 *
 * CRITICAL: Use this for ALL demo/story components with dates.
 *
 * WHY: Module-level `new Date()` causes hydration mismatches because
 * the server and client execute at different times. This utility uses
 * lazy initialization to generate dates ONLY on the client.
 *
 * USAGE:
 * ```tsx
 * import { useDemoDates } from "@/lib/utils/demo-dates";
 *
 * export default function MyDemo() {
 *   const { now, minutesAgo, hoursAgo, daysAgo } = useDemoDates();
 *
 *   const events = [
 *     { timestamp: now(), ... },
 *     { timestamp: minutesAgo(5), ... },
 *     { timestamp: hoursAgo(2), ... },
 *     { timestamp: daysAgo(7), ... },
 *   ];
 * }
 * ```
 */

import { useState } from 'react';

interface DemoDateUtils {
  /** Current time (page load) */
  now: () => Date;
  /** X minutes before now */
  minutesAgo: (minutes: number) => Date;
  /** X hours before now */
  hoursAgo: (hours: number) => Date;
  /** X days before now */
  daysAgo: (days: number) => Date;
  /** X weeks before now */
  weeksAgo: (weeks: number) => Date;
  /** X months before now */
  monthsAgo: (months: number) => Date;
  /** Raw base date (for advanced use) */
  base: Date;
}

/**
 * Hook that generates demo dates using lazy initialization.
 *
 * ✅ HYDRATION-SAFE: Uses useState lazy init pattern with optional fixed base
 * ✅ NO LOADING STATE: Renders immediately
 * ✅ PRODUCTION-READY: Customers can copy this pattern
 *
 * @param fixedBase - Optional ISO timestamp string for deterministic dates (prevents hydration mismatch)
 *
 * @example
 * ```tsx
 * // Use fixed base for hydration safety
 * const { now, daysAgo, hoursAgo } = useDemoDates("2025-11-14T00:00:00.000Z");
 *
 * // Or use dynamic base (riskier for hydration)
 * const { now, daysAgo, hoursAgo } = useDemoDates();
 *
 * const events: TimelineEvent[] = [
 *   { id: "1", timestamp: daysAgo(10), title: "Old event" },
 *   { id: "2", timestamp: hoursAgo(2), title: "Recent event" },
 *   { id: "3", timestamp: now(), title: "Just now" },
 * ];
 * ```
 */
export function useDemoDates(fixedBase?: string): DemoDateUtils {
  const [base] = useState(() => (fixedBase ? new Date(fixedBase) : new Date()));

  return {
    now: () => base,
    minutesAgo: (minutes: number) => new Date(base.getTime() - minutes * 60 * 1000),
    hoursAgo: (hours: number) => new Date(base.getTime() - hours * 60 * 60 * 1000),
    daysAgo: (days: number) => new Date(base.getTime() - days * 24 * 60 * 60 * 1000),
    weeksAgo: (weeks: number) => new Date(base.getTime() - weeks * 7 * 24 * 60 * 60 * 1000),
    monthsAgo: (months: number) => new Date(base.getTime() - months * 30 * 24 * 60 * 60 * 1000),
    base,
  };
}

/**
 * Generate demo dates for tests and examples (pure function version).
 *
 * ⚠️ USE THIS CAREFULLY: Only for test fixtures and non-React contexts.
 * For React components, prefer `useDemoDates()` hook.
 *
 * @param baseDate - Optional fixed base date (for deterministic stories)
 * @returns Object with date generation utilities
 */
export function generateDemoDates(baseDate?: Date): Omit<DemoDateUtils, 'base'> {
  const base = baseDate || new Date();

  return {
    now: () => base,
    minutesAgo: (minutes: number) => new Date(base.getTime() - minutes * 60 * 1000),
    hoursAgo: (hours: number) => new Date(base.getTime() - hours * 60 * 60 * 1000),
    daysAgo: (days: number) => new Date(base.getTime() - days * 24 * 60 * 60 * 1000),
    weeksAgo: (weeks: number) => new Date(base.getTime() - weeks * 7 * 24 * 60 * 60 * 1000),
    monthsAgo: (months: number) => new Date(base.getTime() - months * 30 * 24 * 60 * 60 * 1000),
  };
}
