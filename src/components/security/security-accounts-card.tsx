'use client';

/**
 * Connected Accounts Card
 * Part of SecuritySettings split
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link2, Trash2 } from 'lucide-react';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
interface ConnectedAccount {
  provider: string;
  accountId: string;
}

interface SecurityAccountsCardProps {
  connectedAccounts: ConnectedAccount[];
  disconnectingProvider: string | null;
  onDisconnect: (provider: string) => void;
}

export function SecurityAccountsCard({
  connectedAccounts,
  disconnectingProvider,
  onDisconnect,
}: SecurityAccountsCardProps) {
  return (
    <Card tone="neutral">
      <CardHeader
        code="0x01"
        title="CONNECTED ACCOUNTS"
        icon={<Link2 className="h-4 w-4" />}
        meta={`${connectedAccounts.length} ${connectedAccounts.length === 1 ? 'account' : 'accounts'}`}
      />
      <CardContent className="space-y-4">
        <p className={cn(mode.font, 'text-muted-foreground', 'mb-4', 'text-xs')}>
          Manage third-party accounts linked to your Fabrk account
        </p>
        {connectedAccounts.length === 0 ? (
          <p className={cn(mode.font, 'text-muted-foreground', 'text-xs')}>
            No connected accounts. You can link Google or GitHub for faster sign-in.
          </p>
        ) : (
          <div className="space-y-4">
            {connectedAccounts.map((account, i) => (
              <div
                key={i}
                className={cn(
                  'border-border flex items-center justify-between border p-4',
                  mode.radius
                )}
              >
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={cn(mode.font, 'capitalize')}>
                    {account.provider}
                  </Badge>
                  <span className={cn(mode.font, 'text-muted-foreground', 'text-xs')}>
                    Connected
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDisconnect(account.provider)}
                  disabled={disconnectingProvider === account.provider}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {disconnectingProvider === account.provider
                    ? '> DISCONNECTING...'
                    : '> DISCONNECT'}
                </Button>
              </div>
            ))}
          </div>
        )}

        <Separator />

        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            &gt; CONNECT GOOGLE
          </Button>
          <Button variant="outline" size="sm">
            &gt; CONNECT GITHUB
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
