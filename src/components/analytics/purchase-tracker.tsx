'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

interface PurchaseTrackerProps {
  /** Product value in USD (e.g., 149 for $149) */
  value: number;
  /** Currency code */
  currency?: string;
  /** Product name */
  itemName?: string;
}

/**
 * Tracks purchase conversions in GA4 via GTM dataLayer
 * Place this component on your purchase success page
 */
export function PurchaseTracker({
  value,
  currency = 'USD',
  itemName = 'Fabrk Boilerplate',
}: PurchaseTrackerProps) {
  const searchParams = useSearchParams();
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per page load
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Get checkout ID from URL (Polar appends this)
    const checkoutId = searchParams.get('checkout_id');

    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];

    // Push purchase event to dataLayer
    window.dataLayer.push({
      event: 'purchase',
      ecommerce: {
        transaction_id: checkoutId || `txn_${Date.now()}`,
        value: value,
        currency: currency,
        items: [
          {
            item_name: itemName,
            price: value,
            quantity: 1,
          },
        ],
      },
    });

    // Analytics event tracked via gtag
  }, [searchParams, value, currency, itemName]);

  // This component renders nothing
  return null;
}
