'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Sparkles, Eye, Code, Zap, RefreshCw } from 'lucide-react';

export default function AiFormsDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.02]"
      category="AI Tools"
      title="AI Form Generator"
      description="Generate production-ready React Hook Form + Zod code from natural language."
      overview="The AI Form Generator allows you to instantly create complex forms by describing them in plain English. It outputs a complete Zod schema for validation and a fully accessible React component using shadcn/ui primitives. Perfect for rapid prototyping or building internal tools."
      features={[
        {
          icon: Sparkles,
          title: 'Natural Language to Code',
          description: 'Convert "Contact form with name and email" into working code.',
        },
        {
          icon: Eye,
          title: 'Live Preview',
          description: 'Instantly interact with the generated form to test validation.',
        },
        {
          icon: Code,
          title: 'Code Export',
          description: 'Copy-paste ready TypeScript code for Zod schemas and React components.',
        },
        {
          icon: Zap,
          title: 'Complex Fields',
          description: 'Supports select, radio, checkbox, textarea, and more.',
        },
        {
          icon: RefreshCw,
          title: 'Iterative Refinement',
          description: 'Regenerate forms to tweak fields or validation rules.',
        },
      ]}
      setup={[
        {
          title: 'Import Component',
          description: 'Import the generator into your admin or tool page.',
          code: `import { AiForms } from '@/components/library/ai-forms';`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Implementation',
          description: 'Provide a generation handler to connect to your AI backend.',
          code: `export default function GeneratorPage() {
  const handleGenerate = async (prompt) => {
    const res = await fetch('/api/ai/generate-form', {
      method: 'POST',
      body: JSON.stringify({ prompt })
    });
    return await res.json();
  };

  return <AiForms onGenerate={handleGenerate} />;
}`,
          language: 'tsx',
        },
      ]}
      configuration={[
        {
          name: 'initialForm',
          type: 'GeneratedForm',
          default: 'DEMO_FORM',
          description: 'Initial form state to display on load.',
        },
        {
          name: 'onGenerate',
          type: 'function',
          default: 'undefined',
          description: 'Async callback that returns a GeneratedForm object.',
        },
      ]}
      previous={{ title: 'AI Chat', href: '/docs/library/ai-chat' }}
      next={{ title: 'AI Text Tools', href: '/docs/library/ai-text-tools' }}
    >
      <DocsSection title="Data Structure">
        <DocsCard title="GENERATED FORM TYPE">
          <p className="mb-4 text-sm text-muted-foreground">
            The generator expects the AI to return data matching this interface:
          </p>
          <pre className="bg-muted overflow-x-auto p-4 text-xs font-mono">
{`interface GeneratedForm {
  name: string;        // e.g. "ContactForm"
  description: string; // e.g. "A simple contact form"
  submitLabel: string; // e.g. "Send Message"
  fields: {
    name: string;      // e.g. "email"
    label: string;     // e.g. "Email Address"
    type: "text" | "email" | "password" | "textarea" | ...;
    required: boolean;
    placeholder?: string;
    options?: { label: string; value: string }[]; // For select/radio
  }[];
}`}
          </pre>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}