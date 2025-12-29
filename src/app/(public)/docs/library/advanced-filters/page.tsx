'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { AdvancedFilters, type FilterOptions } from '@/components/library';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { useState } from 'react';

const importCode = `import { AdvancedFilters, type FilterOptions } from '@/components/library';`;

const usageCode = `'use client';

import { useState } from 'react';
import { AdvancedFilters, type FilterOptions } from '@/components/library';

export default function Page() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const handleClearFilters = () => {
    setFilters({});
    setActiveFilterCount(0);
  };

  return (
    <AdvancedFilters
      filters={filters}
      onFilterChange={setFilters}
      onClearFilters={handleClearFilters}
      activeFilterCount={activeFilterCount}
    />
  );
}`;

const filterOptionsCode = `export interface FilterOptions {
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  setupTime?: 'quick' | 'medium' | 'long'; // < 10min, 10-30min, > 30min
  hasDependencies?: boolean;
  feature?: string;
}`;

function AdvancedFiltersPreview() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const activeFilterCount =
    (filters.difficulty ? 1 : 0) +
    (filters.setupTime ? 1 : 0) +
    (filters.hasDependencies ? 1 : 0) +
    (filters.feature ? 1 : 0);

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <AdvancedFilters
      filters={filters}
      onFilterChange={setFilters}
      onClearFilters={handleClearFilters}
      activeFilterCount={activeFilterCount}
    />
  );
}

export default function AdvancedFiltersPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LIB.03]"
      title="Advanced Filters"
      description="Filter panel with difficulty, setup time, dependencies, and feature filters"
      importCode={importCode}
      mainPreview={{
        preview: (
          <div className="bg-background p-6">
            <AdvancedFiltersPreview />
          </div>
        ),
        code: usageCode,
      }}
      props={[
        {
          name: 'filters',
          type: 'FilterOptions',
          required: true,
          description: 'Current filter state object',
        },
        {
          name: 'onFilterChange',
          type: '(filters: FilterOptions) => void',
          required: true,
          description: 'Callback when filters change',
        },
        {
          name: 'onClearFilters',
          type: '() => void',
          required: true,
          description: 'Callback to clear all filters',
        },
        {
          name: 'activeFilterCount',
          type: 'number',
          required: true,
          description: 'Number of active filters (for badge display)',
        },
      ]}
      accessibility={[
        'Shows 4 filter types: Difficulty, Setup Time, Dependencies, Features',
        'Active filter count badge shown when filters are applied',
        'Clear All button appears when activeFilterCount > 0',
        'Difficulty: Beginner, Intermediate, Advanced',
        'Setup Time: < 10min, 10-30min, > 30min',
        'Dependencies: Has External Dependencies toggle',
        'Features: 8 popular feature tags (Charts, Forms, Auth, etc.)',
        'All filters are mutually exclusive within their type',
        'Terminal aesthetic styling throughout',
      ]}
      previous={{ title: 'Related Templates', href: '/docs/components/related-templates' }}
      next={{ title: 'Code Block', href: '/docs/components/code-block' }}
    >
      <Card>
        <CardHeader code="0xA1" title="FILTER_OPTIONS_TYPE" />
        <CardContent>
          <CodeBlock code={filterOptionsCode} language="typescript" maxHeight="200px" />
        </CardContent>
      </Card>
    </ComponentShowcaseTemplate>
  );
}
