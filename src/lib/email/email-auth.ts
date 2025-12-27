/**
 * Authentication Email Functions
 * Verification and password reset emails
 */

import { logger } from '@/lib/logger';
import { resend, FROM_EMAIL, APP_URL } from './email-core';

/**
 * Send email verification link
 * @param to - Recipient email address
 * @param token - Verification token (24-hour expiry)
 * @returns Promise with success status and optional error
 * @example
 * await sendVerificationEmail("user@example.com", "abc123token")
 */
export async function sendVerificationEmail(to: string, token: string) {
  if (!resend) {
    logger.debug('📧 [DEV] Verification email to:', to, '- Token:', token);
    return { success: true };
  }

  const verifyUrl = `${APP_URL}/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Verify your email',
      html: `
        <h2>Verify your email address</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>This link expires in 24 hours.</p>
      `,
    });
    return { success: true };
  } catch (error: unknown) {
    logger.error('Failed to send verification email:', error);
    return { success: false, error };
  }
}

/**
 * Send password reset email
 * @param to - Recipient email address
 * @param token - Reset token (1-hour expiry)
 * @returns Promise with success status and optional error
 * @example
 * await sendResetEmail("user@example.com", "reset123token")
 */
export async function sendResetEmail(to: string, token: string) {
  if (!resend) {
    logger.debug('📧 [DEV] Reset email to:', to, '- Token:', token);
    return { success: true };
  }

  const resetUrl = `${APP_URL}/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Reset your password',
      html: `
        <h2>Reset your password</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });
    return { success: true };
  } catch (error: unknown) {
    logger.error('Failed to send reset email:', error);
    return { success: false, error };
  }
}
