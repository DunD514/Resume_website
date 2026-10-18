import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://duncan-portfolio.onrender.com";
  const projects = await getAllProjects();

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/project/${p.slug}`,
    lastModified: new Date(p.updatedAt || "2025-06-01T00:00:00Z"),
    changeFrequency: "weekly",
    priority: p.isFeatured ? 0.9 : 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-01-01T00:00:00Z"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectEntries,
  ];
}
