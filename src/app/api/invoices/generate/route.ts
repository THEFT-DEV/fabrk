/**
 * @swagger
 * /api/invoices/generate:
 *   post:
 *     summary: Generate and download invoice PDF
 *     description: |
 *       Generates an invoice PDF for a specific payment. This endpoint supports
 *       two approaches:
 *       1. Redirect to Stripe's hosted invoice URL (default)
 *       2. Generate custom PDF with business branding (requires @react-pdf/renderer)
 *
 *       **Flow:**
 *       1. User clicks "Download" on an invoice
 *       2. Frontend calls this endpoint with paymentId
 *       3. Server retrieves payment and Stripe invoice data
 *       4. Returns invoice URL or PDF blob
 *       5. User downloads or views the invoice
 *
 *       **Features:**
 *       - Validates payment belongs to user
 *       - Only successful payments can generate invoices
 *       - Includes transaction details, billing info, and line items
 *       - PDF format for easy printing and archiving
 *     tags:
 *       - Invoices
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentId
 *             properties:
 *               paymentId:
 *                 type: string
 *                 example: pay_1234567890abcdef
 *                 description: Payment ID from database
 *               format:
 *                 type: string
 *                 enum: [url, pdf]
 *                 default: url
 *                 description: Return format - 'url' for Stripe hosted, 'pdf' for custom PDF
 *     responses:
 *       200:
 *         description: Invoice generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 invoiceUrl:
 *                   type: string
 *                   format: uri
 *                   example: https://invoice.stripe.com/i/acct_123/invst_456
 *                   description: Stripe-hosted invoice URL (format=url)
 *                 invoice:
 *                   type: object
 *                   description: Invoice data for PDF generation (format=pdf)
 *                   properties:
 *                     number:
 *                       type: string
 *                       example: INV-001
 *                     date:
 *                       type: string
 *                       format: date
 *                     amount:
 *                       type: number
 *                       example: 29900
 *                     customer:
 *                       type: object
 *       400:
 *         description: Invalid payment ID or payment not successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Payment ID is required
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
 *       403:
 *         description: Payment does not belong to user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access denied
 *       404:
 *         description: Payment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Payment not found
 *       500:
 *         description: Failed to generate invoice
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to generate invoice
 *     x-codeSamples:
 *       - lang: JavaScript
 *         source: |
 *           // Get Stripe hosted invoice URL
 *           const response = await fetch('/api/invoices/generate', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               paymentId: 'pay_1234567890',
 *               format: 'url'
 *             })
 *           });
 *
 *           const { invoiceUrl } = await response.json();
 *           window.open(invoiceUrl, '_blank');
 *       - lang: curl
 *         source: |
 *           curl -X POST https://fabrk.dev/api/invoices/generate \
 *             -H "Content-Type: application/json" \
 *             -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
 *             -d '{"paymentId": "pay_1234567890", "format": "url"}'
 */

/**
 * ✅ FABRK API ROUTE
 * Invoice Generation
 * Generates invoice PDFs or returns Stripe-hosted invoice URLs
 */

import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { withRateLimit } from '@/lib/rate-limit/middleware';
import { stripe } from '@/lib/stripe/client';
import { NextRequest, NextResponse } from 'next/server';

async function generateInvoiceHandler(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { paymentId, format = 'url' } = body as {
      paymentId?: string;
      format?: 'url' | 'pdf';
    };

    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get payment from database
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Verify payment belongs to user
    if (payment.userId !== user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Only generate invoices for successful payments
    if (payment.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Invoice only available for successful payments' },
        { status: 400 }
      );
    }

    // Approach 1: Return Stripe-hosted invoice URL (default)
    if (format === 'url') {
      try {
        // Retrieve the payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(payment.stripeId);

        // Get the invoice if one exists
        const piWithInvoice = paymentIntent as unknown as {
          invoice?: string | null;
        };
        if (piWithInvoice.invoice && typeof piWithInvoice.invoice === 'string') {
          const invoice = await stripe.invoices.retrieve(piWithInvoice.invoice);

          if (invoice.hosted_invoice_url) {
            logger.info('Generated invoice URL', {
              userId: user.id,
              paymentId,
              invoiceId: invoice.id,
            });

            return NextResponse.json({
              invoiceUrl: invoice.hosted_invoice_url,
              invoicePdfUrl: invoice.invoice_pdf,
            });
          }
        }

        // If no invoice exists, return payment receipt URL or generate custom invoice data
        logger.warn('No Stripe invoice found for payment', {
          paymentId,
          stripeId: payment.stripeId,
        });
      } catch (stripeError: unknown) {
        logger.error('Stripe invoice retrieval error:', stripeError);
        // Continue to custom invoice generation
      }
    }

    // Approach 2: Generate custom invoice data for PDF rendering
    // Frontend can use this data with @react-pdf/renderer or similar
    const invoiceData = {
      number: `INV-${payment.id.slice(-8).toUpperCase()}`,
      date: payment.createdAt,
      dueDate: payment.createdAt, // One-time payments have same date
      status: payment.status,
      customer: {
        name: user.name || user.email,
        email: user.email,
      },
      items: [
        {
          description: payment.productId || 'One-time purchase',
          quantity: 1,
          unitPrice: payment.amount,
          total: payment.amount,
        },
      ],
      subtotal: payment.amount,
      tax: 0, // Add tax calculation if applicable
      total: payment.amount,
      currency: 'USD',
      paymentMethod: 'Card',
      transactionId: payment.stripeId,
    };

    logger.info('Generated custom invoice data', {
      userId: user.id,
      paymentId,
      invoiceNumber: invoiceData.number,
    });

    return NextResponse.json({ invoice: invoiceData });
  } catch (error: unknown) {
    logger.error('Invoice generation error:', error);
    return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 });
  }
}

// Apply rate limiting: 100 requests per minute for API endpoints
export const POST = withRateLimit(generateInvoiceHandler, 'api');
