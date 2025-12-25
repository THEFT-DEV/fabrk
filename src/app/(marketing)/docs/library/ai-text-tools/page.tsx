'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { FileText, Languages, Search, Sparkles } from 'lucide-react';

export default function AiTextToolsDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.03]"
      category="AI Tools"
      title="AI Text Tools"
      description="Suite of utilities for text summarization, translation, and sentiment analysis."
      overview="A comprehensive set of text processing tools powered by AI. Quickly integrate features like summarization, language translation, grammar correction, and tone adjustment into your application."
      features={[
        {
          icon: FileText,
          title: 'Summarization',
          description: 'Condense long articles or documents into concise summaries.',
        },
        {
          icon: Languages,
          title: 'Translation',
          description: 'Translate text between dozens of languages instantly.',
        },
        {
          icon: Search,
          title: 'Analysis',
          description: 'Extract keywords, sentiment, and entities from text.',
        },
        {
          icon: Sparkles,
          title: 'Refinement',
          description: 'Rewrite text to change tone (professional, friendly, etc.).',
        },
      ]}
      setup={[
        {
          title: 'Import Components',
          description: 'Add the text tools to your page.',
          code: `import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Basic Usage',
          description: 'Copy the template from the library page.',
          code: `// See /library/ai-text-tools for full template
// Operations: summarize, rewrite, translate, expand, grammar, tone

const handleTransform = async (text: string, operation: string) => {
  const response = await fetch('/api/ai/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, operation }),
  });
  return await response.json();
};`,
          language: 'tsx',
        },
      ]}
      configuration={[
        {
          name: 'operations',
          type: 'Operation[]',
          default: 'all 6 operations',
          description: 'Available: summarize, rewrite, translate, expand, grammar, tone.',
        },
        {
          name: 'targetLanguage',
          type: 'string',
          default: '"Spanish"',
          description: 'Target language for translation operation.',
        },
        {
          name: 'tone',
          type: 'string',
          default: '"professional"',
          description: 'Target tone for rewriting (professional, casual, formal, friendly).',
        },
      ]}
      previous={{ title: 'AI Forms', href: '/docs/library/ai-forms' }}
      next={{ title: 'AI Image', href: '/docs/library/ai-image' }}
    >
      <DocsSection title="Available Operations">
        <DocsCard title="TEXT TRANSFORMATIONS">
          <ul className="space-y-2 text-sm text-muted-foreground font-mono">
            <li><strong>SUMMARIZE</strong>: Condense text to key points</li>
            <li><strong>REWRITE</strong>: Improve clarity and flow</li>
            <li><strong>TRANSLATE</strong>: Convert to another language</li>
            <li><strong>EXPAND</strong>: Add more detail and examples</li>
            <li><strong>GRAMMAR</strong>: Fix spelling and grammar errors</li>
            <li><strong>TONE</strong>: Adjust writing style</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}