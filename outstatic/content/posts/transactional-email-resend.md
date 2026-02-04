---
title: 'Transactional Email with Resend: Developer-First Email'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'transactional-email-resend'
description: 'Send beautiful transactional emails with Resend. Fabrk includes pre-built templates for welcome emails, password resets, and more.'
publishedAt: '2026-01-26T10:00:00.000Z'
---

**Email that developers actually enjoy building.**

---

## Why Resend?

Resend is the email API built for developers:

- **Simple API** - One function to send any email
- **React email templates** - Build emails with JSX
- **Excellent deliverability** - Built by the creator of React Email
- **Real-time analytics** - Track opens, clicks, bounces
- **Generous free tier** - 3,000 emails/month free
- **Modern DX** - TypeScript-first, great error messages

Fabrk integrates Resend out of the box with pre-built templates.

---

## Configuration

### Step 1: Get API Key

1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys
3. Create a new key

### Step 2: Add to Environment

```bash
# .env.local
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@yourdomain.com"
```

### Step 3: Verify Domain (Recommended)

For production, verify your sending domain:

1. Go to Domains in Resend dashboard
2. Add your domain
3. Add the DNS records (SPF, DKIM, DMARC)
4. Wait for verification

Verified domains have much better deliverability than `@resend.dev`.

---

## Basic Email Sending

The simplest email send:

```typescript
// src/lib/email/index.ts
import { Resend } from 'resend';
import { env } from '@/lib/env';

export const resend = new Resend(env.RESEND_API_KEY);

// Send a simple email
await resend.emails.send({
  from: 'Your App <noreply@yourdomain.com>',
  to: 'user@example.com',
  subject: 'Welcome to Our App',
  html: '<p>Thanks for signing up!</p>',
});
```

---

## Email Service Layer

Fabrk includes a structured email service:

```typescript
// src/lib/email/service.ts
import { resend } from './index';
import { render } from '@react-email/render';
import { WelcomeEmail } from '@/emails/welcome';
import { PasswordResetEmail } from '@/emails/password-reset';
import { EmailVerificationEmail } from '@/emails/email-verification';
import { InvoiceEmail } from '@/emails/invoice';
import { TeamInviteEmail } from '@/emails/team-invite';
import { SubscriptionUpdatedEmail } from '@/emails/subscription-updated';
import { env } from '@/lib/env';

const FROM_EMAIL = env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com';
const APP_NAME = 'Your App';

export const sendEmail = {
  /**
   * Send welcome email to new users
   */
  async welcome({ to, name }: { to: string; name: string }) {
    const html = render(
      <WelcomeEmail
        name={name}
        loginUrl={`${env.NEXT_PUBLIC_APP_URL}/login`}
      />
    );

    return resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to,
      subject: `Welcome to ${APP_NAME}!`,
      html,
    });
  },

  /**
   * Send password reset link
   */
  async passwordReset({ to, resetUrl, expiresIn = '1 hour' }: {
    to: string;
    resetUrl: string;
    expiresIn?: string;
  }) {
    const html = render(
      <PasswordResetEmail
        resetUrl={resetUrl}
        expiresIn={expiresIn}
      />
    );

    return resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to,
      subject: 'Reset Your Password',
      html,
    });
  },

  /**
   * Send email verification link
   */
  async emailVerification({ to, name, verifyUrl }: {
    to: string;
    name: string;
    verifyUrl: string;
  }) {
    const html = render(
      <EmailVerificationEmail
        name={name}
        verifyUrl={verifyUrl}
      />
    );

    return resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to,
      subject: 'Verify Your Email',
      html,
    });
  },

  /**
   * Send invoice/receipt
   */
  async invoice({ to, invoiceNumber, amount, downloadUrl, items }: {
    to: string;
    invoiceNumber: string;
    amount: string;
    downloadUrl: string;
    items?: Array<{ name: string; amount: string }>;
  }) {
    const html = render(
      <InvoiceEmail
        invoiceNumber={invoiceNumber}
        amount={amount}
        downloadUrl={downloadUrl}
        items={items}
      />
    );

    return resend.emails.send({
      from: `${APP_NAME} Billing <${FROM_EMAIL}>`,
      to,
      subject: `Invoice ${invoiceNumber} - ${APP_NAME}`,
      html,
    });
  },

  /**
   * Send team/organization invite
   */
  async teamInvite({ to, inviterName, teamName, inviteUrl, expiresIn = '7 days' }: {
    to: string;
    inviterName: string;
    teamName: string;
    inviteUrl: string;
    expiresIn?: string;
  }) {
    const html = render(
      <TeamInviteEmail
        inviterName={inviterName}
        teamName={teamName}
        inviteUrl={inviteUrl}
        expiresIn={expiresIn}
      />
    );

    return resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to,
      subject: `${inviterName} invited you to join ${teamName}`,
      html,
    });
  },

  /**
   * Send subscription update notification
   */
  async subscriptionUpdated({ to, planName, action, effectiveDate }: {
    to: string;
    planName: string;
    action: 'upgraded' | 'downgraded' | 'cancelled' | 'renewed';
    effectiveDate: string;
  }) {
    const html = render(
      <SubscriptionUpdatedEmail
        planName={planName}
        action={action}
        effectiveDate={effectiveDate}
      />
    );

    const subjects = {
      upgraded: `You've upgraded to ${planName}!`,
      downgraded: `Your plan has been changed to ${planName}`,
      cancelled: 'Your subscription has been cancelled',
      renewed: `Your ${planName} subscription has been renewed`,
    };

    return resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to,
      subject: subjects[action],
      html,
    });
  },
};
```

### Usage

```typescript
import { sendEmail } from '@/lib/email/service';

