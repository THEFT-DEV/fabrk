/**
 * Organization Details Step
 * Step 1: Collect organization name, slug, and description
 */

import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Building2, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface OrganizationFormData {
  name: string;
  description?: string;
  slug: string;
}

interface OrganizationDetailsStepProps {
  form: UseFormReturn<OrganizationFormData>;
  onSubmit: (data: OrganizationFormData) => Promise<void>;
  loading: boolean;
  onCancel: () => void;
}

export function OrganizationDetailsStep({
  form,
  onSubmit,
  loading,
  onCancel,
}: OrganizationDetailsStepProps) {
  return (
    <Card>
      <CardHeader
        code="0x00"
        title="CREATE ORGANIZATION"
        icon={<Building2 className="h-4 w-4" />}
        meta="STEP 1"
      />
      <CardContent padding="lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acme Inc."
                      className={cn('border-border border', mode.radius)}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The public name of your organization</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="acme-inc"
                      className={cn('border-border border', mode.radius)}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Used in your organization's URL: /org/
                    {field.value || 'your-slug'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What does your organization do?"
                      className={cn('border-border border', mode.radius)}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                &gt; CANCEL
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                &gt; CONTINUE
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
