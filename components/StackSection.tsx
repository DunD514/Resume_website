"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function StackSection() {
  const { stack } = PORTFOLIO_DATA;

  return (
    <section id="stack" className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="meta-mono">[05] // TECHNICAL STACK</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-[200] tracking-tight text-[#f4f4f6]">
            Curated toolkit for production engineering.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#888890] font-light max-w-xs">
          Zero vanity chips or decorative ratings. Only tools deployed across active systems.
        </p>
      </div>

      {/* Three Pillars (Data, Models, Systems) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-b border-white/[0.08] pb-16">
        {stack.pillars.map((pillar, idx) => (
          <div key={pillar.title} className="space-y-6">
            <div className="border-b border-white/[0.08] pb-4">
              <span className="font-mono text-xs text-[#ff7a1a]">0{idx + 1} //</span>
              <h3 className="text-2xl font-[200] text-[#f4f4f6] mt-1">{pillar.title}</h3>
              <p className="text-xs text-[#6e6e78] font-mono mt-0.5">{pillar.subtitle}</p>
            </div>

            <ul className="space-y-3">
              {pillar.items.map((item) => (
                <li
                  key={item}
                  className="group flex items-baseline justify-between text-base md:text-lg font-[200] text-[#c0c0c8] hover:text-white transition-colors"
                >
                  <span>{item}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/[0.1] group-hover:bg-[#ff7a1a] transition-colors" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Tools Row */}
      <div className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="meta-mono text-[#55555c]">CORE WORKFLOW TOOLS</span>
        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-mono text-[#8c8c96]">
          {stack.tools.map((tool) => (
            <span key={tool} className="hover:text-[#ff7a1a] transition-colors">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
