/**
 * FABRK COMPONENT
 * Results Grid - Display search results in grid or list layout
 */

import { ResultCard } from './result-card';

interface Result {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  updated: string;
}

interface ResultsGridProps {
  results: Result[];
  viewMode: 'grid' | 'list';
}

export function ResultsGrid({ results, viewMode }: ResultsGridProps) {
  return (
    <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2' : 'space-y-6'}>
      {results.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}
