"use client";

import React from "react";
import { ArrowUpRight, GraduationCap, Briefcase } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ExperienceSection() {
  const { experience, education } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 mb-12">
        <span className="meta-mono">[04] // EXPERIENCE & ACADEMICS</span>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-[200] tracking-tight text-[#f4f4f6]">
          Leadership record & foundational training.
        </h2>
      </div>

      <div className="space-y-16">
        {/* Work Experience */}
        <div>
          <h3 className="meta-mono text-[#ff7a1a] mb-6 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>INDUSTRY LEADERSHIP</span>
          </h3>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {experience.map((item) => (
              <div key={item.company} className="py-8 md:py-10">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl sm:text-2xl font-[200] text-[#f4f4f6]">
                        {item.role}
                      </h4>
                      <span className="text-[#55555c]">&middot;</span>
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-light text-[#a0a0a8] hover:text-[#ff7a1a] transition-colors inline-flex items-center gap-1"
                      >
                        <span>{item.company}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#777780]" />
                      </a>
                    </div>
                    <p className="mt-2 text-sm text-[#888890] font-light max-w-2xl">
                      {item.summary}
                    </p>
                  </div>

                  <div className="text-left md:text-right shrink-0">
                    <span className="font-mono text-xs text-[#ff7a1a] block">
                      {item.period}
                    </span>
                    <span className="font-mono text-[11px] text-[#55555c]">
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Responsibilities list */}
                <ul className="mt-6 space-y-2 border-l border-white/[0.1] pl-4 max-w-3xl">
                  {item.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-[#8c8c94] font-light leading-relaxed">
                      <span className="text-[#ff7a1a] font-mono mr-2">&rsaquo;</span>
                      {resp}
                    </li>
                  ))}
                </ul>

                {/* Stack tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono text-[#888890] bg-white/[0.02] border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Foundation */}
        <div>
          <h3 className="meta-mono text-[#ff7a1a] mb-6 flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </h3>

          <div className="border-y border-white/[0.08] py-8 md:py-10">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <div>
                <h4 className="text-xl sm:text-2xl font-[200] text-[#f4f4f6]">
                  {education.degree}
                </h4>
                <p className="mt-1 text-sm text-[#a0a0a8] font-light">
                  {education.institution}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-[#ff7a1a]/10 border border-[#ff7a1a]/30 font-mono text-xs text-[#ff7a1a]">
                    CGPA: {education.cgpa} / {education.scale}
                  </span>
                  <span className="font-mono text-xs text-[#66666e]">
                    {education.location}
                  </span>
                </div>
              </div>

              <div className="text-left md:text-right shrink-0">
                <span className="font-mono text-xs text-[#d0d0d8] block">
                  {education.period}
                </span>
                {education.flaggedDateNotice && (
                  <span className="font-mono text-[10px] text-[#ff7a1a]/80 max-w-xs block mt-1">
                    * Date verified in config
                  </span>
                )}
              </div>
            </div>

            <ul className="mt-6 space-y-2 border-l border-white/[0.1] pl-4 max-w-3xl">
              {education.highlights.map((h, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-[#8c8c94] font-light">
                  <span className="text-[#ff7a1a] font-mono mr-2">&rsaquo;</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
