/**
 * Advanced Filters Component
 * Filter templates by difficulty, setup time, dependencies, and features
 */

import { X } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';

export interface FilterOptions {
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  setupTime?: 'quick' | 'medium' | 'long'; // < 10min, 10-30min, > 30min
  hasDependencies?: boolean;
  feature?: string;
}

export interface AdvancedFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'] as const;
const setupTimes = [
  { id: 'quick', label: '< 10 MIN', value: 'quick' },
  { id: 'medium', label: '10-30 MIN', value: 'medium' },
  { id: 'long', label: '> 30 MIN', value: 'long' },
] as const;

const popularFeatures = [
  'Charts & graphs',
  'Search & filter',
  'Form validation',
  'Tab navigation',
  'Social Auth',
  'Code blocks',
  'Data tables',
  'User table',
];

export function AdvancedFilters({
  filters,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
}: AdvancedFiltersProps) {
  const handleDifficultyToggle = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
    onFilterChange({
      ...filters,
      difficulty: filters.difficulty === difficulty ? undefined : difficulty,
    });
  };

  const handleSetupTimeToggle = (setupTime: 'quick' | 'medium' | 'long') => {
    onFilterChange({
      ...filters,
      setupTime: filters.setupTime === setupTime ? undefined : setupTime,
    });
  };

  const handleFeatureToggle = (feature: string) => {
    onFilterChange({
      ...filters,
      feature: filters.feature === feature ? undefined : feature,
    });
  };

  const handleDependenciesToggle = () => {
    onFilterChange({
      ...filters,
      hasDependencies: filters.hasDependencies ? undefined : true,
    });
  };

  return (
    <Card>
      <CardHeader code="0xF1" title="ADVANCED FILTERS" />
      <div className="space-y-4 p-4">
        {/* Active Filter Count + Clear */}
        {activeFilterCount > 0 && (
          <div className="border-border flex items-center justify-between border-b pb-3">
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
              [{activeFilterCount} {activeFilterCount === 1 ? 'FILTER' : 'FILTERS'} ACTIVE]
            </span>
            <Button
              onClick={onClearFilters}
              variant="ghost"
              size="sm"
              className={cn(mode.radius, mode.font, 'text-xs')}
            >
              <X className="mr-1 h-3 w-3" />
              &gt; CLEAR ALL
            </Button>
          </div>
        )}

        {/* Difficulty Filter */}
        <div className="space-y-2">
          <label className={cn(mode.font, 'text-muted-foreground text-xs')}>[DIFFICULTY]:</label>
          <div className="flex flex-wrap gap-2">
            {difficultyLevels.map((level) => (
              <button
                key={level}
                onClick={() => handleDifficultyToggle(level)}
                className={cn(
                  mode.font,
                  'border-border px-4 py-2 text-xs transition-all',
                  filters.difficulty === level
                    ? 'bg-primary text-primary-foreground border'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border'
                )}
              >
                {level.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Setup Time Filter */}
        <div className="space-y-2">
          <label className={cn(mode.font, 'text-muted-foreground text-xs')}>[SETUP TIME]:</label>
          <div className="flex flex-wrap gap-2">
            {setupTimes.map((time) => (
              <button
                key={time.id}
                onClick={() => handleSetupTimeToggle(time.value)}
                className={cn(
                  mode.font,
                  'border-border px-4 py-2 text-xs transition-all',
                  filters.setupTime === time.value
                    ? 'bg-primary text-primary-foreground border'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border'
                )}
              >
                {time.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dependencies Filter */}
        <div className="space-y-2">
          <label className={cn(mode.font, 'text-muted-foreground text-xs')}>[DEPENDENCIES]:</label>
          <button
            onClick={handleDependenciesToggle}
            className={cn(
              mode.font,
              'border-border w-full px-4 py-2 text-left text-xs transition-all',
              filters.hasDependencies
                ? 'bg-primary text-primary-foreground border'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border'
            )}
          >
            {filters.hasDependencies ? '✓ ' : ''}HAS EXTERNAL DEPENDENCIES
          </button>
        </div>

        {/* Feature Filter */}
        <div className="space-y-2">
          <label className={cn(mode.font, 'text-muted-foreground text-xs')}>[FEATURES]:</label>
          <div className="flex flex-wrap gap-2">
            {popularFeatures.map((feature) => (
              <button
                key={feature}
                onClick={() => handleFeatureToggle(feature)}
                className={cn(
                  mode.font,
                  'border-border px-2 py-1 text-xs transition-all',
                  filters.feature === feature
                    ? 'bg-primary text-primary-foreground border'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border'
                )}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
