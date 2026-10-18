import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  GitBranch,
  Star,
  GitFork,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  Code2,
  Terminal,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { PROJECT_CATEGORIES } from "@/lib/projectCategories";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Duncan D'Lima Portfolio",
      description: "Technical project dossier record not found.",
    };
  }

  return {
    title: `${project.title} — Technical Dossier | Duncan D'Lima`,
    description: project.description || project.tagline,
    keywords: [
      project.title,
      project.primaryCategoryLabel,
      project.language,
      ...project.tags,
      "Duncan D'Lima",
      "Applied AI",
      "Data Science Portfolio",
    ],
    openGraph: {
      title: `${project.title} | Technical Dossier`,
      description: project.tagline,
      type: "article",
      authors: ["Duncan D'Lima"],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const categoryDef = PROJECT_CATEGORIES[project.primaryCategory] || PROJECT_CATEGORIES.other;
  const all = await getAllProjects();
  const relatedProjects = all
    .filter((p) => p.slug !== project.slug && p.categories.includes(project.primaryCategory))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#040508] text-[#f4f4f6]">
      {/* Top Telemetry Flight Header */}
      <header className="sticky top-0 z-40 bg-[#040508]/90 backdrop-blur-md border-b border-white/[0.08] px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/#archive"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#888890] hover:text-[#ff7a1a] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Mission Archive / Project Explorer</span>
          </Link>

          <div className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: project.primaryCategoryColor }}
            />
            <span className="font-mono text-xs uppercase tracking-wider text-[#a0a0aa] hidden sm:inline">
              {project.primaryCategoryLabel}
            </span>
            <span className="text-[#3e3e48] hidden sm:inline">&middot;</span>
            <span className="font-mono text-xs text-[#ff7a1a]">
              {project.caseStudy.statusBadge || "Verified"}
            </span>
          </div>
        </div>
      </header>

      {/* Main Dossier Canvas */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* Breadcrumb & Identifier */}
        <div className="flex items-center gap-3 text-xs font-mono text-[#666670] mb-4">
          <span className="text-[#ff7a1a]">DOSSIER // {project.slug.toUpperCase()}</span>
          <span>&middot;</span>
          <span>BRANCH: {project.defaultBranch}</span>
          <span>&middot;</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {project.formattedDate}
          </span>
        </div>

        {/* Hero Title and Summary */}
        <div className="border-b border-white/[0.08] pb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[200] tracking-tight text-[#f4f4f6] leading-tight">
            {project.title}
          </h1>

          <p className="mt-5 text-base sm:text-xl font-light text-[#a8a8b4] leading-relaxed max-w-3xl">
            {project.tagline}
          </p>

          {/* Key Metrics / GitHub Signal Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.08]">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: project.languageColor }}
              />
              <span className="text-[#e2e2e8]">{project.language}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] text-[#888890]">
              <Star className="w-3.5 h-3.5 text-[#ff7a1a]" />
              <span>{project.stars} Stars</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] text-[#888890]">
              <GitFork className="w-3.5 h-3.5 text-[#888890]" />
              <span>{project.forks} Forks</span>
            </div>

            {project.license && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] text-[#888890]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{project.license}</span>
              </div>
            )}
          </div>

          {/* Action Command Row */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff7a1a] hover:bg-white text-[#060608] font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-lg shadow-[#ff7a1a]/20"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>View On GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.2] hover:border-white text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#ff7a1a]" />
                <span>Live Demonstration</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={`${project.repoUrl}#readme`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.1] hover:border-white/[0.3] text-[#888890] hover:text-white font-mono text-xs uppercase tracking-wider transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Documentation</span>
            </a>
          </div>
        </div>

        {/* Structured Technical Dossier Grid */}
        <div className="py-12 space-y-12">
          {/* Section 01: Problem Statement */}
          <section className="bg-[#08090e] border border-white/[0.08] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff7a1a] mb-3">
              <span>01 // MOTIVATION & PROBLEM STATEMENT</span>
            </div>
            <p className="text-sm sm:text-base font-light text-[#c8c8d0] leading-relaxed">
              {project.caseStudy.problem}
            </p>
          </section>

          {/* Section 02: Architectural Approach */}
          <section className="bg-[#08090e] border border-white/[0.08] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff7a1a] mb-3">
              <span>02 // ARCHITECTURAL METHODOLOGY & APPROACH</span>
            </div>
            <p className="text-sm sm:text-base font-light text-[#c8c8d0] leading-relaxed">
              {project.caseStudy.approach}
            </p>

            {project.caseStudy.architecture && project.caseStudy.architecture.length > 0 && (
              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <span className="font-mono text-xs text-[#888892] uppercase tracking-wider block mb-3">
                  System Architecture Pipeline:
                </span>
                <ul className="space-y-2.5">
                  {project.caseStudy.architecture.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#b0b0b8] font-light">
                      <span className="text-[#ff7a1a] font-mono mt-0.5">&rsaquo;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Section 03: Technologies & Frameworks */}
          <section className="bg-[#08090e] border border-white/[0.08] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff7a1a] mb-4">
              <Code2 className="w-3.5 h-3.5" />
              <span>03 // TECHNOLOGIES & TOOLING</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#f4f4f6]"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Section 04: Benchmarks & Results (Truthful presentation) */}
          <section className="bg-[#08090e] border border-white/[0.08] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff7a1a] mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>04 // EVALUATION, RESULTS & CREDIBILITY STATUS</span>
            </div>
            {project.caseStudy.result ? (
              <div className="p-4 bg-white/[0.02] border-l-2 border-[#ff7a1a] text-sm text-[#e0e0e8] font-light leading-relaxed">
                {project.caseStudy.result}
              </div>
            ) : (
              <div className="p-4 bg-white/[0.02] border border-white/[0.06] text-xs font-light text-[#888892] leading-relaxed flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-[#ff7a1a] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[#ff7a1a] block mb-1 uppercase">
                    Verification Standard
                  </span>
                  Quantitative benchmark scores and claims on this repository are restricted to verified outputs from repeatable runs. Experimental or student research repositories avoid speculative performance claims.
                </div>
              </div>
            )}
          </section>

          {/* Section 05: Limitations & Future Improvements */}
          {project.caseStudy.limitations && (
            <section className="bg-[#08090e] border border-white/[0.08] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#888890] mb-3">
                <span>05 // KNOWN LIMITATIONS & SCOPE</span>
              </div>
              <p className="text-xs sm:text-sm font-light text-[#888892] leading-relaxed">
                {project.caseStudy.limitations}
              </p>
            </section>
          )}

          {/* Section 06: README Excerpt if available */}
          {project.readmeExcerpt && (
            <section className="bg-[#08090e] border border-white/[0.08] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                <span className="font-mono text-xs text-[#888890] uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#ff7a1a]" />
                  <span>Repository Readme Snapshot</span>
                </span>
                <a
                  href={`${project.repoUrl}#readme`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#ff7a1a] hover:underline flex items-center gap-1"
                >
                  <span>Full Readme on GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <pre className="font-mono text-xs text-[#a0a0ab] whitespace-pre-wrap leading-relaxed overflow-x-auto p-4 bg-[#040508] border border-white/[0.06]">
                {project.readmeExcerpt}
              </pre>
            </section>
          )}
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/[0.08]">
            <span className="font-mono text-xs text-[#ff7a1a] uppercase tracking-widest block mb-6">
              RELATED TECHNICAL RECORDS // {categoryDef.label.toUpperCase()}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/project/${rel.slug}`}
                  className="group bg-[#08090e] border border-white/[0.08] hover:border-[#ff7a1a]/50 p-5 transition-all block"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#888890] mb-2">
                    <span>{rel.language}</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:text-[#ff7a1a] transition-colors" />
                  </div>
                  <h4 className="text-base font-normal text-white group-hover:text-[#ff7a1a] transition-colors line-clamp-1">
                    {rel.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-[#888892] font-light line-clamp-2 leading-relaxed">
                    {rel.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex items-center justify-between">
          <Link
            href="/#archive"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.14] hover:border-[#ff7a1a] text-xs font-mono uppercase tracking-wider text-white hover:text-[#ff7a1a] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio Explorer</span>
          </Link>

          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#888890] hover:text-white flex items-center gap-1.5"
          >
            <span>github.com/DunD514/{project.name}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>
    </div>
  );
}
