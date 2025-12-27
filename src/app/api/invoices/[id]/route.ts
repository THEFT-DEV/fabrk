import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

/**
 * GET /api/invoices/[id]
 * Retrieves Stripe invoice URL for a payment
 * Returns the hosted invoice URL from Stripe
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if Stripe is configured
    if (!isStripeConfigured) {
      return NextResponse.json(
        { error: 'Stripe billing is not configured' },
        { status: 503 }
      );
    }

    // Fetch payment and verify ownership
    const payment = await prisma.payment.findUnique({
      where: { id },
      select: {
        userId: true,
        stripeId: true,
        status: true,
      },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Verify the payment belongs to the requesting user
    if (payment.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Only allow downloading invoices for successful payments
    if (payment.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Invoice not available for failed payments' },
        { status: 400 }
      );
    }

    // Retrieve the payment intent to get the invoice
    // The stripeId is either a payment_intent ID or checkout session ID
    let invoiceUrl: string | null = null;

    try {
      // Try as payment intent first
      if (payment.stripeId.startsWith('pi_')) {
        const paymentIntent = await stripe.paymentIntents.retrieve(payment.stripeId);

        if ((paymentIntent as unknown as { invoice?: string | null }).invoice) {
          const invoice = await stripe.invoices.retrieve(
            (paymentIntent as unknown as { invoice: string }).invoice
          );
          invoiceUrl = invoice.hosted_invoice_url || invoice.invoice_pdf || null;
        }
      }
      // Try as checkout session
      else if (payment.stripeId.startsWith('cs_')) {
        const checkoutSession = await stripe.checkout.sessions.retrieve(payment.stripeId);

        if (checkoutSession.invoice) {
          const invoice = await stripe.invoices.retrieve(checkoutSession.invoice as string);
          invoiceUrl = invoice.hosted_invoice_url || invoice.invoice_pdf || null;
        } else if (checkoutSession.payment_intent) {
          // Get payment intent from checkout session
          const paymentIntent = await stripe.paymentIntents.retrieve(
            checkoutSession.payment_intent as string
          );

          if ((paymentIntent as unknown as { invoice?: string | null }).invoice) {
            const invoice = await stripe.invoices.retrieve(
              (paymentIntent as unknown as { invoice: string }).invoice
            );
            invoiceUrl = invoice.hosted_invoice_url || invoice.invoice_pdf || null;
          }
        }
      }

      if (!invoiceUrl) {
        return NextResponse.json(
          { error: 'Invoice URL not available for this payment' },
          { status: 404 }
        );
      }

      return NextResponse.json({ url: invoiceUrl }, { status: 200 });
    } catch (stripeError: unknown) {
      logger.error('Stripe API error:', stripeError);
      return NextResponse.json(
        { error: 'Failed to retrieve invoice from Stripe' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    logger.error('Invoice retrieval error:', error);
    return NextResponse.json({ error: 'Failed to retrieve invoice' }, { status: 500 });
  }
}
