/**
 * Library Sidebar Client Component
 * Extracted to allow layout.tsx to be a server component with metadata
 */
'use client';

import { DocsSidebar, NavSection } from '@/components/docs/docs-sidebar';
import { templatesNavigation, toDisplayCase } from './library-nav-data';
import { formatDocsSectionTitle, formatDocsItemTitle } from '@/lib/utils/sidebar-formatters';

// Cast templates navigation to NavSection[] (compatible interface)
const navigation = templatesNavigation as NavSection[];

// The section titles in library-nav-data are already terminal-cased.
// We only need to provide the formatItemTitle, and use toDisplayCase on the section title
// passed to formatDocsSectionTitle.

const libraryFormatSectionTitle = (title: string, index: number) => {
  // Use toDisplayCase on the raw title before passing to the formatter
  return formatDocsSectionTitle(toDisplayCase(title), index);
};

export function LibrarySidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1">
      <DocsSidebar
        navigation={navigation}
        formatSectionTitle={libraryFormatSectionTitle}
        formatItemTitle={formatDocsItemTitle}
      />

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
