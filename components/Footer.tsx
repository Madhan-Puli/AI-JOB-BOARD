import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-950">TalentBridge AI</p>
          <p className="mt-1">
            Built with Next.js, MongoDB, GitHub Actions, and Vercel.
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/jobs" className="hover:text-slate-950">
            Browse jobs
          </Link>
          <Link href="/post-job" className="hover:text-slate-950">
            Hire talent
          </Link>
        </div>
      </div>
    </footer>
  );
}
