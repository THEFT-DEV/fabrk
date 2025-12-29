/**
 * AI QR Code Generator Template
 * Generate and customize QR codes with terminal aesthetic.
 */
'use client';

import { AiQrGenerator } from '@/components/library/ai-qr-generator';
import {
  TemplateShowcasePage,
  TemplatePreviewWrapper,
  BrowserChrome,
} from '@/components/library';

const templateCode = `"use client";

import { AiQrGenerator } from '@/components/library/ai-qr-generator';

export default function Page() {
  return (
    <div className="p-6">
      <AiQrGenerator defaultValue="https://your-site.com" />
    </div>
  );
}`;

function QRGeneratorPreview() {
  return (
    <TemplatePreviewWrapper minHeight="500px">
      <BrowserChrome title="QR Generator">
        <div className="p-6">
          <AiQrGenerator defaultValue="https://fabrk.dev" />
        </div>
      </BrowserChrome>
    </TemplatePreviewWrapper>
  );
}

export default function QRGeneratorTemplate() {
  return (
    <TemplateShowcasePage
      badge="QR GENERATOR"
      title="QR Code Generator"
      description="Generate customizable QR codes with download and copy functionality."
      templateId="ai-qr-generator"
      category={{ name: 'AI', href: '/library?category=ai' }}
      preview={<QRGeneratorPreview />}
      code={templateCode}
      documentationHref="/docs/library/ai-qr-generator"
      fileStructure={[
        { path: ['components/', 'library/', 'ai-qr-generator/', 'index.tsx'], label: 'Main Component' },
      ]}
      features={[
        'URL or text input for QR content',
        'Customizable size (128px, 256px, 512px)',
        'Error correction levels (L, M, Q, H)',
        'SVG output with download button',
        'Copy to clipboard functionality',
        'Terminal aesthetic styling',
        'Real-time preview updates',
        'No external API required',
      ]}
    />
  );
}
