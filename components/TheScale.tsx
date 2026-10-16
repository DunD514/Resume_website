"use client";

import React, { useState } from "react";
import ScaleCanvas from "./ScaleCanvas";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function TheScale() {
  const [activePillar, setActivePillar] = useState<"data" | "models" | "systems" | null>(null);

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Background Generative Visuals that Crossfade on Row Hover */}
      <ScaleCanvas activePillar={activePillar} />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-8 mb-4">
        <div>
          <span className="meta-mono">[02] // THE SCALE</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-[200] tracking-tight text-[#f4f4f6]">
            Architectural discipline across three layers.
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-xs sm:text-sm text-[#888890] font-light max-w-xs">
          Hover or tap any layer to observe its engineering mechanics and specialized toolkit.
        </p>
      </div>

      {/* Three Stacked Rows (Directly inspired by reference video mechanic) */}
      <div
        className="relative z-10 divide-y divide-white/[0.08] border-b border-white/[0.08]"
        onMouseLeave={() => setActivePillar(null)}
      >
        {PORTFOLIO_DATA.scale.map((pillar, idx) => {
          const isCurrentActive = activePillar === pillar.id;
          const isAnyActive = activePillar !== null;
          const isDimmed = isAnyActive && !isCurrentActive;

          return (
            <div
              key={pillar.id}
              tabIndex={0}
              role="button"
              aria-expanded={isCurrentActive}
              onMouseEnter={() => setActivePillar(pillar.id)}
              onFocus={() => setActivePillar(pillar.id)}
              onClick={() => setActivePillar(isCurrentActive ? null : pillar.id)}
              className={`group py-12 md:py-16 transition-all duration-500 cursor-pointer outline-none ${
                isDimmed ? "opacity-25" : "opacity-100"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
                {/* Left: Number & Layer Title */}
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-mono text-xs md:text-sm text-[#55555c] group-hover:text-[#ff7a1a] transition-colors">
                    0{idx + 1}
                  </span>
                  <h3 className="text-4xl sm:text-6xl md:text-7xl font-[200] tracking-tight text-[#f4f4f6] group-hover:translate-x-2 transition-transform duration-300">
                    {pillar.title}
                  </h3>
                </div>

                {/* Right: Core Statement */}
                <div className="max-w-xl">
                  <p className="text-xl sm:text-2xl font-[200] text-[#e0e0e6] tracking-tight">
                    {pillar.statement}
                  </p>
                  <p className="mt-2 text-sm text-[#888890] font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Revealed Plain-Text Skills on Hover/Focus */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  isCurrentActive ? "max-h-24 opacity-100 pt-8" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-wider text-[#ff7a1a]">
                  <span className="text-[#55555c] lowercase font-normal">core toolkit //</span>
                  {pillar.skills.map((skill) => (
                    <span key={skill} className="text-[#f4f4f6] font-normal">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Core Engineering Philosophy Beneath: Three Concise Sentences */}
      <div className="relative z-10 pt-16 md:pt-20">
        <span className="meta-mono text-[#55555c]">CORE PHILOSOPHY</span>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-sm md:text-base font-[200] leading-relaxed text-[#a0a0a8]">
          {PORTFOLIO_DATA.philosophy.map((item, index) => {
            const [boldPart, rest] = item.split(":");
            return (
              <div key={index} className="border-l border-white/[0.12] pl-5">
                <span className="text-[#f4f4f6] font-normal block mb-1">{boldPart}</span>
                <span className="text-[#888890]">{rest}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
