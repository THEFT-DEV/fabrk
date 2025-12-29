/* eslint-disable design-system/no-hardcoded-colors */
/**
 * Profile Page Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { Star, GitBranch, MessageSquare, Award, Zap, TrendingUp, Activity } from 'lucide-react';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { ProfileHeader } from './components/profile-header';
import { BadgesSection } from './components/badges-section';
import { ProfileTabs } from './components/profile-tabs';

const templateCode = `"use client";

import { Star, GitBranch, MessageSquare, Award, Zap, TrendingUp, Activity } from "lucide-react";
import { ProfileHeader } from "./components/profile-header";
import { BadgesSection } from "./components/badges-section";
import { ProfileTabs } from "./components/profile-tabs";

const mockUser = {
  name: "Alex Chen",
  username: "alexchen",
  email: "alex@fabrk.dev",
  avatar: null,
  bio: "Full-stack developer passionate about building great user experiences. Open source contributor.",
  location: "San Francisco, CA",
  website: "https://alexchen.dev",
  joinDate: "January 2024",
  role: "Pro Member",
  stats: {
    projects: 12,
    contributions: 847,
    followers: 234,
    following: 89,
  },
};

const mockActivity = [
  {
    id: "1",
    type: "commit",
    title: "Pushed 3 commits to fabrk/dashboard",
    timestamp: "2 hours ago",
    icon: GitBranch,
  },
  {
    id: "2",
    type: "comment",
    title: 'Commented on issue #142: "Add dark mode support"',
    timestamp: "5 hours ago",
    icon: MessageSquare,
  },
  {
    id: "3",
    type: "star",
    title: "Starred repository fabrk/ui-components",
    timestamp: "1 day ago",
    icon: Star,
  },
];

const mockProjects = [
  {
    id: "1",
    name: "dashboard-v2",
    description: "Next.js dashboard with analytics",
    stars: 45,
    language: "TypeScript",
    updated: "2 hours ago",
  },
  {
    id: "2",
    name: "api-gateway",
    description: "Microservices API gateway",
    stars: 128,
    language: "Go",
    updated: "1 day ago",
  },
];

const mockBadges = [
  { id: "1", name: "Early Adopter", icon: Zap, color: "primary" },
  { id: "2", name: "Top Contributor", icon: TrendingUp, color: "success" },
  { id: "3", name: "Bug Hunter", icon: Activity, color: "warning" },
  { id: "4", name: "Team Player", icon: Award, color: "primary" },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Profile Header */}
      <ProfileHeader user={mockUser} />

      {/* Badges Section */}
      <BadgesSection badges={mockBadges} />

      {/* Profile Tabs */}
      <ProfileTabs activity={mockActivity} projects={mockProjects} />
    </div>
  );
}`;

const mockUser = {
  name: 'Alex Chen',
  username: 'alexchen',
  email: 'alex@fabrk.dev',
  avatar: null,
  bio: 'Full-stack developer passionate about building great user experiences. Open source contributor.',
  location: 'San Francisco, CA',
  website: 'https://alexchen.dev',
  joinDate: 'January 2024',
  role: 'Pro Member',
  stats: {
    projects: 12,
    contributions: 847,
    followers: 234,
    following: 89,
  },
};

const mockActivity = [
  {
    id: '1',
    type: 'commit',
    title: 'Pushed 3 commits to fabrk/dashboard',
    timestamp: '2 hours ago',
    icon: GitBranch,
  },
  {
    id: '2',
    type: 'comment',
    title: 'Commented on issue #142: "Add dark mode support"',
    timestamp: '5 hours ago',
    icon: MessageSquare,
  },
  {
    id: '3',
    type: 'star',
    title: 'Starred repository fabrk/ui-components',
    timestamp: '1 day ago',
    icon: Star,
  },
  {
    id: '4',
    type: 'commit',
    title: 'Merged PR #89 into main',
    timestamp: '2 days ago',
    icon: GitBranch,
  },
  {
    id: '5',
    type: 'achievement',
    title: 'Earned badge: "100 Contributions"',
    timestamp: '3 days ago',
    icon: Award,
  },
];

const mockProjects = [
  {
    id: '1',
    name: 'dashboard-v2',
    description: 'Next.js dashboard with analytics',
    stars: 45,
    language: 'TypeScript',
    updated: '2 hours ago',
  },
  {
    id: '2',
    name: 'api-gateway',
    description: 'Microservices API gateway',
    stars: 128,
    language: 'Go',
    updated: '1 day ago',
  },
  {
    id: '3',
    name: 'mobile-app',
    description: 'React Native mobile application',
    stars: 67,
    language: 'TypeScript',
    updated: '3 days ago',
  },
];

const mockBadges = [
  { id: '1', name: 'Early Adopter', icon: Zap, color: 'primary' },
  { id: '2', name: 'Top Contributor', icon: TrendingUp, color: 'success' },
  { id: '3', name: 'Bug Hunter', icon: Activity, color: 'warning' },
  { id: '4', name: 'Team Player', icon: Award, color: 'primary' },
];

function ProfilePreview() {
  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="space-y-6">
        {/* Profile Header */}
        <ProfileHeader user={mockUser} />

        {/* Badges Section */}
        <BadgesSection badges={mockBadges} />

        {/* Profile Tabs */}
        <ProfileTabs activity={mockActivity} projects={mockProjects} />
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function ProfilePageTemplate() {
  return (
    <TemplateShowcasePage
      badge="PROFILE PAGE"
      title="Profile Page"
      description="User profile with stats, activity feed, projects, and badges"
      templateId="profile"
      category={{ name: 'User Experience', href: '/library/user-experience' }}
      preview={<ProfilePreview />}
      code={templateCode}
      fileStructure={[
        { path: ['app/', '(dashboard)/', 'profile/page.tsx'], label: '← Copy template here' },
        { path: ['app/', '(dashboard)/profile/components/', 'profile-header.tsx'] },
        { path: ['app/', '(dashboard)/profile/components/', 'badges-section.tsx'] },
        { path: ['app/', '(dashboard)/profile/components/', 'profile-tabs.tsx'] },
      ]}
      features={[
        'User profile header with avatar and stats',
        'Achievement badges display',
        'Tabbed navigation (Activity, Projects)',
        'Activity feed with timestamps',
        'Project cards with stats',
        'Responsive mobile-first design',
      ]}
    />
  );
}
