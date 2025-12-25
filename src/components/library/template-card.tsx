/**
 * TemplateCard - Reusable card for template listings
 * Uses design system Card components properly
 */
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

export function TemplateCard({ id, name, description, href, icon: Icon }: TemplateCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card interactive size="full" className="h-full transition-all">
        <CardHeader
          title={id.toUpperCase().replace(/-/g, '_')}
          icon={<Icon className="text-muted-foreground size-4" />}
        />
        <CardContent padding="md" className="flex flex-col">
          {/* Title */}
          <h3
            className={cn(
              mode.font,
              'group-hover:text-primary mb-2 text-sm font-semibold transition-colors'
            )}
          >
            {name}
          </h3>

          {/* Description */}
          <p className={cn(mode.font, 'text-muted-foreground mb-4 text-xs leading-relaxed')}>
            {description}
          </p>

          {/* Action Footer - right aligned */}
          <div className="border-border mt-auto flex justify-end border-t pt-3">
            <span
              className={cn(
                mode.font,
                'text-primary group-hover:text-primary/80 text-xs transition-colors'
              )}
            >
              &gt; VIEW
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
