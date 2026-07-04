"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedJobs from "../components/FeaturedJobs";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import Link from "next/link";
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClipboard,
  FiUsers,
} from "react-icons/fi";

const marketplaceFeatures = [
  {
    icon: FiCheckCircle,
    title: "Candidate profile flow",
    copy: "A clean application journey with resume URL, contact details, and confirmation state.",
  },
  {
    icon: FiClipboard,
    title: "Recruiter pipeline",
    copy: "A dashboard concept for posted jobs, candidate review, interviews, and offers.",
  },
  {
    icon: FiBriefcase,
    title: "Production mindset",
    copy: "MongoDB data, validation, CI/CD, documentation, and Vercel deployment readiness.",
  },
];

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description?: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/jobs");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.details || data?.error || "Failed to fetch jobs");
        }

        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobs([]);
        setError(error instanceof Error ? error.message : "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return jobs;
    }

    return jobs.filter((job) =>
      [job.title, job.company, job.location, job.salary, job.description]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query))
    );
  }, [jobs, search]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero search={search} setSearch={setSearch} totalJobs={jobs.length} />
      <FeaturedJobs resultCount={filteredJobs.length} totalJobs={jobs.length} />

      <section className="mx-auto max-w-7xl px-5 py-8">
        {loading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
            Loading curated roles...
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center font-medium text-red-700">
            {error}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.slice(0, 6).map((job) => (
              <JobCard
                key={job._id}
                id={job._id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                description={job.description}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
            <h3 className="text-lg font-bold text-slate-950">
              No matching roles found
            </h3>
            <p className="mt-2 text-slate-600">
              Try searching by company, location, or role title.
            </p>
          </div>
        )}
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-600 text-white">
              <FiUsers aria-hidden="true" className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-slate-950">
              For candidates and students
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Students, freshers, and early-career professionals can discover
              relevant openings, review role expectations, apply with a resume
              link, and track their job search from a focused dashboard.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700"
            >
              Login as candidate
              <FiArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white">
              <FiBriefcase aria-hidden="true" className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-slate-950">
              For recruiters and employers
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Recruiters can publish roles, monitor applicant stages, and see a
              hiring pipeline view that explains how the platform can support
              real recruitment operations beyond simple job posting.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-3 font-bold text-white hover:bg-slate-800"
            >
              Login as recruiter
              <FiArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12">
        <div className="grid gap-4 py-12 md:grid-cols-3">
          {marketplaceFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
            <div key={feature.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-blue-50 text-blue-700">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="font-bold text-slate-950">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.copy}</p>
            </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
