import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  FiArrowRight,
  FiBarChart2,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const isRecruiter = role === "recruiter";

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            {isRecruiter ? "Recruiter workspace" : "Candidate workspace"}
          </p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <h1 className="text-4xl font-bold text-slate-950">
                {isRecruiter
                  ? "Manage hiring from posting to shortlist."
                  : "Track your career search from discovery to offer."}
              </h1>
              <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                {isRecruiter
                  ? "This demo dashboard shows how recruiters can manage openings, review applicants, and move candidates through a hiring pipeline."
                  : "This demo dashboard shows how students, freshers, and professionals can manage applications, improve profile readiness, and keep job search momentum visible."}
              </p>
            </div>

            <Link
              href={isRecruiter ? "/post-job" : "/jobs"}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700"
            >
              {isRecruiter ? "Post role" : "Find jobs"}
              <FiArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          {(isRecruiter ? recruiterMetrics : candidateMetrics).map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md bg-blue-50 text-blue-700">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="mt-4 text-3xl font-bold text-slate-950">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              {isRecruiter ? "Hiring pipeline" : "Application tracker"}
            </h2>
            <div className="mt-5 space-y-4">
              {(isRecruiter ? recruiterPipeline : candidatePipeline).map(
                (item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4"
                  >
                    <div>
                      <p className="font-bold text-slate-950">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                    <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
                      {item.status}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Product thinking
            </h2>
            <div className="mt-5 space-y-4">
              {(isRecruiter ? recruiterThinking : candidateThinking).map(
                (item) => (
                  <p
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-700"
                  >
                    <FiCheckCircle
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-emerald-600"
                    />
                    {item}
                  </p>
                )
              )}
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const candidateMetrics = [
  { label: "Profile readiness", value: "82%", icon: FiUserCheck },
  { label: "Saved jobs", value: "6", icon: FiBriefcase },
  { label: "Applications", value: "4", icon: FiFileText },
  { label: "Interviews", value: "2", icon: FiClock },
];

const recruiterMetrics = [
  { label: "Open roles", value: "8", icon: FiBriefcase },
  { label: "Applicants", value: "124", icon: FiUsers },
  { label: "Shortlisted", value: "18", icon: FiUserCheck },
  { label: "Offer stage", value: "5", icon: FiBarChart2 },
];

const candidatePipeline = [
  {
    title: "Frontend Developer at Google",
    description: "Resume submitted and awaiting recruiter review.",
    status: "Applied",
  },
  {
    title: "Backend Developer at Amazon",
    description: "Technical screening scheduled.",
    status: "Interview",
  },
  {
    title: "Full Stack Developer at Infosys",
    description: "Saved for later after profile improvement.",
    status: "Saved",
  },
];

const recruiterPipeline = [
  {
    title: "Quality Engineer",
    description: "New applicants are waiting for initial screening.",
    status: "Review",
  },
  {
    title: "Frontend Developer",
    description: "Three candidates moved to technical interview.",
    status: "Interview",
  },
  {
    title: "Backend Developer",
    description: "Offer discussion pending with final candidate.",
    status: "Offer",
  },
];

const candidateThinking = [
  "A candidate dashboard helps students and employees understand their next action.",
  "Application status creates trust and makes the platform feel useful after applying.",
  "Profile readiness suggests future AI recommendations without overbuilding the demo.",
];

const recruiterThinking = [
  "Recruiters need visibility into the hiring funnel, not only a post-job form.",
  "Pipeline stages make the platform useful for real hiring operations.",
  "This role split shows a path toward authentication, permissions, and analytics.",
];
