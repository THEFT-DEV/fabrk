/**
 * DocsLayout - Shared layout for docs and templates pages
 * Fixes background stacking: no bg on parent, bg on content areas
 */
'use client';

import { useRef } from 'react';
import { SiteNavigation } from '@/components/navigation';
import { Footer } from '@/components/shared/footer';
import { DocsSidebar, NavSection } from '@/components/docs/docs-sidebar';
import { DocsToc } from '@/components/docs/docs-toc';

interface DocsLayoutProps {
  children: React.ReactNode;
  navigation: NavSection[];
  formatSectionTitle?: (title: string, index: number) => string;
  formatItemTitle?: (title: string) => string;
  showToc?: boolean;
  fullWidth?: boolean; // templates=true (no max-width), docs=false
}

export function DocsLayout({
  children,
  navigation,
  formatSectionTitle,
  formatItemTitle,
  showToc = false,
  fullWidth = false,
}: DocsLayoutProps) {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <div className="relative flex min-h-screen flex-col font-mono">
      <SiteNavigation />

      <div className="flex flex-1">
        <DocsSidebar
          navigation={navigation}
          formatSectionTitle={formatSectionTitle}
          formatItemTitle={formatItemTitle}
        />

        <main ref={mainRef} className="min-w-0 flex-1">
          {fullWidth ? (
            children
          ) : (
            <div className="mx-auto max-w-3xl px-6 py-8 lg:px-8">{children}</div>
          )}
        </main>

        {showToc && <DocsToc mainRef={mainRef} />}
      </div>

      <Footer />
    </div>
  );
}
