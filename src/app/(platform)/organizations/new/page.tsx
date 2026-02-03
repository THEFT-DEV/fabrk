/**
 * Create Organization Page
 * 3-step wizard for creating a new organization
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { ProgressSteps } from './components/progress-steps';
import { OrganizationDetailsStep } from './components/organization-details-step';
import { InviteMembersStep } from './components/invite-members-step';
import { SuccessStep } from './components/success-step';

const organizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  description: z.string().optional(),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
});

const inviteSchema = z.object({
  emails: z.string(),
  role: z.enum(['OWNER', 'ADMIN', 'MEMBER', 'GUEST']),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;
type InviteFormData = z.infer<typeof inviteSchema>;

export default function CreateOrganizationPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [createdOrgId, setCreatedOrgId] = React.useState<string | null>(null);

  const orgForm = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: '',
      description: '',
      slug: '',
    },
  });

  const inviteForm = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      emails: '',
      role: 'MEMBER',
    },
  });

  // Auto-generate slug from name
  React.useEffect(() => {
    const subscription = orgForm.watch((value, { name }) => {
      if (name === 'name' && value.name) {
        const slug = value.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        orgForm.setValue('slug', slug);
      }
    });
    return () => subscription.unsubscribe();
  }, [orgForm]);

  const onCreateOrganization = async (data: OrganizationFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/organizations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          ownerId: session?.user?.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create organization');
      }

      const result = await response.json();
      setCreatedOrgId(result.organization.id);
      toast.success('Organization created successfully!');
      setStep(2);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create organization';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onSendInvites = async (data: InviteFormData) => {
    if (!data.emails || !createdOrgId) {
      // Skip invites
      router.push('/dashboard');
      return;
    }

    setLoading(true);
    try {
      const emailList = data.emails
        .split(/[\n,;]+/)
        .map((e) => e.trim())
        .filter((e) => e);

      const promises = emailList.map((email) =>
        fetch('/api/organizations/invite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            organizationId: createdOrgId,
            email,
            role: data.role,
            invitedBy: session?.user?.id,
          }),
        })
      );

      await Promise.all(promises);
      toast.success(`Sent ${emailList.length} invitation(s)!`);
      router.push('/dashboard');
    } catch {
      toast.error('Failed to send some invitations');
    } finally {
      setLoading(false);
    }
  };

  const totalSteps = 2;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <ProgressSteps currentStep={step} totalSteps={totalSteps} />

      {step === 1 && (
        <OrganizationDetailsStep
          form={orgForm}
          onSubmit={onCreateOrganization}
          loading={loading}
          onCancel={() => router.back()}
        />
      )}

      {step === 2 && (
        <InviteMembersStep
          form={inviteForm}
          onSubmit={onSendInvites}
          loading={loading}
          onBack={() => setStep(1)}
          onSkip={() => router.push('/dashboard')}
        />
      )}

      {step === 3 && <SuccessStep onComplete={() => router.push('/dashboard')} />}
    </div>
  );
}
