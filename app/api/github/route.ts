import { NextResponse } from "next/server";
import { fetchDuncanGitHubRepos } from "@/lib/github";

export async function GET() {
  const repos = await fetchDuncanGitHubRepos();
  return NextResponse.json({ repos, timestamp: new Date().toISOString() });
}
