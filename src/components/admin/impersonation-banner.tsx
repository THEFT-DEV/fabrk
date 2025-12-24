'use client';

/**
 * Impersonation Banner
 * Shown at the top of the page when admin is impersonating a user
 */

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
interface ImpersonationStatus {
  isImpersonating: boolean;
  originalUser?: {
    id: string;
    name: string;
    email: string;
  };
  targetUser?: {
    id: string;
    name: string;
    email: string;
  };
}

export function ImpersonationBanner() {
  const [status, setStatus] = useState<ImpersonationStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkImpersonationStatus();
  }, []);

  async function checkImpersonationStatus() {
    try {
      const res = await fetch('/api/admin/users/impersonate');
      const data = await res.json();
      setStatus(data);
    } catch {
      setStatus({ isImpersonating: false });
    }
  }

  async function exitImpersonation() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users/impersonate', {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        // Reload to restore admin context
        window.location.href = data.redirect || '/admin/users';
      }
    } catch (error) {
      console.error('Failed to exit impersonation:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!status?.isImpersonating) {
    return null;
  }

  return (
    <div className="border-warning bg-warning/10 fixed top-0 right-0 left-0 z-[100] border-b-2 px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AlertTriangle className="text-warning h-5 w-5" />
          <span className={cn('text-foreground text-sm', mode.font)}>
            <span className="text-warning">[IMPERSONATION MODE]</span> Viewing as:{' '}
            <strong>{status.targetUser?.name || status.targetUser?.email || 'User'}</strong>
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={exitImpersonation}
          disabled={loading}
          className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
        >
          {loading ? (
            '> EXITING...'
          ) : (
            <>
              <X className="mr-1 h-4 w-4" />
              &gt; EXIT IMPERSONATION
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
