/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 */

import { Progress } from '@/components/ui/progress';
import { calculatePasswordStrength } from '@/lib/auth/validation';
// Tokens import removed - using Tailwind classes directly

export function PasswordStrength({ password }: { password: string }) {
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  const _getStrengthColor = () => {
    if (strength.score >= 75) return 'text-success';
    if (strength.score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-1">
      <Progress value={strength.score} size="sm" barWidth={15} />
      <div className="text-muted-foreground text-xs">Password strength: {strength.label}</div>
    </div>
  );
}
