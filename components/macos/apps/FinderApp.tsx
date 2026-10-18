"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List as ListIcon,
  Columns as ColumnsIcon,
  Search,
  Folder,
  Star,
  ExternalLink,
  GitBranch,
  Sparkles,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import { UnifiedProject } from "@/lib/projects";
import {
  PROJECT_CATEGORIES,
  ProjectCategoryKey,
  CATEGORY_KEYS,
} from "@/lib/projectCategories";
import { FinderViewMode } from "../types";
import { FolderIcon } from "../MacIcons";

interface FinderAppProps {
  projects: UnifiedProject[];
  onOpenProjectDossier: (project: UnifiedProject) => void;
}

export default function FinderApp({
  projects,
  onOpenProjectDossier,
}: FinderAppProps) {
  const [selectedSidebar, setSelectedSidebar] = useState<string>("all");
  const [viewMode, setViewMode] = useState<FinderViewMode>("columns");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<UnifiedProject | null>(
    projects[0] || null
  );
  const [sortBy, setSortBy] = useState<"name" | "date" | "stars">("date");

  // History stack for back/forward
  const [history, setHistory] = useState<string[]>(["all"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigateToSidebar = (id: string) => {
    setSelectedSidebar(id);
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(id);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      setSelectedSidebar(history[newIdx]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      setSelectedSidebar(history[newIdx]);
    }
  };

  // Filter projects based on sidebar selection & search query
  const displayedProjects = useMemo(() => {
    return projects.filter((p) => {
      // Sidebar filter
      if (selectedSidebar === "featured") {
        if (!p.isFeatured) return false;
      } else if (selectedSidebar !== "all") {
        if (!p.categories.includes(selectedSidebar as ProjectCategoryKey)) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = p.title.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inTags = p.tags.some((t) => t.toLowerCase().includes(q));
        const inLang = p.language.toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inTags && !inLang) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "stars") return b.stars - a.stars;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [projects, selectedSidebar, searchQuery, sortBy]);

  // Sidebar sections
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length };
    projects.forEach((p) => {
      p.categories.forEach((catKey) => {
        counts[catKey] = (counts[catKey] || 0) + 1;
      });
    });
    return counts;
  }, [projects]);

  const currentFolderLabel = useMemo(() => {
    if (selectedSidebar === "all") return "All Projects";
    if (selectedSidebar === "featured") return "Featured Flagships";
    return PROJECT_CATEGORIES[selectedSidebar as ProjectCategoryKey]?.label || selectedSidebar;
  }, [selectedSidebar]);

  return (
    <div
      className="flex-1 flex flex-col h-full bg-[#18191D] text-[#E5E7EB] text-[13px] font-sans overflow-hidden select-none"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
      }}
    >
      {/* 1. Finder Toolbar */}
      <div className="h-11 px-3 bg-[#24252B] border-b border-white/[0.08] flex items-center justify-between shrink-0 gap-3">
        {/* Navigation History Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleBack}
            disabled={historyIndex === 0}
            className={`p-1.5 rounded-md hover:bg-white/10 transition-colors ${
              historyIndex === 0 ? "opacity-30 cursor-not-allowed" : "text-white"
            }`}
            title="Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleForward}
            disabled={historyIndex >= history.length - 1}
            className={`p-1.5 rounded-md hover:bg-white/10 transition-colors ${
              historyIndex >= history.length - 1 ? "opacity-30 cursor-not-allowed" : "text-white"
            }`}
            title="Forward"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Current Location Title */}
          <span className="font-semibold text-white ml-2 text-sm truncate max-w-[200px]">
            {currentFolderLabel}
          </span>
        </div>

        {/* View Mode Segmented Controls */}
        <div className="flex items-center bg-[#15161A] p-0.5 rounded-md border border-white/10">
          <button
            type="button"
            onClick={() => setViewMode("icons")}
            className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
              viewMode === "icons"
                ? "bg-[#3A3B43] text-white shadow-sm font-medium"
                : "text-[#9CA3AF] hover:text-white"
            }`}
            title="Icon View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
              viewMode === "list"
                ? "bg-[#3A3B43] text-white shadow-sm font-medium"
                : "text-[#9CA3AF] hover:text-white"
            }`}
            title="List View"
          >
            <ListIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("columns")}
            className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
              viewMode === "columns"
                ? "bg-[#3A3B43] text-white shadow-sm font-medium"
                : "text-[#9CA3AF] hover:text-white"
            }`}
            title="Column View"
          >
            <ColumnsIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search Field & Sort */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-36 sm:w-48 bg-[#15161A] border border-white/10 rounded-md pl-8 pr-3 py-1 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#007AFF] transition-colors"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "name" | "stars")}
            className="bg-[#15161A] border border-white/10 rounded-md px-2 py-1 text-xs text-[#9CA3AF] hover:text-white focus:outline-none cursor-pointer"
          >
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="stars">Stars</option>
          </select>
        </div>
      </div>

      {/* 2. Main Work Area: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* macOS Finder Sidebar */}
        <div className="w-52 shrink-0 bg-[#1E1F24]/80 backdrop-blur-md border-r border-white/[0.08] p-2.5 overflow-y-auto space-y-4 text-xs">
          {/* Favorites */}
          <div>
            <div className="px-2 mb-1 text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase">
              Favorites
            </div>
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => navigateToSidebar("all")}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                  selectedSidebar === "all"
                    ? "bg-[#007AFF] text-white font-medium shadow-sm"
                    : "text-[#D1D5DB] hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>All Projects</span>
                </div>
                <span className="text-[10px] opacity-75">{projects.length}</span>
              </button>

              <button
                type="button"
                onClick={() => navigateToSidebar("featured")}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                  selectedSidebar === "featured"
                    ? "bg-[#007AFF] text-white font-medium shadow-sm"
                    : "text-[#D1D5DB] hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF7A1A]" />
                  <span>Featured Flagships</span>
                </div>
                <span className="text-[10px] opacity-75">6</span>
              </button>
            </div>
          </div>

          {/* Categories / Domains */}
          <div>
            <div className="px-2 mb-1 text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase">
              Domains
            </div>
            <div className="space-y-0.5">
              {CATEGORY_KEYS.map((key) => {
                const cat = PROJECT_CATEGORIES[key];
                const count = categoryCounts[key] || 0;
                if (count === 0 && key === "other") return null;

                const isSelected = selectedSidebar === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => navigateToSidebar(key)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                      isSelected
                        ? "bg-[#007AFF] text-white font-medium shadow-sm"
                        : "text-[#D1D5DB] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: cat.accentColor }}
                      />
                      <span className="truncate">{cat.shortLabel}</span>
                    </div>
                    <span className="text-[10px] opacity-70 shrink-0 ml-1">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="px-2 mb-1 text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase">
              External
            </div>
            <div className="space-y-0.5">
              <a
                href="https://github.com/DunD514"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[#D1D5DB] hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GitBranch className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>github.com/DunD514</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="https://github.com/tekkloom-a11y"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[#D1D5DB] hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>Tekkloom A11y</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>
        </div>

        {/* 3. Content View Area */}
        <div className="flex-1 flex overflow-hidden bg-[#16171B]">
          {/* ICON VIEW */}
          {viewMode === "icons" && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {displayedProjects.map((p) => {
                  const isSelected = selectedProject?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProject(p)}
                      onDoubleClick={() => onOpenProjectDossier(p)}
                      className={`group flex flex-col items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#007AFF]/25 border border-[#007AFF]/60 shadow-sm"
                          : "hover:bg-white/[0.04] border border-transparent"
                      }`}
                    >
                      <FolderIcon size={52} className="group-hover:scale-105 transition-transform" />
                      <span className="text-center text-xs text-white font-medium mt-2 line-clamp-2 px-1">
                        {p.title}
                      </span>
                      <span className="text-[10px] text-[#9CA3AF] mt-0.5">
                        {p.language} &middot; {p.formattedDate}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LIST VIEW */}
          {viewMode === "list" && (
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#1D1E22] text-[#9CA3AF] sticky top-0">
                    <th className="py-2 px-4 font-medium">Name</th>
                    <th className="py-2 px-4 font-medium">Domain</th>
                    <th className="py-2 px-4 font-medium">Language</th>
                    <th className="py-2 px-4 font-medium">Stars</th>
                    <th className="py-2 px-4 font-medium">Date Modified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {displayedProjects.map((p) => {
                    const isSelected = selectedProject?.id === p.id;
                    return (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedProject(p)}
                        onDoubleClick={() => onOpenProjectDossier(p)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-[#007AFF] text-white"
                            : "hover:bg-white/[0.04] text-[#D1D5DB]"
                        }`}
                      >
                        <td className="py-2 px-4 flex items-center gap-2">
                          <Folder className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                          <span className="font-medium truncate max-w-xs">{p.title}</span>
                          {p.isFeatured && (
                            <span className="text-[9px] bg-[#FF7A1A] text-black px-1.5 py-0.2 rounded font-bold uppercase">
                              Featured
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-4 opacity-80">{p.primaryCategoryLabel}</td>
                        <td className="py-2 px-4 flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: p.languageColor }}
                          />
                          <span>{p.language}</span>
                        </td>
                        <td className="py-2 px-4">{p.stars > 0 ? p.stars : "—"}</td>
                        <td className="py-2 px-4 opacity-70">{p.formattedDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* COLUMN VIEW (Miller Columns) */}
          {viewMode === "columns" && (
            <div className="flex-1 flex overflow-x-auto divide-x divide-white/[0.08]">
              {/* Column 1: Items List */}
              <div className="w-72 shrink-0 overflow-y-auto divide-y divide-white/[0.04] bg-[#16171B]">
                {displayedProjects.map((p) => {
                  const isSelected = selectedProject?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProject(p)}
                      onDoubleClick={() => onOpenProjectDossier(p)}
                      className={`flex items-center justify-between px-3.5 py-2.5 cursor-pointer text-xs transition-colors ${
                        isSelected
                          ? "bg-[#007AFF] text-white font-medium"
                          : "hover:bg-white/[0.04] text-[#D1D5DB]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Folder className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                        <span className="truncate">{p.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0 ml-1" />
                    </div>
                  );
                })}
              </div>

              {/* Column 2: Live Inspector / Details Preview Pane */}
              {selectedProject && (
                <div className="flex-1 min-w-[340px] p-6 overflow-y-auto bg-[#18191D] flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Big File Icon & Title */}
                    <div className="flex flex-col items-center text-center pb-4 border-b border-white/10">
                      <FolderIcon size={72} />
                      <h3 className="text-lg font-semibold text-white mt-3">
                        {selectedProject.title}
                      </h3>
                      <p className="text-xs text-[#9CA3AF] mt-1 max-w-md leading-relaxed">
                        {selectedProject.tagline}
                      </p>
                    </div>

                    {/* Metadata Specs Table */}
                    <div className="bg-[#121316] rounded-xl p-3.5 border border-white/10 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#9CA3AF]">Domain:</span>
                        <span className="font-medium text-white">{selectedProject.primaryCategoryLabel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#9CA3AF]">Primary Language:</span>
                        <span className="font-medium text-white flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: selectedProject.languageColor }}
                          />
                          {selectedProject.language}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#9CA3AF]">GitHub Stars:</span>
                        <span className="font-medium text-white flex items-center gap-1">
                          <Star className="w-3 h-3 text-[#FF7A1A]" />
                          {selectedProject.stars}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#9CA3AF]">Last Modified:</span>
                        <span className="font-medium text-white">{selectedProject.formattedDate}</span>
                      </div>
                    </div>

                    {/* Problem Statement snippet */}
                    <div>
                      <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                        Challenge & Problem:
                      </span>
                      <p className="text-xs text-[#D1D5DB] leading-relaxed bg-[#121316] p-3 rounded-lg border border-white/10">
                        {selectedProject.caseStudy.problem}
                      </p>
                    </div>

                    {/* Technology Tags */}
                    <div>
                      <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider block mb-2">
                        Technologies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[11px] text-[#E5E7EB]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Inspector Action Buttons */}
                  <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenProjectDossier(selectedProject)}
                      className="flex-1 py-2 bg-[#007AFF] hover:bg-[#0066D6] text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-md cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Open Technical Dossier</span>
                    </button>

                    {selectedProject.repoUrl && !selectedProject.isPrivate && (
                      <a
                        href={selectedProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white transition-colors"
                        title="View on GitHub"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. Finder Status Bar */}
      <div className="h-6 px-4 bg-[#202126] border-t border-white/[0.08] text-[11px] text-[#9CA3AF] flex items-center justify-between shrink-0">
        <span>{displayedProjects.length} items</span>
        <span>Macintosh HD &middot; 3.89 CGPA &middot; Verified Repository Engine</span>
      </div>
    </div>
  );
}
