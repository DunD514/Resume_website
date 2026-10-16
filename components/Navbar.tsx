"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Menu, X, FileText, ExternalLink, Radio, Rocket } from "lucide-react";
import { GithubIcon } from "./Icons";

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("mission-launch");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "mission-launch",
        "project-explorer",
        "about",
        "experience",
        "skills",
        "github",
        "contact",
      ];
      const scrollPos = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Launch", href: "#mission-launch", id: "mission-launch" },
    { name: "Project Orbit", href: "#project-explorer", id: "project-explorer" },
    { name: "Philosophy", href: "#about", id: "about" },
    { name: "Flight Experience", href: "#experience", id: "experience" },
    { name: "Avionics Toolkit", href: "#skills", id: "skills" },
    { name: "Telemetry Code", href: "#github", id: "github" },
    { name: "Comms", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#02040A]/90 backdrop-blur-md border-b border-sky-500/15 py-3 shadow-xl shadow-black/60"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark & Flight Indicator */}
          <a
            href="#mission-launch"
            className="group flex items-center gap-3 text-slate-100 hover:text-white transition-colors"
            aria-label="Duncan D'Lima Mission Log"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-sky-500/30 group-hover:border-sky-400/60 transition-all">
              <Rocket className="w-4 h-4 text-sky-400 group-hover:text-amber-400 transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-wider text-sm font-['Space_Grotesk']">
                DUNCAN D’LIMA
              </span>
              <span className="text-[9px] text-sky-400/90 font-mono tracking-widest uppercase hidden sm:inline">
                MISSION CONTROL // DS · AI · DEV
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 font-mono" aria-label="Flight Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? "text-sky-300 bg-sky-500/10 border border-sky-500/30 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-800"
              aria-label="Duncan's GitHub Profile"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenResume}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-100 bg-gradient-to-r from-sky-600/30 to-blue-600/30 hover:from-sky-600/50 hover:to-blue-600/50 border border-sky-500/30 hover:border-sky-400/50 transition-all cursor-pointer shadow-sm shadow-sky-950/40"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Flight Manual (CV)</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono font-medium text-slate-200 bg-sky-600/20 border border-sky-500/30"
              aria-label="View Resume"
            >
              <FileText className="w-3 h-3 text-sky-400" />
              <span>CV</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#02040A]/95 backdrop-blur-xl border-b border-sky-500/20 font-mono">
          <nav className="flex flex-col gap-1.5 pt-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  activeSection === link.id
                    ? "text-sky-300 bg-sky-500/10 border border-sky-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between px-2 text-xs">
              <a
                href={PORTFOLIO_DATA.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white"
              >
                <GithubIcon className="w-4 h-4 text-sky-400" />
                <span>GitHub @DunD514</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="text-sky-400 hover:text-sky-300 font-medium cursor-pointer"
              >
                Inspect CV →
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
