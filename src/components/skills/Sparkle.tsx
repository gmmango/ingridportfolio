"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface SparkleProps {
  position: [number, number, number]
  color?: string
  size?: number
}

export function Sparkle({ position, color = "#ffd4e5", size = 0.08 }: SparkleProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const offset = Math.random() * Math.PI * 2

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime + offset

    // Twinkling effect
    const twinkle = (Math.sin(time * 3) + 1) * 0.5
    meshRef.current.scale.setScalar(size * (0.5 + twinkle * 0.5))

    // Gentle float
    meshRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.1
    meshRef.current.rotation.z = time * 0.5
  })

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.2} />
    </mesh>
  )
}
