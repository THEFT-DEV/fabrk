/**
 * ✅ FABRK COMPONENT
 * Template Features Display
 * Production-ready ✓
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function TemplateFeatures() {
  const features = [
    'WCAG 2.1 AA compliant',
    '3-column layout (sidebar, content, TOC)',
    'Semantic HTML structure',
    'Keyboard navigation support',
    'Code blocks with copy functionality',
    'Focus indicators on all interactive elements',
    'Proper heading hierarchy (h1→h2)',
    'ARIA labels for screen readers',
  ];

  return (
    <div className="container mx-auto max-w-7xl px-6 py-8">
      <Card tone="neutral">
        <CardHeader code="0x00" title="FEATURES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
            [TEMPLATE FEATURES]:
          </div>
          <div className={cn(mode.font, 'space-y-2 text-xs')}>
            {features.map((feature, idx) => (
              <div key={idx}>
                <span className="text-success">&gt;</span> {feature}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
