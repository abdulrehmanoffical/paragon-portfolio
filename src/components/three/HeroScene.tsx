"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { useTheme } from "@/contexts/ThemeContext";

// Both variants are drawn from the six locked Paragon hexes (CLAUDE.md Color
// system) — the dark-mode strong/border values held fixed for the form
// itself (so the glass form reads consistently against either background),
// tinted per-theme only through the ambient/key light color below.
const FORM_COLOR = "#FAF8F2";
const LIGHT_THEME_KEY_LIGHT = "#0E0E0E";
const DARK_THEME_KEY_LIGHT = "#F1EFE8";

interface FacetedFormProps {
  reduceMotion: boolean;
}

function FacetedForm({ reduceMotion }: FacetedFormProps) {
  const meshRef = useRef<Mesh>(null);
  const rotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (reduceMotion || !meshRef.current) return;

    // Slow constant drift plus a soft ease toward the pointer position —
    // reads as a considered, physical response rather than a snap-to-cursor
    // tracker. state.pointer is R3F's normalized (-1..1) device coordinate,
    // updated only while the pointer is actually over the canvas.
    meshRef.current.rotation.y += delta * 0.1;
    rotation.current.x += (state.pointer.y * 0.22 - rotation.current.x) * 0.05;
    rotation.current.y += (state.pointer.x * 0.3 - rotation.current.y) * 0.05;
    meshRef.current.rotation.x = rotation.current.x;
    meshRef.current.rotation.z = rotation.current.y * 0.25;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.35, 0]} />
      <meshPhysicalMaterial
        color={FORM_COLOR}
        roughness={0.18}
        metalness={0.05}
        transmission={0.9}
        thickness={1.4}
        clearcoat={0.5}
        clearcoatRoughness={0.25}
        ior={1.4}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

interface HeroSceneProps {
  reduceMotion: boolean;
}

export default function HeroScene({ reduceMotion }: HeroSceneProps) {
  const { theme } = useTheme();
  const keyLightColor = theme === "dark" ? DARK_THEME_KEY_LIGHT : LIGHT_THEME_KEY_LIGHT;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 3, 4]} intensity={1.2} color={keyLightColor} />
      <directionalLight position={[-3, -2, -2]} intensity={0.35} color={keyLightColor} />
      <Suspense fallback={null}>
        <FacetedForm reduceMotion={reduceMotion} />
      </Suspense>
    </Canvas>
  );
}
