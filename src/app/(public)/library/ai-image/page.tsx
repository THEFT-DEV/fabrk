/**
 * AI Image Generation Template - Terminal console style
 * Generate images from text prompts using DALL-E
 */
'use client';

import { useState } from 'react';
import { Download, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Demo generated image (placeholder)
const demoImage = {
  url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=512&h=512&fit=crop',
  prompt:
    'A futuristic terminal interface with glowing green text on a dark background, cyberpunk style',
  revisedPrompt:
    'A futuristic computer terminal interface featuring bright glowing green text and code on a dark black background, in a cyberpunk aesthetic with neon accents and a retro-futuristic feel',
};

const sizes = ['1024x1024', '1792x1024', '1024x1792'] as const;
const styles = ['vivid', 'natural'] as const;
const qualities = ['standard', 'hd'] as const;

const templateCode = `"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

export default function AIImagePage() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState<"1024x1024" | "1792x1024" | "1024x1792">("1024x1024");
  const [style, setStyle] = useState<"vivid" | "natural">("vivid");
  const [quality, setQuality] = useState<"standard" | "hd">("standard");
  const [image, setImage] = useState<{ url: string; revisedPrompt: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, size, style, quality }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setImage(data.images[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <Card>
        <CardHeader code="0xAI" title="IMAGE_GENERATOR" />
        <CardContent padding="lg">
          {/* Prompt Input */}
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="> Describe the image you want to generate..."
            rows={4}
            className="mb-4"
          />

          {/* Options */}
          <div className="mb-4 flex flex-wrap gap-4">
            <select value={size} onChange={(e) => setSize(e.target.value as any)}>
              <option value="1024x1024">1024×1024</option>
              <option value="1792x1024">1792×1024</option>
              <option value="1024x1792">1024×1792</option>
            </select>
            {/* Add style and quality selects */}
          </div>

          <Button onClick={handleGenerate} disabled={isLoading || !prompt.trim()}>
            {isLoading ? "GENERATING..." : "> GENERATE IMAGE"}
          </Button>

          {/* Generated Image */}
          {image && (
            <div className="mt-6">
              <img src={image.url} alt="Generated" className="w-full" />
              <p className="text-muted-foreground mt-2 text-xs">
                [REVISED PROMPT]: {image.revisedPrompt}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}`;

function AIImagePreview() {
  const [size, setSize] = useState<(typeof sizes)[number]>('1024x1024');
  const [style, setStyle] = useState<(typeof styles)[number]>('vivid');
  const [quality, setQuality] = useState<(typeof qualities)[number]>('standard');

  return (
    <TemplatePreviewWrapper>
      <Card>
        <CardHeader code="0xAI" title="IMAGE_GENERATOR" />
        <CardContent padding="lg">
          {/* Prompt Input */}
          <div className="mb-6">
            <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[PROMPT]:</p>
            <Textarea
              value={demoImage.prompt}
              readOnly
              rows={3}
              className={cn('text-sm', mode.radius, mode.font)}
            />
          </div>

          {/* Options */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div>
              <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[SIZE]:</p>
              <div className="flex flex-wrap gap-1">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      'border px-2 py-1 text-xs',
                      mode.radius,
                      mode.font,
                      size === s
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-muted/50'
                    )}
                  >
                    {s.replace('x', '×')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[STYLE]:</p>
              <div className="flex gap-1">
                {styles.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={cn(
                      'border px-2 py-1 text-xs uppercase',
                      mode.radius,
                      mode.font,
                      style === s
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-muted/50'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[QUALITY]:</p>
              <div className="flex gap-1">
                {qualities.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={cn(
                      'border px-2 py-1 text-xs uppercase',
                      mode.radius,
                      mode.font,
                      quality === q
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-muted/50'
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button disabled className={cn('mb-6 text-xs', mode.state.muted.opacity, mode.radius, mode.font)}>
            <Sparkles className="mr-2 size-4" />
            &gt; GENERATE IMAGE
          </Button>

          {/* Generated Image */}
          <div>
            <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[OUTPUT]:</p>
            <div className={cn('border-border relative overflow-hidden border', mode.radius)}>
              <img
                src={demoImage.url}
                alt="Generated demo"
                className="aspect-square w-full object-cover"
              />
              <div className="bg-background/80 absolute right-0 bottom-0 left-0 p-4">
                <div className="flex items-center justify-between">
                  <span className={cn('text-foreground text-xs', mode.font)}>
                    1024×1024 • DALL-E 3 • vivid
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className={cn('h-6 px-2 text-xs', mode.radius, mode.font)}
                  >
                    <Download className="mr-1 size-3" />
                    DOWNLOAD
                  </Button>
                </div>
              </div>
            </div>

            <p className={cn('text-muted-foreground mt-4 text-xs', mode.font)}>
              [REVISED PROMPT]: {demoImage.revisedPrompt}
            </p>
          </div>
        </CardContent>
      </Card>
    </TemplatePreviewWrapper>
  );
}

export default function AIImageTemplate() {
  return (
    <TemplateShowcasePage
      badge="AI IMAGE"
      title="AI Image Generator"
      description="Generate images from text prompts using DALL-E 3"
      templateId="ai-image"
      category={{ name: 'AI', href: '/library?category=ai' }}
      preview={<AIImagePreview />}
      code={templateCode}
      fileStructure={[
        { path: ['app/', 'api/ai/', 'image/route.ts'], label: '← DALL-E API' },
        { path: ['app/', '(tools)/', 'ai-image/page.tsx'], label: '← Copy template here' },
        { path: ['lib/', 'ai/', 'provider.ts'], label: '← Provider config' },
      ]}
      features={[
        'DALL-E 3 image generation',
        'Multiple size options (square, landscape, portrait)',
        'Vivid or natural style',
        'Standard or HD quality',
        'Revised prompt display',
        'Download generated images',
        'Optional credit integration',
        'Content policy handling',
        'Rate limit handling',
      ]}
    />
  );
}
