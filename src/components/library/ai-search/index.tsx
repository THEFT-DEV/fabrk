'use client';

import * as React from 'react';
import {
  Search,
  Loader2,
  Sparkles,
  ArrowRight,
  FileText,
  Users,
  Settings,
  BarChart3,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'document' | 'user' | 'setting' | 'analytics';
  relevance: number;
  url?: string;
}

export interface AiSearchProps {
  onSearch?: (query: string) => Promise<SearchResult[]>;
  placeholder?: string;
  className?: string;
}

const CATEGORY_ICONS = {
  document: FileText,
  user: Users,
  setting: Settings,
  analytics: BarChart3,
};

const CATEGORY_COLORS = {
  document: 'text-info',
  user: 'text-success',
  setting: 'text-warning',
  analytics: 'text-primary',
};

// Demo search results
const DEMO_RESULTS: Record<string, SearchResult[]> = {
  sales: [
    {
      id: '1',
      title: 'Q4 Sales Report',
      description: 'Quarterly sales performance analysis with regional breakdown',
      category: 'document',
      relevance: 95,
      url: '/documents/q4-sales',
    },
    {
      id: '2',
      title: 'Sales Team Dashboard',
      description: 'Real-time sales metrics and team performance',
      category: 'analytics',
      relevance: 88,
      url: '/analytics/sales',
    },
    {
      id: '3',
      title: 'Sarah Chen - Sales Manager',
      description: 'sales@company.com | West Region Lead',
      category: 'user',
      relevance: 72,
      url: '/users/sarah-chen',
    },
  ],
  users: [
    {
      id: '1',
      title: 'User Management',
      description: 'Add, edit, and manage user accounts and permissions',
      category: 'setting',
      relevance: 98,
      url: '/settings/users',
    },
    {
      id: '2',
      title: 'Active Users Report',
      description: 'Monthly active users and engagement metrics',
      category: 'analytics',
      relevance: 85,
      url: '/analytics/users',
    },
    {
      id: '3',
      title: 'John Smith - Admin',
      description: 'admin@company.com | System Administrator',
      category: 'user',
      relevance: 80,
      url: '/users/john-smith',
    },
  ],
  default: [
    {
      id: '1',
      title: 'Getting Started Guide',
      description: 'Learn how to set up and configure your dashboard',
      category: 'document',
      relevance: 90,
      url: '/docs/getting-started',
    },
    {
      id: '2',
      title: 'Dashboard Overview',
      description: 'Main dashboard with key metrics and insights',
      category: 'analytics',
      relevance: 85,
      url: '/dashboard',
    },
    {
      id: '3',
      title: 'Account Settings',
      description: 'Manage your account preferences and security',
      category: 'setting',
      relevance: 75,
      url: '/settings/account',
    },
  ],
};

const SUGGESTIONS = [
  'Show me Q4 sales report',
  'Find all users in the West region',
  'What are our top performing products?',
  'Open user management settings',
];

export function AiSearch({
  onSearch,
  placeholder = '> Ask anything or search...',
  className,
}: AiSearchProps) {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      let searchResults: SearchResult[];

      if (onSearch) {
        searchResults = await onSearch(q);
      } else {
        // Demo mode
        await new Promise((resolve) => setTimeout(resolve, 800));

        const lowerQuery = q.toLowerCase();
        if (lowerQuery.includes('sales') || lowerQuery.includes('q4')) {
          searchResults = DEMO_RESULTS.sales;
        } else if (lowerQuery.includes('user') || lowerQuery.includes('admin')) {
          searchResults = DEMO_RESULTS.users;
        } else {
          searchResults = DEMO_RESULTS.default;
        }
      }

      setResults(searchResults);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    inputRef.current?.focus();
  };

  return (
    <Card className={cn('', className)}>
      <CardHeader code="0xSR" title="AI_SEARCH" />

      <CardContent padding="md" className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={cn('pl-10 pr-10 text-sm', mode.radius, mode.font)}
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="size-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => handleSearch()}
              disabled={!query.trim() || isSearching}
              className={cn('px-4 text-xs', mode.radius, mode.font)}
            >
              {isSearching ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="mr-2 size-4" />
                  SEARCH
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Suggestions (when no search) */}
        {!hasSearched && (
          <div className="space-y-2">
            <p className={cn('text-xs uppercase', mode.font, mode.color.text.muted)}>
              [SUGGESTIONS]:
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    'border px-3 py-2 text-xs transition-colors',
                    mode.radius,
                    mode.font,
                    mode.color.border.default,
                    mode.state.hover.card
                  )}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className={cn('text-xs uppercase', mode.font, mode.color.text.muted)}>
                [RESULTS]: {results.length} found
              </p>
              {results.length > 0 && (
                <button
                  onClick={handleClear}
                  className={cn('text-xs', mode.font, 'text-primary hover:underline')}
                >
                  Clear
                </button>
              )}
            </div>

            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="size-6 animate-spin" />
              </div>
            ) : results.length === 0 ? (
              <div className="py-8 text-center">
                <p className={cn('text-sm', mode.font, mode.color.text.muted)}>
                  No results found for &quot;{query}&quot;
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((result) => {
                  const Icon = CATEGORY_ICONS[result.category];
                  const iconColor = CATEGORY_COLORS[result.category];

                  return (
                    <button
                      key={result.id}
                      className={cn(
                        'flex w-full items-start gap-4 border p-4 text-left transition-colors',
                        mode.radius,
                        mode.color.border.default,
                        mode.state.hover.card
                      )}
                    >
                      <div
                        className={cn(
                          'flex size-8 shrink-0 items-center justify-center border',
                          mode.radius,
                          mode.color.border.default,
                          'bg-muted/50'
                        )}
                      >
                        <Icon className={cn('size-4', iconColor)} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={cn('truncate text-sm font-medium', mode.font)}>
                            {result.title}
                          </p>
                          <Badge
                            variant="outline"
                            className={cn('text-[10px] uppercase', mode.radius)}
                          >
                            {result.relevance}%
                          </Badge>
                        </div>
                        <p
                          className={cn(
                            'mt-0.5 truncate text-xs',
                            mode.font,
                            mode.color.text.muted
                          )}
                        >
                          {result.description}
                        </p>
                      </div>
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
