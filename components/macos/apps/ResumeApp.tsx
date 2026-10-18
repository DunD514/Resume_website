"use client";

import React, { useState } from "react";
import { Download, ZoomIn, ZoomOut, FileText } from "lucide-react";

export default function ResumeApp() {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  return (
    <div className="w-full h-full flex flex-col bg-[#2e3138] text-white select-none overflow-hidden">
      {/* Preview Toolbar */}
      <div className="flex-none h-11 px-4 bg-[#23262d] border-b border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(70, prev - 15))}
              className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[11px] font-mono text-white/60">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(160, prev + 15))}
              className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[11px] text-white/40">1 page</span>
        </div>

        <div className="text-[11px] font-medium text-white/70 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-rose-400" />
          <span>Duncan_DLima_Resume_2026.pdf</span>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="/duncan_dlima_resume.pdf"
            download="Duncan_DLima_Resume.pdf"
            className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Document Viewport */}
      <div className="flex-1 overflow-auto p-6 flex justify-center bg-[#1d1f24]">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
          className="transition-transform duration-150 w-[780px] min-h-[1050px] bg-white text-gray-900 rounded-sm shadow-2xl p-10 font-sans text-xs select-text leading-normal"
        >
          {/* Header */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Duncan D&apos;Lima</h1>
            <p className="text-sm font-semibold text-blue-700 mt-0.5">
              Chief Technology Officer • Applied AI & Computer Vision Systems Engineer
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-gray-600 text-[11px]">
              <span>📍 Mumbai, India</span>
              <span>📧 <a href="mailto:duncandlima514@gmail.com" className="text-blue-600 hover:underline">duncandlima514@gmail.com</a></span>
              <span>🔗 <a href="https://linkedin.com/in/duncandlima" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/duncandlima</a></span>
              <span>💻 <a href="https://github.com/DunD514" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">github.com/DunD514</a></span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-[11px]">
              Applied AI and full-stack software engineer with extensive experience developing production-grade computer vision, edge deep learning pipelines, and cloud SaaS infrastructure. CTO & Co-Founder at Tekkloom, leading product development and distributed systems architecture. Creator of 38 open-source machine learning and data engineering tools. Graduated with a 3.89 CGPA in Data Science from NMIMS.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
              Work Experience
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900 text-xs">Tekkloom</h3>
                  <span className="text-[11px] text-gray-500 font-medium">2023 — Present</span>
                </div>
                <div className="text-[11px] font-semibold text-blue-700">Chief Technology Officer & Co-Founder</div>
                <ul className="list-disc list-inside mt-1 text-[11px] text-gray-700 space-y-0.5 leading-relaxed">
                  <li>Engineered multi-tenant enterprise textile manufacturing platform handling live sensor data and automated order tracking.</li>
                  <li>Architected low-latency API gateways with FastAPI, Redis caching, and PostgreSQL connection pooling.</li>
                  <li>Directed technology strategy, infrastructure cost reduction on AWS, and end-to-end continuous deployment.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
              Education
            </h2>
            <div className="flex justify-between items-baseline">
              <div>
                <div className="font-bold text-gray-900 text-xs">NMIMS (Narsee Monjee Institute of Management Studies)</div>
                <div className="text-[11px] text-gray-700">Bachelor of Science in Data Science</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-semibold text-emerald-700">CGPA: 3.89 / 4.00</span>
                <div className="text-[10px] text-gray-500">Mumbai, India</div>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
              Technical Core Competencies
            </h2>
            <div className="grid grid-cols-1 gap-1 text-[11px]">
              <div><strong className="text-gray-900">Machine Learning & CV:</strong> PyTorch, YOLOv8/v11, TensorRT, ONNX Runtime, MediaPipe, OpenCV, Scikit-Learn, LangGraph</div>
              <div><strong className="text-gray-900">Backend & Cloud:</strong> FastAPI, Python, Docker, Redis, PostgreSQL, AWS (EC2, S3, CloudFront), RESTful APIs</div>
              <div><strong className="text-gray-900">Frontend & WebGL:</strong> Next.js 16, React, TypeScript, Three.js, React Three Fiber, TailwindCSS</div>
              <div><strong className="text-gray-900">Data Engineering:</strong> Pandas, Polars, PySpark, NumPy, ETL Pipelines, Streamlit</div>
            </div>
          </div>

          {/* Featured Projects Highlight */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
              Featured Flagship Projects
            </h2>
            <div className="space-y-2 text-[11px]">
              <div>
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>SignBridge — Real-time ISL Translation via Computer Vision</span>
                  <span className="text-gray-500">Python / MediaPipe / LSTM</span>
                </div>
                <p className="text-gray-600">Dual-stream spatio-temporal sign language classifier with real-time audio playback synthesis.</p>
              </div>
              <div>
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>VisionTrack Edge — Low-Latency Edge Vision Pipeline</span>
                  <span className="text-gray-500">TensorRT / YOLOv8 / C++</span>
                </div>
                <p className="text-gray-600">Real-time object detection and trajectory estimation optimized for edge GPUs with 60+ FPS.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
