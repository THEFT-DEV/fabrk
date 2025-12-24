/**
 * Audit Log Types
 * Type definitions for security audit logging
 */

export type AuditEventType =
  // Authentication events
  | 'auth.login'
  | 'auth.logout'
  | 'auth.register'
  | 'auth.password_reset'
  | 'auth.email_verified'
  | 'auth.failed_login'
  | 'auth.suspicious_login'
  | 'auth.mfa_enabled'
  | 'auth.mfa_disabled'
  | 'auth.mfa_verified'
  | 'auth.mfa_success'
  | 'auth.mfa_failed'
  | 'auth.backup_code_used'
  | 'auth.backup_codes_regenerated'

  // Authorization events
  | 'authz.role_changed'
  | 'authz.permission_granted'
  | 'authz.permission_denied'
  | 'authz.access_denied'

  // Data access events
  | 'data.read'
  | 'data.create'
  | 'data.update'
  | 'data.delete'
  | 'data.export'

  // Payment events
  | 'payment.initiated'
  | 'payment.completed'
  | 'payment.failed'
  | 'payment.refunded'

  // Admin events
  | 'admin.user_deleted'
  | 'admin.user_suspended'
  | 'admin.config_changed'
  | 'admin.feature_flag_changed'

  // Security events
  | 'security.rate_limit_exceeded'
  | 'security.bot_detected'
  | 'security.suspicious_activity'
  | 'security.xss_attempt'
  | 'security.sql_injection_attempt'
  | 'security.csrf_detected'

  // GDPR events
  | 'gdpr.data_exported'
  | 'gdpr.data_deleted'
  | 'gdpr.consent_given'
  | 'gdpr.consent_revoked'

  // System events
  | 'system.error'
  | 'system.config_changed'
  | 'system.backup_completed';

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  eventType: AuditEventType;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  resource?: string;
  action: string;
  result: 'success' | 'failure' | 'error';
  metadata?: Record<string, unknown>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  hash?: string;
}
