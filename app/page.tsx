import AerospaceExperience from "@/components/cinematic/AerospaceExperience";
import MissionArchive from "@/components/cinematic/MissionArchive";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#040508] text-[#f4f4f6]">
      {/* Acts 1 & 2: Ignition Launchpad & Interactive Earth Orbit Explorer */}
      <AerospaceExperience />

      {/* Act 3: Mission Archive Dossiers, Experience, Stack, GitHub & Contact */}
      <MissionArchive />
    </main>
  );
}
