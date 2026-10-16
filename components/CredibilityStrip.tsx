"use client";

import React from "react";
import { GraduationCap, Award, Building2, Cpu, Compass, Radio } from "lucide-react";

export default function CredibilityStrip() {
  const telemetry = [
    {
      icon: Award,
      badge: "ACADEMIC FLIGHT RATING",
      primary: "3.89 / 4.0 CGPA",
      secondary: "Top Standing · B.Tech Data Science",
      accent: "text-amber-400",
      borderAccent: "hover:border-amber-500/40",
    },
    {
      icon: GraduationCap,
      badge: "ACADEMY INSTITUTION",
      primary: "SVKM’s NMIMS MPSTME",
      secondary: "School of Tech Management & Eng, Mumbai",
      accent: "text-sky-400",
      borderAccent: "hover:border-sky-500/40",
    },
    {
      icon: Building2,
      badge: "COMMAND & LEADERSHIP",
      primary: "CTO & Co-Founder",
      secondary: "Tekkloom · Mumbai, India",
      accent: "text-cyan-400",
      borderAccent: "hover:border-cyan-500/40",
    },
    {
      icon: Cpu,
      badge: "AVIONICS & SYSTEMS",
      primary: "ML · Data Eng · AI Apps",
      secondary: "End-to-End Flight Engineering",
      accent: "text-emerald-400",
      borderAccent: "hover:border-emerald-500/40",
    },
  ];

  return (
    <div className="relative border-y border-sky-500/15 bg-[#030611]/95 backdrop-blur-md py-5 z-20 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {telemetry.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group relative flex items-start gap-3 p-3 rounded-xl border border-slate-800/80 bg-[#060A18] ${item.borderAccent} transition-all duration-300`}
              >
                <div
                  className={`flex-shrink-0 p-2 rounded-lg bg-slate-900 border border-slate-800 ${item.accent}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] tracking-wider text-slate-500 uppercase">
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-100 font-['Space_Grotesk'] tracking-tight">
                    {item.primary}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate font-sans">
                    {item.secondary}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
