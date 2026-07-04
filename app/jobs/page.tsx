"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import Navbar from "@/components/Navbar";
import { FiFilter, FiSearch } from "react-icons/fi";

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description?: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
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

  const locations = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.location))).sort(),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        [job.title, job.company, job.location, job.salary, job.description]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(query));
      const matchesLocation = location === "all" || job.location === location;

      return matchesSearch && matchesLocation;
    });
  }, [jobs, location, search]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Opportunity marketplace
          </p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-950">
                Explore open software roles
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Filter by role, company, location, and compensation to quickly
                identify the best next move.
              </p>
            </div>
            <p className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">
              {filteredJobs.length} roles available
            </p>
          </div>

          <div className="mt-8 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 md:grid-cols-[1fr_260px]">
            <label className="flex items-center gap-3 rounded-md bg-white px-3 py-2">
              <FiSearch aria-hidden="true" className="h-5 w-5 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title, company, skills, location"
                className="w-full border-0 bg-transparent py-2 text-slate-950 placeholder:text-slate-400 focus:shadow-none"
                type="search"
              />
            </label>

            <label className="flex items-center gap-3 rounded-md bg-white px-3 py-2">
              <FiFilter aria-hidden="true" className="h-5 w-5 text-slate-400" />
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full border-0 bg-transparent py-2 text-slate-950 focus:shadow-none"
              >
                <option value="all">All locations</option>
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        {loading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
            Loading jobs...
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center font-medium text-red-700">
            {error}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
            <h2 className="text-lg font-bold text-slate-950">No jobs found</h2>
            <p className="mt-2 text-slate-600">
              Adjust the filters or post a new role to seed the marketplace.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
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
        )}
      </section>

      <Footer />
    </main>
  );
}
