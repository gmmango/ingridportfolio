"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Project } from "@/types/project.types";
import { getCategoryLabel } from "@/data/config/categories";
import ProtectedMedia from "@/components/ProtectedMedia";

interface Props {
  project: Project;
  projectIndex?: number;
  totalProjects?: number;
}

export default function ProjectDetailClient({
  project,
  projectIndex = 1,
  totalProjects = 12
}: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Mobile viewport height fix
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  const { media } = project;

  // Collect all images for the gallery
  const getAllImages = (): string[] => {
    if (media.type === "image") {
      return media.gallery;
    } else if (media.type === "mixed") {
      return media.items
        .filter((item) => item.type === "image")
        .map((item) => item.src);
    }
    return [];
  };

  // Collect all videos
  const getAllVideos = (): { src: string; poster?: string }[] => {
    if (media.type === "video") {
      return [{ src: media.src, poster: media.poster }];
    } else if (media.type === "mixed") {
      return media.items
        .filter((item) => item.type === "video")
        .map((item) => ({ src: item.src, poster: item.poster }));
    }
    return [];
  };

  const images = getAllImages();
  const videos = getAllVideos();
  const hasVideo = videos.length > 0;
  const featuredImage = project.hero || images[0] || project.thumbnail;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-[var(--editorial-bg)] text-[var(--editorial-text)]">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="group flex items-center gap-3 text-[var(--editorial-text-muted)] hover:text-[var(--editorial-text)] transition-colors"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm tracking-wide uppercase">Back</span>
          </Link>

          <span className="text-sm text-[var(--editorial-text-muted)] tracking-wider font-light">
            {String(projectIndex).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
          </span>
        </div>
      </header>

      {/* Hero Section - Split Layout */}
      <section
        className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
      >
        {/* Ambient glow effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-1/4 right-1/4 w-[50%] h-[60%] opacity-20 blur-[100px]"
            style={{
              background: `radial-gradient(ellipse at center, var(--editorial-accent) 0%, transparent 70%)`
            }}
          />
        </div>

        {/* Left Side - Typography */}
        <div className="relative flex flex-col justify-end p-6 md:p-12 lg:p-16 pb-12 lg:pb-24 order-2 lg:order-1 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Glass pill for category */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block px-4 py-1.5 mb-6 text-[var(--editorial-accent)] text-xs uppercase tracking-[0.3em] font-medium rounded-full border border-[var(--editorial-accent)]/30 bg-[var(--editorial-accent)]/5 backdrop-blur-sm"
            >
              {getCategoryLabel(project.category)}
            </motion.span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.04em] leading-[0.9] mb-8">
              {project.title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>

            <p className="text-[var(--editorial-text-muted)] text-lg md:text-xl max-w-md leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>

        {/* Right Side - Featured Media */}
        <div className="relative h-[60vh] lg:h-auto order-1 lg:order-2 overflow-hidden">
          {/* Image extends beyond its container to the left for seamless blending */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute inset-0 lg:-left-32"
          >
            <ProtectedMedia className="absolute inset-0">
              <Image
                src={featuredImage}
                alt={project.title}
                fill
                className="object-cover cursor-pointer"
                style={{ objectPosition: project.heroPosition || 'center' }}
                priority
                onClick={() => openLightbox(0)}
              />
            </ProtectedMedia>

            {/* Gradient mask for seamless left edge blend - desktop */}
            <div
              className="absolute inset-0 pointer-events-none hidden lg:block"
              style={{
                background: `linear-gradient(to right,
                  var(--editorial-bg) 0%,
                  rgba(15,15,15,0.7) 20%,
                  rgba(15,15,15,0.3) 40%,
                  transparent 60%
                )`
              }}
            />

            {/* Mobile bottom blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--editorial-bg)] via-[var(--editorial-bg)]/50 via-30% to-transparent lg:hidden pointer-events-none" />

            {/* Top fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--editorial-bg)]/40 via-transparent to-transparent pointer-events-none" />

            {/* Bottom fade - desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--editorial-bg)]/60 to-transparent pointer-events-none hidden lg:block" />

            {/* Glass overlay effect */}
            <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/[0.02] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Project Info Section - Editorial Grid */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-[var(--editorial-border)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
          >
            {/* Left Column - Labels */}
            <div className="space-y-12">
              {/* Year */}
              {project.year && (
                <div className="grid grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] gap-4 items-baseline">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--editorial-text-muted)]">Year</span>
                  <span className="text-2xl md:text-3xl font-light">{project.year}</span>
                </div>
              )}

              {/* Duration */}
              {project.duration && (
                <div className="grid grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] gap-4 items-baseline">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--editorial-text-muted)]">Duration</span>
                  <span className="text-2xl md:text-3xl font-light">{project.duration}</span>
                </div>
              )}

              {/* Category */}
              <div className="grid grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] gap-4 items-baseline">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--editorial-text-muted)]">Category</span>
                <span className="text-2xl md:text-3xl font-light">{getCategoryLabel(project.category)}</span>
              </div>
            </div>

            {/* Right Column - Tools & Links */}
            <div className="space-y-12">
              {/* Tools */}
              {project.tools.length > 0 && (
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--editorial-text-muted)] mb-4 block">Tools</span>
                  <div className="flex flex-wrap gap-3">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 border border-[var(--editorial-border)] text-sm tracking-wide"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* External Links */}
              {project.externalLinks && project.externalLinks.length > 0 && (
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--editorial-text-muted)] mb-4 block">Links</span>
                  <div className="flex flex-wrap gap-6">
                    {project.externalLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-[var(--editorial-accent)] hover:text-[var(--editorial-accent-hover)] transition-colors"
                      >
                        <span className="text-sm tracking-wide">
                          {link.label || link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                        </span>
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section - Masonry Grid */}
      {images.length > 0 && (
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-[var(--editorial-border)]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--editorial-text-muted)]">Gallery</span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative group cursor-pointer overflow-hidden ${
                    idx === 0 ? 'md:col-span-2' : ''
                  }`}
                  onClick={() => openLightbox(idx)}
                >
                  <ProtectedMedia>
                    <div className={`relative ${idx === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                      <Image
                        src={img}
                        alt={`${project.title} - Image ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes={idx === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </ProtectedMedia>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Section (if project has videos) */}
      {hasVideo && videos.length > 0 && (
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-[var(--editorial-border)]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--editorial-text-muted)]">Video</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-video bg-[var(--editorial-surface)]"
            >
              <ProtectedMedia className="absolute inset-0">
                <video
                  className="w-full h-full object-contain"
                  controls
                  poster={videos[0].poster}
                >
                  <source src={videos[0].src} type="video/mp4" />
                </video>
              </ProtectedMedia>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-[var(--editorial-border)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--editorial-text-muted)] tracking-wider">
            &copy; {new Date().getFullYear()} Ingrid Sayuri
          </p>
          <Link
            href="/#portfolio"
            className="text-xs text-[var(--editorial-text-muted)] hover:text-[var(--editorial-accent)] tracking-wider uppercase transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#1a1a1a]/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`${project.title} - Image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-wider font-light">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
