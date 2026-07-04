"use client";

import { useEffect, useState } from "react";
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

  // ✅ FETCH DATA FROM API
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

  // ✅ SAFE FILTER
  const filteredJobs = jobs.filter((job) => {
    if(!job) return false;

    return (
      job?.title?.toLowerCase().includes(search.toLowerCase()) ||
      job?.company?.toLowerCase().includes(search.toLowerCase()) ||
      job?.location?.toLowerCase().includes(search.toLowerCase()) ||
      job?.salary?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero search={search} setSearch={setSearch} />
      <FeaturedJobs />

      {/* JOB LIST */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {loading ? (
          <p className="col-span-full text-center text-gray-600 text-lg">
            Loading jobs...
          </p>
        ) : error ? (
          <p className="col-span-full text-center text-red-600 text-lg">
            {error}
          </p>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              id={job._id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No jobs found
          </p>
        )}
      </section>

      <Footer />
    </main>
  );
}
