import {
  ProjectCategoryKey,
  PROJECT_CATEGORIES,
  classifyRepository,
} from "./projectCategories";
import { CURATED_PROJECT_OVERRIDES } from "./curatedProjects";
import githubSnapshot from "@/data/githubSnapshot.json";
import githubReadmes from "@/data/githubReadmes.json";

export interface UnifiedProjectCaseStudy {
  problem: string;
  approach: string;
  architecture: string[];
  stack: string[];
  result?: string;
  limitations?: string;
  statusBadge?: "Production" | "Verified Prototype" | "Research" | "Experimental" | "Active Development";
}

export interface UnifiedProject {
  id: string;
  slug: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  primaryCategory: ProjectCategoryKey;
  primaryCategoryLabel: string;
  primaryCategoryColor: string;
  categories: ProjectCategoryKey[];
  language: string;
  languageColor: string;
  tags: string[];
  repoUrl: string;
  demoUrl?: string;
  stars: number;
  forks: number;
  updatedAt: string;
  formattedDate: string;
  createdAt: string;
  isFeatured: boolean;
  featuredOrder?: number;
  isPrivate: boolean;
  isFork: boolean;
  license?: string | null;
  defaultBranch: string;
  readmeExcerpt?: string;
  visualType: "deepfake" | "dementia" | "sql" | "complisphere" | "aerospace" | "generic";
  caseStudy: UnifiedProjectCaseStudy;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  SQL: "#e38c00",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  C: "#555555",
  "C++": "#f34b7d",
  Java: "#b07219",
};

/**
 * Format raw repo name into a human-readable title
 */
function formatTitle(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

export interface GitHubApiRepo {
  id: number;
  name: string;
  full_name?: string;
  description: string | null;
  language: string | null;
  html_url?: string;
  homepage?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
  created_at?: string;
  topics?: string[];
  default_branch?: string;
  license?: { spdx_id?: string } | string | null;
  fork?: boolean;
  private?: boolean;
}

/**
 * Fetch all repositories from GitHub API across all pages with error handling & timeout.
 */
export async function fetchAllGitHubRepos(): Promise<GitHubApiRepo[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Duncan-Portfolio-Engine",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    let page = 1;
    const allRepos: GitHubApiRepo[] = [];
    const maxPages = 10;

    while (page <= maxPages) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(
        `https://api.github.com/users/DunD514/repos?per_page=100&page=${page}&sort=updated`,
        {
          headers,
          next: { revalidate: 1800 }, // revalidate every 30 mins
          signal: controller.signal,
        }
      );
      clearTimeout(timeout);

      if (!res.ok) {
        console.warn(`GitHub API page ${page} returned status ${res.status}. Using snapshot baseline.`);
        break;
      }

      const repos = await res.json();
      if (!Array.isArray(repos) || repos.length === 0) {
        break;
      }

      allRepos.push(...repos);
      if (repos.length < 100) break;
      page++;
    }

    if (allRepos.length > 0) {
      return allRepos;
    }
  } catch (err) {
    console.warn("Live GitHub fetch error, using stored snapshot:", err);
  }

  return githubSnapshot as unknown as GitHubApiRepo[];
}

/**
 * In-memory unified project cache
 */
let projectCache: UnifiedProject[] | null = null;

