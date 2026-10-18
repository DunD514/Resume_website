"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { AtmosphereShader } from "./AtmosphereShader";
import { UnifiedProject } from "@/lib/projects";
import { PROJECT_CATEGORIES, ProjectCategoryKey } from "@/lib/projectCategories";

interface EarthGlobeProps {
  projects: UnifiedProject[];
  onSelectProject: (project: UnifiedProject) => void;
  onHoverProject?: (project: UnifiedProject | null) => void;
  selectedProjectId: string | null;
  activeCategory: string; // "all" | categoryKey
}

export default function EarthGlobe({
  projects,
  onSelectProject,
  onHoverProject,
  selectedProjectId,
  activeCategory,
}: EarthGlobeProps) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Load NASA textures
  const [dayMap, cloudsMap, specularMap] = useLoader(THREE.TextureLoader, [
    "/textures/earth_day.jpg",
    "/textures/earth_clouds.png",
    "/textures/earth_specular.jpg",
  ]);



  // Defined orbital bands based on PROJECT_CATEGORIES
  const orbitalBands = useMemo(() => {
    return [
      {
        key: "computer-vision" as ProjectCategoryKey,
        name: "Computer Vision",
        radius: 4.8,
        inclination: Math.PI / 6,
        color: PROJECT_CATEGORIES["computer-vision"].accentColor,
      },
      {
        key: "ml-dl" as ProjectCategoryKey,
        name: "Machine Learning & Deep Learning",
        radius: 5.4,
        inclination: -Math.PI / 8,
        color: PROJECT_CATEGORIES["ml-dl"].accentColor,
      },
      {
        key: "genai-llms" as ProjectCategoryKey,
        name: "Generative AI & LLMs",
        radius: 6.0,
        inclination: Math.PI / 4,
        color: PROJECT_CATEGORIES["genai-llms"].accentColor,
      },
      {
        key: "data-engineering" as ProjectCategoryKey,
        name: "Data Engineering & Databases",
        radius: 6.6,
        inclination: 0,
        color: PROJECT_CATEGORIES["data-engineering"].accentColor,
      },
      {
        key: "robotics-simulation" as ProjectCategoryKey,
        name: "Robotics & Simulation",
        radius: 7.2,
        inclination: -Math.PI / 4,
        color: PROJECT_CATEGORIES["robotics-simulation"].accentColor,
      },
      {
        key: "web-apps" as ProjectCategoryKey,
        name: "Web Systems & Applications",
        radius: 7.8,
        inclination: Math.PI / 5,
        color: PROJECT_CATEGORIES["web-apps"].accentColor,
      },
    ];
  }, []);

  // Distribute projects gracefully across their designated orbital bands to avoid overcrowding
  const projectPositions = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    // Group projects by primary category
    const grouped: Record<string, UnifiedProject[]> = {};
    projects.forEach((p) => {
      const key = p.primaryCategory;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(p);
    });

    const positions: {
      project: UnifiedProject;
      band: (typeof orbitalBands)[0];
      position: THREE.Vector3;
    }[] = [];

    orbitalBands.forEach((band) => {
      const bandProjects = grouped[band.key] || [];
      if (bandProjects.length === 0) return;

      // Evenly distribute projects on this orbit
      bandProjects.forEach((proj, idx) => {
        const step = (Math.PI * 2) / bandProjects.length;
        const angle = idx * step + 0.35;
        const x = Math.cos(angle) * band.radius;
        const z = Math.sin(angle) * band.radius;
        const y = Math.sin(band.inclination) * z * 0.4;

        positions.push({
          project: proj,
          band,
          position: new THREE.Vector3(x, y, z),
        });
      });
    });

    return positions;
  }, [projects, orbitalBands]);

  // Gentle Earth and Clouds rotation
  useFrame((_, delta) => {
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y += delta * 0.035;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.045;
    }
  });

  return (
    <group>
      {/* Planetary Group */}
      <group ref={earthGroupRef}>
        {/* Core Earth Sphere */}
        <mesh receiveShadow castShadow>
          <sphereGeometry args={[3.2, 64, 64]} />
          <meshStandardMaterial
            map={dayMap}
            roughnessMap={specularMap}
            roughness={0.65}
            metalness={0.15}
          />
        </mesh>

        {/* Cloud Layer */}
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[3.23, 64, 64]} />
          <meshStandardMaterial
            map={cloudsMap}
            transparent
            opacity={0.42}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Atmospheric Limb Glow */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[3.38, 48, 48]} />
          <shaderMaterial
            args={[AtmosphereShader]}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            transparent
          />
        </mesh>
      </group>

      {/* Orbital Tracks & Project Markers */}
      <group>
        {orbitalBands.map((band) => {
          const isCategoryActive =
            activeCategory === "all" ||
            activeCategory === "All" ||
            activeCategory === band.key;

          return (
            <group key={band.key} rotation={[band.inclination, 0, 0]}>
              <mesh>
                <ringGeometry args={[band.radius - 0.015, band.radius + 0.015, 96]} />
                <meshBasicMaterial
                  color={band.color}
                  transparent
                  opacity={isCategoryActive ? 0.4 : 0.08}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          );
        })}

        {/* Project Beacon Markers */}
        {projectPositions.map(({ project, band, position }) => {
          const isSelected = selectedProjectId === project.id;
          const isHovered = hoveredId === project.id;
          const isCategoryMatch =
            activeCategory === "all" ||
            activeCategory === "All" ||
            activeCategory === project.primaryCategory ||
            project.categories.includes(activeCategory as ProjectCategoryKey);

          const coreRadius = isSelected ? 0.24 : isHovered ? 0.2 : project.isFeatured ? 0.16 : 0.13;
          const ringRadius = isSelected ? 0.5 : isHovered ? 0.38 : 0.28;

          return (
            <group
              key={project.id}
              position={position}
              onClick={(e) => {
                e.stopPropagation();
                onSelectProject(project);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
                setHoveredId(project.id);
                if (onHoverProject) onHoverProject(project);
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
                setHoveredId(null);
                if (onHoverProject) onHoverProject(null);
              }}
            >
              {/* Beacon Central Core */}
              <mesh>
                <sphereGeometry args={[coreRadius, 16, 16]} />
                <meshBasicMaterial
                  color={isSelected ? "#ffffff" : isHovered ? "#ffeedd" : band.color}
                  transparent
                  opacity={isCategoryMatch ? 1 : 0.18}
                />
              </mesh>

              {/* Pulsing Beacon Halo */}
              <mesh>
                <ringGeometry args={[coreRadius + 0.04, ringRadius, 24]} />
                <meshBasicMaterial
                  color={isSelected ? "#ffffff" : band.color}
                  transparent
                  opacity={isSelected ? 0.85 : isHovered ? 0.65 : isCategoryMatch ? 0.35 : 0.08}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
