"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import RocketLaunchSequence from "@/components/RocketLaunchSequence";
import CredibilityStrip from "@/components/CredibilityStrip";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import GitHubSection from "@/components/GitHubSection";
import ContactSection from "@/components/ContactSection";
import ResumeModal from "@/components/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isOrbitEntered, setIsOrbitEntered] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#02040A] text-[#F8FAFC]">
      {/* Flight Navigation Bar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Mission Experience */}
      <main className="relative">
        {/* 1. Opening Cinematic Experience: Rocket Launch Sequence */}
        <RocketLaunchSequence
          onEnterOrbit={() => setIsOrbitEntered(true)}
          isOrbitEntered={isOrbitEntered}
        />

        {/* 2. Mission Flight Rating & Telemetry Strip */}
        <CredibilityStrip />

        {/* 3. The Project Globe & Mission Archive (Orbital Discovery Interface) */}
        <FeaturedProjects />

        {/* 4. Flight Philosophy & Systemic Pipeline */}
        <AboutSection />

        {/* 5. Career Flight Record & Academy Foundation */}
        <ExperienceSection />

        {/* 6. Avionics & Technical Toolkit */}
        <SkillsSection />

        {/* 7. GitHub Telemetry Repositories */}
        <GitHubSection />

        {/* 8. Mission Communications Uplink */}
        <ContactSection />
      </main>

      {/* Flight Manual (Resume) Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
