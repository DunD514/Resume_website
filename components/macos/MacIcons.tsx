import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Authentic macOS Finder Icon (Dual-tone smiling face)
 */
export function FinderIcon({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative rounded-[22%] overflow-hidden shadow-lg shadow-blue-500/20 select-none flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(180deg, #64B5F6 0%, #1976D2 50%, #0D47A1 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none" />
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[78%] h-[78%] drop-shadow-md"
      >
        {/* Left half face */}
        <path
          d="M 18 20 C 18 20 40 18 48 20 C 50 35 48 65 48 80 C 40 82 18 80 18 80 Z"
          fill="#E3F2FD"
        />
        {/* Right half face */}
        <path
          d="M 52 20 C 60 18 82 20 82 20 C 82 20 82 80 82 80 C 60 82 52 80 52 80 Z"
          fill="#90CAF9"
        />
        {/* Face divider line */}
        <path
          d="M 50 18 L 50 82"
          stroke="#1565C0"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Left Eye */}
        <circle cx="34" cy="42" r="5" fill="#0D47A1" />
        {/* Right Eye */}
        <circle cx="66" cy="42" r="5" fill="#0D47A1" />
        {/* Smile */}
        <path
          d="M 32 62 Q 50 78 68 62"
          stroke="#0D47A1"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * Authentic Orbit Explorer Icon (Globe with orbital ring)
 */
export function OrbitExplorerIcon({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative rounded-[22%] overflow-hidden shadow-lg shadow-orange-500/20 select-none flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(180deg, #1A1F36 0%, #0F121F 60%, #080A12 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/20 pointer-events-none" />
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[82%] h-[82%] drop-shadow"
      >
        {/* Glowing Atmosphere */}
        <circle cx="50" cy="50" r="30" fill="url(#earthGlow)" />
        {/* Core Planet */}
        <circle cx="50" cy="50" r="26" fill="#1E40AF" />
        {/* Continents */}
        <path
          d="M 40 38 Q 45 32 55 35 Q 60 42 52 48 Q 44 46 40 38 Z"
          fill="#10B981"
          opacity="0.85"
        />
        <path
          d="M 35 52 Q 42 50 48 58 Q 42 66 36 62 Z"
          fill="#10B981"
          opacity="0.85"
        />
        <path
          d="M 55 52 Q 62 48 66 56 Q 60 62 56 58 Z"
          fill="#10B981"
          opacity="0.85"
        />
        {/* Orange Orbital Ring */}
        <ellipse
          cx="50"
          cy="50"
          rx="38"
          ry="14"
          transform="rotate(-25 50 50)"
          stroke="#FF7A1A"
          strokeWidth="3.5"
          fill="none"
        />
        {/* Beacon */}
        <circle cx="76" cy="38" r="3.5" fill="#FFFFFF" />
        <defs>
          <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Launchpad Icon (Grid of colorful dots)
 */
export function LaunchpadIcon({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative rounded-[22%] overflow-hidden shadow-lg select-none flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(180deg, #3A3B45 0%, #202129 60%, #15161C 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/20 pointer-events-none" />
      <div className="grid grid-cols-3 gap-1.5 p-2.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-sm" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm" />
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm" />
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-sm" />
        <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-sm" />
        <div className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-sm" />
        <div className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-sm" />
      </div>
    </div>
  );
}

/**
 * Preview / Resume Icon
 */
export function PreviewIcon({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative rounded-[22%] overflow-hidden shadow-lg select-none flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(180deg, #F9FAFB 0%, #E5E7EB 70%, #D1D5DB 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/60 pointer-events-none" />
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[74%] h-[74%]"
      >
        {/* Document Sheet */}
        <path
          d="M 24 16 L 62 16 L 76 30 L 76 84 L 24 84 Z"
          fill="#FFFFFF"
          stroke="#9CA3AF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Folded Corner */}
        <path d="M 62 16 L 62 30 L 76 30 Z" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
        {/* Text lines */}
        <line x1="32" y1="38" x2="56" y2="38" stroke="#FF7A1A" strokeWidth="4" strokeLinecap="round" />
        <line x1="32" y1="48" x2="68" y2="48" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="58" x2="68" y2="58" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="68" x2="52" y2="68" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
        {/* PDF Badge */}
        <rect x="48" y="66" width="24" height="14" rx="2" fill="#EF4444" />
        <text x="52" y="77" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="system-ui">
          PDF
        </text>
      </svg>
    </div>
  );
}

/**
 * Terminal Icon
 */
export function TerminalIcon({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative rounded-[22%] overflow-hidden shadow-lg select-none flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(180deg, #2D3037 0%, #17181C 70%, #0F1012 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 pointer-events-none" />
      <div className="font-mono text-emerald-400 font-bold flex items-center" style={{ fontSize: size * 0.38 }}>
        <span>&gt;</span>
        <span className="w-1.5 h-3 bg-white ml-0.5 animate-pulse" />
      </div>
    </div>
  );
}

/**
 * System Settings / About Icon (Mac Metallic Gear)
 */
export function SettingsIcon({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative rounded-[22%] overflow-hidden shadow-lg select-none flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(180deg, #9CA3AF 0%, #6B7280 50%, #4B5563 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/40 pointer-events-none" />
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[72%] h-[72%] text-white"
      >
        <circle cx="50" cy="50" r="14" fill="#374151" />
        <path
          d="M 50 20 L 53 28 L 61 25 L 61 34 L 70 34 L 67 42 L 75 45 L 70 52 L 77 58 L 69 63 L 73 71 L 64 73 L 64 82 L 56 80 L 53 88 L 47 88 L 44 80 L 36 82 L 36 73 L 27 71 L 31 63 L 23 58 L 30 52 L 25 45 L 33 42 L 30 34 L 39 34 L 39 25 L 47 28 Z"
          fill="#D1D5DB"
          stroke="#4B5563"
          strokeWidth="2"
        />
        <circle cx="50" cy="50" r="10" fill="#1F2937" />
      </svg>
    </div>
  );
}

/**
 * Mail Icon (macOS Blue Stamp Envelope)
 */
export function MailIcon({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative rounded-[22%] overflow-hidden shadow-lg select-none flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(180deg, #38BDF8 0%, #0284C7 60%, #0369A1 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none" />
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[75%] h-[75%] text-white drop-shadow"
      >
        <rect x="18" y="26" width="64" height="48" rx="6" fill="#F8FAFC" />
        <path
          d="M 20 28 L 50 54 L 80 28"
          stroke="#0284C7"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Stamp */}
        <rect x="62" y="32" width="14" height="18" rx="2" fill="#E2E8F0" stroke="#0284C7" strokeWidth="1" />
        <path d="M 65 37 Q 69 34 73 37" stroke="#EA580C" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

/**
 * Projects Folder Icon (macOS translucent blue folder)
 */
export function FolderIcon({
  className = "",
  size = 48,
  label = "",
}: IconProps & { label?: string }) {
  return (
    <div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Back folder tab */}
        <path
          d="M 12 32 C 12 28 15 25 19 25 L 40 25 C 44 25 47 28 50 32 L 81 32 C 85 32 88 35 88 39 L 88 75 C 88 79 85 82 81 82 L 19 82 C 15 82 12 79 12 75 Z"
          fill="#38BDF8"
        />
        {/* Front folder flap */}
        <path
          d="M 12 44 C 12 40 15 37 19 37 L 81 37 C 85 37 88 40 88 44 L 88 75 C 88 79 85 82 81 82 L 19 82 C 15 82 12 79 12 75 Z"
          fill="url(#folderGradient)"
        />
        {/* Embossed code bracket symbol or label */}
        {label ? (
          <text
            x="50"
            y="65"
            fill="#FFFFFF"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="system-ui"
          >
            {label}
          </text>
        ) : (
          <path
            d="M 44 54 L 38 60 L 44 66 M 56 54 L 62 60 L 56 66"
            stroke="#0369A1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        <defs>
          <linearGradient id="folderGradient" x1="50" y1="37" x2="50" y2="82" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7DD3FC" />
            <stop offset="1" stopColor="#0284C7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Generic Document Icon
 */
export function DocIcon({ className = "", size = 48, label = "" }: IconProps & { label?: string }) {
  return (
    <div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <path
          d="M 24 16 L 62 16 L 76 30 L 76 84 L 24 84 Z"
          fill="#F3F4F6"
          stroke="#9CA3AF"
          strokeWidth="2"
        />
        <path d="M 62 16 L 62 30 L 76 30 Z" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
        <line x1="32" y1="42" x2="68" y2="42" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="52" x2="68" y2="52" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="62" x2="54" y2="62" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" />
        {label && (
          <text x="32" y="78" fill="#FF7A1A" fontSize="10" fontWeight="bold" fontFamily="monospace">
            {label}
          </text>
        )}
      </svg>
    </div>
  );
}

/**
 * Aliases and additional standard icons
 */
export const ResumeIcon = PreviewIcon;
export const AboutMacIcon = SettingsIcon;

export function GitHubIcon({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative rounded-[22%] overflow-hidden shadow-lg select-none flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(180deg, #24292F 0%, #161B22 60%, #0D1117 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20 pointer-events-none" />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[65%] h-[65%] text-white"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    </div>
  );
}

