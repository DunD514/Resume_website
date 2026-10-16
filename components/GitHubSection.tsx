"use client";

import React, { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GitHubRepoSummary } from "@/lib/github";
import { 
  GitBranch, 
  ExternalLink, 
  Terminal, 
  ArrowUpRight, 
  CheckCircle2, 
  Radio, 
  FolderGit2, 
  RefreshCw 
} from "lucide-react";
import { GithubIcon } from "./Icons";

export default function GitHubSection() {
  const { githubData } = PORTFOLIO_DATA;
  const [repos, setRepos] = useState<GitHubRepoSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastSync, setLastSync] = useState<string>("Cached Catalog");

  useEffect(() => {
    let isMounted = true;
    async function loadRepos() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.repos && Array.isArray(data.repos)) {
            setRepos(data.repos);
            setLastSync(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("API fetch error, falling back to static verified repos:", err);
      }

      // Fallback
      if (isMounted) {
        setRepos(
          githubData.pinnedRepos.map((r) => ({
            name: r.name,
            fullName: r.fullName,
            description: r.description,
            language: r.language,
            languageColor: r.languageColor,
            url: r.url,
            stars: 0,
            forks: 0,
            updatedAt: "Active",
            tags: r.tags,
            verified: r.verified,
          }))
        );
        setIsLoading(false);
      }
    }

    loadRepos();
    return () => {
      isMounted = false;
    };
  }, [githubData]);

  return (
    <section id="github" className="py-24 relative bg-[#02040A]" aria-label="GitHub Telemetry Repositories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-sky-400 bg-sky-500/10 border border-sky-500/25">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              TELEMETRY LOGS // GITHUB REPOSITORIES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-slate-100">
              Built with curiosity. <br />
              <span className="text-telemetry-gradient">Backed by code.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              Automated telemetry linking directly to verified public repositories on GitHub. Inspect data engineering scripts, deep learning model definitions, and production full-stack systems.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYNC: {lastSync}</span>
            </div>

            <a
              href={githubData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-400/50 transition-all shadow-md shadow-black/40"
            >
              <GithubIcon className="w-4 h-4 text-sky-400" />
              <span>Visit @{githubData.username}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <div
              key={idx}
              className="mission-panel p-5 rounded-2xl border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold font-mono text-slate-100 hover:text-cyan-400 transition-colors truncate max-w-[190px]">
                      {repo.name}
                    </span>
                  </div>
                  {repo.verified ? (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Verified
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      Public Repo
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {repo.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {repo.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[9px] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Repo Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.languageColor }}
                  />
                  <span>{repo.language}</span>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300"
                >
                  <span>Inspect Code</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Live Terminal Telemetry Status Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#040816] border border-sky-500/20 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2 text-cyan-400">
              <Terminal className="w-4 h-4" />
              <span>TERMINAL TELEMETRY :: git log --graph --oneline</span>
            </div>
            <span className="text-[10px] text-slate-500">ORIGIN: https://github.com/DunD514</span>
          </div>

          <div className="text-slate-300 space-y-1 text-[11px]">
            <div className="text-emerald-400">✓ Repositories synchronized via server-side cached API:</div>
            <div className="text-slate-400 pl-3">
              • DunD514/Deepfake-Video-Detector: PyTorch VideoMAE fine-tuning on FaceForensics++
            </div>
            <div className="text-slate-400 pl-3">
              • DunD514/sql-project: DuckDB analytical job market intelligence & salary CTEs
            </div>
            <div className="text-slate-400 pl-3">
              • tekkloom-a11y/compli-sphere-pro: Next.js compliance search & document AI
            </div>
            <div className="text-slate-400 pl-3">
              • DunD514/Dementia-Prediction-Model: Scikit-learn Random Forest on clinical cohort
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
