import { getAllProjects, UnifiedProject } from "./projects";

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
  category?: string;
  slug?: string;
}

export async function fetchDuncanGitHubRepos(): Promise<GitHubRepoSummary[]> {
  try {
    const projects = await getAllProjects();
    return projects
      .filter((p) => !p.isFork)
      .map((p: UnifiedProject) => ({
        name: p.name,
        fullName: `DunD514/${p.name}`,
        description: p.description,
        language: p.language,
        languageColor: p.languageColor,
        url: p.repoUrl,
        stars: p.stars,
        forks: p.forks,
        updatedAt: p.formattedDate,
        tags: p.tags,
        verified: true,
        category: p.primaryCategoryLabel,
        slug: p.slug,
      }));
  } catch (err) {
    console.warn("Error in fetchDuncanGitHubRepos, using static snapshot", err);
    return [];
  }
}
