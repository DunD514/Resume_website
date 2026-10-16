"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Wrench, Brain, Eye, Database, Code2, Search, Cpu } from "lucide-react";

export default function SkillsSection() {
  const { skills } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const iconMap: Record<string, React.ElementType> = {
    Brain,
    Eye,
    Database,
    Code2,
    Wrench,
  };

  const filteredCategories = skills
    .map((cat) => {
      const matchesCategory = selectedCategory === "all" || cat.id === selectedCategory;
      const filteredSkills = cat.skills.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {
        ...cat,
        matchesCategory,
        filteredSkills,
      };
    })
    .filter((cat) => cat.matchesCategory && cat.filteredSkills.length > 0);

  return (
    <section id="skills" className="py-24 relative bg-[#030612]" aria-label="Avionics & Technical Toolkit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-sky-400 bg-sky-500/10 border border-sky-500/25">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            AVIONICS & TOOLKIT // TECHNICAL INVENTORY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-slate-100">
            Systems & <span className="text-telemetry-gradient">Technical Toolkit</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            A substantiated technical inventory organized across mathematical learning algorithms, computer vision pipelines, analytical databases, and production software systems.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mission-panel p-3 rounded-2xl border border-slate-800 font-mono text-xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-sky-600 text-white font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              ALL SYSTEMS
            </button>
            {skills.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-sky-600 text-white font-bold"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat.telemetryCode.split("//")[1]?.trim() || cat.title.split("&")[0]}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search skill (e.g. PyTorch, DuckDB)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#02040A] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
            />
          </div>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = iconMap[category.iconName] || Brain;
            return (
              <div
                key={category.id}
                className="mission-panel p-6 rounded-2xl border border-slate-800/80 hover:border-sky-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-400/25 text-sky-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                        {category.telemetryCode}
                      </span>
                      <h3 className="text-base font-bold font-['Space_Grotesk'] text-slate-100">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1 mb-3 font-light">
                    {category.description}
                  </p>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {category.filteredSkills.map((s, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all font-mono"
                      >
                        <span className="text-xs text-slate-200 font-medium">
                          {s.name}
                        </span>
                        {s.level && (
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded ${
                              s.level === "Core"
                                ? "text-cyan-400 bg-cyan-500/10"
                                : s.level === "Advanced"
                                ? "text-amber-400 bg-amber-500/10"
                                : "text-slate-400 bg-slate-800"
                            }`}
                          >
                            {s.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{category.filteredSkills.length} Verified Modules</span>
                  <span>Substantiated via Code</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
