/**
 * DocsPreviewWrapper - Forces terminal style on all UI components within docs previews
 * Overrides rounded corners, adds monospace fonts, and applies terminal aesthetic
 */

'use client';

import { cn } from '@/lib/utils';

interface DocsPreviewWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function DocsPreviewWrapper({ children, className }: DocsPreviewWrapperProps) {
  return <div className={cn('terminal-preview', className)}>{children}</div>;
}
