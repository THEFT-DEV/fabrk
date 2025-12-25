/**
 * Organization Invoices API Route
 * GET - Fetch organization's Stripe invoices
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isOrganizationMember } from '@/lib/teams/organizations';
import { prisma } from '@/lib/prisma';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { logger } from '@/lib/logger';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is a member
    const isMember = await isOrganizationMember(id, session.user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: 'You are not a member of this organization' },
        { status: 403 }
      );
    }

    // Check if Stripe is configured
    if (!isStripeConfigured) {
      return NextResponse.json({ invoices: [] }, { status: 200 });
    }

    // Fetch organization
    const organization = await prisma.organization.findUnique({
      where: { id },
      select: { customerId: true },
    });

    if (!organization?.customerId) {
      return NextResponse.json({ invoices: [] }, { status: 200 });
    }

    // Fetch invoices from Stripe
    const invoices = await stripe.invoices.list({
      customer: organization.customerId,
      limit: 12, // Last 12 invoices
    });

    return NextResponse.json({
      invoices: invoices.data.map((invoice) => ({
        id: invoice.id,
        amount: invoice.amount_paid,
        status: invoice.status,
        created: new Date(invoice.created * 1000).toISOString(),
        invoicePdf: invoice.invoice_pdf,
      })),
    });
  } catch (error: unknown) {
    logger.error('Failed to fetch invoices:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}
