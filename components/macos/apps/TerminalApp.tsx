"use client";

import React, { useState, useRef, useEffect } from "react";
import { UnifiedProject } from "@/lib/projects";

interface TerminalAppProps {
  projects: UnifiedProject[];
  onOpenApp?: (appId: string) => void;
  onOpenProject?: (project: UnifiedProject) => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export default function TerminalApp({ projects, onOpenApp, onOpenProject }: TerminalAppProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: "init-1",
      command: "",
      output: (
        <div className="space-y-1 text-white/80 font-mono text-xs">
          <div>Last login: Sat Oct 18 10:24:19 on ttys002</div>
          <div className="text-emerald-400 font-semibold">
            Duncan D&apos;Lima — Portfolio Terminal System v2.6 [zsh 5.9 (x86_64-apple-darwin23.0)]
          </div>
          <div className="text-white/60">
            Type <span className="text-cyan-400 font-bold">help</span> to list available commands. Try <span className="text-cyan-400 font-bold">projects</span>, <span className="text-cyan-400 font-bold">skills</span>, or <span className="text-cyan-400 font-bold">whoami</span>.
          </div>
        </div>
      ),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) {
      setHistory((prev) => [
        ...prev,
        { id: String(Date.now()), command: "", output: null },
      ]);
      return;
    }

    const [cmd, ...args] = trimmed.split(" ");
    const lowerCmd = cmd.toLowerCase();

    let outputNode: React.ReactNode = null;

    switch (lowerCmd) {
      case "help":
        outputNode = (
          <div className="space-y-1 font-mono text-xs text-white/80">
            <div className="text-cyan-300 font-semibold mb-1">Available Commands:</div>
            <div className="grid grid-cols-[140px_1fr] gap-x-2 gap-y-0.5">
              <span className="text-yellow-400">projects</span>
              <span>List all 38 production repositories by category</span>
              <span className="text-yellow-400">skills</span>
              <span>Display AI, Computer Vision, & systems core stack</span>
              <span className="text-yellow-400">whoami</span>
              <span>Brief professional background and current role</span>
              <span className="text-yellow-400">resume</span>
              <span>Open the official PDF resume document</span>
              <span className="text-yellow-400">orbit</span>
              <span>Launch the 3D NASA orbital Earth visualization</span>
              <span className="text-yellow-400">contact</span>
              <span>Email, LinkedIn, and social coordinates</span>
              <span className="text-yellow-400">open &lt;slug&gt;</span>
              <span>Open specific project file or external repo</span>
              <span className="text-yellow-400">clear</span>
              <span>Clear terminal history</span>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      case "whoami":
        outputNode = (
          <div className="font-mono text-xs text-white/85 space-y-1">
            <p><span className="text-cyan-400 font-bold">Duncan D&apos;Lima</span> | CTO @ Tekkloom</p>
            <p>Applied AI, Computer Vision & Data Systems Engineer based in Mumbai.</p>
            <p>B.Sc. Data Science from NMIMS (CGPA 3.89 / 4.00).</p>
            <p>Specializes in edge inference, real-time vision pipelines, and multi-tenant SaaS architecture.</p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="font-mono text-xs space-y-2 text-white/85">
            <div>
              <span className="text-cyan-400 font-semibold">[AI & Deep Learning]:</span> PyTorch, TensorRT, ONNX, YOLOv8/v11, LangGraph, MediaPipe, OpenCV, Scikit-Learn
            </div>
            <div>
              <span className="text-amber-400 font-semibold">[Systems & Backend]:</span> FastAPI, Python, Docker, Redis, PostgreSQL, AWS (EC2/S3/Lambda), REST, WebSockets
            </div>
            <div>
              <span className="text-emerald-400 font-semibold">[Frontend & Graphics]:</span> Next.js, React, Three.js / WebGL, TailwindCSS, TypeScript
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="font-mono text-xs space-y-2 text-white/80">
            <div className="text-cyan-300 font-bold">Catalog Index ({projects.length} Repositories):</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-h-60 overflow-y-auto pr-2">
              {projects.map((p) => (
                <div key={p.id} className="p-1 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-white font-medium truncate mr-2">{p.name}</span>
                  <span className="text-[10px] text-cyan-400 shrink-0 font-mono">[{p.primaryCategoryLabel}]</span>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-white/50">Tip: Click projects in Finder or Orbit Explorer for interactive dossiers.</div>
          </div>
        );
        break;

      case "resume":
        onOpenApp?.("resume");
        outputNode = <span className="font-mono text-xs text-emerald-400">Opening Resume.pdf in Preview...</span>;
        break;

      case "orbit":
        onOpenApp?.("orbit");
        outputNode = <span className="font-mono text-xs text-cyan-400">Launching Orbit Explorer 3D Telemetry...</span>;
        break;

      case "contact":
        onOpenApp?.("mail");
        outputNode = (
          <div className="font-mono text-xs space-y-1 text-white/85">
            <div>Email: <a href="mailto:duncandlima514@gmail.com" className="text-cyan-400 underline">duncandlima514@gmail.com</a></div>
            <div>LinkedIn: <a href="https://linkedin.com/in/duncandlima" target="_blank" rel="noreferrer" className="text-cyan-400 underline">linkedin.com/in/duncandlima</a></div>
            <div>GitHub: <a href="https://github.com/DunD514" target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/DunD514</a></div>
          </div>
        );
        break;

      case "open":
        if (!args.length) {
          outputNode = <span className="font-mono text-xs text-red-400">Usage: open &lt;project-slug or app-name&gt;</span>;
        } else {
          const target = args[0].toLowerCase();
          const match = projects.find((p) => p.id.toLowerCase() === target || p.name.toLowerCase().includes(target));
          if (match) {
            onOpenProject?.(match);
            outputNode = <span className="font-mono text-xs text-emerald-400">Opened project dossier: {match.name}</span>;
          } else if (target === "orbit" || target === "finder" || target === "resume" || target === "mail") {
            onOpenApp?.(target);
            outputNode = <span className="font-mono text-xs text-emerald-400">Launched application: {target}</span>;
          } else {
            outputNode = <span className="font-mono text-xs text-red-400">Object not found: {target}</span>;
          }
        }
        break;

      default:
        outputNode = (
          <span className="font-mono text-xs text-red-400">
            zsh: command not found: {cmd}. Type &apos;help&apos; for commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        command: trimmed,
        output: outputNode,
      },
    ]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
    setInputVal("");
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full h-full bg-[#12141a]/95 text-white/90 p-4 font-mono text-xs overflow-y-auto select-text cursor-text"
    >
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            {item.command && (
              <div className="flex items-center space-x-2 text-white/90">
                <span className="text-emerald-400 font-bold">duncan@macbook-pro ~ %</span>
                <span>{item.command}</span>
              </div>
            )}
            {item.output && <div className="pl-0">{item.output}</div>}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex items-center space-x-2 mt-2">
        <span className="text-emerald-400 font-bold shrink-0">duncan@macbook-pro ~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-transparent text-white font-mono outline-none border-none p-0 focus:ring-0"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
