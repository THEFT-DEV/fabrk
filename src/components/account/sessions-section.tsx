'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Session {
  id: string;
  device: string;
  browser: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

const mockSessions: Session[] = [
  {
    id: '1',
    device: 'MacBook Pro',
    browser: 'Chrome',
    ip: '192.168.1.100',
    lastActive: 'Now',
    isCurrent: true,
  },
  {
    id: '2',
    device: 'iPhone 14',
    browser: 'Safari',
    ip: '10.0.0.50',
    lastActive: '2 hours ago',
    isCurrent: false,
  },
  {
    id: '3',
    device: 'Windows PC',
    browser: 'Firefox',
    ip: '203.0.113.45',
    lastActive: '1 day ago',
    isCurrent: false,
  },
];

export function SessionsSection() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [revokeSessionId, setRevokeSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRevokeSession = async (sessionId: string) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSessions(sessions.filter((s) => s.id !== sessionId));

    toast({
      title: 'Session revoked',
      description: 'The session has been revoked successfully.',
    });

    setRevokeSessionId(null);
    setIsLoading(false);
  };

  return (
    <Card tone="neutral">
      <CardHeader code="0x06" title="ACTIVE SESSIONS" />
      <CardContent>
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <p className="text-muted-foreground text-sm">No active sessions.</p>
          ) : (
            <div className="border-border overflow-x-auto border">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="bg-muted/30 rounded-none">
                    <th className={cn('rounded-none px-2 py-2 text-left font-medium', mode.font)}>
                      Device
                    </th>
                    <th className={cn('rounded-none px-2 py-2 text-left font-medium', mode.font)}>
                      Browser
                    </th>
                    <th className={cn('rounded-none px-2 py-2 text-left font-medium', mode.font)}>
                      IP Address
                    </th>
                    <th className={cn('rounded-none px-2 py-2 text-left font-medium', mode.font)}>
                      Last Active
                    </th>
                    <th className={cn('rounded-none px-2 py-2 text-left font-medium', mode.font)}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr key={session.id} className="border-b last:border-b-0">
                      <td className="px-2 py-4">
                        <div>
                          <p className="font-medium">{session.device}</p>
                          {session.isCurrent && (
                            <p className="text-success text-xs">Current session</p>
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-4">{session.browser}</td>
                      <td className={cn('px-2 py-4 text-xs', mode.font)}>{session.ip}</td>
                      <td className="px-2 py-4">{session.lastActive}</td>
                      <td className="px-2 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setRevokeSessionId(session.id)}
                          disabled={session.isCurrent || isLoading}
                          className="text-destructive hover:text-destructive"
                        >
                          {isLoading && revokeSessionId === session.id
                            ? '> REVOKING...'
                            : '> REVOKE'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>

      <AlertDialog open={!!revokeSessionId} onOpenChange={() => setRevokeSessionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Session</AlertDialogTitle>
            <AlertDialogDescription>
              This will sign out the device from this session. You can sign back in anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => revokeSessionId && handleRevokeSession(revokeSessionId)}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? '&gt; REVOKING...' : '&gt; REVOKE'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
