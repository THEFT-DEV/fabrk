import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
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
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { InvoicesClient } from './invoices-client';
import { mode } from '@/design-system';

export const metadata = {
  title: 'Invoices | Fabrk',
  description: 'View and download your payment invoices and receipts',
};

export default async function InvoicesPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  // Fetch user's payments from database
  const payments = await prisma.payment.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50, // Show last 50 payments
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <Badge variant="default">Paid</Badge>;
      case 'failed':
        return <Badge variant="outline">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
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

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/billing">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Billing
          </Button>
        </Link>
        <h1 className="mb-2 text-4xl font-semibold tracking-tight">Invoices & Receipts</h1>
        <p className="text-muted-foreground text-sm">View and download your payment history</p>
      </div>

      {/* Invoices Table */}
      {payments.length === 0 ? (
        <Card>
          <CardContent className="space-y-4 pt-6 text-center">
            <FileText className="text-muted-foreground mx-auto h-12 w-12" />
            <div>
              <h3 className="mb-1 font-semibold">No invoices yet</h3>
              <p className="text-muted-foreground text-sm">
                Your payment history will appear here once you make a purchase
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader
            code="0x00"
            title="PAYMENT HISTORY"
            meta={`${payments.length} transaction${payments.length !== 1 ? 's' : ''}`}
          />
          <CardContent>
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
                      <InvoicesClient paymentId={payment.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Information Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader code="0xF0" title="INVOICE DETAILS" icon={<FileText className="h-4 w-4" />} />
          <CardContent className="text-muted-foreground space-y-2 text-sm">
            <p>Each invoice includes:</p>
            <ul className="ml-2 list-inside list-disc space-y-1">
              <li>Transaction date and amount</li>
              <li>Payment method used</li>
              <li>Invoice number for records</li>
              <li>Billing information</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            code="0xF1"
            title="EMAIL RECEIPTS"
            icon={<CheckCircle2 className="h-4 w-4" />}
          />
          <CardContent className="text-muted-foreground text-sm">
            <p>
              We automatically send email receipts for all successful payments. Check your inbox at{' '}
              <strong>{session.user.email}</strong> for copies of your receipts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
