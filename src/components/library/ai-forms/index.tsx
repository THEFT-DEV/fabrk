'use client';

import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { GeneratedForm } from '@/lib/ai/schemas';

import { AiFormsHeader } from './ai-forms-header';
import { AiFormsInput } from './ai-forms-input';
import { AiFormsPreview } from './ai-forms-preview';

// Demo Data
const DEMO_FORM: GeneratedForm = {
  name: 'ContactForm',
  description: 'A simple contact form',
  fields: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: true },
  ],
  submitLabel: 'Send Message',
};

const EXAMPLE_PROMPTS = [
  'Contact form with name, email, and message',
  'User registration with email, password',
  'Newsletter signup with interests',
];

export interface AiFormsProps {
  initialForm?: GeneratedForm;
  onGenerate?: (prompt: string) => Promise<GeneratedForm>;
  className?: string;
}

export function AiForms({ 
  initialForm = DEMO_FORM, 
  onGenerate,
  className 
}: AiFormsProps) {
  const [prompt, setPrompt] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState<GeneratedForm | null>(initialForm);
  const [error, setError] = React.useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      if (onGenerate) {
        const result = await onGenerate(prompt);
        setForm(result);
      } else {
        // Mock generation
        await new Promise(resolve => setTimeout(resolve, 1500));
        setForm(DEMO_FORM); 
      }
    } catch {
      setError('Failed to generate form');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      <AiFormsHeader />

      <AiFormsInput 
        prompt={prompt} 
        setPrompt={setPrompt} 
        isLoading={isLoading} 
        onGenerate={handleGenerate}
        examples={EXAMPLE_PROMPTS}
      />

      {error && (
        <Alert variant="destructive" className={mode.radius}>
          <AlertCircle className="size-4" />
          <AlertDescription className={cn('text-xs uppercase', mode.font)}>
            [ERROR] {error}
          </AlertDescription>
        </Alert>
      )}

      {form && <AiFormsPreview form={form} />}
    </div>
  );
}