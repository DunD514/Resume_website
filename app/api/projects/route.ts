import { NextRequest, NextResponse } from "next/server";
import {
  getAllProjects,
  getAllProjectCategoriesWithCounts,
} from "@/lib/projects";
import { ProjectCategoryKey } from "@/lib/projectCategories";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as ProjectCategoryKey | null;
    const query = searchParams.get("q")?.toLowerCase().trim() || "";
    const language = searchParams.get("language")?.toLowerCase() || "";
    const featured = searchParams.get("featured");
    const sort = searchParams.get("sort") || "updated"; // "updated" | "stars" | "name"
    const refresh = searchParams.get("refresh") === "true";

    let projects = await getAllProjects(refresh);

    if (featured === "true") {
      projects = projects.filter((p) => p.isFeatured);
    }

    if (category && (category as string) !== "all") {
      projects = projects.filter((p) => p.categories.includes(category));
    }

    if (language) {
      projects = projects.filter((p) => p.language.toLowerCase() === language);
    }

    if (query) {
      projects = projects.filter((p) => {
        return (
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.name.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)) ||
          p.primaryCategoryLabel.toLowerCase().includes(query) ||
          (p.caseStudy?.stack && p.caseStudy.stack.some((s) => s.toLowerCase().includes(query)))
        );
      });
    }

    // Sorting
    if (sort === "stars") {
      projects.sort((a, b) => b.stars - a.stars);
    } else if (sort === "name") {
      projects.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // updated
      projects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }

    const categoriesWithCounts = await getAllProjectCategoriesWithCounts();
    const all = await getAllProjects();

    const languages = Array.from(
      new Set(all.map((p) => p.language).filter(Boolean))
    ).sort();

    return NextResponse.json({
      projects,
      total: projects.length,
      allTotal: all.length,
      categories: categoriesWithCounts,
      languages,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "digest" in err) {
      throw err;
    }
    const details = err instanceof Error ? err.message : String(err);
    console.error("API /api/projects error:", err);
    return NextResponse.json(
      { error: "Failed to load project catalog", details },
      { status: 500 }
    );
  }
}
