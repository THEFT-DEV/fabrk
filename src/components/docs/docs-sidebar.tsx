/**
 * DocsSidebar - Shared collapsible sidebar for docs and templates
 * Terminal console style navigation
 */
'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import {
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  ExternalLink,
  LucideIcon,
  Search,
  X,
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

export interface NavSubSection {
  title: string;
  items: NavItem[];
}

export interface NavSection {
  title: string;
  id?: string;
  href?: string;
  icon?: LucideIcon;
  items: NavItem[];
  subSections?: NavSubSection[];
}

interface DocsSidebarProps {
  navigation: NavSection[];
  className?: string;
  /** Optional function to format section titles. If not provided, uses title as-is */
  formatSectionTitle?: (title: string, index: number) => string;
  /** Optional function to format item titles. If not provided, uses title as-is */
  formatItemTitle?: (title: string, itemIndex: number, sectionIndex: number, subSectionIndex?: number) => string;
}

// Helper to find which section contains the current path
function findActiveSectionIndex(pathname: string, navigation: NavSection[]): number {
  return navigation.findIndex(
    (section) =>
      section.items.some((item) => pathname === item.href) ||
      pathname === section.href ||
      section.subSections?.some((sub) => sub.items.some((item) => pathname === item.href))
  );
}

// Helper to find which sub-section contains the current path
function findActiveSubSectionIndex(pathname: string, subSections: NavSubSection[]): number {
  return subSections.findIndex((sub) => sub.items.some((item) => pathname === item.href));
}

