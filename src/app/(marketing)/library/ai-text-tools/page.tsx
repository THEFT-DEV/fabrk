/**
 * AI Text Tools Template - Terminal console style
 * Text transformation: summarize, rewrite, translate, expand, grammar fix
 */
'use client';

import { useState } from 'react';
import {
  FileText,
  Languages,
  Sparkles,
  Expand,
  CheckCircle,
  Wand2,
  Copy,
  Check,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COMPONENT_COUNT_STRING } from '@/data/landing/stats';
import { Textarea } from '@/components/ui/textarea';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

type Operation = 'summarize' | 'rewrite' | 'translate' | 'expand' | 'grammar' | 'tone';

const operations: { id: Operation; label: string; icon: typeof FileText; description: string }[] = [
  {
    id: 'summarize',
    label: 'SUMMARIZE',
    icon: FileText,
    description: 'Condense text to key points',
  },
  { id: 'rewrite', label: 'REWRITE', icon: Wand2, description: 'Improve clarity and flow' },
  {
    id: 'translate',
    label: 'TRANSLATE',
    icon: Languages,
    description: 'Convert to another language',
  },
  { id: 'expand', label: 'EXPAND', icon: Expand, description: 'Add more detail and examples' },
  { id: 'grammar', label: 'FIX GRAMMAR', icon: CheckCircle, description: 'Correct errors' },
  { id: 'tone', label: 'CHANGE TONE', icon: Sparkles, description: 'Adjust writing style' },
];

const demoInput = `Fabrk is a Next.js SaaS boilerplate with a terminal-inspired design. It includes authentication, payments, and ${COMPONENT_COUNT_STRING} UI components. The design system uses monospace fonts and sharp corners throughout.`;

// Demo outputs use dynamic count for accuracy
const demoOutputs: Record<Operation, string> = {
  summarize: `Fabrk is a terminal-styled Next.js SaaS boilerplate featuring auth, payments, and ${COMPONENT_COUNT_STRING} components with monospace fonts and sharp corners.`,
  rewrite: `Fabrk offers a Next.js boilerplate for SaaS applications, distinguished by its terminal-inspired aesthetic. The platform comes equipped with authentication and payment systems, alongside ${COMPONENT_COUNT_STRING} UI components. Its design language emphasizes monospace typography and angular corners.`,
  translate: `Fabrk es un boilerplate de SaaS para Next.js con un diseño inspirado en terminales. Incluye autenticación, pagos y ${COMPONENT_COUNT_STRING} componentes de interfaz de usuario. El sistema de diseño utiliza fuentes monoespaciadas y esquinas afiladas en todo momento.`,
  expand: `Fabrk is a comprehensive Next.js SaaS boilerplate that draws inspiration from classic terminal interfaces. The platform provides a robust foundation for building software-as-a-service applications.

Key features include:
- **Authentication**: Complete auth system with OAuth, magic links, and 2FA
- **Payments**: Multi-provider support (Stripe, Polar, LemonSqueezy)
- **${COMPONENT_COUNT_STRING} UI Components**: Pre-built, production-ready components

The design system creates a cohesive terminal aesthetic through monospace fonts (JetBrains Mono) and sharp, angular corners (rounded-none), giving applications a distinctive developer-focused look.`,
  grammar: `Fabrk is a Next.js SaaS boilerplate with a terminal-inspired design. It includes authentication, payments, and ${COMPONENT_COUNT_STRING} UI components. The design system uses monospace fonts and sharp corners throughout.`,
  tone: `Hey there! Fabrk is this awesome Next.js boilerplate that gives your SaaS that cool terminal vibe. You get auth, payments, and a ton of UI components (${COMPONENT_COUNT_STRING}!) right out of the box. Plus, the whole thing rocks monospace fonts and those crisp, sharp corners everywhere.`,
};

const templateCode = `"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

type Operation = "summarize" | "rewrite" | "translate" | "expand" | "grammar" | "tone";

export default function AITextToolsPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [operation, setOperation] = useState<Operation>("summarize");
  const [isLoading, setIsLoading] = useState(false);

  const handleTransform = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input,
          operation,
          options: {
            targetLanguage: "Spanish", // For translate
            tone: "professional",       // For tone
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setOutput(data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <Card>
        <CardHeader code="0xAI" title="TEXT_TOOLS" />
        <CardContent padding="lg">
          {/* Operation Selector */}
          <div className="mb-6 flex flex-wrap gap-2">
            {["summarize", "rewrite", "translate", "expand", "grammar", "tone"].map((op) => (
              <Button
                key={op}
                variant={operation === op ? "default" : "outline"}
                size="sm"
                onClick={() => setOperation(op as Operation)}
              >
                {op.toUpperCase()}
              </Button>
            ))}
          </div>

          {/* Input */}
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="> Paste your text here..."
            rows={6}
            className="mb-4"
          />

          <Button onClick={handleTransform} disabled={isLoading || !input.trim()}>
            {isLoading ? "PROCESSING..." : "> TRANSFORM"}
          </Button>

          {/* Output */}
          {output && (
            <div className="mt-6">
              <p className="text-muted-foreground mb-2 text-xs">[OUTPUT]:</p>
              <div className="border-border bg-muted/30 border p-4">
                {output}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}`;

