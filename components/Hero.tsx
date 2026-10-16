"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Background Interactive Stardust Canvas */}
      <HeroCanvas />

      {/* Top Metadata Marker */}
      <div className="relative z-10 pt-4 md:pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a1a]" />
          <span className="meta-mono">
            {PORTFOLIO_DATA.personal.location} &middot; AVAILABLE FOR SELECT INITIATIVES
          </span>
        </div>
        <span className="hidden sm:inline meta-mono text-[#55555c]">
          PORTFOLIO &middot; 2026
        </span>
      </div>

      {/* Main Display Headline */}
      <div className="relative z-10 my-auto py-12 md:py-20 max-w-5xl">
        <h1 className="text-[12vw] sm:text-[9vw] lg:text-[7.5vw] font-[200] tracking-[-0.035em] leading-[0.98] text-[#f4f4f6] select-none">
          From raw data to{" "}
          <span className="font-[300] text-[#ff7a1a] transition-colors duration-500">
            real-world systems.
          </span>
        </h1>

        <p className="mt-8 text-lg sm:text-2xl md:text-3xl text-[#92929a] font-[200] max-w-2xl tracking-[-0.015em] leading-relaxed">
          {PORTFOLIO_DATA.personal.subheadline}
        </p>

        {/* Credentials Pill-Free Row */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-light text-[#73737c]">
          {PORTFOLIO_DATA.personal.badges.map((badge, idx) => (
            <React.Fragment key={badge}>
              <span className="text-[#a5a5ae] hover:text-white transition-colors">
                {badge}
              </span>
              {idx < PORTFOLIO_DATA.personal.badges.length - 1 && (
                <span className="text-[#3e3e44] hidden sm:inline">&middot;</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="#work"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#f4f4f6] text-[#060608] hover:bg-[#ff7a1a] hover:text-white transition-all duration-300 text-xs font-mono uppercase tracking-widest font-semibold"
          >
            <span>See the work</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>

          <a
            href={PORTFOLIO_DATA.personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3.5 border border-white/[0.14] text-[#d4d4d8] hover:border-white hover:text-white transition-all duration-300 text-xs font-mono uppercase tracking-widest"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#888890] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </a>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Coordinates */}
      <div className="relative z-10 flex items-end justify-between border-t border-white/[0.08] pt-6">
        <span className="meta-mono text-[#55555c]">
          [01] // SCALE &middot; WORK &middot; SYSTEM
        </span>

        <a
          href="#scale"
          className="meta-mono text-[#888890] hover:text-[#ff7a1a] transition-colors flex items-center gap-2"
        >
          <span>SCROLL TO SCALE</span>
          <ArrowDown className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
