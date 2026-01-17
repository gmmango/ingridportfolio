"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface FloatingCloudProps {
  position: [number, number, number]
  scale?: number
  speed?: number
}

export function FloatingCloud({ position, scale = 1, speed = 1 }: FloatingCloudProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime * speed
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1
    groupRef.current.position.x = position[0] + Math.sin(time * 0.3) * 0.2
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main cloud puff - subtle glow on dark */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#e8e8f0" roughness={0.9} opacity={0.6} transparent emissive="#a4d4f5" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[-0.3, -0.05, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#e8e8f0" roughness={0.9} opacity={0.6} transparent emissive="#c4a4f5" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0.35, -0.05, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color="#e8e8f0" roughness={0.9} opacity={0.6} transparent emissive="#f5a4c7" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0.15, 0.15, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#e8e8f0" roughness={0.9} opacity={0.6} transparent emissive="#a4f5c4" emissiveIntensity={0.1} />
      </mesh>
    </group>
  )
}
