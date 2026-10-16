"use client";

import React, { useEffect, useRef } from "react";

interface ScaleCanvasProps {
  activePillar: "data" | "models" | "systems" | null;
}

export default function ScaleCanvas({ activePillar }: ScaleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activePillarRef = useRef<"data" | "models" | "systems" | null>(activePillar);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    activePillarRef.current = activePillar;
  }, [activePillar]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Setup intersection observer to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // 1. Data elements (grid streams)
    const dataStreamCount = 35;
    const dataStreams = Array.from({ length: dataStreamCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 2 + 1,
      length: Math.random() * 80 + 30,
      char: Math.random() > 0.5 ? "1" : "0",
    }));

    // 2. Models elements (neural lattice nodes)
    const nodeCount = 28;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: width * 0.45 + Math.random() * (width * 0.5),
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 3 + 2,
    }));

    // 3. Systems elements (orbital arcs)
    let orbitAngle = 0;

    let animationFrameId: number;
    let transitionAlpha = 0;

    const render = () => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);

        const current = activePillarRef.current;
        if (current) {
          transitionAlpha = Math.min(transitionAlpha + 0.05, 1);
        } else {
          transitionAlpha = Math.max(transitionAlpha - 0.05, 0);
        }

        if (transitionAlpha > 0.01 && current) {
          ctx.save();
          ctx.globalAlpha = transitionAlpha;

          if (current === "data") {
            // Render structured matrix and streaming rows
            ctx.strokeStyle = "rgba(70, 160, 240, 0.06)";
            ctx.lineWidth = 1;
            const step = 40;
            for (let x = width * 0.35; x < width; x += step) {
              ctx.beginPath();
              ctx.moveTo(x, 0);
              ctx.lineTo(x, height);
              ctx.stroke();
            }
            for (let y = 0; y < height; y += step) {
              ctx.beginPath();
              ctx.moveTo(width * 0.35, y);
              ctx.lineTo(width, y);
              ctx.stroke();
            }

            // Stream traces
            for (let i = 0; i < dataStreams.length; i++) {
              const stream = dataStreams[i];
              stream.y += stream.speed;
              if (stream.y > height) {
                stream.y = -stream.length;
                stream.x = width * 0.4 + Math.random() * (width * 0.55);
              }

              const grad = ctx.createLinearGradient(
                stream.x,
                stream.y - stream.length,
                stream.x,
                stream.y
              );
              grad.addColorStop(0, "transparent");
              grad.addColorStop(1, "rgba(56, 189, 248, 0.45)");

              ctx.strokeStyle = grad;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(stream.x, stream.y - stream.length);
              ctx.lineTo(stream.x, stream.y);
              ctx.stroke();

              // Head dot
              ctx.fillStyle = "rgba(255, 122, 26, 0.8)";
              ctx.fillRect(stream.x - 1, stream.y - 1, 3, 3);
            }
          } else if (current === "models") {
            // Render neural lattice
            for (let i = 0; i < nodes.length; i++) {
              const n = nodes[i];
              n.x += n.vx;
              n.y += n.vy;

              if (n.x < width * 0.35 || n.x > width) n.vx *= -1;
              if (n.y < 0 || n.y > height) n.vy *= -1;

              // Connections
              for (let j = i + 1; j < nodes.length; j++) {
                const n2 = nodes[j];
                const dx = n.x - n2.x;
                const dy = n.y - n2.y;
                const d = Math.sqrt(dx * dx + dy * dy);

                if (d < 140) {
                  const lineAlpha = (1 - d / 140) * 0.25;
                  ctx.strokeStyle = `rgba(147, 197, 253, ${lineAlpha})`;
                  ctx.lineWidth = 1;
                  ctx.beginPath();
                  ctx.moveTo(n.x, n.y);
                  ctx.lineTo(n2.x, n2.y);
                  ctx.stroke();
                }
              }

              // Nodes
              ctx.fillStyle = "rgba(255, 122, 26, 0.75)";
              ctx.beginPath();
              ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (current === "systems") {
            // Render orbital arcs & trajectories
            orbitAngle += 0.008;
            const centerX = width * 0.7;
            const centerY = height * 0.55;

            ctx.lineWidth = 1;
            const radii = [140, 220, 310, 420];

            radii.forEach((r, idx) => {
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 - idx * 0.015})`;
              ctx.beginPath();
              ctx.ellipse(centerX, centerY, r, r * 0.45, Math.PI / 6, 0, Math.PI * 2);
              ctx.stroke();

              // Orbiting beacon
              const theta = orbitAngle * (1 + idx * 0.4);
              const px = centerX + Math.cos(theta) * r;
              const py = centerY + Math.sin(theta) * (r * 0.45);

              ctx.fillStyle = idx % 2 === 0 ? "rgba(255, 122, 26, 0.9)" : "rgba(255, 255, 255, 0.9)";
              ctx.beginPath();
              ctx.arc(px, py, 2.5, 0, Math.PI * 2);
              ctx.fill();

              // Trailing arc
              ctx.strokeStyle = "rgba(255, 122, 26, 0.35)";
              ctx.beginPath();
              ctx.ellipse(centerX, centerY, r, r * 0.45, Math.PI / 6, theta - 0.4, theta);
              ctx.stroke();
            });
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Soft mask feathering to complete black on the text side (left) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #060608 0%, #060608 30%, rgba(6, 6, 8, 0.7) 65%, transparent 100%)",
        }}
      />
    </div>
  );
}
