/**
 * Security Library Index
 * Comprehensive security utilities for production SaaS
 *
 * Modules:
 * - Rate Limiting: DDoS and brute-force protection
 * - Input Validation: XSS, SQL injection, sanitization
 * - Security Headers: CSP, CORS, HSTS, etc.
 * - Bot Protection: CAPTCHA, honeypots, detection
 * - Audit Logging: Security event tracking
 * - GDPR: Compliance utilities
 */

// Rate Limiting
export {
  checkRateLimit,
  checkRateLimitRedis,
  rateLimit,
  getClientIdentifier,
  isWhitelisted,
  isBlacklisted,
  calculateBackoff,
  RateLimiters,
  type RateLimitConfig,
} from './rate-limit';

// Input Validation
export {
  ValidationSchemas,
  sanitizeString,
  sanitizeHTML,
  validateEmail,
  validatePassword,
  validatePagination,
  detectSQLInjection,
  detectXSS,
  detectPathTraversal,
  validateFileUpload,
  sanitizeFilename,
  validateJSON,
  createSchema,
  validateRequest,
} from './validation';

// Security Headers
export {
  generateCSP,
  securityHeaders,
  applySecurityHeaders,
  securityHeadersMiddleware,
  applyCORSHeaders,
  generateNonce,
  isAllowedOrigin,
  type CORSOptions,
} from './headers';

// Bot Protection
export {
  detectBot,
  shouldAllowBot,
  verifyHoneypot,
  verifySubmissionTiming,
  verifyHCaptcha,
  verifyRecaptcha,
  verifyTurnstile,
  generateDeviceFingerprint,
  type BotType,
  type BotDetectionResult,
  type CaptchaVerification,
} from './bot-protection';

// Audit Logging
export {
  logAuditEvent,
  AuditLog,
  queryAuditLogs,
  getSecuritySummary,
  exportAuditLogs,
  verifyLogIntegrity,
  type AuditEventType,
  type AuditLogEntry,
} from './audit-log';

// GDPR Compliance
export {
  exportUserData,
  deleteUserData,
  anonymizeUserData,
  recordConsent,
  hasConsent,
  revokeConsent,
  getUserConsents,
  generatePrivacyPolicyTemplate,
  shouldDeleteData,
  detectPII,
  redactPII,
  type GDPRDataExport,
  type ConsentRecord,
} from './gdpr';
