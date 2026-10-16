"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#060608]/85 backdrop-blur-md border-b border-white/[0.08] py-3"
            : "bg-transparent py-5 md:py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm tracking-tight font-light text-[#f4f4f6] hover:text-white transition-colors"
          >
            <span className="font-normal text-white">{PORTFOLIO_DATA.personal.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a1a] opacity-80 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-widest text-[#888890] hover:text-[#f4f4f6] transition-colors font-mono"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-3.5 w-px bg-white/[0.12]" />

            {/* Singular Resume CTA */}
            <a
              href="/duncan_dlima_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-[#f4f4f6] border border-white/[0.16] hover:border-[#ff7a1a] hover:text-[#ff7a1a] transition-all duration-200"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#888890] hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#060608] flex flex-col justify-between px-8 py-24 md:hidden">
          <div className="flex flex-col gap-6 pt-8">
            <span className="meta-mono">Navigation</span>
            {navLinks.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-light text-[#f4f4f6] hover:text-[#ff7a1a] transition-colors flex items-baseline justify-between border-b border-white/[0.06] pb-4"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#55555c]">0{idx + 1}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/[0.08]">
            <a
              href="/duncan_dlima_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-mono uppercase tracking-widest text-[#060608] bg-[#f4f4f6] hover:bg-white transition-colors font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download Resume</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <div className="flex items-center justify-between text-xs text-[#66666e] font-mono pt-2">
              <span>{PORTFOLIO_DATA.personal.location}</span>
              <span>CTO @ Tekkloom</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
