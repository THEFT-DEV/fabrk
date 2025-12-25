/**
 * Array Utilities
 * Functions for manipulating and transforming arrays
 */

/**
 * Remove duplicate values from array
 * @example unique([1, 2, 2, 3]) // [1, 2, 3]
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Remove duplicate objects by key
 * @example uniqueBy([{id: 1}, {id: 1}, {id: 2}], "id") // [{id: 1}, {id: 2}]
 */
export function uniqueBy<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set();
  return arr.filter((item) => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

/**
 * Chunk array into smaller arrays
 * @example chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Shuffle array randomly
 */
export function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get random item from array
 */
export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Get random items from array (no duplicates)
 */
export function randomItems<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count);
}

/**
 * Group array by key
 * @example groupBy([{type: "a"}, {type: "b"}, {type: "a"}], "type")
 * // { a: [{type: "a"}, {type: "a"}], b: [{type: "b"}] }
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (groups, item) => {
      const value = String(item[key]);
      if (!groups[value]) groups[value] = [];
      groups[value].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Sort array of objects by key
 * @example sortBy([{age: 30}, {age: 20}], "age") // [{age: 20}, {age: 30}]
 */
export function sortBy<T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...arr].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];
    const comparison = valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    return order === 'asc' ? comparison : -comparison;
  });
}

/**
 * Sum array of numbers or object property
 */
export function sum(arr: number[]): number;
export function sum<T>(arr: T[], key: keyof T): number;
export function sum<T>(arr: number[] | T[], key?: keyof T): number {
  if (typeof arr[0] === 'number') {
    return (arr as number[]).reduce((sum, num) => sum + num, 0);
  }
  return (arr as T[]).reduce((sum, item) => sum + Number(item[key!]), 0);
}

/**
 * Calculate average
 */
export function average(arr: number[]): number {
  return arr.length > 0 ? sum(arr) / arr.length : 0;
}

/**
 * Find min value in array
 */
export function min(arr: number[]): number {
  return Math.min(...arr);
}

/**
 * Find max value in array
 */
export function max(arr: number[]): number {
  return Math.max(...arr);
}

/**
 * Flatten nested array
 */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.flat() as T[];
}

/**
 * Deep flatten nested array
 */
export function flattenDeep<T = unknown>(arr: unknown[]): T[] {
  return arr.reduce<T[]>(
    (flat, item) => flat.concat(Array.isArray(item) ? flattenDeep<T>(item) : (item as T)),
    []
  );
}

/**
 * Check if arrays are equal
 */
export function arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
}
