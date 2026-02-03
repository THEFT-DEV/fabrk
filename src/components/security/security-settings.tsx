'use client';

/**
 * Security Settings Client Component
 * Manage 2FA, sessions, connected accounts, and security preferences
 *
 * Split into subcomponents:
 * - Security2FACard
 * - SecurityAccountsCard
 * - SecuritySessionsCard
 * - SecurityPasswordCard
 * - SecurityRecommendationsCard
 * - Security2FASetupDialog
 * - SecurityDialogs (Disable2FA, DisconnectAccount, InvalidateSessions)
 */

import { useState } from 'react';
import { BackupCodesModal } from '@/components/security/backup-codes-modal';
import { Button } from '@/components/ui/button';
import { useCsrfFetch } from '@/hooks/use-csrf-token';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';

// Split components
import { Security2FACard } from './security-2fa-card';
import { SecurityAccountsCard } from './security-accounts-card';
import { SecuritySessionsCard } from './security-sessions-card';
import { SecurityPasswordCard } from './security-password-card';
import { SecurityRecommendationsCard } from './security-recommendations-card';
import { Security2FASetupDialog } from './security-2fa-setup-dialog';
import {
  Disable2FADialog,
  DisconnectAccountDialog,
  InvalidateSessionsDialog,
} from './security-dialogs';

interface SecuritySettingsProps {
  user: {
    email: string;
    emailVerified: boolean;
    sessionVersion: number;
    twoFactorEnabled: boolean;
  };
  connectedAccounts: Array<{
    provider: string;
    accountId: string;
  }>;
}

