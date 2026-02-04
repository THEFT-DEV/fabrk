/**
 * Create Form Prompt
 * Guided workflow for building forms with validation
 */

interface PromptResult {
  messages: Array<{
    role: 'user' | 'assistant';
    content: { type: 'text'; text: string };
  }>;
}

export function createFormPrompt(args: Record<string, string>): PromptResult {
  const formName = args.formName || 'ContactForm';
  const fields = args.fields?.split(',').map((s) => s.trim()) || ['name', 'email', 'message'];

  const prompt = `You are creating a form "${formName}" with validation using Fabrk boilerplate components.

## Fabrk Design System Rules (MUST FOLLOW)

1. **Terminal Aesthetic**
   - \`rounded-none\` on all inputs and buttons
   - \`font-mono\` for all text
   - Label format: \`[FIELD_NAME]:\`
   - Button text: \`> SUBMIT\`
   - Error messages: \`[ERROR]: Message\`
   - Success messages: \`[SUCCESS]: Message\`

2. **Color Tokens Only**
   - Error: text-destructive
   - Success: text-success
   - Inputs: border-border, focus:border-primary
   - NEVER hardcode colors

3. **Required Imports**
   \`\`\`typescript
   'use client';

   import { useState } from 'react';
   import { useForm } from 'react-hook-form';
   import { zodResolver } from '@hookform/resolvers/zod';
   import { z } from 'zod';
   import { cn } from '@/lib/utils';
   import { mode } from '@/design-system';
   import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
   import { Input } from '@/components/ui/input';
   import { Label } from '@/components/ui/label';
   import { Button } from '@/components/ui/button';
   import { Textarea } from '@/components/ui/textarea';
   import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
   } from '@/components/ui/form';
   \`\`\`

## Form Fields
${fields.map((field, i) => `${i + 1}. ${field}`).join('\n')}

## Form Pattern
\`\`\`tsx
// Zod schema
const ${formName.charAt(0).toLowerCase() + formName.slice(1)}Schema = z.object({
${fields
  .map((field) => {
    if (field.toLowerCase().includes('email')) {
      return `  ${field}: z.string().email('[ERROR]: Invalid email'),`;
    }
    if (field.toLowerCase().includes('message') || field.toLowerCase().includes('description')) {
      return `  ${field}: z.string().min(10, '[ERROR]: Must be at least 10 characters'),`;
    }
    return `  ${field}: z.string().min(1, '[ERROR]: Required'),`;
  })
  .join('\n')}
});

type ${formName}Values = z.infer<typeof ${formName.charAt(0).toLowerCase() + formName.slice(1)}Schema>;

export function ${formName}() {
  const [loading, setLoading] = useState(false);

  const form = useForm<${formName}Values>({
    resolver: zodResolver(${formName.charAt(0).toLowerCase() + formName.slice(1)}Schema),
    defaultValues: {
${fields.map((field) => `      ${field}: '',`).join('\n')}
    },
  });

  const onSubmit = async (data: ${formName}Values) => {
    setLoading(true);
    try {
      // Handle form submission
      console.log(data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn('border border-border', mode.radius)}>
      <CardHeader code="0xF0" title="${formName.toUpperCase().replace(/([A-Z])/g, '_$1').replace(/^_/, '')}" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Form fields */}
${fields
  .map(
    (field) => `            <FormField
              control={form.control}
              name="${field}"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(mode.font, 'text-sm')}>
                    [${field.toUpperCase()}]:
                  </FormLabel>
                  <FormControl>
                    <${field.toLowerCase().includes('message') || field.toLowerCase().includes('description') ? 'Textarea' : 'Input'}
                      {...field}
                      className={cn(mode.radius, mode.font, 'text-sm')}
                      placeholder="Enter ${field.toLowerCase()}..."
                    />
                  </FormControl>
                  <FormMessage className={cn(mode.font, 'text-xs')} />
                </FormItem>
              )}
            />`
  )
  .join('\n')}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              loading={loading}
              className={cn(mode.radius, mode.font, 'text-xs')}
            >
              > SUBMIT
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
\`\`\`

## Your Task

Generate a complete, production-ready form component "${formName}" with:
1. Zod validation schema for all fields
2. React Hook Form integration
3. Terminal-styled UI
4. Loading states
5. Error display
6. Proper TypeScript types

Generate the component now.`;

  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: prompt,
        },
      },
    ],
  };
}
