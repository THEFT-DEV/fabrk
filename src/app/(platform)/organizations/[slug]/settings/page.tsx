/**
 * Organization Settings Page
 * Manage organization details, settings, and danger zone
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Save, Trash2, AlertTriangle, Loader2, Settings as SettingsIcon } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const settingsSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  description: z.string().optional(),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  logo: z.string().url().optional().or(z.literal('')),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  role: string;
}

export default function OrganizationSettingsPage() {
  const router = useRouter();
  const params = useParams();
  useSession(); // Auth check
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [organization, setOrganization] = React.useState<Organization | null>(null);

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      logo: '',
    },
  });

  React.useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch(`/api/organizations/${params.slug}`);
        if (!response.ok) throw new Error('Failed to fetch organization');

        const data = await response.json();
        setOrganization(data.organization);

        // Populate form
        form.reset({
          name: data.organization.name,
          description: data.organization.description || '',
          slug: data.organization.slug,
          logo: data.organization.logo || '',
        });
      } catch (error: unknown) {
        console.error('Failed to fetch organization:', error);
        toast.error('Failed to load organization settings');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchOrganization();
    }
  }, [params.slug, form]);

  const onSubmit = async (data: SettingsFormData) => {
    if (!organization) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/organizations/${organization.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update organization');
      }

      const result = await response.json();
      setOrganization(result.organization);
      toast.success('Organization settings updated successfully!');

      // Redirect if slug changed
      if (data.slug !== params.slug) {
        router.push(`/organizations/${data.slug}/settings`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update organization';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!organization) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/organizations/${organization.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete organization');
      }

      toast.success('Organization deleted successfully');
      router.push('/dashboard');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete organization';
      toast.error(errorMessage);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!organization) {
    return (
      <Card tone="danger">
        <CardHeader code="0x00" title="ERROR" icon={<AlertTriangle className="h-4 w-4" />} />
        <CardContent padding="lg">
          <div className="text-center">
            <AlertTriangle className="text-destructive mx-auto h-12 w-12" />
            <h3 className="mt-4 text-sm font-semibold">Organization not found</h3>
            <Button onClick={() => router.push('/dashboard')} className="mt-4">
              &gt; BACK TO DASHBOARD
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isOwnerOrAdmin = ['OWNER', 'ADMIN'].includes(organization.role);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="border-border bg-primary rounded-none border p-2">
          <SettingsIcon className="text-primary-foreground h-6 w-6" />
        </div>
        <div>
          <h1 className={cn(mode.font, 'text-4xl', 'font-semibold')}>ORGANIZATION SETTINGS</h1>
          <p className="text-muted-foreground">
            Manage your organization's information and preferences
          </p>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader
          code="0x01"
          title="GENERAL INFORMATION"
          icon={<SettingsIcon className="h-4 w-4" />}
        />
        <CardContent padding="lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Acme Inc."
                        className="border-border rounded-none border"
                        disabled={!isOwnerOrAdmin}
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
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="acme-inc"
                        className="border-border rounded-none border"
                        disabled={!isOwnerOrAdmin}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Used in your organization's URL: /org/{field.value}
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What does your organization do?"
                        className="border-border rounded-none border"
                        rows={3}
                        disabled={!isOwnerOrAdmin}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/logo.png"
                        className="border-border rounded-none border"
                        disabled={!isOwnerOrAdmin}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Direct URL to your organization's logo image</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isOwnerOrAdmin && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => form.reset()}>
                    &gt; RESET
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    &gt; SAVE CHANGES
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Danger Zone (Owner Only) */}
      {organization.role === 'OWNER' && (
        <Card tone="danger">
          <CardHeader
            code="0x02"
            title="DANGER ZONE"
            icon={<AlertTriangle className="h-4 w-4" />}
          />
          <CardContent padding="lg">
            <div className="border-destructive bg-destructive/10 flex items-start justify-between rounded-none border p-4">
              <div className="flex-1">
                <h4 className={cn(mode.font, 'text-xs', 'font-semibold')}>
                  [DELETE ORGANIZATION]:
                </h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  Permanently delete this organization and all associated data. This action cannot
                  be undone.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="ml-4">
                    <Trash2 className="mr-2 h-4 w-4" />
                    &gt; DELETE
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-border rounded-none border">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="text-destructive h-5 w-5" />
                      Delete Organization
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you absolutely sure? This will permanently delete{' '}
                      <strong>{organization.name}</strong> and remove all members, data, and
                      settings. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={deleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      &gt; DELETE ORGANIZATION
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
