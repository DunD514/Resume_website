"use client";

import React, { useState } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";
import ProjectPreviewVisual from "./ProjectPreviewVisual";

const CATEGORIES = ["All", "ML/DS", "Data Eng", "Applied AI", "Aero"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

export default function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  return (
    <section id="work" className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header & Category Filters */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/[0.08] pb-8 mb-4 gap-6">
        <div>
          <span className="meta-mono">[03] // SELECTED WORK</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-[200] tracking-tight text-[#f4f4f6]">
            Architected systems, models & analytical pipelines.
          </h2>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                  isActive
                    ? "bg-[#ff7a1a] border-[#ff7a1a] text-[#060608] font-semibold"
                    : "border-white/[0.1] text-[#888890] hover:text-[#f4f4f6] hover:border-white/[0.2]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Index Rows Container */}
      <div
        className="relative divide-y divide-white/[0.08] border-b border-white/[0.08]"
        onMouseLeave={() => setHoveredProject(null)}
      >
        {filteredProjects.map((project) => {
          const isHovered = hoveredProject?.id === project.id;
          const isDimmed = hoveredProject !== null && !isHovered;

          return (
            <div
              key={project.id}
              tabIndex={0}
              role="button"
              aria-label={`Open case study for ${project.title}`}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              onMouseEnter={() => setHoveredProject(project)}
              onFocus={() => setHoveredProject(project)}
              className={`group relative py-8 sm:py-10 md:py-12 px-2 transition-all duration-300 cursor-pointer outline-none ${
                isDimmed ? "opacity-30" : "opacity-100"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Number, Title & One-liner */}
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="font-mono text-xs sm:text-sm text-[#55555c] group-hover:text-[#ff7a1a] transition-colors pt-1">
                    {project.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-[200] tracking-tight text-[#f4f4f6] group-hover:translate-x-2 transition-transform duration-300">
                        {project.title}
                      </h3>
                      {project.isPrivate ? (
                        <Lock className="w-3.5 h-3.5 text-[#ff7a1a] shrink-0" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-[#55555c] group-hover:text-[#ff7a1a] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      )}
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-[#888890] font-light max-w-2xl leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Right: Tags & Year */}
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-8 self-start lg:self-center">
                  <div className="hidden sm:flex flex-wrap items-center gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] font-mono text-[#777780] border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="font-mono text-xs text-[#55555c] group-hover:text-[#a0a0a8] transition-colors">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Floating Inline Preview on Expansion */}
              {isHovered && (
                <div className="hidden xl:block absolute right-32 -top-16 z-20 w-80 h-44 shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                  <ProjectPreviewVisual type={project.visualType} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
