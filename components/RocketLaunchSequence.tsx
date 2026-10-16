"use client";

import React, { useEffect, useRef, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ArrowDown, Flame, Play, SkipForward, ShieldAlert, Radio, Activity } from "lucide-react";
import { GithubIcon } from "./Icons";

interface RocketLaunchSequenceProps {
  onEnterOrbit: () => void;
  isOrbitEntered: boolean;
}

export default function RocketLaunchSequence({ onEnterOrbit, isOrbitEntered }: RocketLaunchSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<"standby" | "igniting" | "ascending" | "orbital">("standby");
  const [countdown, setCountdown] = useState<number>(3);
  const [telemetryAltitude, setTelemetryAltitude] = useState<number>(0);
  const [telemetryVelocity, setTelemetryVelocity] = useState<number>(0);
  const [rangeSafety, setRangeSafety] = useState<string>("ARMED");

  // Check sessionStorage or prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const sessionSkipped = sessionStorage.getItem("dd_launch_skipped");
      if (prefersReducedMotion || sessionSkipped === "true") {
        setPhase("orbital");
        onEnterOrbit();
      }
    }
  }, [onEnterOrbit]);

  const handleSkip = () => {
    sessionStorage.setItem("dd_launch_skipped", "true");
    setPhase("orbital");
    onEnterOrbit();
    const target = document.getElementById("project-explorer");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInitiateLaunch = () => {
    if (phase !== "standby") return;
    setPhase("igniting");

    // Countdown sequence
    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        setPhase("ascending");
      }
    }, 900);
  };

  // Canvas-driven rocket, launchpad, smoke, flame, and ascent simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || phase === "orbital") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pool for venting steam & engine exhaust
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
      type: "steam" | "flame" | "smoke";
    }
    const particles: Particle[] = [];

    // Stars in background
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
    }));

    let rocketY = 0; // Relative upward offset
    let rocketVy = 0;
    let cameraOffsetY = 0;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Rocket physics in ascending phase
      if (phase === "ascending") {
        rocketVy += 0.08;
        rocketY += rocketVy;
        cameraOffsetY = rocketY * 0.7;

        // Telemetry calculation
        const altKm = Math.floor(rocketY * 0.45);
        const velKmh = Math.floor(rocketVy * 180);
        setTelemetryAltitude(altKm);
        setTelemetryVelocity(velKmh);

        if (altKm > 140) {
          // Reached orbit threshold!
          setPhase("orbital");
          sessionStorage.setItem("dd_launch_skipped", "true");
          onEnterOrbit();
          const target = document.getElementById("project-explorer");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
      }

      // Draw dark atmospheric sky gradient (transitions from deep night blue to space black)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      const spaceFade = Math.min(1, rocketY / 250);
      skyGrad.addColorStop(0, `rgb(${Math.floor(2 * (1 - spaceFade))}, ${Math.floor(4 * (1 - spaceFade))}, ${Math.floor(10 * (1 - spaceFade))})`);
      skyGrad.addColorStop(1, `rgb(${Math.floor(8 * (1 - spaceFade))}, ${Math.floor(14 * (1 - spaceFade))}, ${Math.floor(28 * (1 - spaceFade))})`);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw background stars
      ctx.fillStyle = "#FFFFFF";
      stars.forEach((s) => {
        const starY = (s.y + cameraOffsetY * 0.15) % height;
        ctx.globalAlpha = s.alpha * (0.4 + spaceFade * 0.6);
        ctx.beginPath();
        ctx.arc(s.x, starY, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Coordinate reference points
      const groundY = height * 0.82 + cameraOffsetY;
      const rocketBaseX = width * 0.58;
      const currentRocketY = groundY - 45 - rocketY;

      // 1. Draw Launchpad & Horizon (Recedes downward during ascent)
      if (groundY > -100) {
        // Horizon line
        ctx.fillStyle = "#03060E";
        ctx.fillRect(0, groundY, width, height - groundY);

        // Ground hazard grid line
        ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(width, groundY);
        ctx.stroke();

        // Launch Mount & Flame Trench
        ctx.fillStyle = "#0A0F1D";
        ctx.fillRect(rocketBaseX - 60, groundY - 30, 120, 30);
        ctx.strokeStyle = "#1E293B";
        ctx.strokeRect(rocketBaseX - 60, groundY - 30, 120, 30);

        // Tower Structure (Umibilical service tower)
        const towerX = rocketBaseX - 55;
        const towerHeight = 220;
        ctx.strokeStyle = "rgba(51, 65, 85, 0.9)";
        ctx.lineWidth = 1.5;

        // Vertical tower columns
        ctx.beginPath();
        ctx.moveTo(towerX - 25, groundY - 30);
        ctx.lineTo(towerX - 25, groundY - 30 - towerHeight);
        ctx.moveTo(towerX, groundY - 30);
        ctx.lineTo(towerX, groundY - 30 - towerHeight);
        ctx.stroke();

        // Tower cross-bracing trusses
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(71, 85, 105, 0.6)";
        for (let y = groundY - 30; y > groundY - 30 - towerHeight; y -= 24) {
          ctx.beginPath();
          ctx.moveTo(towerX - 25, y);
          ctx.lineTo(towerX, y - 24);
          ctx.moveTo(towerX, y);
          ctx.lineTo(towerX - 25, y - 24);
          ctx.stroke();
        }

        // Retractable umbilical swing-arms
        const armRetract = phase === "ascending" ? 18 : 0;
        ctx.strokeStyle = "#94A3B8";
        ctx.lineWidth = 2;
        // Upper arm to fairing
        ctx.beginPath();
        ctx.moveTo(towerX, groundY - 30 - towerHeight * 0.75);
        ctx.lineTo(rocketBaseX - 12 - armRetract, groundY - 30 - towerHeight * 0.75 + armRetract * 0.3);
        ctx.stroke();
        // Lower fuel umbilical
        ctx.beginPath();
        ctx.moveTo(towerX, groundY - 30 - towerHeight * 0.35);
        ctx.lineTo(rocketBaseX - 12 - armRetract, groundY - 30 - towerHeight * 0.35 + armRetract * 0.3);
        ctx.stroke();

        // Floodlight beam cutting through atmosphere
        const lightGrad = ctx.createLinearGradient(towerX - 20, groundY - 40, rocketBaseX, groundY - 180);
        lightGrad.addColorStop(0, "rgba(56, 189, 248, 0.22)");
        lightGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = lightGrad;
        ctx.beginPath();
        ctx.moveTo(towerX - 30, groundY - 20);
        ctx.lineTo(rocketBaseX + 35, groundY - 220);
        ctx.lineTo(rocketBaseX - 20, groundY - 230);
        ctx.closePath();
        ctx.fill();
      }

      // 2. Cryogenic Steam Boil-off in standby/ignition
      if (phase === "standby" || phase === "igniting") {
        if (Math.random() < 0.45) {
          particles.push({
            x: rocketBaseX + 11,
            y: currentRocketY - 95,
            vx: 0.8 + Math.random() * 1.2,
            vy: -0.2 - Math.random() * 0.5,
            size: 2.5 + Math.random() * 3,
            alpha: 0.65,
            decay: 0.012,
            type: "steam",
          });
        }
      }

      // 3. Engine Plume & Smoke Generation during Ignition/Liftoff
      if (phase === "igniting" || phase === "ascending") {
        // High density flame core particles
        for (let i = 0; i < (phase === "ascending" ? 6 : 4); i++) {
          particles.push({
            x: rocketBaseX + (Math.random() - 0.5) * 10,
            y: currentRocketY + 4,
            vx: (Math.random() - 0.5) * 1.8,
            vy: 4 + Math.random() * 8,
            size: 4 + Math.random() * 6,
            alpha: 0.9,
            decay: 0.035,
            type: "flame",
          });
        }

        // Billowing exhaust smoke cloud expanding at launchpad
        if (groundY > 0 && Math.random() < 0.7) {
          particles.push({
            x: rocketBaseX + (Math.random() - 0.5) * 35,
            y: groundY - 15,
            vx: (Math.random() - 0.5) * 6,
            vy: -0.5 - Math.random() * 1.5,
            size: 15 + Math.random() * 18,
            alpha: 0.55,
            decay: 0.015,
            type: "smoke",
          });
        }
      }

      // 4. Update & Render Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size += 0.35;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        if (p.type === "flame") {
          // Warm amber / fire gradient
          const fGrad = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, p.size);
          fGrad.addColorStop(0, "#FEF08A"); // core light yellow
          fGrad.addColorStop(0.35, "#F59E0B"); // warm amber
          fGrad.addColorStop(1, "#EA580C"); // intense orange-red
          ctx.fillStyle = fGrad;
        } else if (p.type === "steam") {
          ctx.fillStyle = "rgba(226, 232, 240, 0.8)";
        } else {
          // Billowing pad smoke
          ctx.fillStyle = "rgba(100, 116, 139, 0.45)";
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Render Rocket Body (Believable scale, aerodynamic fairing, heat-shield, stages)
      ctx.save();
      // Rocket shake during ignition and initial ascent
      if (phase === "igniting" || (phase === "ascending" && rocketY < 180)) {
        const shakeX = (Math.random() - 0.5) * 2;
        const shakeY = (Math.random() - 0.5) * 1.5;
        ctx.translate(shakeX, shakeY);
      }

      const rx = rocketBaseX;
      const ry = currentRocketY;

      // Rocket Stage 1 Body (Metallic white cylinder)
      ctx.fillStyle = "#E2E8F0";
      ctx.fillRect(rx - 10, ry - 110, 20, 110);

      // Dark avionics band & telemetry marking
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(rx - 10, ry - 118, 20, 8); // Interstage ring
      ctx.fillRect(rx - 10, ry - 65, 20, 4); // Stage seam

      // Mission insignia stripe on fuselage (atmospheric blue & orange accent)
      ctx.fillStyle = "#38BDF8";
      ctx.fillRect(rx - 8, ry - 90, 3, 20);
      ctx.fillStyle = "#F59E0B";
      ctx.fillRect(rx - 4, ry - 90, 2, 20);

      // Stage 2 & Aerodynamic Payload Fairing
      ctx.fillStyle = "#F8FAFC";
      ctx.fillRect(rx - 10, ry - 165, 20, 47);

      // Fairing ogive nose cone
      ctx.beginPath();
      ctx.moveTo(rx - 10, ry - 165);
      ctx.quadraticCurveTo(rx - 9, ry - 195, rx, ry - 208);
      ctx.quadraticCurveTo(rx + 9, ry - 195, rx + 10, ry - 165);
      ctx.closePath();
      ctx.fill();

      // Stage 1 Base Nozzle Engine Bell
      ctx.fillStyle = "#334155";
      ctx.beginPath();
      ctx.moveTo(rx - 8, ry);
      ctx.lineTo(rx - 11, ry + 7);
      ctx.lineTo(rx + 11, ry + 7);
      ctx.lineTo(rx + 8, ry);
      ctx.closePath();
      ctx.fill();

      // Atmospheric Mach Shockwave / Vapor Cone (during high speed ascent)
      if (phase === "ascending" && rocketY > 50 && rocketY < 160) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(rx, ry - 175, 22, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [phase, onEnterOrbit]);

  return (
    <section
      id="mission-launch"
      className="relative min-h-screen flex items-center justify-between overflow-hidden bg-[#02040A] text-[#F8FAFC] select-none"
      aria-label="Mission Launch Control"
    >
      {/* Cinematic Canvas Background */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Top Telemetry Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-8 py-4 flex items-center justify-between border-b border-sky-500/20 bg-[#02040A]/85 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900 border border-sky-500/30 font-mono text-xs text-sky-400">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>MISSION CONTROL // LAUNCH COMPLEX 39A</span>
          </div>
          <span className="hidden md:inline font-mono text-xs text-slate-400">
            PAD STATUS: {phase === "standby" ? "GO FOR IGNITION" : phase.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSkip}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors cursor-pointer"
            title="Bypass launch sequence to orbital project discovery"
          >
            <SkipForward className="w-3.5 h-3.5 text-amber-400" />
            <span>Skip to Orbit</span>
          </button>
        </div>
      </div>

      {/* Main Narrative & Telemetry Panel Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-12 flex flex-col justify-between min-h-[calc(100vh-80px)] pointer-events-none">
        {/* Left Column: Mission Log Narrative */}
        <div className="max-w-xl space-y-6 pt-6 pointer-events-auto">
          {/* Mission Callsign Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900/90 border border-sky-500/30 text-xs font-mono tracking-widest uppercase text-sky-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            {PORTFOLIO_DATA.mission.logNumber}
          </div>

          {/* Main Mission Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight font-['Space_Grotesk'] text-slate-100 leading-tight">
              &ldquo;{PORTFOLIO_DATA.mission.tagline}&rdquo;
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              {PORTFOLIO_DATA.mission.subheadline}
            </p>
          </div>

          {/* Commander Identity & Verified Context */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-200">
              COMMANDER: Duncan D’Lima
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-amber-400">
              3.89/4.0 CGPA (NMIMS)
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-sky-400">
              CTO & Co-Founder (Tekkloom)
            </span>
          </div>

          {/* Launch Controls & CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {phase === "standby" ? (
              <button
                onClick={handleInitiateLaunch}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 border border-amber-400/40 shadow-lg shadow-orange-950/40 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Flame className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span>INITIATE LAUNCH SEQUENCE</span>
              </button>
            ) : phase === "igniting" ? (
              <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-mono text-sm font-bold text-yellow-300 bg-amber-950/80 border border-amber-500 animate-pulse">
                <Flame className="w-4 h-4 text-orange-400 animate-spin" />
                <span>IGNITION T-0{countdown}s ...</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-cyan-300 bg-sky-950/80 border border-sky-400">
                <Activity className="w-4 h-4 animate-spin text-cyan-400" />
                <span>ASCENDING: ALT {telemetryAltitude} KM // VEL {telemetryVelocity} KM/H</span>
              </div>
            )}

            <button
              onClick={handleSkip}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/40 transition-all cursor-pointer"
            >
              <span>{PORTFOLIO_DATA.mission.primaryCta}</span>
              <ArrowDown className="w-3.5 h-3.5 text-sky-400" />
            </button>

            <a
              href={PORTFOLIO_DATA.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs text-slate-400 hover:text-white bg-transparent hover:bg-slate-900 border border-slate-800 transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-slate-300" />
              <span>{PORTFOLIO_DATA.mission.secondaryCta}</span>
            </a>
          </div>
        </div>

        {/* Bottom Mission Telemetry Strip */}
        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px] pointer-events-auto">
          <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 block uppercase">STAGE 1 LOX / RP-1</span>
            <span className="text-emerald-400 font-bold">100% PRESSURIZED</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 block uppercase">GUIDANCE INERTIAL</span>
            <span className="text-sky-400 font-bold">ALIGNED // ZERO-DRIFT</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 block uppercase">RANGE SAFETY SYSTEM</span>
            <span className="text-amber-400 font-bold">ARMED // GO FOR FLIGHT</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 block uppercase">TELEMETRY DOWNLINK</span>
            <span className="text-slate-300 font-bold">19.076° N, 72.877° E (MUMBAI)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
