"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight, Volume2, VolumeX, Sparkles, Loader2 } from "lucide-react";

interface CinematicFilmHeroProps {
  onComplete: () => void;
}

interface NarrativeBeat {
  start: number;
  end: number;
  text: string;
}

// Restrained narrative subtitles synchronized with Apollo 11 rocket ascent footage
const NARRATIVE_BEATS: NarrativeBeat[] = [
  {
    start: 4,
    end: 11,
    text: "“Humanity has always looked beyond what seems possible.”",
  },
  {
    start: 22,
    end: 29,
    text: "“Curiosity imagines what could be.”",
  },
  {
    start: 46,
    end: 53,
    text: "“Engineering makes it real.”",
  },
  {
    start: 78,
    end: 86,
    text: "“From ambitious ideas to intelligent systems.”",
  },
];

// Target end timestamp in video (seconds) - finishes before YouTube outro cards
const END_SECONDS = 172;
const FINALE_START_SECONDS = 132;
const YOUTUBE_VIDEO_ID = "xAuxvVBMykI";

declare global {
  interface Window {
    YT?: {
      Player: new (elementId: string | HTMLElement, options: any) => any;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function CinematicFilmHero({ onComplete }: CinematicFilmHeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasFallback, setHasFallback] = useState(false);

  const playerRef = useRef<any>(null);
  const timeTrackerRef = useRef<NodeJS.Timeout | null>(null);
  const hasSkippedRef = useRef(false);

  // Clean transition to portfolio
  const handleSkip = useCallback(() => {
    if (hasSkippedRef.current) return;
    hasSkippedRef.current = true;

    // Immediately stop audio & video playback
    if (playerRef.current) {
      try {
        if (typeof playerRef.current.mute === "function") {
          playerRef.current.mute();
        }
        if (typeof playerRef.current.stopVideo === "function") {
          playerRef.current.stopVideo();
        }
        if (typeof playerRef.current.destroy === "function") {
          playerRef.current.destroy();
        }
      } catch {
        // Player already destroyed or unavailable
      }
      playerRef.current = null;
    }

    if (timeTrackerRef.current) {
      clearInterval(timeTrackerRef.current);
      timeTrackerRef.current = null;
    }

    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 350);
  }, [onComplete]);

  // Toggle audio between muted and unmuted
  const toggleSound = useCallback(() => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch {
      // Handle fallback
    }
  }, [isMuted]);

  // Keyboard accessibility: Escape to skip, M to toggle sound
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleSkip();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleSound();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip, toggleSound]);

  // Reduced motion support: skip intro immediately if user prefers reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
    }
  }, [onComplete]);

  // Initialize YouTube Iframe Player with robust autoplay policy handling
  useEffect(() => {
    let isMounted = true;
    let fallbackTimeout: NodeJS.Timeout | null = null;

    const setupPlayer = () => {
      if (!isMounted || playerRef.current) return;
      if (!window.YT || !window.YT.Player) return;

      try {
        playerRef.current = new window.YT.Player("cinematic-yt-player", {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            mute: 0, // Attempt unmuted playback first
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            playsinline: 1,
            enablejsapi: 1,
            disablekb: 1,
            fs: 0,
            start: 0,
            end: END_SECONDS,
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              setIsVideoLoaded(true);
              const player = event.target;

              // Attempt unmuted play
              try {
                player.unMute();
                player.setVolume(100);
                player.playVideo();
              } catch {
                // Ignore and handle via autoplay policy check below
              }

              // Check if browser blocked unmuted autoplay
              setTimeout(() => {
                if (!isMounted) return;
                try {
                  const state = player.getPlayerState();
                  // If not playing (1) or buffering (3), autoplay with sound was blocked
                  if (state !== 1 && state !== 3) {
                    player.mute();
                    player.playVideo();
                    setIsMuted(true);
                  } else {
                    setIsMuted(Boolean(player.isMuted()));
                  }
                } catch {
                  // Guarantee playback starts muted if an error occurs
                  try {
                    player.mute();
                    player.playVideo();
                  } catch {}
                  setIsMuted(true);
                }
              }, 400);
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              // 1 = PLAYING
              if (event.data === 1) {
                setIsVideoLoaded(true);
                setIsPlaying(true);
                try {
                  setIsMuted(Boolean(event.target.isMuted()));
                } catch {}

                // Start synchronizing elapsed time for narrative beats and progress bar
                if (!timeTrackerRef.current) {
                  timeTrackerRef.current = setInterval(() => {
                    if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
                      try {
                        const sec = playerRef.current.getCurrentTime();
                        setCurrentTime(sec);
                        if (sec >= END_SECONDS - 0.5) {
                          handleSkip();
                        }
                      } catch {}
                    }
                  }, 250);
                }
              }

              // 0 = ENDED
              if (event.data === 0) {
                handleSkip();
              }
            },
            onError: () => {
              if (!isMounted) return;
              setHasFallback(true);
            },
          },
        });
      } catch {
        if (isMounted) setHasFallback(true);
      }
    };

    // Load YouTube API script if not already available
    if (typeof window !== "undefined") {
      if (window.YT && window.YT.Player) {
        setupPlayer();
      } else {
        const prevHandler = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (prevHandler) prevHandler();
          setupPlayer();
        };

        if (!document.getElementById("yt-iframe-api-script")) {
          const script = document.createElement("script");
          script.id = "yt-iframe-api-script";
          script.src = "https://www.youtube.com/iframe_api";
          script.async = true;
          document.head.appendChild(script);
        }
      }

      // Fallback timer: if video doesn't start within 5s, reveal fallback options
      fallbackTimeout = setTimeout(() => {
        if (!isVideoLoaded && isMounted) {
          setHasFallback(true);
        }
      }, 5000);
    }

    return () => {
      isMounted = false;
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      if (timeTrackerRef.current) {
        clearInterval(timeTrackerRef.current);
        timeTrackerRef.current = null;
      }
      if (playerRef.current) {
        try {
          if (typeof playerRef.current.stopVideo === "function") {
            playerRef.current.stopVideo();
          }
          if (typeof playerRef.current.destroy === "function") {
            playerRef.current.destroy();
          }
        } catch {}
        playerRef.current = null;
      }
    };
  }, [handleSkip, isVideoLoaded]);

  // Determine active narrative beat (carefully timed, disappearing when narrator speaks)
  const activeBeat = NARRATIVE_BEATS.find(
    (beat) => currentTime >= beat.start && currentTime <= beat.end
  );

  const isFinale = currentTime >= FINALE_START_SECONDS;

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const progressPct = Math.min(100, (currentTime / END_SECONDS) * 100);

  return (
    <div
      role="region"
      aria-label="Cinematic Rocket Launch Intro"
      className={`fixed inset-0 z-50 bg-[#040508] transition-opacity duration-500 select-none overflow-hidden ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 1. High-Quality Poster Frame (Visible during loading or fallback) */}
      <div
        className={`absolute inset-0 bg-cover bg-center filter contrast-[1.1] brightness-[0.75] transition-opacity duration-1000 ${
          isVideoLoaded && isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ backgroundImage: "url('/videos/exploration_poster.jpg')" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(4, 5, 8, 0.4) 20%, rgba(4, 5, 8, 0.85) 75%, #040508 100%)",
          }}
        />

        {/* Loading Indicator while video initializes */}
        {!hasFallback && !isVideoLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center z-10">
            <Loader2 className="w-6 h-6 text-[#ff7a1a] animate-spin" />
            <p className="font-mono text-xs uppercase tracking-widest text-[#a0a0aa]">
              INITIALIZING CINEMATIC LAUNCH STREAM...
            </p>
          </div>
        )}

        {/* Fallback Screen if YouTube fails or network blocks it */}
        {hasFallback && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="max-w-2xl bg-[#040508]/90 border border-white/10 p-8 shadow-2xl backdrop-blur-md">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff7a1a] block mb-3">
                ORBITAL FLIGHT RECONNAISSANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-[200] tracking-wide text-white mb-6 uppercase">
                DATA SCIENCE &middot; APPLIED AI &middot; SOFTWARE ENGINEERING
              </h2>
              <button
                type="button"
                onClick={handleSkip}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ff7a1a] hover:bg-white text-[#060608] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-xl"
              >
                <span>EXPLORE THE WORK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Embedded Native YouTube Player Container (Full Bleed Aspect Fit) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center">
        <div
          id="cinematic-yt-player"
          className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-105"
        />
      </div>

      {/* 3. Subtle Vignette Overlays for Maximum Cinematic Contrast */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4, 5, 8, 0.7) 0%, transparent 20%, transparent 75%, rgba(4, 5, 8, 0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(4, 5, 8, 0.5) 100%)",
        }}
      />

      {/* 4. Top Telemetry Bar & SKIP INTRO Control (Visible at ALL times) */}
      <div className="absolute top-0 left-0 right-0 z-40 p-6 sm:p-8 flex items-center justify-between pointer-events-none">
        {/* Mission Telemetry Badge (No personal name displayed) */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#040508]/80 backdrop-blur-md border border-white/[0.12] text-xs font-mono pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff7a1a] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff7a1a]" />
          </span>
          <span className="text-[#ff7a1a] uppercase tracking-widest font-semibold text-[11px] sm:text-xs">
            ORBITAL LAUNCH TELEMETRY
          </span>
          <span className="text-[#555562] hidden sm:inline">&middot;</span>
          <span className="text-[#a0a0aa] hidden sm:inline uppercase tracking-wider text-[11px]">
            APOLLO 11 / TRANSLUNAR INSERTION
          </span>
        </div>

        {/* SKIP INTRO Button (Persistent, high-contrast, keyboard accessible) */}
        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip cinematic introduction and proceed to portfolio"
          className="pointer-events-auto group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#040508]/90 hover:bg-[#ff7a1a] border border-white/25 hover:border-[#ff7a1a] text-xs font-mono uppercase tracking-widest text-white hover:text-[#060608] transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]"
        >
          <span className="font-semibold">SKIP INTRO</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="text-[10px] text-[#888894] group-hover:text-[#060608]/70 hidden sm:inline ml-1 font-mono">
            [ESC]
          </span>
        </button>
      </div>

      {/* 5. Synchronized Restrained Narrative Subtitles (Center Screen) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center z-20">
        {activeBeat && !isFinale && (
          <div
            key={activeBeat.text}
            className="max-w-3xl px-6 py-4 bg-[#040508]/65 backdrop-blur-md border border-white/[0.1] shadow-2xl animate-in fade-in zoom-in-95 duration-500"
          >
            <p className="text-xl sm:text-3xl md:text-4xl font-[200] tracking-wide text-white leading-relaxed drop-shadow-lg">
              {activeBeat.text}
            </p>
          </div>
        )}

        {/* 6. Climax / Finale Directive & Primary CTA */}
        {isFinale && (
          <div className="max-w-3xl px-8 py-8 sm:px-12 sm:py-10 bg-[#040508]/90 backdrop-blur-md border border-[#ff7a1a]/50 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 pointer-events-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff7a1a]/15 border border-[#ff7a1a]/30 text-xs font-mono text-[#ff7a1a] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLIGHT MISSION DIRECTIVE</span>
            </div>

            <h2 className="text-xl sm:text-3xl md:text-4xl font-[200] tracking-wider text-white uppercase leading-tight mb-8">
              DATA SCIENCE &middot; APPLIED AI &middot; SOFTWARE ENGINEERING
            </h2>

            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#ff7a1a] hover:bg-white text-[#060608] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-xl shadow-[#ff7a1a]/25 hover:scale-105 cursor-pointer"
            >
              <span>EXPLORE THE WORK</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 7. Bottom Navigation & Sound-On Control Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-40 px-6 sm:px-10 py-4 bg-gradient-to-t from-black via-black/85 to-transparent flex flex-wrap items-center justify-between gap-4 text-xs font-mono border-t border-white/[0.08] pointer-events-none">
        {/* Prominent Accessible Sound-On Control */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className={`inline-flex items-center gap-2 px-3.5 py-2 backdrop-blur-md font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff7a1a] ${
              isMuted
                ? "bg-[#ff7a1a] text-[#060608] font-bold shadow-lg shadow-[#ff7a1a]/30 animate-pulse hover:bg-white"
                : "bg-[#040508]/85 text-[#d0d0d8] border border-white/20 hover:border-white hover:text-white"
            }`}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 shrink-0" />
                <span>UNMUTE AUDIO</span>
                <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-sans uppercase">
                  SOUND OFF
                </span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#ff7a1a] shrink-0" />
                <span>SOUND ON</span>
                <span className="text-[10px] text-[#888894] font-mono hidden sm:inline">[M]</span>
              </>
            )}
          </button>

          <span className="hidden md:inline text-[#666672]">&middot;</span>
          <span className="hidden md:inline text-[11px] text-[#888894]">
            HISTORIC SATURN V FOOTAGE &middot; SOUNDTRACK BY BENJAMIN SQUIRES
          </span>
        </div>

        {/* Telemetry Progress Bar */}
        <div className="pointer-events-auto flex items-center gap-3.5 w-48 sm:w-64">
          <div className="w-full h-1.5 bg-white/[0.12] overflow-hidden rounded-full">
            <div
              className="h-full bg-[#ff7a1a] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="tabular-nums text-white text-[11px] shrink-0 font-mono">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds} / 02:52
          </span>
        </div>
      </div>
    </div>
  );
}
