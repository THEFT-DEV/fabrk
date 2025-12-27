/**
 * Organization Email Functions
 * Team invitation emails
 *
 * NOTE: This file uses hardcoded hex colors in inline styles.
 * Reason: Email clients (Gmail, Outlook, etc.) don't support CSS variables,
 * Tailwind classes, or external stylesheets. Inline styles with hardcoded
 * colors are the only reliable way to ensure consistent rendering across
 * all email clients.
 */

import { logger } from '@/lib/logger';
import { resend, FROM_EMAIL, APP_NAME, APP_URL } from './email-core';

/**
 * Send organization invitation email
 * @param to - Recipient email address
 * @param params - Invitation parameters
 * @returns Promise with success status
 */
export async function sendOrganizationInvite(
  to: string,
  params: {
    organizationName: string;
    inviterName: string;
    role: string;
    token: string;
    expiresAt: Date;
  }
) {
  if (!resend) {
    logger.debug('📧 [DEV] Organization invite to:', to, '- Org:', params.organizationName);
    return { success: true };
  }

  const inviteUrl = `${APP_URL}/accept-invite?token=${params.token}`;
  const expiryDate = params.expiresAt.toLocaleDateString();

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 2px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #6366f1; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
          .button:hover { background: #4f46e5; }
          .info-box { background: #f3f4f6; border-left: 4px solid #6366f1; padding: 16px; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          .badge { display: inline-block; background: #e0e7ff; color: #4338ca; padding: 4px 12px; border-radius: 4px; font-size: 14px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">You're Invited!</h1>
          </div>
          <div class="content">
            <p style="font-size: 16px; margin-top: 0;">
              <strong>${params.inviterName}</strong> has invited you to join <strong>${params.organizationName}</strong> on ${APP_NAME}.
            </p>

            <div class="info-box">
              <strong>Your Role:</strong> <span class="badge">${params.role}</span>
              <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 14px;">
                ${params.role === 'OWNER' ? 'Full control over the organization' : ''}
                ${params.role === 'ADMIN' ? 'Manage members, settings, and billing' : ''}
                ${params.role === 'MEMBER' ? 'Standard access to organization resources' : ''}
                ${params.role === 'GUEST' ? 'Limited read-only access' : ''}
              </p>
            </div>

            <div style="text-align: center;">
              <a href="${inviteUrl}" class="button">Accept Invitation</a>
            </div>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              <strong>Note:</strong> This invitation expires on ${expiryDate}. If you don't have an account, you'll be prompted to create one.
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

            <p style="color: #6b7280; font-size: 14px;">
              If you weren't expecting this invitation, you can safely ignore this email.
            </p>
          </div>
          <div class="footer">
            <p>${APP_NAME} - Building better together</p>
            <p style="margin-top: 10px;">
              <a href="${APP_URL}" style="color: #6366f1; text-decoration: none;">Visit Dashboard</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `You've been invited to join ${params.organizationName}`,
      html,
    });
    return { success: true };
  } catch (error: unknown) {
    logger.error('Failed to send organization invite:', error);
    return { success: false, error };
  }
}
