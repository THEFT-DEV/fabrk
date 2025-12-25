'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { QrCode, Download, Copy, Settings, Palette, Terminal } from 'lucide-react';

export default function AiQrGeneratorDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.06]"
      category="AI Tools"
      title="QR Code Generator"
      description="Generate customizable QR codes with download and copy functionality."
      overview="The QR Code Generator component provides a complete interface for creating QR codes from URLs or text. Users can customize the size and error correction level, then download as SVG or copy to clipboard. Built with the Terminal aesthetic."
      features={[
        {
          icon: QrCode,
          title: 'Instant Generation',
          description: 'Real-time QR code preview as you type.',
        },
        {
          icon: Settings,
          title: 'Customizable Size',
          description: 'Choose from 128px, 256px, or 512px output sizes.',
        },
        {
          icon: Palette,
          title: 'Error Correction',
          description: 'Four levels: Low (7%), Medium (15%), Quartile (25%), High (30%).',
        },
        {
          icon: Download,
          title: 'SVG Download',
          description: 'Download high-quality vector SVG files.',
        },
        {
          icon: Copy,
          title: 'Copy to Clipboard',
          description: 'One-click copy for quick sharing.',
        },
        {
          icon: Terminal,
          title: 'Terminal Aesthetic',
          description: 'Strict rounded-none styling with monospace typography.',
        },
      ]}
      setup={[
        {
          title: 'Install Dependencies',
          description: 'Install the qrcode.react library.',
          code: `npm install qrcode.react`,
          language: 'bash',
        },
        {
          title: 'Import Component',
          description: 'Import the QR generator into your page.',
          code: `import { AiQrGenerator } from '@/components/library/ai-qr-generator';`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Basic Implementation',
          description: 'Render the QR generator with a default value.',
          code: `export default function Page() {
  return (
    <AiQrGenerator defaultValue="https://your-site.com" />
  );
}`,
          language: 'tsx',
        },
      ]}
      configuration={[
        {
          name: 'defaultValue',
          type: 'string',
          default: '"https://fabrk.dev"',
          description: 'Initial URL or text to encode.',
        },
        {
          name: 'className',
          type: 'string',
          default: 'undefined',
          description: 'Additional CSS classes for the container.',
        },
      ]}
      previous={{ title: 'AI Text Tools', href: '/docs/library/ai-text-tools' }}
      next={{ title: 'PDF Chat', href: '/docs/library/ai-pdf-chat' }}
    >
      <DocsSection title="Error Correction Levels">
        <DocsCard title="CHOOSING ERROR CORRECTION">
          <p className="mb-4 text-sm text-muted-foreground">
            Error correction determines how much damage a QR code can sustain while remaining scannable:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground font-mono">
            <li><strong>Level L (7%)</strong>: Best for clean digital displays.</li>
            <li><strong>Level M (15%)</strong>: Good balance for most uses.</li>
            <li><strong>Level Q (25%)</strong>: Better for printed materials.</li>
            <li><strong>Level H (30%)</strong>: Maximum durability, allows logo overlays.</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
