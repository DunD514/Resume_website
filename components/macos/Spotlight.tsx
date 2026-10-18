"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowRight } from "lucide-react";
import { UnifiedProject } from "@/lib/projects";
import {
  FinderIcon,
  OrbitExplorerIcon,
  ResumeIcon,
  TerminalIcon,
  AboutMacIcon,
  MailIcon,
  FolderIcon,
} from "./MacIcons";

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  projects: UnifiedProject[];
  onOpenApp: (appId: string) => void;
  onOpenProject: (project: UnifiedProject) => void;
}

export default function Spotlight({
  isOpen,
  onClose,
  projects,
  onOpenApp,
  onOpenProject,
}: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setQuery("");
        setSelectedIndex(0);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Static apps in spotlight
  const systemApps = [
    { id: "finder", name: "Finder", desc: "Browse projects and directories", icon: <FinderIcon size={32} /> },
    { id: "orbit", name: "Orbit Explorer", desc: "3D NASA Earth orbital telemetry", icon: <OrbitExplorerIcon size={32} /> },
    { id: "resume", name: "Resume (Preview)", desc: "Duncan D'Lima B.Sc. Data Science resume", icon: <ResumeIcon size={32} /> },
    { id: "terminal", name: "Terminal", desc: "Interactive macOS command shell", icon: <TerminalIcon size={32} /> },
    { id: "about", name: "About This Mac", desc: "System specifications and Tekkloom role", icon: <AboutMacIcon size={32} /> },
    { id: "mail", name: "Mail", desc: "Send direct note or recruiter inquiry", icon: <MailIcon size={32} /> },
  ];

  const filteredApps = query
    ? systemApps.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.desc.toLowerCase().includes(query.toLowerCase())
      )
    : systemApps;

  const filteredProjects = query
    ? projects.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase()) ||
          p.primaryCategoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : projects.slice(0, 4);

  // Combine items for keyboard navigation
  const allResults = [
    ...filteredApps.map((a) => ({ type: "app" as const, item: a })),
    ...filteredProjects.map((p) => ({ type: "project" as const, item: p })),
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, allResults.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allResults.length) % Math.max(1, allResults.length));
    } else if (e.key === "Enter" && allResults.length > 0) {
      e.preventDefault();
      const current = allResults[selectedIndex];
      if (current) {
        if (current.type === "app") {
          onOpenApp(current.item.id);
        } else {
          onOpenProject(current.item);
        }
        onClose();
      }
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[640px] max-w-[90vw] bg-[#1e2029]/80 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col text-white animate-fade-in"
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-white/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search (projects, tech, documents...)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-lg text-white placeholder-white/40 outline-none border-none font-sans"
          />
          <kbd className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white/40 font-mono">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {/* Applications */}
          {filteredApps.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Applications
              </div>
              {filteredApps.map((app) => {
                const itemIndex = allResults.findIndex((r) => r.type === "app" && r.item.id === app.id);
                const isSelected = itemIndex === selectedIndex;
                return (
                  <div
                    key={app.id}
                    onClick={() => {
                      onOpenApp(app.id);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(itemIndex)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition ${
                      isSelected ? "bg-blue-600 text-white" : "hover:bg-white/5 text-white/90"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="shrink-0">{app.icon}</div>
                      <div>
                        <div className="text-sm font-medium">{app.name}</div>
                        <div className={`text-xs ${isSelected ? "text-white/80" : "text-white/50"}`}>
                          {app.desc}
                        </div>
                      </div>
                    </div>
                    {isSelected && <ArrowRight className="w-4 h-4 text-white/80" />}
                  </div>
                );
              })}
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div className="mt-2 pt-2 border-t border-white/10">
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Projects ({projects.length} in GitHub Archive)
              </div>
              {filteredProjects.map((proj) => {
                const itemIndex = allResults.findIndex((r) => r.type === "project" && r.item.id === proj.id);
                const isSelected = itemIndex === selectedIndex;
                return (
                  <div
                    key={proj.id}
                    onClick={() => {
                      onOpenProject(proj);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(itemIndex)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition ${
                      isSelected ? "bg-blue-600 text-white" : "hover:bg-white/5 text-white/90"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <FolderIcon size={30} label={proj.primaryCategoryLabel.slice(0, 2)} />
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{proj.name}</div>
                        <div className={`text-xs truncate ${isSelected ? "text-white/80" : "text-white/50"}`}>
                          {proj.primaryCategoryLabel} • {proj.description || "Interactive project dossier"}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isSelected ? "bg-white/20 text-white" : "bg-white/10 text-white/60"}`}>
                      {proj.language || "Code"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {allResults.length === 0 && (
            <div className="p-8 text-center text-sm text-white/40">
              No matching applications or projects found for &quot;{query}&quot;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
