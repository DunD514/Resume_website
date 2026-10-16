"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import InteractivePipeline from "./InteractivePipeline";
import { Compass, CheckCircle2, Radio, Terminal } from "lucide-react";

export default function AboutSection() {
  const { personal } = PORTFOLIO_DATA;

  const corePillars = [
    {
      title: "Problem-First Engineering",
      desc: "Rather than applying complex architectures for their own sake, I prioritize isolating the informational bottleneck and designing the simplest reliable system that solves it.",
    },
    {
      title: "Data Quality as the Primary Propulsion",
      desc: "Whether dealing with spatiotemporal video frames, longitudinal clinical metrics, or tech employment distributions, high-signal data engineering determines flight success.",
    },
    {
      title: "Production System Delivery",
      desc: "As CTO & Co-Founder at Tekkloom, I engineer resilient full-stack applications with Next.js, TypeScript, and clean APIs that bring machine intelligence directly into user workflows.",
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-[#030612]" aria-label="About Duncan D'Lima">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Flight Philosophy Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-sky-400 bg-sky-500/10 border border-sky-500/25">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              FLIGHT PHILOSOPHY // BEYOND THE CODE
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-slate-100 leading-tight">
              I like building things that make{" "}
              <span className="text-telemetry-gradient">technology useful.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              {personal.aboutBio}
            </p>

            {/* Core Operating Principles */}
            <div className="space-y-3.5 pt-2">
              {corePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800"
                >
                  <div className="p-1 rounded bg-sky-500/10 text-cyan-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive End-to-End Pipeline */}
          <div className="lg:col-span-6">
            <InteractivePipeline />
          </div>
        </div>
      </div>
    </section>
  );
}