// Welcome email
await sendEmail.welcome({
  to: user.email,
  name: user.name,
});

// Password reset
await sendEmail.passwordReset({
  to: user.email,
  resetUrl: `https://app.com/reset?token=${token}`,
});

// Invoice
await sendEmail.invoice({
  to: user.email,
  invoiceNumber: 'INV-001',
  amount: '$99.00',
  downloadUrl: invoiceUrl,
  items: [
    { name: 'Pro Plan (Monthly)', amount: '$29.00' },
    { name: 'API Credits x100', amount: '$70.00' },
  ],
});
```

---

## React Email Templates

Build emails with React components:

### Welcome Email

```tsx
// emails/welcome.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Link,
} from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export function WelcomeEmail({ name, loginUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>[ YOUR APP ]</Text>
          </Section>

          <Section style={content}>
            <Text style={heading}>WELCOME, {name.toUpperCase()}!</Text>

            <Text style={paragraph}>
              Your account is ready. We're excited to have you on board.
            </Text>

            <Text style={paragraph}>
              Click the button below to access your dashboard and get started.
            </Text>

            <Button href={loginUrl} style={button}>
              > GO TO DASHBOARD
            </Button>
          </Section>

          <Hr style={divider} />

          <Section style={footer}>
            <Text style={footerText}>
              Need help? Reply to this email or visit our{' '}
              <Link href="https://docs.yourapp.com" style={link}>
                documentation
              </Link>
              .
            </Text>
            <Text style={footerText}>
              &copy; 2026 Your App. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Terminal-inspired styles
const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '40px 20px',
};

const header = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const logo = {
  color: '#22c55e',
  fontSize: '14px',
  fontWeight: '600',
  letterSpacing: '2px',
};

const content = {
  backgroundColor: '#171717',
  border: '1px solid #27272a',
  borderRadius: '0',
  padding: '32px',
};

const heading = {
  color: '#fafafa',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 24px 0',
  letterSpacing: '1px',
};

const paragraph = {
  color: '#a1a1aa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 16px 0',
};

const button = {
  backgroundColor: '#22c55e',
  color: '#0a0a0a',
  fontSize: '12px',
  fontWeight: '600',
  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
  padding: '12px 24px',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '16px',
  letterSpacing: '1px',
};

const divider = {
  borderColor: '#27272a',
  margin: '32px 0',
};

const footer = {
  textAlign: 'center' as const,
};

const footerText = {
  color: '#71717a',
  fontSize: '12px',
  margin: '0 0 8px 0',
};

const link = {
  color: '#22c55e',
  textDecoration: 'underline',
};

export default WelcomeEmail;
```

### Password Reset Email

```tsx
// emails/password-reset.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface PasswordResetEmailProps {
  resetUrl: string;
  expiresIn: string;
}

