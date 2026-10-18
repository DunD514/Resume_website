"use client";

import React, { useState } from "react";
import { Laptop, HardDrive, Mail, ExternalLink, GraduationCap, Briefcase } from "lucide-react";

interface AboutThisMacAppProps {
  onOpenApp?: (appId: string) => void;
}

export default function AboutThisMacApp({ onOpenApp }: AboutThisMacAppProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "experience" | "specs">("overview");

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-white/90 select-none overflow-hidden font-sans">
      {/* Sub-header / Tabs */}
      <div className="flex-none h-10 px-6 border-b border-white/10 bg-[#252525] flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              activeTab === "overview"
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              activeTab === "experience"
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            Career & Experience
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              activeTab === "specs"
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            System Specs
          </button>
        </div>

        <span className="text-[11px] text-white/40 font-mono">macOS Sequoia 15.4</span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "overview" && (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Left Mac/Avatar Icon */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-0.5 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-[#14151b] flex flex-col items-center justify-center p-3 text-center">
                  <Laptop className="w-10 h-10 text-cyan-400 mb-1" />
                  <span className="text-[11px] font-bold text-white tracking-wider">DUN-PRO</span>
                </div>
              </div>
              <span className="mt-2 text-[10px] text-white/40 font-mono">Apple Silicon M-Series</span>
            </div>

            {/* Right System Specs Table */}
            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-xl font-semibold text-white tracking-tight">Duncan D&apos;Lima</h2>
                <p className="text-xs text-white/60">
                  CTO @ Tekkloom • Applied AI, Computer Vision & Data Systems Engineer
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div className="grid grid-cols-[110px_1fr] gap-y-2 text-xs">
                <span className="text-white/40 font-medium">Leadership</span>
                <span className="text-white/90 font-medium flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  CTO & Co-Founder, Tekkloom (B2B Multi-Tenant SaaS)
                </span>

                <span className="text-white/40 font-medium">Education</span>
                <span className="text-white/90 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  B.Sc. Data Science, NMIMS (CGPA 3.89 / 4.00)
                </span>

                <span className="text-white/40 font-medium">Core Stack</span>
                <span className="text-white/80">
                  PyTorch, TensorRT, LangGraph, OpenCV, FastAPI, Next.js, Docker, AWS
                </span>

                <span className="text-white/40 font-medium">GitHub Status</span>
                <span className="text-white/80 flex items-center gap-2">
                  <span className="font-mono text-cyan-400">DunD514</span>
                  <span className="text-white/40">• 38 Public Repositories</span>
                </span>

                <span className="text-white/40 font-medium">Location</span>
                <span className="text-white/80">Mumbai, India (Open to Remote & Global Relocation)</span>
              </div>

              <div className="pt-3 flex flex-wrap gap-2">
                {onOpenApp && (
                  <>
                    <button
                      onClick={() => onOpenApp("resume")}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs text-white font-medium transition flex items-center gap-1.5"
                    >
                      <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                      View Resume.pdf
                    </button>
                    <button
                      onClick={() => onOpenApp("mail")}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-medium transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Contact Duncan
                    </button>
                  </>
                )}
                <a
                  href="https://github.com/DunD514"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/80 hover:text-white transition flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-4 text-xs">
            {/* Tekkloom */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <h3 className="font-semibold text-white text-sm">Chief Technology Officer & Co-Founder</h3>
                  <div className="text-cyan-400 font-medium">Tekkloom • Full-time</div>
                </div>
                <span className="text-[11px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded">
                  2023 — Present
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-white/70 leading-relaxed">
                <li>Architected scalable multi-tenant SaaS infrastructure serving enterprise textile manufacturers.</li>
                <li>Designed automated production analytics, role-based workflows, and edge data ingestion pipelines.</li>
                <li>Led cross-functional engineering sprints across full-stack Next.js/FastAPI and cloud deployments.</li>
              </ul>
            </div>

            {/* Academic Credentials */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <h3 className="font-semibold text-white text-sm">Bachelor of Science in Data Science</h3>
                  <div className="text-emerald-400 font-medium">NMIMS University, Mumbai</div>
                </div>
                <span className="text-[11px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded">
                  Graduated with 3.89 / 4.00 CGPA
                </span>
              </div>
              <p className="text-white/70 leading-relaxed">
                Specialized in deep learning architectures, statistical modeling, algorithmic optimization, and real-time inference systems.
              </p>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 grid grid-cols-2 gap-3">
              <div>
                <span className="text-white/40 block text-[11px]">System Model</span>
                <span className="font-mono text-white">Apple Silicon M3 Max Architecture</span>
              </div>
              <div>
                <span className="text-white/40 block text-[11px]">Neural Engine</span>
                <span className="font-mono text-white">16-Core Deep Learning Acceleration</span>
              </div>
              <div>
                <span className="text-white/40 block text-[11px]">Inference Backend</span>
                <span className="font-mono text-white">TensorRT / ONNX / TorchScript</span>
              </div>
              <div>
                <span className="text-white/40 block text-[11px]">Repository Sync</span>
                <span className="font-mono text-cyan-400">Live GitHub Octokit Integration</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-white/80 font-semibold mb-2">Technical Core Competencies</div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Computer Vision (YOLOv8, OpenCV, MediaPipe)",
                  "Agentic Workflows (LangGraph, AutoGen, CrewAI)",
                  "Edge AI & Embedded Inference (TensorRT, ONNX)",
                  "Microservices & APIs (FastAPI, Docker, Redis)",
                  "Frontend UX (React, Next.js, Three.js, Tailwind)",
                  "Data Pipelines (Pandas, Polars, PySpark, PostgreSQL)",
                ].map((skill) => (
                  <span key={skill} className="px-2 py-1 rounded bg-white/10 text-[11px] text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-none h-11 px-6 border-t border-white/10 bg-[#191919] flex items-center justify-between text-[11px] text-white/50">
        <span>TM and © 2026 Duncan D&apos;Lima. All rights reserved.</span>
        <button
          onClick={() => setActiveTab("overview")}
          className="hover:text-white transition"
        >
          System Diagnostics OK
        </button>
      </div>
    </div>
  );
}
