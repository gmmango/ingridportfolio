/**
 * Project type definitions
 * Strict TypeScript schemas for all project data
 */

import { CategoryId } from '@/data/config/categories';

// Base media types using discriminated unions
export type ProjectMedia = ImageMedia | VideoMedia | MixedMedia;

export interface ImageMedia {
  type: 'image';
  gallery: string[]; // Array of filenames (always an array, even if length 1)
}

export interface VideoMedia {
  type: 'video';
  src: string; // Video filename or external URL
  poster?: string; // Poster image filename
}

export interface MixedMedia {
  type: 'mixed';
  items: MediaItem[]; // Array of videos and images
}

export type MediaItem = VideoItem | ImageItem;

export interface VideoItem {
  type: 'video';
  src: string; // Video filename or external URL
  poster?: string; // Poster image filename
}

export interface ImageItem {
  type: 'image';
  src: string; // Image filename
}

// External link with platform identification
export interface ExternalLink {
  platform: 'youtube' | 'behance' | 'vimeo' | 'artstation' | 'other';
  url: string;
  label?: string; // Optional custom label
}

// Image positioning options
export type ImagePosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'left-top'
  | 'right-top'
  | 'left-bottom'
  | 'right-bottom';

// Main project interface
export interface Project {
  id: string; // URL-safe identifier (used in routes)
  title: string;
  shortDescription: string;
  description: string;
  category: CategoryId;
  tags: string[];

  // Asset paths (relative to project folder)
  assetFolder: string; // e.g., "victoria_regia" (without "projects/" prefix)
  thumbnail: string; // Filename for grid card
  hero?: string; // Filename for detail page banner (optional, falls back to thumbnail)

  // Image positioning (optional)
  heroPosition?: ImagePosition; // How to position the hero image (default: 'center')
  galleryPosition?: ImagePosition; // How to position gallery images (default: 'center')

  // Accent color extracted from hero image (hex format)
  accentColor?: string; // e.g., "#8B7355" - used for page theming

  media: ProjectMedia;
  tools: string[];

  year: number;
  duration?: string; // Optional, for videos

  featured?: boolean;
  featuredOrder?: number; // Explicit ordering for featured projects (1 = first)

  externalLinks?: ExternalLink[];
}

// Hero video interface
export interface HeroVideo {
  id: string;
  title: string;
  src: string; // Can be filename or external URL
  poster: string; // Poster image filename
  active: boolean;
}

// Root data structure
export interface ProjectData {
  projects: Project[];
  heroVideos: HeroVideo[];
}
