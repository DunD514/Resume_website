"use client";

import React, { useState } from "react";
import { Send, Copy, Check } from "lucide-react";

export default function MailApp() {
  const [senderEmail, setSenderEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const duncanEmail = "duncandlima514@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(duncanEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${duncanEmail}?subject=${encodeURIComponent(
      subject || "Inquiry from macOS Portfolio"
    )}&body=${encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\n\n${message}`
    )}`;
    window.location.href = mailtoUrl;
    setSentSuccess(true);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-white/90 select-none overflow-hidden font-sans">
      {/* Mail Toolbar */}
      <div className="flex-none h-11 px-4 bg-[#262626] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSend}
            className="flex items-center space-x-1.5 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Message</span>
          </button>

          <button
            onClick={handleCopyEmail}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-xs transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/60" />}
            <span>{copied ? "Copied!" : "Copy Email"}</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-white/40">
          <span>New Message</span>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSend} className="flex-1 flex flex-col min-h-0 bg-[#1e1e1e]">
        {/* Recipient */}
        <div className="px-4 py-2 border-b border-white/10 flex items-center text-xs">
          <span className="w-16 text-white/40 font-medium">To:</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium">
            Duncan D&apos;Lima &lt;{duncanEmail}&gt;
          </span>
        </div>

        {/* Sender Info */}
        <div className="px-4 py-2 border-b border-white/10 flex items-center text-xs">
          <span className="w-16 text-white/40 font-medium">From:</span>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Your Name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white/30 outline-none border-none text-xs"
              required
            />
            <span className="text-white/20">|</span>
            <input
              type="email"
              placeholder="your.email@domain.com"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white/30 outline-none border-none text-xs"
              required
            />
          </div>
        </div>

        {/* Subject */}
        <div className="px-4 py-2 border-b border-white/10 flex items-center text-xs">
          <span className="w-16 text-white/40 font-medium">Subject:</span>
          <input
            type="text"
            placeholder="AI Project Collaboration / Recruiter Inquiry"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/30 outline-none border-none text-xs"
            required
          />
        </div>

        {/* Message Body */}
        <div className="flex-1 p-4 flex flex-col min-h-0">
          <textarea
            placeholder="Write your note or opportunity inquiry here... Duncan typically replies within 24 hours."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 w-full bg-transparent text-white/90 placeholder-white/30 outline-none border-none resize-none text-xs leading-relaxed font-sans"
            required
          />
        </div>

        {/* Footer info note */}
        <div className="flex-none px-4 py-2 border-t border-white/10 bg-[#181818] flex items-center justify-between text-[11px] text-white/40">
          <span>Clicking Send triggers your default mail client with direct dispatch to Duncan.</span>
          {sentSuccess && <span className="text-emerald-400 font-medium">Mail client opened!</span>}
        </div>
      </form>
    </div>
  );
}
