"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedJobs from "../components/FeaturedJobs";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";

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

      <section className="mx-auto max-w-7xl px-5 pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Fast discovery", "Search and scan jobs without noisy page reloads."],
            ["Employer workflow", "Post new roles through a validated recruiter form."],
            ["CI/CD ready", "GitHub Actions verifies builds and can deploy to Vercel."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
