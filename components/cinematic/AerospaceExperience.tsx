"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  ArrowUpRight,
  ChevronDown,
  Lock,
  Play,
  RotateCcw,
} from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";
import ProjectModal from "../ProjectModal";
import CinematicFilmHero from "./CinematicFilmHero";

// Dynamic client import for Three.js canvas
const SpaceScene = dynamic(() => import("./SpaceScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#040508] flex items-center justify-center font-mono text-xs text-[#888890]">
      INITIALIZING ORBITAL ENGINE...
    </div>
  ),
});

export default function AerospaceExperience() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Check reduced motion & session state: bypass intro if user prefers reduced motion or already completed intro in this session
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeenIntro = sessionStorage.getItem("portfolio_intro_seen") === "true";
    if (prefersReducedMotion || hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const navigateToArchive = () => {
    const el = document.getElementById("archive");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full bg-[#040508] text-[#f4f4f6]">
      {/* 1. Cinematic Spaceflight Film Hero */}
      {showIntro && (
        <CinematicFilmHero
          onComplete={() => {
            setShowIntro(false);
            sessionStorage.setItem("portfolio_intro_seen", "true");
          }}
        />
      )}

      {/* 2. Persistent Flight Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#040508]/85 backdrop-blur-md border-b border-white/[0.08] px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff7a1a] font-semibold">
            DUNCAN D&apos;LIMA
          </span>
          <span className="text-[#44444e] hidden sm:inline">&middot;</span>
          <span className="meta-mono hidden sm:inline">AEROSPACE PORTFOLIO</span>
        </div>

        {/* Act Navigation Switcher */}
        <div className="flex items-center gap-1 sm:gap-2 bg-white/[0.03] p-1 border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setShowIntro(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#888890] hover:text-white transition-colors"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>Launch Film</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowIntro(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider bg-[#ff7a1a] text-[#060608] font-semibold transition-colors"
          >
            Orbit
          </button>

          <button
            type="button"
            onClick={navigateToArchive}
            className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#888890] hover:text-white transition-colors"
          >
            Archive
          </button>
        </div>

        {/* Resume Download Action */}
        <div className="flex items-center gap-3">
          <a
            href="/duncan_dlima_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 border border-white/[0.14] hover:border-[#ff7a1a] text-[11px] font-mono uppercase tracking-wider text-[#f4f4f6] hover:text-[#ff7a1a] transition-colors"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* 3. Interactive Earth Orbit Viewport */}
      <div className="relative w-full h-screen">
        <SpaceScene
          onSelectProject={(proj) => {
            setSelectedProject(proj);
          }}
          selectedProjectId={selectedProject?.id || null}
          activeCategory={activeCategory}
        />

        {/* Orbit Explorer Overlay UI */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 z-20">
          {/* Top Category Filter Chips */}
          <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-4">
            <div className="bg-[#040508]/85 backdrop-blur border border-white/[0.1] p-1.5 flex items-center gap-1.5">
              {["All", "ML/DS", "Data Eng", "Applied AI", "Aero"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeCategory === cat
                      ? "bg-[#ff7a1a] text-[#060608] font-semibold"
                      : "text-[#888890] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#888890] bg-[#040508]/80 px-3 py-1.5 border border-white/[0.08]">
                Select orbital beacons to view dossiers
              </span>
              <button
                type="button"
                onClick={navigateToArchive}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#ff7a1a] text-[#060608] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors"
              >
                <span>Mission Archive &darr;</span>
              </button>
            </div>
          </div>

          {/* Floating Project Dossier Card when a project is selected */}
          {selectedProject && (
            <div className="pointer-events-auto self-end max-w-md w-full bg-[#08090e]/95 backdrop-blur-md border border-[#ff7a1a]/50 p-6 shadow-2xl animate-in fade-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-mono text-xs text-[#ff7a1a]">
                  PROJECT {selectedProject.number} &middot; {selectedProject.categoryLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="text-xs font-mono text-[#888890] hover:text-white"
                >
                  [Close]
                </button>
              </div>

              <h3 className="mt-3 text-2xl font-[200] text-[#f4f4f6]">
                {selectedProject.title}
              </h3>
              <p className="mt-2 text-xs font-light text-[#9a9aa4] leading-relaxed">
                {selectedProject.tagline}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {selectedProject.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-[#c0c0c8]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsDossierOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#ff7a1a] hover:underline"
                >
                  <span>Full Technical Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {selectedProject.isPrivate ? (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#888890]">
                    <Lock className="w-3 h-3 text-[#ff7a1a]" />
                    <span>Private Repo</span>
                  </div>
                ) : selectedProject.repoUrl ? (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-[#888890] hover:text-white flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ) : null}
              </div>
            </div>
          )}

          {/* Bottom Navigation Hint */}
          <div className="pointer-events-auto flex items-center justify-between text-xs font-mono text-[#666670] border-t border-white/[0.08] pt-3">
            <span>NASA BLUE MARBLE TERRAIN &middot; 3D ORBITAL DISCOVERY</span>
            <button
              type="button"
              onClick={navigateToArchive}
              className="hover:text-[#ff7a1a] transition-colors flex items-center gap-1"
            >
              <span>SCROLL DOWN TO FULL ARCHIVE</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Case Study Modal Triggered from 3D Orbit Card */}
      <ProjectModal
        project={isDossierOpen ? selectedProject : null}
        onClose={() => setIsDossierOpen(false)}
      />
    </div>
  );
}
