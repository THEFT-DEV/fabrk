'use client';

/**
 * Payment Methods Page
 * Manage payment methods and billing information
 */

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { CreditCard, Plus, Trash2, CheckCircle2, ArrowLeft, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export default function PaymentMethodsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { error: showError, success } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState<string | null>(null);

  // Payment methods list - initially empty
  // In a full implementation, fetch from GET /api/stripe/payment-methods endpoint
  // which would call stripe.paymentMethods.list({ customer: customerId })
  const [paymentMethods] = useState<
    Array<{
      id: string;
      type: string;
      brand: string;
      last4: string;
      expMonth: number;
      expYear: number;
      isDefault: boolean;
    }>
  >([]);

  const handleAddPaymentMethod = async () => {
    setIsLoading(true);
    try {
      // Create Stripe Checkout session in setup mode
      const response = await fetch('/api/stripe/setup-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create setup intent');
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error: unknown) {
      showError('Error', error instanceof Error ? error.message : 'Failed to add payment method');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      // Update default payment method via Stripe API
      const response = await fetch('/api/stripe/payment-methods/default', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId: id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to set default payment method');
      }

      success('Success', 'Default payment method updated successfully');

      // Reload to update UI
      window.location.reload();
    } catch (error: unknown) {
      showError(
        'Error',
        error instanceof Error ? error.message : 'Failed to set default payment method'
      );
    }
  };

  const confirmDelete = async () => {
    if (!methodToDelete) return;

    setDeleteDialogOpen(false);

    try {
      // Detach payment method from customer
      const response = await fetch(`/api/stripe/payment-methods/${methodToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete payment method');
      }

      success('Success', 'Payment method removed successfully');

      // Reload to update UI
      window.location.reload();
    } catch (error: unknown) {
      showError(
        'Error',
        error instanceof Error ? error.message : 'Failed to delete payment method'
      );
    } finally {
      setMethodToDelete(null);
    }
  };

  const getCardIcon = () => {
    // In real implementation, use actual card brand icons
    return <CreditCard className="h-6 w-6" />;
  };

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/billing">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            &gt; BACK TO BILLING
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-semibold tracking-tight">Payment Methods</h1>
            <p className="text-muted-foreground text-sm">
              Manage your payment methods and billing information
            </p>
          </div>
          <Button onClick={handleAddPaymentMethod} disabled={isLoading}>
            <Plus className="mr-2 h-4 w-4" />
            &gt; ADD PAYMENT METHOD
          </Button>
        </div>
      </div>

      {/* Security Notice */}
      <Alert className="mb-6">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          All payment information is securely processed by Stripe. We never store your complete card
          details.
        </AlertDescription>
      </Alert>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <Card>
            <CardContent className="space-y-4 pt-6 text-center">
              <CreditCard className="text-muted-foreground mx-auto h-12 w-12" />
              <div>
                <h3 className="mb-1 font-semibold">No payment methods</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Add a payment method to subscribe to plans and make purchases
                </p>
                <Button onClick={handleAddPaymentMethod}>
                  <Plus className="mr-2 h-4 w-4" />
                  &gt; ADD PAYMENT METHOD
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          paymentMethods.map((method, index) => (
            <Card key={method.id}>
              <CardHeader
                code={`0x${index.toString(16).padStart(2, '0')}`}
                title={`${method.brand.toUpperCase()} •••• ${method.last4}`}
              />
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={cn('bg-primary/10 border-border border p-4', mode.radius)}>
                      {getCardIcon()}
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="default" className="text-xs">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Expires {method.expMonth}/{method.expYear}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        &gt; SET AS DEFAULT
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setMethodToDelete(method.id);
                        setDeleteDialogOpen(true);
                      }}
                      disabled={method.isDefault && paymentMethods.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Information Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader code="0xF0" title="SECURE PROCESSING" icon={<Shield className="h-4 w-4" />} />
          <CardContent className="text-muted-foreground text-sm">
            All payments are processed securely through Stripe. Your payment information is
            encrypted and we never have access to your full card details.
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            code="0xF1"
            title="AUTOMATIC BILLING"
            icon={<CreditCard className="h-4 w-4" />}
          />
          <CardContent className="text-muted-foreground text-sm">
            Your default payment method will be charged automatically for subscriptions and
            recurring payments. You'll receive a receipt after each transaction.
          </CardContent>
        </Card>
      </div>

      {/* Delete Payment Method Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Payment Method?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this payment method from your account. You can add it
              again later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              &gt; REMOVE PAYMENT METHOD
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
