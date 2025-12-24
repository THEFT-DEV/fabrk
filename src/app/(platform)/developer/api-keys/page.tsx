'use client';

/**
 * API Keys Management Page
 * Generate, view, and revoke API keys for programmatic access
 */

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ApiKeyHeader } from './components/api-key-header';
import { CreateKeyForm } from './components/create-key-form';
import { SecurityAlerts } from './components/security-alerts';
import { ApiKeysList } from './components/api-keys-list';
import { ApiDocumentation } from './components/api-documentation';
import { RevokeDialog } from './components/revoke-dialog';

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

export default function ApiKeysPage() {
  const { success, error } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isRevoking, setIsRevoking] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['read']);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [keyToRevoke, setKeyToRevoke] = useState<string | null>(null);

  // Fetch user's organization on mount
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch('/api/organizations');
        if (response.ok) {
          const data = await response.json();
          // Use the first organization (or implement org switcher for multi-org support)
          if (data.organizations && data.organizations.length > 0) {
            setOrganizationId(data.organizations[0].id);
          } else {
            error('No organization found', 'Please create an organization first to use API keys.');
          }
        } else {
          error('Failed to load organization', 'Please try again later');
        }
      } catch (err: unknown) {
        console.error('Error fetching organization:', err);
        error('Failed to load organization', 'A network error occurred.');
      }
    };

    fetchOrganization();
  }, [error]);

  const fetchApiKeys = useCallback(async () => {
    if (!organizationId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/api-keys?organizationId=${organizationId}`);
      if (response.ok) {
        const data = await response.json();
        setApiKeys(data);
      } else {
        const errorData = await response.json();
        error('Failed to load API keys', errorData.error || 'Please try again later');
      }
    } catch (err: unknown) {
      console.error('Error fetching API keys:', err);
      error('Failed to load API keys', 'A network error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [organizationId, error]);

  // Fetch API keys when organization is loaded
  useEffect(() => {
    if (organizationId) {
      fetchApiKeys();
    }
  }, [organizationId, fetchApiKeys]);

  const handleCreateKey = async () => {
    if (!organizationId) {
      error('Organization not loaded', 'Please wait for organization data to load');
      return;
    }

    if (!newKeyName.trim()) {
      error('Name required', 'Please enter a descriptive name for your API key');
      return;
    }

    if (selectedPermissions.length === 0) {
      error('Permissions required', 'Please select at least one permission level for the API key');
      return;
    }

    setIsCreating(true);

    try {
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organizationId,
          name: newKeyName,
          permissions: selectedPermissions,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCreatedKey(data.key); // Full key only shown once
        setNewKeyName('');
        setSelectedPermissions(['read']);
        setIsDialogOpen(false);
        fetchApiKeys(); // Refresh list
        success(
          'API key created',
          "Make sure to copy your new API key - you won't be able to see it again!"
        );
      } else {
        const errorData = await response.json();
        error(
          'Failed to create API key',
          errorData.error || 'An error occurred while creating the API key. Please try again.'
        );
      }
    } catch (err: unknown) {
      console.error('Error creating API key:', err);
      error(
        'Failed to create API key',
        'A network error occurred. Please check your connection and try again.'
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      success('Copied to clipboard', 'API key has been copied to your clipboard');
    } catch (err: unknown) {
      console.error('Error copying to clipboard:', err);
      error('Failed to copy', 'Please try copying manually');
    }
  };

  const confirmRevokeKey = async () => {
    if (!keyToRevoke) return;

    setIsRevoking(keyToRevoke);
    setRevokeDialogOpen(false);

    try {
      const response = await fetch(`/api/api-keys/${keyToRevoke}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        success(
          'API key revoked',
          'The API key has been permanently revoked and can no longer be used'
        );
        fetchApiKeys(); // Refresh list
      } else {
        const errorData = await response.json();
        error(
          'Failed to revoke API key',
          errorData.error || 'An error occurred while revoking the API key. Please try again.'
        );
      }
    } catch (err: unknown) {
      console.error('Error revoking API key:', err);
      error(
        'Failed to revoke API key',
        'A network error occurred. Please check your connection and try again.'
      );
    } finally {
      setIsRevoking(null);
      setKeyToRevoke(null);
    }
  };

  const togglePermission = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleRevokeClick = (id: string) => {
    setKeyToRevoke(id);
    setRevokeDialogOpen(true);
  };

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      <ApiKeyHeader isDialogOpen={isDialogOpen} onDialogOpenChange={setIsDialogOpen}>
        <CreateKeyForm
          newKeyName={newKeyName}
          selectedPermissions={selectedPermissions}
          isCreating={isCreating}
          onNameChange={setNewKeyName}
          onTogglePermission={togglePermission}
          onSubmit={handleCreateKey}
        />
      </ApiKeyHeader>

      <SecurityAlerts
        createdKey={createdKey}
        onCopyKey={handleCopyKey}
        onDismissCreatedKey={() => setCreatedKey(null)}
      />

      <ApiKeysList
        apiKeys={apiKeys}
        loading={loading}
        isRevoking={isRevoking}
        onCopyKey={handleCopyKey}
        onRevokeKey={handleRevokeClick}
      />

      <ApiDocumentation organizationId={organizationId} />

      <RevokeDialog
        open={revokeDialogOpen}
        onOpenChange={setRevokeDialogOpen}
        onConfirm={confirmRevokeKey}
      />
    </div>
  );
}
