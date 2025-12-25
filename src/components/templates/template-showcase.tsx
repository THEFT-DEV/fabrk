/**
 * FABRK COMPONENT
 * Template Showcase - Standard wrapper for individual template pages
 * Provides consistent header, features card, and code copy functionality
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Code, ExternalLink } from 'lucide-react';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import {
  PageBadge,
  Card,
  CardHeader,
  CardContent,
  FeatureList,
  FeatureItem,
  InfoNote,
} from '@/components/ui/card';
interface TemplateShowcaseProps {
  /** Template code identifier (e.g., "BLOG", "ANALYTICS") */
  code: string;
  /** Display name of the template */
  title: string;
  /** Short description of what the template provides */
  description: string;
  /** Optional badge (e.g., "New", "Popular", "Essential") */
  badge?: string;
  /** List of features this template includes */
  features: string[];
  /** The actual template content to display */
  children: React.ReactNode;
  /** Optional source code string for copy functionality */
  sourceCode?: string;
  /** Optional link to source file on GitHub */
  sourceUrl?: string;
  /** Additional note to display at the bottom of features card */
  note?: string;
}

export function TemplateShowcase({
  code,
  title,
  description,
  badge,
  features,
  children,
  sourceCode,
  sourceUrl,
  note,
}: TemplateShowcaseProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    if (!sourceCode) return;

    try {
      await navigator.clipboard.writeText(sourceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div>
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <PageBadge>{code}</PageBadge>
            {badge && (
              <Badge variant="default" className={cn('text-xs', mode.font, mode.radius)}>
                {badge.toUpperCase()}
              </Badge>
            )}
          </div>
          <h1 className={cn('text-4xl font-semibold tracking-tight', mode.font)}>{title}</h1>
          <p className={cn('text-muted-foreground text-sm', mode.font)}>{description}</p>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2">
            {sourceCode && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCode}
                className={cn('text-xs', mode.font, mode.radius)}
                aria-label={copied ? 'Code copied' : 'Copy template code'}
              >
                {copied ? (
                  <>
                    <Check className="mr-1 h-3 w-3" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" />
                    &gt; COPY CODE
                  </>
                )}
              </Button>
            )}
            {sourceUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className={cn('text-xs', mode.font, mode.radius)}
              >
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Code className="mr-1 h-3 w-3" />
                  &gt; VIEW SOURCE
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Template Content */}
        {children}

        {/* Features Card */}
        <Card size="auto">
          <CardHeader code="0x00" title="features.md" />
          <CardContent>
            <div className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              [TEMPLATE FEATURES]:
            </div>
            <div className="grid gap-x-8 gap-y-1.5 md:grid-cols-2 lg:grid-cols-3">
              <FeatureList>
                {features.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeatureList>
            </div>
            {note && <InfoNote>{note}</InfoNote>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
