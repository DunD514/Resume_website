"use client";

import React, { useState, useEffect, useCallback } from "react";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import WindowFrame from "./WindowFrame";
import Spotlight from "./Spotlight";
import Launchpad from "./Launchpad";
import FinderApp from "./apps/FinderApp";
import OrbitExplorerApp from "./apps/OrbitExplorerApp";
import AboutThisMacApp from "./apps/AboutThisMacApp";
import TerminalApp from "./apps/TerminalApp";
import ResumeApp from "./apps/ResumeApp";
import MailApp from "./apps/MailApp";
import ProjectDossierApp from "./apps/ProjectDossierApp";
import { WindowId, WindowState } from "./types";
import { UnifiedProject } from "@/lib/projects";
import {
  OrbitExplorerIcon,
  ResumeIcon,
  TerminalIcon,
  AboutMacIcon,
  FolderIcon,
} from "./MacIcons";

interface MacDesktopProps {
  initialProjects: UnifiedProject[];
}

export default function MacDesktop({ initialProjects }: MacDesktopProps) {
  const [projects] = useState<UnifiedProject[]>(initialProjects);
  const [selectedDossierProject, setSelectedDossierProject] = useState<UnifiedProject | null>(
    initialProjects[0] || null
  );

  // Spotlight & Launchpad overlays
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);

  // Active top window ID
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>("finder");

  // Selected desktop icon
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<string | null>(null);

  // Window states
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    finder: {
      id: "finder",
      title: "Finder — Projects & Codebases",
      iconType: "finder",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 70,
      y: 46,
      width: 940,
      height: 580,
      minWidth: 640,
      minHeight: 400,
    },
    orbit: {
      id: "orbit",
      title: "Orbit Explorer — NASA 3D Telemetry",
      iconType: "orbit",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 11,
      x: 110,
      y: 56,
      width: 900,
      height: 580,
      minWidth: 680,
      minHeight: 440,
    },
    dossier: {
      id: "dossier",
      title: "Project Dossier — Technical Inspector",
      iconType: "dossier",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 12,
      x: 180,
      y: 68,
      width: 780,
      height: 560,
      minWidth: 540,
      minHeight: 380,
    },
    terminal: {
      id: "terminal",
      title: "duncan@macbook-pro ~ -zsh — 80x24",
      iconType: "terminal",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 13,
      x: 220,
      y: 90,
      width: 680,
      height: 440,
      minWidth: 480,
      minHeight: 300,
    },
    resume: {
      id: "resume",
      title: "Preview — Duncan_DLima_Resume.pdf",
      iconType: "resume",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 14,
      x: 130,
      y: 50,
      width: 860,
      height: 620,
      minWidth: 600,
      minHeight: 400,
    },
    contact: {
      id: "contact",
      title: "Mail — Compose Inquiry",
      iconType: "contact",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 15,
      x: 260,
      y: 80,
      width: 620,
      height: 480,
      minWidth: 460,
      minHeight: 320,
    },
    about: {
      id: "about",
      title: "About This Mac — Duncan D'Lima",
      iconType: "about",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 16,
      x: 300,
      y: 95,
      width: 620,
      height: 460,
      minWidth: 480,
      minHeight: 360,
    },
    settings: {
      id: "settings",
      title: "System Settings",
      iconType: "about",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 9,
      x: 300,
      y: 95,
      width: 620,
      height: 460,
      minWidth: 480,
      minHeight: 360,
    },
  });

  // Focus a window
  const focusWindow = useCallback((id: WindowId) => {
    setActiveWindowId(id);
    setWindows((curr) => {
      const maxZ = Math.max(...Object.values(curr).map((w) => w.zIndex), 10);
      return {
        ...curr,
        [id]: {
          ...curr[id],
          isOpen: true,
          isMinimized: false,
          zIndex: maxZ + 1,
        },
      };
    });
  }, []);

  // Open or focus a window
  const openWindow = useCallback(
    (id: WindowId) => {
      focusWindow(id);
    },
    [focusWindow]
  );

  // Close a window
  const closeWindow = useCallback((id: WindowId) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], isOpen: false, isMinimized: false },
    }));
    // If active window was closed, focus highest remaining open window
    setActiveWindowId((prevActive) => {
      if (prevActive === id) {
        return null;
      }
      return prevActive;
    });
  }, []);

  // Minimize a window
  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], isMinimized: true },
    }));
    setActiveWindowId((prevActive) => (prevActive === id ? null : prevActive));
  }, []);

  // Maximize / Restore toggle
  const toggleMaximizeWindow = useCallback((id: WindowId) => {
    setWindows((curr) => {
      const win = curr[id];
      if (!win) return curr;
      return {
        ...curr,
        [id]: {
          ...win,
          isMaximized: !win.isMaximized,
        },
      };
    });
  }, []);

  // Position update
  const updatePosition = useCallback((id: WindowId, x: number, y: number) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], x, y },
    }));
  }, []);

  // Size update
  const updateSize = useCallback((id: WindowId, width: number, height: number) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], width, height },
    }));
  }, []);

  // Open project in dedicated Dossier window
  const handleOpenProjectDossier = useCallback(
    (project: UnifiedProject) => {
      setSelectedDossierProject(project);
      openWindow("dossier");
    },
    [openWindow]
  );

  // Active App Name computed for Menu Bar
  const activeAppName = (() => {
    if (!activeWindowId) return "Finder";
    switch (activeWindowId) {
      case "finder":
        return "Finder";
      case "orbit":
        return "Orbit Explorer";
      case "dossier":
        return "Inspector";
      case "terminal":
        return "Terminal";
      case "resume":
        return "Preview";
      case "contact":
        return "Mail";
      case "about":
      case "settings":
        return "System Settings";
      default:
        return "Finder";
    }
  })();

  // Global hotkeys: Cmd+K / Ctrl+K for Spotlight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (isSpotlightOpen) setIsSpotlightOpen(false);
        if (isLaunchpadOpen) setIsLaunchpadOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpotlightOpen, isLaunchpadOpen]);

  // Desktop Icons Configuration
  const desktopIcons = [
    {
      id: "projects-folder",
      name: "Projects Archive",
      icon: <FolderIcon size={52} label="38" />,
      action: () => openWindow("finder"),
    },
    {
      id: "orbit-app",
      name: "Orbit Explorer.app",
      icon: <OrbitExplorerIcon size={52} />,
      action: () => openWindow("orbit"),
    },
    {
      id: "resume-file",
      name: "Duncan_Resume.pdf",
      icon: <ResumeIcon size={52} />,
      action: () => openWindow("resume"),
    },
    {
      id: "terminal-app",
      name: "Terminal.app",
      icon: <TerminalIcon size={52} />,
      action: () => openWindow("terminal"),
    },
    {
      id: "about-app",
      name: "About Duncan.app",
      icon: <AboutMacIcon size={52} />,
      action: () => openWindow("about"),
    },
  ];

  return (
    <div
      onClick={() => setSelectedDesktopIcon(null)}
      className="relative w-screen h-screen overflow-hidden select-none font-sans bg-[#0c101a]"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif',
      }}
    >
      {/* Authentic macOS Sequoia / Sonoma Dynamic Wallpaper */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-700"
        style={{
          background: `
            radial-gradient(ellipse 110% 85% at 75% 15%, rgba(68, 97, 242, 0.45) 0%, transparent 60%),
            radial-gradient(ellipse 95% 80% at 20% 90%, rgba(220, 75, 120, 0.35) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 85% 85%, rgba(245, 130, 32, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 40% 30%, rgba(130, 45, 215, 0.4) 0%, transparent 60%),
            linear-gradient(135deg, #090c14 0%, #0d1222 45%, #14172a 100%)
          `,
        }}
      />

      {/* Top Menu Bar */}
      <MenuBar
        activeApp={activeAppName}
        onOpenWindow={openWindow}
        onOpenSpotlight={() => setIsSpotlightOpen(true)}
        onCloseActiveWindow={() => activeWindowId && closeWindow(activeWindowId)}
        onMinimizeActiveWindow={() => activeWindowId && minimizeWindow(activeWindowId)}
        onMaximizeActiveWindow={() => activeWindowId && toggleMaximizeWindow(activeWindowId)}
        activeWindowId={activeWindowId}
      />

      {/* Desktop Workspace Area (below menu bar, above dock) */}
      <div className="absolute inset-0 pt-7 pb-20 overflow-hidden pointer-events-auto">
        {/* Desktop Icons (top-right column, authentic macOS layout) */}
        <div className="absolute top-10 right-5 flex flex-col space-y-5 z-0 pointer-events-auto items-center">
          {desktopIcons.map((item) => {
            const isSelected = selectedDesktopIcon === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDesktopIcon(item.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  item.action();
                }}
                className={`flex flex-col items-center group w-24 p-1.5 rounded-lg transition-colors cursor-default focus:outline-none ${
                  isSelected
                    ? "bg-blue-600/35 border border-blue-400/50 backdrop-blur-sm"
                    : "hover:bg-white/10"
                }`}
              >
                <div className="drop-shadow-2xl transition-transform group-hover:scale-105 active:scale-95">
                  {item.icon}
                </div>
                <span
                  className={`mt-1.5 text-[11px] font-medium text-center text-white line-clamp-2 px-1 rounded transition-colors drop-shadow ${
                    isSelected ? "bg-blue-600 text-white font-semibold" : "text-white/90"
                  }`}
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Windows Container */}
        {windows.finder.isOpen && (
          <WindowFrame
            window={windows.finder}
            isActive={activeWindowId === "finder"}
            onFocus={() => focusWindow("finder")}
            onClose={() => closeWindow("finder")}
            onMinimize={() => minimizeWindow("finder")}
            onMaximizeToggle={() => toggleMaximizeWindow("finder")}
            onUpdatePosition={(x, y) => updatePosition("finder", x, y)}
            onUpdateSize={(w, h) => updateSize("finder", w, h)}
          >
            <FinderApp
              projects={projects}
              onOpenProjectDossier={handleOpenProjectDossier}
            />
          </WindowFrame>
        )}

        {windows.orbit.isOpen && (
          <WindowFrame
            window={windows.orbit}
            isActive={activeWindowId === "orbit"}
            onFocus={() => focusWindow("orbit")}
            onClose={() => closeWindow("orbit")}
            onMinimize={() => minimizeWindow("orbit")}
            onMaximizeToggle={() => toggleMaximizeWindow("orbit")}
            onUpdatePosition={(x, y) => updatePosition("orbit", x, y)}
            onUpdateSize={(w, h) => updateSize("orbit", w, h)}
          >
            <OrbitExplorerApp
              projects={projects}
              onOpenProject={handleOpenProjectDossier}
            />
          </WindowFrame>
        )}

        {windows.dossier.isOpen && (
          <WindowFrame
            window={windows.dossier}
            isActive={activeWindowId === "dossier"}
            onFocus={() => focusWindow("dossier")}
            onClose={() => closeWindow("dossier")}
            onMinimize={() => minimizeWindow("dossier")}
            onMaximizeToggle={() => toggleMaximizeWindow("dossier")}
            onUpdatePosition={(x, y) => updatePosition("dossier", x, y)}
            onUpdateSize={(w, h) => updateSize("dossier", w, h)}
          >
            <ProjectDossierApp project={selectedDossierProject} />
          </WindowFrame>
        )}

        {windows.terminal.isOpen && (
          <WindowFrame
            window={windows.terminal}
            isActive={activeWindowId === "terminal"}
            onFocus={() => focusWindow("terminal")}
            onClose={() => closeWindow("terminal")}
            onMinimize={() => minimizeWindow("terminal")}
            onMaximizeToggle={() => toggleMaximizeWindow("terminal")}
            onUpdatePosition={(x, y) => updatePosition("terminal", x, y)}
            onUpdateSize={(w, h) => updateSize("terminal", w, h)}
          >
            <TerminalApp
              projects={projects}
              onOpenApp={(id) => openWindow(id as WindowId)}
              onOpenProject={handleOpenProjectDossier}
            />
          </WindowFrame>
        )}

        {windows.resume.isOpen && (
          <WindowFrame
            window={windows.resume}
            isActive={activeWindowId === "resume"}
            onFocus={() => focusWindow("resume")}
            onClose={() => closeWindow("resume")}
            onMinimize={() => minimizeWindow("resume")}
            onMaximizeToggle={() => toggleMaximizeWindow("resume")}
            onUpdatePosition={(x, y) => updatePosition("resume", x, y)}
            onUpdateSize={(w, h) => updateSize("resume", w, h)}
          >
            <ResumeApp />
          </WindowFrame>
        )}

        {windows.contact.isOpen && (
          <WindowFrame
            window={windows.contact}
            isActive={activeWindowId === "contact"}
            onFocus={() => focusWindow("contact")}
            onClose={() => closeWindow("contact")}
            onMinimize={() => minimizeWindow("contact")}
            onMaximizeToggle={() => toggleMaximizeWindow("contact")}
            onUpdatePosition={(x, y) => updatePosition("contact", x, y)}
            onUpdateSize={(w, h) => updateSize("contact", w, h)}
          >
            <MailApp />
          </WindowFrame>
        )}

        {windows.about.isOpen && (
          <WindowFrame
            window={windows.about}
            isActive={activeWindowId === "about"}
            onFocus={() => focusWindow("about")}
            onClose={() => closeWindow("about")}
            onMinimize={() => minimizeWindow("about")}
            onMaximizeToggle={() => toggleMaximizeWindow("about")}
            onUpdatePosition={(x, y) => updatePosition("about", x, y)}
            onUpdateSize={(w, h) => updateSize("about", w, h)}
          >
            <AboutThisMacApp onOpenApp={(id) => openWindow(id as WindowId)} />
          </WindowFrame>
        )}
      </div>

      {/* Floating Translucent Dock */}
      <Dock
        onOpenWindow={openWindow}
        onOpenLaunchpad={() => setIsLaunchpadOpen(true)}
        windows={windows}
      />

      {/* Spotlight Search Overlay (Cmd+K) */}
      <Spotlight
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        projects={projects}
        onOpenApp={(id) => openWindow(id as WindowId)}
        onOpenProject={handleOpenProjectDossier}
      />

      {/* Launchpad Fullscreen App Grid Overlay */}
      <Launchpad
        isOpen={isLaunchpadOpen}
        onClose={() => setIsLaunchpadOpen(false)}
        projects={projects}
        onOpenApp={(id) => openWindow(id as WindowId)}
        onOpenProject={handleOpenProjectDossier}
      />
    </div>
  );
}
