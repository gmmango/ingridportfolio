//ProjectCard.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/project.types';
import { getCategoryLabel } from '@/data/config/categories';
import ProtectedMedia from './ProtectedMedia';

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
  const [imageLoaded, setImageLoaded] = useState(false);


  return (
    <Link href={`/projects/${project.id}`} className="group cursor-pointer block">
      {/* Image Container */}
      <div className="overflow-hidden rounded-2xl bg-[var(--background-secondary)] border border-[var(--border-color)] soft-shadow">
        <ProtectedMedia className="relative w-full aspect-[4/3]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-1000 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-[var(--background-secondary)] animate-pulse" />
          )}
        </ProtectedMedia>
      </div>

      {/* Project Info */}
      <div className="mt-6">
        {showCategory && (
          <span className="text-[var(--accent-color)] text-xs font-bold tracking-[0.1em] uppercase">
            {getCategoryLabel(project.category)}
          </span>
        )}
        <h3 className="text-[var(--color-primary)] text-lg md:text-xl font-semibold mt-2 group-hover:text-[var(--accent-color)] transition-colors">
          {project.title}
        </h3>
        {project.shortDescription && (
          <p className="text-[var(--color-secondary)] text-sm font-light mt-2 line-clamp-2">
            {project.shortDescription}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProjectCard;