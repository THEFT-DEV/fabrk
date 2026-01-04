/**
 * Access Control & Usage Limits
 * Defines tier limits and usage tracking
 */

type ResourceType = 'users' | 'projects' | 'apiCalls' | 'storage';

interface User {
  subscriptionTier?: string;
  userCount?: number;
  projectCount?: number;
  apiCalls?: number;
  storageUsed?: number;
  [key: string]: string | number | boolean | Date | undefined;
}

/**
 * Tier limits for different resources
 */
const TIER_LIMITS: Record<string, Record<ResourceType, number>> = {
  free: {
    users: 1,
    projects: 3,
    apiCalls: 1000,
    storage: 100, // MB
  },
  trial: {
    users: 5,
    projects: 10,
    apiCalls: 10000,
    storage: 1000, // MB
  },
  starter: {
    users: 10,
    projects: 25,
    apiCalls: 50000,
    storage: 5000, // MB
  },
  professional: {
    users: 50,
    projects: 100,
    apiCalls: 250000,
    storage: 25000, // MB
  },
  enterprise: {
    users: -1, // Unlimited
    projects: -1, // Unlimited
    apiCalls: -1, // Unlimited
    storage: -1, // Unlimited
  },
};

/**
 * Get usage percentage for a resource
 */
export function getUsagePercentage(user: User, resource: ResourceType): number {
  const tier = user.subscriptionTier || 'trial';
  const limit = TIER_LIMITS[tier]?.[resource] || TIER_LIMITS.trial[resource];

  // Unlimited tier
  if (limit === -1) {
    return 0;
  }

  const used = getUserUsage(user, resource);
  return Math.min(Math.round((used / limit) * 100), 100);
}

/**
 * Format usage display string (e.g., "3 / 10" or "500 MB / 1 GB")
 */
export function formatUsageDisplay(user: User, resource: ResourceType): string {
  const tier = user.subscriptionTier || 'trial';
  const limit = TIER_LIMITS[tier]?.[resource] || TIER_LIMITS.trial[resource];

  // Unlimited tier
  if (limit === -1) {
    const used = getUserUsage(user, resource);
    return resource === 'storage' ? `${formatStorage(used)} / Unlimited` : `${used} / Unlimited`;
  }

  const used = getUserUsage(user, resource);

  // Format storage specially
  if (resource === 'storage') {
    return `${formatStorage(used)} / ${formatStorage(limit)}`;
  }

  // Format API calls with K suffix
  if (resource === 'apiCalls') {
    return `${formatNumber(used)} / ${formatNumber(limit)}`;
  }

  return `${used} / ${limit}`;
}

/**
 * Get current usage for a resource
 */
function getUserUsage(user: User, resource: ResourceType): number {
  switch (resource) {
    case 'users':
      return user.userCount || 0;
    case 'projects':
      return user.projectCount || 0;
    case 'apiCalls':
      return user.apiCalls || 0;
    case 'storage':
      return user.storageUsed || 0;
    default:
      return 0;
  }
}

/**
 * Format storage size (MB to GB if needed)
 */
function formatStorage(mb: number): string {
  if (mb >= 1000) {
    return `${(mb / 1000).toFixed(1)} GB`;
  }
  return `${mb} MB`;
}

/**
 * Format large numbers with K suffix
 */
function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}
