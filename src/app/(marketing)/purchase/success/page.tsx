import { Suspense } from 'react';
import { CheckCircle, Download, Mail, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PurchaseTracker } from '@/components/analytics/purchase-tracker';
import Link from 'next/link';

export const metadata = {
  title: 'Purchase Successful - Fabrk',
  description: 'Thank you for purchasing Fabrk!',
};

export default function PurchaseSuccessPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6">
      {/* Track purchase conversion in GA4 */}
      <Suspense fallback={null}>
        <PurchaseTracker value={149} itemName="Fabrk Boilerplate" />
      </Suspense>
      <div className="w-full max-w-2xl">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <Card className="w-fit border-success/20 bg-success/5">
            <CardContent className="p-6">
              <CheckCircle className="text-success h-16 w-16" />
            </CardContent>
          </Card>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-semibold uppercase tracking-tight">
            [SUCCESS] WELCOME TO FABRK
          </h1>
          <p className="text-muted-foreground text-base">
            Purchase confirmed. Check your email for download instructions.
          </p>
        </div>

        {/* What's Next */}
        <Card className="mb-8">
          <CardHeader code="0x01" title="NEXT STEPS" />
          <CardContent className="space-y-6">
            {/* Email */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="bg-primary/10 rounded-none p-4">
                  <Mail className="text-primary h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-sm font-semibold uppercase">[1] CHECK YOUR EMAIL</h3>
                <p className="text-muted-foreground text-sm">
                  Order confirmation sent from Polar.sh. Click the "Access my purchase" button to
                  view your benefits. Check spam if not received within 5 minutes.
                </p>
              </div>
            </div>

            {/* Access Portal */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="bg-primary/10 rounded-none p-4">
                  <Github className="text-primary h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-sm font-semibold uppercase">
                  [2] ACCESS GITHUB REPOSITORY
                </h3>
                <p className="text-muted-foreground text-sm">
                  In the customer portal, click "Go to THEFT-DEV/fabrk" under Benefit Grants.
                  Access is instant - you'll be added as a collaborator immediately.
                </p>
              </div>
            </div>

            {/* Clone & Build */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="bg-primary/10 rounded-none p-4">
                  <Download className="text-primary h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-sm font-semibold uppercase">[3] CLONE & BUILD</h3>
                <p className="text-muted-foreground text-sm">
                  Clone the repository, run{' '}
                  <code className="bg-muted rounded-none px-2 py-1 text-xs">npm install</code> and{' '}
                  <code className="bg-muted rounded-none px-2 py-1 text-xs">npm run dev</code>.
                  Complete setup guide in{' '}
                  <code className="bg-muted rounded-none px-2 py-1 text-xs">README.md</code>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Need Help */}
        <Card className="mb-8 bg-muted/50">
          <CardHeader code="0x02" title="NEED HELP?" />
          <CardContent>
            <p className="text-muted-foreground mb-4 text-center text-sm">
              Check documentation in download or reach out with questions.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline" size="sm" className="uppercase">
                <Link href="mailto:support@fabrk.dev">&gt; EMAIL SUPPORT</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="uppercase">
                <Link href="/#faq">&gt; VIEW FAQ</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
