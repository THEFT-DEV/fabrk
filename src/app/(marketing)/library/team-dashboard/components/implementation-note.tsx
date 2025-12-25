/**
 * ✅ FABRK COMPONENT
 * Implementation Note - Template features documentation
 */

import { FeaturesCard } from '@/components/ui/card';

export function ImplementationNote() {
  return (
    <FeaturesCard
      code="0x07"
      features={[
        '4 stat cards (Organization, Team Size, Pending, Active)',
        'Invite team member form with email and role selector',
        'Team members table with avatars, roles, last active',
        'Role badges with icons (Owner, Admin, Member, Guest)',
        'Dropdown actions (change role, remove member)',
        'Pending invitations list with revoke functionality',
        'Activity feed with recent team changes',
        'Role permissions reference card',
        'RBAC system (Owner → Admin → Member → Guest)',
        'Multi-tenancy organization structure',
      ]}
      note="Add API routes in src/app/api/teams/. Create Team and TeamMember Prisma models."
    />
  );
}
