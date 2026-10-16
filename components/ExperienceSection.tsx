"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { 
  Building2, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  ExternalLink, 
  Award, 
  BookOpen, 
  Radio, 
  Terminal 
} from "lucide-react";

export default function ExperienceSection() {
  const { experience, education } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-24 relative bg-[#02040A]" aria-label="Flight Record and Education">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-sky-400 bg-sky-500/10 border border-sky-500/25">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            FLIGHT RECORD // LEADERSHIP & ACADEMY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-slate-100">
            Career & <span className="text-telemetry-gradient">Academic Path</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            Combining rigorous mathematical foundations in Data Science from NMIMS with technical leadership as CTO & Co-Founder at Tekkloom.
          </p>
        </div>

        {/* Two Column Grid: Flight Experience on Left, Academy Education on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Professional Leadership Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 font-mono text-xs text-sky-400 font-bold">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>COMMAND ROLE // TEKKLOOM</span>
            </div>

            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="mission-panel p-6 sm:p-7 rounded-2xl border border-sky-500/20 space-y-5"
              >
                {/* Header with Title and Current Tag */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xl font-bold font-['Space_Grotesk'] text-slate-100">
                        {exp.role}
                      </h4>
                      {exp.isCurrent && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Active Command
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 font-mono text-xs">
                      <span className="text-sky-400 font-semibold">
                        {exp.company}
                      </span>
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                          title="Tekkloom GitHub Organization"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 text-right text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Summary Quote */}
                <p className="text-xs sm:text-sm text-slate-300 italic border-l-2 border-sky-500/60 pl-3 font-light">
                  &ldquo;{exp.summary}&rdquo;
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    Core Technical Directives & Responsibilities:
                  </span>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug font-light">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Academic Education Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 font-mono text-xs text-sky-400 font-bold">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>ACADEMY FOUNDATION // NMIMS</span>
            </div>

            {education.map((edu, idx) => (
              <div
                key={idx}
                className="mission-panel p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-5"
              >
                {/* Degree & Institution */}
                <div>
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-xs text-sky-400 font-semibold">
                      UNDERGRADUATE DEGREE
                    </span>
                    <span className="text-xs text-slate-400">
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold font-['Space_Grotesk'] text-slate-100 mt-1">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 font-medium font-sans">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-mono">
                    <MapPin className="w-3 h-3" />
                    {edu.location}
                  </p>
                </div>

                {/* Flight Rating / CGPA Card */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-sky-950/40 to-slate-900/60 border border-sky-500/30 flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Cumulative Flight GPA</span>
                    <div className="text-2xl font-bold text-cyan-300">
                      {edu.cgpa} <span className="text-xs text-slate-400 font-normal">/ {edu.maxCgpa}</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-sky-500/10 text-cyan-400 border border-sky-500/30">
                    <Award className="w-5 h-5" />
                  </div>
                </div>

                {/* Key Coursework Modules */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                    Core Coursework Disciplines:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {edu.coursework.map((course, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 leading-tight font-mono"
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Highlights */}
                <ul className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {edu.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span className="font-light">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
