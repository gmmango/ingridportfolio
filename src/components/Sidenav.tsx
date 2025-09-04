// components/Sidenav.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface SidenavProps {
  activeSection: string;
}

const sections = [
  { id: "home", title: "Home" },
  { id: "portfolio", title: "Portfolio" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

export default function Sidenav({ activeSection }: SidenavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="sticky top-0 h-screen w-1/4 max-w-sm flex flex-col justify-start px-8 py-16 hidden md:flex border-r border-(--border-color)"
    >
      {/* Logo placeholder */}
      <div className="mb-8 flex flex-col items-center text-center space-y-4">
        <div className="w-30 h-30 bg-[var(--accent-color)] rounded-full flex items-center justify-center overflow-hidden">
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="w-25 h-25 object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold">Ingrid Sayuri</h1>
      </div>

      <div className="space-y-4 mt-20">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Navigation</h2>
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`block text-lg md:text-xl font-medium transition-colors duration-300 ${
              activeSection === section.id
                ? "text-(--accent-color)"
                : "text-(--color-secondary) hover:text-(--color-primary)"
            }`}
          >
            {section.title}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