export function DocsSidebar({
  navigation,
  className,
  formatSectionTitle,
  formatItemTitle,
}: DocsSidebarProps) {
  const pathname = usePathname();
  const activeSectionIndex = findActiveSectionIndex(pathname, navigation);

  // Initialize expanded sections - only the active section is expanded by default
  const [expandedSections, setExpandedSections] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    if (activeSectionIndex >= 0) {
      initial.add(activeSectionIndex);
    }
    return initial;
  });

  // Track expanded sub-sections: key = "sectionIndex-subSectionIndex"
  const [expandedSubSections, setExpandedSubSections] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    // Auto-expand sub-section containing active item
    if (activeSectionIndex >= 0) {
      const section = navigation[activeSectionIndex];
      if (section.subSections) {
        const activeSubIndex = findActiveSubSectionIndex(pathname, section.subSections);
        if (activeSubIndex >= 0) {
          initial.add(`${activeSectionIndex}-${activeSubIndex}`);
        }
      }
    }
    return initial;
  });

  // Sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Filter navigation based on search query
  const filteredNavigation = useMemo(() => {
    if (!searchQuery.trim()) return navigation;

    const query = searchQuery.toLowerCase();
    return navigation
      .map((section) => {
        // Filter direct items
        const matchingItems = section.items.filter((item) =>
          item.title.toLowerCase().includes(query)
        );

        // Filter sub-section items
        const matchingSubSections = section.subSections
          ?.map((sub) => ({
            ...sub,
            items: sub.items.filter((item) => item.title.toLowerCase().includes(query)),
          }))
          .filter((sub) => sub.items.length > 0);

        // Check if section title matches
        const sectionMatches = section.title.toLowerCase().includes(query);

        if (
          sectionMatches ||
          matchingItems.length > 0 ||
          (matchingSubSections && matchingSubSections.length > 0)
        ) {
          return {
            ...section,
            items: sectionMatches ? section.items : matchingItems,
            subSections: sectionMatches ? section.subSections : matchingSubSections,
          };
        }
        return null;
      })
      .filter(Boolean) as NavSection[];
  }, [navigation, searchQuery]);

  // When searching, expand all sections with matches
  const sectionsToExpand = useMemo(() => {
    if (!searchQuery.trim()) return expandedSections;
    return new Set(filteredNavigation.map((_, i) => i));
  }, [searchQuery, filteredNavigation, expandedSections]);

  // When searching, expand all matching sub-sections
  const subSectionsToExpand = useMemo(() => {
    if (!searchQuery.trim()) return expandedSubSections;
    const expanded = new Set<string>();
    filteredNavigation.forEach((section, sectionIndex) => {
      section.subSections?.forEach((_, subIndex) => {
        expanded.add(`${sectionIndex}-${subIndex}`);
      });
    });
    return expanded;
  }, [searchQuery, filteredNavigation, expandedSubSections]);

  // Update expanded sections when pathname changes
  useEffect(() => {
    const newActiveIndex = findActiveSectionIndex(pathname, navigation);
    if (newActiveIndex >= 0) {
      // Use queueMicrotask to avoid synchronous setState cascading
      queueMicrotask(() => {
        setExpandedSections((prev) => {
          if (prev.has(newActiveIndex)) return prev;
          return new Set([...prev, newActiveIndex]);
        });
        const section = navigation[newActiveIndex];
        if (section.subSections) {
          const activeSubIndex = findActiveSubSectionIndex(pathname, section.subSections);
          if (activeSubIndex >= 0) {
            const subKey = `${newActiveIndex}-${activeSubIndex}`;
            setExpandedSubSections((prev) => {
              if (prev.has(subKey)) return prev;
              return new Set([...prev, subKey]);
            });
          }
        }
      });
    }
  }, [pathname, navigation]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleSubSection = (sectionIndex: number, subSectionIndex: number) => {
    const key = `${sectionIndex}-${subSectionIndex}`;
    setExpandedSubSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <aside
      className={cn(
        mode.font,
        'border-border scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-primary/50 bg-background sticky top-16 isolate hidden h-[calc(100vh-4rem)] shrink-0 overflow-y-auto border-r transition-all duration-300 md:block',
        sidebarCollapsed ? 'w-12' : 'w-72',
        className
      )}
    >
      {/* Collapsed state */}
      {sidebarCollapsed && (
        <div className="p-2">
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center p-2 transition-colors"
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Navigation */}
      {!sidebarCollapsed && (
        <nav className="space-y-1 p-4">
          {/* Collapse button */}
          <div className="mb-2 flex items-center justify-between">
            <span className="text-muted-foreground text-xs">[NAV]</span>
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center p-1 transition-colors"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="text-muted-foreground absolute top-1/2 left-2 h-3 w-3 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full border py-2 pr-7 pl-7 text-xs focus:ring-1 focus:outline-none',
                mode.font,
                mode.radius
              )}
              aria-label="Search documentation"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {searchQuery && filteredNavigation.length === 0 && (
            <div className="text-muted-foreground py-4 text-center font-mono text-xs">
              No results for &quot;{searchQuery}&quot;
            </div>
          )}

          {filteredNavigation.map((section, sectionIndex) => {
            const isExpanded = sectionsToExpand.has(sectionIndex);
            const hasActiveItem =
              section.items.some((item) => pathname === item.href) ||
              pathname === section.href ||
              section.subSections?.some((sub) => sub.items.some((item) => pathname === item.href));
            const sectionKey = section.id || section.title;
            const displayTitle = formatSectionTitle
              ? formatSectionTitle(section.title, sectionIndex)
              : section.title;

            return (
              <div key={sectionKey} className={cn(sectionIndex > 0 && 'mt-2')}>
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className={cn(
                    'flex w-full items-center gap-2 py-2 text-xs font-semibold transition-colors',
                    hasActiveItem ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                    mode.font
                  )}
                >
                  <ChevronRight
                    className={cn(
                      'h-3 w-3 shrink-0 transition-transform',
                      isExpanded && 'rotate-90'
                    )}
                  />
                  {displayTitle}
                </button>

                {/* Items */}
                {isExpanded && (
                  <div className="before:bg-border relative ml-[7px] space-y-0.5 pl-4 before:absolute before:top-0 before:bottom-1 before:left-0 before:w-px">
                    {section.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      const itemDisplayTitle = formatItemTitle
                        ? formatItemTitle(item.title, itemIndex, sectionIndex)
                        : item.title;

                      if (item.external) {
                        return (
                          <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              'text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2 px-2 py-1 text-xs transition-colors',
                              mode.font
                            )}
                          >
                            <Icon className="h-3 w-3" />
                            {itemDisplayTitle}
                            <ExternalLink className="ml-auto h-2.5 w-2.5" />
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            'flex items-center gap-2 px-2 py-1 text-xs transition-colors',
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                            mode.font
                          )}
                        >
                          <Icon className="h-3 w-3" />
                          {itemDisplayTitle}
                        </Link>
                      );
                    })}

                    {/* Sub-sections */}
                    {section.subSections?.map((subSection, subIndex) => {
                      const subKey = `${sectionIndex}-${subIndex}`;
                      const isSubExpanded = subSectionsToExpand.has(subKey);
                      const hasActiveSubItem = subSection.items.some(
                        (item) => pathname === item.href
                      );
                      // Use a fake item index for subsection header formatting if needed, or create a new formatter
                      // For now, let's assume subsections titles are static or we add a formatSubSectionTitle prop
                      // But the prompt asked for "auto generate numbers".
                      // If subsection is [07.1], it's section 7, subsection 1.
                      const subSectionTitle = formatItemTitle 
                        ? formatItemTitle(subSection.title, subIndex, sectionIndex) // Reuse item formatter? Or make new one?
                        : subSection.title;

                      return (
                        <div key={subSection.title} className="mt-1">
                          <button
                            onClick={() => toggleSubSection(sectionIndex, subIndex)}
                            className={cn(
                              'flex w-full items-center gap-2 py-1 text-xs font-medium transition-colors',
                              hasActiveSubItem
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground',
                              mode.font
                            )}
                          >
                            <ChevronRight
                              className={cn(
                                'h-2.5 w-2.5 shrink-0 transition-transform',
                                isSubExpanded && 'rotate-90'
                              )}
                            />
                            {subSectionTitle}
                          </button>

                          {isSubExpanded && (
                            <div className="before:bg-border/50 relative ml-[5px] space-y-0.5 pl-4 before:absolute before:top-0 before:bottom-1 before:left-0 before:w-px">
                              {subSection.items.map((item, subItemIndex) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                // Pass subSectionIndex as the 4th arg
                                const itemDisplayTitle = formatItemTitle
                                  ? formatItemTitle(item.title, subItemIndex, sectionIndex, subIndex)
                                  : item.title;

                                return (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                      'flex items-center gap-2 px-2 py-0.5 text-xs transition-colors',
                                      isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                      mode.font
                                    )}
                                  >
                                    <Icon className="h-3 w-3 shrink-0" />
                                    {itemDisplayTitle}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      )}
    </aside>
  );
}