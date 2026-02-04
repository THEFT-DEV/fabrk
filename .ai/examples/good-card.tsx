// ✅ GOOD - DO THIS

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function GoodFeatureCard({ title, description }) {
  return (
    <Card className={cn('border border-border', mode.radius)}>
      <CardHeader code="0x01" title={title.toUpperCase()} />
      <CardContent padding="md">
        <p className={cn(mode.typography.body.m, mode.color.text.muted)}>{description}</p>
        <Button variant="link" className="mt-4 p-0">
          &gt; LEARN MORE
        </Button>
      </CardContent>
    </Card>
  );
}

// Correct because:
// 1. Uses Card component with proper subcomponents
// 2. Colors come from design tokens (via component styles and mode object)
// 3. Spacing uses scale values (mt-4, padding="md")
// 4. Uses mode.radius for theme-aware border radius
// 5. Uses mode.typography for consistent typography
// 6. Uses mode.color for semantic colors
// 7. Uses Button component for the action
// 8. Uses UPPERCASE for terminal aesthetic
// 9. Will adapt to theme changes automatically
// 10. Uses cn() for className composition
