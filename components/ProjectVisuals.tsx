"use client";

import React, { useState } from "react";
import { Terminal, Database, Activity, FileCheck, Layers, Scan, Brain, BarChart3, Search, Check, AlertCircle } from "lucide-react";

export function DeepfakeVisual() {
  const [activeFrame, setActiveFrame] = useState(2);
  const frames = [
    { t: "0.0s", label: "Frame 01", conf: "99.1% Authentic" },
    { t: "0.2s", label: "Frame 04", conf: "98.7% Authentic" },
    { t: "0.4s", label: "Frame 08", conf: "98.9% Authentic" },
    { t: "0.6s", label: "Frame 12", conf: "99.2% Authentic" },
    { t: "0.8s", label: "Frame 16", conf: "98.4% Authentic" },
  ];

  return (
    <div className="relative w-full h-56 bg-[#080D1A] rounded-xl overflow-hidden border border-blue-500/20 p-3 flex flex-col justify-between font-mono">
      {/* Top HUD */}
      <div className="flex items-center justify-between text-[11px] border-b border-blue-500/20 pb-2">
        <div className="flex items-center gap-1.5 text-blue-400">
          <Scan className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>VIDEOMAE :: SPATIOTEMPORAL TUBE SCAN</span>
        </div>
        <span className="text-slate-400 text-[10px]">DATASET: FaceForensics++</span>
      </div>

      {/* Center Simulated CV Viewport */}
      <div className="relative my-2 flex-1 rounded-lg bg-[#050811] border border-slate-800 flex items-center justify-center overflow-hidden">
        {/* Subtle grid and radar scan line */}
        <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-75 animate-[pulseSubtle_2.5s_infinite]" style={{ left: `${20 + activeFrame * 15}%` }} />

        {/* Abstract Facial Landmarks Matrix */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-28 h-28 border border-blue-500/30 rounded-2xl flex items-center justify-center bg-blue-950/20">
            {/* Target Face Boundary */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

            {/* Landmark nodes */}
            <div className="grid grid-cols-3 gap-3">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === 4 ? "bg-cyan-400 scale-125" : "bg-blue-400/80"
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-1 text-[9px] text-cyan-300 font-mono tracking-tighter">
              LANDMARK CONSISTENCY: 0.984
            </div>
          </div>
        </div>

        {/* Right HUD info */}
        <div className="absolute right-3 top-3 text-[10px] space-y-1 text-right text-slate-400">
          <div>TEMPORAL STRIDE: <span className="text-blue-300">2 frames</span></div>
          <div>ATTN HEADS: <span className="text-violet-300">12 (3D)</span></div>
          <div>LABEL: <span className="text-emerald-400 font-bold">PRISTINE</span></div>
        </div>
      </div>

      {/* Bottom Frame Scrubbing Bar */}
      <div className="flex items-center gap-1.5 pt-1">
        <span className="text-[9px] text-slate-500 uppercase tracking-widest mr-1">Frames</span>
        {frames.map((frame, idx) => (
          <button
            key={idx}
            onClick={() => setActiveFrame(idx)}
            className={`flex-1 py-1 rounded text-[10px] transition-all cursor-pointer ${
              activeFrame === idx
                ? "bg-blue-600/30 border border-blue-400 text-cyan-300 shadow-sm shadow-blue-500/20"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            {frame.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsVisual() {
  const skills = [
    { name: "SQL", demand: 86, salary: "$118K", color: "from-blue-500 to-cyan-400" },
    { name: "Python", demand: 82, salary: "$124K", color: "from-indigo-500 to-blue-400" },
    { name: "DuckDB/OLAP", demand: 68, salary: "$136K", color: "from-violet-500 to-purple-400" },
    { name: "AWS / Cloud", demand: 62, salary: "$132K", color: "from-amber-500 to-orange-400" },
    { name: "Tableau/BI", demand: 54, salary: "$105K", color: "from-emerald-500 to-teal-400" },
  ];

  return (
    <div className="relative w-full h-56 bg-[#080D1A] rounded-xl overflow-hidden border border-blue-500/20 p-3 flex flex-col justify-between font-mono">
      {/* Top HUD */}
      <div className="flex items-center justify-between text-[11px] border-b border-blue-500/20 pb-2">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          <span>DUCKDB :: AGGREGATED JOB MARKET OLAP</span>
        </div>
        <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          VERIFIED REPO
        </span>
      </div>

      {/* Chart Section */}
      <div className="my-2 space-y-2 flex-1 flex flex-col justify-center">
        {skills.map((item, idx) => (
          <div key={idx} className="space-y-0.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-300 font-medium">{item.name}</span>
              <div className="flex gap-3 text-slate-400">
                <span>Demand: <strong className="text-cyan-300">{item.demand}%</strong></span>
                <span>Median: <strong className="text-slate-200">{item.salary}</strong></span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                style={{ width: `${item.demand}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Query Snippet Footer */}
      <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-800/80">
        <span className="text-blue-400 truncate">
          SELECT skill_name, AVG(salary_year_avg) FROM job_postings...
        </span>
        <span className="text-slate-500 ml-2">OLAP Latency: 12ms</span>
      </div>
    </div>
  );
}

export function AlzheimersVisual() {
  return (
    <div className="relative w-full h-56 bg-[#080D1A] rounded-xl overflow-hidden border border-violet-500/20 p-3 flex flex-col justify-between font-mono">
      {/* Top HUD */}
      <div className="flex items-center justify-between text-[11px] border-b border-violet-500/20 pb-2">
        <div className="flex items-center gap-1.5 text-violet-400">
          <Brain className="w-3.5 h-3.5 text-violet-400" />
          <span>LONGITUDINAL CLINICAL COHORT EDA</span>
        </div>
        <span className="text-slate-400 text-[10px]">SCIKIT-LEARN PIPELINE</span>
      </div>

      {/* Middle Visual: Brain volume vs Cognitive score correlation */}
      <div className="my-2 flex-1 rounded-lg bg-[#050811] border border-slate-800 p-2.5 flex items-center justify-between gap-4">
        {/* Abstract Brain Motif with Volume Density Heatmap */}
        <div className="relative w-24 h-24 rounded-full border border-violet-500/30 flex items-center justify-center bg-violet-950/20">
          <div className="w-16 h-16 rounded-full border border-dashed border-cyan-400/40 animate-[spin_20s_linear_infinite]" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600/40 to-blue-600/40 blur-xs" />
          <span className="absolute text-[8px] text-violet-300">nWBV: 0.74</span>
        </div>

        {/* Clinical metric correlation bars */}
        <div className="flex-1 space-y-1.5 text-[10px]">
          <div>
            <div className="flex justify-between text-slate-300">
              <span>MMSE (Cognitive)</span>
              <span className="text-cyan-400">r = -0.68</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
              <div className="h-full bg-cyan-400 w-[68%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-slate-300">
              <span>nWBV (Brain Volume)</span>
              <span className="text-violet-400">r = -0.54</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
              <div className="h-full bg-violet-400 w-[54%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-slate-300">
              <span>Age / Demographics</span>
              <span className="text-blue-400">r = 0.22</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
              <div className="h-full bg-blue-400 w-[22%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Strict disclaimer */}
      <div className="flex items-center gap-1.5 text-[9px] text-amber-300/80 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
        <AlertCircle className="w-3 h-3 text-amber-400 flex-shrink-0" />
        <span className="truncate">Exploratory academic research — not for clinical diagnosis</span>
      </div>
    </div>
  );
}

export function CompliSphereVisual() {
  return (
    <div className="relative w-full h-56 bg-[#080D1A] rounded-xl overflow-hidden border border-blue-500/20 p-3 flex flex-col justify-between font-mono">
      {/* Top HUD */}
      <div className="flex items-center justify-between text-[11px] border-b border-blue-500/20 pb-2">
        <div className="flex items-center gap-1.5 text-blue-400">
          <FileCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>COMPLISPHERE PRO :: DOCUMENT AI WORKFLOW</span>
        </div>
        <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          VERIFIED REPO
        </span>
      </div>

      {/* Search and Document Preview UI */}
      <div className="my-2 flex-1 rounded-lg bg-[#050811] border border-slate-800 p-2.5 flex flex-col justify-between">
        {/* Mock Search Bar */}
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-slate-900 border border-blue-500/30 text-xs">
          <Search className="w-3 h-3 text-cyan-400" />
          <span className="text-slate-300 text-[10px] truncate">
            &quot;WCAG 2.1 AA Color Contrast & Keyboard Traps&quot;
          </span>
          <span className="ml-auto text-[9px] text-blue-400 bg-blue-500/10 px-1 rounded">
            AI Indexed
          </span>
        </div>

        {/* Compliance Results Card */}
        <div className="mt-2 p-2 rounded bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-slate-200 font-semibold">Standard: Section 508 / WCAG 2.1</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> 94.2% Audit Score
            </span>
          </div>
          <p className="text-[9px] text-slate-400 leading-tight">
            Semantic match found 14 verifiable clauses in corporate policy document with automated remediation suggestions.
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-800/80">
        <span className="text-cyan-400">tekkloom-a11y/compli-sphere-pro</span>
        <span className="text-slate-500">Next.js + Document Search</span>
      </div>
    </div>
  );
}

export function AerospaceVisual() {
  const classes = [
    { label: "Orbital Rocket Launch", prob: "88.4%", badge: "Target Class" },
    { label: "Aircraft Exhaust Plume", prob: "7.2%", badge: "Discriminated" },
    { label: "Suborbital Trajectory", prob: "3.1%", badge: "Discriminated" },
    { label: "Drone / Small UAS", prob: "1.3%", badge: "Discriminated" },
  ];

  return (
    <div className="relative w-full h-56 bg-[#080D1A] rounded-xl overflow-hidden border border-purple-500/25 p-3 flex flex-col justify-between font-mono">
      {/* Top HUD */}
      <div className="flex items-center justify-between text-[11px] border-b border-purple-500/20 pb-2">
        <div className="flex items-center gap-1.5 text-purple-400">
          <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>MULTI-MODAL AERIAL OBSERVATION HUD</span>
        </div>
        <span className="text-amber-400 text-[10px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          EXPERIMENTAL AUDIT
        </span>
      </div>

      {/* Center Spectral & Kinematics View */}
      <div className="my-2 flex-1 rounded-lg bg-[#050811] border border-slate-800 p-2.5 flex items-center justify-between gap-4">
        {/* Trajectory Ascent Angle Plot */}
        <div className="relative w-28 h-24 border border-purple-500/30 rounded-lg p-2 bg-purple-950/10 flex flex-col justify-between">
          <div className="text-[9px] text-purple-300">KINEMATIC ASCENT</div>
          {/* Curved trajectory path */}
          <div className="relative flex-1 flex items-end">
            <svg viewBox="0 0 100 60" className="w-full h-full stroke-cyan-400 fill-none">
              <path d="M 5 55 Q 50 50 85 8" strokeWidth="2" />
              <circle cx="85" cy="8" r="3" fill="#F59E0B" />
            </svg>
          </div>
          <div className="text-[8px] text-slate-400 flex justify-between">
            <span>t=0s</span>
            <span>Steep Ascent (82°)</span>
          </div>
        </div>

        {/* Multi-modal taxonomy probabilities */}
        <div className="flex-1 space-y-1.5 text-[10px]">
          {classes.map((c, i) => (
            <div key={i} className="space-y-0.5">
              <div className="flex justify-between text-[9px]">
                <span className={i === 0 ? "text-purple-300 font-bold" : "text-slate-400"}>
                  {c.label}
                </span>
                <span className={i === 0 ? "text-cyan-400 font-bold" : "text-slate-500"}>
                  {c.prob}
                </span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${i === 0 ? "bg-gradient-to-r from-purple-500 to-cyan-400" : "bg-slate-700"}`}
                  style={{ width: c.prob }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-800/80">
        <span className="text-purple-300">Modality: RGB + Thermal + Radar Kinematics</span>
        <span className="text-slate-500">OOD Filter: Active</span>
      </div>
    </div>
  );
}

export function ProjectVisual({ type }: { type: "deepfake" | "analytics" | "alzheimers" | "complisphere" | "aerospace" }) {
  switch (type) {
    case "deepfake":
      return <DeepfakeVisual />;
    case "analytics":
      return <AnalyticsVisual />;
    case "alzheimers":
      return <AlzheimersVisual />;
    case "complisphere":
      return <CompliSphereVisual />;
    case "aerospace":
      return <AerospaceVisual />;
    default:
      return null;
  }
}
