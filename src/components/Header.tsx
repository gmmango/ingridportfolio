"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface HeaderProps {
  activeSection?: string;
}

// Navigation sections with colors matching the theme
const sections = [
  { id: "home", title: "Home", icon: "🏠", color: "#f5a4c7" },
  { id: "portfolio", title: "Portfolio", icon: "🎨", color: "#a4d4f5" },
  { id: "skills", title: "Skills", icon: "✨", color: "#c4a4f5" },
  { id: "contact", title: "Contact", icon: "💌", color: "#a4f5c4" },
];

export default function Header({ activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Full Header - shown at top */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4 }}
            className="fixed top-4 left-4 right-4 z-50 px-6 lg:px-8 py-4 rounded-full bg-[var(--background-secondary)]/90 backdrop-blur-md border border-[var(--border-color)] mx-auto max-w-[1200px]"
            style={{
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="flex items-center justify-between">
              {/* Logo/Name */}
              <a
                href="#home"
                className="flex items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "#f5a4c730",
                  }}
                >
                  <span className="text-lg">✨</span>
                </div>
                <h2 className="text-[var(--color-primary)] text-base font-bold tracking-tight">
                  Ingrid Sayuri
                </h2>
              </a>

              {/* Navigation Links - Desktop */}
              <nav className="hidden md:flex items-center gap-2">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2"
                      style={{
                        backgroundColor: isActive ? section.color : "transparent",
                        borderColor: section.color,
                        color: isActive ? "#0f0f0f" : "var(--color-secondary)",
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                        boxShadow: isActive
                          ? `0 4px 14px ${section.color}40`
                          : "none",
                      }}
                    >
                      {section.title}
                    </a>
                  );
                })}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden z-50 p-3 rounded-full transition-all duration-300 border-2"
                aria-label="Toggle menu"
                style={{
                  backgroundColor: mobileMenuOpen ? "#c4a4f5" : "transparent",
                  borderColor: "#c4a4f5",
                }}
              >
                {mobileMenuOpen ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke={mobileMenuOpen ? "#0f0f0f" : "var(--color-secondary)"}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="var(--color-secondary)"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                  >
                    <path d="M4 8h16M4 16h16" />
                  </svg>
                )}
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Floating Top Right Menu - shown when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="fixed right-4 top-4 z-50 flex flex-row gap-2 p-3 rounded-full bg-[var(--background-secondary)] backdrop-blur-md border border-[var(--border-color)]"
            style={{
              boxShadow:
                "0 10px 40px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)",
            }}
          >
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              const isHovered = hoveredItem === section.id;

              return (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  className="relative flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: isHovered ? "auto" : "44px",
                    height: "44px",
                    backgroundColor: isActive ? section.color : `${section.color}20`,
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: section.color,
                    boxShadow: isActive
                      ? `0 4px 14px ${section.color}40`
                      : "none",
                    paddingLeft: isHovered ? "14px" : "0",
                    paddingRight: isHovered ? "14px" : "0",
                  }}
                  onMouseEnter={() => setHoveredItem(section.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{section.icon}</span>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2 text-sm font-semibold whitespace-nowrap overflow-hidden"
                        style={{
                          color: isActive ? "#0f0f0f" : "var(--color-secondary)",
                        }}
                      >
                        {section.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay - for top header */}
      <AnimatePresence>
        {mobileMenuOpen && !isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={closeMobileMenu}
          >
            <div className="absolute inset-0 bg-[var(--background-primary)]/90 backdrop-blur-md" />
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-4 right-4 top-24 rounded-3xl p-6 bg-[var(--background-secondary)] border border-[var(--border-color)]"
              style={{
                boxShadow:
                  "0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-3">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={closeMobileMenu}
                      className="px-5 py-3 rounded-full text-base font-semibold transition-all duration-300 border-2 text-center flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: isActive ? section.color : "transparent",
                        borderColor: section.color,
                        color: isActive ? "#0f0f0f" : "var(--color-secondary)",
                        boxShadow: isActive
                          ? `0 4px 14px ${section.color}40`
                          : "none",
                      }}
                    >
                      <span>{section.icon}</span>
                      {section.title}
                    </a>
                  );
                })}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
