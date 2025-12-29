/**
 * FABRK COMPONENT
 * Documentation Layout Template - Terminal console style
 * Production-ready
 */

'use client';

import { useState } from 'react';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { DocsSidebar } from './components/docs-sidebar';
import { DocsContent } from './components/docs-content';
import { TableOfContents } from './components/table-of-contents';
import { docContent } from './components/docs-data';

const templateCode = `"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const docNavItems = [
  { id: "quick-start", label: "Quick Start", section: "Getting Started" },
  { id: "installation", label: "Installation", section: "Getting Started" },
  { id: "components", label: "Components", section: "Guides" },
  { id: "api-reference", label: "API Reference", section: "Reference" },
];

export default function DocumentationLayout() {
  const [activeDoc, setActiveDoc] = useState("quick-start");

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border">
        <Card className="border-0 border-r">
          <CardHeader code="0x00" title="DOCUMENTATION" />
          <div className="p-4">
            {docNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveDoc(item.id)}
                className={cn(
                  mode.font,
                  "w-full text-left px-4 py-2 text-xs",
                  activeDoc === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Card>
          <CardHeader code="0x01" title={activeDoc.toUpperCase()} />
          <CardContent padding="lg">
            {/* Documentation content */}
          </CardContent>
        </Card>
      </main>

      {/* Table of Contents */}
      <aside className="w-64 border-l border-border">
        <Card className="border-0 border-l">
          <CardHeader code="0x02" title="ON THIS PAGE" />
          <div className="p-4">
            {/* TOC links */}
          </div>
        </Card>
      </aside>
    </div>
  );
}`;

function DocsLayoutPreview() {
  const [activeDoc, setActiveDoc] = useState('quick-start');
  const currentDoc = docContent[activeDoc as keyof typeof docContent];

  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="flex">
        {/* Sidebar */}
        <DocsSidebar activeDoc={activeDoc} onDocChange={setActiveDoc} />

        {/* Main Content */}
        <DocsContent currentDoc={currentDoc} />

        {/* Table of Contents (Right Sidebar) */}
        <TableOfContents />
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function DocumentationLayoutTemplate() {
  return (
    <TemplateShowcasePage
      badge="DOCUMENTATION LAYOUT"
      title="Documentation Layout"
      description="Three-column documentation layout with sidebar navigation and table of contents"
      templateId="documentation"
      category={{ name: 'Marketing', href: '/library/marketing' }}
      preview={<DocsLayoutPreview />}
      code={templateCode}
      fileStructure="app/docs/layout.tsx"
      features={[
        'Three-column layout (sidebar, content, TOC)',
        'Hierarchical navigation',
        'Active link highlighting',
        'Table of contents with auto-scroll',
        'Markdown-friendly content area',
        'Responsive collapsible sidebars',
      ]}
    />
  );
}
