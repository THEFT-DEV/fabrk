'use client';

import { useRef } from 'react';
import { DocsSidebar, NavSection } from '@/components/docs/docs-sidebar';
import { DocsToc } from '@/components/docs/docs-toc';
import { CHANGELOG } from '@/data/changelog';
import { Tag } from 'lucide-react';

// Group changelog entries by month/year
function groupByMonth(entries: typeof CHANGELOG): Record<string, typeof CHANGELOG> {
  const groups: Record<string, typeof CHANGELOG> = {};

  for (const entry of entries) {
    const date = new Date(entry.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(entry);
  }

  return groups;
}

// Build navigation from changelog data
function buildChangelogNavigation(): NavSection[] {
  const grouped = groupByMonth(CHANGELOG);

  return Object.entries(grouped).map(([monthYear, entries]) => ({
    title: monthYear.toUpperCase(),
    id: monthYear.toLowerCase().replace(/\s+/g, '-'),
    items: entries.map((entry) => ({
      title: `v${entry.version}`,
      href: `/changelog#v${entry.version}`,
      icon: Tag,
    })),
  }));
}

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const navigation = buildChangelogNavigation();

  return (
    <div className="flex flex-1">
      <DocsSidebar
        navigation={navigation}
        formatSectionTitle={(title) => `[${title}]`}
        formatItemTitle={(title) => title}
      />

      <main ref={mainRef} className="min-w-0 flex-1">
        <div className="mx-auto max-w-3xl px-6 py-8 lg:px-8">{children}</div>
      </main>

      <DocsToc mainRef={mainRef} />
    </div>
  );
}
