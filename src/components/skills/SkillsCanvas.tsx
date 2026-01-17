"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { SquishyBlob } from "./SquishyBlob"
import { FloatingCloud } from "./FloatingCloud"
import { Sparkle } from "./Sparkle"

interface Skill {
  name: string
  icon: string
  color: string
  category: string
}

interface SkillsCanvasProps {
  skills: Skill[]
  selectedSkill: string | null
  onSelectSkill: (skill: string) => void
  activeCategory: string
}

export function SkillsCanvas({ skills, selectedSkill, onSelectSkill, activeCategory }: SkillsCanvasProps) {
  const filteredSkills = activeCategory === "All" ? skills : skills.filter((s) => s.category === activeCategory)

  // Arrange skills in a cute circular pattern
  const getPosition = (index: number, total: number): [number, number, number] => {
    const radius = 2.5
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2
    return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, Math.sin(angle) * 0.5]
  }

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
      <color attach="background" args={["#0f0f0f"]} />

      {/* Soft lighting for dark theme */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#a4d4f5" />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#c4a4f5" />
      <pointLight position={[0, 3, 0]} intensity={0.6} color="#f5a4c7" />

      {/* Dark environment */}
      <Environment preset="night" />
      <fog attach="fog" args={["#0f0f0f", 8, 20]} />

      {/* Floating clouds */}
      <FloatingCloud position={[-4, 2.5, -2]} scale={0.8} speed={0.5} />
      <FloatingCloud position={[4, 2, -3]} scale={1} speed={0.4} />
      <FloatingCloud position={[0, 3, -4]} scale={1.2} speed={0.3} />
      <FloatingCloud position={[-3, -2, -2]} scale={0.6} speed={0.6} />
      <FloatingCloud position={[3.5, -1.5, -2.5]} scale={0.7} speed={0.45} />

      {/* Sparkles - brighter colors for dark theme */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Sparkle
          key={i}
          position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4 - 1]}
          color={["#f5a4c7", "#a4d4f5", "#a4f5c4", "#c4a4f5"][i % 4]}
          size={0.06 + Math.random() * 0.06}
        />
      ))}

      {/* Skill blobs */}
      {filteredSkills.map((skill, index) => (
        <SquishyBlob
          key={skill.name}
          position={getPosition(index, filteredSkills.length)}
          color={skill.color}
          skill={skill.name}
          icon={skill.icon}
          delay={index * 0.5}
          onClick={() => onSelectSkill(skill.name)}
          isSelected={selectedSkill === skill.name}
        />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
        rotateSpeed={0.5}
      />
    </Canvas>
  )
}