function AITextToolsPreview() {
  const [operation, setOperation] = useState<Operation>('summarize');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(demoOutputs[operation]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TemplatePreviewWrapper>
      <Card>
        <CardHeader code="0xAI" title="TEXT_TOOLS" />
        <CardContent padding="lg">
          {/* Operation Selector */}
          <div className="mb-6">
            <p className={cn('text-muted-foreground mb-3 text-xs', mode.font)}>
              [SELECT OPERATION]:
            </p>
            <div className="flex flex-wrap gap-2">
              {operations.map((op) => {
                const Icon = op.icon;
                return (
                  <Button
                    key={op.id}
                    variant={operation === op.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setOperation(op.id)}
                    className={cn('text-xs', mode.radius, mode.font)}
                  >
                    <Icon className="mr-2 size-3" />
                    {op.label}
                  </Button>
                );
              })}
            </div>
            <p className={cn('text-muted-foreground mt-2 text-xs', mode.font)}>
              {operations.find((o) => o.id === operation)?.description}
            </p>
          </div>

          {/* Input */}
          <div className="mb-6">
            <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[INPUT]:</p>
            <Textarea
              value={demoInput}
              readOnly
              rows={4}
              className={cn('text-sm', mode.radius, mode.font)}
            />
          </div>

          {/* Transform Button */}
          <Button disabled className={cn('mb-6 text-xs', mode.state.muted.opacity, mode.radius, mode.font)}>
            <Sparkles className="mr-2 size-4" />
            &gt; TRANSFORM
          </Button>

          {/* Output */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className={cn('text-muted-foreground text-xs', mode.font)}>[OUTPUT]:</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className={cn('h-6 px-2 text-xs', mode.radius, mode.font)}
              >
                {copied ? (
                  <>
                    <Check className="mr-1 size-3" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 size-3" />
                    COPY
                  </>
                )}
              </Button>
            </div>
            <div
              className={cn(
                'border-border bg-muted/30 border p-4 text-sm whitespace-pre-wrap',
                mode.radius,
                mode.font
              )}
            >
              {demoOutputs[operation]}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex gap-6">
            <div>
              <p className={cn('text-muted-foreground text-xs', mode.font)}>[INPUT LENGTH]:</p>
              <p className={cn('text-primary text-sm font-semibold', mode.font)}>
                {demoInput.length} chars
              </p>
            </div>
            <div>
              <p className={cn('text-muted-foreground text-xs', mode.font)}>[OUTPUT LENGTH]:</p>
              <p className={cn('text-primary text-sm font-semibold', mode.font)}>
                {demoOutputs[operation].length} chars
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TemplatePreviewWrapper>
  );
}

export default function AITextToolsTemplate() {
  return (
    <TemplateShowcasePage
      badge="AI TEXT TOOLS"
      title="AI Text Tools"
      description={`Fabrk is a terminal-styled Next.js SaaS boilerplate featuring auth, payments, and ${COMPONENT_COUNT_STRING} components with monospace fonts and sharp corners.`}
      templateId="ai-text-tools"
      category={{ name: 'AI', href: '/library?category=ai' }}
      preview={<AITextToolsPreview />}
      code={templateCode}
      fileStructure={[
        { path: ['app/', 'api/ai/', 'text/route.ts'], label: '← Text API endpoint' },
        { path: ['app/', '(tools)/', 'ai-text/page.tsx'], label: '← Copy template here' },
        { path: ['lib/', 'ai/', 'provider.ts'], label: '← Multi-provider config' },
      ]}
      features={[
        'Summarize long text to key points',
        'Rewrite for clarity and flow',
        'Translate to 50+ languages',
        'Expand with more detail',
        'Fix grammar and spelling',
        'Change tone (professional, casual, formal)',
        'Multi-provider support (OpenAI, Google, Ollama)',
        'Character count comparison',
        'Copy output to clipboard',
        'Optional credit integration',
      ]}
    />
  );
}
