/**
 * Stripe Checkout Idempotency
 * Prevents duplicate charges on refresh/retry
 */

import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

/**
 * Generate a unique idempotency key for checkout session
 */
export function generateCheckoutIdempotencyKey(userId: string | null, priceId: string): string {
  const timestamp = Date.now();
  const random = crypto.randomBytes(8).toString('hex');
  const userPart = userId || 'guest';
  return `checkout_${userPart}_${priceId}_${timestamp}_${random}`;
}

/**
 * Check if an idempotency key was already used
 */
export async function getExistingCheckoutSession(idempotencyKey: string): Promise<string | null> {
  const record = await prisma.checkoutSession.findUnique({
    where: { sessionId: idempotencyKey },
    select: { sessionId: true },
  });

  return record?.sessionId || null;
}

/**
 * Store checkout session idempotency record
 */
export async function storeCheckoutIdempotency(
  idempotencyKey: string,
  userId: string | null,
  sessionId: string,
  priceId: string
): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

  await prisma.checkoutSession.create({
    data: {
      userId: userId || 'guest',
      sessionId,
      priceId,
      expiresAt,
    },
  });
}

/**
 * Check if a webhook event has already been processed
 */
export async function isWebhookEventProcessed(eventId: string): Promise<boolean> {
  const record = await prisma.webhookEvent.findUnique({
    where: { eventId },
  });
  return record !== null;
}

/**
 * Mark a webhook event as processed
 */
export async function markWebhookEventProcessed(eventId: string): Promise<void> {
  await prisma.webhookEvent.create({
    data: { eventId, processed: new Date() },
  });
}
