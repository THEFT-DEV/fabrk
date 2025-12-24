/**
 * Advanced Search System
 * Fuzzy search with Fuse.js for better template discovery
 */

import Fuse, { type IFuseOptions } from 'fuse.js';
import type { Template } from '@/app/(marketing)/library/library-data';

// Fuse.js configuration for fuzzy search
const fuseOptions: IFuseOptions<Template> = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'features', weight: 0.2 },
    { name: 'category', weight: 0.1 },
  ],
  threshold: 0.3, // 0 = exact match, 1 = match anything
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
  useExtendedSearch: true,
};

/**
 * Create Fuse instance for template search
 */
export function createTemplateSearch(templates: Template[]) {
  return new Fuse(templates, fuseOptions);
}

/**
 * Search templates with fuzzy matching
 */
export function searchTemplates(templates: Template[], query: string): Template[] {
  if (!query || query.trim().length < 2) {
    return templates;
  }

  const fuse = createTemplateSearch(templates);
  const results = fuse.search(query);

  // Return just the items, sorted by relevance score
  return results.map((result) => result.item);
}

/**
 * Filter templates by multiple criteria
 */
export interface TemplateFilters {
  category?: string;
  complexity?: 'Beginner' | 'Intermediate' | 'Advanced';
  hasFeature?: string;
  searchQuery?: string;
  setupTime?: 'quick' | 'medium' | 'long';
  hasDependencies?: boolean;
}

export function filterTemplates(templates: Template[], filters: TemplateFilters): Template[] {
  let filtered = templates;

  // Apply search query with fuzzy matching
  if (filters.searchQuery) {
    filtered = searchTemplates(filtered, filters.searchQuery);
  }

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter((t) => t.category === filters.category);
  }

  // Filter by complexity (if metadata exists)
  if (filters.complexity) {
    filtered = filtered.filter((t) => t.complexity === filters.complexity);
  }

  // Filter by feature
  if (filters.hasFeature) {
    const featureQuery = filters.hasFeature.toLowerCase();
    filtered = filtered.filter((t) =>
      t.features.some((f) => f.toLowerCase().includes(featureQuery))
    );
  }

  // Filter by setup time
  if (filters.setupTime) {
    filtered = filtered.filter((t) => {
      if (!t.setupTime) return false;
      const minutes = parseInt(t.setupTime);
      if (filters.setupTime === 'quick') return minutes < 10;
      if (filters.setupTime === 'medium') return minutes >= 10 && minutes <= 30;
      if (filters.setupTime === 'long') return minutes > 30;
      return false;
    });
  }

  // Filter by dependencies
  if (filters.hasDependencies) {
    filtered = filtered.filter((t) => t.dependencies && t.dependencies.length > 0);
  }

  return filtered;
}

/**
 * Get related templates based on shared features and category
 */
export function getRelatedTemplates(
  template: Template,
  allTemplates: Template[],
  limit: number = 3
): Template[] {
  // Score templates by similarity
  const scored = allTemplates
    .filter((t) => t.id !== template.id) // Exclude current template
    .map((t) => {
      let score = 0;

      // Same category = +3 points
      if (t.category === template.category) {
        score += 3;
      }

      // Shared features (each = +1 point)
      const sharedFeatures = t.features.filter((f) =>
        template.features.some((tf) => tf.toLowerCase() === f.toLowerCase())
      );
      score += sharedFeatures.length;

      // Same badge = +1 point
      if (t.badge && t.badge === template.badge) {
        score += 1;
      }

      return { template: t, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((s) => s.template);
}
