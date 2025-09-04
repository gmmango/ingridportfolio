//ProjectCard.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Transition } from 'framer-motion';

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  category: 'character' | 'architectural' | 'motion-graphics' | 'vfx' | 'showreel' | 'other';
  tags: string[];
  thumbnail: string;
  media: {
    type: 'video' | 'image' | 'gallery';
    src: string;
    alt?: string;
    poster?: string;
    gallery?: string[];
  };
  tools: string[];
  duration?: string;
  year: number;
  featured?: boolean;
  externalLinks?: {
    demo?: string;
    github?: string;
    behance?: string;
    youtube?: string;
  };
}

interface ProjectCardProps {
  project: Project;
  onOpenModal?: (project: Project) => void;
  layout?: 'grid' | 'featured';
  showCategory?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onOpenModal,
  layout = 'grid',
  showCategory = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenModal) {
      onOpenModal(project);
    }
  };

  const getCategoryColor = (category: Project['category']) => {
    const colors = {
      'character': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      'architectural': 'bg-gradient-to-r from-green-500 to-emerald-500',
      'motion-graphics': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'vfx': 'bg-gradient-to-r from-red-500 to-orange-500',
      'showreel': 'bg-gradient-to-r from-yellow-500 to-amber-500',
      'other': 'bg-gradient-to-r from-gray-500 to-slate-500'
    };
    return colors[category] || colors.other;
  };

  const getCategoryLabel = (category: Project['category']) => {
    const labels = {
      'character': 'Character Animation',
      'architectural': 'Architectural Viz',
      'motion-graphics': 'Motion Graphics',
      'vfx': 'VFX',
      'showreel': 'Showreel',
      'other': 'Other'
    };
    return labels[category] || 'Project';
  };

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    } as Transition, // Add this type assertion
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: [0.42, 0, 0.58, 1],
    } as Transition, // Add this type assertion
  },
};

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.2 }}
      className={`relative group cursor-pointer overflow-hidden rounded-xl bg-gray-900 ${
        layout === 'featured' ? 'col-span-2 row-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold rounded-full">
            FEATURED
          </span>
        </div>
      )}

      {/* Media Duration */}
      {project.duration && project.media.type === 'video' && (
        <div className="absolute top-4 right-4 z-20">
          <span className="px-2 py-1 bg-black/70 text-white text-xs font-medium rounded backdrop-blur-sm">
            {project.duration}
          </span>
        </div>
      )}

      {/* Main Image/Thumbnail */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className={`object-cover transform transition-all duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}

        {/* Media Type Indicator */}
        {project.media.type === 'video' && (
          <div className="absolute bottom-4 left-4 z-10">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full">
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/90 flex flex-col justify-end p-6 text-white"
      >
        {/* Category Badge */}
        {showCategory && (
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${getCategoryColor(project.category)}`}>
              {getCategoryLabel(project.category)}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold mb-2 line-clamp-2">
          {project.title}
        </h3>

        {/* Short Description */}
        {project.shortDescription && (
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {project.shortDescription}
          </p>
        )}

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tools.slice(0, 3).map((tool, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 backdrop-blur-sm text-xs rounded border border-white/20"
            >
              {tool}
            </span>
          ))}
          {project.tools.length > 3 && (
            <span className="px-2 py-1 bg-white/10 backdrop-blur-sm text-xs rounded border border-white/20">
              +{project.tools.length - 3} more
            </span>
          )}
        </div>

        {/* Year */}
        <div className="text-gray-400 text-sm">
          {project.year}
        </div>
      </motion.div>

      {/* Static Content (Always Visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 0 : 1,
            y: isHovered ? 10 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-1">
            {project.title}
          </h3>
          {showCategory && (
            <p className="text-gray-300 text-sm">
              {getCategoryLabel(project.category)}
            </p>
          )}
        </motion.div>
      </div>

      {/* Click indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          initial={false}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;