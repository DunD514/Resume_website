"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { 
  Orbit, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  ExternalLink, 
  BookOpen, 
  CheckCircle, 
  Terminal, 
  Compass,
  ArrowRight,
  Radio,
  SlidersHorizontal
} from "lucide-react";
import { GithubIcon } from "./Icons";

interface ProjectGlobeProps {
  onSelectProject: (project: Project) => void;
  onToggleViewMode: () => void;
  isGridView: boolean;
}

export default function ProjectGlobe({ onSelectProject, onToggleViewMode, isGridView }: ProjectGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("deepfake-detector");
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [selectedBand, setSelectedBand] = useState<number | "all">("all");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 0.25, y: 0 });

  const projects = PORTFOLIO_DATA.projects;
  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  // Rotational state refs for animation loop
  const rotRef = useRef({ x: 0.25, y: 0, targetX: 0.25, targetY: 0 });
  const zoomRef = useRef(1);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    zoomRef.current = zoomLevel;
  }, [zoomLevel]);

  const handleReset = () => {
    rotRef.current = { x: 0.25, y: 0, targetX: 0.25, targetY: 0 };
    setRotation({ x: 0.25, y: 0 });
    setZoomLevel(1);
    setSelectedBand("all");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isGridView) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse drag handlers
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) {
        // Hit test satellites on hover
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        checkHover(mx, my);
        return;
      }

      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      rotRef.current.targetY += dx * 0.006;
      rotRef.current.targetX += dy * 0.004;
      // Clamp vertical inclination
      rotRef.current.targetX = Math.max(-0.8, Math.min(0.8, rotRef.current.targetX));
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const hit = checkHit(mx, my);
      if (hit) {
        setSelectedProjectId(hit.id);
      }
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("click", onClick);

    // Continental landmass points simulation for realistic Earth texture
    const numContinents = 240;
    const landPoints: { lat: number; lon: number }[] = [];
    for (let i = 0; i < numContinents; i++) {
      const lat = (Math.random() - 0.5) * Math.PI * 0.85;
      const lon = Math.random() * Math.PI * 2;
      // Cluster points into realistic continental shapes (Eurasia, Americas, Africa)
      if (
        (lat > 0 && lon > 0.5 && lon < 2.5) || // Eurasia
        (lat > -0.5 && lat < 0.6 && lon > 4.5 && lon < 5.8) || // Africa
        (lon > 3.2 && lon < 4.4) // Americas
      ) {
        landPoints.push({ lat, lon });
      }
    }

    // Projected satellite cache for hit-testing
    let projectedSatellites: {
      id: string;
      title: string;
      screenX: number;
      screenY: number;
      depth: number;
      radius: number;
      color: string;
      project: Project;
    }[] = [];

    const checkHit = (mx: number, my: number) => {
      // Find closest clicked satellite within 18px radius
      for (const sat of projectedSatellites) {
        const dx = mx - sat.screenX;
        const dy = my - sat.screenY;
        if (dx * dx + dy * dy < 324) {
          return sat.project;
        }
      }
      return null;
    };

    const checkHover = (mx: number, my: number) => {
      for (const sat of projectedSatellites) {
        const dx = mx - sat.screenX;
        const dy = my - sat.screenY;
        if (dx * dx + dy * dy < 324) {
          setHoveredProjectId(sat.id);
          canvas.style.cursor = "pointer";
          return;
        }
      }
      setHoveredProjectId(null);
      canvas.style.cursor = isDraggingRef.current ? "grabbing" : "grab";
    };

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth inertia rotation
      rotRef.current.x += (rotRef.current.targetX - rotRef.current.x) * 0.08;
      rotRef.current.y += (rotRef.current.targetY - rotRef.current.y) * 0.08;
      // Natural slow planetary rotation
      rotRef.current.targetY += 0.0008;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const currentZoom = zoomRef.current;
      const baseEarthRadius = Math.min(width, height) * 0.22 * currentZoom;

      const rotX = rotRef.current.x;
      const rotY = rotRef.current.y;

      // 1. Draw Deep Space Background Atmospheric Glow
      const spaceAtmosphere = ctx.createRadialGradient(cx, cy, baseEarthRadius * 0.7, cx, cy, baseEarthRadius * 2.8);
      spaceAtmosphere.addColorStop(0, "rgba(56, 189, 248, 0.12)");
      spaceAtmosphere.addColorStop(0.5, "rgba(2, 132, 199, 0.04)");
      spaceAtmosphere.addColorStop(1, "rgba(2, 4, 10, 0)");
      ctx.fillStyle = spaceAtmosphere;
      ctx.beginPath();
      ctx.arc(cx, cy, baseEarthRadius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Realistic 3D Earth Sphere
      // Sun vector from top-left
      const sunAngle = 0.8;
      const sunGradient = ctx.createRadialGradient(
        cx - baseEarthRadius * 0.35,
        cy - baseEarthRadius * 0.35,
        baseEarthRadius * 0.1,
        cx,
        cy,
        baseEarthRadius
      );
      sunGradient.addColorStop(0, "#0369A1"); // illuminated ocean daylight blue
      sunGradient.addColorStop(0.4, "#0C4A6E");
      sunGradient.addColorStop(0.85, "#082F49");
      sunGradient.addColorStop(1, "#020617"); // night terminator shade
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, baseEarthRadius, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric limb scattering rim
      ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, baseEarthRadius + 1, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Render Continental Landmasses
      landPoints.forEach((lp) => {
        // Project spherical coordinates
        const phi = lp.lat;
        const theta = lp.lon + rotY;

        const x = Math.cos(phi) * Math.sin(theta);
        const y = -Math.sin(phi);
        const z = Math.cos(phi) * Math.cos(theta);

        // Rotate by rotX
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;

        // Front-facing hemisphere test
        if (z2 > 0) {
          const px = cx + x * baseEarthRadius;
          const py = cy + y2 * baseEarthRadius;
          const alpha = Math.min(0.7, z2);

          ctx.fillStyle = `rgba(16, 185, 129, ${alpha * 0.6})`; // Emerald/Slate continental mass
          ctx.beginPath();
          ctx.arc(px, py, 2.5 * currentZoom, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. Render Mumbai Coordinates Beacon (Duncan's Home Station & Tekkloom)
      const mumLat = (19.076 / 180) * Math.PI;
      const mumLon = (72.8777 / 180) * Math.PI + rotY;
      const mx = Math.cos(mumLat) * Math.sin(mumLon);
      const my = -Math.sin(mumLat);
      const mz = Math.cos(mumLat) * Math.cos(mumLon);
      const my2 = my * Math.cos(rotX) - mz * Math.sin(rotX);
      const mz2 = my * Math.sin(rotX) + mz * Math.cos(rotX);

      if (mz2 > 0) {
        const mScreenX = cx + mx * baseEarthRadius;
        const mScreenY = cy + my2 * baseEarthRadius;

        ctx.fillStyle = "#F59E0B";
        ctx.beginPath();
        ctx.arc(mScreenX, mScreenY, 3, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing radar wave from Mumbai
        const pulse = (time * 1.5) % 1;
        ctx.strokeStyle = `rgba(245, 158, 11, ${1 - pulse})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mScreenX, mScreenY, 4 + pulse * 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(248, 250, 252, 0.85)";
        ctx.font = "9px JetBrains Mono, monospace";
        ctx.fillText("MUMBAI // TEKKLOOM HQ", mScreenX + 8, mScreenY - 3);
      }

      // 5. Render 4 Conceptual Orbital Bands
      const orbitalBandsConfig = [
        { bandId: 1, radiusMultiplier: 1.45, tilt: 0.15, label: "ORBIT-01: ML & DATA SCIENCE", color: "#38BDF8" },
        { bandId: 2, radiusMultiplier: 1.85, tilt: -0.25, label: "ORBIT-02: DATA ENGINEERING & SQL", color: "#F59E0B" },
        { bandId: 3, radiusMultiplier: 2.25, tilt: 0.35, label: "ORBIT-03: APPLIED AI & SYSTEMS", color: "#10B981" },
        { bandId: 4, radiusMultiplier: 2.65, tilt: -0.1, label: "ORBIT-04: AEROSPACE & GEOSPATIAL", color: "#A78BFA" },
      ];

      orbitalBandsConfig.forEach((ob) => {
        if (selectedBand !== "all" && selectedBand !== ob.bandId) return;

        const orbRadius = baseEarthRadius * ob.radiusMultiplier;
        const isBandActive = projects.find((p) => p.id === selectedProjectId)?.orbitalBand === ob.bandId;

        // Draw elliptical orbit path
        ctx.save();
        ctx.strokeStyle = isBandActive ? ob.color : "rgba(71, 85, 105, 0.4)";
        ctx.lineWidth = isBandActive ? 1.5 : 0.8;
        ctx.setLineDash(isBandActive ? [4, 2] : [2, 4]);

        ctx.beginPath();
        ctx.ellipse(cx, cy, orbRadius, orbRadius * 0.45 * Math.cos(rotX + ob.tilt), ob.tilt, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Label for the orbital band
        ctx.fillStyle = isBandActive ? ob.color : "rgba(100, 116, 139, 0.6)";
        ctx.font = "9px JetBrains Mono, monospace";
        const labelX = cx + orbRadius * 0.95;
        const labelY = cy - 8;
        if (labelX < width - 60) {
          ctx.fillText(ob.label, labelX, labelY);
        }
      });

      // 6. Project and Render Project Satellites
      projectedSatellites = [];

      projects.forEach((proj) => {
        if (selectedBand !== "all" && selectedBand !== proj.orbitalBand) return;

        const bandConfig = orbitalBandsConfig.find((b) => b.bandId === proj.orbitalBand) || orbitalBandsConfig[0];
        const orbRadius = baseEarthRadius * bandConfig.radiusMultiplier;

        // Current orbital position angle
        const orbitAngle = time * proj.orbitalSpeed * 60 + proj.orbitalAngleOffset + rotY * 0.5;

        // Compute 3D coordinate along tilted orbital ellipse
        const xOrb = Math.cos(orbitAngle) * orbRadius;
        const zOrb = Math.sin(orbitAngle) * orbRadius;
        const yOrb = zOrb * Math.sin(bandConfig.tilt);

        // Apply view tilt (rotX)
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const yRot = yOrb * cosX - zOrb * sinX * 0.5;
        const zRot = yOrb * sinX + zOrb * cosX;

        const screenX = cx + xOrb;
        const screenY = cy + yRot;

        const isSelected = proj.id === selectedProjectId;
        const isHovered = proj.id === hoveredProjectId;

        projectedSatellites.push({
          id: proj.id,
          title: proj.title,
          screenX,
          screenY,
          depth: zRot,
          radius: isSelected ? 8 : 6,
          color: proj.orbitalColor,
          project: proj,
        });

        // Telemetry beacon beam connecting selected project to Earth
        if (isSelected) {
          ctx.strokeStyle = `rgba(56, 189, 248, 0.4)`;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(screenX, screenY);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Draw Satellite Node
        ctx.save();
        // Solar panels wings
        ctx.strokeStyle = isSelected ? "#38BDF8" : "rgba(148, 163, 184, 0.8)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(screenX - 10, screenY);
        ctx.lineTo(screenX + 10, screenY);
        ctx.stroke();

        // Satellite central avionics core
        ctx.fillStyle = isSelected ? "#38BDF8" : isHovered ? "#F8FAFC" : proj.orbitalColor;
        ctx.beginPath();
        ctx.arc(screenX, screenY, isSelected ? 5.5 : 4, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing selection reticle
        if (isSelected) {
          const reticlePulse = (time * 2) % 1;
          ctx.strokeStyle = proj.orbitalColor;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(screenX, screenY, 9 + reticlePulse * 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Satellite Callsign Tag
        ctx.fillStyle = isSelected ? "#FFFFFF" : "rgba(226, 232, 240, 0.85)";
        ctx.font = isSelected ? "bold 10px JetBrains Mono, monospace" : "9px JetBrains Mono, monospace";
        ctx.fillText(proj.title, screenX + 12, screenY + 3);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("click", onClick);
    };
  }, [selectedProjectId, hoveredProjectId, selectedBand, isGridView, projects]);

  return (
    <div className="relative w-full rounded-2xl bg-[#030611] border border-sky-500/20 overflow-hidden shadow-2xl">
      {/* Top Instrumentation & Controls Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-slate-800 bg-[#070B18]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <Orbit className="w-4 h-4 animate-spin text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 block">
              ORBITAL PROJECT DISCOVERY SYSTEM
            </span>
            <span className="text-xs font-mono text-slate-300">
              INTERACTIVE 3D SATELLITE TELEMETRY
            </span>
          </div>
        </div>

        {/* View Toggle & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleViewMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              isGridView
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-900 text-slate-300 hover:text-white border border-slate-700"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isGridView ? "3D Orbital View" : "View All Projects (List)"}</span>
          </button>

          {!isGridView && (
            <>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.15))}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Reset View"
                aria-label="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Orbital Bands Filter Pills */}
      <div className="px-4 py-2 bg-[#040816] border-b border-slate-800/80 flex flex-wrap gap-2 text-xs font-mono">
        <button
          onClick={() => setSelectedBand("all")}
          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
            selectedBand === "all"
              ? "bg-sky-500/20 text-sky-300 border border-sky-400"
              : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800"
          }`}
        >
          ALL ORBITS (5)
        </button>
        {PORTFOLIO_DATA.orbitalBands.map((band) => (
          <button
            key={band.id}
            onClick={() => setSelectedBand(band.id)}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              selectedBand === band.id
                ? "bg-sky-500/20 text-sky-300 border border-sky-400"
                : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {band.code}
          </button>
        ))}
      </div>

      {/* Main Interactive Stage: Canvas & Project Target Telemetry Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px] items-stretch">
        {/* 3D Earth Globe Canvas Viewport */}
        <div className="lg:col-span-8 relative min-h-[420px] lg:min-h-[540px] bg-[#02040A]">
          <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

          {/* Canvas Navigation Hint */}
          <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-500 bg-slate-950/80 px-2 py-1 rounded border border-slate-800 pointer-events-none">
            DRAG TO ROTATE EARTH · CLICK SATELLITE TO INSPECT
          </div>
        </div>

        {/* Selected Project Target Telemetry Dossier Panel */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-[#070B18] border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-cyan-400" />
                {selectedProject.callsign}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                {selectedProject.status}
              </span>
            </div>

            <div>
              <span className="text-xs font-mono text-slate-400 block mb-1">
                {selectedProject.orbitalBandLabel}
              </span>
              <h3 className="text-xl font-bold font-['Space_Grotesk'] text-slate-100">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-light leading-relaxed">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-400 leading-relaxed">
              {selectedProject.description}
            </p>

            {/* Highlights */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                Primary Flight Specifications:
              </span>
              {selectedProject.highlights.slice(0, 3).map((h, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-sky-400 mt-0.5">•</span>
                  <span className="leading-snug">{h}</span>
                </div>
              ))}
            </div>

            {/* Tech Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedProject.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Dossier Actions */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => onSelectProject(selectedProject)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 border border-sky-400/30 transition-all cursor-pointer shadow-md shadow-sky-950/40"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open Project Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {selectedProject.repoUrl && (
              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-mono text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Inspect Repository on GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
