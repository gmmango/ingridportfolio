"use client"

import { useState, Suspense, forwardRef } from "react"
import { SkillsCanvas } from "./SkillsCanvas"
import { SkillCard } from "./SkillCard"
import { CategoryPills } from "./CategoryPills"

// Skills data with your actual capabilities
const skills = [
  // Creative
  {
    name: "Character Design",
    icon: "🎨",
    color: "#f5a4c7",
    category: "Creative",
    description: "Bringing unique characters to life with distinctive personalities, shapes, and visual appeal.",
    proficiency: 90,
  },
  {
    name: "Visual Storyboarding",
    icon: "📖",
    color: "#f5a4d4",
    category: "Creative",
    description: "Crafting visual narratives frame by frame to convey emotion, pacing, and story flow.",
    proficiency: 85,
  },
  {
    name: "World Building",
    icon: "🌍",
    color: "#a4f5c4",
    category: "Creative",
    description: "Designing immersive environments and cohesive universes for characters to inhabit.",
    proficiency: 80,
  },

  // 3D
  {
    name: "3D Asset Creation",
    icon: "🧊",
    color: "#a4d4f5",
    category: "3D",
    description: "Modeling detailed props, characters, and environments ready for production pipelines.",
    proficiency: 88,
  },
  {
    name: "Scene Composition",
    icon: "🎬",
    color: "#a4c4f5",
    category: "3D",
    description: "Arranging elements within 3D space to create visually compelling and balanced compositions.",
    proficiency: 85,
  },
  {
    name: "Lighting & Mood",
    icon: "💡",
    color: "#f5d4a4",
    category: "3D",
    description: "Setting atmosphere and emotion through strategic lighting, shadows, and color temperature.",
    proficiency: 82,
  },

  // Tools
  {
    name: "Blender",
    icon: "🎯",
    color: "#c4a4f5",
    category: "Tools",
    description: "All-in-one 3D creation suite for modeling, sculpting, animation, and rendering.",
    proficiency: 90,
  },
  {
    name: "ZBrush",
    icon: "✨",
    color: "#d4a4f5",
    category: "Tools",
    description: "Digital sculpting for highly detailed characters, creatures, and organic forms.",
    proficiency: 78,
  },
  {
    name: "Substance 3D Painter",
    icon: "🖌️",
    color: "#f5c4a4",
    category: "Tools",
    description: "Industry-standard texturing tool for creating realistic PBR materials.",
    proficiency: 75,
  },
  {
    name: "Unreal Engine",
    icon: "🎮",
    color: "#a4f5d4",
    category: "Tools",
    description: "Real-time 3D engine for visualization, cinematics, and interactive experiences.",
    proficiency: 70,
  },
  {
    name: "Adobe Photoshop",
    icon: "🎭",
    color: "#f5a4c7",
    category: "Tools",
    description: "Essential for texture work, concept art, and post-production polish.",
    proficiency: 85,
  },
  {
    name: "Maya",
    icon: "🌟",
    color: "#f5d4a4",
    category: "Tools",
    description: "Industry-standard 3D software for animation and rigging — currently learning!",
    proficiency: 45,
  },
]

const categories = ["All", "Creative", "3D", "Tools"]

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--background-primary)]">
      <div className="flex flex-col items-center gap-4">
        <div className="text-5xl animate-bounce">☁️</div>
        <p className="text-[var(--color-secondary)] text-sm font-medium">Loading magical things...</p>
      </div>
    </div>
  )
}

interface SkillsSectionProps {
  id?: string
  className?: string
}

export const SkillsSection = forwardRef<HTMLElement, SkillsSectionProps>(
  function SkillsSection({ id, className }, ref) {
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
    const [activeCategory, setActiveCategory] = useState("All")

    const selectedSkillData = skills.find((s) => s.name === selectedSkill) || null

    return (
      <section
        ref={ref}
        id={id}
        className={`relative min-h-screen overflow-hidden bg-[var(--background-primary)] ${className || ""}`}
      >
        {/* Decorative background shapes - subtle glow on dark */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#f5a4c7]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#a4d4f5]/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#c4a4f5]/10 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative z-10 pt-12 pb-6 px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-3">Things I Love Doing</h2>
          <p className="text-[var(--color-secondary)] text-lg max-w-md mx-auto leading-relaxed">
            Click on the bubbles to explore my creative toolkit!
          </p>

          <div className="mt-6">
            <CategoryPills
              categories={categories}
              activeCategory={activeCategory}
              onSelect={(cat) => {
                setActiveCategory(cat)
                setSelectedSkill(null)
              }}
            />
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="relative z-0 h-[50vh] md:h-[55vh]">
          <Suspense fallback={<LoadingFallback />}>
            <SkillsCanvas
              skills={skills}
              selectedSkill={selectedSkill}
              onSelectSkill={setSelectedSkill}
              activeCategory={activeCategory}
            />
          </Suspense>
        </div>

        {/* Skill Card */}
        <div className="relative z-10 px-6 pb-12 -mt-8">
          <div className="max-w-sm mx-auto">
            <SkillCard skill={selectedSkillData} />
          </div>
        </div>

        {/* Cute footer hint */}
        <div className="absolute bottom-4 left-0 right-0 text-center z-10">
          <p className="text-xs text-[var(--color-secondary)]/50 font-medium">drag to spin the clouds around ~</p>
        </div>
      </section>
    )
  }
)
