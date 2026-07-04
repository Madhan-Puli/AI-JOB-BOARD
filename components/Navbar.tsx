import Link from "next/link";
import { FiBriefcase, FiPlusCircle } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white">
            <FiBriefcase aria-hidden="true" className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-lg font-bold leading-5 text-slate-950">
              TalentBridge AI
            </span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">
              Curated tech hiring platform
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950"
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950"
          >
            Jobs
          </Link>
          <Link
            href="/post-job"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <FiPlusCircle aria-hidden="true" className="h-4 w-4" />
            <span className="hidden sm:inline">Post Job</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
