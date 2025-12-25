/**
 * Security Tab Component - 2FA, Sessions, Password
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Smartphone, Clock, LogOut, Key } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

interface SecurityTabProps {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  activeSessions: ActiveSession[];
  onEnable2FA: () => void;
  onRevokeSession: (sessionId: string) => void;
}

export function SecurityTab({
  twoFactorEnabled,
  lastPasswordChange,
  activeSessions,
  onEnable2FA,
  onRevokeSession,
}: SecurityTabProps) {
  return (
    <div className="space-y-6">
      {/* 2FA Section */}
      <Card tone="neutral">
        <CardHeader code="0x06" title="TWO FACTOR" icon={<Smartphone className="h-4 w-4" />} />
        <CardContent padding="md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="border-border bg-primary/10 flex h-10 w-10 items-center justify-center border">
                <Smartphone className="text-primary h-5 w-5" />
              </div>
              <div>
                <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
                  [TWO FACTOR AUTH]:
                </div>
                <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
                  Add an extra layer of security with TOTP
                </div>
              </div>
            </div>
            <span
              className={`border px-2 py-0.5 font-mono text-xs ${
                twoFactorEnabled
                  ? 'border-success/50 text-success'
                  : 'border-destructive/50 text-destructive'
              }`}
            >
              {twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
            </span>
          </div>
          <p className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
            Use an authenticator app like Google Authenticator or Authy to generate time-based
            codes.
          </p>
          <Button onClick={onEnable2FA} className={cn(mode.radius, mode.font, 'text-xs')}>
            <Smartphone className="mr-2 h-4 w-4" />
            &gt; {twoFactorEnabled ? 'MANAGE 2FA' : 'ENABLE 2FA'}
          </Button>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card tone="neutral">
        <CardHeader code="0x07" title="SESSIONS" icon={<Clock className="h-4 w-4" />} />
        <CardContent padding="md">
          <div className="mb-4 flex items-center gap-4">
            <div className="border-border bg-primary/10 flex h-10 w-10 items-center justify-center border">
              <Clock className="text-primary h-5 w-5" />
            </div>
            <div>
              <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
                [ACTIVE SESSIONS]: COUNT={activeSessions.length}
              </div>
            </div>
          </div>
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className="border-border flex items-center justify-between border p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span>{session.device}</span>
                    {session.isCurrent && (
                      <span className="border-primary/50 text-primary border px-1.5 py-0.5">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <div className="text-muted-foreground">
                    {session.location} • {session.ip}
                  </div>
                  <div className="text-muted-foreground">Last active: {session.lastActive}</div>
                </div>
                {!session.isCurrent && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRevokeSession(session.id)}
                    className={cn(mode.radius, mode.font, 'text-xs')}
                  >
                    <LogOut className="mr-2 h-3 w-3" />
                    &gt; REVOKE
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              className={cn(mode.radius, mode.font, 'text-xs')}
            >
              <LogOut className="mr-2 h-3 w-3" />
              &gt; SIGN OUT ALL OTHER DEVICES
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card tone="neutral">
        <CardHeader code="0x08" title="PASSWORD" icon={<Key className="h-4 w-4" />} />
        <CardContent padding="md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="border-border bg-primary/10 flex h-10 w-10 items-center justify-center border">
                <Key className="text-primary h-5 w-5" />
              </div>
              <div>
                <div className={cn(mode.font, 'text-muted-foreground text-xs')}>[PASSWORD]:</div>
                <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
                  Last changed: {new Date(lastPasswordChange).toLocaleDateString()}
                </div>
              </div>
            </div>
            <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
              &gt; CHANGE PASSWORD
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
