"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import ProjectGlobe from "./ProjectGlobe";
import ProjectCard from "./ProjectCard";
import ProjectDossier from "./ProjectDossier";
import { Orbit, Compass, LayoutGrid, Globe, Radio } from "lucide-react";

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGridView, setIsGridView] = useState<boolean>(false);
  const [activeBandFilter, setActiveBandFilter] = useState<number | "all">("all");

  const projects = PORTFOLIO_DATA.projects;

  const filteredProjects = projects.filter((p) => {
    if (activeBandFilter === "all") return true;
    return p.orbitalBand === activeBandFilter;
  });

  return (
    <section id="project-explorer" className="py-24 relative bg-[#02040A]" aria-label="Project Explorer">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-900/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-sky-400 bg-sky-500/10 border border-sky-500/25">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              MISSION ARCHIVE // ORBITAL PROJECT EXPLORER
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-slate-100">
              Technical <span className="text-telemetry-gradient">Project Catalog</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              Discover verified technical systems organized across four conceptual orbital bands—from spatiotemporal deepfake forensics and DuckDB analytical OLAP to document AI and multi-modal aerospace research.
            </p>
          </div>

          {/* Primary View Mode Switcher */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setIsGridView(false)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                !isGridView
                  ? "bg-sky-600 text-white font-bold shadow-lg shadow-sky-950/40 border border-sky-400/40"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>3D Orbital Globe</span>
            </button>

            <button
              onClick={() => setIsGridView(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                isGridView
                  ? "bg-sky-600 text-white font-bold shadow-lg shadow-sky-950/40 border border-sky-400/40"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Conventional Grid</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Mode */}
        {!isGridView ? (
          /* 3D Interactive Functional Project Globe */
          <div className="space-y-4">
            <ProjectGlobe
              onSelectProject={(p) => setSelectedProject(p)}
              onToggleViewMode={() => setIsGridView(true)}
              isGridView={false}
            />
          </div>
        ) : (
          /* Conventional Project Grid View */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-sky-400" />
                FILTER BY ORBITAL BAND:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setActiveBandFilter("all")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeBandFilter === "all"
                      ? "bg-sky-600 text-white font-bold"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  ALL ORBITS
                </button>
                {PORTFOLIO_DATA.orbitalBands.map((band) => (
                  <button
                    key={band.id}
                    onClick={() => setActiveBandFilter(band.id)}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeBandFilter === band.id
                        ? "bg-sky-600 text-white font-bold"
                        : "bg-slate-900 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {band.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Distinctive Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenCaseStudy={(p) => setSelectedProject(p)}
                  index={idx}
                />
              ))}
            </div>
          </div>
        )}

        {/* Detailed Mission Dossier Case Study Dialog */}
        <ProjectDossier
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
