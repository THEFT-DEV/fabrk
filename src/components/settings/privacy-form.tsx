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
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

const privacyFormSchema = z.object({
  profileVisibility: z.boolean(),
  activityTracking: z.boolean(),
  analyticsSharing: z.boolean(),
  searchIndexing: z.boolean(),
  dataRetention: z.boolean(),
});

type PrivacyFormValues = z.infer<typeof privacyFormSchema>;

export function PrivacyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast, error } = useToast();

  const form = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      profileVisibility: true,
      activityTracking: false,
      analyticsSharing: false,
      searchIndexing: true,
      dataRetention: true,
    },
  });

  async function onSubmit(data: PrivacyFormValues) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ privacy: data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update privacy settings');
      }

      toast({
        title: 'Settings saved',
        description: 'Your privacy preferences have been updated.',
      });
    } catch (err: unknown) {
      error(
        'Error',
        err instanceof Error ? err.message : 'Failed to update privacy settings. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card tone="neutral">
      <CardHeader code="0x04" title="PRIVACY" />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="profileVisibility"
              render={({ field }) => (
                <FormItem className="border-border flex flex-row items-center justify-between border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className={cn(mode.font, 'text-xs')}>
                      [PROFILE_VISIBILITY]:
                    </FormLabel>
                    <FormDescription className={cn(mode.font, 'text-xs')}>
                      Allow your profile to be visible to other users.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className={cn(
                        mode.radius,
                        `h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:${mode.radius} [&>span]:data-[state=checked]:translate-x-4`
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activityTracking"
              render={({ field }) => (
                <FormItem className="border-border flex flex-row items-center justify-between border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className={cn(mode.font, 'text-xs')}>[ACTIVITY TRACKING]:</FormLabel>
                    <FormDescription className={cn(mode.font, 'text-xs')}>
                      Allow us to track your activity to improve your experience.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className={cn(
                        mode.radius,
                        `h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:${mode.radius} [&>span]:data-[state=checked]:translate-x-4`
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="analyticsSharing"
              render={({ field }) => (
                <FormItem className="border-border flex flex-row items-center justify-between border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className={cn(mode.font, 'text-xs')}>[ANALYTICS SHARING]:</FormLabel>
                    <FormDescription className={cn(mode.font, 'text-xs')}>
                      Share anonymous usage data to help us improve the product.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className={cn(
                        mode.radius,
                        `h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:${mode.radius} [&>span]:data-[state=checked]:translate-x-4`
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="searchIndexing"
              render={({ field }) => (
                <FormItem className="border-border flex flex-row items-center justify-between border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className={cn(mode.font, 'text-xs')}>[SEARCH INDEXING]:</FormLabel>
                    <FormDescription className={cn(mode.font, 'text-xs')}>
                      Allow search engines to index your profile.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className={cn(
                        mode.radius,
                        `h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:${mode.radius} [&>span]:data-[state=checked]:translate-x-4`
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataRetention"
              render={({ field }) => (
                <FormItem className="border-border flex flex-row items-center justify-between border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className={cn(mode.font, 'text-xs')}>[DATA RETENTION]:</FormLabel>
                    <FormDescription className={cn(mode.font, 'text-xs')}>
                      Keep my account data if I delete my account.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className={cn(
                        mode.radius,
                        `h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:${mode.radius} [&>span]:data-[state=checked]:translate-x-4`
                      )}
                    />
                  </FormControl>
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
