/**
 * AI PDF Chat Template
 * Upload PDFs and ask questions about the content.
 */
'use client';

import { AiPdfChat } from '@/components/library/ai-pdf-chat';
import {
  TemplateShowcasePage,
  TemplatePreviewWrapper,
  BrowserChrome,
} from '@/components/library';

const templateCode = `"use client";

import { AiPdfChat } from '@/components/library/ai-pdf-chat';

export default function Page() {
  // Optional: Connect to your RAG API
  const handleAskQuestion = async (question: string, pdfContent: string) => {
    const response = await fetch('/api/ai/pdf-chat', {
      method: 'POST',
      body: JSON.stringify({ question, pdfContent }),
    });
    const data = await response.json();
    return data.answer;
  };

  return (
    <div className="h-[600px] w-full">
      <AiPdfChat onAskQuestion={handleAskQuestion} />
    </div>
  );
}`;

function PDFChatPreview() {
  return (
    <TemplatePreviewWrapper minHeight="650px">
      <BrowserChrome title="PDF Chat">
        <AiPdfChat className="border-none" />
      </BrowserChrome>
    </TemplatePreviewWrapper>
  );
}

export default function PDFChatTemplate() {
  return (
    <TemplateShowcasePage
      badge="PDF CHAT"
      title="PDF Chat Interface"
      description="Upload PDF documents and ask questions about their content using AI."
      templateId="ai-pdf-chat"
      category={{ name: 'AI', href: '/library?category=ai' }}
      preview={<PDFChatPreview />}
      code={templateCode}
      documentationHref="/docs/library/ai-pdf-chat"
      fileStructure={[
        { path: ['components/', 'library/', 'ai-pdf-chat/', 'index.tsx'], label: 'Main Component' },
      ]}
      features={[
        'PDF file upload with drag & drop',
        'Document processing indicator',
        'Chat interface for Q&A',
        'Demo mode with mock responses',
        'Custom API integration support',
        'Message history with timestamps',
        'Terminal aesthetic styling',
        'Clear and reset functionality',
      ]}
    />
  );
}
