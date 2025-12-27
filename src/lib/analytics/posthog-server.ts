/**
 * Optional PostHog Server Client
 *
 * Only initializes if NEXT_PUBLIC_POSTHOG_KEY is set.
 * Use for server-side event tracking (API routes, Server Actions, etc.)
 */

import { PostHog } from 'posthog-node';

let posthogClient: PostHog | null = null;

/**
 * Get PostHog server client (singleton, optional)
 * Returns null if no API key is configured
 */
export function getPostHogClient(): PostHog | null {
  // Return null if no API key (graceful degradation)
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return null;
  }

  // Create singleton instance
  if (!posthogClient) {
    posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      flushAt: 20, // Batch events
      flushInterval: 30000, // Flush every 30 seconds
    });
  }

  return posthogClient;
}

/**
 * Track server-side event (safe, returns immediately if disabled)
 */
export async function trackServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>
): Promise<void> {
  const client = getPostHogClient();
  if (!client) return; // Gracefully skip if not configured

  try {
    client.capture({
      distinctId,
      event,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    // Silent fail - don't break app if analytics fails
    console.error('[PostHog] Failed to track event:', error);
  }
}

/**
 * Identify server-side user (safe)
 */
export async function identifyServerUser(
  distinctId: string,
  properties?: Record<string, unknown>
): Promise<void> {
  const client = getPostHogClient();
  if (!client) return;

  try {
    client.identify({
      distinctId,
      properties,
    });
  } catch (error) {
    console.error('[PostHog] Failed to identify user:', error);
  }
}

/**
 * Graceful shutdown (call on process exit)
 */
export async function shutdownPostHog(): Promise<void> {
  if (posthogClient) {
    await posthogClient.shutdown();
  }
}
