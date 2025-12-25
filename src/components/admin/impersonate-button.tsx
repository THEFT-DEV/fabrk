'use client';

/**
 * Impersonate Button
 * Button to start impersonating a user (for admin user table)
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
interface ImpersonateButtonProps {
  userId: string;
  userName?: string;
  userEmail: string;
  disabled?: boolean;
}

export function ImpersonateButton({
  userId,
  userName,
  userEmail,
  disabled,
}: ImpersonateButtonProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImpersonate() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/users/impersonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, reason }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to start impersonation');
        return;
      }

      // Redirect to dashboard as the impersonated user
      window.location.href = data.redirect || '/dashboard';
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={disabled}
          className={cn('text-xs', mode.font)}
          aria-label={`Impersonate ${userName || userEmail}`}
        >
          <Eye className="mr-1 h-4 w-4" />
          VIEW_AS
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card border">
        <DialogHeader>
          <DialogTitle className={cn('text-foreground', mode.font)}>[IMPERSONATE USER]</DialogTitle>
          <DialogDescription className={cn('text-muted-foreground text-sm', mode.font)}>
            You will view the dashboard as{' '}
            <strong className="text-foreground">{userName || userEmail}</strong>. This action will
            be logged.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className={cn('text-xs', mode.font)}>
              [REASON]:
            </Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Customer support ticket #1234"
              className={cn('text-sm', mode.font)}
            />
            <p className={cn('text-muted-foreground text-xs', mode.font)}>
              Optional but recommended for audit purposes
            </p>
          </div>

          {error && <p className={cn('text-destructive text-xs', mode.font)}>[ERROR]: {error}</p>}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className={cn('text-xs', mode.font)}
          >
            CANCEL
          </Button>
          <Button
            onClick={handleImpersonate}
            disabled={loading}
            className={cn('text-xs', mode.font)}
          >
            {loading ? '> STARTING...' : '> START IMPERSONATION'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
