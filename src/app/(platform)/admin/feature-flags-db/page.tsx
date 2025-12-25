/**
 * Database-backed Feature Flags Management
 * Persistent feature flags with admin controls
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Trash2, Flag } from 'lucide-react';
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
import { formatLabel } from '@/design-system';

interface FeatureFlag {
  id: string;
  name: string;
  description: string | null;
  enabled: boolean;
  rolloutPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function FeatureFlagsDbPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFlag, setNewFlag] = useState({
    name: '',
    description: '',
    enabled: false,
    rolloutPercentage: 0,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flagToDelete, setFlagToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    try {
      const res = await fetch('/api/admin/feature-flags');
      const data = await res.json();
      setFlags(data.flags || []);
    } catch {
      toast.error('Failed to fetch feature flags');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      const res = await fetch('/api/admin/feature-flags', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, enabled }),
      });

      if (!res.ok) throw new Error('Failed to update');

      toast.success(`Feature flag ${enabled ? 'enabled' : 'disabled'}`);
      fetchFlags();
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleRolloutChange = async (id: string, rolloutPercentage: number) => {
    try {
      const res = await fetch('/api/admin/feature-flags', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, rolloutPercentage }),
      });

      if (!res.ok) throw new Error('Failed to update');

      fetchFlags();
    } catch {
      toast.error('Failed to update rollout percentage');
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/admin/feature-flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFlag),
      });

      if (!res.ok) throw new Error('Failed to create');

      toast.success('Feature flag created');
      setNewFlag({
        name: '',
        description: '',
        enabled: false,
        rolloutPercentage: 0,
      });
      setShowCreateForm(false);
      fetchFlags();
    } catch {
      toast.error('Failed to create feature flag');
    }
  };

  const confirmDelete = async () => {
    if (!flagToDelete) return;

    setDeleteDialogOpen(false);

    try {
      const res = await fetch(`/api/admin/feature-flags?id=${flagToDelete}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Feature flag deleted');
      fetchFlags();
    } catch {
      toast.error('Failed to delete feature flag');
    } finally {
      setFlagToDelete(null);
    }
  };

  if (loading) {
    return <div className="flex h-48 items-center justify-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Feature Flags (Database)</h1>
          <p className="text-muted-foreground">Persistent feature flags with rollout control</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="mr-2 h-4 w-4" />
          &gt; NEW FLAG
        </Button>
      </div>

      {showCreateForm && (
        <Card tone="primary">
          <CardHeader code="0x00" title="CREATE FEATURE FLAG" icon={<Plus className="h-4 w-4" />} />
          <CardContent className="space-y-4">
            <div>
              <Label>{formatLabel('Flag Name')}</Label>
              <Input
                value={newFlag.name}
                onChange={(e) => setNewFlag({ ...newFlag, name: e.target.value })}
                placeholder="new_feature"
              />
            </div>
            <div>
              <Label>{formatLabel('Description')}</Label>
              <Textarea
                value={newFlag.description}
                onChange={(e) => setNewFlag({ ...newFlag, description: e.target.value })}
                placeholder="What does this flag control?"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={newFlag.enabled}
                onCheckedChange={(checked) => setNewFlag({ ...newFlag, enabled: checked })}
              />
              <Label>{formatLabel('Enable immediately')}</Label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate}>&gt; CREATE</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                &gt; CANCEL
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {flags.map((flag) => (
          <Card key={flag.id} tone={flag.enabled ? 'success' : 'neutral'}>
            <div className="border-border flex items-center justify-between border-b px-4 py-2">
              <CardHeader
                code={`0x${flags.indexOf(flag) + 1}`}
                title={flag.name.toUpperCase()}
                meta={flag.enabled ? 'Enabled' : 'Disabled'}
                icon={<Flag className="h-4 w-4" />}
                className="border-0 p-0"
              />
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`toggle-${flag.id}`}
                    checked={flag.enabled}
                    onCheckedChange={(checked) => handleToggle(flag.id, checked)}
                  />
                  <Label htmlFor={`toggle-${flag.id}`} className="cursor-pointer">
                    {formatLabel(flag.enabled ? 'Enabled' : 'Disabled')}
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setFlagToDelete(flag.id);
                    setDeleteDialogOpen(true);
                  }}
                  aria-label="Delete feature flag"
                >
                  <Trash2 className="text-destructive h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{formatLabel('Rollout Percentage')}</Label>
                  <Badge variant="outline">{flag.rolloutPercentage}%</Badge>
                </div>
                <Slider
                  value={[flag.rolloutPercentage]}
                  onValueCommit={(value) => handleRolloutChange(flag.id, value[0])}
                  max={100}
                  step={5}
                  disabled={!flag.enabled}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {flags.length === 0 && (
          <Card tone="neutral">
            <CardContent className="text-muted-foreground flex h-48 items-center justify-center">
              No feature flags created yet. Click "New Flag" to create one.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Feature Flag Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Feature Flag?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the feature flag and remove
              it from all configurations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              &gt; DELETE FLAG
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
