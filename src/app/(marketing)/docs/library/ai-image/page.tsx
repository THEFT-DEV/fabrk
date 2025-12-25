'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Image, Palette, History, Wand2 } from 'lucide-react';

export default function AiImageDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.04]"
      category="AI Tools"
      title="AI Image Generation"
      description="Text-to-image generation interface with style presets."
      overview="Enable users to generate high-quality images from text descriptions. Includes support for style presets (photorealistic, anime, 3d render), aspect ratio selection, and a personal gallery of generated history."
      features={[
        {
          icon: Wand2,
          title: 'Text to Image',
          description: 'Generate images from natural language prompts.',
        },
        {
          icon: Palette,
          title: 'Style Presets',
          description: 'One-click style modifiers for consistent results.',
        },
        {
          icon: Image,
          title: 'Aspect Ratios',
          description: 'Support for square, landscape, and portrait formats.',
        },
        {
          icon: History,
          title: 'History Gallery',
          description: 'Automatically save and browse previously generated images.',
        },
      ]}
      setup={[
        {
          title: 'Import Components',
          description: 'Add the image generator to your page.',
          code: `import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Basic Usage',
          description: 'Copy the template from the library page.',
          code: `// See /library/ai-image for full template
const handleGenerate = async (prompt: string, options: ImageOptions) => {
  const response = await fetch('/api/ai/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, ...options }),
  });
  return await response.json();
};

// ImageOptions type
interface ImageOptions {
  size: '1024x1024' | '1792x1024' | '1024x1792';
  style: 'vivid' | 'natural';
  quality: 'standard' | 'hd';
}`,
          language: 'tsx',
        },
      ]}
      configuration={[
        {
          name: 'size',
          type: '"1024x1024" | "1792x1024" | "1024x1792"',
          default: '"1024x1024"',
          description: 'Output image dimensions.',
        },
        {
          name: 'style',
          type: '"vivid" | "natural"',
          default: '"vivid"',
          description: 'DALL-E style preset.',
        },
        {
          name: 'quality',
          type: '"standard" | "hd"',
          default: '"standard"',
          description: 'Image quality level.',
        },
      ]}
      previous={{ title: 'AI Text Tools', href: '/docs/library/ai-text-tools' }}
      next={{ title: 'AI Voice', href: '/docs/library/ai-voice' }}
    >
      <DocsSection title="Image Options">
        <DocsCard title="GENERATION SETTINGS">
          <ul className="space-y-2 text-sm text-muted-foreground font-mono">
            <li><strong>SIZE</strong>: Square (1024x1024), Landscape (1792x1024), Portrait (1024x1792)</li>
            <li><strong>STYLE</strong>: Vivid (hyper-real) or Natural (more realistic)</li>
            <li><strong>QUALITY</strong>: Standard or HD (enhanced detail)</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}