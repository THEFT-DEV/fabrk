'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { ApiKeyManager } from '@/components/ui/api-key-manager';

// Example keys with masked format to avoid triggering secret scanners
const mockKeys = [
  {
    id: 'key_1',
    name: 'Production API Key',
    key: 'sk_live_****************************DEMO',
    lastUsed: new Date('2025-12-08'),
    createdAt: new Date('2025-12-01'),
  },
  {
    id: 'key_2',
    name: 'Development Key',
    key: 'sk_test_****************************DEMO',
    lastUsed: null,
    createdAt: new Date('2025-12-05'),
  },
];

export default function ApiKeyManagerPage() {
  return (
    <ComponentShowcaseTemplate
      code="[PRO.01]"
      category="Pro Pack"
      title="API Key Manager"
      description="Generate, view, and revoke API keys for programmatic access with copy-to-clipboard and search functionality."
      importCode={`import { ApiKeyManager } from "@/components/ui/api-key-manager"`}
      mainPreview={{
        preview: (
          <div className="w-full max-w-4xl">
            <ApiKeyManager userId="user_123" initialKeys={mockKeys} />
          </div>
        ),
        code: `<ApiKeyManager
  userId="user_123"
  initialKeys={keys}
  onGenerate={async (name) => {
    // Generate key logic
    return newKey;
  }}
  onRevoke={async (id) => {
    // Revoke key logic
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
          name: 'userId',
          type: 'string',
          default: 'required',
          description: 'The ID of the user managing API keys.',
        },
        {
          name: 'onGenerate',
          type: '(name: string) => Promise<ApiKey>',
          default: 'undefined',
          description:
            'Callback function to generate a new API key. If not provided, uses mock implementation.',
        },
        {
          name: 'onRevoke',
          type: '(id: string) => Promise<void>',
          default: 'undefined',
          description: 'Callback function to revoke an API key.',
        },
        {
          name: 'initialKeys',
          type: 'ApiKey[]',
          default: '[]',
          description: 'Initial array of API keys to display.',
        },
      ]}
      accessibility={[
        'Dialog for key generation with proper ARIA labels',
        'AlertDialog for revocation confirmation',
        'Copy buttons have aria-label for screen readers',
        'Search input with placeholder text',
        'Keyboard navigation support for all interactive elements',
        'Focus visible styles for keyboard users',
      ]}
      previous={{
        title: 'Animated Counter',
        href: '/docs/components/animated-counter',
      }}
      next={{ title: 'Audit Log', href: '/docs/components/audit-log' }}
    />
  );
}
