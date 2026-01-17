/**
 * Project utility functions
 * Helper functions for working with project data
 */

import { Project, ProjectData, HeroVideo } from '@/types/project.types';
import { getProjectAssetUrl, getAssetUrl, ASSET_CONFIG } from '@/data/config/assets';
import projectsDataRaw from '@/data/projects.json';

const projectsData = projectsDataRaw as ProjectData;

/**
 * Hydrate a project with full asset URLs
 * Converts relative filenames to full CDN URLs
 */
export function hydrateProject(project: Project): Project {
  const assetFolder = project.assetFolder;

  // Hydrate media based on type
  let hydratedMedia;
  if (project.media.type === 'image') {
    hydratedMedia = {
      type: 'image' as const,
      gallery: project.media.gallery.map((filename) =>
        getProjectAssetUrl(assetFolder, filename)
      ),
    };
  } else if (project.media.type === 'video') {
    hydratedMedia = {
      type: 'video' as const,
      src: project.media.src.startsWith('http')
        ? project.media.src
        : getProjectAssetUrl(assetFolder, project.media.src),
      poster: project.media.poster
        ? getProjectAssetUrl(assetFolder, project.media.poster)
        : undefined,
    };
  } else {
    // Mixed media
    hydratedMedia = {
      type: 'mixed' as const,
      items: project.media.items.map((item) => {
        if (item.type === 'video') {
          return {
            type: 'video' as const,
            src: item.src.startsWith('http')
              ? item.src
              : getProjectAssetUrl(assetFolder, item.src),
            poster: item.poster
              ? getProjectAssetUrl(assetFolder, item.poster)
              : undefined,
          };
        } else {
          return {
            type: 'image' as const,
            src: getProjectAssetUrl(assetFolder, item.src),
          };
        }
      }),
    };
  }

  return {
    ...project,
    thumbnail: getProjectAssetUrl(assetFolder, project.thumbnail),
    hero: project.hero
      ? getProjectAssetUrl(assetFolder, project.hero)
      : getProjectAssetUrl(assetFolder, project.thumbnail),
    media: hydratedMedia,
  };
}

/**
 * Get all projects with hydrated URLs
 */
export function getAllProjects(): Project[] {
  return projectsData.projects.map(hydrateProject);
}

/**
 * Get featured projects, sorted by featuredOrder
 */
export function getFeaturedProjects(): Project[] {
  return getAllProjects()
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999));
}

/**
 * Get project by ID
 */
export function getProjectById(id: string): Project | undefined {
  const project = projectsData.projects.find((p) => p.id === id);
  return project ? hydrateProject(project) : undefined;
}

/**
 * Filter projects by category
 */
export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') {
    return getAllProjects();
  }
  if (category === 'featured') {
    return getFeaturedProjects();
  }
  return getAllProjects().filter((p) => p.category === category);
}

/**
 * Hydrate hero video with full URL
 */
export function hydrateHeroVideo(video: HeroVideo): HeroVideo {
  return {
    ...video,
    src: video.src.startsWith('http')
      ? video.src // External URL
      : getAssetUrl(ASSET_CONFIG.PATHS.HERO_VIDEOS, video.src),
    poster: getAssetUrl(ASSET_CONFIG.PATHS.HERO_VIDEOS, video.poster),
  };
}

/**
 * Get all hero videos with hydrated URLs
 */
export function getHeroVideos(): HeroVideo[] {
  return projectsData.heroVideos.map(hydrateHeroVideo);
}

/**
 * Get active hero video
 */
export function getActiveHeroVideo(): HeroVideo | undefined {
  const videos = getHeroVideos();
  return videos.find((v) => v.active) || videos[0];
}
