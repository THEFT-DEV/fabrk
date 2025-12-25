/**
 * Email Verification Template - Clean Professional Style
 *
 * NOTE: This file uses hardcoded hex colors in inline styles.
 * Reason: Email clients (Gmail, Outlook, etc.) don't support CSS variables,
 * Tailwind classes, or external stylesheets. Inline styles with hardcoded
 * colors are the only reliable way to ensure consistent rendering across
 * all email clients.
 */

export interface VerifyEmailProps {
  name: string;
  verificationUrl: string;
}

export function generateVerifyEmailHTML({ name, verificationUrl }: VerifyEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #e4e4e7;">
              <h1 style="margin: 0; color: #18181b; font-size: 24px; font-weight: 600;">
                Verify Your Email
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 24px 0; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                Hi ${name},
              </p>
              <p style="margin: 0 0 24px 0; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                Please verify your email address to complete your registration.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 24px 0;">
                    <a href="${verificationUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: 600; border-radius: 6px;">Verify Email</a>
                  </td>
                </tr>
              </table>

              <!-- Alternative Link -->
              <div style="background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; color: #71717a; font-size: 12px;">Or copy and paste this link:</p>
                <a href="${verificationUrl}" style="color: #2563eb; font-size: 12px; word-break: break-all;">${verificationUrl}</a>
              </div>

              <!-- Expiry Notice -->
              <div style="background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>Note:</strong> This link expires in 24 hours.
                </p>
              </div>

              <!-- Security Notice -->
              <p style="margin: 0; color: #71717a; font-size: 14px; line-height: 1.5;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid #e4e4e7; background-color: #fafafa; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #71717a; font-size: 12px; text-align: center;">
                © 2025 Fabrk. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateVerifyEmailText({ name, verificationUrl }: VerifyEmailProps): string {
  return `
Verify Your Email

Hi ${name},

Please verify your email address to complete your registration.

VERIFY: ${verificationUrl}

Note: This link expires in 24 hours.

If you didn't create an account, you can safely ignore this email.

© 2025 Fabrk. All rights reserved.
  `.trim();
}
