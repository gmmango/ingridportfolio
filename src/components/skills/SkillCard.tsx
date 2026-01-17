"use client"

import { cn } from "@/lib/utils"

interface SkillCardProps {
  skill: {
    name: string
    icon: string
    color: string
    category: string
    description: string
    proficiency: number
  } | null
}

// Inline Card components to avoid creating a separate ui/ folder
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-[var(--background-secondary)] text-[var(--color-primary)] flex flex-col gap-6 rounded-xl border border-[var(--border-color)] py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6", className)} {...props} />
}

export function SkillCard({ skill }: SkillCardProps) {
  if (!skill) {
    return (
      <Card className="bg-[var(--background-secondary)]/80 backdrop-blur-sm border-2 border-dashed border-[var(--accent-color)]/30">
        <CardContent className="p-6 text-center">
          <div className="text-5xl mb-3 animate-bounce">✨</div>
          <p className="text-[var(--color-secondary)] font-medium">Click on a skill bubble to learn more!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[var(--background-secondary)]/90 backdrop-blur-sm border-2 overflow-hidden" style={{ borderColor: skill.color }}>
      <div className="h-2" style={{ backgroundColor: skill.color }} />
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{skill.icon}</span>
          <div>
            <h3 className="font-bold text-lg text-[var(--color-primary)]">{skill.name}</h3>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${skill.color}30`, color: skill.color }}
            >
              {skill.category}
            </span>
          </div>
        </div>

        <p className="text-sm text-[var(--color-secondary)] mb-4 leading-relaxed">{skill.description}</p>

        {/* Cute proficiency bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-[var(--color-primary)]">Skill Level</span>
            <span className="text-[var(--color-secondary)]">{skill.proficiency}%</span>
          </div>
          <div className="h-3 bg-[var(--background-secondary)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${skill.proficiency}%`,
                backgroundColor: skill.color,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-[var(--color-secondary)]">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
