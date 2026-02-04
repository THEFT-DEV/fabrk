/**
 * Contact Form API Route
 * Sends contact form submissions via email using Resend
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { logger } from '@/lib/logger';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { verifyHoneypot } from '@/lib/security/bot-protection';
import { env } from '@/lib/env';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.enum([
    'sales',
    'support',
    'billing',
    'feature',
    'bug',
    'partnership',
    'success-story',
    'other',
  ]),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  // SECURITY: Honeypot fields - should be empty
  website: z.string().optional(), // Hidden field - bots will fill this
  _gotcha: z.string().optional(), // Another honeypot
});

// Subject display names
const subjectLabels: Record<string, string> = {
  sales: 'Sales Inquiry',
  support: 'Technical Support',
  billing: 'Billing Question',
  feature: 'Feature Request',
  bug: 'Bug Report',
  partnership: 'Partnership Opportunity',
  'success-story': 'Success Story',
  other: 'General Inquiry',
};

export async function POST(request: NextRequest) {
  try {
    // Rate limit: strict (10 requests/minute) for contact form
    const identifier = getClientIdentifier(request);
    const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.strict);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'Retry-After': Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message, website, _gotcha } = result.data;

    // SECURITY: Check honeypot fields - bots will fill these, humans won't
    if (!verifyHoneypot(website) || !verifyHoneypot(_gotcha)) {
      logger.warn('[SECURITY] Honeypot triggered on contact form', { ip: identifier });
      // Return success to not reveal bot detection
      return NextResponse.json({ success: true });
    }
    const subjectLabel = subjectLabels[subject] || subject;

    // Build email HTML
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #18181b; color: white; padding: 24px; font-family: monospace; }
            .content { background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 16px; }
            .label { font-weight: 600; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
            .value { margin-top: 4px; }
            .message-box { background: #f9fafb; border: 1px solid #e5e7eb; padding: 16px; margin-top: 8px; white-space: pre-wrap; }
            .footer { padding: 16px; text-align: center; color: #9ca3af; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span style="opacity: 0.7;">[ [0x00] CONTACT_FORM ]</span>
              <h2 style="margin: 8px 0 0 0;">${subjectLabel}</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From</div>
                <div class="value">${name} &lt;${email}&gt;</div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subjectLabel}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
              </div>
            </div>
            <div class="footer">
              Sent from Fabrk Contact Form
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to support (configurable via env)
    const supportEmail = env.server.CONTACT_FORM_EMAIL || 'support@fabrk.dev';

    const emailResult = await sendEmail(
      supportEmail,
      `[Contact] ${subjectLabel} from ${name}`,
      html
    );

    if (!emailResult.success) {
      logger.error('Failed to send contact form email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    // Log successful submission
    logger.info('Contact form submitted:', { name, email, subject });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
