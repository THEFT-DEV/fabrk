/**
 * ✅ FABRK COMPONENT
 * Resend Integration Guide
 * Uses LibraryGuideTemplate for consistent structure
 */
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { LibraryGuideTemplate, LibraryCodeBlock } from '@/components/library';

export default function ResendIntegrationPage() {
  return (
    <LibraryGuideTemplate
      breadcrumbs={[{ label: 'Docs', href: '/library/docs' }, { label: 'Resend Integration' }]}
      icon={Mail}
      badgePrefix="INTEGRATION"
      badge="RESEND_EMAIL"
      title="Resend Integration"
      description="Send transactional emails from templates using Resend API."
      meta={{ time: '~10 minutes', level: 'Beginner' }}
      overview={{
        text: 'Fabrk uses Resend for transactional emails. Use it with Email Templates to send welcome emails, notifications, and receipts.',
        highlights: [
          'Simple API for sending emails',
          'React email templates support',
          'Delivery tracking and analytics',
          'Domain verification for production',
        ],
      }}
      steps={[
        {
          code: '0x01',
          title: 'SETUP',
          content: (
            <LibraryCodeBlock
              code={`# .env.local
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="noreply@yourdomain.com"`}
              language="bash"
              maxHeight="80px"
            />
          ),
        },
        {
          code: '0x02',
          title: 'SEND EMAIL',
          content: (
            <LibraryCodeBlock
              code={`import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Welcome to Fabrk!",
    html: \`<h1>Welcome, \${name}!</h1><p>Thanks for signing up.</p>\`,
  });
}`}
              language="typescript"
              maxHeight="250px"
            />
          ),
        },
        {
          code: '0x03',
          title: 'USE WITH TEMPLATES',
          content: (
            <>
              <p>
                Import email templates from{' '}
                <Link href="/library/email-templates" className="text-primary hover:underline">
                  Email Templates
                </Link>{' '}
                page:
              </p>
              <LibraryCodeBlock
                code={`import { WelcomeEmail } from "@/emails/welcome";

await resend.emails.send({
  from: process.env.EMAIL_FROM!,
  to: user.email,
  subject: "Welcome!",
  react: WelcomeEmail({ name: user.name }),
});`}
                language="typescript"
                maxHeight="180px"
              />
            </>
          ),
        },
      ]}
      relatedLinks={[
        {
          label: 'Add PostHog',
          href: '/library/docs/integration/posthog',
          description: 'to track email opens and clicks',
        },
        {
          label: 'Browse Email Templates',
          href: '/library/email-templates',
          description: '',
        },
      ]}
    />
  );
}
