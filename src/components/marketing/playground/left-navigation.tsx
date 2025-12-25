/**
 * Left Navigation - Sidebar navigation for playground demos
 */
'use client';

import {
  Activity,
  Home,
  Users,
  User,
  Settings,
  CircleHelp,
  Search,
  MoreHorizontal,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface LeftNavigationProps {
  activeSection: string;
}

export function LeftNavigation({ activeSection }: LeftNavigationProps) {
  const navSections = [
    {
      title: 'Main',
      items: [
        { id: 'components', label: 'Components', icon: Activity },
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'table', label: 'Table', icon: Users },
        { id: 'profile', label: 'Profile', icon: User },
      ],
    },
  ];

  const utilities = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Get Help', icon: CircleHelp },
    { id: 'search', label: 'Search', icon: Search },
  ];

  const showUtilities = activeSection === 'dashboard';

  return (
    <div className={cn('flex w-64 flex-col border-r p-4', mode.color.border.default, mode.color.bg.mutedSubtle)}>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Activity className="h-4 w-4" />
          FABRK APP
        </div>
      </div>

      {navSections.map((section) => (
        <div key={section.title} className="mb-6">
          <div className="text-muted-foreground mb-2 text-xs font-semibold">
            [{section.title.toUpperCase()}]
          </div>
          <div className="space-y-1">
            {section.items.map((item) => (
              <button
                key={item.id}
                className={cn(
                  'flex w-full items-center gap-2 px-4 py-2 text-xs transition-colors',
                  mode.radius,
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      {showUtilities && (
        <div className="mt-auto space-y-4">
          <div className="space-y-1">
            {utilities.map((item) => (
              <button
                key={item.id}
                className={cn(
                  'text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center gap-2 rounded-none px-4 py-2 text-xs transition-colors',
                  mode.font
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>

          <Separator className="my-2" />

          <div className="flex items-center gap-4 px-1">
            <div className={cn(mode.font, 'flex-1 text-left')}>
              <div className="text-xs font-semibold">Jordan Lee</div>
              <div className="text-muted-foreground text-xs">jordan.lee@example.com</div>
            </div>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Open profile actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
