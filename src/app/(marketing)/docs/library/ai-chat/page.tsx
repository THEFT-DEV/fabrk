'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { MessageSquare, Zap, Layout, Terminal, Code, Lock } from 'lucide-react';

export default function AiChatDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.01]"
      category="AI Tools"
      title="AI Chat"
      description="Production-ready chat interface with streaming, history, and multi-model support."
      overview="The AI Chat component provides a complete conversational interface similar to ChatGPT or Claude. It handles real-time message streaming, conversation history persistence, model selection, and markdown rendering. Designed with the strict Terminal aesthetic, it's ready to drop into your application."
      features={[
        {
          icon: MessageSquare,
          title: 'Real-time Streaming',
          description: 'Simulated or real API streaming support for instant feedback.',
        },
        {
          icon: Layout,
          title: 'Responsive Sidebar',
          description: 'Collapsible sidebar for conversation history management.',
        },
        {
          icon: Zap,
          title: 'Multi-Model Support',
          description: 'Switch between GPT-4o, Claude 3.5, and Gemini 1.5 dynamically.',
        },
        {
          icon: Terminal,
          title: 'Terminal Aesthetic',
          description: 'Strict rounded-none styling with monospace typography.',
        },
        {
          icon: Code,
          title: 'Markdown Rendering',
          description: 'Code blocks and formatted text support out of the box.',
        },
        {
          icon: Lock,
          title: 'Secure & Private',
          description: 'Built-in support for persisting chats to your secure database.',
        },
      ]}
      setup={[
        {
          title: 'Install Dependencies',
          description: 'Ensure you have the necessary UI primitives installed.',
          code: `npm install lucide-react clsx tailwind-merge`,
          language: 'bash',
        },
        {
          title: 'Import Component',
          description: 'Import the chat component into your page.',
          code: `import { AiChat } from '@/components/library/ai-chat';`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Basic Implementation',
          description: 'Render the chat component with a handler for sending messages.',
          code: `export default function Page() {
  const handleSend = async (msg, attachments, model) => {
    // Your API call here
    await fetch('/api/chat', { 
      method: 'POST', 
      body: JSON.stringify({ msg, model }) 
    });
  };

  return <AiChat onSendMessage={handleSend} />;
}`,
          language: 'tsx',
        },
        {
          title: 'With Initial History',
          description: 'Load previous conversation history.',
          code: `<AiChat 
  initialMessages={[
    { role: 'user', content: 'Hello' },
    { role: 'assistant', content: 'Hi there!' }
  ]} 
/>`,
          language: 'tsx',
        },
      ]}
      configuration={[
        {
          name: 'initialMessages',
          type: 'Message[]',
          default: '[]',
          description: 'Array of messages to preload.',
        },
        {
          name: 'defaultModelId',
          type: 'string',
          default: '"gpt-4o"',
          description: 'Default selected model ID.',
        },
        {
          name: 'onSendMessage',
          type: 'function',
          default: 'undefined',
          description: 'Async callback for message submission.',
        },
      ]}
      previous={{ title: 'AI Integration', href: '/docs/features/ai-integration' }}
      next={{ title: 'AI Forms', href: '/docs/library/ai-forms' }}
    >
      <DocsSection title="Architecture">
        <DocsCard title="COMPONENT STRUCTURE">
          <p className="mb-4 text-sm text-muted-foreground">
            The chat interface is modular, composed of smaller parts for easy customization:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground font-mono">
            <li><strong>AiChatSidebar</strong>: Manages conversation list and new chat actions.</li>
            <li><strong>AiChatMessageList</strong>: Renders the scrollable message history.</li>
            <li><strong>AiChatInput</strong>: Handles text input, file attachments, and submission.</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}