'use client';

/**
 * Security Confirmation Dialogs
 * Alert dialogs for security actions
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Disable2FADialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function Disable2FADialog({ open, onOpenChange, onConfirm }: Disable2FADialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Disable Two-Factor Authentication?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove an important security layer from your account. You will only need your
            password to sign in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            &gt; DISABLE 2FA
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface DisconnectAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: string | null;
  onConfirm: () => void;
}

export function DisconnectAccountDialog({
  open,
  onOpenChange,
  provider,
  onConfirm,
}: DisconnectAccountDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Disconnect {provider} Account?</AlertDialogTitle>
          <AlertDialogDescription>
            This will disconnect your {provider} account. You&apos;ll need another way to sign in
            (password or another OAuth provider).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>&gt; DISCONNECT</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface InvalidateSessionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function InvalidateSessionsDialog({
  open,
  onOpenChange,
  onConfirm,
}: InvalidateSessionsDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign Out All Other Sessions?</AlertDialogTitle>
          <AlertDialogDescription>
            This will log you out of all devices except this one. You&apos;ll need to sign in again
            on those devices.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>&gt; SIGN OUT ALL SESSIONS</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
