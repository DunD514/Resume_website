"use client";

import React, { useEffect, useState } from "react";
import { Project } from "@/data/portfolioData";
import { ProjectVisual } from "./ProjectVisuals";
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers, 
  Database, 
  Cpu, 
  Radio, 
  AlertTriangle, 
  CheckCircle, 
  Code, 
  Compass, 
  FileText 
} from "lucide-react";
import { GithubIcon } from "./Icons";

interface ProjectDossierProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDossier({ project, onClose }: ProjectDossierProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const copyCode = () => {
    if (project.dossier.sourceCodeSnippet) {
      navigator.clipboard.writeText(project.dossier.sourceCodeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#02040A]/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-title"
    >
      <div
        className="relative w-full max-w-5xl bg-[#070B18] border border-sky-500/30 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mission Dossier Telemetry Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0A0F22]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-sky-400">
              MISSION DOSSIER // {project.callsign}
            </span>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              [{project.orbitalBandLabel}]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[82vh] overflow-y-auto font-sans">
          {/* Title & Metadata Ribbon */}
          <div className="space-y-3 border-b border-slate-800/80 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase text-sky-400 font-semibold">
                  {project.category}
                </span>
                <h2 id="dossier-title" className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-100 mt-0.5">
                  {project.title}
                </h2>
                <p className="text-sm text-slate-300 font-light mt-1">
                  {project.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all shadow-md shadow-sky-950/40"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Experimental Research Pipeline</span>
                  </div>
                )}
              </div>
            </div>

            {/* Visual Telemetry Preview */}
            <div className="pt-2">
              <ProjectVisual type={project.visualType} />
            </div>
          </div>

          {/* 1. Mission Brief */}
          <div className="space-y-2 p-5 rounded-xl bg-[#050813] border border-slate-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              1. Mission Brief & Problem Statement
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {project.dossier.missionBrief}
            </p>
          </div>

          {/* 2. Data Sources & Provenance */}
          <div className="space-y-2 p-5 rounded-xl bg-[#050813] border border-slate-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              2. Data Sources & Provenance
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {project.dossier.dataSources}
            </p>
          </div>

          {/* 3. System Architecture */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              3. System Architecture & Pipeline Flow
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
              {project.dossier.systemArchitecture.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#050813] border border-slate-800 flex flex-col justify-between space-y-2"
                >
                  <span className="text-xs font-bold text-sky-400">
                    PHASE 0{idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Implementation Parameters */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              4. Implementation Decisions & Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
              {project.dossier.implementation.map((param, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#050813] border border-slate-800 flex items-center justify-between"
                >
                  <span className="text-slate-400">{param.label}</span>
                  <span className="font-semibold text-slate-200 text-right">{param.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Evaluation Findings & Metrics */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-sky-950/30 via-slate-900/40 to-transparent border border-sky-500/25 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              5. Evaluation & Observed Findings
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {project.dossier.evaluation}
            </p>
          </div>

          {/* 6. Known Constraints & Limitations */}
          <div className="p-5 rounded-xl bg-amber-950/15 border border-amber-500/25 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              6. Known Limitations & Unresolved Constraints
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {project.dossier.limitations}
            </p>
          </div>

          {/* 7. Source Code Snippet */}
          {project.dossier.sourceCodeSnippet && (
            <div className="space-y-2 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-sky-400" />
                  {project.dossier.sourceCodeSnippet.title}
                </span>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#02040A] border border-slate-800 overflow-x-auto text-xs text-slate-300 leading-relaxed">
                <pre>{project.dossier.sourceCodeSnippet.code}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Dossier Footer */}
        <div className="px-6 py-4 bg-[#0A0F22] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>CLASSIFICATION: TECHNICAL PORTFOLIO // DUNCAN D’LIMA</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close Dossier [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
