"use client";

import React, { useState } from "react";
import { ArrowUp, ArrowUpRight, Copy, Check, Send, AlertCircle, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honeypot: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "fallback">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [mailtoUrl, setMailtoUrl] = useState("");

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "duncan.dlima@example.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage(data.message || "Message sent successfully.");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else if (data.fallbackMailto && data.mailtoUrl) {
        setStatus("fallback");
        setStatusMessage(
          "Direct server dispatch is currently in fallback mode. Click below to send via your email client."
        );
        setMailtoUrl(data.mailtoUrl);
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Failed to transmit message. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error transmitting message. Please email directly.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="relative pt-28 md:pt-36 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Giant Heading */}
      <div className="border-b border-white/[0.08] pb-12">
        <span className="meta-mono">[07] // GET IN TOUCH</span>
        <h2 className="mt-4 text-[10vw] sm:text-[7vw] lg:text-[5.5vw] font-[200] tracking-[-0.03em] leading-[0.98] text-[#f4f4f6]">
          Have an interesting problem?{" "}
          <span className="text-[#ff7a1a]">Let&apos;s talk.</span>
        </h2>
        <p className="mt-6 text-base sm:text-xl text-[#888890] font-[200] max-w-xl">
          Always open to challenging machine learning architectures, high-performance data pipelines, and technical leadership conversations.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-b border-white/[0.08]">
        {/* Left Column: Direct Links & Email Copy */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="meta-mono text-[#55555c]">DIRECT EMAIL</span>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-lg sm:text-xl font-light text-[#f4f4f6] select-all">
                {email}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 border border-white/[0.1] hover:border-[#ff7a1a] text-[#888890] hover:text-[#ff7a1a] transition-colors"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-[#ff7a1a]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <p className="mt-1.5 text-xs font-mono text-[#ff7a1a] animate-in fade-in">
                Copied to clipboard.
              </p>
            )}
          </div>

          <div>
            <span className="meta-mono text-[#55555c]">CHANNELS</span>
            <div className="mt-4 flex flex-col gap-3 font-mono text-xs">
              <a
                href={PORTFOLIO_DATA.personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between py-2 border-b border-white/[0.06] text-[#c0c0c8] hover:text-white transition-colors"
              >
                <span>LinkedIn &middot; /in/duncan-dlima</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#55555c] group-hover:text-[#ff7a1a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between py-2 border-b border-white/[0.06] text-[#c0c0c8] hover:text-white transition-colors"
              >
                <span>Personal GitHub &middot; /DunD514</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#55555c] group-hover:text-[#ff7a1a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.social.tekkloomGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between py-2 border-b border-white/[0.06] text-[#c0c0c8] hover:text-white transition-colors"
              >
                <span>Tekkloom GitHub &middot; /tekkloom-a11y</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#55555c] group-hover:text-[#ff7a1a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Working Functional Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field (hidden from real users) */}
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block meta-mono text-[#888890] mb-2">
                  NAME *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-[#0a0a0f] border border-white/[0.1] px-4 py-3 text-sm text-[#f4f4f6] placeholder-[#55555c] focus:border-[#ff7a1a] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block meta-mono text-[#888890] mb-2">
                  EMAIL *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full bg-[#0a0a0f] border border-white/[0.1] px-4 py-3 text-sm text-[#f4f4f6] placeholder-[#55555c] focus:border-[#ff7a1a] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block meta-mono text-[#888890] mb-2">
                MESSAGE *
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your technical problem, architecture inquiry, or collaboration idea..."
                className="w-full bg-[#0a0a0f] border border-white/[0.1] px-4 py-3 text-sm text-[#f4f4f6] placeholder-[#55555c] focus:border-[#ff7a1a] transition-colors resize-none"
              />
            </div>

            {/* Status messages */}
            {status === "error" && (
              <div className="p-3 bg-red-950/20 border border-red-500/30 flex items-center gap-2 text-xs font-mono text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{statusMessage}</span>
              </div>
            )}

            {status === "success" && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-2 text-xs font-mono text-emerald-300">
                <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{statusMessage}</span>
              </div>
            )}

            {status === "fallback" && (
              <div className="p-4 bg-white/[0.02] border border-[#ff7a1a]/40 space-y-3">
                <p className="text-xs font-mono text-[#c0c0c8]">{statusMessage}</p>
                <a
                  href={mailtoUrl}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff7a1a] text-[#060608] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open In Mail Client</span>
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#f4f4f6] text-[#060608] hover:bg-[#ff7a1a] hover:text-white transition-all duration-300 text-xs font-mono uppercase tracking-widest font-semibold disabled:opacity-50"
            >
              {status === "loading" ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Simple Footer with Back to Top */}
      <footer className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#66666e] gap-4">
        <div>
          <span>&copy; 2026 Duncan D&apos;Lima.</span>
          <span className="hidden sm:inline"> Built with Next.js & TypeScript.</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-[#888890] hover:text-[#ff7a1a] transition-colors"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </footer>
    </section>
  );
}
