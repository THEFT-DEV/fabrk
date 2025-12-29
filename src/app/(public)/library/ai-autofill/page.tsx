/**
 * AI Autofill Template
 * Smart form completion with AI assistance.
 */
'use client';

import { AiAutofill } from '@/components/library/ai-autofill';
import {
  TemplateShowcasePage,
  TemplatePreviewWrapper,
  BrowserChrome,
} from '@/components/library';

const templateCode = `"use client";

import { AiAutofill } from '@/components/library/ai-autofill';

export default function Page() {
  // Optional: Connect to your AI API
  const handleAutofill = async (companyName: string) => {
    const response = await fetch('/api/ai/autofill', {
      method: 'POST',
      body: JSON.stringify({ companyName }),
    });
    return await response.json();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <AiAutofill onAutofill={handleAutofill} />
    </div>
  );
}`;

function AutofillPreview() {
  return (
    <TemplatePreviewWrapper minHeight="700px">
      <BrowserChrome title="AI Autofill">
        <div className="p-6">
          <AiAutofill />
        </div>
      </BrowserChrome>
    </TemplatePreviewWrapper>
  );
}

export default function AutofillTemplate() {
  return (
    <TemplateShowcasePage
      badge="AI AUTOFILL"
      title="AI Form Autofill"
      description="Smart form completion that uses AI to populate fields based on context."
      templateId="ai-autofill"
      category={{ name: 'AI', href: '/library?category=ai' }}
      preview={<AutofillPreview />}
      code={templateCode}
      documentationHref="/docs/library/ai-autofill"
      fileStructure={[
        { path: ['components/', 'library/', 'ai-autofill/', 'index.tsx'], label: 'Main Component' },
      ]}
      features={[
        'One-click form autofill',
        'Visual indicator for AI-filled fields',
        'Demo mode with smart mock data',
        'Custom API integration support',
        'Field validation and error handling',
        'Reset and clear functionality',
        'Terminal aesthetic styling',
        'Accessible form controls',
      ]}
    />
  );
}
