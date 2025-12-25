/**
 * Server-side Instrumentation
 *
 * This file runs once when the server starts.
 * Use for server-side monitoring and observability setup.
 */

export async function register() {
  // Server-side instrumentation can go here
  // For example: OpenTelemetry, Sentry server initialization, etc.

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side only code
    console.log('Server instrumentation loaded');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime code
    console.log('Edge instrumentation loaded');
  }
}