export async function getAllProjects(forceRefresh = false): Promise<UnifiedProject[]> {
  if (!forceRefresh && projectCache) {
    return projectCache;
  }

  const rawRepos = await fetchAllGitHubRepos();
  const readmes = (githubReadmes || {}) as Record<string, string>;

  // Filter out internal forks or backup repos if needed, but preserve all genuine projects
  const validRepos = rawRepos.filter((r) => {
    const name = r.name || "";
    // Filter out obvious temporary testing copies
    return !name.includes("BACKUP") && name !== "temp-app";
  });

  const projectsMap = new Map<string, UnifiedProject>();

  for (const r of validRepos) {
    const rawName = r.name || "";
    const slug = rawName.toLowerCase();
    const override =
      CURATED_PROJECT_OVERRIDES[slug] ||
      CURATED_PROJECT_OVERRIDES[rawName] ||
      Object.values(CURATED_PROJECT_OVERRIDES).find(
        (o) => o.repoName && o.repoName.toLowerCase() === slug
      );

    const readmeExcerpt = readmes[rawName] || "";
    const classification = classifyRepository({
      name: rawName,
      description: r.description,
      topics: r.topics || [],
      language: r.language,
      readmeExcerpt,
    });

    const primaryCategory = override?.categoryOverride || classification.primaryCategory;
    const categoryDef = PROJECT_CATEGORIES[primaryCategory] || PROJECT_CATEGORIES.other;
    const categories = Array.from(
      new Set([primaryCategory, ...(override?.additionalCategories || classification.categories)])
    );

    const title = override?.customTitle || formatTitle(rawName);
    const description =
      override?.customTagline ||
      r.description ||
      (readmeExcerpt ? readmeExcerpt.split("\n\n")[0]?.replace(/^#+\s*/, "").slice(0, 160) : "") ||
      `Engineering repository exploring ${categoryDef.label.toLowerCase()} paradigms.`;

    const tags = Array.from(
      new Set([
        ...(override?.tags || []),
        ...(r.topics || []),
        ...(r.language ? [r.language] : []),
        ...classification.inferredTags,
      ])
    ).slice(0, 6);

    const lang = r.language || (tags[0] ?? "Python");
    const langColor = LANGUAGE_COLORS[lang] || "#71717a";

    const formattedDate = r.updated_at
      ? new Date(r.updated_at).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "Active";

    const caseStudy: UnifiedProjectCaseStudy = override?.caseStudy || {
      problem:
        description ||
        "Explores applied computational algorithms, feature extraction, and system architecture in this domain.",
      approach:
        readmeExcerpt.length > 50
          ? `Engineered using ${lang} with modular pipelines and continuous validation.`
          : `Applied ${lang} patterns to solve core domain constraints with structured components.`,
      architecture: [
        `Primary runtime: ${lang}`,
        `Modular components and reproducible evaluation pipelines`,
        r.license ? `Open-source distribution under ${r.license}` : "Modular repository structure",
      ],
      stack: tags.length > 0 ? tags : [lang],
      statusBadge: (r.stargazers_count ?? 0) > 0 ? "Verified Prototype" : "Experimental",
      limitations: "Ongoing optimization and expanding documentation benchmarks.",
    };

    const fallbackIso = "2025-06-01T00:00:00Z";

    const projectLicense =
      typeof r.license === "object" && r.license !== null
        ? r.license.spdx_id || null
        : typeof r.license === "string"
        ? r.license
        : null;

    const project: UnifiedProject = {
      id: slug,
      slug,
      name: rawName,
      title,
      tagline: description,
      description,
      primaryCategory,
      primaryCategoryLabel: categoryDef.label,
      primaryCategoryColor: categoryDef.accentColor,
      categories,
      language: lang,
      languageColor: langColor,
      tags,
      repoUrl: r.html_url || `https://github.com/DunD514/${rawName}`,
      demoUrl: override?.demoUrl || r.homepage || undefined,
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      updatedAt: r.updated_at || fallbackIso,
      formattedDate,
      createdAt: r.created_at || fallbackIso,
      isFeatured: Boolean(override?.isFeatured),
      featuredOrder: override?.featuredOrder,
      isPrivate: Boolean(override?.isPrivate || r.private),
      isFork: Boolean(r.fork),
      license: projectLicense,
      defaultBranch: r.default_branch || "main",
      readmeExcerpt: readmeExcerpt || undefined,
      visualType: override?.visualType || "generic",
      caseStudy,
    };

    projectsMap.set(slug, project);
  }

  // Include curated standalone projects (like complisphere-pro and private aerospace research if not in GitHub repos)
  for (const [key, override] of Object.entries(CURATED_PROJECT_OVERRIDES)) {
    if (!projectsMap.has(key)) {
      const categoryDef = PROJECT_CATEGORIES[override.categoryOverride || "other"];
      const project: UnifiedProject = {
        id: key,
        slug: key,
        name: override.customTitle || key,
        title: override.customTitle || key,
        tagline: override.customTagline || "",
        description: override.customTagline || "",
        primaryCategory: override.categoryOverride || "other",
        primaryCategoryLabel: categoryDef.label,
        primaryCategoryColor: categoryDef.accentColor,
        categories: [override.categoryOverride || "other", ...(override.additionalCategories || [])],
        language: override.caseStudy?.stack[0] || "Python",
        languageColor: "#ff7a1a",
        tags: override.tags || [],
        repoUrl: override.demoUrl || "https://github.com/DunD514",
        demoUrl: override.demoUrl,
        stars: 0,
        forks: 0,
        updatedAt: "2025-06-01T00:00:00Z",
        formattedDate: "Active",
        createdAt: "2025-01-01T00:00:00Z",
        isFeatured: Boolean(override.isFeatured),
        featuredOrder: override.featuredOrder,
        isPrivate: Boolean(override.isPrivate),
        isFork: false,
        license: "Proprietary / Research",
        defaultBranch: "main",
        visualType: override.visualType || "generic",
        caseStudy: override.caseStudy || {
          problem: "Advanced proprietary applied AI implementation.",
          approach: "High-performance modular architecture.",
          architecture: ["Next.js App Router", "Vector Database", "FastAPI"],
          stack: override.tags || [],
          statusBadge: "Production",
        },
      };
      projectsMap.set(key, project);
    }
  }

  const allProjects = Array.from(projectsMap.values());

  // Sort by featured order first, then updated date
  allProjects.sort((a, b) => {
    if (a.isFeatured && b.isFeatured) {
      return (a.featuredOrder || 99) - (b.featuredOrder || 99);
    }
    if (a.isFeatured) return -1;
    if (b.isFeatured) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  projectCache = allProjects;
  return allProjects;
}

export async function getFeaturedProjects(): Promise<UnifiedProject[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.isFeatured).slice(0, 6);
}

export async function getProjectBySlug(slug: string): Promise<UnifiedProject | null> {
  const all = await getAllProjects();
  const normalized = slug.toLowerCase();
  return (
    all.find(
      (p) =>
        p.slug === normalized ||
        p.name.toLowerCase() === normalized ||
        p.id.toLowerCase() === normalized
    ) || null
  );
}

export async function getProjectsByCategory(categoryKey: ProjectCategoryKey): Promise<UnifiedProject[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.categories.includes(categoryKey));
}

export async function getAllProjectCategoriesWithCounts(): Promise<
  { key: ProjectCategoryKey; label: string; count: number; color: string }[]
> {
  const all = await getAllProjects();
  return Object.values(PROJECT_CATEGORIES).map((cat) => {
    const count = all.filter((p) => p.categories.includes(cat.key)).length;
    return {
      key: cat.key,
      label: cat.label,
      count,
      color: cat.accentColor,
    };
  });
}
