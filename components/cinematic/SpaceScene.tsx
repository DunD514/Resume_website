"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import EarthGlobe from "./EarthGlobe";
import { UnifiedProject } from "@/lib/projects";

interface SpaceSceneProps {
  projects: UnifiedProject[];
  onSelectProject: (project: UnifiedProject) => void;
  onHoverProject?: (project: UnifiedProject | null) => void;
  selectedProjectId: string | null;
  activeCategory: string;
}

export default function SpaceScene({
  projects,
  onSelectProject,
  onHoverProject,
  selectedProjectId,
  activeCategory,
}: SpaceSceneProps) {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030408]">
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        shadows
      >
        <PerspectiveCamera makeDefault position={[0, 2, 14]} fov={42} />

        {/* Orbit controls for smooth manual Earth rotation */}
        <OrbitControls
          enableZoom={true}
          maxDistance={22}
          minDistance={7.5}
          enablePan={false}
          rotateSpeed={0.65}
          dampingFactor={0.05}
        />

        {/* Lighting: Sun Key Light & Restrained Deep Space Fill */}
        <directionalLight
          position={[16, 8, 14]}
          intensity={2.8}
          color="#fffaf0"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <ambientLight intensity={0.25} color="#4b5563" />

        <Suspense fallback={null}>
          <EarthGlobe
            projects={projects}
            onSelectProject={onSelectProject}
            onHoverProject={onHoverProject}
            selectedProjectId={selectedProjectId}
            activeCategory={activeCategory}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
