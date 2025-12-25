/**
 * CategoryShowcasePage - Reusable wrapper for category listing pages
 * Eliminates boilerplate across category pages (dashboards, authentication, admin-panels, etc.)
 *
 * Uses StyledTabs for consistent bordered tab styling when preview/code mode is enabled.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  TemplatePageHeader,
  FeatureList,
  FeatureItem,
} from '@/components/ui/card';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export interface CategoryTemplate {
  id: string;
  name: string;
  description: string;
  href: string;
  icon?: React.ElementType;
  features: string[];
  badge?: string;
}

export interface CategoryShowcasePageProps {
  /** Category ID for data lookup */
  categoryId: string;
  /** Badge text for header */
  badge: string;
  /** Page title */
  title: string;
  /** Page description */
  description: string;
  /** Category icon */
  icon?: React.ElementType;
  /** Templates in this category */
  templates: CategoryTemplate[];
  /** Features for the features card */
  features: string[];
  /** Show preview/code tabs (default: false - just show grid) */
  showPreviewCode?: boolean;
  /** Code for preview/code mode */
  previewCode?: string;
}

/** Template grid for displaying category templates */
function TemplateGrid({ templates }: { templates: CategoryTemplate[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {templates.map((template) => (
        <Link key={template.id} href={template.href}>
          <div className={cn('group border-border bg-card border transition-colors', mode.state.hover.card)}>
            {/* Card Header */}
            <div className="border-border flex items-center justify-between border-b px-4 py-2">
              <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                [TEMPLATE]: {template.id.toUpperCase()}
              </span>
              {template.icon && <template.icon className="text-muted-foreground size-4" />}
            </div>

            {/* Card Content */}
            <div className="p-4">
              {/* Status & Badge */}
              <div className={cn(mode.font, 'mb-4 flex items-center justify-between text-xs')}>
                <div>
                  <span className="text-muted-foreground">STATUS: </span>
                  <span className="text-success">READY</span>
                </div>
                {template.badge && (
                  <div className="border-primary/50 text-primary border px-2 py-0.5">
                    {template.badge.toUpperCase()}
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className={cn(mode.font, 'mb-2 text-sm font-semibold')}>{template.name}</h3>

              {/* Description */}
              <div className={cn(mode.font, 'mb-4 text-xs')}>
                <span className="text-muted-foreground">DESC: </span>
                <span className="text-foreground">{template.description}</span>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className={cn(mode.font, 'text-muted-foreground mb-2 text-xs')}>
                  [FEATURES]:
                </div>
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature) => (
                    <span
                      key={feature}
                      className={cn(mode.font, 'border-border border px-2 py-0.5 text-xs')}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    mode.font,
                    'text-primary group-hover:text-primary/80 text-xs transition-colors'
                  )}
                >
                  &gt; VIEW TEMPLATE
                </span>
                <span
                  className={cn(
                    mode.font,
                    'text-muted-foreground text-xs transition-transform group-hover:translate-x-1'
                  )}
                >
                  →
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function CategoryShowcasePage({
  categoryId,
  badge,
  title,
  description,
  icon: Icon,
  templates,
  features,
  showPreviewCode = false,
  previewCode,
}: CategoryShowcasePageProps) {
  const [activeTab, setActiveTab] = useState('preview');

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
          <span className={cn('text-foreground', mode.font)}>{title}</span>
        </nav>

        {/* Header */}
        <TemplatePageHeader badge={badge} title={title} description={description} />

        {/* Category Info */}
        <div className="flex items-center gap-4">
          {Icon && <Icon className="text-primary h-6 w-6" />}
          <span className={cn(mode.font, 'border-border border px-2 py-0.5 text-xs')}>
            COUNT: {templates.length}
          </span>
        </div>

        {/* Content - either with tabs or just grid */}
        {showPreviewCode && previewCode ? (
          <StyledTabs
            code="0x00"
            title="CATEGORY_OVERVIEW"
            tabs={[
              { id: 'preview', label: '[PREVIEW]' },
              { id: 'code', label: '[CODE]' },
            ]}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full min-w-0 overflow-hidden"
          >
            <StyledTabsContent value="preview" className="w-full max-w-full">
              <Card className="overflow-hidden">
                <CardHeader code="0x01" title="TEMPLATES" />
                <CardContent padding="lg">
                  <TemplateGrid templates={templates} />
                </CardContent>
              </Card>
            </StyledTabsContent>

            <StyledTabsContent value="code" className="w-full max-w-full">
              <Card className="overflow-hidden">
                <CardHeader code="0x01" title="USAGE_GUIDE" />
                <div className="w-full max-w-full overflow-x-auto p-4">
                  <CodeBlock code={previewCode} language="tsx" maxHeight="600px" />
                </div>
              </Card>
            </StyledTabsContent>
          </StyledTabs>
        ) : (
          <TemplateGrid templates={templates} />
        )}

        {/* Features Card */}
        <Card>
          <CardHeader code="0x02" title={`${categoryId.toUpperCase()}_FEATURES`} />
          <CardContent padding="md">
            <FeatureList>
              {features.map((feature, idx) => (
                <FeatureItem key={idx}>{feature}</FeatureItem>
              ))}
            </FeatureList>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
