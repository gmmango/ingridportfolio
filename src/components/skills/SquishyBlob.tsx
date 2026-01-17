"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import type * as THREE from "three"

interface SquishyBlobProps {
  position: [number, number, number]
  color: string
  skill: string
  icon: string
  delay?: number
  onClick: () => void
  isSelected: boolean
}

export function SquishyBlob({ position, color, skill, icon, delay = 0, onClick, isSelected }: SquishyBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const baseScale = isSelected ? 1.3 : 1

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime + delay

    // Gentle floating bounce
    meshRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.15
    meshRef.current.position.x = position[0] + Math.sin(time * 0.8) * 0.05

    // Squishy wobble effect
    const squish = hovered ? 0.15 : 0.05
    meshRef.current.scale.x = baseScale + Math.sin(time * 2) * squish
    meshRef.current.scale.y = baseScale + Math.cos(time * 2) * squish
    meshRef.current.scale.z = baseScale + Math.sin(time * 2.5) * squish

    // Gentle rotation
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
    meshRef.current.rotation.z = Math.cos(time * 0.3) * 0.05
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = "auto"
      }}
    >
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.1}
        emissive={color}
        emissiveIntensity={hovered ? 0.3 : 0.1}
      />
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl drop-shadow-lg">{icon}</span>
          <span
            className="text-xs font-semibold whitespace-nowrap px-2 py-1 rounded-full backdrop-blur-sm shadow-lg"
            style={{
              backgroundColor: `${color}dd`,
              color: '#0f0f0f',
              textShadow: '0 0 2px rgba(255,255,255,0.3)',
            }}
          >
            {skill}
          </span>
        </div>
      </Html>
    </mesh>
  )
}
