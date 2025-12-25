/**
 * FABRK COMPONENT
 * Profile Tabs - Activity feed and projects display
 */

'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { Activity, Star, GitBranch, LucideIcon } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  icon: LucideIcon;
}

interface Project {
  id: string;
  name: string;
  description: string;
  stars: number;
  language: string;
  updated: string;
}

interface ProfileTabsProps {
  activity: ActivityItem[];
  projects: Project[];
}

const tabs = [
  { id: 'activity', label: 'ACTIVITY', icon: Activity },
  { id: 'projects', label: 'PROJECTS', icon: GitBranch },
];

export function ProfileTabs({ activity, projects }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState('activity');

  return (
    <StyledTabs
      code="0x00"
      title="CONTENT"
      tabs={tabs}
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <StyledTabsContent value="activity">
        <div className="space-y-2">
          {activity.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="border-border hover:bg-muted/30 flex items-center gap-4 border p-4 transition-colors"
              >
                <div className="border-border bg-muted/30 border p-2">
                  <Icon className="text-muted-foreground h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className={cn(mode.font, 'text-sm')}>{item.title}</div>
                  <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
                    {item.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </StyledTabsContent>

      <StyledTabsContent value="projects">
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border-border hover:bg-muted/30 border p-4 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className={cn(mode.font, 'text-primary text-sm font-medium')}>
                      {project.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(mode.radius, mode.font, 'border-border text-xs')}
                    >
                      {project.language}
                    </Badge>
                  </div>
                  <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
                    {project.description}
                  </p>
                </div>
                <div
                  className={cn(mode.font, 'text-muted-foreground flex items-center gap-1 text-xs')}
                >
                  <Star className="h-3 w-3" />
                  {project.stars}
                </div>
              </div>
              <div className={cn(mode.font, 'text-muted-foreground mt-2 text-xs')}>
                Updated {project.updated}
              </div>
            </div>
          ))}
        </div>
      </StyledTabsContent>
    </StyledTabs>
  );
}
