/**
 * ✅ FABRK COMPONENT
 * Terminal Window Wrapper
 * Production-ready ✓
 */

import { type ReactNode } from 'react';
import { Card, CardHeader } from '@/components/ui/card';

interface CodeWindowProps {
  filename: string;
  children: ReactNode;
  borderColor?: string;
}

export function CodeWindow({ filename, children, borderColor = 'border-border' }: CodeWindowProps) {
  return (
    <Card className={borderColor !== 'border-border' ? borderColor : ''}>
      <CardHeader code="0x00" title={filename.replace(/\.[^/.]+$/, '').toUpperCase()} />
      {children}
    </Card>
  );
}
