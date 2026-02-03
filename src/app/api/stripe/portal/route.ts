/**
 * @swagger
 * /api/stripe/portal:
 *   post:
 *     summary: Create Stripe billing portal session
 *     description: |
 *       Creates a Stripe Customer Portal session for managing subscriptions,
 *       payment methods, and billing history. Requires user authentication.
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
 *       - lang: curl
 *         source: |
 *           curl -X POST https://fabrk.dev/api/stripe/portal \
 *             -H "Authorization: Bearer YOUR_JWT_TOKEN"
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/stripe/portal', {
 *             method: 'POST',
 *             headers: {
 *               'Authorization': `Bearer ${token}`
 *             }
 *           });
 *           const { url } = await response.json();
 *           window.location.href = url; // Redirect to portal
 */

import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe/client';
import { env } from '@/lib/env';
import { withCsrfProtection } from '@/lib/security/csrf';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function portalHandler(_req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user?.customerId) {
      return NextResponse.json(
        { error: 'No billing account found. Please make a purchase first.' },
        { status: 400 }
      );
    }

    // Create portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.customerId,
      return_url: `${env.server.NEXTAUTH_URL}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: unknown) {
    logger.error('Portal session error:', error);
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
  }
}

export const POST = withCsrfProtection(portalHandler);
