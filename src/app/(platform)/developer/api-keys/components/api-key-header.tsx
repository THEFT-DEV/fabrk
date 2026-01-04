/**
 * API Keys Page Header
 * Header section with title and create button
 */

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface ApiKeyHeaderProps {
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function ApiKeyHeader({ isDialogOpen, onDialogOpenChange, children }: ApiKeyHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-semibold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground text-sm">
            Manage API keys for programmatic access to your account
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Give your API key a descriptive name and select permissions
              </DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
