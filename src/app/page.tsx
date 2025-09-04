"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Sidenav from "@/components/Sidenav";
import ProjectCard, { Project } from "@/components/ProjectCard";
import VideoEmbedded, { HeroVideo } from "@/components/VideoEmbedded";


// Import the data
import projectsData from "@/data/projects.json";

const sections = [
  { id: "home", title: "Home" },
  { id: "portfolio", title: "Portfolio" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

const skills = [
  "Character Animation",
  "Environment Modeling",
  "Visual Effects (VFX)",
  "Rigging & Skinning",
  "Motion Graphics",
  "Texturing & Lighting",
  "3D Rendering",
  "Asset Creation",
];

// Project categories for filtering
const categories = [
  { id: "all", label: "All Projects" },
  { id: "featured", label: "Featured" },
  { id: "character", label: "Character" },
  { id: "motion-graphics", label: "Motion Graphics" },
  { id: "architectural", label: "Architectural" },
  { id: "vfx", label: "VFX" },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Extract data from JSON
  const projects: Project[] = projectsData.projects as Project[];
  const heroVideos: HeroVideo[] = projectsData.heroVideos;

  // Filter projects based on selected category
  const filteredProjects = projects.filter(project => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "featured") return project.featured;
    return project.category === selectedCategory;
  });

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
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleVideoChange = (videoId: string) => {
    setCurrentVideoId(videoId);
  };

  return (
    <main className="min-h-screen bg-(--background-primary) text-(--color-primary) flex">
      <Sidenav activeSection={activeSection} />

      <div className="grow w-full">
        {/* Hero Section */}
        <section
          id="home"
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          className="relative h-screen w-full overflow-hidden"
        >
          <VideoEmbedded
            videos={heroVideos}
            currentVideoId={currentVideoId}
            className="absolute inset-0 h-full w-full"
            onVideoChange={handleVideoChange}
            autoPlay
            loop
            muted
            playsInline
          />
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter drop-shadow-lg text-white"
            >
              Bringing Worlds to Life
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-4 max-w-3xl text-lg md:text-xl text-gray-200 drop-shadow-md"
            >
              I&apos;m a 3D animator crafting cinematic experiences through storytelling, motion, and intricate detail.
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-8"
            >
              <button
                onClick={() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50"
              >
                View My Work
              </button>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section
          id="portfolio"
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          className="min-h-screen py-20 px-4 md:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-12 text-center"
            >
              Portfolio
            </motion.h2>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-(--accent-color) text-(--background-primary)'
                      : 'bg-(--background-secondary) text-(--color-secondary) hover:bg-(--accent-color) hover:text-(--background-primary)'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onOpenModal={handleProjectClick}
                    layout={project.featured ? 'featured' : 'grid'}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* No projects message */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-(--color-secondary) text-lg">
                  No projects found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          ref={(el) => {
            sectionRefs.current[2] = el;
          }}
          className="min-h-screen py-20 px-4 md:px-12 flex flex-col items-center justify-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-12 text-center"
          >
            My Skills
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full max-w-7xl">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-(--background-secondary) text-(--color-primary) p-6 rounded-lg text-center hover:bg-(--accent-color) hover:text-(--background-primary) transition-all duration-300"
              >
                <p className="text-lg font-semibold">{skill}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={(el) => {
            sectionRefs.current[3] = el;
          }}
          className="min-h-screen py-20 px-4 md:px-12 flex flex-col items-center justify-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-12 text-center"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-(--color-secondary) text-center max-w-2xl mb-8"
          >
            Whether you have a project in mind or just want to say hello, I&apos;d love to hear from you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="mailto:your.email@example.com"
              className="px-8 py-4 bg-(--accent-color) text-(--background-primary) font-bold rounded-full hover:scale-105 transition-transform"
            >
              Email Me
            </Link>
          </motion.div>
        </section>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </main>
  );
}

// Project Modal Component
interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-4xl w-full max-h-[90vh] bg-(--background-primary) rounded-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-full">
          {/* Media Section */}
          <div className="relative aspect-video bg-gray-900">
            {project.media.type === 'video' ? (
              <video
                className="w-full h-full object-cover"
                controls
                poster={project.media.poster}
                autoPlay
                muted
              >
                <source src={project.media.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={project.media.src}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:gap-12">
              {/* Left Column */}
              <div className="lg:flex-1">
                <h2 className="text-3xl font-bold mb-4 text-(--color-primary)">
                  {project.title}
                </h2>
                <p className="text-(--color-secondary) mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-(--background-secondary) text-(--color-primary) text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* External Links */}
                {project.externalLinks && (
                  <div className="flex gap-4">
                    {project.externalLinks.youtube && (
                      <Link
                        href={project.externalLinks.youtube}
                        target="_blank"
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        YouTube
                      </Link>
                    )}
                    {project.externalLinks.behance && (
                      <Link
                        href={project.externalLinks.behance}
                        target="_blank"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Behance
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="lg:w-80 mt-8 lg:mt-0">
                <div className="bg-(--background-secondary) p-6 rounded-lg">
                  <h3 className="font-bold mb-4 text-(--color-primary)">Project Details</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-(--color-secondary)">Year:</span>
                      <span className="ml-2 text-(--color-primary)">{project.year}</span>
                    </div>
                    
                    {project.duration && (
                      <div>
                        <span className="text-(--color-secondary)">Duration:</span>
                        <span className="ml-2 text-(--color-primary)">{project.duration}</span>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-(--color-secondary)">Tools Used:</span>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.tools.map((tool, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-(--background-primary) text-(--color-secondary) text-xs rounded border"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};