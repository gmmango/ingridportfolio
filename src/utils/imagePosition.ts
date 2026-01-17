/**
 * Image position utilities
 * Convert position strings to Tailwind CSS classes
 */

import { ImagePosition } from '@/types/project.types';

/**
 * Get Tailwind CSS class for object-position
 * @param position - Position identifier
 * @returns Tailwind class (e.g., "object-top", "object-center")
 */
export function getObjectPositionClass(position?: ImagePosition): string {
  if (!position || position === 'center') {
    return 'object-center';
  }

  const positionMap: Record<ImagePosition, string> = {
    center: 'object-center',
    top: 'object-top',
    bottom: 'object-bottom',
    left: 'object-left',
    right: 'object-right',
    'left-top': 'object-left-top',
    'right-top': 'object-right-top',
    'left-bottom': 'object-left-bottom',
    'right-bottom': 'object-right-bottom',
  };

  return positionMap[position] || 'object-center';
}
