 
/**
 * ✅ FABRK COMPONENT
 * Subscription Update Email Template - Simple HTML
 * Production-ready ✓
 */

export interface SubscriptionUpdateProps {
  name: string;
  updateType: 'upgraded' | 'downgraded' | 'renewed' | 'cancelled';
  previousPlan?: string;
  newPlan?: string;
  newAmount?: string;
  nextBillingDate?: string;
  manageUrl: string;
}

export function generateSubscriptionUpdateHTML({
  name,
  updateType,
  previousPlan,
  newPlan,
  newAmount,
  nextBillingDate,
  manageUrl,
}: SubscriptionUpdateProps): string {
  const getHeadline = () => {
    switch (updateType) {
      case 'upgraded':
        return '🎉 Subscription Upgraded!';
      case 'downgraded':
        return 'Subscription Updated';
      case 'renewed':
        return '✅ Subscription Renewed';
      case 'cancelled':
        return 'Subscription Cancelled';
      default:
        return 'Subscription Updated';
    }
  };

  const getMessage = () => {
    switch (updateType) {
      case 'upgraded':
        return `Great news! Your subscription has been upgraded from <strong>${previousPlan}</strong> to <strong>${newPlan}</strong>.`;
      case 'downgraded':
        return `Your subscription has been changed from <strong>${previousPlan}</strong> to <strong>${newPlan}</strong>.`;
      case 'renewed':
        return `Your subscription has been successfully renewed. Thank you for continuing with Fabrk!`;
      case 'cancelled':
        return `Your subscription has been cancelled. You'll continue to have access until the end of your current billing period.`;
      default:
        return `Your subscription has been updated.`;
    }
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Update - Fabrk</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px; text-align: center; background-color: ${updateType === 'cancelled' ? '#525252' : '#007AFF'};">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">${getHeadline()}</h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; color: #171717; font-size: 24px; font-weight: 600;">
                Hi ${name},
              </h2>
              <p style="margin: 0 0 24px 0; color: #525252; font-size: 16px; line-height: 1.5;">
                ${getMessage()}
              </p>

              ${
                updateType !== 'cancelled' && newPlan && newAmount
                  ? `
              <!-- Subscription Details -->
              <div style="background-color: #fafafa; border: 2px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <p style="margin: 0 0 16px 0; color: #171717; font-size: 18px; font-weight: 600;">Subscription Details</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${
                    previousPlan
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #737373; font-size: 14px;">Previous Plan:</td>
                    <td style="padding: 8px 0; color: #525252; font-size: 14px; text-align: right; text-decoration: line-through;">${previousPlan}</td>
                  </tr>
                  `
                      : ''
                  }
                  <tr>
                    <td style="padding: 8px 0; color: #737373; font-size: 14px;">Current Plan:</td>
                    <td style="padding: 8px 0; color: #171717; font-size: 14px; font-weight: 600; text-align: right;">${newPlan}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #737373; font-size: 14px;">Billing Amount:</td>
                    <td style="padding: 8px 0; color: #007AFF; font-size: 16px; font-weight: 700; text-align: right;">${newAmount}</td>
                  </tr>
                  ${
                    nextBillingDate
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #737373; font-size: 14px;">Next Billing Date:</td>
                    <td style="padding: 8px 0; color: #171717; font-size: 14px; text-align: right;">${nextBillingDate}</td>
                  </tr>
                  `
                      : ''
                  }
                </table>
              </div>
              `
                  : ''
              }

              ${
                updateType === 'cancelled'
                  ? `
              <!-- Cancellation Notice -->
              <div style="background-color: #FFF3CD; border-left: 4px solid #FFB020; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px;">
                <p style="margin: 0 0 8px 0; color: #171717; font-size: 14px; font-weight: 600;">What happens next?</p>
                <ul style="margin: 0; padding-left: 20px; color: #525252; font-size: 14px; line-height: 1.8;">
                  <li>Your access continues until ${nextBillingDate || 'the end of the billing period'}</li>
                  <li>You won't be charged again</li>
                  <li>Your data will be kept for 30 days after access ends</li>
                  <li>You can reactivate anytime before access ends</li>
                </ul>
              </div>
              `
                  : ''
              }

              ${
                updateType === 'upgraded'
                  ? `
              <!-- Upgrade Benefits -->
              <div style="background-color: #D1FAE5; border-left: 4px solid #10B981; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px;">
                <p style="margin: 0 0 8px 0; color: #171717; font-size: 14px; font-weight: 600;">You now have access to:</p>
                <ul style="margin: 0; padding-left: 20px; color: #525252; font-size: 14px; line-height: 1.8;">
                  <li>All starter components + advanced components</li>
                  <li>Priority support (48-hour response time)</li>
                  <li>Video tutorials and exclusive content</li>
                  <li>Early access to new features</li>
                </ul>
              </div>
              `
                  : ''
              }

              <!-- Manage Subscription CTA -->
              <div style="text-align: center; margin-bottom: 32px;">
                <a href="${manageUrl}" style="display: inline-block; background-color: #007AFF; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(0,122,255,0.3);">
                  ${updateType === 'cancelled' ? 'Reactivate Subscription' : 'Manage Subscription'}
                </a>
              </div>

              <!-- Support -->
              <div style="border-top: 1px solid #e5e5e5; padding-top: 24px;">
                <p style="margin: 0 0 12px 0; color: #171717; font-size: 16px; font-weight: 600;">Questions?</p>
                <p style="margin: 0 0 12px 0; color: #525252; font-size: 14px; line-height: 1.6;">
                  If you have any questions about this change, our team is here to help:
                </p>
                <table cellpadding="0" cellspacing="0">
                  <tr>
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
                ${updateType === 'cancelled' ? "We're sorry to see you go!" : 'Thank you for using Fabrk!'}
              </p>
              <p style="margin: 0; color: #737373; font-size: 12px; line-height: 1.5;">
                This is an automated notification email. If you didn't make this change, please contact support immediately.
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
