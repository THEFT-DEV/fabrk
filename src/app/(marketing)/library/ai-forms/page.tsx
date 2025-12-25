/**
 * AI Form Generator Template
 * Reusable component showcase.
 */
'use client';

import { AiForms } from '@/components/library/ai-forms';
import {
  TemplateShowcasePage,
  TemplatePreviewWrapper,
} from '@/components/library';

const templateCode = `"use client";

import { AiForms } from '@/components/library/ai-forms';

export default function Page() {
  const handleGenerate = async (prompt: string) => {
    // Call your API
    const res = await fetch('/api/generate-form', { 
      method: 'POST', 
      body: JSON.stringify({ prompt }) 
    });
    return await res.json();
  };

  return <AiForms onGenerate={handleGenerate} />;
}`;

function AiFormsPreview() {
  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="mx-auto max-w-4xl">
        <AiForms />
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function AiFormsTemplate() {
  return (
    <TemplateShowcasePage
      badge="AI FORMS"
      title="AI Form Generator"
      description="Natural language to React Hook Form generator with live preview and code export."
      templateId="ai-forms"
      category={{ name: 'AI', href: '/library?category=ai' }}
      preview={<AiFormsPreview />}
      code={templateCode}
      documentationHref="/docs/library/ai-forms"
      fileStructure={[
        { path: ['components/', 'library/', 'ai-forms/', 'index.tsx'], label: 'Main Container' },
        { path: ['components/', 'library/', 'ai-forms/', 'ai-forms-input.tsx'], label: 'Input Area' },
        { path: ['components/', 'library/', 'ai-forms/', 'ai-forms-preview.tsx'], label: 'Preview Tabs' },
        { path: ['lib/', 'ai/', 'schemas.ts'], label: 'Zod Schemas' },
      ]}
      features={[
        'Natural language to form generation',
        'React Hook Form + Zod schema output',
        'Live form preview with all field types',
        'Copyable schema and component code',
        'Supports text, email, password, select, textarea, checkbox, radio',
        'Terminal-styled chat interface',
      ]}
    />
  );
}