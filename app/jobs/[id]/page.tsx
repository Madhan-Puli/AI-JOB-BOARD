import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getJobById } from "@/lib/jobs";
import Link from "next/link";
import { FiArrowLeft, FiBriefcase, FiCheckCircle, FiMapPin } from "react-icons/fi";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <section className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-950">Job not found</h1>
          <p className="mt-3 text-slate-600">
            The role may have been removed or the link may be incorrect.
          </p>
          <Link
            href="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            <FiArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to jobs
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const salaryLabel = job.salary.replace(/\s+/g, " ").trim();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-950"
          >
            <FiArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to all jobs
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                {job.company}
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-950">
                {job.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
                <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2">
                  <FiMapPin aria-hidden="true" className="h-4 w-4" />
                  {job.location}
                </span>
                <span className="rounded-md bg-emerald-50 px-3 py-2 text-emerald-700">
                  INR {salaryLabel}
                </span>
              </div>
            </div>

            <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Application status
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-950">
                Actively hiring
              </p>
              <Link
                href={`/apply?id=${job._id}`}
                className="mt-5 block rounded-md bg-blue-600 px-5 py-3 text-center font-bold text-white hover:bg-blue-700"
              >
                Apply for this role
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1fr_360px]">
        <article className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700">
              <FiBriefcase aria-hidden="true" className="h-5 w-5" />
            </span>
            <h2 className="text-2xl font-bold text-slate-950">
              Role overview
            </h2>
          </div>

          <p className="mt-5 whitespace-pre-line leading-8 text-slate-700">
            {job.description || "No detailed description has been provided yet."}
          </p>
        </article>

        <aside className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-950">
            Why this experience stands out
          </h2>
          <div className="mt-5 space-y-4">
            {[
              "Server-side job detail rendering",
              "MongoDB-backed role data",
              "Clean candidate application path",
              "Production build verified in CI",
            ].map((item) => (
              <p key={item} className="flex gap-3 text-sm font-medium text-slate-700">
                <FiCheckCircle
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                />
                {item}
              </p>
            ))}
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}
