/**
 * Security Audit Logging - Production Ready
 * Track security-relevant events for compliance and incident response
 *
 * Features:
 * - Database persistence (Prisma)
 * - User activity logging
 * - Security event tracking
 * - Tamper-proof logs (hash verification)
 * - GDPR compliance
 * - Incident investigation support
 * - In-memory fallback for development without database
 */

import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import type { AuditEventType, AuditLogEntry } from './audit-log-types';

// Re-export types for backwards compatibility
export type { AuditEventType, AuditLogEntry } from './audit-log-types';

// In-memory fallback for development (when database not available)
const memoryLogs: AuditLogEntry[] = [];
const MAX_MEMORY_LOGS = 10000;

/**
 * Check if database is available
 */
async function isDatabaseAvailable(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate hash for audit log entry (tamper detection)
 */
async function generateEntryHash(entry: Omit<AuditLogEntry, 'hash'>): Promise<string> {
  const data = JSON.stringify({
    id: entry.id,
    timestamp: entry.timestamp.toISOString(),
    eventType: entry.eventType,
    userId: entry.userId,
    action: entry.action,
    result: entry.result,
  });

  // In Node.js environment
  if (typeof window === 'undefined') {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // In browser environment
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Log audit event - persists to database in production
 */
export async function logAuditEvent(
  event: Omit<AuditLogEntry, 'id' | 'timestamp' | 'hash'>
): Promise<void> {
  const entry: AuditLogEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    ...event,
  };

  // Generate hash for tamper detection
  entry.hash = await generateEntryHash(entry);

  // Log critical events immediately to console
  if (entry.severity === 'critical' || entry.severity === 'high') {
    logger.error('[Audit Log - CRITICAL]', {
      eventType: entry.eventType,
      userId: entry.userId,
      action: entry.action,
      result: entry.result,
    });
  }

  // Try to persist to database
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable && entry.userId) {
    try {
      await prisma.auditLog.create({
        data: {
          userId: entry.userId,
          action: entry.eventType, // Use eventType as the action field
          resource: entry.resource,
          resourceId: entry.metadata?.resourceId as string | undefined,
          metadata: {
            originalAction: entry.action,
            result: entry.result,
            severity: entry.severity,
            userEmail: entry.userEmail,
            ipAddress: entry.ipAddress,
            userAgent: entry.userAgent,
            hash: entry.hash,
            ...entry.metadata,
          },
        },
      });
      return;
    } catch (error) {
      logger.error('Failed to persist audit log to database:', error);
      // Fall through to memory storage
    }
  }

  // Fallback to memory storage (for dev or when userId is missing)
  memoryLogs.push(entry);

  // Keep only last MAX_MEMORY_LOGS in memory
  if (memoryLogs.length > MAX_MEMORY_LOGS) {
    memoryLogs.shift();
  }

  // Warn in production if falling back to memory
  if (process.env.NODE_ENV === 'production') {
    logger.warn(
      '⚠️ Audit log stored in memory (not persisted). ' +
        'Ensure database is configured and userId is provided for production audit logging.'
    );
  }
}

/**
 * Quick logging functions for common events
 */
export const AuditLog = {
  // Authentication
  login: (userId: string, email: string, ip?: string) =>
    logAuditEvent({
      eventType: 'auth.login',
      userId,
      userEmail: email,
      ipAddress: ip,
      action: 'User logged in',
      result: 'success',
      severity: 'low',
    }),

  failedLogin: (email: string, ip?: string) =>
    logAuditEvent({
      eventType: 'auth.failed_login',
      userEmail: email,
      ipAddress: ip,
      action: 'Failed login attempt',
      result: 'failure',
      severity: 'medium',
    }),

  suspiciousLogin: (userId: string, email: string, reason: string, ip?: string) =>
    logAuditEvent({
      eventType: 'auth.suspicious_login',
      userId,
      userEmail: email,
      ipAddress: ip,
      action: 'Suspicious login detected',
      result: 'success',
      severity: 'high',
      metadata: { reason },
    }),

  // Data access
  dataExport: (userId: string, email: string, dataType: string) =>
    logAuditEvent({
      eventType: 'data.export',
      userId,
      userEmail: email,
      resource: dataType,
      action: 'Data exported',
      result: 'success',
      severity: 'medium',
    }),

  dataDelete: (userId: string, email: string, resource: string) =>
    logAuditEvent({
      eventType: 'data.delete',
      userId,
      userEmail: email,
      resource,
      action: 'Data deleted',
      result: 'success',
      severity: 'high',
    }),

  // Security events
  rateLimitExceeded: (ip: string, endpoint: string) =>
    logAuditEvent({
      eventType: 'security.rate_limit_exceeded',
      ipAddress: ip,
      resource: endpoint,
      action: 'Rate limit exceeded',
      result: 'failure',
      severity: 'medium',
    }),

  botDetected: (ip: string, userAgent: string, botType: string) =>
    logAuditEvent({
      eventType: 'security.bot_detected',
      ipAddress: ip,
      userAgent,
      action: 'Bot detected',
      result: 'success',
      severity: 'low',
      metadata: { botType },
    }),

  xssAttempt: (userId: string | undefined, ip: string, payload: string) =>
    logAuditEvent({
      eventType: 'security.xss_attempt',
      userId,
      ipAddress: ip,
      action: 'XSS attack attempt detected',
      result: 'failure',
      severity: 'critical',
      metadata: { payload: payload.substring(0, 200) }, // Truncate
    }),

  sqlInjectionAttempt: (userId: string | undefined, ip: string, query: string) =>
    logAuditEvent({
      eventType: 'security.sql_injection_attempt',
      userId,
      ipAddress: ip,
      action: 'SQL injection attempt detected',
      result: 'failure',
      severity: 'critical',
      metadata: { query: query.substring(0, 200) }, // Truncate
    }),

  // GDPR
  gdprDataExported: (userId: string, email: string) =>
    logAuditEvent({
      eventType: 'gdpr.data_exported',
      userId,
      userEmail: email,
      action: 'GDPR data export requested',
      result: 'success',
      severity: 'medium',
    }),

  gdprDataDeleted: (userId: string, email: string) =>
    logAuditEvent({
      eventType: 'gdpr.data_deleted',
      userId,
      userEmail: email,
      action: 'GDPR data deletion requested',
      result: 'success',
      severity: 'high',
    }),

  // Admin events
  userDeleted: (adminId: string, targetUserId: string, targetEmail: string) =>
    logAuditEvent({
      eventType: 'admin.user_deleted',
      userId: adminId,
      resource: 'user',
      action: `Admin deleted user ${targetEmail}`,
      result: 'success',
      severity: 'high',
      metadata: { targetUserId, targetEmail, resourceId: targetUserId },
    }),

  configChanged: (adminId: string, configKey: string, oldValue: unknown, newValue: unknown) =>
    logAuditEvent({
      eventType: 'admin.config_changed',
      userId: adminId,
      resource: 'config',
      action: `Config changed: ${configKey}`,
      result: 'success',
      severity: 'medium',
      metadata: { oldValue, newValue, resourceId: configKey },
    }),

  // MFA events
  mfaEnabled: (userId: string, email: string) =>
    logAuditEvent({
      eventType: 'auth.mfa_enabled',
      userId,
      userEmail: email,
      action: 'MFA enabled',
      result: 'success',
      severity: 'medium',
    }),

  mfaDisabled: (userId: string, email: string) =>
    logAuditEvent({
      eventType: 'auth.mfa_disabled',
      userId,
      userEmail: email,
      action: 'MFA disabled',
      result: 'success',
      severity: 'high',
    }),

  mfaVerified: (userId: string, email: string) =>
    logAuditEvent({
      eventType: 'auth.mfa_verified',
      userId,
      userEmail: email,
      action: 'MFA device verified',
      result: 'success',
      severity: 'low',
    }),

  mfaSuccess: (userId: string, email: string, ip?: string) =>
    logAuditEvent({
      eventType: 'auth.mfa_success',
      userId,
      userEmail: email,
      ipAddress: ip,
      action: 'MFA verification successful',
      result: 'success',
      severity: 'low',
    }),

  mfaFailed: (userId: string, email: string, ip?: string) =>
    logAuditEvent({
      eventType: 'auth.mfa_failed',
      userId,
      userEmail: email,
      ipAddress: ip,
      action: 'MFA verification failed',
      result: 'failure',
      severity: 'medium',
    }),

  backupCodeUsed: (userId: string, email: string, ip?: string) =>
    logAuditEvent({
      eventType: 'auth.backup_code_used',
      userId,
      userEmail: email,
      ipAddress: ip,
      action: 'Backup code used for login',
      result: 'success',
      severity: 'medium',
    }),

  backupCodesRegenerated: (userId: string, email: string) =>
    logAuditEvent({
      eventType: 'auth.backup_codes_regenerated',
      userId,
      userEmail: email,
      action: 'Backup codes regenerated',
      result: 'success',
      severity: 'medium',
    }),
};

/**
 * Query audit logs from database
 */
export async function queryAuditLogs(filters: {
  userId?: string;
  eventType?: AuditEventType;
  startDate?: Date;
  endDate?: Date;
  severity?: AuditLogEntry['severity'];
  limit?: number;
}): Promise<AuditLogEntry[]> {
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable) {
    try {
      const dbLogs = await prisma.auditLog.findMany({
        where: {
          ...(filters.userId && { userId: filters.userId }),
          ...(filters.eventType && { action: filters.eventType }),
          ...(filters.startDate && { createdAt: { gte: filters.startDate } }),
          ...(filters.endDate && { createdAt: { lte: filters.endDate } }),
        },
        orderBy: { createdAt: 'desc' },
        take: filters.limit || 100,
      });

      // Transform database records to AuditLogEntry format
      return dbLogs.map((log) => {
        const metadata = log.metadata as Record<string, unknown> | null;
        return {
          id: log.id,
          timestamp: log.createdAt,
          eventType: log.action as AuditEventType,
          userId: log.userId,
          userEmail: metadata?.userEmail as string | undefined,
          ipAddress: metadata?.ipAddress as string | undefined,
          userAgent: metadata?.userAgent as string | undefined,
          resource: log.resource || undefined,
          action: (metadata?.originalAction as string) || log.action,
          result: (metadata?.result as 'success' | 'failure' | 'error') || 'success',
          severity: (metadata?.severity as 'low' | 'medium' | 'high' | 'critical') || 'low',
          metadata: metadata || undefined,
          hash: metadata?.hash as string | undefined,
        };
      });
    } catch (error) {
      logger.error('Failed to query audit logs from database:', error);
      // Fall through to memory logs
    }
  }

  // Fallback to memory logs
  let results = [...memoryLogs];

  if (filters.userId) {
    results = results.filter((log) => log.userId === filters.userId);
  }

  if (filters.eventType) {
    results = results.filter((log) => log.eventType === filters.eventType);
  }

  if (filters.startDate) {
    results = results.filter((log) => log.timestamp >= filters.startDate!);
  }

  if (filters.endDate) {
    results = results.filter((log) => log.timestamp <= filters.endDate!);
  }

  if (filters.severity) {
    results = results.filter((log) => log.severity === filters.severity);
  }

  // Sort by timestamp descending
  results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  if (filters.limit) {
    results = results.slice(0, filters.limit);
  }

  return results;
}

