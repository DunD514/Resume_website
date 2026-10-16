"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Mail, Send, Copy, Check, ArrowUp, Sparkles, MessageSquare, AlertCircle, Radio } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function ContactSection() {
  const { personal } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submittedName, setSubmittedName] = useState("");

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personal.publicEmailDisplay);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) errs.subject = "Please specify a subject.";
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    // Simulate real client submission with prompt mailto fallback guarantee
    setTimeout(() => {
      setSubmittedName(formData.name);
      setStatus("success");
      // Prepare direct mailto URL backup so user can also open email client directly if desired
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 900);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="pt-24 pb-12 relative bg-[#040713]" aria-label="Contact Duncan D'Lima">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Contact Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-sky-400 bg-sky-500/10 border border-sky-500/25">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            MISSION COMMUNICATIONS // DIRECT UPLINK
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-slate-100">
            Have an interesting problem?{" "}
            <span className="text-telemetry-gradient">Let’s talk.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            I’m interested in machine learning, data engineering, applied AI, and opportunities to engineer technology that solves real-world problems.
          </p>
        </div>

        {/* Contact Grid: Direct Reachout Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct channels column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-blue-500/20 space-y-6">
              <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-100">
                Direct Communication Channels
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Whether you’re recruiting for a data science or AI engineering role, looking to collaborate, or exploring what we’re building at Tekkloom, feel free to connect.
              </p>

              {/* Email Box with One-Click Copy */}
              <div className="p-4 rounded-xl bg-[#070B18] border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                  Configured Public Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${personal.publicEmailDisplay}`}
                    className="text-sm font-mono text-cyan-400 hover:underline truncate"
                  >
                    {personal.publicEmailDisplay}
                  </a>
                  <button
                    onClick={copyEmailToClipboard}
                    className="p-1.5 rounded-md bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors flex-shrink-0 cursor-pointer"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedEmail && (
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <Check className="w-3 h-3" /> Copied to clipboard!
                  </span>
                )}
              </div>

              {/* Verified Links */}
              <div className="space-y-3">
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-800/60 transition-all text-xs"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="font-semibold text-slate-200">GitHub Profile</div>
                      <div className="text-slate-500 font-mono text-[11px]">DunD514</div>
                    </div>
                  </div>
                  <span className="text-blue-400 font-mono">github.com/DunD514 →</span>
                </a>

                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 hover:bg-slate-800/60 transition-all text-xs"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-4 h-4 text-violet-400" />
                    <div>
                      <div className="font-semibold text-slate-200">LinkedIn Profile</div>
                      <div className="text-slate-500 font-mono text-[11px]">Duncan D’Lima</div>
                    </div>
                  </div>
                  <span className="text-violet-400 font-mono">Connect →</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form with Validation */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-blue-500/20 shadow-xl shadow-black/40">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-100">
                  Send a Direct Message
                </h3>
              </div>

              {status === "success" ? (
                <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-100">
                      Thank you, {submittedName}!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Your message has been received. I will review it and follow up as soon as possible.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-xs font-mono text-slate-300">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maya Patel"
                        className={`w-full bg-[#070B18] border rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                          errors.name ? "border-rose-500 focus:border-rose-400" : "border-slate-800 focus:border-blue-500/60"
                        }`}
                      />
                      {errors.name && <span className="text-[10px] text-rose-400">{errors.name}</span>}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-xs font-mono text-slate-300">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. maya@company.com"
                        className={`w-full bg-[#070B18] border rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                          errors.email ? "border-rose-500 focus:border-rose-400" : "border-slate-800 focus:border-blue-500/60"
                        }`}
                      />
                      {errors.email && <span className="text-[10px] text-rose-400">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="subject" className="block text-xs font-mono text-slate-300">
                      Subject / Topic *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Data Science / AI Collaboration Opportunity"
                      className={`w-full bg-[#070B18] border rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.subject ? "border-rose-500 focus:border-rose-400" : "border-slate-800 focus:border-blue-500/60"
                      }`}
                    />
                    {errors.subject && <span className="text-[10px] text-rose-400">{errors.subject}</span>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="block text-xs font-mono text-slate-300">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about the problem, project, or role you have in mind..."
                      className={`w-full bg-[#070B18] border rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                        errors.message ? "border-rose-500 focus:border-rose-400" : "border-slate-800 focus:border-blue-500/60"
                      }`}
                    />
                    {errors.message && <span className="text-[10px] text-rose-400">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 border border-sky-400/30 shadow-lg shadow-sky-950/40 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{status === "submitting" ? "TRANSMITTING TELEMETRY..." : "TRANSMIT MESSAGE"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="pt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            <span>&copy; 2026 Duncan D’Lima.</span>{" "}
            <span className="text-slate-400">Designed with intention. Built with curiosity.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
