/**
 * Onboarding Email Sequence Templates
 * Professional HTML email templates for user onboarding
 */

interface EmailData {
  name: string;
  email: string;
  productName?: string;
  companyName?: string;
  supportEmail?: string;
}

/**
 * Day 1: Welcome Email
 */
export function welcomeOnboardingEmail(data: EmailData): string {
  const {
    name,
    productName = 'Fabrk',
    companyName = 'Fabrk',
    supportEmail = 'support@fabrk.dev',
  } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ${productName}!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f8fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f8fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1a1a1a;">
                Welcome to ${productName}! 👋
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Hi ${name},
              </p>

              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Welcome aboard! We're thrilled to have you as part of the ${companyName} family. You've just unlocked access to a powerful platform that will help you build amazing things.
              </p>

              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Here's what you can do right now:
              </p>

              <!-- Action Items -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px; background-color: #f7f9fc; border-left: 4px solid #007AFF; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">
                      ✅ Complete Your Profile
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #718096;">
                      Add your details to personalize your experience
                    </p>
                  </td>
                </tr>
                <tr><td style="height: 15px;"></td></tr>
                <tr>
                  <td style="padding: 20px; background-color: #f7f9fc; border-left: 4px solid #007AFF; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">
                      🚀 Explore the Dashboard
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #718096;">
                      Get familiar with all the powerful features at your fingertips
                    </p>
                  </td>
                </tr>
                <tr><td style="height: 15px;"></td></tr>
                <tr>
                  <td style="padding: 20px; background-color: #f7f9fc; border-left: 4px solid #007AFF; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">
                      📚 Read the Quick Start Guide
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #718096;">
                      Learn the basics and hit the ground running
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 10px 0 30px 0;">
                    <a href="https://fabrk.dev/dashboard" style="display: inline-block; padding: 14px 32px; background-color: #007AFF; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Go to Dashboard
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Need help? We're here for you. Just reply to this email or contact us at <a href="mailto:${supportEmail}" style="color: #007AFF; text-decoration: none;">${supportEmail}</a>.
              </p>

              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Cheers,<br>
                The ${companyName} Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #718096;">
                ${companyName}, Inc.
              </p>
              <p style="margin: 0; font-size: 12px; color: #a0aec0;">
                You received this email because you signed up for ${productName}.
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

/**
 * Day 3: Getting Started Tips
 */
export function gettingStartedEmail(data: EmailData): string {
  const { name, productName = 'Fabrk', companyName = 'Fabrk' } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Getting Started with ${productName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f7f8fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f8fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px;">

          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <h1 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #1a1a1a;">
                Hi ${name}, here's what to do next 💡
              </h1>

              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                We noticed you recently joined ${productName}. Here are some tips to help you get the most out of your account:
              </p>

              <!-- Tip 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td width="60" valign="top">
                    <div style="width: 48px; height: 48px; background-color: #007AFF; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; text-align: center; line-height: 48px;">
                      🎯
                    </div>
                  </td>
                  <td valign="top" style="padding-left: 20px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1a1a1a;">
                      Set up your first project
                    </h3>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4a5568;">
                      It takes just 5 minutes to create your first project and start building. Follow our quick-start guide to deploy in under 15 minutes.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Tip 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td width="60" valign="top">
                    <div style="width: 48px; height: 48px; background-color: #34D399; border-radius: 8px; font-size: 24px; text-align: center; line-height: 48px;">
                      ⚡
                    </div>
                  </td>
                  <td valign="top" style="padding-left: 20px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1a1a1a;">
                      Customize your workspace
                    </h3>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4a5568;">
                      Make ${productName} work the way you do. Configure settings, add team members, and set up integrations.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Tip 3 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td width="60" valign="top">
                    <div style="width: 48px; height: 48px; background-color: #F59E0B; border-radius: 8px; font-size: 24px; text-align: center; line-height: 48px;">
                      📖
                    </div>
                  </td>
                  <td valign="top" style="padding-left: 20px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1a1a1a;">
                      Explore our documentation
                    </h3>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4a5568;">
                      Browse over 400KB of guides, tutorials, and best practices. Everything you need to succeed.
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 10px 0 20px 0;">
                    <a href="https://fabrk.dev/docs" style="display: inline-block; padding: 14px 32px; background-color: #007AFF; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      View Documentation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Best,<br>
                The ${companyName} Team
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #a0aec0;">
                ${companyName}, Inc.
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

/**
 * Payment Success Email
 */
export function paymentSuccessEmail(
  data: EmailData & {
    plan: string;
    amount: number;
    invoiceUrl?: string;
  }
): string {
  const { name, plan, amount, invoiceUrl, companyName = 'Fabrk' } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Successful</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f7f8fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f8fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px;">

          <!-- Success Icon -->
          <tr>
            <td align="center" style="padding: 40px 40px 20px 40px;">
              <div style="width: 80px; height: 80px; background-color: #10B981; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 48px; line-height: 80px; text-align: center;">
                ✓
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1a1a1a;">
                Payment Successful!
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 40px;">
              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Hi ${name},
              </p>

              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Thank you for your purchase! Your payment was processed successfully.
              </p>

              <!-- Payment Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; border: 2px solid #e2e8f0; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px; background-color: #f7f9fc;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #1a1a1a;">Plan:</strong>
                        </td>
                        <td align="right" style="padding: 8px 0; color: #4a5568;">
                          ${plan}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #e2e8f0;">
                          <strong style="color: #1a1a1a;">Amount:</strong>
                        </td>
                        <td align="right" style="padding: 8px 0; border-top: 1px solid #e2e8f0; color: #4a5568;">
                          $${(amount / 100).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #e2e8f0;">
                          <strong style="color: #1a1a1a;">Date:</strong>
                        </td>
                        <td align="right" style="padding: 8px 0; border-top: 1px solid #e2e8f0; color: #4a5568;">
                          ${new Date().toLocaleDateString()}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${
                invoiceUrl
                  ? `
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 10px 0 30px 0;">
                    <a href="${invoiceUrl}" style="display: inline-block; padding: 14px 32px; background-color: #007AFF; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Download Invoice
                    </a>
                  </td>
                </tr>
              </table>
              `
                  : ''
              }

              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Best regards,<br>
                The ${companyName} Team
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #a0aec0;">
                ${companyName}, Inc.
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
