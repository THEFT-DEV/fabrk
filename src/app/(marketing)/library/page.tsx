/**
 * Template Library - Developer Reference Page
 * Browse and discover templates to copy-paste into your project
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { InputSearch } from '@/components/ui/input-search';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { templates, categories } from './library-data';
import { TEMPLATE_COUNT_STRING } from './library-nav-data';
import { filterTemplates } from '@/lib/search';
import { AdvancedFilters, TemplateCard, type FilterOptions } from '@/components/library';
import { ThemePlaygroundPanel } from '@/components/theme/theme-playground-panel';

const ITEMS_PER_PAGE = 9;

type SortOption = 'relevance' | 'name' | 'newest' | 'featured';

export default function LibraryIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter templates with fuzzy search
  const filteredTemplates = filterTemplates(templates, {
    searchQuery,
    category: selectedCategory,
    complexity: advancedFilters.difficulty,
    hasFeature: advancedFilters.feature,
    setupTime: advancedFilters.setupTime,
    hasDependencies: advancedFilters.hasDependencies,
  });

  // Calculate active filter count
  const activeFilterCount =
    (advancedFilters.difficulty ? 1 : 0) +
    (advancedFilters.setupTime ? 1 : 0) +
    (advancedFilters.hasDependencies ? 1 : 0) +
    (advancedFilters.feature ? 1 : 0);

  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        if (a.lastUpdated && b.lastUpdated) {
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        }
        if (a.lastUpdated) return -1;
        if (b.lastUpdated) return 1;
        return 0;
      case 'featured':
        const score = (t: typeof a) => {
          if (t.badge === 'Popular') return 3;
          if (t.badge === 'Essential') return 2;
          if (t.badge === 'New') return 1;
          return 0;
        };
        return score(b) - score(a);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedTemplates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedTemplates = sortedTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleClearFilters = () => {
    setAdvancedFilters({});
    setSelectedCategory('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Reset page when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('ellipsis');
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Header - Compact, search-focused */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="border-border mb-2 inline-block border px-3 py-1">
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
              [LIBRARY]: {TEMPLATE_COUNT_STRING} TEMPLATES
            </span>
          </div>
          <h1 className={cn(mode.font, 'text-2xl font-semibold')}>Template Library</h1>
        </div>
      </div>

      {/* Search Bar - Prominent */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
        <InputSearch
          placeholder="Search templates by name, feature, or category..."
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          className={cn(
            mode.radius,
            mode.font,
            'border-border focus-visible:border-primary h-12 border pl-11 text-sm'
          )}
        />
      </div>

      {/* Filter Toolbar */}
      <Card size="auto">
        <CardHeader
          title={
            searchQuery
              ? 'SEARCH_RESULTS'
              : selectedCategory === 'all'
                ? 'ALL_TEMPLATES'
                : categories
                    .find((c) => c.id === selectedCategory)
                    ?.name.toUpperCase()
                    .replace(/ /g, '_') || 'TEMPLATES'
          }
          meta={`${sortedTemplates.length} found`}
        />
        <CardContent padding="md">
          {/* Filter Row - Category dropdown left, Sort dropdown + Filters right */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Dropdown */}
            <div className="flex items-center gap-2">
              <span className={cn(mode.font, 'text-muted-foreground text-xs')}>CATEGORY:</span>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className={cn(mode.radius, mode.font, 'w-[180px] text-xs')}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">
                    ALL ({templates.length})
                  </SelectItem>
                  {categories
                    .filter((c) => c.id !== 'components')
                    .map((category) => {
                      const count = templates.filter((t) => t.category === category.id).length;
                      return (
                        <SelectItem key={category.id} value={category.id} className="text-xs">
                          {category.name.toUpperCase()} ({count})
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Dropdown + Filters Button */}
            <div className="flex items-center gap-2">
              <span className={cn(mode.font, 'text-muted-foreground text-xs')}>SORT:</span>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className={cn(mode.radius, mode.font, 'w-[140px] text-xs')}>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance" className="text-xs">
                    RELEVANCE
                  </SelectItem>
                  <SelectItem value="featured" className="text-xs">
                    FEATURED
                  </SelectItem>
                  <SelectItem value="newest" className="text-xs">
                    NEWEST
                  </SelectItem>
                  <SelectItem value="name" className="text-xs">
                    A-Z
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Advanced Filters */}
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters || activeFilterCount > 0 ? 'default' : 'outline'}
                size="default"
                aria-pressed={showFilters}
                aria-expanded={showFilters}
                className={cn(mode.radius, mode.font, 'min-h-[44px] text-xs')}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                FILTERS{activeFilterCount > 0 && ` (${activeFilterCount})`}
              </Button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="border-border mt-4 border-t pt-4">
              <AdvancedFilters
                filters={advancedFilters}
                onFilterChange={setAdvancedFilters}
                onClearFilters={() => setAdvancedFilters({})}
                activeFilterCount={activeFilterCount}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Templates Grid */}
      {sortedTemplates.length === 0 ? (
        /* Empty State */
        <Card size="auto">
          <CardHeader title="NO_RESULTS" />
          <CardContent className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <Search className="text-muted-foreground/30 mb-4 h-12 w-12" />
            <h3 className={cn(mode.font, 'mb-2 text-sm font-semibold')}>No templates found</h3>
            <p className={cn(mode.font, 'text-muted-foreground mb-6 max-w-md text-sm')}>
              {searchQuery
                ? `No templates match "${searchQuery}"`
                : 'No templates match your selected filters'}
            </p>

            {/* Suggestions */}
            <div className="mb-6 space-y-2">
              <p className={cn(mode.font, 'text-muted-foreground text-xs')}>[TRY]:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Dashboard', 'Auth', 'Settings', 'Billing'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchQuery(suggestion.toLowerCase());
                      setSelectedCategory('all');
                      setAdvancedFilters({});
                    }}
                    className={cn(
                      mode.font,
                      'border-border min-h-[44px] border px-4 py-2 text-xs transition-colors hover:text-primary',
                      mode.state.hover.card
                    )}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleClearFilters}
              variant="default"
              className={cn(mode.radius, mode.font, 'min-h-[44px]')}
            >
              &gt; CLEAR ALL FILTERS
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayedTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                id={template.id}
                name={template.name}
                description={template.description}
                href={template.href}
                icon={template.icon}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="pt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={cn(
                      currentPage === 1 && `pointer-events-none ${mode.state.muted.opacity}`,
                      'min-h-[44px]'
                    )}
                  />
                </PaginationItem>

                {getPageNumbers().map((page, idx) =>
                  page === 'ellipsis' ? (
                    <PaginationItem key={`ellipsis-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="min-h-[44px] min-w-[44px]"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={cn(
                      currentPage === totalPages && `pointer-events-none ${mode.state.muted.opacity}`,
                      'min-h-[44px]'
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {/* Help CTA - Simple, not bloated */}
      <Card size="auto" className="mt-8">
        <CardHeader title="NEED_HELP" icon={<Sparkles className="text-primary h-4 w-4" />} />
        <CardContent className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className={cn(mode.font, 'text-muted-foreground text-sm')}>
            Learn how to copy templates, customize components, and integrate with your stack.
          </p>
          <div className="flex gap-2">
            <Link href="/library/docs/getting-started">
              <Button variant="default" className={cn(mode.radius, mode.font, 'min-h-[44px]')}>
                &gt; GET STARTED
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" className={cn(mode.radius, mode.font, 'min-h-[44px]')}>
                &gt; COMPONENTS
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Theme Playground Panel */}
      <ThemePlaygroundPanel />
    </div>
  );
}
