'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface InvoicesClientProps {
  paymentId: string;
}

export function InvoicesClient({ paymentId }: InvoicesClientProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/invoices/${paymentId}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch invoice');
      }

      const data = await response.json();
      const invoiceUrl = data.invoiceUrl || data.invoicePdf;

      if (!invoiceUrl) {
        throw new Error('No invoice URL available');
      }

      // Open Stripe-hosted invoice in new tab
      window.open(invoiceUrl, '_blank');
      toast.success('Opening invoice...');
    } catch (error) {
      console.error('Invoice download error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to download invoice');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleDownload} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Download className="mr-2 h-4 w-4" />
      )}
      {isLoading ? 'Opening...' : 'Download'}
    </Button>
  );
}
