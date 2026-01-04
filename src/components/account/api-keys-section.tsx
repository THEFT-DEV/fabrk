'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mode } from '@/design-system';
import { formatLabel } from '@/design-system';
import { cn } from '@/lib/utils';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

export function ApiKeysSection() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API',
      key: 'sk_live_xxxxxxxxxxxxxxxxxxxx',
      createdAt: '2024-01-15',
      lastUsed: '2024-10-28',
    },
    {
      id: '2',
      name: 'Development API',
      key: 'sk_test_xxxxxxxxxxxxxxxxxxxx',
      createdAt: '2024-02-20',
      lastUsed: '2024-10-30',
    },
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  async function handleGenerateKey() {
    if (!newKeyName.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter a name for your API key.',
      });
      return;
    }

    setIsGenerating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk_live_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setIsDialogOpen(false);
    setIsGenerating(false);

    toast({
      title: 'API key generated',
      description: 'Your new API key has been created successfully.',
    });
  }

  async function handleCopyKey(key: string) {
    try {
      await navigator.clipboard.writeText(key);
      toast({
        title: 'API key copied',
        description: 'The API key has been copied to your clipboard.',
      });
    } catch {
      toast({
        title: 'Failed to copy',
        description: 'Please try again or copy manually.',
      });
    }
  }

  async function handleDeleteKey(id: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setApiKeys(apiKeys.filter((key) => key.id !== id));

    toast({
      title: 'API key deleted',
      description: 'The API key has been permanently deleted.',
    });
  }

  return (
    <Card tone="neutral">
      <CardHeader
        code="0x09"
        title="API KEYS"
        meta={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>&gt; GENERATE NEW KEY</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate API Key</DialogTitle>
                <DialogDescription>
                  Create a new API key for your application. Keep it secure and don't share it
                  publicly.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name">{formatLabel('Key Name')}</Label>
                  <Input
                    id="key-name"
                    placeholder="e.g., Production API"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                  <p className="text-muted-foreground text-xs">
                    Give your API key a descriptive name to identify its purpose.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isGenerating}
                >
                  &gt; CANCEL
                </Button>
                <Button onClick={handleGenerateKey} disabled={isGenerating}>
                  {isGenerating ? '&gt; GENERATING...' : '&gt; GENERATE KEY'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <CardContent>
        {apiKeys.length === 0 ? (
          <div className={cn('border border-dashed p-8 text-center', mode.radius)}>
            <p className="text-muted-foreground mb-4 text-sm">
              No API keys yet. Generate one to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className={cn('space-y-4 border p-4', mode.radius)}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{apiKey.name}</p>
                    <p className="text-muted-foreground text-xs">Created on {apiKey.createdAt}</p>
                  </div>
                  {apiKey.lastUsed && <Badge variant="outline">Last used: {apiKey.lastUsed}</Badge>}
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input value={apiKey.key} readOnly className={cn('text-sm', mode.font)} />
                    <Button
                      variant="outline"
                      onClick={() => handleCopyKey(apiKey.key)}
                      className="shrink-0"
                    >
                      &gt; COPY
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteKey(apiKey.id)}
                  >
                    &gt; DELETE
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
