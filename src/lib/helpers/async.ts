/**
 * Async Utilities
 * Functions for working with promises and async operations
 */

/**
 * Sleep for specified milliseconds
 * @example await sleep(1000) // Wait 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry async function with exponential backoff
 * @example await retry(() => fetchData(), { attempts: 3, delay: 1000 })
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    attempts?: number;
    delay?: number;
    backoff?: number;
    onRetry?: (attempt: number, error: Error) => void;
  } = {}
): Promise<T> {
  const { attempts = 3, delay = 1000, backoff = 2, onRetry } = options;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error: unknown) {
      if (attempt === attempts) throw error;

      if (onRetry) {
        onRetry(attempt, error as Error);
      }

      const waitTime = delay * Math.pow(backoff, attempt - 1);
      await sleep(waitTime);
    }
  }

  throw new Error('Retry failed');
}

/**
 * Execute async function with timeout
 * @example await withTimeout(fetchData(), 5000) // 5 second timeout
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutError: Error = new Error('Operation timed out')
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(timeoutError), timeoutMs)
  );

  return Promise.race([promise, timeoutPromise]);
}

/**
 * Execute promises in batches with concurrency limit
 * @example await batchPromises(items, item => fetchItem(item), 5)
 */
export async function batchPromises<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number = 5
): Promise<R[]> {
  const results: R[] = [];
  const executing: Promise<void>[] = [];

  for (const item of items) {
    const promise = fn(item).then((result) => {
      results.push(result);
    });

    executing.push(promise);

    if (executing.length >= concurrency) {
      await Promise.race(executing);
      executing.splice(
        executing.findIndex((p) => p === promise),
        1
      );
    }
  }

  await Promise.all(executing);
  return results;
}

/**
 * Debounce async function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve, reject) => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error: unknown) {
          reject(error);
        }
      }, delay);
    });
  };
}

/**
 * Throttle async function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttleAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let inThrottle = false;

  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (inThrottle) {
      throw new Error('Function is throttled');
    }

    inThrottle = true;
    const result = await fn(...args);

    setTimeout(() => {
      inThrottle = false;
    }, limit);

    return result;
  };
}

/**
 * Execute promises sequentially
 */
export async function sequential<T>(promises: (() => Promise<T>)[]): Promise<T[]> {
  const results: T[] = [];
  for (const promiseFn of promises) {
    results.push(await promiseFn());
  }
  return results;
}

/**
 * Safe promise wrapper that never throws
 */
export async function safe<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error: unknown) {
    return [error as Error, null];
  }
}
