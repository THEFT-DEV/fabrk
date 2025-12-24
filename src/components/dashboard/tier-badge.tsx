'use client';

type TierName = 'free' | 'trial' | 'starter' | 'professional' | 'enterprise';
import { Badge } from '@/components/ui/badge';
import { TIER_BADGES, TIER_NAMES } from '@/lib/features/tier-config';
import { Crown, Sparkles, Star, Zap } from 'lucide-react';

interface TierBadgeProps {
  tier: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const tierIcons = {
  free: Zap,
  trial: Zap,
  starter: Star,
  professional: Crown,
  enterprise: Sparkles,
};

export function TierBadge({ tier, showIcon = true, size = 'md' }: TierBadgeProps) {
  const tierName = (tier || 'trial') as TierName;
  const displayName = TIER_NAMES[tierName] || 'Trial';
  const variant = TIER_BADGES[tierName] || TIER_BADGES.trial;
  const Icon = tierIcons[tierName] || Zap;

  const _sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2 py-1',
    lg: 'text-sm px-4 py-2',
  };

  return (
    <Badge
      variant={variant as 'default' | 'secondary' | 'accent' | 'neutral'}
      size={size}
      className="flex items-center gap-2 font-medium"
    >
      {showIcon && (
        <Icon className={size === 'sm' ? 'size-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
      )}
      {displayName.toUpperCase()}
    </Badge>
  );
}
