import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050812] text-[#F8FAFC] flex items-center justify-center p-6 tech-grid-pattern">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-blue-500/30 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-cyan-400">
          <Terminal className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            ERROR 404 :: NODE NOT FOUND
          </span>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] text-slate-100">
            Page Does Not Exist
          </h1>
          <p className="text-sm text-slate-400">
            The requested route or data artifact could not be resolved within this namespace.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
