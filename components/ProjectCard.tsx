"use client";

import React from "react";
import { Project } from "@/data/portfolioData";
import { ProjectVisual } from "./ProjectVisuals";
import { ArrowUpRight, ExternalLink, BookOpen, Layers } from "lucide-react";
import { GithubIcon } from "./Icons";

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
  index: number;
}

export default function ProjectCard({ project, onOpenCaseStudy, index }: ProjectCardProps) {
  // Alternate highlight accents for visual diversity
  const accentBorders = [
    "hover:border-blue-400/50",
    "hover:border-cyan-400/50",
    "hover:border-violet-400/50",
    "hover:border-emerald-400/50",
  ];

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl bg-[#090E1F]/90 border border-slate-800/90 ${accentBorders[index % accentBorders.length]} transition-all duration-300 p-5 sm:p-6 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-blue-950/30 flex-1`}
    >
      {/* Top Header */}
      <div className="space-y-4">
        {/* Category & Status Bar */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-medium tracking-wider uppercase text-blue-400 bg-blue-500/10 border border-blue-500/25 px-2.5 py-0.5 rounded">
            {project.category}
          </span>
          {project.isRepoVerified ? (
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Verified Repo
            </span>
          ) : (
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
              Research Pipeline
            </span>
          )}
        </div>

        {/* Title and Tagline */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-slate-100 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
            {project.tagline}
          </p>
        </div>

        {/* Custom Visual Preview for this Project */}
        <div className="relative overflow-hidden rounded-xl">
          <ProjectVisual type={project.visualType} />
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
          {project.description}
        </p>

        {/* Key Highlights Bullet points */}
        <ul className="space-y-1.5 pt-1">
          {project.highlights.slice(0, 3).map((item, hIdx) => (
            <li key={hIdx} className="text-xs text-slate-400 flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="pt-5 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <button
          onClick={() => onOpenCaseStudy(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer group/btn"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Open Mission Dossier</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/40 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        )}
      </div>
    </article>
  );
}
