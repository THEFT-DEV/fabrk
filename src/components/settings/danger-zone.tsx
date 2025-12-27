'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function DangerZone() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteAccount = async () => {
    if (confirmText !== 'delete my account') {
      toast({
        title: 'Confirmation failed',
        description: 'Please type "delete my account" to confirm.',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: 'Account deleted',
      description: 'Your account and all associated data have been deleted.',
    });

    setIsLoading(false);
    setDeleteDialogOpen(false);
    setConfirmText('');

    // In a real app, redirect to home or login page
    // router.push("/");
  };

  const handleExportData = async () => {
    setIsLoading(true);

    // Simulate export delay for demo
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Data exported',
      description: 'Your data has been exported successfully.',
    });

    setExportDialogOpen(false);
    setIsLoading(false);
  };

  return (
    <Card tone="danger">
      <CardHeader code="0xFF" title="DANGER ZONE" />
      <CardContent className="space-y-6">
        <div className="border-t pt-4">
          <h3 className={cn(mode.font, 'mb-2 text-xs tracking-tight')}>[EXPORT YOUR DATA]:</h3>
          <p className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
            Download a copy of your account data in JSON format.
          </p>
          <Button
            variant="outline"
            onClick={() => setExportDialogOpen(true)}
            disabled={isLoading}
            className={cn(mode.radius, mode.font, 'text-xs')}
          >
            &gt; EXPORT DATA
          </Button>
        </div>

        <div className="border-t pt-4">
          <h3 className={cn(mode.font, 'text-destructive mb-2 text-xs tracking-tight')}>
            [DELETE ACCOUNT]:
          </h3>
          <p className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={isLoading}
            className={cn(mode.radius, mode.font, 'text-xs')}
          >
            &gt; DELETE ACCOUNT
          </Button>
        </div>
      </CardContent>

      <AlertDialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <AlertDialogContent className={cn(mode.radius, 'border-border border')}>
          <AlertDialogHeader>
            <AlertDialogTitle className={cn(mode.font, 'text-sm')}>[EXPORT DATA]:</AlertDialogTitle>
            <AlertDialogDescription className={cn(mode.font, 'text-xs')}>
              You will receive a download of all your account data in JSON format. This includes
              your profile, settings, and activity history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel className={cn(mode.radius, mode.font, 'text-xs')}>
              &gt; CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleExportData}
              disabled={isLoading}
              className={cn(mode.radius, mode.font, 'text-xs')}
            >
              {isLoading ? '> EXPORTING...' : '> EXPORT'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className={cn('max-w-md', mode.radius, 'border-destructive border')}>
          <AlertDialogHeader>
            <AlertDialogTitle className={cn(mode.font, 'text-destructive text-sm')}>
              [DELETE ACCOUNT]:
            </AlertDialogTitle>
            <AlertDialogDescription className={cn(mode.font, 'text-xs')}>
              This action cannot be undone. Your account and all data will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 space-y-4">
            <div>
              <p className={cn('text-xs', mode.font, 'mb-2')}>
                Type <span className={cn(mode.font, 'bg-muted px-2 py-1')}>delete my account</span>{' '}
                to confirm:
              </p>
              <Input
                placeholder="delete my account"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                disabled={isLoading}
                className={cn(mode.radius, mode.font, 'text-xs')}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel className={cn(mode.radius, mode.font, 'text-xs')}>
              &gt; CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isLoading || confirmText !== 'delete my account'}
              className={cn(
                mode.radius,
                mode.font,
                'bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs'
              )}
            >
              {isLoading ? '> DELETING...' : '> DELETE ACCOUNT'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
