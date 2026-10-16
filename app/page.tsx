import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TheScale from "@/components/TheScale";
import SelectedWork from "@/components/SelectedWork";
import ExperienceSection from "@/components/ExperienceSection";
import StackSection from "@/components/StackSection";
import GitHubSection from "@/components/GitHubSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#060608] text-[#f4f4f6]">
      {/* 1. Sticky Minimalist Navigation */}
      <Navbar />

      <main className="relative">
        {/* 2. Hero with Display Typography & Interactive Stardust Canvas */}
        <Hero />

        {/* 3. The Scale: Signature 3-Layer Generative Section & Philosophy */}
        <TheScale />

        {/* 4. Selected Work: Index Rows, Visual Previews & Case Studies */}
        <SelectedWork />

        {/* 5. Experience Timeline & Academic Foundation */}
        <ExperienceSection />

        {/* 6. Technical Stack: 3 Curated Pillars & Workflow Tools */}
        <StackSection />

        {/* 7. GitHub Repositories: Cached Server Sync & Fallback */}
        <GitHubSection />

        {/* 8. Contact & Communications */}
        <ContactSection />
      </main>
    </div>
  );
}
