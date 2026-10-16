"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import HeroCanvas from "./HeroCanvas";
import { ArrowDownRight, ArrowUpRight, Sparkles, Terminal, Activity, Layers } from "lucide-react";
import { GithubIcon } from "./Icons";

export default function Hero() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden tech-grid-pattern"
      aria-label="Hero Introduction"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-600/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-140px)]">
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            {/* Eyebrow and Status */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-blue-400 bg-blue-500/10 border border-blue-500/25">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                DATA SCIENCE · APPLIED AI · SOFTWARE
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-slate-900/60 border border-slate-700/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {personal.statusBadge}
              </span>
            </div>

            {/* Main Headings */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-['Space_Grotesk'] text-slate-100">
                Hi, I’m <span className="text-gradient-primary">Duncan.</span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-gradient-accent leading-snug">
                {personal.shortBio}
              </p>
            </div>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl leading-relaxed font-light">
              {personal.longBio}
            </p>

            {/* Key Technical Positioning Badges */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-900/70 border border-slate-800">
                • PyTorch & Transformers
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/70 border border-slate-800">
                • DuckDB & Analytical SQL
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/70 border border-slate-800">
                • Next.js & Full-Stack AI
              </span>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-600/25 border border-blue-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore My Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/70 hover:bg-slate-800/80 border border-slate-700/60 hover:border-blue-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Let’s Connect</span>
              </a>

              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs text-slate-400 hover:text-white bg-transparent hover:bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                title="View GitHub @DunD514"
              >
                <GithubIcon className="w-4 h-4 text-slate-300" />
                <span>DunD514</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Right Column: Immersive 3D Data Network & Floating Technical Panels */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] lg:min-h-[560px]">
            {/* The 3D Particle Data Globe Canvas */}
            <div className="w-full h-[400px] sm:h-[480px] lg:h-[540px] relative rounded-3xl overflow-hidden border border-blue-500/20 bg-gradient-to-b from-[#0B1020]/80 to-[#050812]/90 shadow-2xl shadow-blue-950/40">
              <HeroCanvas />

              {/* Technical Canvas Overlay HUD Annotations */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-cyan-500/30">
                  <Activity className="w-3 h-3 animate-spin text-cyan-400" />
                  <span>DATA GRAPH :: LIVE TOPOLOGY</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <div className="text-[10px] font-mono text-slate-400/80 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
                  COORD: 19.0760° N, 72.8777° E [MUMBAI]
                </div>
              </div>

              {/* Floating Technical Glass Cards with Real Context */}
              <div className="absolute -top-3 -right-2 sm:right-4 z-20 max-w-[210px] glass-panel p-3 rounded-xl border border-blue-500/30 shadow-lg shadow-black/40 animate-pulse-subtle pointer-events-auto">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-[11px] font-mono font-semibold text-slate-200">
                    VideoMAE Pipeline
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Spatiotemporal self-attention for authentic video verification.
                </p>
              </div>

              <div className="absolute bottom-8 right-2 sm:right-4 z-20 max-w-[220px] glass-panel p-3 rounded-xl border border-violet-500/30 shadow-lg shadow-black/40 pointer-events-auto">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                  <span className="text-[11px] font-mono font-semibold text-slate-200">
                    DuckDB Analytical OLAP
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  High-speed SQL queries mining skill & compensation distributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
