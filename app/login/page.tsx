import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { FiArrowRight, FiBriefcase, FiUser } from "react-icons/fi";

const roles = [
  {
    title: "Candidate demo",
    href: "/dashboard?role=candidate",
    icon: FiUser,
    description:
      "For students, freshers, and professionals who want to discover roles, apply, and track progress.",
    features: ["Profile readiness", "Applied jobs", "Saved roles"],
  },
  {
    title: "Recruiter demo",
    href: "/dashboard?role=recruiter",
    icon: FiBriefcase,
    description:
      "For hiring teams that need to publish openings, review applicants, and manage a hiring pipeline.",
    features: ["Posted jobs", "Applicant review", "Interview pipeline"],
  },
];

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Demo access
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950">
            Choose how you want to explore TalentBridge AI.
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            This assessment build uses role-based demo entry instead of a full
            authentication provider. It still demonstrates how the product would
            separate candidate and recruiter experiences in a production system.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <Link
                key={role.title}
                href={role.href}
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-2xl font-bold text-slate-950">
                  {role.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  {role.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {role.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-md bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-blue-700 group-hover:text-blue-800">
                  Continue as {role.title.replace(" demo", "")}
                  <FiArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
