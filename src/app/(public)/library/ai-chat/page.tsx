/**
 * AI Chat Template
 * Modular, ChatGPT-style interface with Terminal aesthetic.
 */
'use client';

import { AiChat } from '@/components/library/ai-chat';
import {
  TemplateShowcasePage,
  TemplatePreviewWrapper,
  BrowserChrome,
} from '@/components/library';

const templateCode = `"use client";

import { AiChat } from '@/components/library/ai-chat';

export default function Page() {
  return (
    <div className="h-150 w-full">
      <AiChat 
        defaultModelId="gpt-4o"
        initialMessages={[
          {
            id: '1',
            role: 'assistant',
            content: 'System ready. Waiting for input...', 
            timestamp: Date.now()
          }
        ]}
      />
    </div>
  );
}`;

// Static timestamp for initial message (avoids impure Date.now() during render)
const INITIAL_TIMESTAMP = 1703116800000; // 2023-12-21 00:00:00 UTC

function AIChatPreview() {
  return (
    <TemplatePreviewWrapper minHeight="700px">
      <BrowserChrome title="AI Uplink">
        <AiChat
          className="h-150 border-none"
          initialMessages={[
             {
               id: 'welcome',
               role: 'assistant',
               content: 'Hello. I am ready to assist you with your tasks.\n\nType a command to begin.',
               timestamp: INITIAL_TIMESTAMP
             }
          ]}
        />
      </BrowserChrome>
    </TemplatePreviewWrapper>
  );
}

export default function AIChatTemplate() {
  return (
    <TemplateShowcasePage
      badge="AI CHAT"
      title="AI Chat Interface"
      description="Full-featured chat UI with sidebar, message history, and terminal aesthetics."
      templateId="ai-chat"
      category={{ name: 'AI', href: '/library?category=ai' }}
      preview={<AIChatPreview />}
      code={templateCode}
      documentationHref="/docs/library/ai-chat"
      fileStructure={[
        { path: ['components/', 'library/', 'ai-chat/', 'index.tsx'], label: 'Main Container' },
        { path: ['components/', 'library/', 'ai-chat/', 'ai-chat-sidebar.tsx'], label: 'Sidebar' },
        { path: ['components/', 'library/', 'ai-chat/', 'ai-chat-message-list.tsx'], label: 'Message List' },
        { path: ['components/', 'library/', 'ai-chat/', 'ai-chat-input.tsx'], label: 'Input Area' },
      ]}
      features={[
        'Modular architecture (Sidebar, List, Input)',
        'Strict Terminal aesthetic (rounded-none, mono)',
        'Responsive sidebar toggle',
        'Auto-scrolling message history',
        'Markdown-ready message display',
        'Simulated streaming & loading states',
        'Clipboard copy functionality',
        'Error state handling',
      ]}
    />
  );
}
