"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidenav from "@/components/Sidenav";

const sections = [
  { id: "home", title: "Home" },
  { id: "portfolio", title: "Portfolio" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

const portfolioItems = [
  {
    id: "guardian",
    title: "The Guardian",
    category: "3D Animation",
    image: "/images/project-guardian.webp",
  },
  {
    id: "aetherium",
    title: "Aetherium Core",
    category: "Motion Graphics",
    image: "/images/project-aetherium.webp",
  },
  {
    id: "wild",
    title: "Wild Frontier",
    category: "Environment Design",
    image: "/images/project-wild.webp",
  },
  {
    id: "nova",
    title: "Project Nova",
    category: "VFX",
    image: "/images/project-nova.webp",
  },
  {
    id: "spirit",
    title: "Forest Spirit",
    category: "Character Animation",
    image: "/images/project-spirit.webp",
  },
  {
    id: "city",
    title: "Cityscape",
    category: "Architectural Viz",
    image: "/images/project-city.webp",
  },
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

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // --- FIX APPLIED HERE ---
            // Update the URL hash to match the active section's ID
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

  return (
    <main className="min-h-screen bg-(--background-primary) text-(--color-primary) flex">
      <Sidenav activeSection={activeSection} />

      <div className="grow w-full">
        <section
          id="home"
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          className="relative h-screen w-full overflow-hidden"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/hero-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero.webp"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter drop-shadow-lg"
            >
              Bringing Worlds to Life
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-4 max-w-3xl text-lg md:text-xl text-(--color-secondary) drop-shadow-md"
            >
              I’m a 3D animator crafting cinematic experiences through storytelling, motion, and intricate detail.
            </motion.p>
          </div>
        </section>

        <section
          id="portfolio"
          ref={(el) => {
            sectionRefs.current[1] = el;
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
            Portfolio
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {portfolioItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="relative group overflow-hidden cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover aspect-square transform group-hover:scale-105 transition-transform duration-500"
                />
                <Link href={`/portfolio/${item.id}`}>
                  <div className="absolute inset-0 bg-(--color-primary)/95 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-2xl font-bold mb-1 text-(--background-primary)">{item.title}</h3>
                    <p className="text-sm text-(--background-primary)">{item.category}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

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
                className="bg-(--background-secondary) text-(--color-primary) p-6 rounded-lg text-center"
              >
                <p className="text-lg font-semibold">{skill}</p>
              </motion.div>
            ))}
          </div>
        </section>

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
    </main>
  );
}