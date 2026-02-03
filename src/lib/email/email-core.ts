/**
 * Core Email Functions
 * Base email sending functionality and service object
 */

import { Resend } from 'resend';
import { logger } from '@/lib/logger';
import { env } from '@/lib/env';

export const resend = env.server.RESEND_API_KEY ? new Resend(env.server.RESEND_API_KEY) : null;

export const FROM_EMAIL = env.server.EMAIL_FROM || 'noreply@yourdomain.com';
export const APP_NAME = 'Fabrk';
export const APP_URL = env.client.NEXT_PUBLIC_APP_URL;

/**
 * Generic email sending function
 * @param to - Recipient email address
 * @param subject - Email subject line
 * @param html - HTML content of the email
 * @returns Promise with success status
 */
export async function sendEmail(to: string, subject: string, html: string) {
  if (!resend) {
    logger.debug('📧 [DEV] Email to:', to, 'Subject:', subject);
    return { success: true };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error: unknown) {
    logger.error('Failed to send email:', error);
    return { success: false, error };
  }
}