export function SecuritySettings({ user, connectedAccounts }: SecuritySettingsProps) {
  const { info, error } = useToast();
  const fetchWithCsrf = useCsrfFetch();

  // Loading states
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [isDisabling2FA, setIsDisabling2FA] = useState(false);
  const [disconnectingProvider, setDisconnectingProvider] = useState<string | null>(null);
  const [isInvalidatingSessions, setIsInvalidatingSessions] = useState(false);

  // Dialog states
  const [disable2FADialogOpen, setDisable2FADialogOpen] = useState(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false);
  const [providerToDisconnect, setProviderToDisconnect] = useState<string | null>(null);
  const [invalidateSessionsDialogOpen, setInvalidateSessionsDialogOpen] = useState(false);
  const [backupCodesModalOpen, setBackupCodesModalOpen] = useState(false);

  // 2FA Setup Modal states
  const [setup2FAModalOpen, setSetup2FAModalOpen] = useState(false);
  const [qrCodeUri, setQrCodeUri] = useState<string>('');
  const [setupBackupCodes, setSetupBackupCodes] = useState<string[]>([]);
  const [totpSecret, setTotpSecret] = useState<string>('');

  const handleEnable2FA = async () => {
    setIsEnabling2FA(true);

    try {
      const response = await fetchWithCsrf('/api/user/2fa/setup', {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to setup 2FA');
      }

      const data = await response.json();
      setQrCodeUri(data.qrCodeUri);
      setTotpSecret(data.secret);
      setSetupBackupCodes(data.backupCodes);
      setSetup2FAModalOpen(true);
    } catch (err: unknown) {
      error(
        'Error enabling 2FA',
        err instanceof Error ? err.message : 'Failed to enable two-factor authentication'
      );
    } finally {
      setIsEnabling2FA(false);
    }
  };

  const handleVerify2FA = async (code: string): Promise<boolean> => {
    try {
      const response = await fetchWithCsrf('/api/user/2fa/verify', {
        method: 'POST',
        body: JSON.stringify({ token: code }),
      });

      if (!response.ok) {
        const data = await response.json();
        error('Verification Failed', data.error || 'Please check your code and try again');
        return false;
      }

      info('2FA Verified', 'Two-factor authentication has been enabled.');
      return true;
    } catch (err: unknown) {
      error(
        'Verification Failed',
        err instanceof Error ? err.message : 'Please check your code and try again'
      );
      return false;
    }
  };

  const handle2FASetupComplete = () => {
    window.location.reload();
  };

  const confirmDisable2FA = async () => {
    setIsDisabling2FA(true);
    setDisable2FADialogOpen(false);

    try {
      const response = await fetchWithCsrf('/api/auth/mfa/disable', {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to disable 2FA');
      }

      info(
        '2FA Disabled',
        'Two-factor authentication has been disabled. Consider re-enabling it for better security.'
      );
      window.location.reload();
    } catch (err: unknown) {
      error(
        'Error disabling 2FA',
        err instanceof Error ? err.message : 'Failed to disable two-factor authentication'
      );
    } finally {
      setIsDisabling2FA(false);
    }
  };

  const handleDisconnectRequest = (provider: string) => {
    setProviderToDisconnect(provider);
    setDisconnectDialogOpen(true);
  };

  const confirmDisconnectAccount = async () => {
    if (!providerToDisconnect) return;

    setDisconnectingProvider(providerToDisconnect);
    setDisconnectDialogOpen(false);

    try {
      const response = await fetchWithCsrf(`/api/user/accounts/${providerToDisconnect}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to disconnect account');
      }

      info(
        'Account Disconnected',
        `Your ${providerToDisconnect} account has been disconnected successfully.`
      );
      window.location.reload();
    } catch (err: unknown) {
      error(
        'Error disconnecting account',
        err instanceof Error ? err.message : `Failed to disconnect ${providerToDisconnect} account`
      );
    } finally {
      setDisconnectingProvider(null);
      setProviderToDisconnect(null);
    }
  };

  const confirmInvalidateAllSessions = async () => {
    setIsInvalidatingSessions(true);
    setInvalidateSessionsDialogOpen(false);

    try {
      const response = await fetchWithCsrf('/api/user/sessions/invalidate-all', {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to invalidate sessions');
      }

      info('Sessions Invalidated', 'All other sessions have been logged out. Redirecting...');

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (err: unknown) {
      error(
        'Error invalidating sessions',
        err instanceof Error ? err.message : 'Failed to invalidate all sessions'
      );
    } finally {
      setIsInvalidatingSessions(false);
    }
  };

  const handleRegenerateBackupCodes = async (): Promise<string[]> => {
    const response = await fetchWithCsrf('/api/auth/mfa/regenerate-codes', {
      method: 'POST',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to regenerate backup codes');
    }

    const data = await response.json();
    return data.backupCodes;
  };

  return (
    <div className="space-y-6">
      {/* Email Verification Status */}
      {!user.emailVerified && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your email is not verified. Please check your inbox for the verification link.
            <Button variant="link" className="ml-2 h-auto p-0">
              &gt; RESEND VERIFICATION EMAIL
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Two-Factor Authentication */}
      <Security2FACard
        twoFactorEnabled={user.twoFactorEnabled}
        isEnabling2FA={isEnabling2FA}
        isDisabling2FA={isDisabling2FA}
        onEnable2FA={handleEnable2FA}
        onDisable2FA={() => setDisable2FADialogOpen(true)}
        onViewBackupCodes={() => setBackupCodesModalOpen(true)}
      />

      {/* Connected Accounts */}
      <SecurityAccountsCard
        connectedAccounts={connectedAccounts}
        disconnectingProvider={disconnectingProvider}
        onDisconnect={handleDisconnectRequest}
      />

      {/* Active Sessions */}
      <SecuritySessionsCard
        sessionVersion={user.sessionVersion}
        isInvalidatingSessions={isInvalidatingSessions}
        onInvalidateSessions={() => setInvalidateSessionsDialogOpen(true)}
      />

      {/* Password */}
      <SecurityPasswordCard />

      {/* Security Recommendations */}
      <SecurityRecommendationsCard
        emailVerified={user.emailVerified}
        twoFactorEnabled={user.twoFactorEnabled}
        connectedAccountsCount={connectedAccounts.length}
      />

      {/* Dialogs */}
      <Disable2FADialog
        open={disable2FADialogOpen}
        onOpenChange={setDisable2FADialogOpen}
        onConfirm={confirmDisable2FA}
      />

      <DisconnectAccountDialog
        open={disconnectDialogOpen}
        onOpenChange={setDisconnectDialogOpen}
        provider={providerToDisconnect}
        onConfirm={confirmDisconnectAccount}
      />

      <InvalidateSessionsDialog
        open={invalidateSessionsDialogOpen}
        onOpenChange={setInvalidateSessionsDialogOpen}
        onConfirm={confirmInvalidateAllSessions}
      />

      {/* 2FA Setup Modal */}
      <Security2FASetupDialog
        open={setup2FAModalOpen}
        onOpenChange={setSetup2FAModalOpen}
        qrCodeUri={qrCodeUri}
        totpSecret={totpSecret}
        backupCodes={setupBackupCodes}
        onVerify={handleVerify2FA}
        onComplete={handle2FASetupComplete}
      />

      {/* Backup Codes Modal */}
      <BackupCodesModal
        open={backupCodesModalOpen}
        onOpenChange={setBackupCodesModalOpen}
        onRegenerate={handleRegenerateBackupCodes}
      />
    </div>
  );
}
