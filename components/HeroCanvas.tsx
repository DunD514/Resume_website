"use client";

import React, { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    // Points on a 3D sphere
    const numPoints = 140;
    const sphereRadius = Math.min(width, height) * 0.38;
    const points: {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      size: number;
      color: string;
      pulseOffset: number;
    }[] = [];

    // Colors matching palette: electric blue, vivid violet, cyan
    const colors = ["#3B82F6", "#60A5FA", "#8B5CF6", "#A78BFA", "#22D3EE"];

    // Distribute points on sphere using Fibonacci spiral algorithm
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
        baseX: x * sphereRadius,
        baseY: y * sphereRadius,
        baseZ: z * sphereRadius,
        size: Math.random() * 2 + 1.5,
        color: colors[i % colors.length],
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Special node for Mumbai coordinate location (highlighted beacon)
    const beaconPoint = {
      x: 0,
      y: 0,
      z: 0,
      baseX: sphereRadius * 0.6,
      baseY: -sphereRadius * 0.25,
      baseZ: sphereRadius * 0.75,
      size: 4,
      color: "#22D3EE",
    };

    let rotX = 0.2;
    let rotY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
      mouseY = (e.clientY - rect.top - height / 2) / (height / 2);
      targetRotY = mouseX * 0.8;
      targetRotX = -mouseY * 0.5 + 0.2;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetRotX = 0.2;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth auto-rotation + mouse inertia
      rotY += 0.004;
      if (isHovering) {
        rotX += (targetRotX - rotX) * 0.05;
        rotY += (targetRotY - (rotY % (Math.PI * 2))) * 0.02;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw faint orbital atmospheric glow
      const radialGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, sphereRadius * 1.35);
      radialGlow.addColorStop(0, "rgba(59, 130, 246, 0.08)");
      radialGlow.addColorStop(0.5, "rgba(139, 92, 246, 0.04)");
      radialGlow.addColorStop(1, "rgba(5, 8, 18, 0)");
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Draw subtle orbital ring latitude circles
      ctx.strokeStyle = "rgba(59, 130, 246, 0.09)";
      ctx.lineWidth = 1;
      [-0.4, 0, 0.4].forEach((latRatio) => {
        const ringR = Math.sqrt(Math.max(0, 1 - latRatio * latRatio)) * sphereRadius;
        const ringY = latRatio * sphereRadius;
        ctx.beginPath();
        ctx.ellipse(cx, cy + ringY * Math.cos(rotX), ringR, ringR * Math.abs(Math.sin(rotX)) * 0.5 + 4, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Rotate and project points
      const projected = points.map((p) => {
        // Rotate around Y axis
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = p.baseX * cosY - p.baseZ * sinY;
        const z1 = p.baseX * sinY + p.baseZ * cosY;

        // Rotate around X axis
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = p.baseY * cosX - z1 * sinX;
        const z2 = p.baseY * sinX + z1 * cosX;

        // Perspective scale factor
        const fov = 400;
        const scale = fov / (fov + z2);
        const screenX = cx + x1 * scale;
        const screenY = cy + y2 * scale;
        const alpha = Math.max(0.12, (z2 + sphereRadius) / (sphereRadius * 2));

        return {
          ...p,
          screenX,
          screenY,
          z2,
          scale,
          alpha,
        };
      });

      // Sort points by depth (z2) so closer points render over further ones
      projected.sort((a, b) => a.z2 - b.z2);

      // Draw neural connections between close nearby nodes
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].screenX - projected[j].screenX;
          const dy = projected[i].screenY - projected[j].screenY;
          const distSq = dx * dx + dy * dy;

          if (distSq < 3200) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / 56.5) * Math.min(projected[i].alpha, projected[j].alpha) * 0.45;
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].screenX, projected[i].screenY);
            ctx.lineTo(projected[j].screenX, projected[j].screenY);
            ctx.stroke();
          }
        }
      }

      // Draw points
      projected.forEach((p) => {
        const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.5 + 0.5;
        const r = Math.max(1, p.size * p.scale * (0.8 + pulse * 0.4));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for front-facing points
        if (p.z2 > 0 && p.alpha > 0.6) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = (p.alpha - 0.6) * 0.35;
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, r * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render beacon (Mumbai Location indicator)
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const bx1 = beaconPoint.baseX * cosY - beaconPoint.baseZ * sinY;
      const bz1 = beaconPoint.baseX * sinY + beaconPoint.baseZ * cosY;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const by2 = beaconPoint.baseY * cosX - bz1 * sinX;
      const bz2 = beaconPoint.baseY * sinX + bz1 * cosX;

      const bScale = 400 / (400 + bz2);
      const bScreenX = cx + bx1 * bScale;
      const bScreenY = cy + by2 * bScale;

      if (bz2 > -sphereRadius * 0.2) {
        const ringPulse = (time * 1.5) % 1;
        ctx.strokeStyle = `rgba(34, 211, 238, ${1 - ringPulse})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(bScreenX, bScreenY, 6 + ringPulse * 18, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#22D3EE";
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(bScreenX, bScreenY, 3.5 * bScale, 0, Math.PI * 2);
        ctx.fill();

        // Annotation label for Duncan's location
        ctx.fillStyle = "rgba(248, 250, 252, 0.85)";
        ctx.font = "10px monospace";
        ctx.fillText("Mumbai · IN [Tekkloom]", bScreenX + 12, bScreenY - 4);
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-grab active:cursor-grabbing block"
      aria-label="Interactive 3D Data Network Visualization"
    />
  );
}
