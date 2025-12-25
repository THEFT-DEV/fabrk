'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mode } from '@/design-system';

interface Payment {
  id: string;
  stripeId: string | null;
  amount: number;
  status: string;
  productId: string | null;
  createdAt: Date;
}

interface InvoiceTableProps {
  payments: Payment[];
}

export function InvoiceTable({ payments }: InvoiceTableProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const { success, error } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return (
          <Badge variant="default" className="w-24 justify-center font-semibold">
            Paid
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="w-24 justify-center font-semibold">
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="w-24 justify-center font-semibold">
            Pending
          </Badge>
        );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  /**
   * Download invoice implementation using Stripe's hosted invoice URL
   *
   * APPROACH 1 (IMPLEMENTED): Stripe Hosted Invoice
   * - Simpler and recommended approach
   * - Calls /api/invoices/[id] to get hosted invoice URL from Stripe
   * - Opens Stripe's hosted invoice page in new window
   * - Stripe handles PDF generation, branding, and download
   * - No additional dependencies needed
   *
   * APPROACH 2 (ALTERNATIVE): Custom PDF Generation
   * - For customers who want custom-branded invoices
   * - Requires additional libraries: @react-pdf/renderer or puppeteer
   * - Implementation steps:
   *   1. Create /api/invoices/[id]/pdf endpoint
   *   2. Fetch payment details from database
   *   3. Generate PDF with custom template (company logo, colors, layout)
   *   4. Return PDF blob with proper headers
   *   5. Trigger browser download
   * - Example libraries:
   *   - @react-pdf/renderer: React-based PDF generation
   *   - puppeteer: HTML-to-PDF conversion (heavier)
   *   - pdfkit: Node.js PDF generation
   * - Reference: https://react-pdf.org/
   */
  const handleDownload = async (paymentId: string) => {
    setDownloadingId(paymentId);

    try {
      // Call API to get Stripe invoice URL
      const response = await fetch(`/api/invoices/${paymentId}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to retrieve invoice');
      }

      const { url } = await response.json();

      // Open Stripe's hosted invoice in new window
      // User can view and download the PDF from there
      window.open(url, '_blank', 'noopener,noreferrer');

      success('Invoice opened', 'The invoice has been opened in a new window');
    } catch (err: unknown) {
      console.error('Invoice download error:', err);
      error('Download failed', err instanceof Error ? err.message : 'Failed to download invoice');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Invoice</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{formatDate(payment.createdAt)}</TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{payment.productId || 'One-time purchase'}</p>
                <p className="text-muted-foreground text-xs">
                  Invoice #{payment.stripeId?.slice(-8)}
                </p>
              </div>
            </TableCell>
            <TableCell className={mode.font}>{formatCurrency(payment.amount)}</TableCell>
            <TableCell>{getStatusBadge(payment.status)}</TableCell>
            <TableCell className="text-right">
              {payment.status === 'succeeded' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(payment.id)}
                  disabled={downloadingId === payment.id}
                >
                  {downloadingId === payment.id ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  {downloadingId === payment.id ? 'Opening...' : 'Download'}
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
