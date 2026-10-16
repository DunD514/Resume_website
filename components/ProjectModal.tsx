"use client";

import React, { useEffect } from "react";
import { X, ArrowUpRight, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { ProjectItem } from "@/data/portfolioData";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#060608]/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#09090d] border border-white/[0.12] p-6 sm:p-10 md:p-12 my-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header row */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#ff7a1a]">PROJECT {project.number}</span>
              <span className="text-[#44444a]">&middot;</span>
              <span className="meta-mono">{project.categoryLabel}</span>
              <span className="text-[#44444a]">&middot;</span>
              <span className="meta-mono">{project.year}</span>
            </div>
            <h3 id="modal-title" className="mt-2 text-2xl sm:text-3xl md:text-4xl font-[200] tracking-tight text-[#f4f4f6]">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-[#888890] font-light max-w-xl">
              {project.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#888890] hover:text-white border border-white/[0.08] hover:border-white/[0.2] transition-colors"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Case Study Content */}
        <div className="mt-8 space-y-8 max-h-[65vh] overflow-y-auto pr-2">
          {/* 1. Problem */}
          <div>
            <h4 className="meta-mono text-[#ff7a1a]">01 // THE PROBLEM</h4>
            <p className="mt-2 text-sm sm:text-base font-light text-[#c8c8d0] leading-relaxed">
              {project.caseStudy.problem}
            </p>
          </div>

          {/* 2. Approach */}
          <div>
            <h4 className="meta-mono text-[#ff7a1a]">02 // ARCHITECTURAL APPROACH</h4>
            <p className="mt-2 text-sm sm:text-base font-light text-[#c8c8d0] leading-relaxed">
              {project.caseStudy.approach}
            </p>
            {project.caseStudy.architecture.length > 0 && (
              <ul className="mt-4 space-y-2 border-l border-white/[0.12] pl-4">
                {project.caseStudy.architecture.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-[#8c8c94] font-light">
                    <span className="text-[#ff7a1a] font-mono mr-2">&rsaquo;</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 3. Stack */}
          <div>
            <h4 className="meta-mono text-[#ff7a1a]">03 // TECHNICAL STACK</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.caseStudy.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#f4f4f6]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Results & Metrics (Honest: no invented figures) */}
          <div>
            <h4 className="meta-mono text-[#ff7a1a]">04 // BENCHMARKS & RESULTS</h4>
            {project.caseStudy.result ? (
              <div className="mt-2 p-4 bg-white/[0.02] border border-white/[0.08] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#ff7a1a] shrink-0 mt-0.5" />
                <p className="text-sm text-[#e0e0e8] font-light leading-relaxed">
                  {project.caseStudy.result}
                </p>
              </div>
            ) : (
              <div className="mt-2 p-4 bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#777780] shrink-0 mt-0.5" />
                <p className="text-xs text-[#888890] font-light leading-relaxed">
                  Quantitative benchmark validation undergoing peer-reviewed cohort testing. Metrics omitted per engineering integrity standards until finalized.
                </p>
              </div>
            )}
          </div>

          {/* 5. Limitations */}
          {project.caseStudy.limitations && (
            <div>
              <h4 className="meta-mono text-[#888890]">05 // KNOWN LIMITATIONS</h4>
              <p className="mt-2 text-xs sm:text-sm text-[#808088] font-light leading-relaxed">
                {project.caseStudy.limitations}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
          <div>
            {project.isPrivate ? (
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#888890]">
                <Lock className="w-3.5 h-3.5 text-[#ff7a1a]" />
                <span>Research &middot; Private Repository</span>
              </div>
            ) : project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.16] hover:border-[#ff7a1a] hover:text-[#ff7a1a] text-xs font-mono uppercase tracking-wider text-[#f4f4f6] transition-colors"
              >
                <span>View Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono uppercase tracking-wider text-[#888890] hover:text-white transition-colors"
          >
            Close [Esc]
          </button>
        </div>
      </div>
    </div>
  );
}
