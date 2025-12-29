/**
 * Error Pages Template - Terminal console style
 * Complete collection: Error, 401, 403, 404, 429, 500, 502, 503, 504
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  FeatureList,
  FeatureItem,
  TemplatePageHeader,
} from '@/components/ui/card';
import { StyledTabs } from '@/components/ui/styled-tabs';
import { RelatedTemplates } from '@/components/library/related-templates';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Extracted data and components
import { errorTypes, fileStructures, features } from './data/error-configs';
import { ErrorTabContent, FileStructureLine } from './components';

export default function ErrorPagesTemplate() {
  const [activeError, setActiveError] = useState<string>('404');
  const [activePreviewTab, setActivePreviewTab] = useState<string>('preview');

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs">
          <Link
            href="/library"
            className={cn(
              'transition-colors',
              'text-muted-foreground hover:text-foreground',
              mode.font
            )}
          >
            Library
          </Link>
          <ChevronRight className="text-muted-foreground h-3 w-3" />
          <Link
            href="/library/patterns"
            className={cn(
              'transition-colors',
              'text-muted-foreground hover:text-foreground',
              mode.font
            )}
          >
            Patterns
          </Link>
          <ChevronRight className="text-muted-foreground h-3 w-3" />
          <span className={cn('text-foreground', mode.font)}>Error Pages</span>
        </nav>

        {/* Header */}
        <TemplatePageHeader
          badge="ERROR PAGES"
          title="Error Pages"
          description="Complete error page templates: Generic Error, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Rate Limit, 500 Server Error, 502 Bad Gateway, 503 Maintenance, 504 Timeout"
        />

        {/* Error Type Selector */}
        <StyledTabs
          code="0x00"
          title="ERROR_TEMPLATES"
          tabs={[
            { id: 'error', label: '[ERROR]' },
            { id: '401', label: '[401]' },
            { id: '403', label: '[403]' },
            { id: '404', label: '[404]' },
            { id: '429', label: '[429]' },
            { id: '500', label: '[500]' },
            { id: '502', label: '[502]' },
            { id: '503', label: '[503]' },
            { id: '504', label: '[504]' },
          ]}
          value={activeError}
          onValueChange={setActiveError}
          className="w-full min-w-0 overflow-hidden"
        >
          {errorTypes.map((errorType) => (
            <ErrorTabContent
              key={errorType}
              errorType={errorType}
              activePreviewTab={activePreviewTab}
              onPreviewTabChange={setActivePreviewTab}
            />
          ))}
        </StyledTabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x03" title="FILE_STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className={mode.color.text.muted}>[FILES]:</div>
              <div className="space-y-1 pl-4">
                <FileStructureLine
                  path={fileStructures[activeError].path}
                  label={fileStructures[activeError].label}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x04" title="FEATURES" />
          <CardContent padding="md">
            <FeatureList>
              {features.map((feature, idx) => (
                <FeatureItem key={idx}>{feature}</FeatureItem>
              ))}
            </FeatureList>
          </CardContent>
        </Card>

        {/* Related Templates */}
        <RelatedTemplates currentTemplateId="error-pages" limit={3} />
      </div>
    </div>
  );
}