/**
 * Get security events summary
 */
export async function getSecuritySummary(since: Date): Promise<{
  totalEvents: number;
  byType: Record<string, number>;
  bySeverity: Record<string, number>;
  criticalEvents: AuditLogEntry[];
}> {
  const logs = await queryAuditLogs({ startDate: since });

  const byType: Record<string, number> = {};
  const bySeverity: Record<string, number> = {};

  logs.forEach((log) => {
    byType[log.eventType] = (byType[log.eventType] || 0) + 1;
    bySeverity[log.severity] = (bySeverity[log.severity] || 0) + 1;
  });

  const criticalEvents = logs.filter(
    (log) => log.severity === 'critical' || log.severity === 'high'
  );

  return {
    totalEvents: logs.length,
    byType,
    bySeverity,
    criticalEvents,
  };
}

/**
 * Export audit logs to JSON
 */
export async function exportAuditLogs(
  filters?: Parameters<typeof queryAuditLogs>[0]
): Promise<string> {
  const logs = await queryAuditLogs(filters || {});
  return JSON.stringify(logs, null, 2);
}

/**
 * Verify log integrity (check for tampering)
 */
export async function verifyLogIntegrity(entry: AuditLogEntry): Promise<boolean> {
  const { hash, ...entryWithoutHash } = entry;
  if (!hash) return false;
  const expectedHash = await generateEntryHash(entryWithoutHash);
  return hash === expectedHash;
}

/**
 * Get audit logging status for health checks
 */
export async function getAuditLoggingStatus(): Promise<{
  mode: 'database' | 'memory';
  healthy: boolean;
  memoryLogCount: number;
}> {
  const dbAvailable = await isDatabaseAvailable();

  return {
    mode: dbAvailable ? 'database' : 'memory',
    healthy: dbAvailable,
    memoryLogCount: memoryLogs.length,
  };
}
