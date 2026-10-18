"use client";

import React, { useState } from "react";
import {
  FinderIcon,
  OrbitExplorerIcon,
  LaunchpadIcon,
  PreviewIcon,
  TerminalIcon,
  SettingsIcon,
  MailIcon,
  FolderIcon,
} from "./MacIcons";
import { WindowId, WindowState } from "./types";

interface DockProps {
  onOpenWindow: (id: WindowId) => void;
  onOpenLaunchpad: () => void;
  windows: Record<WindowId, WindowState>;
}

interface DockItemDef {
  id: WindowId | "launchpad" | "github";
  name: string;
  renderIcon: (size: number) => React.ReactNode;
  action: () => void;
}

export default function Dock({ onOpenWindow, onOpenLaunchpad, windows }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dockItems: DockItemDef[] = [
    {
      id: "finder",
      name: "Finder",
      renderIcon: (size) => <FinderIcon size={size} />,
      action: () => onOpenWindow("finder"),
    },
    {
      id: "orbit",
      name: "Orbit Explorer",
      renderIcon: (size) => <OrbitExplorerIcon size={size} />,
      action: () => onOpenWindow("orbit"),
    },
    {
      id: "launchpad",
      name: "Launchpad",
      renderIcon: (size) => <LaunchpadIcon size={size} />,
      action: onOpenLaunchpad,
    },
    {
      id: "dossier",
      name: "Project Dossiers",
      renderIcon: (size) => <FolderIcon size={size} />,
      action: () => onOpenWindow("dossier"),
    },
    {
      id: "terminal",
      name: "Terminal",
      renderIcon: (size) => <TerminalIcon size={size} />,
      action: () => onOpenWindow("terminal"),
    },
    {
      id: "resume",
      name: "Resume PDF",
      renderIcon: (size) => <PreviewIcon size={size} />,
      action: () => onOpenWindow("resume"),
    },
    {
      id: "contact",
      name: "Mail",
      renderIcon: (size) => <MailIcon size={size} />,
      action: () => onOpenWindow("contact"),
    },
    {
      id: "about",
      name: "System Settings",
      renderIcon: (size) => <SettingsIcon size={size} />,
      action: () => onOpenWindow("about"),
    },
  ];

  // Minimized windows to show on the right of the divider
  const minimizedWindows = Object.values(windows).filter(
    (w) => w.isOpen && w.isMinimized
  );

  return (
    <div className="fixed bottom-3 left-0 right-0 flex justify-center z-40 pointer-events-none select-none">
      <div
        className="pointer-events-auto bg-[#FFFFFF]/10 dark:bg-[#1E1F24]/60 backdrop-blur-2xl border border-white/[0.2] px-3.5 py-2.5 rounded-2xl shadow-2xl flex items-end gap-2.5 transition-all duration-200"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {dockItems.map((item, idx) => {
          // Dynamic magnification calculation
          let scale = 1;
          if (hoveredIndex !== null) {
            const distance = Math.abs(hoveredIndex - idx);
            if (distance === 0) scale = 1.35;
            else if (distance === 1) scale = 1.18;
            else if (distance === 2) scale = 1.06;
          }

          const baseSize = 48;
          const isAppRunning =
            item.id !== "launchpad" &&
            item.id !== "github" &&
            windows[item.id as WindowId]?.isOpen;

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredIndex(idx)}
            >
              {/* Native macOS Tooltip */}
              <div
                className="absolute -top-10 px-2.5 py-1 bg-[#1E1F24]/90 backdrop-blur-md text-white text-[11px] font-medium rounded-md shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50"
                style={{
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                }}
              >
                {item.name}
              </div>

              {/* Magnified Icon Button */}
              <button
                type="button"
                onClick={item.action}
                className="transition-transform duration-150 ease-out origin-bottom focus:outline-none cursor-pointer"
                style={{
                  transform: `scale(${scale})`,
                }}
                aria-label={`Open ${item.name}`}
              >
                {item.renderIcon(baseSize)}
              </button>

              {/* Active app indicator dot */}
              <div
                className={`w-1 h-1 rounded-full mt-1 transition-all ${
                  isAppRunning ? "bg-white opacity-90 shadow-sm" : "opacity-0"
                }`}
              />
            </div>
          );
        })}

        {/* Minimized Windows Section (if any) */}
        {minimizedWindows.length > 0 && (
          <>
            {/* Divider */}
            <div className="w-px h-10 bg-white/20 self-center mx-1" />

            {minimizedWindows.map((win) => (
              <div
                key={win.id}
                className="relative flex flex-col items-center group cursor-pointer"
                onClick={() => onOpenWindow(win.id)}
              >
                <div className="absolute -top-10 px-2.5 py-1 bg-[#1E1F24]/90 backdrop-blur-md text-white text-[11px] font-medium rounded-md shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
                  {win.title} (Minimized)
                </div>

                <div className="w-12 h-12 bg-black/40 border border-white/20 rounded-xl overflow-hidden flex items-center justify-center p-1 hover:border-[#FF7A1A] transition-colors shadow-lg">
                  <div className="text-[10px] text-white/80 font-mono text-center truncate px-1">
                    {win.title}
                  </div>
                </div>

                <div className="w-1 h-1 rounded-full mt-1 bg-white opacity-90" />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
