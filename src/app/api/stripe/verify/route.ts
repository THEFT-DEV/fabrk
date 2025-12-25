/**
 * @swagger
 * /api/stripe/verify:
 *   get:
 *     summary: Verify Stripe checkout session
 *     description: |
 *       Verifies a completed Stripe checkout session and returns purchase details.
 *       Used on the success page after Stripe redirects the customer back.
 *
 *       **Flow:**
 *       1. Customer completes payment on Stripe checkout
 *       2. Stripe redirects to success_url with session_id parameter
 *       3. Frontend calls this endpoint with session_id
 *       4. Returns license key and download details
 *
 *       **Note:** If webhook hasn't processed yet (status 202), customer should
 *       check their email or retry in a few moments.
 *     tags:
 *       - Payments
 *       - Stripe
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Stripe checkout session ID from redirect
 *         example: cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
 *     responses:
 *       200:
 *         description: Purchase verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 licenseKey:
 *                   type: string
 *                   example: XXXXX-XXXXX-XXXXX-XXXXX
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: customer@example.com
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 downloadUrl:
 *                   type: string
 *                   format: uri
 *                   example: https://fabrk.dev/api/download?key=XXXXX-XXXXX-XXXXX-XXXXX
 *                 purchaseDate:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   example: active
 *       202:
 *         description: Purchase being processed (webhook not received yet)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Purchase not found
 *                 message:
 *                   type: string
 *                   example: Your purchase is being processed. Please check your email for details.
 *       400:
 *         description: Invalid session ID or payment not completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid session ID
 *                 details:
 *                   type: object
 *       404:
 *         description: Session not found in Stripe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Session not found
 *       500:
 *         description: Verification failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Verification failed
 *                 message:
 *                   type: string
 *                   example: Unable to verify purchase. Please contact support.
 *     x-codeSamples:
 *       - lang: JavaScript
 *         source: |
 *           // Get session_id from URL params
 *           const params = new URLSearchParams(window.location.search);
 *           const sessionId = params.get('session_id');
 *
 *           // Verify purchase
 *           const response = await fetch(`/api/stripe/verify?session_id=${sessionId}`);
 *           const data = await response.json();
 *
 *           if (response.ok) {
 *             // Access license key: data.licenseKey
 *             // Access download URL: data.downloadUrl
 *           }
 *       - lang: curl
 *         source: |
 *           curl "https://fabrk.dev/api/stripe/verify?session_id=cs_test_abc123"
 */

/**
 * ✅ FABRK COMPONENT
 * Stripe Purchase Verification
 * Production-ready ✓
 * Full error handling ✓
 */

import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { stripe, isStripeConfigured } from '@/lib/stripe/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema
const verifySchema = z.object({
  session_id: z.string().min(1),
});

/**
 * GET /api/stripe/verify
 * Verify Stripe checkout session and return purchase details
 */
export async function GET(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!isStripeConfigured) {
      return NextResponse.json(
        {
          error: 'Stripe billing is not configured',
          message: 'This endpoint is only available when using Stripe for payments',
        },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    // Validate input
    const validationResult = verifySchema.safeParse({ session_id: sessionId });
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid session ID',
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId!, {
      expand: ['customer', 'payment_intent'],
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }

    // Get customer email
    const customerEmail = session.customer_email || session.customer_details?.email;

    if (!customerEmail) {
      return NextResponse.json({ error: 'Customer email not found' }, { status: 400 });
    }

    // Find payment in database
    const payment = await prisma.payment.findFirst({
      where: {
        stripeId: sessionId!,
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
            licenseKey: true,
          },
        },
      },
    });

    if (!payment) {
      // Payment might not be processed yet by webhook
      return NextResponse.json(
        {
          error: 'Payment not found',
          message: 'Your purchase is being processed. Please check your email for details.',
        },
        { status: 202 }
      );
    }

    // Return payment details
    return NextResponse.json({
      licenseKey: payment.user.licenseKey || '',
      email: payment.user.email,
      name: payment.user.name || '',
      downloadUrl: payment.user.licenseKey
        ? `${process.env.NEXT_PUBLIC_APP_URL}/api/download?key=${payment.user.licenseKey}`
        : '',
      purchaseDate: payment.createdAt,
      status: payment.status,
    });
  } catch (error: unknown) {
    logger.error('Verification error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        error: 'Verification failed',
        message: 'Unable to verify purchase. Please contact support.',
      },
      { status: 500 }
    );
  }
}
