// ✅ GOOD - DO THIS

import { Button } from '@/components/ui/button';

export function GoodButton() {
  return <Button onClick={handleClick}>&gt; SAVE CHANGES</Button>;
}

// Correct because:
// 1. Uses Button component from design system
// 2. Colors come from design tokens (via component styles)
// 3. Border radius handled by component (uses mode.radius)
// 4. Accessibility built into Button component
// 5. Uses UPPERCASE for terminal aesthetic
// 6. Uses > prefix for terminal button style
// 7. Will adapt to theme changes automatically
