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

const languageFormSchema = z.object({
  language: z.enum(['en', 'es', 'fr', 'de', 'ja', 'zh', 'pt', 'ko']),
});

type LanguageFormValues = z.infer<typeof languageFormSchema>;

export function LanguageForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast, error } = useToast();

  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: {
      language: 'en',
    },
  });

  async function onSubmit(data: LanguageFormValues) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: data.language }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update language settings');
      }

      toast({
        title: 'Settings saved',
        description: 'Your language preference has been updated.',
      });
    } catch (err: unknown) {
      error(
        'Error',
        err instanceof Error ? err.message : 'Failed to update language settings. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card tone="neutral">
      <CardHeader code="0x00" title="LANGUAGE" />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(mode.font, 'text-xs')}>[INTERFACE LANGUAGE]:</FormLabel>
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
                        Español (Spanish)
                      </SelectItem>
                      <SelectItem
                        value="fr"
                        className={cn(
                          mode.radius,
                          'focus:bg-primary focus:text-primary-foreground'
                        )}
                      >
                        Français (French)
                      </SelectItem>
                      <SelectItem
                        value="de"
                        className={cn(
                          mode.radius,
                          'focus:bg-primary focus:text-primary-foreground'
                        )}
                      >
                        Deutsch (German)
                      </SelectItem>
                      <SelectItem
                        value="ja"
                        className={cn(
                          mode.radius,
                          'focus:bg-primary focus:text-primary-foreground'
                        )}
                      >
                        日本語 (Japanese)
                      </SelectItem>
                      <SelectItem
                        value="zh"
                        className={cn(
                          mode.radius,
                          'focus:bg-primary focus:text-primary-foreground'
                        )}
                      >
                        中文 (Chinese)
                      </SelectItem>
                      <SelectItem
                        value="pt"
                        className={cn(
                          mode.radius,
                          'focus:bg-primary focus:text-primary-foreground'
                        )}
                      >
                        Português (Portuguese)
                      </SelectItem>
                      <SelectItem
                        value="ko"
                        className={cn(
                          mode.radius,
                          'focus:bg-primary focus:text-primary-foreground'
                        )}
                      >
                        한국어 (Korean)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className={cn(mode.font, 'text-xs')}>
                    This will change the language of all interface text.
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
