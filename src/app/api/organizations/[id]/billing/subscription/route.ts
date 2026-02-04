/**
 * Organization Subscription API Route
 * GET - Fetch organization's Stripe subscription details
 * POST - Create or update subscription
 * DELETE - Cancel subscription
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { withCsrfProtection } from '@/lib/security/csrf';
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

    // Check if Stripe is configured
    if (!isStripeConfigured) {
      return NextResponse.json({ subscription: null }, { status: 200 });
    }

    // Verify user is a member
    const isMember = await isOrganizationMember(id, session.user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: 'You are not a member of this organization' },
        { status: 403 }
      );
    }

    // Fetch organization
    const organization = await prisma.organization.findUnique({
      where: { id },
      select: { subscriptionId: true },
    });

    if (!organization?.subscriptionId) {
      return NextResponse.json({ subscription: null }, { status: 200 });
    }

    // Fetch subscription from Stripe
    const subscription = await stripe.subscriptions.retrieve(organization.subscriptionId);
    const price = subscription.items.data[0]?.price;

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        plan: {
          name: price?.nickname || 'Unknown Plan',
          amount: price?.unit_amount || 0,
          interval: price?.recurring?.interval || 'month',
        },
        currentPeriodEnd: new Date(
          (subscription as unknown as { current_period_end: number }).current_period_end * 1000
        ).toISOString(),
        cancelAtPeriodEnd: (subscription as unknown as { cancel_at_period_end: boolean })
          .cancel_at_period_end,
      },
    });
  } catch (error: unknown) {
    logger.error('Failed to fetch subscription:', error);
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
  }
}

export const POST = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if Stripe is configured
    if (!isStripeConfigured) {
      return NextResponse.json(
        { error: 'Stripe billing is not configured' },
        { status: 503 }
      );
    }

    // Verify user is a member
    const isMember = await isOrganizationMember(id, session.user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: 'You are not a member of this organization' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // Fetch organization
    const organization = await prisma.organization.findUnique({
      where: { id },
      select: { customerId: true, subscriptionId: true },
    });

    if (!organization?.customerId) {
      return NextResponse.json({ error: 'Organization customer not found' }, { status: 404 });
    }

    // Create new subscription
    const subscription = await stripe.subscriptions.create({
      customer: organization.customerId,
      items: [{ price: priceId }],
    });

    // Update organization with subscription ID
    await prisma.organization.update({
      where: { id },
      data: { subscriptionId: subscription.id },
    });

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
      },
    });
  } catch (error: unknown) {
    logger.error('Failed to create subscription:', error);
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
});

export const DELETE = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if Stripe is configured
    if (!isStripeConfigured) {
      return NextResponse.json(
        { error: 'Stripe billing is not configured' },
        { status: 503 }
      );
    }

    // Verify user is a member
    const isMember = await isOrganizationMember(id, session.user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: 'You are not a member of this organization' },
        { status: 403 }
      );
    }

    // Fetch organization
    const organization = await prisma.organization.findUnique({
      where: { id },
      select: { subscriptionId: true },
    });

    if (!organization?.subscriptionId) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    // Cancel subscription
    await stripe.subscriptions.cancel(organization.subscriptionId);

    // Update organization to remove subscription ID
    await prisma.organization.update({
      where: { id },
      data: { subscriptionId: null },
    });

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully',
    });
  } catch (error: unknown) {
    logger.error('Failed to cancel subscription:', error);
    return NextResponse.json({ error: 'Failed to cancel subscription' }, { status: 500 });
  }
});
