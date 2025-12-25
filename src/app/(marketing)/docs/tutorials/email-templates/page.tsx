import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Mail, Send, Clock, Users } from 'lucide-react';

export const metadata = {
  title: 'Email Templates - Fabrk Docs',
  description:
    'Create beautiful transactional emails. Pre-built templates for verification, password reset, and welcome emails.',
};

export default function EmailTemplatesTutorialPage() {
  return (
    <FeatureGuideTemplate
      code="[0x40]"
      category="Tutorials"
      title="Email Templates"
      description="Create and send beautiful transactional emails with Resend and lightweight HTML templates."
      overview="Resend API integration for reliable email delivery, lightweight HTML templates for maximum performance, direct sending for immediate emails (auth), queue system for background sending (notifications), and pre-built templates (welcome, verification, reset)."
      features={[
        {
          icon: Mail,
          title: 'Resend API',
          description: 'Reliable email delivery with tracking.',
        },
        {
          icon: Send,
          title: 'Direct Send',
          description: 'Immediate sending for auth emails.',
        },
        {
          icon: Clock,
          title: 'Queue System',
          description: 'Background sending with retries.',
        },
        {
          icon: Users,
          title: 'Org Invites',
          description: 'Beautiful organization invitations.',
        },
      ]}
      setup={[
        {
          title: 'Configure Resend',
          description: 'Sign up at resend.com and obtain your API credentials',
          code: `# .env.local

RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Sending Emails',
          description: 'Use the email service functions from src/lib/email.ts',
          code: `import {
  sendEmail,
  sendWelcomeEmail,
  sendVerificationEmail,
  sendResetEmail
} from "@/lib/email";

// Generic email
await sendEmail(
  "user@example.com",
  "Your Subject",
  "<h1>HTML Content</h1>"
);

// Welcome email (after purchase)
await sendWelcomeEmail(
  "user@example.com",
  "John Doe",
  "LICENSE-KEY-123"  // optional
);

// Email verification
await sendVerificationEmail(
  "user@example.com",
  "verification-token-abc"
);

// Password reset
await sendResetEmail(
  "user@example.com",
  "reset-token-xyz"
);`,
          language: 'typescript',
        },
        {
          title: 'Email Queue System',
          description: 'Queue emails for background sending with automatic retries',
          code: `import {
  queueEmail,
  queueWelcomeEmail,
  queueVerificationEmail
} from "@/lib/email";

// Queue a custom email
await queueEmail({
  type: "NOTIFICATION",
  to: "user@example.com",
  subject: "New Feature Available",
  html: "<p>Check out our new feature!</p>",
  userId: "user_123",  // optional tracking
  maxAttempts: 3       // retry count
});

// Queue welcome email with GitHub access
await queueWelcomeEmail({
  to: "user@example.com",
  name: "John Doe",
  licenseKey: "LICENSE-123-ABC",
  githubRepoUrl: "https://github.com/org/repo",
  githubUsername: "johndoe",
  purchaseId: "purchase_456"
});`,
          language: 'typescript',
        },
        /* eslint-disable design-system/no-hardcoded-colors -- Email HTML requires inline styles with specific colors (CSS variables not supported in email clients) */
        {
          title: 'Creating Custom Templates',
          description: 'Create HTML template functions in src/emails/',
          code: `// src/emails/invoice-html.ts

interface InvoiceEmailProps {
  customerName: string;
  amount: number;
  invoiceUrl: string;
}

export function generateInvoiceEmailHTML({
  customerName,
  amount,
  invoiceUrl,
}: InvoiceEmailProps): string {
  return \`
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #6366f1;
      color: white;
      text-decoration: none;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Invoice Paid</h1>
    <p>Hi \${customerName},</p>
    <p>Your payment of $\${amount.toFixed(2)} was successful.</p>

    <div style="margin: 24px 0;">
      <a href="\${invoiceUrl}" class="button">View Invoice</a>
    </div>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

    <p style="color: #6b7280; font-size: 14px;">
      Thanks for your business!
    </p>
  </div>
</body>
</html>
  \`.trim();
}`,
          language: 'typescript',
        },
        /* eslint-enable design-system/no-hardcoded-colors */
        {
          title: 'Organization Invites',
          description: 'Send beautiful organization invitation emails',
          code: `import { sendOrganizationInvite } from "@/lib/email";

await sendOrganizationInvite("newmember@example.com", {
  organizationName: "Acme Corp",
  inviterName: "John Doe",
  role: "MEMBER",  // OWNER, ADMIN, MEMBER, GUEST
  token: "invite-token-abc",
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});`,
          language: 'typescript',
        },
      ]}
      previous={{
        title: 'Authentication',
        href: '/docs/tutorials/authentication',
      }}
      next={{
        title: 'Stripe Payments',
        href: '/docs/tutorials/stripe-payments',
      }}
    >
      {/* Email Types */}
      <DocsSection title="Email Types">
        <DocsCard title="EMAIL TYPES">
          <p className="mb-4">The queue system supports these email types for categorization:</p>
          <div className="space-y-1">
            <div>
              ├─ <code className="bg-muted px-1">WELCOME</code> - Post-purchase welcome emails
            </div>
            <div>
              ├─ <code className="bg-muted px-1">VERIFICATION</code> - Email verification
            </div>
            <div>
              ├─ <code className="bg-muted px-1">RESET</code> - Password reset
            </div>
            <div>
              ├─ <code className="bg-muted px-1">INVOICE</code> - Payment receipts
            </div>
            <div>
              └─ <code className="bg-muted px-1">NOTIFICATION</code> - General notifications
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Best Practices */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <div className="space-y-1">
            <div>
              ├─ <strong>Use direct sending</strong> for time-sensitive emails (auth, password
              reset)
            </div>
            <div>
              ├─ <strong>Use queuing</strong> for bulk emails, notifications, and post-purchase
              emails
            </div>
            <div>
              ├─ <strong>Track user/purchase IDs</strong> for email analytics and debugging
            </div>
            <div>
              ├─ <strong>Set appropriate maxAttempts</strong> - 3 for important emails, 1 for
              notifications
            </div>
            <div>
              ├─ <strong>Test templates locally</strong> - without RESEND_API_KEY, emails log to
              console
            </div>
            <div>
              └─ <strong>Verify domain</strong> in Resend dashboard for better deliverability
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
                [ERROR]: RESEND_API_KEY invalid
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Verify API key from Resend dashboard
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`# Get new API key from: https://resend.com/api-keys
# Add to .env.local
RESEND_API_KEY="re_xxxxxxxxxxxx"

# Make sure it starts with "re_"`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Email not sending (403 Forbidden)
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Verify your domain in Resend dashboard
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`# Steps:
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Add your domain (e.g., yourdomain.com)
4. Add the DNS records shown
5. Wait for verification (usually < 5 minutes)

# Development: Use onboarding@resend.dev (no verification needed)`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Template not rendering (blank email)
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Check React Email component syntax
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`// Ensure function returns string
export function generateEmailHTML(): string {
  return \`<!DOCTYPE html>...\`;
}

// Not a React component - plain HTML template function`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Emails queued but not sending
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Check email queue table and processing
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`# View queued emails
npm run db:studio
# Check EmailQueue table

# Manually process queue (if cron not set up)
# Create /api/process-email-queue endpoint and call it`}
                </code>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/tutorials/authentication"
            title="Authentication"
            description="Set up email verification and password reset"
          />
          <DocsLinkCard
            href="/docs/tutorials/stripe-payments"
            title="Stripe Payments"
            description="Send purchase confirmation emails"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
