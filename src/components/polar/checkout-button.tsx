'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

interface PolarCheckoutButtonProps {
  customerEmail?: string;
  className?: string;
  children?: React.ReactNode;
  /** Optional Polar discount ID to apply at checkout (defaults to env var) */
  discountId?: string;
  /** Skip auto-applying the early bird discount */
  skipDiscount?: boolean;
}

export function PolarCheckoutButton({
  customerEmail,
  className,
  children = '> GET FABRK - $199',
  discountId,
  skipDiscount = false,
}: PolarCheckoutButtonProps) {
  // Auto-apply early bird discount from env if not explicitly provided
  const effectiveDiscountId = skipDiscount
    ? undefined
    : (discountId || process.env.NEXT_PUBLIC_POLAR_DISCOUNT_ID);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    // Track begin_checkout event in GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'USD',
        value: 199,
        items: [
          {
            item_name: 'Fabrk Boilerplate',
            price: 199,
            quantity: 1,
          },
        ],
      },
    });

    try {
      const response = await fetch('/api/polar/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail,
          discountId: effectiveDiscountId,
          metadata: {
            timestamp: new Date().toISOString(),
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'Failed to create checkout');
      }

      // Redirect to Polar.sh checkout
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to start checkout');
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={isLoading} className={className}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading checkout...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
