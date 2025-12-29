/**
 * Purchase Success Page
 * Shows after successful Stripe checkout
 * Works for both authenticated and guest purchases
 */

'use client';

import { CheckCircle, Download, Mail, FileDown, Package } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    if (!sessionId) {
      toast.error('Session ID not found. Please contact support.');
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch('/api/resend-purchase-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Email Sent!', {
          description: 'Check your inbox - the confirmation email has been resent.',
        });
      } else {
        toast.error('Failed to Send', {
          description: data.error || 'Please try again or contact support.',
        });
      }
    } catch {
      toast.error('Error', {
        description: 'Failed to resend email. Please try again later.',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="space-y-6 p-8" padding="lg">
          {/* Success Icon & Header */}
          <div className="space-y-4 text-center">
            <div
              className={cn(
                'bg-primary mx-auto flex size-20 items-center justify-center',
                mode.radius
              )}
            >
              <CheckCircle className="text-primary-foreground size-12" />
            </div>
            <h1 className={cn('text-4xl font-semibold', mode.font)}>PURCHASE SUCCESSFUL</h1>
            <p className={cn('text-muted-foreground text-sm', mode.font)}>
              Thank you for your purchase. Your payment has been processed successfully.
            </p>
          </div>

          {/* Check your email banner */}
          <Card>
            <CardHeader code="0x01" title="CHECK YOUR EMAIL" icon={<Mail className="size-4" />} />
            <CardContent padding="md">
              <p className={cn('text-muted-foreground text-xs', mode.font)}>
                We've sent you a confirmation email with a magic link to instantly access your
                dashboard - no password needed!
              </p>
            </CardContent>
          </Card>

          {/* What's in the email */}
          <Card>
            <CardHeader code="0x02" title="EMAIL CONTENTS" icon={<Package className="size-4" />} />
            <CardContent padding="md">
              <ul className={cn('text-muted-foreground space-y-4 text-xs', mode.font)}>
                <li className="flex items-start gap-4">
                  <span
                    className={cn(
                      'bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center text-sm font-medium',
                      mode.radius
                    )}
                  >
                    1
                  </span>
                  <span>
                    <strong className="text-foreground">GITHUB REPOSITORY ACCESS</strong> - You've
                    been invited to the private Fabrk repository
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span
                    className={cn(
                      'bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center text-sm font-medium',
                      mode.radius
                    )}
                  >
                    2
                  </span>
                  <span>
                    <strong className="text-foreground">MAGIC LINK</strong> - Click to instantly
                    access your dashboard (valid for 7 days)
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span
                    className={cn(
                      'bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center text-sm font-medium',
                      mode.radius
                    )}
                  >
                    3
                  </span>
                  <span>
                    <strong className="text-foreground">GETTING STARTED GUIDE</strong> - Next steps
                    to clone and use your boilerplate
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* GitHub Access */}
          <Card>
            <CardHeader
              code="0x03"
              title="ACCESS YOUR REPOSITORY"
              icon={<Download className="size-4" />}
            />
            <CardContent padding="md">
              <div className="space-y-4">
                <p className={cn('text-muted-foreground text-xs', mode.font)}>
                  Check your email for the GitHub invitation. Once accepted, you'll have full access
                  to clone and download the boilerplate.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Button asChild size="lg" className="w-full text-xs">
                    <a
                      href="https://github.com/notifications"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 size-4" />
                      &gt; CHECK GITHUB
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full text-xs">
                    <a href="/docs/getting-started" target="_blank" rel="noopener noreferrer">
                      <FileDown className="mr-2 size-4" />
                      &gt; VIEW DOCS
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email not received */}
          <div className="py-4 text-center">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              Didn't receive the email? Check your spam folder.
            </p>
            {!isResending ? (
              <Button onClick={handleResendEmail} variant="link" size="sm" className="text-xs">
                &gt; CLICK TO RESEND
              </Button>
            ) : (
              <div
                className={cn(
                  'text-muted-foreground inline-flex items-center gap-2 text-xs',
                  mode.font
                )}
              >
                <div
                  className={cn(
                    'border-primary size-4 animate-spin border-2 border-t-transparent',
                    mode.radius
                  )}
                />
                <span>SENDING EMAIL...</span>
              </div>
            )}
          </div>

          {/* Alternative action */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="outline" size="lg" className="flex-1 text-xs">
              <Link href="/">&gt; RETURN HOME</Link>
            </Button>
          </div>

          {/* Support section */}
          <div className="border-border border-t pt-4 text-center">
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              [HELP]:{' '}
              <Link href="/support" className="text-primary hover:underline">
                CONTACT SUPPORT
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div
          className={cn(
            'bg-background flex min-h-screen items-center justify-center text-xs',
            mode.font
          )}
        >
          LOADING...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
