/**
 * ✅ FABRK COMPONENT
 * Documentation Content Area
 * Production-ready ✓
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PageBadge, Card, CardHeader, CardContent } from '@/components/ui/card';
import { ChevronRight, Copy, CheckCircle2, ExternalLink } from 'lucide-react';
import { parseContent } from './content-parser';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface DocsContentProps {
  currentDoc: {
    title: string;
    description: string;
    lastUpdated: string;
    content: string;
  };
}

export function DocsContent({ currentDoc }: DocsContentProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <main className="flex-1 p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Template Label */}
        <PageBadge>DOCUMENTATION</PageBadge>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className={cn(mode.font, 'flex items-center gap-2 text-xs')}>
          <span className="text-muted-foreground">Docs</span>
          <ChevronRight className="text-muted-foreground h-3 w-3" aria-hidden="true" />
          <span className="text-muted-foreground">Getting Started</span>
          <ChevronRight className="text-muted-foreground h-3 w-3" aria-hidden="true" />
          <span className="text-foreground" aria-current="page">
            {currentDoc.title}
          </span>
        </nav>

        {/* Page Header */}
        <header>
          <h1
            className={cn(mode.font, 'text-foreground mb-4 text-4xl font-semibold tracking-tight')}
          >
            {currentDoc.title}
          </h1>
          <p className={cn(mode.font, 'text-muted-foreground mb-4 text-sm')}>
            {currentDoc.description}
          </p>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
              <time dateTime={currentDoc.lastUpdated}>Last updated: {currentDoc.lastUpdated}</time>
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className={cn(mode.radius, mode.font, 'text-xs')}
              aria-label="Edit this page on GitHub"
            >
              <ExternalLink className="mr-2 h-3 w-3" aria-hidden="true" />
              &gt; EDIT ON GITHUB
            </Button>
          </div>
        </header>

        <Separator />

        {/* Content */}
        <article className="max-w-none space-y-4">
          {parseContent(currentDoc.content).map((section, idx) => {
            if (section.type === 'heading') {
              return (
                <h2
                  key={idx}
                  className={cn(
                    mode.font,
                    'text-foreground mt-8 mb-4 scroll-mt-20 text-sm font-semibold'
                  )}
                  id={section.content.toLowerCase().replace(/\s+/g, '-')}
                >
                  [{section.content.toUpperCase()}]:
                </h2>
              );
            }

            if (section.type === 'code') {
              return (
                <div
                  key={idx}
                  className="not-prose my-6"
                  role="region"
                  aria-label={`Code example in ${section.language || 'code'}`}
                >
                  <Card tone="neutral">
                    <CardHeader
                      code="0x00"
                      title={(section.language || 'code').toUpperCase()}
                      icon={
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyCode(section.content, `code-${idx}`)}
                          className={cn(mode.radius, mode.font, 'h-7 text-xs')}
                          aria-label={
                            copiedCode === `code-${idx}` ? 'Code copied' : 'Copy code to clipboard'
                          }
                        >
                          {copiedCode === `code-${idx}` ? (
                            <>
                              <CheckCircle2 className="mr-1 h-3 w-3" aria-hidden="true" />
                              COPIED
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-3 w-3" aria-hidden="true" />
                              &gt; COPY
                            </>
                          )}
                        </Button>
                      }
                    />
                    <CardContent padding="md">
                      <pre className="m-0 overflow-auto text-xs leading-relaxed" tabIndex={0}>
                        <code className={cn(mode.font, 'text-foreground')}>{section.content}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              );
            }

            return (
              <p
                key={idx}
                className={cn(mode.font, 'text-muted-foreground text-xs leading-relaxed')}
              >
                {section.content}
              </p>
            );
          })}
        </article>

        {/* Page Navigation */}
        <Separator className="my-12" />

        <nav aria-label="Page navigation" className="flex items-center justify-between">
          <Button
            variant="outline"
            className={cn(mode.radius, mode.font, 'text-xs')}
            aria-label="Go to previous page: Installation"
          >
            &lt; PREVIOUS: INSTALLATION
          </Button>
          <Button
            variant="default"
            className={cn(mode.radius, mode.font, 'text-xs')}
            aria-label="Go to next page: Environment Setup"
          >
            NEXT: ENVIRONMENT SETUP &gt;
          </Button>
        </nav>

        {/* Help Section */}
        <Card tone="neutral" className="mt-12">
          <CardHeader code="0x00" title="NEED HELP" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>[NEED HELP]:</div>
            <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
              Can't find what you're looking for?
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                className={cn(mode.radius, mode.font, 'w-full justify-start text-xs')}
                aria-label="Ask question on GitHub Discussions"
              >
                <ExternalLink className="mr-2 h-3 w-3" aria-hidden="true" />
                &gt; ASK ON GITHUB DISCUSSIONS
              </Button>
              <Button
                variant="outline"
                className={cn(mode.radius, mode.font, 'w-full justify-start text-xs')}
                aria-label="Report an issue on GitHub"
              >
                <ExternalLink className="mr-2 h-3 w-3" aria-hidden="true" />
                &gt; REPORT AN ISSUE
              </Button>
              <Button
                variant="outline"
                className={cn(mode.radius, mode.font, 'w-full justify-start text-xs')}
                aria-label="Contact support team"
              >
                <ExternalLink className="mr-2 h-3 w-3" aria-hidden="true" />
                &gt; CONTACT SUPPORT
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
