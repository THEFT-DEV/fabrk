/**
 * GDPR Compliance Utilities
 * Tools for GDPR compliance (Right to Access, Right to Erasure, etc.)
 *
 * Implements:
 * - Right to Access (Data Export)
 * - Right to Erasure (Data Deletion)
 * - Right to Rectification (Data Update)
 * - Right to Restrict Processing
 * - Right to Data Portability
 * - Consent Management
 */

import { AuditLog } from './audit-log';
import { logger } from '@/lib/logger';

export interface GDPRDataExport {
  userId: string;
  exportDate: Date;
  personalData: {
    profile: Record<string, unknown>;
    payments: Record<string, unknown>[];
    sessions: Record<string, unknown>[];
    auditLogs: Record<string, unknown>[];
    otherData: Record<string, unknown>;
  };
  metadata: {
    format: 'json' | 'csv';
    version: string;
  };
}

export interface ConsentRecord {
  userId: string;
  consentType: string;
  consentGiven: boolean;
  consentDate: Date;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Export all user data (GDPR Right to Access)
 */
export async function exportUserData(userId: string, userEmail: string): Promise<GDPRDataExport> {
  // Log the export request
  await AuditLog.gdprDataExported(userId, userEmail);

  // In production, fetch from database
  // This is a template - customize based on your schema
  const exportData: GDPRDataExport = {
    userId,
    exportDate: new Date(),
    personalData: {
      profile: {
        // User profile data
        // In production: await prisma.user.findUnique({ where: { id: userId } })
      },
      payments: [
        // Payment history
        // In production: await prisma.payment.findMany({ where: { userId } })
      ],
      sessions: [
        // Session history
        // In production: await prisma.session.findMany({ where: { userId } })
      ],
      auditLogs: [
        // User's audit logs
        // In production: await prisma.auditLog.findMany({ where: { userId } })
      ],
      otherData: {
        // Any other user data
        // feedbacks, analytics, etc.
      },
    },
    metadata: {
      format: 'json',
      version: '1.0',
    },
  };

  return exportData;
}

/**
 * Delete all user data (GDPR Right to Erasure)
 */
export async function deleteUserData(
  userId: string,
  userEmail: string,
  options: {
    keepAuditLogs?: boolean; // Required for legal compliance
    keepPaymentRecords?: boolean; // Required for tax/legal reasons
    anonymize?: boolean; // Anonymize instead of hard delete
  } = {}
): Promise<{ success: boolean; deletedRecords: Record<string, number> }> {
  const { keepAuditLogs = true, keepPaymentRecords = true, anonymize = true } = options;

  // Log the deletion request
  await AuditLog.gdprDataDeleted(userId, userEmail);

  const deletedRecords: Record<string, number> = {};

  // In production, implement actual deletion/anonymization
  // This is a template

  if (anonymize) {
    // Anonymize user data instead of deleting
    // await prisma.user.update({
    //   where: { id: userId },
    //   data: {
    //     email: `deleted-${userId}@anonymized.local`,
    //     name: "Deleted User",
    //     // ... anonymize other fields
    //   }
    // });
    deletedRecords.user = 1;
  } else {
    // Hard delete user
    // await prisma.user.delete({ where: { id: userId } });
    deletedRecords.user = 1;
  }

  // Delete or anonymize sessions
  // deletedRecords.sessions = await prisma.session.deleteMany({ where: { userId } });

  // Handle payment records
  if (!keepPaymentRecords) {
    // Only delete if legal requirements allow
    // deletedRecords.payments = await prisma.payment.deleteMany({ where: { userId } });
  } else {
    // Anonymize payment records
    // await prisma.payment.updateMany({
    //   where: { userId },
    //   data: { userId: null }
    // });
  }

  // Handle audit logs
  if (!keepAuditLogs) {
    // Usually not recommended due to compliance requirements
    // deletedRecords.auditLogs = await prisma.auditLog.deleteMany({ where: { userId } });
  } else {
    // Anonymize audit logs
    // await prisma.auditLog.updateMany({
    //   where: { userId },
    //   data: { userId: null, userEmail: null }
    // });
  }

  return {
    success: true,
    deletedRecords,
  };
}

/**
 * Anonymize user data (softer than deletion)
 */
export async function anonymizeUserData(userId: string): Promise<void> {
  // Replace personal data with anonymized values
  const _anonymizedEmail = `user-${userId}@anonymized.local`;
  const _anonymizedName = `User ${userId.substring(0, 8)}`;

  // In production:
  // await prisma.user.update({
  //   where: { id: userId },
  //   data: {
  //     email: anonymizedEmail,
  //     name: anonymizedName,
  //     // Clear other PII fields
  //   }
  // });
}

/**
 * Record user consent
 */
export async function recordConsent(consent: Omit<ConsentRecord, 'consentDate'>): Promise<void> {
  const record: ConsentRecord = {
    ...consent,
    consentDate: new Date(),
  };

  // In production, save to database
  // await prisma.consent.create({ data: record });

  logger.info('[GDPR] Consent recorded', { record });
}

/**
 * Check if user has given consent
 */
export async function hasConsent(_userId: string, _consentType: string): Promise<boolean> {
  // In production, check database
  // const consent = await prisma.consent.findFirst({
  //   where: { userId, consentType },
  //   orderBy: { consentDate: 'desc' }
  // });
  // return consent?.consentGiven || false;

  return false; // Default: no consent
}

/**
 * Revoke user consent
 */
export async function revokeConsent(userId: string, consentType: string): Promise<void> {
  await recordConsent({
    userId,
    consentType,
    consentGiven: false,
  });
}

/**
 * Get all consents for user
 */
export async function getUserConsents(_userId: string): Promise<ConsentRecord[]> {
  // In production:
  // return await prisma.consent.findMany({
  //   where: { userId },
  //   orderBy: { consentDate: 'desc' }
  // });

  return [];
}

/**
 * Generate GDPR-compliant privacy policy template
 */
export function generatePrivacyPolicyTemplate(companyName: string): string {
  return `
# Privacy Policy

**Last Updated:** ${new Date().toLocaleDateString()}

## Introduction

${companyName} ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data and tell you about your privacy rights.

## Data We Collect

We collect and process the following data:
- Identity Data (name, username)
- Contact Data (email address, phone number)
- Technical Data (IP address, browser type, device information)
- Usage Data (how you use our service)
- Payment Data (payment card details via Stripe)

## How We Use Your Data

We use your data to:
- Provide and maintain our service
- Process your payments
- Send you service communications
- Improve our service
- Comply with legal obligations

## Your GDPR Rights

You have the right to:
- **Access** - Request copies of your personal data
- **Rectification** - Request correction of inaccurate data
- **Erasure** - Request deletion of your data
- **Restrict Processing** - Request restriction of processing
- **Data Portability** - Request transfer of your data
- **Object** - Object to processing of your data
- **Withdraw Consent** - Withdraw consent at any time

To exercise these rights, contact us at: privacy@${companyName.toLowerCase()}.com

## Data Retention

We retain your data:
- Account data: Until account deletion + 90 days
- Payment data: 7 years (legal requirement)
- Audit logs: 1 year
- Analytics data: 2 years

## Data Security

We implement appropriate technical and organizational measures to ensure data security, including:
- Encryption in transit (TLS/SSL)
- Encryption at rest
- Access controls and authentication
- Regular security audits
- Staff training

## International Transfers

Your data may be transferred to countries outside the EU. We ensure adequate protection through:
- EU-approved Standard Contractual Clauses
- Adequacy decisions
- Privacy Shield (where applicable)

## Cookies

We use cookies and similar technologies. See our Cookie Policy for details.

## Changes to This Policy

We may update this policy from time to time. We will notify you of significant changes.

## Contact Us

For questions about this privacy policy or to exercise your rights:
- Email: privacy@${companyName.toLowerCase()}.com
- Address: [Your Address]

## Supervisory Authority

You have the right to lodge a complaint with your local data protection authority.
  `.trim();
}

/**
 * Data Retention Policy Checker
 */
export function shouldDeleteData(createdAt: Date, retentionPeriodDays: number): boolean {
  const now = new Date();
  const daysSinceCreation = Math.floor(
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysSinceCreation > retentionPeriodDays;
}

/**
 * Detect PII in text (simple version)
 */
export function detectPII(text: string): {
  hasPII: boolean;
  types: string[];
} {
  const types: string[] = [];

  // Email
  if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text)) {
    types.push('email');
  }

  // Phone number
  if (/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text)) {
    types.push('phone');
  }

  // SSN (US)
  if (/\d{3}-\d{2}-\d{4}/.test(text)) {
    types.push('ssn');
  }

  // Credit card
  if (/\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/.test(text)) {
    types.push('credit_card');
  }

  // IP address
  if (/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(text)) {
    types.push('ip_address');
  }

  return {
    hasPII: types.length > 0,
    types,
  };
}

/**
 * Redact PII from text
 */
export function redactPII(text: string): string {
  return text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL REDACTED]')
    .replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[PHONE REDACTED]')
    .replace(/\d{3}-\d{2}-\d{4}/g, '[SSN REDACTED]')
    .replace(/\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/g, '[CARD REDACTED]');
}
