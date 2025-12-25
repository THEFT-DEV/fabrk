/**
 * Modal Patterns Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { Button } from '@/components/ui/button';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
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

const templateCode = `"use client";

import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function ModalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className={cn(mode.radius, mode.font, "text-xs")}>
            <Trash2 className="mr-1 h-3 w-3" />
            &gt; DELETE ITEM
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className={cn(mode.radius, "border-border")}>
          <AlertDialogHeader>
            <div className="mb-2 flex items-center gap-2">
              <div className="border-destructive bg-destructive/10 border p-2">
                <AlertTriangle className="text-destructive h-5 w-5" />
              </div>
            </div>
            <AlertDialogTitle className={cn(mode.font)}>
              [CONFIRM DELETE]
            </AlertDialogTitle>
            <AlertDialogDescription className={cn(mode.font, "text-sm")}>
              This action cannot be undone. This will permanently delete the item
              and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={cn(mode.radius, mode.font, "text-xs")}>
              &gt; CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(
                mode.radius,
                mode.font,
                "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs"
              )}
            >
              &gt; DELETE
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}`;

function ModalsPreview() {
  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="flex min-h-[600px] items-center justify-center">
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
                <div className="border-destructive bg-destructive/10 border p-2">
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
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function ModalsTemplate() {
  return (
    <TemplateShowcasePage
      badge="MODAL PATTERNS"
      title="Modal Patterns"
      description="Dialog, alert, sheet, and popover patterns for common interactions"
      templateId="modals"
      category={{ name: 'Patterns', href: '/library/patterns' }}
      preview={<ModalsPreview />}
      code={templateCode}
      fileStructure="app/(platform)/modals/page.tsx"
      features={[
        'AlertDialog for destructive actions',
        'Dialog for forms and content',
        'Sheet for side panels',
        'Popover for contextual menus',
        'Keyboard navigation (ESC to close)',
        'Focus trap and accessibility',
      ]}
    />
  );
}
