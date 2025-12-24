/**
 * API Route Guards
 * Conditionally disable routes based on environment configuration
 */

import { NextResponse } from 'next/server';

/**
 * Check if Stripe is configured
 */
export function isStripeEnabled(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}

/**
 * Check if Lemonsqueezy is configured
 */
export function isLemonsqueezyEnabled(): boolean {
  return !!process.env.LEMONSQUEEZY_API_KEY;
}

/**
 * Check if Polar is configured
 */
export function isPolarEnabled(): boolean {
  return !!process.env.POLAR_ACCESS_TOKEN;
}

/**
 * Guard for Stripe routes - returns 404 if Stripe not configured
 * Use this at the start of all Stripe API routes
 *
 * @example
 * export async function POST(req: NextRequest) {
 *   const guard = guardStripeRoute();
 *   if (guard) return guard;
 *   // ... rest of route
 * }
 */
export function guardStripeRoute(): NextResponse | null {
  if (!isStripeEnabled()) {
    return NextResponse.json(
      {
        error: 'Not Found',
        message: 'Stripe payment provider is not configured on this server',
      },
      { status: 404 }
    );
  }
  return null;
}

/**
 * Guard for Lemonsqueezy routes - returns 404 if Lemonsqueezy not configured
 */
export function guardLemonsqueezyRoute(): NextResponse | null {
  if (!isLemonsqueezyEnabled()) {
    return NextResponse.json(
      {
        error: 'Not Found',
        message: 'Lemonsqueezy payment provider is not configured on this server',
      },
      { status: 404 }
    );
  }
  return null;
}

/**
 * Guard for Polar routes - returns 404 if Polar not configured
 */
export function guardPolarRoute(): NextResponse | null {
  if (!isPolarEnabled()) {
    return NextResponse.json(
      {
        error: 'Not Found',
        message: 'Polar payment provider is not configured on this server',
      },
      { status: 404 }
    );
  }
  return null;
}
