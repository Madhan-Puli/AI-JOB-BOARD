"use client";

import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

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

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          All Jobs
        </h1>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-600">
            No jobs available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}