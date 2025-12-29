import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Webhook, Shield, RefreshCw, Bell } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Webhooks Setup - Fabrk Docs',
  description:
    'Build production webhooks with HMAC verification, automatic retries, and delivery tracking. 22 built-in event types.',
};

export default function WebhooksTutorialPage() {
  return (
    <FeatureGuideTemplate
      code="[0x50]"
      category="Tutorials"
      title="Webhooks Setup"
      description="Build a production-grade webhook system with 22 event types, HMAC-SHA256 verification, and automatic retries."
      overview="22 webhook event types across 5 categories, HMAC-SHA256 signature verification, automatic retry with exponential backoff, delivery tracking and status monitoring, per-organization webhook management."
      features={[
        {
          icon: Webhook,
          title: '22 Events',
          description: 'Event types across 5 categories.',
        },
        {
          icon: Shield,
          title: 'HMAC-SHA256',
          description: 'Signature verification for security.',
        },
        {
          icon: RefreshCw,
          title: 'Auto Retry',
          description: 'Exponential backoff on failures.',
        },
        {
          icon: Bell,
          title: 'Tracking',
          description: 'Delivery status monitoring.',
        },
      ]}
      usage={[
        {
          title: 'Triggering Webhooks',
          description: 'Use src/lib/webhooks/server.ts to trigger events',
          code: `import { triggerWebhook } from "@/lib/webhooks/server";
import { WEBHOOK EVENTS } from "@/lib/webhooks/events";

// Trigger when a member is added
await triggerWebhook(
  organizationId,
  WEBHOOK EVENTS.ORG_MEMBER_ADDED,
  {
    memberId: "mem_123",
    userId: "user_456",
    email: "newmember@example.com",
    role: "MEMBER"
  }
);`,
          language: 'typescript',
        },
        {
          title: 'HMAC Signature Verification',
          description: 'Verify webhook signatures in your receiver',
          code: `import crypto from "crypto";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("X-Webhook-Signature");

  const secret = process.env.WEBHOOK_SECRET;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const isValid = crypto.timingSafeEquals(
    Buffer.from(signature || ""),
    Buffer.from(expectedSignature)
  );

  if (!isValid) {
    return new Response("Invalid signature", { status: 401 });
  }

  const data = JSON.parse(payload);
  return new Response("OK", { status: 200 });
}`,
          language: 'typescript',
        },
        {
          title: 'Testing Webhooks',
          description: 'Use ngrok to test webhooks locally',
          code: `# Expose local server
ngrok http 3000

# Trigger a test webhook
curl -X POST http://localhost:3000/api/test-webhook \\
  -H "Content-Type: application/json" \\
  -d '{"event": "payment.succeeded"}'`,
          language: 'bash',
        },
      ]}
      previous={{
        title: 'Stripe Payments',
        href: '/docs/tutorials/stripe-payments',
      }}
      next={{ title: 'API Routes', href: '/docs/tutorials/api-routes' }}
    >
      <DocsSection title="Webhook Headers">
        <DocsCard title="HEADERS">
          <div className="space-y-1">
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Signature</code> -
              HMAC-SHA256 signature
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Event</code> - Event
              type
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Delivery-ID</code> -
              Unique delivery ID
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Retry</code> - Retry
              attempt number
            </div>
            <div>
              └─ <code className="bg-muted px-1 font-mono text-xs">User-Agent</code> -
              Fabrk-Webhooks/1.0
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Retry Schedule">
        <DocsCard title="RETRY SCHEDULE">
          <div className="space-y-1">
            <div>
              ├─ <strong>Attempt 1:</strong> Immediate
            </div>
            <div>
              ├─ <strong>Retry 1:</strong> After 1 minute
            </div>
            <div>
              ├─ <strong>Retry 2:</strong> After 5 minutes
            </div>
            <div>
              ├─ <strong>Retry 3:</strong> After 15 minutes
            </div>
            <div>
              ├─ <strong>Retry 4:</strong> After 1 hour
            </div>
            <div>
              └─ <strong>Retry 5:</strong> After 6 hours (max)
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Troubleshooting */}
      <DocsSection title="Troubleshooting">
        <DocsCard title="COMMON ERRORS">
          <div className="space-y-4">
            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Signature verification failed (401 Unauthorized)
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Verify WEBHOOK_SECRET matches between sender and receiver
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`# Generate a shared secret
openssl rand -hex 32

# Add to both sender and receiver .env.local
WEBHOOK_SECRET="your-generated-secret"

# Sender uses it to sign, receiver uses it to verify`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Webhook endpoint not receiving events
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Test webhook URL is accessible
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`# For local testing, expose with ngrok
ngrok http 3000

# Use the ngrok URL in webhook configuration
https://abc123.ngrok.io/api/webhooks/your-endpoint

# Verify endpoint responds
curl https://abc123.ngrok.io/api/webhooks/your-endpoint`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Duplicate events being processed
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Implement idempotency check using delivery ID
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`// Store processed delivery IDs
const deliveryId = request.headers.get("X-Webhook-Delivery-ID");

// Check if already processed
const existing = await prisma.webhookDelivery.findUnique({
  where: { deliveryId }
});

if (existing) {
  return new Response("Already processed", { status: 200 });
}`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Webhook timing out (504 Gateway Timeout)
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Process webhook asynchronously, respond immediately
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`// Don't process synchronously
export async function POST(request: Request) {
  // Validate signature first
  const isValid = verifySignature(request);
  if (!isValid) return new Response("Invalid", { status: 401 });

  // Queue for background processing
  await queueWebhookProcessing(request.body);

  // Respond immediately
  return new Response("OK", { status: 200 });
}`}
                </code>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/tutorials/api-routes"
            title="API Routes"
            description="Build more API endpoints"
          />
          <DocsLinkCard
            href="/docs/tutorials/stripe-payments"
            title="Stripe Payments"
            description="Trigger payment webhooks"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
