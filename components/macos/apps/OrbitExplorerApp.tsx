"use client";

import React, { useState } from "react";
import SpaceScene from "@/components/cinematic/SpaceScene";
import { UnifiedProject } from "@/lib/projects";
import { PROJECT_CATEGORIES } from "@/lib/projectCategories";
import { ExternalLink, Compass, Star, GitFork, ArrowRight } from "lucide-react";

interface OrbitExplorerAppProps {
  projects: UnifiedProject[];
  onOpenProject?: (project: UnifiedProject) => void;
}

export default function OrbitExplorerApp({ projects, onOpenProject }: OrbitExplorerAppProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<UnifiedProject | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.primaryCategoryLabel === activeCategory || p.primaryCategory === activeCategory);

  const handleSelectNode = (project: UnifiedProject) => {
    setSelectedProjectId(project.id);
  };

  const categoryList = Object.values(PROJECT_CATEGORIES);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#05060a] text-white overflow-hidden select-none">
      {/* App Toolbar / Controls Header */}
      <div className="flex-none h-11 px-3 bg-[#16181f]/90 border-b border-white/10 flex items-center justify-between z-20 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-medium text-white/80">
            <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Telemetry: Orbit Active</span>
          </div>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Category Dropdown / Quick Filters */}
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeCategory === "All"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-white/60 hover:text-white/90 hover:bg-white/5"
              }`}
            >
              All ({projects.length})
            </button>
            {categoryList.slice(0, 5).map((cat) => {
              const count = projects.filter((p) => p.primaryCategoryLabel === cat.label || p.primaryCategory === cat.key).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat.label
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-white/60 hover:text-white/90 hover:bg-white/5"
                  }`}
                >
                  {cat.shortLabel} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Info / Stats */}
        <div className="flex items-center space-x-2 text-[11px] text-white/50">
          <span className="flex items-center gap-1 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {filteredProjects.length} Satellites
          </span>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative flex-1 w-full h-full min-h-0">
        <SpaceScene
          projects={filteredProjects}
          onSelectProject={handleSelectNode}
          onHoverProject={setHoveredProject}
          selectedProjectId={selectedProjectId}
          activeCategory={activeCategory}
        />

        {/* Orbit Control Tip overlay */}
        <div className="absolute top-3 left-3 pointer-events-none z-10 flex flex-col space-y-1">
          <div className="px-2.5 py-1 rounded-md bg-black/50 border border-white/10 backdrop-blur-md text-[11px] text-white/70 shadow-lg">
            <span>Drag to rotate globe • Scroll to zoom • Click orbital satellite nodes</span>
          </div>
        </div>

        {/* Hover Pill (when hovering a satellite node) */}
        {hoveredProject && !selectedProject && (
          <div className="absolute top-12 left-3 z-10 pointer-events-none px-3 py-1.5 rounded-lg bg-[#0e111a]/90 border border-cyan-500/40 backdrop-blur-md shadow-xl max-w-xs transition-opacity animate-fade-in">
            <div className="text-xs font-semibold text-cyan-300 truncate">{hoveredProject.name}</div>
            <div className="text-[10px] text-white/60 line-clamp-1">{hoveredProject.description}</div>
          </div>
        )}

        {/* Project Telemetry Inspector Drawer (HUD) */}
        {selectedProject && (
          <div className="absolute bottom-4 right-4 z-20 w-80 max-w-[calc(100%-2rem)] rounded-xl bg-[#10131d]/90 border border-white/15 p-4 backdrop-blur-xl shadow-2xl text-white animate-fade-in">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-1">
                  {selectedProject.primaryCategoryLabel}
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight">{selectedProject.name}</h3>
              </div>
              <button
                onClick={() => setSelectedProjectId(null)}
                className="text-white/40 hover:text-white p-1 rounded-md hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-white/70 leading-relaxed line-clamp-3 mb-3">
              {selectedProject.description || "Project telemetry and production repository data."}
            </p>

            {/* Metrics */}
            <div className="flex items-center space-x-3 text-[11px] text-white/60 mb-3 pb-2.5 border-b border-white/10">
              <span className="flex items-center gap-1 font-mono">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                {selectedProject.stars}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <GitFork className="w-3.5 h-3.5 text-blue-400" />
                {selectedProject.forks}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-white/75 font-mono">
                {selectedProject.language || "TypeScript"}
              </span>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {selectedProject.tags.slice(0, 4).map((tech) => (
                <span key={tech} className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-white/60">
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 pt-1">
              {onOpenProject && (
                <button
                  onClick={() => onOpenProject(selectedProject)}
                  className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition shadow-sm"
                >
                  <span>Open Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition"
                  title="View on GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
