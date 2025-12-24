/**
 * Organization Members Page
 * View and manage organization members with role-based access control
 */

'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { MembersPageHeader } from './components/members-page-header';
import { MemberTableRow } from './components/member-table-row';
import { RolePermissionsCard } from './components/role-permissions-card';

interface Member {
  id: string;
  userId: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';
  joinedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  role: string;
}

export default function OrganizationMembersPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = React.useState(true);
  const [organization, setOrganization] = React.useState<Organization | null>(null);
  const [members, setMembers] = React.useState<Member[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organization
        const orgResponse = await fetch(`/api/organizations/${params.slug}`);
        if (!orgResponse.ok) throw new Error('Failed to fetch organization');
        const orgData = await orgResponse.json();
        setOrganization(orgData.organization);

        // Fetch members
        const membersResponse = await fetch(
          `/api/organizations/${orgData.organization.id}/members`
        );
        if (!membersResponse.ok) throw new Error('Failed to fetch members');
        const membersData = await membersResponse.json();
        setMembers(membersData.members);
      } catch (error: unknown) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to load organization members');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchData();
    }
  }, [params.slug]);

  const handleRemoveMember = async (memberId: string) => {
    if (!organization) return;

    try {
      const response = await fetch(`/api/organizations/${organization.id}/members/${memberId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to remove member');
      }

      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      toast.success('Member removed successfully');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove member';
      toast.error(errorMessage);
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: string) => {
    if (!organization) return;

    try {
      const response = await fetch(`/api/organizations/${organization.id}/members/${memberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update role');
      }

      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? { ...m, role: newRole as Member['role'] } : m))
      );
      toast.success('Member role updated successfully');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update role';
      toast.error(errorMessage);
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
        <CardHeader code="0x00" title="ERROR" icon={<Loader2 className="h-4 w-4" />} />
        <CardContent padding="lg">
          <div className="text-center">
            <h3 className="text-sm font-semibold">Organization not found</h3>
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
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <MembersPageHeader
        organizationId={organization.id}
        organizationName={organization.name}
        isOwnerOrAdmin={isOwnerOrAdmin}
      />

      {/* Members Table */}
      <Card>
        <CardHeader
          code="0x01"
          title="MEMBERS"
          icon={<Users className="h-4 w-4" />}
          meta={`COUNT: ${members.length}`}
        />
        <CardContent padding="lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <MemberTableRow
                  key={member.id}
                  member={member}
                  isOwnerOrAdmin={isOwnerOrAdmin}
                  onUpdateRole={handleUpdateRole}
                  onRemoveMember={handleRemoveMember}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Permissions Info */}
      <RolePermissionsCard />
    </div>
  );
}
