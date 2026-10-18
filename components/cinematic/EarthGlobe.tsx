"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { AtmosphereShader } from "./AtmosphereShader";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";

interface EarthGlobeProps {
  onSelectProject: (project: ProjectItem) => void;
  selectedProjectId: string | null;
  activeCategory: string;
}

export default function EarthGlobe({
  onSelectProject,
  selectedProjectId,
  activeCategory,
}: EarthGlobeProps) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Load NASA textures
  const [dayMap, cloudsMap, specularMap] = useLoader(THREE.TextureLoader, [
    "/textures/earth_day.jpg",
    "/textures/earth_clouds.png",
    "/textures/earth_specular.jpg",
  ]);

  // Configure texture parameters
  useMemo(() => {
    dayMap.colorSpace = THREE.SRGBColorSpace;
    cloudsMap.colorSpace = THREE.SRGBColorSpace;
  }, [dayMap, cloudsMap]);

  // Map projects to orbital bands deterministically
  const orbitalBands = useMemo(() => {
    return [
      {
        id: "ML/DS",
        name: "Data Science & Machine Learning",
        radius: 4.8,
        inclination: Math.PI / 6,
        color: "#ff7a1a",
      },
      {
        id: "Data Eng",
        name: "Data Engineering & Analytics",
        radius: 5.5,
        inclination: 0,
        color: "#38bdf8",
      },
      {
        id: "Applied AI",
        name: "Applied AI & Software",
        radius: 6.2,
        inclination: Math.PI / 3,
        color: "#a855f7",
      },
      {
        id: "Aero",
        name: "Robotics & Aerospace Research",
        radius: 7.0,
        inclination: -Math.PI / 4,
        color: "#f59e0b",
      },
    ];
  }, []);

  // Compute marker positions on orbits
  const projectPositions = useMemo(() => {
    return PORTFOLIO_DATA.projects.map((proj, idx) => {
      const band = orbitalBands.find((b) => b.id === proj.category) || orbitalBands[0];
      const angle = (idx * 1.35 + 0.5) % (Math.PI * 2);
      const x = Math.cos(angle) * band.radius;
      const z = Math.sin(angle) * band.radius;
      const y = Math.sin(band.inclination) * z * 0.45;

      return {
        project: proj,
        band,
        position: new THREE.Vector3(x, y, z),
      };
    });
  }, [orbitalBands]);

  // Gentle Earth and Clouds rotation
  useFrame((_, delta) => {
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y += delta * 0.04;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.055;
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

        {/* Separate Cloud Layer */}
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
          const isCategoryActive = activeCategory === "All" || activeCategory === band.id;
          return (
            <group key={band.id} rotation={[band.inclination, 0, 0]}>
              {/* Orbital Ring Line */}
              <mesh>
                <ringGeometry args={[band.radius - 0.015, band.radius + 0.015, 96]} />
                <meshBasicMaterial
                  color={band.color}
                  transparent
                  opacity={isCategoryActive ? 0.35 : 0.08}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          );
        })}

        {/* Project Beacon Markers */}
        {projectPositions.map(({ project, band, position }) => {
          const isSelected = selectedProjectId === project.id;
          const isCategoryMatch = activeCategory === "All" || activeCategory === project.category;

          return (
            <group
              key={project.id}
              position={position}
              onClick={(e) => {
                e.stopPropagation();
                onSelectProject(project);
              }}
            >
              {/* Beacon Central Core */}
              <mesh>
                <sphereGeometry args={[isSelected ? 0.22 : 0.14, 16, 16]} />
                <meshBasicMaterial
                  color={isSelected ? "#ffffff" : band.color}
                  transparent
                  opacity={isCategoryMatch ? 1 : 0.2}
                />
              </mesh>

              {/* Pulsing Beacon Halo */}
              <mesh>
                <ringGeometry args={[0.2, isSelected ? 0.45 : 0.32, 24]} />
                <meshBasicMaterial
                  color={band.color}
                  transparent
                  opacity={isSelected ? 0.8 : isCategoryMatch ? 0.45 : 0.1}
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
