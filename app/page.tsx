import MacDesktop from "@/components/macos/MacDesktop";
import { getAllProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      <MacDesktop initialProjects={projects} />
    </main>
  );
}
