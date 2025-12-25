'use client';

import * as React from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface AiFormsInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  isLoading: boolean;
  onGenerate: () => void;
  examples: string[];
}

export function AiFormsInput({ prompt, setPrompt, isLoading, onGenerate, examples }: AiFormsInputProps) {
  return (
    <Card>
      <CardHeader code="0x00" title="FORM PROMPT" />
      <CardContent>
        <p className={cn('mb-4 text-xs', mode.state.secondary.opacity, mode.font)}>
          &gt; Describe the form you want to create. Be specific about fields, validation, and purpose.
        </p>

        <div className={cn('border bg-background relative', mode.radius, mode.color.border.default)}>
          <div className={cn('border-b px-4 py-2 bg-muted/20', mode.color.border.default)}>
            <span className={cn('text-xs uppercase', mode.state.muted.opacity, mode.font)}>
              [ INPUT ]
            </span>
          </div>
          
          <div className="p-4">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Contact form with name, email, phone..."
              className={cn(
                'min-h-[80px] resize-none border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0',
                mode.font
              )}
              disabled={isLoading}
            />
            
            <div className="mt-4 flex items-center justify-between">
              <span className={cn('text-xs', mode.state.muted.opacity, mode.font)}>
                {isLoading ? 'GENERATING...' : 'READY'}
              </span>
              <Button
                onClick={onGenerate}
                disabled={!prompt.trim() || isLoading}
                size="sm"
                className={cn('text-xs uppercase', mode.radius)}
              >
                <Send className="mr-2 size-4" />
                Generate
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className={cn('text-xs uppercase', mode.state.muted.opacity, mode.font)}>[EXAMPLES]:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setPrompt(ex)}
                className={cn(
                  'border px-3 py-1 text-xs hover:opacity-100 transition-all',
                  mode.state.secondary.opacity,
                  mode.state.hover.card,
                  mode.radius,
                  mode.font,
                  mode.color.border.default
                )}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