export function PasswordResetEmail({ resetUrl, expiresIn }: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>[ YOUR APP ]</Text>
          </Section>

          <Section style={content}>
            <Text style={heading}>PASSWORD RESET</Text>

            <Text style={paragraph}>
              We received a request to reset your password. Click the button
              below to create a new password.
            </Text>

            <Button href={resetUrl} style={button}>
              > RESET PASSWORD
            </Button>

            <Text style={warning}>
              This link expires in {expiresIn}. If you didn't request this,
              you can safely ignore this email.
            </Text>

            <Hr style={divider} />

            <Text style={codeLabel}>
              Or copy this link:
            </Text>
            <Text style={codeBlock}>
              {resetUrl}
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              For security, this request was received from a web browser.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '40px 20px',
};

const header = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const logo = {
  color: '#22c55e',
  fontSize: '14px',
  fontWeight: '600',
  letterSpacing: '2px',
};

const content = {
  backgroundColor: '#171717',
  border: '1px solid #27272a',
  padding: '32px',
};

const heading = {
  color: '#fafafa',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 24px 0',
  letterSpacing: '1px',
};

const paragraph = {
  color: '#a1a1aa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 16px 0',
};

const button = {
  backgroundColor: '#22c55e',
  color: '#0a0a0a',
  fontSize: '12px',
  fontWeight: '600',
  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
  padding: '12px 24px',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '8px',
  marginBottom: '16px',
};

const warning = {
  color: '#f59e0b',
  fontSize: '12px',
  margin: '16px 0 0 0',
};

const divider = {
  borderColor: '#27272a',
  margin: '24px 0',
};

const codeLabel = {
  color: '#71717a',
  fontSize: '12px',
  margin: '0 0 8px 0',
};

const codeBlock = {
  backgroundColor: '#0a0a0a',
  border: '1px solid #27272a',
  color: '#a1a1aa',
  fontSize: '11px',
  padding: '12px',
  wordBreak: 'break-all' as const,
};

const footer = {
  textAlign: 'center' as const,
  marginTop: '32px',
};

const footerText = {
  color: '#71717a',
  fontSize: '12px',
};

export default PasswordResetEmail;
```

---

## Pre-Built Templates

Fabrk includes email templates for:

| Template | File | Use Case |
|----------|------|----------|
| Welcome | `emails/welcome.tsx` | New user signup |
| Password Reset | `emails/password-reset.tsx` | Password reset link |
| Email Verification | `emails/email-verification.tsx` | Email verification |
| Invoice | `emails/invoice.tsx` | Payment receipt |
| Team Invite | `emails/team-invite.tsx` | Organization invite |
| Subscription Updated | `emails/subscription-updated.tsx` | Plan changes |
| Two-Factor Code | `emails/two-factor.tsx` | 2FA verification code |
| Login Alert | `emails/login-alert.tsx` | New device login notification |

All styled to match the terminal aesthetic with:
- Dark background (#0a0a0a)
- Monospace font (JetBrains Mono)
- Green accent color (#22c55e)
- Terminal-style brackets and chevrons

---

## Error Handling

Handle send failures gracefully:

```typescript
import { resend } from '@/lib/email';

interface SendResult {
  success: boolean;
  id?: string;
  error?: string;
}

