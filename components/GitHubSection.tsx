"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, GitFork, Star, GitBranch } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GitHubRepoSummary } from "@/lib/github";

export default function GitHubSection() {
  const [repos, setRepos] = useState<GitHubRepoSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRepos() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          if (data.repos && Array.isArray(data.repos) && data.repos.length > 0) {
            if (isMounted) {
              setRepos(data.repos.slice(0, 6));
              setIsLoading(false);
              return;
            }
          }
        }
      } catch (e) {
        // Fallback silently
      }

      // Fallback to static catalog silently
      if (isMounted) {
        setRepos(
          PORTFOLIO_DATA.fallbackRepos.map((r) => ({
            name: r.name,
            fullName: r.fullName,
            description: r.description,
            language: r.language,
            languageColor: r.languageColor,
            url: r.url,
            stars: r.stars,
            forks: r.forks,
            updatedAt: r.updatedAt,
            tags: [r.language],
            verified: true,
          }))
        );
        setIsLoading(false);
      }
    }

    loadRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-8 mb-12 gap-4">
        <div>
          <span className="meta-mono">[06] // SOURCE CODE & REPOSITORIES</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-[200] tracking-tight text-[#f4f4f6]">
            Open-source implementations.
          </h2>
        </div>

        <a
          href={PORTFOLIO_DATA.personal.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#ff7a1a] hover:text-white transition-colors"
        >
          <span>Explore github.com/DunD514</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid of Repos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08]">
        {repos.map((repo) => (
          <a
            key={repo.fullName}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 sm:p-8 bg-[#060608] hover:bg-[#0a0a0f] transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#888890] group-hover:text-white transition-colors">
                <GitBranch className="w-3.5 h-3.5 text-[#ff7a1a]" />
                <span className="truncate max-w-[240px] sm:max-w-xs">{repo.fullName}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#55555c] group-hover:text-[#ff7a1a] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <p className="mt-4 text-sm text-[#888890] font-light leading-relaxed line-clamp-2">
              {repo.description}
            </p>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#66666e]">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: repo.languageColor || "#888890" }}
                />
                <span className="text-[#a0a0a8]">{repo.language}</span>
              </div>

              <span>{repo.updatedAt}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
