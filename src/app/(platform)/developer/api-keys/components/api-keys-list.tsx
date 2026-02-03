/**
 * API Keys List Component
 * Displays list of API keys or empty state
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, Copy, Trash2, Loader2 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  permissions: string[];
  lastUsedAt: string | null;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
}

interface ApiKeysListProps {
  apiKeys: ApiKey[];
  loading: boolean;
  isRevoking: string | null;
  onCopyKey: (key: string) => void;
  onRevokeKey: (id: string) => void;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Never';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};

const maskKey = (keyPrefix: string) => {
  return `${keyPrefix}${'•'.repeat(40)}`;
};

const getPermissionBadgeVariant = (
  permission: string
): 'default' | 'secondary' | 'accent' | 'outline' => {
  switch (permission) {
    case 'read':
      return 'default';
    case 'write':
      return 'secondary';
    case 'admin':
      return 'accent';
    default:
      return 'outline';
  }
};

export function ApiKeysList({
  apiKeys,
  loading,
  isRevoking,
  onCopyKey,
  onRevokeKey,
}: ApiKeysListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className={cn('h-8 w-8 animate-spin', mode.color.text.muted)} />
      </div>
    );
  }

  if (apiKeys.length === 0) {
    return (
      <Card>
        <CardContent className="space-y-4 pt-6 text-center">
          <Key className={cn('mx-auto h-12 w-12', mode.color.text.muted)} />
          <div>
            <h3 className={cn('mb-1 font-semibold', mode.color.text.primary)}>No API keys yet</h3>
            <p className={cn('mb-4 text-sm', mode.color.text.muted)}>
              Create an API key to start making programmatic requests
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {apiKeys.map((apiKey, index) => (
        <Card key={apiKey.id}>
          <CardHeader
            code={`0x${index.toString(16).padStart(2, '0')}`}
            title={apiKey.name.toUpperCase()}
            icon={<Key className="h-4 w-4" />}
          />
          <CardContent>
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-start gap-6">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    {apiKey.permissions.map((permission) => (
                      <Badge
                        key={permission}
                        variant={getPermissionBadgeVariant(permission)}
                        className="text-xs"
                      >
                        {permission}
                      </Badge>
                    ))}
                  </div>
                  <p className={cn(mode.font, 'text-sm', mode.color.text.muted)}>
                    Created {formatDate(apiKey.createdAt)} by{' '}
                    {apiKey.user.name || apiKey.user.email}
                  </p>
                  <p className={cn(mode.font, 'text-sm', mode.color.text.muted)}>
                    Last used {formatDate(apiKey.lastUsedAt)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRevokeKey(apiKey.id)}
                disabled={isRevoking === apiKey.id}
              >
                {isRevoking === apiKey.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Revoking...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Revoke
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <code
                className={cn(
                  'flex-1 border p-2 text-sm',
                  mode.color.bg.muted,
                  mode.color.border.default,
                  mode.radius,
                  mode.font
                )}
              >
                {maskKey(apiKey.keyPrefix)}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopyKey(apiKey.keyPrefix)}
                title="Copy prefix"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
