'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';
import { trackCheckoutStarted, trackCheckoutFailed, captureException } from '@/lib/analytics/events';

interface CheckoutButtonProps {
  priceId: string;
  planName: string;
  className?: string;
  children?: React.ReactNode;
}

export function CheckoutButton({
  priceId,
  planName,
  className,
  children = '> GET STARTED',
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  async function handleCheckout() {
    // Redirect to login if not authenticated
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent('/pricing')}`);
      return;
    }

    setLoading(true);

    // Track checkout started
    trackCheckoutStarted({
      plan: planName,
      priceId: priceId,
    });

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: unknown) {
      logger.error('Checkout error', error);

      // Capture exception in PostHog (for debugging)
      captureException(error, {
        context: 'stripe_checkout',
        plan: planName,
        priceId: priceId,
      });

      // Track checkout failure
      trackCheckoutFailed({
        plan: planName,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      });

      toast.error('Failed to start checkout. Please try again.');
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      loading={loading}
      loadingText="> LOADING..."
      className={className}
      disabled={loading}
    >
      {children}
    </Button>
  );
}
