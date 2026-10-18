"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Wifi,
  Battery,
  Search,
  SlidersHorizontal,
  Volume2,
  Sun,
  Moon,
  ExternalLink,
} from "lucide-react";
import { WindowId } from "./types";

interface MenuBarProps {
  activeApp: string;
  onOpenWindow: (id: WindowId) => void;
  onOpenSpotlight: () => void;
  onCloseActiveWindow: () => void;
  onMinimizeActiveWindow: () => void;
  onMaximizeActiveWindow: () => void;
  activeWindowId: WindowId | null;
}

export default function MenuBar({
  activeApp,
  onOpenWindow,
  onOpenSpotlight,
  onCloseActiveWindow,
  onMinimizeActiveWindow,
  onMaximizeActiveWindow,
  activeWindowId,
}: MenuBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [volume, setVolume] = useState(85);
  const [brightness, setBrightness] = useState(100);
  const [wifiConnected, setWifiConnected] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const menuBarRef = useRef<HTMLDivElement>(null);

  // Real-time clock formatted like macOS: "Sun Oct 18  8:36 PM"
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const str = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }) + "  " + now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(str);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setShowControlCenter(false);
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (menuName: string) => {
    if (openMenu === menuName) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menuName);
      setShowControlCenter(false);
    }
  };

  const handleMenuHover = (menuName: string) => {
    if (openMenu !== null && openMenu !== menuName) {
      setOpenMenu(menuName);
    }
  };

  return (
    <div
      ref={menuBarRef}
      className="fixed top-0 left-0 right-0 h-7 z-50 bg-[#000000]/40 backdrop-blur-2xl border-b border-white/[0.12] text-[#F3F4F6] text-[13px] font-sans select-none flex items-center justify-between px-3 shadow-sm"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
      }}
    >
      {/* Left side: Apple icon, active app, menus */}
      <div className="flex items-center gap-1">
        {/* Apple Logo Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleMenuClick("apple")}
            onMouseEnter={() => handleMenuHover("apple")}
            className={`px-2 py-0.5 rounded transition-colors flex items-center justify-center text-sm ${
              openMenu === "apple" ? "bg-white/20" : "hover:bg-white/10"
            }`}
            aria-label="Apple Menu"
          >
            <span className="text-[15px] leading-none mb-0.5"></span>
          </button>

          {openMenu === "apple" && (
            <div className="absolute top-7 left-0 w-60 bg-[#1E1F24]/90 backdrop-blur-2xl border border-white/[0.15] rounded-lg shadow-2xl py-1 text-[13px] animate-in fade-in zoom-in-95 duration-100 z-50">
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("about");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md mx-auto flex items-center justify-between"
              >
                <span>About This Mac</span>
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("settings");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>System Settings...</span>
              </button>
              <a
                href="https://github.com/DunD514"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpenMenu(null)}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>GitHub Repositories...</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <div className="h-px bg-white/10 my-1" />
              <a
                href="/duncan_dlima_resume.pdf"
                download="Duncan_DLima_Resume.pdf"
                onClick={() => setOpenMenu(null)}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between text-emerald-400 hover:text-white"
              >
                <span>Download Resume PDF</span>
                <span className="text-[11px] opacity-60">⌘D</span>
              </a>
              <div className="h-px bg-white/10 my-1" />
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("orbit");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Launch Orbit Explorer</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Restart Session...</span>
              </button>
            </div>
          )}
        </div>

        {/* Active Application Name */}
        <span className="font-semibold px-2 py-0.5 rounded cursor-default">
          {activeApp}
        </span>

        {/* File Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleMenuClick("file")}
            onMouseEnter={() => handleMenuHover("file")}
            className={`px-2 py-0.5 rounded transition-colors ${
              openMenu === "file" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            File
          </button>
          {openMenu === "file" && (
            <div className="absolute top-7 left-0 w-56 bg-[#1E1F24]/90 backdrop-blur-2xl border border-white/[0.15] rounded-lg shadow-2xl py-1 text-[13px] animate-in fade-in zoom-in-95 duration-100 z-50">
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("finder");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>New Finder Window</span>
                <span className="text-[11px] opacity-60">⌘N</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("orbit");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Open Orbit Explorer</span>
                <span className="text-[11px] opacity-60">⌘O</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("terminal");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Open Terminal</span>
                <span className="text-[11px] opacity-60">⌘T</span>
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                type="button"
                onClick={() => {
                  if (activeWindowId) onCloseActiveWindow();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Close Window</span>
                <span className="text-[11px] opacity-60">⌘W</span>
              </button>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleMenuClick("edit")}
            onMouseEnter={() => handleMenuHover("edit")}
            className={`px-2 py-0.5 rounded transition-colors ${
              openMenu === "edit" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            Edit
          </button>
          {openMenu === "edit" && (
            <div className="absolute top-7 left-0 w-48 bg-[#1E1F24]/90 backdrop-blur-2xl border border-white/[0.15] rounded-lg shadow-2xl py-1 text-[13px] animate-in fade-in zoom-in-95 duration-100 z-50">
              <button
                type="button"
                onClick={() => {
                  onOpenSpotlight();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Find Project...</span>
                <span className="text-[11px] opacity-60">⌘F</span>
              </button>
              <div className="h-px bg-white/10 my-1" />
              <div className="px-4 py-1 opacity-40 cursor-default flex items-center justify-between">
                <span>Copy</span>
                <span className="text-[11px]">⌘C</span>
              </div>
              <div className="px-4 py-1 opacity-40 cursor-default flex items-center justify-between">
                <span>Paste</span>
                <span className="text-[11px]">⌘V</span>
              </div>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleMenuClick("view")}
            onMouseEnter={() => handleMenuHover("view")}
            className={`px-2 py-0.5 rounded transition-colors ${
              openMenu === "view" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            View
          </button>
          {openMenu === "view" && (
            <div className="absolute top-7 left-0 w-52 bg-[#1E1F24]/90 backdrop-blur-2xl border border-white/[0.15] rounded-lg shadow-2xl py-1 text-[13px] animate-in fade-in zoom-in-95 duration-100 z-50">
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("finder");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>as Icons</span>
                <span className="text-[11px] opacity-60">⌘1</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("finder");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>as List</span>
                <span className="text-[11px] opacity-60">⌘2</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("finder");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>as Columns</span>
                <span className="text-[11px] opacity-60">⌘3</span>
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("orbit");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>3D Earth Orbit View</span>
              </button>
            </div>
          )}
        </div>

        {/* Window Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleMenuClick("window")}
            onMouseEnter={() => handleMenuHover("window")}
            className={`px-2 py-0.5 rounded transition-colors ${
              openMenu === "window" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            Window
          </button>
          {openMenu === "window" && (
            <div className="absolute top-7 left-0 w-48 bg-[#1E1F24]/90 backdrop-blur-2xl border border-white/[0.15] rounded-lg shadow-2xl py-1 text-[13px] animate-in fade-in zoom-in-95 duration-100 z-50">
              <button
                type="button"
                onClick={() => {
                  if (activeWindowId) onMinimizeActiveWindow();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Minimize</span>
                <span className="text-[11px] opacity-60">⌘M</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (activeWindowId) onMaximizeActiveWindow();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Zoom</span>
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("finder");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Bring All to Front</span>
              </button>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleMenuClick("help")}
            onMouseEnter={() => handleMenuHover("help")}
            className={`px-2 py-0.5 rounded transition-colors ${
              openMenu === "help" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            Help
          </button>
          {openMenu === "help" && (
            <div className="absolute top-7 left-0 w-60 bg-[#1E1F24]/90 backdrop-blur-2xl border border-white/[0.15] rounded-lg shadow-2xl py-1 text-[13px] animate-in fade-in zoom-in-95 duration-100 z-50">
              <button
                type="button"
                onClick={() => {
                  onOpenWindow("about");
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Duncan D&apos;Lima Portfolio Help</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenSpotlight();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Spotlight Search</span>
                <span className="text-[11px] opacity-60">⌘K</span>
              </button>
              <a
                href="https://linkedin.com/in/duncan-dlima"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpenMenu(null)}
                className="w-full text-left px-4 py-1 hover:bg-[#007AFF] hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Connect on LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Status icons, Control Center, Clock */}
      <div className="flex items-center gap-3">
        {/* Battery */}
        <div className="flex items-center gap-1.5 text-xs text-[#E5E7EB]">
          <span>100%</span>
          <Battery className="w-4 h-4 fill-white text-white" />
        </div>

        {/* Wi-Fi Indicator */}
        <button
          type="button"
          onClick={() => setWifiConnected(!wifiConnected)}
          className="text-white/90 hover:text-white p-0.5"
          title={wifiConnected ? "Wi-Fi: Connected to Portfolio-5G" : "Wi-Fi: Disconnected"}
        >
          <Wifi className={`w-3.5 h-3.5 ${wifiConnected ? "opacity-100" : "opacity-40"}`} />
        </button>

        {/* Spotlight Icon */}
        <button
          type="button"
          onClick={onOpenSpotlight}
          className="text-white/90 hover:text-white p-0.5"
          title="Spotlight Search (⌘K)"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Control Center Toggle */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowControlCenter(!showControlCenter);
              setOpenMenu(null);
            }}
            className={`p-1 rounded transition-colors ${
              showControlCenter ? "bg-white/20" : "hover:bg-white/10"
            }`}
            title="Control Center"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Control Center Popover */}
          {showControlCenter && (
            <div className="absolute top-8 right-0 w-72 bg-[#1E1F24]/90 backdrop-blur-2xl border border-white/[0.15] rounded-2xl shadow-2xl p-3 text-[13px] animate-in fade-in duration-150 z-50 space-y-3">
              {/* Quick toggles 2x2 grid */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWifiConnected(!wifiConnected)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-colors ${
                    wifiConnected
                      ? "bg-[#007AFF] text-white border-transparent"
                      : "bg-white/5 text-[#9CA3AF] border-white/10"
                  }`}
                >
                  <Wifi className="w-4 h-4" />
                  <div className="text-left text-xs leading-tight">
                    <span className="font-semibold block">Wi-Fi</span>
                    <span className="text-[10px] opacity-80">{wifiConnected ? "Connected" : "Off"}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-colors ${
                    darkMode
                      ? "bg-[#007AFF] text-white border-transparent"
                      : "bg-white/5 text-[#9CA3AF] border-white/10"
                  }`}
                >
                  {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <div className="text-left text-xs leading-tight">
                    <span className="font-semibold block">Dark Mode</span>
                    <span className="text-[10px] opacity-80">{darkMode ? "On" : "Off"}</span>
                  </div>
                </button>
              </div>

              {/* Display Brightness Slider */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <div className="flex items-center justify-between text-xs mb-1.5 opacity-80">
                  <span className="font-medium">Display</span>
                  <Sun className="w-3.5 h-3.5" />
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              {/* Sound Slider */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <div className="flex items-center justify-between text-xs mb-1.5 opacity-80">
                  <span className="font-medium">Sound</span>
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              {/* Quick Profile Summary in Control Center */}
              <div className="border-t border-white/10 pt-2 text-[11px] text-[#9CA3AF] flex items-center justify-between">
                <span>Duncan D&apos;Lima &middot; CTO</span>
                <span className="text-emerald-400">Available</span>
              </div>
            </div>
          )}
        </div>

        {/* Live Date and Time */}
        <span className="cursor-default font-medium tabular-nums pl-1">
          {currentTime || "Sun Oct 18  8:36 PM"}
        </span>
      </div>
    </div>
  );
}
