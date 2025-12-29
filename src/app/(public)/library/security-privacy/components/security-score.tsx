/**
 * Security Score Component - Terminal console style
 */

import { useMemo } from 'react';
import { CheckCircle2, XCircle, Shield } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface SecurityScoreProps {
  user: {
    emailVerified: boolean;
    twoFactorEnabled: boolean;
    lastPasswordChange: string; // Ensure this matches the actual prop type
  };
}

export function SecurityScore({ user }: SecurityScoreProps) {
  // eslint-disable-next-line react-hooks/purity
  const nowTime = Date.now();

  const daysSincePasswordChange = useMemo(() => {
    if (!user.lastPasswordChange) return Infinity;
    const lastChange = new Date(user.lastPasswordChange).getTime();
    return Math.floor((nowTime - lastChange) / (1000 * 60 * 60 * 24));
  }, [user.lastPasswordChange, nowTime]); // Add nowTime to dependencies

  return (
    <Card tone="primary">
      <CardHeader code="0x00" title="SECURITY SCORE" icon={<Shield className="h-4 w-4" />} />
      <CardContent padding="md">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                mode.font,
                'border-border bg-primary/10 text-primary flex h-16 w-16 items-center justify-center border text-xl font-semibold',
                mode.radius
              )}
            >
              75%
            </div>
            <div>
              <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
                [SECURITY SCORE]:
              </div>
              <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
                Good security posture, but improvements recommended
              </div>
            </div>
          </div>
          <span
            className={cn(mode.font, 'border-warning/50 text-warning border px-2 py-0.5 text-xs', mode.radius)}
          >
            MEDIUM RISK
          </span>
        </div>
        <div className={cn(mode.font, 'space-y-2 text-xs')}>
          <div className="flex items-center gap-2">
            {user.emailVerified ? (
              <CheckCircle2 className="text-success h-4 w-4" />
            ) : (
              <XCircle className="text-destructive h-4 w-4" />
            )}
            <span>EMAIL VERIFIED: {user.emailVerified ? 'TRUE' : 'FALSE'}</span>
          </div>
          <div className="flex items-center gap-2">
            {user.twoFactorEnabled ? (
              <CheckCircle2 className="text-success h-4 w-4" />
            ) : (
              <XCircle className="text-destructive h-4 w-4" />
            )}
            <span>TWO FACTOR AUTH: {user.twoFactorEnabled ? 'TRUE' : 'FALSE'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-success h-4 w-4" />
            <span>
              PASSWORD CHANGED: {daysSincePasswordChange} DAYS AGO (recommended: every 90 days)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
