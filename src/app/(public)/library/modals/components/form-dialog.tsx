/**
 * FABRK COMPONENT
 * Form Dialog - Modal form for creating or editing items
 */

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FormDialog({ open, onOpenChange }: FormDialogProps) {
  return (
    <Card>
      <CardHeader code="0x00" title="FORM DIALOG" />
      <div className="p-6">
        <div className="mb-4">
          <h3 className={cn(mode.font, 'mb-1 font-semibold')}>Form Dialog</h3>
          <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
            Modal form for creating or editing items
          </p>
        </div>

        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button className={cn(mode.radius, mode.font, 'text-xs')}>
              <Plus className="mr-1 h-3 w-3" />
              &gt; CREATE PROJECT
            </Button>
          </DialogTrigger>
          <DialogContent className={cn(mode.radius, 'border-border')}>
            <DialogHeader>
              <DialogTitle className={cn(mode.font)}>[NEW PROJECT]</DialogTitle>
              <DialogDescription className={cn(mode.font, 'text-sm')}>
                Create a new project to organize your work.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className={cn(mode.font, 'text-xs')}>[PROJECT NAME]:</Label>
                <Input
                  placeholder="my-awesome-project"
                  className={cn(mode.radius, mode.font, 'text-sm')}
                />
              </div>
              <div className="space-y-2">
                <Label className={cn(mode.font, 'text-xs')}>[DESCRIPTION]:</Label>
                <Textarea
                  placeholder="Describe your project..."
                  className={cn(mode.radius, mode.font, 'resize-none text-sm')}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className={cn(mode.radius, mode.font, 'text-xs')}
              >
                &gt; CANCEL
              </Button>
              <Button
                onClick={() => onOpenChange(false)}
                className={cn(mode.radius, mode.font, 'text-xs')}
              >
                &gt; CREATE
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className={cn(mode.font, 'text-muted-foreground mt-4 text-xs')}>
          [USE CASE]: Create, edit, quick forms, settings
        </div>
      </div>
    </Card>
  );
}
