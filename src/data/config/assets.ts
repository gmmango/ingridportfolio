/**
 * Asset configuration
 * Central place to manage CDN URLs and path templates
 */

export const ASSET_CONFIG = {
  // Base CDN URL - change this one line to migrate all assets
  BASE_URL: 'https://assets.ingridsayuri.com',

  // Path templates
  PATHS: {
    PROJECTS: 'projects',
    HERO_VIDEOS: 'hero',
  },
} as const;

/**
 * Build full asset URL from folder and filename
 * @param folder - Relative folder path (e.g., "projects/victoria_regia")
 * @param filename - File name (e.g., "thumbnail.jpg")
 * @returns Full CDN URL
 */
export function getAssetUrl(folder: string, filename: string): string {
  if (!folder || !filename) {
    throw new Error('Both folder and filename are required');
  }

  // Handle external URLs (don't process URLs that already start with http/https)
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }

  return `${ASSET_CONFIG.BASE_URL}/${folder}/${filename}`;
}

/**
 * Build project asset URL
 * Convenience wrapper for project assets
 */
export function getProjectAssetUrl(projectFolder: string, filename: string): string {
  return getAssetUrl(`${ASSET_CONFIG.PATHS.PROJECTS}/${projectFolder}`, filename);
}
