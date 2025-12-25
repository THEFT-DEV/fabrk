import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import Link from 'next/link';
import {
  Coins,
  FileCode,
  Cpu,
  MessageSquare,
  FileText,
  Image,
  Mic,
  Volume2,
} from 'lucide-react';

export const metadata = {
  title: 'AI Integration - Fabrk Docs',
  description:
    'Complete AI toolkit for SaaS: multi-provider support, credit-based billing, chat, text tools, image generation, voice, and more.',
};

export default function AIIntegrationPage() {
  return (
    <FeatureGuideTemplate
      code="[0xAI]"
      category="Features"
      title="AI Integration"
      description="Everything you need to build and monetize AI features."
      overview="Fabrk includes a complete AI toolkit: multi-provider support (OpenAI, Google, Ollama), credit-based billing, AI chat with streaming, text tools (summarize, translate, rewrite), image generation (DALL-E), voice (speech-to-text, text-to-speech), MCP server for AI-assisted development, and pre-built AI components. Ship AI features from day one."
      features={[
        {
          icon: MessageSquare,
          title: 'AI Chat',
          description:
            'Full chat interface with streaming responses. Message history, retry, stop generation, and terminal styling.',
        },
        {
          icon: FileText,
          title: 'Text Tools',
          description:
            'Summarize, rewrite, translate, expand, grammar check, and tone adjustment. All via simple API.',
        },
        {
          icon: Image,
          title: 'Image Generation',
          description:
            'DALL-E 3 integration for AI image generation. Multiple sizes, styles, and quality options.',
        },
        {
          icon: Mic,
          title: 'Voice',
          description:
            'Speech-to-text (Whisper) and text-to-speech (TTS). Audio transcription and voice synthesis.',
        },
        {
          icon: Cpu,
          title: 'Multi-Provider',
          description:
            'OpenAI, Google Gemini, Ollama. Switch providers without changing code. Auto-fallback built in.',
        },
        {
          icon: Coins,
          title: 'AI Credits',
          description:
            'Token-based billing system. Tier allowances, usage tracking, monthly refills. Monetize AI from day one.',
        },
      ]}
      setup={[
        {
          title: 'Configure AI Provider',
          description:
            'Set up your preferred AI provider. Fabrk auto-detects available providers and falls back gracefully.',
          code: `# .env.local

# Option 1: OpenAI (recommended for production)
OPENAI_API_KEY="sk-..."

# Option 2: Google Gemini
GOOGLE_AI_API_KEY="..."

# Option 3: Ollama (local development)
OLLAMA_ENABLED="true"
OLLAMA_BASE_URL="http://localhost:11434/v1"
OLLAMA_MODEL="llama3.1:8b"`,
          language: 'bash',
        },
        {
          title: 'Verify Configuration',
          description: 'Check which provider is active.',
          code: `import { getCurrentProviderName, isAIConfigured } from "@/lib/ai";

// Check if any provider is configured
const configured = isAIConfigured(); // true

// Get active provider name
const providerName = getCurrentProviderName(); // "OpenAI (GPT-4o-mini)"`,
          language: 'typescript',
        },
        {
          title: 'Set Up AI Credits (Optional)',
          description: 'Enable credit-based billing for AI features.',
          code: `# Run database migration
npx prisma db push

# Credits are now tracked automatically
# See /docs/features/ai-credits for full setup`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'AI Chat API',
          description: 'Send chat messages with streaming responses.',
          code: `// POST /api/ai/chat
const response = await fetch('/api/ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Explain React hooks' }
    ],
    systemPrompt: 'You are a helpful coding assistant'
  }),
});

// Read streaming response
const reader = response.body.getReader();
const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const text = decoder.decode(value);
  // Process the streaming text chunk
}`,
          language: 'typescript',
        },
        {
          title: 'Text Tools API',
          description: 'Summarize, rewrite, translate, and more.',
          code: `// POST /api/ai/text
const response = await fetch('/api/ai/text', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Your long article here...',
    operation: 'summarize', // or: rewrite, translate, expand, grammar, tone
    options: { language: 'es' } // for translate
  }),
});

const { result, operation, model } = await response.json();`,
          language: 'typescript',
        },
        {
          title: 'Image Generation API',
          description: 'Generate images with DALL-E 3.',
          code: `// POST /api/ai/image
const response = await fetch('/api/ai/image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A futuristic cityscape at sunset',
    size: '1024x1024', // or: 1792x1024, 1024x1792
    style: 'vivid', // or: natural
    quality: 'hd', // or: standard
  }),
});

const { images, model } = await response.json();
// images[0].url contains the generated image URL`,
          language: 'typescript',
        },
        {
          title: 'Voice APIs',
          description: 'Speech-to-text and text-to-speech.',
          code: `// Speech-to-Text: POST /api/ai/speech-to-text
const formData = new FormData();
formData.append('audio', audioFile);
formData.append('language', 'en'); // optional

const sttResponse = await fetch('/api/ai/speech-to-text', {
  method: 'POST',
  body: formData,
});
const { text } = await sttResponse.json();

// Text-to-Speech: POST /api/ai/text-to-speech
const ttsResponse = await fetch('/api/ai/text-to-speech', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Hello, world!',
    voice: 'nova', // alloy, echo, fable, onyx, nova, shimmer
    model: 'tts-1-hd', // or: tts-1
  }),
});
const audioBlob = await ttsResponse.blob();`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Organizations', href: '/docs/features/organizations' }}
      next={{ title: 'AI Credits', href: '/docs/features/ai-credits' }}
    >
      {/* AI Features Overview */}
      <DocsSection title="AI Features">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/library/ai-chat">
            <DocsCard title="AI CHAT" className="h-full transition-all">
              <div className="mb-2 flex items-center gap-2">
                <MessageSquare className="text-primary size-4" />
                <span className="text-xs font-medium">STREAMING</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Full chat interface with streaming responses, message history, and terminal styling.
              </p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Multi-turn conversations</li>
                <li>• Real-time streaming</li>
                <li>• Stop/retry controls</li>
                <li>• Custom system prompts</li>
              </ul>
            </DocsCard>
          </Link>

          <Link href="/library/ai-text-tools">
            <DocsCard title="TEXT TOOLS" className="h-full transition-all">
              <div className="mb-2 flex items-center gap-2">
                <FileText className="text-primary size-4" />
                <span className="text-xs font-medium">6 OPERATIONS</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Summarize, rewrite, translate, expand, grammar check, and tone adjustment.
              </p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Summarize long content</li>
                <li>• Rewrite for clarity</li>
                <li>• Translate to 50+ languages</li>
                <li>• Grammar & tone tools</li>
              </ul>
            </DocsCard>
          </Link>

          <Link href="/library/ai-image">
            <DocsCard
              title="IMAGE GENERATION"
              className="h-full transition-all"
            >
              <div className="mb-2 flex items-center gap-2">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image className="text-primary size-4" aria-hidden="true" />
                <span className="text-xs font-medium">DALL-E 3</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Generate images from text prompts with DALL-E 3 integration.
              </p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Multiple sizes (1024, 1792)</li>
                <li>• Vivid or natural style</li>
                <li>• Standard or HD quality</li>
                <li>• Content policy handling</li>
              </ul>
            </DocsCard>
          </Link>

          <Link href="/library/ai-voice">
            <DocsCard title="VOICE" className="h-full transition-all">
              <div className="mb-2 flex items-center gap-2">
                <Volume2 className="text-primary size-4" />
                <span className="text-xs font-medium">STT + TTS</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Speech-to-text (Whisper) and text-to-speech (TTS) for voice applications.
              </p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Audio transcription (Whisper)</li>
                <li>• 6 voice options</li>
                <li>• HD audio quality</li>
                <li>• Multi-language support</li>
              </ul>
            </DocsCard>
          </Link>

          <Link href="/library/ai-forms">
            <DocsCard title="AI FORMS" className="h-full transition-all">
              <div className="mb-2 flex items-center gap-2">
                <FileCode className="text-primary size-4" />
                <span className="text-xs font-medium">CODE GEN</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Generate forms from natural language. Get Zod schemas and React components
                instantly.
              </p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Natural language input</li>
                <li>• Zod schema generation</li>
                <li>• React component output</li>
                <li>• Terminal-styled forms</li>
              </ul>
            </DocsCard>
          </Link>

          <Link href="/docs/features/ai-credits">
            <DocsCard title="AI CREDITS" className="h-full transition-all">
              <div className="mb-2 flex items-center gap-2">
                <Coins className="text-primary size-4" />
                <span className="text-xs font-medium">BILLING</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Token-based billing system for AI operations. Track usage, manage balances.
              </p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Credit balance tracking</li>
                <li>• Monthly tier allowances</li>
                <li>• Usage analytics dashboard</li>
                <li>• Transaction history</li>
              </ul>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>

      {/* API Endpoints */}
      <DocsSection title="API Endpoints">
        <DocsCard title="AI API ROUTES">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Endpoint</th>
                  <th className="p-2 text-left">Method</th>
                  <th className="p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">/api/ai/chat</td>
                  <td className="p-2">POST</td>
                  <td className="p-2">Streaming chat completions</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">/api/ai/text</td>
                  <td className="p-2">POST</td>
                  <td className="p-2">Text operations (summarize, translate, etc.)</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">/api/ai/image</td>
                  <td className="p-2">POST</td>
                  <td className="p-2">Image generation (DALL-E 3)</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">/api/ai/speech-to-text</td>
                  <td className="p-2">POST</td>
                  <td className="p-2">Audio transcription (Whisper)</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">/api/ai/text-to-speech</td>
                  <td className="p-2">POST</td>
                  <td className="p-2">Voice synthesis (TTS)</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">/api/ai/generate-form</td>
                  <td className="p-2">POST</td>
                  <td className="p-2">AI form generation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Provider Comparison */}
      <DocsSection title="Provider Comparison">
        <DocsCard title="CHOOSE YOUR PROVIDER">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Provider</th>
                  <th className="p-2 text-left">Best For</th>
                  <th className="p-2 text-left">Structured Output</th>
                  <th className="p-2 text-left">Cost</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-medium">OpenAI</td>
                  <td className="p-2">Production apps</td>
                  <td className="p-2">Excellent</td>
                  <td className="p-2">~$0.15/1M tokens</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-medium">Google</td>
                  <td className="p-2">High volume</td>
                  <td className="p-2">Good</td>
                  <td className="p-2">~$0.075/1M tokens</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Ollama</td>
                  <td className="p-2">Local dev, privacy</td>
                  <td className="p-2">Limited</td>
                  <td className="p-2">Free (local)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>

        <DocsCallout variant="info" title="Provider Priority">
          Fabrk checks for providers in order: OpenAI → Google → Ollama. The first configured
          provider is used automatically. No code changes needed when switching providers.
        </DocsCallout>
      </DocsSection>

      {/* Credit Costs */}
      <DocsSection title="Default Credit Costs">
        <DocsCard title="CREDIT PRICING">
          <p className="mb-4">
            Default credit costs per AI operation. Customize in{' '}
            <code className="bg-muted px-1">src/lib/credits/pricing.ts</code>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Operation</th>
                  <th className="p-2 text-left">Credits</th>
                  <th className="p-2 text-left">Typical Use</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2">Chat Message</td>
                  <td className="p-2">1</td>
                  <td className="p-2">AI chat, Q&A</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2">Text Operation</td>
                  <td className="p-2">2</td>
                  <td className="p-2">Summarize, translate</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2">Form Generation</td>
                  <td className="p-2">10</td>
                  <td className="p-2">AI form builder</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2">Speech-to-Text</td>
                  <td className="p-2">5</td>
                  <td className="p-2">Audio transcription</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2">Text-to-Speech</td>
                  <td className="p-2">5</td>
                  <td className="p-2">Voice synthesis</td>
                </tr>
                <tr>
                  <td className="p-2">Image Generation</td>
                  <td className="p-2">50</td>
                  <td className="p-2">DALL-E images</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Pre-built Components */}
      <DocsSection title="Pre-built Components">
        <DocsCallout variant="info" title="Ready to Use">
          These components are pre-built and connected to the AI APIs. Drop them into your pages and
          they just work.
        </DocsCallout>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DocsCard title="CHAT CONTAINER">
            <p className="text-muted-foreground">
              Full chat interface with message bubbles, input field, streaming, and controls.
            </p>
          </DocsCard>

          <DocsCard title="MESSAGES">
            <p className="text-muted-foreground">
              User and assistant message components with terminal styling and timestamps.
            </p>
          </DocsCard>

          <DocsCard title="TYPING">
            <p className="text-muted-foreground">
              Animated typing indicator for streaming responses.
            </p>
          </DocsCard>

          <DocsCard title="BALANCE">
            <p className="text-muted-foreground">
              Current credit balance with color-coded progress bar. Warnings at 75%/90%.
            </p>
          </DocsCard>

          <DocsCard title="USAGE CHART">
            <p className="text-muted-foreground">
              14-day bar chart showing daily credit consumption with hover tooltips.
            </p>
          </DocsCard>

          <DocsCard title="HISTORY">
            <p className="text-muted-foreground">
              Transaction table with type icons, amounts, timestamps, and filtering.
            </p>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/library/ai-chat">
            <DocsCard title="TRY AI CHAT" className="h-full transition-all">
              <p className="text-muted-foreground">
                Interactive demo of the AI chat component with streaming responses.
              </p>
            </DocsCard>
          </Link>
          <Link href="/docs/features/ai-credits">
            <DocsCard
              title="AI CREDITS DEEP DIVE"
              className="h-full transition-all"
            >
              <p className="text-muted-foreground">
                Full documentation on credit-based billing, tier allowances, and usage tracking.
              </p>
            </DocsCard>
          </Link>
          <Link href="/docs/features/mcp-server">
            <DocsCard
              title="MCP SERVER SETUP"
              className="h-full transition-all"
            >
              <p className="text-muted-foreground">
                Connect Claude Code or Cursor for AI-assisted development with design system
                awareness.
              </p>
            </DocsCard>
          </Link>
          <Link href="/library/ai-forms">
            <DocsCard
              title="AI FORMS DEMO"
              className="h-full transition-all"
            >
              <p className="text-muted-foreground">
                Try the AI form generator. See how natural language becomes React components.
              </p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
