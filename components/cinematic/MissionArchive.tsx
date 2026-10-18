"use client";

import React, { useState } from "react";
import { ArrowUpRight, Lock, Search, FileText } from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";
import ProjectModal from "../ProjectModal";
import ExperienceSection from "../ExperienceSection";
import StackSection from "../StackSection";
import GitHubSection from "../GitHubSection";
import ContactSection from "../ContactSection";

export default function MissionArchive() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="archive" className="relative w-full bg-[#040508] text-[#f4f4f6]">
      {/* Archive Header */}
      <div className="pt-28 pb-12 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]">
        <span className="meta-mono text-[#ff7a1a]">ACT 03 // MISSION ARCHIVE</span>
        <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-[200] tracking-tight text-[#f4f4f6]">
          Verified Technical Dossiers & Projects.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-[#888890] max-w-2xl leading-relaxed">
          Comprehensive engineering records across machine learning, analytical data pipelines, and intelligent software systems.
        </p>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.03] p-1 border border-white/[0.08]">
            {["All", "ML/DS", "Data Eng", "Applied AI", "Aero"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeCategory === cat
                    ? "bg-[#ff7a1a] text-[#060608] font-semibold"
                    : "text-[#888890] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#666670] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dossier records..."
              className="w-full bg-[#08090e] border border-white/[0.1] pl-9 pr-3 py-1.5 text-xs text-[#f4f4f6] placeholder-[#555560] font-mono focus:border-[#ff7a1a] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Technical Dossier Grid */}
      <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#08090e] border border-white/[0.08] hover:border-[#ff7a1a]/50 p-6 sm:p-8 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-mono text-[#888890]">
                  <span className="text-[#ff7a1a]">DOSSIER {project.number}</span>
                  <span>{project.categoryLabel}</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="mt-4 text-2xl font-[200] text-[#f4f4f6] group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-light text-[#92929e] leading-relaxed">
                  {project.tagline}
                </p>

                {/* Technical Problem Summary */}
                <div className="mt-5 p-3.5 bg-white/[0.02] border-l-2 border-[#ff7a1a] text-xs font-light text-[#b0b0b8] leading-relaxed">
                  <span className="meta-mono text-[#ff7a1a] block mb-1">CHALLENGE & SCOPE</span>
                  {project.caseStudy.problem}
                </div>

                {/* Tech tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] font-mono text-[#8c8c96] bg-white/[0.03] border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#ff7a1a] hover:underline font-medium"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Inspect Case Study</span>
                </button>

                {project.isPrivate ? (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#888890]">
                    <Lock className="w-3 h-3 text-[#ff7a1a]" />
                    <span>Private Research</span>
                  </div>
                ) : project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-[#888890] hover:text-white transition-colors"
                  >
                    <span>Repository</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Experience, Foundations, Stack, GitHub, and Contact */}
      <ExperienceSection />
      <StackSection />
      <GitHubSection />
      <ContactSection />
    </div>
  );
}
