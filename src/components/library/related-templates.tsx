/**
 * Related Templates Component
 * Shows similar templates based on category and features
 * Uses the shared TemplateCard component for consistent styling
 */
'use client';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader } from '@/components/ui/card';
import { templates } from '@/app/(marketing)/library/library-data';
import { getRelatedTemplates } from '@/lib/search';
import { TemplateCard } from './template-card';

export interface RelatedTemplatesProps {
  currentTemplateId: string;
  limit?: number;
}

export function RelatedTemplates({ currentTemplateId, limit = 3 }: RelatedTemplatesProps) {
  // Find current template
  const currentTemplate = templates.find((t) => t.id === currentTemplateId);

  if (!currentTemplate) {
    return null;
  }

  // Get related templates using search algorithm
  const relatedTemplates = getRelatedTemplates(currentTemplate, templates, limit);

  if (relatedTemplates.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader code="0xFF" title="RELATED TEMPLATES" />
      <div className="p-4">
        <p className={cn(mode.font, mode.typography.caption, mode.color.text.muted, 'mb-4')}>
          [RECOMMENDED]: Templates similar to {currentTemplate.name}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relatedTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              name={template.name}
              description={template.description}
              href={template.href}
              icon={template.icon}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
