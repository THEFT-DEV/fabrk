/**
 * ✅ FABRK COMPONENT
 * Polar.sh Integration Guide
 * Uses LibraryGuideTemplate for consistent structure
 */
import { CreditCard } from 'lucide-react';
import { LibraryGuideTemplate, LibraryCodeBlock } from '@/components/library';

export default function PolarIntegrationPage() {
  return (
    <LibraryGuideTemplate
      breadcrumbs={[{ label: 'Docs', href: '/library/docs' }, { label: 'Polar Integration' }]}
      icon={CreditCard}
      badgePrefix="INTEGRATION"
      badge="POLAR_PAYMENTS"
      title="Polar.sh Integration"
      description="Add subscription management and payments to billing templates."
      meta={{ time: '~15 minutes', level: 'Intermediate' }}
      overview={{
        text: 'Fabrk uses Polar.sh for subscription billing. Configure it to enable the Billing Dashboard and Pricing Page templates.',
        highlights: [
          'Checkout session creation',
          'Subscription management',
          'Webhook handling for payment events',
          'Customer portal integration',
        ],
      }}
      steps={[
        {
          code: '0x01',
          title: 'ENVIRONMENT VARIABLES',
          content: (
            <LibraryCodeBlock
              code={`# .env.local
POLAR_ACCESS_TOKEN="your-polar-access-token"
POLAR_WEBHOOK_SECRET="your-webhook-secret"
NEXT_PUBLIC_POLAR_ORGANIZATION_ID="your-org-id"`}
              language="bash"
              maxHeight="120px"
            />
          ),
        },
        {
          code: '0x02',
          title: 'CREATE CHECKOUT SESSION',
          content: (
            <LibraryCodeBlock
              code={`// app/api/polar/checkout/route.ts
import { polar } from "@/lib/polar";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { priceId } = await req.json();

  const checkout = await polar.checkouts.create({
    priceId,
    customerEmail: session.user.email,
    successUrl: \`\${process.env.NEXT_PUBLIC_URL}/billing?success=true\`,
  });

  return Response.json({ url: checkout.url });
}`}
              language="typescript"
              maxHeight="350px"
            />
          ),
        },
        {
          code: '0x03',
          title: 'WEBHOOK HANDLER',
          content: (
            <>
              <p>
                Handle subscription events in{' '}
                <code className="bg-muted px-1">app/api/webhooks/polar/route.ts</code>
              </p>
              <LibraryCodeBlock
                code={`import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const event = await req.json();

  if (event.type === "checkout.completed") {
    await prisma.payment.create({
      data: {
        userId: event.data.customerId,
        amount: event.data.amount,
        status: "completed",
      },
    });
  }

  return Response.json({ received: true });
}`}
                language="typescript"
                maxHeight="300px"
              />
            </>
          ),
        },
      ]}
      relatedLinks={[
        {
          label: 'Add Resend',
          href: '/library/docs/integration/resend',
          description: 'to send payment confirmation emails',
        },
        {
          label: 'View Billing Dashboard template',
          href: '/library/billing-dashboard',
          description: '',
        },
      ]}
    />
  );
}
