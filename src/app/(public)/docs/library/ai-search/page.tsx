'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Search, Sparkles, FileText, Users, Settings, Terminal } from 'lucide-react';

export default function AiSearchDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.09]"
      category="AI Tools"
      title="AI Search"
      description="Natural language search with categorized results and relevance scoring."
      overview="The AI Search component provides a conversational search interface. Users type natural language queries and receive categorized results with relevance scores. Includes suggested queries for discovery and demo mode for testing."
      features={[
        {
          icon: Search,
          title: 'Natural Language',
          description: 'Users query in plain English, not keywords.',
        },
        {
          icon: Sparkles,
          title: 'Relevance Scoring',
          description: 'Each result shows a percentage relevance score.',
        },
        {
          icon: FileText,
          title: 'Categorized Results',
          description: 'Documents, users, settings, and analytics categories.',
        },
        {
          icon: Users,
          title: 'Suggestions',
          description: 'Pre-built suggestions help users discover content.',
        },
        {
          icon: Settings,
          title: 'Custom API',
          description: 'Easy integration with your search backend.',
        },
        {
          icon: Terminal,
          title: 'Terminal Aesthetic',
          description: 'Strict rounded-none styling with monospace typography.',
        },
      ]}
      setup={[
        {
          title: 'Import Component',
          description: 'Import the search interface into your page.',
          code: `import { AiSearch } from '@/components/library/ai-search';`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Demo Mode',
          description: 'Use without API for testing and demos.',
          code: `export default function Page() {
  return <AiSearch placeholder="> Search your data..." />;
}`,
          language: 'tsx',
        },
        {
          title: 'With Search API',
          description: 'Connect to your search backend.',
          code: `export default function Page() {
  const handleSearch = async (query: string) => {
    const response = await fetch('/api/ai/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    return await response.json();
  };

  return <AiSearch onSearch={handleSearch} />;
}`,
          language: 'tsx',
        },
      ]}
      configuration={[
        {
          name: 'onSearch',
          type: '(query: string) => Promise<SearchResult[]>',
          default: 'undefined',
          description: 'Async callback for fetching search results.',
        },
        {
          name: 'placeholder',
          type: 'string',
          default: '"> Ask anything or search..."',
          description: 'Placeholder text for the search input.',
        },
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Additional CSS classes for the container.',
        },
      ]}
      previous={{ title: 'AI Autofill', href: '/docs/library/ai-autofill' }}
      next={{ title: 'Advanced Filters', href: '/docs/library/advanced-filters' }}
    >
      <DocsSection title="Result Categories">
        <DocsCard title="RESULT TYPES">
          <p className="mb-4 text-sm text-muted-foreground">
            Results are categorized with icons for quick scanning:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground font-mono">
            <li><strong>document</strong>: Files, reports, and documents</li>
            <li><strong>user</strong>: Team members and contacts</li>
            <li><strong>setting</strong>: Configuration and preferences</li>
            <li><strong>analytics</strong>: Dashboards and metrics</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
