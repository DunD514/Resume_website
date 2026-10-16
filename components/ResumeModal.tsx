"use client";

import React, { useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { X, Download, Printer, ExternalLink, GraduationCap, Building2, Award, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./Icons";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { personal, experience, education, skills, projects } = PORTFOLIO_DATA;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#090E1F] border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-950/80 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toolbar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0B1024]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h2 id="resume-title" className="text-sm font-bold font-mono text-slate-200">
              DUNCAN_DLIMA_CURRICULUM_VITAE.PDF [PREVIEW]
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <a
              href={personal.resumePdfUrl}
              download="Duncan_DLima_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-all cursor-pointer shadow-sm shadow-sky-950/40"
              title="Download Resume PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document View */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8 bg-[#070B18] text-slate-200 font-sans print:bg-white print:text-black">
          {/* Resume Header */}
          <div className="border-b border-slate-800 pb-6 space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold font-['Space_Grotesk'] text-white print:text-black">
                  {personal.name}
                </h1>
                <p className="text-sm text-cyan-400 font-mono mt-1">
                  {personal.tagline}
                </p>
              </div>

              <div className="text-xs font-mono text-slate-400 space-y-1 text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{personal.location}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <a href={`mailto:${personal.publicEmailDisplay}`} className="hover:underline text-slate-300">
                    {personal.publicEmailDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <GithubIcon className="w-3.5 h-3.5 text-slate-500" />
                  <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-300">
                    github.com/DunD514
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-slate-800/80 pb-1">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-start text-sm">
                  <div>
                    <span className="font-bold text-white print:text-black">{edu.institution}</span>
                    <div className="text-xs text-slate-300">{edu.degree}</div>
                  </div>
                  <div className="text-right text-xs font-mono text-slate-400">
                    <div>{edu.period}</div>
                    <div className="text-cyan-300 font-bold">CGPA: {edu.cgpa} / {edu.maxCgpa}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 pt-1">
                  <strong>Coursework:</strong> {edu.coursework.join(" · ")}
                </div>
              </div>
            ))}
          </div>

          {/* Professional Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-slate-800/80 pb-1">
              Experience & Leadership
            </h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-start text-sm">
                  <div>
                    <span className="font-bold text-white print:text-black">{exp.role}</span> —{" "}
                    <span className="text-blue-400">{exp.company}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {exp.period} | {exp.location}
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic">
                  {exp.summary}
                </p>
                <ul className="space-y-1">
                  {exp.responsibilities.map((r, rIdx) => (
                    <li key={rIdx} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Selected Technical Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-slate-800/80 pb-1">
              Selected Technical Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-lg bg-slate-900/40 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-white print:text-black">{proj.title}</span>
                    <span className="text-[10px] font-mono text-blue-400">{proj.technologies.slice(0, 2).join(", ")}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {proj.description}
                  </p>
                  {proj.repoUrl && (
                    <span className="text-[10px] font-mono text-cyan-400 block truncate">
                      Repo: {proj.repoUrl}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Toolkit */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-slate-800/80 pb-1">
              Technical Toolkit & Competencies
            </h2>
            <div className="space-y-2 text-xs">
              {skills.map((cat) => (
                <div key={cat.id} className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-slate-300 sm:w-48 flex-shrink-0">
                    {cat.title}:
                  </span>
                  <span className="text-slate-400 font-mono">
                    {cat.skills.map((s) => s.name).join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#0B1024] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Source: Duncan D’Lima Portfolio</span>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Close Window [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
