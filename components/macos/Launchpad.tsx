"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { UnifiedProject } from "@/lib/projects";
import {
  FinderIcon,
  OrbitExplorerIcon,
  ResumeIcon,
  TerminalIcon,
  AboutMacIcon,
  MailIcon,
  FolderIcon,
  GitHubIcon,
} from "./MacIcons";

interface LaunchpadProps {
  isOpen: boolean;
  onClose: () => void;
  projects: UnifiedProject[];
  onOpenApp: (appId: string) => void;
  onOpenProject: (project: UnifiedProject) => void;
}

export default function Launchpad({
  isOpen,
  onClose,
  projects,
  onOpenApp,
  onOpenProject,
}: LaunchpadProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const coreApps = [
    { id: "finder", name: "Finder", icon: <FinderIcon size={64} />, type: "app" as const },
    { id: "orbit", name: "Orbit Explorer", icon: <OrbitExplorerIcon size={64} />, type: "app" as const },
    { id: "resume", name: "Resume", icon: <ResumeIcon size={64} />, type: "app" as const },
    { id: "terminal", name: "Terminal", icon: <TerminalIcon size={64} />, type: "app" as const },
    { id: "about", name: "About Duncan", icon: <AboutMacIcon size={64} />, type: "app" as const },
    { id: "mail", name: "Mail", icon: <MailIcon size={64} />, type: "app" as const },
    { id: "github", name: "GitHub (DunD514)", icon: <GitHubIcon size={64} />, type: "app" as const },
  ];

  // Pick top featured projects to display in launchpad grid as project apps
  const projectApps = projects.slice(0, 10).map((p) => ({
    id: p.id,
    name: p.name,
    project: p,
    icon: <FolderIcon size={64} label={p.name.slice(0, 2).toUpperCase()} />,
    type: "project" as const,
  }));

  const allItems = [...coreApps, ...projectApps];

  const filtered = searchQuery
    ? allItems.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allItems;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-8 bg-black/60 backdrop-blur-2xl select-none animate-fade-in"
    >
      {/* Top Search Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-72 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center space-x-2 text-white"
      >
        <Search className="w-4 h-4 text-white/50" />
        <input
          type="text"
          placeholder="Search Launchpad"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm text-white placeholder-white/40 outline-none border-none flex-1 font-sans"
          autoFocus
        />
      </div>

      {/* Grid of Apps */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-10 max-w-5xl my-auto p-4"
      >
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "github") {
                window.open("https://github.com/DunD514", "_blank");
              } else if (item.type === "app") {
                onOpenApp(item.id);
              } else if (item.project) {
                onOpenProject(item.project);
              }
              onClose();
            }}
            className="flex flex-col items-center group focus:outline-none transition-transform hover:scale-105 active:scale-95"
          >
            <div className="shadow-2xl rounded-2xl group-hover:brightness-110 transition">
              {item.icon}
            </div>
            <span className="mt-2 text-xs font-medium text-white/90 text-center tracking-wide group-hover:text-white truncate max-w-[100px] drop-shadow-md">
              {item.name}
            </span>
          </button>
        ))}
      </div>

      {/* Pagination dots (aesthetic macOS Launchpad style) */}
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
        <div className="w-2 h-2 rounded-full bg-white/30" />
      </div>
    </div>
  );
}
