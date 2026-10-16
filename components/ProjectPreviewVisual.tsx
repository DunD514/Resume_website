"use client";

import React from "react";

interface ProjectPreviewVisualProps {
  type: "deepfake" | "dementia" | "sql" | "complisphere" | "aerospace";
}

export default function ProjectPreviewVisual({ type }: ProjectPreviewVisualProps) {
  switch (type) {
    case "deepfake":
      return (
        <div className="w-full h-full bg-[#0a0a0f] p-4 flex flex-col justify-between border border-white/[0.08]">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#888890] border-b border-white/[0.08] pb-2">
            <span className="text-[#ff7a1a]">VIDEOMAE // TEMPORAL TUBE</span>
            <span>16-FRAME WINDOW</span>
          </div>
          {/* Visual: Frame slices and temporal attention lines */}
          <div className="grid grid-cols-4 gap-1.5 my-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-[#12121c] border border-white/[0.1] relative flex items-center justify-center overflow-hidden"
              >
                <div
                  className="w-8 h-8 rounded-full border border-sky-400/40 opacity-70"
                  style={{ transform: `scale(${0.8 + i * 0.1})` }}
                />
                <span className="absolute bottom-1 right-1 text-[8px] font-mono text-[#555560]">
                  F{i * 4 + 1}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[9px] font-mono text-[#555560]">
            <span>COHERENCE ATTENTION: 0.94</span>
            <span className="text-emerald-400/80">INFERENCE READY</span>
          </div>
        </div>
      );

    case "dementia":
      return (
        <div className="w-full h-full bg-[#0a0a0f] p-4 flex flex-col justify-between border border-white/[0.08]">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#888890] border-b border-white/[0.08] pb-2">
            <span className="text-[#ff7a1a]">LONGITUDINAL COHORT</span>
            <span>RANDOM FOREST</span>
          </div>
          <div className="space-y-2 my-2">
            {[
              { label: "MMSE Score Delta", pct: 78 },
              { label: "CDR Progression Marker", pct: 64 },
              { label: "Hippocampal Volumetric Index", pct: 86 },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between text-[9px] font-mono text-[#9999a0] mb-0.5">
                  <span>{metric.label}</span>
                  <span>{metric.pct}%</span>
                </div>
                <div className="h-1 bg-white/[0.08] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-[#ff7a1a]"
                    style={{ width: `${metric.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-[9px] font-mono text-[#555560]">
            N-VISIT PREDICTIVE TRANSITION MODEL
          </div>
        </div>
      );

    case "sql":
      return (
        <div className="w-full h-full bg-[#0a0a0f] p-4 flex flex-col justify-between border border-white/[0.08]">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#888890] border-b border-white/[0.08] pb-2">
            <span className="text-[#ff7a1a]">DUCKDB ENGINE</span>
            <span>COLUMNAR EXECUTION</span>
          </div>
          <div className="bg-[#050508] p-2 border border-white/[0.06] font-mono text-[9px] text-[#888896] leading-tight space-y-1">
            <p className="text-sky-400">WITH ranked_skills AS (</p>
            <p className="pl-2">SELECT skill, DENSE_RANK() OVER (</p>
            <p className="pl-4 text-[#ff7a1a]">PARTITION BY role ORDER BY salary DESC</p>
            <p className="pl-2">) as premium FROM tech_market</p>
            <p className="text-sky-400">)</p>
          </div>
          <div className="flex justify-between text-[9px] font-mono text-[#555560]">
            <span>SCAN: 45,000 ROWS</span>
            <span>LATENCY: 12ms</span>
          </div>
        </div>
      );

    case "complisphere":
      return (
        <div className="w-full h-full bg-[#0a0a0f] p-4 flex flex-col justify-between border border-white/[0.08]">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#888890] border-b border-white/[0.08] pb-2">
            <span className="text-[#ff7a1a]">COMPLISPHERE // TEKKLOOM</span>
            <span>HYBRID RAG</span>
          </div>
          <div className="space-y-1.5 my-2">
            <div className="p-1.5 bg-[#14141e] border border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-[#d0d0d8]">
              <span>&sect; 508 Accessibility Mandate</span>
              <span className="text-[#ff7a1a]">0.96 Score</span>
            </div>
            <div className="p-1.5 bg-[#14141e] border border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-[#d0d0d8]">
              <span>WCAG 2.2 AA Contrast Criteria</span>
              <span className="text-[#ff7a1a]">0.91 Score</span>
            </div>
          </div>
          <div className="text-[9px] font-mono text-emerald-400/80">
            CITATION GROUNDING &middot; VERIFIED
          </div>
        </div>
      );

    case "aerospace":
      return (
        <div className="w-full h-full bg-[#0a0a0f] p-4 flex flex-col justify-between border border-white/[0.08]">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#888890] border-b border-white/[0.08] pb-2">
            <span className="text-[#ff7a1a]">ORBITAL EVENT CLASSIFIER</span>
            <span className="text-amber-500">PRIVATE RESEARCH</span>
          </div>
          <div className="relative h-20 my-1 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 200 80" className="w-full h-full stroke-current text-white/[0.2]">
              <path
                d="M 10 70 Q 70 10 130 35 T 190 20"
                fill="none"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <path
                d="M 10 70 Q 60 40 100 45 T 190 40"
                fill="none"
                stroke="#ff7a1a"
                strokeWidth="2"
              />
              <circle cx="100" cy="45" r="3.5" fill="#ff7a1a" />
            </svg>
          </div>
          <div className="flex justify-between text-[9px] font-mono text-[#555560]">
            <span>TRAJECTORY DELTA: VALIDATED</span>
            <span>STATE: LOCKED</span>
          </div>
        </div>
      );
  }
}
