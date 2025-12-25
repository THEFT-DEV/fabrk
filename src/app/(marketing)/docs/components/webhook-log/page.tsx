'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { WebhookLog } from '@/components/ui/webhook-log';

const mockLogs = [
  {
    id: 'log_1',
    endpoint: 'https://api.example.com/webhooks/events',
    method: 'POST' as const,
    status: 'success' as const,
    statusCode: 200,
    requestPayload: JSON.stringify(
      {
        event: 'user.created',
        data: { userId: '123', email: 'user@example.com' },
      },
      null,
      2
    ),
    responsePayload: JSON.stringify({ status: 'received', id: 'evt_123' }, null, 2),
    error: null,
    timestamp: new Date('2025-12-09T10:30:00'),
    duration: 342,
    retryCount: 0,
  },
  {
    id: 'log_2',
    endpoint: 'https://api.example.com/webhooks/failed',
    method: 'POST' as const,
    status: 'failed' as const,
    statusCode: 500,
    requestPayload: JSON.stringify({ event: 'payment.completed', amount: 4999 }, null, 2),
    responsePayload: null,
    error: 'Connection timeout after 5000ms',
    timestamp: new Date('2025-12-09T09:15:00'),
    duration: 5000,
    retryCount: 2,
  },
  {
    id: 'log_3',
    endpoint: 'https://api.example.com/webhooks/pending',
    method: 'POST' as const,
    status: 'retrying' as const,
    statusCode: null,
    requestPayload: JSON.stringify({ event: 'subscription.renewed' }, null, 2),
    responsePayload: null,
    error: 'Request failed with status code 503',
    timestamp: new Date('2025-12-09T08:00:00'),
    duration: null,
    retryCount: 1,
  },
];

export default function WebhookLogPage() {
  return (
    <ComponentShowcaseTemplate
      code="[PRO.05]"
      category="Pro Pack"
      title="Webhook Log"
      description="Track webhook delivery status with filtering, retry functionality, and detailed request/response debugging."
      importCode={`import { WebhookLog } from "@/components/ui/webhook-log"`}
      mainPreview={{
        preview: (
          <div className="w-full max-w-4xl">
            <WebhookLog
              userId="user_123"
              initialLogs={mockLogs}
              onRetry={async (_logId) => {
                // Retry webhook logic
              }}
              onRefresh={async () => {
                // Refresh logs logic
              }}
            />
          </div>
        ),
        code: `<WebhookLog
  userId="user_123"
  initialLogs={logs}
  onRetry={async (logId) => {
    // Retry failed webhook
  }}
  onRefresh={async () => {
    // Refresh logs
  }}
  realtimeUpdates={true}
  pollInterval={5000}
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
          name: 'userId',
          type: 'string',
          default: 'undefined',
          description: 'The ID of the user viewing webhook logs.',
        },
        {
          name: 'onRetry',
          type: '(logId: string) => Promise<void>',
          default: 'undefined',
          description: 'Callback to retry a failed webhook delivery.',
        },
        {
          name: 'onRefresh',
          type: '() => Promise<void>',
          default: 'undefined',
          description: 'Callback to refresh webhook logs from the server.',
        },
        {
          name: 'initialLogs',
          type: 'WebhookLogEntry[]',
          default: '[]',
          description: 'Initial array of webhook log entries.',
        },
        {
          name: 'realtimeUpdates',
          type: 'boolean',
          default: 'false',
          description: 'Enable automatic polling for new webhook logs.',
        },
        {
          name: 'pollInterval',
          type: 'number',
          default: '5000',
          description: 'Polling interval in milliseconds (when realtimeUpdates is true).',
        },
      ]}
      accessibility={[
        'Status badges use color AND text for accessibility',
        'Search input with placeholder and clear labeling',
        'Filter dropdown with keyboard navigation',
        'Retry buttons disabled during operation with loading state',
        'Sheet dialog for detailed view with focus management',
        'All code blocks have proper syntax highlighting',
      ]}
      previous={{
        title: 'Onboarding Checklist',
        href: '/docs/components/onboarding-checklist',
      }}
      next={{ title: 'Select', href: '/docs/components/select' }}
    />
  );
}
