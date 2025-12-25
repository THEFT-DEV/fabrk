import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Webhook, Shield, RefreshCw, FileText } from 'lucide-react';

export const metadata = {
  title: 'Webhooks System - Fabrk Documentation',
  description:
    'Learn how to use the production-grade webhooks system with 22 event types, HMAC verification, and automatic retries.',
};

export default function WebhooksPage() {
  return (
    <FeatureGuideTemplate
      code="[0x70]"
      category="Features"
      title="Webhooks System"
      description="Production-grade webhook system with 22 event types, HMAC-SHA256 signature verification, and automatic retry with exponential backoff."
      overview="The webhooks system allows your application to send HTTP callbacks to external services when specific events occur. This is essential for integrating with third-party services, triggering external workflows, and keeping systems in sync."
      features={[
        {
          icon: Webhook,
          title: '22 Event Types',
          description: 'User, payment, organization, and system events',
        },
        {
          icon: Shield,
          title: 'HMAC-SHA256 Verification',
          description: 'Secure signature verification for all deliveries',
        },
        {
          icon: RefreshCw,
          title: 'Automatic Retries',
          description: 'Exponential backoff with configurable retry limits',
        },
        {
          icon: FileText,
          title: 'Delivery Tracking',
          description: 'Full history of webhook deliveries and responses',
        },
      ]}
      usage={[
        {
          title: 'Creating Webhooks',
          description: 'Register a webhook endpoint to receive events',
          code: `// API Route: POST /api/v1/webhooks
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateWebhookSecret } from "@/lib/webhooks/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url, events, description } = await req.json();

  // Generate a unique secret for this webhook
  const secret = generateWebhookSecret();

  const webhook = await prisma.webhook.create({
    data: {
      url,
      events,
      description,
      secret,
      userId: session.user.id,
      isActive: true,
    },
  });

  return Response.json({
    id: webhook.id,
    url: webhook.url,
    events: webhook.events,
    secret: webhook.secret, // Show once on creation
  });
}`,
          language: 'typescript',
        },
        {
          title: 'Sending Webhooks',
          description: 'Trigger webhook deliveries from your application',
          code: `// src/lib/webhooks/server.ts
import crypto from "crypto";
import { prisma } from "@/lib/db";

export async function sendWebhook(
  event: string,
  payload: Record<string, any>,
  userId?: string
) {
  // Find all active webhooks subscribed to this event
  const webhooks = await prisma.webhook.findMany({
    where: {
      isActive: true,
      events: { has: event },
      ...(userId && { userId }),
    },
  });

  for (const webhook of webhooks) {
    await deliverWebhook(webhook, event, payload);
  }
}

async function deliverWebhook(webhook, event, payload) {
  const body = JSON.stringify({
    event,
    payload,
    timestamp: new Date().toISOString(),
  });

  // Generate HMAC signature
  const signature = crypto
    .createHmac("sha256", webhook.secret)
    .update(body)
    .digest("hex");

  const response = await fetch(webhook.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Webhook-Signature": signature,
      "X-Webhook-Event": event,
    },
    body,
  });

  // Log delivery
  await prisma.webhookDelivery.create({
    data: {
      webhookId: webhook.id,
      event,
      payload,
      statusCode: response.status,
      success: response.ok,
    },
  });
}

// Usage
await sendWebhook("user.created", {
  id: user.id,
  email: user.email,
  name: user.name,
});`,
          language: 'typescript',
        },
        {
          title: 'Verifying Webhooks (Receiver Side)',
          description: 'When receiving webhooks, always verify the signature',
          code: `// In your webhook receiver endpoint
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("X-Webhook-Signature");
  const event = req.headers.get("X-Webhook-Event");

  // Your webhook secret (stored securely)
  const secret = process.env.WEBHOOK_SECRET!;

  // Verify signature using timing-safe comparison
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  const isValid = crypto.timingSafeEquals(
    Buffer.from(signature || ""),
    Buffer.from(expectedSignature)
  );

  if (!isValid) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Process the webhook
  const data = JSON.parse(body);
  console.log(\`Received \${event}:\`, data.payload);

  return Response.json({ received: true });
}`,
          language: 'typescript',
        },
        {
          title: 'Retry Logic',
          description: 'Failed webhooks are automatically retried with exponential backoff',
          code: `// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 5,
  initialDelay: 60,    // 1 minute
  maxDelay: 3600,      // 1 hour
  backoffMultiplier: 2,
};

// Retry delays: 1min, 2min, 4min, 8min, 16min

async function queueWebhookRetry(
  webhookId: string,
  event: string,
  payload: Record<string, any>,
  attempt: number = 1
) {
  if (attempt > RETRY_CONFIG.maxRetries) {
    // Mark webhook as failed after max retries
    await prisma.webhookDelivery.update({
      where: { id: deliveryId },
      data: { status: "FAILED" },
    });
    return;
  }

  const delay = Math.min(
    RETRY_CONFIG.initialDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, attempt - 1),
    RETRY_CONFIG.maxDelay
  );

  // Schedule retry (using your job queue)
  await scheduleJob("webhook:retry", {
    webhookId,
    event,
    payload,
    attempt: attempt + 1,
  }, { delay: delay * 1000 });
}`,
          language: 'typescript',
        },
      ]}
      previous={{
        title: 'Organizations',
        href: '/docs/features/organizations',
      }}
      next={{ title: 'Magic Links', href: '/docs/features/magic-links' }}
    >
      {/* Event Types Section */}
      <DocsSection title="Event Types">
        <DocsCard title="EVENT TYPES">
          <p className="mb-4">Available webhook event types organized by category:</p>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              User Events
              <ul className="mt-2 space-y-1">
                <li>• user.created</li>
                <li>• user.updated</li>
                <li>• user.deleted</li>
                <li>• user.email verified</li>
              </ul>
            </div>
            <div>
              Payment Events
              <ul className="mt-2 space-y-1">
                <li>• payment.completed</li>
                <li>• payment.failed</li>
                <li>• subscription.created</li>
                <li>• subscription.cancelled</li>
              </ul>
            </div>
            <div>
              Organization Events
              <ul className="mt-2 space-y-1">
                <li>• organization.created</li>
                <li>• organization.updated</li>
                <li>• member.invited</li>
                <li>• member.joined</li>
                <li>• member.removed</li>
              </ul>
            </div>
            <div>
              System Events
              <ul className="mt-2 space-y-1">
                <li>• webhook.test</li>
                <li>• api key.created</li>
                <li>• api key.revoked</li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Security Best Practices Section */}
      <DocsSection title="Security Best Practices">
        <DocsCard title="SECURITY BEST PRACTICES">
          <ul className="space-y-1">
            <li>
              ├─ <strong>Always verify signatures:</strong> Use HMAC-SHA256 with timing-safe
              comparison
            </li>
            <li>
              ├─ <strong>Use HTTPS only:</strong> Never send webhooks to HTTP endpoints
            </li>
            <li>
              ├─ <strong>Rotate secrets:</strong> Allow users to regenerate webhook secrets
            </li>
            <li>
              ├─ <strong>Validate payloads:</strong> Sanitize and validate all webhook payloads
            </li>
            <li>
              ├─ <strong>Set timeouts:</strong> Use short timeouts (5-10s) for webhook deliveries
            </li>
            <li>
              └─ <strong>Log everything:</strong> Track all deliveries for debugging and audit
            </li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
