"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ProjectCard from "@/components/ProjectCard";
import VideoEmbedded, { HeroVideo } from "@/components/VideoEmbedded";
import { getProjectsByCategory, getHeroVideos } from "@/utils/projects";
import { getAllCategories } from "@/data/config/categories";

// Dynamic import for 3D Skills Section (client-side only, code-split for performance)
const SkillsSection = dynamic(
  () => import("@/components/skills/SkillsSection").then((mod) => ({ default: mod.SkillsSection })),
  {
    loading: () => (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <div className="text-5xl animate-bounce">☁️</div>
      </div>
    ),
    ssr: false,
  }
);

// Project categories for filtering with colors matching skills section aesthetic
const categories = [
  { id: "all", label: "All", color: "#f5a4c7" },           // Pink (matches skills "All")
  { id: "character", label: "Character", color: "#f5c4a4" }, // Peach
  { id: "motion-graphics", label: "Motion Graphics", color: "#a4d4f5" }, // Sky blue
  { id: "architectural", label: "Architectural", color: "#a4f5c4" }, // Mint green
  { id: "vfx", label: "VFX", color: "#c4a4f5" },           // Lavender
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  const [refsReady, setRefsReady] = useState(0);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Get data using utility functions
  const heroVideos = getHeroVideos();
  const filteredProjects = getProjectsByCategory(selectedCategory);

  // Set initial hero video
  useEffect(() => {
    const activeHeroVideo = heroVideos.find(video => video.active);
    if (activeHeroVideo && !currentVideoId) {
      setCurrentVideoId(activeHeroVideo.id);
    }
  }, [heroVideos, currentVideoId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [refsReady]);

  const handleVideoChange = (videoId: string) => {
    setCurrentVideoId(videoId);
  };

  return (
    <main className="min-h-screen bg-[var(--background-primary)] text-[var(--color-primary)]">
      <Header activeSection={activeSection} />

      {/* Hero Section */}
      <section
        id="home"
        ref={(el) => {
          if (el && !sectionRefs.current[0]) {
            sectionRefs.current[0] = el;
            setRefsReady((prev) => prev + 1);
          }
        }}
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[var(--background-primary)]"
      >
        {/* Decorative background shapes - subtle glow on dark */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#f5a4c7]/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-80 h-80 bg-[#a4d4f5]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-[#c4a4f5]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-[#a4f5c4]/8 rounded-full blur-3xl" />
        </div>

        {/* Background with Video - dark overlay */}
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background-primary)]/60 via-[var(--background-primary)]/80 to-[var(--background-primary)] z-10"></div>
          <VideoEmbedded
            videos={heroVideos}
            currentVideoId={currentVideoId}
            className="w-full h-full"
            onVideoChange={handleVideoChange}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-5xl">✨</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[var(--color-primary)] text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            3D Artist & Animator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[var(--color-secondary)] text-base md:text-lg font-light leading-relaxed max-w-2xl"
          >
            Crafting immersive digital experiences through character animation, visual effects, and cinematic storytelling
          </motion.p>
        </div>

        {/* Scroll Indicator - soft pill style matching nav */}
        <motion.a
          href="#portfolio"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: "transparent",
            borderColor: "#a4d4f5",
            boxShadow: "0 4px 14px rgba(164, 212, 245, 0.2)",
          }}
        >
          <span className="text-[var(--color-secondary)] text-sm font-semibold">Explore</span>
          <svg
            className="w-4 h-4 text-[#a4d4f5] animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.a>
      </section>

      {/* Projects Section */}
      <section
        id="portfolio"
        ref={(el) => {
          if (el && !sectionRefs.current[1]) {
            sectionRefs.current[1] = el;
            setRefsReady((prev) => prev + 1);
          }
        }}
        className="w-full pt-24 pb-20 px-6 lg:px-20 bg-[var(--background-secondary)] scroll-mt-0"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-3">Projects</h2>
            <p className="text-[var(--color-secondary)] text-lg max-w-md mx-auto leading-relaxed mb-6">
              A selection of my favorite creative work
            </p>

            {/* Category Filter - styled to match Skills CategoryPills */}
            <div className="flex flex-wrap gap-2 justify-center pb-4">
              {categories.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border-2"
                    style={{
                      backgroundColor: isActive ? category.color : "transparent",
                      borderColor: category.color,
                      color: isActive ? "#0f0f0f" : "var(--color-secondary)",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                      boxShadow: isActive ? `0 4px 14px ${category.color}40` : "none",
                    }}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="masonry">
            {filteredProjects.map((project) => (
              <div key={project.id} className="masonry-item">
                <ProjectCard
                  project={project}
                  layout="grid"
                />
              </div>
            ))}
          </div>

          {/* No projects message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[var(--color-secondary)] text-base">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Skills Section - Interactive 3D */}
      <SkillsSection
        id="skills"
        ref={(el) => {
          if (el && !sectionRefs.current[2]) {
            sectionRefs.current[2] = el;
            setRefsReady((prev) => prev + 1);
          }
        }}
        className="scroll-mt-0"
      />

      {/* Contact Section */}
      <section
        id="contact"
        ref={(el) => {
          if (el && !sectionRefs.current[3]) {
            sectionRefs.current[3] = el;
            setRefsReady((prev) => prev + 1);
          }
        }}
        className="bg-[var(--background-primary)] py-24 px-6 lg:px-20 scroll-mt-0"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] leading-tight mb-6"
            >
              Let&apos;s Work Together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[var(--color-secondary)] mb-8 text-base md:text-lg font-light leading-relaxed"
            >
              I&apos;m currently seeking opportunities in animation studios, post-production houses, or freelance projects.
              Whether you need character animation, motion graphics, or VFX work, I&apos;d love to hear about your project.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="mailto:your.email@example.com">
                <button className="btn-gradient text-white font-medium text-sm px-8 py-4 rounded-full hover:opacity-90 transition-all soft-shadow">
                  Get in Touch
                </button>
              </Link>
              <a
                href="#portfolio"
                className="text-[var(--color-secondary)] hover:text-[var(--accent-color)] font-medium text-sm transition-colors"
              >
                View My Work
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  );
}