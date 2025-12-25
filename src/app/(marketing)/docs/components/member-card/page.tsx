'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { MemberCard, Member } from '@/components/ui/member-card';

export default function MemberCardPage() {
  const sampleMember: Member = {
    id: '1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    role: 'Senior Developer',
    bio: 'Full-stack engineer with 8 years of experience building scalable web applications.',
    status: 'online',
    skills: ['React', 'TypeScript', 'Node.js'],
    memberSince: '2023-01-15',
  };

  const teamMembers: Member[] = [
    {
      id: '1',
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      role: 'Product Manager',
      status: 'online',
      memberSince: '2022-06-01',
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus@example.com',
      role: 'UX Designer',
      status: 'away',
      memberSince: '2023-03-10',
    },
    {
      id: '3',
      name: 'Lisa Wang',
      email: 'lisa@example.com',
      role: 'Backend Engineer',
      status: 'offline',
      memberSince: '2023-08-22',
    },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.41]"
      category="Components"
      title="Member Card"
      description="Team member profile card component with avatar, status indicator, actions, and optional compact layout."
      importCode={`import { MemberCard, Member } from "@/components/ui/member-card";`}
      mainPreview={{
        preview: (
          <div className="border-border bg-background border p-6 font-mono">
            <div className="text-muted-foreground mb-4 font-mono text-xs">
              [PROFILE]: TEAM_MEMBER_CARD
            </div>
            <div className="max-w-sm">
              <MemberCard
                member={sampleMember}
                onEmail={(member) => console.log('Email:', member.email)}
                onMessage={(member) => console.log('Message:', member.name)}
              />
            </div>
          </div>
        ),
        code: `const member: Member = {
  id: "1",
  name: "Alex Chen",
  email: "alex@example.com",
  role: "Senior Developer",
  bio: "Full-stack engineer with 8 years of experience.",
  status: "online",
  skills: ["React", "TypeScript", "Node.js"],
};

<MemberCard
  member={member}
  onEmail={(member) => console.log(member.email)}
  onMessage={(member) => console.log(member.name)}
/>`,
      }}
      variants={[
        {
          title: 'Compact Variant',
          description: 'Horizontal layout for lists or sidebars',
          preview: (
            <div className="border-border bg-background border p-6 font-mono">
              <div className="text-muted-foreground mb-4 font-mono text-xs">
                [LAYOUT]: COMPACT_MODE
              </div>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    variant="compact"
                    onEmail={(m) => console.log('Email:', m.email)}
                  />
                ))}
              </div>
            </div>
          ),
          code: `<MemberCard
  member={member}
  variant="compact"
  onEmail={(member) => console.log(member.email)}
/>`,
        },
        {
          title: 'With Actions Menu',
          description: 'Include edit, view profile, and remove actions',
          preview: (
            <div className="border-border bg-background border p-6 font-mono">
              <div className="text-muted-foreground mb-4 font-mono text-xs">
                [ACTIONS]: FULL_MENU
              </div>
              <div className="max-w-sm">
                <MemberCard
                  member={sampleMember}
                  onEdit={(m) => console.log('Edit:', m.name)}
                  onViewProfile={(m) => console.log('View:', m.name)}
                  onRemove={(m) => console.log('Remove:', m.name)}
                />
              </div>
            </div>
          ),
          code: `<MemberCard
  member={member}
  onEdit={(member) => console.log("Edit:", member.name)}
  onViewProfile={(member) => console.log("View:", member.name)}
  onRemove={(member) => console.log("Remove:", member.name)}
/>`,
        },
        {
          title: 'Status Indicators',
          description: 'Display online, away, and offline states',
          preview: (
            <div className="border-border bg-background border p-6 font-mono">
              <div className="text-muted-foreground mb-4 font-mono text-xs">
                [STATUS]: PRESENCE_INDICATORS
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <MemberCard member={{ ...sampleMember, status: 'online' }} variant="compact" />
                <MemberCard member={{ ...sampleMember, status: 'away' }} variant="compact" />
                <MemberCard member={{ ...sampleMember, status: 'offline' }} variant="compact" />
              </div>
            </div>
          ),
          code: `<MemberCard member={{ ...member, status: "online" }} variant="compact" />
<MemberCard member={{ ...member, status: "away" }} variant="compact" />
<MemberCard member={{ ...member, status: "offline" }} variant="compact" />`,
        },
        {
          title: 'With Skills',
          description: 'Show member skills as badge list',
          preview: (
            <div className="border-border bg-background border p-6 font-mono">
              <div className="text-muted-foreground mb-4 font-mono text-xs">
                [SKILLS]: EXPERTISE_TAGS
              </div>
              <div className="max-w-sm">
                <MemberCard
                  member={{
                    ...sampleMember,
                    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL'],
                  }}
                />
              </div>
            </div>
          ),
          code: `<MemberCard
  member={{
    ...member,
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
  }}
/>`,
        },
        {
          title: 'Team Grid',
          description: 'Multiple member cards in grid layout',
          preview: (
            <div className="border-border bg-background border p-6 font-mono">
              <div className="text-muted-foreground mb-4 font-mono text-xs">
                [TEAM]: MEMBER_GRID
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    onEmail={(m) => console.log('Email:', m.email)}
                  />
                ))}
              </div>
            </div>
          ),
          code: `<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {members.map((member) => (
    <MemberCard key={member.id} member={member} />
  ))}
</div>`,
        },
      ]}
      props={[
        {
          name: 'member',
          type: 'Member',
          required: true,
          description: 'Member object with id, name, email, role, and optional fields',
        },
        {
          name: 'variant',
          type: '"card" | "compact"',
          default: '"card"',
          description: 'Layout variant: full card or compact horizontal',
        },
        {
          name: 'showActions',
          type: 'boolean',
          default: 'true',
          description: 'Show action buttons/menu',
        },
        {
          name: 'onEmail',
          type: '(member: Member) => void',
          description: 'Callback when email button is clicked',
        },
        {
          name: 'onMessage',
          type: '(member: Member) => void',
          description: 'Callback when message button is clicked',
        },
        {
          name: 'onEdit',
          type: '(member: Member) => void',
          description: 'Callback when edit action is selected',
        },
        {
          name: 'onRemove',
          type: '(member: Member) => void',
          description: 'Callback when remove action is selected',
        },
        {
          name: 'onViewProfile',
          type: '(member: Member) => void',
          description: 'Callback when view profile action is selected',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the card',
        },
      ]}
      accessibility={[
        'Avatar uses AvatarImage and AvatarFallback with proper alt text',
        'Status indicator has color-coded styling (green=online, yellow=away, gray=offline)',
        'Action buttons use lucide-react icons with proper sizing',
        'Dropdown menu uses DropdownMenu component with keyboard navigation',
        'Remove action styled in destructive color for clarity',
        'Compact variant maintains readability with truncated text',
        'All interactive elements are keyboard accessible',
      ]}
      previous={{ title: 'KPI Card', href: '/docs/components/kpi-card' }}
      next={{ title: 'Pie Chart', href: '/docs/components/pie-chart' }}
    />
  );
}
