"use client";

import React, { useRef, useState, useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";
import { WindowState } from "./types";

interface WindowFrameProps {
  window: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximizeToggle: () => void;
  onUpdatePosition: (x: number, y: number) => void;
  onUpdateSize: (width: number, height: number) => void;
  children: React.ReactNode;
}

export default function WindowFrame({
  window: win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximizeToggle,
  onUpdatePosition,
  onUpdateSize,
  children,
}: WindowFrameProps) {
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  const dragRef = useRef<{ isDragging: boolean; startX: number; startY: number; initX: number; initY: number }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
  });

  const resizeRef = useRef<{ isResizing: boolean; startX: number; startY: number; initW: number; initH: number }>({
    isResizing: false,
    startX: 0,
    startY: 0,
    initW: 0,
    initH: 0,
  });

  // Handle Dragging
  const handleMouseDownTitle = (e: React.MouseEvent) => {
    if (win.isMaximized) return; // Do not drag if maximized
    if ((e.target as HTMLElement).closest("button")) return; // Don't drag on buttons

    onFocus();
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initX: win.x,
      initY: win.y,
    };
  };

  // Handle Resizing
  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onFocus();
    resizeRef.current = {
      isResizing: true,
      startX: e.clientX,
      startY: e.clientY,
      initW: win.width,
      initH: win.height,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragRef.current.isDragging) {
        const deltaX = e.clientX - dragRef.current.startX;
        const deltaY = e.clientY - dragRef.current.startY;
        // Keep within reasonable viewport boundaries
        const newX = Math.max(0, Math.min(dragRef.current.initX + deltaX, window.innerWidth - 100));
        const newY = Math.max(28, Math.min(dragRef.current.initY + deltaY, window.innerHeight - 100));
        onUpdatePosition(newX, newY);
      } else if (resizeRef.current.isResizing) {
        const deltaX = e.clientX - resizeRef.current.startX;
        const deltaY = e.clientY - resizeRef.current.startY;
        const newW = Math.max(win.minWidth, Math.min(resizeRef.current.initW + deltaX, window.innerWidth - win.x));
        const newH = Math.max(win.minHeight, Math.min(resizeRef.current.initH + deltaY, window.innerHeight - win.y - 70));
        onUpdateSize(newW, newH);
      }
    };

    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
      resizeRef.current.isResizing = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [win.x, win.y, win.minWidth, win.minHeight, onUpdatePosition, onUpdateSize]);

  if (!win.isOpen || win.isMinimized) return null;

  const style: React.CSSProperties = win.isMaximized
    ? {
        position: "fixed",
        top: 28, // below menu bar
        left: 0,
        right: 0,
        bottom: 76, // above dock
        width: "100vw",
        height: "calc(100vh - 104px)",
        zIndex: win.zIndex,
      }
    : {
        position: "absolute",
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      };

  return (
    <div
      style={style}
      onMouseDown={onFocus}
      className={`rounded-xl border flex flex-col overflow-hidden transition-shadow select-none ${
        isActive
          ? "border-white/20 shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
          : "border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.45)] opacity-95"
      } bg-[#1E1F24]/95 backdrop-blur-3xl text-[#F3F4F6] animate-in fade-in zoom-in-95 duration-150`}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDownTitle}
        onDoubleClick={onMaximizeToggle}
        className={`h-10 px-4 flex items-center justify-between border-b shrink-0 cursor-default ${
          isActive
            ? "bg-[#2A2B32]/90 border-white/[0.12] text-white"
            : "bg-[#202126]/90 border-white/[0.08] text-[#9CA3AF]"
        }`}
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
        }}
      >
        {/* Left: Traffic Light Window Controls */}
        <div
          className="flex items-center gap-2 group/lights"
          onMouseEnter={() => setIsHoveringControls(true)}
          onMouseLeave={() => setIsHoveringControls(false)}
        >
          {/* Close (Red) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${
              isActive ? "bg-[#FF5F56] border border-[#E0443E]" : "bg-[#555558]"
            }`}
            aria-label="Close window"
          >
            {isHoveringControls && <X className="w-2 h-2 text-[#4C0000] stroke-[3]" />}
          </button>

          {/* Minimize (Yellow) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${
              isActive ? "bg-[#FFBD2E] border border-[#DEA123]" : "bg-[#555558]"
            }`}
            aria-label="Minimize window"
          >
            {isHoveringControls && <Minus className="w-2 h-2 text-[#5C3B00] stroke-[3]" />}
          </button>

          {/* Maximize / Zoom (Green) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMaximizeToggle();
            }}
            className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${
              isActive ? "bg-[#27C93F] border border-[#1AAB29]" : "bg-[#555558]"
            }`}
            aria-label="Maximize window"
          >
            {isHoveringControls && <Plus className="w-2 h-2 text-[#004D00] stroke-[3]" />}
          </button>
        </div>

        {/* Center: Window Title */}
        <div className="text-[13px] font-medium tracking-tight truncate px-4 pointer-events-none">
          {win.title}
        </div>

        {/* Right: Balance spacer */}
        <div className="w-14" />
      </div>

      {/* Window Content Body */}
      <div className="flex-1 overflow-hidden relative flex flex-col bg-[#16171B]">
        {children}
      </div>

      {/* Resize Handle (Bottom-Right corner) */}
      {!win.isMaximized && (
        <div
          onMouseDown={handleMouseDownResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-30"
          title="Drag to resize"
        />
      )}
    </div>
  );
}
