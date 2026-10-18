"use client";

import React, { useState } from "react";
import { UnifiedProject } from "@/lib/projects";
import { ExternalLink, Star, GitFork, ArrowUpRight, ShieldCheck, FileText } from "lucide-react";

interface ProjectDossierAppProps {
  project: UnifiedProject | null;
  onSelectOtherProject?: (project: UnifiedProject) => void;
}

export default function ProjectDossierApp({ project }: ProjectDossierAppProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "caseStudy" | "readme">("overview");

  if (!project) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#1e1e1e] text-white/50 text-center font-sans">
        <FileText className="w-12 h-12 text-white/20 mb-3" />
        <h3 className="text-base font-medium text-white/70">No Project Dossier Selected</h3>
        <p className="text-xs max-w-sm mt-1 text-white/40">
          Select any project in Finder or Orbit Explorer to inspect its architecture, telemetry, and source code.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-white/90 select-none overflow-hidden font-sans">
      {/* Dossier Window Header */}
      <div className="flex-none h-12 px-5 bg-[#252528] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0">
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {project.primaryCategoryLabel}
          </span>
          <h2 className="text-sm font-semibold text-white truncate">{project.name}</h2>
        </div>

        <div className="flex items-center space-x-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1 rounded bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition"
            >
              <span>Live System</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-none h-9 px-5 bg-[#1f2024] border-b border-white/10 flex items-center space-x-1 text-xs">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-3 py-1 rounded-md font-medium transition ${
            activeTab === "overview"
              ? "bg-white/15 text-white"
              : "text-white/60 hover:text-white/90"
          }`}
        >
          Overview & Telemetry
        </button>
        {project.caseStudy && (
          <button
            onClick={() => setActiveTab("caseStudy")}
            className={`px-3 py-1 rounded-md font-medium transition ${
              activeTab === "caseStudy"
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white/90"
            }`}
          >
            Engineering Case Study
          </button>
        )}
        {project.readmeExcerpt && (
          <button
            onClick={() => setActiveTab("readme")}
            className={`px-3 py-1 rounded-md font-medium transition ${
              activeTab === "readme"
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white/90"
            }`}
          >
            README Documentation
          </button>
        )}
      </div>

      {/* Main Dossier Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 select-text">
        {activeTab === "overview" && (
          <>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">{project.name}</h3>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                {project.description || "Production repository by Duncan D'Lima."}
              </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/40 block text-[10px] uppercase font-semibold">Primary Stack</span>
                <span className="font-mono text-cyan-400 font-semibold">{project.language || "Python"}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/40 block text-[10px] uppercase font-semibold">GitHub Stars</span>
                <span className="font-mono text-amber-400 font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {project.stars}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/40 block text-[10px] uppercase font-semibold">Repository Forks</span>
                <span className="font-mono text-blue-400 font-semibold flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {project.forks}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/40 block text-[10px] uppercase font-semibold">Architecture</span>
                <span className="font-mono text-emerald-400 font-semibold truncate block">
                  {project.primaryCategoryLabel}
                </span>
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                Technologies & Frameworks
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-white/10 text-white/80 font-mono text-[11px] border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Architectural Highlights */}
            {project.caseStudy?.result && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                  Verified Technical Result
                </h4>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-white/90">{project.caseStudy.result}</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "caseStudy" && project.caseStudy && (
          <div className="space-y-6 text-xs leading-relaxed">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
                01 // Architectural Problem & Challenge
              </h4>
              <p className="text-white/80 bg-white/5 p-4 rounded-xl border border-white/10">
                {project.caseStudy.problem}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
                02 // Systems Engineering Approach
              </h4>
              <p className="text-white/80 bg-white/5 p-4 rounded-xl border border-white/10">
                {project.caseStudy.approach}
              </p>
            </div>

            {project.caseStudy.architecture && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
                  03 // Architecture & Dataflow
                </h4>
                <div className="text-white/80 bg-white/5 p-4 rounded-xl border border-white/10 space-y-1 font-mono text-[11px]">
                  {project.caseStudy.architecture.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">&gt;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "readme" && (
          <div className="bg-[#14151a] p-5 rounded-xl border border-white/10 font-mono text-xs text-white/80 whitespace-pre-wrap leading-relaxed">
            {project.readmeExcerpt || "No README cached for this repository."}
          </div>
        )}
      </div>
    </div>
  );
}
