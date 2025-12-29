export function LogRetentionSection() {
  return {
    title: 'Log Retention',
    description: 'Set up automatic cleanup of old logs',
    code: `// scripts/cleanup-audit-logs.ts

import { prisma } from "@/lib/db";

const RETENTION_DAYS = {
  info: 30,      // Keep info logs for 30 days
  warning: 90,   // Keep warning logs for 90 days
  error: 180,    // Keep error logs for 180 days
  critical: 365, // Keep critical logs for 1 year
};

async function cleanupAuditLogs() {
  const now = new Date();

  for (const [severity, days] of Object.entries(RETENTION_DAYS)) {
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const result = await prisma.auditLog.deleteMany({
      where: {
        severity,
        createdAt: { lt: cutoffDate },
      },
    });

    console.log(\`Deleted \${result.count} \${severity} logs older than \${days} days\`);
  }
}

cleanupAuditLogs()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

// Run as cron job:
// 0 0 * * * npx ts-node scripts/cleanup-audit-logs.ts`,
    language: 'typescript' as const,
  };
}
