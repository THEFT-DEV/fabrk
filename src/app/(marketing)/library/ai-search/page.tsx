/**
 * AI Search Template
 * Natural language search interface with categorized results.
 */
'use client';

import { AiSearch } from '@/components/library/ai-search';
import {
  TemplateShowcasePage,
  TemplatePreviewWrapper,
  BrowserChrome,
} from '@/components/library';

const templateCode = `"use client";

import { AiSearch } from '@/components/library/ai-search';

export default function Page() {
  // Optional: Connect to your search API
  const handleSearch = async (query: string) => {
    const response = await fetch('/api/ai/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    return await response.json();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <AiSearch
        onSearch={handleSearch}
        placeholder="> Ask anything or search..."
      />
    </div>
  );
}`;

function SearchPreview() {
  return (
    <TemplatePreviewWrapper minHeight="500px">
      <BrowserChrome title="AI Search">
        <div className="p-6">
          <AiSearch />
        </div>
      </BrowserChrome>
    </TemplatePreviewWrapper>
  );
}

export default function SearchTemplate() {
  return (
    <TemplateShowcasePage
      badge="AI SEARCH"
      title="AI Search Interface"
      description="Natural language search with categorized results and relevance scoring."
      templateId="ai-search"
      category={{ name: 'AI', href: '/library?category=ai' }}
      preview={<SearchPreview />}
      code={templateCode}
      documentationHref="/docs/library/ai-search"
      fileStructure={[
        { path: ['components/', 'library/', 'ai-search/', 'index.tsx'], label: 'Main Component' },
      ]}
      features={[
        'Natural language query input',
        'Categorized search results',
        'Relevance percentage scoring',
        'Suggested queries for discovery',
        'Demo mode with mock results',
        'Custom API integration support',
        'Terminal aesthetic styling',
        'Keyboard navigation support',
      ]}
    />
  );
}
