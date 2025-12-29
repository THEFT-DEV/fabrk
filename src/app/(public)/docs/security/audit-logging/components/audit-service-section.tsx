export function AuditServiceSection() {
  return {
    title: 'Audit Service',
    description: 'Create a service to log events',
    code: `// src/lib/audit.ts

import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export type AuditAction =
  | "user.login"
  | "user.logout"
  | "user.register"
  | "user.password_reset"
  | "user.email verified"
  | "user.updated"
  | "user.deleted"
  | "payment.created"
  | "payment.failed"
  | "subscription.created"
  | "subscription.cancelled"
  | "api key.created"
  | "api key.revoked"
  | "organization.created"
  | "organization.member_added"
  | "organization.member_removed"
  | "admin.user_impersonated"
  | "admin.settings_changed";

export type AuditCategory = "auth" | "billing" | "admin" | "organization" | "api";
export type AuditSeverity = "info" | "warning" | "error" | "critical";

interface AuditLogInput {
  action: AuditAction;
  category: AuditCategory;
  severity?: AuditSeverity;
  userId?: string;
  actorType?: "user" | "system" | "api";
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  status?: "success" | "failure";
  errorMessage?: string;
  request?: NextRequest;
}

export async function createAuditLog(input: AuditLogInput) {
  const {
    action,
    category,
    severity = "info",
    userId,
    actorType = "user",
    targetType,
    targetId,
    metadata,
    status = "success",
    errorMessage,
    request,
  } = input;

  // Extract request context
  let ipAddress: string | undefined;
  let userAgent: string | undefined;

  if (request) {
    ipAddress = request.ip ??
      request.headers.get("x-forwarded-for")?.split(",")[0] ??
      undefined;
    userAgent = request.headers.get("user-agent") ?? undefined;
  }

  return prisma.auditLog.create({
    data: {
      action,
      category,
      severity,
      userId,
      actorType,
      ipAddress,
      userAgent,
      targetType,
      targetId,
      metadata,
      status,
      errorMessage,
    },
  });
}`,
    language: 'typescript' as const,
  };
}
