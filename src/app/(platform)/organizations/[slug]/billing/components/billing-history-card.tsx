/**
 * Billing History Card Component
 * Displays invoices table with download links
 */

import { Download, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Invoice } from './types';
import { getInvoiceStatusBadge } from './utils';

interface BillingHistoryCardProps {
  invoices: Invoice[];
}

export function BillingHistoryCard({ invoices }: BillingHistoryCardProps) {
  if (invoices.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader
        code="0x02"
        title="BILLING HISTORY"
        icon={<Receipt className="h-4 w-4" />}
        meta={`${invoices.length} INVOICES`}
      />
      <CardContent padding="lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{new Date(invoice.created).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">${(invoice.amount / 100).toFixed(2)}</TableCell>
                <TableCell>{getInvoiceStatusBadge(invoice.status)}</TableCell>
                <TableCell>
                  {invoice.invoicePdf && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={invoice.invoicePdf} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
