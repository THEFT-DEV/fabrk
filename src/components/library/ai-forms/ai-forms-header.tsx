'use client';

import * as React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function AiFormsHeader() {
  return (
    <div className="flex items-center gap-4">
      <div className={cn('p-2 border', mode.radius, mode.color.bg.surface, mode.color.border.default)}>
        <Sparkles className="size-6 text-primary" />
      </div>
      <div>
        <h1 className={cn('text-2xl font-bold uppercase', mode.font)}>AI Form Generator</h1>
        <p className={cn('text-sm', mode.state.secondary.opacity, mode.font)}>
          Generate React Hook Form + Zod code from natural language
        </p>
      </div>
    </div>
  );
}
