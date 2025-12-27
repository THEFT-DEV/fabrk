'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

const appearanceFormSchema = z.object({
  language: z.enum(['en', 'es', 'fr', 'de', 'ja']),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function AppearanceForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast, error } = useToast();

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      language: 'en',
    },
  });

  async function onSubmit(data: AppearanceFormValues) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appearance: data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update appearance settings');
      }

      toast({
        title: 'Settings saved',
        description: 'Your appearance settings have been updated.',
      });
    } catch (err: unknown) {
      error(
        'Error',
        err instanceof Error
          ? err.message
          : 'Failed to update appearance settings. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card tone="neutral">
      <CardHeader code="0x03" title="APPEARANCE" />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(mode.font, 'text-xs')}>[LANGUAGE]:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={mode.radius}>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="en"
                        className={cn(
                          mode.radius,
                          'focus:bg-primary focus:text-primary-foreground'
                        )}
                      >
                        English
                      </SelectItem>
                      <SelectItem
                        value="es"
                        className={cn(
                          mode.radius,
                          'focus:bg-primary focus:text-primary-foreground'
                        )}
                      >
                        Spanish
                      </SelectItem>
                      <SelectItem
                        value="fr"
                        className={cn(
                          mode.radius,
                          'focus:bg-primary focus:text-primary-foreground'
                        )}
                      >
                        French
                      </SelectItem>
                      <SelectItem
                        value="de"
                        className={cn(
                          mode.radius,
                          'focus:bg-primary focus:text-primary-foreground'
                        )}
                      >
                        German
                      </SelectItem>
                      <SelectItem
                        value="ja"
                        className={cn(
                          mode.radius,
                          'focus:bg-primary focus:text-primary-foreground'
                        )}
                      >
                        Japanese
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className={cn(mode.font, 'text-xs')}>
                    Select your preferred language for the interface.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(mode.radius, mode.font, 'text-xs')}
            >
              {isLoading ? '> SAVING...' : '> SAVE CHANGES'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
