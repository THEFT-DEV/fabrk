/**
 * Email template data and configuration
 */

import { Mail, Key, Shield, CreditCard, Bell } from 'lucide-react';
import { generateWelcomeEmailHTML } from '@/emails/welcome-html';
import { generateVerifyEmailHTML } from '@/emails/verify-email';

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  icon: typeof Mail;
  category: string;
  triggers: string[];
  variables: string[];
  preview: string;
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    description: 'Sent after successful purchase with license key',
    icon: Mail,
    category: 'ONBOARDING',
    triggers: ['Purchase completed', 'Account created'],
    variables: ['name', 'licenseKey', 'downloadUrl'],
    preview: generateWelcomeEmailHTML({
      name: 'John Doe',
      licenseKey: 'FABRK-2024-ABC123DEF456',
      downloadUrl: 'https://fabrk.ai/download/abc123',
    }),
  },
  {
    id: 'verify',
    name: 'Email Verification',
    description: 'Confirm email address for new accounts',
    icon: Shield,
    category: 'AUTH',
    triggers: ['User registration'],
    variables: ['name', 'verificationUrl'],
    preview: generateVerifyEmailHTML({
      name: 'John Doe',
      verificationUrl: 'https://fabrk.ai/verify?token=abc123',
    }),
  },
  {
    id: 'reset',
    name: 'Password Reset',
    description: 'Secure password reset link',
    icon: Key,
    category: 'AUTH',
    triggers: ['Forgot password request'],
    variables: ['name', 'resetUrl', 'ipAddress'],
    preview: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px;">
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #e4e4e7;">
              <h1 style="margin: 0; color: #18181b; font-size: 24px; font-weight: 600;">Reset Your Password</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 24px 0; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password. Click the button below to create a new password.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 24px 0;">
                    <a href="https://fabrk.ai/reset?token=abc123" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: 600; border-radius: 6px;">Reset Password</a>
                  </td>
                </tr>
              </table>
              <div style="background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;"><strong>Note:</strong> This link expires in 1 hour.</p>
              </div>
              <p style="margin: 0; color: #71717a; font-size: 14px; line-height: 1.5;">
                If you didn't request this, please ignore this email or contact support.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid #e4e4e7; background-color: #fafafa; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #71717a; font-size: 12px; text-align: center;">© 2025 Fabrk. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: 'purchase',
    name: 'Purchase Confirmation',
    description: 'Order receipt and next steps',
    icon: CreditCard,
    category: 'BILLING',
    triggers: ['Payment succeeded'],
    variables: ['name', 'amount', 'orderId', 'date'],
    preview: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Purchase Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px;">
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #e4e4e7;">
              <h1 style="margin: 0; color: #18181b; font-size: 24px; font-weight: 600;"><span style="color: #22c55e;">✓</span> Payment Successful</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 24px 0; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                Thank you for your purchase. Your order has been confirmed.
              </p>
              <div style="background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px 0; color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Order Details</p>
                <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px;">
                  <tr>
                    <td style="color: #71717a;">Order ID</td>
                    <td style="color: #18181b; text-align: right; font-family: 'Courier New', monospace;">#ORD-2024-001</td>
                  </tr>
                  <tr>
                    <td style="color: #71717a;">Date</td>
                    <td style="color: #18181b; text-align: right;">November 12, 2024</td>
                  </tr>
                  <tr>
                    <td style="color: #71717a;">Amount</td>
                    <td style="color: #18181b; font-size: 18px; font-weight: 600; text-align: right;">$79.00</td>
                  </tr>
                </table>
              </div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://fabrk.ai/download" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: 600; border-radius: 6px;">Download Fabrk</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid #e4e4e7; background-color: #fafafa; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #71717a; font-size: 12px; text-align: center;">© 2025 Fabrk. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: 'subscription',
    name: 'Subscription Update',
    description: 'Plan changes, renewals, and cancellations',
    icon: Bell,
    category: 'BILLING',
    triggers: ['Subscription updated', 'Payment renewed'],
    variables: ['name', 'plan', 'status', 'nextBillingDate'],
    preview: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Updated</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px;">
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #e4e4e7;">
              <h1 style="margin: 0; color: #18181b; font-size: 24px; font-weight: 600;">Subscription Updated</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 24px 0; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                Your subscription plan has been successfully updated.
              </p>
              <div style="background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px 0; color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Plan Details</p>
                <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px;">
                  <tr>
                    <td style="color: #71717a;">Plan</td>
                    <td style="color: #18181b; font-weight: 600; text-align: right;">Professional</td>
                  </tr>
                  <tr>
                    <td style="color: #71717a;">Status</td>
                    <td style="text-align: right;"><span style="background-color: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 500;">Active</span></td>
                  </tr>
                  <tr>
                    <td style="color: #71717a;">Next Billing</td>
                    <td style="color: #18181b; text-align: right;">December 12, 2024</td>
                  </tr>
                </table>
              </div>
              <div style="border-top: 1px solid #e4e4e7; padding-top: 24px; margin-bottom: 24px;">
                <p style="margin: 0 0 16px 0; color: #18181b; font-size: 14px; font-weight: 600;">What's Included</p>
                <table width="100%" cellpadding="0" cellspacing="0" style="color: #3f3f46; font-size: 14px; line-height: 1.8;">
                  <tr><td style="padding: 4px 0;"><span style="color: #22c55e;">✓</span> Unlimited projects</td></tr>
                  <tr><td style="padding: 4px 0;"><span style="color: #22c55e;">✓</span> 10 team members</td></tr>
                  <tr><td style="padding: 4px 0;"><span style="color: #22c55e;">✓</span> Priority support</td></tr>
                  <tr><td style="padding: 4px 0;"><span style="color: #22c55e;">✓</span> Advanced analytics</td></tr>
                </table>
              </div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://fabrk.ai/billing" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: 600; border-radius: 6px;">Manage Subscription</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid #e4e4e7; background-color: #fafafa; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #71717a; font-size: 12px; text-align: center;">© 2025 Fabrk. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
];
