'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Sparkles, FormInput, Check, RefreshCw, Terminal, Zap } from 'lucide-react';

export default function AiAutofillDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.08]"
      category="AI Tools"
      title="AI Autofill"
      description="Smart form completion that uses AI to populate fields based on context."
      overview="The AI Autofill component demonstrates intelligent form completion. Enter a company name, click autofill, and watch AI populate related fields. Visual indicators show which fields were filled by AI. Perfect for onboarding flows and lead capture."
      features={[
        {
          icon: Sparkles,
          title: 'One-Click Fill',
          description: 'Enter context and autofill all related fields instantly.',
        },
        {
          icon: Check,
          title: 'Visual Indicators',
          description: 'Green highlights show which fields were AI-populated.',
        },
        {
          icon: FormInput,
          title: 'Smart Context',
          description: 'AI understands company names and suggests relevant data.',
        },
        {
          icon: RefreshCw,
          title: 'Reset & Edit',
          description: 'Users can clear or manually override any field.',
        },
        {
          icon: Zap,
          title: 'Custom API',
          description: 'Easy integration with your AI backend.',
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
          description: 'Import the autofill form into your page.',
          code: `import { AiAutofill } from '@/components/library/ai-autofill';`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Demo Mode',
          description: 'Use without API for testing and demos.',
          code: `export default function Page() {
  return <AiAutofill />;
}`,
          language: 'tsx',
        },
        {
          title: 'With AI API',
          description: 'Connect to your autofill backend.',
          code: `export default function Page() {
  const handleAutofill = async (companyName: string) => {
    const response = await fetch('/api/ai/autofill', {
      method: 'POST',
      body: JSON.stringify({ companyName }),
    });
    return await response.json();
  };

  return <AiAutofill onAutofill={handleAutofill} />;
}`,
          language: 'tsx',
        },
      ]}
      configuration={[
        {
          name: 'onAutofill',
          type: '(context: string) => Promise<Partial<AutofillFormData>>',
          default: 'undefined',
          description: 'Async callback for fetching autofill data.',
        },
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Additional CSS classes for the container.',
        },
      ]}
      previous={{ title: 'PDF Chat', href: '/docs/library/ai-pdf-chat' }}
      next={{ title: 'AI Search', href: '/docs/library/ai-search' }}
    >
      <DocsSection title="Form Fields">
        <DocsCard title="AUTOFILLABLE FIELDS">
          <p className="mb-4 text-sm text-muted-foreground">
            The default implementation includes these fields:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground font-mono">
            <li><strong>companyName</strong>: User input (required context)</li>
            <li><strong>industry</strong>: Select dropdown</li>
            <li><strong>companySize</strong>: Select dropdown</li>
            <li><strong>website</strong>: Text input</li>
            <li><strong>description</strong>: Textarea</li>
            <li><strong>targetAudience</strong>: Textarea</li>
            <li><strong>challenges</strong>: Textarea</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
