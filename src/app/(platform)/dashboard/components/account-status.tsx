/**
 * Account Status Component
 * Displays current account information and status
 */

'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Activity } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface AccountStatusProps {
  mfaEnabled?: boolean;
  userTier?: string | null;
}

export function AccountStatus({ mfaEnabled, userTier }: AccountStatusProps) {
  return (
    <Card>
      <CardHeader code="0x00" title="ACCOUNT STATUS" />
      <CardContent>
        <p className={cn(mode.font, 'text-muted-foreground', 'mb-4', 'text-xs')}>
          Current account information and status
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <div className={cn('flex items-center gap-4 border p-4', mode.radius)}>
            <Shield className="text-muted-foreground h-5 w-5" />
            <div>
              <p className={cn(mode.font, 'text-sm', 'font-medium')}>Security</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant={mfaEnabled ? 'default' : 'secondary'}>
                  2FA {mfaEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </div>
          </div>

          <div className={cn('flex items-center gap-4 border p-4', mode.radius)}>
            <Users className="text-muted-foreground h-5 w-5" />
            <div>
              <p className={cn(mode.font, 'text-sm', 'font-medium')}>Account Type</p>
              <Badge variant="outline" className="mt-1">
                {userTier || 'FREE'}
              </Badge>
            </div>
          </div>

          <div className={cn('flex items-center gap-4 border p-4', mode.radius)}>
            <Activity className="text-muted-foreground h-5 w-5" />
            <div>
              <p className={cn(mode.font, 'text-sm', 'font-medium')}>Status</p>
              <Badge className="bg-success text-success-foreground mt-1">Active</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
