 
/**
 * ✅ FABRK COMPONENT
 * Purchase Confirmation Email Template - Simple HTML
 * Production-ready ✓
 */

export interface PurchaseConfirmationProps {
  name: string;
  licenseKey: string;
  downloadUrl: string;
  orderNumber: string;
  amount: string;
  date: string;
  invoiceUrl?: string;
}

export function generatePurchaseConfirmationHTML({
  name,
  licenseKey,
  downloadUrl,
  orderNumber,
  amount,
  date,
  invoiceUrl,
}: PurchaseConfirmationProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Purchase Confirmation - Fabrk</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px; text-align: center; background-color: #007AFF;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">🎉 Purchase Confirmed!</h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; color: #171717; font-size: 24px; font-weight: 600;">
                Thanks for your purchase, ${name}!
              </h2>
              <p style="margin: 0 0 24px 0; color: #525252; font-size: 16px; line-height: 1.5;">
                Your payment has been processed successfully. You now have access to Fabrk - The Anti-Bloat Next.js Boilerplate.
              </p>

              <!-- Order Summary -->
              <div style="background-color: #fafafa; border: 2px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <p style="margin: 0 0 16px 0; color: #171717; font-size: 18px; font-weight: 600;">Order Summary</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0; color: #737373; font-size: 14px;">Order Number:</td>
                    <td style="padding: 8px 0; color: #171717; font-size: 14px; font-weight: 600; text-align: right;">${orderNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #737373; font-size: 14px;">Date:</td>
                    <td style="padding: 8px 0; color: #171717; font-size: 14px; text-align: right;">${date}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #737373; font-size: 14px;">Product:</td>
                    <td style="padding: 8px 0; color: #171717; font-size: 14px; text-align: right;">Fabrk Boilerplate</td>
                  </tr>
                  <tr style="border-top: 1px solid #e5e5e5;">
                    <td style="padding: 16px 0 0 0; color: #171717; font-size: 16px; font-weight: 600;">Total Paid:</td>
                    <td style="padding: 16px 0 0 0; color: #007AFF; font-size: 20px; font-weight: 700; text-align: right;">${amount}</td>
                  </tr>
                </table>
              </div>

              <!-- License Key -->
              <div style="background-color: #007AFF; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">Your License Key:</p>
                <p style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 700; font-family: 'Courier New', monospace; word-break: break-all;">
                  ${licenseKey}
                </p>
                <p style="margin: 16px 0 0 0; color: #ffffff; font-size: 12px; opacity: 0.9;">
                  Save this key! You'll need it for future reference and support.
                </p>
              </div>

              <!-- Download CTA -->
              <div style="text-align: center; margin-bottom: 32px;">
                <a href="${downloadUrl}" style="display: inline-block; background-color: #007AFF; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(0,122,255,0.3);">
                  Download Boilerplate
                </a>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #fafafa; border-left: 4px solid #007AFF; padding: 16px 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px 0; color: #171717; font-size: 16px; font-weight: 600;">Next Steps:</p>
                <ol style="margin: 0; padding-left: 20px; color: #525252; font-size: 14px; line-height: 1.8;">
                  <li>Download the boilerplate using the button above</li>
                  <li>Follow the Quick Start guide in the README</li>
                  <li>Email support@fabrk.dev for help</li>
                  <li>Start building your SaaS!</li>
                </ol>
              </div>

              <!-- Invoice Link -->
              ${
                invoiceUrl
                  ? `
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${invoiceUrl}" style="color: #007AFF; text-decoration: none; font-size: 14px; font-weight: 500;">
                  Download Invoice →
                </a>
              </div>
              `
                  : ''
              }

              <!-- Support -->
              <div style="border-top: 1px solid #e5e5e5; padding-top: 24px;">
                <p style="margin: 0 0 12px 0; color: #171717; font-size: 16px; font-weight: 600;">Need Help?</p>
                <p style="margin: 0 0 12px 0; color: #525252; font-size: 14px; line-height: 1.6;">
                  Check out our comprehensive documentation or reach out to our support team:
                </p>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right: 20px;">
                      <a href="https://docs.fabrk.dev" style="color: #007AFF; text-decoration: none; font-size: 14px;">📚 Documentation</a>
                    </td>
                    <td>
                      <a href="mailto:support@fabrk.dev" style="color: #007AFF; text-decoration: none; font-size: 14px;">✉️ Email Support</a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 8px 0; color: #171717; font-size: 14px; font-weight: 600;">
                Thank you for choosing Fabrk!
              </p>
              <p style="margin: 0; color: #737373; font-size: 12px; line-height: 1.5;">
                This is an automated confirmation email. For support, please contact us at support@fabrk.dev.
              </p>
              <p style="margin: 16px 0 0 0; color: #737373; font-size: 12px;">
                © ${new Date().getFullYear()} Fabrk. All rights reserved.
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
