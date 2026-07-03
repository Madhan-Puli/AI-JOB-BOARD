"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedJobs from "../components/FeaturedJobs";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero search={search} setSearch={setSearch} />

      {/* Featured Jobs */}
      <FeaturedJobs />

      {/* Job Cards */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No jobs found.
          </p>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}