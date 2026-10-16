import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060608] text-[#f4f4f6] flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-white/[0.08] p-8 sm:p-12 text-center space-y-6">
        <span className="meta-mono text-[#ff7a1a]">404 // NOT FOUND</span>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-[200] text-[#f4f4f6]">
            Page not found.
          </h1>
          <p className="text-sm font-light text-[#888890] leading-relaxed">
            The requested resource does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-4 border-t border-white/[0.08]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#060608] bg-[#f4f4f6] hover:bg-[#ff7a1a] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
