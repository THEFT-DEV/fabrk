/**
 * FABRK COMPONENT
 * Confirmation Dialog - AlertDialog for destructive actions
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function ConfirmationDialog() {
  return (
    <Card>
      <CardHeader code="0x00" title="CONFIRMATION DIALOG" />
      <div className="p-6">
        <div className="mb-4">
          <h3 className={cn(mode.font, 'mb-1 font-semibold')}>Confirmation Dialog</h3>
          <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
            Destructive action confirmation with cancel option
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className={cn(mode.radius, mode.font, 'text-xs')}>
              <Trash2 className="mr-1 h-3 w-3" />
              &gt; DELETE ITEM
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className={cn(mode.radius, 'border-border')}>
            <AlertDialogHeader>
              <div className="mb-2 flex items-center gap-2">
                <div className={cn('border-destructive bg-destructive/10 border p-2', mode.radius)}>
                  <AlertTriangle className="text-destructive h-5 w-5" />
                </div>
              </div>
              <AlertDialogTitle className={cn(mode.font)}>[CONFIRM DELETE]</AlertDialogTitle>
              <AlertDialogDescription className={cn(mode.font, 'text-sm')}>
                This action cannot be undone. This will permanently delete the item and remove all
                associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={cn(mode.radius, mode.font, 'text-xs')}>
                &gt; CANCEL
              </AlertDialogCancel>
              <AlertDialogAction
                className={cn(
                  mode.radius,
                  mode.font,
                  'bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs'
                )}
              >
                &gt; DELETE
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className={cn(mode.font, 'text-muted-foreground mt-4 text-xs')}>
          [USE CASE]: Delete, logout, reset, irreversible actions
        </div>
      </div>
    </Card>
  );
}
