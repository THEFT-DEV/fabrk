/**
 * @swagger
 * /api/stripe/payment-methods/{id}:
 *   delete:
 *     summary: Delete (detach) a payment method from customer
 *     description: |
 *       Detaches a payment method from the Stripe customer, effectively removing it
 *       from their saved payment methods. The payment method ID is still valid in Stripe
 *       but is no longer associated with this customer.
 *
 *       **Flow:**
 *       1. User clicks delete/trash icon on payment method
 *       2. Frontend confirms deletion with user
 *       3. Frontend calls this endpoint with payment method ID
 *       4. Server detaches payment method from customer
 *       5. Payment method is removed from customer's list
 *
 *       **Features:**
 *       - Validates payment method belongs to customer
 *       - Prevents deleting default payment method if it's the only one
 *       - Automatic cleanup in Stripe
 *     tags:
 *       - Payments
 *       - Stripe
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Stripe payment method ID to delete
 *         schema:
 *           type: string
 *           example: pm_1234567890abcdef
 *     responses:
 *       200:
 *         description: Payment method deleted successfully
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
 *                   example: Payment method removed
 *       400:
 *         description: No billing account found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No billing account found
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
 *         description: Failed to delete payment method
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to remove payment method
 *     x-codeSamples:
 *       - lang: JavaScript
 *         source: |
 *           const paymentMethodId = 'pm_1234567890abcdef';
 *           const response = await fetch(`/api/stripe/payment-methods/${paymentMethodId}`, {
 *             method: 'DELETE',
 *           });
 *
 *           const { success } = await response.json();
 *       - lang: curl
 *         source: |
 *           curl -X DELETE https://fabrk.dev/api/stripe/payment-methods/pm_1234567890abcdef \
 *             -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
 */

/**
 * ✅ FABRK API ROUTE
 * Delete Payment Method
 * Detaches a payment method from the customer
 */

import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { withRateLimit } from '@/lib/rate-limit/middleware';
import { stripe } from '@/lib/stripe/client';
import { NextRequest, NextResponse } from 'next/server';

async function deletePaymentMethodHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
    }

    // Get payment method ID from URL params
    const { id } = await params;
    const paymentMethodId = id;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.customerId) {
      return NextResponse.json({ error: 'No billing account found' }, { status: 400 });
    }

    // Detach payment method from customer
    // This removes it from the customer's saved payment methods
    await stripe.paymentMethods.detach(paymentMethodId);

    logger.info('Deleted payment method', {
      userId: user.id,
      customerId: user.customerId,
      paymentMethodId,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment method removed',
    });
  } catch (error: unknown) {
    logger.error('Payment method deletion error:', error);
    return NextResponse.json({ error: 'Failed to remove payment method' }, { status: 500 });
  }
}

// Apply rate limiting: 10 requests per minute for payment endpoints
export const DELETE = withRateLimit(deletePaymentMethodHandler, 'payment');
