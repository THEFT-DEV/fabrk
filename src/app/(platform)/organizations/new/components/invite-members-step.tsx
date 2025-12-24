/**
 * Invite Members Step
 * Step 2: Send email invitations to team members
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { UseFormReturn } from 'react-hook-form';
import { Mail, ChevronLeft, Check, Loader2 } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InviteFormData {
  emails: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';
}

interface InviteMembersStepProps {
  form: UseFormReturn<InviteFormData>;
  onSubmit: (data: InviteFormData) => Promise<void>;
  loading: boolean;
  onBack: () => void;
  onSkip: () => void;
}

export function InviteMembersStep({
  form,
  onSubmit,
  loading,
  onBack,
  onSkip,
}: InviteMembersStepProps) {
  return (
    <Card>
      <CardHeader
        code="0x01"
        title="INVITE TEAM MEMBERS"
        icon={<Mail className="h-4 w-4" />}
        meta="OPTIONAL"
      />
      <CardContent padding="lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Addresses</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="john@example.com&#10;jane@example.com&#10;alex@example.com"
                      className="border-border rounded-none border text-sm"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter email addresses separated by commas or new lines
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-border rounded-none border">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-border rounded-none border">
                      <SelectItem value="MEMBER">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">MEMBER</Badge>
                          <span className="text-muted-foreground text-xs">Standard access</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ADMIN">
                        <div className="flex items-center gap-2">
                          <Badge variant="default">ADMIN</Badge>
                          <span className="text-muted-foreground text-xs">Can manage members</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="GUEST">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">GUEST</Badge>
                          <span className="text-muted-foreground text-xs">Limited access</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>The role assigned to all invited members</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-border bg-muted rounded-none border p-4">
              <h4 className={cn(mode.font, 'mb-2', 'text-xs', 'font-semibold')}>
                [ROLE PERMISSIONS]:
              </h4>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>
                  • <strong>OWNER</strong>: Full control (assigned to creator)
                </li>
                <li>
                  • <strong>ADMIN</strong>: Manage members, settings, billing
                </li>
                <li>
                  • <strong>MEMBER</strong>: Standard access to resources
                </li>
                <li>
                  • <strong>GUEST</strong>: Read-only access
                </li>
              </ul>
            </div>

            <div className="flex justify-between gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                &gt; BACK
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={onSkip}>
                  &gt; SKIP FOR NOW
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  &gt; SEND INVITATIONS
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
