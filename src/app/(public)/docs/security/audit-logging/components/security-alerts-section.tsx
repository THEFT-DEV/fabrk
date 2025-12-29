export function SecurityAlertsSection() {
  return {
    title: 'Security Alerts',
    description: 'Send alerts for critical events',
    code: `// src/lib/audit.ts

import { sendEmail } from "@/lib/email";

const ALERT_ACTIONS = [
  "user.password_reset",
  "admin.user_impersonated",
  "api key.created",
];

export async function createAuditLog(input: AuditLogInput) {
  const log = await prisma.auditLog.create({ /* ... */ });

  // Send alerts for critical actions
  if (
    input.severity === "critical" ||
    ALERT_ACTIONS.includes(input.action)
  ) {
    await sendSecurityAlert(log);
  }

  return log;
}

async function sendSecurityAlert(log: AuditLog) {
  const adminEmails = process.env.SECURITY_ALERT_EMAILS?.split(",") || [];

  for (const email of adminEmails) {
    await sendEmail({
      to: email,
      subject: \`Security Alert: \${log.action}\`,
      text: \`
        Action: \${log.action}
        Category: \${log.category}
        Severity: \${log.severity}
        User ID: \${log.userId || "N/A"}
        IP: \${log.ipAddress || "N/A"}
        Time: \${log.createdAt.toISOString()}

        Metadata: \${JSON.stringify(log.metadata, null, 2)}
      \`,
    });
  }
}`,
    language: 'typescript' as const,
  };
}
