"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Database, Brain, Code2, Rocket, ArrowRight } from "lucide-react";

export default function InteractivePipeline() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const phases = PORTFOLIO_DATA.pipelinePhases;

  const icons = [Database, Brain, Code2, Rocket];
  const activePhase = phases[activePhaseIndex];
  const ActiveIcon = icons[activePhaseIndex];

  return (
    <div className="w-full mission-panel p-6 sm:p-7 rounded-2xl border border-sky-500/20 space-y-6 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-sky-400 font-bold block">
            SYSTEMIC ARCHITECTURE
          </span>
          <h3 className="text-base font-bold font-['Space_Grotesk'] text-slate-100 font-sans">
            End-to-End Flight Pipeline
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          STAGE 0{activePhaseIndex + 1} / 0{phases.length}
        </span>
      </div>

      {/* Interactive Phase Flow Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {phases.map((phase, idx) => {
          const Icon = icons[idx];
          const isActive = idx === activePhaseIndex;
          return (
            <button
              key={phase.id}
              onClick={() => setActivePhaseIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? "bg-sky-500/15 border-sky-400 text-sky-300 shadow-sm"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold ${isActive ? "text-cyan-400" : "text-slate-500"}`}>
                  {phase.phase}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? "text-sky-400" : "text-slate-500"}`} />
              </div>
              <div className={`text-xs font-semibold font-sans ${isActive ? "text-slate-100" : "text-slate-300"}`}>
                {phase.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive Card */}
      <div className="p-5 rounded-xl bg-[#050813] border border-sky-500/25 space-y-4 animate-in fade-in duration-200">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-400/30 text-sky-400">
            <ActiveIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-sky-400 font-medium font-mono">
              {activePhase.subtitle}
            </div>
            <h4 className="text-base font-bold text-slate-100 font-['Space_Grotesk'] font-sans">
              {activePhase.title}
            </h4>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-light">
          {activePhase.description}
        </p>

        {/* Tools utilized in this phase */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[10px] uppercase text-slate-400 tracking-wider">
            Utilized Toolkit:
          </span>
          {activePhase.tools.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-cyan-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