async function sendEmailSafe(options: Parameters<typeof resend.emails.send>[0]): Promise<SendResult> {
  try {
    const { data, error } = await resend.emails.send(options);

    if (error) {
      console.error('Resend API error:', error);
      return { success: false, error: error.message };
    }

    console.log('Email sent:', data?.id);
    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Email send failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Usage with retry
async function sendWithRetry(
  options: Parameters<typeof resend.emails.send>[0],
  maxRetries = 3
): Promise<SendResult> {
  let lastError: string | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await sendEmailSafe(options);

    if (result.success) {
      return result;
    }

    lastError = result.error;
    console.log(`Email attempt ${attempt} failed, retrying...`);

    // Exponential backoff
    await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
  }

  return { success: false, error: lastError };
}
```

---

## Testing Locally

### Preview Server

React Email includes a preview server:

```bash
# Start email preview server
npm run email:dev
```

Opens at `http://localhost:3030` with live preview of all templates.

### Test Mode

Send to Resend's test email address:

```typescript
// Only in development
if (process.env.NODE_ENV === 'development') {
  await resend.emails.send({
    from: 'test@resend.dev',
    to: 'delivered@resend.dev', // Always succeeds
    // or to: 'bounced@resend.dev' // Always bounces
    subject: 'Test Email',
    html: '<p>Test</p>',
  });
}
```

---

## Webhooks

Track email events in real-time:

```typescript
// src/app/api/email/webhook/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { prisma } from '@/lib/prisma';

const webhookSecret = process.env.RESEND_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const headersList = headers();
  const svixId = headersList.get('svix-id');
  const svixTimestamp = headersList.get('svix-timestamp');
  const svixSignature = headersList.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing headers' }, { status: 400 });
  }

  const body = await request.text();

  // Verify webhook signature
  const wh = new Webhook(webhookSecret);
  let event: any;

  try {
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (error) {
    console.error('Webhook verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle event types
  switch (event.type) {
    case 'email.sent':
      console.log('Email sent:', event.data.email_id);
      break;

    case 'email.delivered':
      console.log('Email delivered:', event.data.email_id);
      await prisma.emailLog.update({
        where: { resendId: event.data.email_id },
        data: { status: 'delivered', deliveredAt: new Date() },
      });
      break;

    case 'email.opened':
      console.log('Email opened:', event.data.email_id);
      await prisma.emailLog.update({
        where: { resendId: event.data.email_id },
        data: { opened: true, openedAt: new Date() },
      });
      break;

    case 'email.clicked':
      console.log('Link clicked:', event.data.email_id);
      break;

    case 'email.bounced':
      console.error('Email bounced:', event.data.email_id);
      // Mark email as invalid in your database
      await markEmailInvalid(event.data.to);
      break;

    case 'email.complained':
      console.error('Spam complaint:', event.data.email_id);
      // Unsubscribe user to avoid future complaints
      await unsubscribeUser(event.data.to);
      break;
  }

  return NextResponse.json({ received: true });
}

async function markEmailInvalid(email: string) {
  await prisma.user.updateMany({
    where: { email },
    data: { emailVerified: null, emailBounced: true },
  });
}

async function unsubscribeUser(email: string) {
  await prisma.user.updateMany({
    where: { email },
    data: { emailUnsubscribed: true },
  });
}
```

---

## Email Logging

Track all sent emails:

```typescript
// Prisma schema
model EmailLog {
  id          String    @id @default(cuid())
  resendId    String?   @unique
  to          String
  subject     String
  template    String
  status      String    @default("sent")
  opened      Boolean   @default(false)
  openedAt    DateTime?
  deliveredAt DateTime?
  createdAt   DateTime  @default(now())

  userId      String?
  user        User?     @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([resendId])
}
```

```typescript
// Enhanced send function with logging
async function sendAndLog(
  template: string,
  userId: string | null,
  options: Parameters<typeof resend.emails.send>[0]
) {
  const { data, error } = await resend.emails.send(options);

  // Log the email
  await prisma.emailLog.create({
    data: {
      resendId: data?.id,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      template,
      status: error ? 'failed' : 'sent',
      userId,
    },
  });

  return { data, error };
}
```

---

## Best Practices

### 1. Use a Custom Domain

Better deliverability than `@resend.dev`:

```typescript
// GOOD - verified domain
from: 'Your App <noreply@yourapp.com>'

// AVOID - Resend domain
from: 'Your App <onboarding@resend.dev>'
```

### 2. Include Unsubscribe Links

Required for marketing emails (CAN-SPAM, GDPR):

```tsx
<Text style={footerText}>
  <Link href={`${APP_URL}/unsubscribe?email=${email}`} style={link}>
    Unsubscribe
  </Link>
  {' | '}
  <Link href={`${APP_URL}/preferences?email=${email}`} style={link}>
    Email Preferences
  </Link>
</Text>
```

### 3. Test Across Clients

Different email clients render differently:
- Gmail (web & mobile)
- Outlook (web, desktop, mobile)
- Apple Mail
- Yahoo Mail

Use [Litmus](https://litmus.com) or [Email on Acid](https://emailonacid.com) for testing.

### 4. Keep Layouts Simple

Complex CSS breaks in email. Stick to:
- Tables for layout
- Inline styles only
- Web-safe fonts with fallbacks
- Simple backgrounds

### 5. Optimize Images

- Use absolute URLs
- Add alt text
- Keep file sizes small
- Consider clients that block images by default

---

## Getting Started

1. **Sign up** at [resend.com](https://resend.com)
2. **Add `RESEND_API_KEY`** to `.env.local`
3. **Verify your sending domain** for production
4. **Import `sendEmail`** from `@/lib/email/service`
5. **Send your first email**

```typescript
import { sendEmail } from '@/lib/email/service';

await sendEmail.welcome({
  to: 'user@example.com',
  name: 'John',
});
```

Email, the developer-friendly way.
