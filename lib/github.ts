import { PORTFOLIO_DATA } from "@/data/portfolioData";

export interface GitHubRepoSummary {
  name: string;
  fullName: string;
  description: string;
  language: string;
  languageColor: string;
  url: string;
  stars: number;
  forks: number;
  updatedAt: string;
  tags: string[];
  verified: boolean;
}

export async function fetchDuncanGitHubRepos(): Promise<GitHubRepoSummary[]> {
  try {
    const res = await fetch("https://api.github.com/users/DunD514/repos?sort=updated&per_page=15", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Duncan-Portfolio-App",
      },
      next: { revalidate: 3600 }, // Cached for 1 hour
    });

    if (!res.ok) {
      console.warn(`GitHub API responded with status ${res.status}. Falling back to curated catalog.`);
      return fallbackRepos();
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      return fallbackRepos();
    }

    const langColors: Record<string, string> = {
      Python: "#3572A5",
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      SQL: "#e38c00",
      "Jupyter Notebook": "#DA5B0B",
      HTML: "#e34c26",
    };

    return repos
      .filter((r) => !r.fork && r.name !== "temp-app")
      .map((r) => ({
        name: r.name,
        fullName: r.full_name || `DunD514/${r.name}`,
        description: r.description || "Experimental repository exploring machine learning, analytics, and software systems.",
        language: r.language || "Python",
        languageColor: langColors[r.language] || "#64748b",
        url: r.html_url,
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        updatedAt: r.updated_at ? new Date(r.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Active",
        tags: Array.isArray(r.topics) && r.topics.length > 0 ? r.topics : [r.language || "Code"],
        verified: true,
      }));
  } catch (error) {
    console.warn("Failed to fetch live GitHub repos, using curated cache.", error);
    return fallbackRepos();
  }
}

function fallbackRepos(): GitHubRepoSummary[] {
  return PORTFOLIO_DATA.fallbackRepos.map((r) => ({
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
  }));
}
