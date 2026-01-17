/**
 * Category configuration
 * Single source of truth for all project categories
 */

export interface CategoryMeta {
  id: string;
  label: string;
  description?: string;
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  character: {
    id: 'character',
    label: 'Character',
    description: 'Character design, rigging, and animation',
  },
  architectural: {
    id: 'architectural',
    label: 'Architecture',
    description: 'Architectural visualization and environments',
  },
  'motion-graphics': {
    id: 'motion-graphics',
    label: 'Motion Graphics',
    description: 'Motion design and graphics animation',
  },
  vfx: {
    id: 'vfx',
    label: 'VFX',
    description: 'Visual effects and simulations',
  },
  showreel: {
    id: 'showreel',
    label: 'Showreel',
    description: 'Portfolio showreels and compilations',
  },
  other: {
    id: 'other',
    label: 'Visual Study',
    description: 'Experimental and study works',
  },
} as const;

export type CategoryId = keyof typeof CATEGORIES;

/**
 * Get category metadata by ID
 * @param categoryId - Category identifier
 * @returns Category metadata with label and description
 */
export function getCategoryMeta(categoryId: string): CategoryMeta {
  return CATEGORIES[categoryId as CategoryId] || CATEGORIES.other;
}

/**
 * Get category label
 * @param categoryId - Category identifier
 * @returns Human-readable category label
 */
export function getCategoryLabel(categoryId: string): string {
  return getCategoryMeta(categoryId).label;
}

/**
 * Get all categories for filter UI
 */
export function getAllCategories(): CategoryMeta[] {
  return Object.values(CATEGORIES);
}
