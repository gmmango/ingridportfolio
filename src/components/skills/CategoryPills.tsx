"use client"

interface CategoryPillsProps {
  categories: string[]
  activeCategory: string
  onSelect: (category: string) => void
}

const categoryColors: Record<string, string> = {
  All: "#f5a4c7",      // Pink
  Creative: "#a4f5c4", // Mint green
  "3D": "#a4d4f5",     // Sky blue
  Tools: "#c4a4f5",    // Lavender
}

export function CategoryPills({ categories, activeCategory, onSelect }: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => {
        const isActive = activeCategory === category
        const color = categoryColors[category] || "#f5a4c7"

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2"
            style={{
              backgroundColor: isActive ? color : "transparent",
              borderColor: color,
              color: isActive ? "#0f0f0f" : "var(--color-secondary)",
              transform: isActive ? "scale(1.05)" : "scale(1)",
              boxShadow: isActive ? `0 4px 14px ${color}40` : "none",
            }}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
