/**
 * @swagger
 * /api/stripe/create-portal-session:
 *   post:
 *     summary: Create Stripe billing portal session
 *     description: |
 *       Creates a Stripe Customer Portal session for managing subscriptions,
 *       payment methods, and billing history. This is an alternative endpoint
 *       to /api/stripe/portal with the same functionality.
 *
 *       **Portal Features:**
 *       - View and download invoices
 *       - Update payment methods
 *       - Manage subscriptions (cancel, upgrade, downgrade)
 *       - Update billing information
 *       - View payment history
 *
 *       **Flow:**
 *       1. User clicks "Manage Billing" button
 *       2. Frontend calls this endpoint
 *       3. Returns portal URL
 *       4. Redirect user to Stripe-hosted portal
 *       5. User manages billing on Stripe's secure portal
 *       6. Portal redirects back to app when done
 *     tags:
 *       - Payments
 *       - Stripe
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Portal session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   format: uri
 *                   example: https://billing.stripe.com/session/abc123
 *                   description: URL to redirect user to Stripe billing portal
 *       400:
 *         description: No billing account found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No billing account found. Please make a purchase first.
 *       401:
 *         description: Unauthorized - authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized - Please sign in
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Failed to create portal session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create portal session
 *     x-codeSamples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/stripe/create-portal-session', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             }
 *           });
 *
 *           const { url } = await response.json();
 *           window.location.href = url; // Redirect to portal
 *       - lang: curl
 *         source: |
 *           curl -X POST https://fabrk.dev/api/stripe/create-portal-session \
 *             -H "Content-Type: application/json" \
 *             -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
 */

/**
 * ✅ FABRK API ROUTE
 * Stripe Billing Portal Session
 * Alternative endpoint for creating billing portal sessions
 */

import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { withRateLimit } from '@/lib/rate-limit/middleware';
import { stripe } from '@/lib/stripe/client';
import { NextRequest, NextResponse } from 'next/server';

async function createPortalSessionHandler(_req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.customerId) {
      return NextResponse.json(
        { error: 'No billing account found. Please make a purchase first.' },
        { status: 400 }
      );
    }

    // Create portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.customerId,
      return_url: `${process.env.NEXTAUTH_URL}/billing`,
    });

    logger.info('Created billing portal session', {
      userId: user.id,
      customerId: user.customerId,
      portalSessionId: portalSession.id,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: unknown) {
    logger.error('Portal session creation error:', error);
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
  }
}

// Apply rate limiting: 10 requests per minute for payment endpoints
export const POST = withRateLimit(createPortalSessionHandler, 'payment');
