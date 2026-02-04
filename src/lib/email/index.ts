/* 💡 EMAIL TIP: Get your Resend API key from https://resend.com/api-keys
 * Update FROM_EMAIL below with your verified domain (e.g., hello@yourdomain.com).
 * In development, emails are logged to console instead of being sent.
 */

/**
 * Email Service - Unified exports
 *
 * Split into submodules:
 * - email-core.ts - Core sending functionality
 * - email-auth.ts - Verification and reset emails
 * - email-welcome.ts - Post-purchase welcome emails
 * - email-organization.ts - Team invitation emails
 */

// Core exports
export { sendEmail, FROM_EMAIL, APP_NAME, APP_URL, resend } from './email-core';

// Direct send functions
export { sendVerificationEmail, sendResetEmail } from './email-auth';
export { sendWelcomeEmail } from './email-welcome';
export { sendOrganizationInvite } from './email-organization';

// Email service object for backwards compatibility
import { sendWelcomeEmail } from './email-welcome';
import { sendVerificationEmail, sendResetEmail } from './email-auth';

export const emailService = {
  sendWelcomeEmail,
  sendVerificationEmail,
  sendResetEmail,

  /**
   * Send template-based email
   */
  async sendTemplate(
    template: 'email-verification' | 'password-reset' | 'welcome',
    to: string,
    data: {
      verificationLink?: string;
      resetLink?: string;
      name?: string;
      licenseKey?: string;
    }
  ) {
    switch (template) {
      case 'email-verification':
        if (!data.verificationLink) throw new Error('verificationLink required');
        const token = data.verificationLink.split('/').pop() || '';
        return sendVerificationEmail(to, token);

      case 'password-reset':
        if (!data.resetLink) throw new Error('resetLink required');
        const resetToken = data.resetLink.split('/').pop() || '';
        return sendResetEmail(to, resetToken);

      case 'welcome':
        return sendWelcomeEmail(to, data.name || 'User', data.licenseKey);

      default:
        throw new Error(`Unknown template: ${template}`);
    }
  },
};
