/**
 * MDX Reference
 * Quick reference guide for MDX components in blog posts
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HelpCircle, Copy, Check } from 'lucide-react';

const examples = {
  callout: {
    title: 'Callout',
    description: 'Highlight important information',
    code: `<Callout type="info" title="Pro Tip">
  This is an informational callout. Use "warning", "error", or "success" for different styles.
</Callout>`,
  },
  terminal: {
    title: 'Terminal',
    description: 'Display terminal commands',
    code: `<Terminal
  command="npm install next-mdx-remote"
  output="added 42 packages in 2s"
/>`,
  },
  steps: {
    title: 'Steps',
    description: 'Step-by-step instructions',
    code: `<Steps>
  <Step number={1} title="Install Dependencies">
    Run npm install to get started.
  </Step>
  <Step number={2} title="Configure Settings">
    Update your .env file with the required values.
  </Step>
  <Step number={3} title="Start Development">
    Run npm run dev to start the development server.
  </Step>
</Steps>`,
  },
  youtube: {
    title: 'YouTube',
    description: 'Embed YouTube videos',
    code: `<YouTube id="dQw4w9WgXcQ" title="Tutorial Video" />`,
  },
  cards: {
    title: 'Card Grid',
    description: 'Display features or options',
    code: `<CardGrid>
  <Card title="Feature One">
    Description of the first feature.
  </Card>
  <Card title="Feature Two">
    Description of the second feature.
  </Card>
  <Card title="Feature Three">
    Description of the third feature.
  </Card>
</CardGrid>`,
  },
  table: {
    title: 'Comparison Table',
    description: 'Compare features or options',
    code: `<ComparisonTable
  headers={["Feature", "Free", "Pro"]}
  rows={[
    ["Users", "10", "Unlimited"],
    ["Storage", "1GB", "100GB"],
    ["Support", "Email", "24/7 Phone"]
  ]}
/>`,
  },
  keyboard: {
    title: 'Keyboard Shortcuts',
    description: 'Display keyboard shortcuts',
    code: `Press <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> to save.`,
  },
  codeblock: {
    title: 'Code Block',
    description: 'Syntax-highlighted code',
    code: `<CodeBlock language="typescript" filename="src/lib/example.ts">
{\`function greet(name: string) {
  return \\\`Hello, \\\${name}!\\\`;
}\`}
</CodeBlock>`,
  },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0">
      {copied ? <Check className="text-success h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}

export function MdxReference() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          <span className="font-mono text-xs">MDX REFERENCE</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono">[ MDX COMPONENTS ]</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground font-mono text-sm">
            Use these components in your blog content to create rich, interactive posts.
          </p>

          <Tabs defaultValue="callout" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="callout" className="font-mono text-xs">
                Callout
              </TabsTrigger>
              <TabsTrigger value="terminal" className="font-mono text-xs">
                Terminal
              </TabsTrigger>
              <TabsTrigger value="steps" className="font-mono text-xs">
                Steps
              </TabsTrigger>
              <TabsTrigger value="cards" className="font-mono text-xs">
                Cards
              </TabsTrigger>
            </TabsList>

            {Object.entries(examples)
              .slice(0, 4)
              .map(([key, example]) => (
                <TabsContent key={key} value={key} className="mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm">{example.description}</p>
                      <CopyButton text={example.code} />
                    </div>
                    <pre className="border-border bg-muted overflow-x-auto border p-4 font-mono text-xs">
                      {example.code}
                    </pre>
                  </div>
                </TabsContent>
              ))}
          </Tabs>

          <Tabs defaultValue="youtube" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="youtube" className="font-mono text-xs">
                YouTube
              </TabsTrigger>
              <TabsTrigger value="table" className="font-mono text-xs">
                Table
              </TabsTrigger>
              <TabsTrigger value="keyboard" className="font-mono text-xs">
                Keyboard
              </TabsTrigger>
              <TabsTrigger value="codeblock" className="font-mono text-xs">
                Code
              </TabsTrigger>
            </TabsList>

            {Object.entries(examples)
              .slice(4)
              .map(([key, example]) => (
                <TabsContent key={key} value={key} className="mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm">{example.description}</p>
                      <CopyButton text={example.code} />
                    </div>
                    <pre className="border-border bg-muted overflow-x-auto border p-4 font-mono text-xs">
                      {example.code}
                    </pre>
                  </div>
                </TabsContent>
              ))}
          </Tabs>

          {/* Basic Markdown */}
          <div className="border-border border-t pt-4">
            <h3 className="mb-4 font-mono text-sm font-semibold">BASIC MARKDOWN</h3>
            <div className="text-muted-foreground grid gap-2 font-mono text-xs">
              <div className="border-border flex justify-between border-b pb-1">
                <span>**bold**</span>
                <span className="font-semibold">bold</span>
              </div>
              <div className="border-border flex justify-between border-b pb-1">
                <span>*italic*</span>
                <span className="italic">italic</span>
              </div>
              <div className="border-border flex justify-between border-b pb-1">
                <span>[link](url)</span>
                <span className="text-primary underline">link</span>
              </div>
              <div className="border-border flex justify-between border-b pb-1">
                <span>`code`</span>
                <span className="bg-muted px-1">code</span>
              </div>
              <div className="border-border flex justify-between border-b pb-1">
                <span>## Heading</span>
                <span>Creates a heading</span>
              </div>
              <div className="flex justify-between">
                <span>- list item</span>
                <span>Creates a list</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
