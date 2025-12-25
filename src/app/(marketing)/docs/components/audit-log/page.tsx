'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { AuditLog } from '@/components/ui/audit-log';

const mockLogs = [
  {
    id: 'log_1',
    userId: 'user_123',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userAvatar: undefined,
    action: 'user.login' as const,
    resource: 'Authentication System',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    metadata: { method: 'email', device: 'desktop' },
    timestamp: new Date('2025-12-09T10:30:00'),
  },
  {
    id: 'log_2',
    userId: 'user_456',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    userAvatar: undefined,
    action: 'data.exported' as const,
    resource: 'User Data Export',
    ipAddress: '192.168.1.2',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    metadata: { format: 'CSV', records: 1500 },
    timestamp: new Date('2025-12-09T09:15:00'),
  },
];

export default function AuditLogPage() {
  return (
    <ComponentShowcaseTemplate
      code="[PRO.02]"
      category="Pro Pack"
      title="Audit Log"
      description="Enterprise security timeline tracking all user actions with filtering, search, and CSV export for compliance."
      importCode={`import { AuditLog } from "@/components/ui/audit-log"`}
      mainPreview={{
        preview: (
          <div className="w-full max-w-4xl">
            <AuditLog
              organizationId="org_123"
              initialLogs={mockLogs}
              onExport={async () => {
                // Export to CSV logic
              }}
            />
          </div>
        ),
        code: `<AuditLog
  organizationId="org_123"
  initialLogs={logs}
  onExport={async () => {
    // Export to CSV logic
  }}
/>`,
      }}
      props={[
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Additional CSS classes for the container.',
        },
        {
          name: 'organizationId',
          type: 'string',
          default: 'undefined',
          description: 'The ID of the organization (for multi-tenant apps).',
        },
        {
          name: 'onExport',
          type: '() => Promise<void>',
          default: 'undefined',
          description: 'Callback function to export audit logs to CSV.',
        },
        {
          name: 'onRefresh',
          type: '() => Promise<void>',
          default: 'undefined',
          description: 'Callback function to refresh the audit logs.',
        },
        {
          name: 'initialLogs',
          type: 'AuditLogEntry[]',
          default: '[]',
          description: 'Initial array of audit log entries to display.',
        },
      ]}
      accessibility={[
        'Timeline uses semantic HTML with proper ARIA labels',
        'Sheet dialog for log details with focus management',
        'Search input with placeholder and aria-label',
        'Filter dropdown with keyboard navigation',
        'Export button clearly labeled for screen readers',
        'All interactive elements are keyboard accessible',
      ]}
      previous={{
        title: 'API Key Manager',
        href: '/docs/components/api-key-manager',
      }}
      next={{
        title: 'Cookie Consent',
        href: '/docs/components/cookie-consent',
      }}
    />
  );
}
