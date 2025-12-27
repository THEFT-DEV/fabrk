/**
 * @swagger
 * /api/stripe/payment-methods/default:
 *   post:
 *     summary: Set default payment method for a customer
 *     description: |
 *       Updates the customer's default payment method in Stripe.
 *       This payment method will be used for future subscriptions and invoices.
 *
 *       **Flow:**
 *       1. User selects "Set as Default" on a payment method
 *       2. Frontend calls this endpoint with paymentMethodId
 *       3. Server updates Stripe customer's invoice settings
 *       4. Default payment method is updated
 *
 *       **Features:**
 *       - Updates invoice_settings.default_payment_method
 *       - Validates payment method belongs to customer
 *       - Automatic error handling for invalid payment methods
 *     tags:
 *       - Payments
 *       - Stripe
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentMethodId
 *             properties:
 *               paymentMethodId:
 *                 type: string
 *                 example: pm_1234567890abcdef
 *                 description: Stripe payment method ID to set as default
 *     responses:
 *       200:
 *         description: Default payment method updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Default payment method updated
 *       400:
 *         description: Missing payment method ID or no billing account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Payment method ID is required
 *       401:
 *         description: Unauthorized - user not authenticated
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
 *         description: Failed to update default payment method
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to update default payment method
 *     x-codeSamples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/stripe/payment-methods/default', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               paymentMethodId: 'pm_1234567890abcdef'
 *             })
 *           });
 *
 *           const { success } = await response.json();
 *       - lang: curl
 *         source: |
 *           curl -X POST https://fabrk.dev/api/stripe/payment-methods/default \
 *             -H "Content-Type: application/json" \
 *             -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
 *             -d '{"paymentMethodId": "pm_1234567890abcdef"}'
 */

/**
 * ✅ FABRK API ROUTE
 * Update Default Payment Method
 * Sets the customer's default payment method for future charges
 */

import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { withRateLimit } from '@/lib/rate-limit/middleware';
import { stripe } from '@/lib/stripe/client';
import { NextRequest, NextResponse } from 'next/server';

async function setDefaultPaymentMethodHandler(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { paymentMethodId } = body as { paymentMethodId?: string };

    if (!paymentMethodId) {
      return NextResponse.json({ error: 'Payment method ID is required' }, { status: 400 });
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
        {
          error: 'No billing account found. Please add a payment method first.',
        },
        { status: 400 }
      );
    }

    // Update customer's default payment method
    await stripe.customers.update(user.customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    logger.info('Updated default payment method', {
      userId: user.id,
      customerId: user.customerId,
      paymentMethodId,
    });

    return NextResponse.json({
      success: true,
      message: 'Default payment method updated',
    });
  } catch (error: unknown) {
    logger.error('Default payment method update error:', error);
    return NextResponse.json({ error: 'Failed to update default payment method' }, { status: 500 });
  }
}

// Apply rate limiting: 10 requests per minute for payment endpoints
export const POST = withRateLimit(setDefaultPaymentMethodHandler, 'payment');
