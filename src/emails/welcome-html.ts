/**
 * ✅ FABRK COMPONENT
 * Welcome Email Template - Clean Professional Style
 * Production-ready ✓
 */

import { THEME_COUNT_STRING } from '@/data/landing/stats';

export interface WelcomeEmailProps {
  name: string;
  licenseKey: string;
  downloadUrl: string;
}

export function generateWelcomeEmailHTML({
  name,
  licenseKey,
  downloadUrl,
}: WelcomeEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Fabrk!</title>
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
                Welcome to Fabrk!
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
                Thank you for purchasing Fabrk! You've just gained access to the terminal-aesthetic Next.js boilerplate that will help you ship your SaaS in hours, not weeks.
              </p>

              <!-- License Section -->
              <div style="background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">License Key</p>
                <p style="margin: 0; color: #18181b; font-size: 14px; font-weight: 600; font-family: 'Courier New', monospace; word-break: break-all;">${licenseKey}</p>
              </div>

              <!-- Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 32px 0;">
                    <a href="${downloadUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: 600; border-radius: 6px;">Download Fabrk</a>
                  </td>
                </tr>
              </table>

              <!-- Quick Start Guide -->
              <div style="border-top: 1px solid #e4e4e7; padding-top: 24px; margin-top: 8px;">
                <p style="margin: 0 0 16px 0; color: #18181b; font-size: 14px; font-weight: 600;">Quick Start Guide</p>
                <table width="100%" cellpadding="0" cellspacing="0" style="color: #3f3f46; font-size: 14px; line-height: 1.8;">
                  <tr><td style="padding: 4px 0;">1. Download & extract the package</td></tr>
                  <tr><td style="padding: 4px 0;">2. Run <code style="background-color: #f4f4f5; padding: 2px 6px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 13px;">npm install</code></td></tr>
                  <tr><td style="padding: 4px 0;">3. Copy <code style="background-color: #f4f4f5; padding: 2px 6px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 13px;">.env.example</code> to <code style="background-color: #f4f4f5; padding: 2px 6px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 13px;">.env.local</code></td></tr>
                  <tr><td style="padding: 4px 0;">4. Run <code style="background-color: #f4f4f5; padding: 2px 6px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 13px;">npm run dev</code></td></tr>
                </table>
              </div>

              <!-- What's Included -->
              <div style="border-top: 1px solid #e4e4e7; padding-top: 24px; margin-top: 24px;">
                <p style="margin: 0 0 16px 0; color: #18181b; font-size: 14px; font-weight: 600;">What's Included</p>
                <table width="100%" cellpadding="0" cellspacing="0" style="color: #3f3f46; font-size: 14px; line-height: 1.8;">
                  <tr><td style="padding: 4px 0;"><span style="color: #22c55e;">✓</span> 80+ Production-Ready Components</td></tr>
                  <tr><td style="padding: 4px 0;"><span style="color: #22c55e;">✓</span> Complete Authentication System</td></tr>
                  <tr><td style="padding: 4px 0;"><span style="color: #22c55e;">✓</span> Stripe Payments Integration</td></tr>
                  <tr><td style="padding: 4px 0;"><span style="color: #22c55e;">✓</span> PostgreSQL Database with Prisma</td></tr>
                  <tr><td style="padding: 4px 0;"><span style="color: #22c55e;">✓</span> TypeScript Strict Mode + Next.js 15</td></tr>
                  <tr><td style="padding: 4px 0;"><span style="color: #22c55e;">✓</span> ${THEME_COUNT_STRING} Terminal Themes (OKLCH Colors)</td></tr>
                </table>
              </div>

              <!-- Important Notice -->
              <div style="background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 16px; margin-top: 24px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>Important:</strong> Keep your license key safe. It's required for updates and support.
                </p>
              </div>

              <p style="margin: 24px 0 0 0; color: #3f3f46; font-size: 14px;">
                Happy building!<br/>
                <span style="color: #71717a;">The Fabrk Team</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid #e4e4e7; background-color: #fafafa; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #71717a; font-size: 12px; text-align: center;">
                © 2025 Fabrk. All rights reserved. Single developer license.
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

export function generateWelcomeEmailText({
  name,
  licenseKey,
  downloadUrl,
}: WelcomeEmailProps): string {
  return `
Welcome to Fabrk!

Hi ${name},

Thank you for purchasing Fabrk! You've just gained access to the terminal-aesthetic Next.js boilerplate.

LICENSE KEY:
${licenseKey}

DOWNLOAD: ${downloadUrl}

QUICK START GUIDE:
1. Download & extract the package
2. Run npm install
3. Copy .env.example to .env.local
4. Run npm run dev

WHAT'S INCLUDED:
✓ 80+ Production-Ready Components
✓ Complete Authentication System
✓ Stripe Payments Integration
✓ PostgreSQL Database with Prisma
✓ TypeScript Strict Mode + Next.js 15
✓ ${THEME_COUNT_STRING} Terminal Themes (OKLCH Colors)

Important: Keep your license key safe. It's required for updates and support.

Happy building!
The Fabrk Team

© 2025 Fabrk. All rights reserved.
  `.trim();
}
