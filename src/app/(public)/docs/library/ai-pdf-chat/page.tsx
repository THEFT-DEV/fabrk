'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { FileText, MessageSquare, Upload, Search, Terminal, Zap } from 'lucide-react';

export default function AiPdfChatDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.07]"
      category="AI Tools"
      title="PDF Chat"
      description="Upload PDF documents and ask questions about their content using AI."
      overview="The PDF Chat component provides a complete RAG (Retrieval Augmented Generation) interface. Users upload a PDF, the system processes it, then they can ask questions about the content. Includes demo mode for testing without API setup."
      features={[
        {
          icon: Upload,
          title: 'PDF Upload',
          description: 'Drag and drop or click to upload PDF documents.',
        },
        {
          icon: FileText,
          title: 'Document Processing',
          description: 'Visual indicator while document is being processed.',
        },
        {
          icon: MessageSquare,
          title: 'Chat Interface',
          description: 'Familiar chat UI for asking questions about the document.',
        },
        {
          icon: Search,
          title: 'Demo Mode',
          description: 'Built-in mock responses for testing without API.',
        },
        {
          icon: Zap,
          title: 'Custom API',
          description: 'Easy integration with your RAG backend.',
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
          description: 'Import the PDF chat into your page.',
          code: `import { AiPdfChat } from '@/components/library/ai-pdf-chat';`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Demo Mode',
          description: 'Use without API for testing and demos.',
          code: `export default function Page() {
  return <AiPdfChat />;
}`,
          language: 'tsx',
        },
        {
          title: 'With RAG API',
          description: 'Connect to your document QA backend.',
          code: `export default function Page() {
  const handleQuestion = async (question: string, pdfContent: string) => {
    const response = await fetch('/api/ai/pdf-chat', {
      method: 'POST',
      body: JSON.stringify({ question, pdfContent }),
    });
    const data = await response.json();
    return data.answer;
  };

  return <AiPdfChat onAskQuestion={handleQuestion} />;
}`,
          language: 'tsx',
        },
      ]}
      configuration={[
        {
          name: 'onAskQuestion',
          type: '(question: string, pdfContent: string) => Promise<string>',
          default: 'undefined',
          description: 'Async callback for sending questions to your API.',
        },
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Additional CSS classes for the container.',
        },
      ]}
      previous={{ title: 'QR Generator', href: '/docs/library/ai-qr-generator' }}
      next={{ title: 'AI Autofill', href: '/docs/library/ai-autofill' }}
    >
      <DocsSection title="Backend Integration">
        <DocsCard title="RAG SETUP">
          <p className="mb-4 text-sm text-muted-foreground">
            For production use, you will need a RAG (Retrieval Augmented Generation) backend:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground font-mono">
            <li><strong>PDF Parsing</strong>: Use pdf-parse or similar to extract text.</li>
            <li><strong>Vector Store</strong>: Pinecone, Weaviate, or pgvector for embeddings.</li>
            <li><strong>LLM</strong>: OpenAI, Claude, or local model for answers.</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
